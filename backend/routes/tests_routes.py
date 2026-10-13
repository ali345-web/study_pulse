"""
Competitive Mock Tests & Test Results REST API Routes
Provides endpoints to fetch mock tests (SSC CGL, Railway NTPC, Banking)
and record student test performance in MongoDB Atlas.
"""

from datetime import datetime
from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs

tests_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@tests_app.route('/<:re:.*>', method=['OPTIONS'])
def tests_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    return ""

@tests_app.route('/', method=['GET'])
def get_tests():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    tests = list(db.tests.find().sort("_id", 1))
    serialized = serialize_docs(tests)

    return json_res({
        "success": True,
        "count": len(serialized),
        "data": serialized
    })

@tests_app.route('/<test_id>', method=['GET'])
def get_test_by_id(test_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    test = db.tests.find_one({"$or": [{"_id": test_id}, {"id": test_id}]})
    if not test:
        return json_res({"success": False, "message": "Test not found"}, 404)

    return json_res({
        "success": True,
        "data": serialize_doc(test)
    })

@tests_app.route('/history', method=['GET'])
def get_test_history():
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

    history = list(db.test_results.find(query).sort("timestamp", -1).limit(50))
    # If no results found, return empty or fallback
    serialized = serialize_docs(history)

    return json_res({
        "success": True,
        "count": len(serialized),
        "data": serialized
    })

@tests_app.route('/history', method=['POST'])
def save_test_result():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    user_id = data.get("userId") or "usr_anonymous"
    test_id = data.get("testId") or "test_unknown"
    test_title = data.get("testTitle") or "प्रतियोगी मॉक टेस्ट"
    subject = data.get("subject") or "सामान्य"
    score = data.get("score") or "0 / 0"
    percentage = int(data.get("percentage") or 0)
    status = data.get("status") or ("उत्कृष्ट (Passed)" if percentage >= 60 else "प्रयास जारी रखें")
    time_taken = data.get("timeTaken") or "10m 00s"
    date_str = data.get("date") or datetime.now().strftime("%d/%m/%Y")

    new_result = {
        "_id": f"hist_{int(datetime.now().timestamp() * 1000)}",
        "userId": user_id,
        "testId": test_id,
        "testTitle": test_title,
        "subject": subject,
        "score": score,
        "percentage": percentage,
        "status": status,
        "timeTaken": time_taken,
        "date": date_str,
        "timestamp": datetime.now().isoformat()
    }

    db.test_results.insert_one(new_result)

    # Award bonus coins for completing test
    if user_id and user_id != "usr_anonymous":
        db.users.update_one(
            {"_id": user_id},
            {"$inc": {"referralCoins": 50}}
        )

    return json_res({
        "success": True,
        "message": "मॉक टेस्ट परिणाम सफलतापूर्वक सेव हो गया (+50 कॉइन्स प्राप्त हुए)!",
        "data": serialize_doc(new_result)
    }, 201)
