/**
 * Nombres de MUESTRAS de color y de vidrio de los catálogos, en los tres
 * idiomas.
 *
 * `catalogue-colors.ts` y `catalogue-glass.ts` los generan los
 * extractores con el nombre impreso copiado a de/en/pl por igual. Los
 * nombres propios de decor (Golden Oak, Winchester, Ossido Nero, los
 * ~120 polvos de ROKA) están bien así y se listan en KEEP para que la
 * auditoría sepa que son deliberados. Los descriptivos —"Eiche dunkel",
 * "Klarglas", "Złoty Dąb", "Antisol Grau"— se traducen aquí.
 *
 * `localizeSwatch()` aplica el diccionario a una muestra cuyo nombre es
 * idéntico en los tres idiomas; una muestra ya traducida no se toca.
 */
import type { Localized } from "@/lib/i18n";
import { n, t, type ModelText } from "./helpers.ts";

const KEEP = [
  // ROKA Signature: polvos, cerámicas, metales líquidos, maderas
  "Pure Snow", "Alpine Snow", "Ivory Silk", "Urban style", "Bristie Grey", "Nordic Moss",
  "Emerald Depths", "Royal Horizon", "Crocodile Sheen", "Horn brass", "Earthen Ember",
  "Desert Caramel", "Terracota", "Aged Cuprum", "Aged Textured Bronze", "Golden Champagne",
  "Champagne Glow", "Whispering Dawn", "Terra Twilight", "Savannah Ember", "Sediment Taupe",
  "Ancient Sediment", "Sable Heritage", "Slate Brown", "Argent Silver", "Deep Graphite",
  "Classic Bronze", "Marrone", "Obsidian Bronze", "Golden Auburn", "Rich Chestnut",
  "Autumn Espresso", "Deep Deore", "Navy Nightfall", "Starry Mica", "Timeless Umber",
  "Timeless Grey", "Charcoal Matte", "RAL 7016 Deep Matte", "Iron Glimmer Grey", "Aged Walnut",
  "Deep Midnight", "Blue Mountain", "Brazen Elox", "Silver Rose", "White Champagner",
  "Charming Copper", "Gold Sensation", "Nude Gleam", "Frosted Mirage", "Silver Lake",
  "Blue Steel", "Amethyst Mist", "Nocturne Purple", "Deep Black mat", "Rustic Bronze",
  "Rustic Steel", "Brompton Black Bronze", "Coral Copper", "Blackened Bronze", "Antique Bronze",
  "Antique Silver Nickel", "Antique Copper Smooth", "Antique Windy Copper", "Windy Black Bronze",
  "Antique Windy Nickel Silver", "Antique Windy Bronze", "Ossido Nero", "Ossido Bruno",
  "Oxide Nero", "Oxide Moro", "Sophia Cuprum", "Iron Corten", "Danish Smoke", "White Gold",
  "Hawaiian Red", "Stone Noir", "Travertino Silver Rain", "Travertino Silver Bocciardato",
  "Travertino Noce Rain", "Travertino Noce Bocciardato", "Travertino Bianco Rain",
  "Travertino Bianco Bocciardato", "Travertino Beige Rain", "Travertino Beige Bocciardato",
  "Naturali Nero", "Naturali Noir Desire", "Diamond Cristallo Macchia", "Tundra",
  "Heritage Emerand", "Heritage Aqua", "Umbra Marron", "Atalaia Super Blanco", "Gemini Acero",
  "Gemini Cenere", "Gemini Cielo", "Gemini Grano", "Gemini Luce", "Gemini Muschio",
  "Gemini Pelle", "Terrazzo Karo", "Bordeaux Twilight", "Savanna Glow", "Pyrenean Velvet",
  "Tuscan Enigma", "Celtic Whisper", "Java Gold", "Appalachian Crown", "Congo Midnight",
  "Andalusian Chestnut", "Andalusian Sun", "Obsidian Veil", "Bavarian Ember", "Fenland Shadow",
  "Sumatran Gleam", "Surrey Glow", "Kyoto Blossom", "Borneo Dawn", "Saxon Heritage",
  "Baltic Willow", "Venetian Timber", "Alpine Frost", "Tuscan Mist", "Scandinavian Grove",
  // ROKA Select
  "Earth FS", "Pietra Di Savoia Griga Bocciardato", "Country Oak", "Harmony Oak", "Dark Oak",
  "Elegant Old Oak",
  // Decors de lámina (Renolit, Hornschuch…) y códigos de fabricante
  "AP 95 Winchester", "AP 19 Turner Oak Malt", "Turner Oak", "Turner oak", "Winchester",
  "Golden Oak", "Crown Platinum", "Oregon", "Jet Black CC+", "Macore", "Sheffield Oak Light F",
  "White sand Ulti-Matt PX", "Aludec umbra grey", "Deep bronze", "Turner oak amber",
  "Turner oak toffee", "Turner oak walnut", "Umbra", "Siena PR", "Dorato", "Corten",
  "Woodec Dąb Turner", "Woodec Dąb Toffee", "Sheffield Oak Light", "White sand Ulti-Matt",
  // Vidrios con nombre de fabricante
  "Abstracto", "Delta", "Atlantic", "Satinato", "Ornament Chinchilla", "Ornament Delta",
  "Ornament Silvit", "Ornament Cathedral", "Ornament Master Carre", "Float 4, 6, 8, 10 mm",
  "Black Line", "Mirastar", "Parsol bronze", "Stopsol Supersilver Clear", "Stopsol Classic Clear",
  "Planibel Dark Grey", "Master-Point", "Master-Ligne", "Master-Carre", "Waterdrop",
  "Monumental M", "EkoVitre 01", "EkoVitre 02", "EkoVitre 03", "EkoVitre 04", "EkoVitre 05",
  "EkoVitre 06", "EkoVitre 07", "EkoVitre 08", "EkoVitre 09", "EkoVitre 10", "EkoVitre 11",
  "EkoVitre 12", "EkoVitre 13", "EkoVitre 14", "EkoVitre 15",
];

const TRANSLATED: Record<string, ModelText> = {
  // ---- ROKA Signature: acabados de tirador (impresos en alemán)
  "Super-Nickel, hochglänzend": t("Super-Nickel, hochglänzend", "Super nickel, high gloss", "Super nikiel, wysoki połysk"),
  "Super-Kupfer, seidenmatt": t("Super-Kupfer, seidenmatt", "Super copper, satin matt", "Super miedź, satynowy mat"),
  "Hell patinierte Bronze": t("Hell patinierte Bronze", "Light patinated bronze", "Brąz jasno patynowany"),
  "Super-Bronze, seidenmatt": t("Super-Bronze, seidenmatt", "Super bronze, satin matt", "Super brąz, satynowy mat"),
  "Dunkel patinierte Bronze": t("Dunkel patinierte Bronze", "Dark patinated bronze", "Brąz ciemno patynowany"),
  "Super-Anthrazit, seidenmatt": t("Super-Anthrazit, seidenmatt", "Super anthracite, satin matt", "Super antracyt, satynowy mat"),
  "Super-Edelstahl, seidenmatt": t("Super-Edelstahl, seidenmatt", "Super stainless steel, satin matt", "Super stal nierdzewna, satynowy mat"),
  "Mattschwarz": t("Mattschwarz", "Matt black", "Czarny mat"),
  "Reinaluminium": t("Reinaluminium", "Pure aluminium", "Czyste aluminium"),
  "Nickel poliert": t("Nickel poliert", "Polished nickel", "Nikiel polerowany"),
  "Antik Nickel": t("Antik Nickel", "Antique nickel", "Nikiel antyczny"),
  "Antik Messing leicht poliert": t("Antik Messing leicht poliert", "Antique brass, lightly polished", "Mosiądz antyczny lekko polerowany"),
  "Dunkel Antik Bronze": t("Dunkel Antik Bronze", "Dark antique bronze", "Ciemny brąz antyczny"),
  "Messing poliert": t("Messing poliert", "Polished brass", "Mosiądz polerowany"),

  // ---- Außentüren: lasuras de madera
  "Weiß (deckend)": t("Weiß (deckend)", "White (opaque)", "Biały (kryjący)"),
  "Eiche Natur": t("Eiche Natur", "Natural oak", "Dąb naturalny"),
  "Mahagoni": t("Mahagoni", "Mahogany", "Mahoń"),
  "Eiche dunkel": t("Eiche dunkel", "Dark oak", "Dąb ciemny"),
  "Eiche Dunkel": t("Eiche Dunkel", "Dark oak", "Dąb ciemny"),
  "Nussbaum": t("Nussbaum", "Walnut", "Orzech"),
  "Schwarzbraun": t("Schwarzbraun", "Black-brown", "Czarnobrązowy"),
  "Farblos": t("Farblos", "Colourless", "Bezbarwny"),

  // ---- Garagentore
  "AP 61 sandgrau": t("AP 61 sandgrau", "AP 61 sand grey", "AP 61 szary piaskowy"),
  "AP 27 Nussbaum": t("AP 27 Nussbaum", "AP 27 walnut", "AP 27 orzech"),
  "7016 anthrazit - glatt": t("7016 anthrazit – glatt", "7016 anthracite – smooth", "7016 antracyt – gładki"),
  "7016 Anthrazit - Deep Mat": t("7016 Anthrazit – Deep Mat", "7016 anthracite – Deep Mat", "7016 antracyt – Deep Mat"),
  "7016 Anthrazit - Woodgrain": t("7016 Anthrazit – Woodgrain", "7016 anthracite – Woodgrain", "7016 antracyt – Woodgrain"),
  "9005 schwarz - glatt": t("9005 schwarz – glatt", "9005 black – smooth", "9005 czarny – gładki"),
  "7039 sandgrau - Struktur": t("7039 sandgrau – Struktur", "7039 sand grey – textured", "7039 szary piaskowy – struktura"),
  "7039 sandgrau - Deep Mat": t("7039 sandgrau – Deep Mat", "7039 sand grey – Deep Mat", "7039 szary piaskowy – Deep Mat"),
  "9016 weiß Woodgrain": t("9016 weiß Woodgrain", "9016 white Woodgrain", "9016 biały Woodgrain"),
  "AP 44 weiß strukturell": t("AP 44 weiß strukturell", "AP 44 white textured", "AP 44 biały strukturalny"),

  // ---- Rollladen Drutex: lamas
  "Silber": t("Silber", "Silver", "Srebrny"),
  "Schwarz": t("Schwarz", "Black", "Czarny"),
  "Weiß": t("Weiß", "White", "Biały"),
  "Anthrazit": t("Anthrazit", "Anthracite", "Antracyt"),
  "Grau": t("Grau", "Grey", "Szary"),
  "Elfenbein": t("Elfenbein", "Ivory", "Kość słoniowa"),
  "Beige": t("Beige", "Beige", "Beżowy"),
  "Dunkelbraun": t("Dunkelbraun", "Dark brown", "Ciemnobrązowy"),
  "Basaltgrau RAL 7012": t("Basaltgrau RAL 7012", "Basalt grey RAL 7012", "Szary bazaltowy RAL 7012"),
  "Grau Aluminium": t("Grau Aluminium", "Grey aluminium", "Szare aluminium"),
  "Braun": t("Braun", "Brown", "Brązowy"),
  "Quarzgrau RAL 7039": t("Quarzgrau RAL 7039", "Quartz grey RAL 7039", "Szary kwarcowy RAL 7039"),

  // ---- IGLO Terrassen: láminas PVC
  "Betongrau": t("Betongrau", "Concrete grey", "Szary betonowy"),
  "Basaltgrau": t("Basaltgrau", "Basalt grey", "Szary bazaltowy"),
  "Basaltgrau glatt": t("Basaltgrau glatt", "Basalt grey, smooth", "Szary bazaltowy gładki"),
  "Cremeweiss": t("Cremeweiß", "Cream white", "Kremowobiały"),
  "Quarzgrau": t("Quarzgrau", "Quartz grey", "Szary kwarcowy"),
  "Quarzgrau glatt": t("Quarzgrau glatt", "Quartz grey, smooth", "Szary kwarcowy gładki"),
  "Dunkelrot": t("Dunkelrot", "Dark red", "Ciemnoczerwony"),
  "Lichtgrau": t("Lichtgrau", "Light grey", "Jasnoszary"),
  "Anthrazit Ulti-Matt": t("Anthrazit Ulti-Matt", "Anthracite Ulti-Matt", "Antracyt Ulti-Matt"),
  "Schiefergrau": t("Schiefergrau", "Slate grey", "Szary łupkowy"),
  "Schiefergrau glatt": t("Schiefergrau glatt", "Slate grey, smooth", "Szary łupkowy gładki"),
  "Schwarz Ulti-Matt": t("Schwarz Ulti-Matt", "Black Ulti-Matt", "Czarny Ulti-Matt"),
  "Dunkelgrün": t("Dunkelgrün", "Dark green", "Ciemnozielony"),
  "Moosgrün": t("Moosgrün", "Moss green", "Zielony mchowy"),
  "Weiß FX": t("Weiß FX", "White FX", "Biały FX"),
  "Anthrazitgrau": t("Anthrazitgrau", "Anthracite grey", "Szary antracytowy"),
  "Streifen Douglasie": t("Streifen Douglasie", "Douglas fir, striped", "Daglezja pasiasta"),
  "Diamantblau": t("Diamantblau", "Diamond blue", "Brylantowo-niebieski"),
  "Stahlblau": t("Stahlblau", "Steel blue", "Stalowoniebieski"),

  // ---- Carta estándar (colors.ts): lasuras y láminas IGLO
  "Teak": t("Teak", "Teak", "Tek"),
  "Anthrazit glatt": t("Anthrazit glatt", "Anthracite, smooth", "Antracyt gładki"),
  "Pyrit": t("Pyrit", "Pyrite", "Piryt"),
  "Schokobraun": t("Schokobraun", "Chocolate brown", "Czekoladowy brąz"),

  // ---- WIKĘD: la carta viene en polaco
  "Biały": t("Weiß", "White", "Biały"),
  "Złoty Dąb": t("Golden Oak", "Golden Oak", "Złoty Dąb"),
  "Czarny": t("Schwarz", "Black", "Czarny"),
  "Orzech": t("Nussbaum", "Walnut", "Orzech"),
  "Ciemno-Szary": t("Dunkelgrau", "Dark grey", "Ciemno-Szary"),
  "Dąb Bagienny": t("Mooreiche", "Bog oak", "Dąb Bagienny"),
  "Łupkowo-Szary": t("Schiefergrau", "Slate grey", "Łupkowo-Szary"),
  "Antracyt Struktura": t("Anthrazit Struktur", "Anthracite, textured", "Antracyt Struktura"),
  "Kwarcowo-Szary": t("Quarzgrau", "Quartz grey", "Kwarcowo-Szary"),
  "Bazaltowo-Szary": t("Basaltgrau", "Basalt grey", "Bazaltowo-Szary"),
  "Srebrno-Szary": t("Silbergrau", "Silver grey", "Srebrno-Szary"),
  "Sosna Górska": t("Bergkiefer", "Mountain pine", "Sosna Górska"),
  "Bordowy": t("Bordeaux", "Burgundy", "Bordowy"),
  "Antracytowy Ultramatowy": t("Anthrazit ultramatt", "Anthracite, ultra-matt", "Antracytowy Ultramatowy"),
  "Daglezja": t("Douglasie", "Douglas fir", "Daglezja"),
  "Ciemnozielony": t("Dunkelgrün", "Dark green", "Ciemnozielony"),
  "Platynowo-Szary Ultramatowy": t("Platingrau ultramatt", "Platinum grey, ultra-matt", "Platynowo-Szary Ultramatowy"),
  "Zielony": t("Grün", "Green", "Zielony"),
  "Umbra Ultramatowy": t("Umbra ultramatt", "Umbra, ultra-matt", "Umbra Ultramatowy"),
  "Brylantowo-Niebieski": t("Brillantblau", "Brilliant blue", "Brylantowo-Niebieski"),
  "Grafitowo-Czarny Ultramatowy": t("Graphitschwarz ultramatt", "Graphite black, ultra-matt", "Grafitowo-Czarny Ultramatowy"),
  "Granatowy": t("Dunkelblau", "Navy blue", "Granatowy"),
  "Mlecznobiały Ultramatowy": t("Milchweiß ultramatt", "Milky white, ultra-matt", "Mlecznobiały Ultramatowy"),
  "Dąb Klejony Miodowy Super Matowy": t("Leimholz-Eiche Honig supermatt", "Glued honey oak, super matt", "Dąb Klejony Miodowy Super Matowy"),
  "VEKA Biały Ultramatowy": t("VEKA Weiß ultramatt", "VEKA white, ultra-matt", "VEKA Biały Ultramatowy"),
  "Czarny Mat": t("Schwarz matt", "Black matt", "Czarny Mat"),
  "Dąb Klejony Pieprzowy Super Matowy": t("Leimholz-Eiche Pfeffer supermatt", "Glued pepper oak, super matt", "Dąb Klejony Pieprzowy Super Matowy"),
  "Kremowo-Biały": t("Cremeweiß", "Cream white", "Kremowo-Biały"),
  "Ciemno-Zielony Ultramatowy": t("Dunkelgrün ultramatt", "Dark green, ultra-matt", "Ciemno-Zielony Ultramatowy"),
  "Dąb Bielony": t("Eiche gekalkt", "Whitewashed oak", "Dąb Bielony"),
  "Biały Okleina": t("Weiß Folie", "White foil", "Biały Okleina"),
  "Sepia Brąz Ultramatowy": t("Sepiabraun ultramatt", "Sepia brown, ultra-matt", "Sepia Brąz Ultramatowy"),
  "Czereśnia": t("Kirsche", "Cherry", "Czereśnia"),
  "Dąb Antyczny": t("Eiche antik", "Antique oak", "Dąb Antyczny"),
  "Stary Dąb": t("Alteiche", "Old oak", "Stary Dąb"),
  "Biały Dab": t("Eiche weiß", "White oak", "Biały Dąb"),
  "Sosna": t("Kiefer", "Pine", "Sosna"),
  "Mahoń": t("Mahagoni", "Mahogany", "Mahoń"),
  "Dąb Turner's Coriander": t("Turner Oak Coriander", "Turner Oak Coriander", "Dąb Turner's Coriander"),
  "Palisander": t("Palisander", "Rosewood", "Palisander"),

  // ---- Vidrios
  "Kathedral": t("Kathedral", "Cathedral", "Katedralne"),
  "Altdeutsh": t("Altdeutsch", "Altdeutsch", "Altdeutsch"),
  "Delta Mat": t("Delta matt", "Delta matt", "Delta mat"),
  "Antisol Grau": t("Antisol Grau", "Antisol grey", "Antisol szary"),
  "Antisol Braun": t("Antisol Braun", "Antisol brown", "Antisol brązowy"),
  "Antisol Grün": t("Antisol Grün", "Antisol green", "Antisol zielony"),
  "Antisol Blau": t("Antisol Blau", "Antisol blue", "Antisol niebieski"),
  "Parsol Dunkel Grau Venus": t("Parsol Dunkelgrau Venus", "Parsol dark grey Venus", "Parsol ciemnoszary Venus"),
  "Parsol Grau": t("Parsol Grau", "Parsol grey", "Parsol szary"),
  "Stopsol Grau": t("Stopsol Grau", "Stopsol grey", "Stopsol szary"),
  "Stopsol Braun": t("Stopsol Braun", "Stopsol brown", "Stopsol brązowy"),
  "Stopsol classic Grau": t("Stopsol Classic Grau", "Stopsol Classic grey", "Stopsol Classic szary"),
  "Spiegelglas": t("Spiegelglas", "Mirror glass", "Szkło lustrzane"),
  "Spiegelglas Grau": t("Spiegelglas Grau", "Mirror glass, grey", "Szkło lustrzane szare"),
  "Spiegelglas Braun": t("Spiegelglas Braun", "Mirror glass, brown", "Szkło lustrzane brązowe"),
  "Klarglas": t("Klarglas", "Clear glass", "Szkło przezroczyste"),
  "Fluted Glas": t("Riffelglas", "Fluted glass", "Szkło ryflowane"),
  "Visiosun Glas": t("Visiosun-Glas", "Visiosun glass", "Szkło Visiosun"),
  "Sandstrahlglas": t("Sandstrahlglas", "Sandblasted glass", "Szkło piaskowane"),
  "Matte Folie": t("Matte Folie", "Matt film", "Folia matowa"),
  "Gestreiftes sandgestrahltes Glas": t("Gestreiftes sandgestrahltes Glas", "Striped sandblasted glass", "Szkło piaskowane w paski"),
  "Reflektofloat braun 6 mm": t("Reflektofloat braun 6 mm", "Reflektofloat brown 6 mm", "Reflektofloat brązowy 6 mm"),
  "Reflektofloat blau 6 mm": t("Reflektofloat blau 6 mm", "Reflektofloat blue 6 mm", "Reflektofloat niebieski 6 mm"),
  "Ornament Streifen": t("Ornament Streifen", "Ornament stripes", "Ornament paski"),
  "33.1 Sicherheitsglas": t("33.1 Sicherheitsglas", "33.1 safety glass", "Szkło bezpieczne 33.1"),
  "Satinmatt": t("Satinmatt", "Satin matt", "Satynowy mat"),
  "Float klar": t("Float klar", "Float, clear", "Float przezroczysty"),
  "Altdeutsch weiß": t("Altdeutsch weiß", "Altdeutsch white", "Altdeutsch biały"),
  "Chinchila weiß": t("Chinchilla weiß", "Chinchilla white", "Chinchilla biały"),
  "Crepi weiß": t("Crepi weiß", "Crepi white", "Crepi biały"),
  "Delta weiß": t("Delta weiß", "Delta white", "Delta biały"),
  "Kathedral weiß": t("Kathedral weiß", "Cathedral white", "Katedralne białe"),
  "Satinato Mate": t("Satinato matt", "Satinato matt", "Satinato mat"),
  "Kura weiß": t("Kura weiß", "Kura white", "Kura biały"),
  "Teilsandgestrahlt": t("Teilsandgestrahlt", "Partly sandblasted", "Częściowo piaskowane"),
  "Stadip 33.1 PVB Matt": t("Stadip 33.1 PVB matt", "Stadip 33.1 PVB matt", "Stadip 33.1 PVB mat"),
  "Silvit weiß": t("Silvit weiß", "Silvit white", "Silvit biały"),
};

export const SWATCH_TEXT: Record<string, ModelText> = {
  ...Object.fromEntries(KEEP.map((name) => [name, n(name)])),
  ...TRANSLATED,
};

/** ¿Nombre copiado igual a los tres idiomas (o sea, sin traducir)? */
export const isUntranslated = (name: Localized<string>): boolean =>
  name.de === name.en && name.pl === name.en;

/** Traduce el nombre de una muestra si está copiado sin traducir y lo tenemos aquí. */
export const localizeSwatch = <T extends { name: Localized<string> }>(item: T): T => {
  if (!isUntranslated(item.name)) return item;
  const entry = SWATCH_TEXT[item.name.en];
  return entry ? { ...item, name: entry } : item;
};
