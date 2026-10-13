import os
import sys
import time
import socket
import threading
import webbrowser

class SafeStream:
    def write(self, s): pass
    def flush(self): pass
    def reconfigure(self, **kwargs): pass
    @property
    def encoding(self): return 'utf-8'
    def isatty(self): return False

if sys.stdout is None:
    sys.stdout = SafeStream()
elif hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

if sys.stderr is None:
    sys.stderr = SafeStream()
elif hasattr(sys.stderr, 'reconfigure'):
    try:
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Add root directory to sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def run_server_thread():
    try:
        from backend.server import start_server
        start_server(host='0.0.0.0', port=5000)
    except Exception as e:
        print("[SERVER ERROR]", e)

def open_app_window(url):
    """
    Opens StudyPulse in dedicated Desktop App Mode:
    Clean, borderless, modern native desktop window with no browser toolbars or tabs.
    Falls back gracefully to default browser.
    """
    candidate_browsers = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        os.path.expandvars(r"%LOCALAPPDATA%\BraveSoftware\Brave-Browser\Application\brave.exe"),
        r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    ]

    import subprocess
    for b_path in candidate_browsers:
        if os.path.exists(b_path):
            try:
                subprocess.Popen([b_path, f"--app={url}"])
                return
            except Exception:
                pass

    # Seamless fallback to default browser
    try:
        webbrowser.open(url)
    except Exception:
        pass

def main():
    url = "http://localhost:5000/studypulse"

    # 1. If backend server is already running on port 5000, just open the app window and exit
    if is_port_in_use(5000):
        open_app_window(url)
        return

    # 2. Server is not yet running:
    # Launch app window in helper thread as soon as server is ready
    def _open_when_ready():
        start_t = time.time()
        while time.time() - start_t < 10.0:
            if is_port_in_use(5000):
                break
            time.sleep(0.05)
        open_app_window(url)

    threading.Thread(target=_open_when_ready, daemon=True).start()

    # 3. Run backend server on main thread so it stays active reliably
    try:
        from backend.server import start_server
        start_server(host='0.0.0.0', port=5000)
    except Exception as e:
        import traceback
        with open(os.path.join(BASE_DIR, "app_error.log"), "a", encoding="utf-8") as f:
            f.write("start_server error:\n" + traceback.format_exc() + "\n")

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        import traceback
        with open(os.path.join(BASE_DIR, "app_error.log"), "a", encoding="utf-8") as f:
            f.write("main error:\n" + traceback.format_exc() + "\n")
