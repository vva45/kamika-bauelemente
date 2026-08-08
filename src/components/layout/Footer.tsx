/**
 * Pie del sitio. Además de navegación, es el segundo sitio donde el
 * teléfono y el email del dueño están siempre visibles: el encargo era
 * "the option to contact me directly", y eso no puede vivir solo en
 * /contact.
 */
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { leafCategories } from "@/data/categories";
import {
  COMPANY,
  companyAddressLine,
  companyEmailHref,
  companyPhoneHref,
  companyWhatsAppHref,
} from "@/data/company";
import { pick, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function Footer() {
  const year = new Date().getFullYear();

  const companyLinks = [
    { href: routes.about, label: t("nav.about") },
    { href: routes.projects, label: t("nav.projects") },
    { href: routes.catalogues, label: t("nav.catalogues") },
    { href: routes.colours, label: t("nav.colours") },
    { href: routes.contact, label: t("nav.contact") },
  ];

  const legalLinks = [
    { href: routes.imprint, label: t("footer.imprint") },
    { href: routes.privacy, label: t("footer.privacy") },
  ];

  return (
    <footer className="border-t border-kamika-mist bg-kamika-blue-50">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <nav
          aria-label={t("a11y.footerNavigation")}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Marca y contacto directo */}
          <div className="lg:col-span-1">
            <Wordmark size="md" />
            <p className="mt-5 max-w-xs text-sm text-pretty text-kamika-ink/70">
              {t("footer.blurb")}
            </p>

            <ul className="mt-6 grid gap-3 text-sm">
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 size-4 shrink-0 text-kamika-steel" />
                <span className="text-kamika-ink/80">{companyAddressLine}</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="size-4 shrink-0 text-kamika-steel" />
                <a href={companyPhoneHref} className="font-mono text-kamika-ink hover:underline">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="size-4 shrink-0 text-kamika-steel" />
                <a href={companyEmailHref} className="break-all text-kamika-ink hover:underline">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ChatIcon className="size-4 shrink-0 text-kamika-steel" />
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
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h2 className="eyebrow">{t("footer.productsHeading")}</h2>
            <ul className="mt-5 grid gap-2.5 text-sm">
              {leafCategories().map((category) => (
                <li key={category.slug}>
                  <Link
                    href={routes.category(category.slug)}
                    className="text-kamika-ink/70 hover:text-kamika-ink"
                  >
                    {pick(category.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h2 className="eyebrow">{t("footer.companyHeading")}</h2>
            <ul className="mt-5 grid gap-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-kamika-ink/70 hover:text-kamika-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="eyebrow">{t("footer.legalHeading")}</h2>
            <ul className="mt-5 grid gap-2.5 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-kamika-ink/70 hover:text-kamika-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-14 flex flex-col gap-2 border-t border-kamika-mist pt-6 font-mono text-[0.6875rem] tracking-[0.08em] text-kamika-ink/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {COMPANY.legalName}. {t("footer.rights")}
          </p>
          <p>{COMPANY.tradeNameFull}</p>
        </div>
      </div>
    </footer>
  );
}
