"""
StudyPulse MongoDB REST API Server
Provides JSON REST API endpoints connected to MongoDB (with local JSON fallback):
- GET  /api/users
- POST /api/users/signup
- POST /api/users/login
- GET  /api/notes
- GET  /api/tests
- GET  /api/jobs
- GET  /api/syllabus
"""

import os
import sys
import io
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

# Ensure safe UTF-8 terminal printing
if sys.stdout and hasattr(sys.stdout, 'buffer'):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    except Exception:
        pass

from pymongo import MongoClient

PORT = 5000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "mongodb_data")

def load_dotenv():
    env_path = os.path.join(BASE_DIR, ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip().strip("'\"")

load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = "studypulse_db"

# Try connecting to MongoDB
mongo_db = None
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
    client.admin.command('ping')
    mongo_db = client[DB_NAME]
    print("[SUCCESS] MongoDB Server से कनेक्टेड है!")
except Exception:
    print("[INFO] MongoDB Server ऑफलाइन है, लोकल 'mongodb_data/' JSON मोड सक्रिय है।")

def load_file(fname):
    p = os.path.join(DATA_DIR, fname)
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_file(fname, data):
    p = os.path.join(DATA_DIR, fname)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def serialize_docs(cursor):
    docs = []
    for d in cursor:
        if "_id" in d:
            d["_id"] = str(d["_id"])
        docs.append(d)
    return docs

class MongoAPIHandler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(json.dumps(payload, ensure_ascii=False).encode("utf-8"))

    def do_OPTIONS(self):
        self._send_json(200, {"status": "ok"})

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/users":
            data = serialize_docs(mongo_db.users.find({}, {"password": 0})) if mongo_db is not None else load_file("users.json")
            self._send_json(200, {"success": True, "count": len(data), "data": data})

        elif path == "/api/notes":
            data = serialize_docs(mongo_db.notes.find()) if mongo_db is not None else load_file("notes.json")
            self._send_json(200, {"success": True, "count": len(data), "data": data})

        elif path == "/api/tests":
            data = serialize_docs(mongo_db.tests.find()) if mongo_db is not None else load_file("tests.json")
            self._send_json(200, {"success": True, "count": len(data), "data": data})

        elif path == "/api/jobs":
            data = serialize_docs(mongo_db.jobs.find()) if mongo_db is not None else load_file("jobs.json")
            self._send_json(200, {"success": True, "count": len(data), "data": data})

        elif path == "/api/syllabus":
            data = serialize_docs(mongo_db.syllabus.find()) if mongo_db is not None else load_file("syllabus.json")
            self._send_json(200, {"success": True, "count": len(data), "data": data})

        elif path == "/":
            self._send_json(200, {
                "app": "StudyPulse MongoDB API Server",
                "status": "online",
                "mongoConnected": mongo_db is not None,
                "endpoints": [
                    "/api/users",
                    "/api/notes",
                    "/api/tests",
                    "/api/jobs",
                    "/api/syllabus"
                ]
            })
        else:
            self._send_json(404, {"error": "Endpoint not found"})

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            req_data = json.loads(body)
        except Exception:
            req_data = {}

        if path == "/api/users/signup":
            username = req_data.get("username", "").strip()
            password = req_data.get("password", "")
            name = req_data.get("name", "")

            if not username or not password:
                self._send_json(400, {"success": False, "message": "Username and password required"})
                return

            users = load_file("users.json")
            if any(u.get("username", "").lower() == username.lower() for u in users):
                self._send_json(400, {"success": False, "message": "Username already exists"})
                return

            new_user = {
                "_id": f"usr_{int(os.times().system * 1000)}",
                "name": name or username,
                "username": username,
                "password": password,
                "avatar": req_data.get("avatar", "👨‍🎓"),
                "referralCode": f"SP-{int(os.urandom(3).hex(), 16) % 900000 + 100000}",
                "referralCount": 0,
                "referralCoins": 100,
                "streak": 1
            }

            if mongo_db is not None:
                mongo_db.users.insert_one(new_user)
            users.append(new_user)
            save_file("users.json", users)

            self._send_json(201, {"success": True, "message": "User created in MongoDB!", "user": new_user})

        elif path == "/api/users/login":
            username = req_data.get("username", "").strip()
            password = req_data.get("password", "")

            users = load_file("users.json")
            matched = next((u for u in users if u.get("username", "").lower() == username.lower()), None)

            if not matched:
                self._send_json(404, {"success": False, "message": "User not found"})
                return
            if matched.get("password") != password:
                self._send_json(401, {"success": False, "message": "Invalid password"})
                return

            self._send_json(200, {"success": True, "message": "Login successful", "user": matched})
        else:
            self._send_json(404, {"error": "Endpoint not found"})

def run_server():
    server = HTTPServer(("127.0.0.1", PORT), MongoAPIHandler)
    print("=" * 60)
    print(f"  StudyPulse MongoDB API Server चल रहा है:")
    print(f"  URL: http://127.0.0.1:{PORT}")
    print("=" * 60)
    print("  उपलब्ध API Endpoints:")
    print(f"  - GET  http://127.0.0.1:{PORT}/api/users")
    print(f"  - GET  http://127.0.0.1:{PORT}/api/notes")
    print(f"  - GET  http://127.0.0.1:{PORT}/api/tests")
    print(f"  - GET  http://127.0.0.1:{PORT}/api/jobs")
    print(f"  - GET  http://127.0.0.1:{PORT}/api/syllabus")
    print(f"  - POST http://127.0.0.1:{PORT}/api/users/signup")
    print("=" * 60)
    print("रोकने के लिए Ctrl + C दबाएं।")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nसर्वर बंद कर दिया गया।")

if __name__ == "__main__":
    run_server()
