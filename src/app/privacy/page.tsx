/**
 * Datenschutzerklärung (DSGVO) — en alemán, como exige la ley.
 *
 * Describe lo que el sitio hace de verdad: sin cookies, sin analítica,
 * sin fuentes externas y sin iframes de terceros. Si algún día se añade
 * cualquiera de esas cosas, este texto deja de ser cierto y hay que
 * cambiarlo (y probablemente poner un banner de consentimiento).
 *
 * Tiene que revisarlo un abogado alemán antes de publicar.
 */
import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_UPDATED_LABEL, PRIVACY_BLOCKS, PRIVACY_TITLE } from "@/content/legal";

export const metadata: Metadata = {
  title: PRIVACY_TITLE,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title={PRIVACY_TITLE}
      updatedLabel={LEGAL_UPDATED_LABEL}
      blocks={PRIVACY_BLOCKS}
    />
  );
}
