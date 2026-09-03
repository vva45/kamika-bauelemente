/**
 * JSON-LD. Datos estructurados para que Google entienda que esto es un
 * negocio local de Hechingen.
 *
 * Todo sale de la capa de datos: si un dato no está, no se escribe la
 * propiedad. Y sin `offers` ni precios en ninguna parte — la web no es
 * una tienda, e inventar un "InStock" para conseguir un rich result
 * sería mentirle al buscador. (El esquema Product por ficha se fue con
 * las fichas de producto, 2026-09.)
 */
import { COMPANY } from "@/data/company";
import { t } from "@/lib/i18n";
import { absoluteUrl, SITE_URL } from "@/lib/site";

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
  // Horario confirmado por el dueño (2026-08), en gramática schema.org.
  openingHours: COMPANY.openingHoursSchema,
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
