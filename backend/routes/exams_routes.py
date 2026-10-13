"""
Exam Schedule REST API Routes
Provides CRUD endpoints for student upcoming competitive exam dates and details
stored in MongoDB Atlas.
"""

from datetime import datetime
from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs

exams_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@exams_app.route('/<:re:.*>', method=['OPTIONS'])
def exams_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    return ""

@exams_app.route('/', method=['GET'])
def get_exams():
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

    exams = list(db.exams.find(query).sort("date", 1))
    serialized = serialize_docs(exams)

    return json_res({
        "success": True,
        "count": len(serialized),
        "data": serialized
    })

@exams_app.route('/', method=['POST'])
def add_exam():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    title = (data.get("title") or "").strip()
    subject = (data.get("subject") or "").strip()
    date_val = (data.get("date") or "").strip()
    time_val = (data.get("time") or "09:30").strip()
    mode = (data.get("mode") or "ऑनलाइन (CBT)").strip()
    notes = (data.get("notes") or "").strip()
    user_id = data.get("userId")

    if not title or not subject or not date_val:
        return json_res({"success": False, "message": "परीक्षा का नाम, विषय और तिथि आवश्यक हैं"}, 400)

    new_exam = {
        "_id": f"exam_{int(datetime.now().timestamp() * 1000)}",
        "title": title,
        "subject": subject,
        "date": date_val,
        "time": time_val,
        "mode": mode,
        "notes": notes,
        "status": "upcoming",
        "userId": user_id
    }

    db.exams.insert_one(new_exam)
    return json_res({
        "success": True,
        "message": "आगामी परीक्षा अनुसूची में जोड़ी गई!",
        "data": serialize_doc(new_exam)
    }, 201)

@exams_app.route('/<exam_id>', method=['DELETE'])
def delete_exam(exam_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    res = db.exams.delete_one({"$or": [{"_id": exam_id}, {"id": exam_id}]})
    if res.deleted_count == 0:
        return json_res({"success": False, "message": "Exam not found"}, 404)

    return json_res({
        "success": True,
        "message": "परीक्षा हटा दी गई!"
    })
