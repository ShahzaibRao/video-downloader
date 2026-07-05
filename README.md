# All-in-One Video Downloader

[![Deploy to Cloudflare Pages](https://github.com/ShahzaibRao/video-downloader/actions/workflows/deploy.yml/badge.svg)](https://github.com/ShahzaibRao/video-downloader/actions/workflows/deploy.yml)

A modern, responsive web application that allows users to download videos from multiple platforms including YouTube, Instagram, Twitter/X, TikTok, Facebook, Vimeo, Reddit, and more.

## Features

- 🎥 **Multi-Platform Support**: Download videos from YouTube, Instagram, TikTok, Twitter/X, Facebook, Vimeo, Reddit, and many more
- ⚡ **Fast & Reliable**: Built on Cloudflare Pages and Workers for optimal performance
- 🎨 **Beautiful UI**: Modern, responsive design that works on all devices
- 🔒 **Privacy-Focused**: No data stored, all processing happens in real-time
- 🆓 **Free to Use**: Completely free with no hidden costs

## Supported Platforms

- YouTube (videos and shorts)
- Instagram (posts, reels, stories)
- Twitter/X (videos and GIFs)
- TikTok
- Facebook
- Vimeo
- Reddit
- Dailymotion
- And many more...

## Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript
- **Backend**: Cloudflare Workers (serverless functions)
- **Hosting**: Cloudflare Pages
- **APIs**: Uses Cobalt.tools API for video extraction

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd video-downloader
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8788`

## Deployment to Cloudflare Pages

### Method 1: Using Wrangler CLI

1. Install Wrangler (if not already installed):
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy to Cloudflare Pages:
```bash
npm run deploy
```

### Method 2: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Create a project**
4. Connect your Git repository (GitHub/GitLab)
5. Configure build settings:
   - **Build command**: Leave empty (static site)
   - **Build output directory**: `public`
6. Click **Save and Deploy**

### Method 3: Direct Upload

1. Go to Cloudflare Pages dashboard
2. Click **Create a project** → **Upload assets**
3. Upload the contents of the `public` folder
4. Your site will be live immediately

## Project Structure

```
video-downloader/
├── public/
│   └── index.html          # Main HTML file with UI
├── functions/
│   └── api/
│       └── video-info.js   # Cloudflare Workers function
├── package.json            # Dependencies
├── wrangler.toml          # Cloudflare configuration
└── README.md              # Documentation
```

## How It Works

1. **User Input**: User pastes a video URL into the input field
2. **API Request**: Frontend sends the URL to the `/api/video-info` endpoint
3. **Video Extraction**: Cloudflare Worker function uses Cobalt.tools API to extract video information
4. **Response**: Video metadata and download links are returned to the frontend
5. **Display**: User sees video information and download options

## API Endpoint

### POST `/api/video-info`

Request body:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

Response:
```json
{
  "title": "Video Title",
  "author": "Channel Name",
  "platform": "YouTube",
  "thumbnail": "https://...",
  "duration": 213,
  "formats": [
    {
      "quality": "720p",
      "url": "https://...",
      "format": "MP4",
      "filesize": 15728640
    }
  ]
}
```

## Configuration

### Using Different APIs

The default implementation uses Cobalt.tools API. You can modify the API endpoints in `functions/api/video-info.js`:

```javascript
// Change the API endpoint
const API_ENDPOINT = 'https://your-api.com/endpoint';
```

### Rate Limiting

Cobalt.tools has rate limits on their free tier. For production use, consider:
- Setting up your own yt-dlp backend
- Using paid API services
- Implementing caching mechanisms

## Limitations

- Some platforms may block or limit video extraction
- Quality options depend on what the source platform provides
- Large videos may take longer to process
- Free APIs have rate limits

## Troubleshooting

### Videos won't download
- Check if the URL is valid and publicly accessible
- Some private or age-restricted videos may not work
- Try a different video from the same platform

### API errors
- The external API service may be experiencing issues
- Check your internet connection
- Wait a few minutes and try again

### CORS errors in development
- Make sure you're using the Wrangler dev server
- Don't open the HTML file directly in the browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Legal Disclaimer

This tool is for educational purposes only. Users are responsible for complying with the terms of service of the platforms from which they download content. Always respect copyright laws and only download content you have permission to download.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- Built with ❤️ using Cloudflare Pages and Workers
- Video extraction powered by [Cobalt.tools](https://cobalt.tools)
- Icons and design inspired by modern web practices

## Support

If you find this project helpful, please star it on GitHub!

## Roadmap

- [ ] Add playlist support
- [ ] Implement video quality selection
- [ ] Add audio-only download option
- [ ] Create browser extension
- [ ] Add batch download functionality
- [ ] Implement download history
- [ ] Add subtitle download support
