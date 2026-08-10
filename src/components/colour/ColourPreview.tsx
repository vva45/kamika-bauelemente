"use client";

/**
 * Fila de chips de color con un render al lado que cambia al pasar por
 * encima de cada uno.
 *
 * El color se aplica sobre la foto con `mix-blend-multiply`, que es lo
 * que respeta las sombras del perfil en vez de taparlo con un rectángulo
 * plano. Para que funcione bien, el render tiene que ser una foto de un
 * marco claro y neutro (ver CONTENT.md).
 *
 * Los chips son botones de verdad: se recorren con el tabulador y
 * responden al foco igual que al hover, no solo al ratón.
 */
import Image from "next/image";
import { useState } from "react";
import { WindowFrame } from "@/components/ui/WindowFrame";
import type { ColorFinish } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

type ColourPreviewProps = {
  colours: ColorFinish[];
  renderImage: string;
  className?: string;
};

export function ColourPreview({ colours, renderImage, className }: ColourPreviewProps) {
  const { pick, t } = useI18n();
  const [activeId, setActiveId] = useState(colours[0]?.id);
  const active = colours.find((colour) => colour.id === activeId) ?? colours[0];

  if (!active) return null;

  return (
    <div className={cn("grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12", className)}>
      <div>
        <WindowFrame className="aspect-[4/3] w-full" mullion="vertical">
          <Image
            src={renderImage}
            alt={t("home.colourRenderAlt")}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply motion-safe:transition-colors motion-safe:duration-500"
            style={{ backgroundColor: active.hex }}
          />
        </WindowFrame>

        {/* El nombre y el código se anuncian al cambiar, para quien no ve
            el render. */}
        <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-live="polite">
          <span className="font-display text-lg font-medium text-kamika-ink">
            {pick(active.name)}
          </span>
          <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-kamika-steel uppercase">
            {active.code}
          </span>
        </p>
      </div>

      <ul className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-7">
        {colours.map((colour) => {
          const isActive = colour.id === active.id;
          return (
            <li key={colour.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveId(colour.id)}
                onFocus={() => setActiveId(colour.id)}
                onClick={() => setActiveId(colour.id)}
                aria-pressed={isActive}
                className={cn(
                  "block aspect-square w-full rounded-kamika ring-1 ring-inset",
                  "motion-safe:transition-transform motion-safe:duration-200",
                  isActive
                    ? "ring-kamika-steel scale-105"
                    : "ring-kamika-ink/15 hover:scale-105",
                )}
                style={{ backgroundColor: colour.hex }}
              >
                <span className="sr-only">
                  {pick(colour.name)} — {colour.code}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
