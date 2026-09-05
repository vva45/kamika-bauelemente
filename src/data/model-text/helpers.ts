/**
 * Atajos para escribir las entradas del diccionario de texto de modelos.
 * Viven aparte de `index.ts` para que las partes no importen el índice
 * que a su vez las importa (dependencia circular).
 *
 * Los imports internos de `model-text/` llevan extensión `.ts` para que
 * `scripts/audit.mjs` pueda cargar el diccionario directamente con Node
 * (strip-types no resuelve imports sin extensión).
 */
import type { Localized } from "@/lib/i18n";

export type ModelText = Required<Localized<string>>;

/** t(de, en, pl). */
export const t = (de: string, en: string, pl: string): ModelText => ({ de, en, pl });

/** Nombre propio (acabado, tirador, vidrio decorativo): igual en los tres idiomas. */
export const n = (name: string): ModelText => ({ de: name, en: name, pl: name });
