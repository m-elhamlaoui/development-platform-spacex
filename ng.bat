@echo off

:: Set PATH for executables
set "PATH=%CD%\Frontend\.cache\nodejs\node-v20.15.0-win-x64\;%PATH%"

:: Set working directory
set wd=%~dp0
cd /d "%wd%"
cd Frontend

:: Run the Angular CLI
node node_modules\@angular\cli\bin\ng.js %*

:: Return to the initial directory
cd /d "%wd%"

:: Uncomment the following line if you need to run npm
:: node "node\node_modules\npm\bin\npm-cli.js" %*
:: Uncomment the following line if you need to make npm executable
:: icacls npm /grant Everyone:(RX)

