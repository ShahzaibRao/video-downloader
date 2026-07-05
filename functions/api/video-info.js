/**
 * Cloudflare Workers function to fetch video information
 * This uses various methods to extract video data from different platforms
 */

export async function onRequestPost(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
        const { url } = await context.request.json();

        if (!url) {
            return new Response(JSON.stringify({ error: 'URL is required' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Detect platform
        const platform = detectPlatform(url);

        // Use external API service for video extraction
        // Option 1: Use a free API like cobalt.tools
        const videoInfo = await fetchFromCobalt(url);

        if (videoInfo.error) {
            throw new Error(videoInfo.error);
        }

        return new Response(JSON.stringify(videoInfo), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message || 'Failed to fetch video information'
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
}

// Handle CORS preflight
export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}

/**
 * Detect platform from URL
 */
function detectPlatform(url) {
    const urlLower = url.toLowerCase();

    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
        return 'YouTube';
    } else if (urlLower.includes('instagram.com')) {
        return 'Instagram';
    } else if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
        return 'Twitter/X';
    } else if (urlLower.includes('tiktok.com')) {
        return 'TikTok';
    } else if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch')) {
        return 'Facebook';
    } else if (urlLower.includes('vimeo.com')) {
        return 'Vimeo';
    } else if (urlLower.includes('reddit.com')) {
        return 'Reddit';
    } else if (urlLower.includes('dailymotion.com')) {
        return 'Dailymotion';
    }

    return 'Unknown';
}

/**
 * Fetch video info using Cobalt API (cobalt.tools)
 * This is a free, open-source service that supports many platforms
 */
async function fetchFromCobalt(url) {
    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url,
                vCodec: 'h264',
                vQuality: '720',
                aFormat: 'mp3',
                isAudioOnly: false,
                disableMetadata: false
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from Cobalt API');
        }

        const data = await response.json();

        if (data.status === 'error' || data.status === 'rate-limit') {
            return { error: data.text || 'Service error or rate limit exceeded' };
        }

        // Parse Cobalt response
        return parseCobaltResponse(data, url);

    } catch (error) {
        // Fallback to alternative method
        return await fetchFromAlternativeAPI(url);
    }
}

/**
 * Parse Cobalt API response into our format
 */
function parseCobaltResponse(data, originalUrl) {
    const platform = detectPlatform(originalUrl);

    const result = {
        title: data.filename || 'Video',
        platform: platform,
        thumbnail: null,
        url: null,
        formats: []
    };

    // Cobalt returns different response structures
    if (data.status === 'redirect' || data.status === 'stream') {
        result.url = data.url;
        result.formats.push({
            quality: 'Best Available',
            url: data.url,
            format: data.status === 'stream' ? 'MP4' : 'Default'
        });
    } else if (data.status === 'picker') {
        // Multiple files available (e.g., Instagram carousel)
        data.picker.forEach((item, index) => {
            result.formats.push({
                quality: `Video ${index + 1}`,
                url: item.url,
                format: 'MP4'
            });
        });
        if (data.picker.length > 0) {
            result.url = data.picker[0].url;
        }
    }

    return result;
}

/**
 * Alternative API as fallback (using api.download4.cc or similar)
 */
async function fetchFromAlternativeAPI(url) {
    try {
        // Try using a different service
        const response = await fetch('https://api.download4.cc/api/ajaxSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `q=${encodeURIComponent(url)}&vt=home`
        });

        if (!response.ok) {
            throw new Error('Alternative API failed');
        }

        const data = await response.json();

        if (data.status === 'ok' && data.data) {
            return parseAlternativeResponse(data.data, url);
        }

        throw new Error('No valid response from alternative API');

    } catch (error) {
        // Final fallback - return basic info
        return {
            error: 'Unable to fetch video information. The service may be temporarily unavailable or the URL may not be supported.',
            platform: detectPlatform(url),
            url: url
        };
    }
}

/**
 * Parse alternative API response
 */
function parseAlternativeResponse(html, originalUrl) {
    const platform = detectPlatform(originalUrl);

    // This is a simplified parser - you'd need to extract from HTML
    // For now, return a basic structure
    return {
        title: 'Video from ' + platform,
        platform: platform,
        thumbnail: null,
        url: originalUrl,
        formats: [{
            quality: 'Default',
            url: originalUrl,
            format: 'MP4'
        }]
    };
}

/**
 * YouTube-specific extraction (as fallback)
 */
async function fetchYouTubeInfo(url) {
    try {
        const videoId = extractYouTubeVideoId(url);
        if (!videoId) {
            throw new Error('Invalid YouTube URL');
        }

        // Use YouTube oEmbed API for basic info
        const oembedResponse = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );

        if (!oembedResponse.ok) {
            throw new Error('Failed to fetch YouTube info');
        }

        const data = await oembedResponse.json();

        return {
            title: data.title,
            author: data.author_name,
            platform: 'YouTube',
            thumbnail: data.thumbnail_url,
            url: url,
            formats: [{
                quality: 'Visit YouTube',
                url: url,
                format: 'N/A'
            }]
        };

    } catch (error) {
        throw new Error('YouTube extraction failed: ' + error.message);
    }
}

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}
