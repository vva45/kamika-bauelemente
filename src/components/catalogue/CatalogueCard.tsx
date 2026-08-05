/**
 * Tarjeta de catálogo: portada, título, año, nº de páginas y peso, con
 * los dos botones que pidió el dueño — hojear y descargar.
 *
 * "Browse" va a la página de visor propia (`/catalogues/{id}`), no al
 * PDF suelto: así el visitante se queda dentro del sitio. "Download"
 * abre el PDF autoalojado en pestaña nueva.
 */
import Image from "next/image";
import Link from "next/link";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { DownloadIcon } from "@/components/ui/icons";
import type { Catalogue } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatNumber, pick, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type CatalogueCardProps = {
  catalogue: Catalogue;
  priority?: boolean;
  className?: string;
};

export function CatalogueCard({ catalogue, priority = false, className }: CatalogueCardProps) {
  // Año, páginas y peso en mono: es ficha técnica, no texto corrido.
  const meta = [
    catalogue.year ? formatNumber(catalogue.year, { useGrouping: false }) : null,
    catalogue.pages ? `${formatNumber(catalogue.pages)} ${t("catalogue.pages")}` : null,
    catalogue.sizeMb ? `${formatNumber(catalogue.sizeMb)} ${t("catalogue.size")}` : null,
  ].filter((entry): entry is string => entry !== null);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <WindowFrame className="aspect-[5/7] w-full" pan>
        <Image
          src={catalogue.cover}
          alt={pick(catalogue.title)}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </WindowFrame>

      <h3 className="mt-4 text-lg font-semibold text-kamika-ink">
        <Link href={routes.catalogue(catalogue.id)} className="stretched-link">
          {pick(catalogue.title)}
        </Link>
      </h3>
      <p className="eyebrow mt-2">{meta.join(" · ")}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "inline-flex h-9 items-center rounded-kamika bg-kamika-ink px-4",
            "text-[0.8125rem] font-medium text-kamika-paper",
            "motion-safe:transition-colors group-hover:bg-kamika-steel",
          )}
        >
          {t("common.browse")}
        </span>
        <a
          href={catalogue.file}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-2 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-kamika-steel hover:text-kamika-ink"
        >
          <DownloadIcon className="size-4" />
          {t("common.download")}
          <span className="sr-only"> ({t("a11y.opensInNewTab")})</span>
        </a>
      </div>
    </article>
  );
}
