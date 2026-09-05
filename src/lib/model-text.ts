/**
 * Texto de MODELO de catálogo, en el idioma de la página.
 *
 * Los modelos (`catalogue-models.ts`) llevan sus specs, familias y
 * descripciones tal cual las imprime cada catálogo — alemán en la
 * mayoría, inglés en los ROKA, hasta polaco en un accesorio WIKĘD. Eso
 * era correcto mientras la web fue monolingüe; con /de, /en y /pl el
 * visitante veía una mezcla. `tm()` busca el texto exacto en el
 * diccionario `MODEL_TEXT` y devuelve la versión del idioma activo. Lo
 * que no esté en el diccionario sale tal cual (nunca se rompe nada), y
 * la auditoría avisa de cada texto que falte.
 */
import { MODEL_TEXT } from "@/data/model-text";
import { pick } from "@/lib/i18n";

export const tm = (text: string): string => {
  const entry = MODEL_TEXT[text];
  return entry ? pick(entry) : text;
};
