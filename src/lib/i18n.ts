/**
 * Capa de internacionalización, hecha a mano y sin dependencias.
 *
 * Hoy el sitio se publica en inglés porque es el idioma en el que se
 * revisa. El mercado real es Alemania, así que el cambio a alemán tiene
 * que ser trivial: rellenar `de.ts`, rellenar los campos `de` de los
 * datos, y cambiar LOCALE aquí abajo. Ni un componente se toca.
 */
import { en, type ContentKey } from "@/content/en";
import { de } from "@/content/de";

export type Locale = "en" | "de";

/** ← el día que cambiemos el sitio a alemán, esto pasa a 'de'. */
export const LOCALE: Locale = "en";

const DICTIONARIES: Record<Locale, Record<ContentKey, string>> = { en, de };

/**
 * Devuelve el texto de interfaz de una clave.
 * Si la traducción del idioma activo está vacía, cae al inglés, de modo
 * que una traducción a medias nunca deja un hueco en blanco en la web.
 */
export const t = (key: ContentKey): string => {
  const value = DICTIONARIES[LOCALE][key];
  return value === "" ? en[key] : value;
};

/**
 * Interpola `{placeholders}` en un texto de la capa de contenido.
 * Ej.: t2('product.modelsOther', { count: 4 }) → "4 models".
 */
export const tf = (key: ContentKey, values: Record<string, string | number>): string =>
  t(key).replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );

/**
 * Texto que vive en la capa de datos (nombres de categoría, descripciones
 * de producto, resúmenes de proyecto…). El inglés es obligatorio; el
 * alemán, opcional hasta que se traduzca.
 */
export type Localized<T> = { en: T; de?: T };

/** Elige el idioma activo con caída automática al inglés. */
export const pick = <T,>(v: Localized<T>, locale: Locale = LOCALE): T => v[locale] ?? v.en;

/**
 * Números siempre con el separador del idioma activo: `0.7` se imprime
 * `0,7` en alemán sin tocar los datos.
 */
export const formatNumber = (value: number, options?: Intl.NumberFormatOptions): string =>
  new Intl.NumberFormat(LOCALE, options).format(value);

export type { ContentKey };
