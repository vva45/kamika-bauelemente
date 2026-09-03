"use client";

/**
 * El original alemán, plegado bajo la traducción.
 *
 * En /en y /pl el visitante lee el documento en su idioma (Art. 12
 * DSGVO: información comprensible), y con este botón despliega el texto
 * alemán —el jurídicamente vinculante— sin cambiar de página ni de
 * idioma. En /de no se pinta: allí el original ES la página.
 *
 * Si el dueño prefiere alemán primero y traducción bajo botón, basta
 * con invertir el estado inicial y las etiquetas: la mecánica es la
 * misma.
 */
import { useId, useState } from "react";
import type { ResolvedLegalBlock } from "@/components/legal/LegalDocument";

type LegalOriginalProps = {
  labels: { show: string; hide: string };
  title: string;
  updatedLabel: string;
  blocks: ResolvedLegalBlock[];
};

export function LegalOriginal({ labels, title, updatedLabel, blocks }: LegalOriginalProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-12 border-t border-kamika-mist pt-8">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-2 rounded-kamika border border-kamika-ink/15 bg-kamika-paper px-4 py-2.5 text-sm font-medium text-kamika-ink hover:border-kamika-ink/40 motion-safe:transition-colors"
      >
        <span aria-hidden="true" className="font-mono text-[0.6875rem] tracking-[0.12em] text-kamika-steel">
          DE
        </span>
        {open ? labels.hide : labels.show}
      </button>

      {open && (
        <div id={panelId} lang="de" className="mt-10">
          <h2 className="text-2xl md:text-3xl">{title}</h2>
          <p className="eyebrow mt-4">{updatedLabel}</p>
          <div className="mt-10 grid gap-10">
            {blocks.map((block) => (
              <div key={block.heading}>
                <h3 className="text-xl font-medium md:text-2xl">{block.heading}</h3>
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
      )}
    </div>
  );
}
