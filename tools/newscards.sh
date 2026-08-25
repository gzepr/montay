#!/bin/bash
# One uniform 16:10 card image per news item, so the news grid lines up.
set -eu
cd "$(dirname "$0")/.."
O=assets/img/card
mkdir -p "$O"
card () { # $1 src  $2 slug  $3 gravity
  for w in 720 1440; do
    h=$(( w * 10 / 16 ))
    magick "$1" -auto-orient -resize "${w}x${h}^" -gravity "$3" -extent "${w}x${h}" \
      -strip -quality 78 -define webp:method=6 "$O/$2-$w.webp"
  done
  printf '%-30s %s\n' "$2" "$(magick identify -format '%wx%h' "$O/$2-720.webp")"
}
card assets/images/ep2comingsoon.jpg                second-ep-announcement      north
card assets/img/video/entertained-live-1120.webp    entertained-live-video      center
card "assets/images/photos/02012023 (21).jpeg"      live-at-supersonic          center
card assets/img/video/people-we-dont-know-1120.webp people-we-dont-know-video   center
card assets/img/video/you-wish-you-had-time-1120.webp you-wish-you-had-time-video center
card assets/images/MONTAY_EXE2.png                  a-girl-from-the-islands-ep  center
card "assets/images/photos/02012023 (35).jpeg"      new-photos                  center
