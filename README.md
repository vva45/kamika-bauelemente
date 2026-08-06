# Kamika Bauelemente

Informative catalogue website for **Kamika Bauelemente** (Dominik Kamienski, Hechingen): windows,
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
| `npm run assets:placeholders` | Creates any missing image/PDF placeholder at its final path       |

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
- **One product card**, used identically on the home page, the category listings, "Goes well with"
  and the projects. Same for `Gallery`, `Breadcrumb`, `ComingSoon`, `SectionTitle`, `WindowFrame`.
- **The window frame is the signature**: every important image sits inside a frame mask, the hero
  sash opens on load, and dimension lines draw themselves on the hero and the product gallery.
- **No cookie banner is needed** — and that is a design constraint, not luck: fonts are
  self-hosted, there is no analytics, and the map is an image linking to Google Maps rather than an
  embedded iframe.

## Data

Everything in `src/data` is **example data** except `company.ts`. Each file says so at the top.
`CONTENT.md` lists exactly what is still missing, what it must show, and who has to provide it.

## Deployment

Vercel. Set `RESEND_API_KEY`, `RESEND_FROM` and (optionally) `NEXT_PUBLIC_SITE_URL` — see
`.env.example`. Without the Resend variables the contact form falls back to a prepared `mailto:`.
