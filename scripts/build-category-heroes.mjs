/**
 * Imágenes de cabecera de categoría.
 *
 * Dos casos distintos, y la diferencia importa:
 *
 *  1. `entrance-doors` — hay catálogos reales, así que la cabecera se
 *     compone con los propios productos: se recortan tres puertas de las
 *     páginas del PDF y se montan sobre el azul de marca. Es producto
 *     real, no decoración.
 *
 *  2. El resto de gamas — todavía no hay ni una foto. En vez de dejar el
 *     cartel de "PLACEHOLDER" a la vista del cliente, se dibuja una
 *     lámina de marca: el motivo del hueco de ventana en los colores del
 *     logo, con el nombre de la gama y su dato técnico en mono. No
 *     finge ser una fotografía —no hay foto que confundir— y aguanta
 *     publicada hasta que lleguen las de verdad.
 *
 * Volver a ejecutar tras cambiar un catálogo o una categoría:
 *   node scripts/build-category-heroes.mjs
 */
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "..");
const OUT = join(ROOT, "public/images/categories");
const CUTS = process.env.DOOR_CUTS; // carpeta con los recortes de puerta

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;

const PALETTE = {
  blue: "#AFC9EF",
  blue50: "#F0F5FC",
  steel: "#2F4C74",
  ink: "#0F1114",
  paper: "#FFFFFF",
  mist: "#E4E9F0",
};

const MONO = "Consolas, 'DejaVu Sans Mono', 'Courier New', monospace";
const SANS = "'Segoe UI', Arial, Helvetica, sans-serif";

/**
 * Lámina de marca. El dibujo es siempre el mismo hueco de ventana; lo
 * que cambia por gama es el despiece, que es justo lo que distingue a
 * una persiana de una valla en un plano.
 */
const sheet = ({ label, note, mullions }) => {
  const frameX = 980;
  const frameY = 150;
  const frameW = 480;
  const frameH = 700;
  const inner = 22;

  const lines = mullions
    .map((m) =>
      m.axis === "v"
        ? `<line x1="${frameX + frameW * m.at}" y1="${frameY + inner}" x2="${frameX + frameW * m.at}" y2="${frameY + frameH - inner}" stroke="${PALETTE.steel}" stroke-width="2" opacity="0.5"/>`
        : `<line x1="${frameX + inner}" y1="${frameY + frameH * m.at}" x2="${frameX + frameW - inner}" y2="${frameY + frameH * m.at}" stroke="${PALETTE.steel}" stroke-width="2" opacity="0.5"/>`,
    )
    .join("\n  ");

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PALETTE.blue50}"/>
  <rect x="0" y="0" width="${W * 0.58}" height="${H}" fill="${PALETTE.blue}" opacity="0.35"/>

  <!-- cota horizontal, el adorno que además informa -->
  <line x1="${frameX}" y1="${frameY + frameH + 46}" x2="${frameX + frameW}" y2="${frameY + frameH + 46}" stroke="${PALETTE.steel}" stroke-width="2"/>
  <line x1="${frameX}" y1="${frameY + frameH + 34}" x2="${frameX}" y2="${frameY + frameH + 58}" stroke="${PALETTE.steel}" stroke-width="2"/>
  <line x1="${frameX + frameW}" y1="${frameY + frameH + 34}" x2="${frameX + frameW}" y2="${frameY + frameH + 58}" stroke="${PALETTE.steel}" stroke-width="2"/>

  <rect x="${frameX}" y="${frameY}" width="${frameW}" height="${frameH}" fill="${PALETTE.paper}" stroke="${PALETTE.ink}" stroke-width="4"/>
  <rect x="${frameX + inner}" y="${frameY + inner}" width="${frameW - inner * 2}" height="${frameH - inner * 2}" fill="none" stroke="${PALETTE.blue}" stroke-width="3"/>
  ${lines}

  <text x="96" y="${H / 2 - 40}" font-family="${SANS}" font-size="84" font-weight="600" fill="${PALETTE.ink}">${label}</text>
  <text x="100" y="${H / 2 + 30}" font-family="${MONO}" font-size="26" letter-spacing="5" fill="${PALETTE.steel}">${note}</text>
  <text x="100" y="${H - 70}" font-family="${MONO}" font-size="22" letter-spacing="6" fill="${PALETTE.steel}" opacity="0.75">KAMIKA BAUELEMENTE · HECHINGEN</text>
</svg>`);
};

/** Una lámina por gama, con su despiece y su dato. */
const SHEETS = {
  windows: { label: "Windows", note: "PVC · ALUMINIUM · WOOD-ALU", mullions: [{ axis: "v", at: 0.5 }, { axis: "h", at: 0.38 }] },
  "interior-doors": { label: "Interior doors", note: "CPL · VENEER · LACQUERED", mullions: [{ axis: "h", at: 0.28 }, { axis: "h", at: 0.7 }] },
  "roller-shutters": { label: "Roller shutters", note: "MANUAL · MOTORISED", mullions: [{ axis: "h", at: 0.18 }, { axis: "h", at: 0.3 }, { axis: "h", at: 0.42 }, { axis: "h", at: 0.54 }, { axis: "h", at: 0.66 }, { axis: "h", at: 0.78 }] },
  "insect-screens": { label: "Insect screens", note: "FIXED · HINGED · PLEATED · ROLLER", mullions: [{ axis: "v", at: 0.33 }, { axis: "v", at: 0.66 }] },
  gates: { label: "Gates", note: "SECTIONAL · SLIDING · SWING", mullions: [{ axis: "h", at: 0.25 }, { axis: "h", at: 0.5 }, { axis: "h", at: 0.75 }] },
  fences: { label: "Fences", note: "ALUMINIUM · STEEL", mullions: [{ axis: "v", at: 0.2 }, { axis: "v", at: 0.4 }, { axis: "v", at: 0.6 }, { axis: "v", at: 0.8 }] },
  accessories: { label: "Accessories", note: "HANDLES · CYLINDERS · SILLS · VENTS", mullions: [{ axis: "v", at: 0.5 }] },
};

for (const [slug, config] of Object.entries(SHEETS)) {
  await sharp(sheet(config)).jpeg({ quality: 90, mozjpeg: true }).toFile(join(OUT, `${slug}-hero.jpg`));
  console.log(`✓ ${slug}-hero.jpg (lámina de marca)`);
}

// ── Puertas de entrada: producto real de los catálogos ───────────────

if (CUTS && existsSync(CUTS)) {
  const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PALETTE.blue50}"/>
  <rect x="0" y="${H * 0.62}" width="${W}" height="${H * 0.38}" fill="${PALETTE.blue}" opacity="0.45"/>
  <line x1="0" y1="${H * 0.62}" x2="${W}" y2="${H * 0.62}" stroke="${PALETTE.steel}" stroke-width="2" opacity="0.4"/>
  <text x="70" y="${H - 54}" font-family="${MONO}" font-size="24" letter-spacing="6" fill="${PALETTE.steel}">ENTRANCE DOORS · UD FROM 0,72 W/M²K · UP TO RC 3</text>
</svg>`);

  // Tres puertas alineadas por la base, como en un escaparate. Los
  // recortes llegan ya sin fondo (PNG con alfa), así que se apoyan sobre
  // el azul en vez de traer su propia caja blanca.
  const BASE = 880; // línea de suelo
  const doors = [
    { file: "cut-door-1.png", height: 640, left: 250 },
    { file: "cut-door-2.png", height: 700, left: 700 },
    { file: "cut-door-3.png", height: 600, left: 1140 },
  ];

  const layers = [];
  for (const door of doors) {
    const buf = await sharp(join(CUTS, door.file)).resize({ height: door.height }).toBuffer();
    layers.push({ input: buf, left: door.left, top: BASE - door.height });
  }

  await sharp(background)
    .composite(layers)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(OUT, "entrance-doors-hero.jpg"));
  console.log("✓ entrance-doors-hero.jpg (tres puertas de los catálogos)");
} else {
  console.log("· entrance-doors-hero.jpg: sin recortes de puerta, se deja como está");
}
