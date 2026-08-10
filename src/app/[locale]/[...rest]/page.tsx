/**
 * Cazatodo del 404 con estilo.
 *
 * Con dynamicParams=false, una URL que no case con ninguna ruta bajo un
 * idioma válido (p. ej. /de/esto-no-existe) no tiene página que la
 * atienda; esta la recoge, fija el idioma —para que el 404 salga en el
 * idioma de la URL, no en el por defecto— y lanza notFound(), que
 * renderiza el not-found del layout.
 */
import { notFound } from "next/navigation";
import { setRequestLocale } from "@/lib/i18n";

export function generateStaticParams() {
  // Una página "no encontrada" prerenderizada por idioma basta.
  return [{ rest: ["__not-found__"] }];
}

export default async function CatchAllPage({
  params,
}: PageProps<"/[locale]/[...rest]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
