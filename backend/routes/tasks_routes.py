"""
Daily Study Targets & Goals REST API Routes
Provides CRUD endpoints for daily student targets and checklist items
stored in MongoDB Atlas.
"""

from datetime import datetime
from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs

tasks_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@tasks_app.route('/<:re:.*>', method=['OPTIONS'])
def tasks_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    return ""

@tasks_app.route('/', method=['GET'])
def get_tasks():
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

    tasks = list(db.tasks.find(query).sort("_id", -1))
    serialized = serialize_docs(tasks)

    return json_res({
        "success": True,
        "count": len(serialized),
        "data": serialized
    })

@tasks_app.route('/', method=['POST'])
def add_task():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    title = (data.get("title") or "").strip()
    user_id = data.get("userId")

    if not title:
        return json_res({"success": False, "message": "लक्ष्य का विवरण आवश्यक है"}, 400)

    new_task = {
        "_id": f"task_{int(datetime.now().timestamp() * 1000)}",
        "title": title,
        "completed": False,
        "userId": user_id,
        "date": datetime.now().strftime("%Y-%m-%d")
    }

    db.tasks.insert_one(new_task)
    return json_res({
        "success": True,
        "message": "नया लक्ष्य जोड़ा गया!",
        "data": serialize_doc(new_task)
    }, 201)

@tasks_app.route('/<task_id>', method=['PUT', 'PATCH'])
def toggle_task(task_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    task = db.tasks.find_one({"$or": [{"_id": task_id}, {"id": task_id}]})
    if not task:
        return json_res({"success": False, "message": "Task not found"}, 404)

    new_status = data.get("completed")
    if new_status is None:
        new_status = not bool(task.get("completed", False))

    db.tasks.update_one({"_id": task["_id"]}, {"$set": {"completed": bool(new_status)}})
    task["completed"] = bool(new_status)

    return json_res({
        "success": True,
        "message": "लक्ष्य स्थिति अपडेट हुई!",
        "data": serialize_doc(task)
    })

@tasks_app.route('/<task_id>', method=['DELETE'])
def delete_task(task_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    res = db.tasks.delete_one({"$or": [{"_id": task_id}, {"id": task_id}]})
    if res.deleted_count == 0:
        return json_res({"success": False, "message": "Task not found"}, 404)

    return json_res({
        "success": True,
        "message": "लक्ष्य हटा दिया गया!"
    })
