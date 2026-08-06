/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const rollerShutters: Product[] = [
  {
    id: "roller-shutter-front-mounted",
    category: "roller-shutters",
    name: "Vorbau 137",
    tagline: { en: "Front-mounted box for renovation, no wall works." },
    description: {
      en: "A front-mounted shutter that sits on the facade or in the reveal, which makes it the renovation option: the existing lintel stays untouched. Rounded 137 mm aluminium box, foam-filled 37 mm slats, crank or radio motor.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Box size" }, value: "137", unit: "mm", highlight: true },
      { label: { en: "Slat height" }, value: "37", unit: "mm", highlight: true },
      { label: { en: "Max. area" }, value: "6.5", unit: "m²", highlight: true },
      { label: { en: "Mounting" }, value: "On facade or in reveal" },
      { label: { en: "Max. size" }, value: "2400 × 2600", unit: "mm" },
      { label: { en: "Operation" }, value: "Crank or radio motor" },
      { label: { en: "Slat fill" }, value: "PU foam" },
      { label: { en: "Insect screen" }, value: "Integrated optional" },
    ],
    images: [
      {
        src: "/images/roller-shutters/roller-shutter-front-mounted-1.jpg",
        alt: { en: "Front-mounted Vorbau 137 shutter box above a renovated window" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-front-mounted-2.jpg",
        alt: { en: "Section of the rounded Vorbau 137 box and guide rail" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-front-mounted-3.jpg",
        alt: { en: "Vorbau 137 half lowered on a south-facing facade" },
      },
    ],
    datasheet: "/pdf/roller-shutters/roller-shutter-front-mounted.pdf",
    related: ["pvc-70-classic", "insect-screen-roller", "external-venetian-blind"],
    featured: true,
  },
  {
    id: "roller-shutter-top-mounted",
    category: "roller-shutters",
    name: "Aufsatz 205",
    tagline: { en: "Top-mounted box, planned with the window." },
    description: {
      en: "The box sits directly on the window frame and goes into the wall with it, insulated to the lintel — the standard for new build because nothing shows on the facade. Ordered together with the window so the statics and the reveal height are right first time.",
    },
    material: "pvc",
    specs: [
      { label: { en: "Box size" }, value: "205", unit: "mm", highlight: true },
      { label: { en: "Slat height" }, value: "37", unit: "mm", highlight: true },
      { label: { en: "Box insulation" }, value: "Usb 0.79", unit: "W/m²K", highlight: true },
      { label: { en: "Mounting" }, value: "On the window frame" },
      { label: { en: "Max. size" }, value: "2500 × 2600", unit: "mm" },
      { label: { en: "Operation" }, value: "Radio motor" },
      { label: { en: "Inspection" }, value: "From below" },
      { label: { en: "Insect screen" }, value: "Integrated optional" },
    ],
    images: [
      {
        src: "/images/roller-shutters/roller-shutter-top-mounted-1.jpg",
        alt: { en: "Aufsatz 205 box mounted on a window frame before installation" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-top-mounted-2.jpg",
        alt: { en: "New-build facade with no visible shutter boxes" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-top-mounted-3.jpg",
        alt: { en: "Inspection opening of the Aufsatz 205 seen from the room" },
      },
    ],
    related: ["pvc-82-comfort", "insect-screen-roller"],
    featured: true,
    badge: "bestseller",
  },
  {
    id: "roller-shutter-concealed",
    category: "roller-shutters",
    name: "Unterputz 165",
    tagline: { en: "Concealed box, plastered flush with the facade." },
    description: {
      en: "The box disappears behind render or cladding and only the guide rails show. Needs the lintel detail agreed with the builder before the shell goes up, which is exactly the conversation we have on site. Motor only.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Box size" }, value: "165", unit: "mm", highlight: true },
      { label: { en: "Slat height" }, value: "37", unit: "mm", highlight: true },
      { label: { en: "Visible parts" }, value: "Guide rails only", highlight: true },
      { label: { en: "Mounting" }, value: "Behind render or cladding" },
      { label: { en: "Max. size" }, value: "2200 × 2400", unit: "mm" },
      { label: { en: "Operation" }, value: "Radio motor" },
      { label: { en: "Inspection" }, value: "From outside, clip panel" },
    ],
    images: [
      {
        src: "/images/roller-shutters/roller-shutter-concealed-1.jpg",
        alt: { en: "Facade with concealed Unterputz 165 boxes, only rails visible" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-concealed-2.jpg",
        alt: { en: "Lintel section showing the plastered-in Unterputz 165 box" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-concealed-3.jpg",
        alt: { en: "Guide rail detail of the Unterputz 165 in anthracite" },
      },
    ],
    related: ["alu-75-slim", "insect-screen-pleated"],
  },
  {
    id: "external-venetian-blind",
    category: "roller-shutters",
    name: "Raffstore 90",
    tagline: { en: "External venetian blind: shade with daylight." },
    description: {
      en: "90 mm aluminium slats that tilt like a venetian blind but hang outside the glass, where they stop the heat before it enters. The office and living-room answer when a closed shutter is too dark. Wind-monitored motor control recommended above the second floor.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Slat width" }, value: "90", unit: "mm", highlight: true },
      { label: { en: "Slat shape" }, value: "Z, bordered", highlight: true },
      { label: { en: "Max. area" }, value: "12", unit: "m²", highlight: true },
      { label: { en: "Max. size" }, value: "3000 × 4000", unit: "mm" },
      { label: { en: "Operation" }, value: "Motor, wind monitored" },
      { label: { en: "Guide" }, value: "Rail or cable" },
      { label: { en: "Tilt range" }, value: "0–180°" },
    ],
    images: [
      {
        src: "/images/roller-shutters/external-venetian-blind-1.jpg",
        alt: { en: "Raffstore 90 external blinds tilted open on an office facade" },
      },
      {
        src: "/images/roller-shutters/external-venetian-blind-2.jpg",
        alt: { en: "Z-profile slat detail of the Raffstore 90" },
      },
      {
        src: "/images/roller-shutters/external-venetian-blind-3.jpg",
        alt: { en: "Living room behind half-tilted Raffstore 90 slats" },
      },
    ],
    related: ["alu-75-slim", "wood-alu-92-nature"],
  },
];
