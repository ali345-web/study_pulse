"""
Dashboard Analytics REST API Routes
Aggregates student metrics across MongoDB collections:
- Syllabus completion rate
- Mock tests attempted & average score
- Study streak & coins
- Pending targets and upcoming exams
"""

from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs

dashboard_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@dashboard_app.route('/<:re:.*>', method=['OPTIONS'])
def dashboard_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    return ""

@dashboard_app.route('/stats', method=['GET'])
def get_dashboard_stats():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    user_id = request.query.get('userId')
    user = None
    if user_id:
        user = db.users.find_one({"$or": [{"_id": user_id}, {"id": user_id}]})

    # 1. Syllabus Calculation
    syl_query = {}
    if user_id:
        syl_query["$or"] = [{"userId": user_id}, {"userId": None}, {"userId": {"$exists": False}}]
    chapters = list(db.syllabus.find(syl_query))
    total_topics = 0
    completed_topics = 0
    for ch in chapters:
        topics = ch.get("topics", [])
        total_topics += len(topics)
        completed_topics += sum(1 for t in topics if t.get("completed"))
    syl_percent = round((completed_topics / total_topics) * 100) if total_topics > 0 else 0

    # 2. Test History & Average Score
    hist_query = {}
    if user_id:
        hist_query["$or"] = [{"userId": user_id}, {"userId": None}, {"userId": {"$exists": False}}]
    history = list(db.test_results.find(hist_query))
    tests_count = len(history)
    avg_score = round(sum(h.get("percentage", 0) for h in history) / tests_count) if tests_count > 0 else 0

    # 3. Tasks & Exams
    task_query = {}
    if user_id:
        task_query["$or"] = [{"userId": user_id}, {"userId": None}, {"userId": {"$exists": False}}]
    pending_tasks = db.tasks.count_documents({**task_query, "completed": False})

    exam_query = {}
    if user_id:
        exam_query["$or"] = [{"userId": user_id}, {"userId": None}, {"userId": {"$exists": False}}]
    upcoming_exams = db.exams.count_documents(exam_query)

    return json_res({
        "success": True,
        "stats": {
            "syllabusPercent": syl_percent,
            "completedTopics": completed_topics,
            "totalTopics": total_topics,
            "testsAttempted": tests_count,
            "avgScore": avg_score,
            "streak": user.get("streak", 1) if user else 1,
            "referralCoins": user.get("referralCoins", 100) if user else 100,
            "targetExam": user.get("targetExam", "SSC CGL / CHSL 2026") if user else "SSC CGL / CHSL 2026",
            "pendingTasks": pending_tasks,
            "upcomingExams": upcoming_exams
        }
    })
