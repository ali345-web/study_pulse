"""
StudyPulse MongoDB Database Seeder & Sync Manager
Loads all required initial data into MongoDB Atlas:
- users
- notes (RS Aggarwal Solved Notes & Formulas)
- tests (Mock tests with questions & explanations)
- jobs (Govt jobs & exam notifications)
- syllabus (Syllabus subjects & topics)
- exams (Scheduled upcoming exams)
- tasks (Daily study targets)
- test_results (Student mock test history)
"""

import os
import sys
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend.config.db import get_db, is_connected

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

COLLECTIONS_MAP = {
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

def load_json_file(filename):
    """Loads a JSON file from backend/data"""
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except Exception as e:
            print(f"[ERROR] Failed to load {filename}: {e}")
            return []

def seed_database(force=False):
    """
    Seeds MongoDB collections from backend/data/*.json files.
    If force=False, only seeds collections that are empty or missing.
    """
    db = get_db()
    if db is None:
        print("[ERROR] Cannot seed database: MongoDB Atlas is unreachable.")
        return False

    print("=" * 60)
    print("  StudyPulse MongoDB Database Seeder & Sync")
    print("=" * 60)
    print(f"Target Database: {db.name}")

    total_inserted = 0
    total_updated = 0

    for collection_name, json_filename in COLLECTIONS_MAP.items():
        coll = db[collection_name]
        existing_count = coll.count_documents({})

        # If not forcing and collection already has records, skip unless forcing
        if existing_count > 0 and not force:
            print(f"  [EXISTS] Collection '{collection_name}' already has {existing_count} records. (Skipping, use force=True to re-sync)")
            continue

        records = load_json_file(json_filename)
        if not records:
            print(f"  [EMPTY] No records found in {json_filename} for collection '{collection_name}'.")
            continue

        coll_inserted = 0
        coll_updated = 0

        for item in records:
            item_id = item.get("_id") or item.get("id")
            if item_id:
                item["_id"] = str(item_id)
                res = coll.replace_one({"_id": item["_id"]}, item, upsert=True)
                if res.upserted_id:
                    coll_inserted += 1
                else:
                    coll_updated += 1
            else:
                coll.insert_one(item)
                coll_inserted += 1

        total_inserted += coll_inserted
        total_updated += coll_updated
        print(f"  [OK] Collection '{collection_name}': {len(records)} records processed (Inserted: {coll_inserted}, Updated: {coll_updated})")

    print("=" * 60)
    print(f"  [DONE] Seeding complete! Total Inserted: {total_inserted}, Updated: {total_updated}")
    print("=" * 60)
    return True

if __name__ == "__main__":
    force_sync = "--force" in sys.argv
    seed_database(force=force_sync)
