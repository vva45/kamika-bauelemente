/**
 * Punto de entrada de la capa de datos. Todo lo que consulten las
 * páginas pasa por aquí, para no importar ficheros sueltos desde media
 * docena de sitios.
 */
import { CATALOGUES, getCatalogue } from "./catalogues";
import { CATEGORIES, CATEGORY_SLUGS, getCategory, isCategorySlug, orderedCategories } from "./categories";
import { PRODUCTS } from "./products";
import type { CategorySlug, Product } from "./types";

export {
  CATALOGUES,
  CATEGORIES,
  CATEGORY_SLUGS,
  PRODUCTS,
  getCatalogue,
  getCategory,
  isCategorySlug,
  orderedCategories,
};

export const getProduct = (id: string): Product | undefined =>
  PRODUCTS.find((product) => product.id === id);

export const getProductsByCategory = (slug: CategorySlug): Product[] =>
  PRODUCTS.filter((product) => product.category === slug);

export const countProductsByCategory = (slug: CategorySlug): number =>
  getProductsByCategory(slug).length;

/**
 * "Goes well with". Los ids que todavía no existen se descartan en
 * silencio, para que sembrar una categoría nueva no pueda dejar
 * enlaces muertos en las fichas ya publicadas.
 */
export const getRelated = (product: Product): Product[] =>
  product.related
    .map((id) => getProduct(id))
    .filter((related): related is Product => related !== undefined);

export const getFeatured = (limit?: number): Product[] => {
  const featured = PRODUCTS.filter((product) => product.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
};
