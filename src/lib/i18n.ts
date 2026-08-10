/**
 * Capa de internacionalización, hecha a mano y sin dependencias.
 *
 * El sitio se publica en tres idiomas por prefijo de URL — /de (el
 * mercado real, y el idioma por defecto), /en y /pl. Todo es estático:
 * cada página se prerenderiza tres veces y el idioma activo se decide
 * una sola vez por render.
 *
 * CÓMO SABE `t()` EL IDIOMA sin pasarlo por props a sesenta
 * componentes:
 *
 *  · En el SERVIDOR, un almacén por render (React `cache()`): cada
 *    página y el layout lo fijan con `setRequestLocale(locale)` nada
 *    más leer sus params — antes de su primer `t()`. Layout y página
 *    renderizan en paralelo en el App Router, por eso lo fijan LOS
 *    DOS y no solo el layout.
 *
 *  · En el CLIENTE, el layout emite `window.__LOCALE` en un <script>
 *    inline del <head>, que se evalúa antes de hidratar nada: los
 *    componentes de cliente leen el mismo idioma que ya trae el HTML
 *    y no hay desajuste de hidratación. El selector de idiomas navega
 *    con <a> (recarga completa), así el valor nunca cambia en vivo.
 */
import { cache } from "react";
import { en, type ContentKey } from "@/content/en";
import { de } from "@/content/de";
import { pl } from "@/content/pl";

export type Locale = "de" | "en" | "pl";

export const LOCALES: Locale[] = ["de", "en", "pl"];

/** El idioma por defecto: el del mercado. La raíz redirige a /de. */
export const DEFAULT_LOCALE: Locale = "de";

/** Cómo se llama cada idioma A SÍ MISMO, para el selector. */
export const LOCALE_LABEL: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  pl: "Polski",
};

export const isLocale = (value: string): value is Locale =>
  (LOCALES as string[]).includes(value);

declare global {
  interface Window {
    __LOCALE?: Locale;
  }
}

// Almacén por render (servidor). En cliente `cache` es inocuo y este
// camino no se usa.
const requestLocale = cache((): { current: Locale } => ({ current: DEFAULT_LOCALE }));

export const setRequestLocale = (locale: string): void => {
  // Tolerante a string: los params de ruta llegan sin tipar. Un valor
  // inválido no puede colarse (dynamicParams=false), pero si llegara,
  // mejor el idioma por defecto que un error de tipos en cada página.
  if (isLocale(locale)) requestLocale().current = locale;
};

export const currentLocale = (): Locale =>
  typeof window === "undefined"
    ? requestLocale().current
    : (window.__LOCALE ?? DEFAULT_LOCALE);

const DICTIONARIES: Record<Locale, Record<ContentKey, string>> = { en, de, pl };

/**
 * Versiones parametrizadas por idioma. Son las que usan tanto los
 * ayudantes globales de servidor (t, tf) como el hook de cliente
 * (useI18n): una sola implementación, dos formas de saber el idioma.
 */
export const tFor = (locale: Locale, key: ContentKey): string => {
  const value = DICTIONARIES[locale][key];
  return value === "" ? en[key] : value;
};

export const tfFor = (
  locale: Locale,
  key: ContentKey,
  values: Record<string, string | number>,
): string =>
  tFor(locale, key).replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );

/**
 * Devuelve el texto de interfaz de una clave en el idioma activo.
 * Si la traducción está vacía, cae al inglés (el idioma de autoría),
 * de modo que una traducción a medias nunca deja un hueco en la web.
 *
 * SOLO para componentes de SERVIDOR. Los de cliente usan `useI18n()`:
 * su prerender corre en otro grafo de módulos donde este almacén no
 * existe, y el contexto es lo único que les llega igual en los dos
 * pases (por eso el desajuste de hidratación que hubo — ver
 * LocaleProvider).
 */
export const t = (key: ContentKey): string => tFor(currentLocale(), key);

/**
 * Interpola `{placeholders}` en un texto de la capa de contenido.
 * Ej.: tf('product.modelsOther', { count: 4 }) → "4 models".
 */
export const tf = (key: ContentKey, values: Record<string, string | number>): string =>
  tfFor(currentLocale(), key, values);

/**
 * Texto que vive en la capa de datos (nombres de categoría, descripciones
 * de producto, resúmenes de proyecto…). El inglés es obligatorio porque
 * es el idioma en el que se autoría; alemán y polaco caen al inglés
 * mientras falten.
 */
export type Localized<T> = { en: T; de?: T; pl?: T };

/** Elige el idioma activo con caída automática al inglés. */
export const pick = <T,>(v: Localized<T>, locale: Locale = currentLocale()): T =>
  v[locale] ?? v.en;

/**
 * Números siempre con el separador del idioma activo: `0.7` se imprime
 * `0,7` en alemán y polaco sin tocar los datos.
 */
export const formatNumberFor = (
  locale: Locale,
  value: number,
  options?: Intl.NumberFormatOptions,
): string => new Intl.NumberFormat(locale, options).format(value);

export const formatNumber = (value: number, options?: Intl.NumberFormatOptions): string =>
  formatNumberFor(currentLocale(), value, options);

export type { ContentKey };
