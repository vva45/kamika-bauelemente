"use client";

/**
 * El capítulo de CRISTALES de /colours (pedido del dueño, 2026-08):
 * "casi como una página, pero sin ser página" — un capítulo aparte
 * dentro de la misma página de colores, con los tipos de cristal de
 * todos los catálogos que traen carta, separados por catálogo.
 *
 * Desde agosto de 2026 las muestras son clicables (segunda idea del
 * dueño): el cristal elegido se pone en los huecos del live preview de
 * arriba, vía ColourStudio; volver a clicarlo lo quita. Cada muestra
 * es el recorte real de la carta impresa — el fabricante fotografía un
 * objeto DETRÁS del vidrio precisamente para que se vea la
 * transparencia, y eso es lo que aparece en el marco.
 */
import Image from "next/image";
import { CATALOGUES } from "@/data/catalogues";
import { CATALOGUE_GLASS } from "@/data/catalogue-glass";
import { useColourStudio } from "@/components/colour/ColourStudio";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";
import type { Localized } from "@/lib/i18n";

/** La misma insignia de "seleccionado" que usa la carta de colores. */
const SelectedBadge = () => (
  <span
    aria-hidden
    className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-kamika-ink text-kamika-paper shadow-md motion-safe:animate-[pulse_1.2s_ease-in-out_1]"
  >
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  </span>
);

export function GlassChapter() {
  const { pick, t, tf } = useI18n();
  const studio = useColourStudio();

  /** Mismo título corto que usan las secciones de la carta de colores. */
  const sectionTitle = (catalogueId: string): string => {
    const catalogue = CATALOGUES.find((entry) => entry.id === catalogueId);
    if (!catalogue) return catalogueId;
    if (catalogue.brand && catalogue.collection) {
      return `${catalogue.brand} ${pick(catalogue.collection as Localized<string>)}`;
    }
    return pick(catalogue.title);
  };

  // En el orden de la página de catálogos, como las secciones de color.
  const sections = CATALOGUES.map((catalogue) => ({
    id: catalogue.id,
    title: sectionTitle(catalogue.id),
    items: CATALOGUE_GLASS.filter((glass) => glass.catalogue === catalogue.id),
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
        {studio && (
          <p className="mt-2 max-w-2xl text-[0.8125rem] text-kamika-ink/60">
            {t("colours.glassClickHint")}
          </p>
        )}

        {sections.map((section) => (
          <div key={section.id} className="mt-14 first-of-type:mt-12">
            <h3 className="text-xl font-medium md:text-2xl">{section.title}</h3>
            <p className="eyebrow mt-1.5">
              {tf("colours.glassCount", { count: section.items.length })}
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {section.items.map((glass) => {
                const isActive = studio?.glass?.id === glass.id;
                return (
                  <li key={glass.id}>
                    <button
                      type="button"
                      onClick={() => studio?.setGlass(isActive ? null : glass)}
                      aria-pressed={isActive}
                      disabled={!studio}
                      className="group/tile block w-full text-left"
                    >
                      <div
                        className={cn(
                          "relative aspect-[4/3] w-full overflow-hidden rounded-kamika ring-inset",
                          "motion-safe:transition-transform motion-safe:duration-200 group-hover/tile:scale-[1.02]",
                          isActive ? "ring-2 ring-kamika-steel scale-[1.02]" : "ring-1 ring-kamika-ink/15",
                        )}
                      >
                        <Image
                          src={glass.image}
                          alt={pick(glass.name)}
                          fill
                          sizes="(min-width: 1280px) 18vw, (min-width: 640px) 30vw, 45vw"
                          className="object-cover"
                        />
                        {isActive && <SelectedBadge />}
                      </div>
                      <p className="mt-3 font-display text-sm font-medium text-kamika-ink">
                        {pick(glass.name)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
