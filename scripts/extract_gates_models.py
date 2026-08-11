"""
Extrae los modelos de los dos catálogos de la gama Tore y los escribe
en `src/data/catalogue-models.ts`, entre las marcas "Gama Tore".

Dos catálogos, dos mecánicas:

 - GARAGENTORE va declarado A MANO: son pliegos de sistema (INFINITI X,
   THERMO, PRESTO…), no una rejilla de modelos, y sus specs están
   transcritas de las páginas de datos impresas. Igual que AUSSEN_MANUAL
   en su día.

 - GRUNDSTÜCKSZÄUNE se parsea SOLO: sus 18 modelos comparten plantilla
   exacta (nombre, código EK, línea y cuatro specs con etiqueta), así
   que el formato manda y el parser se limita a leerlo.

Las imágenes salen del propio PDF publicado (la foto grande de cada
página de modelo) a /images/models/{catálogo}/.

Ejecutar:  python3 scripts/extract_gates_models.py
Requiere:  pip install pymupdf
"""

import io
import json
import os
import re

import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")
IMG_ROOT = os.path.join(ROOT, "public/images/models")
MODELS_TS = os.path.join(ROOT, "src/data/catalogue-models.ts")

MARK_START = "  // ══ Gama Tore — generado por scripts/extract_gates_models.py ══════"
MARK_END = "  // ══ /Gama Tore ════════════════════════════════════════════════════"

# Imagen de DETALLE de los Garagentore: el render de producto (mecanismo
# o puerta sobre blanco) que el catálogo trae en la hoja de datos de
# cada modelo. La lista de modelos se queda con la lámina completa del
# pliego —única excepción, decisión del dueño: le gusta cómo queda— y la
# ficha individual enseña este render. id → (hoja, xref) o
# (hoja, None, recorte a mano). THERMO lleva la foto grande y completa
# de su hoja 21 —la puerta montada en la casa de madera— porque lo pidió
# el dueño con esa foto en la mano; su pliego no trae render de
# producto y ni el primer plano del panel ni el corte del paneel de la
# hoja 9 le convencieron.
GARAGENTORE_DETAIL = {
    "infiniti-x": (11, 102),
    "infiniti-f": (13, 115),
    "infiniti-r": (15, 130),
    "infiniti-zero": (17, 161),
    "infiniti-f350": (19, 187),
    "infiniti-thermo": (21, 199),
    "presto": (66, 794),
    "unico": (67, 798),
    "rolltore": (71, 811),
    "rollgitter": (75, 831),
}

DETAIL_CANVAS = (1200, 900)
DETAIL_MARGIN = 60


def compose_on_white(png_bytes, out_path):
    render = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    max_w = DETAIL_CANVAS[0] - 2 * DETAIL_MARGIN
    max_h = DETAIL_CANVAS[1] - 2 * DETAIL_MARGIN
    scale = min(max_w / render.width, max_h / render.height)
    render = render.resize(
        (round(render.width * scale), round(render.height * scale)), Image.LANCZOS
    )
    canvas = Image.new("RGB", DETAIL_CANVAS, "white")
    canvas.paste(
        render,
        ((DETAIL_CANVAS[0] - render.width) // 2, (DETAIL_CANVAS[1] - render.height) // 2),
    )
    canvas.save(out_path, "JPEG", quality=88, optimize=True)


def save_page_photo(page, out_path, dpi=140):
    """La foto más grande de la página, renderizada por su rectángulo
    (respeta recortes y máscaras, cosa que extraer el flujo no hace)."""
    best = None
    for im in page.get_images(full=True):
        for rect in page.get_image_rects(im[0]):
            area = rect.width * rect.height
            if rect.width > 120 and rect.height > 100 and (not best or area > best[0]):
                best = (area, rect)
    if not best:
        return False
    page.get_pixmap(dpi=dpi, clip=best[1]).save(out_path)
    return True


def longest_paragraph(page):
    """El bloque de texto más largo de la página: el párrafo del
    fabricante, tal y como está impreso."""
    blocks = [" ".join(b[4].split()) for b in page.get_text("blocks")]
    blocks = [b for b in blocks if len(b) > 80]
    return max(blocks, key=len) if blocks else None


# ── Garagentore: pliegos de sistema, transcritos de sus páginas ──────

GARAGENTORE = [
    # (id, nombre, familia, hoja, specs [(label, value), …])
    ("infiniti-x", "INFINITI X", "Sektionaltore", 10, [
        ("", "Torsystem mit Zugfeder — empfohlen für kleine Garagen"),
        ("Antriebsart", "manuell oder automatisch"),
        ("Max. Torflügelfläche", "9 m²"),
        ("Max. Öffnungsgröße", "DW 4500 × DH 3000 mm"),
        ("Min. Leibungsbreite", "85 mm"),
        ("Max. Sturzhöhe (Standardmontage)", "430 mm"),
    ]),
    ("infiniti-f", "INFINITI F", "Sektionaltore", 12, [
        ("", "Torsystem mit Torsionsfedern an der Vorderseite"),
        ("Antriebsart", "manuell oder automatisch"),
        ("Max. Torflügelfläche", "18 m²"),
        ("Max. Öffnungsgröße", "DW 6000 × DH 3500 mm"),
        ("Min. Leibungsbreite", "85 mm"),
        ("Max. Sturzhöhe (Standardmontage)", "430 mm"),
    ]),
    ("infiniti-r", "INFINITI R", "Sektionaltore", 14, [
        ("", "Torsystem mit Torsionsfedern an der Rückseite"),
        ("Antriebsart", "manuell oder automatisch"),
        ("Max. Torflügelfläche", "12,5 m²"),
        ("Max. Öffnungsgröße", "DW 5500 × DH 3000 mm"),
        ("Min. Leibungsbreite", "85 mm"),
        ("Max. Sturzhöhe (Standardmontage)", "430 mm"),
    ]),
    ("infiniti-zero", "INFINITI ZERO", "Sektionaltore", 16, [
        ("", "Renovierungs-Montagesystem bei mangelndem Seiten- oder Sturzraum"),
        ("", "HOME-ZERO-Montageset: Sturz-, Wand- und Deckenhalterungen, Abstandshalterprofil und Abdeckprofil, in RAL-Farben lackierbar"),
    ]),
    ("infiniti-f350", "INFINITI F350", "Sektionaltore", 18, [
        ("", "Höhergeführter Beschlag — die Lösung bei Kollisionen mit Türen und Fenstern"),
        ("Höherführung", "ab 170 mm"),
        ("Sturz", "min. 350 mm"),
    ]),
    ("infiniti-thermo", "INFINITI THERMO", "Sektionaltore", 20, [
        ("", "Wärmegedämmtes Sektionaltor — Uw-Werte je nach Torgröße, vollständige Tabelle im Katalog"),
        ("Paneelstärke", "60 mm (INFINITI: 40 mm)"),
    ]),
    ("presto", "PRESTO", "Drehflügel-Garagentore", 66, [
        ("Stahlprofile", "1,5 mm"),
        ("Platte", "40 mm, mit Wärmedämmung"),
        ("Oberfläche", "Profile lackiert in RAL-Farben"),
    ]),
    ("unico", "UNICO", "Drehflügel-Garagentore", 67, [
        ("Stahlprofile", "1,5–2,0 mm"),
        ("Platte", "40 mm, mit Wärmedämmung"),
        ("Oberfläche", "Profile lackiert in RAL-Farben"),
    ]),
    ("rolltore", "Rolltore BGR SK / Intense", "Rolltore und Rollgitter", 70, [
        ("Antriebsart", "elektrisch"),
        ("Kästen", "SK45: 250, 300 oder 350 mm"),
        ("Max. Fläche", "9,5 m² (Panzer PA55)"),
        ("Max. Breite mit Führungen", "3000–6000 mm je nach System"),
    ]),
    ("rollgitter", "Rollgitter BKR SK", "Rolltore und Rollgitter", 74, [
        ("Antriebsart", "elektrisch"),
        ("Kästen", "SK45: 250, 300 oder 350 mm"),
        ("Panzer", "PEK 77, PEK 80 — verschiedene Transluzenzstufen"),
        ("Max. Fläche", "9 m²"),
    ]),
]

# ── Grundstückszäune: 18 modelos con plantilla idéntica ──────────────

FENCE_SECTIONS = [
    ([12, 13, 14, 15], "Stahlzäune", "Standard"),
    ([18, 19, 20], "Stahlzäune", "Elegance"),
    ([24, 25, 26], "Stahlzäune", "Prestige"),
    ([34, 35], "Aluminiumzäune", "Standard"),
    ([38, 39, 40, 41], "Aluminiumzäune", "Elegance"),
    ([44, 45, 46, 47], "Aluminiumzäune", "Prestige"),
]

FENCE_SPEC_LABELS = ("Zaunsystem", "Pfostenmaße", "Rahmenprofile", "Füllungsprofile")


def slug(text):
    text = text.lower().replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def extract_garagentore():
    doc = fitz.open(os.path.join(PDF_DIR, "garagentore-produktkatalog.pdf"))
    img_dir = os.path.join(IMG_ROOT, "garagentore")
    os.makedirs(img_dir, exist_ok=True)
    models = []
    for id_, name, family, sheet, specs in GARAGENTORE:
        page = doc[sheet - 1]
        image = f"/images/models/garagentore/{id_}.jpg"
        if not save_page_photo(page, os.path.join(ROOT, "public" + image)):
            print(f"  · {name}: sin foto en la hoja {sheet}")
            image = None
        entry = {
            "id": id_,
            "catalogue": "garagentore",
            "name": name,
            "family": family,
            "page": sheet,
            "image": image,
            "specs": [{"label": l, "value": v} for l, v in specs],
        }
        detail = GARAGENTORE_DETAIL.get(id_)
        if detail:
            detail_sheet, xref = detail[0], detail[1]
            detail_page = doc[detail_sheet - 1]
            clip = None
            if xref is None:
                clip = fitz.Rect(*detail[2])
            else:
                rects = detail_page.get_image_rects(xref)
                if rects:
                    clip = rects[0] + (-2, -2, 2, 2)
            if clip:
                detail_image = f"/images/models/garagentore/{id_}-detail.jpg"
                compose_on_white(
                    detail_page.get_pixmap(dpi=150, clip=clip).tobytes("png"),
                    os.path.join(ROOT, "public" + detail_image),
                )
                entry["detailImage"] = detail_image
        description = longest_paragraph(page)
        if description:
            entry["description"] = description
        models.append(entry)
    doc.close()
    return models


def extract_zaeune():
    doc = fitz.open(os.path.join(PDF_DIR, "grundstueckszaeune-katalog.pdf"))
    img_dir = os.path.join(IMG_ROOT, "grundstueckszaeune")
    os.makedirs(img_dir, exist_ok=True)
    models = []
    for sheets, material, line in FENCE_SECTIONS:
        for sheet in sheets:
            page = doc[sheet - 1]
            # El nombre es el texto más grande de la página; a los de
            # aluminio les cuelga la palabra "aluminium" detrás.
            name, best_size = None, 0
            for block in page.get_text("dict")["blocks"]:
                for text_line in block.get("lines", []):
                    for span in text_line["spans"]:
                        text = span["text"].strip()
                        if span["size"] > best_size and text and len(text) < 40:
                            name, best_size = text, span["size"]
            name = re.sub(r"\s*aluminium\s*$", "", name, flags=re.I).strip()
            text = page.get_text()
            code = (re.search(r"EK\.\d+\.\d+", text) or [None]) and (re.search(r"EK\.\d+\.\d+", text).group(0) if re.search(r"EK\.\d+\.\d+", text) else "")
            specs = []
            for label in FENCE_SPEC_LABELS:
                match = re.search(rf"{label}:\s*([^\n]+)", text)
                if match:
                    value = " ".join(match.group(1).split())
                    # El catálogo imprime la lista en minúsculas; la
                    # ficha la capitaliza sin tocar nada más.
                    if label == "Zaunsystem":
                        value = value[0].upper() + value[1:]
                    specs.append({"label": label, "value": value})
            if code:
                specs.append({"label": "Code", "value": code})
            id_ = slug(name)
            image = f"/images/models/grundstueckszaeune/{id_}.jpg"
            if not save_page_photo(page, os.path.join(ROOT, "public" + image)):
                print(f"  · {name}: sin foto en la hoja {sheet}")
                image = None
            models.append({
                "id": id_,
                "catalogue": "grundstueckszaeune",
                "name": name,
                "family": f"{material} {line}",
                "page": sheet,
                "image": image,
                "specs": specs,
            })
    doc.close()
    return models


def write_models(models):
    source = open(MODELS_TS).read()
    start = source.index(MARK_START)
    end = source.index(MARK_END)
    # La entrada anterior a las marcas tiene que acabar en coma: el
    # array sigue con lo generado. Sin esto, TypeScript se cae con un
    # "',' expected" en la primera entrada nueva.
    head = source[:start].rstrip()
    if head.endswith("}"):
        source = head + ",\n" + source[start:]
        start = source.index(MARK_START)
        end = source.index(MARK_END)
    body = ""
    for model in models:
        clean = {k: v for k, v in model.items() if v is not None}
        body += "  " + json.dumps(clean, ensure_ascii=False, indent=2).replace("\n", "\n  ") + ",\n"
    replacement = (
        MARK_START
        + "\n  // No editar a mano entre estas marcas: el script sustituye el bloque.\n"
        + body
    )
    open(MODELS_TS, "w").write(source[:start] + replacement + source[end:])


if __name__ == "__main__":
    garagentore = extract_garagentore()
    zaeune = extract_zaeune()
    write_models(garagentore + zaeune)
    print(f"✓ {len(garagentore)} modelos de Garagentore, {len(zaeune)} de Grundstückszäune")
