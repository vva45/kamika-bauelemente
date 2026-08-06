/**
 * Cabecera de página de categoría: imagen en el marco firma a la
 * derecha, nombre e intro a la izquierda, y el contador de modelos como
 * eyebrow técnico.
 *
 * La usan tanto el listado normal como el layout coming-soon, para que
 * una categoría sin contenido no parezca una página de otra web.
 */
import Image from "next/image";
import { WindowFrame } from "@/components/ui/WindowFrame";
import type { Category } from "@/data/types";
import { pick, t, tf } from "@/lib/i18n";

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

  return (
    <section className="border-b border-kamika-mist bg-kamika-blue-50">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow">{countLabel}</p>
          <h1 className="mt-4 text-4xl text-balance md:text-5xl">{pick(category.name)}</h1>
          <p className="mt-5 max-w-xl text-pretty text-kamika-ink/70 md:text-lg">
            {pick(category.intro)}
          </p>
        </div>

        <WindowFrame className="aspect-[16/10] w-full" mullion="vertical">
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
