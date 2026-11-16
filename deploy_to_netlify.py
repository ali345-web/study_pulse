"""
StudyPulse - Automated Netlify Deployer
Deploys frontend.zip directly to Netlify using Netlify REST API
"""

import sys
import os
import json
import urllib.request
import urllib.error

TOKEN = os.environ.get("NETLIFY_AUTH_TOKEN") or (sys.argv[1] if len(sys.argv) > 1 else None)
ZIP_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend.zip")

if not TOKEN:
    print("[ERROR] Netlify Token required.")
    print("Usage: python deploy_to_netlify.py <YOUR_NETLIFY_TOKEN>")
    sys.exit(1)

if not os.path.exists(ZIP_FILE):
    print(f"[ERROR] {ZIP_FILE} not found. Please create it first.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "User-Agent": "StudyPulse-Deployer"
}

def create_or_get_site():
    # 1. First, check existing sites
    try:
        req = urllib.request.Request("https://api.netlify.com/api/v1/sites", headers=headers)
        with urllib.request.urlopen(req) as resp:
            sites = json.loads(resp.read().decode())
            for site in sites:
                if "studypulse" in site.get("name", "").lower():
                    print(f"[INFO] Found existing site: {site['name']} (ID: {site['id']})")
                    return site["id"], site.get("ssl_url") or site.get("url")
    except Exception as e:
        print("[WARN] Could not list sites:", e)

    # 2. If not found, create new site
    site_payload = json.dumps({
        "name": f"studypulse-app-{os.urandom(3).hex()}"
    }).encode("utf-8")
    
    req = urllib.request.Request(
        "https://api.netlify.com/api/v1/sites",
        data=site_payload,
        headers={**headers, "Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        site = json.loads(resp.read().decode())
        print(f"[SUCCESS] Created new site: {site['name']} (ID: {site['id']})")
        return site["id"], site.get("ssl_url") or site.get("url")

def deploy_zip(site_id):
    with open(ZIP_FILE, "rb") as f:
        zip_bytes = f.read()

    print(f"[INFO] Uploading {len(zip_bytes)} bytes to Netlify...")
    req = urllib.request.Request(
        f"https://api.netlify.com/api/v1/sites/{site_id}/deploys",
        data=zip_bytes,
        headers={**headers, "Content-Type": "application/zip"}
    )
    with urllib.request.urlopen(req) as resp:
        deploy = json.loads(resp.read().decode())
        url = deploy.get("ssl_url") or deploy.get("url")
        print("=" * 60)
        print("  🎉 MUBARAK HO! SITE NETLIFY PAR LIVE HO GAYI HAI!")
        print(f"  👉 Live URL: {url}")
        print("=" * 60)
        return url

if __name__ == "__main__":
    try:
        site_id, site_url = create_or_get_site()
        deploy_zip(site_id)
    except urllib.error.HTTPError as e:
        print(f"[HTTP ERROR {e.code}]: {e.read().decode()}")
    except Exception as e:
        print("[DEPLOY ERROR]:", e)
