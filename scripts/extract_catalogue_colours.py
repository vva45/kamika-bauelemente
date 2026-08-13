"""
Extrae TODAS las cartas de color de los catálogos como muestras de
imagen, para la página de colores.

Lo pidió el dueño (2026-08) con el ROKA Signature en la mano: muchas
"Farben" de los catálogos no son colores planos sino texturas —
cerámica, vidrio templado, metal líquido, decors de madera— y un
cuadrado hex inventado no las representa. De aquí sale, por cada
muestra impresa: su recorte de imagen, su nombre y código tal cual, su
tipo de acabado (el epígrafe bajo el que está impresa) y el catálogo
del que viene.

Mecánica: en cada página configurada se buscan las teselas (imágenes
pequeñas en rejilla), el pie de cada una (la línea de texto justo
debajo) y el epígrafe vigente (el último título en mayúsculas por
encima). `--debug` enseña lo encontrado sin escribir nada.

Salida:
  public/images/colours/swatches/{catálogo}/{id}.jpg
  src/data/catalogue-colors.ts  (generado ENTERO por este script)

Ejecutar:  python3 scripts/extract_catalogue_colours.py [--debug]
Requiere:  pip install pymupdf pillow
"""

import io
import json
import os
import re
import statistics
import sys

import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")
SWATCH_DIR = os.path.join(ROOT, "public/images/colours/swatches")
OUT_TS = os.path.join(ROOT, "src/data/catalogue-colors.ts")

# ── Qué páginas llevan carta de color, y cómo leerlas ────────────────
#
# group: al epígrafe impreso se le asigna el grupo del filtro "Finish".
# materials: de qué está hecho lo que se pinta con esa carta.
PAGES = [
    # ROKA Signature: pulverbeschichtung, vidrio ESG, metal líquido,
    # cerámica, holzdekor y las superficies de las manillas.
    dict(cat="roka-signature-2025", pdf="roka-signature-2025.pdf",
         sheets=[290, 291, 292, 293, 294, 295, 296, 297],
         materials=["aluminium"],
         groups={
             "PULVERBESCHICHTUNG": "powder",
             "BUNTGLAS": "glass",
             "FLÜSSIGMETALL": "liquid-metal",
             "KERAMIK": "ceramic",
             "HOLZDEKOR": "wood-decor",
             "INNENTÜRDRÜCKER": "special",
             "DRÜCKER": "special",
             "VINTAGE": "special",
         },
         # las hojas de continuación no repiten el epígrafe impreso
         sheet_groups={291: "powder", 295: "ceramic"},
         default_group="powder"),
    dict(cat="roka-select-2025", pdf="roka-select-2025.pdf",
         sheets=[7],
         materials=["aluminium"],
         groups={
             "PULVERBESCHICHTUNG": "powder",
             "KERAMIK": "ceramic",
             "ALTHOLZ": "wood-decor",
             "VERGLASUNG": "glass",
         },
         # solo el bloque OBERFLÄCHEN, no las miniaturas de puertas
         region=(688, 460, 1230, 840),
         # las muestras VERGLASUNG viven ahora en el capítulo de
         # cristales (extract_catalogue_glass.py), no en la carta
         exclude=["Klarglas", "Sandstrahlglas", "Satinato"],
         default_group="powder"),
    # Außentüren: las maderas con nombre. La hoja 21 (metalizados) va
    # sin nombres individuales — son "Beispiele" — y no se inventan.
    dict(cat="aussenturen", pdf="aussenturen-produktkatalog.pdf",
         sheets=[38],
         materials=["wood"],
         groups={},
         default_group="wood-stain"),
    # Garagentore: la paleta de paneles (barras horizontales con nombre).
    dict(cat="garagentore", pdf="garagentore-produktkatalog.pdf",
         sheets=[31],
         materials=["steel"],
         groups={},
         default_group="special",
         tile_bounds=(140, 430, 12, 45),
         caption_side="inside"),
    # Las cartas de fassadenjalousien NO se extraen: sus teselas son
    # fotos del perfil de la lamela con soporte, no muestras planas, y
    # como muestra de color despistan. Sus RAL siguen como colores
    # planos en colors.ts.
    dict(cat="rollladen-drutex", pdf="rollladen-raffstoren-insektenschutz.pdf",
         sheets=[13],
         materials=["aluminium"],
         groups={},
         default_group="lamella",
         mode="numbered"),
    # Folias: Salamander (SAL) y las Dekorfolien del folleto IGLO.
    dict(cat="salamander-systeme", pdf="salamander-systeme.pdf",
         sheets=[20],
         materials=["pvc"],
         groups={},
         default_group="sal-foil"),
    dict(cat="iglo-terrassen", pdf="iglo-terrassensysteme.pdf",
         sheets=[5],
         materials=["pvc"],
         groups={},
         # solo la carta DEKORFOLIEN; los puntos de la warme Kante no
         # son folias
         region=(25, 110, 610, 841),
         # "02.12.17.000001" es un número de artículo que se coló como
         # nombre en la primera pasada — un color no se llama así
         exclude=["02.12.17.000001"],
         default_group="pvc-foil"),
    # WIKĘD PCV/ALU: cartas PCV (hojas 12-13) y ALU (hoja 26), con el
    # pie a la DERECHA de cada tesela. Los RAL del aluminio van como
    # "powder" (son lacado en polvo sobre alu), no como "ral": así no
    # pisan a los RAL de la carta estándar, que cubren más materiales.
    dict(cat="wiked-pvc-alu", pdf="wiked-pvc-alu.pdf",
         sheets=[12, 13, 26],
         materials=["pvc"],
         sheet_materials={26: ["aluminium"]},
         groups={},
         default_group="pvc-foil",
         sheet_groups={26: "powder"},
         caption_side="right",
         vector_tiles=True,
         titlecase=True,
         # "DOWOLNY RAL" es "cualquier RAL", no un color
         exclude=["DOWOLNY RAL", "Dowolny RAL"]),
]

TILE_BOUNDS = (28, 180, 16, 150)  # ancho mín/máx, alto mín/máx


def lines_of(page):
    """Líneas de texto con su caja, listas para pie o epígrafe."""
    result = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = " ".join(s["text"] for s in line["spans"]).strip()
            if text:
                result.append((fitz.Rect(line["bbox"]), text))
    return result


def find_tiles(page, bounds, vector=False):
    w0, w1, h0, h1 = bounds
    tiles = []
    for im in page.get_images(full=True):
        for rect in page.get_image_rects(im[0]):
            if w0 <= rect.width <= w1 and h0 <= rect.height <= h1:
                tiles.append(rect)
    if vector:
        # cartas que mezclan fotos con rectángulos vectoriales: el RAL
        # 7016 del WIKĘD es un relleno plano y el RAL 9016 un rect
        # blanco solo-borde — ninguno es imagen
        for drawing in page.get_drawings():
            rect = drawing["rect"]
            if w0 <= rect.width <= w1 and h0 <= rect.height <= h1:
                tiles.append(rect)
    # sin duplicados casi idénticos
    unique = []
    for rect in tiles:
        if not any(abs(rect.x0 - u.x0) < 2 and abs(rect.y0 - u.y0) < 2 for u in unique):
            unique.append(rect)
    return sorted(unique, key=lambda r: (round(r.y0 / 8), r.x0))


def caption_for(tile, lines, side="below"):
    if side == "right":
        # pie a la derecha de la tesela (cartas WIKĘD); puede ocupar
        # dos líneas ("DĄB KLEJONY MIODOWY / SUPER MATOWY")
        near = [
            (r, t) for r, t in lines
            if tile.x1 - 2 <= r.x0 <= tile.x1 + 80
            and r.y0 < tile.y1 + 4 and r.y1 > tile.y0 - 4
        ]
        near.sort(key=lambda item: item[0].y0)
        return " ".join(t for _, t in near[:2]) if near else None
    if side == "left":
        near = [
            (r, t) for r, t in lines
            if r.x1 <= tile.x0 + 4 and r.x1 > tile.x0 - 260
            and r.y0 < tile.y1 + 2 and r.y1 > tile.y0 - 2
        ]
        near.sort(key=lambda item: -item[0].x1)
        return near[0][1] if near else None
    if side == "inside":
        near = [
            (r, t) for r, t in lines
            if r.intersects(tile) and len(t.strip()) > 1
        ]
        near.sort(key=lambda item: (item[0].y0, item[0].x0))
        return " ".join(t for _, t in near[:1]) if near else None
    def heading_like(text):
        letters = [c for c in text if c.isalpha()]
        return letters and len(text) > 10 and sum(c.isupper() for c in letters) / len(letters) > 0.9
    near = [
        (r, t) for r, t in lines
        if tile.y1 - 2 <= r.y0 <= tile.y1 + 26
        and min(r.x1, tile.x1) - max(r.x0, tile.x0) > min(tile.width * 0.25, 24)
        and not heading_like(t)
    ]
    near.sort(key=lambda item: item[0].y0)
    if not near:
        return None
    parts = [near[0]]
    if len(near) > 1 and near[1][0].y0 - near[0][0].y1 < 4 and not heading_like(near[1][1]):
        parts.append(near[1])
    return " ".join(t for _, t in parts)


def heading_for(tile, lines, groups, default):
    best = None
    for rect, text in lines:
        clean = text.strip()
        letters = [c for c in clean if c.isalpha()]
        if len(clean) < 6 or not letters:
            continue
        if sum(c.isupper() for c in letters) / len(letters) < 0.85:
            continue
        if rect.y1 <= tile.y0 + 4 and (best is None or rect.y1 > best[0].y1):
            best = (rect, clean)
    if best:
        for needle, group in groups.items():
            if needle in best[1].upper():
                return group, best[1]
    return default, best[1] if best else ""


def slugify(text):
    text = text.lower()
    for a, b in [("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("ß", "ss"),
                 # las cartas WIKĘD vienen en polaco: "Biały" → "bialy",
                 # no "bia-y"
                 ("ł", "l"), ("ą", "a"), ("ę", "e"), ("ó", "o"),
                 ("ś", "s"), ("ż", "z"), ("ź", "z"), ("ć", "c"), ("ń", "n")]:
        text = text.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


KEEP_UPPER = {"RAL", "SAL", "DB", "PX", "FS", "PR", "VEKA", "HS", "PSK"}


def polish_title(caption):
    """"SOSNA GÓRSKA" → "Sosna Górska": las cartas WIKĘD imprimen en
    mayúsculas y en la web quedarían gritando junto a los "Golden Oak"
    del resto. Los códigos y siglas (RAL 9016, SIENA PR) no se tocan."""
    words = []
    for word in caption.split():
        if word.upper() in KEEP_UPPER or any(c.isdigit() for c in word):
            words.append(word.upper())
        else:
            words.append("-".join(part.capitalize() for part in word.split("-")))
    return " ".join(words)


def split_name_code(caption):
    caption = " ".join(caption.split())
    if "/" in caption:
        left, right = caption.rsplit("/", 1)
        return left.strip(), right.strip()
    # cola de tokens con dígitos = código ("Betongrau 702305-167",
    # "Crown Platinum 9.1293001-195"). "RAL 7016 Deep Matte" NO se
    # parte: la cola acaba en palabra sin dígitos.
    tokens = caption.split()
    tail = []
    while tokens and any(c.isdigit() for c in tokens[-1]):
        tail.insert(0, tokens.pop())
    if tail and tokens and not (len(tokens) == 1 and tokens[0].upper() in ("RAL", "SAL", "DB", "PX", "F")):
        return " ".join(tokens), " ".join(tail)
    return caption, ""


def median_hex(image):
    small = image.resize((12, 12))
    pixels = list(small.getdata())
    channels = list(zip(*pixels))
    return "#%02X%02X%02X" % tuple(int(statistics.median(c)) for c in channels[:3])


def numbered_entries(page, sheet, config, debug):
    """Cartas de "barra + número" con leyenda aparte (Farbpalette der
    Rollläden): la barra lleva solo un número y la leyenda de abajo dice
    qué nombre corresponde a cada número."""
    lines = lines_of(page)
    legend = {}
    for _, text in lines:
        for match in re.finditer(r"(\d{2})\s+([A-ZÄÖÜ][\wäöüß]*(?:\s+(?:RAL\s*\d{4}|[A-ZÄÖÜa-zäöüß][\wäöüß]*))*)", text):
            number, name = match.group(1), match.group(2).strip()
            if number not in legend and not name[0].isdigit():
                legend[number] = name
    tiles = find_tiles(page, (60, 140, 18, 42))
    found = []
    for tile in tiles:
        near = [
            t.strip() for r, t in lines
            if re.fullmatch(r"\d{2}", t.strip())
            and r.y0 < tile.y1 and r.y1 > tile.y0
            and tile.x0 - 8 < r.x0 < tile.x1 + 30
        ]
        if not near or near[0] not in legend:
            continue
        number = near[0]
        found.append(dict(sheet=sheet, tile=tile, name=legend[number], code="",
                          group=config["default_group"], heading=f"Nr. {number}"))
    if debug:
        print(f"  hoja {sheet} (numerada): {len(tiles)} barras, {len(found)} con leyenda")
        for e in found:
            print(f"     [{e['group']:11s}] {e['name']!r}  ({e['heading']})")
    return found


def extract(config, debug=False):
    doc = fitz.open(os.path.join(PDF_DIR, config["pdf"]))
    out_dir = os.path.join(SWATCH_DIR, config["cat"])
    entries = []
    for sheet in config["sheets"]:
        page = doc[sheet - 1]
        if config.get("mode") == "numbered":
            entries.extend(numbered_entries(page, sheet, config, debug))
            continue
        lines = lines_of(page)
        tiles = find_tiles(page, config.get("tile_bounds", TILE_BOUNDS),
                           vector=config.get("vector_tiles", False))
        region = config.get("region")
        if region:
            box = fitz.Rect(*region)
            tiles = [t for t in tiles if box.contains(fitz.Point((t.x0+t.x1)/2, (t.y0+t.y1)/2))]
        for tile in tiles:
            caption = caption_for(tile, lines, config.get("caption_side", "below"))
            if not caption or len(caption) < 2 or caption.isdigit():
                continue
            clean = caption.strip()
            letters = [c for c in clean if c.isalpha()]
            # miniaturas de puertas ("Select 9 Seite 18"), epígrafes
            # colados y morralla de tabla
            if re.match(r"^Select \d+", clean) or "Seite" in clean:
                continue
            # las cartas WIKĘD imprimen el pie EN MAYÚSCULAS a la
            # derecha: ahí el filtro anti-epígrafes no aplica — la
            # geometría del pie derecho ya es suficientemente estricta
            if config.get("caption_side") != "right" and letters and len(clean) > 12 and sum(c.isupper() for c in letters) / len(letters) > 0.9:
                continue
            if clean in ("Ja", "Panel", "LSL", "Farbe", "RAL", "DEKOR"):
                continue
            if clean in config.get("exclude", ()):
                continue
            sheet_default = config.get("sheet_groups", {}).get(sheet, config["default_group"])
            group, heading = heading_for(tile, lines, config["groups"], sheet_default)
            if config.get("titlecase"):
                clean = polish_title(clean)
            name, code = split_name_code(clean if config.get("titlecase") else caption)
            if not name or name in config.get("exclude", ()):
                continue
            materials = config.get("sheet_materials", {}).get(sheet, config["materials"])
            entries.append(dict(sheet=sheet, tile=tile, name=name, code=code,
                                group=group, heading=heading, materials=materials))
        if debug:
            found = [e for e in entries if e["sheet"] == sheet]
            print(f"  hoja {sheet}: {len(tiles)} teselas, {len(found)} con pie")
            for e in found[:40]:
                print(f"     [{e['group']:11s}] {e['name']!r} | {e['code']!r}  ({e['heading'][:36]})")
    if debug:
        doc.close()
        return []

    os.makedirs(out_dir, exist_ok=True)
    # la misma carta se repite por perfil (C-80/C-65/Z-90): un color,
    # una muestra. La clave incluye el material: el Winchester del PCV
    # y el Winchester del aluminio del WIKĘD son entradas distintas.
    seen_names = set()
    unique_entries = []
    for e in entries:
        key = (e["name"].lower(), tuple(e.get("materials") or config["materials"]))
        if key in seen_names:
            continue
        seen_names.add(key)
        unique_entries.append(e)
    entries = unique_entries
    results, used = [], set()
    for e in entries:
        base = slugify(e["name"]) or slugify(e["code"])
        slug = base
        n = 2
        while slug in used:
            slug = f"{base}-{n}"
            n += 1
        used.add(slug)
        pix = doc[e["sheet"] - 1].get_pixmap(dpi=170, clip=e["tile"] + (1, 1, -1, -1))
        image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        rel = f"/images/colours/swatches/{config['cat']}/{slug}.jpg"
        image.save(os.path.join(ROOT, "public" + rel), "JPEG", quality=87, optimize=True)
        results.append(dict(
            id=f"{config['cat']}-{slug}", name=e["name"], code=e["code"],
            hex=median_hex(image), group=e["group"], image=rel,
            catalogue=config["cat"],
            materials=e.get("materials") or config["materials"], page=e["sheet"],
        ))
    doc.close()
    return results


def main():
    debug = "--debug" in sys.argv
    everything = []
    for config in PAGES:
        print(f"── {config['cat']}")
        everything.extend(extract(config, debug=debug))
    if debug:
        return
    body = ""
    for r in everything:
        name = json.dumps(r["name"], ensure_ascii=False)
        mats = json.dumps(r["materials"])
        body += (
            f'  {{ id: {json.dumps(r["id"])}, name: {{ en: {name}, de: {name}, pl: {name} }}, '
            f'code: {json.dumps(r["code"])}, hex: {json.dumps(r["hex"])}, '
            f'group: {json.dumps(r["group"])}, image: {json.dumps(r["image"])}, '
            f'catalogue: {json.dumps(r["catalogue"])}, materials: {mats} }},\n'
        )
    header = '''/**
 * GENERADO por scripts/extract_catalogue_colours.py — no editar a mano.
 *
 * Cada entrada es una muestra IMPRESA en un catálogo: nombre y código
 * tal cual, la imagen recortada de la propia carta (por eso las
 * texturas —cerámica, vidrio, maderas— se ven de verdad y no como un
 * cuadrado de color inventado), y el catálogo del que viene. El hex es
 * la mediana de la muestra: orientativo, para el tinte y el fallback.
 */
import type { ColorFinish } from "./types";

export const CATALOGUE_COLORS: ColorFinish[] = [
'''
    open(OUT_TS, "w").write(header + body + "];\n")
    print(f"✓ {len(everything)} muestras → catalogue-colors.ts")


if __name__ == "__main__":
    main()
