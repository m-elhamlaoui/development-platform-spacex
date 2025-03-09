@echo off

:: Set PATH for executables
set "PATH=%CD%\Angular\.cache\nodejs\node-v20.15.0-win-x64\;%PATH%"

:: Set working directory
set wd=%~dp0
cd /d "%wd%"
cd Angular

:: Run node with the provided arguments
npm %*

:: Return to the initial directory
cd /d "%wd%"
