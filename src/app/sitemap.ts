/**
 * Sitemap. Se arma desde la capa de datos, así que sembrar un producto,
 * un catálogo o un proyecto lo mete solo: no hay lista que mantener.
 *
 * Fuera quedan a propósito /imprint y /privacy (obligaciones legales,
 * no contenido) y /contact, que ya está enlazada desde todas partes.
 */
import type { MetadataRoute } from "next";
import { CATALOGUES, PRODUCTS, PROJECTS, orderedCategories } from "@/data";
import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number): Entry => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry(routes.home, 1),
    entry(routes.products, 0.9),
    ...orderedCategories().map((category) => entry(routes.category(category.slug), 0.8)),
    ...PRODUCTS.map((product) => entry(routes.product(product.category, product.id), 0.7)),
    entry(routes.catalogues, 0.7),
    ...CATALOGUES.map((catalogue) => entry(routes.catalogue(catalogue.id), 0.6)),
    entry(routes.projects, 0.7),
    ...PROJECTS.map((project) => entry(routes.project(project.id), 0.6)),
    entry(routes.colours, 0.6),
    entry(routes.about, 0.6),
    entry(routes.contact, 0.8),
  ];
}
