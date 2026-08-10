/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const fences: Product[] = [
  {
    id: "fence-horizontal-alu",
    category: "fences",
    name: "Linea Horizontal",
    tagline: { en: "Horizontal aluminium slats, gaps to choose.", de: "Horizontale Aluminiumlatten, Spalt nach Wahl.", pl: "Poziome listwy aluminiowe, prześwit do wyboru." },
    description: {
      en: "Powder-coated aluminium slats running horizontally between posts, with the gap chosen per project — from open 40 mm to near-closed 10 mm. Panels are set out from a site plan before production, so slopes are stepped or raked deliberately, not improvised.",
      de: "Pulverbeschichtete Aluminiumlatten horizontal zwischen den Pfosten, der Spalt je Projekt gewählt — von offenen 40 mm bis fast geschlossenen 10 mm. Die Felder werden vor der Fertigung nach Lageplan festgelegt: Gefälle wird bewusst gestuft oder geschrägt, nicht improvisiert.",
      pl: "Malowane proszkowo aluminiowe listwy poziomo między słupkami, prześwit dobierany do projektu — od otwartych 40 mm po prawie zamknięte 10 mm. Przęsła rozmierza się z planu przed produkcją: spadki są schodkowane albo skośne celowo, nie na oko.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Slat", de: "Lamelle", pl: "Lamela" }, value: "80 × 20", unit: "mm", highlight: true },
      { label: { en: "Heights", de: "Höhen", pl: "Wysokości" }, value: "800–1800", unit: "mm", highlight: true },
      { label: { en: "Post spacing", de: "Pfostenabstand", pl: "Rozstaw słupków" }, value: "up to 2000", unit: "mm", highlight: true },
      { label: { en: "Gap options", de: "Spaltmaße", pl: "Warianty prześwitu" }, value: "10 / 20 / 40 mm" },
      { label: { en: "Coating", de: "Beschichtung", pl: "Powłoka" }, value: { en: "Powder, all RAL", de: "Pulver, alle RAL", pl: "Proszkowa, wszystkie RAL" } },
      { label: { en: "Posts", de: "Pfosten", pl: "Słupki" }, value: { en: "60 × 60 mm, set in concrete", de: "60 × 60 mm, einbetoniert", pl: "60 × 60 mm, betonowane" } },
      { label: { en: "Slopes", de: "Gefälle", pl: "Spadki" }, value: { en: "Stepped or raked", de: "Gestuft oder geschrägt", pl: "Schodkowane albo skośne" } }],
    images: [
      {
        src: "/images/fences/fence-horizontal-alu-1.jpg",
        alt: { en: "Linea Horizontal fence along a front garden", de: "Linea-Horizontal-Zaun an einem Vorgarten", pl: "Ogrodzenie Linea Horizontal wzdłuż ogrodu od frontu" },
      },
      {
        src: "/images/fences/fence-horizontal-alu-2.jpg",
        alt: { en: "Slat and post junction of the Linea Horizontal", de: "Latten-Pfosten-Anschluss des Linea Horizontal", pl: "Połączenie listwy ze słupkiem w Linea Horizontal" },
      },
      {
        src: "/images/fences/fence-horizontal-alu-3.jpg",
        alt: { en: "Stepped Linea Horizontal panels on a sloping plot", de: "Gestufte Linea-Horizontal-Felder auf einem Hanggrundstück", pl: "Schodkowane przęsła Linea Horizontal na pochyłej działce" },
      }],
    related: ["sliding-gate-alu", "pedestrian-gate-alu"],
    featured: true,
  },
  {
    id: "fence-vertical-bar",
    category: "fences",
    name: "Barra Vertical",
    tagline: { en: "Vertical steel bars, the classic that lasts.", de: "Vertikale Stahlstäbe — der Klassiker, der hält.", pl: "Pionowe stalowe pręty — klasyka, która trwa." },
    description: {
      en: "Galvanised and powder-coated steel bars welded into panels — the fence that gets climbed on, leaned on and hit by bicycles and shrugs it off. Matching swing and pedestrian gates from the same range.",
      de: "Verzinkte, pulverbeschichtete Stahlstäbe zu Feldern verschweißt — der Zaun, auf den geklettert, an den sich gelehnt und gegen den Fahrräder fahren, und dem das nichts ausmacht. Passende Dreh- und Gehtore aus derselben Serie.",
      pl: "Ocynkowane i malowane proszkowo stalowe pręty zespawane w przęsła — ogrodzenie, po którym się wspinają, o które się opierają i w które uderzają rowery, a ono to znosi. Pasujące bramy i furtki z tej samej serii.",
    },
    material: "steel",
    specs: [
      { label: { en: "Bar", de: "Stab", pl: "Pręt" }, value: "25 × 25", unit: "mm", highlight: true },
      { label: { en: "Heights", de: "Höhen", pl: "Wysokości" }, value: "600–2000", unit: "mm", highlight: true },
      { label: { en: "Finish", de: "Oberfläche", pl: "Wykończenie" }, value: { en: "Galvanised + powder", de: "Verzinkt + Pulver", pl: "Ocynk + lakier proszkowy" }, highlight: true },
      { label: { en: "Post spacing", de: "Pfostenabstand", pl: "Rozstaw słupków" }, value: "up to 2500", unit: "mm" },
      { label: { en: "Bar spacing", de: "Stababstand", pl: "Rozstaw prętów" }, value: { en: "110 mm clear", de: "110 mm licht", pl: "110 mm w świetle" } },
      { label: { en: "Fixing", de: "Befestigung", pl: "Mocowanie" }, value: { en: "Concrete or flange plate", de: "Beton oder Flanschplatte", pl: "Beton albo stopa montażowa" } }],
    images: [
      {
        src: "/images/fences/fence-vertical-bar-1.jpg",
        alt: { en: "Barra Vertical steel fence around a family garden", de: "Barra-Vertical-Stahlzaun um einen Familiengarten", pl: "Stalowe ogrodzenie Barra Vertical wokół rodzinnego ogrodu" },
      },
      {
        src: "/images/fences/fence-vertical-bar-2.jpg",
        alt: { en: "Welded bar-to-rail joint of the Barra Vertical", de: "Geschweißter Stab-Riegel-Stoß des Barra Vertical", pl: "Spawane połączenie pręta z ryglem w Barra Vertical" },
      },
      {
        src: "/images/fences/fence-vertical-bar-3.jpg",
        alt: { en: "Flange-plate post fixing on a low wall", de: "Pfostenbefestigung mit Flanschplatte auf einer Mauer", pl: "Mocowanie słupka na stopie na murku" },
      }],
    related: ["swing-gate-alu", "pedestrian-gate-alu"],
  },
  {
    id: "fence-privacy-screen",
    category: "fences",
    name: "Sichtschutz Voll",
    tagline: { en: "Full privacy panels for terrace and boundary.", de: "Volle Sichtschutzpaneele für Terrasse und Grenze.", pl: "Pełne panele osłonowe na taras i granicę." },
    description: {
      en: "Closed aluminium panels with a tongue-and-groove profile, for the terrace side where the point is not being seen. Calculated for wind load at full height — a closed panel takes far more wind than bars, which is why the post spec changes with it.",
      de: "Geschlossene Aluminiumpaneele mit Nut-und-Feder-Profil, für die Terrassenseite, wo es ums Nicht-gesehen-Werden geht. Auf volle Höhe für Windlast gerechnet — ein geschlossenes Feld fängt viel mehr Wind als Stäbe, deshalb ändert sich damit die Pfostenspezifikation.",
      pl: "Pełne panele aluminiowe na pióro-wpust, od strony tarasu, gdzie chodzi o to, by nie być widzianym. Liczone na obciążenie wiatrem przy pełnej wysokości — pełne przęsło łapie znacznie więcej wiatru niż pręty, dlatego zmienia się z nim specyfikacja słupków.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Profile", de: "Profil", pl: "Profil" }, value: { en: "Tongue and groove", de: "Nut und Feder", pl: "Pióro-wpust" }, highlight: true },
      { label: { en: "Heights", de: "Höhen", pl: "Wysokości" }, value: "1600–2000", unit: "mm", highlight: true },
      { label: { en: "Wind load", de: "Windlast", pl: "Obciążenie wiatrem" }, value: { en: "Calculated per site", de: "Je Objekt gerechnet", pl: "Liczone dla działki" }, highlight: true },
      { label: { en: "Post spacing", de: "Pfostenabstand", pl: "Rozstaw słupków" }, value: "up to 1500", unit: "mm" },
      { label: { en: "Coating", de: "Beschichtung", pl: "Powłoka" }, value: { en: "Powder, all RAL + decor", de: "Pulver, alle RAL + Dekor", pl: "Proszkowa, wszystkie RAL + dekor" } },
      { label: { en: "Posts", de: "Pfosten", pl: "Słupki" }, value: { en: "80 × 80 mm at full height", de: "80 × 80 mm bei voller Höhe", pl: "80 × 80 mm przy pełnej wysokości" } }],
    images: [
      {
        src: "/images/fences/fence-privacy-screen-1.jpg",
        alt: { en: "Sichtschutz Voll privacy panels beside a terrace", de: "Sichtschutz-Voll-Paneele neben einer Terrasse", pl: "Panele Sichtschutz Voll przy tarasie" },
      },
      {
        src: "/images/fences/fence-privacy-screen-2.jpg",
        alt: { en: "Tongue-and-groove joint of the Sichtschutz Voll panel", de: "Nut-und-Feder-Stoß des Sichtschutz-Voll-Paneels", pl: "Połączenie pióro-wpust panelu Sichtschutz Voll" },
      },
      {
        src: "/images/fences/fence-privacy-screen-3.jpg",
        alt: { en: "Sichtschutz Voll in wood decor along a boundary", de: "Sichtschutz Voll in Holzdekor an einer Grundstücksgrenze", pl: "Sichtschutz Voll w dekorze drewna wzdłuż granicy" },
      }],
    related: ["fence-horizontal-alu", "sliding-gate-alu"],
  },
  {
    id: "pedestrian-gate-alu",
    category: "fences",
    name: "Gartentür Uno",
    tagline: { en: "Pedestrian gate matching every fence range.", de: "Gehtür passend zu jeder Zaunserie.", pl: "Furtka pasująca do każdej serii ogrodzeń." },
    description: {
      en: "A single gate on self-closing hinges with a lockable latch, built with the same infill as the chosen fence so the run reads as one piece. Electric strike optional for intercom release.",
      de: "Eine Gehtür auf selbstschließenden Bändern mit abschließbarer Falle, gebaut mit derselben Füllung wie der gewählte Zaun — der Zug wirkt wie aus einem Stück. Elektrischer Türöffner optional für die Sprechanlage.",
      pl: "Furtka na zawiasach samodomykających z zamykanym zatrzaskiem, z tym samym wypełnieniem co wybrane ogrodzenie — ciąg wygląda jak jedna całość. Elektrozaczep opcjonalnie pod domofon.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Clear width", de: "Lichte Breite", pl: "Szerokość w świetle" }, value: "1000", unit: "mm", highlight: true },
      { label: { en: "Hinges", de: "Bänder", pl: "Zawiasy" }, value: { en: "Self-closing, adjustable", de: "Selbstschließend, verstellbar", pl: "Samodomykające, regulowane" }, highlight: true },
      { label: { en: "Latch", de: "Falle", pl: "Zatrzask" }, value: { en: "Lockable cylinder", de: "Abschließbarer Zylinder", pl: "Zamykana wkładka" }, highlight: true },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "1200 × 1800", unit: "mm" },
      { label: { en: "Electric strike", de: "Elektrischer Türöffner", pl: "Elektrozaczep" }, value: { en: "Optional", de: "Optional", pl: "Opcjonalnie" } },
      { label: { en: "Infill", de: "Füllung", pl: "Wypełnienie" }, value: { en: "Matches fence range", de: "Passend zur Zaunserie", pl: "Jak w serii ogrodzeń" } }],
    images: [
      {
        src: "/images/fences/pedestrian-gate-alu-1.jpg",
        alt: { en: "Gartentür Uno pedestrian gate in a horizontal-slat fence", de: "Gehtür Gartentür Uno in einem Lattenzaun", pl: "Furtka Gartentür Uno w ogrodzeniu z listew poziomych" },
      },
      {
        src: "/images/fences/pedestrian-gate-alu-2.jpg",
        alt: { en: "Self-closing hinge and latch of the Gartentür Uno", de: "Selbstschließendes Band und Falle der Gartentür Uno", pl: "Zawias samodomykający i zatrzask furtki Gartentür Uno" },
      },
      {
        src: "/images/fences/pedestrian-gate-alu-3.jpg",
        alt: { en: "Electric strike detail for intercom release", de: "Detail des elektrischen Türöffners für die Sprechanlage", pl: "Detal elektrozaczepu pod domofon" },
      }],
    related: ["fence-horizontal-alu", "swing-gate-alu"],
  }];
