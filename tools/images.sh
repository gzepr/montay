#!/bin/bash
# Generates optimized WebP derivatives for the Montay site.
# Sources live in assets/images/ (originals, untouched). Output: assets/img/
set -u
cd "$(dirname "$0")/.."
SRC=assets/images
OUT=assets/img
ORDER="$1"          # file listing referenced gallery photos, in display order
MANIFEST="$OUT/photos.tsv"

: > "$MANIFEST"
i=0
while IFS= read -r f; do
  [ -z "$f" ] && continue
  i=$((i+1))
  case "$f" in
    02012023*) n=$(echo "$f" | sed -E 's/.*\(([0-9]+)\).*/\1/'); slug=$(printf 'live-supersonic-%02d' "$n") ;;
    *)         n=$(echo "$f" | sed -E 's/[^0-9]*([0-9]+).*/\1/'); slug=$(printf 'montay-band-%02d' "$n") ;;
  esac
  src="$SRC/photos/$f"
  # thumbnail (grid) and full (lightbox)
  magick "$src" -auto-orient -strip -resize 'x760>' -quality 70 -define webp:method=6 "$OUT/photos/t/$slug.webp"
  magick "$src" -auto-orient -strip -resize '1800x1800>' -quality 76 -define webp:method=6 "$OUT/photos/f/$slug.webp"
  dims=$(magick identify -format '%w %h' "$OUT/photos/f/$slug.webp")
  printf '%d\t%s\t%s\t%s\n' "$i" "$slug" "$dims" "$f" >> "$MANIFEST"
  printf '.'
done < "$ORDER"
echo " photos done ($i)"
