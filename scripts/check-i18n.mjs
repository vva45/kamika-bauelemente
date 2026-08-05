/**
 * Verifica que `src/content/en.ts` y `src/content/de.ts` tengan
 * EXACTAMENTE las mismas claves.
 *
 * Falla (exit 1) si hay claves de más o de menos. No falla porque el
 * alemán esté vacío: eso es lo esperado hasta la fase de traducción,
 * y se informa aparte como progreso.
 */
import { en } from "../src/content/en.ts";
import { de } from "../src/content/de.ts";

const enKeys = Object.keys(en);
const deKeys = Object.keys(de);

const missingInDe = enKeys.filter((k) => !deKeys.includes(k));
const extraInDe = deKeys.filter((k) => !enKeys.includes(k));

const emptyEn = enKeys.filter((k) => en[k].trim() === "");
const translated = deKeys.filter((k) => de[k].trim() !== "").length;

let failed = false;

if (missingInDe.length > 0) {
  failed = true;
  console.error(`\n✗ ${missingInDe.length} key(s) missing in de.ts:`);
  for (const k of missingInDe) console.error(`    ${k}`);
}

if (extraInDe.length > 0) {
  failed = true;
  console.error(`\n✗ ${extraInDe.length} key(s) in de.ts that do not exist in en.ts:`);
  for (const k of extraInDe) console.error(`    ${k}`);
}

if (emptyEn.length > 0) {
  failed = true;
  console.error(`\n✗ ${emptyEn.length} key(s) with an empty value in en.ts:`);
  for (const k of emptyEn) console.error(`    ${k}`);
}

if (failed) {
  console.error("\n  Run `npm run sync:i18n` to regenerate de.ts from en.ts.\n");
  process.exit(1);
}

const pct = enKeys.length === 0 ? 0 : Math.round((translated / enKeys.length) * 100);
console.log(`✓ i18n keys in parity — ${enKeys.length} keys.`);
console.log(`  DE translation progress: ${translated}/${enKeys.length} (${pct}%).`);
