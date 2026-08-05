/**
 * El logo, compuesto como texto vivo en lugar de una imagen: nítido a
 * cualquier tamaño, seleccionable y accesible.
 *
 * Proporciones medidas sobre el logo original:
 *  - "Kamika" en Outfit peso 400. Outfit es la correcta: su 'a' es de un
 *    solo piso y prácticamente circular, como la del logo. A peso 400 la
 *    relación ancho-de-tinta / altura-de-caja es 4,48; en el logo, ~4,5.
 *  - Tracking cero. El logo no va apretado.
 *  - "BAUELEMENTE" al 17,5% del tamaño, con tracking 0,5em, centrado
 *    debajo y ocupando dos tercios del ancho de "Kamika".
 *  - Ambas líneas en negro. La bajada no es gris.
 *
 * Los tamaños de display (`lg`, `hero`) respetan esas proporciones al
 * pie de la letra. Los de interfaz (`sm`, `header`, `md`) agrandan la
 * bajada: al 17,5% de 22px saldría a 3,8px y no se leería. Es la
 * compensación óptica que hace cualquier logotipo responsive.
 */
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  size?: "sm" | "header" | "md" | "lg" | "hero";
  tone?: "ink" | "paper";
  className?: string;
};

/**
 * `root` fija el tamaño; el resto va en `em`, así que todo escala junto.
 * El margen derecho negativo compensa el hueco que `letter-spacing` deja
 * después de la última letra, para que la bajada quede ópticamente
 * centrada y no desplazada a la izquierda.
 */
const SIZES = {
  sm: {
    root: "text-[19px]",
    suffix: "text-[0.32em] tracking-[0.28em] -mr-[0.28em]",
  },
  header: {
    root: "text-[21px] md:text-[24px]",
    suffix: "text-[0.3em] tracking-[0.3em] -mr-[0.3em]",
  },
  md: {
    root: "text-[26px]",
    suffix: "text-[0.26em] tracking-[0.36em] -mr-[0.36em]",
  },
  lg: {
    root: "text-[42px]",
    suffix: "text-[0.21em] tracking-[0.44em] -mr-[0.44em]",
  },
  hero: {
    root: "text-[72px]",
    suffix: "text-[0.175em] tracking-[0.5em] -mr-[0.5em]",
  },
} as const;

export function Wordmark({ size = "md", tone = "ink", className }: WordmarkProps) {
  const { root, suffix } = SIZES[size];
  const colour = tone === "ink" ? "text-kamika-ink" : "text-kamika-paper";

  return (
    <span className={cn("inline-flex flex-col leading-none", root, colour, className)}>
      <span className="font-display text-[1em] font-normal tracking-normal">
        {COMPANY.tradeName}
      </span>
      {/* Envoltorio a tamaño de raíz: así el hueco entre las dos líneas
          se mide contra "Kamika" y no contra la bajada. */}
      <span className="mt-[0.15em] block text-center">
        <span className={cn("font-display font-medium uppercase", suffix)}>
          {COMPANY.wordmarkSuffix}
        </span>
      </span>
    </span>
  );
}
