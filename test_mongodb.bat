@echo off
title StudyPulse - MongoDB Connection Test
cd /d "%~dp0"
echo ============================================================
echo   StudyPulse MongoDB Connection Tester
echo ============================================================
echo.
python test_mongo_conn.py
echo.
pause
