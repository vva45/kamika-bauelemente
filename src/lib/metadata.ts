/**
 * Metadatos de página.
 *
 * Existe por un detalle que muerde: en el App Router, `alternates` y
 * `openGraph.url` se HEREDAN del layout. Si la canonical se pusiera una
 * sola vez en la raíz, todas las páginas le dirían a Google que son la
 * home. Así que la canonical la declara cada página, y este ayudante
 * evita repetir el mismo objeto veinte veces.
 */
import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Ruta interna CON prefijo de idioma (la devuelven así los routes.*). */
  path: string;
  image?: { url: string; alt: string };
};

export const pageMetadata = ({
  title,
  description,
  path,
  image,
}: PageMetadataInput): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
    // La misma página en los otros idiomas, para que Google no trate
    // /de, /en y /pl como contenido duplicado sino como traducciones.
    // x-default apunta al alemán: es el idioma del mercado.
    languages: {
      ...Object.fromEntries(LOCALES.map((locale) => [locale, localizedPath(path, locale)])),
      "x-default": localizedPath(path, DEFAULT_LOCALE),
    },
  },
  openGraph: {
    title,
    description,
    url: path,
    ...(image ? { images: [image] } : {}),
  },
});
