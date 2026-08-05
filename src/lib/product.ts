/**
 * Reglas de negocio de producto que se usan en más de un sitio.
 */
import type { Product } from "@/data/types";
import { formatNumber } from "@/lib/i18n";

/**
 * Destino del botón "Technical data sheet".
 *
 * Orden: ficha propia → página exacta dentro del catálogo general.
 * Si no hay ninguna de las dos devuelve null y el botón NO se pinta:
 * antes sin botón que con un enlace muerto.
 */
export const datasheetHref = (product: Product): string | null => {
  if (product.datasheet) return product.datasheet;

  if (product.catalogue) {
    const file = `/pdf/catalogues/${product.catalogue.id}.pdf`;
    return product.catalogue.page ? `${file}#page=${product.catalogue.page}` : file;
  }

  return null;
};

/** Las specs que salen en la cabecera de la ficha y en cajas mono. */
export const highlightSpecs = (product: Product) => product.specs.filter((spec) => spec.highlight);

/**
 * Formatea el valor de una spec con el separador decimal del idioma
 * activo: `0.7` sale `0,7` en alemán sin tocar los datos.
 *
 * Solo se reformatean los valores puramente numéricos. Cosas como
 * "4/18/4 triple", "RC2" o "C3/B3" se dejan exactamente como están.
 */
export const formatSpecValue = (value: string): string => {
  if (!/^-?\d+(\.\d+)?$/.test(value)) return value;
  return formatNumber(Number(value), { maximumFractionDigits: 2 });
};

/**
 * Medidas para las líneas de cota de la galería.
 *
 * Busca la primera spec en mm con un valor "ancho × alto" (p. ej.
 * "1200 × 2200"). Si el producto no declara ninguna —una manilla, un
 * cilindro— devuelve null y la galería no pinta cotas: una cota
 * inventada sería decoración, y decoración que además miente.
 */
export const productDimensions = (
  product: Product,
): { width: number; height: number } | null => {
  for (const spec of product.specs) {
    if (spec.unit !== "mm") continue;
    const match = /^(\d+)\s*×\s*(\d+)$/.exec(spec.value.trim());
    if (match) return { width: Number(match[1]), height: Number(match[2]) };
  }
  return null;
};
