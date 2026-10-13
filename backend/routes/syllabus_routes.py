"""
Syllabus Tracker REST API Routes
Provides CRUD endpoints for subject chapters, topics, and completion status
stored in MongoDB Atlas.
"""

from datetime import datetime
from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs, to_id_query

syllabus_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@syllabus_app.route('/<:re:.*>', method=['OPTIONS'])
def syllabus_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    return ""

@syllabus_app.route('/', method=['GET'])
def get_syllabus():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    user_id = request.query.get('userId')
    query = {}
    if user_id:
        query["$or"] = [
            {"userId": user_id},
            {"userId": None},
            {"userId": {"$exists": False}}
        ]

    chapters = list(db.syllabus.find(query).sort("_id", 1))
    serialized = serialize_docs(chapters)

    return json_res({
        "success": True,
        "count": len(serialized),
        "data": serialized
    })

@syllabus_app.route('/<chapter_id>/topics/<topic_id>', method=['PUT', 'PATCH'])
def toggle_topic_completion(chapter_id, topic_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    chapter = db.syllabus.find_one(to_id_query(chapter_id))
    if not chapter:
        return json_res({"success": False, "message": "Chapter not found"}, 404)

    completed = data.get("completed")
    topics = chapter.get("topics", [])
    topic_found = False

    for t in topics:
        if str(t.get("id")) == str(topic_id):
            topic_found = True
            if completed is not None:
                t["completed"] = bool(completed) if not isinstance(completed, str) else (completed.lower() in ['true', '1'])
            else:
                t["completed"] = not bool(t.get("completed", False))
            break

    if not topic_found:
        return json_res({"success": False, "message": "Topic not found in chapter"}, 404)

    db.syllabus.update_one(
        {"_id": chapter["_id"]},
        {"$set": {"topics": topics}}
    )

    return json_res({
        "success": True,
        "message": "टॉपिक स्थिति सफलतापूर्वक अपडेट हुई!",
        "chapter": serialize_doc(chapter)
    })

@syllabus_app.route('/', method=['POST'])
def add_chapter():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    subject = (data.get("subject") or "सामान्य").strip()
    chapter_name = (data.get("chapter") or "").strip()
    topics_raw = data.get("topics") or []
    user_id = data.get("userId")

    if not chapter_name:
        return json_res({"success": False, "message": "अध्याय का नाम आवश्यक है"}, 400)

    formatted_topics = []
    if isinstance(topics_raw, list):
        for idx, t in enumerate(topics_raw):
            if isinstance(t, dict):
                formatted_topics.append({
                    "id": t.get("id") or f"top_{int(datetime.now().timestamp())}_{idx}",
                    "name": t.get("name") or str(t),
                    "completed": bool(t.get("completed", False))
                })
            else:
                formatted_topics.append({
                    "id": f"top_{int(datetime.now().timestamp())}_{idx}",
                    "name": str(t).strip(),
                    "completed": False
                })

    new_chapter = {
        "_id": f"syl_{int(datetime.now().timestamp() * 1000)}",
        "subject": subject,
        "chapter": chapter_name,
        "topics": formatted_topics,
        "userId": user_id
    }

    db.syllabus.insert_one(new_chapter)
    return json_res({
        "success": True,
        "message": "नया अध्याय सिलेबस में जोड़ा गया!",
        "data": serialize_doc(new_chapter)
    }, 201)

@syllabus_app.route('/<chapter_id>', method=['DELETE'])
def delete_chapter(chapter_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    res = db.syllabus.delete_one(to_id_query(chapter_id))
    if res.deleted_count == 0:
        return json_res({"success": False, "message": "Chapter not found"}, 404)

    return json_res({
        "success": True,
        "message": "अध्याय सिलेबस से हटा दिया गया!"
    })
