"use client";

/**
 * Reveal al hacer scroll. No es "fade + subir 20px": el contenido se
 * descubre con una máscara desde un lado, como una persiana que sube.
 *
 * Con `prefers-reduced-motion` el contenido aparece ya visible, sin
 * animación y sin salto.
 */
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealFrom = "left" | "right" | "bottom";

type RevealProps = {
  children: ReactNode;
  className?: string;
  from?: RevealFrom;
  delay?: number;
  /** Como elemento de lista dentro de un contenedor con `stagger`. */
  asChild?: boolean;
};

const HIDDEN: Record<RevealFrom, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  bottom: "inset(100% 0 0 0)",
};

const VISIBLE = "inset(0 0 0 0)";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, className, from = "left", delay = 0, asChild }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Dentro de un contenedor con variantes, hereda el escalonado del padre.
  if (asChild) {
    return (
      <motion.div
        className={cn("will-change-[clip-path]", className)}
        variants={{
          hidden: { clipPath: HIDDEN[from] },
          visible: { clipPath: VISIBLE, transition: { duration: 0.9, ease: EASE } },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("will-change-[clip-path]", className)}
      initial={{ clipPath: HIDDEN[from] }}
      whileInView={{ clipPath: VISIBLE }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Contenedor que escalona a sus hijos. Los hijos deben ser `Reveal`
 * con `asChild` o `motion.*` con las variantes `hidden`/`visible`.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}
