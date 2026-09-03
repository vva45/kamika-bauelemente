/**
 * Página de un fabricante: cabecera con su lámina, la introducción y la
 * rejilla de sistemas — las mismas "casitas" que en la categoría, una
 * por sistema.
 *
 * Es un componente aparte de su ruta (`[manufacturer]/page.tsx`) desde
 * la época en que ese segmento de URL se compartía con las fichas de
 * producto; las fichas se fueron (2026-09) y la separación se queda,
 * que no molesta.
 */
import Image from "next/image";
import { ContactCta } from "@/components/layout/ContactCta";
import { SystemCard } from "@/components/manufacturer/SystemCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { getCategory } from "@/data";
import type { Manufacturer } from "@/data/types";
import { pick, t, tf } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function ManufacturerView({ manufacturer }: { manufacturer: Manufacturer }) {
  const category = getCategory(manufacturer.category);
  const systems = manufacturer.systems;
  const countLabel =
    systems.length === 1
      ? t("manufacturer.systemCountOne")
      : tf("manufacturer.systemCountOther", { count: systems.length });

  return (
    <>
      <section className="border-b border-kamika-mist bg-kamika-blue-50">
        <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8">
          <Breadcrumb
            items={[
              { label: t("nav.products"), href: routes.products },
              ...(category
                ? [{ label: pick(category.name), href: routes.category(category.slug) }]
                : []),
              { label: manufacturer.name },
            ]}
          />
        </div>

        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">
              {t("manufacturer.eyebrow")} · {countLabel}
            </p>
            <h1 className="mt-4 text-4xl text-balance md:text-5xl">{manufacturer.name}</h1>
            <p className="mt-5 max-w-xl text-pretty text-kamika-ink/70 md:text-lg">
              {pick(manufacturer.intro)}
            </p>
            <div className="mt-8">
              <ButtonLink href={routes.contact}>{t("common.contactUs")}</ButtonLink>
            </div>
          </div>

          <WindowFrame className="aspect-[16/10] w-full">
            <Image
              src={manufacturer.image}
              alt={manufacturer.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </WindowFrame>
        </div>
      </section>

      {/* ── Los sistemas, las "casitas" ─────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <h2 className="text-2xl md:text-3xl">{t("manufacturer.systemsHeading")}</h2>
        <p className="mt-4 max-w-2xl text-pretty text-kamika-ink/70">
          {t("manufacturer.systemsIntro")}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {systems.map((system, index) => (
            <SystemCard
              key={system.id}
              manufacturer={manufacturer}
              system={system}
              priority={index < 4}
            />
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
