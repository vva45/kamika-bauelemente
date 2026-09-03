/**
 * Datenschutzerklärung (DSGVO). El alemán es la versión vinculante; en
 * /en y /pl se sirve la traducción del mismo texto (Art. 12 DSGVO:
 * información comprensible para quien la lee), con su aviso y el
 * original alemán plegado bajo un botón.
 *
 * Describe lo que el sitio hace de verdad: sin cookies, con Vercel Web
 * Analytics (sin cookies, agregado), sin fuentes externas y con el mapa
 * detrás de un clic. Si algún día se añade cualquier otra cosa de
 * terceros, este texto deja de ser cierto y hay que cambiarlo (y
 * probablemente poner un banner de consentimiento).
 *
 * Tiene que revisarlo un abogado alemán.
 */
import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import {
  LEGAL_ORIGINAL_TOGGLE,
  LEGAL_TRANSLATION_NOTICE,
  LEGAL_UPDATED_LABEL,
  PRIVACY_BLOCKS,
  PRIVACY_TITLE,
  resolveLegal,
} from "@/content/legal";
import { isLocale, pick, setRequestLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: pick(PRIVACY_TITLE),
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = isLocale(locale) ? locale : "de";

  return (
    <LegalDocument
      lang={lang}
      title={pick(PRIVACY_TITLE)}
      updatedLabel={pick(LEGAL_UPDATED_LABEL)}
      notice={pick(LEGAL_TRANSLATION_NOTICE)}
      blocks={resolveLegal(PRIVACY_BLOCKS, lang)}
      original={
        lang === "de"
          ? null
          : {
              labels: pick(LEGAL_ORIGINAL_TOGGLE),
              title: PRIVACY_TITLE.de ?? PRIVACY_TITLE.en,
              updatedLabel: LEGAL_UPDATED_LABEL.de ?? LEGAL_UPDATED_LABEL.en,
              blocks: resolveLegal(PRIVACY_BLOCKS, "de"),
            }
      }
    />
  );
}
