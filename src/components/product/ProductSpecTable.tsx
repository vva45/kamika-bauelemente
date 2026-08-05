/**
 * Tabla de specs completa: en mono, filas con hairline, sin cebra.
 * Es lo que le da a la ficha el olor a documentación de fabricante.
 *
 * Los valores puramente numéricos pasan por `formatSpecValue`, que les
 * pone el separador decimal del idioma activo. Los compuestos ("4/16/4
 * double", "RC2") se imprimen tal cual.
 */
import type { Spec } from "@/data/types";
import { pick, t } from "@/lib/i18n";
import { formatSpecValue } from "@/lib/product";

export function ProductSpecTable({ specs }: { specs: Spec[] }) {
  if (specs.length === 0) return null;

  return (
    <table className="w-full border-collapse text-sm">
      <caption className="eyebrow mb-4 text-left">{t("product.specifications")}</caption>
      <tbody>
        {specs.map((spec) => (
          <tr key={pick(spec.label)} className="border-t border-kamika-mist last:border-b">
            <th
              scope="row"
              className="py-3 pr-6 text-left font-normal text-kamika-ink/65"
            >
              {pick(spec.label)}
            </th>
            <td className="py-3 text-right font-mono text-[0.8125rem] tabular-nums text-kamika-ink">
              {formatSpecValue(spec.value)}
              {spec.unit ? ` ${spec.unit}` : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
