/**
 * El logo, compuesto como texto vivo en lugar de una imagen: nítido a
 * cualquier tamaño, seleccionable y accesible.
 *
 * "Kamika" en Outfit (la geométrica más cercana al logo original) y
 * "BAUELEMENTE" debajo en versalitas muy espaciadas.
 *
 * Los tamaños del hijo van en `em`, de modo que basta cambiar el
 * tamaño de la raíz para escalar el conjunto sin descuadres.
 */
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  size?: "sm" | "md" | "lg" | "header";
  tone?: "ink" | "paper";
  className?: string;
};

const SIZES = {
  sm: "text-[18px]",
  md: "text-[24px]",
  lg: "text-[34px]",
  header: "text-[20px] md:text-[23px]",
} as const;

export function Wordmark({ size = "md", tone = "ink", className }: WordmarkProps) {
  const colour = tone === "ink" ? "text-kamika-ink" : "text-kamika-paper";
  const subColour = tone === "ink" ? "text-kamika-steel" : "text-kamika-paper/80";

  return (
    <span className={cn("inline-flex flex-col leading-none", SIZES[size], colour, className)}>
      <span className="font-display text-[1em] font-semibold tracking-[-0.03em]">
        {COMPANY.tradeName}
      </span>
      <span
        className={cn(
          "font-display mt-[0.28em] text-[0.315em] font-medium uppercase",
          "tracking-[0.34em]",
          subColour,
        )}
      >
        {COMPANY.wordmarkSuffix}
      </span>
    </span>
  );
}
