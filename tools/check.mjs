/* Link + asset audit for the generated site. Resolves every relative href/src
   against the file it appears in, and reports anything missing. */
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
const ROOT = resolve(new URL(".", import.meta.url).pathname, "..");

const skipDirs = new Set([".git","node_modules","_site","docs","test","_sass","_includes","_layouts","_posts","_songs","_pages","_data",".sass-cache","tools","_tmptest",".github"]);
const htmlFiles = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") && e.name !== ".nojekyll") continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) { if (!skipDirs.has(e.name)) walk(full); }
    else if (e.name.endsWith(".html")) htmlFiles.push(full);
  }
})(ROOT);

let problems = [], checked = 0, extChecked = 0;
const attrRe = /(?:href|src|imagesrcset|srcset)\s*=\s*"([^"]*)"/g;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const dir = dirname(file);
  let m;
  while ((m = attrRe.exec(html))) {
    const raw = m[1];
    // srcset can hold several candidates
    const cands = /\s\d+w|\s[\d.]+x/.test(raw) ? raw.split(",").map(s => s.trim().split(/\s+/)[0]) : [raw];
    for (const c of cands) {
      if (!c) continue;
      if (/^(https?:|mailto:|tel:|data:|#|javascript:)/.test(c)) { extChecked++; continue; }
      if (!/[/.]/.test(c)) continue;                     // og:type etc.
      if (c.startsWith("/montay")) {                     // absolute site paths (404, manifest)
        const p = join(ROOT, c.replace(/^\/montay/, ""));
        checked++;
        const t = c.endsWith("/") || !c.split("/").pop().includes(".") ? join(p, "index.html") : p;
        if (!existsSync(t) && !existsSync(p)) problems.push(`${relative(ROOT,file)} -> ${c} (abs)`);
        continue;
      }
      if (c.startsWith("/")) { problems.push(`${relative(ROOT,file)} -> ${c} (root-absolute, breaks on subpath)`); continue; }
      checked++;
      const target = resolve(dir, c.split("#")[0].split("?")[0]);
      let ok = existsSync(target);
      if (ok && statSync(target).isDirectory()) ok = existsSync(join(target, "index.html"));
      if (!ok) problems.push(`${relative(ROOT,file)} -> ${c}`);
    }
  }
}
console.log(`HTML files: ${htmlFiles.length}`);
console.log(`internal refs checked: ${checked}   external/ignored: ${extChecked}`);
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); problems.forEach(p=>console.log("  " + p)); process.exit(1); }
else console.log("\nNo broken internal references.");
