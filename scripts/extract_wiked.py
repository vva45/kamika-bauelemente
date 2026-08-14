#!/usr/bin/env python3
"""Despiece del catálogo WIKĘD PCV/ALU 2026 → imágenes y modelos.

Tres salidas, todas del PDF publicado (ya white-labeleado por
`prepare_wiked.py`):

 1. Renders de SISTEMA sobre lienzo blanco 4:3 (1200×900, como los
    Salamander/IGLO) → public/images/manufacturers/*.jpg. Son los
    cortes de perfil que el catálogo imprime junto a cada sistema —
    el render del producto, no el wallpaper: regla del dueño.
 2. Imágenes de ACCESORIO (manillas, tiradores, bisagra) →
    public/images/models/wiked-pvc-alu/*.jpg.
 3. El bloque de modelos del escaparate → src/data/catalogue-models.ts
    entre los marcadores WIKĘD (se regenera entero en cada ejecución).

Los nombres de sistema y las cifras van transcritos del catálogo; las
etiquetas de spec y los pies descriptivos polacos ("KLAMKO-POCHWYT DO
HS") van en alemán porque la web se lee en alemán primero — traducción
mecánica, no redacción: los números no se tocan. Los nombres propios
(HOPPE Atlanta, Victory, Jocker…) quedan tal cual impresos.

Los xref van medidos a mano, como en extract_system_images.py: no hay
regla fiable para adivinar qué imagen de la página es el render.

Ejecutar:  python3 scripts/extract_wiked.py
Requiere:  pip install pymupdf pillow
"""

import io
import json
import os

import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Se lee el ORIGINAL: el publicado pasó por garbage collection al
# guardarse y sus xref ya no coinciden con los medidos. Las imágenes
# son idénticas en ambos; lo único redactado es la contraportada.
PDF = os.path.join(ROOT, "source-catalogues/KATALOG-WIKED-PVC_2026.pdf")
MANUF_DIR = os.path.join(ROOT, "public/images/manufacturers")
MODELS_DIR = os.path.join(ROOT, "public/images/models/wiked-pvc-alu")
MODELS_TS = os.path.join(ROOT, "src/data/catalogue-models.ts")

MARK_START = "  // ══ WIKĘD PCV/ALU — generado por scripts/extract_wiked.py ═════════\n"
MARK_END = "  // ══ /WIKĘD PCV/ALU ═════════════════════════════════════════════════\n"

CANVAS = (1200, 900)
MARGIN = 60

# ── Renders de sistema: hoja (índice 0) + xrefs de sus imágenes ──────
# La unión de los rects de esos xrefs, con un poco de aire, es el
# recorte; así el render con vista frontal y el corte de perfil salen
# juntos, tal y como los maqueta el catálogo.
SYSTEMS = {
    # PCV — drzwi przesuwne (hoja 7, página impresa 14)
    "veka-move-76": (7, [109, 113]),
    "veka-motion-82": (7, [117, 119]),
    "veka-motion-82-max": (7, [101, 105]),
    # PCV — okna (hoja 9, página 18)
    "veka-softline-82": (9, [131, 143]),
    "veka-softline-76-md": (9, [135, 139]),
    "veka-softline-76-ad": (9, [158, 162]),
    "veka-perfectline": (9, [149, 153, 154]),
    # PCV — okna Kömmerling (hoja 10, página 20)
    "koemmerling-88-md": (10, [168, 172]),
    "koemmerling-76-md": (10, [170, 174]),
    "koemmerling-76-ad": (10, [176, 178]),
    # ALU — okna (hoja 22, página 44)
    "procural-aluline-pe96-passive": (22, [527, 529]),
    "procural-aluline-pe78n-hi": (22, [531, 523]),
    "procural-aluline-pe78n": (22, [533, 521]),
    "procural-aluline-pe50": (22, [517, 519]),
    # ALU — systemy przesuwne (hoja 23, página 46)
    "procural-alu-slide-sl1600tt-hi": (23, [541, 538]),
    "procural-pe78-fold": (23, [542, 543]),
}

# Las tarjetas de fabricante (koemmerling.jpg, procural.jpg, iglo.jpg)
# NO salen de aquí: el dueño quiere en ventanas la lámina tipográfica
# de marca para todas — las genera build-manufacturer-images.mjs.
MANUFACTURER_CARDS = {}

# Las tarjetas de correderas (veka-schiebe, procural-schiebe) tampoco
# salen de aquí: primero fueron la foto de ambiente del pliego, pero el
# titular polaco impreso en la foto se colaba en la tarjeta y el dueño
# pidió lámina tipográfica para todas — build-manufacturer-images.mjs.
LIFESTYLE_CARDS = {}

# ── Accesorios: hoja + xrefs → /images/models/wiked-pvc-alu/ ─────────
ACCESSORIES = {
    # klamki okienne (hoja 15, página 30)
    "fenstergriff-standard": (15, [326]),
    "hoppe-tokyo": (15, [324]),
    "hoppe-dublin": (15, [332]),
    "hoppe-atlanta": (15, [328]),
    "hoppe-toulon": (15, [330]),
    "hoppe-hamburg-secuforte": (15, [334]),
    "fenstergriff-retro": (15, [336]),
    # okucia drzwiowe (hoja 16, página 32)
    "psk-garnitur-maco": (16, [342, 344]),
    "terrassengriff-victory": (16, [352, 354]),
    "hs-griffschale": (16, [346, 348]),
    "tuerdruecker-dublin": (16, [350, 356]),
    # pochwyty y bisagra (hoja 17, página 34)
    "stossgriff-alfa": (17, [363]),
    "stossgriff-beta": (17, [366]),
    "tuerband-jocker": (17, [368]),
    # puertas ALU (hoja 24, página 48): renders para sus fichas de modelo
    "procural-aluline-pe96hi-tuer": (24, [558, 554]),
    "procural-aluline-pe78n-hi-tuer": (24, [560, 552]),
    "procural-pe78ei-design-line": (24, [562, 550]),
    "procural-aluline-pe50-tuer": (24, [566, 548]),
}

# ── El escaparate: cada modelo con su página y sus specs ─────────────
# page = página del visor de PDF (índice de hoja + 1), para #page=N.
FOOT_RU = "Uw für Referenzfenster RU 1230×1480 mm, Ug 0,5, warme Kante"
FOOT_A = "Uw für Referenzfenster Schema A 3500/2300 mm, Ug 0,5, warme Kante"
FOOT_TUER = "Uw für Referenztür RU 1230/2180 mm, Ug 0,5, warme Kante"

MODELS = [
    # ── PCV — Fenster ────────────────────────────────────────────────
    dict(id="veka-softline-82", name="VEKA Softline 82", family="Fenster PCV", page=10, manuf=True, specs=[
        ("Klasse", "A"), ("Profil", "82 mm"), ("Uw", "0,76 W/(m²K)"),
        ("Kammern", "7 im Rahmen / 6 im Flügel"), ("Dichtungen", "3, mit Mitteldichtung"),
        ("Glaspakete", "24–52 mm"), ("", FOOT_RU)]),
    dict(id="veka-softline-76-md", name="VEKA Softline 76 MD", family="Fenster PCV", page=10, manuf=True, specs=[
        ("Klasse", "A"), ("Profil", "76 mm"), ("Uw", "0,79 W/(m²K)"),
        ("Kammern", "5 im Rahmen / 5 im Flügel"), ("Dichtungen", "3, mit Mitteldichtung"),
        ("Glaspakete", "18–48 mm"), ("", FOOT_RU)]),
    dict(id="veka-softline-76-ad", name="VEKA Softline 76 AD", family="Fenster PCV", page=10, manuf=True, specs=[
        ("Klasse", "A"), ("Profil", "76 mm"), ("Uw", "0,82 W/(m²K)"),
        ("Kammern", "5 im Rahmen / 5 im Flügel"), ("Dichtungen", "2 außenliegende"),
        ("Glaspakete", "18–48 mm"), ("", FOOT_RU)]),
    dict(id="veka-perfectline", name="VEKA Perfectline", family="Fenster PCV", page=10, manuf=True, specs=[
        ("Klasse", "A"), ("Profil", "70 mm"), ("Uw", "0,98 W/(m²K)"),
        ("Kammern", "5 im Rahmen / 5 im Flügel"), ("Dichtungen", "2, mit Mitteldichtung"),
        ("Glaspakete", "24–40 mm"), ("Varianten", "Standard und Swing"), ("", FOOT_RU)]),
    dict(id="koemmerling-88-md", name="Kömmerling 88 MD", family="Fenster PCV", page=11, manuf=True, specs=[
        ("Klasse", "B"), ("Profil", "88 mm"), ("Uw", "0,74 W/(m²K)"),
        ("Kammern", "7-Kammer-Profil"), ("Dichtungen", "3, mit Mitteldichtung"),
        ("Glaspakete", "24–54 mm"), ("", FOOT_RU)]),
    dict(id="koemmerling-76-md", name="Kömmerling 76 MD", family="Fenster PCV", page=11, manuf=True, specs=[
        ("Klasse", "B"), ("Profil", "76 mm"), ("Uw", "0,78 W/(m²K)"),
        ("Kammern", "6-Kammer-Profil"), ("Dichtungen", "3, mit Mitteldichtung"),
        ("Glaspakete", "24–50 mm"), ("", FOOT_RU)]),
    dict(id="koemmerling-76-ad", name="Kömmerling 76 AD", family="Fenster PCV", page=11, manuf=True, specs=[
        ("Klasse", "B"), ("Profil", "76 mm"), ("Uw", "0,81 W/(m²K)"),
        ("Kammern", "5-Kammer-Profil"), ("Dichtungen", "2 außenliegende"),
        ("Glaspakete", "24–50 mm"), ("", FOOT_RU)]),
    # ── PCV — Schiebetüren ───────────────────────────────────────────
    dict(id="veka-motion-82-max", name="VEKA Motion 82 Max", family="Schiebetüren PCV", page=8, manuf=True, specs=[
        ("System", "Hebe-Schiebetür (HS)"), ("Klasse", "A"), ("Bautiefe", "194 mm"),
        ("Uw", "0,73 W/(m²K)"), ("Kammern", "7 im Rahmen / 5 im Flügel"),
        ("Dichtungen", "2"), ("Glaspakete", "18–52 mm"), ("", FOOT_A)]),
    dict(id="veka-motion-82", name="VEKA Motion 82", family="Schiebetüren PCV", page=8, manuf=True, specs=[
        ("System", "Hebe-Schiebetür (HS)"), ("Klasse", "A"), ("Bautiefe", "194 mm"),
        ("Uw", "0,78 W/(m²K)"), ("Kammern", "7 im Rahmen / 5 im Flügel"),
        ("Dichtungen", "3, mit Mitteldichtung"), ("Glaspakete", "24–52 mm"), ("", FOOT_A)]),
    dict(id="veka-move-76", name="VEKA Move 76", family="Schiebetüren PCV", page=8, manuf=True, specs=[
        ("System", "Schiebetür"), ("Klasse", "A"), ("Bautiefe", "150 mm"),
        ("Uw", "0,81 W/(m²K)"), ("Kammern", "7 im Rahmen / 5 im Flügel"),
        ("Dichtungen", "3, mit Mitteldichtung"), ("Glaspakete", "24–48 mm"), ("", FOOT_A)]),
    # ── ALU — Fenster ────────────────────────────────────────────────
    dict(id="procural-aluline-pe96-passive", name="PROCURAL Aluline PE96 Passive", family="Fenster ALU", page=23, manuf=True, specs=[
        ("Profil", "96 mm"), ("Uw", "0,66 W/(m²K)"),
        ("Bautiefe", "Rahmen 96 mm / Flügel 106 mm, Isoliersteg 62 mm"),
        ("Schlagregendichtheit", "E1950"), ("Windlast", "C5"), ("Einbruchhemmung", "RC2, RC3"),
        ("Maße", "max. 1400×2800 mm / 1700×2400 mm, 200 kg")]),
    dict(id="procural-aluline-pe78n-hi", name="PROCURAL Aluline PE78N HI", family="Fenster ALU", page=23, manuf=True, specs=[
        ("Profil", "78 mm"), ("Uw", "0,74 W/(m²K)"),
        ("Bautiefe", "Rahmen 78 mm / Flügel 86 mm, Isoliersteg 42 mm"),
        ("Schlagregendichtheit", "E1650"), ("Windlast", "C5"), ("Einbruchhemmung", "RC2, RC3, RC4"),
        ("Maße", "max. 1700×2200 mm / 1200×3000 mm, 200 kg")]),
    dict(id="procural-aluline-pe78n", name="PROCURAL Aluline PE78N", family="Fenster ALU", page=23, manuf=True, specs=[
        ("Profil", "78 mm"), ("Uw", "0,88 W/(m²K)"),
        ("Bautiefe", "Rahmen 78 mm / Flügel 86 mm, Isoliersteg 42 mm"),
        ("Schlagregendichtheit", "E1650"), ("Windlast", "C5"), ("Einbruchhemmung", "RC2, RC3, RC4"),
        ("Maße", "max. 1700×2200 mm / 1200×3000 mm, 200 kg")]),
    dict(id="procural-aluline-pe50", name="PROCURAL Aluline PE50", family="Fenster ALU", page=23, manuf=True, specs=[
        ("Profil", "52 mm"), ("System", "Innenwand-System"),
        ("Bautiefe", "Rahmen 52 mm / Flügel 60 mm"), ("Maße", "max. 1200×2700 mm")]),
    # ── ALU — Schiebesysteme ─────────────────────────────────────────
    dict(id="procural-alu-slide-sl1600tt-hi", name="PROCURAL Alu Slide SL1600TT HI", family="Schiebesysteme ALU", page=24, manuf=True, specs=[
        ("System", "Hebe-Schiebetür"), ("Uw", "0,92 W/(m²K)"),
        ("Bautiefe", "2 Laufschienen 160/154 mm, 3 Laufschienen 247/241 mm, Flügel 67 mm"),
        ("Schlagregendichtheit", "9A"), ("Windlast", "C3/B5"),
        ("Flügelmaße", "max. 3300×3000 mm / 2300×3500 mm, 600 kg")]),
    dict(id="procural-pe78-fold", name="PROCURAL PE78 Fold", family="Schiebesysteme ALU", page=24, manuf=True, specs=[
        ("System", "Falttür"), ("Uw", "1,0 W/(m²K)"),
        ("Bautiefe", "Rahmen 78 mm / Flügel 78 mm, Isoliersteg 34 mm"),
        # el catálogo imprime "EI200" en la casilla de estanqueidad: las
        # clases de agua son E-cifra, así que es la E1200 con la kerning
        # rota — misma regla que la errata 7,73 del Salamander
        ("Schlagregendichtheit", "E1200"), ("Windlast", "C3/B3"),
        ("Flügelmaße", "max. 1200×3500 mm, 120 kg")]),
    # ── ALU — Türen ──────────────────────────────────────────────────
    dict(id="procural-aluline-pe96hi-tuer", name="PROCURAL Aluline PE96HI", family="Türen ALU", page=25, specs=[
        ("Profil", "96 mm"), ("Uw", "0,80 W/(m²K)"),
        ("Bautiefe", "Zarge 96 mm / Flügel 96 mm, Isoliersteg 50 mm"),
        ("Schlagregendichtheit", "E750"), ("Windlast", "C2/B2"),
        ("Maße", "1400×2500 mm, max. 200 kg"), ("", FOOT_TUER)]),
    dict(id="procural-aluline-pe78n-hi-tuer", name="PROCURAL Aluline PE78N HI", family="Türen ALU", page=25, specs=[
        ("Profil", "78 mm"), ("Uw", "0,89 W/(m²K)"),
        ("Bautiefe", "Zarge 78 mm / Flügel 78 mm, Isoliersteg 34 mm"),
        ("Schlagregendichtheit", "E1050 Pa"), ("Windlast", "C5"), ("Einbruchhemmung", "RC2, RC3"),
        ("Maße", "1400×3000 mm, max. 200 kg"), ("", FOOT_TUER)]),
    dict(id="procural-pe78ei-design-line", name="PROCURAL PE78EI Design Line", family="Türen ALU", page=25, specs=[
        ("Profil", "78 mm"), ("Feuerwiderstand", "EI30, EI60"), ("Rauchdichtheit", "Sa, S200"),
        ("Bautiefe", "Zarge 78 mm / Flügel 78 mm, Isoliersteg 34 mm"),
        ("Maße", "einflügelig max. 1350×2400 mm, zweiflügelig max. 2640×2455 mm")]),
    dict(id="procural-aluline-pe50-tuer", name="PROCURAL Aluline PE50", family="Türen ALU", page=25, specs=[
        ("Profil", "52 mm"), ("System", "Innenwand-System"),
        ("Bautiefe", "Zarge 52 mm / Flügel 52 mm"), ("Maße", "1400×2500 mm")]),
    # ── Fenstergriffe (category: accessories) ────────────────────────
    dict(id="fenstergriff-standard", name="Fenstergriff Standard", family="Fenstergriffe", page=16, category="accessories", specs=[
        ("Farben", "Silber, Weiß, Braun, Gold, Schwarz"),
        ("Varianten", "Standard, mit Druckknopf, mit Schlüssel")]),
    dict(id="hoppe-tokyo", name="HOPPE Tokyo", family="Fenstergriffe", page=16, category="accessories", specs=[
        ("Farben", "Silber, Weiß, Braun, Gold, Schwarz"),
        ("Varianten", "Standard, mit Druckknopf, mit Schlüssel, KiSi-System (nur Weiß und Silber)")]),
    dict(id="hoppe-toulon", name="HOPPE Toulon", family="Fenstergriffe", page=16, category="accessories", specs=[
        ("Farben", "Silber, Weiß, Braun, Gold, Schwarz"),
        ("Varianten", "Standard, mit Druckknopf, mit Schlüssel")]),
    dict(id="hoppe-dublin", name="HOPPE Dublin", family="Fenstergriffe", page=16, category="accessories", specs=[
        ("Farben", "Silber, Weiß, Braun, Gold, Schwarz, Anthrazit"),
        ("Varianten", "Standard, mit Druckknopf, mit Schlüssel")]),
    dict(id="hoppe-atlanta", name="HOPPE Atlanta", family="Fenstergriffe", page=16, category="accessories", specs=[
        ("Farben", "Silber, Weiß, Braun, Gold, Schwarz, Titan"),
        ("Varianten", "Standard, mit Druckknopf (nicht in Schwarz), mit Schlüssel")]),
    dict(id="hoppe-hamburg-secuforte", name="HOPPE Hamburg SecuForte", family="Fenstergriffe", page=16, category="accessories", specs=[
        ("Farben", "Silber, Weiß, Braun, Gold, Schwarz"),
        ("Varianten", "Standard, mit Druckknopf, mit Schlüssel")]),
    dict(id="fenstergriff-retro", name="Fenstergriff Retro", family="Fenstergriffe", page=16, category="accessories", specs=[
        ("Farben", "Antiksilber, Weiß, Schwarz, Rost"), ("Varianten", "Standard")]),
    # ── Türbeschläge (category: accessories) ─────────────────────────
    dict(id="psk-garnitur-maco", name="MACO PSK-Griffgarnitur", family="Türbeschläge", page=17, category="accessories", specs=[
        ("Ausführung", "Griff/Griff, innen und außen"),
        ("Farben", "Silber, Weiß, Braun, Hellbraun, Gold, Schwarz")]),
    dict(id="terrassengriff-victory", name="Terrassengriff Victory", family="Türbeschläge", page=17, category="accessories", specs=[
        ("Ausführung", "beidseitig; Standard oder unter Rollladen"),
        ("Farben", "Silber, Weiß, Braun, Gold, Schwarz, Anthrazit"),
        ("Hinweis", "Weiß innen / Standardfarbe außen möglich")]),
    dict(id="hs-griffschale", name="HS-Griffgarnitur", family="Türbeschläge", page=17, category="accessories", specs=[
        ("Ausführung", "Griff innen / Griffschale außen, für Hebe-Schiebetüren"),
        ("Farben", "Silber, Weiß, Braun, Hellbraun, Gold, Schwarz")]),
    dict(id="tuerdruecker-dublin", name="Türdrücker Dublin", family="Türbeschläge", page=17, category="accessories", specs=[
        ("Ausführung", "Drücker/Drücker oder Drücker/Knauf"), ("Farben", "Schwarz")]),
    dict(id="stossgriff-alfa", name="Stoßgriff Alfa", family="Türbeschläge", page=18, category="accessories", specs=[
        ("Längen", "80, 120, 150 cm"), ("Varianten", "gerade oder 45°"), ("Farben", "Schwarz")]),
    dict(id="stossgriff-beta", name="Stoßgriff Beta", family="Türbeschläge", page=18, category="accessories", specs=[
        ("Längen", "80, 120, 150 cm"), ("Farben", "Schwarz")]),
    dict(id="tuerband-jocker", name="Türband Jocker", family="Türbeschläge", page=18, category="accessories", specs=[
        ("Farben", "Schwarz")]),
]


def clip_for(page, xrefs, pad=6):
    rect = None
    for xref in xrefs:
        for r in page.get_image_rects(xref):
            rect = r if rect is None else rect | r
    if rect is None:
        raise SystemExit(f"xrefs {xrefs} sin rect en la página")
    return rect + (-pad, -pad, pad, pad)


def compose_on_white(png_bytes, out_path):
    render = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    box = (CANVAS[0] - 2 * MARGIN, CANVAS[1] - 2 * MARGIN)
    render.thumbnail(box, Image.LANCZOS)
    canvas = Image.new("RGB", CANVAS, "white")
    canvas.paste(render, ((CANVAS[0] - render.width) // 2, (CANVAS[1] - render.height) // 2))
    canvas.save(out_path, "JPEG", quality=88, optimize=True)


def main():
    doc = fitz.open(PDF)
    os.makedirs(MODELS_DIR, exist_ok=True)

    for slug, (sheet, xrefs) in SYSTEMS.items():
        page = doc[sheet]
        pix = page.get_pixmap(dpi=300, clip=clip_for(page, xrefs))
        compose_on_white(pix.tobytes("png"), os.path.join(MANUF_DIR, f"{slug}.jpg"))
    print(f"✓ {len(SYSTEMS)} renders de sistema → images/manufacturers/")

    for card, source in MANUFACTURER_CARDS.items():
        sheet, xrefs = SYSTEMS[source]
        page = doc[sheet]
        pix = page.get_pixmap(dpi=300, clip=clip_for(page, xrefs))
        compose_on_white(pix.tobytes("png"), os.path.join(MANUF_DIR, f"{card}.jpg"))
    for card, (sheet, xrefs) in LIFESTYLE_CARDS.items():
        page = doc[sheet]
        rect = clip_for(page, xrefs, pad=0) & page.rect
        pix = page.get_pixmap(dpi=220, clip=rect)
        image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        image.save(os.path.join(MANUF_DIR, f"{card}.jpg"), "JPEG", quality=85, optimize=True)
    print(f"✓ {len(MANUFACTURER_CARDS) + len(LIFESTYLE_CARDS)} tarjetas de fabricante")

    for slug, (sheet, xrefs) in ACCESSORIES.items():
        page = doc[sheet]
        pix = page.get_pixmap(dpi=300, clip=clip_for(page, xrefs))
        compose_on_white(pix.tobytes("png"), os.path.join(MODELS_DIR, f"{slug}.jpg"))
    print(f"✓ {len(ACCESSORIES)} imágenes de accesorio/puerta → images/models/wiked-pvc-alu/")

    # ── el bloque de modelos ─────────────────────────────────────────
    lines = []
    for m in MODELS:
        image = (f"/images/manufacturers/{m['id']}.jpg" if m.get("manuf")
                 else f"/images/models/wiked-pvc-alu/{m['id']}.jpg")
        lines.append("  {\n")
        lines.append(f'    "id": {json.dumps(m["id"])},\n')
        lines.append('    "catalogue": "wiked-pvc-alu",\n')
        lines.append(f'    "name": {json.dumps(m["name"], ensure_ascii=False)},\n')
        lines.append(f'    "family": {json.dumps(m["family"], ensure_ascii=False)},\n')
        if m.get("category"):
            lines.append(f'    "category": {json.dumps(m["category"])},\n')
        lines.append(f'    "page": {m["page"]},\n')
        lines.append(f'    "image": {json.dumps(image)},\n')
        specs = ", ".join(
            "{ \"label\": %s, \"value\": %s }" % (
                json.dumps(label, ensure_ascii=False), json.dumps(value, ensure_ascii=False))
            for label, value in m["specs"]
        )
        lines.append(f'    "specs": [{specs}],\n')
        lines.append("  },\n")
    block = MARK_START + "".join(lines) + MARK_END

    source = open(MODELS_TS).read()
    if MARK_START in source:
        head, rest = source.split(MARK_START, 1)
        _, tail = rest.split(MARK_END, 1)
    else:
        head, tail = source.rsplit("];\n", 1)
        tail = "];\n" + tail
        if head.rstrip().endswith("}"):
            head = head.rstrip() + ",\n"
    open(MODELS_TS, "w").write(head + block + tail)
    print(f"✓ {len(MODELS)} modelos → catalogue-models.ts (bloque WIKĘD)")


if __name__ == "__main__":
    main()
