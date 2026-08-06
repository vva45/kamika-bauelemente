/**
 * /contact — formulario a la izquierda, contacto directo y mapa a la
 * derecha.
 *
 * El `?product=` que trae el botón "Send enquiry" de cada ficha se
 * valida aquí, en el servidor: si el id no existe, simplemente no se
 * preselecciona nada. Así un enlace viejo o manipulado no llega al
 * formulario.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm, type ProductOptionGroup } from "@/components/contact/ContactForm";
import { LocationMap } from "@/components/contact/LocationMap";
import { ArrowUpRightIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { getCatalogue, getCollectionsFor, getProduct, getProductsByCategory, orderedCategories } from "@/data";
import {
  COMPANY,
  companyAddressLine,
  companyEmailHref,
  companyMapsHref,
  companyPhoneHref,
} from "@/data/company";
import { collectionName } from "@/lib/catalogue";
import { pick, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata({
  title: t("contactPage.title"),
  description: t("contactPage.intro"),
  path: routes.contact,
});

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { product } = await searchParams;
  const requested = typeof product === "string" ? product : "";
  // Vale tanto una ficha de producto como una colección de catálogo:
  // desde las puertas de entrada, lo que se elige es la colección.
  const selectedProduct = getProduct(requested) || getCatalogue(requested) ? requested : "";

  // El desplegable se arma desde la capa de datos, agrupado por
  // categoría: si mañana hay una gama nueva, aparece sola.
  const groups: ProductOptionGroup[] = orderedCategories()
    .map((category) => ({
      category: pick(category.name),
      options: [
        // Primero las colecciones —que es como se pide una puerta— y
        // después las fichas sueltas de las gamas que aún las tienen.
        ...getCollectionsFor(category.slug).map((catalogue) => ({
          id: catalogue.id,
          label: collectionName(catalogue),
        })),
        ...getProductsByCategory(category.slug).map((entry) => ({
          id: entry.id,
          label: entry.name,
        })),
      ],
    }))
    .filter((group) => group.options.length > 0);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">{t("contactPage.eyebrow")}</p>
        <h1 className="mt-4 text-4xl text-balance md:text-5xl">{t("contactPage.title")}</h1>
        <p className="mt-5 text-pretty text-kamika-ink/70 md:text-lg">{t("contactPage.intro")}</p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3">
          <h2 className="sr-only">{t("contactPage.formHeading")}</h2>
          <ContactForm groups={groups} selectedProduct={selectedProduct} />
        </div>

        {/* ── Contacto directo ─────────────────────────────────── */}
        <aside className="lg:col-span-2">
          <div className="rounded-kamika border border-kamika-mist bg-kamika-blue-50 p-6">
            <h2 className="eyebrow">{t("contactPage.detailsHeading")}</h2>

            <ul className="mt-5 grid gap-4 text-sm">
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-kamika-steel" />
                <span className="text-kamika-ink/80">
                  {COMPANY.tradeNameFull}
                  <br />
                  {companyAddressLine}
                  <br />
                  {COMPANY.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="size-5 shrink-0 text-kamika-steel" />
                <a href={companyPhoneHref} className="font-mono text-base text-kamika-ink hover:underline">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="size-5 shrink-0 text-kamika-steel" />
                <a href={companyEmailHref} className="break-all text-kamika-ink hover:underline">
                  {COMPANY.email}
                </a>
              </li>
              {/* Sin horario confirmado no se pinta el bloque: mejor
                  omitirlo que publicar un horario inventado. */}
              {COMPANY.openingHours && (
                <li className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 size-5 shrink-0 text-kamika-steel" />
                  <span className="text-kamika-ink/80">
                    {COMPANY.openingHours.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              )}
            </ul>

            <p className="mt-6 border-t border-kamika-mist pt-4 text-sm text-kamika-ink/70">
              {t("contact.ownerLabel")}: {COMPANY.owner}
            </p>
          </div>

          {/* Mapa navegable. Debajo, el enlace de siempre para quien
              prefiera abrirlo en su aplicación y trazar la ruta. */}
          <LocationMap className="mt-6" />
          <p className="mt-3">
            <a
              href={companyMapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-kamika-steel hover:text-kamika-ink"
            >
              {t("home.viewOnMap")}
              <ArrowUpRightIcon className="size-4" />
              <span className="sr-only"> ({t("a11y.opensInNewTab")})</span>
            </a>
          </p>

          <p className="mt-4 text-sm text-kamika-ink/60">
            <Link href={routes.privacy} className="text-kamika-steel underline">
              {t("footer.privacy")}
            </Link>
          </p>
        </aside>
      </div>
    </section>
  );
}
