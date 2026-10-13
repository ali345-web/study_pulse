"""
RS Aggarwal & Study Notes REST API Routes
Provides CRUD endpoints for RS Aggarwal Mathematics formulas, shortcuts,
and student personal notes stored in MongoDB Atlas.
"""

from datetime import datetime
from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs

notes_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@notes_app.route('/<:re:.*>', method=['OPTIONS'])
def notes_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    return ""

@notes_app.route('/', method=['GET'])
def get_notes():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    user_id = request.query.get('userId')
    category = request.query.get('category')

    query = {}
    if user_id:
        # Include shared/system RS Aggarwal notes + user's own notes
        query["$or"] = [
            {"userId": None},
            {"userId": {"$exists": False}},
            {"userId": user_id}
        ]
    if category and category != 'all':
        query["category"] = category

    notes = list(db.notes.find(query).sort([("pinned", -1), ("chapterNumber", 1), ("_id", -1)]))
    serialized = serialize_docs(notes)

    return json_res({
        "success": True,
        "count": len(serialized),
        "data": serialized
    })

@notes_app.route('/', method=['POST'])
def create_note():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    title = (data.get("title") or "").strip()
    subject = (data.get("subject") or "सामान्य अध्ययन").strip()
    content = (data.get("content") or "").strip()
    pinned = bool(data.get("pinned", False))
    user_id = data.get("userId")

    if not title or not content:
        return json_res({"success": False, "message": "नोट्स का शीर्षक और विवरण आवश्यक हैं"}, 400)

    new_note = {
        "_id": f"note_{int(datetime.now().timestamp() * 1000)}",
        "title": title,
        "subject": subject,
        "content": content,
        "pinned": pinned,
        "userId": user_id,
        "createdAt": datetime.now().strftime("%d/%m/%Y")
    }

    db.notes.insert_one(new_note)
    return json_res({
        "success": True,
        "message": "नोट सफलतापूर्वक सेव हो गया!",
        "data": serialize_doc(new_note)
    }, 201)

@notes_app.route('/<note_id>/pin', method=['PUT', 'PATCH'])
def toggle_pin(note_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    note = db.notes.find_one({"_id": note_id})
    if not note:
        return json_res({"success": False, "message": "Note not found"}, 404)

    new_pin_status = data.get("pinned", not note.get("pinned", False))
    db.notes.update_one({"_id": note_id}, {"$set": {"pinned": new_pin_status}})

    return json_res({
        "success": True,
        "message": "पिन स्थिति अपडेट हो गई",
        "pinned": new_pin_status
    })

@notes_app.route('/<note_id>', method=['DELETE'])
def delete_note(note_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    res = db.notes.delete_one({"_id": note_id})
    if res.deleted_count == 0:
        return json_res({"success": False, "message": "Note not found"}, 404)

    return json_res({
        "success": True,
        "message": "नोट हटा दिया गया"
    })
