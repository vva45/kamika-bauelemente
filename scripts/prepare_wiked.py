#!/usr/bin/env python3
"""Prepara el catálogo WIKĘD PCV/ALU 2026 para publicarlo.

WIKĘD es FABRICANTE (Luzino, PL) y vende por distribuidores, igual que
ROKA: la marca se queda a la vista — es como el cliente citará el
catálogo. Lo único que se quita es la ruta de contacto de la
contraportada (dirección postal + NIP), que es la misma regla aplicada
a todos los catálogos autoalojados: el visitante no debe salir de
Kamika para pedir. Los logos de la portada y la cita del presidente se
quedan: son atribución, no ruta.

Hace tres cosas, todas idempotentes:
 1. Copia el original subido a source-catalogues/ (fuera de public/).
 2. Publica public/pdf/catalogues/wiked-pvc-alu.pdf con la dirección de
    la contraportada tapada (redacción de texto; el logo WIKĘD del
    pliego se conserva).
 3. Portada public/images/catalogues/wiked-pvc-alu-cover.jpg — recorte
    VERTICAL (5:7 aprox) de la portada apaisada, porque las tarjetas de
    /catalogues pintan aspect-[5/7] con object-cover y el pliego entero
    quedaría degollado: se centra en la caja de título y la ventana.
"""

import shutil
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parent.parent
UPLOAD = ROOT / "public/pdf/catalogues/KATALOG-WIKED-PVC_2026.pdf"
SOURCE = ROOT / "source-catalogues/KATALOG-WIKED-PVC_2026.pdf"
PUBLISHED = ROOT / "public/pdf/catalogues/wiked-pvc-alu.pdf"
COVER = ROOT / "public/images/catalogues/wiked-pvc-alu-cover.jpg"

# ── 1. El original, fuera de public/ ─────────────────────────────────
if UPLOAD.exists():
    shutil.move(UPLOAD, SOURCE)
    print(f"· original movido a {SOURCE.relative_to(ROOT)}")
elif not SOURCE.exists():
    raise SystemExit("ni la subida ni el original en source-catalogues: nada que preparar")

doc = fitz.open(SOURCE)

# ── 2. Contraportada: dirección y NIP, fuera ─────────────────────────
back = doc[len(doc) - 1]
removed = 0
for needle in [
    "Spółka z ograniczoną",
    "odpowiedzialnością",
    "ul. Wielki Las 19",
    "84-242 Luzino",
    "NIP 5882015465",
]:
    for rect in back.search_for(needle):
        back.add_redact_annot(rect)
        removed += 1
back.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)
print(f"· contraportada: {removed} líneas de contacto tapadas")

doc.save(PUBLISHED, garbage=4, deflate=True)
size_mb = PUBLISHED.stat().st_size / 1048576
print(f"· publicado {PUBLISHED.relative_to(ROOT)} — {len(doc)} pliegos, {size_mb:.1f} MB")

# ── 3. Portada vertical para la tarjeta ──────────────────────────────
cover_page = fitz.open(SOURCE)[0]  # 666×459 pt, apaisada
H = cover_page.rect.height
W_CROP = H * 900 / 1194  # el 5:7 real de las demás portadas
clip = fitz.Rect(25, 0, 25 + W_CROP, H)
pix = cover_page.get_pixmap(dpi=200, clip=clip)
pix.save(COVER)
print(f"· portada {COVER.relative_to(ROOT)} — {pix.width}x{pix.height}")
