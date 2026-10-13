"""
StudyPulse Cloudflare Tunnel Supervisor
Ensures 24/7 high-reliability public URL access for mobile and remote users.
Features:
- Automatic startup & background process supervision
- Protocol set to http2 (TCP) for maximum stability across all networks & ISPs
- Continuous non-blocking log stream processing (never clogs stdout pipe)
- Automatic crash recovery & reconnect watchdog
- Updates public_url.txt and maintains live memory state
- Clean process shutdown on app exit
"""

import os
import sys
import time
import subprocess
import threading
import re
import atexit
import signal

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
CLOUDFLARED_EXE = os.path.join(PROJECT_ROOT, "cloudflared.exe")
PUBLIC_URL_FILE = os.path.join(PROJECT_ROOT, "public_url.txt")

def _get_silent_subprocess_kwargs():
    """Ensure child processes run 100% silently without opening any console/CMD window on Windows."""
    kwargs = {}
    if sys.platform == "win32":
        kwargs["creationflags"] = getattr(subprocess, "CREATE_NO_WINDOW", 0x08000000)
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
        startupinfo.wShowWindow = 0  # SW_HIDE
        kwargs["startupinfo"] = startupinfo
    return kwargs

class CloudflareTunnelSupervisor:
    def __init__(self, port=5000):
        self.port = port
        self.proc = None
        self.public_url = None
        self.status = "stopped"  # "stopped", "starting", "online", "reconnecting", "offline"
        self.status_message = "सुरंग प्रारंभ नहीं हुई"
        self.last_connected_time = None
        self._stop_requested = False
        self._lock = threading.Lock()
        self._thread = None
        self._watchdog_thread = None
        
        # Load any previous cached url as initial fallback
        if os.path.exists(PUBLIC_URL_FILE):
            try:
                with open(PUBLIC_URL_FILE, "r", encoding="utf-8") as f:
                    cached = f.read().strip()
                    if cached and "trycloudflare.com" in cached:
                        self.public_url = cached
            except Exception:
                pass

    def _cleanup_stale_processes(self):
        """Kills any orphaned cloudflared processes on Windows silently"""
        try:
            if sys.platform == "win32":
                subprocess.run(
                    ["taskkill", "/F", "/IM", "cloudflared.exe"],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    check=False,
                    **_get_silent_subprocess_kwargs()
                )
        except Exception:
            pass

    def start(self):
        """Starts the supervisor in background"""
        if not os.path.exists(CLOUDFLARED_EXE):
            self.status = "offline"
            self.status_message = "cloudflared.exe नहीं मिला (केवल Wi-Fi लोकल लिंक सक्रिय)"
            print("[TUNNEL] cloudflared.exe not found. Public tunnel disabled.")
            return

        with self._lock:
            if self._thread and self._thread.is_alive():
                return
            self._stop_requested = False
            self._cleanup_stale_processes()
            self._thread = threading.Thread(target=self._run_loop, name="CloudflareTunnelThread", daemon=True)
            self._thread.start()
            
            # Start health watchdog
            if not self._watchdog_thread or not self._watchdog_thread.is_alive():
                self._watchdog_thread = threading.Thread(target=self._watchdog_loop, name="CloudflareWatchdogThread", daemon=True)
                self._watchdog_thread.start()

    def stop(self):
        """Stops the tunnel process cleanly"""
        self._stop_requested = True
        with self._lock:
            if self.proc:
                try:
                    self.proc.terminate()
                    self.proc.wait(timeout=2)
                except Exception:
                    try:
                        self.proc.kill()
                    except Exception:
                        pass
                self.proc = None
        self.status = "stopped"
        self.status_message = "टनल बंद कर दिया गया है"

    def restart(self):
        """Forces a fresh tunnel restart"""
        print("[TUNNEL] Manual restart requested...")
        self.stop()
        time.sleep(1)
        self.start()

    def get_public_url(self):
        return self.public_url

    def get_status_info(self):
        return {
            "status": self.status,
            "public_url": self.public_url,
            "message": self.status_message,
            "uptime_seconds": int(time.time() - self.last_connected_time) if self.last_connected_time else 0
        }

    def _run_loop(self):
        """Main loop that keeps cloudflared running continuously"""
        consecutive_failures = 0

        while not self._stop_requested:
            try:
                self.status = "starting"
                self.status_message = "क्लाउडफ्लेयर सुरक्षित टनल से जुड़ रहा है..."
                print("\n[TUNNEL] Launching Cloudflare Tunnel (http2 mode)...")

                cmd = [
                    CLOUDFLARED_EXE,
                    "tunnel",
                    "--edge-ip-version", "4",
                    "--protocol", "http2",
                    "--url", f"http://127.0.0.1:{self.port}"
                ]

                # Run cloudflared silently with combined stdout and stderr
                self.proc = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    encoding="utf-8",
                    errors="replace",
                    bufsize=1,
                    **_get_silent_subprocess_kwargs()
                )

                log_path = os.path.join(PROJECT_ROOT, "cloudflared.log")
                with open(log_path, "a", encoding="utf-8") as log_f:
                    log_f.write(f"\n--- [TUNNEL SESSION STARTED {time.strftime('%Y-%m-%d %H:%M:%S')}] ---\n")

                # Read output continuously so the buffer NEVER blocks
                for line in self.proc.stdout:
                    if self._stop_requested:
                        break
                    
                    line_str = line.strip()
                    try:
                        with open(log_path, "a", encoding="utf-8") as log_f:
                            log_f.write(line_str + "\n")
                    except Exception:
                        pass

                    # Check for trycloudflare URL
                    match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line_str)
                    if match:
                        found_url = match.group(0)
                        self.public_url = found_url
                        self.status = "online"
                        self.status_message = "ऑनलाइन टनल सक्रिय एवं सुरक्षित है"
                        self.last_connected_time = time.time()
                        consecutive_failures = 0

                        # Save to public_url.txt with branded /studypulse path
                        try:
                            with open(PUBLIC_URL_FILE, "w", encoding="utf-8") as f:
                                f.write(f"{found_url}/studypulse")
                        except Exception:
                            pass

                        print("\n" + "=" * 65)
                        print("  🚀 [STUDYPULSE LIVE PUBLIC APP LINK READY!]")
                        print(f"  👉 StudyPulse App URL: {found_url}/studypulse")
                        print("  📱 Mobile QR & Scanner are 100% active!")
                        print("=" * 65 + "\n")

                # If process ended unexpectedly
                exit_code = self.proc.wait() if self.proc else 0
                if not self._stop_requested:
                    consecutive_failures += 1
                    self.status = "reconnecting"
                    self.status_message = f"पुनः कनेक्ट हो रहा है (प्रयास {consecutive_failures})..."
                    print(f"[TUNNEL] cloudflared exited with code {exit_code}. Reconnecting in 3s...")
                    time.sleep(min(3 * consecutive_failures, 15))

            except Exception as e:
                if not self._stop_requested:
                    consecutive_failures += 1
                    self.status = "reconnecting"
                    self.status_message = f"कनेक्शन त्रुटि: {str(e)[:50]}"
                    print(f"[TUNNEL ERROR] {e}")
                    time.sleep(3)

    def _watchdog_loop(self):
        """Periodically checks if the tunnel is responsive and healthy"""
        time.sleep(10)
        while not self._stop_requested:
            try:
                time.sleep(20)
                if self._stop_requested:
                    break

                # If process died without exiting thread
                if self.proc and self.proc.poll() is not None:
                    print("[WATCHDOG] Tunnel process is not running. Triggering restart...")
                    self.restart()
                    continue

            except Exception:
                pass


# Global singleton instance
supervisor = CloudflareTunnelSupervisor(port=5000)

def init_tunnel_supervisor(port=5000):
    global supervisor
    supervisor.port = port
    supervisor.start()
    return supervisor

def get_tunnel_supervisor():
    return supervisor

# Clean up when python process exits
def _cleanup():
    try:
        supervisor.stop()
        supervisor._cleanup_stale_processes()
    except Exception:
        pass

atexit.register(_cleanup)

if hasattr(signal, "SIGTERM"):
    try:
        signal.signal(signal.SIGTERM, lambda s, f: _cleanup())
    except Exception:
        pass
