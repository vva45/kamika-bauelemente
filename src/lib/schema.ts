/**
 * JSON-LD. Datos estructurados para que Google entienda que esto es un
 * negocio local de Hechingen y que cada ficha es un producto.
 *
 * Dos avisos deliberados:
 *  - El Product NO lleva `offers`: la web no publica precios y no es
 *    una tienda. Inventar un precio o un "InStock" para conseguir un
 *    rich result sería mentirle al buscador.
 *  - Todo sale de la capa de datos. Si un dato no está, no se escribe
 *    la propiedad.
 */
import { COMPANY } from "@/data/company";
import type { Category, Product } from "@/data/types";
import { pick, t } from "@/lib/i18n";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { routes } from "@/lib/routes";

const address = {
  "@type": "PostalAddress",
  streetAddress: COMPANY.street,
  postalCode: COMPANY.postalCode,
  addressLocality: COMPANY.city,
  addressCountry: COMPANY.countryCode,
};

/** El negocio. Va en el layout, así que sale en todas las páginas. */
export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}#business`,
  name: COMPANY.tradeNameFull,
  legalName: COMPANY.legalName,
  founder: { "@type": "Person", name: COMPANY.owner },
  description: t("footer.blurb"),
  url: SITE_URL,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  image: absoluteUrl("/brand/kamika-logo.png"),
  logo: absoluteUrl("/brand/kamika-logo.png"),
  address,
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY.geo.latitude,
    longitude: COMPANY.geo.longitude,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    // 40 km alrededor de Hechingen: la zona de trabajo declarada.
    geoRadius: 40000,
  },
  ...(COMPANY.vatId ? { vatID: COMPANY.vatId } : {}),
});

/** Una ficha de producto. */
export const productSchema = (product: Product, category: Category) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: pick(product.description),
  category: pick(category.name),
  url: absoluteUrl(routes.product(product.category, product.id)),
  image: product.images.map((image) => absoluteUrl(image.src)),
  brand: { "@type": "Brand", name: COMPANY.tradeNameFull },
  ...(product.material ? { material: product.material } : {}),
  // Las specs como propiedades adicionales: es exactamente lo que son.
  additionalProperty: product.specs.map((spec) => ({
    "@type": "PropertyValue",
    name: pick(spec.label),
    value: spec.unit ? `${spec.value} ${spec.unit}` : spec.value,
  })),
  seller: { "@id": `${SITE_URL}#business` },
});
