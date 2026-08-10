"use client";

/**
 * Carta de colores: chips grandes con nombre y código, filtrables por
 * acabado (RAL / decorado madera / anodizado) y por material.
 *
 * Los chips no son botones: aquí no hay nada que elegir, es una carta
 * para mirar. Cada uno lleva su código en mono, que es lo que el
 * cliente acabará diciendo por teléfono.
 *
 * La estructura está preparada para reorganizarla por categoría o por
 * material más adelante (está por decidir): el filtro sale de los datos,
 * no de una lista escrita a mano.
 */
import { useState } from "react";
import type { ColorFinish, Material } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";
import type { ContentKey } from "@/lib/i18n";

const GROUP_LABEL: Record<ColorFinish["group"], ContentKey> = {
  ral: "colours.groupRal",
  "wood-decor": "colours.groupWoodDecor",
  anodised: "colours.groupAnodised",
  "wood-stain": "colours.groupWoodStain",
  lamella: "colours.groupLamella",
  "sal-foil": "colours.groupSalFoil",
  "pvc-foil": "colours.groupPvcFoil",
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

export function ColourGrid({ colours }: { colours: ColorFinish[] }) {
  const { pick, t, tf } = useI18n();
  const [group, setGroup] = useState<ColorFinish["group"] | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);

  const groups = [...new Set(colours.map((colour) => colour.group))];
  const materials = [...new Set(colours.flatMap((colour) => colour.materials))];

  const visible = colours.filter(
    (colour) =>
      (group === null || colour.group === group) &&
      (material === null || colour.materials.includes(material)),
  );

  return (
    <div>
      <div className="grid gap-4">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("colours.filterGroup")}
        >
          <span className="eyebrow mr-1 w-16">{t("colours.filterGroup")}</span>
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
          <span className="eyebrow mr-1 w-16">{t("colours.filterMaterial")}</span>
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
      </div>

      <p className="eyebrow mt-8" aria-live="polite">
        {tf("colours.count", { count: visible.length })}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((colour) => (
            <li key={colour.id}>
              {/* La muestra lleva un aro fino: sin él, un blanco roto
                  sobre papel blanco no se ve dónde acaba. */}
              <div
                className="aspect-[4/3] w-full rounded-kamika ring-1 ring-inset ring-kamika-ink/15"
                style={{ backgroundColor: colour.hex }}
              />
              <p className="mt-3 font-display text-sm font-medium text-kamika-ink">
                {pick(colour.name)}
              </p>
              {/* Algunas cartas (los folios SAL) imprimen SOLO el
                  código: ahí el código ES el nombre y repetirlo debajo
                  sería un eco. */}
              {colour.code !== pick(colour.name) && (
                <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.12em] text-kamika-steel uppercase">
                  {colour.code}
                </p>
              )}
              <p className="mt-2 text-[0.75rem] text-kamika-ink/55">
                {/* La lista de materiales se lee sola en pantalla, pero
                    sin la etiqueta un lector de pantalla solo diría
                    "PVC, aluminio" sin decir para qué. */}
                <span className="sr-only">{t("colours.availableOn")}: </span>
                {colour.materials.map((entry) => t(MATERIAL_LABEL[entry])).join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-kamika-ink/70">{t("colours.noMatch")}</p>
      )}
    </div>
  );
}
