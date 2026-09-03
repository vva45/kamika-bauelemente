/**
 * Formato de specs compartido por las tablas de sistema (fabricantes)
 * y de modelo (catálogos).
 */
import { pick, formatNumber, type Localized } from "@/lib/i18n";

/**
 * Formatea el valor de una spec con el separador decimal del idioma
 * activo: `0.7` sale `0,7` en alemán sin tocar los datos.
 *
 * Solo se reformatean los valores puramente numéricos. Cosas como
 * "4/18/4 triple", "RC2" o "C3/B3" se dejan exactamente como están.
 */
export const formatSpecValue = (value: string | Localized<string>): string => {
  const text = typeof value === "string" ? value : pick(value);
  if (!/^-?\d+(\.\d+)?$/.test(text)) return text;
  return formatNumber(Number(text), { maximumFractionDigits: 2 });
};
