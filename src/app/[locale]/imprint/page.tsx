/**
 * Impressum — obligatorio en Alemania (§ 5 DDG). El alemán es la versión
 * vinculante; en /en y /pl se sirve la traducción del mismo texto, con
 * su aviso y el original alemán plegado bajo un botón.
 *
 * El texto vive en `src/content/legal.ts`, con un comentario en inglés
 * sobre cada bloque explicando qué dice. Tiene que revisarlo un abogado
 * alemán.
 */
import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import {
  IMPRINT_BLOCKS,
  IMPRINT_TITLE,
  LEGAL_ORIGINAL_TOGGLE,
  LEGAL_TRANSLATION_NOTICE,
  LEGAL_UPDATED_LABEL,
  resolveLegal,
} from "@/content/legal";
import { isLocale, pick, setRequestLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/imprint">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: pick(IMPRINT_TITLE),
    // Un Impressum no se indexa: es una obligación legal, no contenido.
    robots: { index: false, follow: true },
  };
}

export default async function ImprintPage({ params }: PageProps<"/[locale]/imprint">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = isLocale(locale) ? locale : "de";

  return (
    <LegalDocument
      lang={lang}
      title={pick(IMPRINT_TITLE)}
      updatedLabel={pick(LEGAL_UPDATED_LABEL)}
      notice={pick(LEGAL_TRANSLATION_NOTICE)}
      blocks={resolveLegal(IMPRINT_BLOCKS, lang)}
      original={
        lang === "de"
          ? null
          : {
              labels: pick(LEGAL_ORIGINAL_TOGGLE),
              title: IMPRINT_TITLE.de ?? IMPRINT_TITLE.en,
              updatedLabel: LEGAL_UPDATED_LABEL.de ?? LEGAL_UPDATED_LABEL.en,
              blocks: resolveLegal(IMPRINT_BLOCKS, "de"),
            }
      }
    />
  );
}
