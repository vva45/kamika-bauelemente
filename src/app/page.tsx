/**
 * Home.
 *
 * FASE 1: el hero definitivo (máscara de marco + apertura orquestada +
 * líneas de cota) y una tira provisional de tarjetas de producto para
 * poder revisar el `ProductCard`.
 *
 * Las secciones que faltan —mosaico de categorías, marquee, catálogos,
 * proyectos, colores, "how it works" y CTA final— entran en la fase 2.
 */
import Image from "next/image";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { DimensionLine } from "@/components/ui/DimensionLine";
import { FrameOpening } from "@/components/ui/FrameOpening";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowDownIcon, ArrowRightIcon } from "@/components/ui/icons";
import { getProductsByCategory } from "@/data";
import { formatNumber, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export default function HomePage() {
  const products = getProductsByCategory("windows");

  // Las cotas llevan medidas reales de un hueco tipo. `useGrouping:false`
  // para que 1480 no salga "1,480" en inglés ni "1.480" en alemán: en un
  // plano los milímetros van seguidos.
  const width = `${formatNumber(1480, { useGrouping: false })} mm`;
  const height = `${formatNumber(2180, { useGrouping: false })} mm`;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-kamika-mist bg-kamika-blue-50">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow">{t("home.heroEyebrow")}</p>
            <h1 className="mt-5 text-4xl text-balance md:text-5xl xl:text-6xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-6 max-w-md text-pretty text-kamika-ink/70 md:text-lg">
              {t("home.heroSubtitle")}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={routes.products}>
                {t("common.viewProducts")}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
              <ButtonLink href={routes.contact} variant="secondary">
                {t("common.getInTouch")}
              </ButtonLink>
            </div>

            <div className="mt-12 flex items-center gap-3 text-kamika-steel">
              <ArrowDownIcon className="size-4" />
              <span className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
                {t("home.scrollHint")}
              </span>
              <span className="h-px w-16 bg-kamika-steel/40" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-stretch gap-3">
              <FrameOpening className="aspect-[4/3] flex-1" mullion="cross">
                <Image
                  src="/images/home/hero.jpg"
                  alt={t("home.heroImageAlt")}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </FrameOpening>
              <DimensionLine orientation="vertical" label={height} className="w-5 shrink-0" />
            </div>
            <DimensionLine label={width} className="mt-3 pr-8" />
          </div>
        </div>
      </section>

      {/* ── Productos (provisional, se reordena en la fase 2) ─── */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <Reveal from="left">
          <SectionTitle
            eyebrow={t("home.featuredEyebrow")}
            title={t("home.featuredTitle")}
            intro={t("home.featuredIntro")}
            action={
              <ButtonLink href={routes.products} variant="secondary" size="sm">
                {t("common.viewAll")}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            }
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Reveal key={product.id} asChild from="bottom">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
