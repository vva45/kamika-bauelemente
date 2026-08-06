/**
 * Constructores de URL. Un solo sitio donde se arma cada ruta, para que
 * el día que los slugs se traduzcan al alemán no haya que ir buscando
 * plantillas de string por los componentes.
 */
import type { CategorySlug } from "@/data/types";

export const routes = {
  home: "/",
  about: "/about",
  products: "/products",
  category: (slug: CategorySlug) => `/products/${slug}`,
  product: (category: CategorySlug, id: string) => `/products/${category}/${id}`,
  catalogues: "/catalogues",
  catalogue: (id: string) => `/catalogues/${id}`,
  /** Escaparate: todos los modelos de un catálogo. */
  catalogueModels: (id: string) => `/catalogues/${id}/models`,
  catalogueModel: (catalogueId: string, modelId: string) =>
    `/catalogues/${catalogueId}/models/${modelId}`,
  projects: "/projects",
  project: (id: string) => `/projects/${id}`,
  colours: "/colours",
  contact: "/contact",
  /** Contacto con el asunto pre-rellenado desde una ficha de producto. */
  contactAbout: (productId: string) => `/contact?product=${encodeURIComponent(productId)}`,
  imprint: "/imprint",
  privacy: "/privacy",
} as const;
