/**
 * Hub de categorías: las ocho, con su contador de modelos.
 * La primera fila grande, el resto en cuadrícula compacta.
 */
import type { Metadata } from "next";
import { CategoryCard } from "@/components/category/CategoryCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { countModelsInCategory, topLevelCategories } from "@/data";
import { t, setRequestLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return pageMetadata({
  title: t("products.title"),
  description: t("products.intro"),
  path: routes.products,
});
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const categories = topLevelCategories();
  const featured = categories.slice(0, 2);
  const rest = categories.slice(2);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <Reveal from="left">
          <SectionTitle
            as="h1"
            size="lg"
            eyebrow={t("products.eyebrow")}
            title={t("products.title")}
            intro={t("products.intro")}
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-x-6 gap-y-10 lg:grid-cols-2">
          {featured.map((category) => (
            <Reveal key={category.slug} asChild from="bottom">
              <CategoryCard
                category={category}
                modelCount={countModelsInCategory(category.slug)}
                scale="feature"
                priority
              />
            </Reveal>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((category) => (
            <Reveal key={category.slug} asChild from="bottom">
              <CategoryCard
                category={category}
                modelCount={countModelsInCategory(category.slug)}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <ContactCta />
    </>
  );
}
