/**
 * Home.
 *
 * Informativa, en el orden en que un cliente decide: qué se ofrece →
 * documentación → obra hecha → acabados → cómo se trabaja → contacto.
 *
 * Los proyectos van antes que los colores y el "how it works" a
 * propósito: son lo que da confianza, y enterrarlos al final sería
 * tirarlos.
 */
import type { Metadata } from "next";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CatalogueCard } from "@/components/catalogue/CatalogueCard";
import { ColourPreview } from "@/components/colour/ColourPreview";
import { Hero } from "@/components/home/Hero";
import { ContactCta } from "@/components/layout/ContactCta";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowRightIcon } from "@/components/ui/icons";
import { CATALOGUES, COLORS, countProductsByCategory, getFeaturedProjects, orderedCategories } from "@/data";
import { COMPANY } from "@/data/company";
import { pick, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata({
  title: `${COMPANY.tradeNameFull} — ${COMPANY.city}`,
  description: t("footer.blurb"),
  path: routes.home,
});

/** Pasos de "How it works". Numerados porque son una secuencia real. */
const STEPS = [
  { title: "home.howStep1Title", body: "home.howStep1Body" },
  { title: "home.howStep2Title", body: "home.howStep2Body" },
  { title: "home.howStep3Title", body: "home.howStep3Body" },
  { title: "home.howStep4Title", body: "home.howStep4Body" },
] as const;

export default function HomePage() {
  const categories = orderedCategories();
  // 2 grandes + 3 pequeñas: es la sección que más clics tiene que
  // recibir, así que se lleva el sitio.
  const featuredCategories = categories.slice(0, 2);
  const restCategories = categories.slice(2, 5);

  const catalogues = CATALOGUES.slice(0, 3);
  const projects = getFeaturedProjects(3);
  const marqueeItems = categories.map((category) => pick(category.name));

  return (
    <>
      <Hero />

      {/* ── Categorías ───────────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <Reveal from="left">
          <SectionTitle
            eyebrow={t("home.categoriesEyebrow")}
            title={t("home.categoriesTitle")}
            intro={t("home.categoriesIntro")}
            action={
              <ButtonLink href={routes.products} variant="secondary" size="sm">
                {t("nav.allCategories")}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            }
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-x-6 gap-y-10 lg:grid-cols-2">
          {featuredCategories.map((category) => (
            <Reveal key={category.slug} asChild from="bottom">
              <CategoryCard
                category={category}
                productCount={countProductsByCategory(category.slug)}
                scale="feature"
              />
            </Reveal>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {restCategories.map((category) => (
            <Reveal key={category.slug} asChild from="bottom">
              <CategoryCard
                category={category}
                productCount={countProductsByCategory(category.slug)}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      {/* ── "Todo de un solo proveedor", sin decirlo ──────────── */}
      <Marquee items={marqueeItems} />

      {/* ── Catálogos ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <Reveal from="left">
          <SectionTitle
            eyebrow={t("home.cataloguesEyebrow")}
            title={t("home.cataloguesTitle")}
            intro={t("home.cataloguesIntro")}
            action={
              <ButtonLink href={routes.catalogues} variant="secondary" size="sm">
                {t("common.viewAll")}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            }
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {catalogues.map((catalogue) => (
            <Reveal key={catalogue.id} asChild from="bottom">
              <CatalogueCard catalogue={catalogue} />
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      {/* ── Proyectos ────────────────────────────────────────── */}
      <section className="border-y border-kamika-mist bg-kamika-blue-50">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <Reveal from="left">
            <SectionTitle
              eyebrow={t("home.projectsEyebrow")}
              title={t("home.projectsTitle")}
              intro={t("home.projectsIntro")}
              action={
                <ButtonLink href={routes.projects} variant="secondary" size="sm">
                  {t("common.viewAll")}
                  <ArrowRightIcon className="size-4" />
                </ButtonLink>
              }
            />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Reveal key={project.id} asChild from="bottom">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Colores y acabados ───────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <Reveal from="left">
          <SectionTitle
            eyebrow={t("home.coloursEyebrow")}
            title={t("home.coloursTitle")}
            intro={t("home.coloursIntro")}
            action={
              <ButtonLink href={routes.colours} variant="secondary" size="sm">
                {t("common.viewAll")}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            }
          />
        </Reveal>

        <ColourPreview
          colours={COLORS.slice(0, 14)}
          renderImage="/images/colours/render.jpg"
          className="mt-12"
        />
      </section>

      {/* ── Cómo se trabaja ──────────────────────────────────── */}
      <section className="border-t border-kamika-mist">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <Reveal from="left">
            <SectionTitle eyebrow={t("home.howEyebrow")} title={t("home.howTitle")} />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} asChild from="bottom">
                <div className="border-t border-kamika-mist pt-5">
                  <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-kamika-steel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-medium text-kamika-ink">{t(step.title)}</h3>
                  <p className="mt-3 text-sm text-pretty text-kamika-ink/70">{t(step.body)}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
