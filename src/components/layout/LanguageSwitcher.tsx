"use client";

/**
 * Selector de idioma: DE · EN · PL.
 *
 * Enlaces <a> normales a la MISMA página en el otro idioma, no <Link>:
 * la recarga completa es deliberada. El idioma del cliente se fija una
 * sola vez por carga (window.__LOCALE, ver lib/i18n.ts) y una
 * navegación en vivo entre idiomas dejaría componentes ya montados con
 * los textos del idioma anterior. Un cambio de idioma es un acto
 * puntual: la recarga ni se nota ni ensucia nada.
 *
 * El destino conserva la ruta actual — quien está mirando una puerta
 * en inglés quiere ESA puerta en alemán, no la portada.
 */
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABEL, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  // Por contexto, no por currentLocale(): en el prerender del grafo de
  // cliente el almacén no existe y marcaría siempre el idioma por
  // defecto como activo (pasó: DE resaltado dentro de /pl).
  const { locale: active } = useI18n();

  return (
    <nav aria-label="Sprache / Language / Język" className={cn("flex items-center gap-1", className)}>
      {LOCALES.map((locale: Locale) => (
        <a
          key={locale}
          href={localizedPath(pathname, locale)}
          aria-current={locale === active ? "true" : undefined}
          // El nombre completo del idioma para lectores de pantalla; el
          // código de dos letras para la vista.
          aria-label={LOCALE_LABEL[locale]}
          lang={locale}
          className={cn(
            "rounded-kamika px-1.5 py-1 font-mono text-[0.6875rem] tracking-[0.12em] uppercase",
            "motion-safe:transition-colors",
            locale === active
              ? "bg-kamika-ink text-kamika-paper"
              : "text-kamika-steel hover:bg-kamika-blue-50 hover:text-kamika-ink",
          )}
        >
          {locale}
        </a>
      ))}
    </nav>
  );
}
