"use client";

/**
 * Listado de proyectos con dos filtros: la gama instalada y el año.
 *
 * Mismos chips que el filtro de material de las categorías, para que
 * filtrar se haga igual en todo el sitio. Sin animación al filtrar: la
 * cuadrícula cambia al instante.
 *
 * Los chips de categoría solo enseñan las categorías que de verdad
 * aparecen en algún proyecto — un filtro que siempre devuelve cero no
 * es un filtro.
 */
import { useState } from "react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getCategory } from "@/data/categories";
import type { CategorySlug, Project } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

type ProjectFiltersProps = {
  projects: Project[];
  years: number[];
};

const chipClasses = (active: boolean) =>
  cn(
    "rounded-kamika px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase",
    "motion-safe:transition-colors",
    active ? "bg-kamika-ink text-kamika-paper" : "bg-kamika-blue-50 text-kamika-steel hover:bg-kamika-blue",
  );

export function ProjectFilters({ projects, years }: ProjectFiltersProps) {
  const { formatNumber, pick, t } = useI18n();
  const [category, setCategory] = useState<CategorySlug | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const categories = [...new Set(projects.flatMap((project) => project.categories))];

  const visible = projects.filter(
    (project) =>
      (category === null || project.categories.includes(category)) &&
      (year === null || project.year === year),
  );

  return (
    <div>
      <div className="grid gap-4">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("projects.filterCategory")}
        >
          <span className="eyebrow mr-1 w-28 shrink-0">{t("projects.filterCategory")}</span>
          <button
            type="button"
            onClick={() => setCategory(null)}
            aria-pressed={category === null}
            className={chipClasses(category === null)}
          >
            {t("projects.filterAll")}
          </button>
          {categories.map((slug) => {
            const entry = getCategory(slug);
            if (!entry) return null;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => setCategory(category === slug ? null : slug)}
                aria-pressed={category === slug}
                className={chipClasses(category === slug)}
              >
                {pick(entry.name)}
              </button>
            );
          })}
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("projects.filterYear")}
        >
          <span className="eyebrow mr-1 w-28 shrink-0">{t("projects.filterYear")}</span>
          <button
            type="button"
            onClick={() => setYear(null)}
            aria-pressed={year === null}
            className={chipClasses(year === null)}
          >
            {t("projects.filterAll")}
          </button>
          {years.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setYear(year === entry ? null : entry)}
              aria-pressed={year === entry}
              className={chipClasses(year === entry)}
            >
              {formatNumber(entry, { useGrouping: false })}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-kamika-ink/70">{t("projects.noMatch")}</p>
      )}
    </div>
  );
}
