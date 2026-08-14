# Videos

Two self-hosted videos are referenced by the site but are not in the repo
(David has the originals — Squarespace does not allow downloading them):

| File | Used on | Poster image |
| --- | --- | --- |
| `home-bg.mp4` | Home page, between "Mental health" and "Love to touch grass" | `/images/home/hero.jpg` (replace with a real frame if you like) |
| `msi-compcamps.mp4` | Community page, MSI Computer Camps entry | `/images/community/msi-compcamps-poster.jpg` |

Compress each original before dropping it in (target < 8 MB):

```bash
ffmpeg -i original.mov -c:v libx264 -crf 26 -preset slow -vf "scale='min(1920,iw)':-2" -an -movflags +faststart home-bg.mp4
```

(Keep `-an` to strip audio for the background video; drop it for the MSI video
if its audio matters.)

Extract a poster frame:

```bash
ffmpeg -i msi-compcamps.mp4 -ss 00:00:01 -frames:v 1 -q:v 3 ../images/community/msi-compcamps-poster.jpg
```

The `VideoSection` component renders nothing if the file is missing, so the
site works fine before these are added.
