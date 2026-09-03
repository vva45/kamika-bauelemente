/**
 * Página de un sistema de fabricante (Ideal 5000, BluEvolution 82…).
 *
 * El tercer nivel de la jerarquía que pidió el dueño:
 * categoría → fabricante → sistema.
 *
 * Dos estados, según lo que haya mandado el proveedor:
 *  - CON ficha: descripción y specs copiadas de ella, el render real y
 *    el botón azul a la ficha autoalojada. Como una ficha de producto.
 *  - SIN ficha: nombre, una línea honesta de que los datos vienen de
 *    camino, y el contacto. Nada de specs redactadas de memoria.
 */
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/layout/ContactCta";
import { SystemCard } from "@/components/manufacturer/SystemCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { ArrowRightIcon, DocumentIcon } from "@/components/ui/icons";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import { MANUFACTURERS, getCategory, getManufacturer, getSystem, isCategorySlug } from "@/data";
import { pick, t, setRequestLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return MANUFACTURERS.flatMap((manufacturer) =>
    manufacturer.systems.map((system) => ({
      category: manufacturer.category,
      manufacturer: manufacturer.id,
      system: system.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[category]/[manufacturer]/[system]">): Promise<Metadata> {
  const { locale, category, manufacturer: manufacturerId, system: systemId } = await params;
  setRequestLocale(locale);
  if (!isCategorySlug(category)) return {};
  const manufacturer = getManufacturer(category, manufacturerId);
  const system = manufacturer ? getSystem(manufacturer, systemId) : undefined;
  if (!manufacturer || !system) return {};

  return pageMetadata({
    title: `${manufacturer.name} ${system.name}`,
    description: pick(system.tagline),
    path: routes.manufacturerSystem(category, manufacturer.id, system.id),
    image: { url: system.image, alt: system.name },
  });
}

export default async function SystemPage({
  params,
}: PageProps<"/[locale]/products/[category]/[manufacturer]/[system]">) {
  const { locale, category: categorySlug, manufacturer: manufacturerId, system: systemId } = await params;
  setRequestLocale(locale);
  if (!isCategorySlug(categorySlug)) notFound();

  const manufacturer = getManufacturer(categorySlug, manufacturerId);
  if (!manufacturer) notFound();

  const system = getSystem(manufacturer, systemId);
  if (!system) notFound();

  const category = getCategory(categorySlug);
  const others = manufacturer.systems.filter((entry) => entry.id !== system.id);

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8">
        <Breadcrumb
          items={[
            { label: t("nav.products"), href: routes.products },
            ...(category
              ? [{ label: pick(category.name), href: routes.category(category.slug) }]
              : []),
            {
              label: manufacturer.name,
              href: routes.manufacturer(manufacturer.category, manufacturer.id),
            },
            { label: system.name },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <WindowFrame className="aspect-[4/3] w-full">
              <Image
                src={system.image}
                alt={system.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                // Render del fabricante sobre blanco: contain, porque
                // cover se comería el canto del perfil, que es lo que
                // distingue un sistema de otro.
                className="object-contain"
              />
            </WindowFrame>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">
                {t("system.fromManufacturer")} {manufacturer.name}
              </p>
              <h1 className="mt-4 text-3xl text-balance md:text-4xl">{system.name}</h1>
              <p className="mt-3 text-lg text-kamika-ink/70">{pick(system.tagline)}</p>

              {system.description && (
                <p className="mt-5 text-pretty text-kamika-ink/75">
                  {pick(system.description)}
                </p>
              )}

              {/* Sin ficha del fabricante no hay specs que enseñar, y no
                  se redactan de memoria: se dice y punto. */}
              {!system.specs && (
                <div className="mt-8 rounded-kamika border border-kamika-mist bg-kamika-blue-50 p-5">
                  <h2 className="text-lg">{t("system.versionsTitle")}</h2>
                  <p className="mt-2 text-sm text-pretty text-kamika-ink/75">
                    {t("system.versionsComingSoon")}
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3">
                {/* La ficha del fabricante, autoalojada. El botón azul
                    está reservado para esto en toda la web. */}
                {system.datasheet && (
                  <ButtonLink href={system.datasheet} variant="blue" external>
                    <DocumentIcon className="size-4" />
                    {t("product.datasheet")}
                    <span className="sr-only"> ({t("a11y.opensInNewTab")})</span>
                  </ButtonLink>
                )}
                <ButtonLink href={routes.contact}>{t("product.sendEnquiry")}</ButtonLink>
                <ButtonLink
                  href={routes.manufacturer(manufacturer.category, manufacturer.id)}
                  variant="secondary"
                >
                  {manufacturer.name}
                  <ArrowRightIcon className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>

        {system.specs && (
          <div className="mt-16 max-w-3xl md:mt-20">
            <ProductSpecTable specs={system.specs} />
          </div>
        )}
      </div>

      {others.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <SectionTitle title={t("system.otherSystems")} size="sm" />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((entry) => (
              <SystemCard key={entry.id} manufacturer={manufacturer} system={entry} />
            ))}
          </div>
        </section>
      )}

      <ContactCta />
    </>
  );
}

export const dynamicParams = false;
