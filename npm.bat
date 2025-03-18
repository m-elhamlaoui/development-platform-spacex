@echo off

:: Set PATH for executables
set "PATH=%CD%\Frontend\.cache\nodejs\node-v20.15.0-win-x64\;%PATH%"

:: Set working directory
set wd=%~dp0
cd /d "%wd%"
cd Frontend

:: Run node with the provided arguments
npm %*

:: Return to the initial directory
cd /d "%wd%"
