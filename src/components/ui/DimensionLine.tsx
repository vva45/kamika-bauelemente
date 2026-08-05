"use client";

/**
 * Línea de cota, como en un plano de carpintería: dos topes, dos
 * flechas y la medida en mono. Se dibuja sola al entrar en viewport.
 *
 * Es el único adorno que se permite el sitio, y además informa: siempre
 * lleva una medida real del producto.
 *
 * Construida con divs en vez de un SVG escalado, para que la flecha y
 * el texto no se deformen a ningún ancho.
 */
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/cn";

type Orientation = "horizontal" | "vertical";

type DimensionLineProps = {
  /** Ya formateado por quien llama: "1480 mm", "0,7 W/m²K". */
  label: string;
  orientation?: Orientation;
  /** `steel` sobre fondo claro, `paper` sobre foto. */
  tone?: "steel" | "paper";
  className?: string;
  delay?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Tope de extremo: el trazo corto perpendicular a la cota. */
function Tick({
  horizontal,
  rule,
  transition,
}: {
  horizontal: boolean;
  rule: string;
  transition: Transition;
}) {
  return (
    <motion.span
      className={cn("block shrink-0", rule, horizontal ? "h-2.5 w-px" : "h-px w-2.5")}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={transition}
    />
  );
}

/** Tramo de cota, que se dibuja desde el tope hacia el centro. */
function Rule({
  horizontal,
  origin,
  rule,
  transition,
}: {
  horizontal: boolean;
  origin: "start" | "end";
  rule: string;
  transition: Transition;
}) {
  const originClass = horizontal
    ? origin === "start"
      ? "origin-left"
      : "origin-right"
    : origin === "start"
      ? "origin-top"
      : "origin-bottom";

  return (
    <motion.span
      className={cn("block flex-1", rule, horizontal ? "h-px" : "w-px", originClass)}
      initial={horizontal ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={horizontal ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={VIEWPORT}
      transition={transition}
    />
  );
}

/** Punta de flecha, girada según el lado al que apunta. */
function Arrow({
  horizontal,
  direction,
  colour,
  transition,
}: {
  horizontal: boolean;
  direction: "start" | "end";
  colour: string;
  transition: Transition;
}) {
  const rotation = horizontal
    ? direction === "start"
      ? "rotate-180"
      : ""
    : direction === "start"
      ? "-rotate-90"
      : "rotate-90";

  return (
    <motion.svg
      viewBox="0 0 8 8"
      className={cn("block size-2 shrink-0", colour, rotation)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={transition}
    >
      <path d="m2.5 1 3 3-3 3" />
    </motion.svg>
  );
}

export function DimensionLine({
  label,
  orientation = "horizontal",
  tone = "steel",
  className,
  delay = 0.15,
}: DimensionLineProps) {
  const reduceMotion = useReducedMotion();
  const horizontal = orientation === "horizontal";

  const colour = tone === "steel" ? "text-kamika-steel" : "text-kamika-paper";
  const rule = tone === "steel" ? "bg-kamika-steel" : "bg-kamika-paper";

  const lineTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: EASE, delay };
  const fadeTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: EASE, delay: delay + 0.45 };

  return (
    <div
      className={cn(
        "flex items-center gap-1.5",
        horizontal ? "w-full flex-row" : "h-full flex-col",
        className,
      )}
    >
      <Tick horizontal={horizontal} rule={rule} transition={fadeTransition} />
      <Arrow horizontal={horizontal} direction="start" colour={colour} transition={fadeTransition} />
      <Rule horizontal={horizontal} origin="start" rule={rule} transition={lineTransition} />
      <motion.span
        className={cn(
          "shrink-0 font-mono text-[0.6875rem] tracking-[0.08em] whitespace-nowrap tabular-nums",
          colour,
          !horizontal && "[writing-mode:vertical-rl]",
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={fadeTransition}
      >
        {label}
      </motion.span>
      <Rule horizontal={horizontal} origin="end" rule={rule} transition={lineTransition} />
      <Arrow horizontal={horizontal} direction="end" colour={colour} transition={fadeTransition} />
      <Tick horizontal={horizontal} rule={rule} transition={fadeTransition} />
    </div>
  );
}
