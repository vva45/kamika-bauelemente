/**
 * Página de FABRICANTE dentro de una gama: /products/windows/aluprof.
 *
 * Es el segundo escalón de la jerarquía que pidió el dueño (gama →
 * fabricante → sistema); el tercero vive en `[system]/page.tsx`. La
 * vista en sí es `ManufacturerView`; aquí solo se resuelven los
 * parámetros y la metadata.
 *
 * Historia: este segmento se llamó `[product]` y servía también fichas
 * de producto sueltas. Esas fichas eran datos de ejemplo, se retiraron
 * en 2026-08 y en 2026-09 se fue con ellas todo su código: hoy cada
 * gama se vende por fabricante o por colección de catálogo.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManufacturerView } from "@/components/manufacturer/ManufacturerView";
import { MANUFACTURERS, getManufacturer, isCategorySlug } from "@/data";
import { pick, setRequestLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return MANUFACTURERS.map((manufacturer) => ({
    category: manufacturer.category,
    manufacturer: manufacturer.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[category]/[manufacturer]">): Promise<Metadata> {
  const { locale, category, manufacturer: id } = await params;
  setRequestLocale(locale);
  if (!isCategorySlug(category)) return {};

  const manufacturer = getManufacturer(category, id);
  if (!manufacturer) return {};

  return pageMetadata({
    title: manufacturer.name,
    description: pick(manufacturer.tagline),
    path: routes.manufacturer(manufacturer.category, manufacturer.id),
    image: { url: manufacturer.image, alt: manufacturer.name },
  });
}

export default async function ManufacturerPage({
  params,
}: PageProps<"/[locale]/products/[category]/[manufacturer]">) {
  const { locale, category, manufacturer: id } = await params;
  setRequestLocale(locale);
  if (!isCategorySlug(category)) notFound();

  // La clave es (categoría, id): Salamander existe en ventanas y en
  // puertas de terraza, y cada una es su propia página.
  const manufacturer = getManufacturer(category, id);
  if (!manufacturer) notFound();

  return <ManufacturerView manufacturer={manufacturer} />;
}

/** Solo los pares categoría/fabricante reales: nada de rutas fantasma. */
export const dynamicParams = false;
