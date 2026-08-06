/**
 * El mapa: Google Maps de verdad, dentro del marco firma.
 *
 * Antes había una imagen enlazada, para no cargar nada de Google al
 * abrir la página. El dueño lo quiere navegable —que el visitante pueda
 * moverse y ver dónde está el taller, no mirar una foto—, así que es un
 * iframe. Ocupa exactamente el mismo hueco que ocupaba la imagen.
 *
 * Consecuencias, para que consten donde se leen:
 *  - `loading="lazy"`: el mapa solo se descarga cuando el visitante
 *    llega a él. En la home está al final, así que la mayoría de las
 *    visitas ni lo piden.
 *  - Sin `pan` ni `sash` en el marco: los adornos que se mueven al hover
 *    estorbarían al arrastrar el mapa. Los cercos son
 *    `pointer-events-none`, así que el mapa se puede arrastrar entero.
 *  - Google puede poner cookies. Está declarado en el Datenschutz. Si
 *    algún día se prefiere no depender del consentimiento, aquí es donde
 *    se pone la solución de dos clics: portada + botón que monta el
 *    iframe. Es un cambio de este fichero solo.
 */
import { WindowFrame } from "@/components/ui/WindowFrame";
import { companyMapEmbedHref } from "@/data/company";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";

export function LocationMap({ className }: { className?: string }) {
  return (
    <WindowFrame className={cn("aspect-[4/3] w-full", className)}>
      <iframe
        // El título es lo que anuncia un lector de pantalla al llegar al
        // marco: sin él, "iframe" a secas.
        title={t("home.mapAlt")}
        src={companyMapEmbedHref}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 size-full border-0"
      />
    </WindowFrame>
  );
}
