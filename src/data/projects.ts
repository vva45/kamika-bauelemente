/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Seis proyectos plausibles en la zona real de trabajo (Hechingen y
 * alrededores, Zollernalbkreis). NO son obras reales de Kamika: hay que
 * cambiarlos por trabajos hechos de verdad, con sus fotos. Ver CONTENT.md.
 *
 * Los proyectos son lo que da confianza en una web de este tipo, así que
 * en cuanto haya obras reales conviene sustituirlos, aunque sean tres.
 */
import type { Project } from "./types";

export const PROJECTS: Project[] = [
  /* ═══ REAL — EN COLA, pendiente solo del archivo de foto ═══════
   *
   * Primera obra real (el dueño la mandó por chat, 2026-08). El chat
   * no entrega el archivo original, así que la entrada espera aquí
   * COMENTADA hasta que la foto suba a:
   *
   *   public/images/projects/new-build-altensteig-1.jpg
   *
   * En cuanto exista, descomentar y borrar los inventados sobrantes.
   * Pendiente de confirmar con el dueño: qué sistema corredero es
   * (¿evolutionDrive?) y si además de la corredera se montaron
   * ventanas (para añadir "windows" a categories y enlazar sistema).
   *
  {
    id: "new-build-altensteig",
    title: {
      en: "New build, Altensteig",
      de: "Neubau, Altensteig",
      pl: "Nowy dom, Altensteig",
    },
    location: "Altensteig",
    year: 2026,
    categories: ["patio-doors"],
    summary: {
      en: "A new single-family home where the living room opens to the garden through a two-panel sliding door in anthracite, the sliding sash carrying an industrial glazing-bar grid. Fitted in February 2026, while the interior was still being finished.",
      de: "Ein neues Einfamilienhaus, dessen Wohnraum sich über eine zweiteilige Schiebetür in Anthrazit zum Garten öffnet — der Schiebeflügel mit Sprossen im Industrie-Look. Montiert im Februar 2026, noch während des Innenausbaus.",
      pl: "Nowy dom jednorodzinny, którego salon otwiera się na ogród dwuczęściowymi drzwiami przesuwnymi w antracycie — skrzydło przesuwne ze szprosami w industrialnym stylu. Montaż w lutym 2026, jeszcze w trakcie wykańczania wnętrza.",
    },
    images: [
      {
        src: "/images/projects/new-build-altensteig-1.jpg",
        alt: {
          en: "Anthracite sliding door with glazing bars, seen from inside the unfinished living room",
          de: "Anthrazitfarbene Schiebetür mit Sprossen, vom noch unfertigen Wohnraum aus gesehen",
          pl: "Antracytowe drzwi przesuwne ze szprosami, widziane z niewykończonego jeszcze salonu",
        },
      },
    ],
    products: [],
    featured: true,
  },
  */

  {
    id: "single-family-hechingen",
    title: { en: "Single-family home, Hechingen", de: "Einfamilienhaus, Hechingen", pl: "Dom jednorodzinny, Hechingen" },
    location: "Hechingen",
    year: 2025,
    categories: ["windows", "roller-shutters", "insect-screens"],
    summary: {
      en: "Full window replacement on a 1980s house whose frames no longer closed against the weather. Fourteen openings in PVC with triple glazing, front-mounted shutter boxes reusing the existing reveals, and pleated insect screens on the two garden doors.",
      de: "Kompletter Fenstertausch an einem Haus aus den 1980ern, dessen Rahmen nicht mehr dicht schlossen. Vierzehn Öffnungen in Kunststoff mit Dreifachverglasung, Vorbaurollladenkästen in den vorhandenen Laibungen und Insektenschutz-Plissees an den beiden Gartentüren.",
      pl: "Pełna wymiana okien w domu z lat 80., którego ramy nie domykały się już na pogodę. Czternaście otworów w PVC z potrójną szybą, skrzynki rolet elewacyjnych w istniejących wnękach i plisowane siatki na dwojgu drzwi ogrodowych.",
    },
    images: [
      {
        src: "/images/projects/single-family-hechingen-1.jpg",
        alt: { en: "Front elevation of the house after the window replacement", de: "Straßenansicht des Hauses nach dem Fenstertausch", pl: "Front domu po wymianie okien" },
      },
      {
        src: "/images/projects/single-family-hechingen-2.jpg",
        alt: { en: "Living room window with the roller shutter half lowered", de: "Wohnzimmerfenster mit halb heruntergelassenem Rollladen", pl: "Okno salonu z do połowy opuszczoną roletą" },
      },
      {
        src: "/images/projects/single-family-hechingen-3.jpg",
        alt: { en: "Garden door with a pleated insect screen fitted", de: "Gartentür mit montiertem Insektenschutz-Plissee", pl: "Drzwi ogrodowe z zamontowaną siatką plisowaną" },
      }],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "roller-shutter-front-mounted"],
    // La mosquitera de la foto sale del catálogo: se enlaza a su
    // modelo, no a una ficha que ya no existe.
    models: [{ catalogue: "rollladen-drutex", id: "insektenschutz-plisee" }],
    featured: true,
  },
  {
    id: "apartment-block-balingen",
    title: { en: "Apartment block, Balingen", de: "Mehrfamilienhaus, Balingen", pl: "Blok mieszkalny, Balingen" },
    location: "Balingen",
    year: 2025,
    categories: ["windows", "entrance-doors"],
    summary: {
      en: "Eight flats over four floors, fitted in two phases so the building stayed occupied. Aluminium windows on the street side for the acoustic rating, PVC to the courtyard, and a single insulated entrance door with a controlled-access strike.",
      de: "Acht Wohnungen auf vier Etagen, montiert in zwei Abschnitten, damit das Haus bewohnt blieb. Aluminiumfenster zur Straße wegen des Schallschutzes, Kunststoff zum Hof, und eine gedämmte Hauseingangstür mit Türöffner mit Zutrittskontrolle.",
      pl: "Osiem mieszkań na czterech piętrach, montaż w dwóch etapach, żeby budynek pozostał zamieszkany. Okna aluminiowe od ulicy ze względu na akustykę, PVC od podwórza i jedna ocieplona brama wejściowa z elektrozaczepem z kontrolą dostępu.",
    },
    images: [
      {
        src: "/images/projects/apartment-block-balingen-1.jpg",
        alt: { en: "Street facade of the apartment block with new aluminium windows", de: "Straßenfassade des Mehrfamilienhauses mit neuen Aluminiumfenstern", pl: "Elewacja bloku od ulicy z nowymi oknami aluminiowymi" },
      },
      {
        src: "/images/projects/apartment-block-balingen-2.jpg",
        alt: { en: "The new insulated entrance door of the apartment block", de: "Die neue gedämmte Hauseingangstür des Mehrfamilienhauses", pl: "Nowa ocieplona brama wejściowa bloku" },
      },
      {
        src: "/images/projects/apartment-block-balingen-3.jpg",
        alt: { en: "Courtyard elevation with the replacement PVC windows", de: "Hofseite mit den neuen Kunststofffenstern", pl: "Elewacja od podwórza z nowymi oknami PVC" },
      }],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [],
    // La puerta salió del catálogo, así que se enlaza a su modelo.
    models: [{ catalogue: "roka-select-2025", id: "select-20" }],
    featured: true,
  },
  {
    id: "farmhouse-burladingen",
    title: { en: "Converted farmhouse, Burladingen", de: "Umgebautes Bauernhaus, Burladingen", pl: "Przebudowany dom wiejski, Burladingen" },
    location: "Burladingen",
    year: 2024,
    categories: ["windows", "interior-doors"],
    summary: {
      en: "A barn conversion where the openings were irregular and none of them square. Every element was measured individually and made to size in wood-aluminium, with oak on the room side to match the exposed structure. Interior doors were hung wall-flush.",
      de: "Ein Scheunenumbau mit unregelmäßigen, nie rechtwinkligen Öffnungen. Jedes Element wurde einzeln aufgemessen und in Holz-Aluminium nach Maß gefertigt, raumseitig in Eiche passend zum sichtbaren Gebälk. Die Innentüren wurden wandbündig gehängt.",
      pl: "Adaptacja stodoły z nieregularnymi, nigdy prostokątnymi otworami. Każdy element zmierzono osobno i wykonano na wymiar w drewno-aluminium, od strony pokoju w dębie pasującym do odsłoniętej konstrukcji. Drzwi wewnętrzne zawieszono licując ze ścianą.",
    },
    images: [
      {
        src: "/images/projects/farmhouse-burladingen-1.jpg",
        alt: { en: "Converted barn with wood-aluminium windows in irregular openings", de: "Umgebaute Scheune mit Holz-Aluminium-Fenstern in unregelmäßigen Öffnungen", pl: "Przebudowana stodoła z oknami drewno-aluminiowymi w nieregularnych otworach" },
      },
      {
        src: "/images/projects/farmhouse-burladingen-2.jpg",
        alt: { en: "Oak window reveal seen from inside the converted farmhouse", de: "Eichenlaibung von innen im umgebauten Bauernhaus", pl: "Dębowa wnęka okienna od środka przebudowanego domu" },
      },
      {
        src: "/images/projects/farmhouse-burladingen-3.jpg",
        alt: { en: "Wall-flush interior door in the converted farmhouse", de: "Wandbündige Innentür im umgebauten Bauernhaus", pl: "Drzwi wewnętrzne licujące ze ścianą w przebudowanym domu" },
      }],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [],
    featured: true,
  },
  {
    id: "townhouse-albstadt",
    title: { en: "Townhouse, Albstadt", de: "Reihenhaus, Albstadt", pl: "Dom szeregowy, Albstadt" },
    location: "Albstadt",
    year: 2024,
    categories: ["entrance-doors", "gates", "fences"],
    summary: {
      en: "Everything from the pavement to the front step, in one anthracite finish. An RC2 entrance door, a sliding driveway gate with its drive and safety edge, and matching aluminium fence panels set out from a site plan before production.",
      de: "Alles vom Gehweg bis zur Haustürstufe in einem Anthrazitton. Eine RC2-Haustür, ein Einfahrts-Schiebetor mit Antrieb und Sicherheitsleiste und passende Aluminium-Zaunfelder, vor der Fertigung nach Lageplan festgelegt.",
      pl: "Wszystko od chodnika po próg wejścia w jednym antracycie. Drzwi RC2, przesuwna brama wjazdowa z napędem i listwą bezpieczeństwa oraz pasujące aluminiowe przęsła, rozmierzone z planu przed produkcją.",
    },
    images: [
      {
        src: "/images/projects/townhouse-albstadt-1.jpg",
        alt: { en: "Townhouse entrance door in anthracite grey", de: "Haustür des Reihenhauses in Anthrazitgrau", pl: "Drzwi wejściowe szeregowca w antracycie" },
      },
      {
        src: "/images/projects/townhouse-albstadt-2.jpg",
        alt: { en: "Sliding driveway gate in the same anthracite finish", de: "Einfahrts-Schiebetor im selben Anthrazitton", pl: "Przesuwna brama wjazdowa w tym samym antracycie" },
      },
      {
        src: "/images/projects/townhouse-albstadt-3.jpg",
        alt: { en: "Aluminium fence panels along the front boundary", de: "Aluminium-Zaunfelder entlang der vorderen Grundstücksgrenze", pl: "Aluminiowe przęsła wzdłuż frontowej granicy działki" },
      }],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "sectional-garage-40",
      "sliding-gate-alu",
      "fence-horizontal-alu"],
    models: [{ catalogue: "roka-signature-2025", id: "edles-flussigmetall-01" }],
  },
  {
    id: "office-fitout-tuebingen",
    title: { en: "Office fit-out, Tübingen", de: "Büroausbau, Tübingen", pl: "Wykończenie biura, Tybinga" },
    location: "Tübingen",
    year: 2023,
    categories: ["windows", "interior-doors"],
    summary: {
      en: "A first-floor office where the requirement was acoustic rather than thermal. Aluminium windows with asymmetric glazing to the main road, and interior doors with a 32 dB rating between the meeting rooms.",
      de: "Ein Büro im ersten Stock, wo es um Schallschutz statt Wärmeschutz ging. Aluminiumfenster mit asymmetrischer Verglasung zur Hauptstraße und Innentüren mit 32 dB zwischen den Besprechungsräumen.",
      pl: "Biuro na pierwszym piętrze, gdzie liczyła się akustyka, nie termika. Okna aluminiowe z asymetrycznym pakietem od strony głównej drogi i drzwi wewnętrzne o izolacyjności 32 dB między salami spotkań.",
    },
    images: [
      {
        src: "/images/projects/office-fitout-tuebingen-1.jpg",
        alt: { en: "Office windows facing the main road in Tübingen", de: "Bürofenster zur Hauptstraße in Tübingen", pl: "Okna biura od głównej drogi w Tybindze" },
      },
      {
        src: "/images/projects/office-fitout-tuebingen-2.jpg",
        alt: { en: "Acoustic interior door between two meeting rooms", de: "Schallschutz-Innentür zwischen zwei Besprechungsräumen", pl: "Akustyczne drzwi wewnętrzne między dwiema salami spotkań" },
      },
      {
        src: "/images/projects/office-fitout-tuebingen-3.jpg",
        alt: { en: "Open-plan office area with the new aluminium windows", de: "Großraumbüro mit den neuen Aluminiumfenstern", pl: "Przestrzeń open space z nowymi oknami aluminiowymi" },
      }],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    // La puerta acústica de la foto era una ficha de ejemplo, ya
    // retirada; el proyecto de oficinas enlaza al sistema real de
    // puertas interiores de aluminio.
    products: [],
    models: [{ catalogue: "aussenturen", id: "system-mb-45-kalt" }],
  },
  {
    id: "bungalow-bisingen",
    title: { en: "Bungalow, Bisingen", de: "Bungalow, Bisingen", pl: "Dom parterowy, Bisingen" },
    location: "Bisingen",
    year: 2023,
    categories: ["windows", "roller-shutters", "gates"],
    summary: {
      en: "New build, so the shutter boxes were specified with the windows and built into the wall rather than added later. Motorised throughout, with the garage door on the same remote control set as the shutters.",
      de: "Neubau — die Rollladenkästen wurden mit den Fenstern spezifiziert und eingemauert statt nachgerüstet. Durchgehend motorisiert, das Garagentor auf demselben Handsender-Set wie die Rollläden.",
      pl: "Nowy budynek — skrzynki rolet zaplanowano razem z oknami i wmurowano, zamiast dokładać później. Wszystko z napędem, brama garażowa na tym samym zestawie pilotów co rolety.",
    },
    images: [
      {
        src: "/images/projects/bungalow-bisingen-1.jpg",
        alt: { en: "Newly built bungalow with built-in roller shutter boxes", de: "Neu gebauter Bungalow mit eingebauten Rollladenkästen", pl: "Nowo wybudowany dom parterowy z wbudowanymi skrzynkami rolet" },
      },
      {
        src: "/images/projects/bungalow-bisingen-2.jpg",
        alt: { en: "Sectional garage door on the bungalow", de: "Sektionaltor am Bungalow", pl: "Brama segmentowa w domu parterowym" },
      },
      {
        src: "/images/projects/bungalow-bisingen-3.jpg",
        alt: { en: "Large window opening onto the terrace of the bungalow", de: "Großes Fenster zur Terrasse des Bungalows", pl: "Duże okno otwierające się na taras parterowego domu" },
      }],
    /** Modelos instalados, para enlazar a sus fichas desde el detalle. */
    products: [
      "roller-shutter-concealed",
      "side-hinged-garage"],
  }];
