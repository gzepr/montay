#!/bin/bash
# Screenshots of the local site for design review.
#   ./tools/shots.sh <path> <name> <width> <height>
# Headless Chrome on macOS clamps the window to >= 500px wide, so narrow
# widths are rendered inside an iframe harness of the exact CSS width and the
# screenshot is cropped back to it. That gives a true mobile viewport.
set -u
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="${SHOTDIR:?set SHOTDIR}"
BASE="${BASE:-http://localhost:4321/montay}"
HARNESS_DIR="${HARNESS_DIR:-$(cd "$(dirname "$0")/.." && pwd)/_tmptest}"
mkdir -p "$OUT" "$HARNESS_DIR"

path="$1"; name="$2"; w="$3"; h="$4"
MIN=500

if [ "$w" -ge "$MIN" ]; then
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb \
    --virtual-time-budget=5000 --window-size="$w,$h" \
    --screenshot="$OUT/$name.png" "$BASE$path" >/dev/null 2>&1
else
  cat > "$HARNESS_DIR/_frame.html" <<HTML
<!doctype html><meta charset="utf-8"><title>frame</title>
<style>html,body{margin:0;padding:0;background:#0c0b0e}
iframe{display:block;border:0;width:${w}px;height:${h}px}</style>
<iframe src="$BASE$path" scrolling="no"></iframe>
HTML
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb \
    --virtual-time-budget=5000 --window-size="$MIN,$h" \
    --screenshot="$OUT/_raw-$name.png" "$BASE/_tmptest/_frame.html" >/dev/null 2>&1
  magick "$OUT/_raw-$name.png" -crop "${w}x${h}+0+0" +repage "$OUT/$name.png" 2>/dev/null
  rm -f "$OUT/_raw-$name.png"
fi
printf '%-26s %-12s %s\n' "$name" "${w}x${h}" "$(magick identify -format '%wx%h' "$OUT/$name.png" 2>/dev/null)"
