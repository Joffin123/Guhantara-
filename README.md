# Guhantara — Pitch files

A one-page Next.js site for sharing the Guhantara pitch files:

- **Films**: three 16:9 videos.
- **Reels**: three 9:16 videos.
- **Presentation**: the Performance Audit (73 slides). It has a full-screen slide viewer, a download of the original `.pptx` and a link to the Canva version.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/deck.ts` | Video titles and durations, plus the presentation's links (`.pptx` and Canva) |
| `src/data/slides.ts` | Slide titles, used as alt text for the slide images |
| `public/media/` | Web-encoded videos (H.264, faststart) and their poster frames |
| `public/slides/` | Slides exported from PowerPoint as WebP, plus thumbnails |
| `public/files/` | The downloadable `.pptx` |

The original footage in `guhantara assets/` is git-ignored. To re-encode a video:

```bash
ffmpeg -i input.mp4 -vf scale=1280:-2 -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output.mp4
```

Use `scale=720:-2` for the vertical reels.
