/**
 * Escaparate: todos los modelos de un catálogo.
 *
 * La rejilla es fluida — una columna en el móvil, dos en tablet, tres o
 * cuatro en escritorio — y se recoloca sola al redimensionar la ventana,
 * sin puntos de ruptura raros por el medio.
 *
 * Si el catálogo declara familias (ROKA Signature las tiene: Earth,
 * Keramik, Glas…), se listan como índice para poder saltar a la suya.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelCard } from "@/components/catalogue/ModelCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowUpRightIcon, DownloadIcon } from "@/components/ui/icons";
import {
  CATALOGUES,
  countModelsByCatalogue,
  getCatalogue,
  getCategory,
  getModelFamilies,
  getModelsByCatalogue,
} from "@/data";
import { collectionName } from "@/lib/catalogue";
import { formatNumber, pick, t, tf, setRequestLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  // Solo catálogos CON escaparate: para los que no tienen modelos
  // extraídos (Salamander, los dos IGLO) la página llamaba notFound()
  // en el prerender y Next congelaba su cascarón de error sin estilo y
  // sin lang. Sin parámetro, la URL cae en el 404 propio con marca.
  return CATALOGUES.filter((catalogue) => countModelsByCatalogue(catalogue.id) > 0).map(
    (catalogue) => ({ id: catalogue.id }),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/catalogues/[id]/models">): Promise<Metadata> {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const catalogue = getCatalogue(id);
  if (!catalogue) return {};

  const count = getModelsByCatalogue(id).length;

  return pageMetadata({
    title: `${collectionName(catalogue)} — ${tf("catalogue.modelCount", { count })}`,
    description: t("catalogue.modelsIntro"),
    path: routes.catalogueModels(catalogue.id),
    image: { url: catalogue.cover, alt: pick(catalogue.title) },
  });
}

export default async function CatalogueModelsPage({
  params,
}: PageProps<"/[locale]/catalogues/[id]/models">) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const catalogue = getCatalogue(id);
  if (!catalogue) notFound();

  const models = getModelsByCatalogue(catalogue.id);
  if (models.length === 0) notFound();

  const families = getModelFamilies(catalogue.id);
  const title = collectionName(catalogue);
  // El camino de vuelta es por donde se entra: desde la gama, si la
  // colección pertenece a una. La lista de catálogos sigue siendo la
  // puerta de atrás para quien llega buscando el PDF.
  const category = catalogue.category ? getCategory(catalogue.category) : undefined;

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8">
        <Breadcrumb
          items={
            category
              ? [
                  { label: t("nav.products"), href: routes.products },
                  { label: pick(category.name), href: routes.category(category.slug) },
                  // Ver la nota de la ficha de modelo: si la colección
                  // se llama como la gama, no se repite.
                  ...(pick(category.name) === title ? [] : [{ label: title }]),
                ]
              : [
                  { label: t("nav.catalogues"), href: routes.catalogues },
                  { label: pick(catalogue.title), href: routes.catalogue(catalogue.id) },
                  { label: t("catalogue.models") },
                ]
          }
        />

        <div className="mt-8">
          <SectionTitle
            as="h1"
            size="lg"
            eyebrow={tf("catalogue.modelCount", { count: models.length })}
            title={title}
            intro={t("catalogue.modelsIntro")}
            action={
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={routes.catalogue(catalogue.id)} size="sm">
                  {t("common.browse")}
                </ButtonLink>
                <ButtonLink href={catalogue.file} variant="secondary" size="sm" external download>
                  <DownloadIcon className="size-4" />
                  {t("common.download")}
                </ButtonLink>
              </div>
            }
          />
        </div>

        {/* Índice de familias: en un catálogo de 300 páginas, saber que
            existe "Keramik" es más útil que un filtro. */}
        {families.length > 1 && (
          <nav aria-label={t("catalogue.modelFamilies")} className="mt-10">
            <p className="eyebrow">{t("catalogue.modelFamilies")}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {families.map((family) => (
                <li key={family}>
                  <a
                    href={`#${encodeURIComponent(family)}`}
                    className="block rounded-kamika bg-kamika-blue-50 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-kamika-steel uppercase hover:bg-kamika-blue hover:text-kamika-ink"
                  >
                    {family}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* La rejilla. `auto-fill` con un mínimo por tarjeta hace el
            trabajo: el número de columnas sale del ancho disponible, no
            de una lista de breakpoints. */}
        {families.length > 1 ? (
          families.map((family) => (
            <section key={family} className="mt-14 scroll-mt-28" id={encodeURIComponent(family)}>
              <h2 className="border-b border-kamika-mist pb-3 font-display text-xl font-medium text-kamika-ink">
                {family}
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {models
                  .filter((model) => model.family === family)
                  .map((model, index) => (
                    <ModelCard key={model.id} model={model} priority={index < 4} />
                  ))}
              </div>
            </section>
          ))
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {models.map((model, index) => (
              <ModelCard key={model.id} model={model} priority={index < 4} />
            ))}
          </div>
        )}

        <p className="mt-14 max-w-2xl border-t border-kamika-mist pt-6 text-sm text-pretty text-kamika-ink/60">
          {t("catalogue.modelNote")}
        </p>

        <div className="mt-8">
          <ButtonLink href={catalogue.file} variant="secondary" external>
            {t("catalogue.openCatalogue")}
            <ArrowUpRightIcon className="size-4" />
            <span className="sr-only">
              {" "}
              ({formatNumber(catalogue.pages ?? 0)} {t("catalogue.pages")})
            </span>
          </ButtonLink>
        </div>
      </div>

      <ContactCta />
    </>
  );
}

export const dynamicParams = false;
