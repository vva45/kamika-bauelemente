/**
 * Datos reales de la empresa. Única fuente de verdad para el Impressum,
 * el pie, la página de contacto y el JSON-LD.
 *
 * Estos datos NO son de ejemplo: los ha dado el dueño.
 */

export const COMPANY = {
  /** Nombre legal, el que va en el Impressum. */
  legalName: "Dominik Kamienski – Einzelunternehmen",
  /** Nombre comercial corto (el del logo). */
  tradeName: "Kamika",
  /** Nombre comercial completo. */
  tradeNameFull: "Kamika Bauelemente",
  /** Bajada del logo, en versalitas espaciadas. Nunca se traduce. */
  wordmarkSuffix: "Bauelemente",
  /** Titular / Inhaber. */
  owner: "Dominik Kamienski",

  street: "Thomasstraße 11",
  postalCode: "72379",
  city: "Hechingen",
  country: "Deutschland",
  countryCode: "DE",

  email: "kamika.bauelemente@gmail.com",
  phone: "+49 162 774 2992",

  /**
   * Umsatzsteuer-Identifikationsnummer (§ 27a UStG).
   * TODO: pendiente del dueño. Si es Kleinunternehmer puede no tenerla:
   * mientras sea null, el Impressum no publica el bloque, en vez de
   * publicar un número inventado o un "pendiente".
   */
  vatId: null as string | null,

  /**
   * Cámara / registro profesional (Handwerkskammer y Berufsbezeichnung).
   * TODO: pendiente del dueño. Mismo criterio: null = no se publica.
   */
  chamber: null as string | null,

  /** Coordenadas de Hechingen para el JSON-LD y el mapa estático. */
  geo: { latitude: 48.3517, longitude: 8.9647 },

  /**
   * Horario de atención.
   * TODO: dato pendiente del dueño. Mientras sea null, la interfaz
   * simplemente no muestra el bloque de horario (mejor omitirlo que
   * publicar un horario inventado).
   */
  openingHours: null as string[] | null,
} as const;

/** Dirección en una línea, como se escribe en Alemania. */
export const companyAddressLine = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;

/** `tel:` sin espacios, para que el móvil pueda marcar. */
export const companyPhoneHref = `tel:${COMPANY.phone.replace(/\s+/g, "")}`;

export const companyEmailHref = `mailto:${COMPANY.email}`;

const fullAddress = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}`;

/** Enlace a Google Maps: abrir la ficha del negocio en pestaña nueva. */
export const companyMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress,
)}`;

/**
 * Mapa de Google embebido y navegable.
 *
 * Va por dirección y no por coordenadas a propósito: Google geocodifica
 * la calle y clava la chincheta en el portal, mientras que las
 * coordenadas que hay en `COMPANY.geo` son del centro de Hechingen y
 * están para el JSON-LD, no para señalar el taller.
 *
 * ⚠️ Esta URL NO se pide al cargar la página: `LocationMap` la monta
 * solo cuando el visitante pulsa "Show map" (solución de dos clics).
 * Quien la use en otro sitio tiene que hacer lo mismo, porque abrirla
 * conecta el navegador del visitante con Google. Declarado en el
 * Datenschutz, § 9.
 */
export const companyMapEmbedHref = `https://www.google.com/maps?q=${encodeURIComponent(
  fullAddress,
)}&hl=de&z=16&output=embed`;
