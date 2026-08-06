/**
 * Miga de pan en mono, discreta. Compartida por las tres páginas de
 * detalle (producto, catálogo y proyecto) para que la orientación sea
 * idéntica en todas.
 *
 * El último elemento no es enlace: es dónde estás.
 */
import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";

export type Crumb = {
  label: string;
  /** Sin href = página actual. */
  href?: string;
};

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label={t("a11y.breadcrumb")} className={className}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-kamika-steel uppercase">
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && <li aria-hidden>/</li>}
            <li className={cn(!item.href && "text-kamika-ink")}>
              {item.href ? (
                <Link href={item.href} className="hover:text-kamika-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
