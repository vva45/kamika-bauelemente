/**
 * Documento legal: Impressum y Datenschutzerklärung comparten layout.
 *
 * El contenido va marcado con `lang="de"` aunque el `<html>` esté en
 * inglés: es la única parte del sitio que se publica en alemán desde el
 * primer día, y un lector de pantalla tiene que leerla con acento
 * alemán, no deletreada en inglés.
 *
 * Medida de línea corta (65ch) y texto pequeño: es un documento para
 * leer, no una sección de marketing.
 */
import type { LegalBlock } from "@/content/legal";

type LegalDocumentProps = {
  title: string;
  updatedLabel: string;
  blocks: LegalBlock[];
};

export function LegalDocument({ title, updatedLabel, blocks }: LegalDocumentProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
      <div className="max-w-[65ch]" lang="de">
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        <p className="eyebrow mt-4">{updatedLabel}</p>

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
      </div>
    </section>
  );
}
