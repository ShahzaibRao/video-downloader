@echo off
REM Video Downloader - Windows Setup Script

echo ========================================
echo Video Downloader - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] package.json not found!
    echo Please run this script from the video-downloader directory
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully!
echo.

REM Check if wrangler is installed globally
where wrangler >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Wrangler CLI not found globally
    echo        Using local wrangler from node_modules
    set WRANGLER=npx wrangler
) else (
    echo [OK] Wrangler CLI found
    set WRANGLER=wrangler
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the development server:
echo   npm run dev
echo.
echo Or manually:
echo   %WRANGLER% pages dev public
echo.
echo The site will be available at:
echo   http://localhost:8788
echo.
echo To deploy to Cloudflare Pages:
echo   1. Login: %WRANGLER% login
echo   2. Deploy: npm run deploy
echo.
echo ========================================
echo.
pause
