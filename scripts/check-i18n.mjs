/**
 * Verifica que `en.ts`, `de.ts` y `pl.ts` tengan EXACTAMENTE las mismas
 * claves.
 *
 * Falla (exit 1) si hay claves de más o de menos, o si el inglés (el
 * idioma de autoría) tiene valores vacíos. No falla porque una
 * traducción esté incompleta: eso se informa como progreso.
 */
import { en } from "../src/content/en.ts";
import { de } from "../src/content/de.ts";
import { pl } from "../src/content/pl.ts";

const enKeys = Object.keys(en);
let failed = false;

const emptyEn = enKeys.filter((k) => en[k].trim() === "");
if (emptyEn.length > 0) {
  failed = true;
  console.error(`\n✗ ${emptyEn.length} key(s) with an empty value in en.ts:`);
  for (const k of emptyEn) console.error(`    ${k}`);
}

for (const [code, dict] of [["de", de], ["pl", pl]]) {
  const keys = Object.keys(dict);
  const missing = enKeys.filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !enKeys.includes(k));
  if (missing.length > 0) {
    failed = true;
    console.error(`\n✗ ${missing.length} key(s) missing in ${code}.ts:`);
    for (const k of missing) console.error(`    ${k}`);
  }
  if (extra.length > 0) {
    failed = true;
    console.error(`\n✗ ${extra.length} key(s) in ${code}.ts that do not exist in en.ts:`);
    for (const k of extra) console.error(`    ${k}`);
  }
}

if (failed) {
  console.error("\n  Run `npm run sync:i18n` to regenerate the translations from en.ts.\n");
  process.exit(1);
}

console.log(`✓ i18n keys in parity — ${enKeys.length} keys.`);
for (const [code, dict] of [["de", de], ["pl", pl]]) {
  const translated = enKeys.filter((k) => dict[k].trim() !== "").length;
  const pct = Math.round((translated / enKeys.length) * 100);
  console.log(`  ${code.toUpperCase()} translation progress: ${translated}/${enKeys.length} (${pct}%).`);
}
