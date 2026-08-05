/**
 * Genera los assets que todavía no existen, en sus rutas exactas y
 * definitivas, para que sustituirlos por los reales sea copiar y pegar.
 *
 * Cómo funciona:
 *  1. Rastrea `src/` buscando rutas a /images, /pdf y /brand.
 *  2. Le quita el ancla `#page=N` (si no, `catalogo.pdf#page=42` se
 *     buscaría como fichero y siempre daría falso positivo).
 *  3. Crea solo los que faltan. Nunca pisa un fichero real.
 *
 * Las imágenes salen en la paleta de marca, con la silueta del marco de
 * ventana y el nombre del fichero encima. Los PDF son PDF de verdad,
 * con el número de página impreso, para poder probar los enlaces
 * `#page=N` contra el visor del navegador.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "..");
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

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

// ── 1. Recolectar rutas de assets referenciadas en el código ──────────

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const ASSET_REF = /["'`](\/(?:images|pdf|brand)\/[^"'`\s]+?)["'`]/g;

const collectReferences = () => {
  const refs = new Set();

  for (const file of walk(SRC)) {
    if (!/\.(ts|tsx)$/.test(file)) continue;
    const text = readFileSync(file, "utf8");

    for (const match of text.matchAll(ASSET_REF)) {
      const path = match[1];
      // Rutas construidas con plantillas (`/pdf/${id}.pdf`) no se pueden
      // resolver estáticamente: se ignoran.
      if (path.includes("${")) continue;
      // ⚠️ El ancla se quita ANTES de comprobar si el fichero existe.
      refs.add(path.split("#")[0]);
    }
  }

  return [...refs].sort();
};

/** Assets que el proyecto exige aunque todavía no los referencie nadie. */
const ALWAYS = ["/brand/kamika-logo.png"];

// ── 2. Plantillas ────────────────────────────────────────────────────

/** Tamaño según el tipo de imagen, deducido de la ruta. */
const dimensionsFor = (path) => {
  if (path.includes("/catalogues/")) return { width: 900, height: 1273 }; // portada A4
  if (path.includes("/about/")) return { width: 1000, height: 1250 };
  if (path.includes("/home/")) return { width: 2400, height: 1500 };
  if (path.includes("/categories/")) return { width: 1600, height: 1000 };
  return { width: 1600, height: 1200 };
};

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Imagen de relleno: marco de ventana + nombre del fichero. */
const imageSvg = (label, { width, height }) => {
  const margin = Math.round(Math.min(width, height) * 0.08);
  const innerMargin = margin + Math.round(Math.min(width, height) * 0.018);
  const frameW = width - margin * 2;
  const frameH = height - margin * 2;
  const midX = width / 2;
  const midY = height / 2;
  const titleSize = Math.max(15, Math.round(width * 0.026));
  const noteSize = Math.max(11, Math.round(width * 0.015));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${PALETTE.blue50}"/>
  <rect x="${margin}" y="${margin}" width="${frameW}" height="${frameH}" fill="${PALETTE.paper}" stroke="${PALETTE.steel}" stroke-width="${Math.max(2, Math.round(width * 0.002))}"/>
  <rect x="${innerMargin}" y="${innerMargin}" width="${width - innerMargin * 2}" height="${height - innerMargin * 2}" fill="none" stroke="${PALETTE.blue}" stroke-width="${Math.max(1, Math.round(width * 0.0013))}"/>
  <line x1="${midX}" y1="${innerMargin}" x2="${midX}" y2="${height - innerMargin}" stroke="${PALETTE.blue}" stroke-width="${Math.max(1, Math.round(width * 0.0013))}"/>
  <line x1="${innerMargin}" y1="${Math.round(height * 0.38)}" x2="${width - innerMargin}" y2="${Math.round(height * 0.38)}" stroke="${PALETTE.blue}" stroke-width="${Math.max(1, Math.round(width * 0.0013))}"/>
  <rect x="${midX - Math.round(width * 0.34)}" y="${midY - Math.round(titleSize * 1.5)}" width="${Math.round(width * 0.68)}" height="${Math.round(titleSize * 3.1)}" fill="${PALETTE.blue50}"/>
  <text x="${midX}" y="${midY + Math.round(titleSize * 0.15)}" text-anchor="middle" font-family="${MONO}" font-size="${titleSize}" fill="${PALETTE.ink}">${escapeXml(label)}</text>
  <text x="${midX}" y="${midY + Math.round(titleSize * 1.5)}" text-anchor="middle" font-family="${SANS}" font-size="${noteSize}" fill="${PALETTE.steel}">PLACEHOLDER — replace with the real photograph</text>
  <text x="${margin}" y="${height - Math.round(margin * 0.35)}" font-family="${MONO}" font-size="${noteSize}" fill="${PALETTE.steel}">${width} × ${height} px</text>
  <text x="${width - margin}" y="${height - Math.round(margin * 0.35)}" text-anchor="end" font-family="${MONO}" font-size="${noteSize}" fill="${PALETTE.steel}">KAMIKA BAUELEMENTE</text>
</svg>`;
};

// ── 3. PDF mínimo pero válido, con varias páginas ────────────────────

const pdfEscape = (value) => value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const pageStream = (title, subtitle, pageLabel) =>
  [
    // Banda azul superior, para que se reconozca de un vistazo.
    `0.686 0.788 0.937 rg`,
    `0 782 595 60 re f`,
    `0.184 0.298 0.455 rg`,
    `BT /F1 20 Tf 56 802 Td (${pdfEscape(title)}) Tj ET`,
    `0.059 0.067 0.078 rg`,
    `BT /F1 13 Tf 56 720 Td (${pdfEscape(subtitle)}) Tj ET`,
    `BT /F1 11 Tf 56 698 Td (PLACEHOLDER - replace with the real PDF.) Tj ET`,
    `BT /F1 46 Tf 56 430 Td (${pdfEscape(pageLabel)}) Tj ET`,
    `0.184 0.298 0.455 RG 1 w`,
    `56 400 m 539 400 l S`,
  ].join("\n");

const buildPdf = (title, subtitle, pageCount) => {
  const objects = [];
  const fontId = 3 + pageCount * 2;

  const kids = Array.from({ length: pageCount }, (_, i) => `${3 + i * 2} 0 R`).join(" ");
  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[2] = `<< /Type /Pages /Kids [${kids}] /Count ${pageCount} >>`;

  for (let i = 0; i < pageCount; i += 1) {
    const pageId = 3 + i * 2;
    const contentId = pageId + 1;
    const stream = pageStream(title, subtitle, `PAGE ${i + 1} / ${pageCount}`);
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] ` +
      `/Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] =
      `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`;
  }

  objects[fontId] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [];

  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = Buffer.byteLength(pdf, "latin1");
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefStart = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
};

// ── 4. Generación ────────────────────────────────────────────────────

const created = [];
const skipped = [];

const ensureDir = (file) => mkdirSync(dirname(file), { recursive: true });

const generate = async (assetPath) => {
  const target = join(PUBLIC, assetPath);

  if (existsSync(target)) {
    skipped.push(assetPath);
    return;
  }

  ensureDir(target);
  const ext = extname(assetPath).toLowerCase();
  const label = assetPath.replace(/^\/(images|pdf|brand)\//, "");

  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    const size = dimensionsFor(assetPath);
    const svg = Buffer.from(imageSvg(label, size));
    const pipeline = sharp(svg);
    const output =
      ext === ".png" ? pipeline.png({ compressionLevel: 9 }) : pipeline.jpeg({ quality: 82 });
    await output.toFile(target);
    created.push(assetPath);
    return;
  }

  if (ext === ".pdf") {
    // Los catálogos se enlazan por página (`#page=N`): se generan con
    // margen de sobra para que cualquier ancla exista de verdad.
    const isCatalogue = assetPath.includes("/catalogues/");
    const pageCount = isCatalogue ? 60 : 4;
    writeFileSync(target, buildPdf("KAMIKA BAUELEMENTE", label, pageCount));
    created.push(assetPath);
    return;
  }

  skipped.push(`${assetPath} (unsupported extension, not generated)`);
};

const references = [...new Set([...collectReferences(), ...ALWAYS])].sort();

for (const reference of references) {
  await generate(reference);
}

console.log(`Scanned ${relative(ROOT, SRC)} — ${references.length} asset reference(s).`);
console.log(`✓ created ${created.length}`);
for (const path of created) console.log(`    + ${path}`);
if (skipped.length > 0) console.log(`· already present: ${skipped.length}`);
