// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The old site served the resume at /Resume/Anvi Panchal Resume.pdf. Windows cannot hold
// both public/Resume and public/resume, so the build copies the one resume to the old address.
function oldResumeAddress() {
  return {
    name: "old-resume-address",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const out = fileURLToPath(dir);
        fs.mkdirSync(path.join(out, "Resume"), { recursive: true });
        fs.copyFileSync(path.join(out, "resume", "anvi-panchal-resume.pdf"), path.join(out, "Resume", "Anvi Panchal Resume.pdf"));
      },
    },
  };
}

// Old page addresses from the previous site, kept alive so existing links still work.
const OLD_PAGES = ["/about", "/contact", "/experience", "/projects", "/certifications"];

export default defineConfig({
  site: "https://www.anvipanchal.in",
  // "file" builds /projects/coast-scan.html, so the old .html links keep working,
  // and GitHub Pages also serves the same page at /projects/coast-scan
  build: { format: "file" },
  trailingSlash: "never",
  integrations: [
    oldResumeAddress(),
    sitemap({
      filter: (page) => !OLD_PAGES.some((p) => page.replace(/\.html$/, "").endsWith(p)) && !page.includes("404"),
    }),
  ],
});
