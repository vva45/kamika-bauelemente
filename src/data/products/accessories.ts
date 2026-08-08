/**
 * Los accesorios ya NO son fichas de ejemplo.
 *
 * Esta gama enseñaba cuatro fichas inventadas —una manilla, un
 * vierteaguas, un cilindro y un aireador— hasta que llegara catálogo.
 * Ya ha llegado: los catálogos de puertas y de persianas traen al final
 * sus accesorios de verdad, con foto y con el nombre impreso, y de ahí
 * salen los 44 que enseña la gama hoy (`scripts/extract_accessories.py`,
 * modelos con `category: "accessories"` en `catalogue-models.ts`).
 *
 * Las cuatro fichas se fueron con ellos. Dejarlas al lado de producto
 * real habría sido lo peor de los dos mundos: el visitante no puede
 * distinguirlas y la regla de la casa es que aquí no hay nada
 * inventado. Los ids que las citaban en "Goes well with" se descartan
 * solos, que `getRelated` ignora los que no existen.
 *
 * Lo que sigue faltando —manillas de ventana, cilindros, vierteaguas,
 * aireadores de rebaje— no está en estos catálogos. Entra cuando el
 * proveedor mande el suyo, no antes. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const accessories: Product[] = [];
