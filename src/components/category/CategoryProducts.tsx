"use client";

/**
 * Listado filtrable de una categoría.
 *
 * El único filtro con sentido a este tamaño de catálogo es el material,
 * y solo aparece si en la categoría conviven al menos dos: en una
 * categoría toda de aluminio, un filtro es un adorno.
 *
 * Sin animaciones de scroll aquí: al filtrar, la cuadrícula cambia al
 * instante. Animar un filtrado no ayuda a entender nada.
 */
import { useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Material, Product } from "@/data/types";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import type { ContentKey } from "@/lib/i18n";

const MATERIAL_LABEL: Record<Material, ContentKey> = {
  pvc: "material.pvc",
  aluminium: "material.aluminium",
  steel: "material.steel",
  wood: "material.wood",
  "wood-alu": "material.wood-alu",
};

export function CategoryProducts({ products }: { products: Product[] }) {
  const [material, setMaterial] = useState<Material | null>(null);

  // Materiales presentes, en el orden estable del catálogo.
  const materials = [...new Set(products.map((p) => p.material).filter((m): m is Material => !!m))];
  const showFilter = materials.length > 1;

  const visible = material ? products.filter((p) => p.material === material) : products;

  const chip = (active: boolean) =>
    cn(
      "rounded-kamika px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase",
      "motion-safe:transition-colors",
      active
        ? "bg-kamika-ink text-kamika-paper"
        : "bg-kamika-blue-50 text-kamika-steel hover:bg-kamika-blue",
    );

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t("products.filterLabel")}>
          <button
            type="button"
            onClick={() => setMaterial(null)}
            aria-pressed={material === null}
            className={chip(material === null)}
          >
            {t("products.filterAll")}
          </button>
          {materials.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setMaterial(material === entry ? null : entry)}
              aria-pressed={material === entry}
              className={chip(material === entry)}
            >
              {t(MATERIAL_LABEL[entry])}
            </button>
          ))}
        </div>
      )}

      <div className={cn("grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", showFilter && "mt-8")}>
        {visible.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </div>
  );
}
