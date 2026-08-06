/**
 * Fabricantes y sus sistemas.
 *
 * Petición del dueño: en ventanas, el cliente no debe ver modelos
 * sueltos sino la jerarquía real del sector —
 *
 *     Windows → Aluplast → sistema (IDEAL 4000, …) → versiones
 *
 * porque así es como se pide un presupuesto: primero la marca de perfil,
 * después la serie, y al final la variante.
 *
 * ⚠️ ESTADO: el catálogo de Aluplast todavía no ha llegado. Los nombres
 * de los sistemas son los de la gama pública del fabricante, pero
 * NINGUNA especificación está escrita aquí: cuando llegue el catálogo se
 * rellenan desde él, igual que se hizo con las puertas. Falta confirmar
 * con el dueño cuáles de estos sistemas vende de verdad — ver CONTENT.md.
 *
 * Regla de negocio que no se toca: la web del fabricante NUNCA se enlaza.
 * Si el cliente se va a aluplast.de, la venta se pierde por el camino.
 * Se autoaloja su catálogo y el botón lleva a contacto.
 */
import type { Manufacturer } from "./types";

export const MANUFACTURERS: Manufacturer[] = [
  {
    id: "aluplast",
    category: "windows",
    name: "Aluplast",
    tagline: { en: "German PVC window systems, 70 to 85 mm frame depth." },
    intro: {
      en: "Aluplast profiles are the base of most of the PVC windows we fit: several system depths, the same hardware and the same colour range across all of them. Which system a house needs depends on the wall build-up and on what the room has to hold — that is decided when we measure, not from a brochure.",
    },
    image: "/images/manufacturers/aluplast.jpg",
    systems: [
      {
        id: "ideal-4000",
        name: "IDEAL 4000",
        tagline: { en: "5-chamber, 70 mm — the standard replacement window." },
        image: "/images/manufacturers/aluplast-ideal-4000.jpg",
      },
      {
        id: "ideal-5000",
        name: "IDEAL 5000",
        tagline: { en: "5-chamber, 70 mm, flush-fitting sash." },
        image: "/images/manufacturers/aluplast-ideal-5000.jpg",
      },
      {
        id: "ideal-7000",
        name: "IDEAL 7000",
        tagline: { en: "6-chamber, 85 mm, for new build and full renovation." },
        image: "/images/manufacturers/aluplast-ideal-7000.jpg",
      },
      {
        id: "energeto-8000",
        name: "energeto 8000",
        tagline: { en: "85 mm with a bonded, steel-free reinforcement." },
        image: "/images/manufacturers/aluplast-energeto-8000.jpg",
      },
    ],
  },
];

export const getManufacturersByCategory = (category: string): Manufacturer[] =>
  MANUFACTURERS.filter((manufacturer) => manufacturer.category === category);

export const getManufacturer = (category: string, id: string): Manufacturer | undefined =>
  MANUFACTURERS.find(
    (manufacturer) => manufacturer.category === category && manufacturer.id === id,
  );

export const getSystem = (manufacturer: Manufacturer, systemId: string) =>
  manufacturer.systems.find((system) => system.id === systemId);
