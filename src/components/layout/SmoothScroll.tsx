"use client";

/**
 * Scroll suave con Lenis.
 *
 * Se monta como proveedor para poder pararlo desde otros componentes
 * (el menú móvil a pantalla completa lo detiene mientras está abierto).
 *
 * Si el usuario ha pedido menos movimiento, Lenis no llega a arrancar:
 * el scroll nativo del sistema es el que manda.
 */
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";

type SmoothScrollApi = { stop: () => void; start: () => void };

const SmoothScrollContext = createContext<SmoothScrollApi>({
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenisRef.current = lenis;

    let frame = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
