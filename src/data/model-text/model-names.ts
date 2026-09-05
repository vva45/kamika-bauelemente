/**
 * Nombres de modelo que son DESCRIPCIÓN y no marca.
 *
 * Los nombres de producto se quedan como los imprime el catálogo en los
 * tres idiomas (Select 11, INFINITI X, Prizzi, Keramik No. 03, PIVOT 07):
 * son lo que el cliente cita en la consulta y lo que encuentra en el
 * PDF. Pero muchos accesorios y sistemas no tienen nombre propio, solo
 * la palabra genérica del catálogo — "Türspion", "Klamki", "Paneel 12",
 * "Alaska 1 Dekorrahmen" — y esa palabra sí se traduce.
 *
 * Tres familias se generan a partir de los propios modelos para no
 * listar 200 líneas a mano: "Paneel NN" → "Panel NN", "X Dekorrahmen" →
 * "X decorative frame", "Stangengriffe X" → "Bar handles X".
 */
import { CATALOGUE_MODELS } from "../catalogue-models.ts";
import { t, type ModelText } from "./helpers.ts";

const HAND: Record<string, ModelText> = {
  // ---- aussenturen: control de acceso, herrajes, buzón, umbrales
  "Fingerabdruckscanner, Tastatur und RFID": t("Fingerabdruckscanner, Tastatur und RFID", "Fingerprint scanner, keypad and RFID", "Czytnik linii papilarnych, klawiatura i RFID"),
  "Tastatur EKEY (Schwarz)": t("Tastatur EKEY (Schwarz)", "EKEY keypad (black)", "Klawiatura EKEY (czarna)"),
  "Tastatur EKEY (Stahl)": t("Tastatur EKEY (Stahl)", "EKEY keypad (steel)", "Klawiatura EKEY (stal)"),
  "Tastatur IDENCOM": t("Tastatur IDENCOM", "IDENCOM keypad", "Klawiatura IDENCOM"),
  "RFID Leser IDENCOM": t("RFID-Leser IDENCOM", "IDENCOM RFID reader", "Czytnik RFID IDENCOM"),
  "Fingerprint IDENCOM": t("Fingerprint IDENCOM", "IDENCOM fingerprint reader", "Czytnik linii papilarnych IDENCOM"),
  "Fingerprint EKEY dLine": t("Fingerprint EKEY dLine", "EKEY dLine fingerprint reader", "Czytnik linii papilarnych EKEY dLine"),
  "Fingerprint EKEY (Stahl)": t("Fingerprint EKEY (Stahl)", "EKEY fingerprint reader (steel)", "Czytnik linii papilarnych EKEY (stal)"),
  "Leser SOMMER": t("Leser SOMMER", "SOMMER reader", "Czytnik SOMMER"),
  "Türspion": t("Türspion", "Door viewer", "Wizjer drzwiowy"),
  "Warme Kante Swisspacer Ultimate": t("Warme Kante Swisspacer Ultimate", "Warm-edge spacer Swisspacer Ultimate", "Ciepła ramka Swisspacer Ultimate"),
  "Reed-Schalter": t("Reed-Schalter", "Reed switch", "Kontaktron"),
  "Rollenband für Aluminium": t("Rollenband für Aluminium", "Roller hinge for aluminium", "Zawias rolkowy do aluminium"),
  "3-flügeliges Band für Aluminium": t("3-flügeliges Band für Aluminium", "3-part hinge for aluminium", "Zawias 3-skrzydełkowy do aluminium"),
  "Verdeck liegendes Band für Aluminium": t("Verdeckt liegendes Band für Aluminium", "Concealed hinge for aluminium", "Zawias ukryty do aluminium"),
  "3-flügeliges Band für PVC": t("3-flügeliges Band für PVC", "3-part hinge for PVC", "Zawias 3-skrzydełkowy do PVC"),
  "Briefkasten": t("Briefkasten", "Letterbox", "Skrzynka na listy"),
  "Aluminiumschwelle mit thermischer Trennung": t("Aluminiumschwelle mit thermischer Trennung", "Thermally broken aluminium threshold", "Próg aluminiowy z przekładką termiczną"),
  "Combi Schwelle": t("Combi-Schwelle", "Combi threshold", "Próg Combi"),
  "0 mm Schwelle": t("0-mm-Schwelle", "0 mm threshold", "Próg 0 mm"),

  // ---- rollladen-drutex: sistemas y accesorios
  "Aufsatzrollladen RN": t("Aufsatzrollladen RN", "Top-mounted roller shutter RN", "Roleta nadstawna RN"),
  "Aufsatzrollladen RS": t("Aufsatzrollladen RS", "Top-mounted roller shutter RS", "Roleta nadstawna RS"),
  "Vorsatzrollläden": t("Vorsatzrollläden", "Front-mounted roller shutters", "Rolety zewnętrzne nakładane"),
  "Raffstoren": t("Raffstoren", "External venetian blinds", "Żaluzje fasadowe"),
  "Insektenschutz-Plisee": t("Insektenschutz-Plissee", "Pleated insect screen", "Moskitiera plisowana"),
  "Panzerendleiste": t("Panzerendleiste", "Curtain end slat", "Listwa końcowa pancerza"),
  "Insektenschutzendleiste": t("Insektenschutz-Endleiste", "Insect-screen end slat", "Listwa końcowa moskitiery"),
  "PKLU - Schlüsselschalter": t("PKLU – Schlüsselschalter", "PKLU – key switch", "PKLU – przełącznik kluczykowy"),
  "PK1 - Standardschalter": t("PK1 – Standardschalter", "PK1 – standard switch", "PK1 – przełącznik standardowy"),
  "Fernbedienung SOMFY Situo 1 Var IO Pure II – 1-Kanal": t("Fernbedienung SOMFY Situo 1 Var IO Pure II – 1-Kanal", "SOMFY Situo 1 Var IO Pure II remote – 1 channel", "Pilot SOMFY Situo 1 Var IO Pure II – 1-kanałowy"),
  "Fernbedienung SOMFY Situo 5 Var IO Pure II – 5-Kanal": t("Fernbedienung SOMFY Situo 5 Var IO Pure II – 5-Kanal", "SOMFY Situo 5 Var IO Pure II remote – 5 channels", "Pilot SOMFY Situo 5 Var IO Pure II – 5-kanałowy"),
  "Universal Adapter standardmäßig": t("Universaladapter (Standard)", "Universal adapter (standard)", "Adapter uniwersalny (standard)"),
  "Gurtwickler - 14mm": t("Gurtwickler – 14 mm", "Belt winder – 14 mm", "Zwijacz pasa – 14 mm"),
  "Kurbelgetriebe": t("Kurbelgetriebe", "Crank gear", "Przekładnia korbowa"),
  "PKS festes Kurbelgetriebe": t("PKS festes Kurbelgetriebe", "PKS fixed crank gear", "PKS stała przekładnia korbowa"),

  // ---- salamander-systeme: la página "Dodatki" viene en polaco
  "Ciepłe ramki": t("Warme Kante", "Warm-edge spacers", "Ciepłe ramki"),
  "Nawiewniki": t("Lüfter", "Trickle vents", "Nawiewniki"),
  "Podwaliny": t("Unterlegprofile", "Sub-sill profiles", "Podwaliny"),
  "Szprosy": t("Sprossen", "Glazing bars", "Szprosy"),
  "Osłonki": t("Abdeckkappen", "Cover caps", "Osłonki"),
  "Parapety": t("Fensterbänke", "Window sills", "Parapety"),
  "Klamki": t("Griffe", "Handles", "Klamki"),

  // ---- iglo-fenster: capítulos de accesorios
  "Sprossen": t("Sprossen", "Glazing bars", "Szprosy"),
  "Balkontürschwellen": t("Balkontürschwellen", "Balcony door thresholds", "Progi drzwi balkonowych"),
  "Beschläge": t("Beschläge", "Hardware", "Okucia"),
  "Renovationsrahmen und Vorsatzrahmen": t("Renovationsrahmen und Vorsatzrahmen", "Renovation frames and add-on frames", "Ramy renowacyjne i nakładkowe"),
  "Ventilierungen": t("Lüftungen", "Ventilation", "Wentylacja"),
  "Griffe": t("Griffe", "Handles", "Klamki"),

  // ---- garagentore
  "Rolltore BGR SK / Intense": t("Rolltore BGR SK / Intense", "Roller doors BGR SK / Intense", "Bramy rolowane BGR SK / Intense"),
  "Rollgitter BKR SK": t("Rollgitter BKR SK", "Roller grille BKR SK", "Krata rolowana BKR SK"),

  // ---- wiked-pvc-alu: manillas y herrajes
  "Fenstergriff Standard": t("Fenstergriff Standard", "Window handle Standard", "Klamka okienna Standard"),
  "Fenstergriff Retro": t("Fenstergriff Retro", "Window handle Retro", "Klamka okienna Retro"),
  "MACO PSK-Griffgarnitur": t("MACO PSK-Griffgarnitur", "MACO tilt-and-slide handle set", "Zestaw klamek MACO PSK"),
  "Terrassengriff Victory": t("Terrassengriff Victory", "Patio door handle Victory", "Klamka tarasowa Victory"),
  "HS-Griffgarnitur": t("HS-Griffgarnitur", "Lift-and-slide handle set", "Zestaw klamek HST"),
  "Türdrücker Dublin": t("Türdrücker Dublin", "Lever handle Dublin", "Klamka drzwiowa Dublin"),
  "Stoßgriff Alfa": t("Stoßgriff Alfa", "Pull handle Alfa", "Pochwyt Alfa"),
  "Stoßgriff Beta": t("Stoßgriff Beta", "Pull handle Beta", "Pochwyt Beta"),
  "Türband Jocker": t("Türband Jocker", "Door hinge Jocker", "Zawias drzwiowy Jocker"),
};

// Familias generadas a partir de los nombres reales.
const GENERATED: Record<string, ModelText> = {};
for (const { name } of CATALOGUE_MODELS) {
  if (GENERATED[name] || HAND[name]) continue;
  const panel = /^Paneel (.+)$/.exec(name);
  if (panel) GENERATED[name] = t(name, `Panel ${panel[1]}`, `Panel ${panel[1]}`);
  const deko = /^(.+) Dekorrahmen$/.exec(name);
  if (deko) GENERATED[name] = t(name, `${deko[1]} decorative frame`, `${deko[1]} rama dekoracyjna`);
  const bar = /^Stangengriffe (.+)$/.exec(name);
  if (bar) {
    GENERATED[name] = t(
      name,
      `Bar handles ${bar[1].replace(" mit ", " with ")}`,
      `Pochwyty ${bar[1].replace(" mit ", " z ")}`,
    );
  }
}

export const MODEL_NAMES_TEXT: Record<string, ModelText> = { ...GENERATED, ...HAND };
