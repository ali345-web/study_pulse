"""
StudyPulse Main Backend Server
Unifies MongoDB REST APIs and static frontend serving in a high-performance Bottle WSGI server.
Features:
- Robust WSGI-level CORS middleware supporting all local and remote origins
- Auto-seeding of MongoDB Atlas collections on first launch
- Serves both REST APIs at /api/... and Single Page Frontend at /
- Health check and DB status at /api/health
"""

import os
import sys
import io

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

# Ensure project root is in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

def load_dotenv():
    env_file = os.path.join(PROJECT_ROOT, ".env")
    if os.path.exists(env_file):
        try:
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        k = k.strip()
                        v = v.strip().strip("'\"")
                        if k and v and k not in os.environ:
                            os.environ[k] = v
        except Exception:
            pass

load_dotenv()

from bottle import Bottle, request, response, static_file, run
from backend.config.db import get_db, is_connected, get_db_info
from backend.seeder import seed_database

# Import Route Blueprints
from backend.routes.auth_routes import auth_app
from backend.routes.notes_routes import notes_app
from backend.routes.tests_routes import tests_app
from backend.routes.jobs_routes import jobs_app
from backend.routes.syllabus_routes import syllabus_app
from backend.routes.exams_routes import exams_app
from backend.routes.tasks_routes import tasks_app
from backend.routes.dashboard_routes import dashboard_app
from backend.routes.admin_routes import admin_app
from backend.routes.materials_routes import materials_app
from backend.routes.ai_routes import ai_app

app = Bottle()

FRONTEND_DIR = os.path.join(PROJECT_ROOT, "frontend")

# ==========================================
# WSGI CORS Middleware
# ==========================================
class CorsMiddleware:
    """WSGI middleware ensuring 100% reliable CORS and preflight OPTIONS handling"""
    def __init__(self, wsgi_app):
        self.wsgi_app = wsgi_app

    def __call__(self, environ, start_response):
        # Intercept any preflight OPTIONS requests directly
        if environ.get('REQUEST_METHOD') == 'OPTIONS':
            headers = [
                ('Access-Control-Allow-Origin', '*'),
                ('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'),
                ('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, x-user-id, Cache-Control, X-Requested-With'),
                ('Access-Control-Allow-Private-Network', 'true'),
                ('Access-Control-Max-Age', '86400'),
                ('Content-Type', 'text/plain; charset=utf-8'),
                ('Content-Length', '0')
            ]
            start_response('200 OK', headers)
            return [b'']

        def custom_start_response(status, response_headers, exc_info=None):
            header_dict = {h[0].lower(): h[1] for h in response_headers}
            if 'access-control-allow-origin' not in header_dict:
                response_headers.append(('Access-Control-Allow-Origin', '*'))
            if 'access-control-allow-methods' not in header_dict:
                response_headers.append(('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'))
            if 'access-control-allow-headers' not in header_dict:
                response_headers.append(('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, x-user-id, Cache-Control, X-Requested-With'))
            if 'access-control-allow-private-network' not in header_dict:
                response_headers.append(('Access-Control-Allow-Private-Network', 'true'))
            return start_response(status, response_headers, exc_info)

        return self.wsgi_app(environ, custom_start_response)

wsgi_app = CorsMiddleware(app)

# Bottle after_request hook
@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id, Cache-Control, X-Requested-With'
    response.headers['Access-Control-Allow-Private-Network'] = 'true'

# Catch-all OPTIONS route for preflight requests
@app.route('/<:re:.*>', method=['OPTIONS'])
def options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id, Cache-Control, X-Requested-With'
    response.headers['Access-Control-Allow-Private-Network'] = 'true'
    return ""

# ==========================================
# Health Check & API Status Endpoint
# ==========================================
@app.route('/api/health', method=['GET'])
def health_check():
    db = get_db()
    info = get_db_info()
    connected = db is not None
    coll_counts = {}
    if connected:
        for name in ['users', 'notes', 'tests', 'jobs', 'syllabus', 'exams', 'tasks', 'test_results', 'materials']:
            try:
                coll_counts[name] = db[name].count_documents({})
            except Exception:
                coll_counts[name] = 0

    response.content_type = "application/json; charset=utf-8"
    return {
        "app": "StudyPulse Smart Study & Govt Exam Prep Server",
        "status": "online",
        "database": {
            "type": info.get("type", "MongoDB"),
            "mode": info.get("mode", "local"),
            "name": db.name if connected else "studypulse_db",
            "connected": connected,
            "collections": coll_counts
        },
        "endpoints": [
            "/api/users/login",
            "/api/users/signup",
            "/api/users/profile",
            "/api/notes",
            "/api/tests",
            "/api/tests/history",
            "/api/jobs",
            "/api/syllabus",
            "/api/exams",
            "/api/tasks",
            "/api/materials",
            "/api/dashboard/stats"
        ]
    }

# ==========================================
# Mount Modular API Routes
# ==========================================
app.mount('/api/users', auth_app)
app.mount('/api/notes', notes_app)
app.mount('/api/tests', tests_app)
app.mount('/api/jobs', jobs_app)
app.mount('/api/syllabus', syllabus_app)
app.mount('/api/exams', exams_app)
app.mount('/api/tasks', tasks_app)
app.mount('/api/dashboard', dashboard_app)
app.mount('/api/materials', materials_app)
app.mount('/api/admin', admin_app)
app.mount('/api/ai', ai_app)

# ==========================================
# Static Frontend Serving & Admin Route
# ==========================================
# Static Frontend Serving & PWA Routes
# ==========================================
@app.route('/')
@app.route('/studypulse')
@app.route('/app')
def serve_index():
    return static_file('index.html', root=FRONTEND_DIR)

@app.route('/manifest.json')
def serve_manifest():
    return static_file('manifest.json', root=FRONTEND_DIR, mimetype='application/manifest+json')

@app.route('/sw.js')
def serve_sw():
    return static_file('sw.js', root=FRONTEND_DIR, mimetype='application/javascript')

@app.route('/admin')
@app.route('/admin/<subpath:path>')
def serve_admin(subpath=None):
    return static_file('admin.html', root=FRONTEND_DIR)

@app.route('/uploads/<filepath:path>')
def serve_uploads(filepath):
    uploads_dir = os.path.join(FRONTEND_DIR, 'uploads')
    return static_file(filepath, root=uploads_dir)

# ==========================================
from backend.tunnel_supervisor import get_tunnel_supervisor, init_tunnel_supervisor

# ==========================================
# Network Info & Tunnel Control Endpoints
# ==========================================
def get_local_ip():
    """Detect LAN/Wi-Fi IPv4 address of this machine"""
    import socket
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"

@app.route('/api/network-info')
def get_network_info():
    supervisor = get_tunnel_supervisor()
    status_info = supervisor.get_status_info() if supervisor else {}
    local_ip = get_local_ip()
    port = int(os.getenv("PORT", 5000))
    raw_public = status_info.get("public_url")

    # Fallback to public_url.txt if present
    if not raw_public:
        pub_file = os.path.join(PROJECT_ROOT, "public_url.txt")
        if os.path.exists(pub_file):
            try:
                with open(pub_file, 'r', encoding='utf-8') as f:
                    content = f.read().strip()
                    if content and "trycloudflare.com" in content:
                        raw_public = content.split("/studypulse")[0].strip()
            except Exception:
                pass

    if raw_public:
        raw_public = raw_public.split("/studypulse")[0].strip().rstrip("/")
        branded_public_url = f"{raw_public}/studypulse"
    else:
        branded_public_url = None

    response.content_type = "application/json; charset=utf-8"
    return {
        "success": True,
        "app_name": "StudyPulse",
        "local_ip": local_ip,
        "port": port,
        "localhost_url": f"http://localhost:{port}/studypulse",
        "mobile_wifi_url": f"http://{local_ip}:{port}/studypulse",
        "public_url": branded_public_url,
        "raw_public_url": raw_public,
        "tunnel_status": status_info.get("status", "online" if branded_public_url else "starting"),
        "tunnel_message": "StudyPulse ऑनलाइन क्लाउड सुरक्षित लिंक सक्रिय है" if branded_public_url else "StudyPulse क्लाउड लिंक तैयार हो रहा है...",
        "uptime_seconds": status_info.get("uptime_seconds", 0)
    }

@app.route('/api/tunnel/restart', method=['POST', 'GET'])
def restart_tunnel_endpoint():
    supervisor = get_tunnel_supervisor()
    if supervisor:
        supervisor.restart()
    response.content_type = "application/json; charset=utf-8"
    return {
        "success": True,
        "message": "StudyPulse टनल रीस्टार्ट प्रक्रिया शुरू कर दी गई है"
    }

@app.route('/<filepath:path>')
def serve_static(filepath):
    # Ensure not intercepting API routes
    if filepath.startswith('api/'):
        response.status = 404
        return {"error": "API route not found"}
    return static_file(filepath, root=FRONTEND_DIR)

# ==========================================
# Start Server Function
# ==========================================
def start_server(host="0.0.0.0", port=5000):
    print("=" * 65)
    print("  🚀 StudyPulse Full-Stack Server Starting...")
    print("=" * 65)

    # 1. Start tunnel supervisor immediately in background
    try:
        init_tunnel_supervisor(port=port)
    except Exception as e:
        print(f"[TUNNEL] Init notice: {e}")

    # 2. Asynchronously sync MongoDB Atlas collections (Non-blocking: server starts in <0.1s!)
    def _bg_seed():
        try:
            seed_database(force=False)
        except Exception as e:
            print(f"[INFO] Background database sync status: {e}")

    import threading
    threading.Thread(target=_bg_seed, name="BgDbSeedThread", daemon=True).start()

    local_ip = get_local_ip()
    pub_file = os.path.join(PROJECT_ROOT, "public_url.txt")
    public_url = None
    if os.path.exists(pub_file):
        try:
            with open(pub_file, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                if content and "trycloudflare.com" in content:
                    public_url = content
        except Exception:
            pass

    print("=" * 65)
    print(f"  ✓ Local PC Browser URL  : http://localhost:{port}")
    print(f"  ✓ Mobile / WiFi URL     : http://{local_ip}:{port}")
    if public_url:
        print(f"  ✓ Online / Public URL   : {public_url}")
    print(f"  ✓ API Health Endpoint   : http://localhost:{port}/api/health")
    print(f"  ✓ MongoDB Engine        : {'ONLINE' if is_connected() else 'INITIALIZING'}")
    print("=" * 65)
    print("  📱 Connect any Mobile / Tablet to same WiFi and open:")
    print(f"     👉 http://{local_ip}:{port}")
    if public_url:
        print(f"  🌐 Or open anywhere worldwide:")
        print(f"     👉 {public_url}")
    print("=" * 65)
    print("  Press Ctrl+C to stop the server.\n")

    is_quiet = os.getenv("QUIET", "0") == "1" or sys.stdout is None or not getattr(sys.stdout, 'isatty', lambda: False)()
    run(wsgi_app, host=host, port=port, quiet=is_quiet)

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    start_server(host=host, port=port)
