/**
 * Datos reales de la empresa. Única fuente de verdad para el Impressum,
 * el pie, la página de contacto y el JSON-LD.
 *
 * Estos datos NO son de ejemplo: los ha dado el dueño.
 */

export const COMPANY = {
  /** Nombre legal, el que va en el Impressum. */
  legalName: "Dominik Kamieński – Einzelunternehmen",
  /** Nombre comercial corto (el del logo). */
  tradeName: "Kamika",
  /** Nombre comercial completo. */
  tradeNameFull: "Kamika Bauelemente",
  /** Bajada del logo, en versalitas espaciadas. Nunca se traduce. */
  wordmarkSuffix: "Bauelemente",
  /** Titular / Inhaber. */
  owner: "Dominik Kamieński",

  street: "Thomasstraße 11",
  postalCode: "72379",
  city: "Hechingen",
  country: "Deutschland",
  countryCode: "DE",

  /**
   * Dirección LEGAL del Impressum, dictada por el dueño (agosto 2026):
   * "Kamika, Sigmaringer Straße 10, 72379 Hechingen". OJO: difiere de
   * la dirección de contacto de arriba (Thomasstraße 11), que es la
   * que dio para la página de contacto y el mapa. Se le preguntó cuál
   * de las dos vale para qué; hasta su respuesta, el Impressum usa la
   * que dictó para el Impressum y el contacto no se toca.
   */
  legalStreet: "Sigmaringer Straße 10",

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
   * Horario de atención, confirmado por el dueño (agosto 2026):
   * lunes a viernes de 9:00 a 17:00. Las líneas se pintan tal cual en
   * la página de contacto (formato neutro que se lee igual en de/en/pl);
   * `openingHoursSchema` es el mismo dato en la gramática de schema.org
   * para el JSON-LD.
   */
  openingHours: ["Mo.–Fr. 9:00–17:00"] as string[] | null,
  openingHoursSchema: "Mo-Fr 09:00-17:00",
} as const;

/** Dirección en una línea, como se escribe en Alemania. */
export const companyAddressLine = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;

/** La dirección del Impressum, en una línea. */
export const companyLegalAddressLine = `${COMPANY.legalStreet}, ${COMPANY.postalCode} ${COMPANY.city}`;

/** `tel:` sin espacios, para que el móvil pueda marcar. */
export const companyPhoneHref = `tel:${COMPANY.phone.replace(/\s+/g, "")}`;

export const companyEmailHref = `mailto:${COMPANY.email}`;

/**
 * WhatsApp. `wa.me` quiere el número en E.164 sin el "+" ni espacios.
 *
 * Confirmado: este número tiene WhatsApp y ya se usa con clientes.
 */
const whatsappNumber = COMPANY.phone.replace(/[^\d]/g, "");

export const companyWhatsAppHref = `https://wa.me/${whatsappNumber}`;

/** El mismo enlace con el mensaje ya escrito dentro. */
export const companyWhatsAppWith = (text: string) =>
  `${companyWhatsAppHref}?text=${encodeURIComponent(text)}`;

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
