# 🎬 VidDrop

A premium, glassmorphism-styled web application for downloading **open and authorized** media from Internet Archive, Wikimedia Commons, NASA, and direct media file URLs.

> **Important:** VidDrop only works with sources that explicitly permit downloading. YouTube, Vimeo, TikTok, Instagram, and other platform-restricted sources are intentionally blocked.

---

## ✨ Features

- 🎨 **Glassmorphism UI** — animated aurora background, dark/light mode, smooth transitions
- 🔍 **Auto-fetch** — paste a URL and metadata loads automatically
- 🖼️ **Rich preview** — thumbnail, title, duration, uploader
- 📦 **Quality selection** — all available resolutions shown as clickable cards (144p → 1080p+)
- ⬇️ **Instant download** — click a resolution card to start the download immediately
- 📊 **Download progress** — animated progress indicator
- ❌ **Proper errors** — clear messages for unsupported or broken URLs
- 📱 **Fully responsive** — mobile-first design

---

## 🚀 Quick Start

### Prerequisites

| Tool | Min version | Install |
|------|------------|---------|
| Node.js | 18.x | https://nodejs.org |
| yt-dlp | latest | See below |
| ffmpeg | any | See below |

### 1. Install yt-dlp

**macOS (Homebrew):**
```bash
brew install yt-dlp
```

**Linux:**
```bash
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

**Windows:**
Download `yt-dlp.exe` from https://github.com/yt-dlp/yt-dlp/releases and add it to your PATH.

### 2. Install ffmpeg (required for format merging)

**macOS:** `brew install ffmpeg`  
**Linux:** `sudo apt install ffmpeg`  
**Windows:** https://ffmpeg.org/download.html

### 3. Set up and run VidDrop

```bash
# Clone / copy this folder, then:
cd viddrop

# Install Node dependencies
npm install

# Copy env config
cp .env.example .env

# Start the server
npm start
# or for development with auto-reload:
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📂 Project Structure

```
viddrop/
├── server.js              # Express entry point
├── package.json
├── .env.example
├── routes/
│   ├── info.js            # POST /api/info — fetch metadata
│   └── download.js        # GET  /api/download — stream file
├── utils/
│   └── allowlist.js       # Domain allow-list & validation
└── public/
    ├── index.html         # Single-page app
    ├── css/
    │   └── style.css      # All styles (glassmorphism, aurora, responsive)
    └── js/
        └── app.js         # Frontend logic
```

---

## 🌐 Supported Sources

| Source | Why it's allowed |
|--------|-----------------|
| **archive.org** | Explicitly offers free downloads of public-domain / openly licensed works |
| **commons.wikimedia.org** | All media is CC-licensed or public domain |
| **nasa.gov / images.nasa.gov** | US government works, not subject to copyright |
| **Direct media URLs** (.mp4, .webm, .ogv, .mkv, …) | User supplies their own hosted content |

To add more sources, edit `utils/allowlist.js` — document the authorization basis in a comment.

---

## 🚫 Blocked Sources

The following are intentionally **not supported** and will return a clear error:

- YouTube / youtu.be
- Vimeo
- Twitch
- TikTok
- Instagram / Facebook
- X (Twitter)
- Netflix, Spotify, and other DRM-protected services

---

## ⚙️ API Reference

### `POST /api/info`
Fetch metadata for a URL.

**Body:** `{ "url": "https://archive.org/..." }`

**Response:**
```json
{
  "title": "Example Film",
  "thumbnail": "https://...",
  "durationStr": "1:23:45",
  "uploader": "Internet Archive",
  "formats": [
    { "formatId": "22", "label": "720p", "ext": "mp4", "filesizeStr": "312.4 MB" }
  ]
}
```

### `GET /api/download?url=...&formatId=...&title=...&ext=...`
Streams the selected format directly to the browser as a file download.

---

## 🔒 Legal Notice

This software is provided for legitimate use only. You are responsible for ensuring you have the right to download any content. The developer assumes no liability for misuse.

---

## 📄 License

MIT
