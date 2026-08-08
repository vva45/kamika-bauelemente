/**
 * Las mosquiteras ya NO llevan fichas de ejemplo.
 *
 * La gama enseñaba cuatro fichas inventadas. Lo que hay real hoy es el
 * Insektenschutz-Plisee del catálogo de persianas de Drutex: el dueño
 * decidió (2026-08) que ese producto es una mosquitera y se enseña en
 * SU gama, no entre las persianas donde venía impreso. El traslado lo
 * hace `category: "insect-screens"` en el propio modelo — ver
 * SHUTTER_SECTIONS en `scripts/extract_drutex_models.py`, que es donde
 * se declara para que sobreviva a cada re-extracción.
 *
 * Las cuatro fichas de ejemplo se fueron enteras, con sus imágenes.
 * Cuando llegue un catálogo de mosquiteras (Eko-Okna lo tiene en
 * alemán), sus modelos entran por el procedimiento de siempre.
 */
import type { Product } from "../types";

export const insectScreens: Product[] = [];
