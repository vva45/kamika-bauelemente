/**
 * OBRAS REALES DE KAMIKA. Ni una inventada.
 *
 * Las diecisiete entradas salen de las fotos que mandó el dueño (agosto
 * de 2026) más lo que él dijo de cada una: ciudad, mes y qué se montó.
 * Los seis proyectos de ejemplo que había aquí se borraron el mismo día,
 * con sus imágenes.
 *
 * REGLA AL AÑADIR: el texto describe lo que se ve en la foto y lo que el
 * dueño confirmó, y nada más. Nada de "triple acristalamiento" ni de
 * marcas si no está impreso o dicho — un proyecto es la prueba de que el
 * trabajo existe, y una frase inventada se la carga entera.
 *
 * Las veintiuna fotos del lote están colocadas: las 06 y 07 llegaron
 * después (Hechingen), y la 09 se unió a la 13 porque son la misma
 * casa — lo confirmó el dueño.
 */
import type { Project } from "./types";

export const PROJECTS: Project[] = [
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
      en: "A new single-family home where the living room opens to the garden through a two-panel HST lift-and-slide door in anthracite, the sliding sash carrying an industrial glazing-bar grid. Fitted in February 2026, while the interior was still being finished.",
      de: "Ein neues Einfamilienhaus, dessen Wohnraum sich über eine zweiteilige HST-Hebe-Schiebetür in Anthrazit zum Garten öffnet — der Schiebeflügel mit Sprossen im Industrie-Look. Montiert im Februar 2026, noch während des Innenausbaus.",
      pl: "Nowy dom jednorodzinny, którego salon otwiera się na ogród dwuczęściowymi podnoszono-przesuwnymi drzwiami HST w antracycie — skrzydło przesuwne ze szprosami w industrialnym stylu. Montaż w lutym 2026, jeszcze w trakcie wykańczania wnętrza.",
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
  {
    id: "altensteig-fenster-raffstore",
    title: {
      en: "Window with external venetian blind, Altensteig",
      de: "Fenster mit Raffstore, Altensteig",
      pl: "Okno z żaluzją fasadową, Altensteig",
    },
    location: "Altensteig",
    year: 2026,
    categories: ["windows", "roller-shutters"],
    summary: {
      en: "A wide anthracite element on a new build, with an external venetian blind above it, fitted in February 2026 while the ground outside was still bare subsoil. The shading was planned with the window rather than added afterwards, which is why the head box sits flush in the reveal.",
      de: "Ein breites Element in Anthrazit an einem Neubau, darüber der außenliegende Raffstore, montiert im Februar 2026, als draußen noch das Rohplanum lag. Die Beschattung wurde mit dem Fenster geplant und nicht nachgerüstet — deshalb sitzt der Kasten bündig in der Laibung.",
      pl: "Szeroki element w antracycie w nowym budynku, nad nim zewnętrzna żaluzja fasadowa; montaż w lutym 2026, gdy teren wokół był jeszcze surowy. Osłona była zaplanowana razem z oknem, nie dołożona później — dlatego skrzynka siedzi równo we wnęce.",
    },
    images: [
      {
        src: "/images/projects/altensteig-fenster-raffstore-1.jpg",
        alt: {
          en: "Black external venetian blind half lowered over a wide anthracite window on a new build",
          de: "Schwarzer Raffstore halb heruntergelassen über einem breiten Anthrazit-Element am Neubau",
          pl: "Czarna żaluzja fasadowa do połowy opuszczona nad szerokim antracytowym oknem w nowym domu",
        },
      },
    ],
    // Sin lista de modelos: la ficha que enlazaba era uno de los
    // productos de EJEMPLO retirados en 2026-08 — una obra real no
    // puede apuntar a una ficha inventada. Cuando el proveedor mande
    // el modelo exacto de este Raffstore, se enlaza con `models`.
    featured: true,
  },
  {
    id: "altensteig-rundbogenfenster",
    title: {
      en: "Arched windows, Altensteig",
      de: "Rundbogenfenster, Altensteig",
      pl: "Okna łukowe, Altensteig",
    },
    location: "Altensteig",
    year: 2026,
    categories: ["windows"],
    summary: {
      en: "Two arched windows in anthracite with glazing bars, set into the bare shell in February 2026. An arch is made to the measured opening, so the element follows the masonry — not the other way round.",
      de: "Zwei Rundbogenfenster in Anthrazit mit Sprossen, im Februar 2026 in den Rohbau gesetzt. Ein Bogen wird nach Aufmaß gefertigt: das Element folgt dem Mauerwerk, nicht umgekehrt.",
      pl: "Dwa okna łukowe w antracycie ze szprosami, osadzone w stanie surowym w lutym 2026. Łuk wykonuje się na wymiar — to element dopasowuje się do muru, nie odwrotnie.",
    },
    images: [
      {
        src: "/images/projects/altensteig-rundbogenfenster-1.jpg",
        alt: {
          en: "Two anthracite arched windows in an unrendered concrete wall",
          de: "Zwei anthrazitfarbene Rundbogenfenster in einer noch unverputzten Betonwand",
          pl: "Dwa antracytowe okna łukowe w nieotynkowanej ścianie betonowej",
        },
      },
    ],
    products: [],
  },
  {
    id: "wehingen-tueren-fenster",
    title: {
      en: "Doors and windows, Wehingen",
      de: "Türen und Fenster, Wehingen",
      pl: "Drzwi i okna, Wehingen",
    },
    location: "Wehingen",
    year: 2026,
    categories: ["windows", "patio-doors"],
    summary: {
      en: "Windows and doors as one package for a house with a curved roof: white elements with glazing bars, a two-leaf terrace door onto the covered seating area, and a small arched window beside it. Fitted in March 2026.",
      de: "Fenster und Türen als ein Paket für ein Haus mit geschwungenem Dach: weiße Elemente mit Sprossen, eine zweiflügelige Terrassentür zum überdachten Sitzplatz und daneben ein kleines Rundbogenfenster. Montiert im März 2026.",
      pl: "Okna i drzwi w jednym pakiecie dla domu z wygiętym dachem: białe elementy ze szprosami, dwuskrzydłowe drzwi tarasowe na zadaszony taras i mniejsze okno łukowe obok. Montaż w marcu 2026.",
    },
    images: [
      {
        src: "/images/projects/wehingen-tueren-fenster-1.jpg",
        alt: {
          en: "Yellow house with a curved roof, white windows with glazing bars and a two-leaf terrace door",
          de: "Gelbes Haus mit geschwungenem Dach, weiße Sprossenfenster und zweiflügelige Terrassentür",
          pl: "Żółty dom z wygiętym dachem, białe okna ze szprosami i dwuskrzydłowe drzwi tarasowe",
        },
      },
    ],
    products: [],
    featured: true,
  },
  {
    id: "dotternhausen-fenster",
    title: {
      en: "Windows, Dotternhausen",
      de: "Fenster, Dotternhausen",
      pl: "Okna, Dotternhausen",
    },
    location: "Dotternhausen",
    year: 2026,
    categories: ["windows"],
    summary: {
      en: "A three-part window band in anthracite with an aluminium sill, fitted in March 2026. The joint is still masked with tape in the photo: it was taken straight after installation, before the render was made good.",
      de: "Ein dreiteiliges Fensterband in Anthrazit mit Aluminium-Fensterbank, montiert im März 2026. Die Anschlussfuge ist auf dem Bild noch abgeklebt — die Aufnahme entstand direkt nach dem Einbau, vor dem Ausbessern des Putzes.",
      pl: "Trzyczęściowy pas okienny w antracycie z aluminiowym parapetem, montaż w marcu 2026. Na zdjęciu połączenie jest jeszcze zaklejone taśmą — zdjęcie zrobiono zaraz po montażu, przed poprawkami tynku.",
    },
    images: [
      {
        src: "/images/projects/dotternhausen-fenster-1.jpg",
        alt: {
          en: "Three-part anthracite window with an aluminium sill under a timber soffit",
          de: "Dreiteiliges Anthrazit-Fenster mit Aluminium-Fensterbank unter einem Holzdachüberstand",
          pl: "Trzyczęściowe antracytowe okno z aluminiowym parapetem pod drewnianym okapem",
        },
      },
    ],
    products: [],
  },
  {
    id: "dotternhausen-balkontuer",
    title: {
      en: "Balcony door, Dotternhausen",
      de: "Balkontür, Dotternhausen",
      pl: "Drzwi balkonowe, Dotternhausen",
    },
    location: "Dotternhausen",
    year: 2026,
    categories: ["patio-doors"],
    summary: {
      en: "A balcony door with a fixed trapezoidal light under the roof pitch, fitted in March 2026. The trapezium is made to the angle of the roof, which is why it closes the opening flush instead of leaving a blind panel above it.",
      de: "Eine Balkontür mit festem Trapezteil unter der Dachschräge, montiert im März 2026. Das Trapez wird nach dem Winkel des Daches gefertigt — deshalb schließt es die Öffnung bündig, statt ein Blindfeld darüber zu lassen.",
      pl: "Drzwi balkonowe ze stałym elementem trapezowym pod skosem dachu, montaż w marcu 2026. Trapez wykonuje się pod kąt dachu — dzięki temu zamyka otwór równo, bez ślepego pola nad nim.",
    },
    images: [
      {
        src: "/images/projects/dotternhausen-balkontuer-1.jpg",
        alt: {
          en: "Balcony door with a trapezoidal fixed light following the roof pitch, seen from the attic room",
          de: "Balkontür mit trapezförmigem Festteil entlang der Dachschräge, vom Dachzimmer aus gesehen",
          pl: "Drzwi balkonowe z trapezowym elementem stałym wzdłuż skosu dachu, widziane z poddasza",
        },
      },
    ],
    products: [],
  },
  {
    id: "balingen-arztpraxis",
    title: {
      en: "Doctor's practice, Balingen",
      de: "Arztpraxis, Balingen",
      pl: "Gabinet lekarski, Balingen",
    },
    location: "Balingen",
    year: 2026,
    categories: ["entrance-doors", "windows"],
    summary: {
      en: "Two entrance assemblies for a medical practice: white doors with fixed side lights and transom lights over them, one glazed dark to the street and one satin for the waiting area. Fitted in January 2026.",
      de: "Zwei Eingangsanlagen für eine Arztpraxis: weiße Türen mit festen Seitenteilen und Oberlichtern, eine zur Straße dunkel verglast, die andere satiniert für den Wartebereich. Montiert im Januar 2026.",
      pl: "Dwa zespoły wejściowe dla gabinetu lekarskiego: białe drzwi ze stałymi doświetlami bocznymi i naświetlami górnymi, jedno przeszklenie ciemne od ulicy, drugie satynowe przy poczekalni. Montaż w styczniu 2026.",
    },
    images: [
      {
        src: "/images/projects/balingen-arztpraxis-1.jpg",
        alt: {
          en: "White entrance assembly with dark glazing and transom lights on the street side",
          de: "Weiße Eingangsanlage mit dunkler Verglasung und Oberlichtern zur Straße",
          pl: "Biały zespół wejściowy z ciemnym przeszkleniem i naświetlami od ulicy",
        },
      },
      {
        src: "/images/projects/balingen-arztpraxis-2.jpg",
        alt: {
          en: "The second entrance being sealed by the fitter, with satin glazing",
          de: "Die zweite Eingangsanlage mit satinierter Verglasung, beim Abdichten durch den Monteur",
          pl: "Drugi zespół wejściowy z satynowym przeszkleniem, uszczelniany przez montera",
        },
      },
      {
        src: "/images/projects/balingen-arztpraxis-3.jpg",
        alt: {
          en: "The same assembly seen from inside the practice",
          de: "Dieselbe Anlage von innen, aus der Praxis gesehen",
          pl: "Ten sam zespół widziany od środka gabinetu",
        },
      },
    ],
    products: [],
    featured: true,
  },
  {
    id: "balingen-einfamilienhaus",
    title: {
      en: "Single-family home, Balingen",
      de: "Einfamilienhaus, Balingen",
      pl: "Dom jednorodzinny, Balingen",
    },
    location: "Balingen",
    year: 2026,
    categories: ["windows"],
    summary: {
      en: "Anthracite windows to the dormer, the gable and the ground floor, fitted in January 2026. The skip is still standing in front of the house in the photo — it was taken on the day, not out of a brochure.",
      de: "Fenster in Anthrazit an Gaube, Giebel und Erdgeschoss, montiert im Januar 2026. Auf dem Bild steht der Container noch vor dem Haus: die Aufnahme ist vom Montagetag, nicht aus dem Prospekt.",
      pl: "Okna w antracycie w lukarnie, na szczycie i na parterze, montaż w styczniu 2026. Na zdjęciu przed domem stoi jeszcze kontener — zdjęcie z dnia montażu, nie z folderu.",
    },
    images: [
      {
        src: "/images/projects/balingen-einfamilienhaus-1.jpg",
        alt: {
          en: "White house with new anthracite windows in the gable and the dormer",
          de: "Weißes Haus mit neuen Anthrazit-Fenstern in Giebel und Gaube",
          pl: "Biały dom z nowymi antracytowymi oknami na szczycie i w lukarnie",
        },
      },
    ],
    products: [],
  },
  {
    id: "balingen-gartenseite",
    title: {
      en: "Garden side, Balingen",
      de: "Gartenseite, Balingen",
      pl: "Strona ogrodowa, Balingen",
    },
    location: "Balingen",
    year: 2026,
    categories: ["windows", "patio-doors"],
    summary: {
      en: "The garden side of a house as one package: anthracite windows on the ground floor and along the upper storey, the white door onto the terrace, and the window under the awning with its granite sill. Fitted in January 2026.",
      de: "Die Gartenseite eines Wohnhauses als ein Paket: Fenster in Anthrazit im Erdgeschoss und im Obergeschoss, die weiße Tür auf die Terrasse und das Fenster unter der Markise mit seiner Granit-Fensterbank. Montiert im Januar 2026.",
      pl: "Ogrodowa strona domu w jednym pakiecie: antracytowe okna na parterze i na piętrze, białe drzwi na taras oraz okno pod markizą z granitowym parapetem. Montaż w styczniu 2026.",
    },
    images: [
      {
        src: "/images/projects/balingen-gartenseite-1.jpg",
        alt: {
          en: "Garden facade with anthracite windows, a white terrace door and an awning over the terrace",
          de: "Gartenfassade mit Anthrazit-Fenstern, weißer Terrassentür und Markise über der Terrasse",
          pl: "Elewacja ogrodowa z antracytowymi oknami, białymi drzwiami tarasowymi i markizą nad tarasem",
        },
      },
      {
        src: "/images/projects/balingen-gartenseite-2.jpg",
        alt: {
          en: "The window under the awning, with its granite sill, seen straight on",
          de: "Das Fenster unter der Markise mit Granit-Fensterbank, frontal aufgenommen",
          pl: "Okno pod markizą z granitowym parapetem, ujęcie od frontu",
        },
      },
    ],
    products: [],
  },
  {
    id: "balingen-wohnraumfenster",
    title: {
      en: "Living-room window, Balingen",
      de: "Wohnraumfenster, Balingen",
      pl: "Okno salonu, Balingen",
    },
    location: "Balingen",
    year: 2026,
    categories: ["windows"],
    summary: {
      en: "A large fixed light onto the covered seating area, fitted in January 2026 while the room was still being worked on. The photo shows the sealing tape and the open reveal — what an installation looks like before the plaster and the sill.",
      de: "Ein großes Festelement zum überdachten Sitzplatz, montiert im Januar 2026, während der Raum noch im Ausbau war. Auf dem Bild sind das Dichtband und die offene Laibung zu sehen — so sieht die Montage aus, bevor Putz und Fensterbank kommen.",
      pl: "Duże okno stałe na zadaszone miejsce wypoczynkowe, montaż w styczniu 2026, gdy pomieszczenie było jeszcze w budowie. Na zdjęciu widać taśmę uszczelniającą i otwartą wnękę — tak wygląda montaż przed tynkiem i parapetem.",
    },
    images: [
      {
        src: "/images/projects/balingen-wohnraumfenster-1.jpg",
        alt: {
          en: "Large white fixed window in an unfinished room, with the covered seating area behind it",
          de: "Großes weißes Festelement im noch unfertigen Raum, dahinter der überdachte Sitzplatz",
          pl: "Duże białe okno stałe w niewykończonym pomieszczeniu, za nim zadaszone miejsce wypoczynkowe",
        },
      },
    ],
    products: [],
  },
  {
    id: "albstadt-haustuer",
    title: {
      en: "Entrance door, Albstadt",
      de: "Haustür, Albstadt",
      pl: "Drzwi wejściowe, Albstadt",
    },
    location: "Albstadt",
    year: 2026,
    categories: ["entrance-doors"],
    summary: {
      en: "A white entrance door with a fan light and satin glazed panels, photographed from the hallway so the hinges and the handle are visible. Fitted in January 2026.",
      de: "Eine weiße Haustür mit Fächer-Oberlicht und satinierten Feldern, vom Flur aus aufgenommen — Bänder und Drücker sind zu sehen. Montiert im Januar 2026.",
      pl: "Białe drzwi wejściowe z wachlarzowym naświetlem i satynowymi polami, sfotografowane od strony przedpokoju — widać zawiasy i klamkę. Montaż w styczniu 2026.",
    },
    images: [
      {
        src: "/images/projects/albstadt-haustuer-1.jpg",
        alt: {
          en: "White entrance door with a fan light, seen from inside the hallway",
          de: "Weiße Haustür mit Fächer-Oberlicht, vom Flur aus gesehen",
          pl: "Białe drzwi wejściowe z wachlarzowym naświetlem, widziane z przedpokoju",
        },
      },
    ],
    products: [],
  },
  {
    id: "neuffen-haustuer",
    title: {
      en: "Entrance door, Neuffen",
      de: "Haustür, Neuffen",
      pl: "Drzwi wejściowe, Neuffen",
    },
    location: "Neuffen",
    year: 2026,
    categories: ["entrance-doors"],
    summary: {
      en: "An anthracite entrance door with two side lights and a transom light, fitted in February 2026. The leaf carries satin panels and stainless inlays, and the left side light a cat flap — the house's requirement, not the catalogue's.",
      de: "Eine Haustür in Anthrazit mit zwei Seitenteilen und Oberlicht, montiert im Februar 2026. Das Türblatt mit satinierten Feldern und Edelstahl-Applikationen, im linken Seitenteil eine Katzenklappe — der Wunsch des Hauses, nicht des Katalogs.",
      pl: "Antracytowe drzwi wejściowe z dwoma doświetlami bocznymi i naświetlem, montaż w lutym 2026. Skrzydło z satynowymi polami i aplikacjami ze stali nierdzewnej, w lewym doświetlu drzwiczki dla kota — wymóg domu, nie katalogu.",
    },
    images: [
      {
        src: "/images/projects/neuffen-haustuer-1.jpg",
        alt: {
          en: "Anthracite entrance door with two side lights, a transom light and a cat flap",
          de: "Anthrazitfarbene Haustür mit zwei Seitenteilen, Oberlicht und Katzenklappe",
          pl: "Antracytowe drzwi wejściowe z dwoma doświetlami, naświetlem i drzwiczkami dla kota",
        },
      },
    ],
    products: [],
    featured: true,
  },
  {
    id: "hechingen-haustuer",
    title: {
      en: "Entrance door, Hechingen",
      de: "Haustür, Hechingen",
      pl: "Drzwi wejściowe, Hechingen",
    },
    location: "Hechingen",
    year: 2025,
    categories: ["entrance-doors"],
    summary: {
      en: "An anthracite entrance door with a stainless pull handle and a glazed strip, plus a narrow side light, set in a porch clad in split stone. Fitted in September 2025.",
      de: "Eine Haustür in Anthrazit mit Edelstahl-Stoßgriff und Lichtausschnitt, dazu ein schmales Seitenteil, im Windfang aus Bruchsteinriemchen. Montiert im September 2025.",
      pl: "Antracytowe drzwi wejściowe ze stalowym pochwytem i przeszkloną listwą oraz wąskim doświetlem, we wnęce wyłożonej łupanym kamieniem. Montaż we wrześniu 2025.",
    },
    images: [
      {
        src: "/images/projects/hechingen-haustuer-1.jpg",
        alt: {
          en: "Anthracite entrance door with a stainless pull handle in a stone-clad porch",
          de: "Anthrazitfarbene Haustür mit Edelstahl-Stoßgriff im steinverkleideten Windfang",
          pl: "Antracytowe drzwi wejściowe ze stalowym pochwytem we wnęce obłożonej kamieniem",
        },
      },
    ],
    products: [],
  },
  {
    /**
     * El mes lo puso el dueño a ojo —"pon diciembre, que hay nieve"— y
     * es suyo el dato, no una invención de la web: no hay nada en la
     * foto que lo contradiga y él es quien hizo la obra.
     */
    // El dueño precisó en agosto de 2026 que son PUERTAS de balcón, no
    // ventanas: gama, título y resumen se corrigieron con su palabra
    // (la primera versión decía "Balkonfenster").
    id: "hechingen-balkontueren",
    title: {
      en: "Balcony doors, Hechingen",
      de: "Balkontüren, Hechingen",
      pl: "Drzwi balkonowe, Hechingen",
    },
    location: "Hechingen",
    year: 2025,
    categories: ["patio-doors"],
    summary: {
      en: "Balcony doors in a dark timber tone — a three-part element photographed from inside in December 2025, with snow still on the roof opposite. The middle leaf opens onto the balcony, the outer two are fixed.",
      de: "Balkontüren in dunklem Holzton — ein dreiteiliges Element, im Dezember 2025 von innen aufgenommen, mit Schnee auf dem gegenüberliegenden Dach. Der mittlere Flügel öffnet zum Balkon, die beiden äußeren sind fest.",
      pl: "Drzwi balkonowe w ciemnym odcieniu drewna — trzyczęściowy element sfotografowany od środka w grudniu 2025, ze śniegiem na dachu naprzeciwko. Skrzydło środkowe otwiera się na balkon, dwa boczne są stałe.",
    },
    images: [
      {
        src: "/images/projects/hechingen-balkontueren-1.jpg",
        alt: {
          en: "Three-part balcony doors in a dark timber tone, seen from inside",
          de: "Dreiteilige Balkontüren in dunklem Holzton, von innen gesehen",
          pl: "Trzyczęściowe drzwi balkonowe w ciemnym drewnie, widziane od środka",
        },
      },
    ],
    products: [],
  },
  {
    id: "hechingen-hauseingang",
    title: {
      en: "House entrance, Hechingen",
      de: "Hauseingang, Hechingen",
      pl: "Wejście do domu, Hechingen",
    },
    location: "Hechingen",
    year: 2025,
    categories: ["entrance-doors"],
    summary: {
      en: "An entrance in a light timber tone: the leaf with vertical battens, a fixed side light in textured glass and the letter plate set into it. Fitted in September 2025.",
      de: "Ein Hauseingang in hellem Holzton: das Türblatt mit senkrechten Leisten, ein festes Seitenteil in Strukturglas und der Briefeinwurf darin. Montiert im September 2025.",
      pl: "Wejście w jasnym odcieniu drewna: skrzydło z pionowymi listwami, stałe doświetle ze szkła strukturalnego i wrzutnia na listy w nim. Montaż we wrześniu 2025.",
    },
    images: [
      {
        src: "/images/projects/hechingen-hauseingang-1.jpg",
        alt: {
          en: "Open entrance door in light timber with a textured-glass side light and a letter plate",
          de: "Geöffnete Haustür in hellem Holzton mit Strukturglas-Seitenteil und Briefeinwurf",
          pl: "Otwarte drzwi wejściowe w jasnym drewnie z doświetlem ze szkła strukturalnego i wrzutnią",
        },
      },
    ],
    products: [],
  },
  {
    id: "balingen-haustuer-fenster",
    title: {
      en: "Entrance door and windows, Balingen",
      de: "Haustür und Fenster, Balingen",
      pl: "Drzwi wejściowe i okna, Balingen",
    },
    location: "Balingen",
    year: 2025,
    categories: ["entrance-doors", "windows"],
    summary: {
      en: "Door and windows as one package, delivered and fitted in October 2025: an anthracite entrance door with a stainless pull handle and a full-height side light, the stairwell window above it with satin panels, and the windows of the facade in the same colour.",
      de: "Tür und Fenster als ein Paket, geliefert und montiert im Oktober 2025: eine Haustür in Anthrazit mit Edelstahl-Stoßgriff und raumhohem Seitenteil, darüber das Treppenhausfenster mit satinierten Feldern, und die Fenster der Fassade im selben Ton.",
      pl: "Drzwi i okna w jednym pakiecie, dostarczone i zamontowane w październiku 2025: antracytowe drzwi wejściowe ze stalowym pochwytem i doświetlem na całą wysokość, nad nimi okno klatki schodowej z satynowymi polami, a na elewacji okna w tym samym kolorze.",
    },
    images: [
      {
        src: "/images/projects/balingen-haustuer-fenster-1.jpg",
        alt: {
          en: "House front with the anthracite entrance door, its side light and the stairwell window above",
          de: "Hausfront mit anthrazitfarbener Haustür, Seitenteil und darüberliegendem Treppenhausfenster",
          pl: "Front domu z antracytowymi drzwiami, doświetlem i oknem klatki schodowej nad nimi",
        },
      },
      {
        src: "/images/projects/balingen-haustuer-fenster-2.jpg",
        alt: {
          en: "Close view of the stairwell window with its satin panels and the timber cladding",
          de: "Nahaufnahme des Treppenhausfensters mit satinierten Feldern und Holzverkleidung",
          pl: "Zbliżenie okna klatki schodowej z satynowymi polami i drewnianą okładziną",
        },
      },
    ],
    products: [],
  },
  {
    id: "balingen-fenstertausch",
    title: {
      en: "Window replacement, Balingen",
      de: "Fenstertausch, Balingen",
      pl: "Wymiana okien, Balingen",
    },
    location: "Balingen",
    year: 2025,
    categories: ["windows"],
    summary: {
      en: "A two-leaf white window with a granite sill, fitted in November 2025 and photographed from inside. The sill is part of the delivery, not something added afterwards.",
      de: "Ein zweiflügeliges weißes Fenster mit Granit-Fensterbank, montiert im November 2025, von innen aufgenommen. Die Fensterbank gehört zur Lieferung und ist kein Nachtrag.",
      pl: "Dwuskrzydłowe białe okno z granitowym parapetem, montaż w listopadzie 2025, zdjęcie od środka. Parapet jest częścią dostawy, nie dodatkiem po fakcie.",
    },
    images: [
      {
        src: "/images/projects/balingen-fenstertausch-1.jpg",
        alt: {
          en: "Two-leaf white window with a granite sill, looking out onto the garden",
          de: "Zweiflügeliges weißes Fenster mit Granit-Fensterbank, Blick in den Garten",
          pl: "Dwuskrzydłowe białe okno z granitowym parapetem i widokiem na ogród",
        },
      },
    ],
    products: [],
  },
];
