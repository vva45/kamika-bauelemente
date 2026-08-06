/**
 * Portadas de colección.
 *
 * Dos de los cuatro PDF que mandó el proveedor no traen portada: son
 * extractos que empiezan directamente en la primera página de modelos.
 * Puestos en el expositor junto a las portadas reales de ROKA, se ven
 * como una hoja de medidas, que es justo lo que son.
 *
 * Así que a esos dos se les compone una portada con lo suyo: dos
 * modelos de la propia colección sobre papel Kamika, con el nombre de
 * la colección puesto en la tipografía de la casa. No se imita el
 * diseño del proveedor ni se le pone marca a quien no la trae — es una
 * lámina nuestra hecha con sus modelos.
 *
 * Si algún día llega el PDF completo con su portada de verdad, se
 * vuelve a renderizar la página 1 y este script deja de hacer falta
 * para ese catálogo: la ruta del fichero es la misma.
 *
 * Ejecutar:  node scripts/build-collection-covers.mjs
 */
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "..");

const PALETTE = {
  blue: "#AFC9EF",
  blue50: "#F0F5FC",
  steel: "#2F4C74",
  ink: "#0F1114",
  paper: "#FFFFFF",
};

const MONO = "Consolas, 'DejaVu Sans Mono', 'Courier New', monospace";
const SANS = "'Segoe UI', Arial, Helvetica, sans-serif";

// 3:4, la proporción con la que se enseña la tarjeta de colección.
const W = 900;
const H = 1200;

/** Las colecciones sin portada propia, y los dos modelos que la ilustran. */
const COVERS = [
  {
    id: "despiro-entrance-doors",
    brand: "Despiro",
    collection: "Entrance doors",
    models: [
      "public/images/models/despiro-entrance-doors/despiro-dp01.jpg",
      "public/images/models/despiro-entrance-doors/despiro-dp02.jpg",
    ],
  },
  {
    id: "entrance-door-panels",
    // Sin marca: el catálogo no dice de quién es (ver catalogues.ts).
    brand: null,
    collection: "Door panels",
    models: [
      "public/images/models/entrance-door-panels/panel-01.jpg",
      "public/images/models/entrance-door-panels/panel-02.jpg",
    ],
  },
];

const plate = ({ brand, collection }) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PALETTE.paper}"/>
  <rect x="0" y="0" width="${W}" height="${H * 0.26}" fill="${PALETTE.blue50}"/>
  <line x1="0" y1="${H * 0.26}" x2="${W}" y2="${H * 0.26}" stroke="${PALETTE.blue}" stroke-width="2"/>

  ${
    brand
      ? `<text x="70" y="150" font-family="${MONO}" font-size="24" letter-spacing="10" fill="${PALETTE.steel}">${brand.toUpperCase()}</text>`
      : `<text x="70" y="150" font-family="${MONO}" font-size="24" letter-spacing="10" fill="${PALETTE.steel}">COLLECTION</text>`
  }
  <text x="70" y="248" font-family="${SANS}" font-size="76" font-weight="700" fill="${PALETTE.ink}">${collection}</text>

  <!-- Pie: de quién es el expositor, no de quién es la puerta. -->
  <line x1="70" y1="${H - 120}" x2="${W - 70}" y2="${H - 120}" stroke="${PALETTE.blue}" stroke-width="2"/>
  <text x="70" y="${H - 70}" font-family="${MONO}" font-size="20" letter-spacing="6" fill="${PALETTE.steel}">KAMIKA BAUELEMENTE</text>
</svg>`);

const build = async (cover) => {
  const out = join(ROOT, `public/images/catalogues/${cover.id}-cover.jpg`);

  // Los dos modelos, uno al lado del otro sobre el papel. `contain`
  // sobre blanco porque son recortes con fondo blanco: recortarlos por
  // los lados se comería el canto de la hoja.
  const margin = 50;
  const gap = 30;
  const slotW = Math.round((W - margin * 2 - gap) / 2);
  const bandBottom = Math.round(H * 0.26);
  const slotH = H - bandBottom - 200; // deja aire para el pie

  const doors = [];
  for (const [index, file] of cover.models.entries()) {
    const path = join(ROOT, file);
    if (!existsSync(path)) throw new Error(`falta el modelo ${file}`);
    const fitted = await sharp(path)
      .resize(slotW, slotH, { fit: "inside", withoutEnlargement: false })
      .toBuffer();
    const { height = slotH } = await sharp(fitted).metadata();
    doors.push({
      input: fitted,
      left: margin + index * (slotW + gap),
      // Centrados en el espacio que queda entre la banda y el pie.
      top: bandBottom + Math.round((slotH - height) / 2) + 40,
    });
  }

  await sharp(plate(cover)).composite(doors).jpeg({ quality: 88 }).toFile(out);
  console.log(`· ${cover.id}-cover.jpg`);
};

console.log("Portadas de colección");
for (const cover of COVERS) await build(cover);
console.log("Listo.");
