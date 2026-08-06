/**
 * Catálogos: la rejilla de portadas para hojear o descargar.
 *
 * Sin formulario y sin pedir un email. El dueño pidió que se pudieran
 * abrir y hojear; poner un muro delante sería justo lo contrario.
 */
import type { Metadata } from "next";
import { CatalogueCard } from "@/components/catalogue/CatalogueCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CATALOGUES } from "@/data";
import { t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata({
  title: t("catalogues.title"),
  description: t("catalogues.intro"),
  path: routes.catalogues,
});

export default function CataloguesPage() {
  if (CATALOGUES.length === 0) {
    return (
      <>
        <ComingSoon
          title={t("catalogue.comingSoonTitle")}
          body={t("catalogue.comingSoonBody")}
        />
        <ContactCta />
      </>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <Reveal from="left">
          <SectionTitle
            as="h1"
            size="lg"
            eyebrow={t("catalogues.eyebrow")}
            title={t("catalogues.title")}
            intro={t("catalogues.intro")}
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOGUES.map((catalogue, index) => (
            <Reveal key={catalogue.id} asChild from="bottom">
              <CatalogueCard catalogue={catalogue} priority={index < 3} />
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <ContactCta />
    </>
  );
}
