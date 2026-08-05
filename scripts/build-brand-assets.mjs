/**
 * Rasteriza los assets de marca que tienen que ser binarios:
 *  - `src/app/apple-icon.png`      (180×180, lo pide iOS)
 *  - `public/brand/kamika-logo.png` (wordmark sobre el azul del logo)
 *
 * Las fuentes vectoriales son `src/app/icon.svg` y
 * `public/brand/kamika-wordmark.svg`: editar allí y volver a ejecutar.
 *
 * El logo generado es un PROVISIONAL. Cuando el dueño entregue el logo
 * original, se sustituye el PNG y se rehace el SVG a curvas.
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
  {
    from: join(ROOT, "public/brand/kamika-wordmark.svg"),
    to: join(ROOT, "public/brand/kamika-logo.png"),
    width: 960,
    height: 320,
  },
];

for (const job of jobs) {
  await sharp(readFileSync(job.from))
    .resize(job.width, job.height, { fit: "contain", background: "#AFC9EF" })
    .png({ compressionLevel: 9 })
    .toFile(job.to);
  console.log(`✓ ${job.to.replace(ROOT, ".")} (${job.width}×${job.height})`);
}
