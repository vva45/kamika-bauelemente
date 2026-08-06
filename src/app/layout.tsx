/**
 * Layout raíz.
 *
 * Las tres tipografías se autoalojan con next/font: en tiempo de
 * ejecución el navegador no pide nada a Google. Eso, sumado a no tener
 * analítica ni iframes de terceros, es lo que permite publicar el sitio
 * sin banner de cookies.
 */
import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Outfit } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/layout/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/data/company";
import { LOCALE, t } from "@/lib/i18n";
import { localBusinessSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

/** Display: la que más se parece al logo. */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

/** Texto corrido. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Técnica: tablas de specs, medidas, códigos RAL, paginación. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Base para que las URLs relativas de OpenGraph y canonical salgan
  // absolutas sin escribirlas a mano en cada página.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.tradeNameFull} — ${COMPANY.city}`,
    template: `%s — ${COMPANY.tradeNameFull}`,
  },
  description: t("footer.blurb"),
  // Ojo: aquí NO va `alternates.canonical` ni `openGraph.url`. Los
  // hereda cada página hija, y heredarlos haría que todas se declararan
  // como la home. Los pone cada página con `pageMetadata`.
  openGraph: {
    type: "website",
    siteName: COMPANY.tradeNameFull,
    title: `${COMPANY.tradeNameFull} — ${COMPANY.city}`,
    description: t("footer.blurb"),
    // El idioma del OG sale de LOCALE igual que el <html lang>.
    locale: LOCALE === "de" ? "de_DE" : "en_GB",
  },
  // Sin verificación de Google ni de Bing: se añaden cuando el dueño
  // reclame el dominio en Search Console.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      // El idioma sale de LOCALE, nunca escrito a mano: el día que el
      // sitio pase a alemán, esto cambia solo.
      lang={LOCALE}
      className={`${outfit.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* El negocio, en datos estructurados. Va en el layout para que
            esté en todas las páginas. */}
        <JsonLd schema={localBusinessSchema()} />
        {/* Sin JavaScript, las hojas del hero se quedarían cerradas
            tapando la foto. Se retiran de raíz. */}
        <noscript>
          <style>{`.frame-opening-leaves{display:none}`}</style>
        </noscript>
        <SmoothScrollProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:rounded-kamika focus:bg-kamika-ink focus:px-4 focus:py-2 focus:text-sm focus:text-kamika-paper"
          >
            {t("a11y.skipToContent")}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
