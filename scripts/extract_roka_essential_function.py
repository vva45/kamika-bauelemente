"""
Extrae los modelos de los catálogos ROKA Essential y Function (2025)
y los FUNDE en src/data/catalogue-models.ts sin tocar el resto.

Ojo: extract_catalogue_models.py reescribe el archivo entero desde sus
cuatro catálogos — ejecutarlo hoy borraría WIKĘD, persianas, puertas de
garaje y accesorios. Por eso este script lee el TS existente, quita las
entradas roka-essential/function previas (idempotente) y añade las
nuevas justo detrás del bloque de ROKA Select.

Maquetación de ambos catálogos (páginas dobles, 1304×864 pt):
cuatro puertas por página con la etiqueta ("ESSENTIAL 1"…) SOBRE la
foto (y las fichas debajo). El recorte llega hasta justo encima de la
etiqueta para que salga la puerta sin su pie. La página de resumen
también lleva etiquetas: se procesa, pero la ficha real (más specs)
gana en la deduplicación, igual que en el extractor principal.

Ejecutar:  python3 scripts/extract_roka_essential_function.py
"""

import json
import os
import re

import fitz

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")
IMG_DIR = os.path.join(ROOT, "public/images/models")
DATA_FILE = os.path.join(ROOT, "src/data/catalogue-models.ts")

MIN_IMAGE_PT = 60

# Los mismos campos de ficha que en Select, más los propios de estas
# líneas (Profilsystem, Reliefnuten, Applikationen). Etiquetas en
# inglés como el resto del archivo generado.
SPEC_PATTERNS = (
    (r"U-?\s*Wert\s*-?\s*UD\s*([\d,\.]+)\s*W/m2K", "Ud value"),
    (r"Stoßgriff\s+(.+?)(?:\s+Glas|\s+Oberflächen|\s+U-\s*Wert|$)", "Pull handle"),
    (r"Glas\s+(.+?)(?:\s+Oberflächen|\s+U-\s*Wert|$)", "Glazing"),
    (r"Oberflächen\s+(.+?)(?:\s+U-\s*Wert|\s+Applikationen|\s+Reliefnuten|\s+Profilsystem|$)", "Surface"),
    (r"Profilsystem\s+(.+?)(?:\s+Stoßgriff|\s+Glas|\s+U-\s*Wert|$)", "Profile system"),
    (r"Reliefnuten\s+(.+?)(?:\s+U-\s*Wert|$)", "Relief grooves"),
    (r"Applikationen\s+(.+?)(?:\s+U-\s*Wert|$)", "Applications"),
)


def blocks(page):
    return [
        (b[0], b[1], b[2], b[3], " ".join(b[4].split()))
        for b in page.get_text("blocks")
    ]


def image_rects(page):
    out = []
    for img in page.get_images(full=True):
        for r in page.get_image_rects(img[0]):
            if r.width >= MIN_IMAGE_PT and r.height >= MIN_IMAGE_PT:
                out.append(r)
    return out


def save_crop(doc, page_index, rect, out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    pix = doc[page_index].get_pixmap(matrix=fitz.Matrix(3.2, 3.2), clip=rect, alpha=False)
    pix.save(out_path, jpg_quality=86)


def extract(doc, catalogue_id, word, prefix):
    """`word` = "ESSENTIAL" o "FUNCTION"; etiquetas "WORD n"."""
    label_re = re.compile(rf"{word}\s+(\d+)")
    models = []
    for i in range(doc.page_count):
        page = doc[i]
        bs = blocks(page)

        # Etiquetas con su centro x y su borde superior (el tope del
        # recorte). Un bloque puede traer varias seguidas: se reparten
        # por el ancho, como en el extractor principal.
        labels = []
        for x0, y0, x1, y1, text in bs:
            found = label_re.findall(text)
            if not found or "Anwendungsbeispiel" in text or "Kollektion" in text:
                continue
            step = (x1 - x0) / len(found)
            for k, number in enumerate(found):
                labels.append((x0 + step * (k + 0.5), y0, number))
        if not labels:
            continue

        rects = image_rects(page)
        used = set()
        for x_center, label_top, number in sorted(set(labels), key=lambda t: t[0]):
            # La imagen no usada con el centro x más cercano.
            best, best_d = None, None
            for r in rects:
                key = (round(r.x0), round(r.y0))
                if key in used:
                    continue
                d = abs((r.x0 + r.x1) / 2 - x_center)
                if best_d is None or d < best_d:
                    best, best_d = r, d
            if best is None:
                continue
            used.add((round(best.x0), round(best.y0)))

            model_id = f"{prefix}-{number}"
            # Recorte hasta justo encima de la etiqueta: la puerta sin
            # pie. Si la etiqueta cae tan arriba que no dejaría foto
            # (pasa en los emparejamientos cruzados del resumen), se
            # recorta la imagen entera y que decida la deduplicación.
            bottom = label_top - 6
            if bottom < best.y0 + 40:
                bottom = best.y1
            crop = fitz.Rect(max(best.x0, 0), best.y0, best.x1, bottom)
            save_crop(doc, i, crop, os.path.join(IMG_DIR, catalogue_id, f"{model_id}.jpg"))

            # Ficha: todos los bloques de la columna bajo la etiqueta.
            spec_text = " ".join(
                t
                for bx0, by0, bx1, by1, t in bs
                if by0 >= label_top and abs((bx0 + bx1) / 2 - x_center) < 160
                and not label_re.search(t)
            )
            specs = []
            for pattern, label in SPEC_PATTERNS:
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
                    "name": f"{word.capitalize()} {number}",
                    "page": i + 1,
                    "image": f"/images/models/{catalogue_id}/{model_id}.jpg",
                    "specs": specs,
                }
            )

    # La ficha real (más specs) gana sobre la mención del resumen.
    best = {}
    for model in models:
        current = best.get(model["id"])
        if current is None or len(model["specs"]) >= len(current["specs"]):
            best[model["id"]] = model
    return [best[k] for k in sorted(best, key=lambda x: int(x.rsplit("-", 1)[1]))]


def main():
    new_models = []
    for pdf, cid, word, prefix in (
        ("roka-essential-2025.pdf", "roka-essential-2025", "ESSENTIAL", "essential"),
        ("roka-function-2025.pdf", "roka-function-2025", "FUNCTION", "function"),
    ):
        doc = fitz.open(os.path.join(PDF_DIR, pdf))
        models = extract(doc, cid, word, prefix)
        doc.close()
        print(f"{cid}: {len(models)} modelos")
        for m in models:
            print(f"  {m['name']} (p{m['page']}): {len(m['specs'])} specs")
        new_models += models

    # Fusión por TEXTO, no por json.loads: el archivo lleva bloques
    # añadidos por otros extractores (WIKĘD) con comentarios JS y comas
    # finales que no son JSON válido. Se empalma detrás del último
    # modelo de ROKA Select, entre marcadores para ser idempotente.
    MARK_OPEN = "  // ══ ROKA Essential + Function (extract_roka_essential_function.py) ══"
    MARK_CLOSE = "  // ══ /ROKA Essential + Function ══"

    with open(DATA_FILE, encoding="utf-8") as f:
        content = f.read()

    if MARK_OPEN in content:
        a = content.index(MARK_OPEN)
        b = content.index(MARK_CLOSE) + len(MARK_CLOSE) + 1
        content = content[:a] + content[b:]

    pos = content.rindex('"catalogue": "roka-select-2025"')
    insert_at = content.index("\n  },", pos) + len("\n  },") + 1

    entries = []
    for model in new_models:
        text = json.dumps(model, ensure_ascii=False, indent=2)
        entries.append("\n".join("  " + line for line in text.splitlines()) + ",")
    block = MARK_OPEN + "\n" + "\n".join(entries) + "\n" + MARK_CLOSE + "\n"

    content = content[:insert_at] + block + content[insert_at:]
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\n✓ {len(new_models)} modelos fundidos en catalogue-models.ts")


if __name__ == "__main__":
    main()
