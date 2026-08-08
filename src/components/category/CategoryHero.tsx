/**
 * Cabecera de página de categoría: imagen en el marco firma a la
 * derecha, nombre e intro a la izquierda, y el contador de modelos como
 * eyebrow técnico.
 *
 * La usan tanto el listado normal como el layout coming-soon, para que
 * una categoría sin contenido no parezca una página de otra web.
 */
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { getCategory } from "@/data";
import type { Category } from "@/data/types";
import { pick, t, tf } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type CategoryHeroProps = {
  category: Category;
  modelCount: number;
};

export function CategoryHero({ category, modelCount }: CategoryHeroProps) {
  const countLabel =
    modelCount === 0
      ? t("common.comingSoon")
      : modelCount === 1
        ? t("product.modelsOne")
        : tf("product.modelsOther", { count: modelCount });

  // Un tipo de puerta cuelga de su gama: la miga lo dice, para que
  // desde dentro se pueda subir al hub sin volver al principio.
  const parent = category.parent ? getCategory(category.parent) : undefined;

  return (
    <section className="border-b border-kamika-mist bg-kamika-blue-50">
      {parent && (
        <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8">
          <Breadcrumb
            items={[
              { label: t("nav.products"), href: routes.products },
              { label: pick(parent.name), href: routes.category(parent.slug) },
              { label: pick(category.name) },
            ]}
          />
        </div>
      )}

      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow">{countLabel}</p>
          <h1 className="mt-4 text-4xl text-balance md:text-5xl">{pick(category.name)}</h1>
          <p className="mt-5 max-w-xl text-pretty text-kamika-ink/70 md:text-lg">
            {pick(category.intro)}
          </p>
        </div>

        {/* 3:2: la proporción de las imágenes de gama, para que la
            cabecera enseñe la foto entera y no una franja de ella. */}
        <WindowFrame className="aspect-[3/2] w-full" mullion="vertical">
          <Image
            src={category.heroImage}
            alt={pick(category.name)}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </WindowFrame>
      </div>
    </section>
  );
}
