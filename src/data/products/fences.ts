/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const fences: Product[] = [
  {
    id: "fence-horizontal-alu",
    category: "fences",
    name: "Linea Horizontal",
    tagline: { en: "Horizontal aluminium slats, gaps to choose." },
    description: {
      en: "Powder-coated aluminium slats running horizontally between posts, with the gap chosen per project — from open 40 mm to near-closed 10 mm. Panels are set out from a site plan before production, so slopes are stepped or raked deliberately, not improvised.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Slat" }, value: "80 × 20", unit: "mm", highlight: true },
      { label: { en: "Heights" }, value: "800–1800", unit: "mm", highlight: true },
      { label: { en: "Post spacing" }, value: "up to 2000", unit: "mm", highlight: true },
      { label: { en: "Gap options" }, value: "10 / 20 / 40 mm" },
      { label: { en: "Coating" }, value: "Powder, all RAL" },
      { label: { en: "Posts" }, value: "60 × 60 mm, set in concrete" },
      { label: { en: "Slopes" }, value: "Stepped or raked" },
    ],
    images: [
      {
        src: "/images/fences/fence-horizontal-alu-1.jpg",
        alt: { en: "Linea Horizontal fence along a front garden" },
      },
      {
        src: "/images/fences/fence-horizontal-alu-2.jpg",
        alt: { en: "Slat and post junction of the Linea Horizontal" },
      },
      {
        src: "/images/fences/fence-horizontal-alu-3.jpg",
        alt: { en: "Stepped Linea Horizontal panels on a sloping plot" },
      },
    ],
    related: ["sliding-gate-alu", "pedestrian-gate-alu"],
    featured: true,
  },
  {
    id: "fence-vertical-bar",
    category: "fences",
    name: "Barra Vertical",
    tagline: { en: "Vertical steel bars, the classic that lasts." },
    description: {
      en: "Galvanised and powder-coated steel bars welded into panels — the fence that gets climbed on, leaned on and hit by bicycles and shrugs it off. Matching swing and pedestrian gates from the same range.",
    },
    material: "steel",
    specs: [
      { label: { en: "Bar" }, value: "25 × 25", unit: "mm", highlight: true },
      { label: { en: "Heights" }, value: "600–2000", unit: "mm", highlight: true },
      { label: { en: "Finish" }, value: "Galvanised + powder", highlight: true },
      { label: { en: "Post spacing" }, value: "up to 2500", unit: "mm" },
      { label: { en: "Bar spacing" }, value: "110 mm clear" },
      { label: { en: "Fixing" }, value: "Concrete or flange plate" },
    ],
    images: [
      {
        src: "/images/fences/fence-vertical-bar-1.jpg",
        alt: { en: "Barra Vertical steel fence around a family garden" },
      },
      {
        src: "/images/fences/fence-vertical-bar-2.jpg",
        alt: { en: "Welded bar-to-rail joint of the Barra Vertical" },
      },
      {
        src: "/images/fences/fence-vertical-bar-3.jpg",
        alt: { en: "Flange-plate post fixing on a low wall" },
      },
    ],
    related: ["swing-gate-alu", "pedestrian-gate-alu"],
  },
  {
    id: "fence-privacy-screen",
    category: "fences",
    name: "Sichtschutz Voll",
    tagline: { en: "Full privacy panels for terrace and boundary." },
    description: {
      en: "Closed aluminium panels with a tongue-and-groove profile, for the terrace side where the point is not being seen. Calculated for wind load at full height — a closed panel takes far more wind than bars, which is why the post spec changes with it.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Profile" }, value: "Tongue and groove", highlight: true },
      { label: { en: "Heights" }, value: "1600–2000", unit: "mm", highlight: true },
      { label: { en: "Wind load" }, value: "Calculated per site", highlight: true },
      { label: { en: "Post spacing" }, value: "up to 1500", unit: "mm" },
      { label: { en: "Coating" }, value: "Powder, all RAL + decor" },
      { label: { en: "Posts" }, value: "80 × 80 mm at full height" },
    ],
    images: [
      {
        src: "/images/fences/fence-privacy-screen-1.jpg",
        alt: { en: "Sichtschutz Voll privacy panels beside a terrace" },
      },
      {
        src: "/images/fences/fence-privacy-screen-2.jpg",
        alt: { en: "Tongue-and-groove joint of the Sichtschutz Voll panel" },
      },
      {
        src: "/images/fences/fence-privacy-screen-3.jpg",
        alt: { en: "Sichtschutz Voll in wood decor along a boundary" },
      },
    ],
    related: ["fence-horizontal-alu", "sliding-gate-alu"],
  },
  {
    id: "pedestrian-gate-alu",
    category: "fences",
    name: "Gartentür Uno",
    tagline: { en: "Pedestrian gate matching every fence range." },
    description: {
      en: "A single gate on self-closing hinges with a lockable latch, built with the same infill as the chosen fence so the run reads as one piece. Electric strike optional for intercom release.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Clear width" }, value: "1000", unit: "mm", highlight: true },
      { label: { en: "Hinges" }, value: "Self-closing, adjustable", highlight: true },
      { label: { en: "Latch" }, value: "Lockable cylinder", highlight: true },
      { label: { en: "Max. size" }, value: "1200 × 1800", unit: "mm" },
      { label: { en: "Electric strike" }, value: "Optional" },
      { label: { en: "Infill" }, value: "Matches fence range" },
    ],
    images: [
      {
        src: "/images/fences/pedestrian-gate-alu-1.jpg",
        alt: { en: "Gartentür Uno pedestrian gate in a horizontal-slat fence" },
      },
      {
        src: "/images/fences/pedestrian-gate-alu-2.jpg",
        alt: { en: "Self-closing hinge and latch of the Gartentür Uno" },
      },
      {
        src: "/images/fences/pedestrian-gate-alu-3.jpg",
        alt: { en: "Electric strike detail for intercom release" },
      },
    ],
    related: ["fence-horizontal-alu", "swing-gate-alu"],
  },
];
