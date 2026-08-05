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

/** Enlace a Google Maps. Se usa como destino del mapa estático (nunca un iframe). */
export const companyMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}`,
)}`;
