"use client";

/**
 * Fila de chips de color con un render al lado que cambia al pasar por
 * encima de cada uno.
 *
 * El color se aplica sobre la foto con `mix-blend-multiply` y la
 * máscara de la "ventana famosa" (ver ColourStudio): así el velo cae
 * SOLO en el marco, no en el jardín tras el cristal ni en la pared.
 *
 * En /colours el previsualizador vive dentro del ColourStudioProvider:
 * cualquier muestra de la carta y cualquier cristal del capítulo de
 * vidrios pueden fijar la selección desde abajo (idea del dueño,
 * 2026-08), y los chips de aquí la sobrescriben igual. En la home no
 * hay proveedor y el componente enseña su lámina sin teñir, como
 * siempre.
 *
 * Los chips son botones de verdad: se recorren con el tabulador y
 * responden al foco igual que al hover, no solo al ratón.
 */
import Image from "next/image";
import { useState } from "react";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { FramePreview, useColourStudio } from "@/components/colour/ColourStudio";
import type { ColorFinish } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

type ColourPreviewProps = {
  colours: ColorFinish[];
  renderImage: string;
  className?: string;
  /**
   * `false` desactiva el velo de color sobre la imagen.
   *
   * Existe porque la home usa la lámina de marca del dueño (abanico de
   * muestras con el logotipo), y multiplicar ESO por un RAL oscuro la
   * dejaba negra entera — se comprobó con renders antes de decidir. La
   * página de colores tiñe la foto real con su máscara.
   */
  tint?: boolean;
  /** Alt propio cuando la imagen no es el render teñible. */
  imageAlt?: string;
  /** Ancla para la miniatura flotante del estudio. */
  id?: string;
};

export function ColourPreview({
  colours,
  renderImage,
  className,
  tint = true,
  imageAlt,
  id,
}: ColourPreviewProps) {
  const { pick, t } = useI18n();
  const studio = useColourStudio();
  const [localId, setLocalId] = useState(colours[0]?.id);

  // Con estudio manda su selección (que puede venir de la carta de
  // abajo); sin él, el estado local de los chips, como siempre.
  const active =
    (tint && studio?.colour) ||
    colours.find((colour) => colour.id === localId) ||
    colours[0];
  const glass = tint ? (studio?.glass ?? null) : null;

  if (!active) return null;

  const select = (colour: ColorFinish) => {
    setLocalId(colour.id);
    if (tint) studio?.setColour(colour);
  };

  return (
    <div id={id} className={cn("grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12", className)}>
      <div>
        <WindowFrame className="aspect-[4/3] w-full" mullion="vertical">
          {tint ? (
            <FramePreview colour={active} glass={glass} sizes="(min-width: 1024px) 45vw, 100vw" className="absolute inset-0" />
          ) : (
            <Image
              src={renderImage}
              alt={imageAlt ?? t("home.colourRenderAlt")}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          )}
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
          {glass && (
            <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-kamika-steel uppercase">
              · {t("colours.glassEyebrow")}: {pick(glass.name)}
            </span>
          )}
        </p>
        {/* Una madera o una cerámica no se pueden pintar con un velo
            plano: el marco enseña su TONO medio y se dice claro. */}
        {tint && active.image && (
          <p className="mt-1 text-[0.75rem] text-kamika-ink/55">{t("colours.approxTone")}</p>
        )}
      </div>

      <ul className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-7">
        {colours.map((colour) => {
          const isActive = colour.id === active.id;
          return (
            <li key={colour.id}>
              <button
                type="button"
                onMouseEnter={() => select(colour)}
                onFocus={() => select(colour)}
                onClick={() => select(colour)}
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
