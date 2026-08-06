/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const gates: Product[] = [
  {
    id: "sectional-garage-40",
    category: "gates",
    name: "Sektional 40",
    tagline: { en: "Sectional garage door, 40 mm insulated panels." },
    description: {
      en: "Foam-filled 40 mm steel sections running under the ceiling, so the full drive-through width stays usable. Supplied as one package: door, radio drive, two hand transmitters and the photocell. Finger-protection profile joints as standard.",
    },
    material: "steel",
    specs: [
      { label: { en: "Panel thickness" }, value: "40", unit: "mm", highlight: true },
      { label: { en: "U value (door)" }, value: "1.0", unit: "W/m²K", highlight: true },
      { label: { en: "Drive" }, value: "Radio, included", highlight: true },
      { label: { en: "Max. size" }, value: "5000 × 3000", unit: "mm" },
      { label: { en: "Safety" }, value: "Photocell + force cut-off" },
      { label: { en: "Surfaces" }, value: "Woodgrain, silk, decor" },
      { label: { en: "Wicket door" }, value: "Optional, flush threshold" }],
    images: [
      {
        src: "/images/gates/sectional-garage-40-1.jpg",
        alt: { en: "Sektional 40 garage door in anthracite on a double garage" },
      },
      {
        src: "/images/gates/sectional-garage-40-2.jpg",
        alt: { en: "Panel joint with finger protection on the Sektional 40" },
      },
      {
        src: "/images/gates/sectional-garage-40-3.jpg",
        alt: { en: "Sektional 40 open under the garage ceiling with the drive rail" },
      }],
    datasheet: "/pdf/gates/sectional-garage-40.pdf",
    related: ["sliding-gate-alu", "fence-horizontal-alu"],
    featured: true,
    badge: "bestseller",
  },
  {
    id: "side-hinged-garage",
    category: "gates",
    name: "Flügeltor Duo",
    tagline: { en: "Side-hinged doors for garages used as workshops." },
    description: {
      en: "Two steel leaves on a galvanised corner frame: open one leaf and walk in, no drive needed and the ceiling stays free for storage. The usual choice when the garage is really a workshop. Asymmetric split available.",
    },
    material: "steel",
    specs: [
      { label: { en: "Leaf build" }, value: "Double-skin steel", highlight: true },
      { label: { en: "Frame" }, value: "Galvanised corner frame", highlight: true },
      { label: { en: "Ceiling" }, value: "Stays free", highlight: true },
      { label: { en: "Max. size" }, value: "3000 × 2500", unit: "mm" },
      { label: { en: "Split" }, value: "50/50 or 1/3–2/3" },
      { label: { en: "Ventilation" }, value: "Grille optional" }],
    images: [
      {
        src: "/images/gates/side-hinged-garage-1.jpg",
        alt: { en: "Flügeltor Duo with one leaf open on a workshop garage" },
      },
      {
        src: "/images/gates/side-hinged-garage-2.jpg",
        alt: { en: "Corner frame and hinge of the Flügeltor Duo" },
      },
      {
        src: "/images/gates/side-hinged-garage-3.jpg",
        alt: { en: "Asymmetric split Flügeltor Duo on an older house" },
      }],
    related: ["swing-gate-alu", "fence-vertical-bar"],
  },
  {
    id: "sliding-gate-alu",
    category: "gates",
    name: "Schiebetor Line",
    tagline: { en: "Cantilever sliding gate, no floor rail." },
    description: {
      en: "A self-supporting aluminium sliding gate that carries its weight on rollers behind the fence line — nothing crosses the driveway, so snow and gravel never block it. Drive with force cut-off, photocell and flashing light included. Infill matches our fence panels.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Construction" }, value: "Cantilever, no floor rail", highlight: true },
      { label: { en: "Max. clear width" }, value: "4500", unit: "mm", highlight: true },
      { label: { en: "Drive" }, value: "230 V, included", highlight: true },
      { label: { en: "Max. size" }, value: "4500 × 1800", unit: "mm" },
      { label: { en: "Safety" }, value: "Photocell + safety edge" },
      { label: { en: "Infill" }, value: "Matches fence panels" },
      { label: { en: "Coating" }, value: "Powder, all RAL" }],
    images: [
      {
        src: "/images/gates/sliding-gate-alu-1.jpg",
        alt: { en: "Schiebetor Line sliding open across a driveway" },
      },
      {
        src: "/images/gates/sliding-gate-alu-2.jpg",
        alt: { en: "Cantilever roller carriage behind the fence line" },
      },
      {
        src: "/images/gates/sliding-gate-alu-3.jpg",
        alt: { en: "Schiebetor Line closed, infill matching the fence" },
      }],
    related: ["fence-horizontal-alu", "pedestrian-gate-alu", "sectional-garage-40"],
    featured: true,
  },
  {
    id: "swing-gate-alu",
    category: "gates",
    name: "Drehtor Classic",
    tagline: { en: "Two-leaf swing gate for shorter driveways." },
    description: {
      en: "A two-leaf aluminium swing gate on adjustable hinges, manual or with twin underground drives. Needs swing room but no run-off space to the side, which decides it on many plots. Same infill panels and colours as the fence range.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Leaves" }, value: "2, adjustable hinges", highlight: true },
      { label: { en: "Max. clear width" }, value: "4000", unit: "mm", highlight: true },
      { label: { en: "Drive" }, value: "Underground, optional", highlight: true },
      { label: { en: "Max. size" }, value: "4000 × 1800", unit: "mm" },
      { label: { en: "Lock" }, value: "Drop bolt + cylinder" },
      { label: { en: "Infill" }, value: "Matches fence panels" }],
    images: [
      {
        src: "/images/gates/swing-gate-alu-1.jpg",
        alt: { en: "Drehtor Classic two-leaf gate at a driveway entrance" },
      },
      {
        src: "/images/gates/swing-gate-alu-2.jpg",
        alt: { en: "Adjustable hinge and drop bolt of the Drehtor Classic" },
      },
      {
        src: "/images/gates/swing-gate-alu-3.jpg",
        alt: { en: "Underground drive box of the Drehtor Classic" },
      }],
    related: ["pedestrian-gate-alu", "fence-vertical-bar"],
  }];
