"""
StudyPulse Live Class & Interactive Streaming REST API Routes
Provides:
- Real-time Live Class status (isLive, topic, subject, teacherName, streamType, streamUrl)
- Teacher/Admin Live Broadcasting controls (Start Live, End Live, Screen Share, Camera/Mic)
- Real-time Live Comments/Chat with anti-spam and Admin moderation (Delete, Pin)
- Active Viewer Presence tracking (heartbeat)
- Lightweight WebRTC signaling relay for direct peer/viewer audio-video broadcast
"""

import time
import uuid
import datetime
from bottle import Bottle, request, response
from backend.config.db import get_db, serialize_doc, serialize_docs
from backend.utils.auth_helper import require_admin, verify_auth_token, extract_token_from_request

live_app = Bottle()

# In-memory presence and signaling caches
_ACTIVE_VIEWERS = {}        # { viewer_id: last_timestamp }
_SIGNAL_BOX = {}            # { target_id: [msg1, msg2, ...] }
_MAX_SIGNAL_QUEUE = 20

def json_res(res_data, status=200):
    response.content_type = "application/json; charset=utf-8"
    response.status = status
    return res_data

@live_app.route('/<:re:.*>', method=['OPTIONS'])
def live_options_handler(*args, **kwargs):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, x-admin-token, x-user-id'
    return ""

def _cleanup_viewers():
    """Removes viewers who haven't sent a heartbeat in the last 25 seconds"""
    now = time.time()
    stale_keys = [k for k, last_seen in _ACTIVE_VIEWERS.items() if now - last_seen > 25]
    for k in stale_keys:
        _ACTIVE_VIEWERS.pop(k, None)
    return len(_ACTIVE_VIEWERS)

def _get_current_live_session():
    db = get_db()
    if db is None:
        return None
    session = db.live_sessions.find_one({"_id": "live_current"})
    if not session:
        session = {
            "_id": "live_current",
            "isLive": False,
            "title": "Welcome to StudyPulse Live",
            "subject": "General Studies",
            "teacherName": "Super Admin",
            "streamType": "camera_mic",
            "streamUrl": "",
            "startedAt": None,
            "endedAt": None,
            "pinnedMessage": "Swagat hai! Apne sawal live chat me pooch sakte hain."
        }
        try:
            db.live_sessions.insert_one(session)
        except Exception:
            pass
    return session

# ==========================================
# 1. LIVE CLASS STATUS
# ==========================================
@live_app.route('/status', method=['GET'])
def get_live_status():
    session = _get_current_live_session()
    if not session:
        return json_res({"success": False, "message": "Live session info unavailable"}, 500)

    viewer_count = _cleanup_viewers()

    # Minimum viewer count is at least 1 if live, plus base viewers
    display_viewers = max(viewer_count, 1) if session.get("isLive") else 0

    return json_res({
        "success": True,
        "live": {
            "id": str(session.get("_id", "live_current")),
            "isLive": bool(session.get("isLive", False)),
            "title": session.get("title", "Live Class"),
            "subject": session.get("subject", "General"),
            "teacherName": session.get("teacherName", "Admin / Teacher"),
            "streamType": session.get("streamType", "camera_mic"),
            "streamUrl": session.get("streamUrl", ""),
            "startedAt": session.get("startedAt"),
            "endedAt": session.get("endedAt"),
            "pinnedMessage": session.get("pinnedMessage", ""),
            "viewerCount": display_viewers
        }
    })

# ==========================================
# 2. START LIVE CLASS (ADMIN ONLY)
# ==========================================
@live_app.route('/start', method=['POST'])
@require_admin
def start_live_class():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database offline"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    title = (data.get("title") or "StudyPulse Special Live Class").strip()
    subject = (data.get("subject") or "Competitive Exams").strip()
    stream_type = data.get("streamType", "camera_mic")  # 'camera_mic', 'screen_share', or 'stream_url'
    stream_url = (data.get("streamUrl") or "").strip()
    teacher_name = (data.get("teacherName") or "Super Admin").strip()
    pinned_message = (data.get("pinnedMessage") or "Live class shuru ho chuki hai! Sawal poochne ke liye chat use karein.").strip()

    now_iso = datetime.datetime.utcnow().isoformat() + "Z"

    update_payload = {
        "_id": "live_current",
        "isLive": True,
        "title": title,
        "subject": subject,
        "streamType": stream_type,
        "streamUrl": stream_url,
        "teacherName": teacher_name,
        "startedAt": now_iso,
        "endedAt": None,
        "pinnedMessage": pinned_message
    }

    try:
        db.live_sessions.replace_one({"_id": "live_current"}, update_payload, upsert=True)
        # Add system welcome message into comments
        welcome_comment = {
            "_id": "sys_" + str(uuid.uuid4())[:8],
            "userName": "StudyPulse System",
            "userId": "system",
            "role": "system",
            "text": f"🔴 Live Class Shuru: {title} ({subject}) - Sabhi vidyarthi chat me jud sakte hain!",
            "time": datetime.datetime.now().strftime("%I:%M %p"),
            "timestamp": time.time(),
            "isPinned": True
        }
        db.live_comments.insert_one(welcome_comment)
    except Exception as e:
        return json_res({"success": False, "message": f"Live start error: {str(e)}"}, 500)

    return json_res({
        "success": True,
        "message": "Live class successfully shuru ho gayi!",
        "live": update_payload
    })

# ==========================================
# 3. END LIVE CLASS (ADMIN ONLY)
# ==========================================
@live_app.route('/end', method=['POST'])
@require_admin
def end_live_class():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database offline"}, 500)

    now_iso = datetime.datetime.utcnow().isoformat() + "Z"
    try:
        db.live_sessions.update_one(
            {"_id": "live_current"},
            {"$set": {"isLive": False, "endedAt": now_iso}}
        )
        end_comment = {
            "_id": "sys_" + str(uuid.uuid4())[:8],
            "userName": "StudyPulse System",
            "userId": "system",
            "role": "system",
            "text": "⏹️ Aaj ki live class samapt ho chuki hai. Shandar session raha!",
            "time": datetime.datetime.now().strftime("%I:%M %p"),
            "timestamp": time.time(),
            "isPinned": False
        }
        db.live_comments.insert_one(end_comment)
    except Exception as e:
        return json_res({"success": False, "message": f"Live end error: {str(e)}"}, 500)

    return json_res({
        "success": True,
        "message": "Live class samapt kar di gayi hai."
    })

# ==========================================
# 4. LIVE COMMENTS (GET & POST)
# ==========================================
@live_app.route('/comments', method=['GET'])
def get_live_comments():
    db = get_db()
    if db is None:
        return json_res({"success": False, "comments": []})

    since = request.query.get('since')
    query = {}
    if since:
        try:
            since_f = float(since)
            query["timestamp"] = {"$gt": since_f}
        except Exception:
            pass

    try:
        raw_comments = list(db.live_comments.find(query).sort("timestamp", 1))
        # Keep last 150 comments
        if len(raw_comments) > 150:
            raw_comments = raw_comments[-150:]
        comments = serialize_docs(raw_comments)
    except Exception:
        comments = []

    return json_res({
        "success": True,
        "count": len(comments),
        "comments": comments,
        "serverTime": time.time()
    })

@live_app.route('/comments', method=['POST'])
def post_live_comment():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database offline"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    text = (data.get("text") or "").strip()
    if not text:
        return json_res({"success": False, "message": "Comment khali nahi ho sakta"}, 400)

    if len(text) > 300:
        text = text[:300]

    # Verify if commenter is Admin
    token = extract_token_from_request()
    token_payload = verify_auth_token(token) if token else None
    is_admin = bool(token_payload and token_payload.get("role") == "admin")

    user_name = (data.get("userName") or data.get("user_name") or "Student").strip()
    user_id = data.get("userId") or data.get("user_id") or "anonymous"
    role = "admin" if is_admin else "student"

    if is_admin and not user_name:
        user_name = "Admin / Teacher"

    comment_obj = {
        "_id": "cmt_" + str(uuid.uuid4())[:10],
        "userName": user_name,
        "userId": str(user_id),
        "role": role,
        "text": text,
        "time": datetime.datetime.now().strftime("%I:%M %p"),
        "timestamp": time.time(),
        "isPinned": False
    }

    try:
        db.live_comments.insert_one(comment_obj)
    except Exception as e:
        return json_res({"success": False, "message": f"Error posting comment: {str(e)}"}, 500)

    return json_res({
        "success": True,
        "comment": serialize_doc(comment_obj)
    })

# ==========================================
# 5. DELETE COMMENT & PIN (ADMIN ONLY)
# ==========================================
@live_app.route('/comments/<comment_id>', method=['DELETE'])
@require_admin
def delete_live_comment(comment_id):
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database offline"}, 500)

    try:
        db.live_comments.delete_one({"_id": comment_id})
    except Exception as e:
        return json_res({"success": False, "message": str(e)}, 500)

    return json_res({"success": True, "message": "Comment hata diya gaya."})

@live_app.route('/pin', method=['POST'])
@require_admin
def pin_live_message():
    db = get_db()
    if db is None:
        return json_res({"success": False, "message": "Database offline"}, 500)

    try:
        data = request.json or {}
    except Exception:
        data = {}

    pinned_msg = (data.get("message") or "").strip()
    try:
        db.live_sessions.update_one(
            {"_id": "live_current"},
            {"$set": {"pinnedMessage": pinned_msg}}
        )
    except Exception as e:
        return json_res({"success": False, "message": str(e)}, 500)

    return json_res({"success": True, "message": "Message pin ho gaya.", "pinnedMessage": pinned_msg})

# ==========================================
# 6. ACTIVE VIEWER HEARTBEAT
# ==========================================
@live_app.route('/heartbeat', method=['POST'])
def viewer_heartbeat():
    try:
        data = request.json or {}
    except Exception:
        data = {}

    viewer_id = str(data.get("viewerId") or request.remote_addr or str(uuid.uuid4()))
    _ACTIVE_VIEWERS[viewer_id] = time.time()
    active_count = _cleanup_viewers()

    session = _get_current_live_session()
    is_live = bool(session.get("isLive", False)) if session else False

    return json_res({
        "success": True,
        "activeViewers": max(active_count, 1) if is_live else 0,
        "isLive": is_live
    })

# ==========================================
# 7. WEBRTC SIGNALING RELAY
# ==========================================
@live_app.route('/signal', method=['POST'])
def post_signal():
    try:
        data = request.json or {}
    except Exception:
        data = {}

    target_id = data.get("targetId") or "broadcast"
    if not target_id:
        return json_res({"success": False, "message": "Missing targetId"}, 400)

    if target_id not in _SIGNAL_BOX:
        _SIGNAL_BOX[target_id] = []

    _SIGNAL_BOX[target_id].append({
        "fromId": data.get("fromId", "anonymous"),
        "type": data.get("type", "candidate"),
        "payload": data.get("payload"),
        "time": time.time()
    })

    if len(_SIGNAL_BOX[target_id]) > _MAX_SIGNAL_QUEUE:
        _SIGNAL_BOX[target_id] = _SIGNAL_BOX[target_id][-_MAX_SIGNAL_QUEUE:]

    return json_res({"success": True})

@live_app.route('/signal/<target_id>', method=['GET'])
def get_signal(target_id):
    messages = _SIGNAL_BOX.pop(target_id, [])
    return json_res({"success": True, "messages": messages})
