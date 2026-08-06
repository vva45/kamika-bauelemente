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

type PageMetadataInput = {
  title: string;
  description: string;
  /** Ruta interna, empezando por "/". Se hace absoluta con metadataBase. */
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
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    ...(image ? { images: [image] } : {}),
  },
});
