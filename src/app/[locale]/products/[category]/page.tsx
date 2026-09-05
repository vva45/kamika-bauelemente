/**
 * Página de categoría. Enseña lo más concreto que tenga la gama, en este
 * orden:
 *
 *   0. TIPOS, si la gama agrupa otras (Doors → entrance / interior /
 *      patio). Es un hub: no vende nada por sí mismo.
 *   1. FABRICANTES, si los declara (ventanas: Aluplast → sistemas).
 *   2. COLECCIONES, si tiene catálogos con escaparate (puertas de
 *      entrada: ROKA Signature, ROKA Select, Despiro, paneles). Cada
 *      portada lleva a todos los modelos de ese catálogo — y debajo,
 *      los modelos que OTRA colección aporta a la gama (accesorios,
 *      puertas PIVOT, Klappläden).
 *   3. Aviso honesto de "en preparación" con las salidas útiles, para
 *      una gama que aún no tenga nada de lo anterior.
 *
 * Los dos primeros escalones son la misma idea que pidió el dueño —
 * primero la marca, después lo que ofrece— y por eso van antes que
 * cualquier modelo suelto. (Las fichas de producto sueltas que había
 * como cuarto escalón eran datos de ejemplo; se fueron en 2026-09.)
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CatalogueCard } from "@/components/catalogue/CatalogueCard";
import { CollectionCard } from "@/components/catalogue/CollectionCard";
import { ModelCard } from "@/components/catalogue/ModelCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { ManufacturerCard } from "@/components/manufacturer/ManufacturerCard";
import { ComingSoon } from "@/components/ui/ComingSoon";
import {
  CATALOGUES,
  CATEGORY_SLUGS,
  childCategories,
  countModelsInCategory,
  getCategory,
  getCollectionsFor,
  getManufacturersByCategory,
  getModelsInCategory,
  isCategorySlug,
} from "@/data";
import { pick, t, setRequestLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { tm } from "@/lib/model-text";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[category]">): Promise<Metadata> {
  const { locale, category: slug } = await params;
  setRequestLocale(locale);
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

export default async function CategoryPage({ params }: PageProps<"/[locale]/products/[category]">) {
  const { locale, category: slug } = await params;
  setRequestLocale(locale);
  if (!isCategorySlug(slug)) notFound();

  const category = getCategory(slug);
  if (!category) notFound();

  // Una gama puede agrupar tipos en vez de producto propio: entonces
  // enseña sus tipos y nada más, que es justo lo que se ha venido a
  // elegir aquí.
  const children = childCategories(slug);
  // Jerarquía por fabricante (petición del dueño para ventanas): si la
  // gama declara fabricantes, la categoría enseña sus "casitas" en vez
  // de modelos sueltos. Fabricante → sistemas → versiones.
  const manufacturers = getManufacturersByCategory(slug);
  // Y por colección donde ya hay catálogo: portada → todos sus modelos.
  const collections = getCollectionsFor(slug);
  // Y los modelos que otra colección aporta a esta gama: los accesorios
  // que traen al final los catálogos de puertas y de persianas.
  const models = getModelsInCategory(slug);

  return (
    <>
      <CategoryHero category={category} modelCount={countModelsInCategory(slug)} />

      {children.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl md:text-3xl">{t("category.typesHeading")}</h2>
          <p className="mt-4 max-w-2xl text-pretty text-kamika-ink/70">
            {t("category.typesIntro")}
          </p>

          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((child, index) => (
              <CategoryCard
                key={child.slug}
                category={child}
                modelCount={countModelsInCategory(child.slug)}
                priority={index < 3}
              />
            ))}
          </div>
        </section>
      ) : manufacturers.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
          <p className="max-w-2xl text-pretty text-kamika-ink/70 md:text-lg">
            {t("manufacturer.chooseIntro")}
          </p>
          {/* Tres por fila (pedido del dueño, 2026-08): con dos, las
              tarjetas se veían "algo grandes" — y con siete fabricantes
              de ventanas la página se hacía un pergamino. */}
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturers.map((manufacturer, index) => (
              <ManufacturerCard
                key={manufacturer.id}
                manufacturer={manufacturer}
                priority={index < 3}
              />
            ))}
          </div>
        </section>
      ) : collections.length > 0 || models.length > 0 ? (
        // Colecciones y modelos por override ya NO se excluyen: el
        // Aluminium-Katalog (sin categoría propia) aporta puertas PIVOT
        // a entrance-doors y Klappläden a roller-shutters, gamas que ya
        // tienen colecciones — se enseñan las dos cosas, colección
        // primero.
        <>
          {collections.length > 0 && (
            <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
              <h2 className="text-2xl md:text-3xl">{t("collection.heading")}</h2>
              <p className="mt-4 max-w-2xl text-pretty text-kamika-ink/70">
                {t("collection.intro")}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
                {collections.map((catalogue, index) => (
                  <CollectionCard
                    key={catalogue.id}
                    catalogue={catalogue}
                    priority={index < 4}
                  />
                ))}
              </div>
            </section>
          )}
          {models.length > 0 && (
            <section
              className={`mx-auto max-w-[1440px] px-5 pb-12 md:px-8 md:pb-16 ${
                collections.length > 0 ? "pt-4" : "pt-12 md:pt-16"
              }`}
            >
              <p className="max-w-2xl text-pretty text-kamika-ink/70 md:text-lg">
                {t("category.fromCataloguesIntro")}
              </p>

              {/* Por familias, tal y como vienen impresos: quien busca una
                  manilla no quiere verla entre los mandos de persiana. */}
              {[...new Set(models.map((model) => model.family ?? ""))].map((family) => {
                const group = models.filter((model) => (model.family ?? "") === family);
                return (
                  <div key={family} className="mt-12 first:mt-10">
                    {family && <h2 className="text-2xl md:text-3xl">{tm(family)}</h2>}
                    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
                      {group.map((model, index) => (
                        <ModelCard key={`${model.catalogue}-${model.id}`} model={model} priority={index < 4} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </>
      ) : (
        // Hoy ninguna gama cae aquí — las ocho tienen fabricantes,
        // colecciones o modelos — pero una gama nueva sin catálogo
        // aterrizaría en este aviso, nunca en una página vacía.
        <ComingSoon title={t("category.comingSoonTitle")} body={t("category.comingSoonBody")}>
          {/* Mientras no hay fichas, los catálogos generales son la
              mejor respuesta a "¿qué ofrecéis aquí?". */}
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {CATALOGUES.slice(0, 3).map((catalogue) => (
              <CatalogueCard key={catalogue.id} catalogue={catalogue} />
            ))}
          </div>
        </ComingSoon>
      )}

      <ContactCta />
    </>
  );
}
