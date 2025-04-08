@echo off
setlocal enabledelayedexpansion

title Speed Typing Game Setup

echo ==================================================
echo        Speed Typing Game - First Time Setup
echo ==================================================

:: Check Node.js
where node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  Node.js not found. Please install it from:
    echo    https://nodejs.org
    pause
    exit /b
)

:: Install dependencies
echo  Installing dependencies...
call npm install >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (
    echo  Failed to install dependencies. Check your npm setup.
    pause
    exit /b
)

:: Create .env file if it doesn't exist
IF NOT EXIST .env (
    echo  Creating .env from template...
    copy env.example .env >nul
)

:: Start the server in a new terminal
echo  Starting the server...
start "Typing Game Server" cmd /k "npm start"

:: Wait 3 seconds for server to initialize
timeout /t 3 >nul

:: Open browser
echo  Opening game in browser...
start http://localhost:8000

echo ==================================================
echo  Setup complete. Your game should be running!
echo ==================================================
pause
