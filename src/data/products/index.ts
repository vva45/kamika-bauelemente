/**
 * Un fichero por categoría, agregados aquí en una sola lista.
 *
 * Si una categoría se quedara sin productos, su página caería sola en
 * el layout "coming soon": nunca hay una página rota ni un listado
 * vacío. Pergolas no tiene fichero a propósito: todavía no hay catálogo
 * del que copiar nada.
 */
import type { Product } from "../types";
import { accessories } from "./accessories";
import { entranceDoors } from "./entrance-doors";
import { gates } from "./gates";
import { insectScreens } from "./insect-screens";
import { patioDoors } from "./patio-doors";
import { rollerShutters } from "./roller-shutters";
import { windows } from "./windows";

export const PRODUCTS: Product[] = [
  ...windows,
  ...entranceDoors,
  ...patioDoors,
  ...rollerShutters,
  ...insectScreens,
  ...gates,
  ...accessories,
];
