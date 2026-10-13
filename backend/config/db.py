"""
StudyPulse MongoDB Connection Manager
Handles connection to MongoDB Atlas with seamless High-Performance Local JSON fallback,
environment configuration loading, and JSON document serialization.
"""

import os
import sys
import io
import json
import re
from datetime import datetime
from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

# Path references
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BACKEND_DATA_DIR = os.path.join(BASE_DIR, "backend", "data")
MONGODB_DATA_DIR = os.path.join(BASE_DIR, "mongodb_data")
ENV_PATH = os.path.join(BASE_DIR, ".env")

def load_env():
    """Load key-value pairs from .env file into os.environ"""
    if os.path.exists(ENV_PATH):
        with open(ENV_PATH, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip().strip("'\"")

load_env()

MONGODB_URI = os.getenv(
    "MONGODB_URI",
    "mongodb+srv://toshifali014_db_user:%40toshif7415@studypulse.asoqvuh.mongodb.net/studypulse_db?retryWrites=true&w=majority"
)
DB_NAME = os.getenv("DB_NAME", "studypulse_db")

_client = None
_db = None
_db_mode = "offline"  # "atlas" or "local"

COLLECTION_FILE_MAP = {
    "users": "users.json",
    "notes": "notes.json",
    "tests": "tests.json",
    "jobs": "jobs.json",
    "syllabus": "syllabus.json",
    "exams": "exams.json",
    "tasks": "tasks.json",
    "test_results": "test_history.json",
    "materials": "materials.json",
    "courses": "courses.json",
    "subjects": "subjects.json",
    "announcements": "announcements.json",
    "notifications": "notifications.json",
    "settings": "settings.json"
}

def normalize_query(q):
    """
    Normalizes query dictionary so it works consistently across both
    native MongoDB and in-memory mongomock (e.g. converting $regex string dicts to compiled re).
    """
    if not isinstance(q, dict):
        return q
    res = {}
    for k, v in q.items():
        if isinstance(v, dict):
            if "$regex" in v:
                pat = v["$regex"]
                flags = re.IGNORECASE if "i" in v.get("$options", "") else 0
                try:
                    res[k] = re.compile(pat, flags)
                except Exception:
                    res[k] = pat
            else:
                res[k] = normalize_query(v)
        elif isinstance(v, list):
            res[k] = [normalize_query(item) for item in v]
        else:
            res[k] = v
    return res

def to_id_query(id_val):
    """Generates a MongoDB query matching both string and ObjectId representations"""
    str_val = str(id_val)
    candidates = [{"_id": str_val}, {"id": str_val}]
    if ObjectId.is_valid(str_val):
        try:
            candidates.append({"_id": ObjectId(str_val)})
        except Exception:
            pass
    return {"$or": candidates}

class PersistentCollectionWrapper:
    """
    Wraps a mongomock Collection to provide automatic JSON file persistence
    and unified query compatibility.
    """
    def __init__(self, coll, collection_name, json_filename):
        self._coll = coll
        self._name = collection_name
        self._json_filename = json_filename
        self._backend_path = os.path.join(BACKEND_DATA_DIR, json_filename)
        self._mongodb_path = os.path.join(MONGODB_DATA_DIR, json_filename)

    def _sync(self):
        """Persists collection contents to disk in JSON format"""
        docs = list(self._coll.find())
        clean_docs = []
        for d in docs:
            item = dict(d)
            if "_id" in item:
                item["_id"] = str(item["_id"])
            if "id" in item and isinstance(item["id"], ObjectId):
                item["id"] = str(item["id"])
            clean_docs.append(item)

        for p in [self._backend_path, self._mongodb_path]:
            try:
                parent = os.path.dirname(p)
                if os.path.exists(parent):
                    with open(p, "w", encoding="utf-8") as f:
                        json.dump(clean_docs, f, ensure_ascii=False, indent=2)
            except Exception as e:
                print(f"[WARN] Failed to sync {p}: {e}")

    def find(self, filter=None, *args, **kwargs):
        norm_filter = normalize_query(filter or {})
        return self._coll.find(norm_filter, *args, **kwargs)

    def find_one(self, filter=None, *args, **kwargs):
        norm_filter = normalize_query(filter or {})
        return self._coll.find_one(norm_filter, *args, **kwargs)

    def count_documents(self, filter=None, *args, **kwargs):
        norm_filter = normalize_query(filter or {})
        return self._coll.count_documents(norm_filter, *args, **kwargs)

    def insert_one(self, doc, *args, **kwargs):
        res = self._coll.insert_one(doc, *args, **kwargs)
        self._sync()
        return res

    def insert_many(self, docs, *args, **kwargs):
        res = self._coll.insert_many(docs, *args, **kwargs)
        self._sync()
        return res

    def update_one(self, filter, update, *args, **kwargs):
        norm_filter = normalize_query(filter)
        res = self._coll.update_one(norm_filter, update, *args, **kwargs)
        self._sync()
        return res

    def update_many(self, filter, update, *args, **kwargs):
        norm_filter = normalize_query(filter)
        res = self._coll.update_many(norm_filter, update, *args, **kwargs)
        self._sync()
        return res

    def replace_one(self, filter, replacement, *args, **kwargs):
        norm_filter = normalize_query(filter)
        res = self._coll.replace_one(norm_filter, replacement, *args, **kwargs)
        self._sync()
        return res

    def delete_one(self, filter, *args, **kwargs):
        norm_filter = normalize_query(filter)
        res = self._coll.delete_one(norm_filter, *args, **kwargs)
        self._sync()
        return res

    def delete_many(self, filter, *args, **kwargs):
        norm_filter = normalize_query(filter)
        res = self._coll.delete_many(norm_filter, *args, **kwargs)
        self._sync()
        return res

    def __getattr__(self, name):
        return getattr(self._coll, name)

class LocalDatabaseProxy:
    """
    Proxies database access to persistent mongomock collections
    mapped to backend/data JSON files.
    """
    def __init__(self, raw_db):
        self._raw_db = raw_db
        self.name = DB_NAME
        self._collections = {}
        self._load_all_data()

    def _load_all_data(self):
        for coll_name, fname in COLLECTION_FILE_MAP.items():
            raw_coll = self._raw_db[coll_name]
            p = os.path.join(BACKEND_DATA_DIR, fname)
            if not os.path.exists(p):
                p = os.path.join(MONGODB_DATA_DIR, fname)

            if os.path.exists(p):
                try:
                    with open(p, "r", encoding="utf-8") as f:
                        records = json.load(f)
                    if isinstance(records, list):
                        for r in records:
                            item = dict(r)
                            if "_id" in item:
                                item["_id"] = str(item["_id"])
                            raw_coll.replace_one({"_id": item["_id"]}, item, upsert=True)
                except Exception as e:
                    print(f"[WARN] Error loading data for {coll_name}: {e}")

            self._collections[coll_name] = PersistentCollectionWrapper(raw_coll, coll_name, fname)

    def __getitem__(self, name):
        if name not in self._collections:
            fname = COLLECTION_FILE_MAP.get(name, f"{name}.json")
            self._collections[name] = PersistentCollectionWrapper(self._raw_db[name], name, fname)
        return self._collections[name]

    def __getattr__(self, name):
        if name in self.__dict__:
            return self.__dict__[name]
        return self[name]

def init_local_fallback():
    """Initializes the in-memory mongomock database populated from local JSON files"""
    global _client, _db, _db_mode
    import mongomock
    mock_client = mongomock.MongoClient()
    raw_db = mock_client[DB_NAME]
    _db = LocalDatabaseProxy(raw_db)
    _client = mock_client
    _db_mode = "local"
    print(f"[SUCCESS] High-Performance Persistent Local Database Initialized ('{DB_NAME}' with JSON Sync)!")

def get_mongo_client():
    """Initializes and returns the singleton MongoClient (Atlas or Local Persistent)"""
    global _client, _db, _db_mode
    if _client is None:
        # 1. Attempt connection to MongoDB Atlas
        try:
            tls_kwargs = {}
            try:
                import certifi
                tls_kwargs["tlsCAFile"] = certifi.where()
            except Exception:
                pass

            client_candidate = MongoClient(
                MONGODB_URI,
                serverSelectionTimeoutMS=3000,
                connectTimeoutMS=3000,
                **tls_kwargs
            )
            # Ping to verify active connection
            client_candidate.admin.command('ping')
            _client = client_candidate
            _db = _client[DB_NAME]
            _db_mode = "atlas"
            print(f"[SUCCESS] Connected to MongoDB Atlas Cloud database: '{DB_NAME}'")
        except Exception as err:
            print(f"[INFO] MongoDB Atlas Cloud connection deferred ({err}).")
            print("[INFO] Seamlessly falling back to Persistent Local JSON Database mode.")
            init_local_fallback()

    return _client

def get_db():
    """Returns the active MongoDB database instance (Atlas Cloud or Local Persistent)"""
    global _db
    if _db is None:
        get_mongo_client()
    return _db

def is_connected():
    """Returns True as database is guaranteed available (Atlas or Local Fallback)"""
    return get_db() is not None

def get_db_info():
    """Returns database connection diagnostic info"""
    return {
        "connected": True,
        "mode": _db_mode,
        "type": "MongoDB Atlas (Cloud)" if _db_mode == "atlas" else "Local Persistent JSON Engine",
        "name": DB_NAME
    }

def serialize_doc(doc):
    """Recursively formats BSON ObjectId and datetime into JSON-serializable types"""
    if not doc:
        return doc
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, dict):
        res = {}
        for k, v in doc.items():
            if isinstance(v, ObjectId):
                res[k] = str(v)
            elif isinstance(v, datetime):
                res[k] = v.isoformat()
            elif isinstance(v, (dict, list)):
                res[k] = serialize_doc(v)
            else:
                res[k] = v
        # Ensure 'id' alias exists if '_id' is present
        if "_id" in res and "id" not in res:
            res["id"] = str(res["_id"])
        return res
    return doc

def serialize_docs(cursor):
    """Serializes a MongoDB cursor or list of documents"""
    return [serialize_doc(doc) for doc in cursor]
