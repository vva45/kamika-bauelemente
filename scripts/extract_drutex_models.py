"""
Extrae los modelos de los tres catálogos de Drutex ya limpios.

Tres maquetados distintos, tres reglas:

  · D-ART LINE — pliegos de fotografía con un rótulo al pie de cada
    puerta: "Classic 2 Farbe: … Drücker: … Sandgestrahlt: …". El nombre
    y sus acabados salen de ahí.

  · Außentüren — rejillas de ocho diseños de panel por pliego, con el
    nombre debajo de cada uno partido en pedazos por el interletrado
    ("WA S HING TO N 6"). Se reconstruye agrupando las palabras por la
    columna de imagen que tienen encima, no leyendo la línea entera.

  · Rollläden — una sección por sistema, con su foto grande y su tabla
    de especificación en la página siguiente.

Nada de esto está redactado a mano: nombre, familia, imagen y datos
salen del PDF. En alemán, porque el catálogo es alemán y traducir una
especificación a mano es inventarla.

Ejecutar:  python3 scripts/extract_drutex_models.py
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

OURS = {"d-art-line", "aussenturen", "rollladen-drutex"}


def slug(value):
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    return re.sub(r"-{2,}", "-", value)


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
    pix.save(out_path, jpg_quality=86)


# ── 1. D-ART LINE ────────────────────────────────────────────────
# "Classic 2 Farbe: Anodic Graphite / Anodic Bronze Drücker: … Sandgestrahlt: 60"

ARTLINE_LABEL = re.compile(
    r"^(?P<family>Classic|Elegance|Modern|Prestige|Geometric)\s+(?P<no>[\d,\s]+?)\s+"
    r"(?P<rest>Farbe:.*)$"
)
ARTLINE_FIELDS = [
    ("Farbe", r"Farbe:\s*(.+?)(?=\s+(?:Drücker|Stangengriffe|Sandgestrahlt):|$)"),
    ("Drücker", r"Drücker:\s*(.+?)(?=\s+(?:Farbe|Stangengriffe|Sandgestrahlt):|$)"),
    ("Stangengriffe", r"Stangengriffe:\s*(.+?)(?=\s+(?:Farbe|Drücker|Sandgestrahlt):|$)"),
    ("Sandgestrahlt", r"Sandgestrahlt:\s*(\d+)"),
]


def extract_artline(doc, catalogue_id):
    models, seen = [], set()
    for index in range(doc.page_count):
        page = doc[index]
        images = [
            (im[0], im[1], page.get_image_rects(im[0])[0])
            for im in page.get_images(full=True)
            if im[2] > 300 and page.get_image_rects(im[0])
        ]
        # Solo verticales: la puerta. Las fotos de ambiente de estos
        # pliegos son apaisadas y estaban ganando por tamaño.
        images = [i for i in images if i[2].height > 300 and i[2].height > i[2].width * 1.2]
        if not images:
            continue

        for block in page.get_text("blocks"):
            text = " ".join(block[4].split())
            # "/ inside" es la misma puerta vista por dentro.
            if "/ inside" in text or "/ wewnatrz" in text:
                continue
            match = ARTLINE_LABEL.match(text)
            if not match:
                continue

            name = f"{match.group('family')} {match.group('no').strip()}"
            if name in seen:
                continue
            seen.add(name)

            centre = block[0]
            best = min(images, key=lambda i: abs((i[2].x0 + i[2].x1) / 2 - centre))

            model_id = slug(name)
            save_image(
                doc, best[0], best[1],
                os.path.join(IMG_DIR, catalogue_id, f"{model_id}.jpg"),
            )

            specs = []
            for label, pattern in ARTLINE_FIELDS:
                found = re.search(pattern, match.group("rest"))
                if found:
                    specs.append({"label": label, "value": found.group(1).strip()})

            models.append(
                {
                    "id": model_id,
                    "catalogue": catalogue_id,
                    "name": name,
                    "family": match.group("family"),
                    "page": index + 1,
                    "image": f"/images/models/{catalogue_id}/{model_id}.jpg",
                    "specs": specs,
                }
            )
    return models


# ── 2. Außentüren: rejillas de diseños de panel ──────────────────

STATES = [
    "WASHINGTON", "ALASKA", "ARIZONA", "CALIFORNIA", "COLORADO", "FLORIDA",
    "HAWAII", "MONTANA", "MINNESOTA", "NEBRASKA", "NEWYORK", "NEWJERSEY",
    "TEXAS", "PENNSYLVANIA", "OHIO",
]
# Rótulo = mayúsculas y dígitos hasta la primera palabra normal
# ("Möglichkeit der Bestellung…" es una nota, no parte del nombre).
CAPS_RUN = re.compile(r"^([A-ZÄÖÜ0-9()*\s]+?)(?=[A-ZÄÖÜ][a-zäöüß])|^([A-ZÄÖÜ0-9()*\s]+)$")

AUSSEN_SECTIONS = [
    {"pages": range(11, 19), "family": "Aluminiumtüren", "material": "Aluminium"},
    {"pages": range(28, 32), "family": "PVC-Türen", "material": "PVC"},
]


def tidy_pattern_name(raw):
    match = CAPS_RUN.match(raw)
    caps = (match.group(1) or match.group(2)) if match else raw
    caps = caps.replace("(L)", "").replace("(R)", "").replace("(C)", "").replace("*", "")
    caps = caps.replace(" ", "")
    if not caps:
        return None, None

    family = next((s for s in STATES if caps.startswith(s)), None)
    if not family:
        return None, None

    rest = caps[len(family) :]
    number = re.match(r"\d+", rest)
    parts = [family.replace("NEWYORK", "NEW YORK").replace("NEWJERSEY", "NEW JERSEY")]
    if number:
        parts.append(number.group(0))
        rest = rest[number.end() :]
    for suffix in ("DEKORRAHMEN", "POCKET", "WOOD"):
        if rest.startswith(suffix):
            parts.append(suffix.capitalize())
            rest = rest[len(suffix) :]
    name = " ".join(parts).title().replace("Dekorrahmen", "Dekorrahmen")
    return name, family


# Nada declarado a mano en este catálogo.
#
# Aquí vivía el System MB-45 (kalt), el único sistema de interior de los
# diez catálogos, marcado con `category: "interior-doors"`. El dueño
# retiró esa gama en 2026-08 —no va a ofrecer puertas interiores— así
# que el pliego se cae con ella: dejarlo marcado habría devuelto la gama
# muerta en la siguiente extracción. La lista se queda por el mecanismo,
# que es el mismo que usa el Insektenschutz-Plisee.
AUSSEN_MANUAL = []


def extract_aussenturen(doc, catalogue_id):
    models, seen = [], set()
    for entry in AUSSEN_MANUAL:
        page = doc[entry["page"] - 1]
        wanted = [
            im for im in page.get_images(full=True) if (im[2], im[3]) == entry["image_px"]
        ]
        if wanted:
            save_image(
                doc, wanted[0][0], wanted[0][1],
                os.path.join(IMG_DIR, catalogue_id, f"{entry['id']}.jpg"),
            )
            models.append(
                {
                    "id": entry["id"],
                    "catalogue": catalogue_id,
                    "name": entry["name"],
                    "family": entry["family"],
                    "category": entry["category"],
                    "page": entry["page"],
                    "image": f"/images/models/{catalogue_id}/{entry['id']}.jpg",
                    "specs": entry["specs"],
                    "description": entry["description"],
                }
            )
        else:
            print(f"  · sin foto: {entry['name']}")
    for section in AUSSEN_SECTIONS:
        for index in section["pages"]:
            page = doc[index]
            images = [
                (im[0], im[1], page.get_image_rects(im[0])[0])
                for im in page.get_images(full=True)
                if im[2] > 200 and page.get_image_rects(im[0])
            ]
            images = [i for i in images if i[2].height > 200]
            if len(images) < 4:
                continue
            images.sort(key=lambda i: i[2].x0)

            columns = {}
            for word in page.get_text("words"):
                if not 450 < word[1] < 480:
                    continue
                centre = (word[0] + word[2]) / 2
                best = min(images, key=lambda i: abs((i[2].x0 + i[2].x1) / 2 - centre))
                columns.setdefault(best[0], []).append((round(word[1]), word[0], word[4], best))

            for xref, words in columns.items():
                words.sort(key=lambda w: (w[0], w[1]))
                raw = "".join(w[2] for w in words)
                name, family = tidy_pattern_name(raw)
                if not name:
                    continue
                model_id = slug(f"{section['material']}-{name}")
                if model_id in seen:
                    continue
                seen.add(model_id)

                image = words[0][3]
                save_image(
                    doc, image[0], image[1],
                    os.path.join(IMG_DIR, catalogue_id, f"{model_id}.jpg"),
                )

                specs = [{"label": "Material", "value": section["material"]}]
                sides = [s for s in ("(L)", "(R)", "(C)") if s in raw]
                if sides:
                    specs.append(
                        {
                            "label": "Musterposition",
                            "value": ", ".join(
                                {"(L)": "Left", "(R)": "Right", "(C)": "Center"}[s] for s in sides
                            ),
                        }
                    )
                if "spiegelverkehrt" in raw:
                    specs.append(
                        {"label": "Hinweis", "value": "Bestellung in spiegelverkehrt möglich"}
                    )

                models.append(
                    {
                        "id": model_id,
                        "catalogue": catalogue_id,
                        "name": name,
                        "family": section["family"],
                        "page": index + 1,
                        "image": f"/images/models/{catalogue_id}/{model_id}.jpg",
                        "specs": specs,
                    }
                )
    return models


# ── 3. Rollläden, Raffstoren, Insektenschutz ─────────────────────
# Una sección por sistema: portadilla, páginas de detalle y una tabla
# de especificación. Se declaran a mano porque son cinco y el catálogo
# no las rotula de forma regular.

SHUTTER_SECTIONS = [
    # `page` es la portadilla —la que enlaza el botón "abrir por su
    # página"— y `image_page` la del corte de producto, que es lo que
    # hay que enseñar: las portadillas son fotos de ambiente.
    #
    # `image_px` identifica cuál de las fotos de esa página es el
    # producto. Va por tamaño en píxeles del original y no por xref
    # (que cambia cada vez que se vuelve a guardar el PDF) ni por "la
    # más grande" (que en tres de las cinco secciones es la foto de
    # ambiente a sangre, no el corte).
    {"name": "Aufsatzrollladen RN", "family": "Rollladensysteme", "page": 4, "image_page": 5, "image_px": (705, 705), "spec_page": 6},
    {"name": "Aufsatzrollladen RS", "family": "Rollladensysteme", "page": 7, "image_page": 8, "image_px": (460, 391), "spec_page": 9},
    {"name": "Vorsatzrollläden", "family": "Rollladensysteme", "page": 10, "image_page": 11, "image_px": (682, 714), "spec_page": 12},
    {"name": "Raffstoren", "family": "Raffstoren", "page": 15, "image_page": 15, "image_px": (725, 440), "spec_page": None},
    # El plisado va marcado con su gama: el dueño decidió (2026-08) que
    # es una mosquitera y se enseña en insect-screens, no entre las
    # persianas donde venía impreso. El botón del PDF sigue abriendo su
    # página de este catálogo.
    {"name": "Insektenschutz-Plisee", "family": "Insektenschutz", "page": 17, "image_page": 17, "image_px": (705, 705), "spec_page": None, "category": "insect-screens"},
]


def extract_shutters(doc, catalogue_id):
    models = []
    for section in SHUTTER_SECTIONS:
        page = doc[section["page"] - 1]
        image_page = doc[section["image_page"] - 1]
        wanted = [
            im for im in image_page.get_images(full=True) if (im[2], im[3]) == section["image_px"]
        ]
        if not wanted:
            print(f"  · sin foto: {section['name']}")
            continue

        model_id = slug(section["name"])
        save_image(
            doc, wanted[0][0], wanted[0][1],
            os.path.join(IMG_DIR, catalogue_id, f"{model_id}.jpg"),
        )

        # La "technische Spezifikation" de este catálogo no es una
        # tabla: son frases sueltas describiendo la construcción. Se
        # guardan como specs sin etiqueta, igual que las viñetas de los
        # otros catálogos de persianas.
        specs = []
        if section["spec_page"]:
            spec_page = doc[section["spec_page"] - 1]
            for block in spec_page.get_text("blocks"):
                text = " ".join(block[4].split())
                if not 40 < len(text) < 260 or text.startswith("*"):
                    continue
                if len(re.findall(r"\d", text)) > len(text) * 0.25:
                    continue
                specs.append({"label": "", "value": text})

        # Descripción: el párrafo más largo de la portadilla.
        description = ""
        for block in page.get_text("blocks"):
            text = " ".join(block[4].split())
            if len(text) > len(description) and len(re.findall(r"\d", text)) < len(text) * 0.3:
                description = text

        models.append(
            {
                "id": model_id,
                "catalogue": catalogue_id,
                "name": section["name"],
                "family": section["family"],
                "page": section["page"],
                "image": f"/images/models/{catalogue_id}/{model_id}.jpg",
                "specs": specs[:10],
                **({"description": description} if len(description) > 60 else {}),
                **({"category": section["category"]} if "category" in section else {}),
            }
        )
    return models


JOBS = [
    ("d-art-line", "d-art-line-turenkollektion.pdf", extract_artline),
    ("aussenturen", "aussenturen-produktkatalog.pdf", extract_aussenturen),
    ("rollladen-drutex", "rollladen-raffstoren-insektenschutz.pdf", extract_shutters),
]


def main():
    with open(DATA_FILE, encoding="utf-8") as f:
        source = f.read()
    start = source.index("CatalogueModel[] = ") + len("CatalogueModel[] = ")
    end = source.rindex("];") + 1
    header, existing = source[:start], json.loads(source[start:end])
    kept = [m for m in existing if m["catalogue"] not in OURS]

    fresh = []
    for catalogue_id, filename, extractor in JOBS:
        doc = fitz.open(os.path.join(PDF_DIR, filename))
        models = extractor(doc, catalogue_id)
        doc.close()
        print(f"{catalogue_id}: {len(models)} modelos")
        fresh += models

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(header)
        f.write(json.dumps(kept + fresh, ensure_ascii=False, indent=2))
        f.write(";\n")
    print(f"\n✓ {len(kept)} + {len(fresh)} = {len(kept) + len(fresh)} modelos en total")


if __name__ == "__main__":
    main()
