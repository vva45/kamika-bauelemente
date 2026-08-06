"use server";

/**
 * Envío del formulario de contacto.
 *
 * Se hace con Resend si hay RESEND_API_KEY, y se llama por HTTP a su
 * API en vez de instalar su SDK: es una petición POST con un JSON, y el
 * encargo dice explícitamente que no se añadan librerías al stack.
 *
 * TODO (dueño / Vlad): mientras no haya RESEND_API_KEY en Vercel, el
 * formulario NO envía nada por su cuenta. Cae al mailto: el visitante
 * ve su mensaje ya escrito y lo manda desde su propio correo. Funciona,
 * pero se pierde a quien no tenga cliente de correo configurado, así
 * que la clave hay que ponerla. Ver .env.example.
 */
import { COMPANY } from "@/data/company";
import { getProduct } from "@/data";
import { t, tf } from "@/lib/i18n";
import {
  type ContactState,
  HONEYPOT_FIELD,
  readContactValues,
  validateContact,
} from "@/lib/contact";

/** Cuerpo del email, en texto plano. Sin HTML: esto lo lee una persona. */
const buildBody = (values: ReturnType<typeof readContactValues>, productName: string | null) =>
  [
    `${t("contactPage.nameLabel")}: ${values.name}`,
    `${t("contact.emailLabel")}: ${values.email}`,
    values.phone ? `${t("contact.phoneLabel")}: ${values.phone}` : null,
    productName ? `${t("contactPage.productEmailLabel")}: ${productName}` : null,
    "",
    values.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

const buildMailto = (subject: string, body: string) =>
  `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export async function sendEnquiry(
  _previous: ContactState,
  data: FormData,
): Promise<ContactState> {
  // Trampa anti-spam: un campo escondido que ningún humano ve. Si viene
  // relleno, se responde "enviado" y no se manda nada. Contestar con un
  // error solo le dice al bot que pruebe otra vez.
  if (String(data.get(HONEYPOT_FIELD) ?? "") !== "") {
    return { status: "success" };
  }

  const values = readContactValues(data);

  // Validación de servidor. La del navegador es comodidad; esta es la
  // que manda, porque la otra se la salta cualquiera.
  const invalid = validateContact(values);
  if (invalid.length > 0) return { status: "invalid", fields: invalid };

  const product = values.product ? getProduct(values.product) : undefined;
  const productName = product ? product.name : null;

  const subject = productName
    ? tf("contactPage.enquiryAbout", { product: productName })
    : t("contactPage.enquiryGeneral");
  const body = buildBody(values, productName);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    return { status: "fallback", mailto: buildMailto(subject, body) };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [COMPANY.email],
        // Responder al email va directo al cliente, sin copiar nada a mano.
        reply_to: values.email,
        subject,
        text: body,
      }),
    });

    if (!response.ok) {
      // El proveedor ha fallado, pero el visitante ya ha escrito su
      // mensaje: se le devuelve escrito en un mailto en vez de perderlo.
      console.error("Resend rejected the enquiry:", response.status, await response.text());
      return { status: "fallback", mailto: buildMailto(subject, body) };
    }

    return { status: "success" };
  } catch (error) {
    console.error("Could not reach the email provider:", error);
    return { status: "fallback", mailto: buildMailto(subject, body) };
  }
}
