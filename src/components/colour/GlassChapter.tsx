/**
 * El capítulo de CRISTALES de /colours (pedido del dueño, 2026-08):
 * "casi como una página, pero sin ser página" — un capítulo aparte
 * dentro de la misma página de colores, con los tipos de cristal de
 * todos los catálogos que traen carta, separados por catálogo.
 *
 * GALERÍA a propósito, sin clics: hubo una versión que ponía el
 * cristal elegido en la ventana del live preview, y el dueño la quitó
 * (2026-08) — unos tipos quedaban bien y otros no, y afinar cada
 * recorte a mano no compensa. Aquí las muestras se entienden solas:
 * el fabricante fotografía un objeto DETRÁS del vidrio precisamente
 * para que se vea la transparencia.
 */
import Image from "next/image";
import { GLASS_TYPES } from "@/data";
import { CATALOGUES } from "@/data/catalogues";
import { pick, t, tf } from "@/lib/i18n";

/** Mismo título corto que usan las secciones de la carta de colores. */
function sectionTitle(catalogueId: string): string {
  const catalogue = CATALOGUES.find((entry) => entry.id === catalogueId);
  if (!catalogue) return catalogueId;
  if (catalogue.brand && catalogue.collection) {
    return `${catalogue.brand} ${pick(catalogue.collection)}`;
  }
  return pick(catalogue.title);
}

export function GlassChapter() {
  // En el orden de la página de catálogos, como las secciones de color.
  const sections = CATALOGUES.map((catalogue) => ({
    id: catalogue.id,
    title: sectionTitle(catalogue.id),
    items: GLASS_TYPES.filter((glass) => glass.catalogue === catalogue.id),
  })).filter((section) => section.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <section className="border-t border-kamika-mist">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <p className="eyebrow">{t("colours.glassEyebrow")}</p>
        <h2 className="mt-3 text-3xl font-medium text-pretty md:text-4xl">
          {t("colours.glassTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-kamika-ink/70">
          {t("colours.glassIntro")}
        </p>

        {sections.map((section) => (
          <div key={section.id} className="mt-14 first-of-type:mt-12">
            <h3 className="text-xl font-medium md:text-2xl">{section.title}</h3>
            <p className="eyebrow mt-1.5">
              {tf("colours.glassCount", { count: section.items.length })}
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {section.items.map((glass) => (
                <li key={glass.id}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-kamika ring-1 ring-inset ring-kamika-ink/15">
                    <Image
                      src={glass.image}
                      alt={pick(glass.name)}
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 640px) 30vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 font-display text-sm font-medium text-kamika-ink">
                    {pick(glass.name)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
