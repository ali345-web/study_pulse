package com.studypulse.app;

public class AppConfig {
    /**
     * Set to true to load from your online/live server URL (e.g. Vercel, Netlify, or Cloudflare tunnel).
     * Set to false to load 100% offline from bundled assets in app/src/main/assets/www/index.html.
     */
    public static final boolean USE_REMOTE_URL = true;

    /**
     * Remote URL used when USE_REMOTE_URL = true.
     * In Android Emulator, localhost is 10.0.2.2.
     * On real device on same Wi-Fi, use your PC's IP (e.g. http://192.168.1.X:5000) or public Cloudflare URL.
     */
    public static final String REMOTE_URL = "https://studypulse-web.netlify.app";

    /**
     * Local bundled asset URL used when USE_REMOTE_URL = false.
     */
    public static final String LOCAL_URL = "file:///android_asset/www/index.html";

    /**
     * Pull to refresh support
     */
    public static final boolean ENABLE_PULL_TO_REFRESH = true;

    /**
     * Double press back button timeout in milliseconds
     */
    public static final long BACK_PRESS_EXIT_INTERVAL = 2000;
}
