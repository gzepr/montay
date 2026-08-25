# montay.band — gzepr.github.io/montay

The Montay website. Plain static HTML, CSS and a little vanilla JavaScript —
no Jekyll, no framework, no build step at serve time. GitHub Pages serves the
committed files exactly as they are (`.nojekyll` turns the Jekyll build off).

## What's where

| Path | What it is |
| --- | --- |
| `index.html`, `about/`, `songs/`, `videos/`, `photos/`, `news/` | the site — generated, don't hand-edit |
| `404.html`, `sitemap.xml`, `robots.txt`, `feed.xml`, `manifest.webmanifest` | also generated |
| `tools/build.mjs` | **the single source of truth for content** — songs, lyrics, news, videos, band members |
| `assets/css/site.css` | the whole stylesheet (hand-written) |
| `assets/js/site.js` | mobile menu, lightbox, click-to-play videos (~6 KB) |
| `assets/fonts/` | self-hosted Montserrat (latin + latin-ext subsets) |
| `assets/img/` | **optimised** WebP the site actually serves |
| `assets/images/` | the original full-size photos and artwork (sources, never served) |

## Changing the site

Content lives in `tools/build.mjs` — edit the data blocks near the top
(`SONGS`, `NEWS`, `VIDEOS`, `MEMBERS`, `PLATFORMS`), then:

```bash
node tools/build.mjs
```

That rewrites every HTML page, the sitemap and the RSS feed. Commit the result.

### Adding photos

Drop the originals in `assets/images/photos/`, list them (in display order) in a
text file one per line, then:

```bash
./tools/images.sh /path/to/list.txt && node tools/build.mjs
```

This writes a 760 px-tall WebP thumbnail and an 1800 px WebP for the lightbox,
plus `assets/img/photos.tsv`, which the build reads for dimensions.

### Other image helpers

```bash
./tools/posters.sh     # re-fetch YouTube poster frames (trimmed, 16:9 WebP)
./tools/newscards.sh   # the uniform 16:10 news card images
./tools/og.sh <path-to-Montserrat-ExtraBold.ttf>   # social share cards
```

## Checking your work

```bash
node tools/check.mjs   # every internal link and asset resolves
node tools/audit.mjs   # titles, descriptions, canonicals, alt text, headings, JSON-LD
```

Preview locally at the same subpath as production (`/montay/`), which is what
the relative links assume:

```bash
python3 -m http.server 4321 --directory ..
```

then open <http://localhost:4321/montay/>.

Screenshots for design review (`tools/shots.sh <path> <name> <width> <height>`;
widths under 500 px are rendered in an iframe harness because headless Chrome
clamps its window width):

```bash
SHOTDIR=/tmp/shots ./tools/shots.sh "/songs/" songs 1440 1200
```

## How it stays fast

- Zero third-party requests. No web-font CDN, no icon font, no jQuery, no
  analytics. Icons are inline SVG; Montserrat is self-hosted and subset.
- YouTube and Facebook videos are click-to-play facades over a local poster
  image — nothing is requested from those domains until you press play.
- Every image is a sized WebP with `width`/`height` set (no layout shift) and
  `loading="lazy"` below the fold. The photo gallery went from ~240 MB of
  full-size JPEGs to ~200 KB on first paint.
- One stylesheet and one script, both cached across pages.

## SEO

Per-page `<title>`, meta description, canonical, Open Graph and Twitter cards
with a generated 1200×630 share image; JSON-LD for `MusicGroup`, `MusicAlbum`,
`MusicRecording`, `VideoObject`, `NewsArticle` and breadcrumbs; a sitemap and an
RSS feed.

Every URL the old Jekyll site published still works — the old paths
(`/ep_a_girl_from_the_islands/`, `/entertained_live/`, `/VIDEO-You-Wish-You-Had-Time/`,
…) are redirect stubs pointing at the new `/news/…` pages, with `noindex` and a
canonical to the destination.
