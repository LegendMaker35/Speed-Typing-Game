@echo off
echo --------------------------------------------------
echo        Welcome to Speed Typing Game Setup
echo --------------------------------------------------

:: Check for Node
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org and re-run this script.
    pause
    exit /b
)

:: Install dependencies
echo Installing project dependencies...
npm install

:: Check if .env exists
IF NOT EXIST .env (
    echo Creating default .env file...
    copy .env.example .env
)

:: Start the server in a new command window
start cmd /k "npm run dev"

:: Open the game in the default browser
timeout /t 2 >nul
start http://localhost:8000

echo --------------------------------------------------
echo Game is launching in your browser!
echo If the server window doesn't appear, check npm errors.
echo --------------------------------------------------

pause
