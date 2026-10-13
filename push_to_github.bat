@echo off
chcp 65001 >nul
title StudyPulse - GitHub Push
echo ====================================================
echo        StudyPulse - GitHub par Upload ho raha hai
echo ====================================================
echo.
cd /d "%~dp0"
echo [1/2] Checking Git Status...
git status -s
echo.
echo [2/2] GitHub par push kar rahe hain (origin main)...
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ====================================================
    echo   Mubarak ho! Website GitHub par successfully upload ho gayi!
    echo ====================================================
) else (
    echo ====================================================
    echo   Push me koi issue aaya. Kripya upar ka error dekhein.
    echo ====================================================
)
echo.
pause
