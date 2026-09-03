/**
 * Sitemap. Se arma desde la capa de datos, así que sembrar un modelo,
 * un catálogo o un proyecto lo mete solo: no hay lista que mantener.
 *
 * Fuera quedan a propósito /imprint y /privacy (obligaciones legales,
 * no contenido) y /contact, que ya está enlazada desde todas partes.
 */
import type { MetadataRoute } from "next";
import {
  CATALOGUE_MODELS,
  CATALOGUES,
  countModelsByCatalogue,
  MANUFACTURERS,
  PROJECTS,
  orderedCategories,
} from "@/data";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";
import { localizedPath, routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  // Cada ruta existe en los tres idiomas: una entrada por idioma, y en
  // cada una los `alternates.languages` hacia sus hermanas — el formato
  // hreflang que Google lee del propio sitemap. `routes.*` devuelve la
  // ruta con el prefijo del idioma por defecto; localizedPath la mueve.
  const entry = (path: string, priority: number): Entry[] =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(localizedPath(path, locale)),
      changeFrequency: "monthly",
      priority: locale === DEFAULT_LOCALE ? priority : Math.max(0.1, priority - 0.1),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((other) => [other, absoluteUrl(localizedPath(path, other))]),
        ),
      },
    }));

  return [
    ...entry(routes.home, 1),
    ...entry(routes.products, 0.9),
    ...orderedCategories().flatMap((category) => entry(routes.category(category.slug), 0.8)),
    // Jerarquía por fabricante: la página de marca y cada sistema.
    ...MANUFACTURERS.flatMap((manufacturer) =>
      entry(routes.manufacturer(manufacturer.category, manufacturer.id), 0.7),
    ),
    ...MANUFACTURERS.flatMap((manufacturer) =>
      manufacturer.systems.flatMap((system) =>
        entry(routes.manufacturerSystem(manufacturer.category, manufacturer.id, system.id), 0.6),
      ),
    ),
    ...entry(routes.catalogues, 0.7),
    ...CATALOGUES.flatMap((catalogue) => entry(routes.catalogue(catalogue.id), 0.6)),
    // Solo los catálogos CON escaparate: la página de modelos hace
    // notFound() cuando no hay ninguno (el folleto Salamander), y un
    // sitemap no puede anunciar una URL que responde 404.
    ...CATALOGUES.filter((catalogue) => countModelsByCatalogue(catalogue.id) > 0).flatMap(
      (catalogue) => entry(routes.catalogueModels(catalogue.id), 0.6),
    ),
    // Los modelos del escaparate: son páginas con contenido propio
    // (nombre, specs y foto del catálogo), no duplicados de otra.
    ...CATALOGUE_MODELS.flatMap((model) =>
      entry(routes.catalogueModel(model.catalogue, model.id), 0.4),
    ),
    ...entry(routes.projects, 0.7),
    ...PROJECTS.flatMap((project) => entry(routes.project(project.id), 0.6)),
    ...entry(routes.colours, 0.6),
    ...entry(routes.about, 0.6),
    ...entry(routes.contact, 0.8),
  ];
}
