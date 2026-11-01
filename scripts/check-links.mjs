// Checks that every internal link and file on the built site exists.
// It reads every page in dist/ after "npm run build", collects each href, src, srcset
// and link-preview address, and each url() in the CSS, and looks for the file it points to.
// Letter case must match exactly, because GitHub Pages is case-sensitive even though Windows is not.
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "..", "dist");
const SITE = "https://www.anvipanchal.in";
if (!fs.existsSync(dist)) {
  console.error('No dist/ folder. Run "npm run build" first.');
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else files.push(p);
  }
})(dist);

// True only if every part of the path exists with exactly this letter case.
const listing = new Map();
function existsExact(abs) {
  const rel = path.relative(dist, abs);
  if (rel.startsWith("..")) return false;
  let dir = dist;
  for (const part of rel.split(path.sep).filter(Boolean)) {
    if (!listing.has(dir)) listing.set(dir, fs.existsSync(dir) && fs.statSync(dir).isDirectory() ? fs.readdirSync(dir) : []);
    if (!listing.get(dir).includes(part)) return false;
    dir = path.join(dir, part);
  }
  return true;
}

// The ways GitHub Pages answers an address: the file itself, then x.html, then x/index.html.
function resolves(urlPath) {
  const base = path.join(dist, ...urlPath.split("/").filter(Boolean));
  if (urlPath.endsWith("/")) return existsExact(path.join(base, "index.html"));
  return (existsExact(base) && fs.statSync(base).isFile()) || existsExact(base + ".html") || existsExact(path.join(base, "index.html"));
}

const problems = [];
let checked = 0;
function check(ref, from) {
  let u = ref.trim();
  if (!u || u.startsWith("#") || /^(mailto|tel|data|javascript):/i.test(u)) return;
  if (/^https?:\/\//i.test(u)) {
    if (!u.startsWith(SITE)) return; // external, not checked here
    u = u.slice(SITE.length) || "/";
  }
  if (u.startsWith("//")) return;
  u = u.split("#")[0].split("?")[0];
  if (!u) return;
  let p;
  try {
    p = decodeURI(u);
  } catch {
    problems.push(`${from}: cannot decode "${ref}"`);
    return;
  }
  if (!p.startsWith("/")) {
    const fromDir = "/" + path.relative(dist, path.dirname(path.join(dist, from))).split(path.sep).filter(Boolean).join("/");
    p = path.posix.normalize(path.posix.join(fromDir, p));
  }
  checked++;
  if (!resolves(p)) problems.push(`${from}: "${ref}" does not exist`);
}

for (const file of files) {
  const rel = path.relative(dist, file).split(path.sep).join("/");
  if (file.endsWith(".html")) {
    const html = fs.readFileSync(file, "utf8").replace(/<script[\s\S]*?<\/script>/g, (s) => (/application\/ld\+json/.test(s) ? s : ""));
    for (const m of html.matchAll(/\s(?:href|src|poster)="([^"]*)"/g)) check(m[1].replace(/&amp;/g, "&"), rel);
    for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) for (const part of m[1].split(",")) check(part.trim().split(/\s+/)[0], rel);
    for (const m of html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|og:url|twitter:image)"[^>]+content="([^"]*)"/g)) check(m[1], rel);
    for (const m of html.matchAll(/<meta http-equiv="refresh" content="\d+;\s*url=([^"]*)"/g)) check(m[1], rel);
  } else if (file.endsWith(".css")) {
    const css = fs.readFileSync(file, "utf8");
    for (const m of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) check(m[1], rel);
  }
}

if (problems.length) {
  console.error("Link check failed:\n" + [...new Set(problems)].map((p) => "  - " + p).join("\n"));
  process.exit(1);
}
console.log(`Link check passed: ${checked} internal links and files, all present.`);
