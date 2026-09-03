/**
 * Textos legales — Impressum (§ 5 DDG) y Datenschutzerklärung (DSGVO).
 *
 * El ALEMÁN es la versión que vale: son obligaciones legales alemanas y
 * el texto vinculante es el alemán. Desde 2026-09 cada bloque lleva
 * además su traducción al inglés y al polaco, porque el visitante que
 * navega la web en /en o /pl tiene que poder LEER qué hacemos con sus
 * datos — una política de privacidad que no entiendes no informa de
 * nada. Las traducciones se anuncian como tales (LEGAL_TRANSLATION_NOTICE)
 * y remiten a la versión alemana como la vinculante.
 *
 * No pasan por `en.ts`/`de.ts`/`pl.ts`: no son interfaz, son documentos,
 * y se leen enteros por idioma con `pick()`.
 *
 * Encima de cada bloque hay un comentario EN INGLÉS explicando qué dice
 * —petición expresa del encargo—, para poder revisar qué se publica sin
 * saber alemán.
 *
 * ⚠️ ESTO NO ES ASESORAMIENTO JURÍDICO. Los textos son un borrador
 * estándar del sector y TIENEN QUE PASAR POR UN ABOGADO ALEMÁN antes de
 * darlos por buenos. Faltan además datos del dueño (USt-IdNr., cámara
 * profesional): ver CONTENT.md.
 */
import { COMPANY, companyAddressLine } from "@/data/company";
import { pick, type Locale, type Localized } from "@/lib/i18n";

export type LegalBlock = {
  heading: Localized<string>;
  paragraphs: Localized<string[]>;
};

/** Fecha de la última revisión. Actualízala cuando el abogado la revise. */
export const LEGAL_UPDATED: Localized<string> = {
  de: "September 2026",
  en: "September 2026",
  pl: "wrzesień 2026",
};

export const IMPRINT_TITLE: Localized<string> = {
  de: "Impressum",
  en: "Legal notice (Impressum)",
  pl: "Impressum (nota prawna)",
};

export const PRIVACY_TITLE: Localized<string> = {
  de: "Datenschutzerklärung",
  en: "Privacy policy (Datenschutzerklärung)",
  pl: "Polityka prywatności (Datenschutzerklärung)",
};

/** Aviso corto bajo el h1 de cada documento. */
export const LEGAL_UPDATED_LABEL: Localized<string> = {
  de: `Stand: ${LEGAL_UPDATED.de}`,
  en: `Last updated: ${LEGAL_UPDATED.en}`,
  pl: `Stan na: ${LEGAL_UPDATED.pl}`,
};

/**
 * Solo en inglés y polaco: la traducción informa, el alemán obliga.
 * En alemán no hay aviso (null) — es el original.
 */
export const LEGAL_TRANSLATION_NOTICE: Localized<string | null> = {
  de: null,
  en: "Courtesy translation for your information. The German version is the legally binding one — you can open it at the end of this page.",
  pl: "Tłumaczenie informacyjne. Prawnie wiążąca jest wersja niemiecka — można ją otworzyć na końcu tej strony.",
};

/** Botón que despliega el original alemán bajo la traducción. */
export const LEGAL_ORIGINAL_TOGGLE: Localized<{ show: string; hide: string }> = {
  en: { show: "Show the German original (legally binding)", hide: "Hide the German original" },
  de: { show: "Deutsche Fassung anzeigen", hide: "Deutsche Fassung ausblenden" },
  pl: { show: "Pokaż niemiecki oryginał (wersja wiążąca)", hide: "Ukryj niemiecki oryginał" },
};

/**
 * Resuelve un documento a un idioma: bloques ya en texto plano. Con
 * `locale` explícito sirve también para adjuntar el original alemán
 * bajo una traducción.
 */
export const resolveLegal = (
  blocks: LegalBlock[],
  locale: Locale,
): { heading: string; paragraphs: string[] }[] =>
  blocks.map((block) => ({
    heading: pick(block.heading, locale),
    paragraphs: pick(block.paragraphs, locale),
  }));

// Datos de la empresa que se repiten en los tres idiomas.
const countryName = { de: COMPANY.country, en: "Germany", pl: "Niemcy" };

// ── Impressum (§ 5 DDG) ──────────────────────────────────────────

export const IMPRINT_BLOCKS: LegalBlock[] = [
  // EN: Legally required identification of the site operator under § 5
  // DDG (the law that replaced the TMG in 2024): legal name of the
  // business, its form (sole trader) and its postal address — the ONE
  // company address (Sigmaringer Straße 10), confirmed by the owner in
  // August 2026 for the whole site. The owner's dictated text names
  // just "Kamika"; the sole trader's personal name stays because § 5
  // DDG requires it — for the lawyer to settle.
  {
    heading: {
      de: "Angaben gemäß § 5 DDG",
      en: "Information pursuant to § 5 DDG (German Digital Services Act)",
      pl: "Dane zgodnie z § 5 DDG (niemiecka ustawa o usługach cyfrowych)",
    },
    paragraphs: {
      de: [COMPANY.tradeName, COMPANY.legalName, companyAddressLine, countryName.de],
      en: [COMPANY.tradeName, `${COMPANY.owner} – sole trader`, companyAddressLine, countryName.en],
      pl: [COMPANY.tradeName, `${COMPANY.owner} – jednoosobowa działalność gospodarcza`, companyAddressLine, countryName.pl],
    },
  },

  // EN: Who runs the business — the owner, named personally, as a sole
  // trader must be.
  {
    heading: { de: "Vertreten durch", en: "Represented by", pl: "Reprezentowana przez" },
    paragraphs: {
      de: [`${COMPANY.owner} (Inhaber)`],
      en: [`${COMPANY.owner} (owner)`],
      pl: [`${COMPANY.owner} (właściciel)`],
    },
  },

  // EN: How to reach the business: phone and email. Both are the real
  // ones used everywhere else on the site.
  {
    heading: { de: "Kontakt", en: "Contact", pl: "Kontakt" },
    paragraphs: {
      de: [`Telefon: ${COMPANY.phone}`, `E-Mail: ${COMPANY.email}`],
      en: [`Phone: ${COMPANY.phone}`, `Email: ${COMPANY.email}`],
      pl: [`Telefon: ${COMPANY.phone}`, `E-mail: ${COMPANY.email}`],
    },
  },

  // EN: VAT identification number. Only published when the owner has
  // confirmed one — a sole trader under the small-business rule
  // (§ 19 UStG) may not have one at all.
  ...(COMPANY.vatId
    ? [
        {
          heading: {
            de: "Umsatzsteuer-Identifikationsnummer",
            en: "VAT identification number",
            pl: "Numer identyfikacyjny VAT",
          },
          paragraphs: {
            de: ["Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:", COMPANY.vatId],
            en: ["VAT identification number pursuant to § 27 a of the German VAT Act (UStG):", COMPANY.vatId],
            pl: ["Numer identyfikacyjny VAT zgodnie z § 27 a niemieckiej ustawy o VAT (UStG):", COMPANY.vatId],
          },
        } satisfies LegalBlock,
      ]
    : []),

  // EN: Professional title and chamber of trade (Handwerkskammer).
  // Required for regulated trades; only published once confirmed.
  ...(COMPANY.chamber
    ? [
        {
          heading: {
            de: "Berufsrechtliche Angaben",
            en: "Professional regulatory information",
            pl: "Informacje o samorządzie zawodowym",
          },
          paragraphs: {
            de: [COMPANY.chamber, "Verliehen in: Deutschland"],
            en: [COMPANY.chamber, "Awarded in: Germany"],
            pl: [COMPANY.chamber, "Nadany w: Niemcy"],
          },
        } satisfies LegalBlock,
      ]
    : []),

  // EN: Consumer dispute resolution. States that the business is not
  // obliged and not willing to take part in dispute resolution
  // proceedings before a consumer arbitration board (§ 36 VSBG).
  {
    heading: {
      de: "Verbraucherstreitbeilegung",
      en: "Consumer dispute resolution",
      pl: "Rozstrzyganie sporów konsumenckich",
    },
    paragraphs: {
      de: [
        "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
      en: [
        "We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.",
      ],
      pl: [
        "Nie jesteśmy gotowi ani zobowiązani do udziału w postępowaniach w sprawie rozstrzygania sporów przed konsumenckim organem polubownym.",
      ],
    },
  },

  // EN: Liability for the site's own content — the operator is
  // responsible for its own content under § 7 DDG, but is not obliged
  // to monitor third-party information it transmits or stores.
  {
    heading: { de: "Haftung für Inhalte", en: "Liability for content", pl: "Odpowiedzialność za treści" },
    paragraphs: {
      de: [
        "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
        "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
      ],
      en: [
        "As a service provider we are responsible for our own content on these pages under general law, pursuant to § 7 (1) DDG. Under §§ 8 to 10 DDG, however, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating unlawful activity.",
        "Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the moment we become aware of a specific infringement. Upon becoming aware of such infringements we will remove the content in question without delay.",
      ],
      pl: [
        "Jako usługodawca odpowiadamy za własne treści na tych stronach zgodnie z przepisami ogólnymi, na podstawie § 7 ust. 1 DDG. Zgodnie z §§ 8–10 DDG nie jesteśmy jednak zobowiązani do monitorowania przekazywanych lub przechowywanych informacji osób trzecich ani do badania okoliczności wskazujących na działalność niezgodną z prawem.",
        "Obowiązki usunięcia lub zablokowania informacji wynikające z przepisów ogólnych pozostają nienaruszone. Odpowiedzialność w tym zakresie jest możliwa dopiero od chwili powzięcia wiadomości o konkretnym naruszeniu prawa. Po uzyskaniu takiej wiadomości niezwłocznie usuniemy odnośne treści.",
      ],
    },
  },

  // EN: Liability for external links — the operator has no influence
  // over linked third-party sites and removes links if it learns of a
  // legal violation.
  {
    heading: { de: "Haftung für Links", en: "Liability for links", pl: "Odpowiedzialność za linki" },
    paragraphs: {
      de: [
        "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
        "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      ],
      en: [
        "Our website contains links to external third-party websites over whose content we have no influence. We therefore cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for their content.",
        "The linked pages were checked for possible legal violations at the time of linking. No unlawful content was identifiable at that time. Upon becoming aware of legal violations we will remove such links without delay.",
      ],
      pl: [
        "Nasza strona zawiera linki do zewnętrznych stron internetowych osób trzecich, na których treść nie mamy wpływu. Dlatego nie możemy ponosić odpowiedzialności za te obce treści. Za treść stron, do których prowadzą linki, odpowiada zawsze ich dostawca lub operator.",
        "Strony, do których prowadzą linki, zostały sprawdzone pod kątem ewentualnych naruszeń prawa w chwili umieszczenia linku. Treści niezgodne z prawem nie były wówczas rozpoznawalne. Po uzyskaniu wiadomości o naruszeniach prawa niezwłocznie usuniemy takie linki.",
      ],
    },
  },

  // EN: Copyright — the texts, photographs and drawings on the site are
  // protected; downloads and copies are permitted for private,
  // non-commercial use only.
  {
    heading: { de: "Urheberrecht", en: "Copyright", pl: "Prawa autorskie" },
    paragraphs: {
      de: [
        "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
        "Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Produktkataloge und technische Datenblätter dürfen zur eigenen Information heruntergeladen werden; die Rechte an ihren Inhalten liegen bei den jeweiligen Herstellern.",
      ],
      en: [
        "The content and works created by the site operator on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright require the written consent of the respective author or creator.",
        "Downloads and copies of this site are permitted for private, non-commercial use only. Product catalogues and technical data sheets may be downloaded for your own information; the rights to their content remain with the respective manufacturers.",
      ],
      pl: [
        "Treści i utwory stworzone przez operatora strony podlegają niemieckiemu prawu autorskiemu. Powielanie, opracowywanie, rozpowszechnianie i wszelkie wykorzystanie poza granicami prawa autorskiego wymagają pisemnej zgody danego autora lub twórcy.",
        "Pobieranie i kopiowanie tej strony jest dozwolone wyłącznie do użytku prywatnego, niekomercyjnego. Katalogi produktów i karty techniczne można pobierać do własnej informacji; prawa do ich treści należą do poszczególnych producentów.",
      ],
    },
  },
];

// ── Datenschutzerklärung (DSGVO) ─────────────────────────────────

export const PRIVACY_BLOCKS: LegalBlock[] = [
  // EN: Who is responsible for the data processing — the controller
  // under Art. 4(7) GDPR, with the same LEGAL address and contact
  // details as the imprint.
  {
    heading: { de: "1. Verantwortlicher", en: "1. Controller", pl: "1. Administrator danych" },
    paragraphs: {
      de: [
        "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:",
        `${COMPANY.legalName}, ${COMPANY.owner}`,
        `${companyAddressLine}, ${countryName.de}`,
        `Telefon: ${COMPANY.phone} · E-Mail: ${COMPANY.email}`,
      ],
      en: [
        "The controller within the meaning of the General Data Protection Regulation (GDPR) is:",
        `${COMPANY.owner} – sole trader`,
        `${companyAddressLine}, ${countryName.en}`,
        `Phone: ${COMPANY.phone} · Email: ${COMPANY.email}`,
      ],
      pl: [
        "Administratorem danych w rozumieniu ogólnego rozporządzenia o ochronie danych (RODO) jest:",
        `${COMPANY.owner} – jednoosobowa działalność gospodarcza`,
        `${companyAddressLine}, ${countryName.pl}`,
        `Telefon: ${COMPANY.phone} · E-mail: ${COMPANY.email}`,
      ],
    },
  },

  // EN: General statement — the site is an information site, personal
  // data is only processed where technically necessary or where the
  // visitor sends it themselves.
  {
    heading: {
      de: "2. Allgemeines zur Datenverarbeitung",
      en: "2. General information on data processing",
      pl: "2. Informacje ogólne o przetwarzaniu danych",
    },
    paragraphs: {
      de: [
        "Diese Website ist eine reine Informationsseite. Personenbezogene Daten werden nur verarbeitet, soweit dies für die Bereitstellung der Website technisch erforderlich ist oder soweit Sie uns Daten selbst übermitteln, etwa über das Kontaktformular, per E-Mail oder per Telefon.",
        "Eine Nutzerregistrierung, ein Kundenkonto oder ein Bestellvorgang bestehen nicht.",
      ],
      en: [
        "This website is purely an information site. Personal data is only processed where this is technically necessary to provide the website or where you send us data yourself, for example via the contact form, by email or by telephone.",
        "There is no user registration, no customer account and no ordering process.",
      ],
      pl: [
        "Ta strona internetowa ma charakter wyłącznie informacyjny. Dane osobowe są przetwarzane tylko wtedy, gdy jest to technicznie niezbędne do udostępnienia strony lub gdy sami przekazują nam Państwo dane, np. przez formularz kontaktowy, e-mailem lub telefonicznie.",
        "Nie ma rejestracji użytkowników, konta klienta ani procesu zamawiania.",
      ],
    },
  },

  // EN: Hosting on Vercel — names the processor, its address, that a
  // data processing agreement is in place, and the legal basis
  // (legitimate interest in a secure, efficiently provided website).
  {
    heading: { de: "3. Hosting", en: "3. Hosting", pl: "3. Hosting" },
    paragraphs: {
      de: [
        "Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet. Beim Aufruf der Website werden die dabei anfallenden Verbindungsdaten auf den Servern des Anbieters verarbeitet.",
        "Mit Vercel besteht ein Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO. Die Übermittlung in die USA wird auf die Standardvertragsklauseln der Europäischen Kommission gestützt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: unser berechtigtes Interesse an einer sicheren und zuverlässig bereitgestellten Website.",
      ],
      en: [
        "This website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. When you visit the website, the resulting connection data is processed on the provider's servers.",
        "A data processing agreement pursuant to Art. 28 GDPR is in place with Vercel. Transfers to the USA are based on the European Commission's standard contractual clauses. The legal basis is Art. 6 (1) (f) GDPR: our legitimate interest in a secure and reliably provided website.",
      ],
      pl: [
        "Ta strona jest hostowana przez Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Podczas wywołania strony powstające dane połączenia są przetwarzane na serwerach dostawcy.",
        "Z Vercel zawarto umowę powierzenia przetwarzania danych zgodnie z art. 28 RODO. Przekazywanie danych do USA opiera się na standardowych klauzulach umownych Komisji Europejskiej. Podstawą prawną jest art. 6 ust. 1 lit. f RODO: nasz prawnie uzasadniony interes w bezpiecznym i niezawodnym udostępnianiu strony.",
      ],
    },
  },

  // EN: Server log files — the technical data every web server records
  // (IP address, time, page requested, browser), why it is kept, and
  // that it is not merged with other data.
  {
    heading: { de: "4. Server-Logfiles", en: "4. Server log files", pl: "4. Pliki dziennika serwera" },
    paragraphs: {
      de: [
        "Beim Aufruf der Website werden automatisch Informationen erfasst, die Ihr Browser übermittelt: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Uhrzeit der Serveranfrage, die aufgerufene Seite und die IP-Adresse.",
        "Diese Daten sind für uns nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt. Sie werden zur technischen Bereitstellung, zur Fehleranalyse und zur Abwehr von Angriffen verarbeitet (Art. 6 Abs. 1 lit. f DSGVO) und nach kurzer Zeit gelöscht.",
      ],
      en: [
        "When you visit the website, information transmitted by your browser is recorded automatically: browser type and version, operating system, referrer URL, time of the server request, the page requested and the IP address.",
        "We cannot attribute this data to specific persons, and it is not merged with other data sources. It is processed for technical provision, error analysis and defence against attacks (Art. 6 (1) (f) GDPR) and deleted after a short time.",
      ],
      pl: [
        "Podczas wywołania strony automatycznie rejestrowane są informacje przesyłane przez Państwa przeglądarkę: typ i wersja przeglądarki, system operacyjny, adres URL strony odsyłającej, godzina zapytania do serwera, wywołana strona i adres IP.",
        "Danych tych nie możemy przypisać konkretnym osobom i nie są one łączone z innymi źródłami danych. Są przetwarzane w celu technicznego udostępnienia strony, analizy błędów i obrony przed atakami (art. 6 ust. 1 lit. f RODO) i po krótkim czasie usuwane.",
      ],
    },
  },

  // EN: The contact form — which fields are processed, that the consent
  // checkbox is the legal basis alongside pre-contractual steps, how
  // long the enquiry is kept, and that consent can be withdrawn.
  {
    heading: { de: "5. Kontaktformular", en: "5. Contact form", pl: "5. Formularz kontaktowy" },
    paragraphs: {
      de: [
        "Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von Ihnen angegebenen Daten: Name, E-Mail-Adresse, gegebenenfalls Telefonnummer, das gewählte Produkt und den Inhalt Ihrer Nachricht.",
        "Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO sowie, soweit Ihre Anfrage auf einen Vertrag gerichtet ist, Art. 6 Abs. 1 lit. b DSGVO. Sie können Ihre Einwilligung jederzeit formlos per E-Mail widerrufen; die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.",
        "Die Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern oder der Zweck der Speicherung entfällt. Zwingende gesetzliche Aufbewahrungsfristen — insbesondere handels- und steuerrechtliche — bleiben unberührt.",
      ],
      en: [
        "If you send us an enquiry via the contact form, we process the data you provide: name, email address, telephone number if given, the product selected and the content of your message.",
        "The legal basis is your consent pursuant to Art. 6 (1) (a) GDPR and, insofar as your enquiry is aimed at a contract, Art. 6 (1) (b) GDPR. You may withdraw your consent at any time by informal email; the lawfulness of processing carried out before the withdrawal remains unaffected.",
        "The data remains with us until you ask us to delete it or the purpose of storage no longer applies. Mandatory statutory retention periods — in particular under commercial and tax law — remain unaffected.",
      ],
      pl: [
        "Jeśli wyślą nam Państwo zapytanie przez formularz kontaktowy, przetwarzamy podane dane: imię i nazwisko, adres e-mail, ewentualnie numer telefonu, wybrany produkt oraz treść wiadomości.",
        "Podstawą prawną jest Państwa zgoda zgodnie z art. 6 ust. 1 lit. a RODO oraz, o ile zapytanie zmierza do zawarcia umowy, art. 6 ust. 1 lit. b RODO. Zgodę można w każdej chwili odwołać nieformalnie e-mailem; zgodność z prawem przetwarzania dokonanego do chwili odwołania pozostaje nienaruszona.",
        "Dane pozostają u nas, dopóki nie zażądają Państwo ich usunięcia lub nie ustanie cel ich przechowywania. Bezwzględnie obowiązujące ustawowe okresy przechowywania — w szczególności handlowe i podatkowe — pozostają nienaruszone.",
      ],
    },
  },

  // EN: Email dispatch service. NOTE FOR THE OWNER: this block is only
  // accurate while enquiries are actually sent through Resend
  // (RESEND_API_KEY set in Vercel). If the form ends up delivering only
  // through the visitor's own mail client, DELETE this block.
  {
    heading: {
      de: "6. Versand der Formularnachrichten",
      en: "6. Delivery of form messages",
      pl: "6. Wysyłka wiadomości z formularza",
    },
    paragraphs: {
      de: [
        "Für die Zustellung der über das Kontaktformular abgesendeten Nachrichten setzen wir den Versanddienstleister Resend (Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA) ein. Dabei werden die von Ihnen eingegebenen Daten zum Zweck der Zustellung verarbeitet.",
        "Es besteht ein Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO; die Übermittlung in die USA wird auf die Standardvertragsklauseln gestützt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: unser berechtigtes Interesse an einer zuverlässigen Zustellung von Anfragen.",
      ],
      en: [
        "To deliver messages sent via the contact form we use the email delivery service Resend (Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). The data you enter is processed for the purpose of delivery.",
        "A data processing agreement pursuant to Art. 28 GDPR is in place; transfers to the USA are based on the standard contractual clauses. The legal basis is Art. 6 (1) (f) GDPR: our legitimate interest in the reliable delivery of enquiries.",
      ],
      pl: [
        "Do dostarczania wiadomości wysłanych przez formularz kontaktowy korzystamy z usługi wysyłki Resend (Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). Wprowadzone przez Państwa dane są przetwarzane w celu dostarczenia wiadomości.",
        "Zawarto umowę powierzenia przetwarzania danych zgodnie z art. 28 RODO; przekazywanie danych do USA opiera się na standardowych klauzulach umownych. Podstawą prawną jest art. 6 ust. 1 lit. f RODO: nasz prawnie uzasadniony interes w niezawodnym dostarczaniu zapytań.",
      ],
    },
  },

  // EN: Contact by email or telephone — the same rules apply to
  // enquiries that arrive outside the form.
  {
    heading: {
      de: "7. Anfragen per E-Mail oder Telefon",
      en: "7. Enquiries by email or telephone",
      pl: "7. Zapytania e-mailem lub telefonicznie",
    },
    paragraphs: {
      de: [
        "Wenn Sie uns per E-Mail oder telefonisch kontaktieren, werden Ihre Angaben einschließlich aller daraus hervorgehenden personenbezogenen Daten zum Zweck der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Es gelten dieselben Rechtsgrundlagen und Löschfristen wie beim Kontaktformular.",
      ],
      en: [
        "If you contact us by email or telephone, your details, including all personal data arising from them, are stored and processed by us for the purpose of handling your request. The same legal bases and deletion periods apply as for the contact form.",
      ],
      pl: [
        "Jeśli skontaktują się Państwo z nami e-mailem lub telefonicznie, Państwa dane, w tym wszystkie wynikające z nich dane osobowe, są u nas przechowywane i przetwarzane w celu obsługi sprawy. Obowiązują te same podstawy prawne i okresy usuwania co przy formularzu kontaktowym.",
      ],
    },
  },

  // EN: No cookies, no third-party fonts, nothing third-party loaded
  // on page view — with ONE declared exception since 2026-09: Vercel
  // Web Analytics, which the owner installed. It is cookieless, uses no
  // cross-device identifier, hashes the IP into a daily-rotating key
  // and stores only aggregated page/referrer/country/device data, so
  // it runs on legitimate interest (Art. 6(1)(f)) and the site still
  // needs no cookie banner. The map embed stays behind a click. If
  // anything else third-party is ever loaded automatically, this
  // section must be rewritten first — and a lawyer should confirm the
  // legitimate-interest reading of the analytics.
  {
    heading: {
      de: "8. Keine Cookies; Reichweitenmessung mit Vercel Web Analytics",
      en: "8. No cookies; audience measurement with Vercel Web Analytics",
      pl: "8. Brak plików cookie; pomiar zasięgu za pomocą Vercel Web Analytics",
    },
    paragraphs: {
      de: [
        "Diese Website setzt keine Cookies und lädt beim Aufruf der Seiten keine Inhalte Dritter nach (keine externen Schriftarten, keine Social-Media-Plugins). Die verwendeten Schriftarten werden von unserem eigenen Server ausgeliefert.",
        "Zur Messung der Reichweite nutzen wir Vercel Web Analytics, einen Dienst unseres Hosting-Anbieters Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Der Dienst arbeitet ohne Cookies und ohne geräteübergreifende Identifikatoren. Erfasst werden die aufgerufene Seite, die Referrer-URL, das Land, Browser- und Gerätetyp sowie die Bildschirmgröße. Die IP-Adresse wird nur zur Bildung eines täglich wechselnden, nicht rückführbaren Kennwerts verwendet und nicht gespeichert. Ein Personenbezug wird nicht hergestellt; die Auswertung erfolgt ausschließlich in aggregierter Form.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: unser berechtigtes Interesse, die Nutzung unserer Website zu verstehen und sie zu verbessern. Für Vercel gilt der unter Ziffer 3 genannte Vertrag über die Auftragsverarbeitung; die Übermittlung in die USA wird auf die Standardvertragsklauseln der Europäischen Kommission gestützt.",
        "Die Standortkarte wird erst nach Ihrem ausdrücklichen Klick geladen (siehe Ziffer 9). Solange Sie die Karte nicht anfordern, wird keine Verbindung zu Google hergestellt.",
        "Eine Einwilligung in Cookies ist für die Nutzung dieser Website nicht erforderlich.",
      ],
      en: [
        "This website sets no cookies and loads no third-party content when pages are opened (no external fonts, no social media plug-ins). The fonts used are served from our own server.",
        "To measure our audience we use Vercel Web Analytics, a service of our hosting provider Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. The service works without cookies and without cross-device identifiers. It records the page visited, the referrer URL, the country, browser and device type and the screen size. The IP address is used only to derive a daily-changing, non-reversible key and is not stored. No reference to an identifiable person is established; evaluation takes place exclusively in aggregated form.",
        "The legal basis is Art. 6 (1) (f) GDPR: our legitimate interest in understanding how our website is used and in improving it. The data processing agreement with Vercel referred to in section 3 applies; transfers to the USA are based on the European Commission's standard contractual clauses.",
        "The location map is only loaded after you click on it explicitly (see section 9). As long as you do not request the map, no connection to Google is established.",
        "Consent to cookies is not required to use this website.",
      ],
      pl: [
        "Ta strona nie używa plików cookie i przy otwieraniu podstron nie ładuje treści osób trzecich (brak zewnętrznych czcionek, brak wtyczek mediów społecznościowych). Używane czcionki są dostarczane z naszego własnego serwera.",
        "Do pomiaru zasięgu korzystamy z Vercel Web Analytics, usługi naszego dostawcy hostingu Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Usługa działa bez plików cookie i bez identyfikatorów międzyurządzeniowych. Rejestrowane są: odwiedzona strona, adres URL strony odsyłającej, kraj, typ przeglądarki i urządzenia oraz rozmiar ekranu. Adres IP służy wyłącznie do utworzenia zmieniającego się codziennie, nieodwracalnego klucza i nie jest zapisywany. Nie następuje powiązanie z konkretną osobą; analiza odbywa się wyłącznie w formie zagregowanej.",
        "Podstawą prawną jest art. 6 ust. 1 lit. f RODO: nasz prawnie uzasadniony interes w zrozumieniu sposobu korzystania z naszej strony i jej ulepszaniu. Zastosowanie ma umowa powierzenia przetwarzania z Vercel wskazana w punkcie 3; przekazywanie danych do USA opiera się na standardowych klauzulach umownych Komisji Europejskiej.",
        "Mapa lokalizacji jest ładowana dopiero po Państwa wyraźnym kliknięciu (zob. punkt 9). Dopóki nie zażądają Państwo mapy, nie jest nawiązywane żadne połączenie z Google.",
        "Zgoda na pliki cookie nie jest wymagana do korzystania z tej strony.",
      ],
    },
  },

  // EN: Google Maps behind a two-click gate. Nothing is requested from
  // Google until the visitor presses the button, so the legal basis is
  // consent given by that click (Art. 6(1)(a) GDPR, § 25(1) TDDDG)
  // rather than legitimate interest. The section still has to say what
  // is transmitted, to whom, and that the data may reach the US. The
  // quoted button label is the one the visitor SEES in that language
  // (content key `map.showMap`).
  {
    heading: {
      de: "9. Google Maps (Zwei-Klick-Lösung)",
      en: "9. Google Maps (two-click solution)",
      pl: "9. Google Maps (rozwiązanie dwóch kliknięć)",
    },
    paragraphs: {
      de: [
        "Auf der Kontaktseite und in den Kontaktbereichen dieser Website können Sie eine Karte des Dienstes Google Maps anzeigen lassen. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.",
        "Die Karte ist standardmäßig NICHT eingebunden. Zu sehen ist zunächst nur eine von uns selbst gestaltete Vorschaugrafik mit der Schaltfläche „Karte anzeigen“. Erst wenn Sie diese Schaltfläche anklicken, wird die Karte nachgeladen und eine Verbindung zu Servern von Google hergestellt.",
        "Ab diesem Zeitpunkt wird Ihre IP-Adresse an Google übermittelt; Google kann Cookies setzen und weitere Daten verarbeiten. Rechtsgrundlage ist Ihre durch den Klick erteilte Einwilligung (Art. 6 Abs. 1 lit. a DSGVO sowie § 25 Abs. 1 TDDDG). Sie können die Einwilligung jederzeit widerrufen, indem Sie die Seite neu laden und die Karte nicht erneut anfordern; die Einwilligung wird nicht gespeichert.",
        "Eine Datenübermittlung in die USA kann nicht ausgeschlossen werden; Google ist unter dem EU-US Data Privacy Framework zertifiziert.",
        "Weitere Informationen finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy",
      ],
      en: [
        "On the contact page and in the contact sections of this website you can display a map from the Google Maps service. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.",
        "The map is NOT embedded by default. What you see first is only a preview graphic designed by us with the button “Show map”. Only when you click this button is the map loaded and a connection to Google's servers established.",
        "From that moment your IP address is transmitted to Google; Google may set cookies and process further data. The legal basis is the consent you give by clicking (Art. 6 (1) (a) GDPR and § 25 (1) TDDDG). You may withdraw your consent at any time by reloading the page and not requesting the map again; the consent is not stored.",
        "A transfer of data to the USA cannot be ruled out; Google is certified under the EU-US Data Privacy Framework.",
        "Further information can be found in Google's privacy policy: https://policies.google.com/privacy",
      ],
      pl: [
        "Na stronie kontaktowej i w sekcjach kontaktowych tej strony mogą Państwo wyświetlić mapę z usługi Google Maps. Dostawcą jest Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlandia.",
        "Mapa NIE jest domyślnie osadzona. Najpierw widoczna jest jedynie zaprojektowana przez nas grafika podglądowa z przyciskiem „Pokaż mapę”. Dopiero po kliknięciu tego przycisku mapa jest ładowana i nawiązywane jest połączenie z serwerami Google.",
        "Od tego momentu Państwa adres IP jest przekazywany do Google; Google może zapisywać pliki cookie i przetwarzać dalsze dane. Podstawą prawną jest zgoda udzielona przez kliknięcie (art. 6 ust. 1 lit. a RODO oraz § 25 ust. 1 TDDDG). Zgodę można w każdej chwili odwołać, ponownie ładując stronę i nie żądając mapy ponownie; zgoda nie jest zapisywana.",
        "Nie można wykluczyć przekazania danych do USA; Google posiada certyfikat w ramach EU-US Data Privacy Framework.",
        "Więcej informacji znajdą Państwo w polityce prywatności Google: https://policies.google.com/privacy",
      ],
    },
  },

  // EN: Everything else the visitor can open — catalogues, data sheets —
  // is served from our own server, so no third party is contacted.
  {
    heading: {
      de: "10. Externe Links und Dokumente",
      en: "10. External links and documents",
      pl: "10. Linki zewnętrzne i dokumenty",
    },
    paragraphs: {
      de: [
        "Die Produktkataloge und Datenblätter liegen auf unserem eigenen Server; beim Öffnen wird keine Verbindung zu Dritten aufgebaut.",
        "Beim Anklicken externer Links verlassen Sie diese Website. Ab diesem Zeitpunkt gilt die Datenschutzerklärung des jeweiligen Anbieters.",
      ],
      en: [
        "The product catalogues and data sheets are stored on our own server; opening them establishes no connection to third parties.",
        "When you click on external links you leave this website. From that point on, the privacy policy of the respective provider applies.",
      ],
      pl: [
        "Katalogi produktów i karty techniczne znajdują się na naszym własnym serwerze; przy ich otwieraniu nie jest nawiązywane połączenie z osobami trzecimi.",
        "Klikając linki zewnętrzne, opuszczają Państwo tę stronę. Od tego momentu obowiązuje polityka prywatności danego dostawcy.",
      ],
    },
  },

  // EN: The data subject's rights under the GDPR: access, correction,
  // deletion, restriction, portability, objection, and withdrawal of
  // consent.
  {
    heading: { de: "11. Ihre Rechte", en: "11. Your rights", pl: "11. Państwa prawa" },
    paragraphs: {
      de: [
        "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO) sowie ein Recht auf Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO).",
        `Zur Ausübung genügt eine formlose Nachricht an ${COMPANY.email}.`,
      ],
      en: [
        "You have the right at any time to obtain free information about your stored personal data, its origin and recipients and the purpose of the processing (Art. 15 GDPR), as well as the right to rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection (Art. 21 GDPR).",
        `An informal message to ${COMPANY.email} is sufficient to exercise these rights.`,
      ],
      pl: [
        "Mają Państwo w każdej chwili prawo do bezpłatnej informacji o przechowywanych danych osobowych, ich pochodzeniu i odbiorcach oraz celu przetwarzania (art. 15 RODO), a także prawo do sprostowania (art. 16), usunięcia (art. 17), ograniczenia przetwarzania (art. 18), przenoszenia danych (art. 20) i sprzeciwu (art. 21 RODO).",
        `Do skorzystania z tych praw wystarczy nieformalna wiadomość na adres ${COMPANY.email}.`,
      ],
    },
  },

  // EN: Right to complain to a supervisory authority, naming the one
  // responsible for Baden-Württemberg, where the business is based.
  {
    heading: {
      de: "12. Beschwerderecht bei der Aufsichtsbehörde",
      en: "12. Right to lodge a complaint with a supervisory authority",
      pl: "12. Prawo wniesienia skargi do organu nadzorczego",
    },
    paragraphs: {
      de: [
        "Ihnen steht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.",
      ],
      en: [
        "You have the right to lodge a complaint with a data protection supervisory authority. The competent authority is the State Commissioner for Data Protection and Freedom of Information of Baden-Württemberg (Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg), Lautenschlagerstraße 20, 70173 Stuttgart, Germany.",
      ],
      pl: [
        "Przysługuje Państwu prawo wniesienia skargi do organu nadzorczego ds. ochrony danych. Organem właściwym jest Krajowy Pełnomocnik ds. Ochrony Danych i Wolności Informacji Badenii-Wirtembergii (Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg), Lautenschlagerstraße 20, 70173 Stuttgart, Niemcy.",
      ],
    },
  },

  // EN: The policy applies as of the date shown and may be updated if
  // the site or the law changes. In English and Polish it also states
  // that the German text is the binding one.
  {
    heading: {
      de: "13. Stand und Änderungen",
      en: "13. Version and changes",
      pl: "13. Stan i zmiany",
    },
    paragraphs: {
      de: [
        `Diese Datenschutzerklärung hat den Stand ${LEGAL_UPDATED.de}. Durch die Weiterentwicklung dieser Website oder aufgrund geänderter gesetzlicher Vorgaben kann es notwendig werden, sie anzupassen.`,
      ],
      en: [
        `This privacy policy is dated ${LEGAL_UPDATED.en}. Further development of this website or changes in legal requirements may make it necessary to amend it.`,
        "This English text is a courtesy translation; in case of doubt the German version applies.",
      ],
      pl: [
        `Niniejsza polityka prywatności obowiązuje od: ${LEGAL_UPDATED.pl}. Rozwój tej strony lub zmiana wymogów prawnych mogą wymagać jej dostosowania.`,
        "Niniejszy tekst polski jest tłumaczeniem informacyjnym; w razie wątpliwości obowiązuje wersja niemiecka.",
      ],
    },
  },
];
