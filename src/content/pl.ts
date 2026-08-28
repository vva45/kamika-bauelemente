/**
 * Traducción polaca. Generado por `npm run sync:i18n` desde `en.ts`.
 *
 * Mismas claves que `en.ts`, en el mismo orden. Rellena los valores y
 * borra el `// TODO` de la línea. Los textos del dueño van verbatim y
 * NO se retocan.
 *
 * No edites la estructura a mano: vuelve a ejecutar el script.
 */
import type { ContentKey } from "./en";

export const pl: Record<ContentKey, string> = {
  // ── Accesibilidad ────────────────────────────────────────────
  "a11y.skipToContent": "Przejdź do treści",
  "a11y.mainNavigation": "Nawigacja główna",
  "a11y.breadcrumb": "Ścieżka nawigacji",
  "a11y.openMenu": "Otwórz menu",
  "a11y.closeMenu": "Zamknij menu",
  "a11y.openProductsMenu": "Pokaż kategorie produktów",
  "a11y.footerNavigation": "Nawigacja w stopce",
  "a11y.opensInNewTab": "otwiera się w nowej karcie",

  // ── Navegación ───────────────────────────────────────────────
  "nav.products": "Produkty",
  "nav.catalogues": "Katalogi",
  "nav.projects": "Realizacje",
  "nav.colours": "Kolory",
  "nav.about": "O nas",
  // Marca del proveedor, no se traduce; enlace externo del programa
  // de partners de ROKA (ver rokaPartnerUrl en data/company.ts).
  "nav.rokaDoors": "ROKA Doors",
  "nav.contact": "Kontakt",
  "nav.allCategories": "Wszystkie kategorie",

  // ── Etiquetas de contacto ────────────────────────────────────
  "contact.phoneLabel": "Telefon",
  "contact.whatsappLabel": "WhatsApp",
  "contact.emailLabel": "E-mail",
  "contact.ownerLabel": "Właściciel",

  // ── Pie ──────────────────────────────────────────────────────
  "footer.productsHeading": "Produkty",
  "footer.companyHeading": "Firma",
  "footer.legalHeading": "Informacje prawne",
  "footer.imprint": "Impressum",
  "footer.privacy": "Polityka prywatności",
  "footer.rights": "Wszelkie prawa zastrzeżone.",
  "footer.blurb": "Okna, drzwi, rolety i elementy budowlane. Pomiar, dostawa i montaż w Hechingen i okolicach.",

  // ── Botones y etiquetas comunes ──────────────────────────────
  "common.viewAll": "Zobacz wszystkie",
  "common.viewProducts": "Zobacz produkty",
  "common.getInTouch": "Skontaktuj się",
  "common.contactUs": "Napisz do nas",

  // Reservada: regla de negocio para marcas de terceros — nunca se

  // enlaza a la web del fabricante, se autoaloja su PDF y este es el

  // botón secundario. Todavía no hay ninguna marca de terceros.
  "common.browse": "Przeglądaj",
  "common.download": "Pobierz",
  "common.openInNewTab": "Otwórz w nowej karcie",
  "common.comingSoon": "Wkrótce",

  // ── Hub de productos ─────────────────────────────────────────
  "products.eyebrow": "Grupy produktów",
  "products.title": "Produkty",
  "products.intro": "Osiem grup wokół otworu: element, jego osłona, siatka i okucia. Każda strona modelu pokazuje specyfikację i prowadzi do dokładnej strony katalogu.",
  "products.filterLabel": "Materiał",
  "products.filterAll": "Wszystkie materiały",

  // ── Materiales (etiquetas de filtro y de spec) ──────────────
  "material.pvc": "PVC",
  "material.aluminium": "Aluminium",
  "material.steel": "Stal",
  "material.wood": "Drewno",
  "material.wood-alu": "Drewno-aluminium",

  // ── Galería y lightbox ───────────────────────────────────────
  "gallery.viewImage": "Pokaż zdjęcie {index} z {total}",
  "gallery.openLightbox": "Otwórz zdjęcie na pełnym ekranie",
  "gallery.close": "Zamknij widok pełnoekranowy",
  "gallery.prev": "Poprzednie zdjęcie",
  "gallery.next": "Następne zdjęcie",

  // ── Producto ─────────────────────────────────────────────────
  "product.datasheet": "Karta techniczna",
  "product.sendEnquiry": "Wyślij zapytanie",
  "product.specifications": "Specyfikacja",
  "product.goesWellWith": "Dobrze pasuje do",
  "product.usedInProjects": "Zamontowane w tych realizacjach",
  "product.badgeNew": "Nowość",
  "product.badgeBestseller": "Bestseller",
  "product.modelsOne": "1 model",
  "product.modelsOther": "{count} modeli",

  // ── Home ─────────────────────────────────────────────────────
  "home.heroEyebrow": "Okna · Drzwi · Rolety · Hechingen",
  "home.heroTitle": "Okna, drzwi i rolety — porządnie zamontowane.",
  "home.heroSubtitle": "Mierzymy na miejscu, dostarczamy elementy i montujemy. PVC, aluminium, stal i drewno — jeden dostawca dla całego otworu.",
  "home.heroImageAlt": "Zamontowane okno w domu w okolicach Hechingen",
  "home.scrollHint": "Przewiń",
  "home.categoriesEyebrow": "Co dostarczamy",
  "home.categoriesTitle": "Wszystko, co zamyka otwór.",
  "home.categoriesIntro": "Osiem grup, jeden dostawca i jedna ekipa montażowa. Roleta jest planowana razem z oknem, a nie dokręcana później.",
  "home.cataloguesEyebrow": "Dokumentacja",
  "home.cataloguesTitle": "Przeglądaj katalogi",
  "home.cataloguesIntro": "Pełne kolekcje w PDF. Czytaj tutaj albo pobierz — bez formularza i bez adresu e-mail.",
  "home.projectsEyebrow": "Wykonane prace",
  "home.projectsTitle": "Ostatnie montaże",
  "home.projectsIntro": "Czego oczekiwał klient, co zamontowano i gdzie. To nasza wizytówka.",
  // Banner del programa de distribuidores ROKA (pedido del dueño).
  "home.rokaEyebrow": "Nasz partner od drzwi zewnętrznych",
  "home.rokaBody":
    "Wszystkie kolekcje ROKA na oficjalnej stronie partnerskiej — Signature, Steel, Select, Essential i Function, zawsze aktualne.",
  "home.coloursEyebrow": "Kolory i wykończenia",
  "home.coloursTitle": "RAL, dekory drewna i anodowane",
  "home.coloursIntro": "Ramy mogą mieć inny kolor wewnątrz i na zewnątrz — od RAL przez okleiny drewnopodobne po anodowane, każdy z oryginalnym kodem.",
  "home.howEyebrow": "Jak to przebiega",
  "home.howTitle": "Od pierwszej wizyty do ostatniej regulacji",
  "home.howStep1Title": "Doradztwo",
  "home.howStep1Body": "Oglądamy otwór, układ ściany i potrzeby pomieszczenia. Otrzymasz pisemną ofertę z profilem, szybą i okuciami.",
  "home.howStep2Title": "Pomiar",
  "home.howStep2Body": "Ostateczny pomiar wykonujemy na miejscu po przyjęciu oferty — nigdy z rysunku. Produkcja rusza z tych wymiarów.",
  "home.howStep3Title": "Montaż",
  "home.howStep3Body": "Stare elementy na zewnątrz, nowe do środka, uszczelnienie od wewnątrz i od zewnątrz. Dom jednorodzinny to zwykle jeden–dwa dni.",
  "home.howStep4Title": "Serwis",
  "home.howStep4Body": "Później regulacja, uszczelki, okucia i wymiana szyb. Dane zamówienia zostają u nas, żeby części zamienne pasowały po latach.",
  "home.ctaEyebrow": "Hechingen · Zollernalbkreis",
  "home.ctaTitle": "Opowiedz nam o swoim otworze.",
  "home.ctaBody": "Zadzwoń, napisz albo wyślij wymiary, które już masz. Odpowie Dominik, a nie call center.",
  "home.viewOnMap": "Zobacz w Google Maps",
  "map.showMap": "Pokaż mapę",
  "map.notice": "Mapa ładuje się dopiero na Twoje życzenie. Po jej wyświetleniu przeglądarka łączy się z Google Maps, a Google może zapisać pliki cookie.",
  "home.mapAlt": "Mapa z lokalizacją Kamika Bauelemente w Hechingen",
  "home.colourRenderAlt": "Rama okienna w wybranym kolorze",
  "home.colourHeroAlt": "Wachlarz próbek kolorów obok przekroju profilu okiennego",

  // ── Catálogos ────────────────────────────────────────────────
  "catalogue.pages": "stron",
  "catalogue.size": "MB",
  "catalogues.eyebrow": "Dokumentacja",
  "catalogues.title": "Katalogi",
  "catalogues.intro": "Pełne kolekcje w PDF. Czytaj w przeglądarce albo pobierz — bez formularza i bez adresu e-mail.",
  "catalogue.openCatalogue": "Otwórz katalog",
  "catalogue.viewerHint": "Kartkuj, powiększaj i drukuj przyciskami przeglądarki PDF.",
  "catalogue.mobileNote": "Przeglądarki w telefonach słabo wyświetlają osadzone PDF-y, więc katalog otworzy się w Twojej aplikacji PDF.",
  "catalogue.fallbackBody": "Ta przeglądarka nie potrafi wyświetlić PDF-a na stronie. Otwórz go w nowej karcie albo pobierz.",
  "catalogue.general": "Katalog ogólny",
  "catalogue.otherCatalogues": "Pozostałe katalogi",
  "catalogue.models": "Modele w tym katalogu",
  "catalogue.viewAllModels": "Zobacz wszystkie modele",
  "catalogue.modelCount": "{count} modeli",
  "catalogue.modelsIntro": "Każdy model z katalogu, prosto z jego stron. Otwórz, aby zobaczyć specyfikację i przejść do tej strony PDF-a.",
  "catalogue.fromCatalogue": "Z katalogu",
  "catalogue.openAtPage": "Otwórz katalog na stronie {page}",
  "catalogue.otherModels": "Inne modele z tego katalogu",
  "catalogue.modelsInCatalogue": "{count} modeli w tym katalogu",
  "catalogue.modelFamilies": "Serie",
  "catalogue.modelNote": "Zdjęcia i dane pochodzą z katalogu producenta. Zapytaj nas, które modele są dostępne, ile kosztują i jaki jest czas realizacji.",

  // ── Colecciones ──────────────────────────────────────────────
  "collection.heading": "Kolekcje",
  "collection.intro": "Każda kolekcja to katalog producenta. Otwórz ją, aby zobaczyć wszystkie modele — ze specyfikacją jak w druku i linkiem do dokładnej strony PDF-a.",
  "catalogue.comingSoonTitle": "Katalogi są w przygotowaniu",
  "catalogue.comingSoonBody": "Kolekcje PDF nie są jeszcze online. Zadzwoń albo napisz — wyślemy aktualną dokumentację e-mailem.",

  // ── Proyectos ────────────────────────────────────────────────
  "project.installed": "Zamontowano",
  "projects.eyebrow": "Wykonane prace",
  "projects.title": "Realizacje",
  "projects.intro": "Czego oczekiwał klient, co zamontowano i gdzie. Filtruj według grupy produktów albo roku.",
  "projects.filterCategory": "Grupa",
  "projects.filterYear": "Rok",
  "projects.filterAll": "Wszystkie",
  "projects.noMatch": "Żadna realizacja nie pasuje jeszcze do tego zestawienia.",
  "projects.comingSoonTitle": "Pierwsze realizacje są w opracowaniu",
  "projects.comingSoonBody": "Zbieramy zdjęcia zakończonych montaży. Zadzwoń albo napisz — pokażemy prace w Twojej okolicy.",
  "project.productsUsed": "Co zamontowano",
  "project.locationLabel": "Miejsce",
  "project.yearLabel": "Rok",
  "project.allProjects": "Wszystkie realizacje",

  // ── Sobre la empresa ─────────────────────────────────────────
  "about.eyebrow": "Hechingen · Zollernalbkreis",
  "about.title": "Jednoosobowa firma, która mierzy, dostarcza i montuje.",
  "about.intro": "Kamika Bauelemente dostarcza elementy budowlane do domów i mieszkań w Hechingen i okolicach: okna, drzwi tarasowe i zewnętrzne, rolety, siatki przeciw owadom, bramy, pergole i pasujące do nich okucia.",
  "about.companyHeading": "Firma",
  "about.companyBody1": "Każde zlecenie przebiega tak samo: otwór oglądamy na miejscu, oferta wymienia profil, szybę i okucia, a ostateczny pomiar wykonujemy dopiero po przyjęciu oferty. Niczego nie zamawiamy z rysunku.",
  "about.companyBody2": "Ponieważ cały otwór pochodzi od jednego dostawcy, skrzynka rolety, siatka i okno są planowane razem, a nie dokładane później — kolory do siebie pasują, a wymiary zgadzają się za pierwszym razem.",
  "about.companyBody3": "Po montażu ta sama osoba zajmuje się regulacją, uszczelkami, okuciami i wymianą szyb. Dane zamówienia zostają w archiwum, żeby części zamienne pasowały po latach.",
  "about.factsHeading": "W skrócie",
  "about.factLocationLabel": "Siedziba",
  "about.factAreaLabel": "Obszar działania",
  "about.factAreaValue": "Hechingen i promień ok. 150–200 km — po uzgodnieniu także dalej",
  "about.factRangesLabel": "Grupy",
  "about.factRangesValue": "{count} grup produktów, od okien po okucia",
  "about.factOwnerLabel": "Prowadzona przez",
  "about.ownerEyebrow": "O mnie",
  "about.ownerRole": "Właściciel",

  // Texto REAL del dueño (2026-08), traducido del alemán. El original

  // alemán está guardado TAL CUAL en de.ts, para publicarlo literal

  // cuando el sitio pase a alemán. Si se retoca la traducción, el

  // alemán no se toca: es su texto, no el nuestro.
  "about.ownerBody1": "Za marką Kamika stoją osobista opieka nad klientem, doświadczenie w branży oraz bezpośrednia współpraca ze sprawdzonymi producentami. Każdy projekt prowadzimy indywidualnie — od doradztwa i pomiaru, przez dobór właściwych produktów, po fachowy montaż i odbiór.",
  "about.ownerBody2": "Jako właściciel osobiście odpowiadam za jakość naszych rozwiązań i sprawny przebieg każdego projektu.",
  "about.factoryAlt": "Zakład produkcyjny, w którym powstają nasze okna i drzwi — widok z lotu ptaka",
  "about.factoryCaption": "Tu powstają elementy — zakład produkcyjny naszego dostawcy. Pomiar, zamówienie i montaż prowadzone z Hechingen.",
  "about.ownerPortraitAlt": "Portret Dominika Kamieńskiego, właściciela Kamika Bauelemente",

  // ── Colores y acabados ───────────────────────────────────────
  "colours.eyebrow": "Kolory i wykończenia",
  "colours.title": "Kolory i wykończenia",
  "colours.intro": "Ramy mogą mieć inny kolor wewnątrz i na zewnątrz. Lakiery proszkowe RAL, okleiny drewnopodobne, lazury, aluminium anodowane i numerowana paleta lameli — filtruj według wykończenia albo materiału.",
  "colours.filterGroup": "Wykończenie",
  "colours.filterMaterial": "Materiał",
  "colours.filterCatalogue": "Katalog",
  "colours.filterAll": "Wszystkie",
  "colours.groupRal": "RAL",
  "colours.groupWoodDecor": "Okleiny drewnopodobne",
  "colours.groupAnodised": "Anodowane",
  "colours.groupWoodStain": "Lazury",
  "colours.groupLamella": "Lamele rolet",
  "colours.groupSalFoil": "Okleiny Salamander",
  "colours.groupPvcFoil": "Okleiny dekoracyjne PCV",
  "colours.groupPowder": "Lakier proszkowy",
  "colours.groupGlass": "Szkło hartowane barwione",
  "colours.groupCeramic": "Ceramika",
  "colours.groupLiquidMetal": "Płynny metal",
  "colours.groupSpecial": "Specjalne",
  "colours.availableOn": "Dostępne na",
  "colours.noMatch": "Żadne wykończenie nie pasuje do tego zestawienia.",
  "colours.disclaimer": "Kolory na ekranie są orientacyjne: jasność, kalibracja i struktura powierzchni je zmieniają. Przed decyzją poproś o fizyczną próbkę.",
  "colours.count": "{count} wykończeń",
  "colours.standardSection": "Standardowe palety (RAL, dekory, anodowane)",
  "colours.standardChip": "Standardowa",
  "colours.glassEyebrow": "Przeszklenia",
  "colours.glassTitle": "Rodzaje szkła",
  "colours.glassIntro":
    "Szkło decyduje o charakterze całego okna lub drzwi: ile światła wpuszcza i ile prywatności zostaje w środku. To rodzaje szkła z naszych katalogów — każda próbka jest sfotografowana z obiektem za szybą, żeby można było samemu ocenić przezierność.",
  "colours.glassCount": "{count} rodzajów szkła",
  "colours.clickHint": "Kliknij dowolną próbkę, aby zobaczyć ją na oknie w podglądzie na górze.",
  "colours.approxTone": "Próbka jest rozciągnięta na ramę — skala struktury jest tylko poglądowa.",
  "colours.previewJump": "Zobacz na oknie",

  // ── Contacto ─────────────────────────────────────────────────
  "contactPage.eyebrow": "Hechingen · Zollernalbkreis",
  "contactPage.title": "Kontakt",
  "contactPage.intro": "Opisz otwór albo wyślij wymiary, które już masz. Odpowie Dominik, a nie call center.",
  "contactPage.formHeading": "Wyślij wiadomość",
  "contactPage.detailsHeading": "Kontakt bezpośredni",
  "contactPage.nameLabel": "Imię i nazwisko",
  "contactPage.emailLabel": "E-mail",
  "contactPage.phoneLabel": "Telefon (opcjonalnie)",
  "contactPage.productLabel": "Produkt, o który pytasz (opcjonalnie)",

  // La misma etiqueta, sin el "(optional)", para la línea del email que

  // recibe el dueño: allí no hay nada que sea opcional.
  "contactPage.productEmailLabel": "Produkt, o który pytasz",
  "contactPage.messageLabel": "Wiadomość",
  "contactPage.messagePlaceholder": "Rodzaj elementu, liczba otworów, przybliżone wymiary i termin.",
  "contactPage.consentLabel": "Zgadzam się na wykorzystanie moich danych do odpowiedzi na to zapytanie, zgodnie z",
  "contactPage.consentLink": "polityką prywatności",
  "contactPage.submit": "Wyślij wiadomość",
  "contactPage.sending": "Wysyłanie…",
  "contactPage.successTitle": "Wiadomość wysłana",
  "contactPage.successBody": "Dziękujemy — zapytanie dotarło. Odpowiedź otrzymasz zwykle w ciągu jednego dnia roboczego.",
  "contactPage.errorTitle": "Nie udało się wysłać wiadomości",
  "contactPage.errorBody": "Spróbuj ponownie albo zadzwoń pod numer na tej stronie.",
  "contactPage.fallbackTitle": "Twoja wiadomość jest gotowa — wybierz, jak ją wysłać",
  "contactPage.fallbackBody": "Strona nie potrafi jeszcze sama wysyłać e-maili, więc nic nie opuściło Twojej przeglądarki. Wiadomość jest gotowa poniżej: wyślij ją jednym dotknięciem albo skopiuj i wklej, gdzie chcesz.",
  "contactPage.fallbackAction": "Otwórz w aplikacji e-mail",
  "contactPage.fallbackWhatsApp": "Wyślij przez WhatsApp",
  "contactPage.fallbackCopy": "Skopiuj wiadomość",
  "contactPage.fallbackCopied": "Skopiowano",
  "contactPage.fallbackAddress": "Albo napisz na",
  "contactPage.fallbackNoMailApp": "Jeśli po naciśnięciu przycisku e-mail nic się nie dzieje, to urządzenie nie ma skonfigurowanej aplikacji pocztowej — skopiuj wiadomość i wklej ją w webmailu albo na czacie WhatsApp.",
  "contactPage.requiredMark": "pole wymagane",
  "contactPage.errorName": "Podaj imię, którym możemy się do Ciebie zwracać.",
  "contactPage.errorEmail": "Podaj prawidłowy adres e-mail.",
  "contactPage.errorMessage": "Opisz, czego potrzebujesz — przynajmniej kilka zdań.",
  "contactPage.errorConsent": "Bez tej zgody nie możemy odpowiedzieć e-mailem.",
  "contactPage.enquiryAbout": "Zapytanie o {product}",
  "contactPage.enquiryGeneral": "Zapytanie ze strony internetowej",

  // ── Página no encontrada ─────────────────────────────────────
  "notFound.eyebrow": "Błąd 404",
  "notFound.title": "Ta strona nie istnieje",
  "notFound.body": "Adres może zawierać literówkę albo strona została przeniesiona. Wszystko w serwisie jest stąd o jedno kliknięcie.",
  "notFound.backHome": "Wróć na stronę główną",

  // ── Fabricantes y sistemas ───────────────────────────────────
  "manufacturer.eyebrow": "Producent systemu",
  "manufacturer.systemCountOne": "1 system",
  "manufacturer.systemCountOther": "{count} systemów",
  "manufacturer.systemsHeading": "Systemy",
  "manufacturer.systemsIntro": "To, jakiego systemu potrzebuje otwór, zależy od układu ściany i od tego, co pomieszczenie ma spełniać. Decyduje o tym pomiar — te strony pokazują, do czego służy każdy system.",
  "manufacturer.chooseIntro": "Ta grupa jest wyceniana według systemu profili: najpierw producent, potem seria, potem wersja. Wybierz producenta, aby zobaczyć jego systemy.",
  "system.versionsTitle": "Wersje i specyfikacje",
  "system.versionsComingSoon": "Katalog producenta dla tego systemu jest w przygotowaniu. Do tego czasu zadzwoń albo napisz — wyślemy aktualną dokumentację i doradzimy, która wersja pasuje do Twojego otworu.",
  "system.otherSystems": "Inne systemy",
  "system.fromManufacturer": "System marki",

  // ── Categorías ───────────────────────────────────────────────
  "category.fromCataloguesIntro": "Prosto z katalogów producentów, pogrupowane tak, jak w druku. Każdy element otwiera katalog na stronie, z której pochodzi.",
  "category.typesHeading": "Rodzaje drzwi",
  "category.typesIntro": "Każdy rodzaj to osobna grupa z własnymi modelami, specyfikacjami i katalogami. Wybierz ten, który pasuje do otworu.",
  "category.comingSoonTitle": "Ta grupa jest w przygotowaniu",
  "category.pergolasBrandAlt1": "Pergola bioklimatyczna z dachem lamelowym i oświetleniem nad ogrodowym wypoczynkiem o zmierzchu",
  "category.pergolasBrandAlt2": "Przeszklona zabudowa zimą: czarna konstrukcja aluminiowa ze szklanym dachem nad pokojem tarasowym",
  "category.comingSoonBody": "Dostarczamy i montujemy tę grupę, ale strony katalogowe nie są jeszcze online. Zadzwoń albo napisz — wyślemy aktualną dokumentację.",
};
