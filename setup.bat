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

:: Start the app
echo Starting the game...
npm run dev

pause
