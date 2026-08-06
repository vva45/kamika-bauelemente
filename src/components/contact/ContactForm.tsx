"use client";

/**
 * Formulario de contacto.
 *
 * Envía con una Server Action; sin JavaScript el navegador la manda
 * igual, porque es un <form> de verdad con `action`.
 *
 * La validación del navegador solo sirve para no hacer un viaje de ida
 * y vuelta por un email mal escrito: la que manda es la del servidor, y
 * las dos ejecutan exactamente la misma función (`validateContact`).
 */
import Link from "next/link";
import { useActionState, useState } from "react";
import { sendEnquiry } from "@/app/contact/actions";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ChatIcon } from "@/components/ui/icons";
import { COMPANY, companyEmailHref, companyWhatsAppWith } from "@/data/company";
import { cn } from "@/lib/cn";
import {
  CONTACT_ERROR_KEY,
  CONTACT_IDLE,
  type ContactErrorField,
  HONEYPOT_FIELD,
  MESSAGE_MIN_LENGTH,
  readContactValues,
  validateContact,
} from "@/lib/contact";
import { t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

/** Un producto para el desplegable, ya agrupado por categoría. */
export type ProductOption = { id: string; label: string };
export type ProductOptionGroup = { category: string; options: ProductOption[] };

type ContactFormProps = {
  groups: ProductOptionGroup[];
  /** Producto que llega en `?product=`, ya validado en el servidor. */
  selectedProduct: string;
};

const fieldClasses = (invalid: boolean) =>
  cn(
    "w-full rounded-kamika border bg-kamika-paper px-3 py-2.5 text-sm text-kamika-ink",
    "placeholder:text-kamika-ink/40",
    invalid ? "border-kamika-steel" : "border-kamika-mist",
  );

const labelClasses = "eyebrow mb-2 block";

export function ContactForm({ groups, selectedProduct }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendEnquiry, CONTACT_IDLE);
  // Errores detectados en el navegador antes de enviar. Los del
  // servidor llegan en `state`.
  const [clientErrors, setClientErrors] = useState<ContactErrorField[]>([]);
  // "Copiado" vuelve a su sitio solo: un botón que se queda diciendo
  // "copiado" para siempre hace dudar de si copió la última vez.
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {
      // Sin permiso de portapapeles (o sin HTTPS) no se puede copiar
      // por código. No es un callejón sin salida: el mensaje está
      // impreso encima y se puede seleccionar a mano.
      setCopied(false);
    }
  };

  const errors = state.status === "invalid" ? state.fields : clientErrors;
  const hasError = (field: ContactErrorField) => errors.includes(field);

  if (state.status === "success") {
    return (
      <div className="rounded-kamika border border-kamika-mist bg-kamika-blue-50 p-6">
        <h3 className="text-xl">{t("contactPage.successTitle")}</h3>
        <p className="mt-3 text-pretty text-kamika-ink/75">{t("contactPage.successBody")}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(event) => {
        const values = readContactValues(new FormData(event.currentTarget));
        const invalid = validateContact(values);
        setClientErrors(invalid);
        if (invalid.length > 0) event.preventDefault();
      }}
      className="grid gap-5"
    >
      {/* Trampa anti-spam. Fuera de la vista y fuera del tabulador; los
          lectores de pantalla tampoco la anuncian. */}
      <div aria-hidden className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            {t("contactPage.nameLabel")} <span aria-hidden>*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required
            aria-invalid={hasError("name")}
            aria-describedby={hasError("name") ? "contact-name-error" : undefined}
            className={fieldClasses(hasError("name"))}
          />
          {hasError("name") && (
            <p id="contact-name-error" className="mt-2 text-sm text-kamika-steel">
              {t(CONTACT_ERROR_KEY.name)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            {t("contactPage.emailLabel")} <span aria-hidden>*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required
            aria-invalid={hasError("email")}
            aria-describedby={hasError("email") ? "contact-email-error" : undefined}
            className={fieldClasses(hasError("email"))}
          />
          {hasError("email") && (
            <p id="contact-email-error" className="mt-2 text-sm text-kamika-steel">
              {t(CONTACT_ERROR_KEY.email)}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            {t("contactPage.phoneLabel")}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClasses(false)}
          />
        </div>

        <div>
          <label htmlFor="contact-product" className={labelClasses}>
            {t("contactPage.productLabel")}
          </label>
          {/* Preseleccionado desde ?product=, que es lo que trae el
              botón "Send enquiry" de cada ficha. */}
          <select
            id="contact-product"
            name="product"
            defaultValue={selectedProduct}
            // Sin `appearance-none`: la flecha nativa es lo que hace
            // que un desplegable se vea como un desplegable.
            className={fieldClasses(false)}
          >
            <option value="">—</option>
            {groups.map((group) => (
              <optgroup key={group.category} label={group.category}>
                {group.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          {t("contactPage.messageLabel")} <span aria-hidden>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-required
          minLength={MESSAGE_MIN_LENGTH}
          aria-invalid={hasError("message")}
          aria-describedby={hasError("message") ? "contact-message-error" : undefined}
          placeholder={t("contactPage.messagePlaceholder")}
          className={fieldClasses(hasError("message"))}
        />
        {hasError("message") && (
          <p id="contact-message-error" className="mt-2 text-sm text-kamika-steel">
            {t(CONTACT_ERROR_KEY.message)}
          </p>
        )}
      </div>

      {/* Consentimiento DSGVO. Obligatorio y sin marcar de serie: una
          casilla premarcada no es consentimiento. */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            aria-required
            aria-invalid={hasError("consent")}
            aria-describedby={hasError("consent") ? "contact-consent-error" : undefined}
            className="mt-1 size-4 shrink-0 accent-kamika-steel"
          />
          <label htmlFor="contact-consent" className="text-sm text-kamika-ink/75">
            {t("contactPage.consentLabel")}{" "}
            <Link href={routes.privacy} className="text-kamika-steel underline">
              {t("contactPage.consentLink")}
            </Link>
            .
          </label>
        </div>
        {hasError("consent") && (
          <p id="contact-consent-error" className="mt-2 text-sm text-kamika-steel">
            {t(CONTACT_ERROR_KEY.consent)}
          </p>
        )}
      </div>

      {state.status === "fallback" && (
        <div className="rounded-kamika border border-kamika-mist bg-kamika-blue-50 p-5">
          <h3 className="text-lg">{t("contactPage.fallbackTitle")}</h3>
          <p className="mt-2 text-sm text-pretty text-kamika-ink/75">
            {t("contactPage.fallbackBody")}
          </p>

          {/* El mensaje, a la vista. Que se vea es media solución: si
              ningún botón funciona, se puede seleccionar y copiar a
              mano, y además el visitante comprueba qué va a mandar. */}
          <pre className="mt-4 max-h-44 overflow-auto rounded-kamika border border-kamika-mist bg-kamika-paper p-3 font-sans text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-kamika-ink/80">
            {state.text}
          </pre>

          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink href={state.mailto} size="sm">
              {t("contactPage.fallbackAction")}
            </ButtonLink>
            {/* WhatsApp se lleva el mensaje entero, asunto incluido. */}
            <ButtonLink
              href={companyWhatsAppWith(state.text)}
              variant="secondary"
              size="sm"
              external
            >
              <ChatIcon className="size-4" />
              {t("contactPage.fallbackWhatsApp")}
            </ButtonLink>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => copy(state.text)}
            >
              {copied ? t("contactPage.fallbackCopied") : t("contactPage.fallbackCopy")}
            </Button>
          </div>

          <p className="mt-4 text-[0.8125rem] text-kamika-ink/65">
            {t("contactPage.fallbackAddress")}{" "}
            <a href={companyEmailHref} className="text-kamika-steel underline">
              {COMPANY.email}
            </a>
          </p>
          <p className="mt-2 text-[0.75rem] text-pretty text-kamika-ink/55">
            {t("contactPage.fallbackNoMailApp")}
          </p>
        </div>
      )}

      {state.status === "error" && (
        <div className="rounded-kamika border border-kamika-mist bg-kamika-blue-50 p-5">
          <h3 className="text-lg">{t("contactPage.errorTitle")}</h3>
          <p className="mt-2 text-sm text-kamika-ink/75">{t("contactPage.errorBody")}</p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? t("contactPage.sending") : t("contactPage.submit")}
        </Button>
        <span className="eyebrow">* {t("contactPage.requiredMark")}</span>
      </div>
    </form>
  );
}
