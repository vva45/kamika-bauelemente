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
      en: "Salamander profiles stand for solid German engineering across three depths — 76, 82 and 92 mm: greenEvolution Flex for flexible new build and renovation, bluEvolution 82 as the energy-saving all-rounder, bluEvolution 92 for passive-house projects. The sliding lines of the same family live under patio doors. Ask us which one fits your opening and we will quote it.",
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
      // Los dos siguientes salen del folleto de sistemas Salamander
      // (salamander-systeme.pdf, autoalojado). Grafía tal y como la
      // imprime: "greenEvolution", "bluEvolution". Los valores son los
      // impresos; la descripción en inglés está redactada aquí, como
      // en el resto de fabricantes.
      {
        id: "greenevolution-flex",
        name: "greenEvolution Flex",
        tagline: { en: "The adaptable 76 mm line — new build or renovation, 2D or 3D." },
        description: {
          en: "One platform, two build-ups: the 2D variant covers cost-efficient new build, the 3D variant adds a third gasket and a sixth chamber in the frame for lower heat loss. Renovation frames of 35 and 65 mm let it replace old windows without breaking out the reveal.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw" }, value: "0.77–1.20", unit: "W/m²K", highlight: true },
          {
            label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)" },
            value: "5–6 / 5",
            highlight: true,
          },
          { label: { en: "Uf (2D / 3D)" }, value: "from 1.3 / from 1.1", unit: "W/m²K" },
          { label: { en: "Seals", de: "Dichtungen" }, value: "2–3" },
          { label: { en: "Glazing packages", de: "Verglasungspakete" }, value: "up to 48 mm" },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw" }, value: "29–38 dB" },
          {
            label: { en: "Variants", de: "Varianten" },
            value: "Standard 2D / 3D, renovation 35 / 65 mm",
          },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=4",
        image: "/images/manufacturers/salamander-greenevolution-flex.jpg",
      },
      {
        id: "bluevolution-92",
        name: "bluEvolution 92",
        tagline: { en: "92 mm and a centre gasket — sized for passive-house builds." },
        description: {
          en: "The warmest line of the family, meant for passive and low-energy construction. The centre gasket improves airtightness and keeps the hardware in a dry chamber, which is what makes fittings last. Takes glazing units up to 61 mm — room for triple glazing with wide spacers.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe" }, value: "92", unit: "mm", highlight: true },
          // El folleto imprime "7,73-1,1": una errata evidente — un
          // rango no puede empezar por encima de donde acaba, y la
          // serie del fabricante publica 0,73 para este sistema (el 82
          // imprime 0,74-1,10 en la misma casilla). Se corrige solo la
          // errata tipográfica, no el dato.
          { label: { en: "Uw" }, value: "0.73–1.1", unit: "W/m²K", highlight: true },
          {
            label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)" },
            value: "6 / 6",
            highlight: true,
          },
          { label: { en: "Uf" }, value: "from 1.0", unit: "W/m²K" },
          { label: { en: "Seals", de: "Dichtungen" }, value: "3, centre gasket" },
          { label: { en: "Glazing packages", de: "Verglasungspakete" }, value: "up to 61 mm" },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw" }, value: "29–38 dB" },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=8",
        image: "/images/manufacturers/salamander-bluevolution-92.jpg",
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
  {
    // La gama de puertas de terraza va por fabricante, igual que las
    // ventanas: es el mismo pedido del dueño ("primero la marca,
    // después lo que ofrece") aplicado a la gama que faltaba. Con esto
    // se van los dos modelos de EJEMPLO que aguantaban la gama — estos
    // tres sistemas son reales, del folleto Salamander autoalojado.
    //
    // Mismo id "salamander" que en ventanas a propósito: es el mismo
    // fabricante; la clave de búsqueda es (categoría, id).
    id: "salamander",
    category: "patio-doors",
    name: "Salamander",
    tagline: { en: "Sliding and lift-and-slide systems, from the same profile family." },
    intro: {
      en: "Three ways to open a living room to the terrace, all on Salamander profiles: evolutionDrive SF where an economical slider is enough, evolutionDrive Plus+ where airtightness matters, and evolutionDrive 82 HST when the opening deserves a lift-and-slide with a flush threshold. Same maker as our window range — frames and terrace doors match in colour and section.",
    },
    image: "/images/manufacturers/salamander-sliding.jpg",
    systems: [
      {
        id: "evolutiondrive-sf",
        name: "evolutionDrive SF",
        tagline: { en: "The economical slider for big, bright openings." },
        description: {
          en: "A light, easy-running sliding system for joining terrace and living room where a highly insulated build-up is not required. Large glass areas, simple operation, solid running gear — the pragmatic way to a wide opening.",
        },
        specs: [
          {
            label: { en: "Opening type", de: "Öffnungsart" },
            value: "Sliding",
            highlight: true,
          },
          { label: { en: "Frame depth", de: "Rahmentiefe" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw" }, value: "from 1.3", unit: "W/m²K", highlight: true },
          { label: { en: "Uf" }, value: "from 1.8", unit: "W/m²K" },
          { label: { en: "Frame / sash height", de: "Rahmen-/Flügelhöhe" }, value: "52 / 88 mm" },
          { label: { en: "Glazing packages", de: "Verglasungspakete" }, value: "up to 28 mm" },
          { label: { en: "Layouts", de: "Schemata" }, value: "A · C · D" },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=10",
        image: "/images/manufacturers/salamander-evolutiondrive-sf.jpg",
      },
      {
        id: "evolutiondrive-plus",
        name: "evolutionDrive Plus+",
        tagline: { en: "The airtight slider, at home in low-energy builds." },
        description: {
          en: "The new-generation sliding system: smooth running, large glass in clean cubic profiles and — its strongest card — very high airtightness, without demanding installation build-ups. Also at home in low-energy and passive projects.",
        },
        specs: [
          {
            label: { en: "Opening type", de: "Öffnungsart" },
            value: "Sliding",
            highlight: true,
          },
          {
            label: { en: "Frame depth", de: "Rahmentiefe" },
            value: "152",
            unit: "mm",
            highlight: true,
          },
          { label: { en: "Uw" }, value: "from 1.5", unit: "W/m²K", highlight: true },
          { label: { en: "Uf" }, value: "from 1.1", unit: "W/m²K" },
          { label: { en: "Frame / sash height", de: "Rahmen-/Flügelhöhe" }, value: "54 / 88 mm" },
          { label: { en: "Glazing packages", de: "Verglasungspakete" }, value: "up to 49 mm" },
          { label: { en: "Layouts", de: "Schemata" }, value: "A · C" },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=12",
        image: "/images/manufacturers/salamander-evolutiondrive-plus.jpg",
      },
      {
        id: "evolutiondrive-82-hst",
        name: "evolutionDrive 82 HST",
        tagline: { en: "Lift-and-slide: the large-format terrace door." },
        description: {
          en: "The lift-and-slide flagship: the sash lifts off its seals and glides sideways, so even very large panels move with one hand. Warmth, tightness and a threshold the floor can run straight over — the door that turns terrace and living room into one space.",
        },
        specs: [
          {
            label: { en: "Opening type", de: "Öffnungsart" },
            value: "Lift-and-slide (HST)",
            highlight: true,
          },
          {
            label: { en: "Frame depth", de: "Einbautiefe" },
            value: "82",
            unit: "mm",
            highlight: true,
          },
          { label: { en: "Uw" }, value: "0.74–1.10", unit: "W/m²K", highlight: true },
          { label: { en: "Uf" }, value: "from 1.0", unit: "W/m²K" },
          {
            label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)" },
            value: "5 / 5",
          },
          { label: { en: "Seals", de: "Dichtungen" }, value: "2" },
          { label: { en: "Glazing packages", de: "Verglasungspakete" }, value: "up to 53 mm" },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw" }, value: "29–38 dB" },
          { label: { en: "Layouts", de: "Schemata" }, value: "A · C · D · G · K" },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=14",
        image: "/images/manufacturers/salamander-evolutiondrive-82-hst.jpg",
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
