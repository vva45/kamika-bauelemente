/**
 * Rasteriza los assets de marca que tienen que ser binarios, a partir
 * de `src/app/icon.svg`. Editar el SVG y volver a ejecutar.
 *
 *  - `src/app/apple-icon.png` (180×180, lo pide iOS).
 *  - `src/app/favicon.ico` (16/32/48). Next referencia `icon.svg` desde
 *    el <head>, así que en una página HTML el SVG basta; pero un
 *    navegador que abre /robots.txt o /sitemap.xml —y algún rastreador
 *    y algún lector de feeds— pide /favicon.ico a pelo y se llevaba un
 *    404. Se sirve solo por estar en src/app.
 *
 * ⚠️ `public/brand/kamika-logo.png` es el fichero ORIGINAL del dueño y
 * este script no lo toca nunca. La reconstrucción vectorial vive en
 * `public/brand/kamika-wordmark.svg` y no se rasteriza encima del real.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "..");

const jobs = [
  {
    from: join(ROOT, "src/app/icon.svg"),
    to: join(ROOT, "src/app/apple-icon.png"),
    width: 180,
    height: 180,
  },
];

for (const job of jobs) {
  await sharp(readFileSync(job.from))
    .resize(job.width, job.height, { fit: "contain", background: "#AFC9EF" })
    .png({ compressionLevel: 9 })
    .toFile(job.to);
  console.log(`✓ ${job.to.replace(ROOT, ".")} (${job.width}×${job.height})`);
}

/**
 * ICO escrito a mano: sharp no exporta este formato, pero un .ico no es
 * más que una cabecera de directorio y, desde Windows Vista, PNG dentro
 * de cada entrada. Tres tamaños: 16 para la pestaña, 32 para la barra
 * de tareas, 48 para los accesos directos.
 */
const SIZES = [16, 32, 48];
const svg = readFileSync(join(ROOT, "src/app/icon.svg"));

const pngs = await Promise.all(
  SIZES.map((size) =>
    sharp(svg).resize(size, size, { fit: "contain", background: "#AFC9EF" }).png({ compressionLevel: 9 }).toBuffer(),
  ),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reservado
header.writeUInt16LE(1, 2); // 1 = icono
header.writeUInt16LE(SIZES.length, 4);

let offset = 6 + SIZES.length * 16;
const entries = pngs.map((png, index) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(SIZES[index] === 256 ? 0 : SIZES[index], 0); // ancho
  entry.writeUInt8(SIZES[index] === 256 ? 0 : SIZES[index], 1); // alto
  entry.writeUInt8(0, 2); // colores de paleta: 0 = sin paleta
  entry.writeUInt8(0, 3); // reservado
  entry.writeUInt16LE(1, 4); // planos
  entry.writeUInt16LE(32, 6); // bits por píxel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});

const ico = join(ROOT, "src/app/favicon.ico");
writeFileSync(ico, Buffer.concat([header, ...entries, ...pngs]));
console.log(`✓ ${ico.replace(ROOT, ".")} (${SIZES.join("/")})`);
