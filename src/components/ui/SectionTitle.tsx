/**
 * Cabecera de sección compartida por todo el sitio.
 *
 * El `eyebrow` va en mono, mayúsculas y muy espaciado, como la
 * rotulación de un plano: `WINDOWS · UW FROM 0,7 W/M²K`. Cuando se le
 * pasa un dato técnico, informa; no es decoración.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  title: string;
  eyebrow?: string;
  intro?: string;
  /** Enlace o botón alineado a la derecha del titular en desktop. */
  action?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
} as const;

export function SectionTitle({
  title,
  eyebrow,
  intro,
  action,
  as: Heading = "h2",
  size = "md",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-5 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Heading className={cn("text-kamika-ink text-balance", SIZES[size])}>{title}</Heading>
        {intro && <p className="mt-4 text-pretty text-kamika-ink/70 md:text-lg">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
