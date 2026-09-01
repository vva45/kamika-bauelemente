"""
Extrae las DOS pérgolas bioclimáticas del Aluminium-Katalog (p59-60)
y las funde en src/data/catalogue-models.ts con `category: "pergolas"`
— así aparecen en la página de la gama vía getModelsInCategory, como
hacen los accesorios de puertas con su override.

Cada ficha del catálogo trae dos cosas y las dos se llevan:
 - TECHNISCHE DATEN (medidas) → specs etiqueta/valor
 - AUSSTATTUNG DER PERGOLA (equipamiento) → viñetas con label vacío,
   el mismo formato que usan las persianas para sus listas.

La foto del modelo es la imagen grande de la media página derecha
(no hay render aislado: el catálogo enseña la pérgola montada).

Fusión con marcadores, idempotente — el extractor principal NO se
puede ejecutar (reescribiría el archivo entero, ver CONTENT.md).

Ejecutar:  python3 scripts/extract_aluminium_pergolas.py
"""

import json
import os
import re

import fitz

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, "public/pdf/catalogues/aluminium-2026.pdf")
IMG_DIR = os.path.join(ROOT, "public/images/models/aluminium-2026")
DATA_FILE = os.path.join(ROOT, "src/data/catalogue-models.ts")

CATALOGUE = "aluminium-2026"

# (índice 0-based, id, nombre tal cual el catálogo)
PAGES = [
    (58, "nuun-eco", "NUUN ECO"),
    (59, "selt-sb350", "Selt SB350"),
]

MARK_OPEN = "  // ══ Pérgolas Aluminium-Katalog (extract_aluminium_pergolas.py) ══"
MARK_CLOSE = "  // ══ /Pérgolas Aluminium-Katalog ══"


def extract(doc):
    models = []
    for index, model_id, name in PAGES:
        page = doc[index]
        text = " ".join(page.get_text().split())

        # Medidas: las líneas entre "TECHNISCHE DATEN <X>" y "AUSSTATTUNG".
        specs = []
        m = re.search(r"TECHNISCHE DATEN\s+[A-ZÄÖÜ0-9 ]+?\s((?:[A-ZÄÖÜa-zäöüß\.\s]+?\s[\d,][^A-ZÄÖÜ]*?)+)AUSSTATTUNG", text)
        tech_zone = m.group(1) if m else ""
        for line in re.findall(r"([A-ZÄÖÜ][a-zäöüß\.]*(?:\s[A-ZÄÖÜa-zäöüß\.]+)*)\s([\d][\d,\.\s/xm-]*m²?)", tech_zone):
            label, value = line[0].strip(), line[1].strip()
            # El nombre del modelo puede dejar una mayúscula huérfana
            # pegada al primer rótulo ("O Breite" ← NUUN ECO).
            label = re.sub(r"^[A-ZÄÖÜ]\s+", "", label)
            specs.append({"label": label, "value": value})

        # Equipamiento: viñetas "•" tras AUSSTATTUNG DER PERGOLA.
        after = text.split("AUSSTATTUNG DER PERGOLA", 1)
        if len(after) == 2:
            for bullet in after[1].split("•")[1:]:
                item = bullet.strip()
                # la última viñeta arrastra el número de página impreso
                item = re.sub(r"\s+\d{2,3}$", "", item)
                if 8 < len(item) < 140:
                    specs.append({"label": "", "value": item})

        # La foto: la imagen más grande de la página (la media derecha).
        best = None
        for img in page.get_images(full=True):
            for r in page.get_image_rects(img[0]):
                if best is None or r.width * r.height > best.width * best.height:
                    best = r
        os.makedirs(IMG_DIR, exist_ok=True)
        pix = page.get_pixmap(matrix=fitz.Matrix(2.2, 2.2), clip=best, alpha=False)
        pix.save(os.path.join(IMG_DIR, f"{model_id}.jpg"), jpg_quality=86)

        models.append(
            {
                "id": model_id,
                "catalogue": CATALOGUE,
                "name": name,
                "family": "Bioklimatische Pergola",
                "category": "pergolas",
                "page": index + 1,
                "image": f"/images/models/{CATALOGUE}/{model_id}.jpg",
                "specs": specs,
            }
        )
        print(f"{name} (p{index + 1}): {len(specs)} specs")
    return models


def main():
    doc = fitz.open(PDF)
    models = extract(doc)
    doc.close()

    with open(DATA_FILE, encoding="utf-8") as f:
        content = f.read()
    if MARK_OPEN in content:
        a = content.index(MARK_OPEN)
        b = content.index(MARK_CLOSE) + len(MARK_CLOSE) + 1
        content = content[:a] + content[b:]

    # Detrás del bloque ROKA Essential+Function, antes de los paneles.
    anchor = "  // ══ /ROKA Essential + Function ══\n"
    insert_at = content.index(anchor) + len(anchor)

    entries = []
    for model in models:
        blob = json.dumps(model, ensure_ascii=False, indent=2)
        entries.append("\n".join("  " + line for line in blob.splitlines()) + ",")
    block = MARK_OPEN + "\n" + "\n".join(entries) + "\n" + MARK_CLOSE + "\n"

    content = content[:insert_at] + block + content[insert_at:]
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✓ {len(models)} pérgolas fundidas en catalogue-models.ts")


if __name__ == "__main__":
    main()
