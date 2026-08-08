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
    name: { en: "Windows", de: "Fenster" },
    intro: {
      en: "PVC, aluminium and wood windows in 70–92 mm frame depths, with double or triple glazing. Measured on site, delivered ready to fit, with the fittings and glazing spec written on the order.",
    },
    heroImage: "/images/categories/windows-hero.jpg",
    order: 1,
  },
  {
    // Hub: no vende nada por sí misma, agrupa los tipos de puerta.
    // Su `intro` es lo que lee quien llega buscando "una puerta" sin
    // saber todavía cuál de los tres tipos necesita.
    slug: "doors",
    name: { en: "Doors", de: "Türen" },
    intro: {
      en: "Every door in the house, from the one that faces the street to the one that opens onto the terrace. Pick the type and you will find the models, the specifications and the catalogue behind each one.",
    },
    heroImage: "/images/categories/doors-hero.jpg",
    order: 2,
  },
  {
    slug: "entrance-doors",
    parent: "doors",
    name: { en: "Entrance doors", de: "Haustüren" },
    // Cifras tomadas de los catálogos reales: Ud 0,72 es el mejor valor
    // del catálogo Select, y RC 3 el máximo del sistema Signature.
    intro: {
      en: "Aluminium and PVC entrance doors from Ud 0.72 W/m²K, with multi-point locking and burglary resistance up to RC 3. Ceramic, liquid-metal, powder-coated and real old-wood surfaces, and panels in PVC, aluminium or timber. Threshold, handle and cylinder are specified per door.",
    },
    heroImage: "/images/categories/entrance-doors-hero.jpg",
    order: 1,
  },
  {
    slug: "interior-doors",
    parent: "doors",
    name: { en: "Interior doors", de: "Innentüren" },
    intro: {
      en: "Interior door leaves and frames in CPL, veneer and lacquered finishes, for standard and wall-flush installation. Available with rebated or flush edges, and with sound or smoke rating where required.",
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
    name: { en: "Patio doors", de: "Terrassentüren" },
    intro: {
      en: "Patio and terrace doors: lift-and-slide, tilt-and-slide and side-hung, in the same PVC and aluminium systems as the windows, so the frame, the colour and the fittings match across the whole facade.",
    },
    heroImage: "/images/categories/patio-doors-hero.jpg",
    order: 3,
  },
  {
    slug: "roller-shutters",
    name: { en: "Roller shutters", de: "Rollläden" },
    intro: {
      en: "Surface-mounted, built-on and front-mounted roller shutters in aluminium, manual or motorised. Box sizes and guide rails are matched to the window opening so the shutter is planned with the window, not after it.",
    },
    heroImage: "/images/categories/roller-shutters-hero.jpg",
    order: 3,
  },
  {
    slug: "insect-screens",
    name: { en: "Insect screens", de: "Insektenschutz" },
    intro: {
      en: "Fixed frames, hinged doors, pleated and roller insect screens in powder-coated aluminium. Made to the measured opening, in the same colour as the window, and removable for cleaning.",
    },
    heroImage: "/images/categories/insect-screens-hero.jpg",
    order: 4,
  },
  {
    slug: "gates",
    name: { en: "Gates", de: "Tore" },
    intro: {
      en: "Sectional and side-hinged garage doors, plus sliding and swing gates for driveways. Supplied with the drive, the safety edge and the remote control set as one package.",
    },
    heroImage: "/images/categories/gates-hero.jpg",
    order: 5,
  },
  {
    slug: "fences",
    name: { en: "Fences", de: "Zäune" },
    intro: {
      en: "Aluminium and steel fence panels, posts and matching pedestrian gates in the same colours as the driveway gate. Panel heights and post spacing are set out from a site plan before production.",
    },
    heroImage: "/images/categories/fences-hero.jpg",
    order: 6,
  },
  {
    slug: "accessories",
    name: { en: "Accessories", de: "Zubehör" },
    intro: {
      en: "Handles, cylinders, window sills, ventilation units and installation consumables. The parts that decide whether an installation is finished properly or just fitted.",
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
