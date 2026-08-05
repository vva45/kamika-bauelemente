/**
 * Punto de entrada de la capa de datos. Todo lo que consulten las
 * páginas pasa por aquí, para no importar ficheros sueltos desde media
 * docena de sitios.
 */
import { CATALOGUES, getCatalogue } from "./catalogues";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategory,
  isCategorySlug,
  orderedCategories,
} from "./categories";
import { COLORS } from "./colors";
import { PRODUCTS } from "./products";
import { PROJECTS } from "./projects";
import type { Catalogue, CategorySlug, ColorFinish, Product, Project } from "./types";

export {
  CATALOGUES,
  CATEGORIES,
  CATEGORY_SLUGS,
  COLORS,
  PRODUCTS,
  PROJECTS,
  getCatalogue,
  getCategory,
  isCategorySlug,
  orderedCategories,
};

// ── Productos ──────────────────────────────────────────────────

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

// ── Catálogos ──────────────────────────────────────────────────

export const getCataloguesFor = (slug: CategorySlug): Catalogue[] =>
  CATALOGUES.filter((catalogue) => catalogue.category === slug);

// ── Proyectos ──────────────────────────────────────────────────

export const getProject = (id: string): Project | undefined =>
  PROJECTS.find((project) => project.id === id);

/** Proyectos donde se instaló algo de esta categoría, del más reciente al más antiguo. */
export const getProjectsByCategory = (slug: CategorySlug): Project[] =>
  PROJECTS.filter((project) => project.categories.includes(slug)).sort((a, b) => b.year - a.year);

export const getFeaturedProjects = (limit?: number): Project[] => {
  // Si aún no hay ninguno marcado como destacado, se enseñan los más
  // recientes: mejor eso que una sección vacía en la home.
  const featured = PROJECTS.filter((project) => project.featured);
  const pool = featured.length > 0 ? featured : [...PROJECTS].sort((a, b) => b.year - a.year);
  return typeof limit === "number" ? pool.slice(0, limit) : pool;
};

// ── Colores ────────────────────────────────────────────────────

export const getColorsByGroup = (group: ColorFinish["group"]): ColorFinish[] =>
  COLORS.filter((color) => color.group === group);
