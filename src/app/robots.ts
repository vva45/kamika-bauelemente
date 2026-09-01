/**
 * robots.txt. Todo indexable salvo los dos documentos legales, que no
 * son contenido y no deben competir con las páginas de producto.
 */
import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // En los TRES idiomas — antes solo cubría /de y los legales de
      // /en y /pl quedaban fuera (llevan meta noindex igualmente,
      // pero mejor simétrico).
      disallow: LOCALES.flatMap((locale) => [`/${locale}/imprint`, `/${locale}/privacy`]),
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
