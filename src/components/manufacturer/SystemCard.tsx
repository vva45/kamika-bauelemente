/**
 * Tarjeta de sistema de un fabricante (IDEAL 4000, energeto 8000…).
 * Clicable entera, como todas: lleva a la página del sistema.
 */
import Image from "next/image";
import Link from "next/link";
import { WindowFrame } from "@/components/ui/WindowFrame";
import type { Manufacturer, ManufacturerSystem } from "@/data/types";
import { cn } from "@/lib/cn";
import { pick } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type SystemCardProps = {
  manufacturer: Manufacturer;
  system: ManufacturerSystem;
  priority?: boolean;
  className?: string;
};

export function SystemCard({ manufacturer, system, priority = false, className }: SystemCardProps) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <WindowFrame className="aspect-[4/3] w-full" pan>
        <Image
          src={system.image}
          alt={system.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </WindowFrame>

      <h3 className="mt-4 font-display text-lg font-semibold text-kamika-ink">
        <Link
          href={routes.manufacturerSystem(manufacturer.category, manufacturer.id, system.id)}
          className="stretched-link"
        >
          {system.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-kamika-ink/65">{pick(system.tagline)}</p>
    </article>
  );
}
