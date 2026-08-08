"""
Saca los accesorios de los catálogos y los deja en la gama de
accesorios, no en la de puertas.

Hasta ahora esa gama enseñaba fichas de ejemplo. Los catálogos traen
accesorios de verdad —tiradores, manillas, control de acceso, bandas,
cierrapuertas, mandos de persiana— cada uno con su foto y su nombre
impreso, y eso es infinitamente mejor que un ejemplo plausible.

Dos maquetados, dos reglas:

  · REJILLA (Außentüren 88 y 94, persianas 26) — cuadraditos con el
    nombre justo debajo. Se empareja cada foto con las palabras que
    caen bajo ella, no con la línea entera: el PDF junta en un mismo
    bloque los pies de tres columnas distintas.

  · TIRA (D-ART LINE 44-47) — un bodegón a lo ancho de todo el pliego
    con seis piezas y sus nombres al pie. No hay una imagen por pieza
    que extraer, así que se recorta la banda vertical que le toca a
    cada nombre.

El accesorio se guarda con `category: "accessories"`, que es lo que lo
saca del escaparate de su catálogo —donde sería una manilla perdida
entre ochenta y siete puertas— y lo lleva a su gama. El PDF y la
página siguen siendo los suyos: el botón "ver en el catálogo" abre el
sitio exacto de donde salió.

Ejecutar:  python3 scripts/extract_accessories.py
           (después de extract_drutex_models.py, que reescribe el mismo
           fichero y respeta lo que lleva `category`)
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

CATEGORY = "accessories"

# Rótulos de sección, no nombres de pieza: van en versalitas espaciadas
# y no se pueden confundir con un pie.
HEADING = re.compile(r"^[A-ZÄÖÜ](\s[A-ZÄÖÜ0-9])+$")

# Palabra cortada por el fin de renglón: "Stabilisierun- gskonsole".
HYPHENATED = re.compile(r"\w-\s+[a-zäöüß]")


def slug(value):
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    return re.sub(r"-{2,}", "-", value)


def tidy(name):
    name = " ".join(name.split()).strip(" .,–-")
    # "3-flügeliges Band für Aluminium" y no "…Aluminium."
    return name


SECTIONS = [
    # ── Rejillas ────────────────────────────────────────────────
    {
        "kind": "grid",
        "catalogue": "aussenturen",
        "file": "aussenturen-produktkatalog.pdf",
        "page": 45,
        "family": "Zutrittskontrolle",
        # Solo la página izquierda: en la derecha va la publicidad de
        # los dos sistemas domóticos, que no es catálogo de accesorios.
        "clip": (0, 0, 840, 600),
    },
    {
        "kind": "grid",
        "catalogue": "aussenturen",
        "file": "aussenturen-produktkatalog.pdf",
        "page": 48,
        "family": "Optionales Zubehör",
    },
    {
        "kind": "grid",
        "catalogue": "rollladen-drutex",
        "file": "rollladen-raffstoren-insektenschutz.pdf",
        "page": 14,
        "family": "Rollladenzubehör",
    },
    # ── Tiras ───────────────────────────────────────────────────
    {
        "kind": "strip",
        "catalogue": "d-art-line",
        "file": "d-art-line-turenkollektion.pdf",
        "page": 23,
        "family": "Stangengriffe",
    },
    {
        "kind": "strip",
        "catalogue": "d-art-line",
        "file": "d-art-line-turenkollektion.pdf",
        "page": 24,
        "family": "Stangengriffe",
    },
]


def save_image(doc, xref, smask, out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    pix = fitz.Pixmap(doc, xref)
    if smask:
        pix = fitz.Pixmap(pix, fitz.Pixmap(doc, smask))
    if pix.alpha:
        page = fitz.open().new_page(width=pix.width, height=pix.height)
        page.insert_image(fitz.Rect(0, 0, pix.width, pix.height), pixmap=pix)
        pix = page.get_pixmap(alpha=False)
    if pix.n > 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    pix.save(out_path, jpg_quality=88)


def overlap(one, other):
    """Cuánto de una caja cae dentro de la otra."""
    shared = one & other
    return shared.get_area() if not shared.is_empty else 0


def page_spans(page):
    """Los trozos de texto de la página, con su caja y si van en negrita."""
    spans = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            for span in line["spans"]:
                text = span["text"].strip()
                if text:
                    spans.append((fitz.Rect(span["bbox"]), text, bool(span["flags"] & 2**4)))
    return spans


def unspace(text):
    """'B r i e f k a s t e n' → 'Briefkasten'. El catálogo lo usa mucho."""
    parts = text.split(" ")
    if len(parts) < 4 or sum(1 for part in parts if len(part) == 1) < len(parts) * 0.7:
        return text
    out, word = [], ""
    for part in parts:
        if len(part) == 1:
            word += part
        else:
            out += ([word] if word else []) + [part]
            word = ""
    return " ".join(out + ([word] if word else []))


def caption_for(box, spans):
    """
    El pie de una foto: lo que cae justo debajo y dentro de su columna.
    Si no hay nada debajo se mira encima, que es donde va el del buzón.

    Cuando el pie lleva descripción —los cierrapuertas la llevan— el
    nombre va en negrita y la descripción no, así que basta con
    quedarse con la negrita en vez de adivinar dónde acaba el nombre.
    """
    for band in ((box.y1 - 2, box.y1 + 34), (box.y0 - 30, box.y0 + 2)):
        near = [
            span
            for span in spans
            if band[0] <= span[0].y0 <= band[1]
            and box.x0 - 22 <= (span[0].x0 + span[0].x1) / 2 <= box.x1 + 22
        ]
        if not near:
            continue
        if any(span[2] for span in near):
            near = [span for span in near if span[2]]
        near.sort(key=lambda span: (round(span[0].y0 / 5), span[0].x0))
        # Lo que va detrás de dos puntos es una coletilla ("erhältlich
        # in den Farben:"), no parte del nombre.
        text = tidy(unspace(tidy(" ".join(span[1] for span in near))).split(":")[0])
        if text and not HEADING.match(text) and "|" not in text:
            return text
    return ""


def extract_grid(doc, section):
    page = doc[section["page"] - 1]
    tiles = []
    for image in page.get_images(full=True):
        rects = page.get_image_rects(image[0])
        if not rects:
            continue
        rect = rects[0]
        # Ni la banda decorativa del margen ni la foto de ambiente a
        # sangre: los accesorios son cuadraditos de catálogo.
        if not (35 < rect.width < 230 and 40 < rect.height < 230):
            continue
        if "clip" in section and not fitz.Rect(*section["clip"]).contains(rect):
            continue
        tiles.append((image[0], image[1], rect))

    # El hueco de la rejilla lo marca la foto grande, y es de ella de
    # quien cuelga el pie. Pero los cierrapuertas van recortados ENCIMA
    # de un fondo gris: si se guardara la de abajo saldría un
    # rectángulo gris. Así que manda la caja grande para colocar y
    # emparejar, y la de dentro —si la hay— para la imagen.
    tiles.sort(key=lambda tile: tile[2].width * tile[2].height, reverse=True)
    kept = []
    for tile in tiles:
        inside = next(
            (
                other
                for other in kept
                if overlap(tile[2], other[2]) > 0.7 * tile[2].get_area()
            ),
            None,
        )
        if inside is not None:
            kept[kept.index(inside)] = (tile[0], tile[1], inside[2])
        elif not any(tile[2].intersects(other[2]) for other in kept):
            kept.append(tile)

    spans = page_spans(page)
    models = []
    for xref, smask, rect in sorted(kept, key=lambda tile: (round(tile[2].y0), tile[2].x0)):
        name = caption_for(rect, spans)
        # Un pie de catálogo es corto y no empieza en minúscula. Lo que
        # no cumple eso es texto corrido caído debajo de una foto.
        # Una palabra partida por un guion de fin de renglón
        # ("Stabilisierun- gskonsole") delata texto corrido caído bajo
        # la foto. El guion suelto de "PK1 - Standardschalter" no, que
        # ese va separado.
        if not (6 < len(name) < 62) or name[0].islower() or HYPHENATED.search(name):
            continue
        model_id = slug(name)
        save_image(
            doc, xref, smask, os.path.join(IMG_DIR, section["catalogue"], f"{model_id}.jpg")
        )
        models.append(
            {
                "id": model_id,
                "catalogue": section["catalogue"],
                "category": CATEGORY,
                "name": name,
                "family": section["family"],
                "page": section["page"],
                "image": f"/images/models/{section['catalogue']}/{model_id}.jpg",
                "specs": [],
            }
        )
    return models


def extract_strip(doc, section):
    """
    Un bodegón a lo ancho con los nombres al pie: se recorta la banda
    vertical de cada nombre, centrada en él, hasta donde empieza la del
    vecino.
    """
    page = doc[section["page"] - 1]
    lines = {}
    for word in page.get_text("words"):
        if word[1] < page.rect.height - 45:
            continue
        lines.setdefault(round(word[1]), []).append(word)
    if not lines:
        return []

    # El pie puede ir en dos renglones ("… Anodic Bronze / mit Stratuario").
    # Ojo con los números: "Ponte 01" y "Line 1" llevan el suyo dentro
    # del nombre, así que solo se descartan los de los márgenes, que son
    # la paginación ("STR 44").
    margin = 90
    rows = sorted(lines)
    captions = {}
    for row in rows:
        for word in sorted(lines[row], key=lambda w: w[0]):
            edge = word[0] < margin or word[2] > page.rect.width - margin
            if word[4].upper() in {"STR", "|"} or (edge and word[4].isdigit()):
                continue
            # Se agrupa por columna: el nombre más a la izquierda de su
            # bloque abre la columna.
            column = min(captions, key=lambda c: abs(c - word[0]), default=None)
            if column is None or abs(column - word[0]) > 160:
                captions[word[0]] = [word[4]]
            else:
                captions[column].append(word[4])

    centres = sorted(captions)
    models = []
    for index, left in enumerate(centres):
        name = tidy(" ".join(captions[left]))
        if len(name) < 6 or len(name) > 70:
            continue
        # La banda va de la mitad entre este nombre y el anterior a la
        # mitad hasta el siguiente.
        start = 0 if index == 0 else (centres[index - 1] + left) / 2
        end = page.rect.width if index == len(centres) - 1 else (left + centres[index + 1]) / 2
        clip = fitz.Rect(start, 30, end, page.rect.height - 55)

        model_id = slug(name)
        out = os.path.join(IMG_DIR, section["catalogue"], f"{model_id}.jpg")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        page.get_pixmap(matrix=fitz.Matrix(2.4, 2.4), clip=clip).save(out, jpg_quality=88)

        models.append(
            {
                "id": model_id,
                "catalogue": section["catalogue"],
                "category": CATEGORY,
                "name": name,
                "family": section["family"],
                "page": section["page"],
                "image": f"/images/models/{section['catalogue']}/{model_id}.jpg",
                "specs": [],
            }
        )
    return models


def main():
    with open(DATA_FILE, encoding="utf-8") as f:
        source = f.read()
    start = source.index("CatalogueModel[] = ") + len("CatalogueModel[] = ")
    end = source.rindex("];") + 1
    header, existing = source[:start], json.loads(source[start:end])
    kept = [model for model in existing if model.get("category") != CATEGORY]

    fresh = []
    for section in SECTIONS:
        doc = fitz.open(os.path.join(PDF_DIR, section["file"]))
        found = extract_grid(doc, section) if section["kind"] == "grid" else extract_strip(doc, section)
        doc.close()
        print(f"{section['catalogue']} p{section['page']} · {section['family']}: {len(found)}")
        for model in found:
            print(f"    {model['name']}")
        fresh += found

    # Un mismo nombre en dos páginas del mismo catálogo sería un id
    # repetido y una página que pisa a la otra.
    seen = set()
    unique = []
    for model in fresh:
        key = (model["catalogue"], model["id"])
        if key in seen:
            print(f"  · repetido, se descarta: {model['name']}")
            continue
        seen.add(key)
        unique.append(model)

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(header)
        f.write(json.dumps(kept + unique, ensure_ascii=False, indent=2))
        f.write(";\n")
    print(f"\n✓ {len(unique)} accesorios · {len(kept) + len(unique)} modelos en total")


if __name__ == "__main__":
    main()
