/**
 * Las puertas de interior ya NO llevan fichas de ejemplo.
 *
 * La gama enseñaba cuatro fichas inventadas (CPL, chapa de roble,
 * lacada, acústica). Lo que hay real hoy es el System MB-45 (kalt) del
 * catálogo de Außentüren: puertas de aluminio en frío que el propio
 * catálogo recomienda "vor allem im Innenbereich" — tabiques, pasillos,
 * escaparates, vitrinas. Se enseña en ESTA gama con el mecanismo de
 * siempre: `category: "interior-doors"` en el modelo, declarado en
 * AUSSEN_MANUAL de `scripts/extract_drutex_models.py` para que
 * sobreviva a cada re-extracción.
 *
 * Las cuatro fichas se fueron enteras, con sus imágenes. Las hojas de
 * interior en CPL, chapa y lacado entran cuando llegue su catálogo
 * (Eko-Okna lo tiene en alemán), por el procedimiento de siempre.
 */
import type { Product } from "../types";

export const interiorDoors: Product[] = [];
