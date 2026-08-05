/**
 * Regenera `src/content/de.ts` a partir de `src/content/en.ts`.
 *
 * - Mantiene el mismo orden y los mismos comentarios de sección.
 * - Conserva las traducciones alemanas que ya existan.
 * - Las claves sin traducir quedan como '' con un `// TODO: DE`.
 *
 * Así, añadir texto nuevo es tocar solo `en.ts` y ejecutar este script.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const EN_PATH = resolve(here, "../src/content/en.ts");
const DE_PATH = resolve(here, "../src/content/de.ts");

const { en } = await import("../src/content/en.ts");

// Traducciones ya hechas, para no perderlas al regenerar.
const existing = existsSync(DE_PATH) ? (await import("../src/content/de.ts")).de : {};

const HEADER = `/**
 * Traducción alemana. Generado por \`npm run sync:i18n\` desde \`en.ts\`.
 *
 * Mismas claves que \`en.ts\`, en el mismo orden. Rellena los valores y
 * borra el \`// TODO: DE\` de la línea. Cuando esté completo, cambia
 * LOCALE a 'de' en \`src/lib/i18n.ts\` y el sitio pasa a alemán.
 *
 * No edites la estructura a mano: vuelve a ejecutar el script.
 */
import type { ContentKey } from "./en";

export const de: Record<ContentKey, string> = {
`;

const escape = (value) => value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

// Recorre el fuente de en.ts para copiar los comentarios de sección y el
// orden real de las claves. Las líneas de continuación de un string largo
// no casan con el patrón `"clave":` y por eso se ignoran solas.
const lines = readFileSync(EN_PATH, "utf8").split(/\r?\n/);
const KEY_LINE = /^\s*"([^"]+)":/;
const SECTION_LINE = /^\s*\/\/\s?(.*)$/;

const out = [];
const seen = new Set();
let insideObject = false;

for (const line of lines) {
  if (!insideObject) {
    if (line.includes("export const en = {")) insideObject = true;
    continue;
  }
  if (line.startsWith("}")) break;

  const keyMatch = KEY_LINE.exec(line);
  if (keyMatch) {
    const key = keyMatch[1];
    seen.add(key);
    const value = typeof existing[key] === "string" ? existing[key] : "";
    const todo = value === "" ? " // TODO: DE" : "";
    out.push(`  "${key}": "${escape(value)}",${todo}`);
    continue;
  }

  const sectionMatch = SECTION_LINE.exec(line);
  if (sectionMatch) {
    out.push(out.length === 0 ? `  // ${sectionMatch[1]}` : `\n  // ${sectionMatch[1]}`);
  }
}

// Red de seguridad: si el parser se dejó una clave, avisa en vez de perderla.
const missed = Object.keys(en).filter((key) => !seen.has(key));
if (missed.length > 0) {
  console.error(`✗ sync:i18n could not place ${missed.length} key(s): ${missed.join(", ")}`);
  process.exit(1);
}

writeFileSync(DE_PATH, `${HEADER}${out.join("\n")}\n};\n`, "utf8");

const translated = Object.keys(en).filter((key) => (existing[key] ?? "") !== "").length;
console.log(`✓ de.ts regenerated — ${seen.size} keys, ${translated} already translated.`);
