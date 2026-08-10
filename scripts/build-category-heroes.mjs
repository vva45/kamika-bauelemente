/**
 * Imágenes de cabecera de categoría.
 *
 * Dos casos distintos, y la diferencia importa:
 *
 *  1. YA NO GENERA NADA. El dueño mandó fotografía de las ocho gamas,
 *     así que las ocho están en `OWNER_PHOTOS` y el script las protege:
 *     ejecutarlo por costumbre no destruye ninguna. Se queda aquí
 *     porque el día que entre una gama nueva sin foto, quitarla de esa
 *     lista devuelve su lámina.
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

// 3:2, la misma proporción con la que se enseñan las cabeceras y las
// tarjetas de gama. Así ninguna lámina se recorta: entra entera, igual
// que la fotografía real de puertas de entrada.
const W = 1500;
const H = 1000;

const PALETTE = {
  blue: "#AFC9EF",
  blue50: "#F0F5FC",
  steel: "#2F4C74",
  ink: "#0F1114",
  paper: "#FFFFFF",
  mist: "#E4E9F0",
};

/**
 * Gamas con fotografía real del dueño. NUNCA se sobreescriben: perder
 * su foto por ejecutar un script de láminas sería un destrozo silencioso
 * y sin vuelta atrás si además ya se ha hecho commit.
 *
 * Al recibir una foto nueva, añadir aquí su slug.
 */
const OWNER_PHOTOS = new Set([
  "windows",
  "patio-doors",
  "entrance-doors",
  "roller-shutters",
  "insect-screens",
  "gates",
  "accessories",
]);

const MONO = "Consolas, 'DejaVu Sans Mono', 'Courier New', monospace";

/**
 * Lámina de marca. El dibujo es siempre el mismo hueco de ventana; lo
 * que cambia por gama es el despiece, que es justo lo que distingue a
 * una corredera de una pérgola en un plano.
 *
 * SIN texto de gama a propósito: el sitio está en tres idiomas y un
 * "Patio doors" grabado en el JPG saldría en inglés dentro de la página
 * alemana y de la polaca. El nombre ya lo pone la página —debajo de la
 * tarjeta y en la cabecera—, traducido, así que la lámina solo pone el
 * dibujo. Lo único escrito es la marca, que no se traduce.
 */
const sheet = ({ mullions }) => {
  const frameX = 940;
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

  <text x="100" y="${H - 70}" font-family="${MONO}" font-size="22" letter-spacing="6" fill="${PALETTE.steel}" opacity="0.75">KAMIKA BAUELEMENTE · HECHINGEN</text>
</svg>`);
};

/**
 * Una lámina por gama: solo el despiece, que es lo que distingue un
 * plano de corredera de uno de persiana. Las gamas con foto del dueño
 * siguen listadas para que quitarlas de OWNER_PHOTOS baste para
 * recuperar su lámina.
 */
const SHEETS = {
  "patio-doors": { mullions: [{ axis: "v", at: 0.5 }] },
  windows: { mullions: [{ axis: "v", at: 0.5 }, { axis: "h", at: 0.38 }] },
  "roller-shutters": { mullions: [{ axis: "h", at: 0.18 }, { axis: "h", at: 0.3 }, { axis: "h", at: 0.42 }, { axis: "h", at: 0.54 }, { axis: "h", at: 0.66 }, { axis: "h", at: 0.78 }] },
  "insect-screens": { mullions: [{ axis: "v", at: 0.33 }, { axis: "v", at: 0.66 }] },
  gates: { mullions: [{ axis: "h", at: 0.25 }, { axis: "h", at: 0.5 }, { axis: "h", at: 0.75 }] },
  pergolas: { mullions: [{ axis: "h", at: 0.25 }, { axis: "h", at: 0.45 }, { axis: "h", at: 0.65 }, { axis: "h", at: 0.85 }] },
  accessories: { mullions: [{ axis: "v", at: 0.5 }] },
};

for (const [slug, config] of Object.entries(SHEETS)) {
  if (OWNER_PHOTOS.has(slug)) {
    console.log(`· ${slug}-hero.jpg: foto del dueño, no se toca`);
    continue;
  }
  await sharp(sheet(config)).jpeg({ quality: 90, mozjpeg: true }).toFile(join(OUT, `${slug}-hero.jpg`));
  console.log(`✓ ${slug}-hero.jpg (lámina de marca)`);
}

// ── Puertas de entrada: producto real de los catálogos ───────────────

if (CUTS && existsSync(CUTS) && !OWNER_PHOTOS.has("entrance-doors")) {
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
