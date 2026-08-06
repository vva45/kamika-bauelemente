/**
 * Proyectos realizados.
 *
 * Es la sección que da confianza: obra hecha, con su ubicación, su año
 * y lo que se instaló. Sin proyectos publicados no se enseña una página
 * vacía, sino el mismo layout coming-soon del resto del sitio.
 */
import type { Metadata } from "next";
import { ContactCta } from "@/components/layout/ContactCta";
import { ProjectFilters } from "@/components/project/ProjectFilters";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PROJECTS, getProjectYears } from "@/data";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("projects.title"),
  description: t("projects.intro"),
};

export default function ProjectsPage() {
  // Del más reciente al más antiguo: lo último hecho es lo que
  // interesa enseñar primero.
  const projects = [...PROJECTS].sort((a, b) => b.year - a.year);

  if (projects.length === 0) {
    return (
      <>
        <ComingSoon
          title={t("projects.comingSoonTitle")}
          body={t("projects.comingSoonBody")}
        />
        <ContactCta />
      </>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <Reveal from="left">
          <SectionTitle
            as="h1"
            size="lg"
            eyebrow={t("projects.eyebrow")}
            title={t("projects.title")}
            intro={t("projects.intro")}
          />
        </Reveal>

        <div className="mt-12">
          <ProjectFilters projects={projects} years={getProjectYears()} />
        </div>
      </section>

      <ContactCta />
    </>
  );
}
