/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Hay que reemplazarlos por los modelos que
 * la empresa vende de verdad antes de publicar. Ver CONTENT.md.
 *
 * Los `related` cruzan categorías a propósito: una ventana recomienda
 * persiana, mosquitera y manilla. Ese cruce se decide a mano, no se
 * genera por categoría.
 */
import type { Product } from "../types";

export const windows: Product[] = [
  {
    id: "pvc-70-classic",
    category: "windows",
    name: "PVC 70 Classic",
    tagline: { en: "Five-chamber PVC window, 70 mm frame depth." },
    description: {
      en: "The standard replacement window for renovation work. A five-chamber profile with two gaskets and double glazing, which keeps the existing opening and the existing sill. Steel reinforcement in frame and sash on every size above 1200 mm.",
    },
    material: "pvc",
    specs: [
      { label: { en: "Frame depth" }, value: "70", unit: "mm", highlight: true },
      { label: { en: "Uw value" }, value: "1.1", unit: "W/m²K", highlight: true },
      { label: { en: "Chambers" }, value: "5", highlight: true },
      { label: { en: "Glazing" }, value: "4/16/4 double" },
      { label: { en: "Gaskets" }, value: "2" },
      { label: { en: "Sound insulation" }, value: "up to 38", unit: "dB" },
      { label: { en: "Burglary resistance" }, value: "RC1 N" },
      { label: { en: "Max. sash size" }, value: "1200 × 2200", unit: "mm" },
      { label: { en: "Wind load class" }, value: "C3/B3" },
    ],
    images: [
      {
        src: "/images/windows/pvc-70-classic-1.jpg",
        alt: { en: "PVC 70 Classic window seen from inside a renovated room" },
      },
      {
        src: "/images/windows/pvc-70-classic-2.jpg",
        alt: { en: "Corner section of the PVC 70 Classic frame showing the two gaskets" },
      },
      {
        src: "/images/windows/pvc-70-classic-3.jpg",
        alt: { en: "PVC 70 Classic window fitted in a masonry opening" },
      },
    ],
    catalogue: { id: "windows-2025", page: 12 },
    related: ["roller-shutter-front-mounted", "insect-screen-fixed-frame", "handle-lockable"],
    featured: true,
  },
  {
    id: "pvc-82-comfort",
    category: "windows",
    name: "PVC 82 Comfort",
    tagline: { en: "Seven chambers and triple glazing, Uw from 0.86." },
    description: {
      en: "The profile we fit most often in new build. Seven chambers, three gaskets and triple glazing bring the window down to Uw 0.86 W/m²K, which meets the current requirement without extra measures. Standard fittings are RC2 ready: the locking points are already mushroom cams, only the striker plates and glass change.",
    },
    material: "pvc",
    specs: [
      { label: { en: "Frame depth" }, value: "82", unit: "mm", highlight: true },
      { label: { en: "Uw value" }, value: "0.86", unit: "W/m²K", highlight: true },
      { label: { en: "Chambers" }, value: "7", highlight: true },
      { label: { en: "Glazing" }, value: "4/18/4/18/4 triple" },
      { label: { en: "Gaskets" }, value: "3" },
      { label: { en: "Sound insulation" }, value: "up to 45", unit: "dB" },
      { label: { en: "Burglary resistance" }, value: "RC2" },
      { label: { en: "Max. sash size" }, value: "1400 × 2400", unit: "mm" },
      { label: { en: "Wind load class" }, value: "C4/B4" },
    ],
    images: [
      {
        src: "/images/windows/pvc-82-comfort-1.jpg",
        alt: { en: "PVC 82 Comfort window with triple glazing in a new-build room" },
      },
      {
        src: "/images/windows/pvc-82-comfort-2.jpg",
        alt: { en: "Detail of the three-gasket seal on the PVC 82 Comfort profile" },
      },
      {
        src: "/images/windows/pvc-82-comfort-3.jpg",
        alt: { en: "Anthracite grey PVC 82 Comfort window seen from outside" },
      },
    ],
    datasheet: "/pdf/windows/pvc-82-comfort.pdf",
    related: ["roller-shutter-top-mounted", "insect-screen-pleated", "handle-lockable"],
    featured: true,
    badge: "bestseller",
  },
  {
    id: "alu-75-slim",
    category: "windows",
    name: "Alu 75 Slim",
    tagline: { en: "Narrow aluminium face width for large glass areas." },
    description: {
      en: "A thermally broken aluminium window for openings where the glass should do the work. The visible face width is 95 mm, roughly a third less than an equivalent PVC frame, and the profile carries sash weights up to 160 kg. Powder coated in any RAL colour, inside and outside independently.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Frame depth" }, value: "75", unit: "mm", highlight: true },
      { label: { en: "Uw value" }, value: "1.0", unit: "W/m²K", highlight: true },
      { label: { en: "Visible face width" }, value: "95", unit: "mm", highlight: true },
      { label: { en: "Thermal break" }, value: "34", unit: "mm" },
      { label: { en: "Glazing" }, value: "up to 52 mm triple" },
      { label: { en: "Max. sash weight" }, value: "160", unit: "kg" },
      { label: { en: "Sound insulation" }, value: "up to 43", unit: "dB" },
      { label: { en: "Burglary resistance" }, value: "RC2" },
    ],
    images: [
      {
        src: "/images/windows/alu-75-slim-1.jpg",
        alt: { en: "Alu 75 Slim window with a narrow frame around a large glass pane" },
      },
      {
        src: "/images/windows/alu-75-slim-2.jpg",
        alt: { en: "Horizontal section of the Alu 75 Slim profile showing the thermal break" },
      },
      {
        src: "/images/windows/alu-75-slim-3.jpg",
        alt: { en: "Alu 75 Slim windows in a facade, powder coated dark grey" },
      },
    ],
    catalogue: { id: "windows-2025", page: 24 },
    related: ["roller-shutter-top-mounted", "insect-screen-fixed-frame"],
  },
  {
    id: "wood-alu-92-nature",
    category: "windows",
    name: "Wood-Alu 92 Nature",
    tagline: { en: "Timber inside, aluminium shell outside." },
    description: {
      en: "Laminated spruce or oak on the room side, with a clipped aluminium shell taking the weather on the outside. The timber is finished in the workshop and never needs repainting on the facade. Uw reaches 0.72 W/m²K with triple glazing and a 92 mm frame.",
    },
    material: "wood-alu",
    specs: [
      { label: { en: "Frame depth" }, value: "92", unit: "mm", highlight: true },
      { label: { en: "Uw value" }, value: "0.72", unit: "W/m²K", highlight: true },
      { label: { en: "Timber" }, value: "Spruce or oak", highlight: true },
      { label: { en: "Glazing" }, value: "4/18/4/18/4 triple" },
      { label: { en: "Outer shell" }, value: "Powder-coated aluminium" },
      { label: { en: "Sound insulation" }, value: "up to 46", unit: "dB" },
      { label: { en: "Burglary resistance" }, value: "RC2" },
      { label: { en: "Max. sash size" }, value: "1500 × 2600", unit: "mm" },
    ],
    images: [
      {
        src: "/images/windows/wood-alu-92-nature-1.jpg",
        alt: { en: "Wood-Alu 92 Nature window with an oak frame seen from inside" },
      },
      {
        src: "/images/windows/wood-alu-92-nature-2.jpg",
        alt: { en: "The aluminium outer shell of the Wood-Alu 92 Nature window" },
      },
      {
        src: "/images/windows/wood-alu-92-nature-3.jpg",
        alt: { en: "Wood-Alu 92 Nature windows in a timber-framed house" },
      },
    ],
    datasheet: "/pdf/windows/wood-alu-92-nature.pdf",
    related: ["roller-shutter-front-mounted", "insect-screen-pleated", "window-sill-aluminium"],
    featured: true,
    badge: "new",
  },
];
