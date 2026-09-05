/** Garagentore: puertas seccionales, batientes y enrollables. */
import { t, type ModelText } from "./helpers.ts";

export const GARAGENTORE_TEXT: Record<string, ModelText> = {
  // Familias
  "Sektionaltore": t("Sektionaltore", "Sectional doors", "Bramy segmentowe"),
  "Drehflügel-Garagentore": t("Drehflügel-Garagentore", "Side-hinged garage doors", "Bramy garażowe rozwierne"),
  "Rolltore und Rollgitter": t("Rolltore und Rollgitter", "Roller doors and roller grilles", "Bramy rolowane i kraty rolowane"),

  // Etiquetas
  "Antriebsart": t("Antriebsart", "Drive type", "Rodzaj napędu"),
  "Max. Torflügelfläche": t("Max. Torflügelfläche", "Max. door leaf area", "Maks. powierzchnia skrzydła"),
  "Max. Öffnungsgröße": t("Max. Öffnungsgröße", "Max. opening size", "Maks. wymiar otworu"),
  "Min. Leibungsbreite": t("Min. Leibungsbreite", "Min. reveal width", "Min. szerokość ościeża"),
  "Max. Sturzhöhe (Standardmontage)": t("Max. Sturzhöhe (Standardmontage)", "Max. lintel height (standard installation)", "Maks. wysokość nadproża (montaż standardowy)"),
  "Höherführung": t("Höherführung", "High-lift track", "Prowadzenie podwyższone"),
  "Sturz": t("Sturz", "Lintel", "Nadproże"),
  "Paneelstärke": t("Paneelstärke", "Panel thickness", "Grubość panelu"),
  "Stahlprofile": t("Stahlprofile", "Steel profiles", "Profile stalowe"),
  "Platte": t("Platte", "Panel", "Płyta"),
  "Oberfläche": t("Oberfläche", "Surface", "Powierzchnia"),
  "Kästen": t("Kästen", "Boxes", "Skrzynki"),
  "Max. Fläche": t("Max. Fläche", "Max. area", "Maks. powierzchnia"),
  "Max. Breite mit Führungen": t("Max. Breite mit Führungen", "Max. width incl. guides", "Maks. szerokość z prowadnicami"),
  "Panzer": t("Panzer", "Curtain", "Pancerz"),

  // Valores
  "Torsystem mit Zugfeder — empfohlen für kleine Garagen": t(
    "Torsystem mit Zugfeder — empfohlen für kleine Garagen",
    "Door system with extension springs — recommended for small garages",
    "System bramy ze sprężynami naciągowymi — polecany do małych garaży",
  ),
  "manuell oder automatisch": t("manuell oder automatisch", "manual or automatic", "ręczny lub automatyczny"),
  "Torsystem mit Torsionsfedern an der Vorderseite": t(
    "Torsystem mit Torsionsfedern an der Vorderseite",
    "Door system with torsion springs at the front",
    "System bramy ze sprężynami skrętnymi z przodu",
  ),
  "Torsystem mit Torsionsfedern an der Rückseite": t(
    "Torsystem mit Torsionsfedern an der Rückseite",
    "Door system with torsion springs at the rear",
    "System bramy ze sprężynami skrętnymi z tyłu",
  ),
  "Renovierungs-Montagesystem bei mangelndem Seiten- oder Sturzraum": t(
    "Renovierungs-Montagesystem bei mangelndem Seiten- oder Sturzraum",
    "Renovation mounting system for limited side room or headroom",
    "Renowacyjny system montażu przy braku miejsca z boku lub pod nadprożem",
  ),
  "HOME-ZERO-Montageset: Sturz-, Wand- und Deckenhalterungen, Abstandshalterprofil und Abdeckprofil, in RAL-Farben lackierbar": t(
    "HOME-ZERO-Montageset: Sturz-, Wand- und Deckenhalterungen, Abstandshalterprofil und Abdeckprofil, in RAL-Farben lackierbar",
    "HOME-ZERO mounting kit: lintel, wall and ceiling brackets, spacer profile and cover profile, paintable in RAL colours",
    "Zestaw montażowy HOME-ZERO: uchwyty nadprożowe, ścienne i sufitowe, profil dystansowy i profil maskujący, lakierowane w kolorach RAL",
  ),
  "Höhergeführter Beschlag — die Lösung bei Kollisionen mit Türen und Fenstern": t(
    "Höhergeführter Beschlag — die Lösung bei Kollisionen mit Türen und Fenstern",
    "High-lift hardware — the solution when the door would collide with doors and windows",
    "Okucie z prowadzeniem podwyższonym — rozwiązanie przy kolizji z drzwiami i oknami",
  ),
  "Wärmegedämmtes Sektionaltor — Uw-Werte je nach Torgröße, vollständige Tabelle im Katalog": t(
    "Wärmegedämmtes Sektionaltor — Uw-Werte je nach Torgröße, vollständige Tabelle im Katalog",
    "Thermally insulated sectional door — Uw values depend on door size, full table in the catalogue",
    "Brama segmentowa z izolacją termiczną — wartości Uw zależne od wymiaru bramy, pełna tabela w katalogu",
  ),
  "60 mm (INFINITI: 40 mm)": t("60 mm (INFINITI: 40 mm)", "60 mm (INFINITI: 40 mm)", "60 mm (INFINITI: 40 mm)"),
  "40 mm, mit Wärmedämmung": t("40 mm, mit Wärmedämmung", "40 mm, thermally insulated", "40 mm, z izolacją termiczną"),
  "Profile lackiert in RAL-Farben": t("Profile lackiert in RAL-Farben", "Profiles painted in RAL colours", "Profile lakierowane w kolorach RAL"),
  "elektrisch": t("elektrisch", "electric", "elektryczny"),
  "SK45: 250, 300 oder 350 mm": t("SK45: 250, 300 oder 350 mm", "SK45: 250, 300 or 350 mm", "SK45: 250, 300 lub 350 mm"),
  "9,5 m² (Panzer PA55)": t("9,5 m² (Panzer PA55)", "9.5 m² (PA55 curtain)", "9,5 m² (pancerz PA55)"),
  "3000–6000 mm je nach System": t("3000–6000 mm je nach System", "3000–6000 mm depending on the system", "3000–6000 mm w zależności od systemu"),
  "PEK 77, PEK 80 — verschiedene Transluzenzstufen": t(
    "PEK 77, PEK 80 — verschiedene Transluzenzstufen",
    "PEK 77, PEK 80 — various levels of translucency",
    "PEK 77, PEK 80 — różne stopnie przezierności",
  ),

  // Descripciones
  "Das Zugfedersystem wird für den Einsatz in kleinen Garagen empfohlen. Es ist schnell zu montieren und erfordert keine zusätzliche Federwicklung. INFINITI X verwendet den so genannten „Feder-in-Feder”-Mechanismus, der eine sichere Nutzung eines Torflügelgewichts von bis zu 130 kg ermöglicht. Die zwei Federn sind ein zusätzliches Sicherheitsmerkmal, das die Gefahr des höchst unwahrscheinlichen Bruchs einer der Federn ausschließt.": t(
    "Das Zugfedersystem wird für den Einsatz in kleinen Garagen empfohlen. Es ist schnell zu montieren und erfordert keine zusätzliche Federwicklung. INFINITI X verwendet den so genannten „Feder-in-Feder”-Mechanismus, der eine sichere Nutzung eines Torflügelgewichts von bis zu 130 kg ermöglicht. Die zwei Federn sind ein zusätzliches Sicherheitsmerkmal, das die Gefahr des höchst unwahrscheinlichen Bruchs einer der Federn ausschließt.",
    "The extension-spring system is recommended for small garages. It is quick to install and needs no additional spring tensioning. INFINITI X uses the so-called \"spring-in-spring\" mechanism, which allows a door leaf weight of up to 130 kg to be used safely. The two springs are an additional safety feature that rules out the danger of the highly unlikely breakage of one of the springs.",
    "System sprężyn naciągowych polecany jest do małych garaży. Montuje się go szybko i nie wymaga dodatkowego napinania sprężyn. INFINITI X wykorzystuje tzw. mechanizm „sprężyna w sprężynie”, który pozwala na bezpieczne użytkowanie skrzydła o masie do 130 kg. Dwie sprężyny to dodatkowe zabezpieczenie, eliminujące zagrożenie w razie mało prawdopodobnego pęknięcia jednej z nich.",
  ),
  "Torsionsfedern sind für Tore mit großen Abmessungen gedacht. Sie tragen wesentlich mehr Gewicht als Zugfedern. Der Einbau der Tore mit Torsionsfedern an der Vorderseite ist möglich, wenn die lichte Höhe mindestens 200 mm beträgt. Das maximale Torgewicht beträgt ca. 295 kg.": t(
    "Torsionsfedern sind für Tore mit großen Abmessungen gedacht. Sie tragen wesentlich mehr Gewicht als Zugfedern. Der Einbau der Tore mit Torsionsfedern an der Vorderseite ist möglich, wenn die lichte Höhe mindestens 200 mm beträgt. Das maximale Torgewicht beträgt ca. 295 kg.",
    "Torsion springs are intended for large doors. They carry considerably more weight than extension springs. Doors with torsion springs at the front can be installed where the headroom is at least 200 mm. The maximum door weight is approx. 295 kg.",
    "Sprężyny skrętne przeznaczone są do bram o dużych wymiarach. Przenoszą znacznie większą masę niż sprężyny naciągowe. Montaż bram ze sprężynami skrętnymi z przodu jest możliwy, gdy nadproże ma co najmniej 200 mm. Maksymalna masa bramy wynosi ok. 295 kg.",
  ),
  "Die Platzierung der Torsionsfedern an der Rückseite des Tores ermöglicht den Einbau in eine Garagenöffnung mit niedrigerem Sturz. In diesem Fall reicht es aus, wenn der Sturz 90 mm (120 mm bei elektrischem Antrieb) beträgt. Maximale Tragfähigkeit bis zu ca. 165 kg.": t(
    "Die Platzierung der Torsionsfedern an der Rückseite des Tores ermöglicht den Einbau in eine Garagenöffnung mit niedrigerem Sturz. In diesem Fall reicht es aus, wenn der Sturz 90 mm (120 mm bei elektrischem Antrieb) beträgt. Maximale Tragfähigkeit bis zu ca. 165 kg.",
    "Placing the torsion springs at the rear of the door allows installation in a garage opening with a lower lintel. In this case a lintel of 90 mm (120 mm with an electric drive) is sufficient. Maximum load capacity up to approx. 165 kg.",
    "Umieszczenie sprężyn skrętnych z tyłu bramy pozwala na montaż w otworze garażowym z niższym nadprożem. Wystarczy wtedy nadproże 90 mm (120 mm przy napędzie elektrycznym). Maksymalna nośność do ok. 165 kg.",
  ),
  "Für Situationen, in denen der Seitenraum oder der Sturz begrenzt ist, haben wir ein Zusatzteil für INFINITI-Systeme entwickelt. Mit diesen Komponenten kann das Schienenset direkt an der Wand oder der Decke montiert werden. Die Verbindungen sind mit hochwertigen Profilen ausgestattet, die eine dauerhafte und moderne Ausführung garantieren. Dies ist ideal für sogenannte Tunnelgaragen oder Renovierungsprojekte, bei denen der Seitenraum oder der Sturzraum stark eingeschränkt ist.": t(
    "Für Situationen, in denen der Seitenraum oder der Sturz begrenzt ist, haben wir ein Zusatzteil für INFINITI-Systeme entwickelt. Mit diesen Komponenten kann das Schienenset direkt an der Wand oder der Decke montiert werden. Die Verbindungen sind mit hochwertigen Profilen ausgestattet, die eine dauerhafte und moderne Ausführung garantieren. Dies ist ideal für sogenannte Tunnelgaragen oder Renovierungsprojekte, bei denen der Seitenraum oder der Sturzraum stark eingeschränkt ist.",
    "For situations where side room or headroom is limited, an add-on has been developed for INFINITI systems. With these components the track set can be mounted directly to the wall or ceiling. The joints are fitted with high-quality profiles that guarantee a durable, modern finish. This is ideal for so-called tunnel garages or renovation projects where side room or headroom is severely restricted.",
    "Z myślą o sytuacjach, w których brakuje miejsca z boku lub pod nadprożem, opracowano dodatkowy element do systemów INFINITI. Dzięki tym komponentom zestaw prowadnic można zamontować bezpośrednio do ściany lub sufitu. Połączenia wyposażone są w wysokiej jakości profile, gwarantujące trwałe i nowoczesne wykonanie. To idealne rozwiązanie do tzw. garaży tunelowych lub przy renowacji, gdy miejsce z boku lub pod nadprożem jest mocno ograniczone.",
  ),
  "Bessere Raumnutzung in der Garage Die F350-Umlenkung ist ein spezielles System zur Höherführung eines Sektionaltors, dank dem sich das geöffnete Torblatt auf einer größeren Höhe befindet. Dies hilft bei einer effektiveren Raumnutzung innerhalb der Garage, erhöht deren Funktionalität und verhindert Kollisionen des Tores mit Objekten, die im Bewegungsbereich des Torblattes auftreten könnten.": t(
    "Bessere Raumnutzung in der Garage: Die F350-Umlenkung ist ein spezielles System zur Höherführung eines Sektionaltors, dank dem sich das geöffnete Torblatt auf einer größeren Höhe befindet. Dies hilft bei einer effektiveren Raumnutzung innerhalb der Garage, erhöht deren Funktionalität und verhindert Kollisionen des Tores mit Objekten, die im Bewegungsbereich des Torblattes auftreten könnten.",
    "Better use of space in the garage: the F350 track is a special high-lift system for sectional doors, thanks to which the open door leaf sits at a greater height. This makes for more effective use of the space inside the garage, increases its functionality and prevents the door from colliding with objects that might be in the path of the door leaf.",
    "Lepsze wykorzystanie miejsca w garażu: prowadzenie F350 to specjalny system podwyższonego prowadzenia bramy segmentowej, dzięki któremu otwarte skrzydło znajduje się wyżej. Pozwala to efektywniej wykorzystać przestrzeń garażu, zwiększa jego funkcjonalność i zapobiega kolizji bramy z przedmiotami, które mogłyby znaleźć się na drodze skrzydła.",
  ),
  "Die zunehmenden Anforderungen an die Wärmedämmung machen es erforderlich, den Wärmedurchgangskoeffizienten sämtlicher Tischlerbauteile zu minimieren. INFINITI Thermo ist die Antwort auf die Bedürfnisse der anspruchsvollsten Investoren, einschließlich der Besitzer von Passivhäusern. Durch die Verwendung einer 60 mm dicken Platte und fortschrittlicher Dichtungssysteme konnten die Parameter der Tür deutlich verbessert werden, wobei die höchsten Standards in Bezug auf Haltbarkeit, Nutzungskomfort und ästhetische Optionen beibehalten wurden.": t(
    "Die zunehmenden Anforderungen an die Wärmedämmung machen es erforderlich, den Wärmedurchgangskoeffizienten sämtlicher Bauelemente zu minimieren. INFINITI Thermo ist die Antwort auf die Bedürfnisse der anspruchsvollsten Bauherren, einschließlich der Besitzer von Passivhäusern. Durch die Verwendung einer 60 mm dicken Platte und fortschrittlicher Dichtungssysteme konnten die Parameter des Tores deutlich verbessert werden, wobei die höchsten Standards in Bezug auf Haltbarkeit, Nutzungskomfort und ästhetische Optionen beibehalten wurden.",
    "Rising thermal insulation requirements make it necessary to minimise the heat transfer coefficient of every building element. INFINITI Thermo is the answer to the needs of the most demanding clients, including owners of passive houses. Using a 60 mm thick panel and advanced sealing systems, the door's parameters were improved significantly while keeping the highest standards of durability, ease of use and aesthetic options.",
    "Rosnące wymagania w zakresie izolacji termicznej wymuszają minimalizowanie współczynnika przenikania ciepła wszystkich elementów stolarki. INFINITI Thermo to odpowiedź na potrzeby najbardziej wymagających inwestorów, w tym właścicieli domów pasywnych. Dzięki zastosowaniu płyty o grubości 60 mm i zaawansowanych systemów uszczelnień parametry bramy zostały wyraźnie poprawione, przy zachowaniu najwyższych standardów trwałości, komfortu użytkowania i możliwości estetycznych.",
  ),
  "Die klassische Eleganz der Presto-Dreflügel-Garagentore macht sie zu einem unwiderstehlichen Angebot für freistehende Garagen, Lagerhallen und verschiedene Nebengebäude, bei denen die Aufrechterhaltung einer hohen Innentemperatur keine Priorität hat. Obwohl sie mit 40 mm dicken, mit Polyurethanschaum gefüllten Sektionaltorpaneelen ausgestattet sind, liegen ihre Hauptvorteile in der zeitlosen Eleganz und der hohen Lebensdauer. Die Verwendung von zuverlässigen Stahlprofilen bedeutet, dass der Investor von den Presto-Toren viele Jahre zuverlässigen Betrieb und perfektes Aussehen erwarten darf. Ihre geringen Anforderungen an die Gebäudestruktur machen sie zur besten Wahl für Kunden, die Garagentore in älteren Gebäuden ersetzen wollen. Die einfache Bedienung und die umfangreiche Serienausstattung machen Presto-Drehtore zu einem äußerst attraktiven Angebot.": t(
    "Die klassische Eleganz der Presto-Drehflügel-Garagentore macht sie zu einem unwiderstehlichen Angebot für freistehende Garagen, Lagerhallen und verschiedene Nebengebäude, bei denen die Aufrechterhaltung einer hohen Innentemperatur keine Priorität hat. Obwohl sie mit 40 mm dicken, mit Polyurethanschaum gefüllten Sektionaltorpaneelen ausgestattet sind, liegen ihre Hauptvorteile in der zeitlosen Eleganz und der hohen Lebensdauer. Die Verwendung von zuverlässigen Stahlprofilen bedeutet, dass der Bauherr von den Presto-Toren viele Jahre zuverlässigen Betrieb und perfektes Aussehen erwarten darf. Ihre geringen Anforderungen an die Gebäudestruktur machen sie zur besten Wahl für Kunden, die Garagentore in älteren Gebäuden ersetzen wollen. Die einfache Bedienung und die umfangreiche Serienausstattung machen Presto-Drehtore zu einem äußerst attraktiven Angebot.",
    "The classic elegance of Presto side-hinged garage doors makes them an irresistible offer for detached garages, storage halls and various outbuildings where keeping a high indoor temperature is not a priority. Although they are fitted with 40 mm sectional-door panels filled with polyurethane foam, their main advantages are timeless elegance and a long service life. The use of reliable steel profiles means the owner can expect many years of dependable operation and a perfect appearance from Presto doors. Their low demands on the building structure make them the best choice for customers replacing garage doors in older buildings. Simple operation and extensive standard equipment make Presto side-hinged doors an extremely attractive offer.",
    "Klasyczna elegancja bram rozwiernych Presto czyni je nieodpartą propozycją do garaży wolnostojących, hal magazynowych i różnych budynków gospodarczych, w których utrzymanie wysokiej temperatury wewnątrz nie jest priorytetem. Choć wyposażone są w panele bram segmentowych o grubości 40 mm wypełnione pianką poliuretanową, ich głównymi atutami są ponadczasowa elegancja i długa żywotność. Zastosowanie solidnych profili stalowych oznacza, że inwestor może oczekiwać od bram Presto wielu lat niezawodnej pracy i nienagannego wyglądu. Niewielkie wymagania wobec konstrukcji budynku czynią je najlepszym wyborem dla klientów wymieniających bramy w starszych budynkach. Prosta obsługa i bogate wyposażenie standardowe sprawiają, że bramy rozwierne Presto to wyjątkowo atrakcyjna oferta.",
  ),
  "Überall dort, wo die baulichen Gegebenheiten den Einsatz von Garagen-Sektionaltoren nicht zulassen und wo Kunden traditionelle Eleganz erwarten, werden Unico-Stahlschwingtore zu einer interessanten Alternative. Die klassische Optik, die minimalen Anforderungen an die technischen Garagenbedingungen und die umfangreichen Ausstattungsmöglichkeiten machen Unico-Tore zu einer universellen Lösung, die für nahezu jeden Einsatzbereich gewählt werden kann. Alles, was Sie brauchen, ist ein kleiner Freiraum vor der Garage für die Bewegung der Flügel. Unico-Tore sind in erster Linie für den Einsatz in Garagen konzipiert, die an Häuser angeschlossen sind. Das liegt daran, dass sie thermische Unterbrechungen in den Profilen haben und mit den bei Sektionaltoren verwendeten warmen Platten gefüllt sind. Ihr Einbau ist anspruchslos und zusammen mit der serienmäßigen Ausstattung sind sie eine bequeme Option für jeden Investor.": t(
    "Überall dort, wo die baulichen Gegebenheiten den Einsatz von Garagen-Sektionaltoren nicht zulassen und wo Kunden traditionelle Eleganz erwarten, werden Unico-Stahltore zu einer interessanten Alternative. Die klassische Optik, die minimalen Anforderungen an die technischen Garagenbedingungen und die umfangreichen Ausstattungsmöglichkeiten machen Unico-Tore zu einer universellen Lösung, die für nahezu jeden Einsatzbereich gewählt werden kann. Alles, was Sie brauchen, ist ein kleiner Freiraum vor der Garage für die Bewegung der Flügel. Unico-Tore sind in erster Linie für den Einsatz in Garagen konzipiert, die an Häuser angeschlossen sind. Das liegt daran, dass sie thermische Trennungen in den Profilen haben und mit den bei Sektionaltoren verwendeten warmen Platten gefüllt sind. Ihr Einbau ist anspruchslos und zusammen mit der serienmäßigen Ausstattung sind sie eine bequeme Option für jeden Bauherrn.",
    "Wherever the building conditions do not allow sectional garage doors and customers expect traditional elegance, Unico steel doors become an interesting alternative. The classic look, minimal demands on the garage's technical conditions and extensive equipment options make Unico doors a universal solution that can be chosen for almost any application. All you need is a little free space in front of the garage for the leaves to swing. Unico doors are designed primarily for garages attached to houses, because their profiles are thermally broken and filled with the same warm panels used in sectional doors. Installation is undemanding and, together with the standard equipment, they are a convenient option for any owner.",
    "Wszędzie tam, gdzie warunki budowlane nie pozwalają na zastosowanie garażowych bram segmentowych, a klienci oczekują tradycyjnej elegancji, stalowe bramy Unico stają się ciekawą alternatywą. Klasyczny wygląd, minimalne wymagania wobec warunków technicznych garażu i bogate możliwości wyposażenia czynią bramy Unico uniwersalnym rozwiązaniem, które można wybrać niemal do każdego zastosowania. Wystarczy niewielka wolna przestrzeń przed garażem na ruch skrzydeł. Bramy Unico przeznaczone są przede wszystkim do garaży przylegających do domów, ponieważ mają przekładki termiczne w profilach i wypełnione są ciepłymi płytami stosowanymi w bramach segmentowych. Ich montaż jest niewymagający, a wraz z wyposażeniem standardowym stanowią wygodną opcję dla każdego inwestora.",
  ),
  "Intense hingegen ist ein System mit oder ohne SK45-Kasten - montiert auf Konsolen mit einem seitlich angebrachten Motor. Es wird vor allem in Lagerhallen, Werkstätten und Produktionshallen eingesetzt, um große Öffnungen von bis zu 30 m² in Gewerbebauten zu sichern.": t(
    "Intense hingegen ist ein System mit oder ohne SK45-Kasten – montiert auf Konsolen mit einem seitlich angebrachten Motor. Es wird vor allem in Lagerhallen, Werkstätten und Produktionshallen eingesetzt, um große Öffnungen von bis zu 30 m² in Gewerbebauten zu sichern.",
    "Intense, by contrast, is a system with or without an SK45 box, mounted on brackets with a side-mounted motor. It is used mainly in warehouses, workshops and production halls to secure large openings of up to 30 m² in commercial buildings.",
    "Intense to natomiast system ze skrzynką SK45 lub bez niej, montowany na konsolach z silnikiem umieszczonym z boku. Stosowany jest przede wszystkim w halach magazynowych, warsztatach i halach produkcyjnych do zabezpieczania dużych otworów do 30 m² w budynkach komercyjnych.",
  ),
  "Die Verwendung von Rollgittern ermöglicht die Schaffung eines sicheren Raums, der Licht und und Belüftung. Sie werden häufig in Geschäftsräumen eingesetzt und ermöglichen es, zu sehen, was sich dahinter befindet. Unsere Rollgitter-Systeme können SK45-Kästen verwenden oder auf seitlich bedienbaren Konsolen montiert werden.": t(
    "Die Verwendung von Rollgittern ermöglicht die Schaffung eines sicheren Raums, der Licht und Belüftung durchlässt. Sie werden häufig in Geschäftsräumen eingesetzt und ermöglichen es, zu sehen, was sich dahinter befindet. Die Rollgitter-Systeme können SK45-Kästen verwenden oder auf seitlich bedienbaren Konsolen montiert werden.",
    "Roller grilles create a secure space that still lets light and air through. They are often used in commercial premises and let you see what is behind them. The roller-grille systems can use SK45 boxes or be mounted on side-operated brackets.",
    "Kraty rolowane pozwalają stworzyć bezpieczną przestrzeń, która przepuszcza światło i powietrze. Często stosowane są w lokalach handlowych i pozwalają zobaczyć, co znajduje się za nimi. Systemy krat rolowanych mogą wykorzystywać skrzynki SK45 lub być montowane na konsolach obsługiwanych z boku.",
  ),
};
