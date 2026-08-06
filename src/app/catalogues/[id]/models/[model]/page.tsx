/**
 * Ficha de un modelo del catálogo.
 *
 * Misma estructura que la ficha de producto —imagen grande a la
 * izquierda, datos y botones a la derecha, tabla de specs debajo— pero
 * con lo que un modelo de escaparate tiene de verdad: su nombre, sus
 * datos tal y como están impresos, y el botón que abre el catálogo por
 * su página exacta.
 *
 * No hay galería ni lightbox: del catálogo sale una sola imagen por
 * modelo, y montar un carrusel de una foto es teatro.
 */
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ModelCard } from "@/components/catalogue/ModelCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { ArrowUpRightIcon, DocumentIcon } from "@/components/ui/icons";
import { CATALOGUE_MODELS, getCatalogue, getCatalogueModel, getModelsByCatalogue } from "@/data";
import { pick, t, tf } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return CATALOGUE_MODELS.map((model) => ({ id: model.catalogue, model: model.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalogues/[id]/models/[model]">): Promise<Metadata> {
  const { id, model: modelId } = await params;
  const model = getCatalogueModel(id, modelId);
  const catalogue = getCatalogue(id);
  if (!model || !catalogue) return {};

  const lead = model.specs[0];

  return pageMetadata({
    title: `${model.name} — ${pick(catalogue.title)}`,
    description: lead ? `${lead.label}: ${lead.value}.` : t("catalogue.modelsIntro"),
    path: routes.catalogueModel(model.catalogue, model.id),
    image: { url: model.image, alt: model.name },
  });
}

export default async function CatalogueModelPage({
  params,
}: PageProps<"/catalogues/[id]/models/[model]">) {
  const { id, model: modelId } = await params;
  const model = getCatalogueModel(id, modelId);
  const catalogue = getCatalogue(id);
  if (!model || !catalogue) notFound();

  const title = pick(catalogue.title);
  // Vecinos en el catálogo: seguir mirando es lo que hace un escaparate.
  const siblings = getModelsByCatalogue(catalogue.id);
  const index = siblings.findIndex((entry) => entry.id === model.id);
  const nearby = [
    ...siblings.slice(Math.max(0, index - 2), index),
    ...siblings.slice(index + 1, index + 5),
  ].slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8">
        <Breadcrumb
          items={[
            { label: t("nav.catalogues"), href: routes.catalogues },
            { label: title, href: routes.catalogue(catalogue.id) },
            { label: t("catalogue.models"), href: routes.catalogueModels(catalogue.id) },
            { label: model.name },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <WindowFrame className="aspect-[4/5] w-full sm:aspect-[4/3]">
              <Image
                src={model.image}
                alt={model.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain p-6"
              />
            </WindowFrame>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">
                {t("catalogue.fromCatalogue")} · {title}
              </p>
              <h1 className="mt-4 text-3xl text-balance md:text-4xl">{model.name}</h1>
              {model.family && (
                <p className="mt-2 font-mono text-[0.8125rem] tracking-[0.12em] text-kamika-steel uppercase">
                  {model.family}
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3">
                {/* El destino exacto: el catálogo abierto por su página. */}
                <ButtonLink href={`${catalogue.file}#page=${model.page}`} variant="blue" external>
                  <DocumentIcon className="size-4" />
                  {tf("catalogue.openAtPage", { page: model.page })}
                  <span className="sr-only"> ({t("a11y.opensInNewTab")})</span>
                </ButtonLink>
                <ButtonLink href={routes.contact} variant="secondary">
                  {t("product.sendEnquiry")}
                </ButtonLink>
                <ButtonLink href={routes.catalogueModels(catalogue.id)} variant="secondary">
                  {t("catalogue.viewAllModels")}
                  <ArrowUpRightIcon className="size-4" />
                </ButtonLink>
              </div>

              <p className="mt-8 text-sm text-pretty text-kamika-ink/60">
                {t("catalogue.modelNote")}
              </p>
            </div>
          </div>
        </div>

        {model.specs.length > 0 && (
          <div className="mt-16 max-w-3xl md:mt-20">
            <table className="w-full border-collapse text-sm">
              <caption className="eyebrow mb-4 text-left">{t("product.specifications")}</caption>
              <tbody>
                {model.specs.map((spec) => (
                  <tr key={spec.label} className="border-t border-kamika-mist last:border-b">
                    <th scope="row" className="py-3 pr-6 text-left font-normal text-kamika-ink/65">
                      {spec.label}
                    </th>
                    <td className="py-3 text-right font-mono text-[0.8125rem] text-kamika-ink">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {nearby.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <SectionTitle
            title={t("catalogue.otherModels")}
            size="sm"
            action={
              <ButtonLink href={routes.catalogueModels(catalogue.id)} variant="secondary" size="sm">
                {t("catalogue.viewAllModels")}
              </ButtonLink>
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((entry) => (
              <ModelCard key={entry.id} model={entry} />
            ))}
          </div>
        </section>
      )}

      <ContactCta />
    </>
  );
}

export const dynamicParams = false;
