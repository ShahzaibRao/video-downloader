# Deployment Guide for Cloudflare Pages

This guide will walk you through deploying your video downloader to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier is sufficient)
- Git installed on your system
- Node.js and npm installed

## Option 1: Deploy via Wrangler CLI (Recommended)

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

Or install locally in the project:

```bash
npm install
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open a browser window for authentication.

### Step 3: Deploy

```bash
cd video-downloader
npm run deploy
```

Or if using global Wrangler:

```bash
wrangler pages deploy public
```

### Step 4: Access Your Site

After deployment, Wrangler will provide you with a URL like:
```
https://video-downloader-xxx.pages.dev
```

## Option 2: Deploy via Git Integration

### Step 1: Push to GitHub

1. Create a new GitHub repository
2. Initialize git in your project:

```bash
cd video-downloader
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/video-downloader.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your repository
6. Configure build settings:
   - **Project name**: video-downloader
   - **Production branch**: main
   - **Build command**: (leave empty)
   - **Build output directory**: `public`
   - **Root directory**: `/`

7. Click **Save and Deploy**

### Step 3: Wait for Deployment

Cloudflare will build and deploy your site. This usually takes 1-2 minutes.

## Option 3: Direct Upload (Quickest for Testing)

### Step 1: Access Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Create a project**
4. Click **Upload assets**

### Step 2: Upload Files

1. Select or drag the `public` folder
2. Give your project a name
3. Click **Deploy site**

**Note**: With direct upload, you'll need to manually re-upload the `functions` folder separately after initial deployment.

## Post-Deployment Configuration

### Custom Domain (Optional)

1. In your Pages project, click **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain name
4. Follow DNS configuration instructions

### Environment Variables (If Needed)

1. Go to your Pages project settings
2. Click **Environment variables**
3. Add any required variables
4. Redeploy for changes to take effect

## Verifying Deployment

### Test the Frontend

Visit your deployed URL and check:
- [ ] Page loads correctly
- [ ] UI displays properly
- [ ] Input field is functional

### Test the API

1. Paste a YouTube video URL
2. Click "Get Video Info"
3. Check if video information appears

## Common Issues and Solutions

### Issue: Functions not working

**Solution**: Make sure the `functions` directory structure is correct:
```
functions/
  api/
    video-info.js
```

The path must match the API endpoint in your HTML (`/api/video-info`).

### Issue: CORS errors

**Solution**: Check that your Worker function includes proper CORS headers:
```javascript
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};
```

### Issue: API rate limits

**Solution**: The free Cobalt.tools API has rate limits. For production:
- Implement caching
- Set up your own backend
- Use alternative APIs
- Add rate limiting on your end

### Issue: Some videos won't download

**Possible causes**:
- Video is private or age-restricted
- Platform has blocking mechanisms
- URL format not supported
- API service is down

**Solutions**:
- Test with different videos
- Check video accessibility
- Try alternative platforms
- Check API service status

## Monitoring and Analytics

### Enable Cloudflare Analytics

1. Go to your Pages project
2. Click **Analytics**
3. View traffic, requests, and errors

### Enable Logpush (Pro plan required)

For detailed logging:
1. Go to **Analytics** → **Logs**
2. Set up Logpush to your preferred destination

## Updating Your Deployment

### Via Git (if using Git integration)

```bash
git add .
git commit -m "Update description"
git push
```

Cloudflare will automatically redeploy.

### Via Wrangler

```bash
npm run deploy
```

### Via Direct Upload

Re-upload the `public` folder through the dashboard.

## Production Checklist

Before going live, ensure:

- [ ] All API endpoints are working
- [ ] Error handling is in place
- [ ] CORS headers are configured
- [ ] Mobile responsiveness is tested
- [ ] Legal disclaimer is present
- [ ] Analytics are enabled
- [ ] Custom domain is configured (if needed)
- [ ] HTTPS is enabled (automatic with Cloudflare)
- [ ] Rate limiting is considered

## Cost Considerations

### Cloudflare Pages Free Tier

- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ Free SSL
- ✅ DDoS protection

### Potential Costs

- Custom domains (if registering through Cloudflare)
- Pro plan features (optional)
- Workers KV or Durable Objects (if you add them)

## Security Recommendations

1. **Rate Limiting**: Implement rate limiting to prevent abuse
2. **Input Validation**: Validate all URLs on the backend
3. **Error Handling**: Don't expose internal errors to users
4. **API Keys**: If using paid APIs, store keys as environment variables
5. **HTTPS Only**: Ensure all traffic uses HTTPS (default with Cloudflare)

## Performance Optimization

1. **Caching**: Implement caching for frequently requested videos
2. **CDN**: Cloudflare automatically uses their CDN
3. **Minification**: Consider minifying HTML/CSS/JS for production
4. **Image Optimization**: Use Cloudflare's image optimization

## Support and Troubleshooting

- **Cloudflare Status**: https://www.cloudflarestatus.com/
- **Cloudflare Community**: https://community.cloudflare.com/
- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/
- **Pages Docs**: https://developers.cloudflare.com/pages/

## Next Steps

After deployment:

1. Share your site URL
2. Gather user feedback
3. Monitor analytics
4. Plan feature improvements
5. Consider adding more platforms
6. Implement user-requested features

---

**Congratulations!** Your video downloader is now live on Cloudflare Pages! 🎉
