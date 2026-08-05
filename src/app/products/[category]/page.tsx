/**
 * Página de categoría.
 *
 * Con productos: hero + listado filtrable por material.
 * Sin productos (o `comingSoon`): el MISMO hero, un aviso honesto y las
 * salidas útiles — catálogos de la casa y contacto directo. Nunca una
 * página rota ni un h1 suelto.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryProducts } from "@/components/category/CategoryProducts";
import { CatalogueCard } from "@/components/catalogue/CatalogueCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  CATALOGUES,
  CATEGORY_SLUGS,
  getCategory,
  getProductsByCategory,
  isCategorySlug,
} from "@/data";
import { pick, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  if (!isCategorySlug(slug)) return {};
  const category = getCategory(slug);
  if (!category) return {};
  return { title: pick(category.name), description: pick(category.intro) };
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const { category: slug } = await params;
  if (!isCategorySlug(slug)) notFound();

  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const comingSoon = category.comingSoon || products.length === 0;

  return (
    <>
      <CategoryHero category={category} productCount={products.length} />

      {comingSoon ? (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <SectionTitle
            title={t("category.comingSoonTitle")}
            intro={t("category.comingSoonBody")}
            action={
              <ButtonLink href={routes.contact} size="sm">
                {t("common.contactUs")}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            }
          />

          {/* Mientras no hay fichas, los catálogos generales son la
              mejor respuesta a "¿qué ofrecéis aquí?". */}
          <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {CATALOGUES.slice(0, 3).map((catalogue) => (
              <CatalogueCard key={catalogue.id} catalogue={catalogue} />
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
          <CategoryProducts products={products} />
        </section>
      )}

      <ContactCta />
    </>
  );
}
