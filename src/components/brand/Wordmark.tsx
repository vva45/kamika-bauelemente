/**
 * El logo, compuesto como texto vivo en lugar de una imagen: nítido a
 * cualquier tamaño, seleccionable y accesible.
 *
 * Proporciones medidas sobre el fichero real del logo (histograma de
 * píxeles de tinta, no a ojo):
 *  - "Kamika" en Outfit. Outfit es la correcta: su 'a' es de un solo
 *    piso y prácticamente circular, como la del logo.
 *  - Tracking cero. El logo no va apretado.
 *  - "BAUELEMENTE" debajo, centrada, con tracking amplio.
 *  - Ambas líneas en negro. La bajada no es gris.
 *
 * AJUSTE PEDIDO POR EL DUEÑO (mirando su fichero del logo): la palabra
 * "Kamika" un punto más gruesa —peso 500 en vez de 400—, la bajada algo
 * mayor y más cerca. Es lo que se ve en su imagen: la bajada casi toca
 * la caja de "Kamika" y tiene más presencia que la que daba el 20%
 * medido en píxeles. La medición de partida sigue documentada arriba
 * para que se sepa de dónde se sale.
 *
 * Los tamaños pequeños (`sm`, `header`, `md`) agrandan la bajada un poco
 * más: es la compensación óptica que hace cualquier logotipo
 * responsive, porque a 21px una bajada proporcional no se leería.
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
    suffix: "text-[0.34em] tracking-[0.26em] -mr-[0.26em]",
  },
  header: {
    root: "text-[21px] md:text-[24px]",
    suffix: "text-[0.33em] tracking-[0.28em] -mr-[0.28em]",
  },
  md: {
    root: "text-[26px]",
    suffix: "text-[0.3em] tracking-[0.32em] -mr-[0.32em]",
  },
  lg: {
    root: "text-[42px]",
    suffix: "text-[0.24em] tracking-[0.33em] -mr-[0.33em]",
  },
  hero: {
    root: "text-[72px]",
    suffix: "text-[0.24em] tracking-[0.33em] -mr-[0.33em]",
  },
} as const;

export function Wordmark({ size = "md", tone = "ink", className }: WordmarkProps) {
  const { root, suffix } = SIZES[size];
  const colour = tone === "ink" ? "text-kamika-ink" : "text-kamika-paper";

  return (
    <span className={cn("inline-flex flex-col leading-none", root, colour, className)}>
      <span className="font-display text-[1em] font-medium tracking-normal">
        {COMPANY.tradeName}
      </span>
      {/* Envoltorio a tamaño de raíz: así el hueco entre las dos líneas
          se mide contra "Kamika" y no contra la bajada. */}
      <span className="mt-[0.07em] block text-center">
        <span className={cn("font-display font-medium uppercase", suffix)}>
          {COMPANY.wordmarkSuffix}
        </span>
      </span>
    </span>
  );
}
