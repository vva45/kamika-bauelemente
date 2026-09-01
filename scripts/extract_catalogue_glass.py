#!/usr/bin/env python3
"""Extrae las cartas de CRISTAL de los catálogos, para el capítulo de
vidrios de la página de colores.

Lo pidió el dueño (2026-08) al ver la página SZKŁO del catálogo WIKĘD:
un capítulo aparte en /colours con los tipos y versiones de cristal de
TODOS los catálogos que los traigan, separados por catálogo, con la
muestra real recortada — la transparencia de un ornamentado o de un
satinado no se puede contar con un hex.

Se revisaron los 15 catálogos publicados. Tienen carta de cristal:
  · WIKĘD (SZKŁO, 9 tipos con planta detrás para ver la transparencia)
  · ROKA Signature (3 páginas de Verglasungen, 12 tipos con escultura)
  · ROKA Select (las 3 muestras VERGLASUNG del resumen de colección)
  · Außentüren y el IGLO de ventanas (la misma carta SCHEIBENARTEN de
    19 tipos, cada uno en su catálogo)
El resto solo menciona el vidrio en texto de specs (Despiro, paneles,
garajes…): sin muestra impresa no hay entrada.

Mecánica: cada ítem declara el pie IMPRESO (find); se localiza su línea
de texto y la tesela de imagen encima o debajo. Los nombres se guardan
tal cual impresos; solo los pies descriptivos polacos del WIKĘD llevan
traducción (mecánica, documentada) porque son palabras comunes, no
nombres propios.

Salida:
  public/images/colours/glass/{catálogo}/{id}.jpg
  src/data/catalogue-glass.ts  (generado ENTERO por este script)

Ejecutar:  python3 scripts/extract_catalogue_glass.py
Requiere:  pip install pymupdf
"""

import json
import os
import re

import fitz

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")
GLASS_DIR = os.path.join(ROOT, "public/images/colours/glass")
OUT_TS = os.path.join(ROOT, "src/data/catalogue-glass.ts")


def item(find, name=None, en=None, de=None, pl=None, crop=None):
    """Un cristal: `find` es el pie impreso; sin traducciones, el nombre
    queda tal cual en los tres idiomas. `crop` recorta la tesela:
    "right-pane" se queda con la LUNA de la derecha (las muestras del
    Aluminium-Katalog posan sobre una casita con el logo del vendedor
    grabado — el logo vive en la pared izquierda y NO puede publicarse),
    "trim-caption" quita el pie numérico que pisa la sombra inferior."""
    base = name or find
    return dict(find=find, en=en or base, de=de or base, pl=pl or base, crop=crop)


# la carta SCHEIBENARTEN que comparten los dos catálogos del mismo
# proveedor: 19 tipos, pie debajo de cada tesela.
# "Float 4, 6, 8, 10 m" es literal del catálogo: la unidad solo puede
# ser mm (son gruesos de luna), errata evidente que se corrige como la
# del Salamander (7,73 → 0,73).
SCHEIBENARTEN = [
    item("Matter folie", name="Matte Folie"),
    item("Gestreiftes sandgestrahltes Glas", name="Gestreiftes sandgestrahltes Glas"),
    item("Reflektofloat braun 6 mm"),
    item("Reflektofloat blau 6 mm"),
    item("Ornament Chinchilla"),
    item("Ornament Delta"),
    item("Ornament Silvit"),
    item("Ornament Cathedral"),
    item("Ornament Master Carre"),
    item("Ornament Streifen"),
    item("Antisol Grün"),
    item("Antisol Braun"),
    item("Antisol Grau"),
    item("Antisol Blau"),
    item("Float 4, 6, 8, 10 m", name="Float 4, 6, 8, 10 mm"),
    item("33.1 SICHERHEITSGLAS", name="33.1 Sicherheitsglas"),
    item("Black Line"),
    item("Mirastar"),
    item("Satinmatt"),
]

CHARTS = [
    dict(cat="wiked-pvc-alu", pdf="wiked-pvc-alu.pdf", sheet=18,
         caption="above",
         items=[
             item("PRZEZROCZYSTA (STANDARD)",
                  en="Clear (standard)", de="Klar (Standard)", pl="Przezroczysta (standard)"),
             item("FLUTES PIONOWY MATOWY",
                  en="Flutes, vertical matt", de="Flutes, vertikal matt", pl="Flutes pionowy matowy"),
             item("KATHEDRAL", name="Kathedral"),
             item("ALTDEUTSH", name="Altdeutsh"),
             item("MAT", en="Matt", de="Matt", pl="Mat"),
             item("ABSTRACTO", name="Abstracto"),
             item("DELTA", name="Delta"),
             item("DELTA MAT", name="Delta Mat"),
             item("ATLANTIC", name="Atlantic"),
         ]),
    dict(cat="roka-signature-2025", pdf="roka-signature-2025.pdf", sheet=284,
         caption="above",
         items=[item("ANTISOL GRAU", name="Antisol Grau"),
                item("PARSOL DUNKEL GRAU VENUS", name="Parsol Dunkel Grau Venus"),
                item("ANTISOL BRAUN", name="Antisol Braun"),
                item("STOPSOL GRAU", name="Stopsol Grau")]),
    dict(cat="roka-signature-2025", pdf="roka-signature-2025.pdf", sheet=285,
         caption="above",
         items=[item("SPIEGELGLAS", name="Spiegelglas"),
                item("STOPSOL BRAUN", name="Stopsol Braun"),
                item("SPIEGELGLAS GRAU", name="Spiegelglas Grau"),
                item("SPIEGELGLAS BRAUN", name="Spiegelglas Braun")]),
    dict(cat="roka-signature-2025", pdf="roka-signature-2025.pdf", sheet=286,
         caption="above",
         items=[item("KLARGLAS", name="Klarglas"),
                item("FLUTED GLAS", name="Fluted Glas"),
                item("VISIOSUN GLAS", name="Visiosun Glas"),
                item("SATINATO", name="Satinato")]),
    dict(cat="roka-select-2025", pdf="roka-select-2025.pdf", sheet=6,
         caption="below",
         items=[item("Klarglas"), item("Sandstrahlglas"), item("Satinato")]),
    dict(cat="aussenturen", pdf="aussenturen-produktkatalog.pdf", sheet=39,
         caption="below", items=SCHEIBENARTEN),
    dict(cat="iglo-fenster", pdf="iglo-fenster-terrassensysteme.pdf", sheet=39,
         caption="below", items=SCHEIBENARTEN),
    # Aluminium-Katalog p51 (2026-09): mitad izquierda, 23 Motiv- y
    # Ornamentgläser sobre la casita (pie debajo de cada tesela); mitad
    # derecha, los 15 paneles EkoVitre numerados 01-15 (VSG con motivos
    # al chorro de arena). Nombres tal cual impresos.
    dict(cat="aluminium-2026", pdf="aluminium-2026.pdf", sheet=50,
         caption="below",
         items=[
             item(find, crop="right-pane")
             for find in [
                 "Float klar", "Mirastar", "Parsol bronze", "Altdeutsch weiß",
                 "Chinchila weiß", "Parsol Grau", "Stopsol Supersilver Clear",
                 "Stopsol Classic Clear", "Crepi weiß", "Delta weiß",
                 "Stopsol classic Grau", "Kathedral weiß", "Planibel Dark Grey",
                 "Satinato Mate", "Master-Point", "Kura weiß",
                 "Teilsandgestrahlt", "Master-Ligne", "Master-Carre",
                 "Waterdrop", "Stadip 33.1 PVB Matt", "Silvit weiß",
                 "Monumental M",
             ]
         ] + [item(f"{n:02d}", name=f"EkoVitre {n:02d}", crop="trim-caption")
              for n in range(1, 16)]),
]


def slugify(text):
    text = text.lower()
    for a, b in [("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("ß", "ss"),
                 ("ł", "l"), ("ą", "a"), ("ę", "e"), ("ó", "o"),
                 ("ś", "s"), ("ż", "z"), ("ź", "z"), ("ć", "c"), ("ń", "n")]:
        text = text.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def lines_of(page):
    result = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = " ".join(s["text"] for s in line["spans"]).strip()
            if text:
                result.append((fitz.Rect(line["bbox"]), text))
    return result


def image_rects(page):
    rects = []
    for im in page.get_images(full=True):
        for rect in page.get_image_rects(im[0]):
            if rect.width > 40 and rect.height > 30:
                rects.append(rect)
    return rects


def tile_for(caption_rect, tiles, side):
    """La tesela cuyo eje x solapa el pie, la más cercana en vertical."""
    best = None
    for tile in tiles:
        overlap = min(tile.x1, caption_rect.x1) - max(tile.x0, caption_rect.x0)
        # los pies numéricos del EkoVitre ("01"…"15") miden menos de
        # 10 pt de ancho — para ellos basta con que casi todo el pie
        # caiga bajo la tesela.
        if overlap < min(10, caption_rect.width * 0.8):
            continue
        if side == "above":  # pie encima → tesela debajo
            gap = tile.y0 - caption_rect.y1
        else:  # pie debajo → tesela encima
            gap = caption_rect.y0 - tile.y1
        # -12: los paneles EkoVitre llevan sombra que el pie numérico
        # solapa unos 7 pt; con -4 el pie saltaba a la fila de ARRIBA.
        if gap < -12:
            continue
        if best is None or gap < best[0]:
            best = (gap, tile)
    return best[1] if best else None


def main():
    everything = []
    for chart in CHARTS:
        doc = fitz.open(os.path.join(PDF_DIR, chart["pdf"]))
        page = doc[chart["sheet"]]
        lines = lines_of(page)
        tiles = image_rects(page)
        out_dir = os.path.join(GLASS_DIR, chart["cat"])
        os.makedirs(out_dir, exist_ok=True)
        for entry in chart["items"]:
            needle = entry["find"].lower()
            match = next(
                ((r, t) for r, t in lines
                 if t.lower() == needle or t.lower().startswith(needle)),
                None,
            )
            if not match:
                print(f"⚠ {chart['cat']} hoja {chart['sheet']}: sin línea {entry['find']!r}")
                continue
            tile = tile_for(match[0], tiles, chart["caption"])
            if tile is None:
                print(f"⚠ {chart['cat']}: sin tesela para {entry['find']!r}")
                continue
            slug = slugify(entry["en"])
            rel = f"/images/colours/glass/{chart['cat']}/{slug}.jpg"
            # dpi según tamaño: las fichas grandes del Signature no
            # necesitan 300, las teselas pequeñas sí agradecen detalle
            dpi = 150 if tile.width > 200 else 300
            clip = tile + (1, 1, -1, -1)
            if entry.get("crop") == "right-pane":
                clip = fitz.Rect(tile.x0 + tile.width * 0.66, tile.y0 + 2, tile.x1 - 2, tile.y1 - 2)
            elif entry.get("crop") == "trim-caption":
                clip = fitz.Rect(tile.x0 + 1, tile.y0 + 1, tile.x1 - 1, tile.y1 - 9)
            pix = page.get_pixmap(dpi=dpi, clip=clip)
            pix.pil_save(os.path.join(ROOT, "public" + rel), format="JPEG",
                         quality=87, optimize=True)
            everything.append(dict(
                id=f"{chart['cat']}-{slug}",
                en=entry["en"], de=entry["de"], pl=entry["pl"],
                catalogue=chart["cat"], image=rel,
            ))
        doc.close()
        done = [e for e in everything if e["catalogue"] == chart["cat"]]
        print(f"── {chart['cat']} hoja {chart['sheet']}: {len(done)} cristales acumulados")

    body = ""
    for r in everything:
        body += (
            f'  {{ id: {json.dumps(r["id"])}, '
            f'name: {{ en: {json.dumps(r["en"], ensure_ascii=False)}, '
            f'de: {json.dumps(r["de"], ensure_ascii=False)}, '
            f'pl: {json.dumps(r["pl"], ensure_ascii=False)} }}, '
            f'catalogue: {json.dumps(r["catalogue"])}, '
            f'image: {json.dumps(r["image"])} }},\n'
        )
    header = '''/**
 * GENERADO por scripts/extract_catalogue_glass.py — no editar a mano.
 *
 * Cada entrada es un TIPO DE CRISTAL impreso en un catálogo, con su
 * muestra recortada de la propia carta: transparencias, ornamentados,
 * satinados. El capítulo de vidrios de /colours pinta una sección por
 * catálogo con estas muestras.
 */
import type { GlassFinish } from "./types";

export const CATALOGUE_GLASS: GlassFinish[] = [
'''
    open(OUT_TS, "w").write(header + body + "];\n")
    print(f"✓ {len(everything)} cristales → catalogue-glass.ts")


if __name__ == "__main__":
    main()
