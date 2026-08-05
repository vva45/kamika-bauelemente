/**
 * Fuente de verdad de TODO el texto visible de la interfaz.
 *
 * Regla dura del proyecto: ningún componente escribe texto a pelo.
 * O sale de aquí (`t('clave')`) o sale de la capa de datos (`src/data`).
 *
 * Al añadir una clave, ejecuta `npm run sync:i18n` para replicarla en
 * `de.ts`, y `npm run check:i18n` para verificar la paridad.
 */
export const en = {
  // ── Accesibilidad ────────────────────────────────────────────
  "a11y.skipToContent": "Skip to content",
  "a11y.mainNavigation": "Main navigation",
  "a11y.breadcrumb": "Breadcrumb",
  "a11y.openMenu": "Open menu",
  "a11y.closeMenu": "Close menu",
  "a11y.openProductsMenu": "Show product categories",
  "a11y.footerNavigation": "Footer navigation",
  "a11y.opensInNewTab": "opens in a new tab",

  // ── Navegación ───────────────────────────────────────────────
  "nav.home": "Home",
  "nav.products": "Products",
  "nav.catalogues": "Catalogues",
  "nav.projects": "Projects",
  "nav.colours": "Colours",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.allCategories": "All categories",

  // ── Etiquetas de contacto ────────────────────────────────────
  "contact.phoneLabel": "Phone",
  "contact.emailLabel": "Email",
  "contact.addressLabel": "Address",
  "contact.hoursLabel": "Opening hours",
  "contact.ownerLabel": "Owner",
  "contact.callUs": "Call us",
  "contact.writeUs": "Write to us",

  // ── Pie ──────────────────────────────────────────────────────
  "footer.productsHeading": "Products",
  "footer.companyHeading": "Company",
  "footer.contactHeading": "Contact",
  "footer.legalHeading": "Legal",
  "footer.imprint": "Imprint",
  "footer.privacy": "Privacy policy",
  "footer.rights": "All rights reserved.",
  "footer.blurb":
    "Windows, doors, roller shutters and building elements. Measured, supplied and installed in Hechingen and the surrounding area.",

  // ── Botones y etiquetas comunes ──────────────────────────────
  "common.viewAll": "View all",
  "common.viewProducts": "View products",
  "common.getInTouch": "Get in touch",
  "common.contactUs": "Contact us",
  "common.downloadCatalogue": "Download catalogue (PDF)",
  "common.browse": "Browse",
  "common.download": "Download",
  "common.openInNewTab": "Open in new tab",
  "common.readMore": "Read more",
  "common.back": "Back",
  "common.comingSoon": "Coming soon",
  "common.pdf": "PDF",

  // ── Producto ─────────────────────────────────────────────────
  "product.datasheet": "Technical data sheet",
  "product.sendEnquiry": "Send enquiry",
  "product.specifications": "Specifications",
  "product.goesWellWith": "Goes well with",
  "product.usedInProjects": "Used in these projects",
  "product.badgeNew": "New",
  "product.badgeBestseller": "Bestseller",
  "product.modelsOne": "1 model",
  "product.modelsOther": "{count} models",

  // ── Home ─────────────────────────────────────────────────────
  "home.heroEyebrow": "Windows · Doors · Roller shutters · Hechingen",
  "home.heroTitle": "Windows, doors and roller shutters, fitted properly.",
  "home.heroSubtitle":
    "We measure on site, supply the elements and install them. PVC, aluminium, steel and timber — one supplier for the whole opening.",
  "home.heroImageAlt": "A fitted window in a house in the Hechingen area",
  "home.scrollHint": "Scroll",
  "home.featuredEyebrow": "Selected models",
  "home.featuredTitle": "Products",
  "home.featuredIntro":
    "Every model has its frame depth, its Uw value and its data sheet. Open the sheet from the card, or the full specification from the product page.",

  // ── Categorías ───────────────────────────────────────────────
  "category.comingSoonTitle": "This range is being prepared",
  "category.comingSoonBody":
    "We supply and install this range, but the catalogue pages are not online yet. Call or write and we will send the current documentation.",
} satisfies Record<string, string>;

/** Todas las claves válidas de la capa de contenido. */
export type ContentKey = keyof typeof en;
