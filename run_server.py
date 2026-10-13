"""
StudyPulse Main Runner
Starts the unified Python backend server (APIs + Static Frontend)
Accessible on:
1. Local PC: http://localhost:5000
2. Mobile / Tablet / Other Laptops on same WiFi: http://<WiFi-IP>:5000
3. Anyone anywhere worldwide: Cloudflare Tunnel URL (if cloudflared is running)
"""

import os
import sys
import io
import time
import socket
import webbrowser
import threading
import subprocess
import re

# Safe UTF-8 standard output for Windows console
try:
    if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    if sys.stderr and hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

# Add root directory to sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

PORT = int(os.getenv("PORT", 5000))
HOST = "0.0.0.0"

def get_local_ip():
    """Detect LAN/Wi-Fi IPv4 address of this machine"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def get_public_url():
    pub_file = os.path.join(BASE_DIR, "public_url.txt")
    if os.path.exists(pub_file):
        try:
            with open(pub_file, 'r', encoding='utf-8') as f:
                val = f.read().strip()
                if val:
                    return val
        except Exception:
            pass
    return None

def open_browser(url=f"http://localhost:{PORT}"):
    """Waits for server port to be active then opens browser immediately"""
    start_t = time.time()
    # Poll until port is active (max 10 seconds)
    while time.time() - start_t < 10.0:
        if is_port_in_use(PORT):
            break
        time.sleep(0.05)
    
    print(f"\n[OK] Opening browser instantly at: {url}\n")
    try:
        webbrowser.open(url)
    except Exception:
        pass

def main():
    local_ip = get_local_ip()

    # Check if StudyPulse server is already running
    if is_port_in_use(PORT):
        pub_url = get_public_url()
        print("=" * 65)
        print("  StudyPulse Server is ALREADY RUNNING!")
        print("=" * 65)
        print(f"  * Local PC URL      : http://localhost:{PORT}/studypulse")
        print(f"  * Mobile / WiFi URL : http://{local_ip}:{PORT}/studypulse")
        if pub_url:
            print(f"  * StudyPulse Online : {pub_url}")
        print("=" * 65)
        print("  Opening browser now...")
        open_browser(f"http://localhost:{PORT}/studypulse")
        return

    # Start browser thread (will open immediately when server is ready)
    threading.Thread(target=open_browser, args=(f"http://localhost:{PORT}/studypulse",), daemon=True).start()

    # Start unified backend server (handles tunnel supervisor + fast startup)
    from backend.server import start_server
    start_server(host=HOST, port=PORT)

if __name__ == "__main__":
    main()
