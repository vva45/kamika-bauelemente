/**
 * Tarjeta de categoría. Se usa en el mosaico de la home y en el hub
 * `/products`, con la misma anatomía en los dos sitios.
 *
 * Es la que lleva la hoja azul del elemento firma: al hover se desplaza
 * y la imagen panea, como una ventana que se entreabre.
 *
 * Si la categoría todavía no tiene modelos, el contador se sustituye por
 * "Coming soon" en vez de anunciar "0 models".
 */
import Image from "next/image";
import Link from "next/link";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Category } from "@/data/types";
import { cn } from "@/lib/cn";
import { pick, t, tf } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type CategoryCardProps = {
  category: Category;
  modelCount: number;
  /** `feature` para las piezas grandes del mosaico. */
  scale?: "feature" | "compact";
  priority?: boolean;
  className?: string;
};

export function CategoryCard({
  category,
  modelCount,
  scale = "compact",
  priority = false,
  className,
}: CategoryCardProps) {
  const isFeature = scale === "feature";
  const comingSoon = category.comingSoon || modelCount === 0;

  const countLabel = comingSoon
    ? t("common.comingSoon")
    : modelCount === 1
      ? t("product.modelsOne")
      : tf("product.modelsOther", { count: modelCount });

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      {/*
        3:2, la proporción de las imágenes de gama —la foto real de
        puertas de entrada y las láminas de marca—, en vez de una altura
        mínima. Con una banda ancha la tarjeta recortaba la foto por
        arriba y por abajo y la puerta salía cortada; así entra entera.
      */}
      <WindowFrame
        className="aspect-[3/2] w-full"
        sash
        pan
        mullion={isFeature ? "vertical" : "none"}
      >
        <Image
          src={category.heroImage}
          alt={pick(category.name)}
          fill
          priority={priority}
          sizes={
            isFeature
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover"
        />
      </WindowFrame>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3
            className={cn(
              "font-semibold text-kamika-ink",
              isFeature ? "text-2xl md:text-3xl" : "text-lg",
            )}
          >
            <Link href={routes.category(category.slug)} className="stretched-link">
              {pick(category.name)}
            </Link>
          </h3>
          <p className="eyebrow mt-2">{countLabel}</p>
        </div>
        <ArrowUpRightIcon
          className={cn(
            "mt-1 size-5 shrink-0 text-kamika-steel",
            "motion-safe:transition-transform motion-safe:duration-300",
            "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          )}
        />
      </div>
    </article>
  );
}
