/**
 * Cabecera del sitio. Componente de servidor: solo prepara los enlaces
 * y delega la parte interactiva en `SiteNav`.
 */
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { SiteNav, type NavLink } from "@/components/layout/SiteNav";
import { childCategories, topLevelCategories } from "@/data/categories";
import { COMPANY, companyPhoneHref } from "@/data/company";
import { pick, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function Header() {
  // El menú enseña el primer nivel y, colgando de él, los tipos de la
  // gama que los tenga. Sin esto, "Entrance doors" —la gama con más
  // modelos de todo el sitio— quedaría a dos clics desde el menú.
  const categories: NavLink[] = topLevelCategories().map((category) => {
    const children = childCategories(category.slug);
    return {
      href: routes.category(category.slug),
      label: pick(category.name),
      ...(children.length > 0
        ? {
            children: children.map((child) => ({
              href: routes.category(child.slug),
              label: pick(child.name),
            })),
          }
        : {}),
    };
  });

  const links: NavLink[] = [
    { href: routes.catalogues, label: t("nav.catalogues") },
    { href: routes.projects, label: t("nav.projects") },
    { href: routes.colours, label: t("nav.colours") },
    { href: routes.about, label: t("nav.about") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-kamika-mist bg-kamika-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-5 md:h-20 md:px-8">
        <Link href={routes.home} className="shrink-0 rounded-kamika">
          <Wordmark size="header" />
        </Link>

        <SiteNav
          links={links}
          categories={categories}
          phone={COMPANY.phone}
          phoneHref={companyPhoneHref}
        />
      </div>
    </header>
  );
}
