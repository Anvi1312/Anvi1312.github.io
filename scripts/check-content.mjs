// Checks the words on the built site, so the house rules are never broken by accident.
// It reads every page in dist/ after "npm run build". Run with: npm run check
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "..", "dist");
if (!fs.existsSync(dist)) {
  console.error('No dist/ folder. Run "npm run build" first.');
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) pages.push(p);
  }
})(dist);

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const problems = [];

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const visible = decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<svg[\s\S]*?<\/svg>/g, " ")
      .replace(/<[^>]+>/g, "\n"),
  );
  // Also check the page title, description and image alt text.
  const attrs = [...html.matchAll(/(?:content|alt|aria-label|title)="([^"]*)"/g)].map((m) => decode(m[1]));
  const lines = [...visible.split("\n"), ...attrs].map((l) => l.trim()).filter(Boolean);
  const rel = path.relative(dist, file);
  for (const line of lines) {
    const hit = (why) => problems.push(`${rel}: ${why}: "${line.slice(0, 90)}"`);
    if (/https?:\/\//.test(line) && !/\s/.test(line)) continue; // a bare URL in an attribute
    if (/^\d+; url=/.test(line)) continue; // the redirect instruction on old pages
    if (/[—–]/.test(line)) hit("em or en dash");
    if (/;/.test(line)) hit("semicolon");
    if (/\+91|\b\d{5}\s?\d{5}\b/.test(line)) hit("looks like a phone number");
    if (/lorem ipsum|placeholder|\bTODO\b|\bTBD\b|example\.com/i.test(line)) hit("placeholder text");
    // The issuing office's official name is the only other place "Patents" may appear.
    const withoutOffice = line.replace(/Controller General of Patents, Designs and Trade Marks/g, "");
    if (/\bpatents?\b/i.test(withoutOffice) && !/design patents?|patent office/i.test(withoutOffice)) hit('"patent" is only used as "design patent" or "Patent Office"');
    if (/design applications?/i.test(line)) hit('say "design patent", not "design application"');
    if (/waitlist/i.test(line)) hit("never mention a waitlist");
    if (/\b(enrol?ment|roll)\s*(no|number)\b/i.test(line)) hit("looks like an ID number label");
    if (/Space Applications Centre/i.test(line)) hit("Space Applications Centre is not named on the site");
    if (/\binterview/i.test(line)) hit("no interview rounds are mentioned on the site");
  }
}

if (problems.length) {
  console.error("Content check failed:\n" + [...new Set(problems)].map((p) => "  - " + p).join("\n"));
  process.exit(1);
}
console.log(`Content check passed for ${pages.length} pages.`);
