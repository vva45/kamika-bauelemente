"""
Deja publicables los dos catálogos IGLO.

Mismo criterio que con los otros catálogos del mismo fabricante, y por la
misma razón: fabrica, pero también vende directamente al cliente final en
Alemania —su web va impresa en cada página— así que publicarlo tal cual
sería regalarle el cliente a mitad de camino. Sale todo lo que es una
RUTA hacia él (logotipo, web, dirección, teléfono, el escudo del club que
patrocina y las páginas que venden sus otras gamas) y se queda todo lo
que es PRODUCTO, que es a lo que ha venido el visitante.

El dueño lo pidió con estas palabras: "make sure the Drutex name and the
Bayern Munich logo are not visible". Donde el logotipo iba sobre banda
oscura entra la marca de Kamika, del mismo tamaño y en su sitio; donde
iba suelto en un margen, se va y ya.

Lo que NO se toca: los nombres de sistema (IGLO EDGE, IGLO-HS…). Son el
producto, no la marca del fabricante, y sin ellos el catálogo no sirve
para nada.

Entrada:   source-catalogues/   (originales, fuera de public/)
Salida:    public/pdf/catalogues/ + portada en public/images/catalogues/

Ejecutar:  python3 scripts/prepare_iglo.py
Requiere:  pip install pymupdf
"""

import os

import fitz

from prepare_drutex import ROUTES, logo_boxes, qr_codes

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "source-catalogues")
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")
COVER_DIR = os.path.join(ROOT, "public/images/catalogues")
MARK_WHITE = os.path.join(ROOT, "public/images/brand/kamika-mark-white.png")
MARK_BLACK = os.path.join(ROOT, "public/images/brand/kamika-mark.png")

CATALOGUES = [
    {
        "id": "iglo-fenster",
        "src": "iglo_2_drutex_de.pdf",
        "dst": "iglo-fenster-terrassensysteme.pdf",
        "title": "IGLO — PVC-Fenster und Terrassensysteme",
        # La portada es un pliego: a la izquierda va la CONTRAportada del
        # fabricante (dirección, teléfono, patrocinio). Se recorta a la
        # portada de verdad —de este doblez a la derecha— en vez de
        # acribillarla a redacciones y dejarla llena de huecos.
        "cover_fold": 861.7,
        # Medidos sobre los vectores del propio PDF: logotipo grande,
        # escudo del patrocinador con su rótulo, y el logotipo vertical
        # del lomo.
        "cover_logos": [(905, 60, 1098, 116), (1578, 6, 1700, 100), (842, 505, 862, 570)],
        "cover_mark": {"center": (1000, 88), "width": 200},
        # Páginas impresas 90-96: venta cruzada de sus otras gamas y
        # ficha de empresa con la flota de camiones rotulada.
        "drop_sheets": [46, 47, 48, 49],
        # Códigos QR que el detector general no reconoce: aquí no van
        # sobre el cuadro blanco de rigor, sino sueltos sobre la banda
        # oscura. Llevan a su configurador, así que se van igual. En la
        # hoja 41 se va con él la frase que remite a su web; en la 40 el
        # texto de al lado es producto y se queda.
        "extras": [
            {"sheets": [40, 41], "boxes": [(36, 490, 83, 537)]},
            {"sheets": [41], "boxes": [(88, 486, 300, 516)]},
        ],
    },
    {
        "id": "iglo-terrassen",
        "src": "iglo_terrassensysteme_de.pdf",
        "dst": "iglo-terrassensysteme.pdf",
        "title": "IGLO Terrassensysteme",
        "cover_fold": 595.275,
        "cover_logos": [(657, 37, 850, 93), (1083, 8, 1160, 95)],
        "cover_mark": {"center": (753, 65), "width": 200},
        # Última hoja: cifras de la fábrica del proveedor.
        "drop_sheets": [6],
        # El logotipo del interior es negro sobre blanco y algo mayor
        # que el de los otros catálogos, así que el detector por forma
        # no lo pilla: va a mano, con la marca de Kamika en su hueco.
        # Y el QR de "Profil der Klasse A" lleva a su web.
        "extras": [
            {
                "sheets": [2, 3, 4, 5],
                "boxes": [(30, 14, 158, 58)],
                "mark": {"file": MARK_BLACK, "center": (92, 33), "width": 120},
            },
            {"sheets": [2, 3, 4], "boxes": [(1028, 652, 1116, 732)]},
            {"sheets": [5], "boxes": [(630, 744, 702, 815)]},
        ],
    },
]

# Proporción del logotipo de Kamika, para no deformarlo al colocarlo.
MARK_RATIO = 232 / 721


def place_mark(page, center, width, file=MARK_WHITE):
    height = width * MARK_RATIO
    x, y = center
    page.insert_image(
        fitz.Rect(x - width / 2, y - height / 2, x + width / 2, y + height / 2),
        filename=file,
    )


def clean(catalogue):
    doc = fitz.open(os.path.join(SRC_DIR, catalogue["src"]))

    # ── 1. Portada, a mano: los vectores del logotipo y del escudo ──
    cover = doc[0]
    for box in catalogue["cover_logos"]:
        cover.add_redact_annot(fitz.Rect(*box))
    for needle in ("Official Partner of", "Official Partner of FC Bayern"):
        for rect in cover.search_for(needle):
            cover.add_redact_annot(rect + (-1, -1, 1, 1))
    cover.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
    )
    place_mark(cover, catalogue["cover_mark"]["center"], catalogue["cover_mark"]["width"])
    # El recorte se apoya en el propio mediabox: escribir el borde a
    # mano da un rectángulo un pelo mayor por redondeo y PyMuPDF lo
    # rechaza entero.
    page_box = cover.mediabox
    cover.set_cropbox(
        fitz.Rect(catalogue["cover_fold"], page_box.y0, page_box.x1, page_box.y1)
    )

    # ── 2. El resto de páginas ──────────────────────────────────────
    hits, marks, extra_marks = 0, [], []
    for index, page in enumerate(doc):
        for needle in ROUTES:
            for rect in page.search_for(needle):
                page.add_redact_annot(rect + (-1, -1, 1, 1))
                hits += 1
        if index > 0:
            for box, on_dark in logo_boxes(page):
                page.add_redact_annot(box + (-2, -3, 2, 3))
                hits += 1
                if on_dark:
                    marks.append((index, box))
            for box, xrefs in qr_codes(page):
                for xref in xrefs:
                    page.delete_image(xref)
                page.add_redact_annot(box + (-3, -3, 3, 3))
                hits += 1
        for extra in catalogue.get("extras", []):
            if index + 1 in extra["sheets"]:
                for box in extra["boxes"]:
                    page.add_redact_annot(fitz.Rect(*box))
                    hits += 1
                if "mark" in extra:
                    extra_marks.append((index, extra["mark"]))
        # También en la portada: allí ya se aplicaron las suyas, pero
        # las rutas de texto se marcan en este bucle y una redacción
        # anotada y sin aplicar se vería en el PDF publicado.
        page.apply_redactions(
            images=fitz.PDF_REDACT_IMAGE_NONE,
            graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
        )

    for index, box in marks:
        place_mark(doc[index], ((box.x0 + box.x1) / 2, (box.y0 + box.y1) / 2), box.width)
    for index, mark in extra_marks:
        place_mark(doc[index], mark["center"], mark["width"], mark["file"])

    # ── 3. Hojas que solo venden al fabricante ──────────────────────
    for sheet in sorted(catalogue["drop_sheets"], reverse=True):
        doc.delete_page(sheet - 1)

    doc.set_metadata(
        {
            "title": catalogue["title"],
            "author": "Kamika Bauelemente",
            "subject": "Produktkatalog",
            "keywords": "",
            "creator": "",
            "producer": "",
        }
    )
    doc.set_toc([])

    out = os.path.join(PDF_DIR, catalogue["dst"])
    doc.save(out, garbage=4, deflate=True, clean=True)

    # ── 4. Portada como imagen para la tarjeta del catálogo ─────────
    # Sin `clip`: tras recortar, la página ya ES la portada y sus
    # coordenadas vuelven a empezar en cero. Pasarle el cropbox como
    # recorte pide un trozo que cae fuera y devuelve un mapa vacío —el
    # error que suelta entonces habla de JPEG y despista una hora.
    front = fitz.open(out)[0]
    front.get_pixmap(dpi=150).save(os.path.join(COVER_DIR, f"{catalogue['id']}-cover.jpg"))

    size = os.path.getsize(out) / 1024 / 1024
    print(
        f"✓ {catalogue['dst']}: {doc.page_count} hojas, {hits} redacciones, "
        f"{len(marks)} marcas de Kamika, {size:.1f} MB"
    )
    doc.close()


if __name__ == "__main__":
    for catalogue in CATALOGUES:
        clean(catalogue)
