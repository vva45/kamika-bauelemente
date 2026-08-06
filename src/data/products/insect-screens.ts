/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const insectScreens: Product[] = [
  {
    id: "insect-screen-fixed-frame",
    category: "insect-screens",
    name: "Fixframe 25",
    tagline: { en: "Fixed frame that clips on and lifts off." },
    description: {
      en: "A 25 mm powder-coated aluminium frame with fibreglass mesh, held by spring clips on the window frame — no drilling. Comes off in seconds for cleaning and goes to the cellar for winter. Made to the measured opening, colour matched to the window.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Frame depth" }, value: "25", unit: "mm", highlight: true },
      { label: { en: "Mesh" }, value: "Fibreglass, grey", highlight: true },
      { label: { en: "Fixing" }, value: "Spring clips, no drilling", highlight: true },
      { label: { en: "Max. size" }, value: "1600 × 2200", unit: "mm" },
      { label: { en: "Frame colours" }, value: "All RAL" },
      { label: { en: "Light transmission" }, value: "ca. 70", unit: "%" },
    ],
    images: [
      {
        src: "/images/insect-screens/insect-screen-fixed-frame-1.jpg",
        alt: { en: "Fixframe 25 clipped onto a kitchen window" },
      },
      {
        src: "/images/insect-screens/insect-screen-fixed-frame-2.jpg",
        alt: { en: "Spring clip fixing of the Fixframe 25, no screws in the window" },
      },
      {
        src: "/images/insect-screens/insect-screen-fixed-frame-3.jpg",
        alt: { en: "Fixframe 25 being lifted off for cleaning" },
      },
    ],
    related: ["pvc-70-classic", "roller-shutter-front-mounted"],
  },
  {
    id: "insect-screen-pleated",
    category: "insect-screens",
    name: "Plissee Slim",
    tagline: { en: "Pleated screen with a 22 mm floor rail." },
    description: {
      en: "A pleated mesh that parks to the side and crosses openings up to 2.8 m wide, with a floor rail only 22 mm high — low enough to walk over barefoot. The standard answer for terrace and balcony doors in daily use.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Floor rail height" }, value: "22", unit: "mm", highlight: true },
      { label: { en: "Max. width" }, value: "2800", unit: "mm", highlight: true },
      { label: { en: "Mesh" }, value: "Pleated polyester", highlight: true },
      { label: { en: "Max. size" }, value: "2800 × 2600", unit: "mm" },
      { label: { en: "Operation" }, value: "Slides both ways" },
      { label: { en: "Frame colours" }, value: "All RAL" },
    ],
    images: [
      {
        src: "/images/insect-screens/insect-screen-pleated-1.jpg",
        alt: { en: "Plissee Slim drawn halfway across a terrace door" },
      },
      {
        src: "/images/insect-screens/insect-screen-pleated-2.jpg",
        alt: { en: "22 mm floor rail of the Plissee Slim at the threshold" },
      },
      {
        src: "/images/insect-screens/insect-screen-pleated-3.jpg",
        alt: { en: "Pleated mesh parked at the side of the opening" },
      },
    ],
    related: ["wood-alu-92-nature", "roller-shutter-concealed"],
    featured: true,
  },
  {
    id: "insect-screen-hinged-door",
    category: "insect-screens",
    name: "Drehtür 40",
    tagline: { en: "Hinged screen door that closes itself." },
    description: {
      en: "A hinged aluminium screen door with self-closing hinges and a magnetic latch, for balcony and entrance doors that stay open all summer. Kick plate at the bottom because dogs and children do not use handles.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Frame depth" }, value: "40", unit: "mm", highlight: true },
      { label: { en: "Closing" }, value: "Self-closing hinges", highlight: true },
      { label: { en: "Latch" }, value: "Magnetic", highlight: true },
      { label: { en: "Max. size" }, value: "1200 × 2400", unit: "mm" },
      { label: { en: "Kick plate" }, value: "200 mm, optional" },
      { label: { en: "Mesh" }, value: "Fibreglass or pet-proof" },
    ],
    images: [
      {
        src: "/images/insect-screens/insect-screen-hinged-door-1.jpg",
        alt: { en: "Drehtür 40 screen door on a balcony entrance" },
      },
      {
        src: "/images/insect-screens/insect-screen-hinged-door-2.jpg",
        alt: { en: "Self-closing hinge of the Drehtür 40" },
      },
      {
        src: "/images/insect-screens/insect-screen-hinged-door-3.jpg",
        alt: { en: "Kick plate detail on the Drehtür 40" },
      },
    ],
    related: ["alu-86-thermo", "pvc-76-entrance"],
  },
  {
    id: "insect-screen-roller",
    category: "insect-screens",
    name: "Rollo Integral",
    tagline: { en: "Roller screen living inside the shutter box." },
    description: {
      en: "A spring-loaded mesh roller built into the shutter guide rails: pull it down when needed, let it retract when not. Ordered with the shutter — retrofitting into existing boxes is possible on most systems, which we check on site.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Integration" }, value: "In shutter guide rails", highlight: true },
      { label: { en: "Mesh" }, value: "Fibreglass, grey", highlight: true },
      { label: { en: "Operation" }, value: "Spring, hand strip", highlight: true },
      { label: { en: "Max. size" }, value: "2000 × 2400", unit: "mm" },
      { label: { en: "Retrofit" }, value: "Checked per box" },
      { label: { en: "Brake" }, value: "Soft retract" },
    ],
    images: [
      {
        src: "/images/insect-screens/insect-screen-roller-1.jpg",
        alt: { en: "Rollo Integral half pulled down inside shutter rails" },
      },
      {
        src: "/images/insect-screens/insect-screen-roller-2.jpg",
        alt: { en: "Shutter box section with the integrated screen roller" },
      },
      {
        src: "/images/insect-screens/insect-screen-roller-3.jpg",
        alt: { en: "Hand strip of the Rollo Integral at the sill" },
      },
    ],
    related: ["roller-shutter-front-mounted", "pvc-70-classic"],
  },
];
