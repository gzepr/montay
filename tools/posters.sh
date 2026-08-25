#!/bin/bash
# Local video poster frames (so no request hits YouTube until the user presses play).
# Thumbnails are trimmed of any baked-in letterbox/pillarbox bars, then cropped to 16:9.
set -eu
cd "$(dirname "$0")/.."
O=assets/img/video
mkdir -p "$O"
for pair in "YI1rRKvgxgw:you-wish-you-had-time" \
            "qv6pYIjCaXE:people-we-dont-know" \
            "Ouc6xnSjY5c:entertained-live" \
            "qELy4dkaQMk:you-wish-live-supersonic"; do
  id="${pair%%:*}"; slug="${pair##*:}"
  tmp="$(mktemp -t "yt-$slug").jpg"
  curl -sfS -m 30 -o "$tmp" "https://i.ytimg.com/vi/$id/maxresdefault.jpg" \
    || curl -sfS -m 30 -o "$tmp" "https://i.ytimg.com/vi/$id/hqdefault.jpg"
  for w in 640 1120; do
    h=$(( w * 9 / 16 ))
    magick "$tmp" -fuzz 6% -trim +repage \
      -resize "${w}x${h}^" -gravity center -extent "${w}x${h}" \
      -strip -quality 76 -define webp:method=6 "$O/$slug-$w.webp"
  done
  printf '%-26s %s\n' "$slug" "$(magick identify -format '%wx%h' "$O/$slug-1120.webp")"
  rm -f "$tmp"
done
