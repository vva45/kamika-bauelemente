/**
 * /about — dos bloques, porque el dueño pidió las dos cosas:
 * "about the company, about me".
 *
 * 1. La empresa: qué hace, dónde trabaja y cómo trabaja. Datos duros.
 * 2. Dominik: retrato, cargo y un párrafo en primera persona.
 *
 * Cierra con la franja de contacto directo: su teléfono y su email
 * tienen que estar visibles aquí, no solo en /contact.
 */
import type { Metadata } from "next";
import Image from "next/image";
import { ContactCta } from "@/components/layout/ContactCta";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { ArrowRightIcon } from "@/components/ui/icons";
import { leafCategories } from "@/data";
import { COMPANY, companyAddressLine } from "@/data/company";
import { t, tf } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata({
  title: t("nav.about"),
  description: t("about.intro"),
  path: routes.about,
});

export default function AboutPage() {
  // Los datos duros salen de la capa de datos, no se escriben a mano:
  // el número de gamas cambia solo si cambian las categorías.
  const facts = [
    { label: t("about.factLocationLabel"), value: companyAddressLine },
    { label: t("about.factAreaLabel"), value: t("about.factAreaValue") },
    {
      label: t("about.factRangesLabel"),
      // Las gamas que el cliente puede abrir, sin contar el hub
      // de puertas, que no vende nada por sí mismo.
      value: tf("about.factRangesValue", { count: leafCategories().length }),
    },
    { label: t("about.factOwnerLabel"), value: `${COMPANY.owner} — ${t("about.ownerRole")}` },
  ];

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <Reveal from="left">
          <SectionTitle
            as="h1"
            size="lg"
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
            intro={t("about.intro")}
          />
        </Reveal>
      </section>

      {/* ── La empresa ───────────────────────────────────────────── */}
      <section className="border-y border-kamika-mist bg-kamika-blue-50">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl">{t("about.companyHeading")}</h2>
            <div className="mt-6 grid gap-4 text-pretty text-kamika-ink/75">
              <p>{t("about.companyBody1")}</p>
              <p>{t("about.companyBody2")}</p>
              <p>{t("about.companyBody3")}</p>
            </div>

            <div className="mt-9">
              <ButtonLink href={routes.products} variant="secondary" size="sm">
                {t("common.viewProducts")}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </div>
          </div>

          {/* Datos duros en mono: es ficha, no folleto. */}
          <div>
            <p className="eyebrow">{t("about.factsHeading")}</p>
            <dl className="mt-5 border-t border-kamika-mist">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-1 border-b border-kamika-mist py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-kamika-steel uppercase">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-kamika-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── La fábrica ───────────────────────────────────────────
          Foto que mandó el dueño: la planta del proveedor que fabrica
          sus elementos. No se dice el nombre del proveedor a propósito
          — misma regla que con los fabricantes de perfil: la web no
          manda a nadie a otra marca. */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <Reveal from="bottom">
          <WindowFrame className="aspect-[4/3] w-full sm:aspect-[16/10]" mullion="vertical">
            <Image
              src="/images/about/factory.jpg"
              alt={t("about.factoryAlt")}
              fill
              sizes="(min-width: 1440px) 1376px, 100vw"
              className="object-cover"
            />
          </WindowFrame>
          <p className="eyebrow mt-4">{t("about.factoryCaption")}</p>
        </Reveal>
      </section>

      {/* ── Dominik ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal from="left">
              <WindowFrame className="aspect-[4/5] w-full max-w-sm">
                <Image
                  src="/images/about/dominik.jpg"
                  alt={t("about.ownerPortraitAlt")}
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover"
                />
              </WindowFrame>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow">{t("about.ownerEyebrow")}</p>
            <h2 className="mt-4 text-3xl md:text-4xl">{COMPANY.owner}</h2>
            <p className="mt-2 font-mono text-[0.8125rem] tracking-[0.12em] text-kamika-steel uppercase">
              {t("about.ownerRole")}
            </p>

            {/* Texto REAL del dueño (2026-08), traducido al inglés.
                El original alemán está en de.ts, tal cual lo mandó,
                para publicarlo literal en la versión alemana. */}
            <div className="mt-6 grid gap-4 max-w-xl text-pretty text-kamika-ink/75">
              <p>{t("about.ownerBody1")}</p>
              <p>{t("about.ownerBody2")}</p>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
