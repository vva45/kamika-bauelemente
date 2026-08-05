# Content still needed

Everything the site needs that I cannot invent. Kept up to date at the end of every phase.

**Who provides it**

- **Owner** — Dominik Kamienski. Facts about the company, the real catalogues, the real photos.
- **You** — Vlad. Decisions, review, and anything you can pull from the existing Kristall Fenster material.

Status legend: `[ ]` missing · `[~]` placeholder in place, needs replacing.

---

## 1. Photography

All placeholders are generated locally in the brand palette, at the exact final paths. Replacing
them is a copy-and-paste — no code change, same filename.

Regenerate any missing ones at any time with:

```bash
npm run assets:placeholders
```

| Status | Path                                             | What it must show                                                              | Who   |
| ------ | ------------------------------------------------ | ------------------------------------------------------------------------------ | ----- |
| `[~]`  | `public/images/home/hero.jpg`                    | One strong installation photo — a finished window or door in a real house. Landscape, 2400×1500 or larger. This is the first thing a visitor sees. | Owner |
| `[~]`  | `public/images/categories/{slug}-hero.jpg`        | One photo per category (8 files: `windows`, `entrance-doors`, `interior-doors`, `roller-shutters`, `insect-screens`, `gates`, `fences`, `accessories`). 1600×1000. | Owner |
| `[~]`  | `public/images/windows/{product-id}-{1,2,3}.jpg`  | Three photos per product: the element installed, a profile/section detail, and a wider shot. 1600×1200. | Owner |
| `[ ]`  | `public/images/about/dominik.jpg`                 | Portrait of Dominik for the About page. 1000×1250, plain background.            | Owner |
| `[~]`  | `public/images/catalogues/{id}-cover.jpg`         | Front cover of each catalogue. Can be exported from page 1 of the PDF.          | You   |
| `[ ]`  | `public/images/projects/{id}-{n}.jpg`             | Minimum 3 photos per completed project.                                        | Owner |

> No stock photography of smiling people pointing at windows. Real installations only.

## 2. PDFs

Self-hosted, never linked to a manufacturer's website.

| Status | Path                                         | What it is                                                                 | Who   |
| ------ | -------------------------------------------- | -------------------------------------------------------------------------- | ----- |
| `[~]`  | `public/pdf/catalogues/{id}.pdf`             | The catalogues customers should be able to browse. Placeholders are real 60-page PDFs so `#page=N` links can be tested. | Owner |
| `[~]`  | `public/pdf/{category}/{product-id}.pdf`     | Per-product data sheet, where one exists. Products without one link to a page inside the general catalogue instead. | Owner |

Also needed per catalogue: **exact title, year, page count and file size** (currently invented in
`src/data/catalogues.ts`).

## 3. Product data — the big one

`src/data/products/windows.ts` currently holds **4 example products**. Model names, frame depths,
Uw values, sound ratings and RC classes are plausible for the trade but **are not Kamika's real
range**. Every file in `src/data/products/` carries a warning comment at the top.

Needed from the owner, per product he actually sells:

- Model name exactly as the supplier writes it (never translated).
- Frame depth (mm), Uw value (W/m²K), number of chambers, glazing build-up.
- Sound insulation (dB), burglary resistance class (RC), max sash size, wind load class.
- Which catalogue it appears in, and **on which page** — that is what the data sheet button links to.

## 4. Text the owner has to write

| Status | Where                          | What                                                                             | Who   |
| ------ | ------------------------------ | -------------------------------------------------------------------------------- | ----- |
| `[ ]`  | `/about` — "About Dominik"     | A short first-person paragraph: how long in the trade, what he did before, why he set up on his own. I will **not** invent a biography. Marked in code with `{/* TODO: texto real del dueño */}` when the page is built. | Owner |
| `[ ]`  | `/about` — "The company"       | Confirm the working area (Hechingen + which surrounding towns), and whether Kamika installs itself or subcontracts. | Owner |
| `[~]`  | `src/data/categories.ts`       | The 8 category intros are a technical draft written by me. They need reading through — they must describe what Kamika actually supplies. | Owner |
| `[ ]`  | `src/data/company.ts`          | **Opening hours.** Currently `null`, so the site simply omits the block rather than publishing invented hours. | Owner |
| `[ ]`  | `src/data/company.ts`          | Confirm the map coordinates (currently the centre of Hechingen, not the exact address). | You   |

## 5. Brand assets

| Status | Path                               | Note                                                                            | Who   |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------- | ----- |
| `[~]`  | `public/brand/kamika-logo.png`     | **Save the original logo image here** (1080×1080 is fine). My version is rasterised from the SVG below, and because Outfit is not installed system-wide it falls back to a system face — the proportions are right but the letterforms are not exact. | Owner |
| `[~]`  | `public/brand/kamika-wordmark.svg` | My reconstruction in Outfit, with the proportions measured off the original. Once the real logo file arrives, convert it to outlines. | You   |
| `[x]`  | `src/app/icon.svg`                 | Favicon: the window-frame mark, ink on the logo blue. Mine, no source needed.    | —     |
| `[x]`  | `src/app/apple-icon.png`           | Generated from `icon.svg` by `node scripts/build-brand-assets.mjs`.              | —     |
| `[ ]`  | `--kamika-blue` exact value        | The token is `#AFC9EF` as specified. Once the original logo file is in the repo I can sample the background pixel and confirm it to the digit. | You   |

The header logo is rendered as **live text** in Outfit, not an image — crisp at every size,
selectable, and it recolours for dark backgrounds. Outfit was verified against the original rather
than assumed: its lowercase `a` is single-storey in a near-circular box (counter centred at 0.50,
95×98), which is the letterform the logo uses. Weight, tracking and the size of the `BAUELEMENTE`
line were measured off the logo, not guessed — see the comment in
`src/components/brand/Wordmark.tsx`.

## 6. Legal — must be checked by a lawyer

`/imprint` (§ 5 DDG) and `/privacy` (DSGVO) will be written in German in phase 5, with an English
comment above each block explaining what it says. **Neither is legal advice and both need review by
a German lawyer before the site goes live.**

Needed to complete them:

- Umsatzsteuer-Identifikationsnummer (VAT ID), if the business has one.
- Whether the business is entered in any Handwerksrolle / chamber of trade, and which one.
- Confirmation that `Dominik Kamienski – Einzelunternehmen` is the exact legal name to publish.

## 7. German translation (future phase)

Nothing to do yet. When the time comes:

1. Fill in the values in `src/content/de.ts` (keys are already generated and in parity).
2. Fill in the `de` field on the localised entries in `src/data/**`.
3. Change `LOCALE` to `'de'` in `src/lib/i18n.ts`.

No component changes. Run `npm run check:i18n` to confirm nothing drifted.
