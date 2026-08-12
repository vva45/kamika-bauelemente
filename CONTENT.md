# Content still needed

Everything the site needs that I cannot invent. Kept up to date at the end of every phase.

**Who provides it**

- **Owner** — Dominik Kamieński. Facts about the company, the real catalogues, the real photos.
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
| `[x]`  | `public/images/categories/{slug}-hero.jpg`        | **Done — all eight are the owner's own photographs**, 1536×1024 (3:2), which is exactly what the frame shows, so none of them is cropped. `build-category-heroes.mjs` no longer generates any of them: every slug is in `OWNER_PHOTOS` and the script refuses to overwrite a real photograph. Replacing one means keeping 3:2 and remembering the Kamika wordmark sits in the top-left corner — the first thing any crop eats. | —     |
| `[~]`  | `public/images/windows/{product-id}-{1,2,3}.jpg`  | Three photos per product: the element installed, a profile/section detail, and a wider shot. 1600×1200. | Owner |
| `[x]`  | `public/images/about/dominik.jpg`                 | **The real portrait AND the real bio are in place** (2026-08). The frame crops the photo to 4:5 with the face centred — checked in a real browser. The bio is the owner's own text, translated to English for now; **the German original is stored verbatim in `de.ts`** (`about.ownerBody1/2`, `about.ownerRole`) and goes out literally when the site switches to German. | —     |
| `[~]`  | `public/images/catalogues/{id}-cover.jpg`         | Front cover of each catalogue — it is also the card the visitor clicks in the range. ROKA's two PDFs have real covers, rendered from page 1. The Despiro and panel PDFs are extracts with no cover, so theirs are composed by `node scripts/build-collection-covers.mjs` from two of their own models. If the supplier sends a complete PDF, render page 1 and drop the composed one. | You   |
| `[~]`  | `public/images/projects/{id}-{n}.jpg`             | **16 real jobs are online** with the owner's photos (2026-08). Most have a single photo, which is what he had; a second and third of the same job — a wider shot, a detail — make a project page much more convincing. Two photos of the batch (06, 07) still have no job attached. | Owner |
| `[~]`  | `public/images/colours/render.jpg`                | One frame photographed in a **light, neutral colour** (white or light grey), evenly lit. The colour picker tints it with `mix-blend-multiply`, which keeps the shadows of the profile — but that only works if the source is pale. A dark frame will tint to mud. | Owner |
| `[x]`  | ~~`public/images/contact/map.jpg`~~               | Gone. The location is a **Google Maps embed behind a click** (`LocationMap`), with a cover the site draws itself. It pins the address on its own, so nothing has to be supplied. See the note below before changing how it loads. | —     |

> No stock photography of smiling people pointing at windows. Real installations only.

### The contact form does not send email yet — and WhatsApp is why that is survivable

`RESEND_API_KEY` and `RESEND_FROM` are **not set in Vercel**, confirmed by submitting the live form.
So the form validates, composes the message, and then hands it back to the visitor instead of
sending it: the block offers the prepared email, a WhatsApp message with the same text, a copy
button, and the address in plain sight. Nothing is lost, but **nothing arrives on its own either**.

- **Fix, in order of value:** create a Resend account, verify a sending domain, set the two
  variables in Vercel, redeploy. No code changes. Until then every enquiry depends on the visitor
  finishing the job in their own mail app or WhatsApp.
- Without a domain, Resend's test sender only delivers to the address the account was opened with —
  which is `kamika.bauelemente@gmail.com`, so it works as a stopgap. Check it when setting it up.

**WhatsApp** now appears in the contact block, the contact page, the footer and the fallback, as
`https://wa.me/491627742992`, built from `COMPANY.phone`.

- ✅ Confirmed by the owner's side: that number is on WhatsApp and is already used with customers.
- No WhatsApp logo is used, only the name and a neutral speech bubble — same rule as everywhere
  else on this site: no third-party marks.

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

### The eight ranges, and why three of them changed in August 2026

The owner asked for "a separate category for patio doors / terrace doors". Those are the same
product — Terrassentür in German, and English uses both names — so the slash reads as a synonym,
not as two ranges. One range was published, `patio-doors`, named "Patio doors" with "terrace" in
the intro so a search for either word lands on it.

It first shipped as a type inside a **Doors** hub. In August 2026 the owner reorganised the
catalogue and three things changed at once:

- **Patio doors became a main range**, sitting between Windows and Entrance doors — his words:
  the sliding systems are the flagship, not a sub-type. Salamander's Slide and HST systems belong
  there too.
- **Interior doors were dropped.** He will not be offering them. The range, its (empty) product
  file and the one genuine catalogue find are gone — see below.
- **Fences were dropped** as well, with their four example products.
- **Pergolas were added**, in the honest coming-soon state: no catalogue has arrived, so the page
  says the documentation is on its way instead of inventing systems.

With interior doors gone, the **Doors hub had one child left** — entrance doors — which made it a
click that led nowhere new, so it was dissolved and entrance doors went back to the top level.
The `parent` mechanism stayed in the code (category page, nav dropdown and model counts all still
understand it) because the next grouping request would otherwise have to rebuild it.

The URLs were always flat — `/products/entrance-doors`, never `/products/doors/entrance-doors` —
which is why dissolving the hub broke no shared link. The three retired slugs (`doors`,
`interior-doors`, `fences`) redirect 308 to `/products` in all three languages, plus the
language-less legacy forms, so an old WhatsApp link lands on the range mosaic instead of a 404.

~~The two patio-door models are examples~~ — **resolved 2026-08**: the Salamander leaflet brought
the real sliding systems, the range now runs on the manufacturer hierarchy (Salamander →
evolutionDrive SF / Plus+ / 82 HST) and the two invented models are gone, images and all. See "The
Salamander leaflet" below.

**Insect screens went the same way** (owner's call, 2026-08): the Insektenschutz-Plisee from the
Drutex shutter catalogue *is* an insect screen, so it now lives in that range — the move is
`category: "insect-screens"` on the model, declared in `SHUTTER_SECTIONS` so it survives
re-extraction — and the four example screens were deleted. The range holds one real model until an
insect-screen catalogue arrives.

**The interior-door sweep, and what happened to its one find.** Before the range was dropped, the
owner asked for a sweep of every catalogue for interior doors, and across all ten there was
exactly ONE genuine hit: the **System MB-45 (kalt)** spread in the Außentüren catalogue, which the
catalogue itself recommends "vor allem im Innenbereich" (partitions, corridors, shop fronts,
vitrines — single-chamber profiles without thermal break). It was declared by hand in
`AUSSEN_MANUAL` of `extract_drutex_models.py`. When the range went, so did the model, the manual
entry and its extracted photo: leaving it marked would have resurrected a dead category on the
next extraction. `AUSSEN_MANUAL` is now an empty list, kept for the mechanism. Near-misses that
were checked and rejected at the time, recorded so nobody re-runs the sweep: "Innentürpaneel" in
the Aluprof panels catalogue is the inner-face panel of an entrance door, and D-ART LINE's
"/ inside" captions are interior *views* of entrance doors.

**Pergolas have no catalogue yet.** The range is deliberately `comingSoon: true` with no product
file at all, and its hero is a generated line-drawing sheet, not a photograph. When the
manufacturer's PDF arrives it follows the normal route: self-host it, extract the models, write
nothing from memory.

### The two IGLO catalogues (2026-08)

The owner sent a 96-page PVC window catalogue and a 6-page terrace-systems leaflet, both from the
same manufacturer as the shutter and door catalogues, with one instruction: *"make sure the Drutex
name and the Bayern Munich logo are not visible."* `scripts/prepare_iglo.py` does it and must be
re-run if a newer edition arrives. What it removes: the cover logo and the sponsor crest (the
covers are spreads, so the whole back cover — address, phone, "Official Partner of FC Bayern" — is
cropped off), the logo on every inner spread's dark band (replaced by Kamika's mark, same size,
same place), the loose "D" in the top-right margin, `www.drutex.de` in every footer, the QR codes
that lead to their configurator, and the last four sheets (cross-selling their other ranges plus a
company profile photographed over a yard of liveried trucks).

**IGLO stays.** It names the *systems* — IGLO EDGE, IGLO 5, IGLO-HS — not the manufacturer, and
without it the catalogue could not even be cited. The owner calls it "iglo window" himself.

**All placed now (2026-08).** The 15 systems became manufacturer systems, the same mechanism as
Salamander: an **IGLO** manufacturer under windows (7 systems, Edge to EXT) and under patio doors
(7 systems, HS to Edge Slide), each with specs copied from its spread and a datasheet button that
opens the self-hosted PDF at that exact sheet. The 15th, **Ideal Neo MD, is signed by Aluplast in
print**, so it hangs under the existing Aluplast manufacturer instead — crediting IGLO with it
would have been wrong. "IGLO" itself is the system brand and may be shown; the manufacturer's
company name stays invisible per the owner's instruction. The ZUBEHÖR section became 7 accessory
catalogue-models (family "Fenster-Zubehör": Sprossen, Balkontürschwellen, Beschläge,
Renovationsrahmen, Ventilierungen, Griffe, Smart Home), images extracted from the PDF. The FARBEN
sheet added nothing new — its swatches are bitmap-only; the codes came from the leaflet's chart.

### The two shutter catalogues are white-labelled — a decision to confirm

The roller-shutter and facade-blind catalogues come from the same manufacturer as the window
profiles. Unlike ROKA or Despiro, **that manufacturer sells directly to end customers in Germany**,
so the self-hosted copies were stripped of everything that routes a Kamika visitor to them:

- the cover logo → the Kamika wordmark, and the back cover → Kamika's address;
- the corporate "Unsere Firma" page and the B2B page with QR codes to their sales platform, both
  deleted outright;
- every URL and postal address. Verified: no `ekookna`, `eko4u`, `Kornice` or `Spacerowa` left in
  any page's text.

What was **kept**: mentions of the manufacturer inside technical body text ("Monoblock-Führungs-
schiene …", "Die Modelle von … sind pulverbeschichtet"). Those are honest attribution and lead
nowhere. The collections are therefore named plainly — "Roller shutters", "Facade blinds" — with
no brand, unlike the door collections.

**If the owner would rather credit the manufacturer** (as ROKA and Aluprof are credited), it is one
line per catalogue in `src/data/catalogues.ts` plus re-running the cover script. Ask him — this is
a commercial call, not a technical one.

**In-text mentions leak too (caught 2026-08).** A deep audit found "Eko-Okna" still printed in the
running text of two published PDFs — a rail caption on sheet 26 and a "full range available on the
website of…" sentence on sheet 29 of the facade-blind catalogue, and one "Die Modelle von
Eko-Okna…" on sheet 42 of the shutter catalogue. Logo removal alone does not white-label a PDF:
grep the TEXT of every page for the intermediary's name before publishing (`page.get_text()`
over the whole document). Those three were redacted in place, dangling words ("von") included.

**And images leak past the text grep (caught 2026-08, during the colour pass).** Sheet 52 of the
roller-shutter catalogue was a full-page Eko-Okna logo drawn as ONE bitmap — zero text on the page,
so every text scan above called it clean. The page was deleted outright (the file is 53 sheets now;
`catalogues.ts` re-measured). The complete white-label audit is therefore three passes, not one:
text grep, logo shapes, and a human flip through the rendered page images.

### The three Drutex catalogues — same rule, harder to apply

D-ART LINE, Außentüren and the roller-shutter/Raffstoren/insect-screen catalogue come from Drutex,
which also **sells directly to end customers in Germany**. Same treatment as the shutter catalogues
above, run by `scripts/prepare_drutex.py`:

- the cover logo → the Kamika wordmark, and the same on the dark band of every section opener;
- every URL (`.de` and `.eu`), the Bytów address, the phone number and the FC Bayern sponsorship;
- **twenty-odd QR codes** ("MEHR MUSTER", "MEHR KONSTRUKTIONEN") that lead to their configurator,
  with their captions;
- the back cover and the cross-selling pages for their other products.

Two traps worth recording, because a text search says "clean" while the page still shows the brand:

1. **The logo is not text.** It is drawn letter by letter as vector paths, so `search_for("DRUTEX")`
   finds nothing. The script recognises it by shape — the 21×25 "D" plus its five letters — and
   removes it from ~50 pages.
2. **The originals were being served.** `public/pdf/catalogues/` had the untouched files in it, so
   anyone could download the fully branded version. They now live in `source-catalogues/`, outside
   `public/`, which is also where the script reads them from.
3. **The brand can live inside a photograph (caught 2026-08).** Page 21 of the Außentüren
   catalogue shows a RAL colour fan photographed WITH its printed "DRUTEX RAL K7 CLASSIC" label —
   pixels, not text, so both earlier passes missed it. Scrubbed with a pixel redaction
   (`apply_redactions(images=PDF_REDACT_IMAGE_PIXELS)` over just that region), and the file size in
   `catalogues.ts` re-measured afterwards, because rewriting images changes it.

What was **kept**: the line name `D-ART LINE` and the model names printed under each door
(`Washington 6`, `Alaska 1`…). Those are how the customer will refer to a door on the phone, and
renaming them would leave the website saying one thing and the PDF another.

**Not stripped, deliberately**: third-party component brands inside the catalogue pages — ekey,
IDENCOM, SOMMER, DORMA, GEZE, SOMFY, doorbox, Swisspacer. Those are suppliers of parts, not
competitors selling windows to the end customer, and naming them is honest attribution.

### The Salamander leaflet — Polish, and why that is fine

`source-catalogues/Ulotka_Salamander_PL.pdf` is Eko-Okna's Salamander systems leaflet. The owner
confirmed it only exists as sent ("así me lo han enviado"), so it is published as-is after the
usual treatment (`scripts/prepare_salamander.py`): Eko-Okna's cover logo → Kamika wordmark, their
URL, the accessories-page QR and the back cover removed — **Salamander stays**, because Salamander
is the profile maker and is credited like Aluplast or VEKA; Eko-Okna is the intermediary that also
sells direct in Germany.

The Polish is survivable because nothing Polish reaches the site's data: the parameters are numbers
and classes, the site's system pages are written in the content layer like every other
manufacturer, and the PDF itself is documentation for whoever wants to leaf through it.

What came out of it:

- **Windows → Salamander** gained greenEvolution Flex and bluEvolution 92 (bluEvolution 82 was
  already there from its own datasheet and was not touched).
- **Patio doors** switched from two EXAMPLE products to the real manufacturer hierarchy:
  Salamander → evolutionDrive SF / Plus+ / 82 HST. Same `id: "salamander"` in a second category —
  the lookup key is (category, id), and the audit now checks exactly that.
- **9 accessories** from the "Dodatki" page (names as printed, Polish included) and **3 thresholds**
  from the Außentüren catalogue that had been left out of the first pass.
- **49 SAL foil colours**, measured off the printed chart (the chart prints only codes, no names —
  so the name IS the code and the colour chip skips the duplicate line).

One misprint documented: the leaflet prints bluEvolution 92's Uw as "7,73-1,1". A range cannot
start above where it ends; the 82 prints "0,74-1,10" in the same box and the maker publishes 0,73
for the 92 — the site says 0,73–1,1 and the data file carries the comment.

### Supplier image permission — ekookna.pl and drutex.es

The owner passed on written permission (2026-08) to use the images available for download on
`ekookna.pl` and `drutex.es`. That is where the factory aerial on /about and the system sheets
come from. Two limits stay in force: the **downloadable** assets only, and **no supplier logo**
appears on the site — same rule as every other brand.

## 2. PDFs

Self-hosted, never linked to a manufacturer's website.

| Status | Path                                         | What it is                                                                 | Who   |
| ------ | -------------------------------------------- | -------------------------------------------------------------------------- | ----- |
| `[x]`  | `public/pdf/catalogues/*.pdf`                | **Six real catalogues are in place** — four entrance doors and two roller shutters, all of them entrance doors: ROKA Signature (298 pp), ROKA Select (23 pp), the Aluprof panel catalogue (194 pp) and Despiro (37 pp). Titles, years, page counts and file sizes in `src/data/catalogues.ts` were read from the PDFs, not estimated. Covers are rendered from page 1. | —     |
| `[ ]`  | `public/pdf/catalogues/` — other ranges      | Nothing yet for windows, roller shutters, insect screens, gates, pergolas or hardware. Those categories currently have no catalogue to link to. | Owner |
| `[~]`  | `public/pdf/{category}/{product-id}.pdf`     | Per-product data sheet, where one exists. Five are placeholders; the rest of the products show no data-sheet button at all, which is the rule: no button beats a dead link. | Owner |

**Model → page mapping is done for entrance doors and missing for everything else.** Every one of
the 314 entrance-door models opens the catalogue at its exact page. The other ranges have no
catalogue to point at, so their products show no data-sheet button. Two things would fix that:
catalogues for the other ranges, and the owner naming which models he actually sells.

> **Branding rule, non-negotiable:** no competitor's mark may appear anywhere on this site.
> The Aluprof panel catalogue arrived carrying another window company's logo on page 1 — a local competitor's, not the manufacturer's. It was replaced
> with the Kamika wordmark inside the PDF itself — the image data was swapped, not covered, so the
> foreign logo no longer exists in the file — and the metadata was rewritten. All four PDFs were
> then swept: no matching text on any of the 552 pages, no links, and every small header/footer
> image was extracted and inspected by eye (the only brands left are component makers quoted by the
> manufacturer itself — Dr. Hahn, MACO, Masterline — which are hardware suppliers, not competitors).
> **Any new catalogue must be checked the same way before it is published.** Ask the supplier for a
> neutral or Kamika-branded master so it does not have to be done by hand, and confirm Kamika may
> distribute these catalogues under its own name.

## 3. Product data — the big one

`src/data/products/` holds **16 products, all still plausible examples** — they are
**not** Kamika's real range. Every one of those files carries a warning comment at the top. Four
ranges are already fully real (windows, entrance doors, patio doors, roller shutters, gates — plus
accessories and insect screens fed from the catalogues), which leaves the examples in:
roller-shutter legacy cards (4, superseded by the collections). The four invented gate products
went when the two Tore catalogues arrived (2026-08): the range now runs on collections —
Garagentore (10 extracted models: INFINITI X/F/R/ZERO/F350/THERMO, PRESTO, UNICO, Rolltore,
Rollgitter) and Grundstückszäune (20 named fence/gate models in six families), generated by
`scripts/extract_gates_models.py`.

Ranges that no longer use example products, because the owner asked for the hierarchy the trade
actually uses — first the manufacturer, then what it offers:

| Range | Structure | Where the data comes from |
| ----- | --------- | ------------------------- |
| Windows | 4 makers → their systems | `src/data/manufacturers.ts`. Aluplast (Ideal 5000/8000) and Salamander (BluEvolution 82 from its sheet; greenEvolution Flex and bluEvolution 92 from the Salamander leaflet) carry real specs. VEKA (82) and REHAU (Synego) are named — the names came from the owner — and wait for their sheets. |
| Patio doors | Salamander → evolutionDrive SF / Plus+ / 82 HST | the Salamander leaflet, self-hosted; datasheet buttons open it at each system's page |
| Entrance doors | Collection (ROKA ×2, Despiro, Aluprof, D-ART LINE, Außentüren) → its models | the six PDFs, extracted |
| Roller shutters | Collection (Rollläden, Fassadenjalousien, Drutex) → its models | the three PDFs, extracted |
| Insect screens | One real catalogue model (Insektenschutz-Plisee), recategorised from the Drutex shutter catalogue | `extract_drutex_models.py` |
| Accessories | 56 catalogue models across five catalogues, grouped by printed family | `extract_accessories.py` |

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

## 3b. Projects are real now; the colour chart comes off the catalogues

`src/data/projects.ts` holds **16 real jobs**, all of them Kamika's, all with the owner's own
photos. The six invented projects that used to live here were deleted the same day, images and
all. Towns: Balingen (7), Altensteig (3), Dotternhausen (2), Hechingen, Albstadt, Neuffen and
Wehingen. Years 2025 and 2026, which is what the year filter now offers.

**The rule when adding one.** The text says what the photo shows and what the owner confirmed —
town, month, what was fitted — and nothing else. No glazing build-ups, no U-values, no
manufacturer names unless he states them or they are printed on something. A project page is the
proof that the work happened; one invented sentence in it discredits the other fifteen.

**The photo batch (2026-08).** The owner uploaded 21 photos of finished work to
`public/images/projects/subidas/`, renamed `01.jpeg` … `21.jpeg` with a numbered contact sheet at
`00-INDICE.jpg` so they could be referred to by number in chat. He then went through them by
number and 19 of the 21 became the project list above; the copies the site uses live at
`{project-id}-N.jpg` and the numbered originals stay in `subidas/` as the working index.

**Still without data: 06 and 07.** A dark timber balcony door seen from inside (06) and an older
entrance with a light timber frame and a brass letter plate (07). They stay in `subidas/` until the
owner says where they belong. Two possible merges are worth asking him about before anyone guesses:
09 and 13 share what looks like the same orange awning, and 19 and 20 share the same blue-and-white
balcony — each pair may be one house photographed twice.

~~Photo 08 carried a "Contenido generado por IA" watermark~~ — **resolved the same day**: it was
flagged to the owner, who uploaded the original camera file of the same door, and that is what
`08.jpeg` now holds. Worth keeping the habit: before a photo goes on the references page, look at
its corners. That page's whole claim is that the work is real, and one watermarked image would put
the other twenty in doubt.

**The Terrassentüren cover** (`public/images/categories/patio-doors-hero.jpg`) is brand imagery the
owner supplied, not one of his jobs — a styled interior with a multi-panel slider onto a terrace.
That is fine for a category cover, which says "this is what a patio door is", and it is why the
range is now listed in `OWNER_PHOTOS` so the line-drawing script can never overwrite it. The same
image would NOT be acceptable on the references page.

`src/data/colors.ts` holds **168 finishes**, in eight groups. The newest are the 42 **PVC decor
foils** off the IGLO terrace leaflet: name and code exactly as printed, hex sampled as the median
of fifteen pixels of the printed swatch — orientative, which the leaflet says itself. ⚠️ That
leaflet prints the SAME code (470-9036) for Turner oak walnut, Diamantblau and Stahlblau; it is
transcribed as printed, but confirm with the supplier before anyone orders by code. Two different origins, and the difference
matters when maintaining it:

- **RAL, wood decor, anodised, and the two DB greys** — the trade's standard chart. The codes are
  real and the hex values are the usual on-screen approximations. Every RAL added in the last pass
  is one that a published catalogue names.
- **Wood stains, the numbered shutter-slat palette and the 49 SAL foils** — **measured from the
  catalogues**. The hex
  is the median of the printed swatch, sampled out of the PDF, because those charts are not RAL and
  there is no reference value to look up. Re-measure if a supplier sends a new catalogue.

Still for the owner to confirm: **which finishes Kamika actually offers**, which are stock and which
are made to order, and which are unavailable on a given material. And specifically: `RAL 1035`,
`RAL 7048`, `DB 702` and `DB 703` are metallic-effect coatings that a flat hex cannot represent —
check them against a physical card before promising a colour on the phone.

Two colour charts were found and **not** used: the Renolit foil fan on page 64 of the Außentüren
catalogue and the metallic/special-effect examples on page 40 are printed without names or codes,
so there is nothing to record beyond "ask".

### The catalogue swatch chart (2026-08) — cropped from the PDFs, not painted

The owner's brief: every colour in every published catalogue, shown as **an image the size of the
existing chips** — a ceramic, a structured glass or a liquid-metal finish cannot be represented by
a flat hex square. So:

- `scripts/extract_catalogue_colours.py` finds the swatch tiles on the declared chart pages of
  each catalogue, reads the caption printed under each one, and crops the tile itself out of the
  PDF at 170 dpi → **244 JPGs** in `public/images/colours/swatches/{catalogue}/` plus the
  generated `src/data/catalogue-colors.ts`. **Never hand-edit that file** — re-run the script.
- Counts per catalogue: ROKA Signature 141 (wood decors, ceramics, glass, liquid metals, powder
  textures), ROKA Select 12, Außentüren wood stains 7, Garagentore 12, the numbered shutter-slat
  palette 15, Salamander foils 18, IGLO terrace foils 39.
- `ALL_COLORS` (in `src/data/index.ts`) merges the two charts: a flat-hex standard entry whose
  group + code matches an extracted swatch is **superseded by the image** — 62 were — so the same
  finish never appears twice. `/colours` renders one section per catalogue (title from
  `catalogues.ts` brand + collection), the standard chart last, and a third filter row by
  catalogue. The live-preview box above still tints with the flat `COLORS` only.
- Catalogues with **no extractable chart**, and why nothing was invented: D-ART LINE and Despiro
  print no named chart (Despiro's colour pages show handles), the door-panel catalogue's embossing
  pages are unnamed, the fence catalogue lists colours only as body text, the IGLO window
  catalogue's colour wheel is unnamed, the Eko-Okna shutter catalogue has no palette, and the
  facade-blind chart photographs whole lamella PROFILES rather than colours (its RALs stay as flat
  hex in `colors.ts`). The rule stands: a swatch with no printed name gets no entry.

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

`src/data/catalogue-models.ts` holds **513 entries** — 457 models across the ten catalogues plus 56
accessories — each with its name, its page, its photograph and whatever specification the catalogue
prints. It is generated, in this order:

```bash
python3 scripts/prepare_drutex.py            # source-catalogues/ → public/, y su portada
python3 scripts/prepare_salamander.py        # ídem + imágenes de sistema
python3 scripts/extract_catalogue_models.py  # needs: pip install pymupdf
python3 scripts/extract_shutter_models.py
python3 scripts/extract_drutex_models.py
python3 scripts/extract_accessories.py       # el último: respeta lo que ya hay
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

### Accessories are catalogue models too, but they live in their own range

The door and shutter catalogues carry their accessories at the back — pull handles, lever handles,
access control, hinges, door closers, shutter switches and remotes; the Salamander leaflet adds its
"Dodatki" page (window handles, sills, vents, spacers, glazing bars…) and the Außentüren thresholds
joined on the second pass. Fifty-six of them are extracted
by `scripts/extract_accessories.py` and carry `category: "accessories"`, which takes them **out** of
their catalogue's showcase (a handle lost among eighty-seven doors helps nobody) and puts them in
the Accessories range, grouped by the family the catalogue prints. The PDF button still opens the
page they came from.

**The four example accessories were deleted with them** — a lockable handle, an aluminium sill, a
security cylinder and a rebate vent — along with the project cross-references that named them. The
range now has real content, and four invented spec sheets sitting among forty-four real ones is
exactly what this project does not do.

Still missing from the range because no catalogue covers them: **cylinders**. Window handles,
sills and vents arrived with the Salamander "Dodatki" page (Klamki, Parapety, Nawiewniki — names
as printed, Polish included; they get German names when a German-language accessory catalogue
lands). The thresholds were added on the 2026-08 second pass.

Two accessory chapters remain out, deliberately: the glazing and sandblasted-glass ranges
(Außentüren p. 78-83 — a glass chart rather than parts) and the pull-handle spreads on p. 84-87,
which the manufacturer prints **without names**; a nameless product card would be an invented name.

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
- ~~Confirmation that `Dominik Kamieński – Einzelunternehmen` is the exact legal name to publish.~~
  **Confirmed (2026-08): the official papers carry the Polish ń**, so `Kamieński` is the correct
  spelling everywhere — imprint, footer, JSON-LD, About. Nothing to ask the lawyer here.
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

## 8. Languages — DONE (2026-08): German, English and Polish

The site now publishes in three languages by URL prefix: **/de (default — the root redirects
there), /en and /pl**, with a DE·EN·PL switcher in the header and mobile menu that keeps the
current page. Google gets `hreflang` alternates on every page and in the sitemap (×3, with
x-default → German). The legacy unprefixed URLs (shared before the change) 308-redirect to their
German equivalents.

How it works, for whoever maintains it (full comments in `src/lib/i18n.ts`):

- Server components read the language from a per-render store; every page sets it from its URL
  params. **Client components use the `useI18n()` hook** (context) — never the global `t()`,
  because their prerender runs in a separate module graph where the store does not exist; that
  exact mismatch produced hydration errors and a switcher that highlighted the wrong language
  before it was fixed. If you write a new client component, use the hook.
- UI text: `en.ts` (authoring), `de.ts`, `pl.ts` — all 224 keys translated, parity enforced by
  `npm run check:i18n`. `npm run sync:i18n` regenerates both and preserves filled values.
- Data layer: every `Localized` field carries en+de+pl (categories, catalogues, manufacturers,
  systems, the 12 example products, projects, 75 named colours). Spec values with prose are now
  localisable (`value: string | Localized<string>`).
- **Never translated, on purpose**: model names, printed catalogue specs (German/Polish as
  printed), brand names, and the owner's texts (his German is verbatim in `de.ts`; the Polish
  `about.owner*` strings are a translation of his German — he is a native speaker, ask him to
  bless them).
- **/imprint and /privacy stay in German in all three languages** — they are German legal texts;
  translating them would create unreviewed legal copy.
- Polish grammar note: counters use the genitive plural ("{count} modeli / stron"), which reads
  slightly off for counts of 2–4. Accepted trade-off with a single plural form — the owner can
  veto any wording, it is one line per key.
