/**
 * Rasteriza los assets de marca que tienen que ser binarios.
 *
 * Hoy solo genera `src/app/apple-icon.png` (180×180, lo pide iOS) a
 * partir de `src/app/icon.svg`. Editar el SVG y volver a ejecutar.
 *
 * ⚠️ `public/brand/kamika-logo.png` es el fichero ORIGINAL del dueño y
 * este script no lo toca nunca. La reconstrucción vectorial vive en
 * `public/brand/kamika-wordmark.svg` y no se rasteriza encima del real.
 */
import { readFileSync } from "node:fs";
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
