/**
 * Tarjeta de proyecto: foto grande, título, ubicación, año y chips de
 * las categorías que se instalaron.
 *
 * Los chips van en el azul del logo y son informativos, no enlaces: el
 * único destino de la tarjeta es el proyecto, para no competir con el
 * enlace estirado.
 */
import Image from "next/image";
import Link from "next/link";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { getCategory } from "@/data/categories";
import type { Project } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatNumber, pick } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  className?: string;
};

export function ProjectCard({ project, priority = false, className }: ProjectCardProps) {
  const cover = project.images[0];

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <WindowFrame className="aspect-[4/3] w-full" pan>
        {cover && (
          <Image
            src={cover.src}
            alt={pick(cover.alt)}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </WindowFrame>

      <h3 className="mt-4 text-lg font-semibold text-kamika-ink">
        <Link href={routes.project(project.id)} className="stretched-link">
          {pick(project.title)}
        </Link>
      </h3>

      <p className="eyebrow mt-2">
        {project.location} · {formatNumber(project.year, { useGrouping: false })}
      </p>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {project.categories.map((slug) => {
          const category = getCategory(slug);
          if (!category) return null;
          return (
            <li
              key={slug}
              className="rounded-kamika bg-kamika-blue px-2 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-kamika-ink uppercase"
            >
              {pick(category.name)}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
