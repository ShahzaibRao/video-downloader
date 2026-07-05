# Video Downloader - Quick Start Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
cd video-downloader
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The site will be available at: **http://localhost:8788**

### Step 3: Test It Out

1. Open http://localhost:8788 in your browser
2. Paste a video URL (try: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
3. Click "Get Video Info"

---

## 📦 Deploy to Cloudflare Pages (2 Minutes)

### Option A: Using Wrangler CLI (Fastest)

```bash
# Login to Cloudflare
wrangler login

# Deploy
npm run deploy
```

Your site will be live at: `https://video-downloader-xxx.pages.dev`

### Option B: Using Git Integration

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git push
```

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
3. Click **Connect to Git** and select your repository
4. Click **Deploy**

---

## 🎯 Testing Different Platforms

Try these sample URLs to test various platforms:

### YouTube
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Instagram
```
https://www.instagram.com/reel/[reel-id]
```

### TikTok
```
https://www.tiktok.com/@username/video/[video-id]
```

### Twitter/X
```
https://twitter.com/username/status/[status-id]
```

---

## 🔧 Customization

### Change Colors

Edit `public/index.html`, find the `<style>` section:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Change `#667eea` and `#764ba2` to your preferred colors.

### Add Your Logo

In `public/index.html`, find:
```html
<h1>🎥 Video Downloader</h1>
```

Replace the emoji with `<img>` tag pointing to your logo.

### Change API Provider

Edit `functions/api/video-info.js` and modify the `fetchFromCobalt` function to use a different API service.

---

## ⚠️ Important Notes

### Rate Limits
- Free APIs have rate limits
- For production: implement caching or use your own backend

### Legal Usage
- Only download content you have permission to download
- Respect copyright laws and platform terms of service

### CORS Issues
- Always use the dev server (`npm run dev`)
- Don't open `index.html` directly in browser

---

## 🐛 Troubleshooting

### "Wrangler not found"
```bash
npm install -g wrangler
```

### API Errors
- Wait a few minutes and retry
- Try a different video URL
- Check if the video is public

### Videos Won't Download
- Some platforms block automated downloads
- Private/age-restricted videos may not work
- Try a different platform

---

## 📝 Project Structure

```
video-downloader/
├── public/
│   └── index.html              # Frontend UI
├── functions/
│   └── api/
│       └── video-info.js       # API endpoint
├── package.json                # Dependencies
├── wrangler.toml              # Config
└── README.md                  # Full docs
```

---

## 🎓 Next Steps

1. ✅ Test locally with `npm run dev`
2. ✅ Deploy to Cloudflare Pages
3. 🎨 Customize colors and branding
4. 🌐 Add custom domain (optional)
5. 📊 Enable analytics
6. 🚀 Share with users!

---

## 💡 Pro Tips

- Use `wrangler pages dev public --port 3000` to change the port
- Add `.env` file for API keys (if using paid services)
- Enable Cloudflare Analytics for free traffic insights
- Set up GitHub Actions for auto-deployment

---

## 📞 Need Help?

- Check `DEPLOYMENT.md` for detailed deployment guide
- Read `README.md` for complete documentation
- Visit Cloudflare Docs: https://developers.cloudflare.com/pages/

**Happy downloading! 🎉**
