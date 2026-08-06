/**
 * Ficha de producto — la página que más trabaja del sitio.
 *
 * 1. Breadcrumb en mono, discreto.
 * 2. Galería (60%) con cotas + columna sticky (40%): nombre, tagline,
 *    las 3 specs destacadas en cajas mono, descripción y botones.
 *    El botón de ficha técnica sigue la regla de negocio de
 *    `datasheetHref`: PDF propio → página de catálogo → nada.
 * 3. Tabla de specs completa.
 * 4. "Goes well with" — el cruce de venta, definido a mano en los datos.
 * 5. Proyectos donde se instaló esta categoría.
 * 6. Franja de contacto con teléfono y email reales.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/layout/ContactCta";
import { ManufacturerView } from "@/components/manufacturer/ManufacturerView";
import { Gallery } from "@/components/media/Gallery";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import { ProjectCard } from "@/components/project/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowRightIcon, DocumentIcon } from "@/components/ui/icons";
import {
  MANUFACTURERS,
  PRODUCTS,
  countModelsByCatalogue,
  getCatalogue,
  getCategory,
  getManufacturer,
  getProduct,
  getProjectsByCategory,
  getRelated,
  isCategorySlug,
} from "@/data";
import { pick, t, tf } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { datasheetHref, formatSpecValue, highlightSpecs, productDimensions } from "@/lib/product";
import { productSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return [
    ...PRODUCTS.map((product) => ({ category: product.category, product: product.id })),
    // Los fabricantes comparten el segmento con los productos:
    // /products/windows/aluplast es un fabricante, no una ficha.
    ...MANUFACTURERS.map((manufacturer) => ({
      category: manufacturer.category,
      product: manufacturer.id,
    })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category: categorySlug, product: id } = await params;

  // ¿Es un fabricante? Su metadata es suya, no la de una ficha.
  if (isCategorySlug(categorySlug)) {
    const manufacturer = getManufacturer(categorySlug, id);
    if (manufacturer) {
      return pageMetadata({
        title: manufacturer.name,
        description: pick(manufacturer.tagline),
        path: routes.manufacturer(manufacturer.category, manufacturer.id),
        image: { url: manufacturer.image, alt: manufacturer.name },
      });
    }
  }

  const product = getProduct(id);
  if (!product) return {};

  const cover = product.images[0];

  // La foto del producto manda sobre la imagen genérica del sitio.
  return pageMetadata({
    title: product.name,
    description: pick(product.tagline),
    path: routes.product(product.category, product.id),
    ...(cover ? { image: { url: cover.src, alt: pick(cover.alt) } } : {}),
  });
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[category]/[product]">) {
  const { category: categorySlug, product: id } = await params;
  if (!isCategorySlug(categorySlug)) notFound();

  // Fabricante antes que producto: comparten segmento de URL y el
  // fabricante es una página completamente distinta.
  const manufacturer = getManufacturer(categorySlug, id);
  if (manufacturer) {
    return <ManufacturerView manufacturer={manufacturer} />;
  }

  const product = getProduct(id);
  // La URL debe coincidir con la categoría real del producto: una ficha
  // no se sirve bajo dos rutas distintas.
  if (!product || product.category !== categorySlug) notFound();

  const category = getCategory(product.category);
  if (!category) notFound();

  const datasheet = datasheetHref(product);
  const highlights = highlightSpecs(product).slice(0, 3);
  const related = getRelated(product);
  const projects = getProjectsByCategory(product.category).slice(0, 3);

  // Si el modelo sale de un catálogo, el visitante querrá ver el resto
  // de la colección: es el escaparate completo, a un clic.
  const sourceCatalogue = product.catalogue ? getCatalogue(product.catalogue.id) : undefined;
  const sourceModelCount = sourceCatalogue ? countModelsByCatalogue(sourceCatalogue.id) : 0;

  return (
    <>
      {/* La ficha, en datos estructurados. Sin `offers`: no hay precio
          que declarar y no se inventa uno. */}
      <JsonLd schema={productSchema(product, category)} />

      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8">
        {/* ── Breadcrumb ────────────────────────────────────────── */}
        <Breadcrumb
          items={[
            { label: t("nav.products"), href: routes.products },
            { label: pick(category.name), href: routes.category(category.slug) },
            { label: product.name },
          ]}
        />

        {/* ── Galería + columna de compra ───────────────────────── */}
        <div className="mt-8 grid gap-12 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <Gallery
              images={product.images}
              title={product.name}
              dimensions={productDimensions(product)}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <h1 className="text-3xl md:text-4xl">{product.name}</h1>
              <p className="mt-3 text-lg text-kamika-ink/70">{pick(product.tagline)}</p>

              {/* De qué colección sale esta ficha y cuántos modelos
                  tiene. Texto, no botón: el botón está más abajo. */}
              {sourceCatalogue && sourceModelCount > 1 && (
                <p className="eyebrow mt-4">
                  {pick(sourceCatalogue.title)} ·{" "}
                  {tf("catalogue.modelsInCatalogue", { count: sourceModelCount })}
                </p>
              )}

              {highlights.length > 0 && (
                <dl className="mt-7 grid grid-cols-3 gap-2">
                  {highlights.map((spec) => (
                    <div
                      key={pick(spec.label)}
                      className="rounded-kamika bg-kamika-blue-50 px-3 py-3"
                    >
                      <dt className="font-mono text-[0.625rem] tracking-[0.1em] text-kamika-steel uppercase">
                        {pick(spec.label)}
                      </dt>
                      <dd className="mt-1.5 font-mono text-sm font-medium tabular-nums text-kamika-ink">
                        {formatSpecValue(spec.value)}
                        {spec.unit ? ` ${spec.unit}` : ""}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <p className="mt-7 text-pretty text-kamika-ink/75">{pick(product.description)}</p>

              <div className="mt-8 flex flex-col gap-3">
                {/* Sin destino no hay botón: nunca un enlace muerto. */}
                {datasheet && (
                  <ButtonLink href={datasheet} variant="blue" external>
                    <DocumentIcon className="size-4" />
                    {t("product.datasheet")}
                    <span className="sr-only"> ({t("a11y.opensInNewTab")})</span>
                  </ButtonLink>
                )}
                <ButtonLink href={routes.contactAbout(product.id)} variant="secondary">
                  {t("product.sendEnquiry")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabla de specs completa ───────────────────────────── */}
        <div className="mt-16 max-w-3xl md:mt-24">
          <ProductSpecTable specs={product.specs} />
        </div>
      </div>

      {/* ── El resto de la colección ────────────────────────────── */}
      {sourceCatalogue && sourceModelCount > 1 && (
        <section className="border-y border-kamika-mist bg-kamika-blue-50">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <p className="eyebrow">{pick(sourceCatalogue.title)}</p>
              <p className="mt-3 max-w-xl text-lg text-pretty text-kamika-ink">
                {tf("catalogue.modelCount", { count: sourceModelCount })} —{" "}
                {t("catalogue.modelsIntro")}
              </p>
            </div>
            <ButtonLink href={routes.catalogueModels(sourceCatalogue.id)} className="shrink-0">
              {t("catalogue.viewAllModels")}
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
          </div>
        </section>
      )}

      {/* ── Goes well with — aquí está el negocio ───────────────── */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <SectionTitle title={t("product.goesWellWith")} size="sm" />
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((entry) => (
              <ProductCard key={entry.id} product={entry} />
            ))}
          </div>
        </section>
      )}

      {/* ── Proyectos con esta categoría ────────────────────────── */}
      {projects.length > 0 && (
        <section className="border-t border-kamika-mist bg-kamika-blue-50">
          <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
            <SectionTitle
              title={t("product.usedInProjects")}
              size="sm"
              action={
                <ButtonLink href={routes.projects} variant="secondary" size="sm">
                  {t("common.viewAll")}
                </ButtonLink>
              }
            />
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCta />
    </>
  );
}

/** Evita rutas fantasma: solo se sirven los pares categoría/producto reales. */
export const dynamicParams = false;
