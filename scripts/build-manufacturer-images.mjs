/**
 * Imágenes de fabricante y de sistema.
 *
 * Sin catálogo del fabricante todavía no hay ni una foto de producto,
 * así que se dibujan láminas en la paleta Kamika:
 *
 *  - La del fabricante lleva su nombre en grande. Tipografía neutra a
 *    propósito: NO se reproduce el logotipo registrado de Aluplast. Si
 *    el dueño consigue el logo oficial con permiso de uso, basta con
 *    sustituir `public/images/manufacturers/aluplast.jpg` — misma ruta,
 *    mismo nombre, cero código.
 *
 *  - Los sistemas CON ficha usan el render real de su PDF y no pasan
 *    por aquí. Los que aún no la tienen llevan una lámina con el
 *    nombre y "details follow" — sin corte de perfil, porque dibujar
 *    cámaras sin confirmar sería inventar specs con un dibujo.
 *
 * Ejecutar:  node scripts/build-manufacturer-images.mjs
 */
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "..");
const OUT = join(ROOT, "public/images/manufacturers");

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const PALETTE = {
  blue: "#AFC9EF",
  blue50: "#F0F5FC",
  steel: "#2F4C74",
  ink: "#0F1114",
  paper: "#FFFFFF",
};

const MONO = "Consolas, 'DejaVu Sans Mono', 'Courier New', monospace";
const SANS = "'Segoe UI', Arial, Helvetica, sans-serif";

const W = 1600;
const H = 1000;

// ── Lámina del fabricante ────────────────────────────────────────────

const manufacturerSheet = (name, note) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PALETTE.paper}"/>
  <rect x="0" y="0" width="${W}" height="${H * 0.62}" fill="${PALETTE.blue50}"/>
  <line x1="0" y1="${H * 0.62}" x2="${W}" y2="${H * 0.62}" stroke="${PALETTE.blue}" stroke-width="2"/>
  <text x="${W / 2}" y="${H * 0.42}" text-anchor="middle" font-family="${SANS}" font-size="150" font-weight="700" fill="${PALETTE.ink}">${name}</text>
  <text x="${W / 2}" y="${H * 0.55}" text-anchor="middle" font-family="${MONO}" font-size="30" letter-spacing="10" fill="${PALETTE.steel}">${note}</text>
  <text x="${W / 2}" y="${H - 80}" text-anchor="middle" font-family="${MONO}" font-size="22" letter-spacing="6" fill="${PALETTE.steel}" opacity="0.75">SUPPLIED AND FITTED BY KAMIKA BAUELEMENTE</text>
</svg>`);

// ── Lámina de sistema: corte de perfil con sus cámaras ───────────────

/**
 * Dibuja el corte esquemático de un perfil: un rectángulo de marco con
 * `chambers` cámaras y la cota de la Bautiefe debajo. Es un esquema,
 * no un plano del fabricante — pero enseña exactamente lo que distingue
 * a un sistema del siguiente.
 */
const systemSheet = (name, note, chambers, depthLabel) => {
  const px = 560; // origen del corte
  const py = 200;
  const pw = 480;
  const ph = 460;
  const gap = 14;
  const chamberW = (pw - gap * (chambers + 1)) / chambers;

  let cells = "";
  for (let i = 0; i < chambers; i++) {
    cells += `<rect x="${px + gap + i * (chamberW + gap)}" y="${py + gap}" width="${chamberW}" height="${ph - gap * 2}" fill="${PALETTE.blue50}" stroke="${PALETTE.steel}" stroke-width="2"/>`;
  }

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PALETTE.paper}"/>
  <rect x="0" y="0" width="${W}" height="120" fill="${PALETTE.blue50}"/>

  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="${PALETTE.blue}" opacity="0.5" stroke="${PALETTE.ink}" stroke-width="4"/>
  ${cells}

  <!-- cota de la Bautiefe -->
  <line x1="${px}" y1="${py + ph + 50}" x2="${px + pw}" y2="${py + ph + 50}" stroke="${PALETTE.steel}" stroke-width="2"/>
  <line x1="${px}" y1="${py + ph + 38}" x2="${px}" y2="${py + ph + 62}" stroke="${PALETTE.steel}" stroke-width="2"/>
  <line x1="${px + pw}" y1="${py + ph + 38}" x2="${px + pw}" y2="${py + ph + 62}" stroke="${PALETTE.steel}" stroke-width="2"/>
  <text x="${px + pw / 2}" y="${py + ph + 92}" text-anchor="middle" font-family="${MONO}" font-size="26" letter-spacing="4" fill="${PALETTE.steel}">${depthLabel}</text>

  <text x="${W / 2}" y="78" text-anchor="middle" font-family="${SANS}" font-size="52" font-weight="600" fill="${PALETTE.ink}">${name}</text>
  <text x="${W / 2}" y="${H - 70}" text-anchor="middle" font-family="${MONO}" font-size="24" letter-spacing="6" fill="${PALETTE.steel}">${note}</text>
</svg>`);
};

/**
 * Fabricantes: una lámina por marca. Los sistemas CON ficha del
 * proveedor ya no se dibujan — usan el render real extraído de su PDF
 * (aluplast-ideal-5000/8000, salamander-bluevolution-82). Aquí solo se
 * dibuja lo que aún no tiene ficha.
 */
const MAKERS = [
  // "Aluplast" con mayúscula: la marca se escribe en minúscula en
  // su propio logotipo, pero aquí es texto de la web, no su logo.
  { file: "aluplast", name: "Aluplast", note: "PVC WINDOW SYSTEMS" },
  { file: "salamander", name: "Salamander", note: "PVC WINDOW SYSTEMS" },
  { file: "veka", name: "VEKA", note: "PVC WINDOW SYSTEMS" },
  { file: "rehau", name: "REHAU", note: "PVC WINDOW SYSTEMS" },
];

for (const maker of MAKERS) {
  await sharp(manufacturerSheet(maker.name, maker.note))
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(OUT, `${maker.file}.jpg`));
  console.log(`✓ ${maker.file}.jpg`);
}

/**
 * Sistemas todavía sin ficha del fabricante. Lámina con el nombre y un
 * aviso, SIN corte de perfil: dibujar cámaras que nadie ha confirmado
 * sería inventar specs con un dibujo.
 */
const PENDING_SYSTEMS = [
  { file: "veka-82", name: "VEKA 82" },
  { file: "rehau-synego", name: "Synego" },
];

for (const system of PENDING_SYSTEMS) {
  await sharp(manufacturerSheet(system.name, "DETAILS FOLLOW · ASK US TODAY"))
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(OUT, `${system.file}.jpg`));
  console.log(`✓ ${system.file}.jpg`);
}
