"""
Puertas y contraventanas del Aluminium-Katalog → catalogue-models.ts:

 - PIVOT Line (p54-58): 16 puertas pivotantes Despiro, cada una con su
   ficha Material/Farbe/Stoßgriff/Rosette… COPIADA verbatim del pliego
   (verificado visualmente: las páginas son cuadrículas 2×2 y el texto
   plano intercala las columnas, así que aquí los datos van A MANO, no
   por regex).                              → category: entrance-doors
 - Retro Line RL01-RL09 (p53): 9 paneles clásicos, solo nombre + foto
   (el pliego no trae specs por modelo).    → category: entrance-doors
 - Klappläden (p48-49): Eko Persiane (Angela|Aurora, Obscura,
   Selene|Itaca, Nike|Atlante) y Cortizo Tamiz con su TECHNISCHE DATEN.
                                            → category: roller-shutters

Las fotos se recortan por cuadrante: la imagen más grande de la mitad
(izq/dcha) y banda (sup/inf) donde vive cada modelo; Retro Line son las
9 miniaturas de la mitad izquierda en orden de lectura.

Fusión con marcadores, idempotente — el extractor principal NO se puede
ejecutar (reescribiría el archivo entero, ver CONTENT.md).

Ejecutar:  python3 scripts/extract_aluminium_doors.py
"""

import json
import os

import fitz

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, "public/pdf/catalogues/aluminium-2026.pdf")
IMG_DIR = os.path.join(ROOT, "public/images/models/aluminium-2026")
DATA_FILE = os.path.join(ROOT, "src/data/catalogue-models.ts")

CATALOGUE = "aluminium-2026"
MARK_OPEN = "  // ══ Puertas y Klappläden Aluminium-Katalog (extract_aluminium_doors.py) ══"
MARK_CLOSE = "  // ══ /Puertas y Klappläden Aluminium-Katalog ══"
ANCHOR = "  // ══ /Pérgolas Aluminium-Katalog ══\n"

LED = {"label": "LED-Beleuchtung", "value": "Kaltweiß | Warmweiß"}


def S(**kw):
    """Ficha Material/Farbe/… en el orden del catálogo."""
    order = [
        ("material", "Material"),
        ("farbe", "Farbe"),
        ("applikation", "Applikation"),
        ("verglasung", "Verglasung"),
        ("stossgriff", "Stoßgriff"),
        ("rosette", "Rosette"),
        ("schutzbeschlag", "Schutzbeschlag"),
    ]
    specs = [{"label": label, "value": kw[key]} for key, label in order if key in kw]
    specs.append(LED)
    return specs


# (id, nombre, índice PDF 0-based, mitad, banda, specs)
# Mitades/bandas verificadas visualmente página a página.
PIVOT = [
    ("pivot-01", "PIVOT 01", 53, "R", "T", S(material="Aluminium", farbe="RAL 7016",
        stossgriff="PWZ im Paneel integriert, in Farbe RAL 7016, L-2200 mm", rosette="RS 20 in Schwarz")),
    ("pivot-02", "PIVOT 02", 53, "R", "B", S(material="Aluminium", farbe="RAL DB 703 Feinstruktur",
        applikation="Nutenfräsungen",
        stossgriff="PWZ 2022 PIVOT in Farbe RAL DB 703, Feinstruktur, L-2000 mm", rosette="RS 20 in Schwarz")),
    ("pivot-03", "PIVOT 03", 54, "L", "T", S(material="Aluminium", farbe="RAL 7021",
        stossgriff="PQ WE 26 in Farbe RAL 9005, Maße: 40×20 mm, L-2000 mm", rosette="RS 20 in Schwarz")),
    ("pivot-04", "PIVOT 04", 54, "L", "B", S(material="Aluminium", farbe="RAL DB 703 Struktur",
        stossgriff="PZL angeglichen an die Paneelhöhe, in Farbe RAL 9005, L-3000 mm", rosette="RS 20 in Schwarz")),
    ("pivot-05", "PIVOT 05", 54, "R", "T", S(material="Aluminium", farbe="RAL 9007",
        applikation="Nutenfräsungen", stossgriff="PWZ", rosette="RS 20 in Schwarz RAL 9007")),
    ("pivot-06", "PIVOT 06", 54, "R", "B", S(material="Aluminium | Quarzkomposit", farbe="RAL 9005 | Ossido Bruno",
        applikation="Schwarz 6 × 6 mm",
        stossgriff="PS 10 CD in Farbe RAL 9005, L-1200 mm", rosette="Aufgeklebt in edlem Schwarz")),
    ("pivot-07", "PIVOT 07", 55, "L", "T", S(material="Aluminium", farbe="RAL 9005 | Woodec Alpine",
        applikation="Flächenbündig in RAL 9005",
        stossgriff="PZW in Farbe RAL 9005, L-800 mm", rosette="RS 20 in Schwarz")),
    ("pivot-08", "PIVOT 08", 55, "L", "B", S(material="Aluminium", farbe="RAL 9005 mit stilvollen 3D-Lamellen",
        applikation="Vertikale 3D-Lamelle in Farbe Winchester-Dekor",
        stossgriff="PZV L-3000 mm, nahtlos im Paneel integriert, in Farbe RAL 9005", rosette="RS 20 in Schwarz")),
    ("pivot-09", "PIVOT 09", 55, "R", "T", S(material="Aluminium", farbe="Schwarz",
        stossgriff="PWZ in Farbe RAL 9005, L-2200 mm", rosette="61421 in Schwarz",
        schutzbeschlag="Aufgeklebt in edlem Schwarz")),
    ("pivot-10", "PIVOT 10", 55, "R", "B", S(material="Quarzkomposit", farbe="Abu Dhabi White",
        stossgriff="PS 10 in Farbe Gold", rosette="RS 20 in Farbe Gold",
        schutzbeschlag="Aufgeklebt in edlem Gold")),
    ("pivot-10-pwz", "PIVOT 10 PWZ", 56, "L", "T", S(material="Quarzkomposit", farbe="Abu Dhabi White",
        stossgriff="PWZ in Farbe RAL 9016, L-2200 mm", rosette="RS 20 in Weiß",
        schutzbeschlag="Aufgeklebt in edlem Weiß")),
    ("pivot-11", "PIVOT 11", 56, "L", "B", S(material="Aluminium",
        farbe="Decoral-Beschichtung in Farbe Dekor Natureiche", applikation="Schwarz 6 × 6 mm",
        stossgriff="PWZ 2022 in Farbe RAL 9005, L-500 mm", rosette="RS 20 in Schwarz")),
    ("pivot-12", "PIVOT 12", 57, "L", "T", S(material="Aluminium", farbe="Schwarz",
        stossgriff="PWZ in Farbe RAL 9005, L-2200 mm", rosette="61421 in Schwarz",
        schutzbeschlag="Aufgeklebt in edlem Schwarz")),
    ("pivot-13", "PIVOT 13", 57, "L", "B", S(material="Aluminium", farbe="RAL 9005",
        stossgriff="PZ-Abdeckung, an Paneelhöhe angepasst, in RAL 9005", rosette="RS 20 in Schwarz")),
    ("pivot-14", "PIVOT 14", 57, "R", "T", S(material="Aluminium", farbe="RAL 7016",
        applikation="Nutenfräsungen", verglasung="Satinova",
        stossgriff="PQ 10 aus edlem Edelstahl, Maße: 40×20 mm, L-2200 mm", rosette="RS 20 in Farbe RAL 7016")),
    ("pivot-15", "PIVOT 15", 57, "R", "B", S(material="Aluminium", farbe="VIP Rustico",
        applikation="Nutenfräsungen, vertikale und horizontale Applikation in Farben VIP Amber",
        stossgriff="PZL in exklusiver Abstimmung auf die Paneelhöhe, in tiefschwarzem RAL 9005, L-3000 mm",
        rosette="RS 20 in Schwarz")),
]

# Bullets de las contraventanas, verbatim del pliego.
PERSIANE = [
    ("eko-persiane-angela-aurora", "Eko Persiane Angela | Aurora", (0, 250, 0, 430), [
        {"label": "Lamellen", "value": "Angela: feste Lamellen · Aurora: bewegliche Lamellen"},
        {"label": "", "value": "Schiebeoption verfügbar (auf Sonderanfrage)"},
        {"label": "", "value": "Direkte Mauerwerksmontage der Flügel möglich"},
        {"label": "", "value": "Montage auf Renovierungsrahmen mit 45 mm oder 62 mm Anschlagleiste möglich"},
    ]),
    ("eko-persiane-obscura", "Eko Persiane Obscura", (250, 595, 0, 430), [
        {"label": "Ausführung", "value": "Türfüllung"},
        {"label": "", "value": "Verdeckter Rahmen: im geschlossenen Zustand nur von innen sichtbar – für eine makellose Fassade"},
        {"label": "", "value": "Flexible Montage: Direktbefestigung der Flügel am Mauerwerk möglich"},
        {"label": "", "value": "Ideale Sanierungslösung: Montage auf Renovierungsrahmen mit 45 mm oder 62 mm Anschlagleiste"},
    ]),
    ("eko-persiane-selene-itaca", "Eko Persiane Selene | Itaca", (0, 250, 430, 737), [
        {"label": "Lamellen", "value": "Feste Lamellen"},
        {"label": "", "value": "Verschluss mittels Espagnolette-Riegel oder Handgriff"},
        {"label": "", "value": "Befestigung über Renovierungsrahmen mit 25 mm Anschlagleiste"},
        {"label": "", "value": "Beschlagbänder in 6 Farben, optimal auf die Klappladenfarbe abgestimmt"},
    ]),
    ("eko-persiane-nike-atlante", "Eko Persiane Nike | Atlante", (250, 595, 430, 737), [
        {"label": "Lamellen", "value": "Bewegliche Lamellen"},
        {"label": "", "value": "Sicherer Verschluss mittels Espagnolette-Riegel oder elegantem Handgriff"},
        {"label": "", "value": "Effiziente Befestigung über Renovierungsrahmen mit 25 mm Anschlagleiste"},
        {"label": "", "value": "Perfekte Ästhetik: Beschlagbänder in 6 Farben, optimal auf die Klappladenfarbe abgestimmt"},
    ]),
]

TAMIZ_SPECS = [
    {"label": "Max. Breite", "value": "1600 mm"},
    {"label": "Max. Höhe", "value": "2500 mm"},
    {"label": "Max. Flügelgewicht", "value": "65 kg"},
    {"label": "Bautiefe des Rahmens", "value": "47 mm"},
    {"label": "Bautiefe des Flügels", "value": "40 mm"},
    {"label": "Bauarten", "value": "Fix, Dreh-, Schiebe- und Dreh-Falt-Systeme"},
    {"label": "", "value": "Lamellen flexibel verstellbar oder im festen Neigungswinkel – für eine optimale Licht- und Sichtregulierung"},
    {"label": "", "value": "Hochwertig lackiert in ausgewählten RAL-Farbtönen sowie in edlen Holzdekoren erhältlich"},
    {"label": "", "value": "Ausgestattet mit modernen Markenbeschlägen Roto Fentro"},
]

# Del pliego Retro Line (p53), texto introductorio — no hay specs por
# modelo impresas, y no se inventan.
RETRO_NOTE = [
    {"label": "", "value": "Türpaneel der Serie Despiro Retro Line: zeitlos schöne Designs mit stilvollen, klassischen Dekorelementen"},
]


def biggest_in(page, x0, x1, y0=0, y1=10_000):
    best = None
    for img in page.get_images(full=True):
        for rect in page.get_image_rects(img[0]):
            cx, cy = rect.x0 + rect.width / 2, rect.y0 + rect.height / 2
            if x0 <= cx <= x1 and y0 <= cy <= y1:
                if best is None or rect.get_area() > best.get_area():
                    best = rect
    if best is None:
        raise SystemExit(f"✗ sin imagen en zona ({x0},{y0})–({x1},{y1}) de p{page.number + 1}")
    return best


def union_in(page, x0, x1, y0, y1):
    box = None
    for img in page.get_images(full=True):
        for rect in page.get_image_rects(img[0]):
            cx, cy = rect.x0 + rect.width / 2, rect.y0 + rect.height / 2
            if x0 <= cx <= x1 and y0 <= cy <= y1:
                box = fitz.Rect(rect) if box is None else box | rect
    if box is None:
        raise SystemExit(f"✗ sin imágenes en zona ({x0},{y0})–({x1},{y1}) de p{page.number + 1}")
    return box


def save(page, rect, model_id, zoom=2.2):
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=rect, alpha=False)
    pix.save(os.path.join(IMG_DIR, f"{model_id}.jpg"), jpg_quality=86)


def main():
    doc = fitz.open(PDF)
    os.makedirs(IMG_DIR, exist_ok=True)
    models = []
    mid_x, mid_y = 595.3, 368.5

    # La plantilla PIVOT es fija: la puerta vive siempre en el tercio
    # izquierdo de su cuadrante y el texto a su derecha — recorte por
    # caja fija del cuadrante, no por bitmap (que arrastra el texto).
    door_box = {
        ("L", "T"): fitz.Rect(60, 25, 275, 340),
        ("L", "B"): fitz.Rect(60, 358, 275, 675),
        ("R", "T"): fitz.Rect(650, 25, 865, 340),
        ("R", "B"): fitz.Rect(650, 358, 865, 675),
    }
    for model_id, name, index, half, band, specs in PIVOT:
        page = doc[index]
        box = fitz.Rect(door_box[(half, band)])
        # En p58 la columna de texto izquierda empieza un pelín antes.
        if index == 57 and half == "L":
            box.x1 = 264
        save(page, box, model_id)
        models.append({"id": model_id, "catalogue": CATALOGUE, "name": name,
                       "family": "PIVOT Line", "category": "entrance-doors",
                       "page": index + 1, "image": f"/images/models/{CATALOGUE}/{model_id}.jpg",
                       "specs": specs})

    # Retro Line: las 9 miniaturas de la mitad izquierda de p53, en
    # orden de lectura (RL01-RL09).
    page = doc[52]
    thumbs = []
    for img in page.get_images(full=True):
        for rect in page.get_image_rects(img[0]):
            if rect.x0 + rect.width / 2 < mid_x and rect.get_area() < 60_000:
                thumbs.append(fitz.Rect(rect))
    if len(thumbs) != 9:
        raise SystemExit(f"✗ Retro Line: esperaba 9 miniaturas, hay {len(thumbs)}")
    thumbs.sort(key=lambda r: (round(r.y0 / 100), r.x0))
    for n, rect in enumerate(thumbs, start=1):
        model_id = f"retro-line-rl{n:02d}"
        # sin el rótulo RLxx impreso bajo la miniatura
        rect = fitz.Rect(rect.x0, rect.y0, rect.x1, rect.y1 - rect.height * 0.13)
        save(page, rect, model_id, zoom=3.2)
        models.append({"id": model_id, "catalogue": CATALOGUE, "name": f"RL{n:02d}",
                       "family": "Retro Line", "category": "entrance-doors",
                       "page": 53, "image": f"/images/models/{CATALOGUE}/{model_id}.jpg",
                       "specs": RETRO_NOTE})

    # Klappläden Eko Persiane (p48): la foto sin la columna de texto
    # (la unión de bitmaps arrastra los rótulos de al lado).
    page = doc[47]
    for model_id, name, (x0, x1, y0, y1), specs in PERSIANE:
        box = union_in(page, x0, x1, y0, y1)
        crop = fitz.Rect(box.x0, box.y0, min(box.x1, box.x0 + box.width * 0.62), box.y1)
        save(page, crop, model_id)
        models.append({"id": model_id, "catalogue": CATALOGUE, "name": name,
                       "family": "Außenklappläden", "category": "roller-shutters",
                       "page": 48, "image": f"/images/models/{CATALOGUE}/{model_id}.jpg",
                       "specs": specs})

    # Tamiz: caja fija — el bitmap del perfil arrastra el rótulo vecino.
    page = doc[48]
    save(page, fitz.Rect(158, 158, 296, 452), "cortizo-tamiz")
    models.append({"id": "cortizo-tamiz", "catalogue": CATALOGUE, "name": "Cortizo Tamiz",
                   "family": "Außenklappläden", "category": "roller-shutters",
                   "page": 49, "image": f"/images/models/{CATALOGUE}/cortizo-tamiz.jpg",
                   "specs": TAMIZ_SPECS})
    doc.close()

    with open(DATA_FILE, encoding="utf-8") as f:
        content = f.read()
    if MARK_OPEN in content:
        a = content.index(MARK_OPEN)
        b = content.index(MARK_CLOSE) + len(MARK_CLOSE) + 1
        content = content[:a] + content[b:]

    insert_at = content.index(ANCHOR) + len(ANCHOR)
    entries = []
    for model in models:
        blob = json.dumps(model, ensure_ascii=False, indent=2)
        entries.append("\n".join("  " + line for line in blob.splitlines()) + ",")
    block = MARK_OPEN + "\n" + "\n".join(entries) + "\n" + MARK_CLOSE + "\n"
    content = content[:insert_at] + block + content[insert_at:]
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✓ {len(models)} modelos (PIVOT {len(PIVOT)}, Retro 9, Klappläden 5) fundidos en catalogue-models.ts")


if __name__ == "__main__":
    main()
