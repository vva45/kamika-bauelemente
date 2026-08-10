"use client";

/**
 * El idioma para los componentes de CLIENTE, por contexto.
 *
 * Por qué existe: los componentes de cliente se prerenderizan en el
 * servidor en un grafo de módulos distinto del de los componentes de
 * servidor. El almacén por render de lib/i18n.ts vive en el grafo de
 * servidor; en el prerender del grafo de cliente nunca se fija, así
 * que allí `t()` caería al idioma por defecto aunque la página fuera
 * /en o /pl — y el navegador, que sí sabe su idioma, pintaría otra
 * cosa: desajuste de hidratación (React #418, se vio en la práctica).
 *
 * El contexto es lo único que llega IGUAL a los dos pases: el layout
 * (servidor) pasa el idioma como prop y todo componente de cliente lo
 * lee con `useI18n()`, que devuelve las mismas funciones de siempre
 * ya ligadas al idioma — el cuerpo del componente no cambia.
 */
import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  DEFAULT_LOCALE,
  formatNumberFor,
  pick as pickFor,
  tFor,
  tfFor,
  type ContentKey,
  type Locale,
  type Localized,
} from "@/lib/i18n";
import { routesFor } from "@/lib/routes";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const locale = useContext(LocaleContext);
  return useMemo(
    () => ({
      locale,
      t: (key: ContentKey) => tFor(locale, key),
      tf: (key: ContentKey, values: Record<string, string | number>) =>
        tfFor(locale, key, values),
      pick: <T,>(value: Localized<T>) => pickFor(value, locale),
      formatNumber: (value: number, options?: Intl.NumberFormatOptions) =>
        formatNumberFor(locale, value, options),
      routes: routesFor(locale),
    }),
    [locale],
  );
}
