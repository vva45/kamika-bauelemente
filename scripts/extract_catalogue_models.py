"""
Extrae TODOS los modelos de cada catálogo y genera:

  - public/images/models/{catalogue}/{model}.jpg   una foto por modelo
  - src/data/catalogue-models.ts                   los datos, tipados

Es el escaparate: la web destaca cuatro puertas como producto, pero el
cliente tiene que poder ver la colección entera sin descargarse 27 MB de
PDF. Cada modelo enlaza además a su página exacta del catálogo.

Cada catálogo está maquetado distinto, así que hay una regla por
catálogo. Todas siguen el mismo método: leer los rótulos con sus
coordenadas, emparejar cada rótulo con la imagen que tiene debajo (la
más cercana en horizontal) y recortar.

Ejecutar:  python3 scripts/extract_catalogue_models.py
Requiere:  pip install pymupdf
"""

import json
import os
import re
import unicodedata

import fitz

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")
IMG_DIR = os.path.join(ROOT, "public/images/models")
DATA_FILE = os.path.join(ROOT, "src/data/catalogue-models.ts")

# Un modelo se descarta si su recorte es más pequeño que esto: suele ser
# un icono o una viñeta, no una puerta.
MIN_IMAGE_PT = 60


def slug(value):
    """Id estable y seguro para una URL, sin acentos ni signos."""
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    return re.sub(r"-{2,}", "-", value)


def save_crop(doc, page_index, rect, out_path, zoom=3.2):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    pix = doc[page_index].get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=rect, alpha=False)
    pix.save(out_path, jpg_quality=86)


def image_rects(page):
    """Imágenes de la página con su posición, las grandes primero."""
    out = []
    for img in page.get_images(full=True):
        for r in page.get_image_rects(img[0]):
            if r.width >= MIN_IMAGE_PT and r.height >= MIN_IMAGE_PT:
                out.append(r)
    return sorted(out, key=lambda r: -(r.width * r.height))


def nearest_image(rects, x_center, used):
    """La imagen no usada cuyo centro horizontal cae más cerca del rótulo."""
    best, best_d = None, None
    for r in rects:
        key = (round(r.x0), round(r.y0), round(r.x1), round(r.y1))
        if key in used:
            continue
        d = abs((r.x0 + r.x1) / 2 - x_center)
        if best_d is None or d < best_d:
            best, best_d = r, d
    if best is not None:
        used.add((round(best.x0), round(best.y0), round(best.x1), round(best.y1)))
    return best


def blocks(page):
    return [
        (b[0], b[1], b[2], b[3], " ".join(b[4].split()))
        for b in page.get_text("blocks")
        if b[4].strip()
    ]


# ── ROKA Signature: un modelo por página ─────────────────────────────
# Rótulo tipo "OBERFLÄCHE Sediment Taupe STOSSGRIFF Sol Earth No. 01".

SIGNATURE_RE = re.compile(
    r"OBERFL[ÄA]CHE\s+(?P<surface>.+?)\s+STOSSGRIFF\s+(?P<handle>.+?)\s+"
    r"(?P<family>Earth|Keramik|Balance|Glas|Holz|Edles Fl[üu]ssigmetall|Vintage)\s+No\.\s*(?P<no>\d+)"
)


def extract_signature(doc, catalogue_id):
    models = []
    for i in range(doc.page_count):
        text = " ".join(doc[i].get_text().split())
        m = SIGNATURE_RE.search(text)
        if not m:
            continue
        family = m.group("family").replace("ü", "u")
        name = f"{m.group('family')} No. {m.group('no')}"
        rects = image_rects(doc[i])
        if not rects:
            continue
        r = rects[0]
        model_id = slug(f"{family}-{m.group('no')}")
        save_crop(doc, i, r, os.path.join(IMG_DIR, catalogue_id, f"{model_id}.jpg"), zoom=2.6)
        models.append(
            {
                "id": model_id,
                "catalogue": catalogue_id,
                "name": name,
                "family": m.group("family"),
                "page": i + 1,
                "image": f"/images/models/{catalogue_id}/{model_id}.jpg",
                "specs": [
                    {"label": "Surface", "value": m.group("surface")},
                    {"label": "Pull handle", "value": m.group("handle")},
                ],
            }
        )
    return models


# ── ROKA Select: varios por doble página, emparejados por columna ────

SELECT_LABEL_RE = re.compile(r"SELECT\s+(\d+)")


def extract_select(doc, catalogue_id):
    models = []
    for i in range(doc.page_count):
        page = doc[i]
        bs = blocks(page)
        labels = []  # (x_centro, número)
        for x0, y0, x1, y1, text in bs:
            for m in SELECT_LABEL_RE.finditer(text):
                # El bloque puede llevar las cuatro etiquetas seguidas;
                # se reparten proporcionalmente por el ancho del bloque.
                found = SELECT_LABEL_RE.findall(text)
                if len(found) > 1:
                    step = (x1 - x0) / len(found)
                    for k, number in enumerate(found):
                        labels.append((x0 + step * (k + 0.5), number))
                else:
                    labels.append(((x0 + x1) / 2, m.group(1)))
                break
        if not labels:
            continue

        spec_blocks = [(b[0], b[2], b[4]) for b in bs if "Stoßgriff" in b[4] or "Stossgriff" in b[4]]
        rects = image_rects(page)
        used = set()

        for x_center, number in sorted(set(labels), key=lambda t: t[0]):
            spec_text = ""
            if spec_blocks:
                spec_text = min(spec_blocks, key=lambda b: abs((b[0] + b[1]) / 2 - x_center))[2]
            r = nearest_image(rects, x_center, used)
            if r is None:
                continue
            model_id = f"select-{number}"
            # El rectángulo de la imagen llega hasta el bloque de texto
            # de la columna; se recorta la cuarta parte inferior para que
            # la foto sea la puerta y no la puerta con su pie de página.
            crop = fitz.Rect(r.x0, r.y0, r.x1, r.y0 + r.height * 0.76)
            save_crop(doc, i, crop, os.path.join(IMG_DIR, catalogue_id, f"{model_id}.jpg"))
            specs = []
            for pattern, label in (
                (r"U-?\s*Wert\s*-?\s*UD\s*([\d,\.]+)\s*W/m2K", "Ud value"),
                (r"Oberflächen\s+(.+?)(?:\s+U-\s*Wert|\s+Applikationen|\s+Glas|$)", "Surface"),
                (r"Stoßgriff\s+(.+?)(?:\s+Oberflächen|\s+Glas|\s+U-\s*Wert|$)", "Pull handle"),
                (r"Glas\s+(.+?)(?:\s+Oberflächen|\s+U-\s*Wert|$)", "Glazing"),
                (r"Applikationen\s+(.+?)(?:\s+U-\s*Wert|$)", "Applications"),
            ):
                found = re.search(pattern, spec_text)
                if found:
                    value = found.group(1).strip()
                    if label == "Ud value":
                        value = value.replace(",", ".") + " W/m²K"
                    specs.append({"label": label, "value": value})
            models.append(
                {
                    "id": model_id,
                    "catalogue": catalogue_id,
                    "name": f"Select {number}",
                    "page": i + 1,
                    "image": f"/images/models/{catalogue_id}/{model_id}.jpg",
                    "specs": specs,
                }
            )
    return models


# ── Catálogos de paneles: "Paneel 01", "Paneel DP01", "KIM ET"… ──────

PANEL_LABEL_RE = re.compile(r"Paneel\s+([A-Z]{0,2}\d{2,3})")
SIZE_RE = re.compile(r"(PVC|ALU|WOOD):\s*(\d+)\s*x\s*(\d+)")


def extract_panels(doc, catalogue_id, prefix):
    models = []
    seen = set()
    for i in range(doc.page_count):
        page = doc[i]
        bs = blocks(page)
        labels = []
        for x0, y0, x1, y1, text in bs:
            found = PANEL_LABEL_RE.findall(text)
            if not found:
                continue
            step = (x1 - x0) / len(found)
            for k, code in enumerate(found):
                labels.append((x0 + step * (k + 0.5), code))
        if not labels:
            continue

        size_blocks = [(b[0], b[2], b[4]) for b in bs if SIZE_RE.search(b[4])]
        glass_blocks = [(b[0], b[2], b[4]) for b in bs if "Verglasung" in b[4]]
        rects = image_rects(page)
        used = set()

        for x_center, code in sorted(set(labels), key=lambda t: t[0]):
            model_id = f"{prefix}-{slug(code)}"
            if model_id in seen:
                continue
            seen.add(model_id)
            r = nearest_image(rects, x_center, used)
            if r is None:
                continue
            save_crop(doc, i, r, os.path.join(IMG_DIR, catalogue_id, f"{model_id}.jpg"))

            specs = []
            # Las medidas de la columna: mínimo y máximo por material.
            near_sizes = [b for b in size_blocks if abs((b[0] + b[1]) / 2 - x_center) < 200]
            pairs = {}
            for b in near_sizes:
                for material, w, h in SIZE_RE.findall(b[2]):
                    pairs.setdefault(material, []).append((int(w), int(h)))
            for material, values in pairs.items():
                values.sort(key=lambda wh: wh[0] * wh[1])
                label = {"PVC": "PVC", "ALU": "Aluminium", "WOOD": "Wood"}[material]
                if len(values) >= 2:
                    specs.append(
                        {
                            "label": f"{label} size",
                            "value": f"{values[0][0]} × {values[0][1]} to {values[-1][0]} × {values[-1][1]} mm",
                        }
                    )
                else:
                    specs.append({"label": f"{label} size", "value": f"{values[0][0]} × {values[0][1]} mm"})

            near_glass = [b for b in glass_blocks if abs((b[0] + b[1]) / 2 - x_center) < 200]
            if near_glass:
                glass = near_glass[0][2].replace("•", "·").strip()
                specs.append({"label": "Glazing", "value": glass[:160]})

            models.append(
                {
                    "id": model_id,
                    "catalogue": catalogue_id,
                    "name": f"Paneel {code}",
                    "page": i + 1,
                    "image": f"/images/models/{catalogue_id}/{model_id}.jpg",
                    "specs": specs,
                }
            )
    return models


# ── Salida ───────────────────────────────────────────────────────────

def deduplicate(models):
    """
    Un mismo modelo puede aparecer en varias páginas (una mención en la
    introducción y su ficha real). Se queda la que trae más datos, y a
    igualdad, la última: la ficha suele ir después del índice.
    """
    best = {}
    for model in models:
        key = (model["catalogue"], model["id"])
        current = best.get(key)
        if current is None or len(model["specs"]) >= len(current["specs"]):
            best[key] = model
    return list(best.values())


def main():
    all_models = []

    doc = fitz.open(os.path.join(PDF_DIR, "roka-signature-2025.pdf"))
    signature = extract_signature(doc, "roka-signature-2025")
    doc.close()
    print(f"ROKA Signature: {len(signature)} modelos")
    all_models += signature

    doc = fitz.open(os.path.join(PDF_DIR, "roka-select-2025.pdf"))
    select = extract_select(doc, "roka-select-2025")
    doc.close()
    print(f"ROKA Select:    {len(select)} modelos")
    all_models += select

    doc = fitz.open(os.path.join(PDF_DIR, "entrance-door-panels.pdf"))
    panels = extract_panels(doc, "entrance-door-panels", "panel")
    doc.close()
    print(f"Paneles:        {len(panels)} modelos")
    all_models += panels

    doc = fitz.open(os.path.join(PDF_DIR, "despiro-entrance-doors.pdf"))
    despiro = extract_panels(doc, "despiro-entrance-doors", "despiro")
    doc.close()
    print(f"Despiro:        {len(despiro)} modelos")
    all_models += despiro

    header = '''/**
 * MODELOS DE CATÁLOGO — GENERADO AUTOMÁTICAMENTE. No editar a mano.
 *
 * Lo produce `python3 scripts/extract_catalogue_models.py` leyendo los
 * PDF de `public/pdf/catalogues`: nombre, página e imagen salen del
 * propio catálogo, así que no hay nada inventado aquí.
 *
 * Es el escaparate completo. Los cuatro productos de
 * `products/entrance-doors.ts` son los que Kamika destaca y llevan ficha
 * larga; esto es la colección entera, para poder mirarla sin
 * descargarse el PDF.
 *
 * Si se sustituye un catálogo hay que volver a ejecutar el script: las
 * páginas cambian y los enlaces dejarían de apuntar donde deben.
 */
import type { CatalogueModel } from "./types";

export const CATALOGUE_MODELS: CatalogueModel[] = '''

    before = len(all_models)
    all_models = deduplicate(all_models)
    if before != len(all_models):
        print(f"\n· {before - len(all_models)} modelo(s) repetido(s) descartado(s)")

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(header)
        f.write(json.dumps(all_models, ensure_ascii=False, indent=2))
        f.write(";\n")

    print(f"\n✓ {len(all_models)} modelos en total → src/data/catalogue-models.ts")


if __name__ == "__main__":
    main()
