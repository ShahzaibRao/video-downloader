#!/bin/bash
# Quick Deploy Script for Video Downloader

echo "=========================================="
echo "🚀 Deploying Video Downloader to Cloudflare Pages"
echo "=========================================="
echo ""

cd "$(dirname "$0")"

echo "Step 1: Authenticating with Cloudflare..."
wrangler login

echo ""
echo "Step 2: Deploying to Cloudflare Pages..."
wrangler pages deploy public --project-name=video-downloader

echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "Your site should now be live at:"
echo "https://video-downloader.pages.dev"
echo ""
echo "Test it with a YouTube URL:"
echo "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
echo ""
