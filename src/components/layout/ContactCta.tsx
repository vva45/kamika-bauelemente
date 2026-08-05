/**
 * Franja de contacto directo con mapa estático.
 *
 * Se reutiliza al final de la home, en /about y en la ficha de producto:
 * el dueño insistió en "contact me directly", así que su teléfono y su
 * email tienen que estar a un golpe de vista en varios sitios.
 *
 * El mapa es una imagen enlazada a Google Maps, nunca un iframe: un
 * iframe de Google pone cookies de terceros y obligaría a un banner.
 */
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { ArrowUpRightIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import {
  COMPANY,
  companyAddressLine,
  companyEmailHref,
  companyMapsHref,
  companyPhoneHref,
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

        <a
          href={companyMapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          aria-label={`${t("home.viewOnMap")} (${t("a11y.opensInNewTab")})`}
        >
          <WindowFrame className="aspect-[4/3] w-full" pan>
            <Image
              src="/images/contact/map.jpg"
              alt={t("home.mapAlt")}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </WindowFrame>
        </a>
      </div>
    </section>
  );
}
