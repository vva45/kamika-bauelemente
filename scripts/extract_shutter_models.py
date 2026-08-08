"""
Extrae los modelos de los dos catálogos de persianas y los añade a
`src/data/catalogue-models.ts`.

Va aparte de `extract_catalogue_models.py` porque estos dos PDF están
maquetados de otra manera: una página por modelo, con un título grande
("Vorbaurollladen SK45"), un párrafo de descripción, una lista de
viñetas con los datos y una foto grande. Nada que ver con las rejillas
de puertas del otro script.

De cada modelo salen:
  - nombre        el título sin el prefijo de familia
  - familia       Vorbaurollläden, Aufsatzrollläden, Vorbau Jalousien…
  - página        la del PDF FINAL (el limpio), para el enlace #page=N
  - imagen        la foto grande de la página, recortada de verdad
  - specs         las viñetas, tal y como están impresas

Todo en alemán porque el catálogo es alemán: es el idioma del cliente
de Hechingen y no se traduce a mano una especificación técnica.

Ejecutar:  python3 scripts/extract_shutter_models.py
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

# Título de modelo: grande, pero por debajo de los títulos de sección
# (28-32 pt) que abren cada familia.
TITLE_MIN, TITLE_MAX = 20.0, 23.0

CATALOGUES = [
    {
        "id": "rollladen-produktkatalog",
        "file": "rollladen-produktkatalog.pdf",
        # Prefijos que son la familia; lo que queda es el nombre.
        "families": ["Vorbaurollladen", "Unterputzrollladen", "Aufsatzrollladen"],
        "family_names": {
            "Vorbaurollladen": "Vorbaurollläden",
            "Unterputzrollladen": "Unterputzrollläden",
            "Aufsatzrollladen": "Aufsatzrollläden",
        },
    },
    {
        "id": "fassadenjalousien",
        "file": "fassadenjalousien.pdf",
        "families": ["Vorbau Jalousie", "Aufsatz Jalousie", "Unterputz Jalousie"],
        "family_names": {
            "Vorbau Jalousie": "Vorbau Jalousien",
            "Aufsatz Jalousie": "Aufsatz Jalousien",
            "Unterputz Jalousie": "Unterputz Jalousien",
        },
    },
]


def slug(value):
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    return re.sub(r"-{2,}", "-", value)


def title_of(page):
    """El rótulo grande de la página, si lo hay."""
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = "".join(span["text"] for span in line["spans"]).strip()
            size = max((span["size"] for span in line["spans"]), default=0)
            if TITLE_MIN <= size <= TITLE_MAX and len(text) > 2:
                return text
    return None


def description_of(page, title):
    """
    El párrafo que va justo debajo del título: el bloque de texto más
    largo que no es una viñeta ni una tabla de medidas.
    """
    best = ""
    for block in page.get_text("blocks"):
        text = " ".join(block[4].split())
        if text.startswith("•") or title in text:
            continue
        # Las tablas de medidas son ristras de números sueltos.
        if len(re.findall(r"\d", text)) > len(text) * 0.35:
            continue
        if len(text) > len(best):
            best = text
    return best.strip()


def specs_of(page):
    """
    Los datos de la página, en los dos formatos que usan estos
    catálogos:

      · Persianas — viñetas sueltas ("• Universelle Konstruktion").
        Se parten por el bullet y no por líneas, porque una viñeta
        ocupa dos o tres líneas del maquetado.

      · Celosías — pares "Etiqueta:" y debajo su valor, a veces varios
        ("Kastenabmessungen:" + cuatro medidas). Se juntan con coma.

    Se prueban los dos y se queda el que dé más filas.
    """
    bullets = []
    for block in page.get_text("blocks"):
        text = block[4]
        if "•" not in text:
            continue
        for chunk in text.split("•"):
            value = " ".join(chunk.split()).strip(" .;")
            if len(value) < 8 or value.startswith("*"):
                continue
            bullets.append({"label": "", "value": value})

    pairs = []
    label, values = None, []
    for block in page.get_text("blocks"):
        for raw in block[4].splitlines():
            line = raw.strip()
            if not line:
                continue
            if line.endswith(":"):
                if label and values:
                    pairs.append({"label": label, "value": ", ".join(values)})
                label, values = line[:-1].strip(), []
            elif label and len(line) < 60 and not line.startswith(("*", "•")):
                values.append(line)
    if label and values:
        pairs.append({"label": label, "value": ", ".join(values)})

    return bullets if len(bullets) >= len(pairs) else pairs


def photo_of(doc, index):
    """
    La foto grande de la página. Se coge el objeto imagen mayor y se
    guarda ÉL, no un recorte de la página: en estos catálogos las fotos
    se solapan con dibujos técnicos y recortar por rectángulo se
    traería medio plano de cotas.
    """
    page = doc[index]
    best = None
    for img in page.get_images(full=True):
        width, height = img[2], img[3]
        if width < 500 or height < 500:
            continue
        if best is None or width * height > best[2] * best[3]:
            best = img
    return best


def save_image(doc, img, out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    pix = fitz.Pixmap(doc, img[0])
    if img[1]:
        pix = fitz.Pixmap(pix, fitz.Pixmap(doc, img[1]))
    if pix.alpha:
        page = fitz.open().new_page(width=pix.width, height=pix.height)
        page.insert_image(fitz.Rect(0, 0, pix.width, pix.height), pixmap=pix)
        pix = page.get_pixmap(alpha=False)
    if pix.n > 3:  # CMYK
        pix = fitz.Pixmap(fitz.csRGB, pix)
    pix.save(out_path, jpg_quality=86)


def extract(catalogue):
    doc = fitz.open(os.path.join(PDF_DIR, catalogue["file"]))
    models = []

    for index in range(doc.page_count):
        title = title_of(doc[index])
        if not title:
            continue

        family_key = next((f for f in catalogue["families"] if title.startswith(f)), None)
        if not family_key:
            continue

        name = title[len(family_key) :].strip()
        if not name:
            continue

        img = photo_of(doc, index)
        if img is None:
            print(f"  · sin foto utilizable, se descarta: {title}")
            continue

        model_id = slug(name)
        image_path = f"/images/models/{catalogue['id']}/{model_id}.jpg"
        save_image(doc, img, os.path.join(IMG_DIR, catalogue["id"], f"{model_id}.jpg"))

        specs = specs_of(doc[index])
        models.append(
            {
                "id": model_id,
                "catalogue": catalogue["id"],
                "name": name,
                "family": catalogue["family_names"][family_key],
                "page": index + 1,
                "image": image_path,
                "specs": specs,
                "description": description_of(doc[index], title),
            }
        )

    doc.close()
    return models


def main():
    existing = []
    with open(DATA_FILE, encoding="utf-8") as f:
        source = f.read()
    start = source.index("CatalogueModel[] = ") + len("CatalogueModel[] = ")
    end = source.rindex("];") + 1
    header = source[:start]
    existing = json.loads(source[start:end])

    # Se reemplazan solo los modelos de estos dos catálogos: los de
    # puertas los mantiene su propio script.
    ours = {c["id"] for c in CATALOGUES}
    kept = [m for m in existing if m["catalogue"] not in ours]

    fresh = []
    for catalogue in CATALOGUES:
        models = extract(catalogue)
        print(f"{catalogue['id']}: {len(models)} modelos")
        fresh += models

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(header)
        f.write(json.dumps(kept + fresh, ensure_ascii=False, indent=2))
        f.write(";\n")

    print(f"\n✓ {len(kept)} + {len(fresh)} = {len(kept) + len(fresh)} modelos en total")


if __name__ == "__main__":
    main()
