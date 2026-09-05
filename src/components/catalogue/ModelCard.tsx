/**
 * Tarjeta de modelo de catálogo.
 *
 * Deliberadamente parecida a `ProductCard` —mismo marco, mismo paneo al
 * hover, mismo título en negrita— pero sin botón de ficha técnica: un
 * modelo del escaparate no tiene PDF propio, su destino es su página.
 *
 * La foto va `object-contain` sobre fondo claro, no `cover`: son
 * recortes del catálogo con la hoja entera, y recortarlos por los lados
 * se comería justo el canto que distingue un modelo de otro.
 */
import Image from "next/image";
import Link from "next/link";
import { WindowFrame } from "@/components/ui/WindowFrame";
import type { CatalogueModel } from "@/data/types";
import { cn } from "@/lib/cn";
import { tm } from "@/lib/model-text";
import { routes } from "@/lib/routes";

type ModelCardProps = {
  model: CatalogueModel;
  priority?: boolean;
  className?: string;
};

export function ModelCard({ model, priority = false, className }: ModelCardProps) {
  // La primera spec es la que más distingue al modelo: el acabado en
  // ROKA, la medida en los paneles.
  const lead = model.specs[0];
  // Nombres de producto salen tal cual; los genéricos ("Türspion",
  // "Paneel 12") tienen traducción en el diccionario.
  const name = tm(model.name);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <WindowFrame className="aspect-[3/4] w-full" pan>
        <Image
          src={model.image}
          alt={name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 90vw"
          className="object-contain p-3"
        />
      </WindowFrame>

      <h3 className="mt-4 font-display text-base font-semibold text-kamika-ink">
        <Link href={routes.catalogueModel(model.catalogue, model.id)} className="stretched-link">
          {name}
        </Link>
      </h3>

      {/* Los catálogos de persianas listan ventajas sin etiqueta; ahí
          los dos puntos sobran y quedaban colgando al principio. */}
      {lead && (
        <p className="mt-1 line-clamp-2 text-sm text-kamika-ink/65">
          {lead.label ? `${tm(lead.label)}: ${tm(lead.value)}` : tm(lead.value)}
        </p>
      )}
    </article>
  );
}
