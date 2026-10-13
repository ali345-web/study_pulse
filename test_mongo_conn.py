import os
import sys
import socket
import ssl
import json
import urllib.request
from urllib.parse import urlparse
import certifi

# Load .env
env_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
mongo_uri = None
if os.path.exists(env_file):
    with open(env_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                if k.strip() == "MONGODB_URI":
                    mongo_uri = v.strip().strip("'\"")

print("=" * 60)
print("  StudyPulse - MongoDB Connection Diagnostic")
print("=" * 60)

if not mongo_uri:
    print("[ERROR] .env file me MONGODB_URI nahi mila!")
    sys.exit(1)

# Mask password in URI for safe display
masked_uri = mongo_uri
if "@" in mongo_uri and "://" in mongo_uri:
    prefix, rest = mongo_uri.split("://", 1)
    creds, host_part = rest.split("@", 1)
    if ":" in creds:
        user, _ = creds.split(":", 1)
        masked_uri = f"{prefix}://{user}:******@{host_part}"

print(f"MongoDB URI: {masked_uri}")

# 1. Get current public IP
current_ip = "Unknown"
try:
    current_ip = urllib.request.urlopen("https://api.ipify.org", timeout=5).read().decode("utf8")
    print(f"Aapka Current Public IP: {current_ip}")
except Exception as e:
    print(f"Public IP detect nahi ho saka: {e}")

# 2. Test DNS resolution
cluster_host = None
if "@" in mongo_uri:
    host_section = mongo_uri.split("@", 1)[1].split("/", 1)[0].split("?", 1)[0]
    cluster_host = host_section
    print(f"\n[Step 1] DNS Resolution check ({cluster_host})...")
    try:
        import dns.resolver
        answers = dns.resolver.resolve(f"_mongodb._tcp.{cluster_host}", "SRV")
        shard_hosts = [str(r.target).rstrip(".") for r in answers]
        print(f"  [OK] DNS resolved {len(shard_hosts)} shards: {', '.join(shard_hosts)}")
        target_shard = shard_hosts[0]
    except Exception as e:
        print(f"  [DNS Failed]: {e}")
        target_shard = cluster_host
else:
    target_shard = "localhost"

# 3. Test TCP Connection
print(f"\n[Step 2] TCP Port 27017 check ({target_shard})...")
try:
    s = socket.create_connection((target_shard, 27017), timeout=5)
    print("  [OK] TCP Port 27017 connected successfully!")
    s.close()
except Exception as e:
    print(f"  [FAILED] TCP Port connect fail: {e}")

# 4. Test SSL Handshake
print(f"\n[Step 3] SSL/TLS Handshake check...")
ssl_ok = False
try:
    s = socket.create_connection((target_shard, 27017), timeout=5)
    ctx = ssl.create_default_context(cafile=certifi.where())
    ss = ctx.wrap_socket(s, server_hostname=target_shard)
    print("  [OK] SSL/TLS Handshake successful!")
    ss.close()
    ssl_ok = True
except Exception as e:
    err_str = str(e)
    print(f"  [FAILED] SSL Handshake Error: {err_str}")
    if "TLSV1_ALERT_INTERNAL_ERROR" in err_str:
        print("\n" + "!" * 60)
        print("  ROOT CAUSE DETECTED: MongoDB Atlas Network Access Block!")
        print(f"  Aapka IP ({current_ip}) MongoDB Atlas me Whitelist nahi hai,")
        print("  ya cluster Paused (band) hai!")
        print("!" * 60)

# 5. Test PyMongo Client
print(f"\n[Step 4] PyMongo Authentication & Database Ping...")
try:
    from pymongo import MongoClient
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=4000, tlsCAFile=certifi.where())
    ping_res = client.admin.command("ping")
    print("  [OK] MongoDB Atlas se connect ho gaya! Ping response:", ping_res)
    dbs = client.list_database_names()
    print("  Available Databases:", dbs)
except Exception as e:
    print("  [FAILED] MongoDB Ping fail:", e)

print("=" * 60)
