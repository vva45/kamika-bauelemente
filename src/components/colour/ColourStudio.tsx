"use client";

/**
 * El "estudio de color" de /colours — idea del dueño (2026-08):
 * TODAS las muestras de la carta son clicables y visten el marco del
 * live preview. Este fichero es el pegamento:
 *
 *  - un contexto con el color elegido, compartido por el
 *    previsualizador y la carta;
 *  - el velo del marco: color plano con su hex, y las TEXTURAS
 *    (maderas, cerámicas…) con la muestra estirada "en plan paint" y
 *    GIRADA 90° — en la carta la veta va en horizontal, pero en el
 *    producto real va en vertical, y así la pidió el dueño en la
 *    preview (la tesela de la web no se gira);
 *  - la mini-vista flotante: la carta mide miles de píxeles y el marco
 *    queda arriba — al clicar una muestra con el marco fuera de
 *    pantalla, aparece una miniatura fija abajo a la derecha que
 *    enseña la selección y, al tocarla, sube al previsualizador.
 *
 * Los cristales NO participan: se probó ponerlos en la ventana y el
 * dueño decidió quitarlo (2026-08) — unos quedaban bien y otros no, y
 * afinarlos a mano no compensa. El capítulo de vidrios se queda como
 * galería, que ahí las muestras sí se entienden.
 *
 * Fuera de /colours no hay proveedor: `useColourStudio()` devuelve
 * null y todo lo demás (la home) sigue funcionando como siempre.
 */
import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ColorFinish } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

/** La foto del live preview y su máscara — la "ventana famosa". */
export const STUDIO_RENDER = "/images/colours/render.jpg";
export const STUDIO_MASK = "/images/colours/render-mask.png";

/**
 * Acabados que se pintan con su COLOR muestreado aunque tengan foto:
 * los "Special" del ROKA Signature son superficies de manilla (níquel,
 * latón, bronces) fotografiadas sobre un objeto — pegar ESA foto en el
 * marco quedaba raro, y el dueño pidió "coger muestra y pintar": el
 * hex mediano de la propia muestra, plano.
 */
export const paintFlat = (colour: ColorFinish) =>
  !colour.image || (colour.group === "special" && colour.catalogue === "roka-signature-2025");

type Studio = {
  colour: ColorFinish | null;
  setColour: (colour: ColorFinish | null) => void;
};

const StudioContext = createContext<Studio | null>(null);

export const useColourStudio = () => useContext(StudioContext);

export function ColourStudioProvider({ children }: { children: ReactNode }) {
  const [colour, setColour] = useState<ColorFinish | null>(null);
  const value = useMemo(() => ({ colour, setColour }), [colour]);
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

/**
 * El marco con su color puesto. Lo usan el previsualizador grande y la
 * miniatura flotante.
 */
export function FramePreview({
  colour,
  sizes,
  className,
}: {
  colour: ColorFinish | null;
  sizes: string;
  className?: string;
}) {
  const { t } = useI18n();
  // Sin clase de posición propia: el que llama decide (`absolute
  // inset-0` en el previsualizador grande, `relative` en la miniatura).
  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={STUDIO_RENDER}
        alt={t("home.colourRenderAlt")}
        fill
        sizes={sizes}
        className="object-cover"
      />
      {/* El velo del marco, enmascarado y en multiply: así las sombras
          del perfil se conservan, sea color plano o textura. */}
      {colour && (
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden mix-blend-multiply motion-safe:transition-colors motion-safe:duration-500"
          style={{
            ...(paintFlat(colour) ? { backgroundColor: colour.hex } : {}),
            maskImage: `url(${STUDIO_MASK})`,
            maskSize: "100% 100%",
            WebkitMaskImage: `url(${STUDIO_MASK})`,
            WebkitMaskSize: "100% 100%",
          }}
        >
          {/* La textura, girada 90°: la caja es 4:3, así que el giro
              necesita scale(4/3) para seguir cubriéndola entera. */}
          {!paintFlat(colour) && colour.image && (
            <div
              className="absolute inset-0 rotate-90 scale-[1.3334]"
              style={{
                backgroundImage: `url(${colour.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

/**
 * La miniatura flotante. Solo aparece cuando hay algo elegido Y el
 * previsualizador grande está fuera de pantalla; tocarla sube a él.
 */
export function FloatingPreview({ anchorId }: { anchorId: string }) {
  const studio = useColourStudio();
  const { pick, t } = useI18n();
  const [anchorVisible, setAnchorVisible] = useState(true);

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAnchorVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [anchorId]);

  if (!studio?.colour || anchorVisible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      className={cn(
        // casi el tamaño de una tesela de la carta, como pidió el dueño
        "fixed right-4 bottom-4 z-50 w-56 rounded-kamika bg-kamika-paper p-2.5 text-left sm:w-72",
        "shadow-lg ring-1 ring-kamika-ink/10 motion-safe:transition-transform hover:scale-[1.03]",
      )}
      aria-label={t("colours.previewJump")}
    >
      <FramePreview
        colour={studio.colour}
        sizes="288px"
        className="relative aspect-[4/3] w-full rounded-[4px]"
      />
      <span className="mt-2 block truncate font-display text-sm font-medium text-kamika-ink">
        {pick(studio.colour.name)}
      </span>
      <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-kamika-steel uppercase">
        {t("colours.previewJump")} ↑
      </span>
    </button>
  );
}
