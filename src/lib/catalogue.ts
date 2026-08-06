/**
 * Cómo se llama una colección en pantalla.
 *
 * Un solo sitio para armar el nombre: la marca primero y la colección
 * después —"ROKA Signature"—, que es el orden que pidió el dueño y el
 * que usa el cliente cuando pregunta. Sin marca conocida, sale sola la
 * colección; sin colección, el título del catálogo.
 */
import type { Catalogue } from "@/data/types";
import { pick } from "@/lib/i18n";

export const collectionName = (catalogue: Catalogue): string => {
  const collection = catalogue.collection ? pick(catalogue.collection) : "";
  if (!collection) return pick(catalogue.title);
  return catalogue.brand ? `${catalogue.brand} ${collection}` : collection;
};
