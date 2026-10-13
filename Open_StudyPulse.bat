@echo off
cd /d "%~dp0"

:: Check if server is already running on port 5000
netstat -ano | findstr ":5000" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start http://localhost:5000/studypulse
    exit /b
)

:: Launch desktop app silently with no command prompt window
if exist "%~dp0Launch_Silent.vbs" (
    start "" wscript.exe "%~dp0Launch_Silent.vbs"
    exit /b
)

set "PYTHONW_EXE="
if exist "%LOCALAPPDATA%\Python\pythoncore-3.14-64\pythonw.exe" set "PYTHONW_EXE=%LOCALAPPDATA%\Python\pythoncore-3.14-64\pythonw.exe"
if not defined PYTHONW_EXE if exist "%LOCALAPPDATA%\Python\bin\pythonw.exe" set "PYTHONW_EXE=%LOCALAPPDATA%\Python\bin\pythonw.exe"
if not defined PYTHONW_EXE if exist "%LOCALAPPDATA%\Microsoft\WindowsApps\pythonw.exe" set "PYTHONW_EXE=%LOCALAPPDATA%\Microsoft\WindowsApps\pythonw.exe"
if not defined PYTHONW_EXE set "PYTHONW_EXE=pythonw"

start "" "%PYTHONW_EXE%" desktop_app.py

exit /b
