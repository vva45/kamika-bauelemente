/**
 * Textos legales, EN ALEMÁN Y SIEMPRE EN ALEMÁN.
 *
 * Es la única excepción a la regla "todo el sitio en inglés hasta la
 * fase de traducción": el Impressum (§ 5 DDG) y la Datenschutzerklärung
 * (DSGVO) son obligaciones legales alemanas y tienen que estar en
 * alemán desde el primer día. Por eso no pasan por `en.ts` / `de.ts`:
 * no son interfaz traducible, son documentos.
 *
 * Encima de cada bloque hay un comentario EN INGLÉS explicando qué dice
 * —petición expresa del encargo—, para poder revisar qué se publica sin
 * saber alemán.
 *
 * ⚠️ ESTO NO ES ASESORAMIENTO JURÍDICO. Ambos textos son un borrador
 * estándar del sector y TIENEN QUE PASAR POR UN ABOGADO ALEMÁN antes de
 * publicar el sitio. Faltan además datos del dueño (USt-IdNr., cámara
 * profesional): ver CONTENT.md.
 */
import { COMPANY, companyAddressLine } from "@/data/company";

export type LegalBlock = {
  heading: string;
  paragraphs: string[];
};

/** Fecha de la última revisión. Actualízala cuando el abogado la revise. */
export const LEGAL_UPDATED = "August 2026";

export const IMPRINT_TITLE = "Impressum";
export const PRIVACY_TITLE = "Datenschutzerklärung";

/** Aviso corto bajo el h1 de cada documento. */
export const LEGAL_UPDATED_LABEL = `Stand: ${LEGAL_UPDATED}`;

// ── Impressum (§ 5 DDG) ──────────────────────────────────────────

export const IMPRINT_BLOCKS: LegalBlock[] = [
  // EN: Legally required identification of the site operator under § 5
  // DDG (the law that replaced the TMG in 2024): legal name of the
  // business, its form (sole trader) and its postal address.
  {
    heading: "Angaben gemäß § 5 DDG",
    paragraphs: [
      COMPANY.legalName,
      `${COMPANY.tradeNameFull}`,
      `${companyAddressLine}`,
      COMPANY.country,
    ],
  },

  // EN: Who runs the business — the owner, named personally, as a sole
  // trader must be.
  {
    heading: "Vertreten durch",
    paragraphs: [`${COMPANY.owner} (Inhaber)`],
  },

  // EN: How to reach the business: phone and email. Both are the real
  // ones used everywhere else on the site.
  {
    heading: "Kontakt",
    paragraphs: [`Telefon: ${COMPANY.phone}`, `E-Mail: ${COMPANY.email}`],
  },

  // EN: VAT identification number. Only published when the owner has
  // confirmed one — a sole trader under the small-business rule
  // (§ 19 UStG) may not have one at all.
  ...(COMPANY.vatId
    ? [
        {
          heading: "Umsatzsteuer-Identifikationsnummer",
          paragraphs: [
            "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:",
            COMPANY.vatId,
          ],
        },
      ]
    : []),

  // EN: Professional title and chamber of trade (Handwerkskammer).
  // Required for regulated trades; only published once confirmed.
  ...(COMPANY.chamber
    ? [
        {
          heading: "Berufsrechtliche Angaben",
          paragraphs: [COMPANY.chamber, "Verliehen in: Deutschland"],
        },
      ]
    : []),

  // EN: Consumer dispute resolution. States that the business is not
  // obliged and not willing to take part in dispute resolution
  // proceedings before a consumer arbitration board (§ 36 VSBG).
  {
    heading: "Verbraucherstreitbeilegung",
    paragraphs: [
      "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },

  // EN: Liability for the site's own content — the operator is
  // responsible for its own content under § 7 DDG, but is not obliged
  // to monitor third-party information it transmits or stores.
  {
    heading: "Haftung für Inhalte",
    paragraphs: [
      "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    ],
  },

  // EN: Liability for external links — the operator has no influence
  // over linked third-party sites and removes links if it learns of a
  // legal violation.
  {
    heading: "Haftung für Links",
    paragraphs: [
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
      "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    ],
  },

  // EN: Copyright — the texts, photographs and drawings on the site are
  // protected; downloads and copies are permitted for private,
  // non-commercial use only.
  {
    heading: "Urheberrecht",
    paragraphs: [
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
      "Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Produktkataloge und technische Datenblätter dürfen zur eigenen Information heruntergeladen werden; die Rechte an ihren Inhalten liegen bei den jeweiligen Herstellern.",
    ],
  },
];

// ── Datenschutzerklärung (DSGVO) ─────────────────────────────────

export const PRIVACY_BLOCKS: LegalBlock[] = [
  // EN: Who is responsible for the data processing — the controller
  // under Art. 4(7) GDPR, with the same address and contact details as
  // the imprint.
  {
    heading: "1. Verantwortlicher",
    paragraphs: [
      "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:",
      `${COMPANY.legalName}, ${COMPANY.owner}`,
      `${companyAddressLine}, ${COMPANY.country}`,
      `Telefon: ${COMPANY.phone} · E-Mail: ${COMPANY.email}`,
    ],
  },

  // EN: General statement — the site is an information site, personal
  // data is only processed where technically necessary or where the
  // visitor sends it themselves.
  {
    heading: "2. Allgemeines zur Datenverarbeitung",
    paragraphs: [
      "Diese Website ist eine reine Informationsseite. Personenbezogene Daten werden nur verarbeitet, soweit dies für die Bereitstellung der Website technisch erforderlich ist oder soweit Sie uns Daten selbst übermitteln, etwa über das Kontaktformular, per E-Mail oder per Telefon.",
      "Eine Nutzerregistrierung, ein Kundenkonto oder ein Bestellvorgang bestehen nicht.",
    ],
  },

  // EN: Hosting on Vercel — names the processor, its address, that a
  // data processing agreement is in place, and the legal basis
  // (legitimate interest in a secure, efficiently provided website).
  {
    heading: "3. Hosting",
    paragraphs: [
      "Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet. Beim Aufruf der Website werden die dabei anfallenden Verbindungsdaten auf den Servern des Anbieters verarbeitet.",
      "Mit Vercel besteht ein Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO. Die Übermittlung in die USA wird auf die Standardvertragsklauseln der Europäischen Kommission gestützt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: unser berechtigtes Interesse an einer sicheren und zuverlässig bereitgestellten Website.",
    ],
  },

  // EN: Server log files — the technical data every web server records
  // (IP address, time, page requested, browser), why it is kept, and
  // that it is not merged with other data.
  {
    heading: "4. Server-Logfiles",
    paragraphs: [
      "Beim Aufruf der Website werden automatisch Informationen erfasst, die Ihr Browser übermittelt: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Uhrzeit der Serveranfrage, die aufgerufene Seite und die IP-Adresse.",
      "Diese Daten sind für uns nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt. Sie werden zur technischen Bereitstellung, zur Fehleranalyse und zur Abwehr von Angriffen verarbeitet (Art. 6 Abs. 1 lit. f DSGVO) und nach kurzer Zeit gelöscht.",
    ],
  },

  // EN: The contact form — which fields are processed, that the consent
  // checkbox is the legal basis alongside pre-contractual steps, how
  // long the enquiry is kept, and that consent can be withdrawn.
  {
    heading: "5. Kontaktformular",
    paragraphs: [
      "Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von Ihnen angegebenen Daten: Name, E-Mail-Adresse, gegebenenfalls Telefonnummer, das gewählte Produkt und den Inhalt Ihrer Nachricht.",
      "Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO sowie, soweit Ihre Anfrage auf einen Vertrag gerichtet ist, Art. 6 Abs. 1 lit. b DSGVO. Sie können Ihre Einwilligung jederzeit formlos per E-Mail widerrufen; die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.",
      "Die Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern oder der Zweck der Speicherung entfällt. Zwingende gesetzliche Aufbewahrungsfristen — insbesondere handels- und steuerrechtliche — bleiben unberührt.",
    ],
  },

  // EN: Email dispatch service. NOTE FOR THE OWNER: this block is only
  // accurate while enquiries are actually sent through Resend
  // (RESEND_API_KEY set in Vercel). If the form ends up delivering only
  // through the visitor's own mail client, DELETE this block.
  {
    heading: "6. Versand der Formularnachrichten",
    paragraphs: [
      "Für die Zustellung der über das Kontaktformular abgesendeten Nachrichten setzen wir den Versanddienstleister Resend (Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA) ein. Dabei werden die von Ihnen eingegebenen Daten zum Zweck der Zustellung verarbeitet.",
      "Es besteht ein Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO; die Übermittlung in die USA wird auf die Standardvertragsklauseln gestützt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: unser berechtigtes Interesse an einer zuverlässigen Zustellung von Anfragen.",
    ],
  },

  // EN: Contact by email or telephone — the same rules apply to
  // enquiries that arrive outside the form.
  {
    heading: "7. Anfragen per E-Mail oder Telefon",
    paragraphs: [
      "Wenn Sie uns per E-Mail oder telefonisch kontaktieren, werden Ihre Angaben einschließlich aller daraus hervorgehenden personenbezogenen Daten zum Zweck der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Es gelten dieselben Rechtsgrundlagen und Löschfristen wie beim Kontaktformular.",
    ],
  },

  // EN: No cookies, no analytics, no third-party fonts or embeds. This
  // is a factual description of how the site is actually built — it is
  // why the site needs no cookie banner. Do not publish this paragraph
  // if analytics or an embedded map are ever added.
  {
    heading: "8. Keine Cookies, keine Analyse-Werkzeuge",
    paragraphs: [
      "Diese Website setzt keine Cookies, verwendet keine Tracking- oder Analysedienste und bindet keine Inhalte Dritter nach (keine externen Schriftarten, keine eingebetteten Karten, keine Social-Media-Plugins). Die verwendeten Schriftarten werden von unserem eigenen Server ausgeliefert.",
      "Aus diesem Grund ist auch keine Einwilligung in Cookies erforderlich.",
    ],
  },

  // EN: External links — the map is a plain link to Google Maps, opened
  // only if the visitor clicks it, and from that point Google's own
  // privacy policy applies.
  {
    heading: "9. Externe Links",
    paragraphs: [
      "Die Standortkarte auf dieser Website ist eine Bilddatei mit einem Link zu Google Maps und keine Einbettung. Eine Verbindung zu Google wird erst hergestellt, wenn Sie den Link aktiv anklicken. Ab diesem Zeitpunkt gilt die Datenschutzerklärung von Google.",
      "Auch die Produktkataloge und Datenblätter liegen auf unserem eigenen Server; beim Öffnen wird keine Verbindung zu Dritten aufgebaut.",
    ],
  },

  // EN: The data subject's rights under the GDPR: access, correction,
  // deletion, restriction, portability, objection, and withdrawal of
  // consent.
  {
    heading: "10. Ihre Rechte",
    paragraphs: [
      "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO) sowie ein Recht auf Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO).",
      `Zur Ausübung genügt eine formlose Nachricht an ${COMPANY.email}.`,
    ],
  },

  // EN: Right to complain to a supervisory authority, naming the one
  // responsible for Baden-Württemberg, where the business is based.
  {
    heading: "11. Beschwerderecht bei der Aufsichtsbehörde",
    paragraphs: [
      "Ihnen steht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.",
    ],
  },

  // EN: The policy applies as of the date shown and may be updated if
  // the site or the law changes.
  {
    heading: "12. Stand und Änderungen",
    paragraphs: [
      `Diese Datenschutzerklärung hat den Stand ${LEGAL_UPDATED}. Durch die Weiterentwicklung dieser Website oder aufgrund geänderter gesetzlicher Vorgaben kann es notwendig werden, sie anzupassen.`,
    ],
  },
];
