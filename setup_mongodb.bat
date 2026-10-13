@echo off
title StudyPulse - MongoDB Setup & Data Creator
cd /d "%~dp0"
set PYTHON_EXE="C:\Users\Anjli\AppData\Local\Python\pythoncore-3.14-64\python.exe"

echo =========================================================
echo    StudyPulse - MongoDB Data Creation & Sync Tool
echo =========================================================
echo.
echo [1] Local MongoDB (mongodb://localhost:27017/) me data daalein
echo [2] MongoDB Atlas Cloud URI me data daalein
echo [3] Exit
echo.
set /p choice="Apna vikalp chunein (1, 2 ya 3): "

if "%choice%"=="1" (
    echo.
    %PYTHON_EXE% seed_mongodb.py
    echo.
    pause
    exit /b
)

if "%choice%"=="2" (
    echo.
    set /p atlas_uri="Apna MongoDB Atlas Connection String paste karein: "
    echo.
    %PYTHON_EXE% seed_mongodb.py --uri "%atlas_uri%"
    echo.
    pause
    exit /b
)
