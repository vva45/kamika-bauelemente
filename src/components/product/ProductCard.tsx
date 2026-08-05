/**
 * LA tarjeta de producto. Una sola, igual en toda la web: home,
 * listados de categoría, "Goes well with" y resultados filtrados.
 * No se hacen variantes por sección.
 *
 * Anatomía:
 *  - Imagen grande dentro de la máscara de marco, con paneo al hover.
 *  - Título en negrita + tagline de una línea.
 *  - Botón "Technical data sheet" en el azul del logo, que aparece al
 *    hover y abre el PDF en pestaña nueva.
 *  - Click en cualquier otro sitio de la tarjeta → ficha de producto.
 *
 * El enlace a la ficha se estira sobre toda la tarjeta con un
 * pseudoelemento, en vez de envolverla en un <a>: así el botón de PDF
 * no queda anidado dentro de otro elemento interactivo.
 */
import Image from "next/image";
import Link from "next/link";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { DocumentIcon } from "@/components/ui/icons";
import type { Product } from "@/data/types";
import { cn } from "@/lib/cn";
import { pick, t } from "@/lib/i18n";
import { datasheetHref } from "@/lib/product";
import { routes } from "@/lib/routes";

type ProductCardProps = {
  product: Product;
  /** Solo para la primera fila visible: evita retrasar el LCP. */
  priority?: boolean;
  className?: string;
};

const BADGE_LABEL = {
  new: "product.badgeNew",
  bestseller: "product.badgeBestseller",
} as const;

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const cover = product.images[0];
  const datasheet = datasheetHref(product);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <WindowFrame className="aspect-[4/3] w-full" pan>
        {cover && (
          <Image
            src={cover.src}
            alt={pick(cover.alt)}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        )}
      </WindowFrame>

      {product.badge && (
        <span className="eyebrow absolute top-3 left-3 z-2 bg-kamika-blue px-2 py-1 text-kamika-ink">
          {t(BADGE_LABEL[product.badge])}
        </span>
      )}

      {datasheet && (
        <a
          href={datasheet}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "absolute top-3 right-3 z-2 inline-flex items-center gap-2 rounded-kamika",
            "bg-kamika-blue px-3 py-2 text-[0.75rem] font-medium text-kamika-ink",
            "hover:bg-kamika-steel hover:text-kamika-paper",
            // Solo se esconde en dispositivos que de verdad tienen hover.
            // En táctil (donde el hover no existe) está siempre visible,
            // y con el teclado aparece al recibir el foco.
            "opacity-100 [@media(hover:hover)]:opacity-0",
            "[@media(hover:hover)]:group-hover:opacity-100 focus-visible:opacity-100",
            "motion-safe:transition motion-safe:duration-200",
          )}
        >
          <DocumentIcon className="size-4" />
          {t("product.datasheet")}
          <span className="sr-only"> ({t("a11y.opensInNewTab")})</span>
        </a>
      )}

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-lg font-semibold text-kamika-ink">
          <Link href={routes.product(product.category, product.id)} className="stretched-link">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-kamika-ink/65">{pick(product.tagline)}</p>
      </div>
    </article>
  );
}
