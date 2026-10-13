"""
StudyPulse MongoDB Seeder & Sync Manager
Connects to MongoDB (Local or Atlas) and creates/syncs all collections:
- users
- notes (RS Aggarwal)
- tests
- jobs
- syllabus
"""

import os
import sys
import io
import json

# Ensure safe UTF-8 terminal printing on Windows
if sys.stdout and hasattr(sys.stdout, 'buffer'):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    except Exception:
        pass

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, PyMongoError

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
DEFAULT_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = "studypulse_db"

def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

def seed_database(uri=None):
    target_uri = uri or DEFAULT_URI
    print("=" * 60)
    print("  StudyPulse MongoDB Data Creator & Seeder")
    print("=" * 60)
    print(f"Connecting to MongoDB: {target_uri}")

    try:
        client = MongoClient(target_uri, serverSelectionTimeoutMS=2500)
        client.admin.command('ping')
        print("[SUCCESS] MongoDB Server connected successfully!\n")
    except (ConnectionFailure, ServerSelectionTimeoutError, Exception) as e:
        print("\n[INFO] लोकल MongoDB सर्वर (port 27017) अभी कनेक्ट नहीं हुआ।")
        print("[OK] परंतु आपकी सभी 5 कलेक्शन्स का संपूर्ण डेटा 'mongodb_data/' फोल्डर में तैयार है!")
        print("\n💡 MongoDB Atlas (क्लाउड) से कनेक्ट करने के लिए:")
        print("  python seed_mongodb.py --uri \"mongodb+srv://<username>:<password>@cluster.mongodb.net/\"")
        print("\n📂 तैयार फाइल्स:")
        for f in os.listdir(DATA_DIR):
            if f.endswith('.json'):
                p = os.path.join(DATA_DIR, f)
                print(f"  - mongodb_data/{f} ({os.path.getsize(p)} bytes)")
        return False

    db = client[DB_NAME]

    collections_map = {
        "users": "users.json",
        "notes": "notes.json",
        "tests": "tests.json",
        "jobs": "jobs.json",
        "syllabus": "syllabus.json"
    }

    print(f"Database: '{DB_NAME}' में डेटा तैयार किया जा रहा है...\n")

    for coll_name, filename in collections_map.items():
        docs = load_json(filename)
        if not docs:
            print(f"  - {coll_name}: कोई डेटा नहीं मिला ({filename})")
            continue

        collection = db[coll_name]
        inserted = 0
        updated = 0

        for doc in docs:
            doc_id = doc.get("_id")
            if doc_id:
                res = collection.replace_one({"_id": doc_id}, doc, upsert=True)
                if res.upserted_id:
                    inserted += 1
                else:
                    updated += 1
            else:
                collection.insert_one(doc)
                inserted += 1

        print(f"  [OK] Collection '{coll_name}': {len(docs)} रिकॉर्ड्स सुरक्षित सेव किए गए (Inserted: {inserted}, Updated: {updated})")

    print("\n" + "=" * 60)
    print("  बधाई! आपका StudyPulse MongoDB डेटाबेस सफलतापूर्वक बन गया है!")
    print("=" * 60)
    print(f"Database Name: {DB_NAME}")
    print(f"Collections: {', '.join(collections_map.keys())}")
    print("=" * 60)
    return True

if __name__ == "__main__":
    uri_arg = None
    if len(sys.argv) > 1:
        if sys.argv[1] == "--uri" and len(sys.argv) > 2:
            uri_arg = sys.argv[2]
        else:
            uri_arg = sys.argv[1]
    
    seed_database(uri_arg)
