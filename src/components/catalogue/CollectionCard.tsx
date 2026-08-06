/**
 * Tarjeta de colección: la portada del catálogo del fabricante, como en
 * un expositor, y debajo cuántos modelos hay dentro.
 *
 * Sustituye a la ficha de producto en las gamas que ya tienen catálogo:
 * el visitante no elige entre cuatro modelos escogidos a dedo, elige
 * colección —"ROKA Signature"— y ve los cien que tiene.
 *
 * Clicando se va DIRECTO al escaparate de modelos, no al visor del PDF:
 * mirar cien puertas en la web es más rápido que hojear 298 páginas.
 * El PDF sigue a un clic, desde la propia página de modelos.
 */
import Image from "next/image";
import Link from "next/link";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { countModelsByCatalogue } from "@/data";
import type { Catalogue } from "@/data/types";
import { cn } from "@/lib/cn";
import { collectionName } from "@/lib/catalogue";
import { formatNumber, t, tf } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type CollectionCardProps = {
  catalogue: Catalogue;
  priority?: boolean;
  className?: string;
};

export function CollectionCard({ catalogue, priority = false, className }: CollectionCardProps) {
  const models = countModelsByCatalogue(catalogue.id);

  // Ficha técnica de la colección: modelos primero, que es lo que se ha
  // venido a saber, y el tamaño del catálogo detrás.
  const meta = [
    models === 1 ? t("product.modelsOne") : tf("product.modelsOther", { count: models }),
    catalogue.pages ? `${formatNumber(catalogue.pages)} ${t("catalogue.pages")}` : null,
  ].filter((entry): entry is string => entry !== null);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      {/* 3/4 es la proporción de las portadas: entran enteras y no se
          come el recorte ni el título ni la marca impresa.
          Sin hoja azul aquí, a diferencia de las tarjetas de categoría:
          encima de una portada taparía justo lo que hay que leer. */}
      <WindowFrame className="aspect-[3/4] w-full" pan>
        <Image
          src={catalogue.cover}
          alt={collectionName(catalogue)}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </WindowFrame>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-kamika-ink">
            <Link href={routes.catalogueModels(catalogue.id)} className="stretched-link">
              {collectionName(catalogue)}
            </Link>
          </h3>
          <p className="eyebrow mt-2">{meta.join(" · ")}</p>
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
