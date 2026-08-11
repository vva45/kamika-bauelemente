/**
 * Los tore ya NO llevan fichas de ejemplo.
 *
 * La gama aguantaba con cuatro modelos inventados (dos puertas de
 * garaje y dos puertas de finca plausibles) hasta que llegara catálogo.
 * Han llegado dos (2026-08): el de Garagentore —INFINITI, PRESTO,
 * UNICO, Rolltore— y el de Grundstückszäune con sus Tore und Pforten.
 * La gama pasa a ir por colección, igual que las puertas de entrada:
 * ver los modelos con `catalogue: "garagentore"` y
 * `"grundstueckszaeune"` en `catalogue-models.ts`, generados por
 * `scripts/extract_gates_models.py`.
 *
 * Los cuatro ejemplos se fueron enteros, con sus imágenes y su ficha
 * PDF inventada: junto a treinta modelos reales, un "Sektional 40" de
 * pega solo podía restar.
 */
import type { Product } from "../types";

export const gates: Product[] = [];
