/**
 * Punto de entrada de la capa de datos. Todo lo que consulten las
 * páginas pasa por aquí, para no importar ficheros sueltos desde media
 * docena de sitios.
 */
import { CATALOGUE_MODELS } from "./catalogue-models";
import {
  MANUFACTURERS,
  getManufacturer,
  getManufacturersByCategory,
  getSystem,
} from "./manufacturers";
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
import type {
  Catalogue,
  CatalogueModel,
  CategorySlug,
  ColorFinish,
  Product,
  Project,
} from "./types";

export {
  CATALOGUE_MODELS,
  CATALOGUES,
  MANUFACTURERS,
  getManufacturer,
  getManufacturersByCategory,
  getSystem,
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

/**
 * Las colecciones de una gama: sus catálogos que ya tienen escaparate.
 *
 * Es lo que la página de categoría enseña en vez de fichas sueltas —
 * primero de quién es la gama y qué colecciones tiene, y dentro de cada
 * una, todos sus modelos. Un catálogo sin modelos extraídos no sale:
 * sería una portada que no lleva a ninguna parte.
 */
export const getCollectionsFor = (slug: CategorySlug): Catalogue[] =>
  getCataloguesFor(slug).filter((catalogue) => countModelsByCatalogue(catalogue.id) > 0);

/**
 * El escaparate de un catálogo, en el orden en que sale impreso: así
 * hojearlo en la web y hojearlo en papel llevan al mismo sitio.
 */
export const getModelsByCatalogue = (catalogueId: string): CatalogueModel[] =>
  CATALOGUE_MODELS.filter((model) => model.catalogue === catalogueId);

export const getCatalogueModel = (
  catalogueId: string,
  modelId: string,
): CatalogueModel | undefined =>
  CATALOGUE_MODELS.find((model) => model.catalogue === catalogueId && model.id === modelId);

export const countModelsByCatalogue = (catalogueId: string): number =>
  getModelsByCatalogue(catalogueId).length;

/**
 * Cuántos modelos puede ver el visitante en una gama.
 *
 * No es lo mismo que el número de fichas: en puertas de entrada hay
 * cuatro productos destacados, pero detrás están los cientos de modelos
 * de los catálogos, y ese es el número que le interesa a quien está
 * decidiendo si aquí encontrará lo que busca. Cuando la gama todavía no
 * tiene catálogo, el número de fichas es todo lo que hay.
 */
export const countModelsInCategory = (slug: CategorySlug): number => {
  const catalogueIds = CATALOGUES.filter((catalogue) => catalogue.category === slug).map(
    (catalogue) => catalogue.id,
  );
  const models = CATALOGUE_MODELS.filter((model) => catalogueIds.includes(model.catalogue)).length;
  // Una gama organizada por fabricantes cuenta sus sistemas: es lo que
  // el visitante puede abrir hoy. Cuando llegue el catálogo del
  // fabricante, sus modelos extraídos pasarán a mandar solos.
  const systems = getManufacturersByCategory(slug).reduce(
    (total, manufacturer) => total + manufacturer.systems.length,
    0,
  );
  return Math.max(models, systems, getProductsByCategory(slug).length);
};

/** Familias declaradas en un catálogo, para agrupar el escaparate. */
export const getModelFamilies = (catalogueId: string): string[] => [
  ...new Set(
    getModelsByCatalogue(catalogueId)
      .map((model) => model.family)
      .filter((family): family is string => Boolean(family)),
  ),
];

// ── Proyectos ──────────────────────────────────────────────────

export const getProject = (id: string): Project | undefined =>
  PROJECTS.find((project) => project.id === id);

/** Proyectos donde se instaló algo de esta categoría, del más reciente al más antiguo. */
export const getProjectsByCategory = (slug: CategorySlug): Project[] =>
  PROJECTS.filter((project) => project.categories.includes(slug)).sort((a, b) => b.year - a.year);

/**
 * Modelos instalados en un proyecto, ya resueltos a producto.
 * Los ids que no existan se descartan en silencio: cambiar el catálogo
 * no puede dejar enlaces muertos en un proyecto ya publicado.
 */
export const getProjectProducts = (project: Project): Product[] =>
  (project.products ?? [])
    .map((id) => getProduct(id))
    .filter((product): product is Product => product !== undefined);

/** Modelos de catálogo instalados en un proyecto, con el mismo criterio. */
export const getProjectModels = (project: Project): CatalogueModel[] =>
  (project.models ?? [])
    .map((ref) => getCatalogueModel(ref.catalogue, ref.id))
    .filter((model): model is CatalogueModel => model !== undefined);

/** Años con proyectos, del más reciente al más antiguo (para el filtro). */
export const getProjectYears = (): number[] =>
  [...new Set(PROJECTS.map((project) => project.year))].sort((a, b) => b - a);

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
