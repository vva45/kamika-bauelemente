/**
 * Detalle de proyecto: galería, resumen, lo que se instaló —enlazando a
 * la ficha de catálogo de cada modelo— y contacto.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelCard } from "@/components/catalogue/ModelCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { Gallery } from "@/components/media/Gallery";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PROJECTS, getCategory, getProject, getProjectModels } from "@/data";
import { formatNumber, pick, t, setRequestLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[id]">): Promise<Metadata> {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const project = getProject(id);
  if (!project) return {};

  const cover = project.images[0];

  return pageMetadata({
    title: pick(project.title),
    description: pick(project.summary),
    path: routes.project(project.id),
    ...(cover ? { image: { url: cover.src, alt: pick(cover.alt) } } : {}),
  });
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[id]">) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const project = getProject(id);
  if (!project) notFound();

  const title = pick(project.title);
  const models = getProjectModels(project);
  // Otros proyectos donde se instaló algo parecido, para seguir mirando.
  const others = PROJECTS.filter(
    (entry) =>
      entry.id !== project.id &&
      entry.categories.some((slug) => project.categories.includes(slug)),
  ).slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8">
        <Breadcrumb
          items={[{ label: t("projects.title"), href: routes.projects }, { label: title }]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <Gallery images={project.images} title={title} />
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <h1 className="text-3xl text-balance md:text-4xl">{title}</h1>

              <dl className="mt-7 grid grid-cols-2 gap-2">
                <div className="rounded-kamika bg-kamika-blue-50 px-3 py-3">
                  <dt className="font-mono text-[0.625rem] tracking-[0.1em] text-kamika-steel uppercase">
                    {t("project.locationLabel")}
                  </dt>
                  <dd className="mt-1.5 font-mono text-sm font-medium text-kamika-ink">
                    {project.location}
                  </dd>
                </div>
                <div className="rounded-kamika bg-kamika-blue-50 px-3 py-3">
                  <dt className="font-mono text-[0.625rem] tracking-[0.1em] text-kamika-steel uppercase">
                    {t("project.yearLabel")}
                  </dt>
                  <dd className="mt-1.5 font-mono text-sm font-medium tabular-nums text-kamika-ink">
                    {formatNumber(project.year, { useGrouping: false })}
                  </dd>
                </div>
              </dl>

              <p className="mt-7 text-pretty text-kamika-ink/75">{pick(project.summary)}</p>

              <div className="mt-7">
                <p className="eyebrow">{t("project.installed")}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.categories.map((slug) => {
                    const category = getCategory(slug);
                    if (!category) return null;
                    return (
                      <li key={slug}>
                        <ButtonLink
                          href={routes.category(slug)}
                          variant="secondary"
                          size="sm"
                          className="h-8 px-3 text-[0.75rem]"
                        >
                          {pick(category.name)}
                        </ButtonLink>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href={routes.contact}>{t("common.contactUs")}</ButtonLink>
                <ButtonLink href={routes.projects} variant="secondary">
                  {t("project.allProjects")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lo que se instaló, modelo a modelo ──────────────────── */}
      {/* Lo que se puso es un modelo de una colección de catálogo; un
          proyecto sin modelos confirmados no enseña el bloque. */}
      {models.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <SectionTitle title={t("project.productsUsed")} size="sm" />
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((model) => (
              <ModelCard key={`${model.catalogue}-${model.id}`} model={model} />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="border-t border-kamika-mist bg-kamika-blue-50">
          <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
            <SectionTitle
              title={t("projects.title")}
              size="sm"
              action={
                <ButtonLink href={routes.projects} variant="secondary" size="sm">
                  {t("common.viewAll")}
                </ButtonLink>
              }
            />
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((entry) => (
                <ProjectCard key={entry.id} project={entry} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCta />
    </>
  );
}

/** Solo se sirven los proyectos que existen de verdad. */
export const dynamicParams = false;
