/**
 * Categorías de producto. Único sitio donde se definen los slugs, que
 * son también los segmentos de URL (`/products/{slug}`).
 *
 * Los slugs están en inglés a propósito: cuando el sitio pase a alemán
 * se podrán traducir con redirects sin tocar ningún componente.
 *
 * Los nombres alemanes ya están puestos porque son los únicos que el
 * dueño ha podido confirmar. Los `intro` en inglés son un borrador
 * técnico: revisables, pero no inventan nada que la empresa no haga.
 */
import type { Category, CategorySlug } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "windows",
    name: { en: "Windows", de: "Fenster", pl: "Okna" },
    intro: {
      en: "PVC, aluminium and wood windows in 70–92 mm frame depths, with double or triple glazing. Measured on site, delivered ready to fit, with the fittings and glazing spec written on the order.",
      de: "Fenster aus Kunststoff, Aluminium und Holz in 70–92 mm Bautiefe, mit Zwei- oder Dreifachverglasung. Vor Ort aufgemessen, einbaufertig geliefert, mit Beschlag- und Verglasungsangabe auf dem Auftrag.",
      pl: "Okna z PVC, aluminium i drewna o głębokości zabudowy 70–92 mm, z szybą dwu- lub trzykomorową. Pomiar na miejscu, dostawa gotowa do montażu, z okuciami i pakietem szybowym zapisanymi w zamówieniu.",
    },
    heroImage: "/images/categories/windows-hero.jpg",
    order: 1,
  },
  {
    // Hub: no vende nada por sí misma, agrupa los tipos de puerta.
    // Su `intro` es lo que lee quien llega buscando "una puerta" sin
    // saber todavía cuál de los tres tipos necesita.
    slug: "doors",
    name: { en: "Doors", de: "Türen", pl: "Drzwi" },
    intro: {
      en: "Every door in the house, from the one that faces the street to the one that opens onto the terrace. Pick the type and you will find the models, the specifications and the catalogue behind each one.",
      de: "Jede Tür im Haus — von der zur Straße bis zu der auf die Terrasse. Wählen Sie die Art, dahinter stehen die Modelle, die Spezifikationen und der Katalog.",
      pl: "Każde drzwi w domu — od tych od ulicy po te na taras. Wybierz rodzaj, a znajdziesz modele, specyfikacje i katalog.",
    },
    heroImage: "/images/categories/doors-hero.jpg",
    order: 2,
  },
  {
    slug: "entrance-doors",
    parent: "doors",
    name: { en: "Entrance doors", de: "Haustüren", pl: "Drzwi zewnętrzne" },
    // Cifras tomadas de los catálogos reales: Ud 0,72 es el mejor valor
    // del catálogo Select, y RC 3 el máximo del sistema Signature.
    intro: {
      en: "Aluminium and PVC entrance doors from Ud 0.72 W/m²K, with multi-point locking and burglary resistance up to RC 3. Ceramic, liquid-metal, powder-coated and real old-wood surfaces, and panels in PVC, aluminium or timber. Threshold, handle and cylinder are specified per door.",
      de: "Haustüren aus Aluminium und Kunststoff ab Ud 0,72 W/m²K, mit Mehrfachverriegelung und Einbruchschutz bis RC 3. Keramik, Flüssigmetall, Pulverbeschichtung und echtes Altholz; Füllungen aus Kunststoff, Aluminium oder Holz. Schwelle, Drücker und Zylinder werden je Tür festgelegt.",
      pl: "Drzwi zewnętrzne z aluminium i PVC od Ud 0,72 W/m²K, z ryglowaniem wielopunktowym i odpornością na włamanie do RC 3. Powierzchnie ceramiczne, z płynnego metalu, lakierowane proszkowo i ze starego drewna; wypełnienia z PVC, aluminium lub drewna. Próg, klamka i wkładka dobierane do każdych drzwi.",
    },
    heroImage: "/images/categories/entrance-doors-hero.jpg",
    order: 1,
  },
  {
    slug: "interior-doors",
    parent: "doors",
    name: { en: "Interior doors", de: "Innentüren", pl: "Drzwi wewnętrzne" },
    intro: {
      en: "Interior doors in cold aluminium framing with glazing from 6 mm — the system built for partitions, corridors and glazed interior walls. CPL, veneer and lacquered leaves join the range when their catalogue arrives.",
      de: "Innentüren im kalten Aluminiumrahmen mit Verglasung ab 6 mm — das System für Trennwände, Flure und verglaste Innenwände. CPL-, Furnier- und Lacktürblätter folgen, sobald ihr Katalog da ist.",
      pl: "Drzwi wewnętrzne w zimnej ramie aluminiowej z szybą od 6 mm — system do ścianek działowych, korytarzy i przeszklonych ścian wewnętrznych. Skrzydła CPL, fornirowane i lakierowane dojdą, gdy pojawi się ich katalog.",
    },
    heroImage: "/images/categories/interior-doors-hero.jpg",
    order: 2,
  },
  {
    /**
     * "Patio doors" y "terrace doors" son EL MISMO producto: en alemán
     * Terrassentür, y en inglés se usan los dos nombres. El dueño las
     * escribió con barra ("patio doors / terrace doors"), que es como
     * se escribe un sinónimo, no dos gamas. Se publica una sola, con el
     * otro nombre dentro de la intro para quien busque por él.
     */
    slug: "patio-doors",
    parent: "doors",
    name: { en: "Patio doors", de: "Terrassentüren", pl: "Drzwi tarasowe" },
    intro: {
      en: "Patio and terrace doors on Salamander sliding systems: an economical slider, an airtight one for low-energy builds and a lift-and-slide for the big openings — same profile family as our windows, so colour and section match across the facade.",
      de: "Terrassentüren auf Salamander-Schiebesystemen: ein wirtschaftlicher Schieber, ein besonders dichter für energiesparendes Bauen und ein Hebe-Schiebe-System für die großen Öffnungen — dieselbe Profilfamilie wie unsere Fenster, damit Farbe und Ansicht über die Fassade zusammenpassen.",
      pl: "Drzwi tarasowe na systemach przesuwnych Salamander: ekonomiczny system przesuwny, szczelny do budynków energooszczędnych i podnoszono-przesuwny do dużych otworów — ta sama rodzina profili co nasze okna, więc kolor i przekrój pasują na całej elewacji.",
    },
    heroImage: "/images/categories/patio-doors-hero.jpg",
    order: 3,
  },
  {
    slug: "roller-shutters",
    name: { en: "Roller shutters", de: "Rollläden", pl: "Rolety" },
    intro: {
      en: "Surface-mounted, built-on and front-mounted roller shutters in aluminium, manual or motorised. Box sizes and guide rails are matched to the window opening so the shutter is planned with the window, not after it.",
      de: "Aufsatz-, Vorbau- und Unterputzrollläden aus Aluminium, manuell oder motorisiert. Kastengrößen und Führungsschienen werden auf die Fensteröffnung abgestimmt — der Rollladen wird mit dem Fenster geplant, nicht danach.",
      pl: "Rolety nadstawne, elewacyjne i podtynkowe z aluminium, ręczne lub z napędem. Rozmiary skrzynek i prowadnice dobierane do otworu okiennego — roleta jest planowana razem z oknem, nie po nim.",
    },
    heroImage: "/images/categories/roller-shutters-hero.jpg",
    order: 3,
  },
  {
    slug: "insect-screens",
    name: { en: "Insect screens", de: "Insektenschutz", pl: "Siatki przeciw owadom" },
    intro: {
      en: "Pleated insect screens made to the measured opening, mounted in the window niche or the shutter guide rail, in matt colours that sit quietly next to the frame. More types join the range as their catalogues arrive.",
      de: "Insektenschutz-Plissees nach Aufmaß, montiert in der Fensternische oder in der Führungsschiene des Rollladens, in matten Farben, die neben dem Rahmen ruhig wirken. Weitere Bauarten folgen mit ihren Katalogen.",
      pl: "Plisowane siatki przeciw owadom na wymiar, montowane we wnęce okiennej albo w prowadnicy rolety, w matowych kolorach spokojnie pasujących do ramy. Kolejne typy dojdą wraz z katalogami.",
    },
    heroImage: "/images/categories/insect-screens-hero.jpg",
    order: 4,
  },
  {
    slug: "gates",
    name: { en: "Gates", de: "Tore", pl: "Bramy" },
    intro: {
      en: "Sectional and side-hinged garage doors, plus sliding and swing gates for driveways. Supplied with the drive, the safety edge and the remote control set as one package.",
      de: "Sektional- und Flügeltore für die Garage, dazu Schiebe- und Drehtore für die Einfahrt. Geliefert mit Antrieb, Sicherheitsleiste und Handsendern als ein Paket.",
      pl: "Bramy segmentowe i rozwierne do garażu oraz przesuwne i skrzydłowe na wjazd. Dostarczane z napędem, listwą bezpieczeństwa i pilotami w jednym pakiecie.",
    },
    heroImage: "/images/categories/gates-hero.jpg",
    order: 5,
  },
  {
    slug: "fences",
    name: { en: "Fences", de: "Zäune", pl: "Ogrodzenia" },
    intro: {
      en: "Aluminium and steel fence panels, posts and matching pedestrian gates in the same colours as the driveway gate. Panel heights and post spacing are set out from a site plan before production.",
      de: "Zaunfelder, Pfosten und passende Gehtüren aus Aluminium und Stahl, in denselben Farben wie das Einfahrtstor. Feldhöhen und Pfostenabstände werden vor der Fertigung nach Lageplan festgelegt.",
      pl: "Przęsła, słupki i pasujące furtki z aluminium i stali, w tych samych kolorach co brama wjazdowa. Wysokości przęseł i rozstaw słupków ustalane z planu przed produkcją.",
    },
    heroImage: "/images/categories/fences-hero.jpg",
    order: 6,
  },
  {
    slug: "accessories",
    name: { en: "Accessories", de: "Zubehör", pl: "Akcesoria" },
    intro: {
      en: "Pull handles, lever handles, access control, hinges, door closers and roller-shutter controls — straight from the manufacturers' catalogues. The parts that decide whether an installation is finished properly or just fitted.",
      de: "Stoßgriffe, Drücker, Zutrittskontrolle, Bänder, Türschließer und Rollladensteuerungen — direkt aus den Herstellerkatalogen. Die Teile, die entscheiden, ob eine Montage fertig ist oder nur eingebaut.",
      pl: "Pochwyty, klamki, kontrola dostępu, zawiasy, samozamykacze i sterowanie roletami — prosto z katalogów producentów. Części, które decydują, czy montaż jest wykończony, czy tylko zrobiony.",
    },
    heroImage: "/images/categories/accessories-hero.jpg",
    order: 7,
  },
];

/**
 * Categorías ordenadas tal y como deben salir en menús y listados.
 * `order` se cuenta dentro de cada nivel: las hijas se ordenan entre
 * ellas, no contra las de arriba.
 */
export const orderedCategories = (): Category[] =>
  [...CATEGORIES].sort((a, b) => a.order - b.order);

/**
 * Las gamas de primer nivel: las que salen en la home, en el mosaico de
 * /products y en el menú. "Doors" sale aquí; sus tres tipos, dentro.
 */
export const topLevelCategories = (): Category[] =>
  orderedCategories().filter((category) => !category.parent);

/** Los tipos que cuelgan de una gama, en su orden. */
export const childCategories = (slug: CategorySlug): Category[] =>
  orderedCategories().filter((category) => category.parent === slug);

/**
 * Las gamas que de verdad tienen producto detrás — todas menos los hub.
 * Es lo que se cuenta cuando el sitio dice "N gamas" y lo que se lista
 * en el pie: un hub ahí sería un enlace a otra lista de enlaces.
 */
export const leafCategories = (): Category[] =>
  orderedCategories().filter((category) => childCategories(category.slug).length === 0);

export const getCategory = (slug: CategorySlug): Category | undefined =>
  CATEGORIES.find((category) => category.slug === slug);

/** Todos los slugs válidos, para `generateStaticParams` y validaciones. */
export const CATEGORY_SLUGS: CategorySlug[] = CATEGORIES.map((category) => category.slug);

export const isCategorySlug = (value: string): value is CategorySlug =>
  (CATEGORY_SLUGS as string[]).includes(value);
