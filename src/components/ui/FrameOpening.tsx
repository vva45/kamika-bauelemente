"use client";

/**
 * La apertura del hero: dos hojas azules que giran hacia fuera y
 * descubren la foto. Una sola vez, ~1.2s, al cargar.
 *
 * Importante para el LCP: la imagen NO se anima. Se pinta a tamaño y
 * opacidad final desde el primer frame; lo único que se mueve son las
 * hojas que tiene encima, y son `pointer-events-none`.
 *
 * Con `prefers-reduced-motion` las hojas no llegan a montarse.
 */
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FrameOpeningProps = {
  children: ReactNode;
  className?: string;
  mullion?: "none" | "vertical" | "cross";
};

/** Curva de salida larga: arranca decidido y posa suave, como una hoja real. */
const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 1.2;

export function FrameOpening({ children, className, mullion = "vertical" }: FrameOpeningProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative isolate [perspective:1800px]", className)}>
      <div className="frame-glass absolute inset-0 bg-kamika-blue-50">{children}</div>

      {!reduceMotion && (
        <div
          aria-hidden
          // La clase la usa globals.css para quitar las hojas de en medio
          // sin JavaScript y con movimiento reducido: si no, en esos dos
          // casos se quedarían tapando la foto del hero para siempre.
          className="frame-opening-leaves frame-glass pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
        >
          {(["left", "right"] as const).map((side, index) => (
            <motion.div
              key={side}
              className={cn(
                "absolute inset-y-0 w-1/2 bg-kamika-blue",
                side === "left" ? "left-0 origin-left" : "right-0 origin-right",
              )}
              initial={{ rotateY: 0, opacity: 1 }}
              animate={{ rotateY: side === "left" ? -105 : 105, opacity: [1, 1, 0] }}
              transition={{
                rotateY: { duration: DURATION, ease: EASE, delay: 0.1 + index * 0.08 },
                opacity: {
                  duration: DURATION,
                  times: [0, 0.78, 1],
                  delay: 0.1 + index * 0.08,
                },
              }}
            >
              {/* Galce de la hoja, para que se lea como carpintería y no como un rectángulo. */}
              <span className="absolute inset-[9px] block rounded-[3px] ring-1 ring-inset ring-kamika-paper/50" />
            </motion.div>
          ))}
        </div>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-frame ring-1 ring-inset ring-kamika-mist"
      />
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
