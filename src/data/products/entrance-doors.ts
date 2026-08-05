/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const entranceDoors: Product[] = [
  {
    id: "alu-86-thermo",
    category: "entrance-doors",
    name: "Alu 86 Thermo",
    tagline: { en: "Insulated aluminium door, Ud from 0.8 W/m²K." },
    description: {
      en: "An aluminium entrance door with a foam-filled sandwich panel flush to the outside face. Five-point locking as standard, thermally broken threshold at 20 mm, and concealed hinges rated for 120 kg. The panel range covers glazed cut-outs and stainless applications.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Ud value" }, value: "0.8", unit: "W/m²K", highlight: true },
      { label: { en: "Door depth" }, value: "86", unit: "mm", highlight: true },
      { label: { en: "Burglary resistance" }, value: "RC2", highlight: true },
      { label: { en: "Locking points" }, value: "5" },
      { label: { en: "Threshold height" }, value: "20", unit: "mm" },
      { label: { en: "Max. size" }, value: "1250 × 2500", unit: "mm" },
      { label: { en: "Hinges" }, value: "Concealed, 120 kg" },
      { label: { en: "Panel" }, value: "Flush sandwich, 86 mm" },
    ],
    images: [
      {
        src: "/images/entrance-doors/alu-86-thermo-1.jpg",
        alt: { en: "Alu 86 Thermo entrance door in anthracite on a rendered facade" },
      },
      {
        src: "/images/entrance-doors/alu-86-thermo-2.jpg",
        alt: { en: "Section through the Alu 86 Thermo panel showing the insulation core" },
      },
      {
        src: "/images/entrance-doors/alu-86-thermo-3.jpg",
        alt: { en: "Alu 86 Thermo seen from the hallway with the door ajar" },
      },
    ],
    datasheet: "/pdf/entrance-doors/alu-86-thermo.pdf",
    related: ["security-cylinder", "alu-75-slim", "insect-screen-hinged-door"],
    featured: true,
    badge: "bestseller",
  },
  {
    id: "pvc-76-entrance",
    category: "entrance-doors",
    name: "PVC 76 Entrance",
    tagline: { en: "Reinforced PVC door for renovation budgets." },
    description: {
      en: "A six-chamber PVC door leaf with continuous steel reinforcement and a glued glazing unit that stiffens the sash. The realistic choice when the budget is set by a whole-house renovation: it matches PVC windows in colour and profile line.",
    },
    material: "pvc",
    specs: [
      { label: { en: "Ud value" }, value: "1.0", unit: "W/m²K", highlight: true },
      { label: { en: "Door depth" }, value: "76", unit: "mm", highlight: true },
      { label: { en: "Chambers" }, value: "6", highlight: true },
      { label: { en: "Locking points" }, value: "5" },
      { label: { en: "Threshold height" }, value: "20", unit: "mm" },
      { label: { en: "Max. size" }, value: "1100 × 2300", unit: "mm" },
      { label: { en: "Reinforcement" }, value: "Closed steel section" },
      { label: { en: "Burglary resistance" }, value: "RC1 N" },
    ],
    images: [
      {
        src: "/images/entrance-doors/pvc-76-entrance-1.jpg",
        alt: { en: "White PVC 76 entrance door with a long glazed side panel" },
      },
      {
        src: "/images/entrance-doors/pvc-76-entrance-2.jpg",
        alt: { en: "Corner detail of the PVC 76 door profile" },
      },
      {
        src: "/images/entrance-doors/pvc-76-entrance-3.jpg",
        alt: { en: "PVC 76 entrance door installed in a renovated terraced house" },
      },
    ],
    catalogue: { id: "doors-2025", page: 8 },
    related: ["security-cylinder", "pvc-70-classic", "insect-screen-hinged-door"],
  },
  {
    id: "alu-panel-line",
    category: "entrance-doors",
    name: "Alu Panel Line",
    tagline: { en: "Flush design panels, hidden fixings, one plane." },
    description: {
      en: "The design range on the Alu 86 body: the panel sits flush with the frame on both faces, the handle bar is welded rather than screwed, and the glazing is set in a shadow groove. Available in every RAL colour and three brushed stainless finishes.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Ud value" }, value: "0.9", unit: "W/m²K", highlight: true },
      { label: { en: "Door depth" }, value: "86", unit: "mm", highlight: true },
      { label: { en: "Burglary resistance" }, value: "RC2", highlight: true },
      { label: { en: "Locking points" }, value: "5" },
      { label: { en: "Max. size" }, value: "1300 × 2500", unit: "mm" },
      { label: { en: "Handle bar" }, value: "Welded, stainless" },
      { label: { en: "Glazing" }, value: "Triple, shadow groove" },
    ],
    images: [
      {
        src: "/images/entrance-doors/alu-panel-line-1.jpg",
        alt: { en: "Alu Panel Line door flush with the facade, handle bar full height" },
      },
      {
        src: "/images/entrance-doors/alu-panel-line-2.jpg",
        alt: { en: "Shadow-groove glazing detail on the Alu Panel Line" },
      },
      {
        src: "/images/entrance-doors/alu-panel-line-3.jpg",
        alt: { en: "Alu Panel Line in basalt grey on a modern house" },
      },
    ],
    catalogue: { id: "doors-2025", page: 16 },
    related: ["security-cylinder", "alu-75-slim"],
    featured: true,
    badge: "new",
  },
  {
    id: "steel-secure-rc3",
    category: "entrance-doors",
    name: "Steel Secure RC3",
    tagline: { en: "RC3 steel door for side entrances and workshops." },
    description: {
      en: "A double-skinned steel leaf with a galvanised frame, tested to RC3. The usual choice for the door between garage and house, cellar entrances and workshops: it takes daily abuse, and the powder coating matches the main entrance colour.",
    },
    material: "steel",
    specs: [
      { label: { en: "Burglary resistance" }, value: "RC3", highlight: true },
      { label: { en: "Leaf thickness" }, value: "62", unit: "mm", highlight: true },
      { label: { en: "Ud value" }, value: "1.4", unit: "W/m²K", highlight: true },
      { label: { en: "Locking points" }, value: "9" },
      { label: { en: "Max. size" }, value: "1250 × 2250", unit: "mm" },
      { label: { en: "Frame" }, value: "Galvanised corner frame" },
      { label: { en: "Sound insulation" }, value: "up to 42", unit: "dB" },
    ],
    images: [
      {
        src: "/images/entrance-doors/steel-secure-rc3-1.jpg",
        alt: { en: "Steel Secure RC3 door on a workshop entrance" },
      },
      {
        src: "/images/entrance-doors/steel-secure-rc3-2.jpg",
        alt: { en: "Multi-point lock edge of the Steel Secure RC3 leaf" },
      },
      {
        src: "/images/entrance-doors/steel-secure-rc3-3.jpg",
        alt: { en: "Steel Secure RC3 fitted between garage and house" },
      },
    ],
    catalogue: { id: "doors-2025", page: 24 },
    related: ["security-cylinder", "sectional-garage-40"],
  },
];
