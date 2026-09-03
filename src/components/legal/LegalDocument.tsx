/**
 * Documento legal: Impressum y Datenschutzerklärung comparten layout.
 *
 * Recibe el texto YA resuelto al idioma de la página (las páginas hacen
 * `pick()` sobre `src/content/legal.ts`) y marca el bloque con ese
 * `lang`, para que un lector de pantalla lo lea con el acento correcto.
 * En inglés y polaco va delante un aviso de que es traducción y de que
 * la versión alemana es la vinculante.
 *
 * Medida de línea corta (65ch) y texto pequeño: es un documento para
 * leer, no una sección de marketing.
 */
import { LegalOriginal } from "@/components/legal/LegalOriginal";
import type { Locale } from "@/lib/i18n";

export type ResolvedLegalBlock = {
  heading: string;
  paragraphs: string[];
};

type LegalDocumentProps = {
  lang: Locale;
  title: string;
  updatedLabel: string;
  /** Aviso "traducción informativa" — null en alemán, que es el original. */
  notice: string | null;
  blocks: ResolvedLegalBlock[];
  /** El original alemán plegado bajo la traducción — solo en /en y /pl. */
  original: {
    labels: { show: string; hide: string };
    title: string;
    updatedLabel: string;
    blocks: ResolvedLegalBlock[];
  } | null;
};

export function LegalDocument({ lang, title, updatedLabel, notice, blocks, original }: LegalDocumentProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
      <div className="max-w-[65ch]" lang={lang}>
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        <p className="eyebrow mt-4">{updatedLabel}</p>
        {notice && (
          <p className="mt-6 rounded-kamika border border-kamika-mist bg-kamika-blue-50 px-4 py-3 text-sm text-pretty text-kamika-ink/75">
            {notice}
          </p>
        )}

        <div className="mt-12 grid gap-10">
          {blocks.map((block) => (
            <div key={block.heading}>
              <h2 className="text-xl font-medium md:text-2xl">{block.heading}</h2>
              <div className="mt-4 grid gap-3">
                {block.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-sm text-pretty text-kamika-ink/75">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {original && <LegalOriginal {...original} />}
      </div>
    </section>
  );
}
