/**
 * VENTANAS — sin fichas de producto A PROPÓSITO.
 *
 * El dueño pidió otra jerarquía para esta gama: la categoría no enseña
 * modelos sueltos sino FABRICANTES de sistemas de perfil —
 *
 *     Windows → Aluplast → sistema (IDEAL 4000, …) → versiones
 *
 * porque así se presupuesta una ventana: marca de perfil, serie y
 * variante. Esa jerarquía vive en `src/data/manufacturers.ts`, y las
 * versiones de cada sistema se rellenarán desde el catálogo de Aluplast
 * cuando llegue, igual que se hizo con las puertas de entrada.
 *
 * Los cuatro modelos de ejemplo que había aquí se retiraron con sus
 * imágenes y sus referencias cruzadas: un producto inventado no puede
 * convivir con una jerarquía real.
 */
import type { Product } from "../types";

export const windows: Product[] = [];
