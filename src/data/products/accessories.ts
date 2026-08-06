/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 *
 * Las referencias a páginas de catálogo se retiraron al llegar los
 * catálogos reales: los cuatro que hay son de puertas de entrada, y
 * estos modelos de ejemplo no aparecen en ellos. Enlazar un accesorio a
 * la página 38 de un catálogo de puertas sería mandar al cliente a una
 * página que no habla de lo que ha pinchado. Mientras no haya catálogo
 * de la gama, el botón "Technical data sheet" simplemente no se pinta,
 * que es la regla del sitio: antes sin botón que con un enlace que
 * miente.
 */
import type { Product } from "../types";

export const accessories: Product[] = [
  {
    id: "handle-lockable",
    category: "accessories",
    name: "Secustik Lock 100",
    tagline: { en: "Lockable window handle, 100 Nm tested." },
    description: {
      en: "A key-lockable handle that blocks the gear from outside manipulation, tested to 100 Nm. Fitted to ground-floor and reachable windows it is the cheapest single upgrade to RC-rated hardware. One key works every handle in the house.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Locking torque" }, value: "100", unit: "Nm", highlight: true },
      { label: { en: "Keyed" }, value: "Alike, whole house", highlight: true },
      { label: { en: "Spindle" }, value: "7 × 7 mm", highlight: true },
      { label: { en: "Positions" }, value: "45° stepped" },
      { label: { en: "Finishes" }, value: "White, silver, anthracite, bronze" },
      { label: { en: "Standard" }, value: "DIN EN 13126-3" },
    ],
    images: [
      {
        src: "/images/accessories/handle-lockable-1.jpg",
        alt: { en: "Secustik Lock 100 handle with key on a white window" },
      },
      {
        src: "/images/accessories/handle-lockable-2.jpg",
        alt: { en: "The four finishes of the Secustik Lock 100 side by side" },
      },
      {
        src: "/images/accessories/handle-lockable-3.jpg",
        alt: { en: "Secustik Lock 100 locked on a ground-floor window" },
      },
    ],
    related: ["pvc-70-classic", "pvc-82-comfort", "security-cylinder"],
    featured: true,
  },
  {
    id: "window-sill-aluminium",
    category: "accessories",
    name: "Alu Sill 40",
    tagline: { en: "Exterior aluminium sill with end caps." },
    description: {
      en: "Roll-formed aluminium exterior sill, 40 mm front edge, cut to the measured opening with plastic end caps that take the render movement. Fitted with the window on a sloped, sealed bed — the detail that decides whether the wall under the window stays dry.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Front edge" }, value: "40", unit: "mm", highlight: true },
      { label: { en: "Depths" }, value: "90–400", unit: "mm", highlight: true },
      { label: { en: "Slope" }, value: "5°", highlight: true },
      { label: { en: "End caps" }, value: "Plastic, render joint" },
      { label: { en: "Coating" }, value: "Powder, all RAL" },
      { label: { en: "Fixing" }, value: "Glued + screwed, sealed" },
    ],
    images: [
      {
        src: "/images/accessories/window-sill-aluminium-1.jpg",
        alt: { en: "Alu Sill 40 under a window in anthracite" },
      },
      {
        src: "/images/accessories/window-sill-aluminium-2.jpg",
        alt: { en: "End cap and render joint of the Alu Sill 40" },
      },
      {
        src: "/images/accessories/window-sill-aluminium-3.jpg",
        alt: { en: "Sloped sealed bed before the sill is fitted" },
      },
    ],
    related: ["pvc-82-comfort", "wood-alu-92-nature"],
  },
  {
    id: "security-cylinder",
    category: "accessories",
    name: "Cylinder KS10",
    tagline: { en: "Drill and pick protected cylinder, keyed alike." },
    description: {
      en: "A modular profile cylinder with drill protection, pick protection and a security card for key copies. Entrance door, side door, garage wicket and garden gate on one key — we order the whole set keyed alike from the measured lock cases.",
    },
    specs: [
      { label: { en: "Protection" }, value: "Drill + pick", highlight: true },
      { label: { en: "Key copies" }, value: "Security card only", highlight: true },
      { label: { en: "Keying" }, value: "Alike across doors", highlight: true },
      { label: { en: "Lengths" }, value: "27/27–70/70, modular" },
      { label: { en: "Emergency function" }, value: "Both sides" },
      { label: { en: "Standard" }, value: "DIN EN 1303" },
    ],
    images: [
      {
        src: "/images/accessories/security-cylinder-1.jpg",
        alt: { en: "Cylinder KS10 with three keys and security card" },
      },
      {
        src: "/images/accessories/security-cylinder-2.jpg",
        alt: { en: "KS10 fitted in an entrance door escutcheon" },
      },
      {
        src: "/images/accessories/security-cylinder-3.jpg",
        alt: { en: "One key opening house, garage and garden gate" },
      },
    ],
    related: ["alu-86-thermo", "handle-lockable"],
  },
  {
    id: "window-rebate-vent",
    category: "accessories",
    name: "Rebate Vent 35",
    tagline: { en: "Background ventilation without opening a window." },
    description: {
      en: "A rebate ventilator set into the window gasket line: it exchanges air at a controlled rate even with the window locked, which is what a renovated airtight house needs to keep moisture off the reveals. Sized per room during measuring, not sold by the piece.",
    },
    specs: [
      { label: { en: "Airflow" }, value: "35", unit: "m³/h", highlight: true },
      { label: { en: "Mounting" }, value: "In the rebate, invisible", highlight: true },
      { label: { en: "Wind control" }, value: "Self-regulating", highlight: true },
      { label: { en: "Sound path" }, value: "No direct opening" },
      { label: { en: "Sizing" }, value: "Per room, DIN 1946-6" },
    ],
    images: [
      {
        src: "/images/accessories/window-rebate-vent-1.jpg",
        alt: { en: "Rebate Vent 35 set into the top rebate of a window" },
      },
      {
        src: "/images/accessories/window-rebate-vent-2.jpg",
        alt: { en: "Airflow diagram through the rebate ventilator" },
      },
      {
        src: "/images/accessories/window-rebate-vent-3.jpg",
        alt: { en: "Window closed with the vent working, seen from the room" },
      },
    ],
    related: ["pvc-82-comfort", "pvc-70-classic"],
  },
];
