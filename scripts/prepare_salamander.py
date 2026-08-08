"""
Deja publicable el folleto Salamander que manda Eko-Okna, y saca de él
las imágenes de sistema.

Mismo criterio que con Drutex y con los catálogos de persianas:
Eko-Okna vende también directamente al cliente final en Alemania, así
que fuera todo lo que es una RUTA hacia ellos —su logotipo de portada,
su web, el QR de "ver todos los accesorios" y su contraportada— y se
queda todo lo que es PRODUCTO.

Lo que NO se toca: la marca Salamander. Salamander es el fabricante de
los perfiles y en esta web se le acredita igual que a Aluplast o VEKA;
el que se quita es el intermediario que compite por el mismo cliente.

El folleto está en polaco porque así existe (el dueño lo confirmó:
"así me lo han enviado"). Los valores son números y clases, que no
tienen idioma; las descripciones de la web se redactan aparte en la
capa de datos, como con cualquier fabricante.

Además del PDF limpio salen:
  · la portada para el expositor (página 1 tal cual, que ya es vertical)
  · una imagen por sistema, recortada de la banda central de su página
    de presentación (cada página es UNA foto de fondo con el texto
    vectorial encima: no hay imagen suelta que extraer)

Entrada:   source-catalogues/Ulotka_Salamander_PL.pdf
Salida:    public/pdf/catalogues/salamander-systeme.pdf
           public/images/catalogues/salamander-systeme-cover.jpg
           public/images/manufacturers/salamander-*.jpg

Ejecutar:  python3 scripts/prepare_salamander.py
Requiere:  pip install pymupdf
"""

import os

import fitz

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "source-catalogues/Ulotka_Salamander_PL.pdf")
DST = os.path.join(ROOT, "public/pdf/catalogues/salamander-systeme.pdf")
COVER = os.path.join(ROOT, "public/images/catalogues/salamander-systeme-cover.jpg")
MFR_DIR = os.path.join(ROOT, "public/images/manufacturers")
MARK_WHITE = os.path.join(ROOT, "public/images/brand/kamika-mark-white.png")

# Texto que es una ruta de salida. "Zobacz wszystkie…" es el pie del QR
# de la página de accesorios: sin código no significa nada.
ROUTES = [
    "www.ekookna.com",
    "ekookna.com",
    "Eko-Okna S.A.",
    "Zobacz wszystkie",
    "dodatki na",
]

# El logotipo de la portada son 7 trazos vectoriales blancos; medido
# sobre el propio PDF, no a ojo.
COVER_LOGO = (71, 56, 209, 128)

# El QR de la página de accesorios (imagen de 105x107 px abajo a la
# izquierda). Se localiza por tamaño y posición, no por xref, que
# cambia si el proveedor reexporta.
QR_PAGE, QR_AT = 21, (222, 754)

DROP_PAGES = [22, 24]  # 22 en blanco; 24 es la ficha de Eko-Okna

# Banda central de cada página de presentación, donde va el render del
# sistema. Mismo recorte para todas: el maquetado es idéntico.
SYSTEM_IMAGES = {
    4: "salamander-greenevolution-flex.jpg",
    8: "salamander-bluevolution-92.jpg",
    10: "salamander-evolutiondrive-sf.jpg",
    12: "salamander-evolutiondrive-plus.jpg",
    14: "salamander-evolutiondrive-82-hst.jpg",
}
BAND = (30, 248, 565, 692)


def main():
    doc = fitz.open(SRC)

    # ── Imágenes de sistema, ANTES de tocar nada ─────────────────
    for pno, filename in SYSTEM_IMAGES.items():
        page = doc[pno - 1]
        pix = page.get_pixmap(matrix=fitz.Matrix(2.2, 2.2), clip=fitz.Rect(*BAND))
        pix.save(os.path.join(MFR_DIR, filename), jpg_quality=88)
        print(f"  · {filename}")

    # ── Portada: fuera su logotipo, dentro el de Kamika ──────────
    cover = doc[0]
    cover.add_redact_annot(fitz.Rect(*COVER_LOGO))
    cover.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
    )
    width = 128
    height = width * 232 / 721
    x, y = (COVER_LOGO[0] + COVER_LOGO[2]) / 2, (COVER_LOGO[1] + COVER_LOGO[3]) / 2
    cover.insert_image(
        fitz.Rect(x - width / 2, y - height / 2, x + width / 2, y + height / 2),
        filename=MARK_WHITE,
    )

    # ── QR y rutas de texto ──────────────────────────────────────
    hits = 0
    qr_page = doc[QR_PAGE - 1]
    for image in qr_page.get_images(full=True):
        for rect in qr_page.get_image_rects(image[0]):
            if abs(rect.x0 - QR_AT[0]) < 6 and abs(rect.y0 - QR_AT[1]) < 6:
                qr_page.delete_image(image[0])
                hits += 1
    for page in doc:
        for needle in ROUTES:
            for rect in page.search_for(needle):
                page.add_redact_annot(rect + (-1, -1, 1, 1))
                hits += 1
        page.apply_redactions(
            images=fitz.PDF_REDACT_IMAGE_NONE,
            graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
        )

    # ── Contraportada y página en blanco ─────────────────────────
    for pno in sorted(DROP_PAGES, reverse=True):
        doc.delete_page(pno - 1)

    doc.set_metadata(
        {
            "title": "Salamander Fenster- und Schiebesysteme",
            "author": "Kamika Bauelemente",
            "producer": "",
            "creator": "",
        }
    )
    doc.del_xml_metadata()
    doc.save(DST, garbage=4, deflate=True)

    # ── Portada del expositor: la página 1, que ya es vertical ───
    check = fitz.open(DST)
    front = check[0]
    front.get_pixmap(matrix=fitz.Matrix(900 / front.rect.width, 900 / front.rect.width)).save(
        COVER, jpg_quality=88
    )

    left = [
        i + 1
        for i in range(check.page_count)
        if any(k in check[i].get_text().lower() for k in ["ekookna", "eko-okna", "kornice", "spacerowa"])
    ]
    size = os.path.getsize(DST) / 1048576
    print(
        f"✓ salamander-systeme.pdf  {check.page_count} pp, {size:.1f} MB "
        f"| {hits} rótulos borrados | rutas restantes: {left or 'ninguna'}"
    )


if __name__ == "__main__":
    main()
