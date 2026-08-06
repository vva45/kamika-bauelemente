/**
 * Tarjeta de fabricante — las "casitas" de la categoría de ventanas.
 *
 * Misma anatomía que las demás tarjetas del sitio (marco firma, paneo
 * al hover, enlace estirado), con el contador de sistemas como eyebrow.
 */
import Image from "next/image";
import Link from "next/link";
import { WindowFrame } from "@/components/ui/WindowFrame";
import type { Manufacturer } from "@/data/types";
import { cn } from "@/lib/cn";
import { pick, t, tf } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type ManufacturerCardProps = {
  manufacturer: Manufacturer;
  priority?: boolean;
  className?: string;
};

export function ManufacturerCard({
  manufacturer,
  priority = false,
  className,
}: ManufacturerCardProps) {
  const systems = manufacturer.systems.length;
  const countLabel =
    systems === 1
      ? t("manufacturer.systemCountOne")
      : tf("manufacturer.systemCountOther", { count: systems });

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <WindowFrame className="aspect-[4/3] w-full" pan sash>
        <Image
          src={manufacturer.image}
          alt={manufacturer.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </WindowFrame>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-semibold text-kamika-ink">
          <Link
            href={routes.manufacturer(manufacturer.category, manufacturer.id)}
            className="stretched-link"
          >
            {manufacturer.name}
          </Link>
        </h3>
        <p className="eyebrow shrink-0">{countLabel}</p>
      </div>
      <p className="mt-1 text-sm text-kamika-ink/65">{pick(manufacturer.tagline)}</p>
    </article>
  );
}
