/**
 * Dirección pública del sitio. La necesitan `metadataBase`, el sitemap,
 * el robots.txt y el JSON-LD para escribir URLs absolutas.
 *
 * Se resuelve sola, por orden:
 *
 *  1. NEXT_PUBLIC_SITE_URL — el interruptor manual. Siempre gana.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — la inyecta Vercel en cada build y
 *     apunta al dominio de producción. El día que se conecte
 *     kamika-bauelemente.de en el panel de Vercel, el sitemap y las
 *     canonical se corrigen solos, sin tocar código ni variables.
 *  3. VERCEL_URL — la URL propia de un deploy de preview.
 *  4. El dominio previsto, como último recurso (build local o self-host).
 *
 * Solo se usa en servidor (layout, sitemap, robots, JSON-LD). Las
 * variables de Vercel no existen en el navegador, y por eso ningún
 * componente de cliente debe importar este fichero.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  // TODO (dueño): confirmar el dominio definitivo.
  "https://kamika-bauelemente.de";

/** Vercel da el host sin protocolo ("algo.vercel.app"); se lo ponemos. */
const withProtocol = /^https?:\/\//.test(fromEnv) ? fromEnv : `https://${fromEnv}`;

export const SITE_URL = withProtocol.replace(/\/$/, "");

/** Convierte una ruta interna en URL absoluta. */
export const absoluteUrl = (path: string): string => `${SITE_URL}${path}`;
