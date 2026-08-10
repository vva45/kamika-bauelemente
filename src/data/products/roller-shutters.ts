/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Modelos, medidas y valores son plausibles para el sector pero NO son
 * el catálogo real de Kamika. Ver CONTENT.md.
 */
import type { Product } from "../types";

export const rollerShutters: Product[] = [
  {
    id: "roller-shutter-front-mounted",
    category: "roller-shutters",
    name: "Vorbau 137",
    tagline: { en: "Front-mounted box for renovation, no wall works.", de: "Vorbaukasten für die Renovierung, ohne Maurerarbeiten.", pl: "Skrzynka elewacyjna do renowacji, bez prac murarskich." },
    description: {
      en: "A front-mounted shutter that sits on the facade or in the reveal, which makes it the renovation option: the existing lintel stays untouched. Rounded 137 mm aluminium box, foam-filled 37 mm slats, crank or radio motor.",
      de: "Ein Vorbaurollladen auf der Fassade oder in der Laibung — die Renovierungslösung, weil der vorhandene Sturz unangetastet bleibt. Runder 137-mm-Aluminiumkasten, ausgeschäumte 37-mm-Lamellen, Kurbel oder Funkmotor.",
      pl: "Roleta elewacyjna na fasadzie albo we wnęce — opcja renowacyjna, bo istniejące nadproże zostaje nietknięte. Zaokrąglona skrzynka aluminiowa 137 mm, lamele 37 mm wypełnione pianką, korba albo silnik radiowy.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Box size", de: "Kastengröße", pl: "Rozmiar skrzynki" }, value: "137", unit: "mm", highlight: true },
      { label: { en: "Slat height", de: "Lamellenhöhe", pl: "Wysokość lameli" }, value: "37", unit: "mm", highlight: true },
      { label: { en: "Max. area", de: "Max. Fläche", pl: "Maks. powierzchnia" }, value: "6.5", unit: "m²", highlight: true },
      { label: { en: "Mounting", de: "Montage", pl: "Montaż" }, value: { en: "On facade or in reveal", de: "Auf der Fassade oder in der Laibung", pl: "Na elewacji albo we wnęce" } },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "2400 × 2600", unit: "mm" },
      { label: { en: "Operation", de: "Bedienung", pl: "Obsługa" }, value: { en: "Crank or radio motor", de: "Kurbel oder Funkmotor", pl: "Korba albo silnik radiowy" } },
      { label: { en: "Slat fill", de: "Lamellenfüllung", pl: "Wypełnienie lameli" }, value: { en: "PU foam", de: "PU-Schaum", pl: "Pianka PU" } },
      { label: { en: "Insect screen", de: "Insektenschutz", pl: "Siatka przeciw owadom" }, value: { en: "Integrated optional", de: "Integriert optional", pl: "Zintegrowana opcjonalnie" } }],
    images: [
      {
        src: "/images/roller-shutters/roller-shutter-front-mounted-1.jpg",
        alt: { en: "Front-mounted Vorbau 137 shutter box above a renovated window", de: "Vorbau-137-Kasten über einem renovierten Fenster", pl: "Skrzynka Vorbau 137 nad odnowionym oknem" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-front-mounted-2.jpg",
        alt: { en: "Section of the rounded Vorbau 137 box and guide rail", de: "Schnitt durch den runden Vorbau-137-Kasten und die Führungsschiene", pl: "Przekrój zaokrąglonej skrzynki Vorbau 137 i prowadnicy" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-front-mounted-3.jpg",
        alt: { en: "Vorbau 137 half lowered on a south-facing facade", de: "Vorbau 137 halb heruntergelassen an einer Südfassade", pl: "Vorbau 137 do połowy opuszczona na elewacji południowej" },
      }],
    datasheet: "/pdf/roller-shutters/roller-shutter-front-mounted.pdf",
    related: ["external-venetian-blind"],
    featured: true,
  },
  {
    id: "roller-shutter-top-mounted",
    category: "roller-shutters",
    name: "Aufsatz 205",
    tagline: { en: "Top-mounted box, planned with the window.", de: "Aufsatzkasten, mit dem Fenster geplant.", pl: "Skrzynka nadstawna, planowana razem z oknem." },
    description: {
      en: "The box sits directly on the window frame and goes into the wall with it, insulated to the lintel — the standard for new build because nothing shows on the facade. Ordered together with the window so the statics and the reveal height are right first time.",
      de: "Der Kasten sitzt direkt auf dem Fensterrahmen und geht mit ihm in die Wand, gedämmt bis zum Sturz — der Standard im Neubau, weil an der Fassade nichts zu sehen ist. Zusammen mit dem Fenster bestellt, damit Statik und Laibungshöhe beim ersten Mal stimmen.",
      pl: "Skrzynka siedzi bezpośrednio na ramie okna i idzie z nią w ścianę, ocieplona do nadproża — standard w nowym budownictwie, bo na elewacji nic nie widać. Zamawiana razem z oknem, żeby statyka i wysokość wnęki zgadzały się za pierwszym razem.",
    },
    material: "pvc",
    specs: [
      { label: { en: "Box size", de: "Kastengröße", pl: "Rozmiar skrzynki" }, value: "205", unit: "mm", highlight: true },
      { label: { en: "Slat height", de: "Lamellenhöhe", pl: "Wysokość lameli" }, value: "37", unit: "mm", highlight: true },
      { label: { en: "Box insulation", de: "Kastendämmung", pl: "Izolacja skrzynki" }, value: "Usb 0.79", unit: "W/m²K", highlight: true },
      { label: { en: "Mounting", de: "Montage", pl: "Montaż" }, value: { en: "On the window frame", de: "Auf dem Fensterrahmen", pl: "Na ramie okna" } },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "2500 × 2600", unit: "mm" },
      { label: { en: "Operation", de: "Bedienung", pl: "Obsługa" }, value: { en: "Radio motor", de: "Funkmotor", pl: "Silnik radiowy" } },
      { label: { en: "Inspection", de: "Revision", pl: "Rewizja" }, value: { en: "From below", de: "Von unten", pl: "Od dołu" } },
      { label: { en: "Insect screen", de: "Insektenschutz", pl: "Siatka przeciw owadom" }, value: { en: "Integrated optional", de: "Integriert optional", pl: "Zintegrowana opcjonalnie" } }],
    images: [
      {
        src: "/images/roller-shutters/roller-shutter-top-mounted-1.jpg",
        alt: { en: "Aufsatz 205 box mounted on a window frame before installation", de: "Aufsatz-205-Kasten auf dem Fensterrahmen vor dem Einbau", pl: "Skrzynka Aufsatz 205 na ramie okna przed montażem" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-top-mounted-2.jpg",
        alt: { en: "New-build facade with no visible shutter boxes", de: "Neubaufassade ohne sichtbare Rollladenkästen", pl: "Elewacja nowego domu bez widocznych skrzynek rolet" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-top-mounted-3.jpg",
        alt: { en: "Inspection opening of the Aufsatz 205 seen from the room", de: "Revisionsöffnung des Aufsatz 205 vom Raum aus gesehen", pl: "Otwór rewizyjny Aufsatz 205 widziany z pokoju" },
      }],
    related: [],
    featured: true,
    badge: "bestseller",
  },
  {
    id: "roller-shutter-concealed",
    category: "roller-shutters",
    name: "Unterputz 165",
    tagline: { en: "Concealed box, plastered flush with the facade.", de: "Unterputzkasten, flächenbündig mit der Fassade.", pl: "Skrzynka podtynkowa, licująca z elewacją." },
    description: {
      en: "The box disappears behind render or cladding and only the guide rails show. Needs the lintel detail agreed with the builder before the shell goes up, which is exactly the conversation we have on site. Motor only.",
      de: "Der Kasten verschwindet hinter Putz oder Verkleidung, sichtbar bleiben nur die Führungsschienen. Braucht das Sturzdetail, abgestimmt mit dem Bauunternehmer, bevor der Rohbau steht — genau das Gespräch, das wir vor Ort führen. Nur mit Motor.",
      pl: "Skrzynka znika pod tynkiem albo okładziną, widoczne zostają tylko prowadnice. Wymaga uzgodnienia detalu nadproża z wykonawcą, zanim stanie stan surowy — dokładnie ta rozmowa, którą prowadzimy na budowie. Tylko z silnikiem.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Box size", de: "Kastengröße", pl: "Rozmiar skrzynki" }, value: "165", unit: "mm", highlight: true },
      { label: { en: "Slat height", de: "Lamellenhöhe", pl: "Wysokość lameli" }, value: "37", unit: "mm", highlight: true },
      { label: { en: "Visible parts", de: "Sichtbare Teile", pl: "Widoczne elementy" }, value: { en: "Guide rails only", de: "Nur Führungsschienen", pl: "Tylko prowadnice" }, highlight: true },
      { label: { en: "Mounting", de: "Montage", pl: "Montaż" }, value: { en: "Behind render or cladding", de: "Hinter Putz oder Verkleidung", pl: "Pod tynkiem albo okładziną" } },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "2200 × 2400", unit: "mm" },
      { label: { en: "Operation", de: "Bedienung", pl: "Obsługa" }, value: { en: "Radio motor", de: "Funkmotor", pl: "Silnik radiowy" } },
      { label: { en: "Inspection", de: "Revision", pl: "Rewizja" }, value: { en: "From outside, clip panel", de: "Von außen, Klippblende", pl: "Od zewnątrz, panel na klips" } }],
    images: [
      {
        src: "/images/roller-shutters/roller-shutter-concealed-1.jpg",
        alt: { en: "Facade with concealed Unterputz 165 boxes, only rails visible", de: "Fassade mit Unterputz-165-Kästen — sichtbar sind nur die Schienen", pl: "Elewacja ze skrzynkami podtynkowymi Unterputz 165 — widać tylko prowadnice" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-concealed-2.jpg",
        alt: { en: "Lintel section showing the plastered-in Unterputz 165 box", de: "Sturzschnitt mit eingeputztem Unterputz-165-Kasten", pl: "Przekrój nadproża z zatynkowaną skrzynką Unterputz 165" },
      },
      {
        src: "/images/roller-shutters/roller-shutter-concealed-3.jpg",
        alt: { en: "Guide rail detail of the Unterputz 165 in anthracite", de: "Führungsschienen-Detail des Unterputz 165 in Anthrazit", pl: "Detal prowadnicy Unterputz 165 w antracycie" },
      }],
    related: [],
  },
  {
    id: "external-venetian-blind",
    category: "roller-shutters",
    name: "Raffstore 90",
    tagline: { en: "External venetian blind: shade with daylight.", de: "Raffstore: Schatten mit Tageslicht.", pl: "Żaluzja fasadowa: cień przy świetle dziennym." },
    description: {
      en: "90 mm aluminium slats that tilt like a venetian blind but hang outside the glass, where they stop the heat before it enters. The office and living-room answer when a closed shutter is too dark. Wind-monitored motor control recommended above the second floor.",
      de: "90-mm-Aluminiumlamellen, die wie eine Jalousie kippen, aber außen vor dem Glas hängen — dort stoppen sie die Hitze, bevor sie hereinkommt. Die Antwort für Büro und Wohnzimmer, wenn ein geschlossener Rollladen zu dunkel ist. Ab dem zweiten Obergeschoss ist windüberwachte Motorsteuerung empfohlen.",
      pl: "Lamele aluminiowe 90 mm, które przechylają się jak żaluzja, ale wiszą na zewnątrz przed szybą — zatrzymują ciepło, zanim wejdzie do środka. Odpowiedź dla biura i salonu, gdy zamknięta roleta daje za dużo ciemności. Powyżej drugiego piętra zalecane sterowanie z czujnikiem wiatru.",
    },
    material: "aluminium",
    specs: [
      { label: { en: "Slat width", de: "Lattenbreite", pl: "Szerokość listwy" }, value: "90", unit: "mm", highlight: true },
      { label: { en: "Slat shape", de: "Lamellenform", pl: "Kształt lameli" }, value: { en: "Z, bordered", de: "Z, gebördelt", pl: "Z, felcowana" }, highlight: true },
      { label: { en: "Max. area", de: "Max. Fläche", pl: "Maks. powierzchnia" }, value: "12", unit: "m²", highlight: true },
      { label: { en: "Max. size", de: "Max. Größe", pl: "Maks. wymiar" }, value: "3000 × 4000", unit: "mm" },
      { label: { en: "Operation", de: "Bedienung", pl: "Obsługa" }, value: { en: "Motor, wind monitored", de: "Motor, windüberwacht", pl: "Silnik z czujnikiem wiatru" } },
      { label: { en: "Guide", de: "Führung", pl: "Prowadzenie" }, value: { en: "Rail or cable", de: "Schiene oder Seil", pl: "Szyna albo linka" } },
      { label: { en: "Tilt range", de: "Kippbereich", pl: "Zakres uchyłu" }, value: "0–180°" }],
    images: [
      {
        src: "/images/roller-shutters/external-venetian-blind-1.jpg",
        alt: { en: "Raffstore 90 external blinds tilted open on an office facade", de: "Geöffnet gekippte Raffstore 90 an einer Bürofassade", pl: "Żaluzje Raffstore 90 uchylone na elewacji biurowca" },
      },
      {
        src: "/images/roller-shutters/external-venetian-blind-2.jpg",
        alt: { en: "Z-profile slat detail of the Raffstore 90", de: "Z-Lamellen-Detail des Raffstore 90", pl: "Detal lameli Z żaluzji Raffstore 90" },
      },
      {
        src: "/images/roller-shutters/external-venetian-blind-3.jpg",
        alt: { en: "Living room behind half-tilted Raffstore 90 slats", de: "Wohnzimmer hinter halb gekippten Raffstore-90-Lamellen", pl: "Salon za w połowie przechylonymi lamelami Raffstore 90" },
      }],
    related: [],
  }];
