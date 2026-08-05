/**
 * Franja de texto en movimiento lento. Dice "todo de un solo proveedor"
 * sin escribirlo.
 *
 * Es CSS puro, sin JavaScript: la pista lleva los elementos dos veces y
 * se desplaza el 50%, de modo que el bucle no tiene costura. Se para al
 * pasar el ratón, y con `prefers-reduced-motion` no llega a moverse.
 *
 * La lista se pasa desde fuera (los nombres de categoría), así que el
 * día que el sitio esté en alemán la franja se traduce sola.
 */
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: string[];
  className?: string;
};

/**
 * La segunda copia de la pista es puramente visual: se oculta a los
 * lectores de pantalla para no leer la lista dos veces.
 */
function Track({ items, duplicate }: { items: string[]; duplicate?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={duplicate}>
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex items-center font-mono text-sm tracking-[0.18em] whitespace-nowrap text-kamika-ink uppercase"
        >
          {item}
          <span className="px-6 text-kamika-steel" aria-hidden>
            ·
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ items, className }: MarqueeProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "group overflow-hidden border-y border-kamika-mist bg-kamika-blue py-4",
        className,
      )}
    >
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        <Track items={items} />
        <Track items={items} duplicate />
      </div>
    </div>
  );
}
