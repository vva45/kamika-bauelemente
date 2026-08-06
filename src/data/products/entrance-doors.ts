/**
 * PUERTAS DE ENTRADA — DATOS REALES, sacados de los catálogos.
 *
 * A diferencia del resto de categorías, estos cuatro modelos no son
 * inventados: nombre, acabado, herraje, medidas y valores Ud están
 * copiados de los catálogos que hay en `public/pdf/catalogues`, y cada
 * ficha enlaza a su página exacta con `catalogue: { id, page }`. El
 * botón "Technical data sheet" abre esa página, no un PDF genérico.
 *
 * Un modelo por catálogo, el más representativo de cada uno:
 *   - ROKA Signature → Edles Flüssigmetall, la familia más exclusiva.
 *   - ROKA Select    → la serie de cerámica, con el mejor Ud del catálogo.
 *   - Despiro        → MasterLine 8 Pivot, la puerta pivotante.
 *   - Paneles        → Paneel 01, el panel base en PVC, aluminio y madera.
 *
 * ⚠️ Las páginas son las del PDF, no las impresas (los catálogos van
 * desfasados un par de páginas). Si se sustituye un catálogo hay que
 * volver a comprobarlas.
 *
 * Lo que NO está en los catálogos no se escribe: ROKA no publica
 * Bautiefe ni Ud de la colección Signature, así que esa ficha no los
 * declara. Antes un hueco que un número inventado.
 */
import type { Product } from "../types";

export const entranceDoors: Product[] = [
  {
    id: "roka-signature-liquid-metal",
    category: "entrance-doors",
    name: "ROKA Signature — Edles Flüssigmetall No. 01",
    tagline: { en: "Liquid-metal surface, hand-finished, one door at a time." },
    description: {
      en: "The top of the ROKA Signature collection: a door leaf finished in liquid metal, so the surface is applied by hand and no two doors come out identical. This one is Rustic Steel with the round Sol pull handle set into the fluting. Built on the ROKA R-CORE system, with hinges rated for a 180 kg leaf and multi-point locking up to RC 3.",
      de: "Die Spitze der Kollektion ROKA Signature: ein Türblatt in edlem Flüssigmetall.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Surface", de: "Oberfläche" }, value: "Rustic Steel", highlight: true },
      { label: { en: "Pull handle", de: "Stoßgriff" }, value: "Sol", highlight: true },
      { label: { en: "Burglary resistance", de: "Sicherheit" }, value: "RC 3", highlight: true },
      { label: { en: "System", de: "System" }, value: "ROKA R-CORE" },
      { label: { en: "Max leaf weight", de: "Türblattgewicht" }, value: "180", unit: "kg" },
      {
        label: { en: "Locking", de: "Verriegelung" },
        value: "RS 1772, 5-point (to 2400 mm) · RS 1773, 7-point (to 4000 mm)",
      },
      { label: { en: "Hinges", de: "Türbänder" }, value: "Concealed, roller or pivot" },
      { label: { en: "Threshold", de: "Schwelle" }, value: "RS 01–RS 06, thermally broken" },
      { label: { en: "Motor lock", de: "Motorschloss" }, value: "Instinct by MACO (optional)" }],
    images: [
      {
        src: "/images/entrance-doors/roka-signature-liquid-metal-1.jpg",
        alt: {
          en: "ROKA Signature entrance door in Rustic Steel liquid metal with the round Sol handle",
        },
      },
      {
        src: "/images/entrance-doors/roka-signature-liquid-metal-2.jpg",
        alt: { en: "Close-up of the backlit round Sol pull handle on the fluted liquid-metal surface" },
        caption: { en: "The Sol handle is recessed into the fluting and lit from behind." },
      },
      {
        src: "/images/entrance-doors/roka-signature-liquid-metal-3.jpg",
        alt: { en: "Full view of the Edles Flüssigmetall No. 01 door leaf" },
      }],
    catalogue: { id: "roka-signature-2025", page: 178 },
    related: ["roka-select-20", "security-cylinder", "handle-lockable"],
    featured: true,
    badge: "new",
  },
  {
    id: "roka-select-20",
    category: "entrance-doors",
    name: "ROKA Select 20",
    tagline: { en: "Ceramic surface, Ud 0.72 W/m²K — the warmest of the range." },
    description: {
      en: "A ceramic-faced door in Oxide Nero with 8 mm applications in RAL 9005 let into the outer face. At Ud 0.72 W/m²K it is the best insulating value in the Select catalogue. The leaf is flush inside and outside on the ROKA Exclusive profile, with a 3 mm aluminium plate outside and 2 mm inside covering the sash on both faces.",
      de: "Haustür mit Keramikoberfläche Oxide Nero, Ud 0,72 W/m²K.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Ud value", de: "U-Wert" }, value: "0.72", unit: "W/m²K", highlight: true },
      { label: { en: "Surface", de: "Oberfläche" }, value: "Ceramic — Oxide Nero", highlight: true },
      { label: { en: "Pull handle", de: "Stoßgriff" }, value: "ES 130.1600", highlight: true },
      { label: { en: "Applications", de: "Applikationen" }, value: "8 mm, RAL 9005, U-form, outside" },
      { label: { en: "Profile", de: "Profilsystem" }, value: "ROKA Exclusive (Wicona)" },
      { label: { en: "Aluminium facing", de: "Aluminium Füllung" }, value: "3 mm outside / 2 mm inside" },
      { label: { en: "Sealing", de: "Abdichtung" }, value: "Multi-point gasket system" },
      { label: { en: "Threshold", de: "Bodenschwelle" }, value: "Aluminium, thermally broken" }],
    images: [
      {
        src: "/images/entrance-doors/roka-select-20-1.jpg",
        alt: { en: "ROKA Select 20 entrance door with an Oxide Nero ceramic face" },
      },
      {
        src: "/images/entrance-doors/roka-select-20-2.jpg",
        alt: { en: "Catalogue specification of the ROKA Select 20, showing the Ud value" },
        caption: { en: "The specification as printed in the Select catalogue." },
      },
      {
        src: "/images/entrance-doors/roka-select-20-3.jpg",
        alt: { en: "A ceramic Select door fitted in a house entrance" },
        caption: { en: "The ceramic surface fitted — example from the Select catalogue." },
      }],
    catalogue: { id: "roka-select-2025", page: 18 },
    related: ["roka-signature-liquid-metal", "entrance-panel-01", "security-cylinder"],
    featured: true,
  },
  {
    id: "despiro-masterline-8-pivot",
    category: "entrance-doors",
    name: "Despiro MasterLine 8 Pivot",
    tagline: { en: "Floor-to-ceiling pivot door, up to 1400 × 2600 mm." },
    description: {
      en: "An aluminium pivot door: the axis sits 301 mm off centre as standard and up to 600 mm depending on leaf width, so the door swings both inwards and outwards. The frame threshold is let into the floor, which is what makes a leaf this size read as part of the wall. Supplied with selected Despiro panels and an optional flush pull handle in stainless steel or black.",
      de: "Aluminium-Pivottür mit versetzter Drehachse.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Max panel size", de: "Maximale Paneelgröße" }, value: "1400 × 2600", unit: "mm", highlight: true },
      { label: { en: "Pivot offset", de: "Drehachse" }, value: "301 mm standard, 600 mm max", highlight: true },
      { label: { en: "Opening", de: "Öffnung" }, value: "Inwards and outwards", highlight: true },
      { label: { en: "Min panel size", de: "Minimale Paneelgröße" }, value: "500 × 1900", unit: "mm" },
      { label: { en: "Locking", de: "Verriegelung" }, value: "Multi-point" },
      { label: { en: "Threshold", de: "Schwelle" }, value: "Frame profile, floor-recessed" },
      { label: { en: "Handle", de: "Griff" }, value: "Flush pull, stainless or black (optional)" },
      {
        label: { en: "Panels", de: "Paneele" },
        value: "DP4, DP5, DP10, DP11, DP16, DP22, DP23, DP25, DP35",
      }],
    images: [
      {
        src: "/images/entrance-doors/despiro-masterline-8-pivot-1.jpg",
        alt: { en: "MasterLine 8 Pivot aluminium door shown open on its offset axis" },
      },
      {
        src: "/images/entrance-doors/despiro-masterline-8-pivot-2.jpg",
        alt: { en: "Catalogue page for the MasterLine 8 Pivot with its features labelled" },
      },
      {
        src: "/images/entrance-doors/despiro-masterline-8-pivot-3.jpg",
        alt: { en: "Despiro DP01 panel, one of the panels available for the pivot door" },
        caption: { en: "The pivot door takes selected Despiro panels — DP01 shown." },
      }],
    catalogue: { id: "despiro-entrance-doors", page: 31 },
    related: ["roka-signature-liquid-metal", "entrance-panel-01", "sliding-gate-alu"],
  },
  {
    id: "entrance-panel-01",
    category: "entrance-doors",
    name: "Paneel 01",
    tagline: { en: "The base panel — in PVC, aluminium or timber." },
    description: {
      en: "A vertical glazed panel available with or without the surface application, and the only model here that can be built in all three materials. The glazing strip is 170 mm wide plain and 210 mm with the application; the sizes below are the manufacturing limits, and the final panel is cut to the measured opening.",
      de: "Basispaneel, in PVC, Aluminium oder Holz.",
    },
    specs: [
      { label: { en: "Max size, aluminium", de: "Maximale Panelgröße ALU" }, value: "1100 × 2450", unit: "mm", highlight: true },
      { label: { en: "Materials", de: "Materialien" }, value: "PVC · Aluminium · Wood", highlight: true },
      { label: { en: "Versions", de: "Ausführungen" }, value: "With or without application", highlight: true },
      { label: { en: "Min size, all materials", de: "Minimale Panelgröße" }, value: "370 × 1650", unit: "mm" },
      { label: { en: "Max size, PVC", de: "Maximale Panelgröße PVC" }, value: "900 × 2150", unit: "mm" },
      { label: { en: "Max size, wood", de: "Maximale Panelgröße Holz" }, value: "840 × 2240", unit: "mm" },
      { label: { en: "Glazing strip", de: "Verglasung" }, value: "170 mm plain · 210 mm with application" },
      { label: { en: "Glazing height", de: "Verglasungshöhe" }, value: "1420 mm plain · 1470 mm with application" }],
    images: [
      {
        src: "/images/entrance-doors/entrance-panel-01-1.jpg",
        alt: { en: "Paneel 01 shown with and without the surface application" },
      },
      {
        src: "/images/entrance-doors/entrance-panel-01-2.jpg",
        alt: { en: "Technical drawing of Paneel 01 with the glazing dimensions" },
        caption: { en: "Glazing strip: 170 mm plain, 210 mm with the application." },
      },
      {
        src: "/images/entrance-doors/entrance-panel-01-3.jpg",
        alt: { en: "Catalogue page for Paneel 01 with the manufacturing sizes" },
      }],
    catalogue: { id: "entrance-door-panels", page: 1 },
    related: ["despiro-masterline-8-pivot", "roka-select-20", "handle-lockable"],
  }];
