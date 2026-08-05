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

  // ── Hub de productos ─────────────────────────────────────────
  "products.eyebrow": "Product ranges",
  "products.title": "Products",
  "products.intro":
    "Eight ranges covering the whole opening: the element, its shading, its screen and its hardware. Every model page lists the specification and links to the exact catalogue page.",
  "products.filterLabel": "Material",
  "products.filterAll": "All materials",

  // ── Materiales (etiquetas de filtro y de spec) ──────────────
  "material.pvc": "PVC",
  "material.aluminium": "Aluminium",
  "material.steel": "Steel",
  "material.wood": "Wood",
  "material.wood-alu": "Wood-aluminium",

  // ── Galería y lightbox ───────────────────────────────────────
  "gallery.viewImage": "View image {index} of {total}",
  "gallery.openLightbox": "Open image full screen",
  "gallery.close": "Close full-screen view",
  "gallery.prev": "Previous image",
  "gallery.next": "Next image",

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
  "home.categoriesEyebrow": "What we supply",
  "home.categoriesTitle": "Everything that closes an opening.",
  "home.categoriesIntro":
    "Eight ranges, one supplier and one installation team. The shutter is planned with the window, not bolted on afterwards.",
  "home.cataloguesEyebrow": "Documentation",
  "home.cataloguesTitle": "Browse the catalogues",
  "home.cataloguesIntro":
    "The full ranges as PDF. Read them here or download them — no form, no email address required.",
  "home.projectsEyebrow": "Completed work",
  "home.projectsTitle": "Recent installations",
  "home.projectsIntro":
    "What was asked for, what was fitted, and where. These are the reference for what we can do.",
  "home.coloursEyebrow": "Colours and finishes",
  "home.coloursTitle": "RAL, wood decor and anodised",
  "home.coloursIntro":
    "Frames can be finished in a different colour inside and outside. Hover a swatch to see it on a frame.",
  "home.howEyebrow": "How it works",
  "home.howTitle": "From the first visit to the last adjustment",
  "home.howStep1Title": "Consultation",
  "home.howStep1Body":
    "We look at the opening, the wall build-up and what the room needs. You get a written offer naming the profile, the glazing and the fittings.",
  "home.howStep2Title": "Measuring",
  "home.howStep2Body":
    "Final measurements are taken on site once the offer is accepted, never off a drawing. Production starts from those figures.",
  "home.howStep3Title": "Installation",
  "home.howStep3Body":
    "Old elements out, new ones in, sealed inside and outside. A single-family house is usually one to two days.",
  "home.howStep4Title": "Service",
  "home.howStep4Body":
    "Adjustment, gaskets, fittings and glass replacement afterwards. We keep the order data so spare parts match.",
  "home.ctaEyebrow": "Hechingen · Zollernalbkreis",
  "home.ctaTitle": "Tell us about the opening.",
  "home.ctaBody":
    "Call, write, or send the measurements you already have. You will get an answer from Dominik, not from a call centre.",
  "home.viewOnMap": "View on Google Maps",
  "home.mapAlt": "Map showing the location of Kamika Bauelemente in Hechingen",
  "home.colourRenderAlt": "Window frame shown in the selected colour",

  // ── Catálogos ────────────────────────────────────────────────
  "catalogue.pages": "pages",
  "catalogue.size": "MB",

  // ── Proyectos ────────────────────────────────────────────────
  "project.installed": "Installed",

  // ── Categorías ───────────────────────────────────────────────
  "category.comingSoonTitle": "This range is being prepared",
  "category.comingSoonBody":
    "We supply and install this range, but the catalogue pages are not online yet. Call or write and we will send the current documentation.",
} satisfies Record<string, string>;

/** Todas las claves válidas de la capa de contenido. */
export type ContentKey = keyof typeof en;
