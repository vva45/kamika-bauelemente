/**
 * Constructores de URL. Un solo sitio donde se arma cada ruta.
 *
 * Todas llevan delante el prefijo del idioma activo (/de, /en, /pl),
 * leído del almacén por render — por eso esto son getters y funciones,
 * no strings sueltos: la MISMA llamada devuelve /de/products en la
 * página alemana y /pl/products en la polaca, sin que ningún
 * componente sepa nada de idiomas.
 */
import type { CategorySlug } from "@/data/types";
import { currentLocale, type Locale } from "@/lib/i18n";

const prefix = () => `/${currentLocale()}`;

export const routes = {
  get home() {
    return `${prefix()}/`;
  },
  get about() {
    return `${prefix()}/about`;
  },
  get products() {
    return `${prefix()}/products`;
  },
  category: (slug: CategorySlug) => `${prefix()}/products/${slug}`,
  product: (category: CategorySlug, id: string) => `${prefix()}/products/${category}/${id}`,
  /** Jerarquía por fabricante: /de/products/windows/aluplast[/ideal-4000]. */
  manufacturer: (category: CategorySlug, id: string) => `${prefix()}/products/${category}/${id}`,
  manufacturerSystem: (category: CategorySlug, manufacturerId: string, systemId: string) =>
    `${prefix()}/products/${category}/${manufacturerId}/${systemId}`,
  get catalogues() {
    return `${prefix()}/catalogues`;
  },
  catalogue: (id: string) => `${prefix()}/catalogues/${id}`,
  /** Escaparate: todos los modelos de un catálogo. */
  catalogueModels: (id: string) => `${prefix()}/catalogues/${id}/models`,
  catalogueModel: (catalogueId: string, modelId: string) =>
    `${prefix()}/catalogues/${catalogueId}/models/${modelId}`,
  get projects() {
    return `${prefix()}/projects`;
  },
  project: (id: string) => `${prefix()}/projects/${id}`,
  get colours() {
    return `${prefix()}/colours`;
  },
  get contact() {
    return `${prefix()}/contact`;
  },
  /** Contacto con el asunto pre-rellenado desde una ficha de producto. */
  contactAbout: (productId: string) =>
    `${prefix()}/contact?product=${encodeURIComponent(productId)}`,
  get imprint() {
    return `${prefix()}/imprint`;
  },
  get privacy() {
    return `${prefix()}/privacy`;
  },
};

/**
 * Las mismas rutas con el idioma FIJADO, para componentes de cliente:
 * su prerender no puede leer el almacén por render, así que reciben el
 * idioma por contexto (useI18n) y construyen las URLs con esto.
 */
export const routesFor = (locale: Locale) => {
  const p = `/${locale}`;
  return {
    home: `${p}/`,
    about: `${p}/about`,
    products: `${p}/products`,
    category: (slug: CategorySlug) => `${p}/products/${slug}`,
    product: (category: CategorySlug, id: string) => `${p}/products/${category}/${id}`,
    manufacturer: (category: CategorySlug, id: string) => `${p}/products/${category}/${id}`,
    manufacturerSystem: (category: CategorySlug, manufacturerId: string, systemId: string) =>
      `${p}/products/${category}/${manufacturerId}/${systemId}`,
    catalogues: `${p}/catalogues`,
    catalogue: (id: string) => `${p}/catalogues/${id}`,
    catalogueModels: (id: string) => `${p}/catalogues/${id}/models`,
    catalogueModel: (catalogueId: string, modelId: string) =>
      `${p}/catalogues/${catalogueId}/models/${modelId}`,
    projects: `${p}/projects`,
    project: (id: string) => `${p}/projects/${id}`,
    colours: `${p}/colours`,
    contact: `${p}/contact`,
    contactAbout: (productId: string) =>
      `${p}/contact?product=${encodeURIComponent(productId)}`,
    imprint: `${p}/imprint`,
    privacy: `${p}/privacy`,
  };
};

/** La misma ruta interna en OTRO idioma, para hreflang y el selector. */
export const localizedPath = (path: string, locale: Locale): string => {
  const bare = path.replace(/^\/(de|en|pl)(?=\/|$)/, "");
  return `/${locale}${bare === "" ? "/" : bare}`;
};
