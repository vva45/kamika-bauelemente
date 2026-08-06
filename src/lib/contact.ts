/**
 * Validación del formulario de contacto.
 *
 * Vive aquí, sin "use server" ni "use client", porque la ejecutan los
 * dos lados: el navegador antes de enviar (para no hacer un viaje de
 * ida y vuelta por un email mal escrito) y el servidor siempre (porque
 * lo del navegador se salta cualquiera). Una sola definición de qué es
 * un mensaje válido.
 */
import type { ContentKey } from "@/lib/i18n";

export type ContactField = "name" | "email" | "phone" | "product" | "message" | "consent";

export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  /** Id del producto por el que se pregunta, o "" si es una consulta general. */
  product: string;
  message: string;
  consent: boolean;
};

/** Campos que pueden fallar la validación. */
export type ContactErrorField = Extract<ContactField, "name" | "email" | "message" | "consent">;

/** Mensaje de error de cada campo, en la capa de contenido. */
export const CONTACT_ERROR_KEY: Record<ContactErrorField, ContentKey> = {
  name: "contactPage.errorName",
  email: "contactPage.errorEmail",
  message: "contactPage.errorMessage",
  consent: "contactPage.errorConsent",
};

/**
 * Comprobación de email deliberadamente laxa: algo@algo.algo. Las
 * expresiones "completas" de RFC 5322 rechazan direcciones válidas y no
 * evitan ni una sola falsa. Quien quiera colar un email falso, lo cuela.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Nombre del campo trampa. No lo rellena ningún humano: no lo ve. */
export const HONEYPOT_FIELD = "website";

export const MESSAGE_MIN_LENGTH = 20;

/** Devuelve los campos que fallan. Vacío = el mensaje se puede enviar. */
export const validateContact = (values: ContactValues): ContactErrorField[] => {
  const errors: ContactErrorField[] = [];

  if (values.name.trim().length < 2) errors.push("name");
  if (!EMAIL.test(values.email.trim())) errors.push("email");
  if (values.message.trim().length < MESSAGE_MIN_LENGTH) errors.push("message");
  if (!values.consent) errors.push("consent");

  return errors;
};

/** Lee los valores de un FormData, ya recortados. Mismo código en los dos lados. */
export const readContactValues = (data: FormData): ContactValues => ({
  name: String(data.get("name") ?? "").trim(),
  email: String(data.get("email") ?? "").trim(),
  phone: String(data.get("phone") ?? "").trim(),
  product: String(data.get("product") ?? "").trim(),
  message: String(data.get("message") ?? "").trim(),
  consent: data.get("consent") === "on",
});

/** Resultado del envío, tal y como lo pinta el formulario. */
export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; fields: ContactErrorField[] }
  /**
   * No hay proveedor de envío configurado, o falló. No se pierde el
   * mensaje: vuelve ya redactado para que el visitante lo mande por
   * donde quiera —correo, WhatsApp o pegándolo a mano—, así que hace
   * falta el texto además del enlace `mailto:`.
   */
  | { status: "fallback"; mailto: string; text: string }
  | { status: "error" };

export const CONTACT_IDLE: ContactState = { status: "idle" };
