/**
 * /colours — la carta de acabados.
 *
 * Arriba el previsualizador (un marco que cambia de color), debajo la
 * carta completa filtrable, y al pie el aviso obligatorio: en pantalla
 * el color es orientativo y hay que pedir muestra física.
 */
import type { Metadata } from "next";
import { ColourGrid } from "@/components/colour/ColourGrid";
import { ColourPreview } from "@/components/colour/ColourPreview";
import { GlassChapter } from "@/components/colour/GlassChapter";
import { ContactCta } from "@/components/layout/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ALL_COLORS, COLORS } from "@/data";
import { t, setRequestLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export async function generateMetadata({ params }: PageProps<"/[locale]/colours">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return pageMetadata({
  title: t("colours.title"),
  description: t("colours.intro"),
  path: routes.colours,
});
}

export default async function ColoursPage({ params }: PageProps<"/[locale]/colours">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <Reveal from="left">
          <SectionTitle
            as="h1"
            size="lg"
            eyebrow={t("colours.eyebrow")}
            title={t("colours.title")}
            intro={t("colours.intro")}
          />
        </Reveal>

        <ColourPreview
          colours={COLORS.slice(0, 14)}
          renderImage="/images/colours/render.jpg"
          className="mt-12"
        />
      </section>

      <section className="border-t border-kamika-mist">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          {/* La carta completa: las paletas estándar MÁS las muestras
              recortadas de los catálogos (ALL_COLORS las fusiona; la
              imagen manda sobre el hex cuando existen las dos). El
              previsualizador de arriba sigue con COLORS: solo tiene
              sentido teñir el render con colores planos. */}
          <ColourGrid colours={ALL_COLORS} />

          {/* Aviso al pie: en pantalla el color miente lo justo para
              que una decisión tomada aquí acabe en devolución. */}
          <p className="mt-14 max-w-2xl border-t border-kamika-mist pt-6 text-sm text-pretty text-kamika-ink/60">
            {t("colours.disclaimer")}
          </p>
        </div>
      </section>

      {/* El capítulo de cristales: transparencias y ornamentados de
          todos los catálogos con carta de vidrio, por catálogo. */}
      <GlassChapter />

      <ContactCta />
    </>
  );
}
