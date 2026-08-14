"use client";

/**
 * Carta de colores, organizada POR CATÁLOGO (petición del dueño,
 * 2026-08): primero los filtros —acabado, material y ahora también
 * catálogo—, y debajo una sección por colección con su titulito y su
 * recuento, como la página de un muestrario.
 *
 * Desde agosto de 2026 los chips SÍ son botones — otra idea del dueño:
 * cualquier muestra de la carta, clicada, tiñe el marco del live
 * preview de arriba (vía ColourStudio; la miniatura flotante enseña la
 * selección cuando el marco queda fuera de pantalla). Cada muestra
 * lleva su código en mono, que es lo que el cliente acabará diciendo
 * por teléfono; las extraídas de los catálogos enseñan su IMAGEN
 * (cerámica, vidrio, maderas…), las de carta estándar su color plano.
 */
import Image from "next/image";
import { useState } from "react";
import { CATALOGUES } from "@/data/catalogues";
import { useColourStudio } from "@/components/colour/ColourStudio";
import type { ColorFinish, Material } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";
import type { ContentKey, Localized } from "@/lib/i18n";

const GROUP_LABEL: Record<ColorFinish["group"], ContentKey> = {
  ral: "colours.groupRal",
  "wood-decor": "colours.groupWoodDecor",
  anodised: "colours.groupAnodised",
  "wood-stain": "colours.groupWoodStain",
  lamella: "colours.groupLamella",
  "sal-foil": "colours.groupSalFoil",
  "pvc-foil": "colours.groupPvcFoil",
  powder: "colours.groupPowder",
  glass: "colours.groupGlass",
  ceramic: "colours.groupCeramic",
  "liquid-metal": "colours.groupLiquidMetal",
  special: "colours.groupSpecial",
};

const MATERIAL_LABEL: Record<Material, ContentKey> = {
  pvc: "material.pvc",
  aluminium: "material.aluminium",
  steel: "material.steel",
  wood: "material.wood",
  "wood-alu": "material.wood-alu",
};

const chipClasses = (active: boolean) =>
  cn(
    "rounded-kamika px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase",
    "motion-safe:transition-colors",
    active ? "bg-kamika-ink text-kamika-paper" : "bg-kamika-blue-50 text-kamika-steel hover:bg-kamika-blue",
  );

/** "ROKA Signature", "Garagentore"… — el nombre corto de la colección. */
function sectionTitle(catalogueId: string, pick: (value: Localized<string>) => string): string {
  const catalogue = CATALOGUES.find((entry) => entry.id === catalogueId);
  if (!catalogue) return catalogueId;
  if (catalogue.brand && catalogue.collection) {
    return `${catalogue.brand} ${pick(catalogue.collection)}`;
  }
  return pick(catalogue.title);
}

export function ColourGrid({ colours }: { colours: ColorFinish[] }) {
  const { pick, t, tf } = useI18n();
  const studio = useColourStudio();
  const [group, setGroup] = useState<ColorFinish["group"] | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [catalogue, setCatalogue] = useState<string | null>(null);

  const groups = [...new Set(colours.map((colour) => colour.group))];
  const materials = [...new Set(colours.flatMap((colour) => colour.materials))];
  // En el orden de la página de catálogos, que es el que el visitante
  // ya conoce. "standard" agrupa las paletas sin catálogo (RAL, Dekor…).
  const catalogueIds = CATALOGUES.map((entry) => entry.id).filter((id) =>
    colours.some((colour) => colour.catalogue === id),
  );
  const hasStandard = colours.some((colour) => !colour.catalogue);

  const visible = colours.filter(
    (colour) =>
      (group === null || colour.group === group) &&
      (material === null || colour.materials.includes(material)) &&
      (catalogue === null ||
        (catalogue === "standard" ? !colour.catalogue : colour.catalogue === catalogue)),
  );

  const sections: { id: string; title: string; items: ColorFinish[] }[] = [
    ...catalogueIds.map((id) => ({
      id,
      title: sectionTitle(id, pick),
      items: visible.filter((colour) => colour.catalogue === id),
    })),
    {
      id: "standard",
      title: t("colours.standardSection"),
      items: visible.filter((colour) => !colour.catalogue),
    },
  ].filter((section) => section.items.length > 0);

  return (
    <div>
      <div className="grid gap-4">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("colours.filterGroup")}
        >
          <span className="eyebrow mr-1 w-28 shrink-0">{t("colours.filterGroup")}</span>
          <button
            type="button"
            onClick={() => setGroup(null)}
            aria-pressed={group === null}
            className={chipClasses(group === null)}
          >
            {t("colours.filterAll")}
          </button>
          {groups.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setGroup(group === entry ? null : entry)}
              aria-pressed={group === entry}
              className={chipClasses(group === entry)}
            >
              {t(GROUP_LABEL[entry])}
            </button>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("colours.filterMaterial")}
        >
          <span className="eyebrow mr-1 w-28 shrink-0">{t("colours.filterMaterial")}</span>
          <button
            type="button"
            onClick={() => setMaterial(null)}
            aria-pressed={material === null}
            className={chipClasses(material === null)}
          >
            {t("colours.filterAll")}
          </button>
          {materials.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setMaterial(material === entry ? null : entry)}
              aria-pressed={material === entry}
              className={chipClasses(material === entry)}
            >
              {t(MATERIAL_LABEL[entry])}
            </button>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("colours.filterCatalogue")}
        >
          <span className="eyebrow mr-1 w-28 shrink-0">{t("colours.filterCatalogue")}</span>
          <button
            type="button"
            onClick={() => setCatalogue(null)}
            aria-pressed={catalogue === null}
            className={chipClasses(catalogue === null)}
          >
            {t("colours.filterAll")}
          </button>
          {catalogueIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCatalogue(catalogue === id ? null : id)}
              aria-pressed={catalogue === id}
              className={chipClasses(catalogue === id)}
            >
              {sectionTitle(id, pick)}
            </button>
          ))}
          {hasStandard && (
            <button
              type="button"
              onClick={() => setCatalogue(catalogue === "standard" ? null : "standard")}
              aria-pressed={catalogue === "standard"}
              className={chipClasses(catalogue === "standard")}
            >
              {t("colours.standardChip")}
            </button>
          )}
        </div>
      </div>

      <p className="eyebrow mt-8" aria-live="polite">
        {tf("colours.count", { count: visible.length })}
      </p>
      {studio && (
        <p className="mt-2 max-w-2xl text-[0.8125rem] text-kamika-ink/60">
          {t("colours.clickHint")}
        </p>
      )}

      {sections.length > 0 ? (
        sections.map((section) => (
          <section key={section.id} className="mt-12 first-of-type:mt-8">
            <h2 className="text-xl font-medium md:text-2xl">{section.title}</h2>
            <p className="eyebrow mt-1.5">{tf("colours.count", { count: section.items.length })}</p>

            <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {section.items.map((colour) => {
                const isActive = studio?.colour?.id === colour.id;
                return (
                <li key={colour.id}>
                  <button
                    type="button"
                    onClick={() => studio?.setColour(isActive ? null : colour)}
                    aria-pressed={isActive}
                    disabled={!studio}
                    className="group/tile block w-full text-left"
                  >
                  {/* La muestra lleva un aro fino: sin él, un blanco
                      roto sobre papel blanco no se ve dónde acaba. La
                      elegida lo lleva grueso, en acero. */}
                  {colour.image ? (
                    <div
                      className={cn(
                        "relative aspect-[4/3] w-full overflow-hidden rounded-kamika ring-inset",
                        "motion-safe:transition-transform motion-safe:duration-200 group-hover/tile:scale-[1.02]",
                        isActive ? "ring-2 ring-kamika-steel" : "ring-1 ring-kamika-ink/15",
                      )}
                    >
                      <Image
                        src={colour.image}
                        alt={pick(colour.name)}
                        fill
                        sizes="(min-width: 1280px) 18vw, (min-width: 640px) 30vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "aspect-[4/3] w-full rounded-kamika ring-inset",
                        "motion-safe:transition-transform motion-safe:duration-200 group-hover/tile:scale-[1.02]",
                        isActive ? "ring-2 ring-kamika-steel" : "ring-1 ring-kamika-ink/15",
                      )}
                      style={{ backgroundColor: colour.hex }}
                    />
                  )}
                  <p className="mt-3 font-display text-sm font-medium text-kamika-ink">
                    {pick(colour.name)}
                  </p>
                  {/* Algunas cartas (los folios SAL) imprimen SOLO el
                      código: ahí el código ES el nombre y repetirlo
                      debajo sería un eco. */}
                  {colour.code !== "" && colour.code !== pick(colour.name) && (
                    <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.12em] text-kamika-steel uppercase">
                      {colour.code}
                    </p>
                  )}
                  <p className="mt-2 text-[0.75rem] text-kamika-ink/55">
                    <span className="sr-only">{t("colours.availableOn")}: </span>
                    {t(GROUP_LABEL[colour.group])}
                    {" · "}
                    {colour.materials.map((entry) => t(MATERIAL_LABEL[entry])).join(" · ")}
                  </p>
                  </button>
                </li>
                );
              })}
            </ul>
          </section>
        ))
      ) : (
        <p className="mt-6 text-kamika-ink/70">{t("colours.noMatch")}</p>
      )}
    </div>
  );
}
