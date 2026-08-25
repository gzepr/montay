/* SEO / a11y / structure audit of the generated HTML. */
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve, relative } from "node:path";
const ROOT = resolve(new URL(".", import.meta.url).pathname, "..");
const skip = new Set([".git","node_modules","_site","docs","test","_sass","_includes","_layouts","_posts","_songs","_pages","_data",".sass-cache","tools","_tmptest",".github",".claude"]);
const files = [];
(function walk(d){for(const e of readdirSync(d,{withFileTypes:true})){if(e.name.startsWith("."))continue;const f=join(d,e.name);
  if(e.isDirectory()){if(!skip.has(e.name))walk(f);} else if(e.name.endsWith(".html")) files.push(f);}})(ROOT);

const isRedirect = (h) => /http-equiv="refresh"/.test(h);
let issues = [], pages = 0;
const add = (f, msg) => issues.push(`${relative(ROOT, f)}: ${msg}`);

for (const f of files) {
  const h = readFileSync(f, "utf8");
  if (isRedirect(h)) continue;
  pages++;
  const rel = relative(ROOT, f);

  // title
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) add(f, "no <title>");
  else if (title.length > 62) add(f, `title ${title.length} chars (>62 may truncate in SERPs): "${title}"`);

  // description
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) add(f, "no meta description");
  else if (desc.length < 70 || desc.length > 165) add(f, `description ${desc.length} chars (aim 70-165)`);

  // canonical, og
  if (!/rel="canonical"/.test(h)) add(f, "no canonical");
  if (!/property="og:image"/.test(h)) add(f, "no og:image");
  if (!/name="twitter:card"/.test(h)) add(f, "no twitter:card");
  if (!/<html lang="/.test(h)) add(f, "no lang on <html>");
  if (!/name="viewport"/.test(h)) add(f, "no viewport");

  // headings
  const h1s = h.match(/<h1[ >]/g) || [];
  if (h1s.length !== 1) add(f, `${h1s.length} <h1> (want exactly 1)`);

  // images
  const imgs = h.match(/<img\b[^>]*>/g) || [];
  imgs.forEach((t, i) => {
    if (!/\salt=/.test(t)) add(f, `img #${i + 1} has no alt: ${t.slice(0, 90)}`);
    if (!/\swidth=/.test(t) || !/\sheight=/.test(t)) add(f, `img #${i + 1} missing width/height (CLS): ${t.slice(0,90)}`);
  });

  // duplicate ids
  const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dupes.length) add(f, `duplicate id(s): ${[...new Set(dupes)].join(", ")}`);

  // JSON-LD parses
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { add(f, `invalid JSON-LD: ${e.message}`); }
  }

  // structural balance (rough)
  for (const tag of ["div","section","article","main","header","footer","nav","ul","ol","li","button","a","figure","p"]) {
    const open = (h.match(new RegExp(`<${tag}\\b`, "g")) || []).length;
    const close = (h.match(new RegExp(`</${tag}>`, "g")) || []).length;
    if (open !== close) add(f, `<${tag}> unbalanced: ${open} open / ${close} close`);
  }

  // anchors with no accessible name
  for (const m of h.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const attrs = m[1], inner = m[2];
    const hasText = inner.replace(/<[^>]*>/g, "").trim().length > 0;
    const decorative = /tabindex="-1"/.test(attrs); // inside an aria-hidden teaser
    if (!hasText && !decorative && !/aria-label=/.test(attrs) && !/<svg/.test(inner) && !/<img[^>]+alt="[^"]+"/.test(inner))
      add(f, `link with no accessible name: <a${attrs.slice(0,80)}>`);
  }
}
console.log(`Audited ${pages} content pages (+${files.length - pages} redirect stubs).`);
if (issues.length) { console.log(`\n${issues.length} issue(s):`); issues.forEach(i => console.log("  " + i)); }
else console.log("\nClean.");
