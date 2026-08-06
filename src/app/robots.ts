/**
 * robots.txt. Todo indexable salvo los dos documentos legales, que no
 * son contenido y no deben competir con las páginas de producto.
 */
import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [routes.imprint, routes.privacy],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
