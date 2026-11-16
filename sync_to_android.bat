@echo off
chcp 65001 >nul
title StudyPulse - Sync Web to Android App
echo ====================================================
echo      StudyPulse: Web Files to Android App Sync
echo ====================================================
echo.
echo [1/2] Syncing frontend web assets to Android project...
robocopy "%~dp0frontend" "%~dp0android-app\app\src\main\assets\www" /E /NFL /NDL /NJH /NJS
robocopy "%~dp0frontend" "C:\Users\Anjli\.gemini\antigravity-ide\scratch\studypulse-android\app\src\main\assets\www" /E /NFL /NDL /NJH /NJS
echo.
echo [2/2] Success! Android assets are up to date!
echo ====================================================
echo   Aapke web files bina kisi badlav ke Android app me copy ho chuke hain!
echo   Ab aap Android Studio me "Build APK" kar sakte hain.
echo ====================================================
echo.
pause
