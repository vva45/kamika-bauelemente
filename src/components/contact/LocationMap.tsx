"use client";

/**
 * El mapa, con solución de dos clics (Zwei-Klick-Lösung).
 *
 * Al cargar la página NO se pide nada a Google: se enseña una portada
 * dibujada aquí mismo y un botón. Solo cuando el visitante pulsa
 * "Show map" se monta el iframe y su navegador conecta con Google. Es el
 * patrón estándar en Alemania y lo que evita depender de un banner de
 * consentimiento en todo el sitio: quien no pulsa, no manda su IP a
 * nadie; quien pulsa, lo hace sabiendo qué pasa, porque se le dice
 * debajo del botón.
 *
 * La portada es un dibujo abstracto, no un mapa: cuatro trazos en los
 * colores de marca. NO es el plano de Hechingen y no lo aparenta —
 * fingir un mapa sería tan feo como una foto de archivo, y además
 * tendría que salir de un servidor de mapas, que es justo lo que se
 * está evitando. Va difuminado para que se lea "aquí hay un mapa que
 * todavía no se ha cargado".
 *
 * La decisión no se guarda: cada página vuelve a preguntar. Guardarla
 * significaría escribir en el dispositivo del visitante, que es
 * precisamente lo que el § 25 TDDDG regula, y no vale la pena por
 * ahorrar un clic.
 */
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { PinIcon } from "@/components/ui/icons";
import { companyAddressLine, companyMapEmbedHref } from "@/data/company";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

/** Trazos abstractos: manzanas y calles, sin pretender ser un plano. */
function MapPattern() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full blur-[3px]"
    >
      <rect width="400" height="300" fill="var(--color-kamika-blue-50)" />
      <g fill="var(--color-kamika-blue)" opacity="0.5">
        <rect x="28" y="34" width="104" height="70" rx="4" />
        <rect x="168" y="22" width="86" height="52" rx="4" />
        <rect x="292" y="46" width="80" height="94" rx="4" />
        <rect x="44" y="152" width="72" height="58" rx="4" />
        <rect x="150" y="128" width="118" height="84" rx="4" />
        <rect x="60" y="238" width="140" height="44" rx="4" />
        <rect x="236" y="222" width="112" height="60" rx="4" />
      </g>
      <g stroke="var(--color-kamika-steel)" strokeWidth="3" opacity="0.35" fill="none">
        <path d="M0 122 H400" />
        <path d="M0 224 H400" />
        <path d="M140 0 V300" />
        <path d="M278 0 V300" />
        <path d="M0 268 C 90 250, 150 292, 400 262" strokeWidth="5" />
      </g>
    </svg>
  );
}

export function LocationMap({ className }: { className?: string }) {
  const { t, routes } = useI18n();
  const [loaded, setLoaded] = useState(false);

  return (
    <WindowFrame className={cn("aspect-[4/3] w-full", className)}>
      {loaded ? (
        <iframe
          // El título es lo que anuncia un lector de pantalla al llegar
          // al marco: sin él, "iframe" a secas.
          title={t("home.mapAlt")}
          src={companyMapEmbedHref}
          // Se monta al pulsar, así que ya no hace falta diferirlo.
          className="absolute inset-0 size-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0">
          <MapPattern />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="flex items-center gap-2 text-sm font-medium text-kamika-ink">
              <PinIcon className="size-4 shrink-0 text-kamika-steel" />
              {companyAddressLine}
            </p>

            <Button type="button" onClick={() => setLoaded(true)}>
              {t("map.showMap")}
            </Button>

            {/* La letra pequeña va aquí y no en un enlace escondido:
                es la información con la que el visitante decide. */}
            <p className="max-w-xs text-pretty text-[0.75rem] leading-relaxed text-kamika-ink/65">
              {t("map.notice")}{" "}
              <Link href={routes.privacy} className="text-kamika-steel underline">
                {t("footer.privacy")}
              </Link>
            </p>
          </div>
        </div>
      )}
    </WindowFrame>
  );
}
