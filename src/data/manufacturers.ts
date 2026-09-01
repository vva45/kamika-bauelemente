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

/**
 * Rótulos de specs que el Aluminium-Katalog repite en cada ficha
 * (Rahmeneinbautiefe, Flügeleinbautiefe…). Un solo sitio para las
 * traducciones — los VALORES siguen copiados ficha a ficha.
 */
const AL = {
  frameDepth: { en: "Frame installation depth", de: "Rahmeneinbautiefe", pl: "Głębokość zabudowy ościeżnicy" },
  sashDepth: { en: "Sash installation depth", de: "Flügeleinbautiefe", pl: "Głębokość zabudowy skrzydła" },
  glazing: { en: "Glazing thickness", de: "Verglasungsdicke", pl: "Grubość szklenia" },
  minFrame: { en: "Min. visible frame width", de: "Min. sichtbare Rahmenbreite", pl: "Min. widoczna szerokość ościeżnicy" },
  minSash: { en: "Min. visible sash width", de: "Min. sichtbare Flügelbreite", pl: "Min. widoczna szerokość skrzydła" },
  maxSash: { en: "Max. sash dimensions", de: "Max. Flügelabmessungen", pl: "Maks. wymiary skrzydła" },
  maxDoorLeaf: { en: "Max. door leaf (H×W)", de: "Max. Türflügelmaße (H×L)", pl: "Maks. skrzydło drzwi (wys.×szer.)" },
  maxWeight: { en: "Max. sash weight", de: "Max. Flügelgewicht", pl: "Maks. ciężar skrzydła" },
  fireClass: { en: "Fire resistance class", de: "Feuerwiderstandsklasse", pl: "Klasa odporności ogniowej" },
  variants: { en: "Variants", de: "Varianten", pl: "Warianty" },
};

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
    /**
     * Los datos reales llegaron con el catálogo WIKĘD (2026-08): el
     * placeholder "VEKA 82 — ficha en camino" se retira y entran los
     * cuatro sistemas de ventana tal y como los imprime el catálogo
     * autoalojado. Cada cifra sale de su pliego; nada de memoria.
     */
    id: "veka",
    category: "windows",
    name: "VEKA",
    tagline: {
      en: "German PVC window systems, class-A profiles.",
      de: "Deutsche Kunststoff-Fenstersysteme, Profile der Klasse A.",
      pl: "Niemieckie systemy okien PVC, profile klasy A.",
    },
    intro: {
      en: "Four PVC window systems on VEKA profiles, from the economical Perfectline to the 82-mm Softline 82 with a Uw of 0.76 W/m²K. All are class-A profiles with 3-mm outer walls. Every figure below comes from the self-hosted WIKĘD catalogue, and each system links to its exact page.",
      de: "Vier Kunststoff-Fenstersysteme auf VEKA-Profilen, vom wirtschaftlichen Perfectline bis zum 82-mm-Softline 82 mit Uw = 0,76 W/(m²K). Alle Profile sind Klasse A mit 3 mm Außenwandstärke. Jede Zahl unten stammt aus dem selbst gehosteten WIKĘD-Katalog, und jedes System verlinkt auf seine genaue Seite.",
      pl: "Cztery systemy okien PCV na profilach VEKA — od ekonomicznego Perfectline po 82-milimetrowy Softline 82 z Uw = 0,76 W/(m²K). Wszystkie profile są klasy A o ściankach zewnętrznych 3 mm. Każda liczba poniżej pochodzi z samodzielnie hostowanego katalogu WIKĘD, a każdy system linkuje do swojej strony.",
    },
    image: "/images/manufacturers/veka.jpg",
    systems: [
      {
        id: "softline-82",
        name: "VEKA Softline 82",
        tagline: {
          en: "82 mm, Uw 0.76 — the warmest window of the family.",
          de: "82 mm, Uw 0,76 — das wärmste Fenster der Familie.",
          pl: "82 mm, Uw 0,76 — najcieplejsze okno rodziny.",
        },
        description: {
          en: "The flagship VEKA window system: 82 mm of build depth, seven chambers in the frame and six in the sash, and three gaskets including a central one. Takes double and triple glazing packs from 24 to 52 mm.",
          de: "Das Flaggschiff unter den VEKA-Fenstersystemen: 82 mm Bautiefe, sieben Kammern im Rahmen und sechs im Flügel, drei Dichtungen inklusive Mitteldichtung. Nimmt 2- und 3-fach-Glaspakete von 24 bis 52 mm auf.",
          pl: "Flagowy system okienny VEKA: 82 mm głębokości zabudowy, siedem komór w ramie i sześć w skrzydle, system trzech uszczelek z uszczelką środkową. Przyjmuje pakiety 2- i 3-szybowe o grubości 24–52 mm.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "82", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.76", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" }, value: "7 / 6", highlight: true },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "A" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3, centre gasket", de: "3, Mitteldichtung", pl: "3, uszczelka środkowa" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "24–52 mm", de: "24–52 mm", pl: "24–52 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=10",
        image: "/images/manufacturers/veka-softline-82.jpg",
      },
      {
        id: "softline-76-md",
        name: "VEKA Softline 76 MD",
        tagline: {
          en: "76 mm with centre gasket, Uw 0.79.",
          de: "76 mm mit Mitteldichtung, Uw 0,79.",
          pl: "76 mm z uszczelką środkową, Uw 0,79.",
        },
        description: {
          en: "The 76-mm system in its middle-gasket version: five chambers in frame and sash and three seals, the central one keeping the hardware chamber dry. Glazing packs from 18 to 48 mm.",
          de: "Das 76-mm-System in der Mitteldichtungs-Ausführung: fünf Kammern in Rahmen und Flügel und drei Dichtungen — die mittlere hält die Beschlagskammer trocken. Glaspakete von 18 bis 48 mm.",
          pl: "System 76 mm w wersji z uszczelką środkową: pięć komór w ramie i skrzydle oraz trzy uszczelki — środkowa utrzymuje komorę okuć w suchości. Pakiety szybowe 18–48 mm.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.79", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" }, value: "5 / 5", highlight: true },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "A" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3, centre gasket", de: "3, Mitteldichtung", pl: "3, uszczelka środkowa" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "18–48 mm", de: "18–48 mm", pl: "18–48 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=10",
        image: "/images/manufacturers/veka-softline-76-md.jpg",
      },
      {
        id: "softline-76-ad",
        name: "VEKA Softline 76 AD",
        tagline: {
          en: "76 mm with outer seals, Uw 0.82.",
          de: "76 mm mit Anschlagdichtung, Uw 0,82.",
          pl: "76 mm z uszczelkami zewnętrznymi, Uw 0,82.",
        },
        description: {
          en: "The same 76-mm depth with two outer seals instead of the central gasket — the proven, simpler build-up. Five chambers in frame and sash, glazing packs from 18 to 48 mm.",
          de: "Dieselbe 76-mm-Bautiefe mit zwei außenliegenden Dichtungen statt Mitteldichtung — der bewährte, einfachere Aufbau. Fünf Kammern in Rahmen und Flügel, Glaspakete von 18 bis 48 mm.",
          pl: "Ta sama głębokość 76 mm z dwiema uszczelkami zewnętrznymi zamiast środkowej — sprawdzona, prostsza budowa. Pięć komór w ramie i skrzydle, pakiety szybowe 18–48 mm.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.82", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" }, value: "5 / 5", highlight: true },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "A" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "2 outer seals", de: "2 außenliegende Dichtungen", pl: "2 uszczelki zewnętrzne" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "18–48 mm", de: "18–48 mm", pl: "18–48 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=10",
        image: "/images/manufacturers/veka-softline-76-ad.jpg",
      },
      {
        id: "perfectline",
        name: "VEKA Perfectline",
        tagline: {
          en: "The economical 70-mm system, in Standard and Swing.",
          de: "Das wirtschaftliche 70-mm-System, als Standard und Swing.",
          pl: "Ekonomiczny system 70 mm, w wersjach Standard i Swing.",
        },
        description: {
          en: "The entry point to the VEKA range: 70-mm profile, five chambers in frame and sash, two seals including a central one, in two sash designs — the angular Standard and the rounded Swing. Glazing packs from 24 to 40 mm.",
          de: "Der Einstieg in die VEKA-Reihe: 70-mm-Profil, fünf Kammern in Rahmen und Flügel, zwei Dichtungen inklusive Mitteldichtung, in zwei Flügeldesigns — dem kantigen Standard und dem runden Swing. Glaspakete von 24 bis 40 mm.",
          pl: "Wejście do oferty VEKA: profil 70 mm, pięć komór w ramie i skrzydle, dwie uszczelki z uszczelką środkową, w dwóch wersjach skrzydła — kanciastej Standard i zaokrąglonej Swing. Pakiety szybowe 24–40 mm.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "70", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.98", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" }, value: "5 / 5", highlight: true },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "A" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "2, centre gasket", de: "2, mit Mitteldichtung", pl: "2, z uszczelką środkową" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "24–40 mm", de: "24–40 mm", pl: "24–40 mm" } },
          { label: { en: "Sash designs", de: "Flügeldesigns", pl: "Wersje skrzydła" }, value: { en: "Standard and Swing", de: "Standard und Swing", pl: "Standard i Swing" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=10",
        image: "/images/manufacturers/veka-perfectline.jpg",
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
     * Del catálogo WIKĘD (2026-08), como los sistemas VEKA nuevos.
     * Kömmerling imprime clase B en sus tres sistemas y así se
     * transcribe — no se maquilla al alza.
     */
    id: "koemmerling",
    category: "windows",
    name: "Kömmerling",
    tagline: {
      en: "German PVC profiles, up to 88 mm build depth.",
      de: "Deutsche Kunststoffprofile, bis 88 mm Bautiefe.",
      pl: "Niemieckie profile PCV, do 88 mm głębokości zabudowy.",
    },
    intro: {
      en: "Three Kömmerling window systems, from the proven 5-chamber 76 AD to the 88-mm 88 MD with triple gaskets and glazing packs up to 54 mm. Every figure below comes from the self-hosted WIKĘD catalogue, and each system links to its exact page.",
      de: "Drei Kömmerling-Fenstersysteme, vom bewährten 5-Kammer-76 AD bis zum 88-mm-System 88 MD mit drei Dichtungen und Glaspaketen bis 54 mm. Jede Zahl unten stammt aus dem selbst gehosteten WIKĘD-Katalog, und jedes System verlinkt auf seine genaue Seite.",
      pl: "Trzy systemy okienne Kömmerling — od sprawdzonego 5-komorowego 76 AD po 88-milimetrowy 88 MD z trzema uszczelkami i pakietami szybowymi do 54 mm. Każda liczba poniżej pochodzi z samodzielnie hostowanego katalogu WIKĘD, a każdy system linkuje do swojej strony.",
    },
    image: "/images/manufacturers/koemmerling.jpg",
    systems: [
      {
        id: "88-md",
        name: "Kömmerling 88 MD",
        tagline: {
          en: "88 mm and seven chambers, Uw 0.74.",
          de: "88 mm und sieben Kammern, Uw 0,74.",
          pl: "88 mm i siedem komór, Uw 0,74.",
        },
        description: {
          en: "The deepest PVC profile of the range: 88 mm with a 7-chamber build-up and three gaskets including a central one. Takes glazing packs from 24 to 54 mm — room for heavy triple glazing with wide warm-edge spacers.",
          de: "Das tiefste Kunststoffprofil der Reihe: 88 mm mit 7-Kammer-Aufbau und drei Dichtungen inklusive Mitteldichtung. Nimmt Glaspakete von 24 bis 54 mm auf — Platz für schwere 3-fach-Verglasung mit breiten warmen Ramen.",
          pl: "Najgłębszy profil PCV w ofercie: 88 mm, budowa 7-komorowa i trzy uszczelki z uszczelką środkową. Przyjmuje pakiety szybowe 24–54 mm — miejsce na ciężkie pakiety trzyszybowe z szeroką ciepłą ramką.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "88", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.74", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "7", highlight: true },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "B" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3, centre gasket", de: "3, Mitteldichtung", pl: "3, uszczelka środkowa" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "24–54 mm", de: "24–54 mm", pl: "24–54 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=11",
        image: "/images/manufacturers/koemmerling-88-md.jpg",
      },
      {
        id: "76-md",
        name: "Kömmerling 76 MD",
        tagline: {
          en: "76 mm with centre gasket, Uw 0.78.",
          de: "76 mm mit Mitteldichtung, Uw 0,78.",
          pl: "76 mm z uszczelką środkową, Uw 0,78.",
        },
        description: {
          en: "The 76-mm system in the middle-gasket version: six chambers and three seals, the central one protecting the hardware chamber. Glazing packs from 24 to 50 mm.",
          de: "Das 76-mm-System in der Mitteldichtungs-Ausführung: sechs Kammern und drei Dichtungen — die mittlere schützt die Beschlagskammer. Glaspakete von 24 bis 50 mm.",
          pl: "System 76 mm w wersji z uszczelką środkową: sześć komór i trzy uszczelki — środkowa chroni komorę okuć. Pakiety szybowe 24–50 mm.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.78", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "6", highlight: true },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "B" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3, centre gasket", de: "3, Mitteldichtung", pl: "3, uszczelka środkowa" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "24–50 mm", de: "24–50 mm", pl: "24–50 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=11",
        image: "/images/manufacturers/koemmerling-76-md.jpg",
      },
      {
        id: "76-ad",
        name: "Kömmerling 76 AD",
        tagline: {
          en: "76 mm with outer seals, Uw 0.81.",
          de: "76 mm mit Anschlagdichtung, Uw 0,81.",
          pl: "76 mm z uszczelkami zewnętrznymi, Uw 0,81.",
        },
        description: {
          en: "The simpler build-up of the 76-mm family: five chambers and two outer seals. Glazing packs from 24 to 50 mm.",
          de: "Der einfachere Aufbau der 76-mm-Familie: fünf Kammern und zwei außenliegende Dichtungen. Glaspakete von 24 bis 50 mm.",
          pl: "Prostsza budowa rodziny 76 mm: pięć komór i dwie uszczelki zewnętrzne. Pakiety szybowe 24–50 mm.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "76", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.81", unit: "W/m²K", highlight: true },
          { label: { en: "Chambers", de: "Kammern", pl: "Komory" }, value: "5", highlight: true },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "B" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "2 outer seals", de: "2 außenliegende Dichtungen", pl: "2 uszczelki zewnętrzne" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "24–50 mm", de: "24–50 mm", pl: "24–50 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=11",
        image: "/images/manufacturers/koemmerling-76-ad.jpg",
      },
    ],
  },
  {
    /**
     * Sistemas de aluminio del catálogo WIKĘD. PROCURAL es la marca de
     * sistemas impresa en cada pliego; el PE50 es de tabiquería
     * interior y se transcribe como tal.
     */
    id: "procural",
    category: "windows",
    name: "PROCURAL",
    tagline: {
      en: "Aluminium window systems, down to Uw 0.66.",
      de: "Aluminium-Fenstersysteme, bis Uw 0,66.",
      pl: "Aluminiowe systemy okienne, do Uw 0,66.",
    },
    intro: {
      en: "Aluminium windows for large glazing: three PROCURAL Aluline depths from the 78-mm PE78N to the passive-grade PE96 with Uw 0.66 W/m²K, plus an internal partition system. Sashes up to 200 kg and burglar resistance up to RC4 — every figure from the self-hosted WIKĘD catalogue.",
      de: "Aluminiumfenster für große Glasflächen: drei PROCURAL-Aluline-Bautiefen vom 78-mm-PE78N bis zum Passiv-System PE96 mit Uw = 0,66 W/(m²K), dazu ein System für Innenwände. Flügel bis 200 kg und Einbruchhemmung bis RC4 — jede Zahl aus dem selbst gehosteten WIKĘD-Katalog.",
      pl: "Okna aluminiowe do dużych przeszkleń: trzy głębokości PROCURAL Aluline — od 78-milimetrowego PE78N po pasywny PE96 z Uw = 0,66 W/(m²K) — oraz system ścianek wewnętrznych. Skrzydła do 200 kg i klasa antywłamaniowa do RC4 — każda liczba z samodzielnie hostowanego katalogu WIKĘD.",
    },
    image: "/images/manufacturers/procural.jpg",
    systems: [
      {
        id: "aluline-pe96-passive",
        name: "Aluline PE96 Passive",
        tagline: {
          en: "96 mm for passive builds, Uw 0.66.",
          de: "96 mm für Passivbauten, Uw 0,66.",
          pl: "96 mm do budynków pasywnych, Uw 0,66.",
        },
        description: {
          en: "The warmest aluminium window of the range: 96-mm frame with a 62-mm thermal break, watertightness E1950 and burglar resistance up to RC3. Sashes up to 1400×2800 mm or 1700×2400 mm and 200 kg.",
          de: "Das wärmste Aluminiumfenster der Reihe: 96-mm-Rahmen mit 62-mm-Isoliersteg, Schlagregendichtheit E1950 und Einbruchhemmung bis RC3. Flügel bis 1400×2800 mm bzw. 1700×2400 mm und 200 kg.",
          pl: "Najcieplejsze okno aluminiowe w ofercie: rama 96 mm z przekładką termiczną 62 mm, wodoszczelność E1950 i klasa antywłamaniowa do RC3. Skrzydła do 1400×2800 mm lub 1700×2400 mm i 200 kg.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "96", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.66", unit: "W/m²K", highlight: true },
          { label: { en: "Burglar resistance", de: "Einbruchhemmung", pl: "Klasa antywłamaniowa" }, value: "RC2, RC3", highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: { en: "Frame 96 mm / sash 106 mm, 62 mm break", de: "Rahmen 96 mm / Flügel 106 mm, Steg 62 mm", pl: "Ościeżnica 96 mm / skrzydło 106 mm, przekładka 62 mm" } },
          { label: { en: "Watertightness", de: "Schlagregendichtheit", pl: "Wodoszczelność" }, value: "E1950" },
          { label: { en: "Wind load", de: "Windlast", pl: "Obciążenie wiatrem" }, value: "C5" },
          { label: { en: "Max. sash", de: "Max. Flügel", pl: "Maks. skrzydło" }, value: { en: "1400×2800 / 1700×2400 mm, 200 kg", de: "1400×2800 / 1700×2400 mm, 200 kg", pl: "1400×2800 / 1700×2400 mm, 200 kg" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=23",
        image: "/images/manufacturers/procural-aluline-pe96-passive.jpg",
      },
      {
        id: "aluline-pe78n-hi",
        name: "Aluline PE78N HI",
        tagline: {
          en: "78 mm with thermal inserts, Uw 0.74.",
          de: "78 mm mit Thermoeinlagen, Uw 0,74.",
          pl: "78 mm z wkładkami termicznymi, Uw 0,74.",
        },
        description: {
          en: "The insulated HI version of the 78-mm window: Uw 0.74 W/m²K, watertightness E1650 and burglar resistance up to RC4. Sashes up to 1700×2200 mm or 1200×3000 mm and 200 kg.",
          de: "Die gedämmte HI-Version des 78-mm-Fensters: Uw = 0,74 W/(m²K), Schlagregendichtheit E1650 und Einbruchhemmung bis RC4. Flügel bis 1700×2200 mm bzw. 1200×3000 mm und 200 kg.",
          pl: "Docieplona wersja HI okna 78 mm: Uw = 0,74 W/(m²K), wodoszczelność E1650 i klasa antywłamaniowa do RC4. Skrzydła do 1700×2200 mm lub 1200×3000 mm i 200 kg.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "78", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.74", unit: "W/m²K", highlight: true },
          { label: { en: "Burglar resistance", de: "Einbruchhemmung", pl: "Klasa antywłamaniowa" }, value: "RC2, RC3, RC4", highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: { en: "Frame 78 mm / sash 86 mm, 42 mm break", de: "Rahmen 78 mm / Flügel 86 mm, Steg 42 mm", pl: "Ościeżnica 78 mm / skrzydło 86 mm, przekładka 42 mm" } },
          { label: { en: "Watertightness", de: "Schlagregendichtheit", pl: "Wodoszczelność" }, value: "E1650" },
          { label: { en: "Wind load", de: "Windlast", pl: "Obciążenie wiatrem" }, value: "C5" },
          { label: { en: "Max. sash", de: "Max. Flügel", pl: "Maks. skrzydło" }, value: { en: "1700×2200 / 1200×3000 mm, 200 kg", de: "1700×2200 / 1200×3000 mm, 200 kg", pl: "1700×2200 / 1200×3000 mm, 200 kg" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=23",
        image: "/images/manufacturers/procural-aluline-pe78n-hi.jpg",
      },
      {
        id: "aluline-pe78n",
        name: "Aluline PE78N",
        tagline: {
          en: "The 78-mm base system, Uw 0.88.",
          de: "Das 78-mm-Basissystem, Uw 0,88.",
          pl: "Bazowy system 78 mm, Uw 0,88.",
        },
        description: {
          en: "The base version of the 78-mm aluminium window: the same build depth and sizes as the HI, with Uw 0.88 W/m²K. Watertightness E1650, wind load C5, burglar resistance up to RC4.",
          de: "Die Basisversion des 78-mm-Aluminiumfensters: dieselbe Bautiefe und dieselben Maße wie die HI-Version, mit Uw = 0,88 W/(m²K). Schlagregendichtheit E1650, Windlast C5, Einbruchhemmung bis RC4.",
          pl: "Bazowa wersja aluminiowego okna 78 mm: ta sama głębokość zabudowy i wymiary co HI, z Uw = 0,88 W/(m²K). Wodoszczelność E1650, obciążenie wiatrem C5, klasa antywłamaniowa do RC4.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "78", unit: "mm", highlight: true },
          { label: { en: "Uw (reference window)", de: "Uw (Referenzfenster)", pl: "Uw (okno referencyjne)" }, value: "0.88", unit: "W/m²K", highlight: true },
          { label: { en: "Burglar resistance", de: "Einbruchhemmung", pl: "Klasa antywłamaniowa" }, value: "RC2, RC3, RC4", highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: { en: "Frame 78 mm / sash 86 mm, 42 mm break", de: "Rahmen 78 mm / Flügel 86 mm, Steg 42 mm", pl: "Ościeżnica 78 mm / skrzydło 86 mm, przekładka 42 mm" } },
          { label: { en: "Watertightness", de: "Schlagregendichtheit", pl: "Wodoszczelność" }, value: "E1650" },
          { label: { en: "Wind load", de: "Windlast", pl: "Obciążenie wiatrem" }, value: "C5" },
          { label: { en: "Max. sash", de: "Max. Flügel", pl: "Maks. skrzydło" }, value: { en: "1700×2200 / 1200×3000 mm, 200 kg", de: "1700×2200 / 1200×3000 mm, 200 kg", pl: "1700×2200 / 1200×3000 mm, 200 kg" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=23",
        image: "/images/manufacturers/procural-aluline-pe78n.jpg",
      },
      {
        id: "aluline-pe50",
        name: "Aluline PE50",
        tagline: {
          en: "The 52-mm system for internal partitions.",
          de: "Das 52-mm-System für Innenwände.",
          pl: "System 52 mm do ścianek wewnętrznych.",
        },
        description: {
          en: "An interior system: 52-mm profiles for glazed partitions inside the building, where thermal insulation is not the point. Elements up to 1200×2700 mm.",
          de: "Ein Innensystem: 52-mm-Profile für verglaste Trennwände im Gebäude, wo Wärmedämmung nicht der Punkt ist. Elemente bis 1200×2700 mm.",
          pl: "System wewnętrzny: profile 52 mm do przeszklonych ścianek działowych wewnątrz budynku, gdzie izolacyjność termiczna nie gra roli. Elementy do 1200×2700 mm.",
        },
        specs: [
          { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: "52", unit: "mm", highlight: true },
          { label: { en: "Use", de: "Einsatz", pl: "Zastosowanie" }, value: { en: "Internal partition system", de: "Innenwand-System", pl: "System ścianek wewnętrznych" }, highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: { en: "Frame 52 mm / sash 60 mm", de: "Rahmen 52 mm / Flügel 60 mm", pl: "Ościeżnica 52 mm / skrzydło 60 mm" } },
          { label: { en: "Max. element", de: "Max. Element", pl: "Maks. element" }, value: "1200×2700 mm" },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=23",
        image: "/images/manufacturers/procural-aluline-pe50.jpg",
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
    /**
     * Las CINCO marcas de aluminio que siguen (Aluprof, Aliplast,
     * Deceuninck, Cortizo, Reynaers) salen del Aluminium-Katalog
     * autoalojado (aluminium-2026): descripciones alemanas VERBATIM de
     * sus pliegos, specs copiadas de cada TECHNISCHE DATEN, render
     * recortado del pliego (extract_aluminium_system_images.py). Los
     * sistemas correderos de cada marca viven en su entrada gemela de
     * patio-doors, más abajo — mismo id, otra categoría, como
     * Salamander/IGLO/VEKA/PROCURAL.
     */
    id: "aluprof",
    category: "windows",
    name: "Aluprof",
    tagline: {
      en: "Aluminium window systems, from MB-79N to the passive MB-104.",
      de: "Aluminium-Fenstersysteme, vom MB-79N bis zum Passiv-System MB-104.",
      pl: "Aluminiowe systemy okienne, od MB-79N po pasywny MB-104.",
    },
    intro: {
      en: "Aluprof covers the whole aluminium spectrum in our self-hosted Aluminium catalogue: the economical MB-79N, the high-insulation MB-86 family, the MB-104 Passive certified by the Passive House Institute in Darmstadt, the steel-look MB-Ferroline for listed buildings — and certified fire-protection systems from EI 15 to EI 120. Every figure below is copied from the catalogue sheets.",
      de: "Aluprof deckt in unserem selbst gehosteten Aluminium-Katalog das ganze Spektrum ab: das wirtschaftliche MB-79N, die hochgedämmte MB-86-Familie, das vom Passivhausinstitut Darmstadt zertifizierte MB-104 Passive, das Stahloptik-System MB-Ferroline für denkmalgeschützte Gebäude — und zertifizierte Brandschutzsysteme von EI 15 bis EI 120. Jede Zahl unten ist aus den Katalogpliegos kopiert.",
      pl: "Aluprof pokrywa w naszym samodzielnie hostowanym katalogu aluminium całe spektrum: ekonomiczny MB-79N, świetnie izolowaną rodzinę MB-86, certyfikowany przez Instytut Domów Pasywnych w Darmstadt MB-104 Passive, stylizowany na stal MB-Ferroline do budynków zabytkowych — oraz certyfikowane systemy przeciwpożarowe od EI 15 do EI 120. Każda liczba poniżej jest skopiowana z kart katalogu.",
    },
    image: "/images/manufacturers/aluprof.jpg",
    systems: [
      {
        id: "mb-79n",
        name: "MB-79N",
        tagline: {
          en: "Window and door system in ST, SI and E versions.",
          de: "Fenster- und Türsystem in den Varianten ST, SI und E.",
          pl: "System okienno-drzwiowy w wariantach ST, SI i E.",
        },
        description: {
          en: "The highly modern MB-79N window and door system offers outstanding economy with excellent thermal and acoustic insulation that easily meets even the strictest energy standards. It is the perfect base for fixed glazing, turn, tilt and parallel-slide-tilt (PSK) windows, single and double external doors, and representative shopfront and portal installations with integrated doors.",
          de: "Das hochmoderne Fenster- und Türsystem MB-79N bietet eine herausragende Wirtschaftlichkeit bei gleichzeitig exzellenten Parametern im Bereich der Wärme- und Schalldämmung, die selbst strengste energetische Standards mühelos erfüllen. Es ist die perfekte Basis für die präzise Fertigung facettenreicher Bauelemente: von Festverglasungen, Dreh-, Kipp- und Parallel-Schiebe-Kipp-Fenstern (PSK) über ein- und zweiflügelige Außentüren bis hin zu repräsentativen Schaufenster- und Portalanlagen mit integrierten Türen.",
          pl: "Nowoczesny system okienno-drzwiowy MB-79N łączy znakomitą ekonomię z doskonałą izolacyjnością cieplną i akustyczną, z zapasem spełniającą najostrzejsze standardy energetyczne. To idealna baza dla przeszkleń stałych, okien rozwiernych, uchylnych i przesuwno-uchylnych (PSK), drzwi zewnętrznych jedno- i dwuskrzydłowych oraz reprezentacyjnych witryn i portali z drzwiami.",
        },
        specs: [
          { label: AL.frameDepth, value: "70", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "79", unit: "mm", highlight: true },
          { label: AL.variants, value: "MB-79N ST / SI / E", highlight: true },
          { label: AL.glazing, value: "1,5 – 63 mm" },
          { label: AL.minFrame, value: { en: "50.5 mm (door/window)", de: "50,5 mm (Tür/Fenster)", pl: "50,5 mm (drzwi/okno)" } },
          { label: AL.minSash, value: { en: "33.5 mm (door/window)", de: "33,5 mm (Tür/Fenster)", pl: "33,5 mm (drzwi/okno)" } },
          { label: AL.maxSash, value: "H 2700 × L 1700 mm" },
          { label: AL.maxWeight, value: "180 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=6",
        image: "/images/manufacturers/aluprof-mb-79n.jpg",
      },
      {
        id: "mb-79n-casement",
        name: "MB-79N Casement",
        tagline: {
          en: "Outward-opening windows: top hung and side hung.",
          de: "Nach außen öffnende Fenster: Top Hung und Side Hung.",
          pl: "Okna otwierane na zewnątrz: top hung i side hung.",
        },
        description: {
          en: "MB-79N CASEMENT is a technologically advanced window system that guarantees excellent thermal and acoustic insulation and stands out with maximum tightness. This premium solution allows the precise realisation of many construction variants: from elegant fixed glazing through outward-opening turn and tilt windows to highly functional top-hung reversible windows.",
          de: "MB-79N CASEMENT ist ein technologisch fortschrittliches Fenstersystem, das exzellente Werte bei der Wärme- und Schalldämmung garantiert und gleichzeitig durch maximale Dichtigkeit besticht. Diese Premium-Lösung ermöglicht die präzise Realisierung vielfältiger Konstruktionsvarianten: von eleganten Festverglasungen über nach außen öffnende Dreh- und Kippfenster bis hin zu hochfunktionalen Klapp-Dreh-Fenstern.",
          pl: "MB-79N CASEMENT to zaawansowany technologicznie system okienny, który gwarantuje doskonałą izolacyjność cieplną i akustyczną, wyróżniając się przy tym maksymalną szczelnością. To rozwiązanie premium pozwala precyzyjnie realizować różnorodne warianty konstrukcji: od eleganckich przeszkleń stałych, przez otwierane na zewnątrz okna rozwierne i uchylne, po wysoce funkcjonalne okna odwracane.",
        },
        specs: [
          { label: AL.frameDepth, value: "70", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "79", unit: "mm", highlight: true },
          { label: AL.variants, value: "Top Hung / Side Hung", highlight: true },
          { label: AL.glazing, value: { en: "Frame 1.5–54 mm / sash 10.5–63 mm", de: "Blendrahmen 1,5–54 mm / Flügel 10,5–63 mm", pl: "Ościeżnica 1,5–54 mm / skrzydło 10,5–63 mm" } },
          { label: AL.maxDoorLeaf, value: "H 2700/2500 × L 1400/2400 mm" },
          { label: AL.maxWeight, value: "180 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=6",
        image: "/images/manufacturers/aluprof-mb-79n-casement.jpg",
      },
      {
        id: "mb-86-casement",
        name: "MB-86 Casement",
        tagline: {
          en: "Outward-opening windows with standard extra insulation.",
          de: "Nach außen öffnende Fenster, serienmäßig zusatzgedämmt.",
          pl: "Okna otwierane na zewnątrz, seryjnie docieplone.",
        },
        description: {
          en: "MB-86 Casement constructions come with additional insulation elements as standard. This guarantees outstanding top-level thermal insulation under all conditions. Combined with maximum tightness, the system delivers first-class thermal comfort — without compromising on the modern slim-aluminium design and without unnecessarily straining the project budget.",
          de: "Konstruktionen des Systems MB-86 Casement sind bereits serienmäßig mit zusätzlichen Isolationselementen ausgestattet. Dies garantiert unter allen Bedingungen hervorragende Wärmedämmwerte auf Top-Niveau. In Kombination mit maximaler Dichtigkeit sorgt das System für erstklassigen thermischen Komfort – ohne Kompromisse beim modernen Design aus schlankem Aluminium und ohne das Budget Ihres Bauvorhabens unnötig zu belasten.",
          pl: "Konstrukcje systemu MB-86 Casement są seryjnie wyposażone w dodatkowe elementy izolacyjne. Gwarantuje to znakomitą izolacyjność cieplną najwyższej klasy w każdych warunkach. W połączeniu z maksymalną szczelnością system zapewnia pierwszorzędny komfort termiczny — bez kompromisów w nowoczesnym designie ze smukłego aluminium i bez zbędnego obciążania budżetu inwestycji.",
        },
        specs: [
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "86", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "Frame 14–60 mm / sash 18–60 mm", de: "Blendrahmen 14–60 mm / Flügel 18–60 mm", pl: "Ościeżnica 14–60 mm / skrzydło 18–60 mm" }, highlight: true },
          { label: AL.maxDoorLeaf, value: "H 2300 × L 1400 mm" },
          { label: AL.maxWeight, value: "100 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=7",
        image: "/images/manufacturers/aluprof-mb-86-casement.jpg",
      },
      {
        id: "mb-86n",
        name: "MB-86N",
        tagline: {
          en: "Top-class thermal insulation, also as SI version.",
          de: "Wärmedämmung der Spitzenklasse, auch als SI-Variante.",
          pl: "Izolacyjność cieplna najwyższej klasy, także w wersji SI.",
        },
        description: {
          en: "The MB-86N system belongs to the absolute top class of products with outstanding thermal insulation parameters and sets new standards in energy efficiency. We adapt it flexibly to individual wishes — among others with a two-sided handle, an elegant external fixed glazing (FIX) or the nail-fin frame profile developed specifically for the US market.",
          de: "Das System MB-86N gehört zur absoluten Spitzenklasse der Produkte mit herausragenden Wärmedämmparametern und setzt neue Maßstäbe in puncto Energieeffizienz. Wir passen es flexibel an Ihre individuellen Wünsche an – unter anderem mit einem beidseitigen Drücker, einer eleganten außenseitigen Festverglasung (FIX) oder dem speziell für den US-Markt entwickelten Nail-Fin-Rahmenprofil.",
          pl: "System MB-86N należy do absolutnej czołówki produktów o znakomitych parametrach izolacyjności cieplnej i wyznacza nowe standardy efektywności energetycznej. Elastycznie dopasowujemy go do indywidualnych życzeń — m.in. z obustronną klamką, eleganckim zewnętrznym przeszkleniem stałym (FIX) czy profilem ramy nail-fin opracowanym specjalnie na rynek amerykański.",
        },
        specs: [
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: { en: "86 mm (window) / 77 mm (door)", de: "86 mm (Fenster) / 77 mm (Tür)", pl: "86 mm (okno) / 77 mm (drzwi)" }, highlight: true },
          { label: AL.variants, value: "MB-86N / MB-86N SI", highlight: true },
          { label: AL.glazing, value: { en: "Frame 8.5–61 mm / sash 17.5–70 mm", de: "Blendrahmen 8,5–61 mm / Flügel 17,5–70 mm", pl: "Ościeżnica 8,5–61 mm / skrzydło 17,5–70 mm" } },
          { label: AL.maxSash, value: { en: "Window H 2800 × L 1700 mm, door H 3000 × L 1400 mm", de: "Fenster H 2800 × L 1700 mm, Tür H 3000 × L 1400 mm", pl: "Okno H 2800 × L 1700 mm, drzwi H 3000 × L 1400 mm" } },
          { label: AL.maxWeight, value: "150 / 200 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=7",
        image: "/images/manufacturers/aluprof-mb-86n.jpg",
      },
      {
        id: "mb-104-passive",
        name: "MB-104 Passive",
        tagline: {
          en: "Passive-house windows, PHI Darmstadt certified.",
          de: "Passivhaus-Fenster, zertifiziert vom PHI Darmstadt.",
          pl: "Okna pasywne z certyfikatem PHI Darmstadt.",
        },
        description: {
          en: "Windows based on the MB-104 Passive system exceed the strictest thermal insulation requirements — a top value officially confirmed by the renowned certificates of the Passive House Institute PHI Darmstadt. This high-end system perfectly combines forward-looking technical possibilities and maximum thermal protection with timeless design aesthetics.",
          de: "Fenster auf Basis des Systems MB-104 Passive übertreffen die strengsten Anforderungen an die Wärmedämmung – ein Spitzenwert, der offiziell durch die renommierten Zertifikate des Passivhausinstituts PHI Darmstadt bestätigt wurde. Dieses High-End-System verbindet zukunftsweisende technische Möglichkeiten und maximalen Wärmeschutz perfekt mit einer zeitlosen Designästhetik.",
          pl: "Okna na bazie systemu MB-104 Passive przewyższają najostrzejsze wymagania izolacyjności cieplnej — wynik oficjalnie potwierdzony renomowanymi certyfikatami Instytutu Domów Pasywnych PHI Darmstadt. Ten system klasy high-end doskonale łączy przyszłościowe możliwości techniczne i maksymalną ochronę cieplną z ponadczasową estetyką.",
        },
        specs: [
          { label: AL.frameDepth, value: "95", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "104", unit: "mm", highlight: true },
          { label: AL.variants, value: "Aero / SI", highlight: true },
          { label: AL.glazing, value: { en: "Frame 27–72 mm / sash 34.5–81 mm", de: "Blendrahmen 27–72 mm / Flügel 34,5–81 mm", pl: "Ościeżnica 27–72 mm / skrzydło 34,5–81 mm" } },
          { label: AL.maxSash, value: "H 2900 × L 1700 mm" },
          { label: AL.maxWeight, value: "160 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=8",
        image: "/images/manufacturers/aluprof-mb-104-passive.jpg",
      },
      {
        id: "mb-ferroline",
        name: "MB-Ferroline",
        tagline: {
          en: "Steel-window look for heritage renovation.",
          de: "Stahlfenster-Optik für die Denkmalsanierung.",
          pl: "Estetyka okien stalowych do renowacji zabytków.",
        },
        description: {
          en: "Thanks to its striking design, perfectly matched to the aesthetics of traditional steel windows, the Ferroline system is especially suited to demanding renovation of listed buildings. At the same time it offers excellent acoustic and above all thermal insulation — an absolute premium solution for clients looking for something special without compromising on energy efficiency.",
          de: "Dank seines markanten Designs, das perfekt auf die Ästhetik traditioneller Stahlfenster abgestimmt ist, eignet sich das System Ferroline ganz besonders für die anspruchsvolle Sanierung denkmalgeschützter Gebäude. Gleichzeitig bietet es exzellente Schall- und vor allem Wärmedämmwerte. Dies macht es zur absoluten Premium-Lösung für Kunden, die das Besondere suchen, ohne dabei Kompromisse bei der Energieeffizienz eingehen zu müssen.",
          pl: "Dzięki wyrazistemu wzornictwu, idealnie nawiązującemu do estetyki tradycyjnych okien stalowych, system Ferroline szczególnie nadaje się do wymagającej renowacji budynków zabytkowych. Jednocześnie oferuje znakomitą izolacyjność akustyczną, a przede wszystkim cieplną — rozwiązanie premium dla klientów szukających czegoś wyjątkowego bez kompromisów w efektywności energetycznej.",
        },
        specs: [
          { label: AL.frameDepth, value: "110", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "86 – 93,5 mm", highlight: true },
          { label: AL.glazing, value: "13,5 – 61,5 mm", highlight: true },
          { label: AL.maxSash, value: "H 2400 × L 1400 mm" },
          { label: AL.maxWeight, value: "150 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=8",
        image: "/images/manufacturers/aluprof-mb-ferroline.jpg",
      },
      {
        id: "mb-78-ei",
        name: "MB-78 EI",
        tagline: {
          en: "Certified fire protection, EI 30 to EI 60.",
          de: "Zertifizierter Brandschutz, EI 30 bis EI 60.",
          pl: "Certyfikowana ochrona przeciwpożarowa, EI 30 do EI 60.",
        },
        description: {
          en: "The certified MB-78 EI system is the perfect technological base for highly functional fire-protection and room-partition systems indoors and outdoors. It allows the precise fabrication of single and double doors officially classified to the strict European standard DIN EN 13501-2 in the demanding fire resistance classes EI 30 to EI 60.",
          de: "Das zertifizierte System MB-78 EI ist die perfekte technologische Basis für die Realisierung hochfunktionaler Brandschutz- und Raumtrennsysteme im Innen- und Außenbereich. Es ermöglicht die präzise Fertigung von ein- und zweiflügeligen Türen, die nach der strengen europäischen Norm DIN EN 13501-2 offiziell in den anspruchsvollen Feuerwiderstandsklassen EI 30 bis EI 60 klassifiziert sind.",
          pl: "Certyfikowany system MB-78 EI to doskonała baza technologiczna dla wysoce funkcjonalnych systemów przeciwpożarowych i ścianek działowych wewnątrz i na zewnątrz. Pozwala precyzyjnie wykonywać drzwi jedno- i dwuskrzydłowe, oficjalnie sklasyfikowane wg surowej europejskiej normy DIN EN 13501-2 w wymagających klasach odporności ogniowej EI 30 do EI 60.",
        },
        specs: [
          { label: AL.fireClass, value: "EI 30 – EI 60 (DIN EN 13501-2)", highlight: true },
          { label: AL.frameDepth, value: "78", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "78", unit: "mm", highlight: true },
          { label: AL.glazing, value: "6 – 49 mm" },
          { label: AL.maxDoorLeaf, value: "H 2500 × L 1400 mm" },
          { label: AL.maxWeight, value: "250 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=11",
        image: "/images/manufacturers/aluprof-mb-78-ei.jpg",
      },
      {
        id: "mb-60e-ei",
        name: "MB-60E EI",
        tagline: {
          en: "Fire protection EI 15 and EI 30 on a 60-mm base.",
          de: "Brandschutz EI 15 und EI 30 auf 60-mm-Basis.",
          pl: "Ochrona przeciwpożarowa EI 15 i EI 30 na bazie 60 mm.",
        },
        description: {
          en: "MB-60E EI constructions offer reliable protection and are officially certified to the strict European standard DIN EN 13501-2 in fire resistance classes EI 15 and EI 30. The base is formed by highly stable aluminium profiles with a 60-mm-deep thermal break, combined with innovative fire-protection insulators inside the profile chambers — for maximum safety and energy efficiency.",
          de: "Konstruktionen des Systems MB-60E EI bieten verlässlichen Schutz und sind nach der strengen europäischen Norm DIN EN 13501-2 offiziell in den Feuerwiderstandsklassen EI 15 und EI 30 zertifiziert. Die Basis bilden hochstabile Aluminiumprofile mit einer 60 mm tiefen thermischen Trennung, kombiniert mit innovativen Brandschutzisolatoren im Inneren der Profilkammern – für ein Höchstmaß an Sicherheit und Energieeffizienz.",
          pl: "Konstrukcje systemu MB-60E EI zapewniają niezawodną ochronę i są oficjalnie certyfikowane wg surowej europejskiej normy DIN EN 13501-2 w klasach odporności ogniowej EI 15 i EI 30. Bazą są wysoce stabilne profile aluminiowe z przekładką termiczną o głębokości 60 mm, połączone z innowacyjnymi izolatorami przeciwpożarowymi wewnątrz komór profili — dla maksimum bezpieczeństwa i efektywności energetycznej.",
        },
        specs: [
          { label: AL.fireClass, value: "EI 15 / EI 30 (DIN EN 13501-2)", highlight: true },
          { label: AL.frameDepth, value: "60", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "60", unit: "mm", highlight: true },
          { label: AL.glazing, value: "5 – 41 mm" },
          { label: AL.maxDoorLeaf, value: "H 2475 × L 1400 mm" },
          { label: AL.maxWeight, value: "120 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=11",
        image: "/images/manufacturers/aluprof-mb-60e-ei.jpg",
      },
      {
        id: "mb-86-ei",
        name: "MB-86 EI",
        tagline: {
          en: "Fire-protection windows, class EI 30.",
          de: "Brandschutzfenster der Klasse EI 30.",
          pl: "Okna przeciwpożarowe klasy EI 30.",
        },
        description: {
          en: "The MB-86 EI fire-protection system was developed specifically for external fire barriers. It allows fire-protection windows of resistance class EI 30 to the PN-EN 13501-2:2016 standard — a highly effective barrier guaranteed to withstand the spread of fire for at least 30 minutes, for maximum safety and uncompromising building protection.",
          de: "Das Brandschutzsystem MB-86 EI wurde speziell für den Einsatz in äußeren Feuerschutzabschlüssen entwickelt. Es ermöglicht die Erstellung von Brandschutzfenstern der Feuerwiderstandsklasse EI 30 gemäß der Norm PN-EN 13501-2:2016. Damit bieten diese Bauteile eine hochwirksame Barriere, die dem Übergreifen von Feuer garantiert mindestens 30 Minuten lang standhält – für ein Höchstmaß an Sicherheit und kompromisslosen Gebäudeschutz.",
          pl: "System przeciwpożarowy MB-86 EI opracowano specjalnie do zewnętrznych zamknięć ogniowych. Pozwala wykonywać okna przeciwpożarowe klasy odporności EI 30 wg normy PN-EN 13501-2:2016 — wysoce skuteczną barierę, która gwarantowanie powstrzymuje ogień przez co najmniej 30 minut, dla maksimum bezpieczeństwa i bezkompromisowej ochrony budynku.",
        },
        specs: [
          { label: AL.fireClass, value: "EI 30 (PN-EN 13501-2:2016)", highlight: true },
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "86", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 70 mm", de: "bis 70 mm", pl: "do 70 mm" } },
          { label: AL.maxDoorLeaf, value: "H 2500 × L 1400 mm" },
          { label: AL.maxWeight, value: "160 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=12",
        image: "/images/manufacturers/aluprof-mb-86-ei.jpg",
      },
      {
        id: "mb-118-ei",
        name: "MB-118 EI",
        tagline: {
          en: "Fire-protection partitions up to EI 120.",
          de: "Brandschutz-Trennwände bis EI 120.",
          pl: "Przeciwpożarowe ściany działowe do EI 120.",
        },
        description: {
          en: "The MB-118 EI aluminium partitions are a modern fire-protection solution that can be used flexibly as internal and external partitions. The construction is fully system-compatible with MB-78 EI. Fire resistance class EI 120 — for maximum safety at premium level.",
          de: "Die Aluminium-Trennwände MB-118 EI sind eine moderne Brandschutzlösung, die flexibel als Innen- und Außentrennwände eingesetzt werden kann. Die Konstruktion ist vollkommen systemkompatibel mit dem System MB-78 EI. Feuerwiderstandsklasse EI 120 – für höchste Sicherheit auf Premium-Niveau.",
          pl: "Aluminiowe ściany działowe MB-118 EI to nowoczesne rozwiązanie przeciwpożarowe, które można elastycznie stosować jako ściany wewnętrzne i zewnętrzne. Konstrukcja jest w pełni systemowo kompatybilna z MB-78 EI. Klasa odporności ogniowej EI 120 — najwyższe bezpieczeństwo w klasie premium.",
        },
        specs: [
          { label: AL.fireClass, value: "EI 120", highlight: true },
          { label: { en: "Installation depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: "118", unit: "mm", highlight: true },
          { label: { en: "Infill thickness", de: "Füllungsdicke", pl: "Grubość wypełnienia" }, value: "31 – 84 mm", highlight: true },
          { label: AL.maxDoorLeaf, value: "H 3000 × L 1500 mm" },
          { label: AL.maxWeight, value: "410 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=12",
        image: "/images/manufacturers/aluprof-mb-118-ei.jpg",
      },
    ],
  },
  {
    id: "aliplast",
    category: "windows",
    name: "Aliplast",
    tagline: {
      en: "Aluminium windows from Econoline to the slim Max Light.",
      de: "Aluminiumfenster von Econoline bis zum filigranen Max Light.",
      pl: "Okna aluminiowe od Econoline po smukły Max Light.",
    },
    intro: {
      en: "The Aliplast chapter of our self-hosted Aluminium catalogue spans interior partitions (Econoline), the Ecofutural and Imperial mid-range, the warm Genesis and Superial systems, the four-variant slim-profile Max Light, the spring-assisted VS 600 guillotine window — and fire-rated systems FR 65 EI and FR 90 EI. All specs below are copied from the catalogue sheets.",
      de: "Das Aliplast-Kapitel unseres selbst gehosteten Aluminium-Katalogs reicht von Innen-Trennwänden (Econoline) über die Mittelklasse Ecofutural und Imperial, die warmen Systeme Genesis und Superial und das filigrane Vier-Varianten-System Max Light bis zum federunterstützten Guillotine-Fenster VS 600 — dazu die Brandschutzsysteme FR 65 EI und FR 90 EI. Alle Specs unten sind aus den Katalogpliegos kopiert.",
      pl: "Rozdział Aliplast naszego samodzielnie hostowanego katalogu aluminium obejmuje ścianki wewnętrzne (Econoline), klasę średnią Ecofutural i Imperial, ciepłe systemy Genesis i Superial, smukły czterowariantowy Max Light oraz okno typu guillotine VS 600 ze wspomaganiem sprężynowym — a także systemy przeciwpożarowe FR 65 EI i FR 90 EI. Wszystkie parametry poniżej skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/aliplast.jpg",
    systems: [
      {
        id: "econoline",
        name: "Econoline",
        tagline: {
          en: "Interior partitions with corners at any angle.",
          de: "Innen-Trennwände mit Ecken in jedem Winkel.",
          pl: "Ścianki wewnętrzne z narożnikami pod dowolnym kątem.",
        },
        description: {
          en: "The ECONOLINE system, designed primarily for interiors, allows modern partition walls with flexible corner joints at any angle. It combines maximum design freedom with elegant room structuring — the perfect solution for tailor-made, functional room concepts.",
          de: "Das vorrangig für den Innenbereich konzipierte System ECONOLINE ermöglicht die Erstellung moderner Trennwände mit flexibler Eckverbindung in jedem beliebigen Winkel. Es vereint maximale Gestaltungsfreiheit mit eleganter Raumstrukturierung und bietet die perfekte Lösung für maßgeschneiderte, funktionale Raumkonzepte.",
          pl: "System ECONOLINE, zaprojektowany przede wszystkim do wnętrz, pozwala tworzyć nowoczesne ścianki działowe z elastycznym łączeniem narożników pod dowolnym kątem. Łączy maksymalną swobodę projektowania z eleganckim strukturyzowaniem przestrzeni — idealne rozwiązanie dla funkcjonalnych koncepcji na miarę.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "51 mm (door/window)", de: "51 mm (Tür/Fenster)", pl: "51 mm (drzwi/okno)" }, highlight: true },
          { label: AL.sashDepth, value: { en: "60 mm (door) / 51 mm (window)", de: "60 mm (Tür) / 51 mm (Fenster)", pl: "60 mm (drzwi) / 51 mm (okno)" }, highlight: true },
          { label: AL.glazing, value: { en: "up to 37 mm", de: "bis 37 mm", pl: "do 37 mm" }, highlight: true },
          { label: AL.maxDoorLeaf, value: { en: "Single-sash: H 1400 × L 2500 mm; double-sash windows: H 2400 × L 2500 mm", de: "Einflügelig: H 1400 × L 2500 mm; zweiflügelige Fenster: H 2400 × L 2500 mm", pl: "Jednoskrzydłowe: H 1400 × L 2500 mm; okna dwuskrzydłowe: H 2400 × L 2500 mm" } },
          { label: AL.maxWeight, value: "120 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=16",
        image: "/images/manufacturers/aliplast-econoline.jpg",
      },
      {
        id: "ecofutural",
        name: "Ecofutural",
        tagline: {
          en: "The versatile 65-mm window and door base system.",
          de: "Das vielseitige 65-mm-Basissystem für Fenster und Türen.",
          pl: "Wszechstronny bazowy system okienno-drzwiowy 65 mm.",
        },
        description: {
          en: "The Ecofutural system offers maximum design freedom for elegant fixed glazing, single and double turn and turn-tilt windows and inward-opening window elements. It also allows seamless single and double doors as well as highly insulated monoblock windows — combining architectural variety, outstanding functionality and maximum flexibility for modern building projects.",
          de: "Das System Ecofutural bietet maximale Gestaltungsfreiheit für die Fertigung eleganter Festverglasungen, 1- und 2-flügeliger Dreh- und Dreh-Kipp-Fenster sowie nach innen öffnender Fensterelemente. Zudem ermöglicht das System die nahtlose Realisierung von 1- und 2-flügeligen Türen als auch von hochisolierten Monoblock-Fenstern. Damit vereint Ecofutural architektonische Vielfalt, herausragende Funktionalität und maximale Flexibilität für modernste Bauprojekte.",
          pl: "System Ecofutural daje maksymalną swobodę projektowania eleganckich przeszkleń stałych, 1- i 2-skrzydłowych okien rozwiernych i rozwierno-uchylnych oraz elementów otwieranych do wewnątrz. Pozwala też płynnie realizować drzwi 1- i 2-skrzydłowe oraz świetnie izolowane okna monoblock — łącząc różnorodność architektoniczną, znakomitą funkcjonalność i maksymalną elastyczność nowoczesnych inwestycji.",
        },
        specs: [
          { label: AL.frameDepth, value: "65", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "74", unit: "mm", highlight: true },
          { label: AL.glazing, value: "4 – 50 mm / 12 – 59 mm", highlight: true },
          { label: AL.minFrame, value: { en: "61.5 mm (door) / 55–65 mm (window)", de: "61,5 mm (Tür) / 55–65 mm (Fenster)", pl: "61,5 mm (drzwi) / 55–65 mm (okno)" } },
          { label: AL.minSash, value: { en: "88.5 mm (door) / from 40 mm (window)", de: "88,5 mm (Tür) / ab 40 mm (Fenster)", pl: "88,5 mm (drzwi) / od 40 mm (okno)" } },
          { label: AL.maxDoorLeaf, value: "H 1400 × L 2600 mm" },
          { label: AL.maxWeight, value: { en: "150 kg (door) / 120 kg (window)", de: "150 kg (Tür) / 120 kg (Fenster)", pl: "150 kg (drzwi) / 120 kg (okno)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=16",
        image: "/images/manufacturers/aliplast-ecofutural.jpg",
      },
      {
        id: "ecofutural-oc",
        name: "Ecofutural OC",
        tagline: {
          en: "Concealed profile geometry, very good insulation.",
          de: "Verdeckte Profilgeometrie, sehr gute Dämmwerte.",
          pl: "Ukryta geometria profili, bardzo dobra izolacyjność.",
        },
        description: {
          en: "The ECOFUTURAL OC window and door system stands out clearly in the aluminium segment with its very good thermal insulation values. Aesthetically, its special frame geometry — concealing the full profile height — makes it a highly attractive solution.",
          de: "Das Fenster- und Türsystem ECOFUTURAL OC hebt sich im Segment der Aluminiumlösungen durch seine sehr guten Wärmedämmwerte deutlich ab. In ästhetischer Hinsicht stellt es dank der speziellen Rahmengeometrie, die die gesamte Profilhöhe verdeckt, eine äußerst attraktive Lösung dar.",
          pl: "System okienno-drzwiowy ECOFUTURAL OC wyraźnie wyróżnia się w segmencie aluminium bardzo dobrymi parametrami izolacyjności cieplnej. Estetycznie, dzięki specjalnej geometrii ramy zakrywającej całą wysokość profilu, stanowi niezwykle atrakcyjne rozwiązanie.",
        },
        specs: [
          { label: AL.frameDepth, value: "65", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "74", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "Frame 4–50 mm / sash 12–59 mm", de: "Blendrahmen 4–50 mm / Flügel 12–59 mm", pl: "Ościeżnica 4–50 mm / skrzydło 12–59 mm" }, highlight: true },
          { label: AL.maxDoorLeaf, value: "H 2150 × L 1200 mm" },
          { label: AL.maxWeight, value: { en: "120 kg (door) / 150 kg (window)", de: "120 kg (Tür) / 150 kg (Fenster)", pl: "120 kg (drzwi) / 150 kg (okno)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=17",
        image: "/images/manufacturers/aliplast-ecofutural-oc.jpg",
      },
      {
        id: "imperial",
        name: "Imperial",
        tagline: {
          en: "Energy-efficient profiles, also for arched specials.",
          de: "Energieeffiziente Profile, auch für Rundbögen.",
          pl: "Energooszczędne profile, także do łuków.",
        },
        description: {
          en: "The energy-efficient IMPERIAL system was developed specifically for high-quality windows, doors and fixed glazing. The extremely robust yet highly formable profiles are ideal for individual special shapes such as elegant round arches — first-class thermal insulation combined with maximum design freedom for demanding architecture.",
          de: "Das energieeffiziente System IMPERIAL wurde speziell für die Konstruktion hochwertiger Fenster, Türen und Festverglasungen entwickelt. Die extrem robusten und zugleich hochverformbaren Profile eignen sich hervorragend für die Realisierung individueller Sonderformen wie beispielsweise eleganter Rundbögen. Damit vereint IMPERIAL erstklassige Wärmedämmung mit maximaler Gestaltungsfreiheit für anspruchsvolle Architektur.",
          pl: "Energooszczędny system IMPERIAL opracowano specjalnie do wysokiej klasy okien, drzwi i przeszkleń stałych. Niezwykle wytrzymałe, a zarazem podatne na formowanie profile świetnie nadają się do indywidualnych form specjalnych, np. eleganckich łuków — pierwszorzędna izolacyjność cieplna połączona z maksymalną swobodą projektowania wymagającej architektury.",
        },
        specs: [
          { label: AL.frameDepth, value: "65", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "74", unit: "mm", highlight: true },
          { label: AL.glazing, value: "4 – 51 mm", highlight: true },
          { label: AL.maxDoorLeaf, value: { en: "1-track H 1300 × L 2752 mm; 2-track H 2200 × L 2400 mm; 3-track H 3500 × L 2400 mm", de: "1-gleisig H 1300 × L 2752 mm; 2-gleisig H 2200 × L 2400 mm; 3-gleisig H 3500 × L 2400 mm", pl: "1-torowe H 1300 × L 2752 mm; 2-torowe H 2200 × L 2400 mm; 3-torowe H 3500 × L 2400 mm" } },
          { label: AL.maxWeight, value: "120 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=17",
        image: "/images/manufacturers/aliplast-imperial.jpg",
      },
      {
        id: "genesis",
        name: "Genesis",
        tagline: {
          en: "New standards in window insulation and ergonomics.",
          de: "Neue Maßstäbe bei Fensterdämmung und Ergonomie.",
          pl: "Nowe standardy izolacyjności i ergonomii okien.",
        },
        description: {
          en: "The Genesis system allows ultra-modern windows, doors, fixed glazing and partitions with outstanding functionality. It sets new standards in window insulation — with maximum ergonomics and first-class operating comfort.",
          de: "Das System Genesis ermöglicht die Realisierung hochmoderner Fenster, Türen, Festverglasungen und Trennwände, die sich durch herausragende Funktionalität auszeichnen. Damit setzt das System neue Maßstäbe in puncto Fensterdämmung – bei gleichzeitig höchster Ergonomie und erstklassigem Bedienkomfort.",
          pl: "System Genesis pozwala realizować nowoczesne okna, drzwi, przeszklenia stałe i ścianki działowe o znakomitej funkcjonalności. Wyznacza nowe standardy izolacyjności okien — przy najwyższej ergonomii i pierwszorzędnym komforcie obsługi.",
        },
        specs: [
          { label: AL.frameDepth, value: "75", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "84", unit: "mm", highlight: true },
          { label: AL.glazing, value: "9 – 65 mm", highlight: true },
          { label: AL.minFrame, value: { en: "from 55 mm", de: "ab 55 mm", pl: "od 55 mm" } },
          { label: AL.minSash, value: { en: "from 42.5 mm", de: "ab 42,5 mm", pl: "od 42,5 mm" } },
          { label: AL.maxDoorLeaf, value: "H 1600 × L 2600 mm" },
          { label: AL.maxWeight, value: "160 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=18",
        image: "/images/manufacturers/aliplast-genesis.jpg",
      },
      {
        id: "superial",
        name: "Superial",
        tagline: {
          en: "First-class windows, in i and i+ versions.",
          de: "Erstklassige Fenster, als Varianten i und i+.",
          pl: "Pierwszorzędne okna, w wariantach i oraz i+.",
        },
        description: {
          en: "Thanks to its well-thought-out construction, the Superial system is ideal for first-class windows, external fixed glazing, turn, turn-tilt, tilt and tilt-slide windows as well as inward-opening doors based on a modified window sash. Window elements based on this system also integrate seamlessly into demanding facade systems — for maximum architectural flexibility and modern building design.",
          de: "Dank seiner durchdachten Konstruktion eignet sich das System Superial hervorragend für die Fertigung von erstklassigen Fenstern, Außen-Festverglasungen, Dreh-, Dreh-Kipp-, Kipp- und Kipp-Schiebe-Fenstern sowie nach innen öffnenden Türen auf Basis eines modifizierten Fensterflügels. Darüber hinaus lassen sich auf diesem System basierende Fensterelemente nahtlos in anspruchsvolle Fassadensysteme integrieren – für ein Höchstmaß an architektonischer Flexibilität und moderner Gebäudegestaltung.",
          pl: "Dzięki przemyślanej konstrukcji system Superial świetnie nadaje się do produkcji pierwszorzędnych okien, zewnętrznych przeszkleń stałych, okien rozwiernych, rozwierno-uchylnych, uchylnych i uchylno-przesuwnych oraz drzwi otwieranych do wewnątrz na bazie zmodyfikowanego skrzydła okiennego. Elementy tego systemu płynnie integrują się też z wymagającymi systemami fasadowymi — dla maksymalnej elastyczności architektonicznej.",
        },
        specs: [
          { label: AL.frameDepth, value: "75", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "84 / 75 mm", highlight: true },
          { label: AL.variants, value: "Superial i / Superial i+", highlight: true },
          { label: AL.glazing, value: "14 – 61 mm" },
          { label: AL.minFrame, value: { en: "61.5 mm (door) / from 55 mm (window)", de: "61,5 mm (Tür) / ab 55 mm (Fenster)", pl: "61,5 mm (drzwi) / od 55 mm (okno)" } },
          { label: AL.minSash, value: { en: "88.5 mm (door) / from 40 mm (window)", de: "88,5 mm (Tür) / ab 40 mm (Fenster)", pl: "88,5 mm (drzwi) / od 40 mm (okno)" } },
          { label: AL.maxDoorLeaf, value: "H 1600 × L 2600 mm" },
          { label: AL.maxWeight, value: { en: "200 kg (door) / 150 kg (window)", de: "200 kg (Tür) / 150 kg (Fenster)", pl: "200 kg (drzwi) / 150 kg (okno)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=18",
        image: "/images/manufacturers/aliplast-superial.jpg",
      },
      {
        id: "max-light",
        name: "Max Light",
        tagline: {
          en: "Slim profiles in Design, Invisible, Modern and Steel.",
          de: "Filigrane Profile als Design, Invisible, Modern und Steel.",
          pl: "Smukłe profile: Design, Invisible, Modern i Steel.",
        },
        description: {
          en: "MaxLight is the perfect answer to the most modern architectural concepts — a harmonious symbiosis of slim profiles, minimalist design and outstanding performance parameters. It convinces in exclusive private homes as much as in demanding commercial buildings, maximises natural daylight and comes in 4 model variants, each offering unique structural and visual highlights.",
          de: "MaxLight ist die perfekte Antwort auf modernste Architekturkonzepte – eine harmonische Symbiose aus filigranen Profilen, minimalistischem Design und herausragenden Leistungsparametern. Das System überzeugt gleichermaßen im exklusiven Privateigentum wie im anspruchsvollen Zweckbau. Es sorgt für einen maximalen Einfall von natürlichem Tageslicht und ist in 4 unterschiedlichen Modellvarianten erhältlich, die jeweils einzigartige konstruktive und visuelle Highlights bieten – für maßgeschneiderte Ästhetik ohne Kompromisse.",
          pl: "MaxLight to idealna odpowiedź na najnowocześniejsze koncepcje architektury — harmonijna symbioza smukłych profili, minimalistycznego designu i znakomitych parametrów. System sprawdza się zarówno w ekskluzywnych domach prywatnych, jak i w wymagających obiektach komercyjnych, maksymalizuje dopływ światła dziennego i występuje w 4 wariantach, z których każdy oferuje unikalne akcenty konstrukcyjne i wizualne.",
        },
        specs: [
          { label: AL.variants, value: "Design / Invisible / Modern / Steel", highlight: true },
          { label: AL.frameDepth, value: "83 / 75 / 75 / 105 mm", highlight: true },
          { label: AL.sashDepth, value: "92 / 84 / 84 / 97 mm", highlight: true },
          { label: { en: "Infill thickness", de: "Füllungsstärke", pl: "Grubość wypełnienia" }, value: { en: "up to 59 / 59 / 68 / 59 mm", de: "bis 59 / 59 / 68 / 59 mm", pl: "do 59 / 59 / 68 / 59 mm" } },
          { label: { en: "Glazing-bead height", de: "Höhe der Glasleiste", pl: "Wysokość listwy przyszybowej" }, value: "15 mm" },
          { label: { en: "Min. visible width, inward window", de: "Min. sichtbare Breite, Fenster nach innen", pl: "Min. widoczna szerokość, okno do wewnątrz" }, value: { en: "Frame + sash 35 mm each (Invisible: 70 mm frame, concealed sash)", de: "Blendrahmen + Flügel je 35 mm (Invisible: 70 mm Rahmen, verdeckter Flügel)", pl: "Ościeżnica + skrzydło po 35 mm (Invisible: rama 70 mm, skrzydło ukryte)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=19",
        image: "/images/manufacturers/aliplast-max-light.jpg",
      },
      {
        id: "vs-600",
        name: "VS 600",
        tagline: {
          en: "Vertical guillotine windows with spring assistance.",
          de: "Vertikale Guillotine-Fenster mit Federunterstützung.",
          pl: "Pionowe okna guillotine ze wspomaganiem sprężynowym.",
        },
        description: {
          en: "Equipped with innovative spring-assisted hardware, the sashes slide up and down with remarkable ease. An additional special fitting also allows the sashes to be projected or tilted — for perfect air circulation and maximum functional flexibility.",
          de: "Ausgestattet mit einer innovativen, federunterstützten Beschlagtechnik lassen sich die Flügel denkbar mühelos nach oben und unten verschieben. Die Integration eines zusätzlichen Spezialbeschlags ermöglicht zudem das komfortable Ausstellen bzw. Kippen der Flügel – für eine perfekte Luftzirkulation und ein Höchstmaß an funktionaler Flexibilität.",
          pl: "Dzięki innowacyjnym okuciom ze wspomaganiem sprężynowym skrzydła przesuwają się w górę i w dół wyjątkowo lekko. Dodatkowe okucie specjalne pozwala też wygodnie wystawiać lub uchylać skrzydła — dla doskonałej cyrkulacji powietrza i maksymalnej elastyczności funkcjonalnej.",
        },
        specs: [
          { label: AL.frameDepth, value: "130,5", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "52", unit: "mm", highlight: true },
          { label: AL.glazing, value: "24 – 28 mm", highlight: true },
          { label: AL.minFrame, value: "22 mm" },
          { label: AL.minSash, value: "40,5 mm" },
          { label: AL.maxDoorLeaf, value: "H 1150 × L 1500 mm" },
          { label: AL.maxWeight, value: "27 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=19",
        image: "/images/manufacturers/aliplast-vs-600.jpg",
      },
      {
        id: "fr-65-ei",
        name: "FR 65 EI",
        tagline: {
          en: "Interior fire partitions, EI 60 glazing / EI 30 doors.",
          de: "Innen-Brandschutzwände, EI 60 Verglasung / EI 30 Türen.",
          pl: "Wewnętrzne ścianki ppoż., EI 60 przeszklenia / EI 30 drzwi.",
        },
        description: {
          en: "The FR 65 EI system allows ultra-modern fire- and smoke-protection partitions for interiors. As an uninsulated construction without thermal break it is designed specifically for interior fit-out and offers tailor-made, functional room separation. Certified safety at the highest level: reliable fire resistance up to class EI 60 for fixed glazing and EI 30 for door elements — officially confirmed by the B certificate.",
          de: "Das System FR 65 EI ermöglicht die Realisierung hochmoderner Brandschutz- und Rauchschutz-Trennwände für den Innenbereich. Als unisolierte Konstruktion ohne thermische Trennung ist es speziell für den Innenausbau konzipiert und bietet eine maßgeschneiderte, funktionale Raumabtrennung. Das System garantiert zertifizierte Sicherheit auf höchstem Niveau: Es erreicht einen zuverlässigen Feuerwiderstand bis zur Klasse EI 60 bei Festverglasungen sowie EI 30 bei Türelementen – offiziell bestätigt durch das B-Zertifikat.",
          pl: "System FR 65 EI pozwala realizować nowoczesne wewnętrzne ścianki przeciwpożarowe i dymoszczelne. Jako konstrukcja nieizolowana, bez przekładki termicznej, jest zaprojektowany specjalnie do zabudowy wnętrz. Certyfikowane bezpieczeństwo na najwyższym poziomie: odporność ogniowa do klasy EI 60 dla przeszkleń stałych i EI 30 dla elementów drzwiowych — oficjalnie potwierdzona certyfikatem B.",
        },
        specs: [
          { label: AL.fireClass, value: { en: "EI 60 (fixed glazing) / EI 30 (doors)", de: "EI 60 (Festverglasung) / EI 30 (Türen)", pl: "EI 60 (przeszklenia stałe) / EI 30 (drzwi)" }, highlight: true },
          { label: AL.frameDepth, value: "65", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "65", unit: "mm", highlight: true },
          { label: AL.glazing, value: "17 – 25 mm" },
          { label: AL.maxWeight, value: "160 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=23",
        image: "/images/manufacturers/aliplast-fr-65-ei.jpg",
      },
      {
        id: "fr-90-ei",
        name: "FR 90 EI",
        tagline: {
          en: "Insulated fire protection up to EI 90, in and out.",
          de: "Gedämmter Brandschutz bis EI 90, innen und außen.",
          pl: "Izolowana ochrona ppoż. do EI 90, wewnątrz i na zewnątrz.",
        },
        description: {
          en: "FR 90 EI is an ultra-modern, thermally insulated fire-protection system combining maximum safety with first-class energy efficiency. For fire walls it can be certified in resistance classes EI 15, EI 30, EI 45 and EI 60 to EN 14351-1+A2:2016; interior and exterior doors even reach the outstanding class EI 90. Its powerful integrated thermal break makes it ideal indoors and on demanding external facades alike.",
          de: "Das System FR 90 EI ist ein hochmodernes, wärmegedämmtes Brandschutzsystem, das maximale Sicherheit mit erstklassiger Energieeffizienz vereint. Für Brandschutzwände ermöglicht es die Zertifizierung in den Feuerwiderstandsklassen EI 15, EI 30, EI 45 sowie EI 60 gemäß der Norm EN 14351-1+A2:2016. Bei Innen- und Außentüren erreicht es sogar die überragende Schutzklasse EI 90. Dank der integrierten, leistungsstarken thermischen Trennung bietet das FR 90 EI eine herausragende Flexibilität: Es eignet sich perfekt für den kompromisslosen Einsatz sowohl im Innenbereich als auch bei anspruchsvollen Außenfassaden.",
          pl: "FR 90 EI to nowoczesny, izolowany termicznie system przeciwpożarowy, łączący maksymalne bezpieczeństwo z pierwszorzędną efektywnością energetyczną. Ściany przeciwpożarowe mogą być certyfikowane w klasach EI 15, EI 30, EI 45 i EI 60 wg EN 14351-1+A2:2016; drzwi wewnętrzne i zewnętrzne osiągają nawet znakomitą klasę EI 90. Mocna zintegrowana przekładka termiczna czyni go idealnym zarówno do wnętrz, jak i wymagających fasad zewnętrznych.",
        },
        specs: [
          { label: AL.fireClass, value: { en: "EI 15–EI 60 (walls, EN 14351-1+A2:2016) / EI 90 (doors)", de: "EI 15–EI 60 (Wände, EN 14351-1+A2:2016) / EI 90 (Türen)", pl: "EI 15–EI 60 (ściany, EN 14351-1+A2:2016) / EI 90 (drzwi)" }, highlight: true },
          { label: AL.frameDepth, value: "90", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "90", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 60 mm", de: "bis 60 mm", pl: "do 60 mm" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=24",
        image: "/images/manufacturers/aliplast-fr-90-ei.jpg",
      },
    ],
  },
  {
    id: "deceuninck",
    category: "windows",
    name: "Deceuninck",
    tagline: {
      en: "The Decalu aluminium family, from Entra to 110 Steel.",
      de: "Die Decalu-Aluminiumfamilie, von Entra bis 110 Steel.",
      pl: "Aluminiowa rodzina Decalu, od Entra po 110 Steel.",
    },
    intro: {
      en: "Deceuninck's aluminium chapter in our self-hosted catalogue is the Decalu family: the straight-lined Entra, the Decalu 88 Standard with its inLine, Steel, Steel Flat, HI and HI+ variants, the concealed-sash Decalu 88 Hidden, the wood-look Decalu 94 Retro, the steel-style Decalu 110 and the Decalu 88 door system. Every spec below is copied from the catalogue sheets.",
      de: "Das Deceuninck-Kapitel unseres selbst gehosteten Katalogs ist die Decalu-Familie: das geradlinige Entra, das Decalu 88 Standard mit den Varianten inLine, Steel, Steel Flat, HI und HI+, das Decalu 88 Hidden mit verdecktem Flügel, das Decalu 94 Retro in Holzoptik, das Stahl-Design Decalu 110 und das Türsystem Decalu 88 Doors. Jede Spec unten ist aus den Katalogpliegos kopiert.",
      pl: "Rozdział Deceuninck w naszym samodzielnie hostowanym katalogu to rodzina Decalu: prostoliniowy Entra, Decalu 88 Standard w wariantach inLine, Steel, Steel Flat, HI i HI+, Decalu 88 Hidden z ukrytym skrzydłem, Decalu 94 Retro w optyce drewna, stalowy Decalu 110 oraz system drzwiowy Decalu 88 Doors. Każdy parametr poniżej skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/deceuninck.jpg",
    systems: [
      {
        id: "entra",
        name: "Entra",
        tagline: {
          en: "Straight-lined windows in three thermal versions.",
          de: "Geradlinige Fenster in drei Thermo-Varianten.",
          pl: "Prostoliniowe okna w trzech wariantach termicznych.",
        },
        description: {
          en: "The reduced, straight-lined design of the Entra system delivers outstanding performance, imposing large-format elements and fascinating top-level aesthetics. It convinces in modern builds as well as in demanding renovation. Three tailored thermal profile versions offer the perfect answer to every individual demand on energy efficiency and climate protection.",
          de: "Das reduzierte, geradlinige Design des Entra-Systems ermöglicht hervorragende Leistungsparameter, imposante Großformat-Elemente und eine faszinierende Ästhetik auf höchstem Niveau. Es überzeugt sowohl bei modernen als auch bei der anspruchsvollen Gebäudesanierung. Drei maßgeschneiderte Thermo-Ausführungsvarianten der Profile bieten die perfekte Lösung für jeden individuellen Anspruch an Energieeffizienz und Klimaschutz.",
          pl: "Oszczędny, prostoliniowy design systemu Entra zapewnia znakomite parametry, imponujące elementy wielkoformatowe i fascynującą estetykę najwyższego poziomu. Sprawdza się zarówno w nowoczesnym budownictwie, jak i w wymagającej renowacji. Trzy dopasowane warianty termiczne profili odpowiadają na każde indywidualne wymaganie efektywności energetycznej.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "73 mm (Standard) / 95 mm (Steel Flat)", de: "73 mm (Standard) / 95 mm (Steel Flat)", pl: "73 mm (Standard) / 95 mm (Steel Flat)" }, highlight: true },
          { label: AL.sashDepth, value: "82", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "8–63 mm / 5–54 mm (fixed)", de: "8–63 mm / 5–54 mm (fix)", pl: "8–63 mm / 5–54 mm (fix)" }, highlight: true },
          { label: AL.minFrame, value: "43 mm" },
          { label: AL.minSash, value: "31 mm" },
          { label: AL.maxSash, value: "H 2650 × L 1250 mm" },
          { label: AL.maxWeight, value: "150 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=27",
        image: "/images/manufacturers/deceuninck-entra.jpg",
      },
      {
        id: "decalu-88-standard",
        name: "Decalu 88 Standard",
        tagline: {
          en: "88 mm in inLine, Steel, Steel Flat, HI and HI+.",
          de: "88 mm als inLine, Steel, Steel Flat, HI und HI+.",
          pl: "88 mm jako inLine, Steel, Steel Flat, HI i HI+.",
        },
        description: {
          en: "This forward-looking innovation is ideal for monoblock and renovation windows. Thanks to the patented hardware mounting using a special PVC profile, the elements run extremely smoothly and are durably and effectively protected against corrosion.",
          de: "Diese zukunftsweisende Innovation eignet sich hervorragend für die Herstellung von Monoblock- sowie Sanierungsfenstern. Dank der patentierten Beschlagmontage unter Verwendung eines speziellen PVC-Profils überzeugen die Elemente durch einen extrem leichtgängigen Lauf und sind dauerhaft sowie wirkungsvoll vor Korrosion geschützt.",
          pl: "Ta przyszłościowa innowacja świetnie nadaje się do okien monoblock i renowacyjnych. Dzięki opatentowanemu montażowi okuć z użyciem specjalnego profilu PVC elementy pracują wyjątkowo lekko i są trwale oraz skutecznie chronione przed korozją.",
        },
        specs: [
          { label: AL.frameDepth, value: "88", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: { en: "96 mm (door) / 88 mm (window)", de: "96 mm (Tür) / 88 mm (Fenster)", pl: "96 mm (drzwi) / 88 mm (okno)" }, highlight: true },
          { label: AL.variants, value: "inLine / Steel / Steel Flat / HI / HI+", highlight: true },
          { label: AL.glazing, value: { en: "up to 71 mm", de: "bis 71 mm", pl: "do 71 mm" } },
          { label: AL.minFrame, value: { en: "43 mm (door) / 75.7 mm (window)", de: "43 mm (Tür) / 75,7 mm (Fenster)", pl: "43 mm (drzwi) / 75,7 mm (okno)" } },
          { label: AL.minSash, value: { en: "31 mm (door) / 71 mm (window)", de: "31 mm (Tür) / 71 mm (Fenster)", pl: "31 mm (drzwi) / 71 mm (okno)" } },
          { label: AL.maxSash, value: { en: "Window H 2650 × L 1200 mm; door H 1300 × L 2500 mm", de: "Fenster H 2650 × L 1200 mm; Tür H 1300 × L 2500 mm", pl: "Okno H 2650 × L 1200 mm; drzwi H 1300 × L 2500 mm" } },
          { label: AL.maxWeight, value: { en: "100–120 kg (door) / 160 kg (window)", de: "100–120 kg (Tür) / 160 kg (Fenster)", pl: "100–120 kg (drzwi) / 160 kg (okno)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=27",
        image: "/images/manufacturers/deceuninck-decalu-88-standard.jpg",
      },
      {
        id: "decalu-88-hidden",
        name: "Decalu 88 Hidden",
        tagline: {
          en: "Concealed sash — openings look like fixed glazing.",
          de: "Verdeckter Flügel — Öffnungen wirken wie Festverglasung.",
          pl: "Ukryte skrzydło — otwierane wygląda jak przeszklenie stałe.",
        },
        description: {
          en: "The system is based on patented innovations with a so-called concealed sash. Opening sashes and fixed glazing look completely identical in every configuration — enabling highly attractive, harmonious and aesthetically homogeneous facades at the highest architectural level.",
          de: "Das System basiert auf patentierten Innovationen mit einem sogenannten „verdeckten Flügel“. Die Kombination aus öffenbaren Flügeln und Festverglasungen überzeugt in jeder Konfiguration durch eine vollkommen identische Optik. Dies ermöglicht die Gestaltung hochattraktiver, harmonischer und ästhetisch homogener Fassaden auf höchstem architektonischem Niveau.",
          pl: "System opiera się na opatentowanych innowacjach z tzw. ukrytym skrzydłem. Skrzydła otwierane i przeszklenia stałe wyglądają w każdej konfiguracji całkowicie identycznie — co pozwala tworzyć niezwykle atrakcyjne, harmonijne i estetycznie jednorodne fasady na najwyższym poziomie architektonicznym.",
        },
        specs: [
          { label: AL.frameDepth, value: "88", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "97", unit: "mm", highlight: true },
          { label: AL.minSash, value: { en: "43 mm (concealed)", de: "43 mm (verdeckt liegend)", pl: "43 mm (ukryte)" }, highlight: true },
          { label: AL.glazing, value: { en: "up to 71 mm", de: "bis 71 mm", pl: "do 71 mm" } },
          { label: AL.minFrame, value: "81,5 mm" },
          { label: AL.maxSash, value: "H 2650 × L 1200 mm" },
          { label: AL.maxWeight, value: { en: "100 kg (Heavy Duty hardware: 120 kg)", de: "100 kg (Beschläge Heavy Duty: 120 kg)", pl: "100 kg (okucia Heavy Duty: 120 kg)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=28",
        image: "/images/manufacturers/deceuninck-decalu-88-hidden.jpg",
      },
      {
        id: "decalu-94-retro",
        name: "Decalu 94 Retro",
        tagline: {
          en: "Deceptively real wood look in authentic retro style.",
          de: "Täuschend echte Holzoptik im authentischen Retro-Stil.",
          pl: "Łudząco prawdziwa optyka drewna w stylu retro.",
        },
        description: {
          en: "Decalu 94 Retro was developed specifically for windows with a deceptively real wood look in authentic retro style. Exclusive details ensure uncompromisingly elegant aesthetics: concealed hardware, invisible gaskets and fully concealed drainage. A perfect symbiosis of traditional appearance and state-of-the-art aluminium technology.",
          de: "Das System Decalu 94 Retro wurde speziell für die Herstellung von Fenstern entwickelt, die durch eine täuschend echte Holzoptik im authentischen Retro-Stil bestechen. Für eine kompromisslos elegante Ästhetik sorgen exklusive Details: verdeckt liegende Beschläge, nicht sichtbare Dichtungen sowie eine vollkommen verdeckte Entwässerung. Eine perfekte Symbiose aus traditioneller Anmutung und modernster Aluminiumtechnologie auf höchstem Niveau.",
          pl: "System Decalu 94 Retro opracowano specjalnie z myślą o oknach o łudząco prawdziwej optyce drewna w autentycznym stylu retro. O bezkompromisowo elegancką estetykę dbają ekskluzywne detale: ukryte okucia, niewidoczne uszczelki i całkowicie ukryte odwodnienie. Idealna symbioza tradycyjnego wyglądu i najnowszej technologii aluminium.",
        },
        specs: [
          { label: AL.frameDepth, value: "94", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "103", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 71 mm", de: "bis 71 mm", pl: "do 71 mm" }, highlight: true },
          { label: AL.minFrame, value: "43 mm" },
          { label: AL.minSash, value: "31 mm" },
          { label: AL.maxSash, value: "H 2650 × L 1200 mm" },
          { label: AL.maxWeight, value: { en: "100 kg (Heavy Duty hardware: 120 kg)", de: "100 kg (Beschläge Heavy Duty: 120 kg)", pl: "100 kg (okucia Heavy Duty: 120 kg)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=28",
        image: "/images/manufacturers/deceuninck-decalu-94-retro.jpg",
      },
      {
        id: "decalu-110-steel",
        name: "Decalu 110 Steel",
        tagline: {
          en: "Bevelled profiles in classic steel-window style.",
          de: "Abgeschrägte Profile im Stil klassischer Stahlfenster.",
          pl: "Fazowane profile w stylu klasycznych okien stalowych.",
        },
        description: {
          en: "The characteristically bevelled profiles give the windows a fascinating look in the style of classic steel elements. For maximum architectural freedom and operating comfort, the windows can be built with a fixed mullion or a floating mullion.",
          de: "Die charakteristisch abgeschrägten Profile verleihen den Fenstern eine faszinierende Optik im Stile klassischer Stahlbauelemente. Für maximale architektonische Freiheit und höchsten Bedienkomfort lassen sich die Fenster wahlweise mit einem festen Pfosten oder einem fliegenden Pfosten (Stulp) realisieren.",
          pl: "Charakterystycznie fazowane profile nadają oknom fascynujący wygląd w stylu klasycznych elementów stalowych. Dla maksymalnej swobody architektonicznej i komfortu obsługi okna można wykonać ze słupkiem stałym lub ruchomym.",
        },
        specs: [
          { label: AL.frameDepth, value: "110", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "103,5", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 61 mm", de: "bis 61 mm", pl: "do 61 mm" }, highlight: true },
          { label: AL.minFrame, value: "43 mm" },
          { label: AL.maxSash, value: "H 2650 × L 1200 mm" },
          { label: AL.maxWeight, value: { en: "100 kg (Heavy Duty hardware: 120 kg)", de: "100 kg (Beschläge Heavy Duty: 120 kg)", pl: "100 kg (okucia Heavy Duty: 120 kg)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=29",
        image: "/images/manufacturers/deceuninck-decalu-110-steel.jpg",
      },
      {
        id: "decalu-88-doors",
        name: "Decalu 88 Doors",
        tagline: {
          en: "Aluminium doors with Ud from 0.9 W/m²K.",
          de: "Aluminiumtüren mit Ud ab 0,9 W/m²K.",
          pl: "Drzwi aluminiowe z Ud od 0,9 W/m²K.",
        },
        description: {
          en: "Decalu 88 Doors is an energy-efficient, durable aluminium door solution with an excellent low heat-transfer coefficient of just 0.9 W/m²K at 1200 × 2500 mm. The innovative anti-bimetal thermal break effectively protects the door leaf from warping, while clever construction details make hinge mounting effortless.",
          de: "Decalu 88 Doors ist eine energieeffiziente und langlebige Aluminium-Türlösung mit einem hervorragend niedrigen Wärmedurchgangskoeffizienten von nur 0,9 W/m²K bei den Maßen 1200 × 2500 mm. Der innovative Anti-Bimetall-Isoliersteg schützt das Türblatt effektiv vor Verzug, während durchdachte Konstruktionslösungen eine mühelose Bandmontage ermöglichen.",
          pl: "Decalu 88 Doors to energooszczędne, trwałe drzwi aluminiowe ze znakomicie niskim współczynnikiem przenikania ciepła zaledwie 0,9 W/m²K przy wymiarach 1200 × 2500 mm. Innowacyjna antybimetaliczna przekładka termiczna skutecznie chroni skrzydło przed odkształceniem, a przemyślane rozwiązania konstrukcyjne ułatwiają montaż zawiasów.",
        },
        specs: [
          { label: { en: "Ud (1200 × 2500 mm)", de: "Ud (1200 × 2500 mm)", pl: "Ud (1200 × 2500 mm)" }, value: "0.9", unit: "W/m²K", highlight: true },
          { label: AL.frameDepth, value: "88", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "88", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 62 mm", de: "bis 62 mm", pl: "do 62 mm" } },
          { label: AL.maxDoorLeaf, value: "H 1400 × L 2900 mm" },
          { label: AL.maxWeight, value: "160 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=29",
        image: "/images/manufacturers/deceuninck-decalu-88-doors.jpg",
      },
    ],
  },
  {
    id: "cortizo",
    category: "windows",
    name: "CORTIZO",
    tagline: {
      en: "Spanish aluminium design, from COR 70 to the pivot door.",
      de: "Spanisches Aluminium-Design, vom COR 70 bis zur Pivot-Tür.",
      pl: "Hiszpański design aluminium, od COR 70 po drzwi pivot.",
    },
    intro: {
      en: "The CORTIZO chapter of our self-hosted Aluminium catalogue covers the COR 70 family — the steel-look Industrial version and the slim COR 70 HO with up to 85 % glass — the outward-opening Cortizo Casement and the Millennium Plus Pivot door with its offset rotation axis. The brand's sliding systems live on the patio-doors page. All specs are copied from the catalogue sheets.",
      de: "Das CORTIZO-Kapitel unseres selbst gehosteten Aluminium-Katalogs umfasst die COR-70-Familie — die Industrial-Variante im Stahl-Look und das filigrane COR 70 HO mit bis zu 85 % Glasanteil —, das nach außen öffnende Cortizo Casement und die Pivot-Tür Millennium Plus mit versetzter Drehachse. Die Schiebesysteme der Marke stehen auf der Seite der Terrassentüren. Alle Specs sind aus den Katalogpliegos kopiert.",
      pl: "Rozdział CORTIZO naszego samodzielnie hostowanego katalogu aluminium obejmuje rodzinę COR 70 — wariant Industrial w stalowej stylistyce i smukły COR 70 HO z udziałem szkła do 85 % — otwierane na zewnątrz Cortizo Casement oraz drzwi pivot Millennium Plus z przesuniętą osią obrotu. Systemy przesuwne tej marki znajdują się na stronie drzwi tarasowych. Wszystkie parametry skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/cortizo.jpg",
    systems: [
      {
        id: "cor-70-industrial",
        name: "COR 70 Industrial",
        tagline: {
          en: "Minimalist steel look with a 35-mm thermal break.",
          de: "Minimalistischer Stahl-Look mit 35-mm-Isoliersteg.",
          pl: "Minimalistyczny stalowy look z przekładką 35 mm.",
        },
        description: {
          en: "The Industrial version of the COR 70 system captivates with minimalist design in an elegant steel look. Thanks to the 35-mm thermal break and state-of-the-art triple glazing, the system offers superior thermal and acoustic insulation — perfect for forward-looking architecture and passive-house standards.",
          de: "Die Industrial-Ausführung des Systems COR 70 besticht durch ein minimalistisches Design im eleganten Stahl-Look. Dank des 35-mm-Isolierstegs und hochmoderner Dreifach-Verglasung bietet das System eine überragende Wärme- und Schalldämmung – perfekt für zukunftsweisende Architektur und Passivhaus-Standards.",
          pl: "Wersja Industrial systemu COR 70 urzeka minimalistycznym designem w eleganckiej stalowej stylistyce. Dzięki przekładce termicznej 35 mm i nowoczesnemu potrójnemu szkleniu system oferuje znakomitą izolacyjność cieplną i akustyczną — idealny dla przyszłościowej architektury i standardów pasywnych.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "70", unit: "mm", highlight: true },
          { label: { en: "Thermal-break width", de: "Isolierstegstärke", pl: "Szerokość przekładki termicznej" }, value: "35", unit: "mm", highlight: true },
          { label: AL.glazing, value: "55 mm", highlight: true },
          { label: AL.maxDoorLeaf, value: "H 2600 × L 1500 mm" },
          { label: AL.maxWeight, value: "160 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=33",
        image: "/images/manufacturers/cortizo-cor-70-industrial.jpg",
      },
      {
        id: "cor-70-ho",
        name: "COR 70 HO",
        tagline: {
          en: "Slim profiles, glass up to 85 % of the surface.",
          de: "Schlanke Profile, Glas bis 85 % der Fläche.",
          pl: "Smukłe profile, szkło do 85 % powierzchni.",
        },
        description: {
          en: "The COR 70 HO window system impresses with generous glazing areas made possible by its extremely slim profiles. The glass can take up to 85 % of the total surface — for maximum light yield, light-flooded interiors and an incomparable living feel at the highest architectural level.",
          de: "Das Fenstersystem COR 70 HO besticht durch beeindruckend großzügige Verglasungsflächen, die durch seine extrem schlanken Profile ermöglicht werden. Die Glasfläche kann bis zu 85 % der Gesamtoberfläche einnehmen – für eine maximale Lichtausbeute, lichtdurchflutete Innenräume und ein unvergleichliches Wohngefühl auf höchstem architektonischem Niveau.",
          pl: "System okienny COR 70 HO zachwyca imponująco dużymi przeszkleniami, możliwymi dzięki wyjątkowo smukłym profilom. Szkło może zajmować do 85 % całej powierzchni — dla maksymalnego doświetlenia, zalanych światłem wnętrz i niezrównanego komfortu mieszkania.",
        },
        specs: [
          { label: AL.frameDepth, value: "70", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "70", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 46 mm", de: "bis 46 mm", pl: "do 46 mm" }, highlight: true },
          { label: AL.maxDoorLeaf, value: { en: "1300 × 2400 mm / 1200 × 3500 mm (heavy-duty turn hardware)", de: "1300 × 2400 mm / 1200 × 3500 mm (hochbelastbare Dreh-Beschläge HD)", pl: "1300 × 2400 mm / 1200 × 3500 mm (okucia rozwierne HD)" } },
          { label: AL.maxWeight, value: "160 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=33",
        image: "/images/manufacturers/cortizo-cor-70-ho.jpg",
      },
      {
        id: "casement",
        name: "Cortizo Casement",
        tagline: {
          en: "Outward-opening windows with filigree profiles.",
          de: "Nach außen öffnende Fenster mit filigranen Profilen.",
          pl: "Okna otwierane na zewnątrz o filigranowych profilach.",
        },
        description: {
          en: "Cortizo Casement offers thoroughly engineered outward-opening windows with extremely filigree aluminium profiles. They bring noticeably more daylight into your rooms while meeting the strictest security standards. Modern thermal breaks guarantee first-class thermal and acoustic insulation, a wide RAL palette opens unlimited surface design freedom, and purpose-built hardware makes daily operation and care exceptionally comfortable.",
          de: "Das System Cortizo Casement bietet ganzheitlich durchdachte, nach außen öffnende Fenster, die durch ihre extrem filigranen Aluminiumprofile überzeugen. Sie schenken Ihren Räumen spürbar mehr natürliches Tageslicht und erfüllen gleichzeitig strengste Sicherheitsstandards. Dank der hochmodernen thermischen Trennung garantiert das System eine erstklassige Wärme- und Schalldämmung für maximalen Wohnkomfort. Eine breite RAL-Farbpalette eröffnet grenzenlose Gestaltungsfreiheit bei der Oberflächenveredelung, während speziell entwickelte Beschläge für eine außergewöhnlich komfortable Bedienung und mühelose Pflege im Alltag sorgen.",
          pl: "Cortizo Casement to kompleksowo przemyślane okna otwierane na zewnątrz o wyjątkowo filigranowych profilach aluminiowych. Dają wnętrzom wyraźnie więcej światła dziennego, spełniając zarazem najostrzejsze standardy bezpieczeństwa. Nowoczesna przekładka termiczna gwarantuje pierwszorzędną izolacyjność cieplną i akustyczną, szeroka paleta RAL otwiera nieograniczoną swobodę wykończenia, a specjalne okucia zapewniają wyjątkowy komfort codziennej obsługi.",
        },
        specs: [
          { label: AL.frameDepth, value: "70", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "70", unit: "mm", highlight: true },
          { label: AL.glazing, value: "14 – 44 mm", highlight: true },
          { label: AL.minFrame, value: "15 mm" },
          { label: AL.minSash, value: "50 mm" },
          { label: AL.maxSash, value: { en: "Turn-tilt (top hung) H 1800 × L 1800 mm", de: "Dreh-Kipp (Top Hung) H 1800 × L 1800 mm", pl: "Rozwierno-uchylne (top hung) H 1800 × L 1800 mm" } },
          { label: AL.maxWeight, value: "100 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=34",
        image: "/images/manufacturers/cortizo-casement.jpg",
      },
      {
        id: "millennium-pivot-plus",
        name: "Millennium Pivot Plus",
        tagline: {
          en: "Pivot doors up to 3 m with offset rotation axis.",
          de: "Pivot-Türen bis 3 m mit versetzter Drehachse.",
          pl: "Drzwi pivot do 3 m z przesuniętą osią obrotu.",
        },
        description: {
          en: "The modern, uncompromising design of the Millennium Plus Pivot door combines top thermal and acoustic insulation values with outstanding functionality thanks to the offset rotation axis. The system also allows the integration of elegant panel toplights.",
          de: "Das moderne, kompromisslose Design der Millennium Plus Pivot Tür vereint höchste Wärmedämm- und Schallschutzwerte mit herausragender Funktionalität dank der versetzten Drehachse. Darüber hinaus ermöglicht das System die Integration eleganter Paneel-Oberlichter.",
          pl: "Nowoczesny, bezkompromisowy design drzwi Millennium Plus Pivot łączy najwyższe wartości izolacyjności cieplnej i akustycznej ze znakomitą funkcjonalnością dzięki przesuniętej osi obrotu. System pozwala też integrować eleganckie naświetla panelowe.",
        },
        specs: [
          { label: AL.frameDepth, value: "80", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "80", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 64 mm", de: "bis 64 mm", pl: "do 64 mm" }, highlight: true },
          { label: AL.maxDoorLeaf, value: "H 3000 × L 2000 mm" },
          { label: AL.maxWeight, value: "250 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=37",
        image: "/images/manufacturers/cortizo-millennium-pivot-plus.jpg",
      },
    ],
  },
  {
    id: "reynaers",
    category: "windows",
    name: "Reynaers",
    tagline: {
      en: "MasterLine, SlimLine and pivot doors up to 4 metres.",
      de: "MasterLine, SlimLine und Pivot-Türen bis 4 Meter.",
      pl: "MasterLine, SlimLine i drzwi pivot do 4 metrów.",
    },
    intro: {
      en: "Reynaers Aluminium fills the premium chapter of our self-hosted catalogue: the MasterLine 8 window family with hidden-vent, Despiro door and pivot versions up to 4 m leaf height, the deep MasterLine 10, the steel-heritage SlimLine 38, the CS 77 window and door system and the SlimWall 35 facade. The brand's sliding systems live on the patio-doors page. All specs are copied from the catalogue sheets.",
      de: "Reynaers Aluminium füllt das Premium-Kapitel unseres selbst gehosteten Katalogs: die Fensterfamilie MasterLine 8 mit Hidden-Vent-, Despiro-Tür- und Pivot-Varianten bis 4 m Flügelhöhe, die tiefe MasterLine 10, das Stahltraditions-System SlimLine 38, das Fenster- und Türsystem CS 77 und die Fassade SlimWall 35. Die Schiebesysteme der Marke stehen auf der Seite der Terrassentüren. Alle Specs sind aus den Katalogpliegos kopiert.",
      pl: "Reynaers Aluminium wypełnia rozdział premium naszego samodzielnie hostowanego katalogu: rodzina okien MasterLine 8 z wariantami hidden vent, drzwiami Despiro i pivot do 4 m wysokości skrzydła, głęboka MasterLine 10, nawiązujący do stali SlimLine 38, system okienno-drzwiowy CS 77 i fasada SlimWall 35. Systemy przesuwne marki znajdują się na stronie drzwi tarasowych. Wszystkie parametry skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/reynaers.jpg",
    systems: [
      {
        id: "masterline-8",
        name: "MasterLine 8",
        tagline: {
          en: "The premium window base, open to Despiro and pivot.",
          de: "Die Premium-Fensterbasis, offen für Despiro und Pivot.",
          pl: "Bazowe okno premium, otwarte na Despiro i pivot.",
        },
        description: {
          en: "The perfect combination of outstanding performance, high functionality and a broad variety of solutions. The system adapts effortlessly to individual wishes — through stylish Despiro infills and the integration of modern pivot solutions.",
          de: "Die perfekte Kombination aus hervorragenden Leistungsmerkmalen, hoher Funktionalität und einer breit gefächerten Lösungsvielfalt. Das System lässt sich mühelos an individuelle Kundenwünsche anpassen – durch den Einsatz stilvoller Despiro-Füllungen sowie die Integration moderner Pivot-Lösungen.",
          pl: "Idealne połączenie znakomitych parametrów, wysokiej funkcjonalności i szerokiej gamy rozwiązań. System bez trudu dopasowuje się do indywidualnych życzeń — dzięki stylowym wypełnieniom Despiro i integracji nowoczesnych rozwiązań pivot.",
        },
        specs: [
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "87", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 62 mm", de: "bis 62 mm", pl: "do 62 mm" }, highlight: true },
          { label: AL.minFrame, value: "53 mm" },
          { label: AL.minSash, value: { en: "20 mm (not visible)", de: "20 mm (nicht sichtbar)", pl: "20 mm (niewidoczne)" } },
          { label: AL.maxSash, value: "H 2800 × L 1200 mm" },
          { label: AL.maxWeight, value: "200 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=40",
        image: "/images/manufacturers/reynaers-masterline-8.jpg",
      },
      {
        id: "masterline-8-hidden-vent",
        name: "MasterLine 8 Hidden Vent",
        tagline: {
          en: "The sash disappears completely behind the frame.",
          de: "Der Flügel verschwindet komplett hinter dem Rahmen.",
          pl: "Skrzydło całkowicie znika za ościeżnicą.",
        },
        description: {
          en: "The defining feature of this system is the concealed sash. The specially developed outer frame makes the sash profile disappear completely behind the frame profile, giving the whole facade a highly aesthetic, harmonious appearance.",
          de: "Das prägende Merkmal dieses Systems ist der verdeckte Flügel. Der speziell entwickelte Blendrahmen sorgt dafür, dass das Flügelprofil vollständig hinter dem Rahmenprofil verschwindet. So erhält die gesamte Fassade ein hochästhetisches und harmonisch gestaltetes Erscheinungsbild.",
          pl: "Cechą definiującą ten system jest ukryte skrzydło. Specjalnie opracowana ościeżnica sprawia, że profil skrzydła całkowicie znika za profilem ramy, nadając całej fasadzie wysoce estetyczny, harmonijny wygląd.",
        },
        specs: [
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 65 mm", de: "bis 65 mm", pl: "do 65 mm" }, highlight: true },
          { label: AL.minFrame, value: "53 mm" },
          { label: AL.minSash, value: { en: "20 mm (not visible)", de: "20 mm (nicht sichtbar)", pl: "20 mm (niewidoczne)" } },
          { label: AL.maxSash, value: "H 2800 × L 1200 mm" },
          { label: AL.maxWeight, value: "170 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=40",
        image: "/images/manufacturers/reynaers-masterline-8-hidden-vent.jpg",
      },
      {
        id: "masterline-8-despiro",
        name: "MasterLine 8 Despiro",
        tagline: {
          en: "Despiro entrance doors up to 3 m, 3-mm aluminium.",
          de: "Despiro-Haustüren bis 3 m, 3-mm-Aluminium.",
          pl: "Drzwi wejściowe Despiro do 3 m, aluminium 3 mm.",
        },
        description: {
          en: "The Despiro aluminium entrance doors in the MasterLine 8 system combine uncompromising reliability with elegant minimalist aesthetics. For the highest demands, door heights of up to 3 metres are possible — made of robust 3-mm aluminium sheet for outstanding resistance and maximum damage protection. Despiro is also available in the proven MB-86 and Aliplast Genesis systems.",
          de: "Die Despiro Aluminium-Haustüren im System MasterLine 8 vereinen kompromisslose Zuverlässigkeit mit eleganter Minimalismus-Ästhetik. Für höchste Ansprüche lassen sich Türhöhen von bis zu 3 Metern realisieren – gefertigt aus robustem, 3 mm starkem Aluminiumblech für herausragende Widerstandsfähigkeit und maximalen Beschädigungsschutz. Despiro ist ebenfalls in den bewährten Systemen MB-86 sowie Aliplast Genesis erhältlich.",
          pl: "Aluminiowe drzwi wejściowe Despiro w systemie MasterLine 8 łączą bezkompromisową niezawodność z elegancką, minimalistyczną estetyką. Dla najwyższych wymagań możliwe są drzwi o wysokości do 3 metrów — wykonane z solidnej blachy aluminiowej 3 mm dla znakomitej odporności i maksymalnej ochrony przed uszkodzeniami. Despiro dostępne jest także w sprawdzonych systemach MB-86 i Aliplast Genesis.",
        },
        specs: [
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.glazing, value: "67 mm", highlight: true },
          { label: AL.maxDoorLeaf, value: "H 3000 × L 1500 mm" },
          { label: AL.maxWeight, value: "200 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=41",
        image: "/images/manufacturers/reynaers-masterline-8-despiro.jpg",
      },
      {
        id: "masterline-10",
        name: "MasterLine 10",
        tagline: {
          en: "97 mm depth for the strictest energy standards.",
          de: "97 mm Bautiefe für strengste Energiestandards.",
          pl: "Głębokość 97 mm dla najostrzejszych standardów.",
        },
        description: {
          en: "The system allows windows and doors that effortlessly meet even the strictest energy-efficiency standards. Its outstanding feature is the realisation of large-area glazing — even in the most impressive corner solutions.",
          de: "Das System ermöglicht die Fertigung von Fenstern und Türen, die selbst strengste Energieeffizienzstandards mühelos erfüllen. Sein herausragendes Merkmal ist die Umsetzung großflächiger Verglasungen – selbst in den eindrucksvollsten Ecklösungen.",
          pl: "System pozwala wykonywać okna i drzwi, które bez trudu spełniają nawet najostrzejsze standardy efektywności energetycznej. Jego wyróżnikiem jest realizacja wielkopowierzchniowych przeszkleń — nawet w najbardziej efektownych rozwiązaniach narożnych.",
        },
        specs: [
          { label: AL.frameDepth, value: "97", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "107", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "29–88 mm (sash)", de: "29–88 mm (Flügel)", pl: "29–88 mm (skrzydło)" }, highlight: true },
          { label: AL.minFrame, value: "60 mm" },
          { label: AL.minSash, value: "37 mm" },
          { label: AL.maxSash, value: { en: "Turn-tilt H 2800 × L 1200 mm", de: "Dreh-Kipp H 2800 × L 1200 mm", pl: "Rozwierno-uchylne H 2800 × L 1200 mm" } },
          { label: AL.maxWeight, value: "200 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=41",
        image: "/images/manufacturers/reynaers-masterline-10.jpg",
      },
      {
        id: "slimline-38",
        name: "SlimLine 38",
        tagline: {
          en: "Steel-window heritage in Ferro and Cubic variants.",
          de: "Stahlfenster-Tradition in den Varianten Ferro und Cubic.",
          pl: "Tradycja okien stalowych w wariantach Ferro i Cubic.",
        },
        description: {
          en: "SlimLine 38 stands for energy-efficient aluminium windows, available in three profile variants that echo traditional steel-window design from subtle to striking. They are the ideal choice for modern new builds and the stylish renovation of existing buildings alike.",
          de: "SlimLine 38 steht für energieeffiziente Aluminiumfenster, die in drei Profilvarianten erhältlich sind und subtil bis markant an das traditionelle Stahlfenster-Design anknüpfen. Sie sind die ideale Wahl sowohl für moderne Neubauprojekte als auch für die stilvolle Sanierung von Bestandsobjekten.",
          pl: "SlimLine 38 to energooszczędne okna aluminiowe, dostępne w trzech wariantach profili nawiązujących — od subtelnie po wyraziście — do tradycyjnego designu okien stalowych. Idealny wybór zarówno dla nowoczesnych inwestycji, jak i stylowej renowacji istniejących obiektów.",
        },
        specs: [
          { label: AL.frameDepth, value: "76 – 99 mm", highlight: true },
          { label: AL.sashDepth, value: "86", unit: "mm", highlight: true },
          { label: AL.variants, value: "Ferro / Cubic", highlight: true },
          { label: AL.glazing, value: { en: "up to 55 mm", de: "bis 55 mm", pl: "do 55 mm" } },
          { label: AL.maxSash, value: { en: "Turn-tilt H 1200 × L 2800 mm", de: "Dreh-Kipp H 1200 × L 2800 mm", pl: "Rozwierno-uchylne H 1200 × L 2800 mm" } },
          { label: AL.maxWeight, value: "170 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=42",
        image: "/images/manufacturers/reynaers-slimline-38.jpg",
      },
      {
        id: "cs-77",
        name: "CS 77",
        tagline: {
          en: "Window and door system with triple-glazing option.",
          de: "Fenster- und Türsystem mit Dreifachglas-Option.",
          pl: "System okienno-drzwiowy z opcją potrójnego szklenia.",
        },
        description: {
          en: "The special thermal-break strip and the option of triple insulating glazing guarantee outstanding thermal and acoustic insulation.",
          de: "Die spezielle Thermotrennleiste und die Option zur Verwendung von Dreifach-Isolierverglasungen garantieren eine hervorragende Wärme- und Schalldämmung.",
          pl: "Specjalna listwa termiczna i możliwość zastosowania potrójnych szyb zespolonych gwarantują znakomitą izolacyjność cieplną i akustyczną.",
        },
        specs: [
          { label: AL.frameDepth, value: "68", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "4–52 mm (fixed and doors) / 63 mm (window sash)", de: "4–52 mm (Festverglasung und Türen) / 63 mm (Fensterflügel)", pl: "4–52 mm (stałe i drzwi) / 63 mm (skrzydło okienne)" }, highlight: true },
          { label: AL.minFrame, value: "51 mm" },
          { label: AL.minSash, value: "60 mm" },
          { label: AL.maxSash, value: { en: "Turn-tilt H 2800 × L 1250 mm", de: "Dreh-Kipp H 2800 × L 1250 mm", pl: "Rozwierno-uchylne H 2800 × L 1250 mm" } },
          { label: AL.maxWeight, value: "170 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=42",
        image: "/images/manufacturers/reynaers-cs-77.jpg",
      },
      {
        id: "slimwall-35",
        name: "SlimWall 35",
        tagline: {
          en: "Curtain facades at passive-house insulation level.",
          de: "Vorhangfassaden auf Passivhaus-Dämmniveau.",
          pl: "Fasady słupowo-ryglowe o izolacyjności pasywnej.",
        },
        description: {
          en: "The SlimWall 35 facade system was developed specifically for energy-efficient buildings and offers impressive curtain facades with passive-house-level thermal insulation. SlimWall 35 harmonises perfectly with MasterLine 8 windows and doors, enabling exceptional minimalist living concepts with generous glass surfaces.",
          de: "Das Fassadensystem SlimWall 35 wurde speziell für energieeffiziente Gebäude entwickelt und bietet beeindruckende Vorhangfassaden mit Wärmedämmwerten auf Passivhaus-Niveau. SlimWall 35 harmonisiert perfekt mit den Fenstern und Türen der Serie MasterLine 8 und ermöglicht so die Realisierung außergewöhnlicher, minimalistischer Wohnkonzepte mit großzügigen Glasflächen.",
          pl: "System fasadowy SlimWall 35 opracowano specjalnie dla budynków energooszczędnych: imponujące fasady słupowo-ryglowe o izolacyjności cieplnej na poziomie domów pasywnych. SlimWall 35 doskonale współgra z oknami i drzwiami serii MasterLine 8, umożliwiając wyjątkowe, minimalistyczne koncepcje mieszkalne z dużymi przeszkleniami.",
        },
        specs: [
          { label: { en: "Mullion depth", de: "Pfostentiefe", pl: "Głębokość słupka" }, value: "89 – 194 mm", highlight: true },
          { label: AL.glazing, value: "24 – 57 mm", highlight: true },
          { label: { en: "Face width, door frame", de: "Ansichtsbreite Türrahmen", pl: "Szerokość czołowa ościeżnicy drzwi" }, value: "60 mm", highlight: true },
          { label: AL.maxWeight, value: { en: "180 kg (opening) / 450 kg (fixed)", de: "180 kg (öffnend) / 450 kg (festverglast)", pl: "180 kg (otwierane) / 450 kg (stałe)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=43",
        image: "/images/manufacturers/reynaers-slimwall-35.jpg",
      },
      {
        id: "masterline-8-pivot",
        name: "MasterLine 8 Pivot",
        tagline: {
          en: "Pivot doors opening outward or inward.",
          de: "Pivot-Türen, nach außen oder innen öffnend.",
          pl: "Drzwi pivot otwierane na zewnątrz lub do wewnątrz.",
        },
        description: {
          en: "A system for exceptional pivot doors that open flexibly outward or inward. Modern design and outstanding functionality make these doors the perfect choice — for commercial buildings and demanding private homes alike.",
          de: "Ein System zur Herstellung außergewöhnlicher Pivot-Türen, die sich flexibel nach außen oder innen öffnen lassen. Das moderne Design und die herausragende Funktionalität machen diese Türen zur perfekten Wahl – sowohl für gewerbliche Objekte als auch für anspruchsvolle Eigenheime.",
          pl: "System wyjątkowych drzwi pivot, otwieranych elastycznie na zewnątrz lub do wewnątrz. Nowoczesny design i znakomita funkcjonalność czynią te drzwi idealnym wyborem — zarówno dla obiektów komercyjnych, jak i wymagających domów prywatnych.",
        },
        specs: [
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 62 mm", de: "bis 62 mm", pl: "do 62 mm" }, highlight: true },
          { label: AL.maxSash, value: "H 3000 × L 1700 mm" },
          { label: AL.maxWeight, value: "200 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=44",
        image: "/images/manufacturers/reynaers-masterline-8-pivot.jpg",
      },
      {
        id: "masterline-8-pivot-xl",
        name: "MasterLine 8 Pivot XL",
        tagline: {
          en: "Up to 4 m height and 500 kg per pivot leaf.",
          de: "Bis 4 m Höhe und 500 kg pro Pivot-Flügel.",
          pl: "Do 4 m wysokości i 500 kg na skrzydło pivot.",
        },
        description: {
          en: "With MasterLine 8 Pivot XL, impressive large-area glass architecture can be realised with one or even up to three moving leaves. It is the perfect solution for spectacular private and commercial buildings, seamlessly combining futuristic aesthetics with maximum functionality.",
          de: "Mit dem System MasterLine 8 Pivot XL lassen sich beeindruckende, großflächige Glasarchitekturen mit einem oder sogar bis zu drei beweglichen Flügeln realisieren. Es ist die perfekte Lösung für spektakuläre Privat- und Objektbauten, die futuristische Ästhetik nahtlos mit höchster Funktionalität verbindet.",
          pl: "System MasterLine 8 Pivot XL pozwala realizować imponującą, wielkopowierzchniową architekturę szklaną z jednym, a nawet trzema ruchomymi skrzydłami. To idealne rozwiązanie dla spektakularnych budynków prywatnych i komercyjnych, płynnie łączące futurystyczną estetykę z najwyższą funkcjonalnością.",
        },
        specs: [
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "77", unit: "mm", highlight: true },
          { label: { en: "Max. dimensions", de: "Max. Abmessungen", pl: "Maks. wymiary" }, value: "H 4000 × L 2500 mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 62 mm", de: "bis 62 mm", pl: "do 62 mm" } },
          { label: AL.maxWeight, value: "500 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=44",
        image: "/images/manufacturers/reynaers-masterline-8-pivot-xl.jpg",
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
  {
    /**
     * Las correderas VEKA del catálogo WIKĘD (2026-08). Mismo id
     * "veka" que en ventanas a propósito: es el mismo fabricante y la
     * clave de búsqueda es (categoría, id), como con Salamander.
     */
    id: "veka",
    category: "patio-doors",
    name: "VEKA",
    tagline: {
      en: "Lift-and-slide and sliding systems in PVC.",
      de: "Hebe-Schiebe- und Schiebesysteme aus Kunststoff.",
      pl: "Systemy podnoszono-przesuwne i przesuwne z PCV.",
    },
    intro: {
      en: "Three ways to open a wall in PVC, all on class-A VEKA profiles: the Motion 82 lift-and-slide systems with 194 mm of build depth — down to Uw 0.73 W/m²K in the Max version — and the Move 76 slider where a lighter build is enough. Every figure below comes from the self-hosted WIKĘD catalogue.",
      de: "Drei Wege, eine Wand in Kunststoff zu öffnen, alle auf VEKA-Profilen der Klasse A: die Hebe-Schiebe-Systeme Motion 82 mit 194 mm Bautiefe — bis Uw = 0,73 W/(m²K) in der Max-Version — und der Schieber Move 76, wo ein leichterer Aufbau genügt. Jede Zahl unten stammt aus dem selbst gehosteten WIKĘD-Katalog.",
      pl: "Trzy sposoby otwarcia ściany w PCV, wszystkie na profilach VEKA klasy A: systemy podnoszono-przesuwne Motion 82 o głębokości zabudowy 194 mm — do Uw = 0,73 W/(m²K) w wersji Max — oraz przesuwny Move 76 tam, gdzie wystarczy lżejsza budowa. Każda liczba poniżej pochodzi z samodzielnie hostowanego katalogu WIKĘD.",
    },
    image: "/images/manufacturers/veka-schiebe.jpg",
    systems: [
      {
        id: "motion-82-max",
        name: "VEKA Motion 82 Max",
        tagline: {
          en: "The warmest lift-and-slide: Uw 0.73.",
          de: "Das wärmste Hebe-Schiebe-System: Uw 0,73.",
          pl: "Najcieplejszy system HS: Uw 0,73.",
        },
        description: {
          en: "The top lift-and-slide (HS) system of the family: 194 mm of build depth, seven chambers in the frame and glazing packs from 18 to 52 mm. Uw of 0.73 W/m²K on the 3.5 × 2.3 m reference door.",
          de: "Das Spitzen-Hebe-Schiebe-System (HS) der Familie: 194 mm Bautiefe, sieben Kammern im Rahmen und Glaspakete von 18 bis 52 mm. Uw = 0,73 W/(m²K) an der Referenztür von 3,5 × 2,3 m.",
          pl: "Topowy system podnoszono-przesuwny (HS) rodziny: 194 mm głębokości zabudowy, siedem komór w ramie i pakiety szybowe 18–52 mm. Uw = 0,73 W/(m²K) dla drzwi referencyjnych 3,5 × 2,3 m.",
        },
        specs: [
          { label: { en: "Opening type", de: "Öffnungsart", pl: "Sposób otwierania" }, value: { en: "Lift-and-slide (HS)", de: "Hebe-Schiebe (HS)", pl: "Podnoszono-przesuwne (HS)" }, highlight: true },
          { label: { en: "Uw (reference door)", de: "Uw (Referenztür)", pl: "Uw (drzwi referencyjne)" }, value: "0.73", unit: "W/m²K", highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: "194", unit: "mm", highlight: true },
          { label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" }, value: "7 / 5" },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "A" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: "2" },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "18–52 mm", de: "18–52 mm", pl: "18–52 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=8",
        image: "/images/manufacturers/veka-motion-82-max.jpg",
      },
      {
        id: "motion-82",
        name: "VEKA Motion 82",
        tagline: {
          en: "Lift-and-slide with centre gasket, Uw 0.78.",
          de: "Hebe-Schiebe mit Mitteldichtung, Uw 0,78.",
          pl: "System HS z uszczelką środkową, Uw 0,78.",
        },
        description: {
          en: "The lift-and-slide (HS) system on the same 194-mm depth, with three gaskets including a central one and glazing packs from 24 to 52 mm. Uw of 0.78 W/m²K on the reference door.",
          de: "Das Hebe-Schiebe-System (HS) auf derselben 194-mm-Bautiefe, mit drei Dichtungen inklusive Mitteldichtung und Glaspaketen von 24 bis 52 mm. Uw = 0,78 W/(m²K) an der Referenztür.",
          pl: "System podnoszono-przesuwny (HS) na tej samej głębokości 194 mm, z trzema uszczelkami — w tym środkową — i pakietami szybowymi 24–52 mm. Uw = 0,78 W/(m²K) dla drzwi referencyjnych.",
        },
        specs: [
          { label: { en: "Opening type", de: "Öffnungsart", pl: "Sposób otwierania" }, value: { en: "Lift-and-slide (HS)", de: "Hebe-Schiebe (HS)", pl: "Podnoszono-przesuwne (HS)" }, highlight: true },
          { label: { en: "Uw (reference door)", de: "Uw (Referenztür)", pl: "Uw (drzwi referencyjne)" }, value: "0.78", unit: "W/m²K", highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: "194", unit: "mm", highlight: true },
          { label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" }, value: "7 / 5" },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "A" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3, centre gasket", de: "3, Mitteldichtung", pl: "3, uszczelka środkowa" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "24–52 mm", de: "24–52 mm", pl: "24–52 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=8",
        image: "/images/manufacturers/veka-motion-82.jpg",
      },
      {
        id: "move-76",
        name: "VEKA Move 76",
        tagline: {
          en: "The 150-mm slider, Uw 0.81.",
          de: "Der 150-mm-Schieber, Uw 0,81.",
          pl: "System przesuwny 150 mm, Uw 0,81.",
        },
        description: {
          en: "The sliding system where a lift-and-slide build is not needed: 150 mm of build depth, three gaskets including a central one, glazing packs from 24 to 48 mm. Uw of 0.81 W/m²K on the reference door.",
          de: "Das Schiebesystem, wo kein Hebe-Schiebe-Aufbau nötig ist: 150 mm Bautiefe, drei Dichtungen inklusive Mitteldichtung, Glaspakete von 24 bis 48 mm. Uw = 0,81 W/(m²K) an der Referenztür.",
          pl: "System przesuwny tam, gdzie nie potrzeba konstrukcji HS: 150 mm głębokości zabudowy, trzy uszczelki z uszczelką środkową, pakiety szybowe 24–48 mm. Uw = 0,81 W/(m²K) dla drzwi referencyjnych.",
        },
        specs: [
          { label: { en: "Opening type", de: "Öffnungsart", pl: "Sposób otwierania" }, value: { en: "Sliding", de: "Schiebetür", pl: "Przesuwne" }, highlight: true },
          { label: { en: "Uw (reference door)", de: "Uw (Referenztür)", pl: "Uw (drzwi referencyjne)" }, value: "0.81", unit: "W/m²K", highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: "150", unit: "mm", highlight: true },
          { label: { en: "Chambers (frame / sash)", de: "Kammern (Rahmen / Flügel)", pl: "Komory (rama / skrzydło)" }, value: "7 / 5" },
          { label: { en: "Profile class", de: "Profilklasse", pl: "Klasa profilu" }, value: "A" },
          { label: { en: "Seals", de: "Dichtungen", pl: "Uszczelki" }, value: { en: "3, centre gasket", de: "3, Mitteldichtung", pl: "3, uszczelka środkowa" } },
          { label: { en: "Glazing packages", de: "Verglasungspakete", pl: "Pakiety szybowe" }, value: { en: "24–48 mm", de: "24–48 mm", pl: "24–48 mm" } },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=8",
        image: "/images/manufacturers/veka-move-76.jpg",
      },
    ],
  },
  {
    /**
     * Las correderas de aluminio PROCURAL del mismo catálogo. El
     * catálogo imprime "EI200" en la casilla de estanqueidad del PE78
     * Fold: las clases de agua son E-cifra (E750…E1950), así que se
     * transcribe E1200 — kerning roto, misma regla que la errata
     * 7,73→0,73 del folleto Salamander.
     */
    id: "procural",
    category: "patio-doors",
    name: "PROCURAL",
    tagline: {
      en: "Aluminium lift-and-slide and folding systems.",
      de: "Hebe-Schiebe- und Faltsysteme aus Aluminium.",
      pl: "Aluminiowe systemy HS i harmonijkowe.",
    },
    intro: {
      en: "When the opening outgrows PVC: the Alu Slide SL1600TT HI lift-and-slide carries sashes up to 600 kg and 3.3 m of width, and the PE78 Fold folds a whole wall away. Both in aluminium, both from the self-hosted WIKĘD catalogue.",
      de: "Wenn die Öffnung über Kunststoff hinauswächst: das Hebe-Schiebe-System Alu Slide SL1600TT HI trägt Flügel bis 600 kg und 3,3 m Breite, und das PE78 Fold faltet eine ganze Wand beiseite. Beide aus Aluminium, beide aus dem selbst gehosteten WIKĘD-Katalog.",
      pl: "Gdy otwór wyrasta ponad PCV: system podnoszono-przesuwny Alu Slide SL1600TT HI nosi skrzydła do 600 kg i 3,3 m szerokości, a PE78 Fold składa całą ścianę na bok. Oba z aluminium, oba z samodzielnie hostowanego katalogu WIKĘD.",
    },
    image: "/images/manufacturers/procural-schiebe.jpg",
    systems: [
      {
        id: "alu-slide-sl1600tt-hi",
        name: "Alu Slide SL1600TT HI",
        tagline: {
          en: "Sashes up to 600 kg, Uw 0.92.",
          de: "Flügel bis 600 kg, Uw 0,92.",
          pl: "Skrzydła do 600 kg, Uw 0,92.",
        },
        description: {
          en: "The aluminium lift-and-slide for the really big openings: sashes up to 3300×3000 mm or 2300×3500 mm and 600 kg, on two or three tracks. Uw of 0.92 W/m²K on the 3.5 × 2.4 m reference build.",
          de: "Das Aluminium-Hebe-Schiebe-System für die wirklich großen Öffnungen: Flügel bis 3300×3000 mm bzw. 2300×3500 mm und 600 kg, auf zwei oder drei Laufschienen. Uw = 0,92 W/(m²K) an der Referenzkonstruktion von 3,5 × 2,4 m.",
          pl: "Aluminiowy system HS do naprawdę dużych otworów: skrzydła do 3300×3000 mm lub 2300×3500 mm i 600 kg, na dwóch lub trzech torach. Uw = 0,92 W/(m²K) dla konstrukcji referencyjnej 3,5 × 2,4 m.",
        },
        specs: [
          { label: { en: "Opening type", de: "Öffnungsart", pl: "Sposób otwierania" }, value: { en: "Lift-and-slide (HS)", de: "Hebe-Schiebe (HS)", pl: "Podnoszono-przesuwne (HS)" }, highlight: true },
          { label: { en: "Uw (reference build)", de: "Uw (Referenzkonstruktion)", pl: "Uw (konstrukcja referencyjna)" }, value: "0.92", unit: "W/m²K", highlight: true },
          { label: { en: "Max. sash", de: "Max. Flügel", pl: "Maks. skrzydło" }, value: { en: "3300×3000 / 2300×3500 mm, 600 kg", de: "3300×3000 / 2300×3500 mm, 600 kg", pl: "3300×3000 / 2300×3500 mm, 600 kg" }, highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: { en: "2 tracks 160/154 mm, 3 tracks 247/241 mm, sash 67 mm", de: "2 Laufschienen 160/154 mm, 3 Laufschienen 247/241 mm, Flügel 67 mm", pl: "2 tory 160/154 mm, 3 tory 247/241 mm, skrzydło 67 mm" } },
          { label: { en: "Watertightness", de: "Schlagregendichtheit", pl: "Wodoszczelność" }, value: "9A" },
          { label: { en: "Wind load", de: "Windlast", pl: "Obciążenie wiatrem" }, value: "C3/B5" },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=24",
        image: "/images/manufacturers/procural-alu-slide-sl1600tt-hi.jpg",
      },
      {
        id: "pe78-fold",
        name: "PE78 Fold",
        tagline: {
          en: "The folding wall: sashes up to 1200×3500 mm.",
          de: "Die Faltwand: Flügel bis 1200×3500 mm.",
          pl: "Ściana harmonijkowa: skrzydła do 1200×3500 mm.",
        },
        description: {
          en: "The folding-door system on the 78-mm aluminium platform: sashes up to 1200×3500 mm and 120 kg fold away to open the entire span. Uw of 1.0 W/m²K on the reference build.",
          de: "Das Falttür-System auf der 78-mm-Aluminiumplattform: Flügel bis 1200×3500 mm und 120 kg falten sich beiseite und geben die ganze Breite frei. Uw = 1,0 W/(m²K) an der Referenzkonstruktion.",
          pl: "System drzwi harmonijkowych na aluminiowej platformie 78 mm: skrzydła do 1200×3500 mm i 120 kg składają się na bok, otwierając całą szerokość. Uw = 1,0 W/(m²K) dla konstrukcji referencyjnej.",
        },
        specs: [
          { label: { en: "Opening type", de: "Öffnungsart", pl: "Sposób otwierania" }, value: { en: "Folding", de: "Falttür", pl: "Harmonijkowe" }, highlight: true },
          { label: { en: "Uw (reference build)", de: "Uw (Referenzkonstruktion)", pl: "Uw (konstrukcja referencyjna)" }, value: "1.0", unit: "W/m²K", highlight: true },
          { label: { en: "Max. sash", de: "Max. Flügel", pl: "Maks. skrzydło" }, value: { en: "1200×3500 mm, 120 kg", de: "1200×3500 mm, 120 kg", pl: "1200×3500 mm, 120 kg" }, highlight: true },
          { label: { en: "Build depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: { en: "Frame 78 mm / sash 78 mm, 34 mm break", de: "Rahmen 78 mm / Flügel 78 mm, Steg 34 mm", pl: "Ościeżnica 78 mm / skrzydło 78 mm, przekładka 34 mm" } },
          { label: { en: "Watertightness", de: "Schlagregendichtheit", pl: "Wodoszczelność" }, value: "E1200" },
          { label: { en: "Wind load", de: "Windlast", pl: "Obciążenie wiatrem" }, value: "C3/B3" },
        ],
        datasheet: "/pdf/catalogues/wiked-pvc-alu.pdf#page=24",
        image: "/images/manufacturers/procural-pe78-fold.jpg",
      },
    ],
  },
  {
    // Las correderas del Aluminium-Katalog, marca a marca — las
    // ventanas de cada una están en su entrada gemela de "windows".
    id: "aluprof",
    category: "patio-doors",
    name: "Aluprof",
    tagline: {
      en: "Sliding, lift-slide and folding, up to 400 kg per leaf.",
      de: "Schiebe-, Hebeschiebe- und Faltanlagen, bis 400 kg pro Flügel.",
      pl: "Systemy przesuwne, HST i składane, do 400 kg na skrzydło.",
    },
    intro: {
      en: "Aluprof's terrace range in our self-hosted Aluminium catalogue: the MB-Slide sliding system with up to 6 leaves, the MB-59 HS and MB-77 HS lift-slide systems — the latter with an all-glass corner option and 400-kg leaves — and the MB-86 Fold Line HD folding wall. All specs are copied from the catalogue sheets.",
      de: "Die Terrassen-Palette von Aluprof in unserem selbst gehosteten Aluminium-Katalog: das Schiebesystem MB-Slide mit bis zu 6 Flügeln, die Hebeschiebesysteme MB-59 HS und MB-77 HS — letzteres mit Ganzglas-Ecke und 400-kg-Flügeln — und die Faltwand MB-86 Fold Line HD. Alle Specs sind aus den Katalogpliegos kopiert.",
      pl: "Tarasowa oferta Aluprof w naszym samodzielnie hostowanym katalogu aluminium: system przesuwny MB-Slide do 6 skrzydeł, systemy HST MB-59 HS i MB-77 HS — ten drugi z opcją całoszklanego narożnika i skrzydłami 400 kg — oraz ściana składana MB-86 Fold Line HD. Wszystkie parametry skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/aluprof-schiebe.jpg",
    systems: [
      {
        id: "mb-slide",
        name: "MB-Slide",
        tagline: {
          en: "Sliding doors with 2 to 6 leaves.",
          de: "Schiebetüren mit 2 bis 6 Flügeln.",
          pl: "Drzwi przesuwne od 2 do 6 skrzydeł.",
        },
        description: {
          en: "The MB-Slide sliding system opens fascinating structural possibilities and sets new standards in creative space design. It comes in a variety of flexible configurations from 2 up to 6 leaves — for maximum freedom in realising your living dreams.",
          de: "Das Schiebesystem MB-Slide eröffnet faszinierende konstruktive Möglichkeiten und setzt neue Maßstäbe bei der kreativen Raumgestaltung. Es ist in einer Vielzahl flexibler Ausführungsvarianten von 2 bis zu 6 Flügeln erhältlich – für maximale Freiheit bei der Umsetzung Ihrer Wohnträume.",
          pl: "System przesuwny MB-Slide otwiera fascynujące możliwości konstrukcyjne i wyznacza nowe standardy kreatywnej aranżacji przestrzeni. Dostępny w wielu elastycznych wariantach od 2 do 6 skrzydeł — dla maksymalnej swobody realizacji marzeń o mieszkaniu.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "50 mm (door) / 97 mm (window)", de: "50 mm (Tür) / 97 mm (Fenster)", pl: "50 mm (drzwi) / 97 mm (okno)" }, highlight: true },
          { label: AL.sashDepth, value: "37", unit: "mm", highlight: true },
          { label: AL.glazing, value: "24 mm", highlight: true },
          { label: AL.minFrame, value: "44,5 mm" },
          { label: AL.minSash, value: "68,5 mm" },
          { label: AL.maxSash, value: "H 2600 × L 1800 mm" },
          { label: AL.maxWeight, value: "160 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=9",
        image: "/images/manufacturers/aluprof-mb-slide.jpg",
      },
      {
        id: "mb-59-hs",
        name: "MB-59 HS",
        tagline: {
          en: "Lift-slide with up to 6 leaves, ST and HI versions.",
          de: "Hebeschiebe mit bis zu 6 Flügeln, als ST und HI.",
          pl: "HST do 6 skrzydeł, w wersjach ST i HI.",
        },
        description: {
          en: "The MB-59 HS lift-slide system allows imposing constructions with up to 6 leaves — a spectacular, flowing transition between living space and nature, and barrier-free, comfortable exits to terrace, balcony or garden.",
          de: "Das Hebe-Schiebe-System MB-59 HS ermöglicht die Realisierung imposanter Konstruktionen mit bis zu 6 Flügeln. Dadurch schaffen Sie einen spektakulären, fließenden Übergang zwischen dem Wohnbereich und der Natur sowie barrierefreie, komfortable Ausgänge zu Terrasse, Balkon oder Garten.",
          pl: "System HST MB-59 HS pozwala realizować imponujące konstrukcje do 6 skrzydeł — spektakularne, płynne przejście między przestrzenią mieszkalną a naturą oraz bezprogowe, wygodne wyjścia na taras, balkon czy do ogrodu.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "120 mm (2 tracks) / 199 mm (3 tracks)", de: "120 mm (2 Laufschienen) / 199 mm (3 Laufschienen)", pl: "120 mm (2 tory) / 199 mm (3 tory)" }, highlight: true },
          { label: AL.sashDepth, value: "59", unit: "mm", highlight: true },
          { label: AL.variants, value: "MB-59HS ST / HI", highlight: true },
          { label: AL.glazing, value: { en: "up to 42 mm", de: "bis 42 mm", pl: "do 42 mm" } },
          { label: AL.minFrame, value: "44 mm" },
          { label: AL.minSash, value: "83,5 – 94,5 mm" },
          { label: AL.maxSash, value: "H 2800 × L 3000 mm" },
          { label: AL.maxWeight, value: "300 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=9",
        image: "/images/manufacturers/aluprof-mb-59-hs.jpg",
      },
      {
        id: "mb-77-hs",
        name: "MB-77 HS",
        tagline: {
          en: "Lift-slide flagship with all-glass corner option.",
          de: "Hebeschiebe-Flaggschiff mit Ganzglas-Ecke.",
          pl: "Flagowy HST z opcją całoszklanego narożnika.",
        },
        description: {
          en: "This innovative system allows an elegant, fully opening all-glass corner without a disturbing corner post. It also convinces with an extremely slim central meeting stile for maximum transparency, plus optional additional insulators in the highly energy-efficient HI version. Also available as Monorail.",
          de: "Dieses innovative System ermöglicht Ihnen die Realisierung einer eleganten komplett öffnenden Ganzglasecke ohne störenden Eckpfosten. Zudem überzeugt es durch einen extrem schmalen Mittelstoß für maximale Transparenz sowie die Option auf zusätzliche Isolatoren in der hochgradig energieeffizienten HI-Variante. Auch als Monorail erhältlich.",
          pl: "Ten innowacyjny system pozwala zrealizować elegancki, w pełni otwierany całoszklany narożnik bez przeszkadzającego słupka. Przekonuje też wyjątkowo wąskim stykiem środkowym dla maksymalnej przejrzystości oraz opcją dodatkowych izolatorów w wysoce energooszczędnej wersji HI. Dostępny również jako Monorail.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "174 mm / 271 mm (HI)", de: "174 mm / 271 mm (HI)", pl: "174 mm / 271 mm (HI)" }, highlight: true },
          { label: AL.sashDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.maxWeight, value: "400 kg", highlight: true },
          { label: AL.glazing, value: "13,5 – 58,5 mm" },
          { label: AL.minFrame, value: "48 mm" },
          { label: AL.minSash, value: "94,5 – 105,5 mm" },
          { label: AL.maxSash, value: "H 3200 × L 3200 mm" },
          { label: AL.variants, value: { en: "MB-77 HS / HI / Monorail, all-glass corner option", de: "MB-77 HS / HI / Monorail, Option Ganzglas-Ecke", pl: "MB-77 HS / HI / Monorail, opcja narożnika całoszklanego" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=10",
        image: "/images/manufacturers/aluprof-mb-77-hs.jpg",
      },
      {
        id: "mb-86-fold-line-hd",
        name: "MB-86 Fold Line HD",
        tagline: {
          en: "Folding glass walls, in or out, zero-threshold option.",
          de: "Falt-Glaswände, nach innen oder außen, Nullschwelle möglich.",
          pl: "Składane ściany szklane, do środka lub na zewnątrz, opcja zerowego progu.",
        },
        description: {
          en: "MB-86 FOLD LINE HD allows large folding-sliding installations for outdoor use that open flexibly inward or outward and fold away to save space. This exclusive glass front can be configured on many opening schemes to match individual architectural needs, and offers the industry's widest range of threshold solutions — from maximum-tightness rebated thresholds to comfortable, barrier-free zero thresholds.",
          de: "Das System MB-86 FOLD LINE HD ermöglicht die Realisierung großflächiger Falt-Schiebe-Anlagen für den Außenbereich, die sich flexibel nach außen oder innen öffnen und platzsparend zusammenfalten lassen. Diese exklusive Glasfront lässt sich auf Basis zahlreicher facettenreicher Öffnungsschemen exakt nach Ihren individuellen architektonischen Anforderungen konfigurieren. Das System besticht durch die branchenweit größte Vielfalt an Schwellenlösungen: von maximal dichten Anschlagsschwellen bis hin zu hochkomfortablen, barrierefreien Bodenschwellen (Nullschwellen) für ein absolut nahtloses Wohngefühl.",
          pl: "MB-86 FOLD LINE HD pozwala realizować wielkopowierzchniowe zewnętrzne konstrukcje składano-przesuwne, otwierane elastycznie do wewnątrz lub na zewnątrz i składające się z oszczędnością miejsca. Tę ekskluzywną szklaną fasadę można konfigurować według licznych schematów otwierania, a system oferuje najszerszy w branży wybór progów: od maksymalnie szczelnych przylgowych po komfortowe progi zerowe bez barier.",
        },
        specs: [
          { label: AL.frameDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 60 mm", de: "bis 60 mm", pl: "do 60 mm" }, highlight: true },
          { label: AL.maxSash, value: "H 3000 × L 1000 mm" },
          { label: AL.maxWeight, value: "120 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=10",
        image: "/images/manufacturers/aluprof-mb-86-fold-line-hd.jpg",
      },
    ],
  },
  {
    id: "aliplast",
    category: "patio-doors",
    name: "Aliplast",
    tagline: {
      en: "From frameless Slide Glass to the 440-kg Ultraglide.",
      de: "Vom rahmenlosen Slide Glass bis zum 440-kg-Ultraglide.",
      pl: "Od bezramowego Slide Glass po Ultraglide 440 kg.",
    },
    intro: {
      en: "Aliplast's sliding chapter in our self-hosted Aluminium catalogue: the interior and pergola glazing Slide Glass, the ModernSlide and Visoglide lift-slide families, the heavyweight Ultraglide with leaves up to 440 kg — including a Max Light Monorail version — and the Panorama folding wall with up to 8 leaves. All specs are copied from the catalogue sheets.",
      de: "Das Schiebe-Kapitel von Aliplast in unserem selbst gehosteten Aluminium-Katalog: die Innen- und Pergola-Verglasung Slide Glass, die Hebeschiebe-Familien ModernSlide und Visoglide, das Schwergewicht Ultraglide mit Flügeln bis 440 kg — inklusive Max-Light-Monorail-Variante — und die Faltwand Panorama mit bis zu 8 Flügeln. Alle Specs sind aus den Katalogpliegos kopiert.",
      pl: "Przesuwny rozdział Aliplast w naszym samodzielnie hostowanym katalogu aluminium: wewnętrzne i pergolowe przeszklenie Slide Glass, rodziny HST ModernSlide i Visoglide, ciężki Ultraglide ze skrzydłami do 440 kg — w tym wariant Max Light Monorail — oraz ściana składana Panorama do 8 skrzydeł. Wszystkie parametry skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/aliplast-schiebe.jpg",
    systems: [
      {
        id: "slide-glass",
        name: "Slide Glass",
        tagline: {
          en: "Slim glass sliding walls for interiors and pergolas.",
          de: "Schlanke Glas-Schiebewände für Innenräume und Pergolen.",
          pl: "Smukłe szklane ściany przesuwne do wnętrz i pergoli.",
        },
        description: {
          en: "SLIDE GLASS is an ultra-modern sliding system for contemporary interiors (uninsulated, without thermal break) that perfectly unites ergonomics and demanding design. By enlarging the glass surfaces it guarantees maximum light and a bright, cosy atmosphere. SLIDE GLASS also sets standards in pergolas, serving as an elegant windbreak that stylishly extends outdoor living.",
          de: "SLIDE GLASS ist ein hochmodernes Schiebesystem für zeitgemäße Innenräume (in unisolierter Ausführung ohne thermische Trennung), das höchste Ansprüche an Ergonomie und anspruchsvolles Design perfekt vereint. Durch die Vergrößerung der Glasflächen garantiert das System einen maximalen Lichteinfall und schafft eine lichtdurchflutete, wohlige Atmosphäre. Darüber hinaus setzt SLIDE GLASS Maßstäbe beim Einsatz in Pergolen: Hier dient es als eleganter Windschutz, der zuverlässigen Komfort bietet und das Leben im Freien stilvoll verlängert.",
          pl: "SLIDE GLASS to nowoczesny system przesuwny do współczesnych wnętrz (w wersji nieizolowanej, bez przekładki termicznej), doskonale łączący ergonomię z wymagającym designem. Powiększając powierzchnie szklane, gwarantuje maksymalny dopływ światła i przytulną, jasną atmosferę. SLIDE GLASS wyznacza też standardy w pergolach: jako elegancka osłona przed wiatrem stylowo przedłuża życie na świeżym powietrzu.",
        },
        specs: [
          { label: AL.frameDepth, value: "71,1 – 115,5 mm", highlight: true },
          { label: AL.glazing, value: "10 mm", highlight: true },
          { label: AL.minFrame, value: "6,3 mm", highlight: true },
          { label: AL.minSash, value: "61 mm" },
          { label: AL.maxDoorLeaf, value: "H 2600 × L 1100 mm" },
          { label: AL.maxWeight, value: "80 kg" },
          { label: AL.variants, value: { en: "Monoblock option", de: "Option Monoblock", pl: "Opcja monoblock" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=20",
        image: "/images/manufacturers/aliplast-slide-glass.jpg",
      },
      {
        id: "modernslide",
        name: "ModernSlide",
        tagline: {
          en: "Lift-slide with up to 6 leaves on 2 or 3 tracks.",
          de: "Hebeschiebe mit bis zu 6 Flügeln auf 2 oder 3 Schienen.",
          pl: "HST do 6 skrzydeł na 2 lub 3 torach.",
        },
        description: {
          en: "The system was developed specifically for ultra-modern sliding and lift-slide installations — with a classic or barrier-free flat threshold. The versatile construction combines up to six elements on two or three tracks, opening new dimensions for large-area glazing, maximum daylight and unrestricted architectural freedom.",
          de: "Das System wurde speziell für die Realisierung hochmoderner Schiebe- und Hebeschiebeanlagen entwickelt – wahlweise mit klassischer oder barrierefreier Flachschwelle. Die vielseitige Konstruktion ermöglicht die Kombination von bis zu sechs Elementen auf zwei oder drei Laufschienen und eröffnet somit neue Dimensionen für großflächige Verglasungen, maximalen Tageslichteinfall und uneingeschränkte architektonische Freiheit.",
          pl: "System opracowano specjalnie dla nowoczesnych konstrukcji przesuwnych i HST — z klasycznym lub bezbarierowym płaskim progiem. Wszechstronna konstrukcja łączy do sześciu elementów na dwóch lub trzech torach, otwierając nowe wymiary wielkich przeszkleń, maksymalnego światła dziennego i nieograniczonej swobody architektonicznej.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "65 mm (2-track) – 117 mm (3-track); 196 mm (monoblock)", de: "65 mm (2-gleisig) – 117 mm (3-gleisig); 196 mm (Monoblock)", pl: "65 mm (2 tory) – 117 mm (3 tory); 196 mm (monoblock)" }, highlight: true },
          { label: AL.sashDepth, value: "44", unit: "mm", highlight: true },
          { label: AL.maxWeight, value: "250 kg", highlight: true },
          { label: AL.glazing, value: { en: "24, 28 or 32 mm", de: "24, 28 oder 32 mm", pl: "24, 28 lub 32 mm" } },
          { label: AL.minFrame, value: "47 mm" },
          { label: AL.minSash, value: "71,2 mm" },
          { label: AL.maxDoorLeaf, value: "H 1700 × L 2400 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=20",
        image: "/images/manufacturers/aliplast-modernslide.jpg",
      },
      {
        id: "visoglide-plus",
        name: "Visoglide Plus",
        tagline: {
          en: "Insulated slide and lift-slide up to 250 kg.",
          de: "Gedämmtes Schiebe- und Hebeschiebesystem bis 250 kg.",
          pl: "Izolowany system przesuwny i HST do 250 kg.",
        },
        description: {
          en: "The VG PLUS sliding system seamlessly builds classic sliding as well as ultra-modern lift-slide constructions. Equipped with innovative thermal-break technology and excellent tightness, it allows extremely large glass fronts with up to six elements on three tracks — for maximum energy efficiency, impressive panoramic views and timeless architecture.",
          de: "Das Schiebesystem VG PLUS ermöglicht die nahtlose Realisierung klassischer Schiebe- sowie hochmoderner Hebeschiebekonstruktionen. Ausgestattet mit innovativer Isoliersteg-Technologie und hervorragender Dichtigkeit erlaubt das System die Gestaltung selbst extrem großflächiger Glasfronten mit bis zu sechs Elementen auf drei Laufschienen – für maximale Energieeffizienz, beeindruckende Panoramaausblicke und zeitlose Architektur.",
          pl: "System przesuwny VG PLUS pozwala płynnie realizować klasyczne konstrukcje przesuwne oraz nowoczesne HST. Dzięki innowacyjnej technologii przekładek termicznych i znakomitej szczelności umożliwia nawet ekstremalnie duże szklane fronty do sześciu elementów na trzech torach — dla maksymalnej efektywności energetycznej, imponujących widoków i ponadczasowej architektury.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "118 / 142 / 184 mm (1–3 tracks)", de: "118 / 142 / 184 mm (1–3-gleisig)", pl: "118 / 142 / 184 mm (1–3 tory)" }, highlight: true },
          { label: AL.sashDepth, value: "51", unit: "mm", highlight: true },
          { label: AL.maxWeight, value: { en: "Sliding up to 250 kg / lift-slide up to 200 kg", de: "Schiebe bis 250 kg / Hebeschiebe bis 200 kg", pl: "Przesuwne do 250 kg / HST do 200 kg" }, highlight: true },
          { label: AL.glazing, value: { en: "Frame 6–36 mm / sash 18–60 mm", de: "Blendrahmen 6–36 mm / Flügel 18–60 mm", pl: "Ościeżnica 6–36 mm / skrzydło 18–60 mm" } },
          { label: AL.maxDoorLeaf, value: "H 3000 × L 2500 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=21",
        image: "/images/manufacturers/aliplast-visoglide-plus.jpg",
      },
      {
        id: "visoglide",
        name: "Visoglide",
        tagline: {
          en: "Lift-slide with up to 6 leaves, flat-threshold option.",
          de: "Hebeschiebe mit bis zu 6 Flügeln, Flachschwelle möglich.",
          pl: "HST do 6 skrzydeł, opcja płaskiego progu.",
        },
        description: {
          en: "The system seamlessly builds ultra-modern sliding and lift-slide constructions with flexible options for a classic or barrier-free flat threshold. This first-class solution integrates up to six leaves in a two- or three-track configuration — for maximum architectural variety, large-area glazing and first-class operating comfort.",
          de: "Das System ermöglicht die nahtlose Realisierung hochmoderner Schiebe- sowie Hebeschiebekonstruktionen und bietet dabei flexible Optionen mit klassischer oder barrierefreier Flachschwelle. Diese erstklassige Lösung erlaubt die Integration von bis zu sechs Flügeln in einer zwei- oder dreigleisigen Ausführung – für maximale architektonische Vielfalt, großflächige Verglasungen und erstklassigen Bedienkomfort.",
          pl: "System płynnie realizuje nowoczesne konstrukcje przesuwne i HST, oferując elastyczne opcje z klasycznym lub bezbarierowym płaskim progiem. To pierwszorzędne rozwiązanie integruje do sześciu skrzydeł w układzie dwu- lub trzytorowym — dla maksymalnej różnorodności architektonicznej, dużych przeszkleń i najwyższego komfortu obsługi.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "117.7 / 125.4 / 141.6 mm (standard / special / Monorail frame)", de: "117,7 / 125,4 / 141,6 mm (Standard- / Spezial- / Monorail-Rahmen)", pl: "117,7 / 125,4 / 141,6 mm (rama standardowa / specjalna / Monorail)" }, highlight: true },
          { label: AL.sashDepth, value: "51", unit: "mm", highlight: true },
          { label: AL.maxWeight, value: "250 kg", highlight: true },
          { label: AL.glazing, value: "6 – 36 mm" },
          { label: AL.minFrame, value: { en: "27.5 mm (door) / 52 mm (partition)", de: "27,5 mm (Tür) / 52 mm (Trennwand)", pl: "27,5 mm (drzwi) / 52 mm (ścianka)" } },
          { label: AL.minSash, value: "90 mm" },
          { label: AL.maxDoorLeaf, value: "H 1700 × L 2400 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=21",
        image: "/images/manufacturers/aliplast-visoglide.jpg",
      },
      {
        id: "ultraglide-max-light-monorail",
        name: "Ultraglide Max Light Monorail",
        tagline: {
          en: "Top-class lift-slide, leaves up to 440 kg.",
          de: "Hebeschiebe der Spitzenklasse, Flügel bis 440 kg.",
          pl: "HST najwyższej klasy, skrzydła do 440 kg.",
        },
        description: {
          en: "A top-class thermally broken sliding system developed specifically for large-area glass architecture. It meets the highest standards of thermal and acoustic insulation.",
          de: "Es handelt sich um ein hochklassiges Schiebesystem mit thermischer Trennung, das speziell für großflächige Glasarchitektur entwickelt wurde. Es erfüllt höchste Standards in puncto Wärme- und Schalldämmung.",
          pl: "To wysokiej klasy system przesuwny z przekładką termiczną, opracowany specjalnie dla wielkopowierzchniowej architektury szklanej. Spełnia najwyższe standardy izolacyjności cieplnej i akustycznej.",
        },
        specs: [
          { label: AL.frameDepth, value: "176", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "67", unit: "mm", highlight: true },
          { label: AL.maxWeight, value: "440 kg", highlight: true },
          { label: AL.glazing, value: "15 – 51 mm" },
          { label: { en: "Frame face width", de: "Türrahmen / Trennwandrahmen", pl: "Szerokość czołowa ramy" }, value: "55 mm" },
          { label: { en: "Meeting-stile profile", de: "Stulpprofil", pl: "Profil styku skrzydeł" }, value: "45 mm" },
          { label: AL.maxDoorLeaf, value: "H 2800 × L 3000 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=22",
        image: "/images/manufacturers/aliplast-ultraglide-max-light-monorail.jpg",
      },
      {
        id: "ultraglide",
        name: "Ultraglide",
        tagline: {
          en: "Large glazing with glass-fibre thermal breaks.",
          de: "Große Verglasungen mit Glasfaser-Isolierstegen.",
          pl: "Duże przeszklenia z przekładkami z włókna szklanego.",
        },
        description: {
          en: "The system allows impressive large-area glazing that maximises interior light and gives boundless freedom in space design. The state-of-the-art glass-fibre-reinforced thermal break in 22-mm and 28-mm widths guarantees outstanding stability, top functionality and a surprisingly light construction. Available as Ultraglide i and i+.",
          de: "Das System ermöglicht die Realisierung beeindruckender, großflächiger Verglasungen, die für eine maximale Lichtausbeute im Innenraum sorgen und Ihnen grenzenlose Freiheit bei der Raumgestaltung bieten. Zudem garantiert die hochmoderne, glasfaserverstärkte thermische Trennung in den Breiten 22 mm und 28 mm eine herausragende Stabilität, höchste Funktionalität und eine überraschend leichte Bauweise. Erhältlich als Ultraglide i und i+.",
          pl: "System pozwala realizować imponujące, wielkopowierzchniowe przeszklenia, maksymalizujące światło we wnętrzu i dające nieograniczoną swobodę aranżacji. Nowoczesna przekładka termiczna wzmocniona włóknem szklanym o szerokości 22 i 28 mm gwarantuje znakomitą stabilność, najwyższą funkcjonalność i zaskakująco lekką konstrukcję. Dostępny jako Ultraglide i oraz i+.",
        },
        specs: [
          { label: AL.frameDepth, value: "153 – 239 mm", highlight: true },
          { label: AL.sashDepth, value: "67", unit: "mm", highlight: true },
          { label: AL.maxWeight, value: "400 kg", highlight: true },
          { label: AL.variants, value: "Ultraglide i / i+" },
          { label: AL.glazing, value: "14 – 52 mm" },
          { label: AL.minFrame, value: { en: "30 mm (door) / 56.5 mm (partition)", de: "30 mm (Tür) / 56,5 mm (Trennwand)", pl: "30 mm (drzwi) / 56,5 mm (ścianka)" } },
          { label: AL.minSash, value: "100 mm" },
          { label: AL.maxDoorLeaf, value: "H 2800 × L 3000 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=22",
        image: "/images/manufacturers/aliplast-ultraglide.jpg",
      },
      {
        id: "panorama",
        name: "Panorama",
        tagline: {
          en: "Folding walls with 2 to 8 leaves, in or out.",
          de: "Faltwände mit 2 bis 8 Flügeln, nach innen oder außen.",
          pl: "Ściany składane od 2 do 8 skrzydeł, do środka lub na zewnątrz.",
        },
        description: {
          en: "The system offers maximum flexibility with 2 to 8 leaves. They glide effortlessly on precisely guided tracks that keep the whole mechanism working perfectly. Thanks to the innovative option of folding the elements inward or outward, you enjoy unrestricted design freedom and top operating comfort.",
          de: "Das System bietet maximale Flexibilität und ermöglicht die Realisierung von 2 bis 8 Flügeln. Diese gleiten absolut mühelos über präzise geführte Laufschienen, die für eine perfekte Funktionalität des gesamten Mechanismus sorgen. Dank der innovativen Option, die Elemente wahlweise nach innen oder außen zu falten, genießen Sie uneingeschränkte Gestaltungsfreiheit und höchsten Bedienkomfort.",
          pl: "System oferuje maksymalną elastyczność: od 2 do 8 skrzydeł. Przesuwają się one bez wysiłku po precyzyjnie prowadzonych torach, zapewniających idealną pracę całego mechanizmu. Dzięki innowacyjnej opcji składania elementów do wewnątrz lub na zewnątrz zyskujesz nieograniczoną swobodę aranżacji i najwyższy komfort obsługi.",
        },
        specs: [
          { label: AL.frameDepth, value: "74,5", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "74,5", unit: "mm", highlight: true },
          { label: AL.glazing, value: "16 – 50 mm", highlight: true },
          { label: { en: "Door-frame face width", de: "Türrahmen", pl: "Szerokość czołowa ościeżnicy" }, value: "57,5 mm" },
          { label: AL.minSash, value: "73 mm" },
          { label: AL.maxDoorLeaf, value: "H 1200 × L 2500 mm" },
          { label: AL.maxWeight, value: "100 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=23",
        image: "/images/manufacturers/aliplast-panorama.jpg",
      },
    ],
  },
  {
    id: "deceuninck",
    category: "patio-doors",
    name: "Deceuninck",
    tagline: {
      en: "Decalu folding walls and the 163 Slide lift-slide.",
      de: "Decalu-Faltwände und die Hebeschiebetür 163 Slide.",
      pl: "Ściany składane Decalu i HST 163 Slide.",
    },
    intro: {
      en: "Two Decalu terrace systems from our self-hosted Aluminium catalogue: the Decalu 88 Folding Doors wall with elements up to 3 m high and 6.5 m wide, and the Decalu 163 Slide lift-slide with 400-kg leaves and a meeting stile of just 73 mm. All specs are copied from the catalogue sheets.",
      de: "Zwei Decalu-Terrassensysteme aus unserem selbst gehosteten Aluminium-Katalog: die Faltwand Decalu 88 Folding Doors mit Elementen bis 3 m Höhe und 6,5 m Breite und die Hebeschiebetür Decalu 163 Slide mit 400-kg-Flügeln und nur 73 mm Stulpansicht. Alle Specs sind aus den Katalogpliegos kopiert.",
      pl: "Dwa tarasowe systemy Decalu z naszego samodzielnie hostowanego katalogu aluminium: ściana składana Decalu 88 Folding Doors z elementami do 3 m wysokości i 6,5 m szerokości oraz HST Decalu 163 Slide ze skrzydłami 400 kg i stykiem o szerokości zaledwie 73 mm. Wszystkie parametry skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/deceuninck-schiebe.jpg",
    systems: [
      {
        id: "decalu-88-folding",
        name: "Decalu 88 Folding Doors",
        tagline: {
          en: "Folding elements up to 3 m high and 6.5 m wide.",
          de: "Faltelemente bis 3 m Höhe und 6,5 m Breite.",
          pl: "Elementy składane do 3 m wysokości i 6,5 m szerokości.",
        },
        description: {
          en: "The system allows impressive element sizes of up to 3 m height and 6.5 m width. A specially developed compensation profile ensures that all leaves can be made in perfectly identical widths. Thanks to the flexible inward or outward folding option, you enjoy maximum design freedom and first-class operating comfort.",
          de: "Das System ermöglicht beeindruckende Elementgrößen von bis zu 3 m Höhe und 6,5 m Breite. Ein speziell entwickeltes Ausgleichsprofil sorgt dafür, dass alle Flügel in perfekt identischer Breite gefertigt werden können. Dank der flexiblen Faltoption nach innen oder außen genießen Sie maximale Gestaltungsfreiheit und erstklassigen Bedienkomfort.",
          pl: "System umożliwia imponujące wymiary elementów: do 3 m wysokości i 6,5 m szerokości. Specjalnie opracowany profil kompensacyjny sprawia, że wszystkie skrzydła mogą mieć idealnie identyczną szerokość. Dzięki elastycznemu składaniu do wewnątrz lub na zewnątrz zyskujesz maksymalną swobodę projektowania i najwyższy komfort obsługi.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "88", unit: "mm", highlight: true },
          { label: { en: "Infill thickness", de: "Füllungsstärke", pl: "Grubość wypełnienia" }, value: { en: "up to 62 mm", de: "bis 62 mm", pl: "do 62 mm" }, highlight: true },
          { label: AL.maxSash, value: "H 3000 × L 1200 mm", highlight: true },
          { label: AL.maxWeight, value: "150 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=30",
        image: "/images/manufacturers/deceuninck-decalu-88-folding.jpg",
      },
      {
        id: "decalu-163-slide",
        name: "Decalu 163 Slide",
        tagline: {
          en: "Lift-slide with a 73-mm meeting stile, 400-kg leaves.",
          de: "Hebeschiebe mit 73-mm-Stulp, 400-kg-Flügel.",
          pl: "HST ze stykiem 73 mm, skrzydła 400 kg.",
        },
        description: {
          en: "Thanks to the extremely slim frame and sash profiles, the glass surface is noticeably larger for maximum light in the room. The filigree 73-mm face width of the meeting stile lends the whole construction timeless elegance and underlines its modern design.",
          de: "Dank der extrem schlanken Rahmen- und Flügelprofile fällt die Glasfläche spürbar größer aus und sorgt für maximale Lichtausbeute im Raum. Die filigrane Ansichtsbreite des Stulps von gerade einmal 73 mm verleiht der gesamten Konstruktion eine zeitlose Eleganz und unterstreicht ihr modernes Design.",
          pl: "Dzięki wyjątkowo smukłym profilom ramy i skrzydła powierzchnia szkła jest wyraźnie większa, co maksymalizuje światło w pomieszczeniu. Filigranowa szerokość styku — zaledwie 73 mm — nadaje całej konstrukcji ponadczasową elegancję i podkreśla nowoczesny design.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "163", unit: "mm", highlight: true },
          { label: AL.maxWeight, value: "400 kg", highlight: true },
          { label: { en: "Meeting-stile face width", de: "Stulpprofil", pl: "Szerokość styku skrzydeł" }, value: "73 mm", highlight: true },
          { label: { en: "Infill thickness", de: "Füllungsstärke", pl: "Grubość wypełnienia" }, value: "58 mm" },
          { label: { en: "Track / frame height", de: "Schienen-/Rahmenhöhe", pl: "Wysokość toru/ramy" }, value: "55 mm" },
          { label: { en: "Sash height", de: "Flügelhöhe", pl: "Wysokość skrzydła" }, value: "88 mm" },
          { label: AL.maxSash, value: "H 3200 × L 3300 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=30",
        image: "/images/manufacturers/deceuninck-decalu-163-slide.jpg",
      },
    ],
  },
  {
    id: "cortizo",
    category: "patio-doors",
    name: "CORTIZO",
    tagline: {
      en: "COR Vision sliding walls with up to 94 % glass.",
      de: "COR-Vision-Schiebewände mit bis zu 94 % Glasanteil.",
      pl: "Przesuwne ściany COR Vision z udziałem szkła do 94 %.",
    },
    intro: {
      en: "CORTIZO's sliding chapter in our self-hosted Aluminium catalogue: the 2000 Corredera with up to 6 leaves, the COR Vision family — the base system with 9 % profile view, the Plus version with up to 94 % glass and 700-kg motorised leaves, and the Galandage whose leaves disappear into the wall — plus the 4900 Corredera and the Bifold Plus folding wall. All specs are copied from the catalogue sheets.",
      de: "Das Schiebe-Kapitel von CORTIZO in unserem selbst gehosteten Aluminium-Katalog: die 2000 Corredera mit bis zu 6 Flügeln, die COR-Vision-Familie — das Basissystem mit 9 % Profilansicht, die Plus-Version mit bis zu 94 % Glasanteil und 700-kg-Motorflügeln und die Galandage-Version, deren Flügel in der Wand verschwinden — dazu die 4900 Corredera und die Faltwand Bifold Plus. Alle Specs sind aus den Katalogpliegos kopiert.",
      pl: "Przesuwny rozdział CORTIZO w naszym samodzielnie hostowanym katalogu aluminium: 2000 Corredera do 6 skrzydeł, rodzina COR Vision — system bazowy z widokiem profili 9 %, wersja Plus z udziałem szkła do 94 % i skrzydłami do 700 kg z napędem oraz Galandage, którego skrzydła chowają się w ścianie — a także 4900 Corredera i ściana składana Bifold Plus. Wszystkie parametry skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/cortizo-schiebe.jpg",
    systems: [
      {
        id: "2000-corredera",
        name: "2000 Corredera",
        tagline: {
          en: "Sliding installations with up to 6 leaves.",
          de: "Schiebeanlagen mit bis zu 6 Flügeln.",
          pl: "Konstrukcje przesuwne do 6 skrzydeł.",
        },
        description: {
          en: "The Corredera 2000 sliding system is the perfect solution for demanding living and office concepts, allowing impressive sliding installations with up to 6 leaves. Thanks to the innovative GALANDAGE option, the opening leaves glide completely into the wall — for maximum use of space, unrestricted freedom of movement and a consummately elegant, purist look.",
          de: "Das Schiebesystem Corredera 2000 ist die perfekte Lösung für anspruchsvolle Wohn- und Bürokonzepte, die die Realisierung von beeindruckenden Schiebeanlagen mit bis zu 6 Flügeln ermöglicht. Dank der innovativen GALANDAGE-Option gleiten die öffenbaren Flügel vollständig in die Wand hinein – für eine maximale Raumausnutzung, uneingeschränkte Bewegungsfreiheit und eine vollendet elegante, puristische Optik.",
          pl: "System przesuwny Corredera 2000 to idealne rozwiązanie dla wymagających koncepcji mieszkalnych i biurowych, pozwalające na imponujące konstrukcje przesuwne do 6 skrzydeł. Dzięki innowacyjnej opcji GALANDAGE otwierane skrzydła wsuwają się całkowicie w ścianę — dla maksymalnego wykorzystania przestrzeni i doskonale eleganckiej, purystycznej estetyki.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "45 – 80 mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 17 mm", de: "bis 17 mm", pl: "do 17 mm" }, highlight: true },
          { label: AL.maxDoorLeaf, value: "H 2600 × L 1600 mm", highlight: true },
          { label: AL.maxWeight, value: "100 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=34",
        image: "/images/manufacturers/cortizo-2000-corredera.jpg",
      },
      {
        id: "cor-vision",
        name: "COR Vision",
        tagline: {
          en: "Profile view down to 9 %, corners without a post.",
          de: "Profilansicht ab 9 %, Ecken ohne Pfosten.",
          pl: "Widok profili od 9 %, narożniki bez słupka.",
        },
        description: {
          en: "COR Vision embodies top Spanish design, reducing the profile view to a minimum of just 9 % of the whole construction and maximising the glass surface. The 90° corner joint without a corner post and the single-track option lend the system an outstanding, flawless aesthetic. The heat-transfer coefficient Uw impresses with top values from 1.3 W/m²K.",
          de: "COR Vision verkörpert spanisches Spitzendesign, das die Profilansicht auf ein Minimum von nur 9 % der gesamten Konstruktion reduziert und so die Glasfläche maximal vergrößert. Der Verzicht auf einen Eckpfosten bei der 90°-Eckverbindung der Flügel sowie die 1-gleisige Option verleihen dem System eine herausragende, makellose Ästhetik. Der Wärmedurchgangskoeffizient Uw überzeugt mit Spitzenwerten ab 1,3 W/m²K.",
          pl: "COR Vision uosabia najlepszy hiszpański design: widok profili zredukowany do zaledwie 9 % całej konstrukcji i maksymalnie powiększona powierzchnia szkła. Narożnik 90° bez słupka i opcja jednotorowa nadają systemowi znakomitą, nieskazitelną estetykę. Współczynnik Uw imponuje wartościami od 1,3 W/m²K.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: { en: "116 mm / 3-track 182 mm", de: "116 mm / 3-gleisig 182 mm", pl: "116 mm / 3 tory 182 mm" }, highlight: true },
          { label: { en: "Uw", de: "Uw", pl: "Uw" }, value: { en: "from 1.3 W/m²K", de: "ab 1,3 W/m²K", pl: "od 1,3 W/m²K" }, highlight: true },
          { label: AL.maxWeight, value: "320 kg", highlight: true },
          { label: AL.glazing, value: "26 – 30 mm" },
          { label: AL.maxDoorLeaf, value: "H 3000 × L 2500 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=35",
        image: "/images/manufacturers/cortizo-cor-vision.jpg",
      },
      {
        id: "4900-corredera",
        name: "4900 Corredera",
        tagline: {
          en: "Panorama sliding with up to 4 moving elements.",
          de: "Panorama-Schiebeanlagen mit bis zu 4 Elementen.",
          pl: "Panoramiczne przesuwne do 4 ruchomych elementów.",
        },
        description: {
          en: "The elegant, straight-lined design language of this sliding system, together with the narrow central post, creates an exceptional, ultra-modern construction. Optional sash reinforcements allow large panorama constructions with up to four moving elements. Thanks to innovative thermal breaks and glass up to 36 mm, the 4900 CORREDERA achieves excellent thermal and acoustic insulation.",
          de: "Die elegante, geradlinige Formensprache dieses Schiebesystems erschafft zusammen mit dem schmalen Mittelpfosten eine außergewöhnliche und hochmoderne Konstruktion. Der Einsatz optionaler Flügelverstärkungen ermöglicht die Realisierung großflächiger Panoramakonstruktionen mit bis zu vier beweglichen Elementen. Dank innovativer thermischer Trennung und Glasstärken bis zu 36 mm erzielt das System 4900 CORREDERA hervorragende Wärmedämm- und Schallschutzwerte.",
          pl: "Elegancki, prostoliniowy język form tego systemu przesuwnego wraz z wąskim słupkiem środkowym tworzy wyjątkową, nowoczesną konstrukcję. Opcjonalne wzmocnienia skrzydeł pozwalają na duże konstrukcje panoramiczne z maksymalnie czterema ruchomymi elementami. Dzięki innowacyjnej przekładce termicznej i szkleniu do 36 mm system 4900 CORREDERA osiąga znakomite parametry cieplne i akustyczne.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Bautiefe", pl: "Głębokość zabudowy" }, value: "70 – 126 mm", highlight: true },
          { label: { en: "Glass thickness", de: "Glasstärke", pl: "Grubość szkła" }, value: { en: "up to 36 mm", de: "bis 36 mm", pl: "do 36 mm" }, highlight: true },
          { label: AL.maxWeight, value: "240 kg", highlight: true },
          { label: AL.maxSash, value: "H 3000 × L 2200 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=35",
        image: "/images/manufacturers/cortizo-4900-corredera.jpg",
      },
      {
        id: "cor-vision-plus",
        name: "COR Vision Plus",
        tagline: {
          en: "Up to 94 % glass, leaves to 700 kg motorised.",
          de: "Bis 94 % Glasanteil, Flügel bis 700 kg mit Motor.",
          pl: "Do 94 % szkła, skrzydła do 700 kg z napędem.",
        },
        description: {
          en: "As a highly developed version of COR Vision, COR Vision Plus was conceived specifically for imposing large-area glazing. This prestige system achieves an impressive glass share of up to 94 % of the light opening, and allows the outer frames to be completely concealed in the building shell all round.",
          de: "Als hochentwickelte Version des Systems COR Vision wurde COR Vision Plus speziell für imposante Großflächen-Verglasungen konzipiert. Dieses Prestige-System erzielt einen beeindruckenden Glasanteil von bis zu 94 % der Lichtöffnung. Zudem ermöglicht COR Vision Plus das vollständige, umlaufende Verdecken der Blendrahmen im Baukörper.",
          pl: "Jako wysoko rozwinięta wersja COR Vision, COR Vision Plus powstał specjalnie dla imponujących, wielkopowierzchniowych przeszkleń. Ten prestiżowy system osiąga udział szkła do 94 % otworu i pozwala całkowicie, obwodowo ukryć ościeżnice w bryle budynku.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: { en: "180 mm / 3-track 278 mm", de: "180 mm / 3-gleisig 278 mm", pl: "180 mm / 3 tory 278 mm" }, highlight: true },
          { label: AL.maxWeight, value: { en: "400 kg (manual) / 700 kg (motorised)", de: "400 kg (manuell) / 700 kg (Motorantrieb)", pl: "400 kg (ręcznie) / 700 kg (napęd)" }, highlight: true },
          { label: AL.glazing, value: "36 – 54 mm", highlight: true },
          { label: AL.maxDoorLeaf, value: { en: "H 4000 × L 4000 mm (configuration-dependent)", de: "H 4000 × L 4000 mm (konfigurationsabhängig)", pl: "H 4000 × L 4000 mm (zależnie od konfiguracji)" } },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=36",
        image: "/images/manufacturers/cortizo-cor-vision-plus.jpg",
      },
      {
        id: "bifold-plus",
        name: "Cortizo Bifold Plus",
        tagline: {
          en: "Folding doors with up to 7 leaves, lowered threshold.",
          de: "Falttüren mit bis zu 7 Flügeln, abgesenkte Schwelle.",
          pl: "Drzwi składane do 7 skrzydeł, obniżony próg.",
        },
        description: {
          en: "Cortizo Bifold Plus guarantees first-class cold protection thanks to an effective thermal break. The folding-sliding system allows flexible combinations of up to 7 leaves in versatile configurations. With the option of a lowered threshold or integrated line drainage, it is perfect for living spaces and terraces; the flexible inward or outward folding offers maximum design freedom.",
          de: "Cortizo Bifold Plus garantiert dank effektiver thermischer Trennung erstklassigen Kälteschutz. Das Faltschiebesystem ermöglicht flexible Kombinationen von bis zu 7 Flügeln in vielseitigen Konfigurationen. Dank der Option einer abgesenkten Schwelle oder integrierten Linienentwässerung eignet es sich perfekt für Wohnräume und Terrassen. Die flexible Faltfunktion nach innen oder außen bietet zudem maximale Gestaltungsfreiheit.",
          pl: "Cortizo Bifold Plus gwarantuje pierwszorzędną ochronę przed zimnem dzięki skutecznej przekładce termicznej. System składano-przesuwny pozwala elastycznie łączyć do 7 skrzydeł w różnych konfiguracjach. Dzięki opcji obniżonego progu lub zintegrowanego odwodnienia liniowego idealnie nadaje się do pomieszczeń mieszkalnych i tarasów; składanie do wewnątrz lub na zewnątrz daje maksymalną swobodę.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "80", unit: "mm", highlight: true },
          { label: AL.glazing, value: { en: "up to 48 mm", de: "bis 48 mm", pl: "do 48 mm" }, highlight: true },
          { label: AL.maxDoorLeaf, value: "H 3000 × L 1200 mm", highlight: true },
          { label: AL.maxWeight, value: "120 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=36",
        image: "/images/manufacturers/cortizo-bifold-plus.jpg",
      },
      {
        id: "cor-vision-galandage",
        name: "COR Vision Galandage",
        tagline: {
          en: "Leaves that disappear completely into the wall.",
          de: "Flügel, die komplett in der Wand verschwinden.",
          pl: "Skrzydła znikające całkowicie w ścianie.",
        },
        description: {
          en: "COR Vision GALANDAGE is an innovative system solution that allows the door to open fully by sinking the leaves completely into the adjacent wall. Depending on the chosen version, one, two or even three moving leaves disappear entirely into the wall, creating a feeling of boundless spatial freedom.",
          de: "COR Vision GALANDAGE ist eine innovative Systemlösung, die ein vollständiges Öffnen der Tür ermöglicht, indem die Flügel komplett in der angrenzenden Wand versenkt werden. Je nach gewählter Ausführung verschwinden ein, zwei oder sogar drei bewegliche Flügel vollständig in der Wand und schaffen so ein Gefühl grenzenloser Raumfreiheit.",
          pl: "COR Vision GALANDAGE to innowacyjne rozwiązanie systemowe, które pozwala całkowicie otworzyć drzwi, chowając skrzydła w przylegającej ścianie. Zależnie od wersji w ścianie znika jedno, dwa, a nawet trzy ruchome skrzydła, tworząc poczucie nieograniczonej przestrzeni.",
        },
        specs: [
          { label: { en: "Installation depth", de: "Einbautiefe", pl: "Głębokość zabudowy" }, value: "115,8 – 181,8 mm", highlight: true },
          { label: AL.glazing, value: "24 mm", highlight: true },
          { label: AL.maxWeight, value: "320 kg", highlight: true },
          { label: AL.maxDoorLeaf, value: "H 3000 × L 2500 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=37",
        image: "/images/manufacturers/cortizo-cor-vision-galandage.jpg",
      },
    ],
  },
  {
    id: "reynaers",
    category: "patio-doors",
    name: "Reynaers",
    tagline: {
      en: "MasterPatio and SlimPatio: near-invisible profiles.",
      de: "MasterPatio und SlimPatio: fast unsichtbare Profile.",
      pl: "MasterPatio i SlimPatio: niemal niewidoczne profile.",
    },
    intro: {
      en: "Reynaers' sliding systems from our self-hosted Aluminium catalogue: the MasterPatio lift-slide, whose profiles make up only about 10 % of the glass light and whose leaves reach 3.5 m and 500 kg, and the SlimPatio 68 with concealed frame elements in SV and LV sash versions. All specs are copied from the catalogue sheets.",
      de: "Die Schiebesysteme von Reynaers aus unserem selbst gehosteten Aluminium-Katalog: die Hebeschiebetür MasterPatio, deren Profile nur rund 10 % der Glaslichte ausmachen und deren Flügel 3,5 m und 500 kg erreichen, und das SlimPatio 68 mit verdeckten Blendrahmenelementen in den Flügelvarianten SV und LV. Alle Specs sind aus den Katalogpliegos kopiert.",
      pl: "Systemy przesuwne Reynaers z naszego samodzielnie hostowanego katalogu aluminium: HST MasterPatio, którego profile stanowią tylko ok. 10 % światła szyby, a skrzydła osiągają 3,5 m i 500 kg, oraz SlimPatio 68 z ukrytymi elementami ościeżnicy w wariantach skrzydeł SV i LV. Wszystkie parametry skopiowano z kart katalogu.",
    },
    image: "/images/manufacturers/reynaers-schiebe.jpg",
    systems: [
      {
        id: "masterpatio",
        name: "MasterPatio",
        tagline: {
          en: "Lift-slide at passive-house level, leaves to 500 kg.",
          de: "Hebeschiebe auf Passivhaus-Niveau, Flügel bis 500 kg.",
          pl: "HST na poziomie pasywnym, skrzydła do 500 kg.",
        },
        description: {
          en: "The profiles are almost invisible, making up only about 10 % of the total glass light. The visibility of plastic components and gaskets has been reduced to a minimum, as they are fully hidden in the profile, while the system guarantees excellent passive-house-level insulation. Selected versions offer a flat or completely threshold-free floor track, and an integrated insect screen up to 1 m wide is optionally available.",
          de: "Die Profile sind nahezu unsichtbar und machen lediglich etwa 10 % der gesamten Glaslichte aus. Die Sichtbarkeit von Kunststoffkomponenten und Dichtungen wurde auf ein Minimum reduziert, da diese vollständig im Profil verborgen sind. Gleichzeitig garantiert das System hervorragende Wärmedämmwerte auf Passivhaus-Niveau. In ausgewählten Ausführungen ist eine flache oder komplett schwellenlose Bodenschiene verfügbar. Optional steht zudem ein integrierter Insektenschutz mit einer Breite von bis zu 1 m zur Auswahl.",
          pl: "Profile są niemal niewidoczne — stanowią tylko ok. 10 % całego światła szyby. Widoczność elementów z tworzywa i uszczelek zredukowano do minimum, bo są całkowicie ukryte w profilu, a system gwarantuje znakomitą izolacyjność na poziomie domów pasywnych. W wybranych wersjach dostępna jest płaska lub całkowicie bezprogowa szyna podłogowa, opcjonalnie także zintegrowana moskitiera o szerokości do 1 m.",
        },
        specs: [
          { label: AL.frameDepth, value: "180", unit: "mm", highlight: true },
          { label: AL.sashDepth, value: "77", unit: "mm", highlight: true },
          { label: AL.maxWeight, value: "500 kg", highlight: true },
          { label: AL.glazing, value: { en: "up to 62 mm", de: "bis 62 mm", pl: "do 62 mm" } },
          { label: AL.maxDoorLeaf, value: "H 3500 × L 2800 mm" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=43",
        image: "/images/manufacturers/reynaers-masterpatio.jpg",
      },
      {
        id: "slimpatio-68",
        name: "SlimPatio 68",
        tagline: {
          en: "Concealed frames, SV and LV sash versions.",
          de: "Verdeckte Rahmen, Flügelvarianten SV und LV.",
          pl: "Ukryte ramy, warianty skrzydeł SV i LV.",
        },
        description: {
          en: "The modern SlimPatio 68 system convinces with concealed outer-frame elements that make the glass surfaces look even more generous. It comes in two sash versions: the minimalism-focused SV and the LV variant, which allows triple insulating glazing.",
          de: "Das moderne System SlimPatio 68 überzeugt durch verdeckte Blendrahmenelemente, wodurch die Glasflächen optisch noch großzügiger wirken. Es ist in zwei Flügelvarianten erhältlich: der auf Minimalismus fokussierten Ausführung SV sowie der Variante LV, die den Einsatz von 3-fach-Isolierverglasungen ermöglicht.",
          pl: "Nowoczesny system SlimPatio 68 przekonuje ukrytymi elementami ościeżnicy, dzięki którym przeszklenia wyglądają jeszcze bardziej okazale. Dostępny w dwóch wariantach skrzydeł: minimalistycznym SV oraz LV, pozwalającym na potrójne szyby zespolone.",
        },
        specs: [
          { label: AL.frameDepth, value: { en: "120 mm (2-track) / 176 mm (3-track)", de: "120 mm (2-gleisig) / 176 mm (3-gleisig)", pl: "120 mm (2 tory) / 176 mm (3 tory)" }, highlight: true },
          { label: AL.sashDepth, value: "37", unit: "mm", highlight: true },
          { label: AL.variants, value: "Standard Vent (SV) / Large Vent (LV)", highlight: true },
          { label: AL.glazing, value: "SV 24–30 mm / LV 32–38 mm" },
          { label: { en: "Max. dimensions", de: "Max. Abmessungen", pl: "Maks. wymiary" }, value: "H 2700 × L 2300 mm" },
          { label: AL.maxWeight, value: "250 kg" },
        ],
        datasheet: "/pdf/catalogues/aluminium-2026.pdf#page=45",
        image: "/images/manufacturers/reynaers-slimpatio-68.jpg",
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
