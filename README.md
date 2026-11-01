# www.anvipanchal.in

Portfolio website of Anvi Panchal, built with [Astro](https://astro.build) and published on GitHub Pages.

## Run it on your computer

```
npm ci
npm run dev        # opens on http://localhost:4321
```

## Change the words

All the text is in `src/data/site.js`. Certificates are in `src/data/documents.js`.
Edit, save, and the page updates.

## Before publishing

```
npm run build
npm run check      # fails on house-rule breaks in the words, and on any internal link or file that does not exist
```

## Publishing

Every push to `main` builds the site and publishes it through `.github/workflows/deploy.yml`.
The repository's Pages source must be set to "GitHub Actions" (Settings > Pages).

## Pages

- `/` home page
- `/projects/<slug>` one page per project
- `/certificates` every certificate, and `/certificates/<slug>` one page each (see CERTIFICATES.md)
- `/about`, `/contact`, `/experience`, `/projects`, `/certifications` send old links to the right place

## Portrait

`python scripts/make_portrait.py "path/to/photo.png" 0.66` makes `public/images/anvi-panchal.webp` (820 x 948).

## Old addresses

The build also copies the resume to `/Resume/Anvi Panchal Resume.pdf`, the address the old site used.
