"""
Deja publicables los dos catálogos de la gama Tore (2026-08).

Mismo criterio que persianas e IGLO, y por la misma razón: el
intermediario que los imprime vende también directo al cliente final en
Alemania. Sale todo lo que es una RUTA hacia él —logotipo de portada,
nombre en el texto, webs, dirección, sus páginas de autopromoción y las
de sus herramientas comerciales (benefit, eko4u)— y se queda todo lo que
es PRODUCTO.

Además, aquí se RECOMPRIMEN las fotos: los originales pesan 41 y 85 MB
—el de vallas hizo saltar el aviso de 50 MB de GitHub— porque traen
renders a resolución de imprenta. Para pantalla, 1600 px de ancho
sobran, y el visitante no tiene por qué descargar 85 MB.

Entrada:   source-catalogues/   (originales, fuera de public/)
Salida:    public/pdf/catalogues/ + portada en public/images/catalogues/

Ejecutar:  python3 scripts/prepare_eko_gates.py
Requiere:  pip install pymupdf pillow
"""

import io
import os

import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "source-catalogues")
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")
COVER_DIR = os.path.join(ROOT, "public/images/catalogues")
MARK_WHITE = os.path.join(ROOT, "public/images/brand/kamika-mark-white.png")
MARK_RATIO = 232 / 721

# Texto que es una ruta de salida, en cualquier página. La frase con
# "von" va ANTES que el nombre solo: si no, quedaría un "von" cojo.
ROUTES = [
    "von Eko-Okna",
    "Eko-Okna S.A.",
    "Eko-Okna",
    "benefit.ekookna.com",
    "www.ekookna.com",
    "www.ekookna.de",
    "ekookna.com",
    "ekookna.de",
    "eko4u.com",
    "ul. Spacerowa 4",
    "47-480 Kornica",
]

CATALOGUES = [
    {
        "id": "garagentore",
        "src": "eko_garagentore_de.pdf",
        "dst": "garagentore-produktkatalog.pdf",
        "title": "Garagentore Produktkatalog",
        # Logotipo de portada: 7 glifos vectoriales blancos, medidos
        # sobre el propio PDF.
        "cover_logo": (322, 157, 417, 212),
        "cover_mark": {"center": (369.5, 184.5), "width": 120},
        # 4-7 "Über die Firma" (la fábrica del intermediario y su
        # garantía), 84-87 sus herramientas comerciales (eko4u, benefit)
        # y su página de logotipo, 88 contraportada con dirección.
        "drop_sheets": [4, 5, 6, 7, 84, 85, 86, 87, 88],
    },
    {
        "id": "grundstueckszaeune",
        "src": "eko_grundstueckszaeune_de.pdf",
        "dst": "grundstueckszaeune-katalog.pdf",
        "title": "Grundstückszäune — Zäune, Tore und Pforten",
        "cover_logo": (250, 144, 345, 199),
        "cover_mark": {"center": (297.5, 171.5), "width": 120},
        # 63 en blanco, 64 contraportada con dirección.
        "drop_sheets": [63, 64],
    },
]


def shrink_images(doc, max_width=1600, quality=78):
    """Fotos a resolución de pantalla. Es lo que convierte 85 MB en algo
    que se puede ofrecer como descarga sin pedir perdón."""
    done = 0
    seen = set()
    for page in doc:
        for im in page.get_images(full=True):
            xref = im[0]
            if xref in seen:
                continue
            seen.add(xref)
            try:
                raw = doc.extract_image(xref)
                image = Image.open(io.BytesIO(raw["image"]))
                if image.width <= max_width and raw["ext"] in ("jpeg", "jpg"):
                    continue
                if image.width > max_width:
                    ratio = max_width / image.width
                    image = image.resize((max_width, round(image.height * ratio)), Image.LANCZOS)
                buffer = io.BytesIO()
                image.convert("RGB").save(buffer, format="JPEG", quality=quality, optimize=True)
                # Solo si de verdad adelgaza: recomprimir un JPEG ya
                # pequeño lo estropea a cambio de nada. Y ojo:
                # `replace_image` vive en la PÁGINA, no en el documento —
                # llamarlo en el documento fue un AttributeError que un
                # try/except mudo convirtió en "0 fotos recomprimidas".
                if len(buffer.getvalue()) < len(raw["image"]) * 0.9:
                    page.replace_image(xref, stream=buffer.getvalue())
                    done += 1
            except Exception as error:
                print(f"  · imagen {xref} sin recomprimir: {error}")
    return done


def clean(catalogue):
    doc = fitz.open(os.path.join(SRC_DIR, catalogue["src"]))

    # ── 1. Portada: fuera su logotipo, dentro la marca de Kamika ────
    cover = doc[0]
    cover.add_redact_annot(fitz.Rect(*catalogue["cover_logo"]))
    cover.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
    )
    mark = catalogue["cover_mark"]
    width = mark["width"]
    height = width * MARK_RATIO
    x, y = mark["center"]
    cover.insert_image(
        fitz.Rect(x - width / 2, y - height / 2, x + width / 2, y + height / 2),
        filename=MARK_WHITE,
    )

    # ── 2. Rutas de texto en todas las páginas ──────────────────────
    hits = 0
    for page in doc:
        marked = []
        for needle in ROUTES:
            for rect in page.search_for(needle):
                if any(rect in m for m in marked):
                    continue  # ya cubierto por una aguja más larga
                page.add_redact_annot(rect + (-1, -1, 1, 1))
                marked.append(rect)
                hits += 1
        if marked:
            page.apply_redactions(
                images=fitz.PDF_REDACT_IMAGE_NONE,
                graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
            )

    # ── 3. Páginas que solo venden al intermediario ─────────────────
    for sheet in sorted(catalogue["drop_sheets"], reverse=True):
        doc.delete_page(sheet - 1)

    # ── 4. Fotos a tamaño de pantalla ───────────────────────────────
    shrunk = shrink_images(doc)

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

    front = fitz.open(out)[0]
    front.get_pixmap(dpi=150).save(os.path.join(COVER_DIR, f"{catalogue['id']}-cover.jpg"))

    size = os.path.getsize(out) / 1048576
    print(
        f"✓ {catalogue['dst']}: {doc.page_count} hojas, {hits} redacciones, "
        f"{shrunk} fotos recomprimidas, {size:.1f} MB"
    )
    doc.close()


if __name__ == "__main__":
    for catalogue in CATALOGUES:
        clean(catalogue)
