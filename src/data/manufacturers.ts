/**
 * Fabricantes y sus sistemas.
 *
 * Petición del dueño: en ventanas, el cliente no debe ver modelos
 * sueltos sino la jerarquía real del sector —
 *
 *     Windows → fabricante (Aluplast, Salamander, VEKA, REHAU)
 *             → sistema (Ideal 5000, BluEvolution 82…)
 *
 * porque así es como se pide un presupuesto: primero la marca de
 * perfil, después la serie.
 *
 * DE DÓNDE SALE CADA DATO — la regla de la casa: las specs y
 * descripciones vienen COPIADAS de las fichas de una página que manda
 * el proveedor (autoalojadas en /pdf/windows/), nunca redactadas de
 * memoria. Un sistema sin ficha (VEKA 82, REHAU Synego) se queda con
 * nombre y una línea honesta hasta que llegue la suya; esos nombres
 * los dio el dueño, no están inventados.
 *
 * El alemán de las descripciones es el del propio fabricante — por eso
 * esos `de` ya están rellenos aunque el resto de la web aún no esté
 * traducida.
 *
 * Regla de negocio que no se toca: la web del fabricante NUNCA se
 * enlaza. Si el cliente se va a aluplast.de, la venta se pierde por el
 * camino. Se autoaloja su ficha y el botón lleva a contacto.
 */
import type { Manufacturer } from "./types";

export const MANUFACTURERS: Manufacturer[] = [
  {
    id: "aluplast",
    category: "windows",
    name: "Aluplast",
    tagline: { en: "German PVC window systems, 70 to 85 mm frame depth." },
    intro: {
      en: "Aluplast profiles are the base of most of the PVC windows we fit. Two systems cover the range: Ideal 5000 for renovation and everyday new build, Ideal 8000 where thermal and sound insulation have to reach passive-house territory. Which one a house needs is decided when we measure, not from a brochure.",
    },
    image: "/images/manufacturers/aluplast.jpg",
    systems: [
      {
        id: "ideal-5000",
        name: "Ideal 5000",
        tagline: { en: "5 chambers, 70 mm, triple sealing — the everyday window." },
        description: {
          en: "Windows that combine modern design with very good technical parameters. The Ideal 5000 system has triple sealing, and it is also available in a version with a lower frame that lets more light into the room. The Uw value refers to a 1230 × 1480 mm reference window.",
          de: "Fenster, die modernes Design mit sehr guten technischen Parametern verbinden. Das System Ideal 5000 verfügt über eine dreifache Abdichtung. Es ist auch in einer Version mit einem niedrigeren Rahmen erhältlich, mit dem jeder Raum leicht beleuchtet werden kann. Der angegebene Uw-Wert bezieht sich auf ein Referenzfenster von 1230 × 1480 mm.",
        },
        specs: [
          {
            label: { en: "Frame depth", de: "Einbautiefe" },
            value: "70",
            unit: "mm",
            highlight: true,
          },
          {
            label: {
              en: "Uw for Ug 0.7 (Swisspacer Ultimate warm edge)",
              de: "Uw für Ug 0,7 (warme Kante Swisspacer Ultimate)",
            },
            value: "0.94",
            unit: "W/m²K",
            highlight: true,
          },
          { label: { en: "Chambers", de: "Kammern" }, value: "5", highlight: true },
          { label: { en: "Seals", de: "Dichtungen" }, value: "3" },
          {
            label: { en: "Glazing packages", de: "Verglasungspakete" },
            value: "up to 41 mm (24 mm standard)",
          },
          {
            label: {
              en: "Security points per sash",
              de: "Einbruchshemmende Punkte pro Flügel",
            },
            value: "2",
          },
          {
            label: { en: "Reinforcement", de: "Stahlarmierung" },
            value: "Open steel (standard)",
          },
          {
            label: { en: "Core colours", de: "Kernfarben" },
            value: "brown, anthracite, white",
          },
        ],
        datasheet: "/pdf/windows/aluplast-ideal-5000.pdf",
        image: "/images/manufacturers/aluplast-ideal-5000.jpg",
      },
      {
        id: "ideal-8000",
        name: "Ideal 8000",
        tagline: { en: "6 chambers, 85 mm — insulation at passive-house level." },
        description: {
          en: "The newest generation. Windows based on the Ideal 8000 system offer thermal and sound insulation at the highest level. The system is also available as the Energeto 8000 Powerdur version, designed for energy-efficient and passive building. The Uw value refers to a 1230 × 1480 mm reference window.",
          de: "Die neueste Generation. Fenster, die auf dem System Ideal 8000 basieren, bieten Wärme- und Schalldämmung auf höchstem Niveau. Das System ist in der Version Energeto 8000 Powerdur erhältlich, die für energieeffizientes und passives Bauen konzipiert ist. Der angegebene Uw-Wert bezieht sich auf ein Referenzfenster von 1230 × 1480 mm.",
        },
        specs: [
          {
            label: { en: "Frame depth", de: "Einbautiefe" },
            value: "85",
            unit: "mm",
            highlight: true,
          },
          {
            label: {
              en: "Uw for Ug 0.5 (Swisspacer Ultimate warm edge)",
              de: "Uw für Ug 0,5 (warme Kante Swisspacer Ultimate)",
            },
            value: "0.74",
            unit: "W/m²K",
            highlight: true,
          },
          { label: { en: "Chambers", de: "Kammern" }, value: "6", highlight: true },
          { label: { en: "Seals", de: "Dichtungen" }, value: "3" },
          {
            label: { en: "Glazing packages", de: "Verglasungspakete" },
            value: "up to 52 mm (48 mm standard)",
          },
          {
            label: {
              en: "Security points per sash",
              de: "Einbruchshemmende Punkte pro Flügel",
            },
            value: "5",
          },
          {
            label: { en: "Reinforcement", de: "Stahlarmierung" },
            value: "Closed steel in the frame",
          },
          {
            label: { en: "Core colours", de: "Kernfarben" },
            value: "brown, anthracite, white",
          },
        ],
        datasheet: "/pdf/windows/aluplast-ideal-8000.pdf",
        image: "/images/manufacturers/aluplast-ideal-8000.jpg",
      },
    ],
  },
  {
    id: "salamander",
    category: "windows",
    name: "Salamander",
    tagline: { en: "German PVC window systems, 76 to 92 mm frame depth." },
    intro: {
      en: "Salamander profiles stand for solid German engineering across three depths — 76, 82 and 92 mm. The BluEvolution 82 sheet is already here; the other lines follow as their documentation arrives. Ask us which one fits your opening and we will quote it.",
    },
    image: "/images/manufacturers/salamander.jpg",
    systems: [
      {
        // El PDF lo escribe "BluEvolution 82"; se respeta la grafía del
        // fabricante, no se "corrige".
        id: "bluevolution-82",
        name: "BluEvolution 82",
        tagline: { en: "6 chambers, 82 mm — built for energy-saving construction." },
        description: {
          en: "Innovative technology and the best thermal parameters are the hallmarks of energy-saving building and the BluEvolution 82 system. With this system we can also offer products with a renovation frame. The Uw value refers to a 1230 × 1480 mm reference window in the best thermal build-up.",
          de: "Innovative Technik und beste Wärmeparameter sind kennzeichnend für energiesparendes Bauen und das System BluEvolution 82. Bei der Wahl dieses Systems bieten wir auch die Möglichkeit, Produkte mit einem Renovierungsrahmen zu wählen. Der Uw-Wert ist für ein 1230 × 1480 mm großes Referenzfenster in der besten thermischen Ausführung angegeben.",
        },
        specs: [
          {
            label: { en: "Frame depth", de: "Einbautiefe" },
            value: "82",
            unit: "mm",
            highlight: true,
          },
          {
            label: {
              en: "Uw for Ug 0.5 (Ultimate warm edge)",
              de: "Uw für Ug 0,5 (warme Kante Ultimate)",
            },
            value: "0.74",
            unit: "W/m²K",
            highlight: true,
          },
          { label: { en: "Chambers", de: "Kammern" }, value: "6", highlight: true },
          { label: { en: "Seals", de: "Dichtungen" }, value: "3" },
          {
            label: { en: "Glazing packages", de: "Verglasungspakete" },
            value: "up to 53 mm",
          },
          {
            label: {
              en: "Security points per sash",
              de: "Einbruchshemmende Punkte pro Flügel",
            },
            value: "up to 5",
          },
        ],
        datasheet: "/pdf/windows/salamander-bluevolution-82.pdf",
        image: "/images/manufacturers/salamander-bluevolution-82.jpg",
      },
    ],
  },
  {
    id: "veka",
    category: "windows",
    name: "VEKA",
    tagline: { en: "German PVC window systems." },
    intro: {
      en: "VEKA profiles are joining the range. The manufacturer's sheet for the first system is on its way — until it arrives, this page stays deliberately short: we would rather send you the real numbers than write them from memory. Ask us and we will quote a VEKA window today.",
    },
    image: "/images/manufacturers/veka.jpg",
    systems: [
      {
        // "VEKA – 82" es literal del dueño; la ficha con los datos está
        // en camino. Sin specs a propósito.
        id: "82",
        name: "VEKA 82",
        tagline: {
          en: "The manufacturer's sheet is on its way — ask us about this system today.",
        },
        image: "/images/manufacturers/veka-82.jpg",
      },
    ],
  },
  {
    id: "rehau",
    category: "windows",
    name: "REHAU",
    tagline: { en: "German PVC window systems." },
    intro: {
      en: "REHAU joins the range with the Synego system. The manufacturer's sheet is on its way — until it arrives, this page stays deliberately short: we would rather send you the real numbers than write them from memory. Ask us and we will quote a Synego window today.",
    },
    image: "/images/manufacturers/rehau.jpg",
    systems: [
      {
        id: "synego",
        name: "Synego",
        tagline: {
          en: "The manufacturer's sheet is on its way — ask us about this system today.",
        },
        image: "/images/manufacturers/rehau-synego.jpg",
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
