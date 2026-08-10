/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const gates: Product[] = [
  {
    id: "sectional-garage-40",
    category: "gates",
    name: "Sektional 40",
    tagline: { en: "Sectional garage door, 40 mm insulated panels.", de: "Sektionaltor, 40-mm-Paneele gedämmt.", pl: "Brama segmentowa, ocieplone panele 40 mm." },
    description: {
      en: "Foam-filled 40 mm steel sections running under the ceiling, so the full drive-through width stays usable. Supplied as one package: door, radio drive, two hand transmitters and the photocell. Finger-protection profile joints as standard.",
      de: "Ausgeschäumte 40-mm-Stahlsektionen, die unter die Decke laufen — die volle Durchfahrtsbreite bleibt nutzbar. Geliefert als ein Paket: Tor, Funkantrieb, zwei Handsender und Lichtschranke. Fingerschutz-Profilstöße serienmäßig.",
      pl: "Wypełnione pianką stalowe sekcje 40 mm chowające się pod sufit — pełna szerokość przejazdu zostaje do dyspozycji. Dostawa w jednym pakiecie: brama, napęd radiowy, dwa piloty i fotokomórka. Łączenia profili z ochroną palców w standardzie.",
    },
    material: "steel",
    specs: [
      { label: { en: "Panel thickness", de: "Paneelstärke", pl: "Grubość panelu" }, value: "40", unit: "mm", highlight: true },
      { label: { en: "U value (door)", de: "U-Wert (Tor)", pl: "Współczynnik U (brama)" }, value: "1.0", unit: "W/m²K", highlight: true },
      { label: { en: "Drive", de: "Antrieb", pl: "Napęd" }, value: { en: "Radio, included", de: "Funk, inklusive", pl: "Radiowy, w zestawie" }, highlight: true },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "5000 × 3000", unit: "mm" },
      { label: { en: "Safety", de: "Sicherheit", pl: "Bezpieczeństwo" }, value: { en: "Photocell + force cut-off", de: "Lichtschranke + Kraftabschaltung", pl: "Fotokomórka + wyłącznik przeciążeniowy" } },
      { label: { en: "Surfaces", de: "Oberflächen", pl: "Powierzchnie" }, value: { en: "Woodgrain, silk, decor", de: "Holzstruktur, Seidenglanz, Dekor", pl: "Struktura drewna, półmat, dekor" } },
      { label: { en: "Wicket door", de: "Schlupftür", pl: "Drzwi w bramie" }, value: { en: "Optional, flush threshold", de: "Optional, flache Schwelle", pl: "Opcjonalnie, płaski próg" } }],
    images: [
      {
        src: "/images/gates/sectional-garage-40-1.jpg",
        alt: { en: "Sektional 40 garage door in anthracite on a double garage", de: "Sektional-40-Tor in Anthrazit an einer Doppelgarage", pl: "Brama Sektional 40 w antracycie w garażu dwustanowiskowym" },
      },
      {
        src: "/images/gates/sectional-garage-40-2.jpg",
        alt: { en: "Panel joint with finger protection on the Sektional 40", de: "Profilstoß mit Fingerschutz am Sektional 40", pl: "Łączenie paneli z ochroną palców w bramie Sektional 40" },
      },
      {
        src: "/images/gates/sectional-garage-40-3.jpg",
        alt: { en: "Sektional 40 open under the garage ceiling with the drive rail", de: "Sektional 40 offen unter der Garagendecke mit Antriebsschiene", pl: "Sektional 40 otwarta pod sufitem garażu z szyną napędu" },
      }],
    datasheet: "/pdf/gates/sectional-garage-40.pdf",
    related: ["sliding-gate-alu", "roller-shutter-front-mounted"],
    featured: true,
    badge: "bestseller",
  },
  {
    id: "side-hinged-garage",
    category: "gates",
    name: "Flügeltor Duo",
    tagline: { en: "Side-hinged doors for garages used as workshops.", de: "Flügeltore für Garagen, die als Werkstatt dienen.", pl: "Brama rozwierna do garaży używanych jak warsztat." },
    description: {
      en: "Two steel leaves on a galvanised corner frame: open one leaf and walk in, no drive needed and the ceiling stays free for storage. The usual choice when the garage is really a workshop. Asymmetric split available.",
      de: "Zwei Stahlflügel auf verzinktem Eckrahmen: einen Flügel öffnen und hineingehen — kein Antrieb nötig, die Decke bleibt frei für Lagerung. Die übliche Wahl, wenn die Garage eigentlich eine Werkstatt ist. Asymmetrische Teilung möglich.",
      pl: "Dwa stalowe skrzydła na ocynkowanej ramie: otwierasz jedno skrzydło i wchodzisz — napęd zbędny, a sufit zostaje wolny na przechowywanie. Zwykły wybór, gdy garaż jest tak naprawdę warsztatem. Możliwy podział asymetryczny.",
    },
    material: "steel",
    specs: [
      { label: { en: "Leaf build", de: "Flügelaufbau", pl: "Budowa skrzydła" }, value: { en: "Double-skin steel", de: "Doppelwandiger Stahl", pl: "Stal dwupowłokowa" }, highlight: true },
      { label: { en: "Frame", de: "Rahmen", pl: "Rama" }, value: { en: "Galvanised corner frame", de: "Verzinkter Eckrahmen", pl: "Ocynkowana rama narożna" }, highlight: true },
      { label: { en: "Ceiling", de: "Decke", pl: "Sufit" }, value: { en: "Stays free", de: "Bleibt frei", pl: "Zostaje wolny" }, highlight: true },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "3000 × 2500", unit: "mm" },
      { label: { en: "Split", de: "Teilung", pl: "Podział" }, value: "50/50 or 1/3–2/3" },
      { label: { en: "Ventilation", de: "Lüftung", pl: "Wentylacja" }, value: { en: "Grille optional", de: "Gitter optional", pl: "Kratka opcjonalnie" } }],
    images: [
      {
        src: "/images/gates/side-hinged-garage-1.jpg",
        alt: { en: "Flügeltor Duo with one leaf open on a workshop garage", de: "Flügeltor Duo mit einem offenen Flügel an einer Werkstattgarage", pl: "Flügeltor Duo z jednym otwartym skrzydłem przy garażu-warsztacie" },
      },
      {
        src: "/images/gates/side-hinged-garage-2.jpg",
        alt: { en: "Corner frame and hinge of the Flügeltor Duo", de: "Eckrahmen und Band des Flügeltor Duo", pl: "Narożna rama i zawias bramy Flügeltor Duo" },
      },
      {
        src: "/images/gates/side-hinged-garage-3.jpg",
        alt: { en: "Asymmetric split Flügeltor Duo on an older house", de: "Asymmetrisch geteiltes Flügeltor Duo an einem älteren Haus", pl: "Asymetrycznie dzielona brama Flügeltor Duo przy starszym domu" },
      }],
    related: ["swing-gate-alu", "sectional-garage-40"],
  },
  {
    id: "sliding-gate-alu",
    category: "gates",
    name: "Schiebetor Line",
    tagline: { en: "Cantilever sliding gate, no floor rail.", de: "Freitragendes Schiebetor, ohne Bodenschiene.", pl: "Samonośna brama przesuwna, bez szyny w podłożu." },
    description: {
      en: "A self-supporting aluminium sliding gate that carries its weight on rollers behind the fence line — nothing crosses the driveway, so snow and gravel never block it. Drive with force cut-off, photocell and flashing light included. Infill matches our fence panels.",
      de: "Ein selbsttragendes Aluminium-Schiebetor, das sein Gewicht auf Rollen hinter der Zaunlinie trägt — nichts quert die Einfahrt, Schnee und Kies blockieren es nie. Antrieb mit Kraftabschaltung, Lichtschranke und Blinkleuchte inklusive. Die Füllung passt zu unseren Zaunfeldern.",
      pl: "Samonośna aluminiowa brama przesuwna, która niesie swój ciężar na rolkach za linią ogrodzenia — nic nie przecina wjazdu, więc śnieg i żwir nigdy jej nie blokują. Napęd z wyłącznikiem przeciążeniowym, fotokomórką i lampą w zestawie. Wypełnienie pasuje do naszych przęseł.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Construction", de: "Konstruktion", pl: "Konstrukcja" }, value: { en: "Cantilever, no floor rail", de: "Freitragend, ohne Bodenschiene", pl: "Samonośna, bez szyny w podłożu" }, highlight: true },
      { label: { en: "Max. clear width", de: "Max. lichte Breite", pl: "Maks. szerokość w świetle" }, value: "4500", unit: "mm", highlight: true },
      { label: { en: "Drive", de: "Antrieb", pl: "Napęd" }, value: { en: "230 V, included", de: "230 V, inklusive", pl: "230 V, w zestawie" }, highlight: true },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "4500 × 1800", unit: "mm" },
      { label: { en: "Safety", de: "Sicherheit", pl: "Bezpieczeństwo" }, value: { en: "Photocell + safety edge", de: "Lichtschranke + Sicherheitsleiste", pl: "Fotokomórka + listwa bezpieczeństwa" } },
      { label: { en: "Infill", de: "Füllung", pl: "Wypełnienie" }, value: { en: "Matches fence panels", de: "Passend zu den Zaunfeldern", pl: "Jak w przęsłach ogrodzenia" } },
      { label: { en: "Coating", de: "Beschichtung", pl: "Powłoka" }, value: { en: "Powder, all RAL", de: "Pulver, alle RAL", pl: "Proszkowa, wszystkie RAL" } }],
    images: [
      {
        src: "/images/gates/sliding-gate-alu-1.jpg",
        alt: { en: "Schiebetor Line sliding open across a driveway", de: "Schiebetor Line beim Öffnen über die Einfahrt", pl: "Brama Schiebetor Line otwierająca się nad wjazdem" },
      },
      {
        src: "/images/gates/sliding-gate-alu-2.jpg",
        alt: { en: "Cantilever roller carriage behind the fence line", de: "Freitragender Rollenwagen hinter der Zaunlinie", pl: "Wózek rolkowy bramy samonośnej za linią ogrodzenia" },
      },
      {
        src: "/images/gates/sliding-gate-alu-3.jpg",
        alt: { en: "Schiebetor Line closed, infill matching the fence", de: "Schiebetor Line geschlossen, Füllung passend zum Zaun", pl: "Brama Schiebetor Line zamknięta, wypełnienie jak w ogrodzeniu" },
      }],
    related: ["swing-gate-alu", "sectional-garage-40"],
    featured: true,
  },
  {
    id: "swing-gate-alu",
    category: "gates",
    name: "Drehtor Classic",
    tagline: { en: "Two-leaf swing gate for shorter driveways.", de: "Zweiflügeliges Drehtor für kürzere Einfahrten.", pl: "Dwuskrzydłowa brama rozwierna na krótsze wjazdy." },
    description: {
      en: "A two-leaf aluminium swing gate on adjustable hinges, manual or with twin underground drives. Needs swing room but no run-off space to the side, which decides it on many plots. Same infill panels and colours as the fence range.",
      de: "Ein zweiflügeliges Aluminium-Drehtor auf verstellbaren Bändern, manuell oder mit zwei Unterflurantrieben. Braucht Schwenkraum, aber keinen Auslauf zur Seite — das entscheidet auf vielen Grundstücken. Dieselben Füllungen und Farben wie das Zaunsortiment.",
      pl: "Dwuskrzydłowa aluminiowa brama rozwierna na regulowanych zawiasach, ręczna albo z dwoma napędami podziemnymi. Potrzebuje miejsca na otwarcie, ale nie potrzebuje wybiegu w bok — to przesądza na wielu działkach. Te same wypełnienia i kolory co ogrodzenia.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Leaves", de: "Flügel", pl: "Skrzydła" }, value: { en: "2, adjustable hinges", de: "2, verstellbare Bänder", pl: "2, regulowane zawiasy" }, highlight: true },
      { label: { en: "Max. clear width", de: "Max. lichte Breite", pl: "Maks. szerokość w świetle" }, value: "4000", unit: "mm", highlight: true },
      { label: { en: "Drive", de: "Antrieb", pl: "Napęd" }, value: { en: "Underground, optional", de: "Unterflur, optional", pl: "Podziemny, opcjonalnie" }, highlight: true },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "4000 × 1800", unit: "mm" },
      { label: { en: "Lock", de: "Schloss", pl: "Zamek" }, value: { en: "Drop bolt + cylinder", de: "Bodenriegel + Zylinder", pl: "Rygiel dolny + wkładka" } },
      { label: { en: "Infill", de: "Füllung", pl: "Wypełnienie" }, value: { en: "Matches fence panels", de: "Passend zu den Zaunfeldern", pl: "Jak w przęsłach ogrodzenia" } }],
    images: [
      {
        src: "/images/gates/swing-gate-alu-1.jpg",
        alt: { en: "Drehtor Classic two-leaf gate at a driveway entrance", de: "Zweiflügeliges Drehtor Classic an einer Einfahrt", pl: "Dwuskrzydłowa brama Drehtor Classic przy wjeździe" },
      },
      {
        src: "/images/gates/swing-gate-alu-2.jpg",
        alt: { en: "Adjustable hinge and drop bolt of the Drehtor Classic", de: "Verstellbares Band und Bodenriegel des Drehtor Classic", pl: "Regulowany zawias i rygiel dolny bramy Drehtor Classic" },
      },
      {
        src: "/images/gates/swing-gate-alu-3.jpg",
        alt: { en: "Underground drive box of the Drehtor Classic", de: "Unterflurantrieb des Drehtor Classic", pl: "Napęd podziemny bramy Drehtor Classic" },
      }],
    related: ["sliding-gate-alu", "side-hinged-garage"],
  }];
