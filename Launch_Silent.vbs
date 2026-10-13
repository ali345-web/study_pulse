Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strCurDir = fso.GetParentFolderName(WScript.ScriptFullName)
appData = WshShell.ExpandEnvironmentStrings("%LOCALAPPDATA%")
candidate1 = appData & "\Python\pythoncore-3.14-64\pythonw.exe"
candidate2 = appData & "\Python\bin\pythonw.exe"
candidate3 = appData & "\Programs\Python\Python312\pythonw.exe"
candidate4 = appData & "\Programs\Python\Python311\pythonw.exe"
candidate5 = appData & "\Microsoft\WindowsApps\pythonw.exe"

resolvedPython = ""
If fso.FileExists(candidate1) Then
    resolvedPython = candidate1
ElseIf fso.FileExists(candidate2) Then
    resolvedPython = candidate2
ElseIf fso.FileExists(candidate3) Then
    resolvedPython = candidate3
ElseIf fso.FileExists(candidate4) Then
    resolvedPython = candidate4
ElseIf fso.FileExists(candidate5) Then
    resolvedPython = candidate5
Else
    resolvedPython = "pythonw.exe"
End If

WshShell.Run """" & resolvedPython & """ """ & strCurDir & "\desktop_app.py""", 0, False

