/**
 * Un fichero por categoría, agregados aquí en una sola lista.
 *
 * Las categorías que todavía no tienen productos sembrados no aparecen:
 * su página de categoría cae sola en el layout "coming soon", así que
 * nunca queda una página rota ni un listado vacío.
 */
import type { Product } from "../types";
import { windows } from "./windows";

export const PRODUCTS: Product[] = [...windows];
