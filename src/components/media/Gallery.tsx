"use client";

/**
 * Galería del detalle de proyecto: imagen grande en el marco firma,
 * miniaturas debajo y un lightbox propio — sin librerías, que para
 * cuatro fotos no hacen falta.
 *
 * Sin cotas a propósito: un proyecto no tiene una medida que dar, y una
 * cota inventada sería decoración que además miente. (Las tenía cuando
 * también servía a las fichas de producto, retiradas en 2026-09.)
 *
 * Teclado: las miniaturas son botones; en el lightbox, Escape cierra y
 * las flechas navegan. Mientras está abierto, la página de detrás no
 * hace scroll.
 */
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";
import type { GalleryImage } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

type GalleryProps = {
  images: GalleryImage[];
  title: string;
};

export function Gallery({ images, title }: GalleryProps) {
  const { pick, t, tf } = useI18n();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const smoothScroll = useSmoothScroll();

  const current = images[active];
  const total = images.length;

  const step = useCallback(
    (delta: number) => setActive((index) => (index + delta + total) % total),
    [total],
  );

  const openLightbox = () => {
    openerRef.current = document.activeElement as HTMLElement;
    setLightbox(true);
  };

  const closeLightbox = useCallback(() => {
    setLightbox(false);
    openerRef.current?.focus();
  }, []);

  // Teclado + bloqueo de scroll mientras el lightbox está abierto.
  useEffect(() => {
    if (!lightbox) return;

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    smoothScroll.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      smoothScroll.start();
    };
  }, [lightbox, closeLightbox, step, smoothScroll]);

  if (!current) return null;

  return (
    <div>
      {/* ── Imagen principal ──────────────────────────────────── */}
      <button
        type="button"
        onClick={openLightbox}
        aria-label={t("gallery.openLightbox")}
        className="group relative block w-full cursor-zoom-in rounded-frame"
      >
        <WindowFrame className="aspect-[4/3] w-full" pan>
          <Image
            src={current.src}
            alt={pick(current.alt)}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </WindowFrame>
      </button>

      {/* ── Miniaturas ────────────────────────────────────────── */}
      {total > 1 && (
        <ul className="mt-4 flex gap-3">
          {images.map((image, index) => (
            <li key={image.src} className="w-24">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={tf("gallery.viewImage", { index: index + 1, total })}
                aria-current={index === active}
                className={cn(
                  "frame-glass relative block aspect-[4/3] w-full",
                  "ring-1 ring-inset",
                  index === active
                    ? "ring-2 ring-kamika-steel"
                    : "ring-kamika-mist hover:ring-kamika-steel/50",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-100 flex flex-col bg-kamika-ink/95"
          onClick={(event) => {
            // Click en el fondo cierra; en la imagen o los controles, no.
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-mono text-[0.8125rem] tracking-[0.1em] text-kamika-paper/70 tabular-nums">
              {active + 1} / {total}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={closeLightbox}
              aria-label={t("gallery.close")}
              className="rounded-kamika p-2 text-kamika-paper hover:bg-kamika-paper/10"
            >
              <CloseIcon className="size-6" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 px-4 pb-4 md:px-16">
            <Image
              src={current.src}
              alt={pick(current.alt)}
              fill
              sizes="100vw"
              className="object-contain"
            />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t("gallery.prev")}
                  className="absolute top-1/2 left-2 -translate-y-1/2 rounded-kamika p-2 text-kamika-paper hover:bg-kamika-paper/10 md:left-4"
                >
                  <ArrowRightIcon className="size-6 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t("gallery.next")}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-kamika p-2 text-kamika-paper hover:bg-kamika-paper/10 md:right-4"
                >
                  <ArrowRightIcon className="size-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
