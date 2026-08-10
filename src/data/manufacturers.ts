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
];

export const getManufacturersByCategory = (category: string): Manufacturer[] =>
  MANUFACTURERS.filter((manufacturer) => manufacturer.category === category);

export const getManufacturer = (category: string, id: string): Manufacturer | undefined =>
  MANUFACTURERS.find(
    (manufacturer) => manufacturer.category === category && manufacturer.id === id,
  );

export const getSystem = (manufacturer: Manufacturer, systemId: string) =>
  manufacturer.systems.find((system) => system.id === systemId);
