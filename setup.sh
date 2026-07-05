#!/bin/bash

# Video Downloader - Local Development Setup Script
# This script automates the setup and launch of the development environment

echo "🎬 Video Downloader - Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    echo "Please run this script from the video-downloader directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Check if wrangler is installed globally
if ! command -v wrangler &> /dev/null
then
    echo "⚠️  Wrangler CLI not found globally"
    echo "   Using local wrangler from node_modules"
    WRANGLER="npx wrangler"
else
    echo "✅ Wrangler CLI found: $(wrangler --version)"
    WRANGLER="wrangler"
fi

echo ""
echo "=================================="
echo "🚀 Setup Complete!"
echo "=================================="
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Or manually:"
echo "  $WRANGLER pages dev public"
echo ""
echo "The site will be available at: http://localhost:8788"
echo ""
echo "To deploy to Cloudflare Pages:"
echo "  1. Login: $WRANGLER login"
echo "  2. Deploy: npm run deploy"
echo ""
echo "=================================="
