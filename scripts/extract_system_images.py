"""
Imágenes de PRODUCTO para los sistemas del catálogo IGLO.

Lo pidió el dueño (2026-08) al ver las fichas: la primera versión usaba
la foto de ambiente de cada pliego —bonita, pero "un wallpaper"— y él
quiere el render del producto, el corte de perfil que el catálogo trae
en su SYSTEMAUFBAU. Este script lo recorta de cada pliego y lo centra
sobre lienzo blanco 4:3, que es como se enseñan los sistemas Salamander.

Los xref van declarados a mano porque no hay regla: en la mayoría de
pliegos el render es la imagen de la zona derecha, pero en Edge y en
Ideal Neo MD esa zona la ocupa una foto de ambiente y el render vive en
otro objeto. Se midieron uno a uno.

Las tarjetas de FABRICANTE (iglo.jpg, iglo-terrassen.jpg) ya no son
fotos de ambiente: el dueño pidió lámina tipográfica de marca para
TODAS las tarjetas de fabricante (2026-08) — las genera
build-manufacturer-images.mjs. Este script solo produce renders de
sistema.

Ejecutar:  python3 scripts/extract_system_images.py
Requiere:  pip install pymupdf pillow
"""

import io
import os

import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, "public/pdf/catalogues/iglo-fenster-terrassensysteme.pdf")
OUT_DIR = os.path.join(ROOT, "public/images/manufacturers")

# fichero de salida → (hoja, xref del render) o (hoja, None, recorte).
# La mayoría de RECORTES van medidos a mano: en muchos pliegos la mitad
# derecha es un único bitmap aplanado (render + rótulos + columnas de
# texto), y el xref arrastraría fragmentos de palabras cortadas a la
# tarjeta. Solo conservan xref los pliegos cuyo render es un objeto
# limpio y suelto.
SYSTEMS = {
    "iglo-edge": (4, None, (1040, 150, 1212, 595)),
    "iglo-energy": (6, 34),
    "iglo-energy-alucover": (7, None, (1002, 170, 1261, 541)),
    "iglo-5": (9, 58),
    "iglo-light": (11, 67),
    "iglo-premier": (13, 74),
    "iglo-ext": (15, 83),
    "aluplast-ideal-neo-md": (17, None, (1038, 150, 1205, 533)),
    "iglo-hs": (20, None, (888, 131, 1348, 588)),
    "iglo-hs-alucover": (22, None, (888, 131, 1348, 588)),
    "iglo-energy-psk": (24, None, (848, 140, 1293, 386)),
    "iglo-5-psk": (26, None, (848, 140, 1293, 386)),
    "iglo-light-psk": (28, None, (888, 125, 1345, 560)),
    "iglo-slide": (29, None, (888, 100, 1250, 585)),
    "iglo-edge-slide": (31, None, (888, 80, 1250, 590)),
}

CANVAS = (1200, 900)  # 4:3, como las tarjetas
MARGIN = 60  # aire alrededor del render


def compose_on_white(png_bytes, out_path):
    render = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    max_w, max_h = CANVAS[0] - 2 * MARGIN, CANVAS[1] - 2 * MARGIN
    scale = min(max_w / render.width, max_h / render.height)
    render = render.resize((round(render.width * scale), round(render.height * scale)), Image.LANCZOS)
    canvas = Image.new("RGB", CANVAS, "white")
    canvas.paste(render, ((CANVAS[0] - render.width) // 2, (CANVAS[1] - render.height) // 2))
    canvas.save(out_path, "JPEG", quality=88, optimize=True)


def main():
    doc = fitz.open(PDF)
    for name, entry in SYSTEMS.items():
        sheet, xref = entry[0], entry[1]
        page = doc[sheet - 1]
        if xref is None:
            clip = fitz.Rect(*entry[2])
        else:
            rects = page.get_image_rects(xref)
            if not rects:
                print(f"✗ {name}: xref {xref} sin rectángulo en la hoja {sheet}")
                continue
            # Recorte de PÁGINA, no extracción del objeto: respeta
            # máscaras y recortes. Margen mínimo para no arrastrar
            # rótulos vecinos.
            clip = rects[0] + (-3, -3, 3, 3)
        pixmap = page.get_pixmap(dpi=170, clip=clip)
        compose_on_white(pixmap.tobytes("png"), os.path.join(OUT_DIR, f"{name}.jpg"))
        print(f"✓ {name}.jpg (hoja {sheet})")
    doc.close()


if __name__ == "__main__":
    main()
