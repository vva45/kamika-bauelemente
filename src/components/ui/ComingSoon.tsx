/**
 * Bloque "todavía no hay contenido aquí", compartido por las categorías
 * sin fichas, los catálogos y los proyectos.
 *
 * La regla es la misma en los tres sitios: nunca una página vacía ni un
 * h1 suelto. Se explica qué falta, se ofrece la salida útil (llamar o
 * escribir) y, si quien lo usa pasa algo dentro —los catálogos
 * generales, por ejemplo—, se enseña debajo.
 */
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type ComingSoonProps = {
  title: string;
  body: string;
  children?: ReactNode;
  className?: string;
};

export function ComingSoon({ title, body, children, className }: ComingSoonProps) {
  return (
    <section className={cn("mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24", className)}>
      <SectionTitle
        title={title}
        intro={body}
        action={
          <ButtonLink href={routes.contact} size="sm">
            {t("common.contactUs")}
            <ArrowRightIcon className="size-4" />
          </ButtonLink>
        }
      />
      {children && <div className="mt-14">{children}</div>}
    </section>
  );
}
