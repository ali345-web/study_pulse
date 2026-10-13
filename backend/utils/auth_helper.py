"""
StudyPulse Secure Authentication & Authorization Helper
Provides:
- PBKDF2-HMAC-SHA256 cryptographic password hashing and verification
- Seamless backward compatibility with legacy plaintext passwords (with auto-upgrade)
- Cryptographically signed HMAC-SHA256 JWT-style session tokens
- Server-side role verification (@require_admin, @require_auth decorators)
"""

import os
import time
import json
import base64
import hmac
import hashlib
import functools
from bottle import request, response
from backend.config.db import get_db

SECRET_KEY = os.getenv("JWT_SECRET", "studypulse_production_secret_key_2026_secure_tokens").encode("utf-8")

def b64_encode(data_bytes):
    return base64.urlsafe_b64encode(data_bytes).decode("utf-8").rstrip("=")

def b64_decode(data_str):
    padding = 4 - (len(data_str) % 4)
    if padding and padding < 4:
        data_str += "=" * padding
    return base64.urlsafe_b64decode(data_str.encode("utf-8"))

def hash_password(password: str) -> str:
    """Hashes a password securely using PBKDF2-HMAC-SHA256 with 100,000 iterations."""
    if not password:
        return ""
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100000)
    return f"pbkdf2:sha256:100000${salt.hex()}${key.hex()}"

def verify_password(password: str, stored_hash: str) -> bool:
    """
    Verifies a password against a stored hash.
    Supports secure PBKDF2-HMAC-SHA256 as well as seamless fallback for legacy plain passwords.
    """
    if not stored_hash or not password:
        return False

    stored_str = str(stored_hash).strip()
    pass_str = str(password).strip()

    # If modern PBKDF2 hash format
    if stored_str.startswith("pbkdf2:sha256:"):
        try:
            parts = stored_str.split("$")
            if len(parts) == 3:
                header, salt_hex, key_hex = parts
                iterations = int(header.split(":")[2])
                salt = bytes.fromhex(salt_hex)
                expected_key = bytes.fromhex(key_hex)
                actual_key = hashlib.pbkdf2_hmac("sha256", pass_str.encode("utf-8"), salt, iterations)
                return hmac.compare_digest(actual_key, expected_key)
        except Exception:
            return False

    # Legacy plaintext comparison
    return hmac.compare_digest(stored_str, pass_str)

def generate_auth_token(user_id: str, role: str, username: str, expires_hours: int = 72) -> str:
    """Generates a cryptographically signed HMAC-SHA256 token."""
    payload = {
        "uid": str(user_id),
        "role": str(role),
        "username": str(username),
        "iat": int(time.time()),
        "exp": int(time.time() + (expires_hours * 3600))
    }
    payload_json = json.dumps(payload, separators=(',', ':')).encode("utf-8")
    payload_b64 = b64_encode(payload_json)
    signature = hmac.new(SECRET_KEY, payload_b64.encode("utf-8"), hashlib.sha256).digest()
    sig_b64 = b64_encode(signature)
    return f"{payload_b64}.{sig_b64}"

def verify_auth_token(token: str):
    """Verifies HMAC-SHA256 token signature and expiration. Returns payload dict or None."""
    if not token or "." not in token:
        return None
    try:
        payload_b64, sig_b64 = token.split(".", 1)
        expected_sig = hmac.new(SECRET_KEY, payload_b64.encode("utf-8"), hashlib.sha256).digest()
        actual_sig = b64_decode(sig_b64)
        if not hmac.compare_digest(expected_sig, actual_sig):
            return None

        payload_bytes = b64_decode(payload_b64)
        payload = json.loads(payload_bytes.decode("utf-8"))

        if payload.get("exp", 0) < int(time.time()):
            return None  # Token expired

        return payload
    except Exception:
        return None

def extract_token_from_request():
    """Extracts auth token from Authorization header, x-admin-token header, or cookie."""
    auth_header = request.headers.get("Authorization") or ""
    if auth_header.lower().startswith("bearer "):
        return auth_header[7:].strip()

    admin_header = request.headers.get("x-admin-token") or request.headers.get("x-auth-token")
    if admin_header:
        return admin_header.strip()

    cookie_token = request.get_cookie("studypulse_admin_token") or request.get_cookie("studypulse_token")
    if cookie_token:
        return cookie_token.strip()

    return None

def require_admin(func):
    """
    Decorator for Bottle route handlers.
    Verifies that the incoming request has a valid, unexpired token belonging to a verified Admin.
    Rejects unauthorized students or anonymous requests at the server level.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        token = extract_token_from_request()
        if not token:
            response.status = 401
            response.content_type = "application/json; charset=utf-8"
            return {
                "success": False,
                "error": "UNAUTHORIZED",
                "message": "पहुंच अस्वीकृत: एडमिन ऑथराइजेशन टोकन आवश्यक है (Admin Authorization token required)."
            }

        payload = verify_auth_token(token)
        if not payload:
            response.status = 401
            response.content_type = "application/json; charset=utf-8"
            return {
                "success": False,
                "error": "INVALID_TOKEN",
                "message": "सत्र समाप्त या अमान्य टोकन। कृपया पुनः लॉगिन करें (Session expired or invalid token)."
            }

        if payload.get("role") != "admin":
            response.status = 403
            response.content_type = "application/json; charset=utf-8"
            return {
                "success": False,
                "error": "FORBIDDEN",
                "message": "निषिद्ध: आपके पास इस एडमिन सुविधा का अधिकार नहीं है (Forbidden: Admin role required)."
            }

        # Verify against active database user
        db = get_db()
        if db is not None:
            user = db.users.find_one({"_id": payload.get("uid")})
            if not user or user.get("role") != "admin":
                response.status = 403
                response.content_type = "application/json; charset=utf-8"
                return {
                    "success": False,
                    "error": "ROLE_REVOKED",
                    "message": "डेटाबेस में यह खाता एडमिन के रूप में मान्यता प्राप्त नहीं है।"
                }
            if user.get("status") == "blocked":
                response.status = 403
                response.content_type = "application/json; charset=utf-8"
                return {
                    "success": False,
                    "error": "ACCOUNT_BLOCKED",
                    "message": "यह खाता ब्लॉक कर दिया गया है।"
                }
            request.current_user = user
        else:
            request.current_user = payload

        return func(*args, **kwargs)
    return wrapper

def require_auth(func):
    """
    Decorator for general authenticated user endpoints.
    Allows students and admins with valid session tokens.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        token = extract_token_from_request()
        if not token:
            response.status = 401
            response.content_type = "application/json; charset=utf-8"
            return {
                "success": False,
                "error": "UNAUTHORIZED",
                "message": "प्रवेश के लिए लॉगिन आवश्यक है (Authentication required)."
            }

        payload = verify_auth_token(token)
        if not payload:
            response.status = 401
            response.content_type = "application/json; charset=utf-8"
            return {
                "success": False,
                "error": "INVALID_TOKEN",
                "message": "सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें।"
            }

        db = get_db()
        if db is not None:
            user = db.users.find_one({"_id": payload.get("uid")})
            if not user or user.get("status") == "blocked":
                response.status = 403
                response.content_type = "application/json; charset=utf-8"
                return {
                    "success": False,
                    "error": "ACCOUNT_DISABLED",
                    "message": "उपयोगकर्ता खाता अनुपलब्ध या ब्लॉक है।"
                }
            request.current_user = user
        else:
            request.current_user = payload

        return func(*args, **kwargs)
    return wrapper
