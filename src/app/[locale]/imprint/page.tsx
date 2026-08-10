/**
 * Impressum — obligatorio en Alemania (§ 5 DDG) y en alemán.
 *
 * El texto vive en `src/content/legal.ts`, con un comentario en inglés
 * sobre cada bloque explicando qué dice. Tiene que revisarlo un abogado
 * alemán antes de publicar.
 */
import type { Metadata } from "next";
import { setRequestLocale } from "@/lib/i18n";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { IMPRINT_BLOCKS, IMPRINT_TITLE, LEGAL_UPDATED_LABEL } from "@/content/legal";

export async function generateMetadata({ params }: PageProps<"/[locale]/imprint">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
  title: IMPRINT_TITLE,
  // Un Impressum no se indexa: es una obligación legal, no contenido.
  robots: { index: false, follow: true },
};
}

export default async function ImprintPage({ params }: PageProps<"/[locale]/imprint">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalDocument
      title={IMPRINT_TITLE}
      updatedLabel={LEGAL_UPDATED_LABEL}
      blocks={IMPRINT_BLOCKS}
    />
  );
}
