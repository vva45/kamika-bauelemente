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

const nextConfig: NextConfig = {
  reactCompiler: true,
  // "X-Powered-By: Next.js" no le sirve a nadie más que a quien busca
  // versiones que atacar.
  poweredByHeader: false,
  headers: async () => [{ source: "/(.*)", headers: SECURITY_HEADERS }],
};

export default nextConfig;
