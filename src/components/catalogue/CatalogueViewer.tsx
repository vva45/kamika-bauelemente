"use client";

import { useI18n } from "@/components/layout/LocaleProvider";
/**
 * Visor de catálogo. Petición literal del dueño: "the possibility of
 * opening and browsing product catalogues".
 *
 * Tres decisiones que conviene no deshacer sin pensarlo:
 *
 *  1. Visor NATIVO del navegador (`<object>` → `<iframe>` → enlace), en
 *     cascada. Nada de pdf.js: son 300 kB de JavaScript para hacer peor
 *     lo que el navegador ya hace bien.
 *  2. Carga diferida. El PDF no se pide hasta que el visor entra en
 *     pantalla; son ficheros de varios MB y no se descargan a alguien
 *     que solo pasaba por aquí.
 *  3. En móvil NO se empotra. Varios navegadores de teléfono no pintan
 *     un PDF dentro de la página (o lo descargan en silencio), así que
 *     ahí se enseña la portada grande y un botón para abrirlo en el
 *     visor del sistema. Es la diferencia entre funcionar y no.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { ArrowUpRightIcon, DownloadIcon } from "@/components/ui/icons";

type CatalogueViewerProps = {
  file: string;
  title: string;
  cover: string;
};

/** Por debajo de esto se considera teléfono y no se empotra el PDF. */
const EMBED_MIN_WIDTH = "(min-width: 768px)";

export function CatalogueViewer({ file, title, cover }: CatalogueViewerProps) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  // `null` = todavía no se sabe (primer render en servidor). Hasta que
  // no se sepa no se pinta ninguna de las dos ramas, para no enseñar el
  // visor un instante y quitarlo después.
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(EMBED_MIN_WIDTH);
    const update = () => setCanEmbed(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  const openInNewTab = (
    <ButtonLink href={file} external>
      {t("catalogue.openCatalogue")}
      <ArrowUpRightIcon className="size-4" />
    </ButtonLink>
  );

  return (
    <div ref={containerRef}>
      {canEmbed === false && (
        <div className="grid gap-6">
          <div className="mx-auto w-full max-w-sm">
            <WindowFrame className="aspect-[5/7] w-full">
              <Image
                src={cover}
                alt={title}
                fill
                sizes="(min-width: 640px) 384px, 90vw"
                className="object-cover"
              />
            </WindowFrame>
          </div>
          <p className="text-sm text-kamika-ink/70">{t("catalogue.mobileNote")}</p>
          <div className="flex flex-wrap gap-3">
            {openInNewTab}
            <ButtonLink href={file} variant="secondary" external download>
              <DownloadIcon className="size-4" />
              {t("common.download")}
            </ButtonLink>
          </div>
        </div>
      )}

      {canEmbed === true && (
        <>
          {/* La altura es del contenedor, no del PDF: el visor nativo
              rellena lo que le den. 4/5 en tablet, casi pantalla
              completa en escritorio. */}
          <div className="frame-glass relative aspect-[3/4] w-full ring-1 ring-kamika-mist md:aspect-[4/3] lg:aspect-[16/10]">
            {visible ? (
              <object
                // #view=FitH: el navegador abre el catálogo ajustado al
                // ancho, que es como se hojea un catálogo.
                data={`${file}#view=FitH`}
                type="application/pdf"
                title={title}
                className="size-full"
              >
                <iframe src={`${file}#view=FitH`} title={title} className="size-full border-0">
                  <div className="flex size-full flex-col items-center justify-center gap-4 p-8 text-center">
                    <p className="text-sm text-kamika-ink/70">{t("catalogue.fallbackBody")}</p>
                    {openInNewTab}
                  </div>
                </iframe>
              </object>
            ) : (
              // Antes de entrar en pantalla, el hueco ya está reservado:
              // cuando cargue el PDF nada salta de sitio.
              <div className="size-full bg-kamika-blue-50" aria-hidden />
            )}
          </div>
          <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.12em] text-kamika-steel uppercase">
            {t("catalogue.viewerHint")}
          </p>
        </>
      )}
    </div>
  );
}
