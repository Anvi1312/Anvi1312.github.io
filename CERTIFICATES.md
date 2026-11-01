# How certificates work on this site

Every certificate, letter, news feature and photo has its own page at
`/certificates/<slug>`. The list lives in `src/data/documents.js`.

## The slugs are final

Anvi's resume already links to these pages. Never rename a slug. A new document
gets a new slug in the same style (`what-it-is-year`).

## Files for each document

| What | Where | Size |
|---|---|---|
| Redacted file (PDF, or JPG for a photo) | `public/certificates/files/<slug>.pdf` | as small as it stays readable |
| Large preview of page 1 | `public/certificates/previews/<slug>.webp` | 1600 px wide |
| Small thumbnail of page 1 | `public/certificates/thumbs/<slug>.webp` | 640 px wide |

Then fill `file`, `preview` and `thumb` for that entry in `documents.js`.
An entry with no `file` and no `verify` link stays hidden, so nothing breaks.

## Rules

1. Recommendation letters are never published.
2. Design patent filing papers, receipts and anything with an application number are never published.
3. Cover personal details before a file goes in `public/`. That means enrolment and roll numbers,
   phone numbers, personal email addresses of other people, home addresses, dates of birth,
   membership numbers, CA membership numbers and QR codes that lead to personal records.
   Cover them with a solid box on the image itself, then rebuild the PDF from the images,
   so the hidden text cannot be copied out.
4. Strip all metadata (EXIF, GPS, author fields) from every image and PDF.
5. Other people's faces in group photos are fine.
6. The title, issuer, date and about line must match the document, never stronger than it.
7. The repository is public and git history is permanent. Never commit an unredacted file,
   not even for one commit.

## How the files are made

`Anvi Website/tools/prepare-documents.py` (outside this repository, next to the DOC folder)
reads each original from DOC and writes the three files above. Add a line for a new document
to its `DOCS` list, then run:

```
python -I "Anvi Website/tools/prepare-documents.py" <slug>
```

Redacted files are flattened: the page becomes a picture, solid boxes cover the private details,
and a new one-page PDF is built from that picture. Side-by-side comparisons go to
`Anvi Website/reports/redactions`, which is never published.

## Currently covered

| Slug | What is covered |
|---|---|
| `hindustan-platinum-internship-2024` | The supervisor's direct email and phone number |
| `lalit-rakesh-appreciation-2024` | The partner's CA membership number, two mobile numbers and personal email |
| `cybershadez-2026-appreciation` | The student enrolment number |
| `line-tech-internship-2025` | The mobile number in the footer |

The IEEE membership card is not published, because it shows the member number and a member
QR code. The IEEE membership certificate is used instead.
