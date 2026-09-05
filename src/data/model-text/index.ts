/**
 * Diccionario de traducción del texto de los modelos de catálogo.
 *
 * Clave: el texto EXACTO tal como está en `catalogue-models.ts` (lo
 * escriben los extractores, copiado del PDF). Valor: ese texto en los
 * tres idiomas. El alemán es casi siempre el original; en los ROKA el
 * original es el inglés (sus catálogos se extrajeron cuando la web era
 * monolingüe en inglés) y un accesorio WIKĘD viene en polaco.
 *
 * Reglas:
 *  - Los nombres propios de acabados (Sediment Taupe, Ossido Bruno,
 *    Golden Oak, Woodec Alpine…) NO se traducen: son nombres de
 *    producto y así los busca el cliente en el catálogo.
 *  - Las medidas, códigos y unidades se copian tal cual.
 *  - Erratas evidentes del PDF se corrigen en las tres versiones
 *    (p. ej. "ist für ist für"); nada se añade ni se inventa.
 *
 * `needsModelTranslation()` decide qué textos DEBEN estar aquí (los que
 * tienen alguna palabra de verdad, no solo números/códigos); la
 * auditoría la usa para fallar si un extractor nuevo trae texto sin
 * traducir. Un fichero por catálogo, fundidos abajo. Los imports llevan
 * `.ts` para que la auditoría pueda cargar esto con Node (ver helpers).
 */
import { ALUMINIUM_TEXT } from "./aluminium-2026.ts";
import { DOORS_TEXT } from "./doors.ts";
import { FASSADENJALOUSIEN_TEXT } from "./fassadenjalousien.ts";
import { GARAGENTORE_TEXT } from "./garagentore.ts";
import { GRUNDSTUECKSZAEUNE_TEXT } from "./grundstueckszaeune.ts";
import type { ModelText } from "./helpers.ts";
import { IGLO_TEXT } from "./iglo-fenster.ts";
import { MODEL_NAMES_TEXT } from "./model-names.ts";
import { ROKA_TEXT } from "./roka-2025.ts";
import { ROLLLADEN_DRUTEX_TEXT } from "./rollladen-drutex.ts";
import { ROLLLADEN_TEXT } from "./rollladen-produktkatalog.ts";
import { WIKED_TEXT } from "./wiked-pvc-alu.ts";

export type { ModelText } from "./helpers.ts";

export const MODEL_TEXT: Record<string, ModelText> = {
  ...ALUMINIUM_TEXT,
  ...WIKED_TEXT,
  ...GRUNDSTUECKSZAEUNE_TEXT,
  ...ROLLLADEN_TEXT,
  ...FASSADENJALOUSIEN_TEXT,
  ...ROLLLADEN_DRUTEX_TEXT,
  ...IGLO_TEXT,
  ...GARAGENTORE_TEXT,
  ...ROKA_TEXT,
  ...DOORS_TEXT,
  ...MODEL_NAMES_TEXT,
};

// Fichas de código/unidad que no son palabras: un texto compuesto solo
// de esto (y números) no necesita traducción.
const CODE_TOKENS = new Set([
  "RAL", "RC", "EI", "DIN", "ISO", "PVC", "ALU", "LED", "VSG", "ESG", "HST", "PSK", "PUR", "XPS",
  "HPL", "USB", "WLAN", "EKO", "PA", "NCS", "DB", "VIP", "EK", "ES", "RS", "PWZ", "PZL", "PQ",
  "PS", "PZW", "PZV", "PZ", "UV", "IP", "IPX", "UW", "UD", "UG", "UF", "mm", "cm", "kg", "max",
  "min", "Max", "Min", "Uw", "Ud", "Ug", "Uf", "Rw", "dB", "Nm", "kN", "Pa", "mit",
]);

/** ¿Tiene este texto alguna palabra de verdad (≥3 letras que no sea un código)? */
export const needsModelTranslation = (text: string): boolean =>
  text
    .split(/[\s|,;/·()×x\-–+:.]+/)
    .some((token) => /^[A-Za-zÄÖÜäöüßŁłĄąĘęÓóŚśŻżŹźĆćŃń]{3,}$/.test(token) && !CODE_TOKENS.has(token));
