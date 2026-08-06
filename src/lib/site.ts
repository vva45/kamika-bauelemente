/**
 * Dirección pública del sitio. La necesitan `metadataBase`, el sitemap,
 * el robots.txt y el JSON-LD para escribir URLs absolutas.
 *
 * TODO (dueño): confirmar el dominio definitivo. Mientras tanto se
 * asume kamika-bauelemente.de, y en Vercel se puede sobrescribir sin
 * tocar código con NEXT_PUBLIC_SITE_URL (ver .env.example).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kamika-bauelemente.de"
).replace(/\/$/, "");

/** Convierte una ruta interna en URL absoluta. */
export const absoluteUrl = (path: string): string => `${SITE_URL}${path}`;
