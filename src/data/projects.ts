/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Seis proyectos plausibles en la zona real de trabajo (Hechingen y
 * alrededores, Zollernalbkreis). NO son obras reales de Kamika: hay que
 * cambiarlos por trabajos hechos de verdad, con sus fotos. Ver CONTENT.md.
 *
 * Los proyectos son lo que da confianza en una web de este tipo, así que
 * en cuanto haya obras reales conviene sustituirlos, aunque sean tres.
 */
import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "single-family-hechingen",
    title: { en: "Single-family home, Hechingen" },
    location: "Hechingen",
    year: 2025,
    categories: ["windows", "roller-shutters", "insect-screens"],
    summary: {
      en: "Full window replacement on a 1980s house whose frames no longer closed against the weather. Fourteen openings in PVC with triple glazing, front-mounted shutter boxes reusing the existing reveals, and pleated insect screens on the two garden doors.",
    },
    images: [
      {
        src: "/images/projects/single-family-hechingen-1.jpg",
        alt: { en: "Front elevation of the house after the window replacement" },
      },
      {
        src: "/images/projects/single-family-hechingen-2.jpg",
        alt: { en: "Living room window with the roller shutter half lowered" },
      },
      {
        src: "/images/projects/single-family-hechingen-3.jpg",
        alt: { en: "Garden door with a pleated insect screen fitted" },
      },
    ],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "pvc-82-comfort",
      "roller-shutter-front-mounted",
      "insect-screen-pleated",
      "handle-lockable",
    ],
    featured: true,
  },
  {
    id: "apartment-block-balingen",
    title: { en: "Apartment block, Balingen" },
    location: "Balingen",
    year: 2025,
    categories: ["windows", "entrance-doors"],
    summary: {
      en: "Eight flats over four floors, fitted in two phases so the building stayed occupied. Aluminium windows on the street side for the acoustic rating, PVC to the courtyard, and a single insulated entrance door with a controlled-access strike.",
    },
    images: [
      {
        src: "/images/projects/apartment-block-balingen-1.jpg",
        alt: { en: "Street facade of the apartment block with new aluminium windows" },
      },
      {
        src: "/images/projects/apartment-block-balingen-2.jpg",
        alt: { en: "The new insulated entrance door of the apartment block" },
      },
      {
        src: "/images/projects/apartment-block-balingen-3.jpg",
        alt: { en: "Courtyard elevation with the replacement PVC windows" },
      },
    ],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "alu-75-slim",
      "pvc-70-classic",
      "roka-select-20",
      "security-cylinder",
    ],
    featured: true,
  },
  {
    id: "farmhouse-burladingen",
    title: { en: "Converted farmhouse, Burladingen" },
    location: "Burladingen",
    year: 2024,
    categories: ["windows", "interior-doors"],
    summary: {
      en: "A barn conversion where the openings were irregular and none of them square. Every element was measured individually and made to size in wood-aluminium, with oak on the room side to match the exposed structure. Interior doors were hung wall-flush.",
    },
    images: [
      {
        src: "/images/projects/farmhouse-burladingen-1.jpg",
        alt: { en: "Converted barn with wood-aluminium windows in irregular openings" },
      },
      {
        src: "/images/projects/farmhouse-burladingen-2.jpg",
        alt: { en: "Oak window reveal seen from inside the converted farmhouse" },
      },
      {
        src: "/images/projects/farmhouse-burladingen-3.jpg",
        alt: { en: "Wall-flush interior door in the converted farmhouse" },
      },
    ],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "wood-alu-92-nature",
      "veneer-oak",
      "handle-lockable",
    ],
    featured: true,
  },
  {
    id: "townhouse-albstadt",
    title: { en: "Townhouse, Albstadt" },
    location: "Albstadt",
    year: 2024,
    categories: ["entrance-doors", "gates", "fences"],
    summary: {
      en: "Everything from the pavement to the front step, in one anthracite finish. An RC2 entrance door, a sliding driveway gate with its drive and safety edge, and matching aluminium fence panels set out from a site plan before production.",
    },
    images: [
      {
        src: "/images/projects/townhouse-albstadt-1.jpg",
        alt: { en: "Townhouse entrance door in anthracite grey" },
      },
      {
        src: "/images/projects/townhouse-albstadt-2.jpg",
        alt: { en: "Sliding driveway gate in the same anthracite finish" },
      },
      {
        src: "/images/projects/townhouse-albstadt-3.jpg",
        alt: { en: "Aluminium fence panels along the front boundary" },
      },
    ],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "roka-signature-liquid-metal",
      "sectional-garage-40",
      "sliding-gate-alu",
      "fence-horizontal-alu",
    ],
  },
  {
    id: "office-fitout-tuebingen",
    title: { en: "Office fit-out, Tübingen" },
    location: "Tübingen",
    year: 2023,
    categories: ["windows", "interior-doors"],
    summary: {
      en: "A first-floor office where the requirement was acoustic rather than thermal. Aluminium windows with asymmetric glazing to the main road, and interior doors with a 32 dB rating between the meeting rooms.",
    },
    images: [
      {
        src: "/images/projects/office-fitout-tuebingen-1.jpg",
        alt: { en: "Office windows facing the main road in Tübingen" },
      },
      {
        src: "/images/projects/office-fitout-tuebingen-2.jpg",
        alt: { en: "Acoustic interior door between two meeting rooms" },
      },
      {
        src: "/images/projects/office-fitout-tuebingen-3.jpg",
        alt: { en: "Open-plan office area with the new aluminium windows" },
      },
    ],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "alu-75-slim",
      "acoustic-32",
      "cpl-basic",
    ],
  },
  {
    id: "bungalow-bisingen",
    title: { en: "Bungalow, Bisingen" },
    location: "Bisingen",
    year: 2023,
    categories: ["windows", "roller-shutters", "gates"],
    summary: {
      en: "New build, so the shutter boxes were specified with the windows and built into the wall rather than added later. Motorised throughout, with the garage door on the same remote control set as the shutters.",
    },
    images: [
      {
        src: "/images/projects/bungalow-bisingen-1.jpg",
        alt: { en: "Newly built bungalow with built-in roller shutter boxes" },
      },
      {
        src: "/images/projects/bungalow-bisingen-2.jpg",
        alt: { en: "Sectional garage door on the bungalow" },
      },
      {
        src: "/images/projects/bungalow-bisingen-3.jpg",
        alt: { en: "Large window opening onto the terrace of the bungalow" },
      },
    ],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "pvc-82-comfort",
      "roller-shutter-concealed",
      "side-hinged-garage",
      "window-sill-aluminium",
    ],
  },
];
