"use client";

/**
 * El "estudio de color" de /colours — idea del dueño (2026-08):
 * TODAS las muestras de la carta son clicables y tiñen el marco del
 * live preview; las variantes de cristal, igual, se ponen en los
 * cristales. Este fichero es el pegamento:
 *
 *  - un contexto con la selección (color + cristal) que comparten el
 *    previsualizador, la carta y el capítulo de vidrios;
 *  - la geometría de LA VENTANA FAMOSA (los dos huecos de cristal,
 *    medidos píxel a píxel sobre render.jpg, como la máscara);
 *  - la mini-vista flotante: la carta mide miles de píxeles y el marco
 *    queda arriba — al clicar una muestra con el marco fuera de
 *    pantalla, aparece una miniatura fija abajo a la derecha que
 *    enseña la selección y, al tocarla, sube al previsualizador.
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
import type { ColorFinish, GlassFinish } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

/** La foto del live preview y su máscara — la "ventana famosa". */
export const STUDIO_RENDER = "/images/colours/render.jpg";
export const STUDIO_MASK = "/images/colours/render-mask.png";

/**
 * Los dos huecos de cristal de la foto, en porcentaje de la caja 4:3.
 * Medidos sobre render.jpg (1600×1200): izq (402,238)-(728,937),
 * dcha (860,238)-(1186,937). Si se cambia la foto, se re-mide esto
 * igual que la máscara.
 */
export const STUDIO_PANES = [
  { left: "25.125%", top: "19.83%", width: "20.375%", height: "58.25%" },
  { left: "53.75%", top: "19.83%", width: "20.375%", height: "58.25%" },
];

/**
 * Qué parte de cada muestra de cristal ES cristal, en fracciones
 * [x0, y0, x1, y1] de la imagen. Petición del dueño: "coger solo la
 * parte del cristal del placeholder y estirarla hasta tapar el cristal
 * de la ventana" — muchas muestras enseñan media lámina de vidrio y al
 * lado el objeto sin vidrio, y ESO no debe acabar en la ventana.
 * Por catálogo, con excepciones puntuales por id.
 */
const GLASS_CROPS: Record<string, [number, number, number, number]> = {
  // la planta tras el vidrio ocupa casi todo; el efecto carga a la izq.
  "wiked-pvc-alu": [0.04, 0.08, 0.5, 0.92],
  // carta SCHEIBENARTEN: lámina de vidrio a la izquierda, escultura
  // libre a la derecha
  "aussenturen": [0.06, 0.12, 0.45, 0.88],
  "iglo-fenster": [0.06, 0.12, 0.45, 0.88],
  // fichas grandes ROKA: el vidrio cubre la mitad derecha de la piedra
  "roka-signature-2025": [0.48, 0.28, 0.88, 0.78],
  // resumen Select: lámina centrada sobre el jarrón
  "roka-select-2025": [0.32, 0.28, 0.68, 0.72],
};

const GLASS_CROP_OVERRIDES: Record<string, [number, number, number, number]> = {};

/**
 * Enseña SOLO el recorte de la muestra, estirado a la caja entera:
 * background-size/position calculados desde la fracción del recorte.
 */
function cropStyle(image: string, crop: [number, number, number, number]) {
  const [x0, y0, x1, y1] = crop;
  const w = x1 - x0;
  const h = y1 - y0;
  return {
    backgroundImage: `url(${image})`,
    backgroundSize: `${100 / w}% ${100 / h}%`,
    backgroundPosition: `${(x0 / (1 - w)) * 100}% ${(y0 / (1 - h)) * 100}%`,
  };
}

type Studio = {
  colour: ColorFinish | null;
  glass: GlassFinish | null;
  setColour: (colour: ColorFinish | null) => void;
  setGlass: (glass: GlassFinish | null) => void;
};

const StudioContext = createContext<Studio | null>(null);

export const useColourStudio = () => useContext(StudioContext);

export function ColourStudioProvider({ children }: { children: ReactNode }) {
  const [colour, setColour] = useState<ColorFinish | null>(null);
  const [glass, setGlass] = useState<GlassFinish | null>(null);
  const value = useMemo(() => ({ colour, glass, setColour, setGlass }), [colour, glass]);
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

/**
 * El marco con su selección puesta: foto + velo enmascarado + cristal
 * en los huecos. Lo usan el previsualizador grande y la miniatura.
 */
export function FramePreview({
  colour,
  glass,
  sizes,
  className,
}: {
  colour: ColorFinish | null;
  glass: GlassFinish | null;
  sizes: string;
  className?: string;
}) {
  const { pick, t } = useI18n();
  // Sin clase de posición propia: el que llama decide (`absolute
  // inset-0` en el previsualizador grande, `relative` en la miniatura).
  // Mezclar relative+absolute aquí colapsaba la caja a altura cero.
  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={STUDIO_RENDER}
        alt={t("home.colourRenderAlt")}
        fill
        sizes={sizes}
        className="object-cover"
      />
      {/* El cristal elegido, en los dos huecos: SOLO la parte de vidrio
          de la muestra impresa, estirada hasta cubrir el hueco — el
          "recortar, copiar y estirar" que pidió el dueño. */}
      {glass &&
        STUDIO_PANES.map((pane, index) => (
          <div
            key={index}
            aria-hidden
            className="absolute"
            style={{
              ...pane,
              ...cropStyle(
                glass.image,
                GLASS_CROP_OVERRIDES[glass.id] ?? GLASS_CROPS[glass.catalogue] ?? [0, 0, 1, 1],
              ),
            }}
          />
        ))}
      {/* El velo del marco, enmascarado: color plano con su hex; las
          texturas (maderas, cerámicas, metal líquido) con la MUESTRA
          estirada sobre el marco "en plan paint", como pidió el dueño.
          multiply sobre el marco blanco conserva las sombras del
          perfil en ambos casos. */}
      {colour && (
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply motion-safe:transition-colors motion-safe:duration-500"
          style={{
            ...(colour.image
              ? { backgroundImage: `url(${colour.image})`, backgroundSize: "cover", backgroundPosition: "center" }
              : { backgroundColor: colour.hex }),
            maskImage: `url(${STUDIO_MASK})`,
            maskSize: "100% 100%",
            WebkitMaskImage: `url(${STUDIO_MASK})`,
            WebkitMaskSize: "100% 100%",
          }}
        />
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

  if (!studio || (!studio.colour && !studio.glass) || anchorVisible) return null;

  const label = [
    studio.colour ? pick(studio.colour.name) : null,
    studio.glass ? pick(studio.glass.name) : null,
  ]
    .filter(Boolean)
    .join(" · ");

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
        glass={studio.glass}
        sizes="288px"
        className="relative aspect-[4/3] w-full rounded-[4px]"
      />
      <span className="mt-2 block truncate font-display text-sm font-medium text-kamika-ink">
        {label}
      </span>
      <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-kamika-steel uppercase">
        {t("colours.previewJump")} ↑
      </span>
    </button>
  );
}
