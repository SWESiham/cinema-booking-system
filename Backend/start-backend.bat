@echo off
title CineBook API Server
cd /d "%~dp0"

echo ============================================
echo   CineBook API - JSON-based backend
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Download it from https://nodejs.org
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo First run: installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed. Check your internet connection.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully.
    echo.
) else (
    echo Checking dependencies...
    call npm install --prefer-offline >nul 2>nul
    echo Dependencies are up to date.
    echo.
)

echo Starting server.
echo.
echo   API:         http://localhost:4000/api
echo   API docs:    http://localhost:4000/docs
echo   Data file:   data\db.json  (auto-created, delete to reset)
echo.
echo Press Ctrl+C to stop the server.
echo.

node server.js

echo.
echo Server stopped.
pause
