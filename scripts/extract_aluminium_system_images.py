"""
Renders de producto para los sistemas del Aluminium-Katalog (aluprof,
Aliplast, Deceuninck, Cortizo, Reynaers) — tarjetas de sistema al estilo
IGLO: el render del catálogo centrado sobre lienzo blanco 4:3.

El catálogo es de pliegos dobles: cada página PDF apaisada son dos
páginas impresas, un sistema por mitad, y el render es siempre la imagen
más grande de su mitad. La mitad no se declara a mano: se localiza el
TÍTULO del sistema (la aparición de mayor cuerpo, descartando las que
viven dentro de un título más largo de la misma página, p. ej.
"VISOGLIDE" dentro de "VISOGLIDE PLUS") y su centro decide izquierda o
derecha.

Ejecutar:  python3 scripts/extract_aluminium_system_images.py
"""

import os

import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, "public/pdf/catalogues/aluminium-2026.pdf")
OUT_DIR = os.path.join(ROOT, "public/images/manufacturers")

CANVAS = (1200, 900)  # 4:3, como las demás tarjetas de sistema
MARGIN = 60
ZOOM = 2.2

# (marca, id del sistema, índice 0-based de la página PDF, título impreso)
SYSTEMS = [
    ("aluprof", "mb-79n", 5, "MB-79N"),
    ("aluprof", "mb-79n-casement", 5, "MB-79N CASEMENT"),
    ("aluprof", "mb-86-casement", 6, "MB-86 CASEMENT"),
    ("aluprof", "mb-86n", 6, "MB-86N"),
    ("aluprof", "mb-104-passive", 7, "MB-104 PASSIVE"),
    ("aluprof", "mb-ferroline", 7, "MB-FERROLINE"),
    ("aluprof", "mb-slide", 8, "MB-SLIDE"),
    ("aluprof", "mb-59-hs", 8, "MB-59 HS"),
    ("aluprof", "mb-77-hs", 9, "MB-77 HS"),
    ("aluprof", "mb-86-fold-line-hd", 9, "MB-86 FOLD LINE HD"),
    ("aluprof", "mb-78-ei", 10, "MB-78 EI"),
    ("aluprof", "mb-60e-ei", 10, "MB-60E EI"),
    ("aluprof", "mb-86-ei", 11, "MB-86 EI"),
    ("aluprof", "mb-118-ei", 11, "MB-118 EI"),
    ("aliplast", "econoline", 15, "ECONOLINE"),
    ("aliplast", "ecofutural", 15, "ECOFUTURAL"),
    ("aliplast", "ecofutural-oc", 16, "ECOFUTURAL OC"),
    ("aliplast", "imperial", 16, "IMPERIAL"),
    ("aliplast", "genesis", 17, "GENESIS"),
    ("aliplast", "superial", 17, "SUPERIAL"),
    ("aliplast", "max-light", 18, "MAX LIGHT"),
    ("aliplast", "vs-600", 18, "VS 600"),
    ("aliplast", "slide-glass", 19, "SLIDE GLASS"),
    ("aliplast", "modernslide", 19, "MODERNSLIDE"),
    ("aliplast", "visoglide-plus", 20, "VISOGLIDE PLUS"),
    ("aliplast", "visoglide", 20, "VISOGLIDE"),
    ("aliplast", "ultraglide-max-light-monorail", 21, "ULTRAGLIDE MAX LIGHT MONORAIL"),
    ("aliplast", "ultraglide", 21, "ULTRAGLIDE"),
    ("aliplast", "fr-65-ei", 22, "FR 65 EI"),
    ("aliplast", "panorama", 22, "PANORAMA"),
    ("aliplast", "fr-90-ei", 23, "FR 90 EI"),
    ("deceuninck", "entra", 26, "ENTRA"),
    ("deceuninck", "decalu-88-standard", 26, "DECALU 88 STANDARD"),
    ("deceuninck", "decalu-88-hidden", 27, "DECALU 88 HIDDEN"),
    ("deceuninck", "decalu-94-retro", 27, "DECALU 94 RETRO"),
    ("deceuninck", "decalu-110-steel", 28, "DECALU 110 STEEL"),
    ("deceuninck", "decalu-88-doors", 28, "DECALU 88 DOORS"),
    ("deceuninck", "decalu-88-folding", 29, "DECALU 88 FOLDING DOORS"),
    ("deceuninck", "decalu-163-slide", 29, "DECALU 163 SLIDE"),
    ("cortizo", "cor-70-industrial", 32, "COR 70 INDUSTRIAL"),
    ("cortizo", "cor-70-ho", 32, "COR 70 HO"),
    ("cortizo", "casement", 33, "CORTIZO CASEMENT"),
    ("cortizo", "2000-corredera", 33, "2000 CORREDERA"),
    ("cortizo", "cor-vision", 34, "COR VISION"),
    ("cortizo", "4900-corredera", 34, "4900 CORREDERA"),
    ("cortizo", "cor-vision-plus", 35, "COR VISION PLUS"),
    ("cortizo", "bifold-plus", 35, "CORTIZO BIFOLD PLUS"),
    ("cortizo", "cor-vision-galandage", 36, "COR VISION GALANDAGE"),
    ("cortizo", "millennium-pivot-plus", 36, "MILLENNIUM PIVOT PLUS"),
    ("reynaers", "masterline-8", 39, "MASTERLINE 8"),
    ("reynaers", "masterline-8-hidden-vent", 39, "MASTERLINE 8 HIDDEN VENT"),
    ("reynaers", "masterline-8-despiro", 40, "MASTERLINE 8 DESPIRO"),
    ("reynaers", "masterline-10", 40, "MASTERLINE 10"),
    ("reynaers", "slimline-38", 41, "SLIMLINE 38"),
    ("reynaers", "cs-77", 41, "CS 77"),
    ("reynaers", "slimwall-35", 42, "SLIMWALL 35"),
    ("reynaers", "masterpatio", 42, "MASTERPATIO"),
    ("reynaers", "masterline-8-pivot", 43, "MASTERLINE 8 PIVOT"),
    ("reynaers", "masterline-8-pivot-xl", 43, "MASTERLINE 8 PIVOT XL"),
    ("reynaers", "slimpatio-68", 44, "SLIMPATIO 68"),
]


# Mitades cuyo "render" es un bitmap aplanado de media página con el
# título y el párrafo impresos DENTRO (como pasaba con IGLO). Para esas
# tarjetas el recorte se ciñe a la franja del render de la plantilla del
# catálogo: entre el subtítulo (y≈95) y el arranque del párrafo (y≈445).
FLATTENED = {
    "mb-79n", "mb-86-casement", "mb-ferroline", "mb-86-ei",
    "econoline", "ecofutural", "ecofutural-oc", "imperial", "genesis",
    "superial", "max-light", "vs-600", "slide-glass", "modernslide",
    "visoglide", "visoglide-plus", "ultraglide", "ultraglide-max-light-monorail",
    "panorama",
    "entra", "decalu-88-standard", "decalu-88-hidden", "decalu-94-retro",
    "decalu-110-steel", "decalu-88-folding", "decalu-163-slide",
    "casement",
    "cs-77", "masterline-8-hidden-vent", "masterpatio",
}
ZONE_Y = (95, 445)
# Dos fichas arrancan su pie de foto un pelín más arriba que el resto.
ZONE_Y_BOTTOM = {"decalu-88-hidden": 428, "casement": 428}


def title_rect(page, title, longer_titles):
    """La aparición de mayor cuerpo que no viva dentro de un título más largo."""
    shadow = [r for t in longer_titles for r in page.search_for(t)]
    candidates = []
    for rect in page.search_for(title):
        if rect.y0 > 300:
            continue
        # OJO: Rect.intersect() muta el propio rect — trabajar con copia.
        covered = any((fitz.Rect(rect) & s).get_area() > rect.get_area() * 0.8 for s in shadow)
        if covered:
            continue
        candidates.append(rect)
    if not candidates:
        raise SystemExit(f"✗ título no encontrado: {title}")
    return max(candidates, key=lambda r: r.height)


def main():
    doc = fitz.open(PDF)
    os.makedirs(OUT_DIR, exist_ok=True)
    halves = {}  # (índice, mitad) → sistema, para cazar colisiones
    for brand, system_id, index, title in SYSTEMS:
        page = doc[index]
        longer = [
            t
            for _, _, i, t in SYSTEMS
            if i == index and t != title and title in t
        ]
        t_rect = title_rect(page, title, longer)
        half_left = t_rect.x0 + t_rect.width / 2 < page.rect.width / 2
        key = (index, half_left)
        if key in halves:
            raise SystemExit(f"✗ {title} cae en la misma mitad que {halves[key]} (p{index + 1})")
        halves[key] = title
        x_min, x_max = (0, page.rect.width / 2) if half_left else (page.rect.width / 2, page.rect.width)

        best = None
        for img in page.get_images(full=True):
            for rect in page.get_image_rects(img[0]):
                cx = rect.x0 + rect.width / 2
                if not (x_min <= cx <= x_max):
                    continue
                if best is None or rect.get_area() > best.get_area():
                    best = rect
        if best is None:
            raise SystemExit(f"✗ sin imagen en la mitad de {title}")

        if system_id in FLATTENED:
            bottom = ZONE_Y_BOTTOM.get(system_id, ZONE_Y[1])
            zone = fitz.Rect(x_min + 45, ZONE_Y[0], x_max - 35, bottom)
            best = fitz.Rect(best) & zone

        pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=best, alpha=False)
        render = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)

        inner = (CANVAS[0] - 2 * MARGIN, CANVAS[1] - 2 * MARGIN)
        render.thumbnail(inner, Image.LANCZOS)
        card = Image.new("RGB", CANVAS, "white")
        card.paste(render, ((CANVAS[0] - render.width) // 2, (CANVAS[1] - render.height) // 2))
        out = os.path.join(OUT_DIR, f"{brand}-{system_id}.jpg")
        card.save(out, "JPEG", quality=88, optimize=True)
        side = "izq" if half_left else "dcha"
        print(f"✓ {brand}-{system_id}.jpg  (p{index + 1} {side}, render {best.width:.0f}×{best.height:.0f}pt)")
    doc.close()


if __name__ == "__main__":
    main()
