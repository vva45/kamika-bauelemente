/**
 * Puertas de entrada: paneles (entrance-door-panels), Despiro, D-Art Line,
 * Außentüren (Eko-Okna) y el accesorio de Salamander en polaco.
 */
import { n, t, type ModelText } from "./helpers.ts";

export const DOORS_TEXT: Record<string, ModelText> = {
  // ---- entrance-door-panels: etiquetas (originales en inglés)
  "PVC size": t("Größe PVC", "PVC size", "Wymiar PVC"),
  "Aluminium size": t("Größe Aluminium", "Aluminium size", "Wymiar aluminium"),
  "Wood size": t("Größe Holz", "Wood size", "Wymiar drewno"),

  // ---- despiro-entrance-doors: valores
  "· Vordere Verglasung: VSG 33.1 Thermofloat": t(
    "· Vordere Verglasung: VSG 33.1 Thermofloat",
    "· Front glazing: laminated safety glass 33.1 Thermofloat",
    "· Przeszklenie od frontu: szkło laminowane VSG 33.1 Thermofloat",
  ),
  "· Flächenbündige Applikation INOX oder Schwarz · Vordere Verglasung: VSG 33.1 Thermofloat": t(
    "· Flächenbündige Applikation INOX oder Schwarz · Vordere Verglasung: VSG 33.1 Thermofloat",
    "· Flush application in INOX or black · Front glazing: laminated safety glass 33.1 Thermofloat",
    "· Aplikacja licowana INOX lub czarna · Przeszklenie od frontu: szkło laminowane VSG 33.1 Thermofloat",
  ),
  "· Glattes Paneel ohne Muster auf beiden Seiten bündig · Vordere Verglasung: VSG 33.1 Thermofloat": t(
    "· Glattes Paneel ohne Muster, auf beiden Seiten bündig · Vordere Verglasung: VSG 33.1 Thermofloat",
    "· Smooth panel without pattern, flush on both sides · Front glazing: laminated safety glass 33.1 Thermofloat",
    "· Gładki panel bez wzoru, licowany z obu stron · Przeszklenie od frontu: szkło laminowane VSG 33.1 Thermofloat",
  ),

  // ---- d-art-line: familias (nombres de línea), etiquetas y acabados
  "Classic": n("Classic"),
  "Elegance": n("Elegance"),
  "Modern": n("Modern"),
  "Prestige": n("Prestige"),
  "Geometric": n("Geometric"),
  "Drücker": t("Drücker", "Lever handle", "Klamka"),
  "Sandgestrahlt": t("Sandgestrahlt", "Sandblasted", "Piaskowane"),
  "Stangengriffe": t("Stangengriffe", "Bar handles", "Pochwyty"),
  "Anodic Graphite / Anodic Bronze": n("Anodic Graphite / Anodic Bronze"),
  "Madeleine Antique Satin Gold": n("Madeleine Antique Satin Gold"),
  "Metallic Marrone": n("Metallic Marrone"),
  "Anodic Graphite": n("Anodic Graphite"),
  "Wenge / Gold Splendour": n("Wenge / Gold Splendour"),
  "Ginkgo Biloba Antique Satin Gold": n("Ginkgo Biloba Antique Satin Gold"),
  "Anodic Plum / Gold Splendour": n("Anodic Plum / Gold Splendour"),
  "Gold Splendour": n("Gold Splendour"),
  "Anodic Pearl / Metallic Night": n("Anodic Pearl / Metallic Night"),
  "Black mit Black": t("Black mit Black", "Black with Black", "Black z Black"),
  "Champagne": n("Champagne"),
  "Black mit Frappucino": t("Black mit Frappucino", "Black with Frappucino", "Black z Frappucino"),
  "Champagne / Sparkling Brown": n("Champagne / Sparkling Brown"),
  "Gold Splendour mit White": t("Gold Splendour mit White", "Gold Splendour with White", "Gold Splendour z White"),
  "Metallic Night / Anodic Bronze": n("Metallic Night / Anodic Bronze"),
  "Metallic Night mit Frappucino": t("Metallic Night mit Frappucino", "Metallic Night with Frappucino", "Metallic Night z Frappucino"),
  "Anodic Brown / Anodic Bronze / Lacobel": n("Anodic Brown / Anodic Bronze / Lacobel"),
  "Anodic Bronze mit Maraqina": t("Anodic Bronze mit Maraqina", "Anodic Bronze with Maraqina", "Anodic Bronze z Maraqina"),
  "Anodic Pearl": n("Anodic Pearl"),
  "Anodic Pearl mit Maraqina": t("Anodic Pearl mit Maraqina", "Anodic Pearl with Maraqina", "Anodic Pearl z Maraqina"),
  "Sparkling Grey": n("Sparkling Grey"),
  "Black mit Stratuario": t("Black mit Stratuario", "Black with Stratuario", "Black z Stratuario"),
  "Anodic Steel": n("Anodic Steel"),
  "Metallic Iron": n("Metallic Iron"),
  "Black mit Maraqina": t("Black mit Maraqina", "Black with Maraqina", "Black z Maraqina"),
  "Metalic Cream": n("Metallic Cream"),
  "Anodic Sand mit Black": t("Anodic Sand mit Black", "Anodic Sand with Black", "Anodic Sand z Black"),
  "Metallic NIght mit Frappucino": t("Metallic Night mit Frappucino", "Metallic Night with Frappucino", "Metallic Night z Frappucino"),
  "Cappuccino": n("Cappuccino"),
  "Ponte 01 Black": n("Ponte 01 Black"),
  "Metallic Marrone / 81018C": n("Metallic Marrone / 81018C"),
  "Metallic Marrone / Lacobel": n("Metallic Marrone / Lacobel"),
  "Lacobel": n("Lacobel"),
  "Fala Anodic Bronze": n("Fala Anodic Bronze"),
  "Anodic Pearl, Metalic Night, Metallic Iron": n("Anodic Pearl, Metallic Night, Metallic Iron"),
  "Metallic Cream": n("Metallic Cream"),

  // ---- aussenturen (Eko-Okna)
  "Aluminiumtüren": t("Aluminiumtüren", "Aluminium doors", "Drzwi aluminiowe"),
  "PVC-Türen": t("PVC-Türen", "PVC doors", "Drzwi PVC"),
  "Zutrittskontrolle": t("Zutrittskontrolle", "Access control", "Kontrola dostępu"),
  "Optionales Zubehör": t("Optionales Zubehör", "Optional accessories", "Akcesoria opcjonalne"),
  "Schwellen": t("Schwellen", "Thresholds", "Progi"),
  "Musterposition": t("Musterposition", "Pattern position", "Pozycja wzoru"),
  "Hinweis": t("Hinweis", "Note", "Uwaga"),
  "Left, Right": t("Links, Rechts", "Left, Right", "Lewa, prawa"),
  "Left, Right, Center": t("Links, Rechts, Mitte", "Left, Right, Centre", "Lewa, prawa, środek"),
  "Center": t("Mitte", "Centre", "Środek"),
  "Bestellung in spiegelverkehrt möglich": t("Bestellung spiegelverkehrt möglich", "Can also be ordered as a mirror image", "Możliwość zamówienia w wersji lustrzanej"),

  // ---- salamander-systeme: familia en polaco
  "Dodatki": t("Zubehör", "Accessories", "Dodatki"),
};
