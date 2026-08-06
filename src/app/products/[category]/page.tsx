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
import { ManufacturerCard } from "@/components/manufacturer/ManufacturerCard";
import { ComingSoon } from "@/components/ui/ComingSoon";
import {
  CATALOGUES,
  CATEGORY_SLUGS,
  countModelsInCategory,
  getCategory,
  getManufacturersByCategory,
  getProductsByCategory,
  isCategorySlug,
} from "@/data";
import { pick, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
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

  return pageMetadata({
    title: pick(category.name),
    description: pick(category.intro),
    path: routes.category(category.slug),
    image: { url: category.heroImage, alt: pick(category.name) },
  });
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const { category: slug } = await params;
  if (!isCategorySlug(slug)) notFound();

  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  // Jerarquía por fabricante (petición del dueño para ventanas): si la
  // gama declara fabricantes, la categoría enseña sus "casitas" en vez
  // de modelos sueltos. Fabricante → sistemas → versiones.
  const manufacturers = getManufacturersByCategory(slug);
  const comingSoon = manufacturers.length === 0 && (category.comingSoon || products.length === 0);

  return (
    <>
      <CategoryHero category={category} modelCount={countModelsInCategory(slug)} />

      {manufacturers.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
          <p className="max-w-2xl text-pretty text-kamika-ink/70 md:text-lg">
            {t("manufacturer.chooseIntro")}
          </p>
          <div className="mt-10 grid gap-x-6 gap-y-10 lg:grid-cols-2">
            {manufacturers.map((manufacturer, index) => (
              <ManufacturerCard
                key={manufacturer.id}
                manufacturer={manufacturer}
                priority={index < 2}
              />
            ))}
          </div>
        </section>
      ) : comingSoon ? (
        <ComingSoon title={t("category.comingSoonTitle")} body={t("category.comingSoonBody")}>
          {/* Mientras no hay fichas, los catálogos generales son la
              mejor respuesta a "¿qué ofrecéis aquí?". */}
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {CATALOGUES.slice(0, 3).map((catalogue) => (
              <CatalogueCard key={catalogue.id} catalogue={catalogue} />
            ))}
          </div>
        </ComingSoon>
      ) : (
        <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
          <CategoryProducts products={products} />
        </section>
      )}

      <ContactCta />
    </>
  );
}
