# Content still needed

Everything the site needs that I cannot invent. Kept up to date at the end of every phase.

**Who provides it**

- **Owner** — Dominik Kamienski. Facts about the company, the real catalogues, the real photos.
- **You** — Vlad. Decisions, review, and anything you can supply from your own material.

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
| `[~]`  | `public/images/categories/{slug}-hero.jpg`        | One photo per category (8 files). **`entrance-doors` is done**: it is composed from three real doors cut out of the catalogues. The other seven are brand plates — the window-frame motif in the logo colours with the range name — drawn by `node scripts/build-category-heroes.mjs`. They are deliberately graphics, not fake photography, and they can stay published until real photos arrive. 1600×1000. | Owner |
| `[~]`  | `public/images/windows/{product-id}-{1,2,3}.jpg`  | Three photos per product: the element installed, a profile/section detail, and a wider shot. 1600×1200. | Owner |
| `[~]`  | `public/images/about/dominik.jpg`                 | Portrait of Dominik for the About page. 1000×1250, plain background. **This one matters**: it is the only face on the site, and "about me" was one of the two things the owner asked for. | Owner |
| `[~]`  | `public/images/catalogues/{id}-cover.jpg`         | Front cover of each catalogue — it is also the card the visitor clicks in the range. ROKA's two PDFs have real covers, rendered from page 1. The Despiro and panel PDFs are extracts with no cover, so theirs are composed by `node scripts/build-collection-covers.mjs` from two of their own models. If the supplier sends a complete PDF, render page 1 and drop the composed one. | You   |
| `[~]`  | `public/images/projects/{id}-{n}.jpg`             | Minimum 3 photos per completed project.                                        | Owner |
| `[~]`  | `public/images/colours/render.jpg`                | One frame photographed in a **light, neutral colour** (white or light grey), evenly lit. The colour picker tints it with `mix-blend-multiply`, which keeps the shadows of the profile — but that only works if the source is pale. A dark frame will tint to mud. | Owner |
| `[x]`  | ~~`public/images/contact/map.jpg`~~               | Gone. The location is a **Google Maps embed behind a click** (`LocationMap`), with a cover the site draws itself. It pins the address on its own, so nothing has to be supplied. See the note below before changing how it loads. | —     |

> No stock photography of smiling people pointing at windows. Real installations only.

### Google Maps — behind a click, on purpose

The location is a real, navigable Google map, but it is **not loaded when the page opens**. What
the visitor sees first is a cover drawn by the site itself with the address and a "Show map"
button; the iframe is mounted only when that button is pressed (`Zwei-Klick-Lösung`, the standard
German pattern). Until then the browser contacts nobody.

Why it matters, in one line each:

- Without the gate, every visit would send the visitor's IP to Google and let Google set cookies —
  the mechanism a Munich court ruled on for Google Fonts in 2022, and the reason for the wave of
  cease-and-desist letters that followed.
- With the gate, the click **is** the consent (Art. 6(1)(a) GDPR, § 25(1) TDDDG), the site still
  needs no cookie banner, and `src/content/legal.ts` § 8 can go on saying plainly that nothing
  third-party loads on its own.
- The consent is deliberately **not** remembered between pages: storing it would mean writing to
  the visitor's device, which is the very thing § 25 governs. One extra click is cheaper than that
  argument.
- The cover is an abstract drawing in the brand colours, not a map of Hechingen. Faking the street
  layout would be dishonest, and a real preview tile would have to come from a map server — which
  is exactly what the gate exists to avoid.

If any of this is ever changed — map loaded automatically, consent remembered, another embed added
— **§ 8 and § 9 of the Datenschutzerklärung stop being true** and must be rewritten in the same
commit.

## 2. PDFs

Self-hosted, never linked to a manufacturer's website.

| Status | Path                                         | What it is                                                                 | Who   |
| ------ | -------------------------------------------- | -------------------------------------------------------------------------- | ----- |
| `[x]`  | `public/pdf/catalogues/*.pdf`                | **Four real catalogues are in place**, all of them entrance doors: ROKA Signature (298 pp), ROKA Select (23 pp), the panel catalogue (194 pp) and Despiro (37 pp). Titles, years, page counts and file sizes in `src/data/catalogues.ts` were read from the PDFs, not estimated. Covers are rendered from page 1. | —     |
| `[ ]`  | `public/pdf/catalogues/` — other ranges      | Nothing yet for windows, roller shutters, insect screens, gates, fences or hardware. Those categories currently have no catalogue to link to. | Owner |
| `[~]`  | `public/pdf/{category}/{product-id}.pdf`     | Per-product data sheet, where one exists. Five are placeholders; the rest of the products show no data-sheet button at all, which is the rule: no button beats a dead link. | Owner |

**Model → page mapping is done for entrance doors and missing for everything else.** Every one of
the 314 entrance-door models opens the catalogue at its exact page. The other ranges have no
catalogue to point at, so their products show no data-sheet button. Two things would fix that:
catalogues for the other ranges, and the owner naming which models he actually sells.

> **Branding rule, non-negotiable:** no competitor's mark may appear anywhere on this site.
> The panel catalogue arrived carrying another window company's logo on page 1. It was replaced
> with the Kamika wordmark inside the PDF itself — the image data was swapped, not covered, so the
> foreign logo no longer exists in the file — and the metadata was rewritten. All four PDFs were
> then swept: no matching text on any of the 552 pages, no links, and every small header/footer
> image was extracted and inspected by eye (the only brands left are component makers quoted by the
> manufacturer itself — Dr. Hahn, MACO, Masterline — which are hardware suppliers, not competitors).
> **Any new catalogue must be checked the same way before it is published.** Ask the supplier for a
> neutral or Kamika-branded master so it does not have to be done by hand, and confirm Kamika may
> distribute these catalogues under its own name.

## 3. Product data — the big one

`src/data/products/` holds 24 products, and **all 24 are still plausible examples** — they are
**not** Kamika's real range. Every one of those files carries a warning comment at the top.

Two ranges no longer use products at all, because the owner asked for the hierarchy the trade
actually uses — first the manufacturer, then what it offers:

| Range | Structure | Where the data comes from |
| ----- | --------- | ------------------------- |
| Windows | Aluplast → its systems → versions | `src/data/manufacturers.ts`, pending the Aluplast catalogue |
| Entrance doors | Collection (ROKA Signature, ROKA Select, Despiro, panels) → its models | the four PDFs, extracted |

So the entrance-door pages are no longer four hand-picked doors: the category shows the four
collection covers, and each cover opens the whole collection — 314 models with their specification
as printed and a link to their page in the PDF. Nothing there is written by hand.

The model photographs are the manufacturer's own renders, pulled out of the catalogues. Replace
them with photos of doors actually fitted when there are any — that is what sells a door.

Two details worth knowing about the remaining example products:

- The `related` lists ("Goes well with") are hand-picked cross-category pairings — a window
  recommends its shutter, screen and handle. Keep that logic when editing; it is the sales cross-link.
- `window-rebate-vent` deliberately has **no datasheet and no catalogue page**: it proves the rule
  that the "Technical data sheet" button is simply not rendered when there is no target. Don't
  "fix" it by adding a catalogue reference without thinking.

Needed from the owner, per product he actually sells:

- Model name exactly as the supplier writes it (never translated).
- Frame depth (mm), Uw value (W/m²K), number of chambers, glazing build-up.
- Sound insulation (dB), burglary resistance class (RC), max sash size, wind load class.
- Which catalogue it appears in, and **on which page** — that is what the data sheet button links to.

## 3b. Projects and colours — also example data

`src/data/projects.ts` holds **6 invented projects**. The towns are real ones around Hechingen
(Balingen, Burladingen, Albstadt, Bisingen, Tübingen) and the work described is plausible, but none
of it happened. Projects are what actually builds trust on a site like this, so replacing these
matters more than the product data — **even three real jobs with real photos beat six invented
ones.** For each: what the customer asked for, what was fitted, the town, the year, and 3+ photos.

`src/data/colors.ts` holds 33 finishes. The RAL codes are real and the hex values are the usual
on-screen approximations, but the owner has to confirm **which finishes Kamika actually offers**,
which are stock and which are made to order, and which are unavailable on a given material.

## 3b-bis. Windows — the manufacturer hierarchy

The owner asked for windows to be organised the way the trade quotes them:
**Windows → manufacturer → system → versions**. That structure is live with **Aluplast** as the
first manufacturer (`src/data/manufacturers.ts`), showing four systems: IDEAL 4000, IDEAL 5000,
IDEAL 7000 and energeto 8000.

What still needs confirming, because the Aluplast catalogue has not arrived yet:

- **Which systems Kamika actually sells.** The four listed are Aluplast's public flagship range;
  the chamber counts and system depths on the drawings are the manufacturer's public figures and
  must be checked against the catalogue when it comes.
- **Versions and specifications per system** — extracted from the catalogue when it arrives,
  exactly as was done for the entrance-door catalogues. The system pages say so honestly and route
  to contact until then.
- **The Aluplast logo.** The card currently carries a neutral typographic plate, NOT the registered
  logo — reproducing a third party's trademark needs their permission. If the owner gets the
  official logo pack from his Aluplast rep (dealers usually may use it), replace
  `public/images/manufacturers/aluplast.jpg` — same path, no code change.

The four example window products were removed with their images, data sheets and cross-references:
an invented model cannot sit next to a real hierarchy.

## 3c. The catalogue showcase — generated, not written

`src/data/catalogue-models.ts` holds **314 models**, every one in the four catalogues, with its
name, its page, its photograph and whatever specification the catalogue prints. It is generated:

```bash
python3 scripts/extract_catalogue_models.py    # needs: pip install pymupdf
```

The script reads the PDFs, pairs each model label with the image next to it, crops it to
`public/images/models/{catalogue}/{model}.jpg` and writes the data file. **Re-run it whenever a
catalogue is replaced** — the page numbers move, and the `#page=N` links would quietly point at the
wrong door.

Nothing here is written by hand, so nothing here needs the owner's review — but two things are
worth knowing:

- The specification text is reproduced **in German**, exactly as the manufacturer prints it
  ("Keramik - Oxide Nero", "8 mm Applikationen…"). Translating it would mean inventing wording for
  someone else's product.
- These are the manufacturer's renders. They are honest and they are what the customer will
  compare, but a photo of a door Kamika actually fitted beats any of them.

## 4. Text the owner has to write

| Status | Where                          | What                                                                             | Who   |
| ------ | ------------------------------ | -------------------------------------------------------------------------------- | ----- |
| `[~]`  | `/about` — "About Dominik"     | A short first-person paragraph: how long in the trade, what he did before, why he set up on his own. I will **not** invent a biography. The two paragraphs live in `src/content/en.ts` (`about.ownerBody1/2`) and are a **placeholder draft**, marked in `src/app/about/page.tsx` with `{/* TODO: texto real del dueño */}`. | Owner |
| `[ ]`  | `/about` — "The company"       | Confirm the working area (Hechingen + which surrounding towns), and whether Kamika installs itself or subcontracts. | Owner |
| `[~]`  | `src/data/categories.ts`       | The 8 category intros are a technical draft written by me. They need reading through — they must describe what Kamika actually supplies. | Owner |
| `[ ]`  | `src/data/company.ts`          | **Opening hours.** Currently `null`, so the site simply omits the block rather than publishing invented hours. | Owner |
| `[ ]`  | `src/data/company.ts`          | Confirm the map coordinates (currently the centre of Hechingen, not the exact address). | You   |
| `[ ]`  | Vercel → domain                | **The final domain.** Everything absolute — canonical tags, sitemap, OpenGraph, JSON-LD — is built from it, and it now resolves itself from the Vercel build (`VERCEL_PROJECT_PRODUCTION_URL`). Connecting `kamika-bauelemente.de` in the Vercel dashboard is enough; no code change and no environment variable. `NEXT_PUBLIC_SITE_URL` only exists to force a different host. | Owner |
| `[ ]`  | Vercel → environment variables | `RESEND_API_KEY` and `RESEND_FROM` (see `.env.example`). Until they are set, the contact form does not send by itself: it hands the visitor a ready-written `mailto:`. That works, but it loses anyone without a mail client configured. | You   |

## 5. Brand assets

| Status | Path                               | Note                                                                            | Who   |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------- | ----- |
| `[x]`  | `public/brand/kamika-logo.png`     | **The owner's original file is in place** (1092×1092). `scripts/build-brand-assets.mjs` deliberately never touches it. | —     |
| `[~]`  | `public/brand/kamika-wordmark.svg` | Vector reconstruction in Outfit, proportions measured off the original file (ink-pixel histogram). For print/vector use, convert the text to outlines first. | You   |
| `[x]`  | `src/app/icon.svg`                 | Favicon: the window-frame mark, ink on the logo blue. Mine, no source needed.    | —     |
| `[x]`  | `src/app/apple-icon.png`           | Generated from `icon.svg` by `node scripts/build-brand-assets.mjs`.              | —     |
| `[x]`  | `--kamika-blue` value              | Token kept at `#AFC9EF` as specified in the brief. The logo file's background samples at ≈`#B0CDF7` (≈8 units brighter in the blue channel, with compression noise). Imperceptible side by side; say the word if you want the token switched to the sampled value. | —     |

The header logo is rendered as **live text** in Outfit, not an image — crisp at every size,
selectable, and it recolours for dark backgrounds. Verified against the original file, not assumed:
Outfit's lowercase `a` is single-storey in a near-circular box, and the measured proportions match —
`Kamika` ink width/height 4.481 in the file vs 4.48 for Outfit 400; `BAUELEMENTE` is 20% of the main
size and 0.656 of its width, which the component reproduces. See
`src/components/brand/Wordmark.tsx`.

## 6. Legal — must be checked by a lawyer

`/imprint` (§ 5 DDG) and `/privacy` (DSGVO) will be written in German in phase 5, with an English
comment above each block explaining what it says. **Neither is legal advice and both need review by
a German lawyer before the site goes live.**

Both pages are written and live at `/imprint` and `/privacy`, in German, with an English comment
above every block in `src/content/legal.ts` explaining what that block says.

Needed to complete them:

- **Umsatzsteuer-Identifikationsnummer (VAT ID)**, if the business has one. `COMPANY.vatId` is
  `null`, so the block is simply not published — better than publishing a placeholder.
- **Handwerksrolle / chamber of trade** and the professional title, if the trade is a regulated
  one. Same mechanism: `COMPANY.chamber`.
- Confirmation that `Dominik Kamienski – Einzelunternehmen` is the exact legal name to publish.
- **A decision on section 6 of the privacy policy** ("Versand der Formularnachrichten"). It names
  Resend as the processor that delivers form messages. That is only true once `RESEND_API_KEY` is
  set in Vercel. If the form ends up delivering only through the visitor's own mail client, that
  block must be deleted — publishing a processor you do not use is itself a defect.
- The privacy policy states that the site sets **no cookies and runs no analytics**. That is true
  of the site as built. Adding Google Analytics, an embedded map or any third-party widget makes it
  false and forces a consent banner.

## 7. Checks before publishing

Run `npm run check` — typecheck, lint, i18n parity, production build and the site audit in one go.

The audit (`npm run audit`, after a build) reports dead internal links, referenced assets that do
not exist, duplicate ids across the data files, broken cross-references (`related`, project
`products`, catalogue ids), visible text hardcoded outside the content layer, and content keys that
nobody uses. It strips the `#page=N` anchor before checking whether a PDF exists, so catalogue
links do not raise false alarms.

Current state: **0 problems**, one deliberately unused key (`common.downloadCatalogue`, reserved
for the third-party-brand rule).

## 8. German translation (future phase)

Nothing to do yet. When the time comes:

1. Fill in the values in `src/content/de.ts` (keys are already generated and in parity).
2. Fill in the `de` field on the localised entries in `src/data/**`.
3. Change `LOCALE` to `'de'` in `src/lib/i18n.ts`.

No component changes. Run `npm run check:i18n` to confirm nothing drifted.
