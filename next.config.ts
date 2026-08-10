import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad. Vercel no las pone por su cuenta, y a este
 * sitio le cuestan cero: no hay iframes ajenos que romper (el mapa se
 * abre DESDE aquí hacia Google, no al revés) ni scripts de terceros.
 *
 *  - nosniff: el navegador no "adivina" tipos de contenido. Con PDFs
 *    subidos por terceros (los catálogos del proveedor), obligatoria.
 *  - SAMEORIGIN: nadie puede meter esta web en un iframe suyo — contra
 *    el clickjacking. El visor de catálogos es same-origin y no se ve
 *    afectado.
 *  - Referrer-Policy: al salir hacia Google Maps o WhatsApp se manda el
 *    origen, no la URL completa de la página.
 *  - Permissions-Policy: la web no usa cámara, micro ni geolocalización;
 *    se declara para que ningún script pueda pedirlos jamás.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/**
 * El sitio vive bajo /de, /en y /pl. La raíz manda al alemán (el
 * mercado), y las URLs de la época monolingüe —compartidas por
 * WhatsApp antes de este cambio— redirigen en permanente a su
 * equivalente alemana en vez de morir en un 404.
 */
const LEGACY_SEGMENTS = [
  "about",
  "products",
  "catalogues",
  "projects",
  "colours",
  "contact",
  "imprint",
  "privacy",
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  // "X-Powered-By: Next.js" no le sirve a nadie más que a quien busca
  // versiones que atacar.
  poweredByHeader: false,
  headers: async () => [{ source: "/(.*)", headers: SECURITY_HEADERS }],
  redirects: async () => [
    { source: "/", destination: "/de/", permanent: true },
    ...LEGACY_SEGMENTS.map((segment) => ({
      source: `/${segment}/:path*`,
      destination: `/de/${segment}/:path*`,
      permanent: true,
    })),
  ],
};

export default nextConfig;
