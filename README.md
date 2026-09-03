# Kamika Bauelemente

Informative catalogue website for **Kamika Bauelemente** (Dominik Kamieński, Hechingen): windows,
doors, roller shutters, insect screens, gates, fences and hardware.

It is not a shop. No prices, no basket, no configurator — the visitor sees what is offered, browses
the catalogues, looks at completed work, and calls or writes.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script                | What it does                                                             |
| --------------------- | ------------------------------------------------------------------------ |
| `npm run check`       | Everything below, in order. Run this before pushing.                     |
| `npm run typecheck`   | `tsc --noEmit`                                                            |
| `npm run lint`        | ESLint (Next 16 dropped `next lint`)                                      |
| `npm run check:i18n`  | Fails if `en.ts` and `de.ts` keys are not in parity                       |
| `npm run sync:i18n`   | Regenerates `de.ts` from `en.ts`, keeping translations already filled in  |
| `npm run build`       | Production build                                                          |
| `npm run audit`       | Dead links, missing assets, duplicate ids, hardcoded text (needs a build) |
| `node scripts/build-category-heroes.mjs` | Redraws the category header images                    |
| `python3 scripts/extract_catalogue_models.py` | Re-reads the catalogues into the model showcase  |

## How it is put together

- **Next.js App Router + TypeScript + Tailwind.** framer-motion for animation, lenis for smooth
  scroll. No CMS, no database, no component library, no i18n library, no pdf.js.
- **Content layer.** No visible string is written inside a component. UI text comes from
  `src/content/en.ts` through `t()`; content text comes from the typed data files in `src/data`
  through `pick()`. `src/content/de.ts` already has every key, empty, waiting for translation.
- **Switching the site to German** means filling in `de.ts`, filling in the `de` fields in
  `src/data/**`, and changing `LOCALE` in `src/lib/i18n.ts`. No component changes.
- **Legal pages are the exception**: `/imprint` and `/privacy` are in German from day one, because
  German law requires it. Their text is in `src/content/legal.ts`, with an English comment above
  every block.
- **One model card** (`ModelCard`), used identically in the catalogue showcases, the category
  grids and the projects. Same for `Gallery`, `Breadcrumb`, `ComingSoon`, `SectionTitle`,
  `WindowFrame`.
- **The window frame is the signature**: every important image sits inside a frame mask, the hero
  sash opens on load, and dimension lines draw themselves on the hero.
- **No cookie banner is needed** — and that is a design constraint, not luck: fonts are
  self-hosted, the only analytics is Vercel Web Analytics (cookieless, no personal identifiers —
  added 2026-09), and the map loads only after a click that the visitor makes on purpose.

### If a replaced image still shows the old one locally

Next caches every optimised image in `.next/cache/images`, keyed by URL. Replace a file without
changing its name — a re-extracted model render, a new project photo — and the dev server keeps
serving the cached copy. Deployments are unaffected: each one starts with an empty cache.

```bash
rm -rf .next/cache/images    # PowerShell: Remove-Item -Recurse -Force .next\cache\images
```

## How a range is structured

A category shows the most concrete thing it has, in this order:

1. **Manufacturers**, where the range declares them — windows go Aluplast → system → version.
2. **Collections**, where the range has catalogues — entrance doors show the covers, and each one
   opens **all** of that catalogue's models at `/catalogues/{id}/models`; models that another
   catalogue contributes to the range (accessories, PIVOT doors, Klappläden) follow underneath.
3. A **coming-soon notice** with the general catalogues, for a range that has neither yet.

There are no hand-written product sheets: the example products of the first build were removed in
2026-08 and their code in 2026-09.

The 314 models are generated straight from the PDFs: name, page, image and specification come out
of the catalogue, so there is no hand-written list to keep in step. Each model has its own page and
a button that opens the catalogue at its exact page. Replacing a catalogue means re-running
`python3 scripts/extract_catalogue_models.py`.

## Data

Everything in `src/data` is **example data** except `company.ts`. Each file says so at the top.
`CONTENT.md` lists exactly what is still missing, what it must show, and who has to provide it.

## Deployment

Vercel, from `main`. Set `RESEND_API_KEY` and `RESEND_FROM` — see `.env.example`. Without them the
contact form falls back to a prepared `mailto:`.

The site's public address resolves itself from the build (`VERCEL_PROJECT_PRODUCTION_URL`), so
canonical tags, the sitemap and the JSON-LD follow the domain connected in the Vercel dashboard.
`NEXT_PUBLIC_SITE_URL` is only needed to force a different host.
