"""
Government Job Alerts REST API Routes
Provides live competitive exam updates, vacancy numbers, eligibility,
and syllabus patterns stored in MongoDB Atlas.
"""

from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs

jobs_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@jobs_app.route('/<:re:.*>', method=['OPTIONS'])
def jobs_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    return ""

@jobs_app.route('/', method=['GET'])
def get_jobs():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    category = request.query.get('category', 'all').lower()
    query = {}
    if category != 'all':
        query["category"] = {"$regex": f"^{category}$", "$options": "i"}

    jobs = list(db.jobs.find(query).sort("_id", 1))
    serialized = serialize_docs(jobs)

    return json_res({
        "success": True,
        "count": len(serialized),
        "data": serialized
    })

@jobs_app.route('/<job_id>', method=['GET'])
def get_job_by_id(job_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    job = db.jobs.find_one({"$or": [{"_id": job_id}, {"id": job_id}]})
    if not job:
        return json_res({"success": False, "message": "Job notification not found"}, 404)

    return json_res({
        "success": True,
        "data": serialize_doc(job)
    })
