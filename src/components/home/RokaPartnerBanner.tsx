/**
 * Banner del partner ROKA en la home — pedido del dueño (2026-08),
 * dentro de su programa de landing para distribuidores (la "Option 1"
 * de sus instrucciones: un banner que enlaza su página).
 *
 * No es un banner ajeno pegado: está montado con el lenguaje de la
 * casa —tarjeta con borde mist, eyebrow en mono, tipografía display—
 * y las puertas que enseña son renders REALES de los catálogos ROKA
 * ya extraídos, así que combina solo. Toda la tarjeta es un único
 * enlace, SIEMPRE en pestaña nueva: la web de Kamika queda detrás.
 *
 * Si el dueño decide quitarlo, basta con borrar su línea en la home;
 * el enlace de la navegación es independiente.
 */
import Image from "next/image";
import { rokaPartnerUrl } from "@/data/company";
import { currentLocale, t } from "@/lib/i18n";

/**
 * Tres renders de puertas de los catálogos autoalojados, decorativos.
 * El tercero es una copia del select-1 con el fondo gris #EEE llevado
 * a blanco, para que las tres tarjetas queden iguales.
 */
const DOORS = [
  "/images/models/roka-signature-2025/balance-01.jpg",
  "/images/models/roka-signature-2025/earth-01.jpg",
  "/images/home/roka-banner-select.jpg",
];

export function RokaPartnerBanner() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-16 md:px-8 md:pb-24">
      <a
        href={rokaPartnerUrl(currentLocale())}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid items-center gap-8 overflow-hidden rounded-kamika border border-kamika-mist bg-kamika-paper p-8 md:p-10 lg:grid-cols-[1fr_auto]"
      >
        <div>
          <p className="eyebrow">{t("home.rokaEyebrow")}</p>
          <p className="font-display mt-3 text-2xl font-medium tracking-[-0.02em] text-kamika-ink md:text-3xl">
            {t("nav.rokaDoors")}
          </p>
          <p className="mt-3 max-w-xl text-pretty text-kamika-ink/70">
            {t("home.rokaBody")}
          </p>
          <p className="mt-5 font-mono text-[0.8125rem] tracking-[0.14em] text-kamika-steel uppercase group-hover:text-kamika-ink motion-safe:transition-colors">
            roka-doors.com <span aria-hidden>↗</span>
            <span className="sr-only">({t("a11y.opensInNewTab")})</span>
          </p>
        </div>

        {/* Tres puertas de los catálogos, la del medio un pelín alzada:
            el escalonado les da vida sin salirse del estilo. */}
        <div className="flex items-center gap-4">
          {DOORS.map((door, index) => (
            <div
              key={door}
              className={
                "relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-[4px] bg-white ring-1 ring-kamika-mist md:w-28 " +
                "motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.03] " +
                (index === 1 ? "-translate-y-2" : "translate-y-1")
              }
            >
              <Image src={door} alt="" fill sizes="112px" className="object-contain p-1.5" />
            </div>
          ))}
        </div>
      </a>
    </section>
  );
}
