@echo off
cd /d "%~dp0"

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
