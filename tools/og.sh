#!/bin/bash
set -eu
cd "$(dirname "$0")/.."
F="$1"                      # path to Montserrat ExtraBold ttf
O=assets/img/og
INK='#0c0b0e'
mkdir -p "$O"

# $1 image, $2 title, $3 eyebrow, $4 out
card () {
  local img="$1" title="$2" eyebrow="$3" out="$4"
  magick -size 1200x630 "xc:$INK" \
    \( "$img" -auto-orient -resize 630x630^ -gravity center -extent 630x630 \) \
      -gravity east -geometry +0+0 -composite \
    \( -size 380x630 gradient:"$INK"-none \) -gravity center -geometry -220+0 -composite \
    -font "$F" -fill '#e88a6d' -pointsize 30 -gravity northwest \
      -annotate +72+150 "$(echo "$eyebrow" | tr '[:lower:]' '[:upper:]')" \
    -font "$F" -fill '#f4efe8' -pointsize 62 \
      -annotate +72+215 "$title" \
    -font "$F" -fill '#86bfdd' -pointsize 24 -gravity southwest \
      -annotate +72+68 "MONTAY  ·  PARIS" \
    -quality 86 "$O/$out.jpg"
}

card assets/images/montay-grey-header.jpg "Montay"                    "Alternative rock from Paris" home
card assets/images/montay_profile_pastel.png "About\nthe band"        "Montay"                      about
card assets/images/artworks/girl.jpeg "A Girl From\nThe Islands"      "EP"                          ep-a-girl-from-the-islands
card assets/images/artworks/escape.jpeg "Escape"                      "Song · Lyrics"               song-escape
card assets/images/artworks/people.jpeg "People We\nDon't Know"       "Song · Lyrics"               song-people-we-dont-know
card assets/images/artworks/self.jpeg "Self-\nPreservation"           "Song · Lyrics"               song-self-preservation
card assets/images/artworks/wish.jpeg "You Wish\nYou Had Time"        "Song · Lyrics"               song-you-wish-you-had-time
card assets/images/artworks/girl.jpeg "A Girl From\nThe Islands"      "Song · Lyrics"               song-a-girl-from-the-islands
card "assets/images/photos/02012023 (21).jpeg" "Photos"               "Live & portraits"            photos
card assets/img/video/you-wish-you-had-time-1120.webp "Videos"        "Official & live"             videos
card assets/images/ep2comingsoon.jpg "News"                           "Montay"                      news
card assets/images/ep2comingsoon.jpg "Second EP\nin the works"        "News"                        second-ep-announcement
card assets/img/video/entertained-live-1120.webp "Entertained\n(Live)" "New video"                  entertained-live
card assets/images/Montay_Supersonic.jpg "Live at\nSupersonic"        "Concert"                     concert-supersonic
card "assets/images/photos/02012023 (5).jpeg" "New photos"            "News"                        new-photos
card assets/img/video/you-wish-you-had-time-1120.webp "You Wish You\nHad Time" "Official video"     video-you-wish-you-had-time
card assets/img/video/people-we-dont-know-1120.webp "People We\nDon't Know" "Official video"        video-people-we-dont-know
card assets/images/artworks/girl.jpeg "Songs"                         "Lyrics & artwork"            songs
echo "OG cards:"; ls "$O"
