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
        alt: { en: "Lift-and-slide patio door open onto a terrace" },
      },
      {
        src: "/images/patio-doors/lift-slide-hst-2.jpg",
        alt: { en: "Low threshold detail of the lift-and-slide door" },
      },
      {
        src: "/images/patio-doors/lift-slide-hst-3.jpg",
        alt: { en: "Handle and locking detail of the lift-and-slide door" },
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
        alt: { en: "Tilt-and-slide balcony door in a living room" },
      },
      {
        src: "/images/patio-doors/tilt-slide-psk-2.jpg",
        alt: { en: "The tilt-and-slide door in its tilt position" },
      },
      {
        src: "/images/patio-doors/tilt-slide-psk-3.jpg",
        alt: { en: "Running gear detail of the tilt-and-slide door" },
      },
    ],
    related: ["roller-shutter-concealed", "insect-screen-pleated"],
  },
];
