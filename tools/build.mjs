/* ===========================================================================
   Montay — static site generator.

   This script is the single source of truth for the site's *content*.
   It writes plain, self-contained HTML files into the repository root; those
   files are what GitHub Pages serves. There is no runtime dependency on
   anything here — the output is pure static HTML/CSS/JS.

   To change the site:  edit the data blocks below, then run
       node tools/build.mjs
   Images are prepared separately by tools/images.sh and tools/og.sh.
   =========================================================================== */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ===========================================================================
   1. SITE
   =========================================================================== */

const SITE = {
  name: "Montay",
  tagline: "Alternative rock from Paris",
  origin: "https://gzepr.github.io",
  base: "/montay", // GitHub Pages project subpath
  locale: "en",
  description:
    "Montay is a Paris-based alternative rock band. Songs, lyrics, videos, photos and news — including the EP A Girl From The Islands.",
  founded: "Paris, France",
};
const ABS = SITE.origin + SITE.base; // absolute site root, no trailing slash

/* ===========================================================================
   2. PLATFORMS & SOCIALS
   =========================================================================== */

const PLATFORMS = [
  {
    id: "spotify",
    label: "Spotify",
    url: "https://open.spotify.com/artist/7AFDG2Gc7YETUEeu8gw4QB",
    color: "#1ed760",
  },
  {
    id: "apple",
    label: "Apple Music",
    url: "https://music.apple.com/fr/artist/montay/1633065834",
    color: "#fa586a",
  },
  {
    id: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/@montayband",
    color: "#ff4e45",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/montay_band",
    color: "#e17bb0",
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/montayband",
    color: "#5a8ce8",
  },
];
const ALL_LINKS = "https://onerpm.link/630020826413"; // every-platform link for the EP

/* ===========================================================================
   3. BAND
   =========================================================================== */

const MEMBERS = [
  { who: "Eric Humbert", what: "Lead vocals, keyboards" },
  { who: "Arthur Belhomme", what: "Guitar" },
  { who: "Arnaud Forgues", what: "Guitar" },
  { who: "David Libault", what: "Bass" },
  { who: "Bruce Forgues", what: "Drums" },
];

const INFLUENCES = ["Radiohead", "Queen", "David Bowie", "The Beatles"];

const BIO_HTML = `<p>Montay is a Paris-based alternative rock band that draws on a wide range
of influences — Radiohead, Queen, David Bowie, the Beatles. The band builds
around intricate guitar and piano arrangements and a distinctive, emotive lead
vocal, for a sound that is both powerful and nuanced.</p>
<p>Montay's music invites listeners to question the status quo, seek out new
experiences and find their own path. Through introspective, thought-provoking
lyrics it offers a genuinely immersive listen — for anyone who likes
alternative rock that is musically elaborate and emotionally resonant.</p>`;

/* ===========================================================================
   4. THE EP
   =========================================================================== */

const EP = {
  title: "A Girl From The Islands",
  slug: "a-girl-from-the-islands",
  year: "2022",
  released: "2022-07-12",
  cover: "art/ep-a-girl-from-the-islands",
  links: ALL_LINKS,
};

/* ===========================================================================
   5. SONGS  (order below = order shown on the site)
   =========================================================================== */

const SONGS = [
  {
    slug: "a-girl-from-the-islands",
    title: "A Girl From The Islands",
    art: "art/a-girl-from-the-islands",
    accent: "#94b2e2",
    credits: "Eric Humbert",
    video: null,
    blurb:
      "The title track: a lift, a python, and a love story told in silence.",
    lyrics: `Nobody notices me
Except when I'm out with my python
I enjoy people looking at me
But they're afraid and they call the police

And I'm gonna get married
With this girl from the islands
She knows that I exist
She smiles to me in the lift

I live in a demographic city
I try to be one among millions
I feel so dangerously close to zero
That I wish I could be just two

When the world is missing outside,
There's still my python by my side
It coils up around my heat with no harm
Hugs my body with its long arm

And I'm gonna get married
With this girl from the islands
She knows that I exist
She smiles to me in the lift

Each morning at the office, I wait
For her to get into the same lift
She's wearing boots and a mini-skirt
And each floor is a stop on our lovers' trip

But I'm gonna get married
With a girl from the islands
She knows that I exist
She smiles to me in the lift

And I do my best silence
While we're travelling in the lift
Yes I do my best silence
While we're travelling in the lift`,
  },
  {
    slug: "you-wish-you-had-time",
    title: "You Wish You Had Time",
    art: "art/you-wish-you-had-time",
    accent: "#93d7ba",
    credits: "Eric Humbert",
    video: "YI1rRKvgxgw",
    blurb:
      "An old man plants a tree. Two ways of living with the same short life.",
    lyrics: `Once I met an old man planting a tree
In it's garden, and i wondered why
He said he'd always liked to live his life as if
He would never die eventually
That was a surprise, i thought: "How interesting
I use to do the other way around
I always live as if I'll die tomorrow!"

You wish you had time
To do more things
You wish you had time
To do nothing
You wish you had time
To do more things
You wish you had time
To do nothing

Once i met an old man planting a tree
In it's garden, and i wondered why
He said he'd always liked to live his life as if
He would never die eventually
That was a surprise, i thought: "How interesting
I use to do the other way around
I always live as if I'll die tomorrow!"

You wish you had time
To do more things
You wish you had time
To do nothing
You wish you had time
To do more things
You wish you had time
To do nothing

Should I jump in?
Add my own melody?
Or should I just sit
And enjoy the music?
Is it best to be a bird fighting gravity?
Or a snake feeling earth all along its body?

You wish you had time
To do more things
You wish you had time
To do nothing
You wish you had time
To do more things
You wish you had time
To do nothing`,
  },
  {
    slug: "people-we-dont-know",
    title: "People We Don't Know",
    art: "art/people-we-dont-know",
    accent: "#a78fcb",
    credits: "Eric Humbert",
    video: "qv6pYIjCaXE",
    blurb:
      "Hating is easy and loving strangers is not — and it is still the only way out.",
    lyrics: `It's easy to be mean or intolerant
Always have someone to blame is convenient
It's easy to fall in love and to have friends
Easy to find someone to hate or even kill

It's not easy to love
People we don't know
But it's the only way
For us to live in peace
We say it's a foolish dream
When we don't want to try

What if God was a sparse consciousness
That universal love is the safe way to go
And as it's opposite to our natural instinct
We believe this thought is coming from above

It's not easy to love
People we don't know
But it's the only way
For us to live in peace
Think of them as ourselves
Don't we want to be loved?

It's not easy to love
People we don't know
But it's the only way
For us to live in peace
We say it's a foolish dream
But we don't want to try`,
  },
  {
    slug: "escape",
    title: "Escape",
    art: "art/escape",
    accent: "#e8b15a",
    credits: "Eric Humbert",
    video: null,
    blurb:
      "Two people, one small burning coal, and the horizon of dreams they run for.",
    lyrics: `Standing by the absurd river
flowing downhill for the fools
days go by and fade wherever
And no one can change the rules

Together we hide
a burning lump of coal
It does not shed much light
but it warms our soul
Nothing else matters
When I look at you, beautiful
And the promise in your eyes

Let me escape with you
To the horizon of dreams
We'll find something new
If we spread our wings

we'll laugh at death eyes in the eyes
we'll cry at life hands in the hands
we'll share the wine of loving memories

All around is washed-out despair
A second-rate reality
Dust is floating bored in the air
Doomed for eternity

Together we hide
A burning lump of coal
It does not shed much light
But it warms our soul
Nothing else matters
When I look at you, beautiful
And the promise in your eyes

Let me escape with you
To the horizon of dreams
We'll find something new
If we spread our wings`,
  },
  {
    slug: "self-preservation",
    title: "Self-Preservation",
    art: "art/self-preservation",
    accent: "#a8c39a",
    credits: "Eric Humbert",
    video: null,
    blurb:
      "How fragile the world you were born into really is — and what you would do.",
    lyrics: `My world is a friend
So close and familiar
That I could think
It was born with me

My world 's filled with men
Whose behavior seems so natural
Cause it's the one
I have always seen

My world yet was built
By million men brains and hearts
And blood
My world is fragile
And we can come back again
As history can tell
Barbarians

Where would I run?
Where would I hide?
Who would I kill to save my folks?
When my world
Has come back to wild.
Wild!

My world is a friend
So close and familiar
That I could think
It was born with me

My world 's filled with men
Whose behavior seems so natural
Cause it's the one
I have always seen

My world yet was built
By million men brains and hearts
And blood
My world is fragile
And we can come back again
As history can tell
Barbarians

Where would I run?
Where would I hide?
Who would I kill to save my folks?
When my world
Has come back to wild.
Wild!`,
  },
];

/* ===========================================================================
   6. VIDEOS
   =========================================================================== */

const VIDEOS = {
  official: [
    {
      id: "YI1rRKvgxgw",
      title: "You Wish You Had Time",
      note: "Official video · 2022",
      poster: "video/you-wish-you-had-time",
      date: "2022-09-27",
      song: "you-wish-you-had-time",
    },
    {
      id: "qv6pYIjCaXE",
      title: "People We Don't Know",
      note: "Official video · 2022",
      poster: "video/people-we-dont-know",
      date: "2022-10-30",
      song: "people-we-dont-know",
    },
  ],
  live: [
    {
      id: "Ouc6xnSjY5c",
      title: "Entertained — Live in Paris",
      note: "Live · 2025 · from the upcoming second EP",
      poster: "video/entertained-live",
      date: "2025-07-14",
      song: null,
    },
    {
      id: "qELy4dkaQMk",
      title: "You Wish You Had Time — Live at Supersonic",
      note: "Live at Supersonic, Paris",
      poster: "video/you-wish-live-supersonic",
      date: "2023-01-02",
      song: "you-wish-you-had-time",
    },
  ],
  archive: [
    {
      fb: "https://www.facebook.com/mondaypartymusic/videos/2155446771139335/",
      title: "Live session",
      note: "From the archive",
    },
    {
      fb: "https://www.facebook.com/mondaypartymusic/videos/1719953054688711/",
      title: "Live session",
      note: "From the archive",
    },
    {
      fb: "https://www.facebook.com/mondaypartymusic/videos/1719945058022844/",
      title: "Live session",
      note: "From the archive",
    },
  ],
};

/* ===========================================================================
   7. NEWS  (newest first). `legacy` = old Jekyll URL, gets a redirect stub.
   =========================================================================== */

const NEWS = [
  {
    slug: "second-ep-announcement",
    legacy: "second_ep_announcement",
    date: "2025-08-12",
    title: "We're working on our second EP",
    excerpt:
      "New creative territory and fresh sounds after A Girl From The Islands — with behind-the-scenes to come.",
    card: "second-ep-announcement",
    og: "second-ep-announcement",
    body: `<p>We're excited to share that we're currently working on our second EP.
After <em>A Girl From The Islands</em>, we're diving into new creative territory
and exploring fresh sounds that we can't wait for you to hear.</p>
<p>Stay tuned for more updates as we progress through the recording process.
We'll be sharing behind-the-scenes content and sneak peeks in the coming months.</p>
<figure>
  <img src="{{root}}assets/img/news/ep2-coming-soon-1024.webp" width="1024" height="1024"
       alt="Montay EP #2 coming soon artwork" loading="lazy" decoding="async">
  <figcaption>Our second EP is coming soon.</figcaption>
</figure>
<p>Thank you for your continued support — we can't wait to share this new
chapter with you all.</p>`,
  },
  {
    slug: "entertained-live-video",
    legacy: "entertained_live",
    date: "2025-07-14",
    title: "New video: Entertained (live)",
    excerpt:
      "A live recording of Entertained is up on YouTube. The studio version lands on the second EP.",
    card: "entertained-live-video",
    og: "entertained-live",
    body: `<p>A live recording of our song <em>Entertained</em> is now available on YouTube.
The studio version will be released later this year on our upcoming second EP.</p>
{{video:Ouc6xnSjY5c:video/entertained-live:Entertained — Montay live in Paris}}`,
  },
  {
    slug: "live-at-supersonic",
    legacy: "concert-supersonic",
    date: "2022-12-25",
    title: "Live at Supersonic for the EP launch",
    excerpt:
      "Montay on stage at Supersonic, Paris, to launch the EP A Girl From The Islands.",
    card: "live-at-supersonic",
    og: "concert-supersonic",
    body: `<p>A concert for the launch of our EP <em>A Girl From The Islands</em>,
live at Supersonic in Paris.</p>
<figure>
  <img src="{{root}}assets/img/news/supersonic-poster-1400.webp" width="1400" height="1977"
       alt="Poster for Montay live at Supersonic, Paris" loading="lazy" decoding="async">
  <figcaption>Montay live at Supersonic — EP launch.</figcaption>
</figure>
<p>Photos from the night are in the <a href="{{root}}photos/">gallery</a>, and a live
take of <em>You Wish You Had Time</em> recorded there is on the
<a href="{{root}}videos/">videos page</a>.</p>`,
  },
  {
    slug: "people-we-dont-know-video",
    legacy: "Video-People-We-Dont-Know",
    date: "2022-10-30",
    title: "Official video: People We Don't Know",
    excerpt:
      "The official video for People We Don't Know, from the Montay EP A Girl From The Islands, is out now on YouTube.",
    card: "people-we-dont-know-video",
    og: "video-people-we-dont-know",
    body: `<p>The official video for <em>People We Don't Know</em> is out now.</p>
{{video:qv6pYIjCaXE:video/people-we-dont-know:People We Don't Know — official video}}
<p>Read the <a href="{{root}}songs/people-we-dont-know/">lyrics</a>.</p>`,
  },
  {
    slug: "you-wish-you-had-time-video",
    legacy: "VIDEO-You-Wish-You-Had-Time",
    date: "2022-09-27",
    title: "Official video: You Wish You Had Time",
    excerpt:
      "Our first official video, for You Wish You Had Time, is out now on YouTube — from the EP A Girl From The Islands.",
    card: "you-wish-you-had-time-video",
    og: "video-you-wish-you-had-time",
    body: `<p>Our official video for <em>You Wish You Had Time</em> is out now.</p>
{{video:YI1rRKvgxgw:video/you-wish-you-had-time:You Wish You Had Time — official video}}
<p>Read the <a href="{{root}}songs/you-wish-you-had-time/">lyrics</a>.</p>`,
  },
  {
    slug: "a-girl-from-the-islands-ep",
    legacy: "ep_a_girl_from_the_islands",
    date: "2022-07-12",
    title: "New EP: A Girl From The Islands is out",
    excerpt:
      "A Girl From The Islands, the first Montay EP — five songs — is out now and available on every streaming platform.",
    card: "a-girl-from-the-islands-ep",
    og: "ep-a-girl-from-the-islands",
    body: `<p><em>A Girl From The Islands</em>, our first EP, is out now and available on
<a href="${ALL_LINKS}" rel="noopener">every platform</a>.</p>
<figure>
  <img src="{{root}}assets/img/art/ep-a-girl-from-the-islands-1200.webp" width="1200" height="1200"
       alt="Cover of the Montay EP A Girl From The Islands" loading="lazy" decoding="async">
  <figcaption>A Girl From The Islands — cover artwork.</figcaption>
</figure>
<p>All five songs, with lyrics and artwork, are on the
<a href="{{root}}songs/">songs page</a>.</p>`,
  },
  {
    slug: "new-photos",
    legacy: "new-photos",
    date: "2022-07-02",
    title: "New photos in the gallery",
    excerpt:
      "A fresh batch of live shots and portraits from Montay has been added to the photo gallery.",
    card: "new-photos",
    og: "new-photos",
    body: `<p>A fresh batch of live shots and portraits has been added to the
<a href="{{root}}photos/">photo gallery</a>.</p>`,
  },
];

/* ===========================================================================
   8. PHOTOS — read from the manifest written by tools/images.sh
   =========================================================================== */

const PHOTOS = readFileSync(join(ROOT, "assets/img/photos.tsv"), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    const [i, slug, dims, src] = line.split("\t");
    const [w, h] = dims.trim().split(/\s+/).map(Number);
    const live = slug.startsWith("live-");
    return {
      i: Number(i),
      slug,
      w,
      h,
      src,
      alt: live
        ? "Montay live at Supersonic, Paris"
        : "Montay — band photo",
    };
  });

/* ===========================================================================
   9. HELPERS
   =========================================================================== */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const human = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
const shortDate = (iso) => {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1].slice(0, 3)} ${y}`;
};
const rfc822 = (iso) => new Date(iso + "T09:00:00Z").toUTCString();

/* depth → relative prefix, so the site works on any subpath */
const upTo = (n) => (n === 0 ? "" : "../".repeat(n));

const write = (relPath, content) => {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
  return relPath;
};

/* ===========================================================================
   10. ICONS (inline SVG — no icon font, no extra request)
   =========================================================================== */

const I = {
  mark: `<svg class="brand__mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M25 76V24l25 30 25-30v52" fill="none" stroke="#e88a6d" stroke-width="14" stroke-linecap="square"/></svg>`,
  play: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  arrowL: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>`,
  arrowR: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  spotify: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.586 14.424a.75.75 0 01-1.03.248c-2.82-1.723-6.37-2.113-10.553-1.158a.75.75 0 11-.334-1.463c4.578-1.045 8.502-.595 11.668 1.343a.75.75 0 01.249 1.03zm1.223-2.723a.937.937 0 01-1.287.309c-3.23-1.985-8.155-2.56-11.977-1.4a.937.937 0 11-.544-1.794c4.365-1.324 9.792-.683 13.5 1.598a.937.937 0 01.308 1.287zm.105-2.835c-3.873-2.3-10.26-2.512-13.958-1.39a1.124 1.124 0 11-.652-2.15c4.244-1.289 11.298-1.04 15.757 1.61a1.124 1.124 0 11-1.147 1.93z"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.365 1.43c0 1.14-.42 2.2-1.25 3.05-.98 1.02-2.06 1.6-3.24 1.51-.03-1.1.44-2.2 1.25-3.02.9-.93 2.15-1.6 3.24-1.54zM20.5 17.1c-.6 1.4-.9 2.02-1.67 3.26-1.08 1.72-2.6 3.87-4.5 3.88-1.68.02-2.12-1.1-4.4-1.09-2.28.01-2.76 1.11-4.45 1.1-1.9-.02-3.34-1.96-4.42-3.68C-.5 15.9-.86 9.85 1.94 7.03c1.02-1.03 2.4-1.66 3.86-1.66 1.9 0 3.1 1.06 4.66 1.06 1.52 0 2.44-1.06 4.65-1.06 1.28 0 2.64.55 3.62 1.5-3.17 1.75-2.66 6.28.77 7.63-.32.85-.55 1.32-1 2.6z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.58 7.19c-.23-.86-.9-1.53-1.75-1.76C18.25 5 12 5 12 5s-6.25 0-7.83.43c-.85.23-1.52.9-1.75 1.76C2 8.78 2 12 2 12s0 3.22.42 4.81c.23.86.9 1.53 1.75 1.76C5.75 19 12 19 12 19s6.25 0 7.83-.43c.85-.23 1.52-.9 1.75-1.76C22 15.22 22 12 22 12s0-3.22-.42-4.81zM10 15.5v-7l6 3.5-6 3.5z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.55.22.94.47 1.35.88.41.41.66.8.88 1.35.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.55-.47.94-.88 1.35-.41.41-.8.66-1.35.88-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.64 3.64 0 01-1.35-.88 3.64 3.64 0 01-.88-1.35c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.55.47-.94.88-1.35.41-.41.8-.66 1.35-.88.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>`,
  music: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3v13.5a3.5 3.5 0 11-2-3.16V6.6l-9 1.8v9.1a3.5 3.5 0 11-2-3.16V6.2L21 3z"/></svg>`,
};

const platIcon = (id) => I[id] || I.music;

/* ===========================================================================
   11. SHARED CHROME
   =========================================================================== */

const NAV = [
  { label: "Songs", href: "songs/" },
  { label: "Videos", href: "videos/" },
  { label: "Photos", href: "photos/" },
  { label: "News", href: "news/" },
  { label: "About", href: "about/" },
];

function head({
  root,
  title,
  desc,
  canonical,
  og = "home",
  type = "website",
  accent,
  jsonld = [],
  extraHead = "",
}) {
  const ogUrl = `${ABS}/assets/img/og/${og}.jpg`;
  const styleAttr = accent
    ? ` style="--accent:${accent};--accent-soft:${accent}29"`
    : "";
  return `<!doctype html>
<html lang="${SITE.locale}"${styleAttr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0c0b0e">
<meta name="color-scheme" content="dark">
<link rel="icon" href="${root}favicon.ico" sizes="32x32">
<link rel="icon" href="${root}assets/img/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="manifest" href="${root}manifest.webmanifest">
<link rel="preload" href="${root}assets/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${root}assets/css/site.css">
<link rel="alternate" type="application/rss+xml" title="Montay — news" href="${ABS}/feed.xml">
<meta property="og:site_name" content="Montay">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogUrl}">
${extraHead}<script src="${root}assets/js/site.js" defer></script>
${jsonld
  .map(
    (o) =>
      `<script type="application/ld+json">${JSON.stringify(o)}</script>`
  )
  .join("\n")}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${masthead(root)}
<main id="main">`;
}

function masthead(root, current = "") {
  return `<header class="masthead">
  <div class="masthead__inner">
    <a class="brand" href="${root || "./"}" aria-label="Montay — home">${I.mark}<span>Montay</span></a>
    <button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav" id="nav" aria-label="Main">
      ${NAV.map(
        (n) =>
          `<a href="${root}${n.href}"${
            current === n.href ? ' aria-current="page"' : ""
          }>${n.label}</a>`
      ).join("\n      ")}
      <a class="nav__cta" href="${ALL_LINKS}" rel="noopener">Listen</a>
    </nav>
  </div>
</header>`;
}

function foot(root) {
  return `</main>
<footer class="foot">
  <div class="wrap">
    <div class="foot__top">
      <div class="foot__brand">
        <p class="foot__word">MONTAY</p>
        <p class="small" style="margin-top:14px;max-width:34ch">${SITE.tagline}. Songs, lyrics, videos and photos.</p>
        <div class="socials" style="margin-top:18px">
          ${PLATFORMS.map(
            (p) =>
              `<a href="${p.url}" rel="noopener" aria-label="${p.label}" style="--pc:${p.color}">${platIcon(
                p.id
              )}</a>`
          ).join("\n          ")}
        </div>
      </div>
      <div>
        <h2>Explore</h2>
        <ul>
          ${NAV.map((n) => `<li><a href="${root}${n.href}">${n.label}</a></li>`).join(
            "\n          "
          )}
        </ul>
      </div>
      <div>
        <h2>Listen</h2>
        <ul>
          ${PLATFORMS.map(
            (p) => `<li><a href="${p.url}" rel="noopener">${p.label}</a></li>`
          ).join("\n          ")}
          <li><a href="${ALL_LINKS}" rel="noopener">All platforms</a></li>
        </ul>
      </div>
    </div>
    <div class="foot__bottom">
      <p>© <span id="year">2026</span> Montay — Paris</p>
      <p><a href="${ABS}/feed.xml">RSS</a> · <a href="${root}about/">About the band</a></p>
    </div>
  </div>
</footer>
</body>
</html>
`;
}

/* small builders --------------------------------------------------------- */

const platformPills = (limit) =>
  `<div class="platforms">
  ${PLATFORMS.slice(0, limit || PLATFORMS.length)
    .map(
      (p) =>
        `<a class="plat" href="${p.url}" rel="noopener" style="--pc:${p.color}">${platIcon(
          p.id
        )}<span>${p.label}</span></a>`
    )
    .join("\n  ")}
</div>`;

const songCard = (s, root) => `<article class="card">
  <div class="card__art">
    <img src="${root}assets/img/${s.art}-640.webp"
         srcset="${root}assets/img/${s.art}-320.webp 320w, ${root}assets/img/${s.art}-640.webp 640w, ${root}assets/img/${s.art}-1200.webp 1200w"
         sizes="(max-width: 640px) 45vw, 240px"
         width="640" height="640" alt="Artwork for the Montay song ${esc(s.title)}"
         loading="lazy" decoding="async">
  </div>
  <div class="card__body">
    <h3 class="card__title">${esc(s.title)}</h3>
    <p class="card__meta">Lyrics · ${EP.year}</p>
  </div>
  <a class="card__link" href="${root}songs/${s.slug}/" aria-label="${esc(
    s.title
  )} — lyrics"></a>
</article>`;

/* click-to-play YouTube facade: zero third-party request until clicked */
const ytFacade = (id, poster, title, root, eager = false) =>
  `<button type="button" class="vfacade" data-embed="https://www.youtube-nocookie.com/embed/${id}?rel=0" data-title="${esc(
    title
  )}" aria-label="Play video: ${esc(title)}">
  <img src="${root}assets/img/${poster}-640.webp"
       srcset="${root}assets/img/${poster}-640.webp 640w, ${root}assets/img/${poster}-1120.webp 1120w"
       sizes="(max-width: 720px) 100vw, 640px"
       width="640" height="360" alt="Video: ${esc(title)}"
       ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
  <span class="play"><i>${I.play}</i></span>
</button>`;

const fbFacade = (v) =>
  `<a class="vfacade vfacade--plain" href="${v.fb}" rel="noopener">
  <span class="play"><i>${I.play}</i></span>
  <span class="vfacade__label">Watch on Facebook</span>
</a>`;

/* ===========================================================================
   12. JSON-LD building blocks
   =========================================================================== */

const LD_BAND = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "@id": `${ABS}/#band`,
  name: "Montay",
  genre: ["Alternative rock", "Art rock"],
  foundingLocation: { "@type": "Place", name: "Paris, France" },
  url: `${ABS}/`,
  image: `${ABS}/assets/img/og/home.jpg`,
  description: SITE.description,
  member: MEMBERS.map((m) => ({
    "@type": "Person",
    name: m.who,
    roleName: m.what,
  })),
  sameAs: PLATFORMS.map((p) => p.url),
  album: {
    "@type": "MusicAlbum",
    "@id": `${ABS}/#ep`,
    name: EP.title,
    albumProductionType: "https://schema.org/StudioAlbum",
    albumReleaseType: "https://schema.org/EPRelease",
    datePublished: EP.released,
    image: `${ABS}/assets/img/art/ep-a-girl-from-the-islands-1200.webp`,
    numTracks: SONGS.length,
    byArtist: { "@id": `${ABS}/#band` },
  },
};

const LD_SITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${ABS}/#website`,
  url: `${ABS}/`,
  name: "Montay",
  inLanguage: "en",
  publisher: { "@id": `${ABS}/#band` },
};

const crumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, n) => ({
    "@type": "ListItem",
    position: n + 1,
    name: it.name,
    item: it.url,
  })),
});

/* ===========================================================================
   13. PAGES
   =========================================================================== */

const pages = []; // for sitemap: {loc, lastmod, priority}
const track = (loc, lastmod, priority) =>
  pages.push({ loc, lastmod, priority });

/* ---------- 13.1 HOME ---------- */
function buildHome() {
  const root = "";
  const latest = NEWS.slice(0, 3);
  const stripPhotos = PHOTOS.slice(0, 10);

  const html =
    head({
      root,
      title: "Montay — Alternative rock from Paris",
      desc: SITE.description,
      canonical: `${ABS}/`,
      og: "home",
      jsonld: [LD_BAND, LD_SITE],
      extraHead: `<link rel="preload" as="image" href="${root}assets/img/hero-1500.webp" imagesrcset="${root}assets/img/hero-900.webp 900w, ${root}assets/img/hero-1500.webp 1500w, ${root}assets/img/hero-2400.webp 2400w" imagesizes="100vw" fetchpriority="high">\n`,
    }) +
    `
<section class="hero">
  <div class="hero__media">
    <img src="${root}assets/img/hero-1500.webp"
         srcset="${root}assets/img/hero-900.webp 900w, ${root}assets/img/hero-1500.webp 1500w, ${root}assets/img/hero-2400.webp 2400w"
         sizes="100vw" width="1500" height="843"
         alt="Montay playing live on stage" fetchpriority="high" decoding="async">
  </div>
  <div class="wrap hero__inner">
    <p class="eyebrow">${SITE.tagline}</p>
    <h1 class="h-xl"><span class="word">Montay</span></h1>
    <p class="lede">Intricate guitar and piano arrangements, restless lyrics, and
      songs that ask you to question the way things are.</p>
    ${platformPills()}
    <p class="hero__scroll"><span></span> Scroll</p>
  </div>
</section>

<hr class="rule">

<section class="wrap reveal">
  <div class="sec-head">
    <div class="sec-head__t">
      <p class="eyebrow">Latest</p>
      <h2 class="h-l">News</h2>
    </div>
    <a class="btn btn--ghost" href="${root}news/">All news ${I.arrow}</a>
  </div>
  <div class="grid grid--news">
    ${latest.map((n) => newsCard(n, root)).join("\n    ")}
  </div>
</section>

<hr class="rule">

<section class="wrap reveal">
  <div class="sec-head">
    <div class="sec-head__t">
      <p class="eyebrow">EP · ${EP.year}</p>
      <h2 class="h-l">${esc(EP.title)}</h2>
    </div>
    <a class="btn btn--ghost" href="${root}songs/">All songs ${I.arrow}</a>
  </div>
  <div class="feature">
    <div class="feature__art">
      <img src="${root}assets/img/art/ep-a-girl-from-the-islands-600.webp"
           srcset="${root}assets/img/art/ep-a-girl-from-the-islands-600.webp 600w, ${root}assets/img/art/ep-a-girl-from-the-islands-1200.webp 1200w"
           sizes="(max-width: 800px) 92vw, 420px"
           width="600" height="600"
           alt="Cover of the Montay EP A Girl From The Islands" loading="lazy" decoding="async">
    </div>
    <div>
      <p class="lede">Five songs, released in July ${EP.year}. Artwork and full
        lyrics for each one.</p>
      <ol class="tracklist">
        ${SONGS.map(
          (s, i) => `<li><a href="${root}songs/${s.slug}/">
          <span class="n">${String(i + 1).padStart(2, "0")}</span>
          <span class="t">${esc(s.title)}</span>
          <span class="arrow">${I.arrow}</span>
        </a></li>`
        ).join("\n        ")}
      </ol>
      <div class="btn-row" style="margin-top:26px">
        <a class="btn btn--solid" href="${ALL_LINKS}" rel="noopener">${I.music} Listen to the EP</a>
        <a class="btn" href="${root}songs/">Lyrics &amp; artwork</a>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<section class="wrap reveal">
  <div class="sec-head">
    <div class="sec-head__t">
      <p class="eyebrow">Watch</p>
      <h2 class="h-l">Videos</h2>
    </div>
    <a class="btn btn--ghost" href="${root}videos/">All videos ${I.arrow}</a>
  </div>
  <div class="grid grid--videos">
    ${[VIDEOS.live[0], VIDEOS.official[0], VIDEOS.official[1]]
      .map(
        (v) => `<div class="video-item">
      ${ytFacade(v.id, v.poster, v.title, root)}
      <div class="video-item__meta">
        <h3 class="card__title">${esc(v.title)}</h3>
        <p class="card__meta">${esc(v.note)}</p>
      </div>
    </div>`
      )
      .join("\n    ")}
  </div>
</section>

<hr class="rule">

<section class="wrap reveal">
  <div class="sec-head">
    <div class="sec-head__t">
      <p class="eyebrow">On stage</p>
      <h2 class="h-l">Photos</h2>
    </div>
    <a class="btn btn--ghost" href="${root}photos/">All ${PHOTOS.length} photos ${I.arrow}</a>
  </div>
  <div class="strip" aria-hidden="true">
    ${stripPhotos
      .map(
        (p) => `<a href="${root}photos/" tabindex="-1">
      <img src="${root}assets/img/photos/t/${p.slug}.webp" width="${p.w}" height="${p.h}"
           alt="" loading="lazy" decoding="async"></a>`
      )
      .join("\n    ")}
  </div>
</section>
` + foot(root);

  write("index.html", html);
  track(`${ABS}/`, NEWS[0].date, "1.0");
}

function newsCard(n, root) {
  return `<article class="card card--news">
      <div class="card__art">
        <img src="${root}assets/img/card/${n.card}-720.webp"
             srcset="${root}assets/img/card/${n.card}-720.webp 720w, ${root}assets/img/card/${n.card}-1440.webp 1440w"
             sizes="(max-width: 700px) 92vw, 360px"
             width="720" height="450" alt="${esc(n.title)}" loading="lazy" decoding="async">
      </div>
      <div class="card__body">
        <p class="card__meta">${shortDate(n.date)}</p>
        <h3 class="card__title">${esc(n.title)}</h3>
        <p class="small" style="color:var(--paper-2)">${esc(n.excerpt)}</p>
      </div>
      <a class="card__link" href="${root}news/${n.slug}/" aria-label="${esc(n.title)}"></a>
    </article>`;
}

/* ---------- 13.2 SONGS INDEX ---------- */
function buildSongsIndex() {
  const root = "../";
  const html =
    head({
      root,
      title: "Songs & lyrics — Montay",
      desc: `All ${SONGS.length} Montay songs from the EP ${EP.title}, with full lyrics and artwork.`,
      canonical: `${ABS}/songs/`,
      og: "songs",
      jsonld: [
        crumbs([
          { name: "Montay", url: `${ABS}/` },
          { name: "Songs", url: `${ABS}/songs/` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "MusicAlbum",
          name: EP.title,
          byArtist: { "@type": "MusicGroup", name: "Montay" },
          datePublished: EP.released,
          numTracks: SONGS.length,
          image: `${ABS}/assets/img/art/ep-a-girl-from-the-islands-1200.webp`,
          track: SONGS.map((s, i) => ({
            "@type": "MusicRecording",
            position: i + 1,
            name: s.title,
            url: `${ABS}/songs/${s.slug}/`,
          })),
        },
      ],
    }) +
    `
<header class="wrap phead">
  ${bcrumb(root, [{ label: "Songs" }])}
  <p class="eyebrow">EP · ${EP.title} · ${EP.year}</p>
  <h1 class="h-l">Songs &amp; lyrics</h1>
  <p class="lede">Five songs from our first EP. Tap any one for the full lyrics
    and its artwork.</p>
  <div class="btn-row" style="margin-top:24px">
    <a class="btn btn--solid" href="${ALL_LINKS}" rel="noopener">${I.music} Listen to the EP</a>
  </div>
</header>
<section class="wrap" style="padding-top:8px">
  <h2 class="visually-hidden">All five songs</h2>
  <div class="grid grid--songs">
    ${SONGS.map((s) => songCard(s, root)).join("\n    ")}
  </div>
</section>
` + foot(root);

  write("songs/index.html", html);
  track(`${ABS}/songs/`, EP.released, "0.9");
}

const bcrumb = (root, trail) =>
  `<nav class="small" aria-label="Breadcrumb" style="margin-bottom:20px">
    <a href="${root}" style="color:var(--paper-3)">Montay</a>${trail
    .map(
      (t) =>
        ` <span aria-hidden="true">/</span> ` +
        (t.href
          ? `<a href="${t.href}" style="color:var(--paper-3)">${esc(t.label)}</a>`
          : `<span style="color:var(--paper-2)">${esc(t.label)}</span>`)
    )
    .join("")}
  </nav>`;

/* ---------- 13.3 SONG PAGES ---------- */
function buildSongPages() {
  const root = "../../";
  SONGS.forEach((s, i) => {
    const prev = SONGS[(i - 1 + SONGS.length) % SONGS.length];
    const next = SONGS[(i + 1) % SONGS.length];
    const stanzas = s.lyrics
      .split(/\n\s*\n/)
      .map(
        (st) =>
          `<div class="stanza">${st
            .trim()
            .split("\n")
            .map((l) => esc(l.trim()))
            .join("<br>")}</div>`
      )
      .join("\n      ");

    const html =
      head({
        root,
        title: `${s.title} — lyrics | Montay`,
        desc: `${s.blurb} Full lyrics for “${s.title}” by Montay, from the EP ${EP.title}.`,
        canonical: `${ABS}/songs/${s.slug}/`,
        og: `song-${s.slug}`,
        type: "music.song",
        accent: s.accent,
        jsonld: [
          crumbs([
            { name: "Montay", url: `${ABS}/` },
            { name: "Songs", url: `${ABS}/songs/` },
            { name: s.title, url: `${ABS}/songs/${s.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "MusicRecording",
            name: s.title,
            url: `${ABS}/songs/${s.slug}/`,
            byArtist: {
              "@type": "MusicGroup",
              name: "Montay",
              url: `${ABS}/`,
            },
            inAlbum: {
              "@type": "MusicAlbum",
              name: EP.title,
              datePublished: EP.released,
            },
            image: `${ABS}/assets/img/${s.art}-1200.webp`,
            lyricist: { "@type": "Person", name: s.credits },
            composer: { "@type": "Person", name: s.credits },
            genre: "Alternative rock",
            ...(s.video
              ? { video: { "@type": "VideoObject", name: `${s.title} — official video`, embedUrl: `https://www.youtube.com/embed/${s.video}` } }
              : {}),
          },
        ],
      }) +
      `
<header class="wrap phead">
  ${bcrumb(root, [{ label: "Songs", href: root + "songs/" }, { label: s.title }])}
  <p class="eyebrow">Song · ${esc(EP.title)}</p>
  <h1 class="h-l">${esc(s.title)}</h1>
  <p class="lede">${esc(s.blurb)}</p>
</header>

<div class="wrap song">
  <aside class="song__aside">
    <div class="song__art">
      <img src="${root}assets/img/${s.art}-640.webp"
           srcset="${root}assets/img/${s.art}-640.webp 640w, ${root}assets/img/${s.art}-1200.webp 1200w"
           sizes="(max-width: 880px) 90vw, 340px"
           width="640" height="640"
           alt="Artwork for the Montay song ${esc(s.title)}" fetchpriority="high" decoding="async">
    </div>
    <div class="btn-row">
      <a class="btn btn--solid" href="${ALL_LINKS}" rel="noopener">${I.music} Listen</a>
      ${
        s.video
          ? `<a class="btn" href="${root}videos/#${s.slug}">${I.play} Video</a>`
          : ""
      }
    </div>
    <p class="small">From the EP <a href="${root}news/a-girl-from-the-islands-ep/">${esc(
        EP.title
      )}</a> (${EP.year}).</p>
  </aside>

  <div>
    <h2 class="eyebrow" style="margin-bottom:22px">Lyrics</h2>
    <div class="lyrics">
      ${stanzas}
    </div>
    <p class="credits">Written by ${esc(s.credits)} · © Montay</p>
  </div>
</div>

<div class="wrap">
  <nav class="pager" aria-label="Songs">
    <a href="${root}songs/${prev.slug}/">
      <span class="k">Previous</span><span class="v">${esc(prev.title)}</span>
    </a>
    <a href="${root}songs/${next.slug}/">
      <span class="k">Next</span><span class="v">${esc(next.title)}</span>
    </a>
  </nav>
</div>
` + foot(root);

    write(`songs/${s.slug}/index.html`, html);
    track(`${ABS}/songs/${s.slug}/`, EP.released, "0.8");
  });
}

/* ---------- 13.4 VIDEOS ---------- */
function buildVideos() {
  const root = "../";
  const all = [...VIDEOS.official, ...VIDEOS.live];
  const block = (v, i, kind) => `<div class="video-item" id="${
    kind === "official" ? v.song || "official-" + i : "live-" + (v.song || i)
  }">
      ${ytFacade(v.id, v.poster, v.title, root, kind === "official" && i === 0)}
      <div class="video-item__meta">
        <h3 class="h-s">${esc(v.title)}</h3>
        <p class="card__meta">${esc(v.note)}</p>
      </div>
    </div>`;

  const html =
    head({
      root,
      title: "Videos — Montay",
      desc:
        "Official videos and live recordings by Montay: You Wish You Had Time, People We Don't Know, Entertained (live) and more.",
      canonical: `${ABS}/videos/`,
      og: "videos",
      jsonld: [
        crumbs([
          { name: "Montay", url: `${ABS}/` },
          { name: "Videos", url: `${ABS}/videos/` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Montay videos",
          itemListElement: all.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "VideoObject",
              name: v.title,
              uploadDate: v.date,
              thumbnailUrl: `${ABS}/assets/img/${v.poster}-1120.webp`,
              embedUrl: `https://www.youtube.com/embed/${v.id}`,
              url: `https://www.youtube.com/watch?v=${v.id}`,
              publisher: { "@type": "MusicGroup", name: "Montay" },
            },
          })),
        },
      ],
    }) +
    `
<header class="wrap phead">
  ${bcrumb(root, [{ label: "Videos" }])}
  <p class="eyebrow">Watch</p>
  <h1 class="h-l">Videos</h1>
  <p class="lede">Official videos and live recordings. Nothing loads from YouTube
    until you press play.</p>
</header>

<section class="wrap" style="padding-top:8px">
  <div class="sec-head">
    <div class="sec-head__t"><h2 class="h-m">Official videos</h2></div>
  </div>
  <div class="grid grid--videos">
    ${VIDEOS.official.map((v, i) => block(v, i, "official")).join("\n    ")}
  </div>
</section>

<hr class="rule">

<section class="wrap">
  <div class="sec-head">
    <div class="sec-head__t"><h2 class="h-m">Live</h2></div>
  </div>
  <div class="grid grid--videos">
    ${VIDEOS.live.map((v, i) => block(v, i, "live")).join("\n    ")}
  </div>
</section>

<hr class="rule">

<section class="wrap">
  <div class="sec-head">
    <div class="sec-head__t">
      <h2 class="h-m">From the archive</h2>
      <p class="small">Earlier live sessions, hosted on Facebook.</p>
    </div>
  </div>
  <div class="grid grid--videos">
    ${VIDEOS.archive
      .map(
        (v) => `<div class="video-item">
      ${fbFacade(v)}
      <div class="video-item__meta">
        <h3 class="card__title">${esc(v.title)}</h3>
        <p class="card__meta">${esc(v.note)}</p>
      </div>
    </div>`
      )
      .join("\n    ")}
  </div>
</section>
` + foot(root);

  write("videos/index.html", html);
  track(`${ABS}/videos/`, "2025-07-14", "0.8");
}

/* ---------- 13.5 PHOTOS ---------- */
function buildPhotos() {
  const root = "../";
  const html =
    head({
      root,
      title: "Photos — Montay",
      desc: `${PHOTOS.length} photos of Montay: live on stage at Supersonic in Paris, plus band portraits.`,
      canonical: `${ABS}/photos/`,
      og: "photos",
      jsonld: [
        crumbs([
          { name: "Montay", url: `${ABS}/` },
          { name: "Photos", url: `${ABS}/photos/` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Montay — photos",
          url: `${ABS}/photos/`,
          author: { "@type": "MusicGroup", name: "Montay" },
          numberOfItems: PHOTOS.length,
        },
      ],
    }) +
    `
<header class="wrap phead">
  ${bcrumb(root, [{ label: "Photos" }])}
  <p class="eyebrow">Gallery</p>
  <h1 class="h-l">Photos</h1>
  <p class="lede">${PHOTOS.length} photos — live at Supersonic in Paris, and band
    portraits. Tap any photo to open it full size.</p>
</header>

<section class="wrap" style="padding-top:8px">
  <div class="gallery">
    ${PHOTOS.map(
      (p, i) => `<button type="button"
      data-full="${root}assets/img/photos/f/${p.slug}.webp" data-w="${p.w}" data-h="${p.h}"
      aria-label="Open photo ${i + 1} of ${PHOTOS.length} full size">
      <img src="${root}assets/img/photos/t/${p.slug}.webp"
           width="${p.w}" height="${p.h}" alt="${esc(p.alt)}"
           ${i < 6 ? "" : 'loading="lazy" '}decoding="async">
    </button>`
    ).join("\n    ")}
  </div>
</section>

<div class="lb" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lb__btn lb__close" type="button" data-lb="close" aria-label="Close">${I.close}</button>
  <div class="lb__stage"></div>
  <div class="lb__bar">
    <button class="lb__btn" type="button" data-lb="prev" aria-label="Previous photo">${I.arrowL}</button>
    <p class="lb__count" aria-live="polite"></p>
    <button class="lb__btn" type="button" data-lb="next" aria-label="Next photo">${I.arrowR}</button>
  </div>
</div>
` + foot(root);

  write("photos/index.html", html);
  track(`${ABS}/photos/`, "2023-01-02", "0.7");
}

/* ---------- 13.6 ABOUT ---------- */
function buildAbout() {
  const root = "../";
  const html =
    head({
      root,
      title: "About — Montay",
      desc:
        "Montay is a Paris-based alternative rock band: Eric Humbert, Arthur Belhomme, Arnaud Forgues, David Libault and Bruce Forgues.",
      canonical: `${ABS}/about/`,
      og: "about",
      type: "profile",
      jsonld: [
        crumbs([
          { name: "Montay", url: `${ABS}/` },
          { name: "About", url: `${ABS}/about/` },
        ]),
        LD_BAND,
      ],
    }) +
    `
<header class="wrap phead">
  ${bcrumb(root, [{ label: "About" }])}
  <p class="eyebrow">${SITE.tagline}</p>
  <h1 class="h-l">About Montay</h1>
</header>

<section class="wrap" style="padding-top:8px">
  <div class="about-grid">
    <div>
      <div class="lede stack">${BIO_HTML}</div>
      <div class="influences" style="margin-top:26px">
        <span class="small" style="align-self:center;margin-right:6px">Influences</span>
        ${INFLUENCES.map((x) => `<span class="tag">${esc(x)}</span>`).join("\n        ")}
      </div>

      <h2 class="h-m" style="margin-top:clamp(38px,5vw,60px);margin-bottom:6px">The band</h2>
      <ul class="members">
        ${MEMBERS.map(
          (m) =>
            `<li><span class="who">${esc(m.who)}</span><span class="what">${esc(
              m.what
            )}</span></li>`
        ).join("\n        ")}
      </ul>

      <h2 class="h-m" style="margin-top:clamp(38px,5vw,60px);margin-bottom:16px">Where to listen</h2>
      ${platformPills()}
    </div>

    <figure>
      <img src="${root}assets/img/news/montay-illustration-640.webp"
           srcset="${root}assets/img/news/montay-illustration-640.webp 640w, ${root}assets/img/news/montay-illustration-1200.webp 1200w"
           sizes="(max-width: 840px) 92vw, 420px"
           width="640" height="640" alt="Illustration of the five members of Montay on stage"
           loading="lazy" decoding="async">
      <figcaption>Montay — Paris.</figcaption>
    </figure>
  </div>
</section>
` + foot(root);

  write("about/index.html", html);
  track(`${ABS}/about/`, "2025-08-12", "0.7");
}

/* ---------- 13.7 NEWS INDEX + ARTICLES ---------- */
function expandBody(body, root) {
  return body
    .replace(/\{\{root\}\}/g, root)
    .replace(/\{\{video:([^:]+):([^:]+):([^}]+)\}\}/g, (_, id, poster, title) =>
      ytFacade(id, poster, title, root)
    );
}

function buildNews() {
  /* index */
  const root = "../";
  const idx =
    head({
      root,
      title: "News — Montay",
      desc:
        "Montay news: the second EP in the works, new videos, live shows and releases.",
      canonical: `${ABS}/news/`,
      og: "news",
      jsonld: [
        crumbs([
          { name: "Montay", url: `${ABS}/` },
          { name: "News", url: `${ABS}/news/` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Montay — news",
          url: `${ABS}/news/`,
          publisher: { "@type": "MusicGroup", name: "Montay" },
          blogPost: NEWS.map((n) => ({
            "@type": "BlogPosting",
            headline: n.title,
            datePublished: n.date,
            url: `${ABS}/news/${n.slug}/`,
          })),
        },
      ],
    }) +
    `
<header class="wrap phead">
  ${bcrumb(root, [{ label: "News" }])}
  <p class="eyebrow">Updates</p>
  <h1 class="h-l">News</h1>
  <p class="lede">Releases, videos and shows. <a href="${ABS}/feed.xml">Follow by RSS</a>.</p>
</header>

<section class="wrap" style="padding-top:8px">
  <ul class="newslist">
    ${NEWS.map(
      (n) => `<li><a href="${root}news/${n.slug}/">
      <span class="dateline">${human(n.date)}</span>
      <span>
        <span class="newslist__t">${esc(n.title)}</span>
        <span class="newslist__x">${esc(n.excerpt)}</span>
      </span>
      <span class="arrow">${I.arrow}</span>
    </a></li>`
    ).join("\n    ")}
  </ul>
</section>
` + foot(root);

  write("news/index.html", idx);
  track(`${ABS}/news/`, NEWS[0].date, "0.8");

  /* articles */
  const r = "../../";
  NEWS.forEach((n, i) => {
    const prev = NEWS[i + 1]; // older
    const next = NEWS[i - 1]; // newer
    const html =
      head({
        root: r,
        title: `${n.title} — Montay`,
        desc: n.excerpt,
        canonical: `${ABS}/news/${n.slug}/`,
        og: n.og,
        type: "article",
        jsonld: [
          crumbs([
            { name: "Montay", url: `${ABS}/` },
            { name: "News", url: `${ABS}/news/` },
            { name: n.title, url: `${ABS}/news/${n.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: n.title,
            description: n.excerpt,
            datePublished: n.date,
            dateModified: n.date,
            url: `${ABS}/news/${n.slug}/`,
            image: `${ABS}/assets/img/og/${n.og}.jpg`,
            inLanguage: "en",
            author: { "@type": "MusicGroup", name: "Montay", url: `${ABS}/` },
            publisher: {
              "@type": "MusicGroup",
              name: "Montay",
              url: `${ABS}/`,
            },
            mainEntityOfPage: `${ABS}/news/${n.slug}/`,
          },
        ],
      }) +
      `
<header class="wrap wrap-narrow phead">
  ${bcrumb(r, [{ label: "News", href: r + "news/" }, { label: n.title }])}
  <p class="dateline">${human(n.date)}</p>
  <h1 class="h-l" style="margin-top:12px">${esc(n.title)}</h1>
</header>

<article class="wrap wrap-narrow" style="padding-bottom:clamp(40px,6vw,72px)">
  <div class="prose">
    ${expandBody(n.body, r)}
  </div>
</article>

<div class="wrap wrap-narrow">
  <nav class="pager" aria-label="News">
    ${
      next
        ? `<a href="${r}news/${next.slug}/"><span class="k">Newer</span><span class="v">${esc(
            next.title
          )}</span></a>`
        : `<a href="${r}news/"><span class="k">Index</span><span class="v">All news</span></a>`
    }
    ${
      prev
        ? `<a href="${r}news/${prev.slug}/"><span class="k">Older</span><span class="v">${esc(
            prev.title
          )}</span></a>`
        : `<a href="${r}news/"><span class="k">Index</span><span class="v">All news</span></a>`
    }
  </nav>
</div>
` + foot(r);

    write(`news/${n.slug}/index.html`, html);
    track(`${ABS}/news/${n.slug}/`, n.date, "0.6");
  });
}

/* ---------- 13.8 404 ---------- */
function build404() {
  const root = ""; // 404 can be served from any depth → use absolute site paths
  const html =
    head({
      root: SITE.base + "/",
      title: "Page not found — Montay",
      desc:
        "That page does not exist on the Montay site. Head for the songs, the photo gallery, or the home page instead.",
      canonical: `${ABS}/404.html`,
      og: "home",
    }) +
    `
<section class="wrap center-page">
  <div>
    <p class="eyebrow">404</p>
    <h1 class="h-l" style="margin:14px 0 16px">This page went missing</h1>
    <p class="lede" style="margin-inline:auto">Try the songs, the photos, or start again from the top.</p>
    <div class="btn-row" style="justify-content:center;margin-top:28px">
      <a class="btn btn--solid" href="${SITE.base}/">Home</a>
      <a class="btn" href="${SITE.base}/songs/">Songs</a>
      <a class="btn" href="${SITE.base}/photos/">Photos</a>
    </div>
  </div>
</section>
` + foot(SITE.base + "/");
  write("404.html", html);
}

/* ---------- 13.9 REDIRECT STUBS for the old Jekyll URLs ---------- */
function buildRedirects() {
  const map = [
    ...NEWS.map((n) => [n.legacy, `news/${n.slug}/`]),
    ["home", ""], // old /home/ page
    ["songs/a-girl-from-the-isands", "songs/a-girl-from-the-islands/"], // fixes an old typo
  ];
  map.forEach(([from, to]) => {
    const depth = from.split("/").length; // from + index.html
    const up = upTo(depth);
    const target = up + to;
    const abs = `${ABS}/${to}`;
    write(
      `${from}/index.html`,
      `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved — Montay</title>
<link rel="canonical" href="${abs}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)});</script>
</head>
<body style="background:#0c0b0e;color:#f4efe8;font-family:system-ui,sans-serif;padding:3rem">
<p>This page has moved to <a href="${target}" style="color:#e88a6d">${abs}</a>.</p>
</body>
</html>
`
    );
  });
  return map.length;
}

/* ---------- 13.10 sitemap / robots / feed / manifest ---------- */
function buildMeta() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${p.loc}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`
  )
  .join("\n")}
</urlset>
`;
  write("sitemap.xml", sitemap);

  /* With .nojekyll, GitHub Pages serves every file as-is — including anything
     left over from the old Jekyll theme. Keep crawlers out of it so it can
     never compete with the real pages. */
  const legacyPaths = [
    "/_site/", "/_posts/", "/_pages/", "/_songs/", "/_includes/",
    "/_layouts/", "/_sass/", "/_data/", "/.sass-cache/", "/docs/",
    "/test/", "/_tmptest/", "/node_modules/",
  ];
  write(
    "robots.txt",
    `User-agent: *
Allow: /
${legacyPaths.map((p) => `Disallow: ${SITE.base}${p}`).join("\n")}

Sitemap: ${ABS}/sitemap.xml
`
  );

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Montay — news</title>
  <link>${ABS}/</link>
  <atom:link href="${ABS}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>${esc(SITE.description)}</description>
  <language>en</language>
  <lastBuildDate>${rfc822(NEWS[0].date)}</lastBuildDate>
${NEWS.map(
  (n) => `  <item>
    <title>${esc(n.title)}</title>
    <link>${ABS}/news/${n.slug}/</link>
    <guid isPermaLink="true">${ABS}/news/${n.slug}/</guid>
    <pubDate>${rfc822(n.date)}</pubDate>
    <description>${esc(n.excerpt)}</description>
  </item>`
).join("\n")}
</channel>
</rss>
`;
  write("feed.xml", feed);

  write(
    "manifest.webmanifest",
    JSON.stringify(
      {
        name: "Montay",
        short_name: "Montay",
        description: SITE.description,
        start_url: SITE.base + "/",
        scope: SITE.base + "/",
        display: "standalone",
        background_color: "#0c0b0e",
        theme_color: "#0c0b0e",
        icons: [
          {
            src: SITE.base + "/assets/img/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: SITE.base + "/assets/img/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: SITE.base + "/assets/img/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      null,
      2
    ) + "\n"
  );

  write(".nojekyll", "");
}

/* ===========================================================================
   14. RUN
   =========================================================================== */

buildHome();
buildSongsIndex();
buildSongPages();
buildVideos();
buildPhotos();
buildAbout();
buildNews();
build404();
const nRedir = buildRedirects();
buildMeta();

console.log(
  `Built ${pages.length} pages + ${nRedir} redirects, ${PHOTOS.length} photos, ${SONGS.length} songs, ${NEWS.length} news items.`
);
