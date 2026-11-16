package com.studypulse.app;

import android.content.Context;
import android.content.Intent;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * JavaScript interface exposed to the WebView as 'Android'.
 * Optional bridge that requires 0 changes in web app, but allows
 * the web app to call Android.showToast(...) or Android.share(...) if desired.
 */
public class WebAppInterface {
    private final Context mContext;

    public WebAppInterface(Context context) {
        mContext = context;
    }

    @JavascriptInterface
    public void showToast(String message) {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void shareText(String title, String text) {
        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, text);
        sendIntent.putExtra(Intent.EXTRA_TITLE, title);
        sendIntent.setType("text/plain");

        Intent shareIntent = Intent.createChooser(sendIntent, title);
        shareIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(shareIntent);
    }

    @JavascriptInterface
    public boolean isNativeApp() {
        return true;
    }
}
