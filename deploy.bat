@echo off
REM Quick Deploy Script for Video Downloader (Windows)

echo ==========================================
echo 🚀 Deploying Video Downloader to Cloudflare Pages
echo ==========================================
echo.

cd /d "%~dp0"

echo Step 1: Authenticating with Cloudflare...
call npx wrangler login

echo.
echo Step 2: Deploying to Cloudflare Pages...
call npx wrangler pages deploy public --project-name=video-downloader

echo.
echo ==========================================
echo ✅ Deployment Complete!
echo ==========================================
echo.
echo Your site should now be live at:
echo https://video-downloader.pages.dev
echo.
echo Test it with a YouTube URL:
echo https://www.youtube.com/watch?v=dQw4w9WgXcQ
echo.
pause
