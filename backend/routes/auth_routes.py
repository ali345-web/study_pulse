"""
Authentication & User Management Routes
Provides REST API endpoints for User Registration, Login, Profile updates,
Referral Rewards, and Leaderboards connected to MongoDB Atlas.
"""

import os
import re
import random
from datetime import datetime
from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs
from backend.utils.auth_helper import hash_password, verify_password, generate_auth_token

auth_app = Bottle()

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

# Preflight OPTIONS handler for /api/users/*
@auth_app.route('/<:re:.*>', method=['OPTIONS'])
def options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-user-id'
    response.headers['Access-Control-Allow-Private-Network'] = 'true'
    return ""

@auth_app.route('/login', method=['POST'])
def handle_login():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "MongoDB Atlas डेटाबेस से संपर्क नहीं हो सका। कृपया सर्वर व इंटरनेट जांचें।"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    identifier = (data.get("username") or data.get("identifier") or data.get("email") or "").strip()
    password = data.get("password") or ""

    if not identifier or not password:
        return json_res({"success": False, "message": "यूज़रनेम और पासवर्ड दोनों आवश्यक हैं (Username & password required)"}, 400)

    # Search user case-insensitively across username, name, email, phone, and _id
    escaped = re.escape(identifier)
    query = {
        "$or": [
            {"username": {"$regex": f"^{escaped}$", "$options": "i"}},
            {"name": {"$regex": f"^{escaped}$", "$options": "i"}},
            {"email": {"$regex": f"^{escaped}$", "$options": "i"}},
            {"phone": identifier},
            {"mobile": identifier},
            {"_id": identifier}
        ]
    }
    user = db.users.find_one(query)
    if not user:
        return json_res({
            "success": False, 
            "message": f"डेटाबेस में '{identifier}' नाम/यूज़रनेम का कोई उपयोगकर्ता नहीं मिला। कृपया सही यूज़रनेम दर्ज करें या नया खाता बनाएं।"
        }, 404)

    stored_pass = str(user.get("password", ""))
    entered_pass = str(password)

    if not verify_password(entered_pass, stored_pass):
        return json_res({"success": False, "message": "पासवर्ड गलत है। कृपया पुनः प्रयास करें।"}, 401)

    # Auto-upgrade plain password to secure hash
    if not stored_pass.startswith("pbkdf2:sha256:"):
        db.users.update_one({"_id": user["_id"]}, {"$set": {"password": hash_password(entered_pass)}})

    # Check if account is blocked
    if user.get("status") == "blocked":
        return json_res({
            "success": False,
            "message": "आपका खाता व्यवस्थापक द्वारा ब्लॉक कर दिया गया है। कृपया सहायता टीम से संपर्क करें।"
        }, 403)

    # Calculate & update study streak
    today_str = datetime.now().strftime("%Y-%m-%d")
    last_active = user.get("lastActiveDate")
    current_streak = user.get("streak", 1)

    if last_active != today_str:
        if last_active:
            try:
                last_dt = datetime.strptime(last_active, "%Y-%m-%d")
                delta_days = (datetime.now() - last_dt).days
                if delta_days == 1:
                    current_streak += 1
                elif delta_days > 1:
                    current_streak = 1
            except Exception:
                current_streak = 1
        db.users.update_one(
            {"_id": user["_id"]},
            {"$set": {"lastActiveDate": today_str, "streak": current_streak}}
        )
        user["streak"] = current_streak
        user["lastActiveDate"] = today_str

    clean_user = serialize_doc(user)
    clean_user.pop("password", None)
    clean_user["id"] = clean_user.get("_id")
    if "role" not in clean_user or not clean_user["role"]:
        clean_user["role"] = "admin" if clean_user.get("username") == "admin" else "student"
    if "status" not in clean_user:
        clean_user["status"] = "active"

    token = generate_auth_token(clean_user["id"], clean_user["role"], clean_user.get("username", ""))

    return json_res({
        "success": True,
        "message": f"स्वागत है, {user.get('name', identifier)}! डेटाबेस से लॉगिन सफल रहा।",
        "token": token,
        "user": clean_user
    })

@auth_app.route('/signup', method=['POST'])
def handle_signup():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "MongoDB Atlas डेटाबेस से संपर्क नहीं हो सका।"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    username = (data.get("username") or "").strip()
    password = data.get("password") or ""
    name = (data.get("name") or "").strip() or username
    avatar = data.get("avatar") or "👨‍🎓"
    ref_code = (data.get("referralCode") or "").strip().upper()

    if not username or not password:
        return json_res({"success": False, "message": "यूज़रनेम और पासवर्ड दोनों आवश्यक हैं"}, 400)

    # Check if username already exists in database
    escaped = re.escape(username)
    existing = db.users.find_one({"username": {"$regex": f"^{escaped}$", "$options": "i"}})
    if existing:
        return json_res({"success": False, "message": "यह यूज़रनेम पहले से किसी अन्य छात्र द्वारा लिया जा चुका है। कृपया दूसरा चुनें।"}, 400)

    # Generate user referral code
    new_ref_code = f"SP-{random.randint(100000, 999999)}"
    initial_coins = 100

    # Process referral reward if referrer code exists
    if ref_code:
        referrer = db.users.find_one({"referralCode": ref_code})
        if referrer:
            db.users.update_one(
                {"_id": referrer["_id"]},
                {
                    "$inc": {"referralCount": 1, "referralCoins": 100}
                }
            )
            initial_coins += 50  # Bonus for using referral

    new_user = {
        "_id": f"usr_{int(datetime.now().timestamp() * 1000)}",
        "name": name,
        "username": username,
        "password": hash_password(password),
        "role": "student",
        "status": "active",
        "avatar": avatar,
        "customPhoto": None,
        "referralCode": new_ref_code,
        "referralCount": 0,
        "referralCoins": initial_coins,
        "targetExam": "SSC CGL / CHSL 2026",
        "streak": 1,
        "joinedAt": datetime.now().isoformat(),
        "lastActiveDate": datetime.now().strftime("%Y-%m-%d")
    }

    db.users.insert_one(new_user)
    clean_user = serialize_doc(new_user)
    clean_user.pop("password", None)
    clean_user["id"] = clean_user.get("_id")
    clean_user["role"] = "student"
    clean_user["status"] = "active"

    token = generate_auth_token(clean_user["id"], "student", clean_user.get("username", ""))

    return json_res({
        "success": True,
        "message": "बधाई! आपका StudyPulse खाता डेटाबेस में सफलतापूर्वक बन गया है।",
        "token": token,
        "user": clean_user
    }, 201)

@auth_app.route('/profile', method=['GET'])
def get_profile():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    user_id = request.query.get('userId')
    username = request.query.get('username')

    query = {}
    if user_id:
        query["$or"] = [{"_id": user_id}, {"id": user_id}]
    elif username:
        escaped = re.escape(username)
        query["username"] = {"$regex": f"^{escaped}$", "$options": "i"}
    else:
        return json_res({"success": False, "message": "User identifier required"}, 400)

    user = db.users.find_one(query)
    if not user:
        return json_res({"success": False, "message": "User not found"}, 404)

    clean_user = serialize_doc(user)
    clean_user.pop("password", None)
    clean_user["id"] = clean_user.get("_id")
    return json_res({"success": True, "user": clean_user})

@auth_app.route('/profile', method=['PUT'])
def update_profile():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    user_id = data.get("userId") or data.get("id") or request.query.get('userId')
    if not user_id:
        return json_res({"success": False, "message": "userId is required to update profile"}, 400)

    update_fields = {}
    allowed = ["name", "avatar", "customPhoto", "targetExam", "referralCoins", "streak"]
    for field in allowed:
        if field in data:
            update_fields[field] = data[field]

    if not update_fields:
        return json_res({"success": False, "message": "No update fields provided"}, 400)

    query = {"$or": [{"_id": user_id}, {"id": user_id}]}
    res = db.users.update_one(query, {"$set": update_fields})
    if res.matched_count == 0:
        return json_res({"success": False, "message": "User not found"}, 404)

    updated_user = db.users.find_one(query)
    clean_user = serialize_doc(updated_user)
    clean_user.pop("password", None)
    clean_user["id"] = clean_user.get("_id")

    return json_res({
        "success": True,
        "message": "प्रोफ़ाइल डेटाबेस में सफलतापूर्वक अपडेट हो गई!",
        "user": clean_user
    })

@auth_app.route('/leaderboard', method=['GET'])
def get_leaderboard():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database not reachable"}, 500)

    users = db.users.find({}, {"password": 0}).sort("referralCoins", -1).limit(10)
    return json_res({
        "success": True,
        "leaderboard": serialize_docs(users)
    })
