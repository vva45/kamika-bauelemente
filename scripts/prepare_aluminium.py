"""
Prepara el Katalog_Aluminium_DE de Eko-Okna para publicarlo:

1. WHITE-LABEL — la regla de la casa: el vendedor desaparece, los
   fabricantes de los sistemas (Aluprof, Aliplast, Deceuninck,
   Cortizo, Reynaers, Despiro, Selt, NUUN) se quedan acreditados.
   - p3: autopresentación de Eko-Okna S.A. → página en blanco
   - p63: publicidad de eko4u/benefit (portales de distribuidores) →
     página en blanco
   - p65: contraportada con dirección y web de Eko-Okna → en blanco
   - y por si acaso, caza global de "Eko-Okna"/"ekookna"/"eko4u" en
     el resto de páginas.

2. COMPRESIÓN — la regla del dueño: ~60-70% del original, no la
   mitad. Fotos a máx. 1800 px JPEG q80, y una imagen solo se
   sustituye si la nueva pesa < 80% de la original (mismos umbrales
   que shrink_catalogue_pdfs.py).

Entrada:  source-catalogues/Katalog_Aluminium_DE.pdf   (43,9 MB)
Salida:   public/pdf/catalogues/aluminium-2026.pdf

Ejecutar: python3 scripts/prepare_aluminium.py
"""

import io
import os

import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "source-catalogues/Katalog_Aluminium_DE.pdf")
OUT = os.path.join(ROOT, "public/pdf/catalogues/aluminium-2026.pdf")

# Páginas enteras de vendedor (índice 0-based).
BLANK_PAGES = [2, 62, 64]  # p3, p63, p65

SELLER_TERMS = ["Eko-Okna", "ekookna", "eko4u", "beneﬁt Eko", "www.ekookna.com"]

MAX_EDGE = 1800
QUALITY = 80
MIN_GAIN = 0.8


def white_label(doc):
    for index in BLANK_PAGES:
        page = doc[index]
        page.add_redact_annot(page.rect)
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_REMOVE)

    hits = 0
    for page in doc:
        if page.number in BLANK_PAGES:
            continue
        for term in SELLER_TERMS:
            for rect in page.search_for(term):
                page.add_redact_annot(rect)
                hits += 1
        if page.first_annot:
            page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)
    print(f"· white-label: {len(BLANK_PAGES)} páginas en blanco, {hits} menciones sueltas")


def replace_cover_logo(doc):
    """
    El logo "eko okna" de la portada son siete glifos VECTORIALES
    blancos (bbox ≈ 243-358 × 179-236 pt). Se eliminan con una
    redacción sin relleno que solo borra los trazados cubiertos —
    la foto y el marco azul quedan intactos — y en su hueco se
    estampa la marca blanca de Kamika, como en los demás catálogos.
    """
    page = doc[0]
    zone = fitz.Rect(235, 174, 365, 242)
    page.add_redact_annot(zone, fill=False)
    page.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
    )

    mark = os.path.join(ROOT, "public/images/brand/kamika-mark-white.png")
    page.insert_image(zone, filename=mark, keep_proportion=True)
    print("· portada: logo del vendedor fuera, marca Kamika dentro")


def shrink_images(doc):
    """Misma técnica probada que shrink_catalogue_pdfs.py."""
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
            except Exception as error:
                print(f"   ⚠ xref {xref}: {error}")
                skipped += 1
    print(f"· imágenes: {replaced} recomprimidas, {skipped} sin tocar")


def main():
    before = os.path.getsize(SRC) / 1048576
    doc = fitz.open(SRC)
    white_label(doc)
    replace_cover_logo(doc)
    shrink_images(doc)
    doc.save(OUT, garbage=4, deflate=True)
    doc.close()
    after = os.path.getsize(OUT) / 1048576
    print(f"✓ {before:.1f} MB → {after:.1f} MB ({after / before * 100:.0f}%) → {OUT}")


if __name__ == "__main__":
    main()
