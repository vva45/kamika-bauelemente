/**
 * PUERTAS DE ENTRADA — sin fichas de producto A PROPÓSITO.
 *
 * Aquí vivían cuatro modelos destacados, uno por catálogo. Se retiraron
 * por la misma razón que en ventanas: el dueño quiere que la gama se
 * lea como se vende —primero el fabricante y su colección, después los
 * modelos— y no como cuatro puertas escogidas a dedo.
 *
 *     Entrance doors → ROKA Signature / ROKA Select / Despiro / paneles
 *                    → todos los modelos de esa colección
 *                    → ficha del modelo, con sus datos y su página
 *
 * Las colecciones son los catálogos de `src/data/catalogues.ts` y los
 * modelos los extrae `scripts/extract_catalogue_models.py` de los PDF,
 * así que ya no hay una lista corta que mantener a mano: cuando el
 * proveedor manda catálogo nuevo, se vuelve a extraer y la gama entera
 * queda al día.
 *
 * Las imágenes de aquellas cuatro fichas se borraron con ellas: eran
 * recortes de los mismos catálogos y ahora están en el escaparate.
 */
import type { Product } from "../types";

export const entranceDoors: Product[] = [];
