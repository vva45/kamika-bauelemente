#!/usr/bin/env python3
"""Aligera los PDF de catálogo más pesados recomprimiendo sus fotos.

Regla del dueño (2026-08): NO a la mitad — que quede en torno al 60-70%
del peso original, conservando más calidad ("si pesa 50 MB, unos
30-35"). Por eso la recompresión es suave: fotos a máx. 1800 px de
lado y JPEG q80, y una foto solo se sustituye si la versión nueva pesa
al menos un 20% menos — recomprimir sin ganancia solo estropea.

Antes de tocar un catálogo, su versión previa queda copiada en
source-catalogues/*-original.pdf: si alguna página se viera mal, el
original está a un cp de distancia. Los extractores de muestras y
modelos que leen de public/ ya corrieron; para futuras re-ejecuciones
de esos scripts está el original.

Tras ejecutar: actualizar sizeMb en src/data/catalogues.ts (el script
imprime los valores) y revisar en visor un par de páginas por catálogo.

Ejecutar:  python3 scripts/shrink_catalogue_pdfs.py
Requiere:  pip install pymupdf pillow
"""

import io
import os

import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(ROOT, "public/pdf/catalogues")

# Solo los gordos (≥ ~17 MB). El de vallas ya se comprimió en su día y
# los demás están en pesos razonables.
TARGETS = [
    "rollladen-produktkatalog.pdf",
    "roka-signature-2025.pdf",
    "garagentore-produktkatalog.pdf",
    "fassadenjalousien.pdf",
    "entrance-door-panels.pdf",
]

MAX_EDGE = 1800
QUALITY = 80
MIN_GAIN = 0.8  # solo sustituir si pesa < 80% de la original


def shrink(path):
    doc = fitz.open(path)
    replaced = skipped = 0
    done = set()
    for page in doc:
        for info in page.get_images(full=True):
            xref = info[0]
            if xref in done:
                continue
            done.add(xref)
            try:
                raw = doc.extract_image(xref)
                if len(raw["image"]) < 120_000:
                    skipped += 1
                    continue
                # Pixmap decodifica también los JPEG con DNL que rompen
                # a PIL; CMYK y alfa se convierten a RGB
                pix = fitz.Pixmap(doc, xref)
                if pix.alpha or pix.colorspace is None or pix.colorspace.n > 3:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                image = Image.frombytes("RGB" if pix.n == 3 else "L", (pix.width, pix.height), pix.samples)
                if max(image.size) > MAX_EDGE:
                    image.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
                buffer = io.BytesIO()
                image.convert("RGB").save(buffer, "JPEG", quality=QUALITY, optimize=True)
                if buffer.tell() >= len(raw["image"]) * MIN_GAIN:
                    skipped += 1
                    continue
                page.replace_image(xref, stream=buffer.getvalue())
                replaced += 1
            except Exception as error:  # una foto rebelde no tumba el catálogo
                print(f"   ⚠ xref {xref}: {error}")
                skipped += 1
    tmp = path + ".tmp"
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    os.replace(tmp, path)
    return replaced, skipped


def main():
    for name in TARGETS:
        path = os.path.join(PDF_DIR, name)
        before = os.path.getsize(path) / 1048576
        replaced, skipped = shrink(path)
        after = os.path.getsize(path) / 1048576
        print(f"✓ {name}: {before:.1f} → {after:.1f} MB ({after / before:.0%}), "
              f"{replaced} fotos recomprimidas, {skipped} sin tocar")


if __name__ == "__main__":
    main()
