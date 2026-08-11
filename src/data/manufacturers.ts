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
    tagline: {
      en: "German PVC window systems, 70 to 85 mm frame depth.",
      de: "Deutsche Kunststoff-Fenstersysteme, 70 bis 85 mm Bautiefe.",
      pl: "Niemieckie systemy okien PVC, głębokość zabudowy 70–85 mm.",
    },
    intro: {
      en: "Aluplast profiles are the base of most of the PVC windows we fit. Two systems cover the range: Ideal 5000 for renovation and everyday new build, Ideal 8000 where thermal and sound insulation have to reach passive-house territory. Which one a house needs is decided when we measure, not from a brochure.",
      de: "Aluplast-Profile sind die Basis der meisten Kunststofffenster, die wir montieren. Zwei Systeme decken das Sortiment ab: Ideal 5000 für Renovierung und den alltäglichen Neubau, Ideal 8000, wo Wärme- und Schallschutz in Passivhaus-Bereiche reichen müssen. Welches ein Haus braucht, entscheidet sich beim Aufmaß, nicht im Prospekt.",
      pl: "Profile Aluplast to podstawa większości montowanych przez nas okien PVC. Dwa systemy pokrywają ofertę: Ideal 5000 do renowacji i typowego nowego budownictwa, Ideal 8000 tam, gdzie izolacyjność cieplna i akustyczna ma sięgać poziomu domów pasywnych. Który potrzebny — decyduje pomiar, nie prospekt.",
    },
    image: "/images/manufacturers/aluplast.jpg",
    systems: [
      {
        id: "ideal-5000",
        name: "Ideal 5000",
        tagline: {
      en: "5 chambers, 70 mm, triple sealing — the everyday window.",
      de: "5 Kammern, 70 mm, dreifache Dichtung — das Fenster für jeden Tag.",
      pl: "5 komór, 70 mm, potrójne uszczelnienie — okno na co dzień.",
    },
        description: {
          en: "Windows that combine modern design with very good technical parameters. The Ideal 5000 system has triple sealing, and it is also available in a version with a lower frame that lets more light into the room. The Uw value refers to a 1230 × 1480 mm reference window.",
          de: "Fenster, die modernes Design mit sehr guten technischen Parametern verbinden. Das System Ideal 5000 verfügt über eine dreifache Abdichtung. Es ist auch in einer Version mit einem niedrigeren Rahmen erhältlich, mit dem jeder Raum leicht beleuchtet werden kann. Der angegebene Uw-Wert bezieht sich auf ein Referenzfenster von 1230 × 1480 mm.",
        },
        specs: [
          {
            label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" },
            value: "70",
            unit: "mm",
            highlight: true,
          },
          {
            label: {
              en: "Uw for Ug 0.7 (Swisspacer Ultimate warm edge)",
              de: "Uw für Ug 0,7 (warme Kante Swisspacer Ultimate)",
              pl: "Uw dla Ug 0,7 (ciepła ramka Swisspacer Ultimate)",
            },
            value: "0.94",
            unit: "W/m²K",
            highlight: true,
          },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "5", highlight: true },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: "3" },
          {
            label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" },
            value: { en: "up to 41 mm (24 mm standard)", de: "bis 41 mm (24 mm Standard)", pl: "do 41 mm (standard 24 mm)" },
          },
          {
            label: {
              en: "Security points per sash",
              de: "Einbruchshemmende Punkte pro Flügel",
              pl: "Punkty antywyważeniowe na skrzydło",
            },
            value: "2",
          },
          {
            label: { en: "Reinforcement", de: "Stahlarmierung", pl: "Wzmocnienie stalowe" },
            value: { en: "Open steel (standard)", de: "Offener Stahl (Standard)", pl: "Stal otwarta (standard)" },
          },
          {
            label: { en: "Core colours", de: "Kernfarben", pl: "Kolory rdzenia" },
            value: { en: "brown, anthracite, white", de: "Braun, Anthrazit, Weiß", pl: "brąz, antracyt, biel" },
          },
        ],
        datasheet: "/pdf/windows/aluplast-ideal-5000.pdf",
        image: "/images/manufacturers/aluplast-ideal-5000.jpg",
      },
      {
        id: "ideal-8000",
        name: "Ideal 8000",
        tagline: {
      en: "6 chambers, 85 mm — insulation at passive-house level.",
      de: "6 Kammern, 85 mm — Dämmung auf Passivhaus-Niveau.",
      pl: "6 komór, 85 mm — izolacja na poziomie domu pasywnego.",
    },
        description: {
          en: "The newest generation. Windows based on the Ideal 8000 system offer thermal and sound insulation at the highest level. The system is also available as the Energeto 8000 Powerdur version, designed for energy-efficient and passive building. The Uw value refers to a 1230 × 1480 mm reference window.",
          de: "Die neueste Generation. Fenster, die auf dem System Ideal 8000 basieren, bieten Wärme- und Schalldämmung auf höchstem Niveau. Das System ist in der Version Energeto 8000 Powerdur erhältlich, die für energieeffizientes und passives Bauen konzipiert ist. Der angegebene Uw-Wert bezieht sich auf ein Referenzfenster von 1230 × 1480 mm.",
        },
        specs: [
          {
            label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" },
            value: "85",
            unit: "mm",
            highlight: true,
          },
          {
            label: {
              en: "Uw for Ug 0.5 (Swisspacer Ultimate warm edge)",
              de: "Uw für Ug 0,5 (warme Kante Swisspacer Ultimate)",
              pl: "Uw dla Ug 0,5 (ciepła ramka Swisspacer Ultimate)",
            },
            value: "0.74",
            unit: "W/m²K",
            highlight: true,
          },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "6", highlight: true },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: "3" },
          {
            label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" },
            value: { en: "up to 52 mm (48 mm standard)", de: "bis 52 mm (48 mm Standard)", pl: "do 52 mm (standard 48 mm)" },
          },
          {
            label: {
              en: "Security points per sash",
              de: "Einbruchshemmende Punkte pro Flügel",
              pl: "Punkty antywyważeniowe na skrzydło",
            },
            value: "5",
          },
          {
            label: { en: "Reinforcement", de: "Stahlarmierung", pl: "Wzmocnienie stalowe" },
            value: { en: "Closed steel in the frame", de: "Geschlossener Stahl im Rahmen", pl: "Stal zamknięta w ramie" },
          },
          {
            label: { en: "Core colours", de: "Kernfarben", pl: "Kolory rdzenia" },
            value: { en: "brown, anthracite, white", de: "Braun, Anthrazit, Weiß", pl: "brąz, antracyt, biel" },
          },
        ],
        datasheet: "/pdf/windows/aluplast-ideal-8000.pdf",
        image: "/images/manufacturers/aluplast-ideal-8000.jpg",
      },
      {
        // Del catálogo IGLO autoalojado (hoja 17): el pliego lo firma
        // Aluplast, así que el sistema cuelga de su fabricante — no de
        // IGLO, que es la familia propia del proveedor del catálogo.
        id: "ideal-neo-md",
        name: "Ideal Neo MD",
        tagline: {
          en: "Slim, symmetrical profiles — the newest system in the catalogue.",
          de: "Schlanke, symmetrische Profile — die Neuheit im Katalog.",
          pl: "Smukłe, symetryczne profile — nowość w katalogu.",
        },
        description: {
          en: "Slim and symmetrical profiles follow current design trends and give the windows lightness and elegance. Extremely narrow profile combinations bring even more light into the rooms — an attractive solution for new builds and renovation alike.",
          de: "Schlanke und symmetrische Profile verweisen auf aktuelle Designtrends und verleihen den Fenstern Leichtigkeit und Eleganz. Extrem schmale Profilkombinationen sorgen für noch mehr Licht in den Räumen. Eine attraktive Lösung sowohl für den Neubau als auch für die Renovierung.",
          pl: "Smukłe i symetryczne profile odpowiadają aktualnym trendom wzorniczym i nadają oknom lekkość oraz elegancję. Wyjątkowo wąskie zestawienia profili wpuszczają do pomieszczeń jeszcze więcej światła — atrakcyjne rozwiązanie zarówno w nowym budownictwie, jak i przy renowacji.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.76", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "6", highlight: true },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw", pl: "Izolacyjność akustyczna Rw" }, value: { en: "up to 36 dB", de: "bis 36 dB", pl: "do 36 dB" } },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Triple, Ug 0.5 W/m²K, argon-filled", de: "3-fach, Ug 0,5 W/m²K, argongefüllt", pl: "Potrójna, Ug 0,5 W/m²K, z argonem" } },
          { label: { en: "Weld", de: "Schweißnaht", pl: "Zgrzew" }, value: "V-Perfect" },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=17",
        image: "/images/manufacturers/aluplast-ideal-neo-md.jpg",
      },
    ],
  },
  {
    id: "salamander",
    category: "windows",
    name: "Salamander",
    tagline: {
      en: "German PVC window systems, 76 to 92 mm frame depth.",
      de: "Deutsche Kunststoff-Fenstersysteme, 76 bis 92 mm Bautiefe.",
      pl: "Niemieckie systemy okien PVC, głębokość zabudowy 76–92 mm.",
    },
    intro: {
      en: "Salamander profiles stand for solid German engineering across three depths — 76, 82 and 92 mm: greenEvolution Flex for flexible new build and renovation, bluEvolution 82 as the energy-saving all-rounder, bluEvolution 92 for passive-house projects. The sliding lines of the same family live under patio doors. Ask us which one fits your opening and we will quote it.",
      de: "Salamander-Profile stehen für solide deutsche Ingenieursarbeit in drei Bautiefen — 76, 82 und 92 mm: greenEvolution Flex für flexiblen Neubau und Renovierung, bluEvolution 82 als energiesparender Allrounder, bluEvolution 92 für Passivhaus-Projekte. Die Schiebelinien derselben Familie stehen unter Terrassentüren. Fragen Sie uns, welches zu Ihrer Öffnung passt — wir machen Ihnen ein Angebot.",
      pl: "Profile Salamander to solidna niemiecka inżynieria w trzech głębokościach — 76, 82 i 92 mm: greenEvolution Flex do elastycznego nowego budownictwa i renowacji, bluEvolution 82 jako energooszczędny uniwersał, bluEvolution 92 do projektów pasywnych. Linie przesuwne tej samej rodziny znajdziesz w drzwiach tarasowych. Zapytaj, który pasuje do Twojego otworu — przygotujemy ofertę.",
    },
    image: "/images/manufacturers/salamander.jpg",
    systems: [
      {
        // El PDF lo escribe "BluEvolution 82"; se respeta la grafía del
        // fabricante, no se "corrige".
        id: "bluevolution-82",
        name: "BluEvolution 82",
        tagline: {
      en: "6 chambers, 82 mm — built for energy-saving construction.",
      de: "6 Kammern, 82 mm — gebaut für energiesparendes Bauen.",
      pl: "6 komór, 82 mm — stworzony do budownictwa energooszczędnego.",
    },
        description: {
          en: "Innovative technology and the best thermal parameters are the hallmarks of energy-saving building and the BluEvolution 82 system. With this system we can also offer products with a renovation frame. The Uw value refers to a 1230 × 1480 mm reference window in the best thermal build-up.",
          de: "Innovative Technik und beste Wärmeparameter sind kennzeichnend für energiesparendes Bauen und das System BluEvolution 82. Bei der Wahl dieses Systems bieten wir auch die Möglichkeit, Produkte mit einem Renovierungsrahmen zu wählen. Der Uw-Wert ist für ein 1230 × 1480 mm großes Referenzfenster in der besten thermischen Ausführung angegeben.",
        },
        specs: [
          {
            label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" },
            value: "82",
            unit: "mm",
            highlight: true,
          },
          {
            label: {
              en: "Uw for Ug 0.5 (Ultimate warm edge)",
              de: "Uw für Ug 0,5 (warme Kante Ultimate)",
              pl: "Uw dla Ug 0,5 (ciepła ramka Ultimate)",
            },
            value: "0.74",
            unit: "W/m²K",
            highlight: true,
          },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "6", highlight: true },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: "3" },
          {
            label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" },
            value: { en: "up to 53 mm", de: "bis 53 mm", pl: "do 53 mm" },
          },
          {
            label: {
              en: "Security points per sash",
              de: "Einbruchshemmende Punkte pro Flügel",
              pl: "Punkty antywyważeniowe na skrzydło",
            },
            value: { en: "up to 5", de: "bis zu 5", pl: "do 5" },
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
        tagline: {
      en: "The adaptable 76 mm line — new build or renovation, 2D or 3D.",
      de: "Die anpassungsfähige 76-mm-Linie — Neubau oder Renovierung, 2D oder 3D.",
      pl: "Elastyczna linia 76 mm — nowy budynek albo renowacja, 2D albo 3D.",
    },
        description: {
          en: "One platform, two build-ups: the 2D variant covers cost-efficient new build, the 3D variant adds a third gasket and a sixth chamber in the frame for lower heat loss. Renovation frames of 35 and 65 mm let it replace old windows without breaking out the reveal.",
          de: "Eine Plattform, zwei Aufbauten: Die 2D-Variante deckt den wirtschaftlichen Neubau ab, die 3D-Variante ergänzt eine dritte Dichtung und eine sechste Kammer im Rahmen für geringere Wärmeverluste. Renovierungsrahmen mit 35 und 65 mm ersetzen alte Fenster, ohne die Laibung aufzubrechen.",
          pl: "Jedna platforma, dwa układy: wariant 2D pokrywa ekonomiczne nowe budownictwo, wariant 3D dodaje trzecią uszczelkę i szóstą komorę w ramie dla mniejszych strat ciepła. Ramy renowacyjne 35 i 65 mm pozwalają wymienić stare okna bez kucia ościeży.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw" }, value: { en: "0.77–1.20", de: "0,77–1,20", pl: "0,77–1,20" }, unit: "W/m²K", highlight: true },
          {
            label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" },
            value: "5–6 / 5",
            highlight: true,
          },
          { label: { en: "Uf (2D / 3D)" }, value: { en: "from 1.3 / from 1.1", de: "ab 1,3 / ab 1,1", pl: "od 1,3 / od 1,1" }, unit: "W/m²K" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: "2–3" },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "up to 48 mm", de: "bis 48 mm", pl: "do 48 mm" } },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw", pl: "Izolacyjność akustyczna Rw" }, value: "29–38 dB" },
          {
            label: { en: "Variants", de: "Varianten", pl: "Warianty" },
            value: { en: "Standard 2D / 3D, renovation 35 / 65 mm", de: "Standard 2D / 3D, Renovierung 35 / 65 mm", pl: "Standard 2D / 3D, renowacja 35 / 65 mm" },
          },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=4",
        image: "/images/manufacturers/salamander-greenevolution-flex.jpg",
      },
      {
        id: "bluevolution-92",
        name: "bluEvolution 92",
        tagline: {
      en: "92 mm and a centre gasket — sized for passive-house builds.",
      de: "92 mm und Mitteldichtung — ausgelegt für Passivhaus-Projekte.",
      pl: "92 mm i uszczelka środkowa — wymiar dla domów pasywnych.",
    },
        description: {
          en: "The warmest line of the family, meant for passive and low-energy construction. The centre gasket improves airtightness and keeps the hardware in a dry chamber, which is what makes fittings last. Takes glazing units up to 61 mm — room for triple glazing with wide spacers.",
          de: "Die wärmste Linie der Familie, gedacht für passives und energiesparendes Bauen. Die Mitteldichtung verbessert die Dichtheit und hält die Beschläge in einer trockenen Kammer — das lässt sie lange leben. Nimmt Glaspakete bis 61 mm auf: Platz für Dreifachverglasung mit breiten Abstandhaltern.",
          pl: "Najcieplejsza linia rodziny, przeznaczona do budownictwa pasywnego i energooszczędnego. Uszczelka środkowa poprawia szczelność i trzyma okucia w suchej komorze — dzięki temu służą latami. Przyjmuje pakiety szybowe do 61 mm: miejsce na trzy szyby z szerokimi ramkami.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "92", unit: "mm", highlight: true },
          // El folleto imprime "7,73-1,1": una errata evidente — un
          // rango no puede empezar por encima de donde acaba, y la
          // serie del fabricante publica 0,73 para este sistema (el 82
          // imprime 0,74-1,10 en la misma casilla). Se corrige solo la
          // errata tipográfica, no el dato.
          { label: { en: "Uw" }, value: { en: "0.73–1.1", de: "0,73–1,1", pl: "0,73–1,1" }, unit: "W/m²K", highlight: true },
          {
            label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" },
            value: "6 / 6",
            highlight: true,
          },
          { label: { en: "Uf" }, value: { en: "from 1.0", de: "ab 1,0", pl: "od 1,0" }, unit: "W/m²K" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3, centre gasket", de: "3, Mitteldichtung", pl: "3, uszczelka środkowa" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "up to 61 mm", de: "bis 61 mm", pl: "do 61 mm" } },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw", pl: "Izolacyjność akustyczna Rw" }, value: "29–38 dB" },
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
    tagline: {
      en: "German PVC window systems.",
      de: "Deutsche Kunststoff-Fenstersysteme.",
      pl: "Niemieckie systemy okien PVC.",
    },
    intro: {
      en: "VEKA profiles are joining the range. The manufacturer's sheet for the first system is on its way — until it arrives, this page stays deliberately short: we would rather send you the real numbers than write them from memory. Ask us and we will quote a VEKA window today.",
      de: "VEKA-Profile kommen ins Sortiment. Das Herstellerdatenblatt zum ersten System ist unterwegs — bis es da ist, bleibt diese Seite bewusst kurz: Lieber schicken wir Ihnen die echten Zahlen, als sie aus dem Gedächtnis zu schreiben. Fragen Sie uns — ein VEKA-Fenster bieten wir Ihnen schon heute an.",
      pl: "Profile VEKA dołączają do oferty. Karta producenta dla pierwszego systemu jest w drodze — do tego czasu ta strona celowo pozostaje krótka: wolimy przesłać prawdziwe liczby, niż pisać je z pamięci. Zapytaj — okno VEKA wycenimy już dziś.",
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
          de: "Das Herstellerdatenblatt ist unterwegs — fragen Sie uns schon heute nach diesem System.",
          pl: "Karta producenta jest w drodze — zapytaj o ten system już dziś.",
        },
        image: "/images/manufacturers/veka-82.jpg",
      },
    ],
  },
  {
    id: "rehau",
    category: "windows",
    name: "REHAU",
    tagline: {
      en: "German PVC window systems.",
      de: "Deutsche Kunststoff-Fenstersysteme.",
      pl: "Niemieckie systemy okien PVC.",
    },
    intro: {
      en: "REHAU joins the range with the Synego system. The manufacturer's sheet is on its way — until it arrives, this page stays deliberately short: we would rather send you the real numbers than write them from memory. Ask us and we will quote a Synego window today.",
      de: "REHAU kommt mit dem System Synego ins Sortiment. Das Herstellerdatenblatt ist unterwegs — bis es da ist, bleibt diese Seite bewusst kurz: Lieber schicken wir Ihnen die echten Zahlen, als sie aus dem Gedächtnis zu schreiben. Fragen Sie uns — ein Synego-Fenster bieten wir Ihnen schon heute an.",
      pl: "REHAU dołącza do oferty z systemem Synego. Karta producenta jest w drodze — do tego czasu ta strona celowo pozostaje krótka: wolimy przesłać prawdziwe liczby, niż pisać je z pamięci. Zapytaj — okno Synego wycenimy już dziś.",
    },
    image: "/images/manufacturers/rehau.jpg",
    systems: [
      {
        id: "synego",
        name: "Synego",
        tagline: {
          en: "The manufacturer's sheet is on its way — ask us about this system today.",
          de: "Das Herstellerdatenblatt ist unterwegs — fragen Sie uns schon heute nach diesem System.",
          pl: "Karta producenta jest w drodze — zapytaj o ten system już dziś.",
        },
        image: "/images/manufacturers/rehau-synego.jpg",
      },
    ],
  },
  {
    /**
     * IGLO es la familia de SISTEMAS del proveedor del catálogo
     * autoalojado — el fabricante en sí no se nombra en la web por
     * decisión del dueño ("make sure the … name is not visible"), igual
     * que en los catálogos de persianas. La marca de sistema sí puede
     * verse: está impresa en cada pliego y sin ella no habría forma de
     * citar el catálogo. Specs copiadas de sus páginas, nunca de
     * memoria; cada ficha enlaza al pliego exacto.
     */
    id: "iglo",
    category: "windows",
    name: "IGLO",
    tagline: {
      en: "PVC window systems from Uw 0.66 W/m²K.",
      de: "PVC-Fenstersysteme ab Uw 0,66 W/(m²K).",
      pl: "Systemy okien PVC od Uw 0,66 W/(m²K).",
    },
    intro: {
      en: "The IGLO family covers seven PVC window lines, from the economical 5-chamber systems to the 82 mm flagship with a Uw value of 0.66 W/m²K — including outward-opening systems and an aluminium-clad variant. All profiles are A-class, made from primary raw material; every figure below comes from the self-hosted catalogue, and each system links to its exact page.",
      de: "Die IGLO-Familie umfasst sieben PVC-Fensterlinien, von den wirtschaftlichen 5-Kammer-Systemen bis zum 82-mm-Flaggschiff mit Uw = 0,66 W/(m²K) — inklusive nach außen öffnender Systeme und einer Variante mit Aluschale. Alle Profile sind A-Klasse aus primärem Rohstoff; jede Zahl unten stammt aus dem selbst gehosteten Katalog, und jedes System verlinkt auf seine genaue Seite.",
      pl: "Rodzina IGLO to siedem linii okien PVC — od ekonomicznych systemów 5-komorowych po flagowy 82 mm z Uw = 0,66 W/(m²K), łącznie z systemami otwieranymi na zewnątrz i wariantem z nakładką aluminiową. Wszystkie profile są klasy A, z surowca pierwotnego; każda liczba poniżej pochodzi z samodzielnie hostowanego katalogu, a każdy system linkuje do swojej strony.",
    },
    image: "/images/manufacturers/iglo.jpg",
    systems: [
      {
        id: "edge",
        name: "Iglo Edge",
        tagline: {
          en: "82 mm, Uw 0.66 — the square-edged flagship.",
          de: "82 mm, Uw 0,66 — das Flaggschiff mit eckiger Profilform.",
          pl: "82 mm, Uw 0,66 — flagowy system o kanciastej formie.",
        },
        description: {
          en: "The technologically most advanced window of the family, with an outstanding Uw value of 0.66 W/m²K and a modern, square-edged profile. The 7-chamber construction and three EPDM seals, including a central seal in foamed EPDM, are responsible for the excellent insulation figures.",
          de: "Das technologisch fortschrittlichste Fenster der Familie, mit einem hervorragenden Wärmedämmwert von Uw = 0,66 W/(m²K) und moderner, eckiger Profilform. Verantwortlich für die sehr guten Werte sind die 7-Kammer-Konstruktion und die 3 EPDM-Dichtungen inklusive Mitteldichtung aus geschäumtem EPDM.",
          pl: "Najbardziej zaawansowane technologicznie okno rodziny, o znakomitym współczynniku Uw = 0,66 W/(m²K) i nowoczesnej, kanciastej formie profilu. Za bardzo dobre parametry odpowiadają 7-komorowa konstrukcja i 3 uszczelki EPDM, w tym środkowa ze spienionego EPDM.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "82", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.66", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "7", highlight: true },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3 × EPDM, central seal in foamed EPDM", de: "3 × EPDM, Mitteldichtung aus geschäumtem EPDM", pl: "3 × EPDM, uszczelka środkowa ze spienionego EPDM" } },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Triple, Ug 0.5 W/m²K, argon-filled", de: "3-fach, Ug 0,5 W/m²K, argongefüllt", pl: "Potrójna, Ug 0,5 W/m²K, z argonem" } },
          { label: { en: "Hardware", de: "Beschlag", pl: "Okucia" }, value: { en: "MACO Multi-Matic KS", de: "MACO Multi-Matic KS", pl: "MACO Multi-Matic KS" } },
          { label: { en: "Weld", de: "Schweißnaht", pl: "Zgrzew" }, value: "V-Perfect" },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=4",
        image: "/images/manufacturers/iglo-edge.jpg",
      },
      {
        id: "energy",
        name: "Iglo Energy",
        tagline: {
          en: "7 chambers, foamed central seal, Rw up to 46 dB.",
          de: "7 Kammern, geschäumte Mitteldichtung, Rw bis 46 dB.",
          pl: "7 komór, spieniona uszczelka środkowa, Rw do 46 dB.",
        },
        description: {
          en: "An A-class 7-chamber profile made exclusively from primary raw material — the first system with a central seal in foamed EPDM. Available in two variants: Iglo Energy (offset profile, Uw 0.71) and Iglo Energy Classic (semi-offset, Uw 0.73), both with excellent airtightness, sound insulation and wind resistance.",
          de: "Ein A-Klasse-7-Kammer-Profil, ausschließlich aus primären Rohstoffen — das erste System mit einer Mitteldichtung aus geschäumtem EPDM. In zwei Varianten: Iglo Energy (flächenversetzt, Uw 0,71) und Iglo Energy Classic (halbflächenversetzt, Uw 0,73), beide mit hervorragender Wasserdichtigkeit, Schalldämmung und Windwiderständigkeit.",
          pl: "7-komorowy profil klasy A, wyłącznie z surowca pierwotnego — pierwszy system z uszczelką środkową ze spienionego EPDM. Dwa warianty: Iglo Energy (profil licowany, Uw 0,71) i Iglo Energy Classic (półlicowany, Uw 0,73), oba o znakomitej szczelności, akustyce i odporności na wiatr.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "82", unit: "mm", highlight: true },
          { label: { en: "Uw Iglo Energy", de: "Uw Iglo Energy", pl: "Uw Iglo Energy" }, value: "0.71", unit: "W/m²K", highlight: true },
          { label: { en: "Uw Iglo Energy Classic", de: "Uw Iglo Energy Classic", pl: "Uw Iglo Energy Classic" }, value: "0.73", unit: "W/m²K" },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "7", highlight: true },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw", pl: "Izolacyjność akustyczna Rw" }, value: { en: "up to 46 dB", de: "bis 46 dB", pl: "do 46 dB" } },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3 × EPDM, central seal in foamed EPDM", de: "3 × EPDM, Mitteldichtung aus geschäumtem EPDM", pl: "3 × EPDM, uszczelka środkowa ze spienionego EPDM" } },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Triple, Ug 0.5 W/m²K, argon-filled", de: "3-fach, Ug 0,5 W/m²K, argongefüllt", pl: "Potrójna, Ug 0,5 W/m²K, z argonem" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=6",
        image: "/images/manufacturers/iglo-energy.jpg",
      },
      {
        id: "energy-alucover",
        name: "Iglo Energy Alucover",
        tagline: {
          en: "PVC insulation with an aluminium shell outside.",
          de: "PVC-Dämmung mit Aluminium-Verkleidung außen.",
          pl: "Izolacyjność PVC z aluminiową nakładką na zewnątrz.",
        },
        description: {
          en: "Combines the excellent thermal insulation of the Energy profile with an external aluminium shell that increases weather resistance and stiffness. The wide colour range allows an individual style for any facade or interior.",
          de: "Kombiniert die hervorragende Wärmedämmung des Energy-Profils mit einer äußeren Aluminium-Verkleidung, die die Widerstandsfähigkeit und die Statik des Fensters erhöht. Die breite Farbpalette ermöglicht einen individuellen Stil für jede Fassade und jeden Innenraum.",
          pl: "Łączy znakomitą izolacyjność cieplną profilu Energy z zewnętrzną nakładką aluminiową, która zwiększa odporność na warunki atmosferyczne i sztywność okna. Szeroka paleta kolorów pozwala dopasować styl do każdej elewacji i wnętrza.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "93", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.76", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "7", highlight: true },
          { label: { en: "Outer face", de: "Außenseite", pl: "Strona zewnętrzna" }, value: { en: "Aluminium shell, matt RAL finish", de: "Aluminiumschale, Lackierung RAL matt", pl: "Nakładka aluminiowa, lakier RAL mat" } },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3 × EPDM, central seal in foamed EPDM", de: "3 × EPDM, Mitteldichtung aus geschäumtem EPDM", pl: "3 × EPDM, uszczelka środkowa ze spienionego EPDM" } },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Triple, Ug 0.5 W/m²K, argon-filled", de: "3-fach, Ug 0,5 W/m²K, argongefüllt", pl: "Potrójna, Ug 0,5 W/m²K, z argonem" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=7",
        image: "/images/manufacturers/iglo-energy-alucover.jpg",
      },
      {
        id: "iglo-5",
        name: "Iglo 5",
        tagline: {
          en: "The proven 5-chamber system, Rw 44 dB.",
          de: "Das bewährte 5-Kammer-System, Rw 44 dB.",
          pl: "Sprawdzony system 5-komorowy, Rw 44 dB.",
        },
        description: {
          en: "Both variants share the 5-chamber construction that delivers very good insulation values. Iglo 5 (semi-offset) and Iglo 5 Classic (offset) come with an extensive package of options and suit warm and cold climates alike.",
          de: "Beide Varianten teilen sich die 5-Kammer-Konstruktion, die für sehr gute Wärmedämmwerte sorgt. Iglo 5 (halbflächenversetzt) und Iglo 5 Classic (flächenversetzt) kommen mit einem umfangreichen Optionspaket und eignen sich für warme wie kalte Klimazonen.",
          pl: "Oba warianty łączy 5-komorowa konstrukcja zapewniająca bardzo dobre parametry cieplne. Iglo 5 (półlicowany) i Iglo 5 Classic (licowany) mają bogaty pakiet opcji i sprawdzają się w ciepłym i zimnym klimacie.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "70", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.83", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "5", highlight: true },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw", pl: "Izolacyjność akustyczna Rw" }, value: "44", unit: "dB" },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Double, Ug 1.1 W/m²K, argon-filled", de: "2-fach, Ug 1,1 W/m²K, argongefüllt", pl: "Podwójna, Ug 1,1 W/m²K, z argonem" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=9",
        image: "/images/manufacturers/iglo-5.jpg",
      },
      {
        id: "light",
        name: "Iglo Light",
        tagline: {
          en: "A 32 % slimmer mullion — more light, same 70 mm.",
          de: "32 % schmalerer Stulp — mehr Licht bei 70 mm.",
          pl: "O 32% węższy słupek — więcej światła przy 70 mm.",
        },
        description: {
          en: "Even more light: the design of Iglo Light shows in its rounded, slim profile line. Compared with traditional systems the mullion face is 32 % narrower and the sash profile 8 mm slimmer, with a symmetrically placed aluminium handle.",
          de: "Noch mehr Licht: Das Design von Iglo Light zeigt sich in der runden, schlanken Profillinie. Gegenüber traditionellen Systemen ist der Stulp in der Ansichtsbreite 32 % schmaler und das Flügelprofil 8 mm schmaler, mit symmetrisch angeordnetem Aluminiumgriff.",
          pl: "Jeszcze więcej światła: Iglo Light wyróżnia zaokrąglona, smukła linia profili. Względem systemów tradycyjnych słupek jest o 32% węższy w widoku, a profil skrzydła o 8 mm smuklejszy, z symetrycznie osadzoną aluminiową klamką.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "70", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.88", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "5", highlight: true },
          { label: { en: "Mullion face width", de: "Stulp-Ansichtsbreite", pl: "Szerokość słupka w widoku" }, value: { en: "32 % narrower", de: "32 % schmaler", pl: "o 32% węższa" } },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw", pl: "Izolacyjność akustyczna Rw" }, value: "44", unit: "dB" },
          { label: { en: "Weld", de: "Schweißnaht", pl: "Zgrzew" }, value: { en: "V-Perfect only", de: "nur V-Perfect", pl: "tylko V-Perfect" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=11",
        image: "/images/manufacturers/iglo-light.jpg",
      },
      {
        id: "premier",
        name: "Iglo Premier",
        tagline: {
          en: "Outward-opening turn-and-tilt windows.",
          de: "Nach außen öffnende Dreh-Kipp-Fenster.",
          pl: "Okna rozwierno-uchylne otwierane na zewnątrz.",
        },
        description: {
          en: "A modern system of outward-opening turn-and-tilt windows with very good insulation values and high everyday comfort, running on concealed scissor hinges with a DM20 espagnolette lock.",
          de: "Ein modernes System nach außen öffnender Dreh-Kipp-Fenster mit sehr guten Wärmedämmwerten und hohem Nutzungskomfort, mit verdeckt liegenden Scherenscharnieren und DM20-Treibstangenverschluss.",
          pl: "Nowoczesny system okien rozwierno-uchylnych otwieranych na zewnątrz, o bardzo dobrych parametrach cieplnych i wysokim komforcie użytkowania, z ukrytymi zawiasami nożycowymi i zasuwnicą DM20.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "70", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.89", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "5", highlight: true },
          { label: { en: "Opening", de: "Öffnung", pl: "Otwieranie" }, value: { en: "Outward, turn and tilt", de: "Nach außen, Dreh und Kipp", pl: "Na zewnątrz, rozwierno-uchylne" } },
          { label: { en: "Hinges", de: "Scharniere", pl: "Zawiasy" }, value: { en: "Concealed scissor hinges", de: "Verdeckt liegende Scherenscharniere", pl: "Ukryte zawiasy nożycowe" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=13",
        image: "/images/manufacturers/iglo-premier.jpg",
      },
      {
        id: "ext",
        name: "Iglo EXT",
        tagline: {
          en: "Outward-opening windows and balcony doors.",
          de: "Nach außen öffnende Fenster und Balkontüren.",
          pl: "Okna i drzwi balkonowe otwierane na zewnątrz.",
        },
        description: {
          en: "A purpose-built system of outward-opening windows and balcony doors. Attractive design and very good insulation values mean a warmer home with lower heating costs.",
          de: "Das speziell entwickelte System nach außen öffnender Fenster und Balkontüren. Attraktives Design und sehr gute Wärmedämmwerte bedeuten ein wärmeres Zuhause mit niedrigeren Heizkosten.",
          pl: "Specjalnie opracowany system okien i drzwi balkonowych otwieranych na zewnątrz. Atrakcyjny wygląd i bardzo dobre parametry cieplne to cieplejszy dom i niższe koszty ogrzewania.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "70", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.89", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "5", highlight: true },
          { label: { en: "Opening", de: "Öffnung", pl: "Otwieranie" }, value: { en: "Outward", de: "Nach außen", pl: "Na zewnątrz" } },
          { label: { en: "Lock", de: "Verschluss", pl: "Zamknięcie" }, value: { en: "DM20 espagnolette with double roller", de: "DM20-Treibstangenverschluss mit Doppelrolle", pl: "Zasuwnica DM20 z podwójną rolką" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=15",
        image: "/images/manufacturers/iglo-ext.jpg",
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
    tagline: {
      en: "Sliding and lift-and-slide systems, from the same profile family.",
      de: "Schiebe- und Hebe-Schiebe-Systeme aus derselben Profilfamilie.",
      pl: "Systemy przesuwne i podnoszono-przesuwne z tej samej rodziny profili.",
    },
    intro: {
      en: "Three ways to open a living room to the terrace, all on Salamander profiles: evolutionDrive SF where an economical slider is enough, evolutionDrive Plus+ where airtightness matters, and evolutionDrive 82 HST when the opening deserves a lift-and-slide with a flush threshold. Same maker as our window range — frames and terrace doors match in colour and section.",
      de: "Drei Wege, das Wohnzimmer zur Terrasse zu öffnen, alle auf Salamander-Profilen: evolutionDrive SF, wo ein wirtschaftlicher Schieber genügt, evolutionDrive Plus+, wo Dichtheit zählt, und evolutionDrive 82 HST, wenn die Öffnung ein Hebe-Schiebe-System mit flacher Schwelle verdient. Derselbe Hersteller wie bei unseren Fenstern — Rahmen und Terrassentüren passen in Farbe und Ansicht zusammen.",
      pl: "Trzy sposoby otwarcia salonu na taras, wszystkie na profilach Salamander: evolutionDrive SF tam, gdzie wystarczy ekonomiczny system przesuwny, evolutionDrive Plus+ tam, gdzie liczy się szczelność, i evolutionDrive 82 HST, gdy otwór zasługuje na system podnoszono-przesuwny z płaskim progiem. Ten sam producent co nasze okna — ramy i drzwi tarasowe pasują kolorem i przekrojem.",
    },
    image: "/images/manufacturers/salamander-sliding.jpg",
    systems: [
      {
        id: "evolutiondrive-sf",
        name: "evolutionDrive SF",
        tagline: {
      en: "The economical slider for big, bright openings.",
      de: "Der wirtschaftliche Schieber für große, helle Öffnungen.",
      pl: "Ekonomiczny system przesuwny do dużych, jasnych otworów.",
    },
        description: {
          en: "A light, easy-running sliding system for joining terrace and living room where a highly insulated build-up is not required. Large glass areas, simple operation, solid running gear — the pragmatic way to a wide opening.",
          de: "Ein leichtes, leichtgängiges Schiebesystem, das Terrasse und Wohnzimmer verbindet, wo kein hochgedämmter Aufbau nötig ist. Große Glasflächen, einfache Bedienung, solide Lauftechnik — der pragmatische Weg zur breiten Öffnung.",
          pl: "Lekki, łatwo pracujący system przesuwny łączący taras z salonem tam, gdzie nie jest wymagana wysoka izolacyjność. Duże przeszklenia, prosta obsługa, solidny wózek jezdny — pragmatyczna droga do szerokiego otworu.",
        },
        specs: [
          {
            label: { en: "Opening type", de: "Öffnungsart", pl: "Sposób otwierania" },
            value: { en: "Sliding", de: "Schiebetür", pl: "Przesuwne" },
            highlight: true,
          },
          { label: { en: "Frame depth", de: "Rahmentiefe", pl: "Głębokość ramy" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw" }, value: { en: "from 1.3", de: "ab 1,3", pl: "od 1,3" }, unit: "W/m²K", highlight: true },
          { label: { en: "Uf" }, value: { en: "from 1.8", de: "ab 1,8", pl: "od 1,8" }, unit: "W/m²K" },
          { label: { en: "Frame / sash height", de: "Rahmen-/Flügelhöhe", pl: "Wysokość ramy/skrzydła" }, value: "52 / 88 mm" },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "up to 28 mm", de: "bis 28 mm", pl: "do 28 mm" } },
          { label: { en: "Layouts", de: "Schemata", pl: "Schematy" }, value: "A · C · D" },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=10",
        image: "/images/manufacturers/salamander-evolutiondrive-sf.jpg",
      },
      {
        id: "evolutiondrive-plus",
        name: "evolutionDrive Plus+",
        tagline: {
      en: "The airtight slider, at home in low-energy builds.",
      de: "Der dichte Schieber, zu Hause im energiesparenden Bau.",
      pl: "Szczelny system przesuwny, jak w domu w budownictwie energooszczędnym.",
    },
        description: {
          en: "The new-generation sliding system: smooth running, large glass in clean cubic profiles and — its strongest card — very high airtightness, without demanding installation build-ups. Also at home in low-energy and passive projects.",
          de: "Das Schiebesystem der neuen Generation: ruhiger Lauf, große Glasflächen in klaren kubischen Profilen und — seine stärkste Karte — sehr hohe Dichtheit, ohne anspruchsvolle Einbauaufbauten. Auch in energiesparenden und passiven Projekten zu Hause.",
          pl: "System przesuwny nowej generacji: płynna praca, duże przeszklenia w czystych, kubistycznych profilach i — jego najmocniejsza karta — bardzo wysoka szczelność, bez wymagających układów montażowych. U siebie także w projektach energooszczędnych i pasywnych.",
        },
        specs: [
          {
            label: { en: "Opening type", de: "Öffnungsart", pl: "Sposób otwierania" },
            value: { en: "Sliding", de: "Schiebetür", pl: "Przesuwne" },
            highlight: true,
          },
          {
            label: { en: "Frame depth", de: "Rahmentiefe", pl: "Głębokość ramy" },
            value: "152",
            unit: "mm",
            highlight: true,
          },
          { label: { en: "Uw" }, value: { en: "from 1.5", de: "ab 1,5", pl: "od 1,5" }, unit: "W/m²K", highlight: true },
          { label: { en: "Uf" }, value: { en: "from 1.1", de: "ab 1,1", pl: "od 1,1" }, unit: "W/m²K" },
          { label: { en: "Frame / sash height", de: "Rahmen-/Flügelhöhe", pl: "Wysokość ramy/skrzydła" }, value: "54 / 88 mm" },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "up to 49 mm", de: "bis 49 mm", pl: "do 49 mm" } },
          { label: { en: "Layouts", de: "Schemata", pl: "Schematy" }, value: "A · C" },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=12",
        image: "/images/manufacturers/salamander-evolutiondrive-plus.jpg",
      },
      {
        id: "evolutiondrive-82-hst",
        name: "evolutionDrive 82 HST",
        tagline: {
      en: "Lift-and-slide: the large-format terrace door.",
      de: "Hebe-Schiebe: die Terrassentür im Großformat.",
      pl: "Podnoszono-przesuwne: drzwi tarasowe w dużym formacie.",
    },
        description: {
          en: "The lift-and-slide flagship: the sash lifts off its seals and glides sideways, so even very large panels move with one hand. Warmth, tightness and a threshold the floor can run straight over — the door that turns terrace and living room into one space.",
          de: "Das Hebe-Schiebe-Flaggschiff: Der Flügel hebt sich von den Dichtungen und gleitet zur Seite, sodass sich auch sehr große Elemente mit einer Hand bewegen. Wärme, Dichtheit und eine Schwelle, über die der Boden durchlaufen kann — die Tür, die Terrasse und Wohnzimmer zu einem Raum macht.",
          pl: "Flagowy system podnoszono-przesuwny: skrzydło unosi się z uszczelek i przesuwa w bok, więc nawet bardzo duże elementy porusza jedna ręka. Ciepło, szczelność i próg, przez który podłoga może przejść bez uskoku — drzwi, które zamieniają taras i salon w jedną przestrzeń.",
        },
        specs: [
          {
            label: { en: "Opening type", de: "Öffnungsart", pl: "Sposób otwierania" },
            value: { en: "Lift-and-slide (HST)", de: "Hebe-Schiebe (HST)", pl: "Podnoszono-przesuwne (HST)" },
            highlight: true,
          },
          {
            label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" },
            value: "82",
            unit: "mm",
            highlight: true,
          },
          { label: { en: "Uw" }, value: { en: "0.74–1.10", de: "0,74–1,10", pl: "0,74–1,10" }, unit: "W/m²K", highlight: true },
          { label: { en: "Uf" }, value: { en: "from 1.0", de: "ab 1,0", pl: "od 1,0" }, unit: "W/m²K" },
          {
            label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" },
            value: "5 / 5",
          },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: "2" },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "up to 53 mm", de: "bis 53 mm", pl: "do 53 mm" } },
          { label: { en: "Sound insulation Rw", de: "Schalldämmung Rw", pl: "Izolacyjność akustyczna Rw" }, value: "29–38 dB" },
          { label: { en: "Layouts", de: "Schemata", pl: "Schematy" }, value: "A · C · D · G · K" },
        ],
        datasheet: "/pdf/catalogues/salamander-systeme.pdf#page=14",
        image: "/images/manufacturers/salamander-evolutiondrive-82-hst.jpg",
      },
    ],
  },
  {
    // Mismo id "iglo" que en ventanas a propósito: misma familia de
    // sistemas; la clave de búsqueda es (categoría, id), como con
    // Salamander.
    id: "iglo",
    category: "patio-doors",
    name: "IGLO",
    tagline: {
      en: "Lift-and-slide, tilt-and-slide and sliding systems in PVC.",
      de: "Hebe-Schiebe-, Kipp-Schiebe- und Schiebesysteme aus PVC.",
      pl: "Systemy HS, PSK i przesuwne z PVC.",
    },
    intro: {
      en: "Seven terrace systems from the same profile family as the IGLO windows: the HS lift-and-slide for sashes up to 400 kg with a floor-flush threshold, three tilt-and-slide (PSK) lines, the simple Slide for unheated spaces and the new Edge Slide at Uw 0.65 W/m²K. Colour and section match the windows across the facade.",
      de: "Sieben Terrassensysteme aus derselben Profilfamilie wie die IGLO-Fenster: das Hebe-Schiebe-System HS für Flügel bis 400 kg mit bodenbündiger Schwelle, drei Kipp-Schiebe-Linien (PSK), der einfache Slide für unbeheizte Bereiche und der neue Edge Slide mit Uw = 0,65 W/(m²K). Farbe und Ansicht passen über die Fassade zu den Fenstern.",
      pl: "Siedem systemów tarasowych z tej samej rodziny profili co okna IGLO: podnoszono-przesuwny HS do 400 kg skrzydła z progiem równym z posadzką, trzy linie uchylno-przesuwne (PSK), prosty Slide do stref nieogrzewanych i nowy Edge Slide o Uw = 0,65 W/(m²K). Kolor i przekrój pasują do okien na całej elewacji.",
    },
    image: "/images/manufacturers/iglo-terrassen.jpg",
    systems: [
      {
        id: "hs",
        name: "Iglo-HS",
        tagline: {
          en: "Lift-and-slide for sashes up to 400 kg.",
          de: "Hebe-Schiebe für Flügel bis 400 kg.",
          pl: "System podnoszono-przesuwny do 400 kg skrzydła.",
        },
        description: {
          en: "Built for large-format terrace glazing: the extremely rigid construction stays safe even with sashes of up to 400 kg, and the low 60 mm threshold can be recessed flush into the floor. The A-class 7-chamber sash profile is made exclusively from primary raw material.",
          de: "Für großformatige Terrassenverglasungen: Die extrem robuste Konstruktion bleibt auch bei bis zu 400 kg schweren Flügeln sicher, und die niedrige 60-mm-Schwelle kann bodenbündig versenkt werden. Das A-Klasse-7-Kammer-Flügelprofil wird ausschließlich aus primären Rohstoffen gefertigt.",
          pl: "Do wielkoformatowych przeszkleń tarasowych: wyjątkowo sztywna konstrukcja pozostaje bezpieczna nawet przy skrzydłach do 400 kg, a niski próg 60 mm można schować równo z posadzką. 7-komorowy profil skrzydła klasy A powstaje wyłącznie z surowca pierwotnego.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Rahmentiefe", pl: "Głębokość ramy" }, value: "194", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.71", unit: "W/m²K", highlight: true },
          { label: { en: "Max. sash weight", de: "Max. Flügelgewicht", pl: "Maks. ciężar skrzydła" }, value: "400", unit: "kg", highlight: true },
          { label: { en: "Sash depth", de: "Flügeltiefe", pl: "Głębokość skrzydła" }, value: "82", unit: "mm" },
          { label: { en: "Threshold", de: "Schwelle", pl: "Próg" }, value: { en: "60 mm, can be fitted flush with the floor", de: "60 mm, bodenbündig einbaubar", pl: "60 mm, do zabudowy równo z posadzką" } },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Triple, Ug 0.5 W/m²K, argon-filled", de: "3-fach, Ug 0,5 W/m²K, argongefüllt", pl: "Potrójna, Ug 0,5 W/m²K, z argonem" } },
          { label: { en: "Hardware", de: "Beschlag", pl: "Okucia" }, value: { en: "G-U, guide rated 300 kg", de: "G-U, Führung mit 300 kg Tragfähigkeit", pl: "G-U, prowadnica o nośności 300 kg" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=20",
        image: "/images/manufacturers/iglo-hs.jpg",
      },
      {
        id: "hs-alucover",
        name: "Iglo-HS Alucover",
        tagline: {
          en: "The lift-and-slide with an aluminium shell.",
          de: "Das Hebe-Schiebe-System mit Aluschale.",
          pl: "System HS z nakładką aluminiową.",
        },
        description: {
          en: "Combines the thermal insulation of PVC with the best properties of aluminium: the outer shell protects the profile and opens up the full colour range for facade and interior.",
          de: "Kombiniert die Wärmedämmung von PVC mit den besten Eigenschaften von Aluminium: Die äußere Schale schützt das Profil und eröffnet die volle Farbpalette für Fassade und Innenraum.",
          pl: "Łączy izolacyjność cieplną PVC z najlepszymi cechami aluminium: zewnętrzna nakładka chroni profil i otwiera pełną paletę kolorów dla elewacji i wnętrza.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Rahmentiefe", pl: "Głębokość ramy" }, value: "206", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.73", unit: "W/m²K", highlight: true },
          { label: { en: "Outer face", de: "Außenseite", pl: "Strona zewnętrzna" }, value: { en: "Aluminium shell, matt RAL finish", de: "Aluminiumschale, Lackierung RAL matt", pl: "Nakładka aluminiowa, lakier RAL mat" } },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "7", highlight: true },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Triple, Ug 0.5 W/m²K, argon-filled", de: "3-fach, Ug 0,5 W/m²K, argongefüllt", pl: "Potrójna, Ug 0,5 W/m²K, z argonem" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=22",
        image: "/images/manufacturers/iglo-hs-alucover.jpg",
      },
      {
        id: "energy-psk",
        name: "Iglo Energy PSK",
        tagline: {
          en: "Tilt-and-slide on the 82 mm Energy profile.",
          de: "Kipp-Schiebe auf dem 82-mm-Energy-Profil.",
          pl: "Uchylno-przesuwny na profilu Energy 82 mm.",
        },
        description: {
          en: "The tilt-and-slide door on the 7-chamber Energy profile, in the Energy and Energy Classic variants. Maximum daylight for large and small rooms while keeping the very good insulation figures of the profile family.",
          de: "Die Kipp-Schiebe-Tür auf dem 7-Kammer-Energy-Profil, in den Varianten Energy und Energy Classic. Optimaler Lichteinfall für große und kleine Räume bei den sehr guten Dämmwerten der Profilfamilie.",
          pl: "Drzwi uchylno-przesuwne na 7-komorowym profilu Energy, w wariantach Energy i Energy Classic. Maksimum światła dla dużych i małych pomieszczeń przy bardzo dobrych parametrach cieplnych rodziny profili.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "82", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.66", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "7", highlight: true },
          { label: { en: "Opening", de: "Öffnung", pl: "Otwieranie" }, value: { en: "Tilt-and-slide (PSK)", de: "Kipp-Schiebe (PSK)", pl: "Uchylno-przesuwne (PSK)" } },
          { label: { en: "Hardware", de: "Beschlag", pl: "Okucia" }, value: { en: "MACO SKB-S, sashes up to 160 kg", de: "MACO SKB-S, Flügel bis 160 kg", pl: "MACO SKB-S, skrzydła do 160 kg" } },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Triple, Ug 0.5 W/m²K, argon-filled", de: "3-fach, Ug 0,5 W/m²K, argongefüllt", pl: "Potrójna, Ug 0,5 W/m²K, z argonem" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=24",
        image: "/images/manufacturers/iglo-energy-psk.jpg",
      },
      {
        id: "iglo-5-psk",
        name: "Iglo 5 PSK",
        tagline: {
          en: "The economical tilt-and-slide door.",
          de: "Die wirtschaftliche Kipp-Schiebe-Tür.",
          pl: "Ekonomiczne drzwi uchylno-przesuwne.",
        },
        description: {
          en: "The right choice where a room needs proper daylight: an easy-to-use tilt-and-slide system on the 5-chamber profile, with very good thermal and acoustic values for its class.",
          de: "Die richtige Wahl, wo ein Raum richtig Tageslicht braucht: ein einfach zu bedienendes Kipp-Schiebe-System auf dem 5-Kammer-Profil, mit sehr guten Wärme- und Schallschutzwerten seiner Klasse.",
          pl: "Właściwy wybór tam, gdzie pomieszczenie potrzebuje światła dziennego: prosty w obsłudze system uchylno-przesuwny na profilu 5-komorowym, o bardzo dobrych jak na swoją klasę parametrach cieplnych i akustycznych.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "70", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.81", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "5", highlight: true },
          { label: { en: "Opening", de: "Öffnung", pl: "Otwieranie" }, value: { en: "Tilt-and-slide (PSK)", de: "Kipp-Schiebe (PSK)", pl: "Uchylno-przesuwne (PSK)" } },
          { label: { en: "Hardware", de: "Beschlag", pl: "Okucia" }, value: { en: "MACO SKB-S, sashes up to 160 kg", de: "MACO SKB-S, Flügel bis 160 kg", pl: "MACO SKB-S, skrzydła do 160 kg" } },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Double, Ug 1.1 W/m²K, argon-filled", de: "2-fach, Ug 1,1 W/m²K, argongefüllt", pl: "Podwójna, Ug 1,1 W/m²K, z argonem" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=26",
        image: "/images/manufacturers/iglo-5-psk.jpg",
      },
      {
        id: "light-psk",
        name: "Iglo Light PSK",
        tagline: {
          en: "The optically lightest PSK, 75 mm frame face.",
          de: "Die optisch leichteste PSK, 75 mm Rahmenansicht.",
          pl: "Optycznie najlżejszy PSK, rama 75 mm w widoku.",
        },
        description: {
          en: "A purpose-developed system that lets even more daylight into the room: compared with other PSK systems it stands out with its optically light form and a frame face of just 75 mm.",
          de: "Ein speziell entwickeltes System, das noch mehr Tageslicht in die Räume lässt: Gegenüber anderen PSK-Systemen zeichnet es sich durch die optisch leichte Form und eine Rahmenansicht von nur 75 mm aus.",
          pl: "Specjalnie opracowany system wpuszczający do wnętrz jeszcze więcej światła: na tle innych systemów PSK wyróżnia go optycznie lekka forma i rama o szerokości w widoku zaledwie 75 mm.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "70", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.84", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "5", highlight: true },
          { label: { en: "Frame face width", de: "Rahmenansicht", pl: "Szerokość ramy w widoku" }, value: "75", unit: "mm" },
          { label: { en: "Weld", de: "Schweißnaht", pl: "Zgrzew" }, value: "V-Perfect" },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=28",
        image: "/images/manufacturers/iglo-light-psk.jpg",
      },
      {
        id: "slide",
        name: "Iglo Slide",
        tagline: {
          en: "The simple slider for unheated spaces.",
          de: "Der einfache Schieber für unbeheizte Bereiche.",
          pl: "Prosty system przesuwny do stref nieogrzewanych.",
        },
        description: {
          en: "Designed for terrace doors and sliding windows where traditional elements will not fit. Honest about its role: with a 3-chamber profile and brush seals it is intended for spaces without high thermal-insulation requirements.",
          de: "Konzipiert für Terrassentüren und Schiebefenster, wo traditionelle Elemente nicht passen. Ehrlich in seiner Rolle: Mit 3-Kammer-Profil und Bürstendichtung ist es für Bereiche ohne hohe Anforderungen an die Wärmedämmung vorgesehen.",
          pl: "Zaprojektowany do drzwi tarasowych i okien przesuwnych tam, gdzie tradycyjne elementy się nie mieszczą. Uczciwie co do roli: z profilem 3-komorowym i uszczelkami szczotkowymi jest przeznaczony do stref bez wysokich wymagań cieplnych.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "82", unit: "mm", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "3", highlight: true },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "Brush seals", de: "Bürstendichtung", pl: "Szczotkowe" } },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Double, Ug 1.1 W/m²K, argon-filled", de: "2-fach, Ug 1,1 W/m²K, argongefüllt", pl: "Podwójna, Ug 1,1 W/m²K, z argonem" } },
          { label: { en: "Hardware", de: "Beschlag", pl: "Okucia" }, value: { en: "Siegenia, height-adjustable bogies", de: "Siegenia-Systembeschlag mit höhenverstellbaren Laufwagen", pl: "Siegenia, wózki z regulacją wysokości" } },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=29",
        image: "/images/manufacturers/iglo-slide.jpg",
      },
      {
        id: "edge-slide",
        name: "Iglo Edge Slide",
        tagline: {
          en: "The Edge line as a slider — Uw 0.65.",
          de: "Die Edge-Linie als Schieber — Uw 0,65.",
          pl: "Linia Edge w wersji przesuwnej — Uw 0,65.",
        },
        description: {
          en: "The new terrace system in the square-edged Edge design language, with a high insulation value of Uw = 0.65 W/m²K on a 6-chamber profile.",
          de: "Das neue Terrassensystem in der eckigen Formensprache der Edge-Linie, mit einem hohen Wärmedämmwert von Uw = 0,65 W/(m²K) auf 6-Kammer-Profil.",
          pl: "Nowy system tarasowy w kanciastym języku formy linii Edge, o wysokiej izolacyjności Uw = 0,65 W/(m²K) na profilu 6-komorowym.",
        },
        specs: [
          { label: { en: "Frame depth", de: "Rahmentiefe", pl: "Głębokość ramy" }, value: "163", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.65", unit: "W/m²K", highlight: true },
          { label: { en: "Sash depth", de: "Flügelbautiefe", pl: "Głębokość skrzydła" }, value: "82", unit: "mm" },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "6", highlight: true },
          { label: { en: "Standard glazing", de: "Verglasung im Standard", pl: "Szyba w standardzie" }, value: { en: "Triple, Ug 0.5 W/m²K, argon-filled", de: "3-fach, Ug 0,5 W/m²K, argongefüllt", pl: "Potrójna, Ug 0,5 W/m²K, z argonem" } },
          { label: { en: "Weld", de: "Schweißnaht", pl: "Zgrzew" }, value: "V-Perfect" },
        ],
        datasheet: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf#page=31",
        image: "/images/manufacturers/iglo-edge-slide.jpg",
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
