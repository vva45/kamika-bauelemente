/**
 * 404 con la cara del sitio.
 *
 * Una dirección equivocada no puede acabar en la página en blanco de
 * Next: se explica qué ha pasado y se ofrecen las salidas reales, que
 * son las mismas secciones del menú. Mismo layout y mismos tokens que
 * el resto — nadie tiene que dudar de si sigue en la web de Kamika.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/layout/ContactCta";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowRightIcon } from "@/components/ui/icons";
import { orderedCategories } from "@/data";
import { pick, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: t("notFound.title"),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const sections = [
    { href: routes.products, label: t("nav.products") },
    { href: routes.catalogues, label: t("nav.catalogues") },
    { href: routes.projects, label: t("nav.projects") },
    { href: routes.colours, label: t("nav.colours") },
    { href: routes.about, label: t("nav.about") },
    { href: routes.contact, label: t("nav.contact") },
  ];

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <SectionTitle
          as="h1"
          size="lg"
          eyebrow={t("notFound.eyebrow")}
          title={t("notFound.title")}
          intro={t("notFound.body")}
          action={
            <ButtonLink href={routes.home} size="sm">
              {t("notFound.backHome")}
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
          }
        />

        {/* Las secciones del sitio, en el mismo orden que el menú. */}
        <ul className="mt-12 grid gap-x-6 gap-y-4 border-t border-kamika-mist pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="flex items-center justify-between border-b border-kamika-mist py-3 text-lg text-kamika-ink hover:text-kamika-steel"
              >
                {section.label}
                <ArrowRightIcon className="size-4 text-kamika-steel" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Y las ocho gamas, que es lo que la mayoría venía buscando. */}
        <ul className="mt-10 flex flex-wrap gap-2">
          {orderedCategories().map((category) => (
            <li key={category.slug}>
              <Link
                href={routes.category(category.slug)}
                className="block rounded-kamika bg-kamika-blue-50 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-kamika-steel uppercase hover:bg-kamika-blue hover:text-kamika-ink"
              >
                {pick(category.name)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactCta />
    </>
  );
}
