/**
 * Auditoría del sitio. Se ejecuta DESPUÉS de `next build`, porque parte
 * del HTML ya generado: así comprueba lo que se publica de verdad, no
 * lo que parece que dice el código.
 *
 * Cinco comprobaciones:
 *  1. Enlaces internos muertos — cada href="/..." del HTML generado
 *     tiene que llevar a una página real o a un fichero de /public.
 *  2. Assets referenciados que no existen. ⚠️ Se quita el ancla
 *     `#page=42` ANTES de mirar el disco, o los enlaces a páginas de
 *     catálogo darían falso positivo siempre.
 *  3. Ids duplicados entre ficheros de datos (productos, catálogos,
 *     proyectos, colores).
 *  4. Textos visibles escritos a pelo en un componente, fuera de la
 *     capa de contenido.
 *  5. Claves de contenido declaradas y nunca usadas.
 *
 * Sale con código 1 si algo falla, para poder colgarlo de CI.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "..");
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");
const BUILD = join(ROOT, ".next", "server", "app");

const problems = [];
const notes = [];

const fail = (check, detail) => problems.push({ check, detail });

const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : [full];
      })
    : [];

const sourceFiles = walk(SRC).filter((file) => /\.(ts|tsx)$/.test(file));

// ── 1. Enlaces internos ──────────────────────────────────────────────

const htmlFiles = walk(BUILD).filter((file) => file.endsWith(".html"));

if (htmlFiles.length === 0) {
  notes.push("No prerendered HTML found — run `npm run build` first to check internal links.");
} else {
  /** Rutas que existen como página prerenderizada. */
  const pages = new Set(
    htmlFiles.map((file) => {
      const path = file.slice(BUILD.length).replace(/\.html$/, "").replace(/\\/g, "/");
      return path === "/index" ? "/" : path;
    }),
  );
  // Páginas servidas bajo demanda: no dejan HTML en el build.
  pages.add("/contact");

  const linked = new Set();

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
      linked.add(match[1]);
    }
  }

  for (const href of [...linked].sort()) {
    const clean = href.length > 1 && href.endsWith("/") ? href.slice(0, -1) : href;
    if (pages.has(clean)) continue;
    // Ficheros servidos desde /public o generados por Next.
    if (existsSync(join(PUBLIC, clean))) continue;
    if (clean.startsWith("/_next") || clean === "/sitemap.xml" || clean === "/robots.txt") continue;
    // Iconos y OG: no viven en public/, los sirve Next desde src/app.
    if (
      clean.startsWith("/icon") ||
      clean.startsWith("/apple-icon") ||
      clean.startsWith("/favicon.ico") ||
      clean.startsWith("/opengraph-image")
    ) {
      continue;
    }
    fail("dead internal link", `${clean} is linked but no page or file answers it`);
  }

  notes.push(`${htmlFiles.length} prerendered pages, ${linked.size} distinct internal links.`);
}

// ── 2. Assets referenciados ──────────────────────────────────────────

const ASSET_REF = /["'`](\/(?:images|pdf|brand)\/[^"'`\s]+?)["'`]/g;
const assetRefs = new Set();

for (const file of sourceFiles) {
  for (const match of readFileSync(file, "utf8").matchAll(ASSET_REF)) {
    const path = match[1];
    if (path.includes("${")) continue; // construida en tiempo de ejecución
    assetRefs.add(path.split("#")[0]); // ⚠️ el ancla, fuera antes de mirar el disco
  }
}

for (const asset of [...assetRefs].sort()) {
  if (!existsSync(join(PUBLIC, asset))) {
    fail("missing asset", `${asset} is referenced in src but does not exist in public/`);
  }
}

notes.push(`${assetRefs.size} asset paths referenced from src.`);

// ── 3. Ids duplicados ────────────────────────────────────────────────

// Los ficheros de producto se importan uno a uno con extensión: Node
// ejecuta TypeScript sin resolver imports sin extensión, y
// products/index.ts los escribe como los escribe TypeScript.
const PRODUCT_MODULES = [
  ["accessories", "accessories"],
  ["entrance-doors", "entranceDoors"],
  ["fences", "fences"],
  ["gates", "gates"],
  ["insect-screens", "insectScreens"],
  ["interior-doors", "interiorDoors"],
  ["patio-doors", "patioDoors"],
  ["roller-shutters", "rollerShutters"],
  ["windows", "windows"],
];

const PRODUCTS = (
  await Promise.all(
    PRODUCT_MODULES.map(async ([file, exported]) => {
      const loaded = await import(`../src/data/products/${file}.ts`);
      return loaded[exported];
    }),
  )
).flat();
const { CATALOGUES } = await import("../src/data/catalogues.ts");
const { MANUFACTURERS } = await import("../src/data/manufacturers.ts");
const { PROJECTS } = await import("../src/data/projects.ts");
const { COLORS } = await import("../src/data/colors.ts");

const checkDuplicates = (label, items) => {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item.id)) fail("duplicate id", `${label}: "${item.id}" appears more than once`);
    seen.add(item.id);
  }
};

checkDuplicates("products", PRODUCTS);
checkDuplicates("catalogues", CATALOGUES);
checkDuplicates("projects", PROJECTS);
checkDuplicates("colours", COLORS);

// Un id de producto no puede chocar con uno de proyecto o de catálogo:
// el encargo dice "slug único en todo el sitio".
const everyId = [
  ...PRODUCTS.map((p) => ["product", p.id]),
  // Los fabricantes comparten segmento de URL con los productos de su
  // categoría: un choque de ids serviría dos páginas bajo una URL.
  ...MANUFACTURERS.map((m) => ["manufacturer", m.id]),
  ...CATALOGUES.map((c) => ["catalogue", c.id]),
  ...PROJECTS.map((p) => ["project", p.id]),
];
const owner = new Map();
for (const [kind, id] of everyId) {
  if (owner.has(id)) fail("duplicate id", `"${id}" is used by both ${owner.get(id)} and ${kind}`);
  owner.set(id, kind);
}

// Referencias cruzadas: related y products de proyecto.
const productIds = new Set(PRODUCTS.map((p) => p.id));
for (const product of PRODUCTS) {
  for (const related of product.related) {
    if (!productIds.has(related)) {
      fail("broken reference", `product "${product.id}" relates to unknown "${related}"`);
    }
  }
}
for (const project of PROJECTS) {
  for (const id of project.products ?? []) {
    if (!productIds.has(id)) {
      fail("broken reference", `project "${project.id}" lists unknown product "${id}"`);
    }
  }
}

// Modelos de catálogo: id único dentro de su catálogo, y su catálogo
// tiene que existir. Los genera un script, así que un fallo aquí
// significa que el extractor se ha equivocado.
const { CATALOGUE_MODELS } = await import("../src/data/catalogue-models.ts");
const modelKeys = new Set();
for (const model of CATALOGUE_MODELS) {
  const key = `${model.catalogue}/${model.id}`;
  if (modelKeys.has(key)) fail("duplicate id", `catalogue model: "${key}" appears more than once`);
  modelKeys.add(key);
}

const catalogueIds = new Set(CATALOGUES.map((c) => c.id));

for (const model of CATALOGUE_MODELS) {
  if (!catalogueIds.has(model.catalogue)) {
    fail("broken reference", `catalogue model "${model.id}" belongs to unknown catalogue "${model.catalogue}"`);
  }
}
for (const product of PRODUCTS) {
  if (product.catalogue && !catalogueIds.has(product.catalogue.id)) {
    fail("broken reference", `product "${product.id}" points at unknown catalogue "${product.catalogue.id}"`);
  }
}

notes.push(
  `${PRODUCTS.length} products, ${CATALOGUES.length} catalogues, ${CATALOGUE_MODELS.length} catalogue models, ${PROJECTS.length} projects, ${COLORS.length} finishes.`,
);

// ── 4. Texto visible escrito a pelo ──────────────────────────────────

/**
 * Heurística: texto entre etiquetas con dos o más palabras latinas y sin
 * llaves. No pretende ser un parser de JSX; pretende que no se cuele un
 * párrafo escrito directamente en un componente.
 */
const TEXT_NODE = />\s*([A-Za-z][A-Za-z,'’.\-]*(?:\s+[A-Za-z][A-Za-z,'’.\-]*)+)\s*</g;

const TEXT_EXEMPT = [
  join(SRC, "content"), // la capa de contenido, precisamente
  join(SRC, "app", "opengraph-image.tsx"), // no renderiza HTML de la web
];

for (const file of sourceFiles) {
  if (TEXT_EXEMPT.some((exempt) => file.startsWith(exempt))) continue;

  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    // Los comentarios están en español a propósito: no son interfaz.
    const trimmed = line.trim();
    if (trimmed.startsWith("*") || trimmed.startsWith("//") || trimmed.startsWith("{/*")) return;

    for (const match of line.matchAll(TEXT_NODE)) {
      fail(
        "hardcoded text",
        `${file.slice(ROOT.length + 1)}:${index + 1} → "${match[1]}" is not going through the content layer`,
      );
    }
  });
}

// ── 5. Claves de contenido sin usar ──────────────────────────────────

const { en } = await import("../src/content/en.ts");
const allSource = sourceFiles
  .filter((file) => !file.startsWith(join(SRC, "content")))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

const unused = Object.keys(en).filter((key) => !allSource.includes(`"${key}"`));
if (unused.length > 0) {
  notes.push(`${unused.length} content key(s) declared but never used: ${unused.join(", ")}`);
}

// ── Informe ──────────────────────────────────────────────────────────

console.log("\nKamika site audit\n─────────────────");
for (const note of notes) console.log(`· ${note}`);

if (problems.length === 0) {
  console.log("\n✓ No problems found.\n");
  process.exit(0);
}

const grouped = new Map();
for (const { check, detail } of problems) {
  if (!grouped.has(check)) grouped.set(check, []);
  grouped.get(check).push(detail);
}

for (const [check, details] of grouped) {
  console.error(`\n✗ ${check} (${details.length})`);
  for (const detail of details) console.error(`    ${detail}`);
}

console.error(`\n${problems.length} problem(s).\n`);
process.exit(1);
