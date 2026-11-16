"""
StudyPulse Cloudflare Tunnel Supervisor
Ensures 24/7 high-reliability public HTTPS access for iPhone, Android, and Web browsers.
Features:
- Automatic startup & background process supervision
- Protocol set to http2 (TCP) for maximum stability across all networks & ISPs
- Continuous non-blocking log stream processing (never clogs stdout pipe)
- Automatic crash recovery & immediate re-acquisition on tunnel expiration
- Active HTTP health ping watchdog: detects silent drops and refreshes URL
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
import urllib.request

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
        self.status = "starting"  # "stopped", "starting", "online", "reconnecting", "offline"
        self.status_message = "सुरक्षित ऑनलाइन लिंक तैयार हो रही है..."
        self.last_connected_time = None
        self._stop_requested = False
        self._lock = threading.Lock()
        self._thread = None
        self._watchdog_thread = None
        self._failed_health_checks = 0

        # Always start fresh: remove any stale public_url.txt
        try:
            if os.path.exists(PUBLIC_URL_FILE):
                os.remove(PUBLIC_URL_FILE)
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
            self.status = "starting"
            self.status_message = "सुरक्षित क्लाउड टनल प्रारंभ हो रहा है..."
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
        self.public_url = None
        self.status = "stopped"
        self.status_message = "टनल बंद कर दिया गया है"
        try:
            if os.path.exists(PUBLIC_URL_FILE):
                os.remove(PUBLIC_URL_FILE)
        except Exception:
            pass

    def restart(self):
        """Forces a fresh tunnel restart"""
        print("[TUNNEL] Quick tunnel refresh requested...")
        self.stop()
        time.sleep(1)
        self.start()

    def get_public_url(self):
        return self.public_url if self.status == "online" else None

    def get_status_info(self):
        return {
            "status": self.status,
            "public_url": self.public_url if self.status == "online" else None,
            "message": self.status_message,
            "uptime_seconds": int(time.time() - self.last_connected_time) if (self.last_connected_time and self.status == "online") else 0
        }

    def _run_loop(self):
        """Main loop that keeps cloudflared running continuously with instant re-launch on expiry"""
        consecutive_failures = 0

        while not self._stop_requested:
            try:
                self.status = "starting"
                self.status_message = "क्लाउडफ्लेयर सुरक्षित टनल से जुड़ रहा है..."
                print("\n[TUNNEL] Launching Cloudflare Tunnel (http2 mode for iPhone/Android/Web)...")

                cmd = [
                    CLOUDFLARED_EXE,
                    "tunnel",
                    "--edge-ip-version", "4",
                    "--protocol", "http2",
                    "--url", f"http://127.0.0.1:{self.port}"
                ]

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

                # Read output continuously
                for line in self.proc.stdout:
                    if self._stop_requested:
                        break
                    
                    line_str = line.strip()
                    try:
                        with open(log_path, "a", encoding="utf-8") as log_f:
                            log_f.write(line_str + "\n")
                    except Exception:
                        pass

                    # Detect unrecoverable tunnel errors (e.g. ephemeral quick tunnel expired)
                    if "Unauthorized: Tunnel not found" in line_str or "unauthorized: tunnel not found" in line_str.lower():
                        print("[TUNNEL] Detected expired quick tunnel token from edge. Re-spawning new tunnel...")
                        self.public_url = None
                        self.status = "reconnecting"
                        self.status_message = "सुरक्षित लिंक को नवीनीकृत किया जा रहा है..."
                        try:
                            if os.path.exists(PUBLIC_URL_FILE):
                                os.remove(PUBLIC_URL_FILE)
                        except Exception:
                            pass
                        try:
                            self.proc.kill()
                        except Exception:
                            pass
                        break

                    # Check for fresh trycloudflare URL
                    match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line_str)
                    if match:
                        found_url = match.group(0).rstrip("/")
                        self.public_url = found_url
                        self.status = "online"
                        self.status_message = "StudyPulse ऑनलाइन क्लाउड सुरक्षित लिंक सक्रिय है"
                        self.last_connected_time = time.time()
                        self._failed_health_checks = 0
                        consecutive_failures = 0

                        # Save clean URL to public_url.txt
                        try:
                            with open(PUBLIC_URL_FILE, "w", encoding="utf-8") as f:
                                f.write(f"{found_url}\n")
                        except Exception:
                            pass

                        print("\n" + "=" * 68)
                        print("  🚀 [STUDYPULSE LIVE PUBLIC HTTPS LINK READY!]")
                        print(f"  👉 iPhone / Android / Web URL: {found_url}")
                        print(f"  👉 Direct App URL            : {found_url}/studypulse")
                        print("  📱 QR Code is 100% active for all phone cameras & browsers!")
                        print("=" * 68 + "\n")

                # If process ended unexpectedly
                exit_code = self.proc.wait() if self.proc else 0
                if not self._stop_requested:
                    consecutive_failures += 1
                    self.public_url = None
                    self.status = "reconnecting"
                    self.status_message = f"पुनः कनेक्ट हो रहा है (प्रयास {consecutive_failures})..."
                    print(f"[TUNNEL] cloudflared exited with code {exit_code}. Reconnecting in 2s...")
                    time.sleep(min(2 * consecutive_failures, 8))

            except Exception as e:
                if not self._stop_requested:
                    consecutive_failures += 1
                    self.public_url = None
                    self.status = "reconnecting"
                    self.status_message = f"कनेक्शन त्रुटि: {str(e)[:50]}"
                    print(f"[TUNNEL ERROR] {e}")
                    time.sleep(3)

    def _watchdog_loop(self):
        """Periodically checks if the tunnel is responsive and actively serving traffic"""
        time.sleep(12)
        while not self._stop_requested:
            try:
                time.sleep(15)
                if self._stop_requested:
                    break

                # 1. Process crash check
                if self.proc and self.proc.poll() is not None:
                    print("[WATCHDOG] Tunnel process exited. Triggering restart...")
                    self.restart()
                    continue

                # 2. Live HTTP health check if marked online
                if self.status == "online" and self.public_url:
                    test_url = f"{self.public_url}/api/health"
                    try:
                        req = urllib.request.Request(
                            test_url,
                            headers={"User-Agent": "StudyPulse-Watchdog/1.0"}
                        )
                        with urllib.request.urlopen(req, timeout=4.5) as resp:
                            if resp.status == 200:
                                self._failed_health_checks = 0
                            else:
                                self._failed_health_checks += 1
                    except Exception:
                        self._failed_health_checks += 1

                    if self._failed_health_checks >= 2:
                        print(f"[WATCHDOG] Public URL {self.public_url} failed {self._failed_health_checks} health checks. Refreshing tunnel...")
                        self._failed_health_checks = 0
                        self.restart()

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
