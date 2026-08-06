/**
 * Visor de un catálogo.
 *
 * Cabecera con el título, los datos técnicos del fichero y los dos
 * botones (descargar / abrir en pestaña nueva), y debajo el PDF con el
 * visor nativo del navegador. Los productos enlazan a su página exacta
 * dentro de estos ficheros con `#page=N`.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogueCard } from "@/components/catalogue/CatalogueCard";
import { CatalogueViewer } from "@/components/catalogue/CatalogueViewer";
import { ContactCta } from "@/components/layout/ContactCta";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowUpRightIcon, DownloadIcon } from "@/components/ui/icons";
import { CATALOGUES, getCatalogue, getCategory } from "@/data";
import { formatNumber, pick, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return CATALOGUES.map((catalogue) => ({ id: catalogue.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalogues/[id]">): Promise<Metadata> {
  const { id } = await params;
  const catalogue = getCatalogue(id);
  if (!catalogue) return {};

  return pageMetadata({
    title: pick(catalogue.title),
    description: t("catalogues.intro"),
    path: routes.catalogue(catalogue.id),
    image: { url: catalogue.cover, alt: pick(catalogue.title) },
  });
}

export default async function CataloguePage({ params }: PageProps<"/catalogues/[id]">) {
  const { id } = await params;
  const catalogue = getCatalogue(id);
  if (!catalogue) notFound();

  const title = pick(catalogue.title);
  const category = catalogue.category ? getCategory(catalogue.category) : undefined;
  const others = CATALOGUES.filter((entry) => entry.id !== catalogue.id);

  // Año, páginas y peso: ficha técnica del fichero, no texto corrido.
  const meta = [
    category ? pick(category.name) : t("catalogue.general"),
    catalogue.year ? formatNumber(catalogue.year, { useGrouping: false }) : null,
    catalogue.pages ? `${formatNumber(catalogue.pages)} ${t("catalogue.pages")}` : null,
    catalogue.sizeMb ? `${formatNumber(catalogue.sizeMb)} ${t("catalogue.size")}` : null,
  ].filter((entry): entry is string => entry !== null);

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8">
        <Breadcrumb
          items={[
            { label: t("nav.catalogues"), href: routes.catalogues },
            { label: title },
          ]}
        />

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{meta.join(" · ")}</p>
            <h1 className="mt-3 text-3xl text-balance md:text-4xl">{title}</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={catalogue.file} external download>
              <DownloadIcon className="size-4" />
              {t("common.download")}
            </ButtonLink>
            <ButtonLink href={catalogue.file} variant="secondary" external>
              {t("common.openInNewTab")}
              <ArrowUpRightIcon className="size-4" />
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10">
          <CatalogueViewer file={catalogue.file} title={title} cover={catalogue.cover} />
        </div>
      </div>

      {others.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <SectionTitle title={t("catalogue.otherCatalogues")} size="sm" />
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((entry) => (
              <CatalogueCard key={entry.id} catalogue={entry} />
            ))}
          </div>
        </section>
      )}

      <ContactCta />
    </>
  );
}

/** Solo se sirven los catálogos que existen de verdad. */
export const dynamicParams = false;
