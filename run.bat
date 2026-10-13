@echo off
chcp 65001 >nul
title StudyPulse - Smart Study App
cd /d "%~dp0"

echo ========================================================
echo   🚀 StudyPulse - Smart Study App (2026 Edition)
echo   सर्वर प्रारंभ हो रहा है एवं ब्राउज़र खोला जा रहा है...
echo ========================================================

:: Find Python executable
set "PYTHON_EXE="
if exist "%LOCALAPPDATA%\Python\pythoncore-3.14-64\python.exe" (
    set "PYTHON_EXE=%LOCALAPPDATA%\Python\pythoncore-3.14-64\python.exe"
) else (
    where python >nul 2>nul
    if %ERRORLEVEL% EQU 0 set "PYTHON_EXE=python"
)

if defined PYTHON_EXE (
    echo [OK] Python सर्वर शुरू किया जा रहा है...
    echo.
    echo 📱 विद्यार्थी ऐप : http://localhost:5000/studypulse
    echo 🛡️ एडमिन पोर्टल : http://localhost:5000/admin
    echo.
    "%PYTHON_EXE%" run_server.py
) else (
    echo [INFO] Python नहीं मिला, सीधे ब्राउज़र में खोला जा रहा है...
    start http://localhost:5000/studypulse
)

pause
