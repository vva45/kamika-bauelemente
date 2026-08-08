"""
Deja los tres catálogos de Drutex publicables en la web de Kamika.

Mismo criterio que con los de persianas, y por la misma razón: Drutex
fabrica, pero también vende directamente al cliente final en Alemania
(su web está impresa en cada página). Publicar su catálogo tal cual
sería regalarle el cliente a mitad de camino. Así que sale de aquí todo
lo que es una RUTA hacia ellos —logotipo de portada, web, dirección,
teléfono, patrocinios y las páginas de venta cruzada de sus otros
productos— y se queda todo lo que es PRODUCTO, que es lo que el
visitante ha venido a ver.

Lo que NO se toca: el nombre del fabricante dentro de un texto técnico.
Eso es atribución honesta y no lleva a ninguna parte.

Entrada:   source-catalogues/  (fuera de public/, sin tratar)
Salida:    public/pdf/catalogues/ + su portada en images/catalogues/

Ejecutar:  python3 scripts/prepare_drutex.py
Requiere:  pip install pymupdf
"""

import os
import re

import fitz

# El logotipo no es texto: son letras dibujadas a mano (paths). Por eso
# `search_for("DRUTEX")` no lo encuentra y hay que reconocerlo por su
# forma. La firma es siempre la misma: la "D" grande (21x25) seguida de
# cinco letras de 10x12 y, debajo, la coletilla en tipo diminuto. Va en
# blanco sobre la banda negra de cada portadilla y en negro arriba a la
# derecha, ahí medio salido de la página (de ahí la "D" suelta que se
# veía en las páginas interiores).
LOGO_D = (19, 23, 23, 28)  # ancho mín/máx, alto mín/máx de la "D"
LOGO_REACH = 145  # hasta dónde llegan las letras a su derecha

# Pie de los códigos QR, en versalitas y siempre pegado al código.
CAPTION = re.compile(r"^(MEHR|MUSTER|KONSTRUKTIONEN|ZUBEHÖR|KÄMPFER|FARBEN)$", re.I)


def logo_boxes(page):
    draws = page.get_drawings()
    found = []
    for anchor in draws:
        rect = anchor["rect"]
        if not (LOGO_D[0] <= rect.width <= LOGO_D[1] and LOGO_D[2] <= rect.height <= LOGO_D[3]):
            continue
        fill = anchor.get("fill")
        box, members = fitz.Rect(rect), 0
        for other in draws:
            near = other["rect"]
            if other.get("fill") != fill or near.width > 40:
                continue
            if rect.x0 - 3 <= near.x0 <= rect.x0 + LOGO_REACH and rect.y0 - 8 <= near.y0 <= rect.y1 + 32:
                box |= near
                members += 1
        # Una letra suelta no es un logotipo… salvo arriba a la derecha,
        # donde el logotipo va medio fuera de la página y de él solo
        # queda dibujada la "D". Ahí sí: es la marca, recortada.
        corner = rect.x0 > page.rect.width - 120 and rect.y1 < 140
        whole = members >= 10 and box.width > 60
        if whole or corner:
            # Solo se sustituye por la marca de Kamika el logotipo
            # entero de la banda oscura; el trozo del margen se va y ya.
            found.append((box, whole and fill == (1.0, 1.0, 1.0)))
    return found


def qr_codes(page):
    """
    Los QR ('MEHR MUSTER', 'MEHR KONSTRUKTIONEN'…) llevan al
    configurador del fabricante, así que son una ruta de salida como
    cualquier otra. Se reconocen por el cuadrado blanco de la zona de
    silencio —52-64 pt, cuadrado perfecto— con los cientos de módulos
    negros dibujados dentro. En algún sitio el código es un mapa de
    bits en vez de vectores, y por eso también se miran las imágenes.

    Devuelve (cuadro, xrefs) para poder quitar primero la imagen del
    código —si la hay— y después el cuadro blanco que queda debajo.
    """
    draws = page.get_drawings()
    white = [
        d["rect"]
        for d in draws
        if 52 <= d["rect"].width <= 64
        and abs(d["rect"].width - d["rect"].height) < 4
        and d.get("fill") == (1.0, 1.0, 1.0)
    ]
    # El código en sí: o cientos de módulos diminutos dibujados uno a
    # uno, o un único cuadrado negro (cuando va rasterizado encima).
    modules = [
        d["rect"]
        for d in draws
        if d["rect"].width < 14 and d.get("fill") == (0.0, 0.0, 0.0)
    ]
    solid = [
        d["rect"]
        for d in draws
        if 42 <= d["rect"].width <= 52
        and abs(d["rect"].width - d["rect"].height) < 4
        and d.get("fill") == (0.0, 0.0, 0.0)
    ]
    found = []
    for box in white:
        xrefs = [
            im[0]
            for im in page.get_images(full=True)
            for rect in page.get_image_rects(im[0])[:1]
            if box.intersects(rect) and rect.width < box.width * 1.4
        ]
        inside = sum(1 for m in modules if box.contains(m))
        if xrefs or inside >= 40 or any(box.contains(b) and b != box for b in solid):
            found.append((box, xrefs))
    return found

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Los originales viven FUERA de public/: llevan todavía el logotipo,
# la dirección y los QR del fabricante y no se pueden servir.
SRC_DIR = os.path.join(ROOT, "source-catalogues")
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")
MARK_WHITE = os.path.join(ROOT, "public/images/brand/kamika-mark-white.png")
MARK_BLACK = os.path.join(ROOT, "public/images/brand/kamika-mark.png")
COVER_DIR = os.path.join(ROOT, "public/images/catalogues")

# Texto que es una ruta de salida, en cualquier página.
ROUTES = [
    "www.drutex.de",
    "drutex.de",
    "DRUTEX",
    "Drutex",
    "Official Partner of FC Bayern",
    "Official Partner of",
    "Offizieller Partner des FC Bayern",
    "ul. Leszka Gierszewskiego 1, 77-100 Bytów",
    "+48 59 822 91 01",
    "SINCE 1985",
]

CATALOGUES = [
    {
        "id": "d-art-line",
        "src": "artline_drutex_entrance_doors.pdf",
        "dst": "d-art-line-turenkollektion.pdf",
        "title": "D-ART LINE Türenkollektion",
        # Portada de una sola página: el logotipo son vectores blancos
        # en la esquina superior izquierda.
        "cover_logos": [(79, 55, 241, 104)],
        "cover_mark": {"file": MARK_WHITE, "center": (160, 80), "width": 150},
        "crop_cover": None,
        # Contraportada: solo web y patrocinio.
        "drop_pages": [25],
    },
    {
        "id": "aussenturen",
        "src": "drutex_doors_entrada.pdf",
        "dst": "aussenturen-produktkatalog.pdf",
        "title": "Außentüren Produktkatalog",
        # Medidos sobre los vectores del propio PDF, no a ojo: el
        # logotipo grande, el escudo del patrocinador y el logotipo
        # vertical del canto izquierdo del frente.
        "cover_logos": [(1596, 12, 1685, 96), (906, 58, 1102, 117), (843, 493, 868, 568)],
        "cover_mark": {"file": MARK_WHITE, "center": (980, 77), "width": 210},
        # La portada es un pliego: a la izquierda va la CONTRAportada del
        # fabricante —su dirección, su teléfono, sus patrocinios—. Se
        # recorta la página a la portada de verdad en vez de acribillarla
        # a redacciones y dejarla llena de huecos.
        "crop_cover": (854, 0, 1708.5, 595.276),
        # Venta cruzada de sus otros productos y ficha de empresa.
        "drop_pages": [57, 58],
    },
    {
        "id": "rollladen-drutex",
        "src": "rolety_de_drutex.pdf",
        "dst": "rollladen-raffstoren-insektenschutz.pdf",
        "title": "Rollläden, Raffstoren, Insektenschutz",
        "cover_logos": [(1572, 10, 1665, 98), (903, 60, 1098, 118)],
        "cover_mark": {"file": MARK_WHITE, "center": (980, 77), "width": 210},
        "crop_cover": (842, 0, 1683.78, 595.276),
        "drop_pages": [22, 23, 24],
    },
]


def clean(catalogue):
    doc = fitz.open(os.path.join(SRC_DIR, catalogue["src"]))

    # ── 1. Portada: fuera su logotipo, dentro el de Kamika ───────
    cover = doc[0]
    for box in catalogue["cover_logos"]:
        cover.add_redact_annot(fitz.Rect(*box))
    cover.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
    )
    mark = catalogue["cover_mark"]
    width = mark["width"]
    height = width * 232 / 721
    x, y = mark["center"]
    cover.insert_image(
        fitz.Rect(x - width / 2, y - height / 2, x + width / 2, y + height / 2),
        filename=mark["file"],
    )
    if catalogue["crop_cover"]:
        cover.set_cropbox(fitz.Rect(*catalogue["crop_cover"]))

    # ── 2. Rutas de salida en todas las páginas ──────────────────
    hits = 0
    marks = []
    for index, page in enumerate(doc):
        for needle in ROUTES:
            for rect in page.search_for(needle):
                page.add_redact_annot(rect + (-1, -1, 1, 1))
                hits += 1
        if index > 0:  # la portada ya se ha tratado arriba, a mano
            for box, on_dark in logo_boxes(page):
                page.add_redact_annot(box + (-2, -3, 2, 3))
                hits += 1
                if on_dark:
                    marks.append((index, box))
            for box, xrefs in qr_codes(page):
                # Primero el mapa de bits del código —una redacción no
                # lo tocaría sin destrozar de paso la banda negra sobre
                # la que se apoya—, luego el cuadro blanco y su pie
                # ("MEHR MUSTER"), que sin código no significa nada. El
                # pie va unas veces debajo y otras encima, así que se
                # busca alrededor en vez de fiarse de un margen fijo.
                for xref in xrefs:
                    page.delete_image(xref)
                page.add_redact_annot(box + (-3, -3, 3, 3))
                for word in page.get_text("words", clip=box + (-20, -40, 120, 46)):
                    if CAPTION.match(word[4]):
                        page.add_redact_annot(fitz.Rect(word[:4]) + (-1, -1, 1, 1))
                hits += 1
        page.apply_redactions(
            images=fitz.PDF_REDACT_IMAGE_NONE,
            graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
        )

    # El hueco que deja el logotipo en la banda negra de cada portadilla
    # es nuestro: va la marca de Kamika, del mismo tamaño y en su sitio.
    for index, box in marks:
        width = box.width
        height = width * 232 / 721
        x, y = (box.x0 + box.x1) / 2, (box.y0 + box.y1) / 2
        doc[index].insert_image(
            fitz.Rect(x - width / 2, y - height / 2, x + width / 2, y + height / 2),
            filename=MARK_WHITE,
        )

    # ── 3. Páginas que solo venden al fabricante ─────────────────
    for index in sorted((p - 1 for p in catalogue["drop_pages"]), reverse=True):
        doc.delete_page(index)

    doc.set_metadata(
        {
            "title": catalogue["title"],
            "author": "Kamika Bauelemente",
            "producer": "",
            "creator": "",
        }
    )
    doc.del_xml_metadata()

    out = os.path.join(PDF_DIR, catalogue["dst"])
    doc.save(out, garbage=4, deflate=True)
    size = os.path.getsize(out) / 1048576

    check = fitz.open(out)
    left = [
        i + 1
        for i in range(check.page_count)
        if "drutex" in check[i].get_text().lower()
        or "fc bayern" in check[i].get_text().lower()
        or logo_boxes(check[i])
        or qr_codes(check[i])
    ]
    print(
        f"✓ {catalogue['dst']}  {check.page_count} pp, {size:.1f} MB "
        f"| {hits} rótulos borrados | rutas restantes: {left or 'ninguna'}"
    )
    return out


COVER_W, COVER_H = 900, 1200  # 3:4, la proporción de la tarjeta


def cover_image(path, catalogue_id):
    """
    Portada para el expositor.

    Estas tres portadas son apaisadas y la tarjeta es vertical, así que
    un `object-cover` se comería justo lo que hay que ver: la marca
    arriba a la izquierda y el título abajo. Se compone entonces una
    lámina 3:4 con la portada entera centrada sobre el mismo color con
    el que está impresa —tomado de su propia esquina, no elegido— de
    forma que cabe completa y sin inventar decorado.
    """
    doc = fitz.open(path)
    page = doc[0]
    pw, ph = page.rect.width, page.rect.height

    front_w = round(COVER_W * 0.92)
    front = page.get_pixmap(matrix=fitz.Matrix(front_w / pw, front_w / pw))

    # El color de la lámina sale de la esquina de la propia portada.
    corner = page.get_pixmap(clip=fitz.Rect(0, 0, 12, 12))
    plate = tuple(
        sum(corner.pixel(x, y)[channel] for x in range(corner.width) for y in range(corner.height))
        / (corner.width * corner.height * 255)
        for channel in range(3)
    )

    sheet = fitz.open()
    out_page = sheet.new_page(width=COVER_W, height=COVER_H)
    out_page.draw_rect(fitz.Rect(0, 0, COVER_W, COVER_H), color=None, fill=plate)
    left, top = (COVER_W - front_w) / 2, (COVER_H - front.height) / 2
    out_page.insert_image(
        fitz.Rect(left, top, left + front_w, top + front.height), pixmap=front
    )

    out = os.path.join(COVER_DIR, f"{catalogue_id}-cover.jpg")
    out_page.get_pixmap(matrix=fitz.Matrix(1, 1)).save(out, jpg_quality=88)
    print(f"  · {os.path.basename(out)}")


if __name__ == "__main__":
    for catalogue in CATALOGUES:
        pdf = clean(catalogue)
        cover_image(pdf, catalogue["id"])
