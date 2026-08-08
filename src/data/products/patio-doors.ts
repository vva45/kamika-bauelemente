/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Los dos tipos —elevable-corredera (HST) y oscilo-corredera (PSK)— son
 * los que existen de verdad en el sector y los que montan los sistemas
 * de perfil que ya vende Kamika. Los NOMBRES y los VALORES de aquí son
 * un ejemplo, no el catálogo del proveedor: en cuanto llegue el
 * catálogo de Terrassentüren se sustituyen igual que se hizo con
 * puertas de entrada y persianas, y esta gama pasa sola a enseñar
 * colecciones.
 *
 * Mientras tanto la gama existe, se puede enseñar y se puede pedir
 * presupuesto por ella, que era lo que faltaba: el dueño la pidió como
 * gama propia ("patio doors / terrace doors" — el mismo producto con
 * sus dos nombres).
 *
 * LAS FOTOS son las dos únicas reales de la gama: la que mandó el
 * dueño, entera para la corredera elevable —que es justo lo que la foto
 * retrata— y un encuadre más cerrado del mismo paño para la
 * oscilo-corredera. Una foto buena que ilustra la gama vale más que
 * tres carteles de "placeholder", pero el pie lo dice: ilustra el tipo,
 * no es una foto de ese modelo concreto.
 *
 * Ver CONTENT.md.
 */
import type { Product } from "../types";

export const patioDoors: Product[] = [
  {
    id: "lift-slide-hst",
    category: "patio-doors",
    name: "Lift-and-slide HST",
    tagline: { en: "Wide openings with a flush threshold." },
    description: {
      en: "The large-format patio door: the sash lifts off its seals and slides sideways, so panels of two metres and more still move with one hand. Fitted with a low threshold where the floor build-up allows it, which is what makes a terrace read as one continuous room.",
    },
    material: "pvc",
    specs: [
      { label: { en: "Opening type" }, value: "Lift-and-slide", highlight: true },
      { label: { en: "Frame depth" }, value: "82", unit: "mm", highlight: true },
      { label: { en: "Threshold" }, value: "Low, 20 mm", highlight: true },
      { label: { en: "Max sash width" }, value: "up to 3000", unit: "mm" },
      { label: { en: "Max sash weight" }, value: "up to 300", unit: "kg" },
      { label: { en: "Glazing" }, value: "Double or triple" },
      { label: { en: "Locking" }, value: "Multi-point, lockable handle" },
    ],
    images: [
      {
        src: "/images/patio-doors/lift-slide-hst-1.jpg",
        alt: { en: "Large sliding patio door onto a terrace, seen from outside at sunset" },
        caption: { en: "Illustrative of the range — not a photograph of this exact model." },
      },
    ],
    related: ["roller-shutter-front-mounted", "insect-screen-pleated"],
  },
  {
    id: "tilt-slide-psk",
    category: "patio-doors",
    name: "Tilt-and-slide PSK",
    tagline: { en: "Tilts to ventilate, slides to walk through." },
    description: {
      en: "The compact answer where an HST is too much door: the sash tilts at the top for ventilation and slides in front of the fixed pane to open. It needs less structural depth than a lift-and-slide, which makes it the usual choice for balconies and renovations.",
    },
    material: "pvc",
    specs: [
      { label: { en: "Opening type" }, value: "Tilt-and-slide", highlight: true },
      { label: { en: "Frame depth" }, value: "70", unit: "mm", highlight: true },
      { label: { en: "Max sash width" }, value: "up to 1600", unit: "mm", highlight: true },
      { label: { en: "Max sash weight" }, value: "up to 160", unit: "kg" },
      { label: { en: "Glazing" }, value: "Double or triple" },
      { label: { en: "Ventilation" }, value: "Tilt position" },
    ],
    images: [
      {
        src: "/images/patio-doors/tilt-slide-psk-1.jpg",
        alt: { en: "Sliding door sash and handle, with the living room behind it" },
        caption: { en: "Illustrative of the range — not a photograph of this exact model." },
      },
    ],
    related: ["roller-shutter-concealed", "insect-screen-pleated"],
  },
];
