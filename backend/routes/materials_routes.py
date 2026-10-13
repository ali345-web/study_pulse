"""
Student Study Materials & PDF Notes REST API Routes
Provides read-only access for students to browse and download PDF notes
and study materials uploaded/managed by the Administrator in MongoDB Atlas.
"""

from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs

materials_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@materials_app.route('/<:re:.*>', method=['OPTIONS'])
def materials_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    return ""

@materials_app.route('/', method=['GET'])
def get_materials():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    category = request.query.get('category')
    query = {}
    if category and category != 'all':
        query["category"] = {"$regex": f"^{category}$", "$options": "i"}

    materials = list(db.materials.find(query).sort("_id", -1))
    return json_res({
        "success": True,
        "count": len(materials),
        "data": serialize_docs(materials)
    })

@materials_app.route('/<material_id>', method=['GET'])
def get_material_by_id(material_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    material = db.materials.find_one({"$or": [{"_id": material_id}, {"id": material_id}]})
    if not material:
        return json_res({"success": False, "message": "Study material not found"}, 404)

    return json_res({
        "success": True,
        "data": serialize_doc(material)
    })
