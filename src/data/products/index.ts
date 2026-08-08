/**
 * Un fichero por categoría, agregados aquí en una sola lista.
 *
 * Si una categoría se quedara sin productos, su página caería sola en
 * el layout "coming soon": nunca hay una página rota ni un listado
 * vacío.
 */
import type { Product } from "../types";
import { accessories } from "./accessories";
import { entranceDoors } from "./entrance-doors";
import { fences } from "./fences";
import { gates } from "./gates";
import { insectScreens } from "./insect-screens";
import { interiorDoors } from "./interior-doors";
import { patioDoors } from "./patio-doors";
import { rollerShutters } from "./roller-shutters";
import { windows } from "./windows";

export const PRODUCTS: Product[] = [
  ...windows,
  ...entranceDoors,
  ...interiorDoors,
  ...patioDoors,
  ...rollerShutters,
  ...insectScreens,
  ...gates,
  ...fences,
  ...accessories,
];
