/**
 * Franja de contacto directo con el mapa.
 *
 * Se reutiliza al final de la home, en /about y en la ficha de producto:
 * el dueño insistió en "contact me directly", así que su teléfono y su
 * email tienen que estar a un golpe de vista en varios sitios.
 *
 * El mapa vive en `LocationMap`, que es donde está explicado lo que
 * implica incrustar Google.
 */
import { ButtonLink } from "@/components/ui/Button";
import { LocationMap } from "@/components/contact/LocationMap";
import { ArrowUpRightIcon, ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import {
  COMPANY,
  companyAddressLine,
  companyEmailHref,
  companyMapsHref,
  companyPhoneHref,
  companyWhatsAppHref,
} from "@/data/company";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function ContactCta({ className }: { className?: string }) {
  return (
    <section className={cn("border-t border-kamika-mist bg-kamika-blue-50", className)}>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">{t("home.ctaEyebrow")}</p>
          <h2 className="mt-4 text-3xl text-balance md:text-4xl">{t("home.ctaTitle")}</h2>
          <p className="mt-5 max-w-md text-pretty text-kamika-ink/70">{t("home.ctaBody")}</p>

          <ul className="mt-8 grid gap-4">
            <li className="flex items-center gap-3">
              <PhoneIcon className="size-5 shrink-0 text-kamika-steel" />
              <a
                href={companyPhoneHref}
                className="font-mono text-lg text-kamika-ink hover:underline"
              >
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MailIcon className="size-5 shrink-0 text-kamika-steel" />
              <a href={companyEmailHref} className="break-all text-kamika-ink hover:underline">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <ChatIcon className="size-5 shrink-0 text-kamika-steel" />
              <a
                href={companyWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-kamika-ink hover:underline"
              >
                {t("contact.whatsappLabel")}
                <span className="sr-only"> ({t("a11y.opensInNewTab")})</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-kamika-steel" />
              <span className="text-kamika-ink/80">{companyAddressLine}</span>
            </li>
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={routes.contact}>{t("common.contactUs")}</ButtonLink>
            <ButtonLink href={companyMapsHref} variant="secondary" external>
              {t("home.viewOnMap")}
              <ArrowUpRightIcon className="size-4" />
            </ButtonLink>
          </div>
        </div>

        {/* El mapa navegable; el botón "View on Google Maps" de arriba
            sigue siendo la salida para quien quiera la ruta. */}
        <LocationMap />
      </div>
    </section>
  );
}
