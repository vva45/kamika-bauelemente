/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const interiorDoors: Product[] = [
  {
    id: "cpl-basic",
    category: "interior-doors",
    name: "CPL Basic",
    tagline: { en: "CPL laminate leaf that shrugs off daily wear." },
    description: {
      en: "A tubular-chipboard leaf with a 0.2 mm CPL surface — the practical spec for family houses and rentals, because the laminate takes knocks that would mark a lacquered door. Rebated edge, three-part frame for wall thicknesses from 80 to 330 mm.",
    },
    material: "wood",
    specs: [
      { label: { en: "Leaf thickness" }, value: "40", unit: "mm", highlight: true },
      { label: { en: "Surface" }, value: "CPL 0.2 mm", highlight: true },
      { label: { en: "Core" }, value: "Tubular chipboard", highlight: true },
      { label: { en: "Edge" }, value: "Rebated" },
      { label: { en: "Standard sizes" }, value: "610–985 × 1985", unit: "mm" },
      { label: { en: "Frame range" }, value: "80–330 mm walls" },
      { label: { en: "Hinges" }, value: "2 × V 4426" },
    ],
    images: [
      {
        src: "/images/interior-doors/cpl-basic-1.jpg",
        alt: { en: "White CPL Basic interior door in a hallway" },
      },
      {
        src: "/images/interior-doors/cpl-basic-2.jpg",
        alt: { en: "Rebated edge and hinge detail of the CPL Basic leaf" },
      },
      {
        src: "/images/interior-doors/cpl-basic-3.jpg",
        alt: { en: "CPL Basic doors along a corridor of a family house" },
      },
    ],
    catalogue: { id: "doors-2025", page: 32 },
    related: ["veneer-oak", "lacquer-flat"],
  },
  {
    id: "veneer-oak",
    category: "interior-doors",
    name: "Veneer Oak",
    tagline: { en: "Real oak veneer, matched grain across the set." },
    description: {
      en: "Crossbanded real-wood veneer with a matt varnish, supplied so that the grain runs match across every door ordered for one floor. Solid-core option lifts it to 32 dB for bedrooms. Flush or rebated edge.",
    },
    material: "wood",
    specs: [
      { label: { en: "Leaf thickness" }, value: "40", unit: "mm", highlight: true },
      { label: { en: "Surface" }, value: "Oak veneer, matt", highlight: true },
      { label: { en: "Sound insulation" }, value: "up to 32", unit: "dB", highlight: true },
      { label: { en: "Edge" }, value: "Flush or rebated" },
      { label: { en: "Core" }, value: "Solid or tubular chipboard" },
      { label: { en: "Standard sizes" }, value: "610–985 × 1985", unit: "mm" },
      { label: { en: "Hinges" }, value: "Concealed optional" },
    ],
    images: [
      {
        src: "/images/interior-doors/veneer-oak-1.jpg",
        alt: { en: "Veneer Oak door with horizontal grain in a living room" },
      },
      {
        src: "/images/interior-doors/veneer-oak-2.jpg",
        alt: { en: "Grain matching across two adjacent Veneer Oak doors" },
      },
      {
        src: "/images/interior-doors/veneer-oak-3.jpg",
        alt: { en: "Concealed hinge on the Veneer Oak leaf" },
      },
    ],
    catalogue: { id: "doors-2025", page: 36 },
    related: ["cpl-basic", "acoustic-32"],
    featured: true,
  },
  {
    id: "lacquer-flat",
    category: "interior-doors",
    name: "Lacquer Flat",
    tagline: { en: "Flush lacquered leaf for wall-flush frames." },
    description: {
      en: "A completely flat leaf lacquered in RAL 9016 or any RAL on request, built for wall-flush installation: the frame disappears into the plaster and the door reads as part of the wall. Concealed hinges and magnetic latch as standard.",
    },
    material: "wood",
    specs: [
      { label: { en: "Leaf thickness" }, value: "40", unit: "mm", highlight: true },
      { label: { en: "Surface" }, value: "Lacquer, any RAL", highlight: true },
      { label: { en: "Installation" }, value: "Wall-flush", highlight: true },
      { label: { en: "Edge" }, value: "Flush" },
      { label: { en: "Hinges" }, value: "Concealed, 3D adjustable" },
      { label: { en: "Latch" }, value: "Magnetic" },
      { label: { en: "Standard sizes" }, value: "610–985 × 2110", unit: "mm" },
    ],
    images: [
      {
        src: "/images/interior-doors/lacquer-flat-1.jpg",
        alt: { en: "Wall-flush Lacquer Flat door almost invisible in a white wall" },
      },
      {
        src: "/images/interior-doors/lacquer-flat-2.jpg",
        alt: { en: "Concealed hinge and magnetic latch of the Lacquer Flat" },
      },
      {
        src: "/images/interior-doors/lacquer-flat-3.jpg",
        alt: { en: "Lacquer Flat door open, showing the hidden frame" },
      },
    ],
    catalogue: { id: "doors-2025", page: 40 },
    related: ["veneer-oak", "cpl-basic"],
    featured: true,
    badge: "new",
  },
  {
    id: "acoustic-32",
    category: "interior-doors",
    name: "Acoustic 32",
    tagline: { en: "32 dB rated door for offices and bedrooms." },
    description: {
      en: "A solid-core leaf with drop-down seal and double rebate, tested as a set with its frame to 32 dB. Specified per opening: the rating only holds if leaf, frame and seal come as one system, which is how we order it.",
    },
    material: "wood",
    specs: [
      { label: { en: "Sound insulation" }, value: "32", unit: "dB", highlight: true },
      { label: { en: "Leaf thickness" }, value: "45", unit: "mm", highlight: true },
      { label: { en: "Core" }, value: "Solid chipboard", highlight: true },
      { label: { en: "Bottom seal" }, value: "Drop-down" },
      { label: { en: "Edge" }, value: "Double rebate" },
      { label: { en: "Standard sizes" }, value: "735–985 × 1985", unit: "mm" },
      { label: { en: "Smoke rating" }, value: "RS optional" },
    ],
    images: [
      {
        src: "/images/interior-doors/acoustic-32-1.jpg",
        alt: { en: "Acoustic 32 door closing off a home office" },
      },
      {
        src: "/images/interior-doors/acoustic-32-2.jpg",
        alt: { en: "Drop-down seal under the Acoustic 32 leaf" },
      },
      {
        src: "/images/interior-doors/acoustic-32-3.jpg",
        alt: { en: "Double rebate edge of the Acoustic 32 door" },
      },
    ],
    catalogue: { id: "doors-2025", page: 44 },
    related: ["veneer-oak", "lacquer-flat"],
  },
];
