/**
 * ELEMENTO FIRMA DEL SITIO.
 *
 * El producto de esta empresa son huecos: un marco que se abre y revela
 * algo. Toda imagen importante de la web vive dentro de esta silueta.
 *
 * Es un componente de servidor: la máscara y el gesto de hover son CSS
 * puro, sin JavaScript. La apertura del hero, que sí necesita
 * orquestación, vive aparte en `FrameOpening`.
 *
 * El consumidor fija la proporción desde `className`
 * (p. ej. `aspect-[4/3]`), y pasa dentro un <Image fill />.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type WindowFrameProps = {
  children: ReactNode;
  className?: string;
  /** Despiece del marco, como en un plano de carpintería. */
  mullion?: "none" | "vertical" | "cross";
  /**
   * Hoja azul del logo apoyada en el canto izquierdo. Al hover del grupo
   * padre se desplaza, como una ventana que se entreabre.
   * Se usa en las tarjetas de categoría.
   */
  sash?: boolean;
  /** Paneo de 4px de la imagen al hover del grupo padre. */
  pan?: boolean;
};

export function WindowFrame({
  children,
  className,
  mullion = "none",
  sash = false,
  pan = false,
}: WindowFrameProps) {
  return (
    <div className={cn("relative isolate", className)}>
      {/* El hueco: todo lo de dentro se recorta con la máscara del marco. */}
      <div className="frame-glass absolute inset-0 bg-kamika-blue-50">
        <div
          className={cn(
            "absolute inset-0",
            pan &&
              "motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-out group-hover:translate-x-1 group-hover:scale-[1.02]",
          )}
        >
          {children}
        </div>

        {sash && (
          <div
            aria-hidden
            className={cn(
              "absolute inset-y-0 left-0 w-[16%] border-r border-kamika-paper/70 bg-kamika-blue/80",
              "motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-out",
              "group-hover:-translate-x-[45%]",
            )}
          />
        )}
      </div>

      {/* Cerco exterior: la hairline que separa la foto de la página. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-frame ring-1 ring-inset ring-kamika-mist"
      />
      {/* Galce interior: el perfil de la hoja, ya sobre la foto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[9px] rounded-[3px] ring-1 ring-inset ring-kamika-paper/35"
      />

      {mullion !== "none" && (
        <div aria-hidden className="pointer-events-none absolute inset-[9px]">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-kamika-paper/35" />
          {mullion === "cross" && (
            <div className="absolute inset-x-0 top-[38%] h-px bg-kamika-paper/35" />
          )}
        </div>
      )}
    </div>
  );
}
