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
  "contact.ownerLabel": "Owner",

  // ── Pie ──────────────────────────────────────────────────────
  "footer.productsHeading": "Products",
  "footer.companyHeading": "Company",
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
  // Reservada: regla de negocio para marcas de terceros — nunca se
  // enlaza a la web del fabricante, se autoaloja su PDF y este es el
  // botón secundario. Todavía no hay ninguna marca de terceros.
  "common.downloadCatalogue": "Download catalogue (PDF)",
  "common.browse": "Browse",
  "common.download": "Download",
  "common.openInNewTab": "Open in new tab",
  "common.comingSoon": "Coming soon",

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
  "catalogues.eyebrow": "Documentation",
  "catalogues.title": "Catalogues",
  "catalogues.intro":
    "The full ranges as PDF. Read them here in the browser or download them — no form and no email address required.",
  "catalogue.openCatalogue": "Open catalogue",
  "catalogue.viewerHint": "Use the viewer controls to page through, zoom or print.",
  "catalogue.mobileNote":
    "Phone browsers display embedded PDFs badly, so the catalogue opens in your own PDF viewer instead.",
  "catalogue.fallbackBody":
    "This browser cannot display the PDF on the page. Open it in a new tab or download it.",
  "catalogue.general": "General catalogue",
  "catalogue.otherCatalogues": "Other catalogues",
  "catalogue.comingSoonTitle": "The catalogues are being prepared",
  "catalogue.comingSoonBody":
    "The PDF ranges are not online yet. Call or write and we will send you the current documentation by email.",

  // ── Proyectos ────────────────────────────────────────────────
  "project.installed": "Installed",
  "projects.eyebrow": "Completed work",
  "projects.title": "Projects",
  "projects.intro":
    "What the customer asked for, what was fitted and where. Filter by the range that was installed or by year.",
  "projects.filterCategory": "Range",
  "projects.filterYear": "Year",
  "projects.filterAll": "All",
  "projects.noMatch": "No project matches that combination yet.",
  "projects.comingSoonTitle": "The first projects are being documented",
  "projects.comingSoonBody":
    "Photographs of completed installations are being collected. Call or write and we will show you work in your area.",
  "project.productsUsed": "What was fitted",
  "project.locationLabel": "Location",
  "project.yearLabel": "Year",
  "project.allProjects": "All projects",

  // ── Sobre la empresa ─────────────────────────────────────────
  "about.eyebrow": "Hechingen · Zollernalbkreis",
  "about.title": "A one-man business that measures, supplies and fits.",
  "about.intro":
    "Kamika Bauelemente supplies building elements for houses and flats in Hechingen and the surrounding area: windows, entrance and interior doors, roller shutters, insect screens, gates, fences and the hardware that goes with them.",
  "about.companyHeading": "The company",
  "about.companyBody1":
    "Every job runs the same way: the opening is looked at on site, the offer names the profile, the glazing and the fittings, and the final measurements are taken only once the offer is accepted. Nothing is ordered off a drawing.",
  "about.companyBody2":
    "Because the whole opening comes from one supplier, the shutter box, the insect screen and the window are planned together instead of being bolted on afterwards — the colours match and the sizes fit the first time.",
  "about.companyBody3":
    "After the installation the same person handles adjustment, gaskets, fittings and glass replacement. The order data stays on file so spare parts match years later.",
  "about.factsHeading": "At a glance",
  "about.factLocationLabel": "Based in",
  "about.factAreaLabel": "Working area",
  "about.factAreaValue": "Hechingen, Zollernalbkreis and the surrounding towns",
  "about.factRangesLabel": "Ranges",
  "about.factRangesValue": "{count} product ranges, from windows to hardware",
  "about.factOwnerLabel": "Run by",
  "about.ownerEyebrow": "About me",
  "about.ownerRole": "Inhaber",
  "about.ownerBody1":
    "I have been fitting windows and doors in this area for years, first for other companies and now under my own name. I still do the measuring and the installation myself, which is why the person who quotes the job is the person who turns up to do it.",
  "about.ownerBody2":
    "If something needs adjusting afterwards, you call me directly — not a service line.",
  "about.ownerPortraitAlt": "Portrait of Dominik Kamienski, owner of Kamika Bauelemente",

  // ── Colores y acabados ───────────────────────────────────────
  "colours.eyebrow": "Colours and finishes",
  "colours.title": "Colours and finishes",
  "colours.intro":
    "Frames can be finished in a different colour inside and outside. RAL powder coatings, wood decor foils and anodised aluminium — filter by finish or by the material you are ordering.",
  "colours.filterGroup": "Finish",
  "colours.filterMaterial": "Material",
  "colours.filterAll": "All",
  "colours.groupRal": "RAL",
  "colours.groupWoodDecor": "Wood decor",
  "colours.groupAnodised": "Anodised",
  "colours.availableOn": "Available on",
  "colours.noMatch": "No finish matches that combination.",
  "colours.disclaimer":
    "Screen colours are approximate: brightness, calibration and the finish of the surface all shift them. Ask for a physical sample before deciding.",
  "colours.count": "{count} finishes",

  // ── Contacto ─────────────────────────────────────────────────
  "contactPage.eyebrow": "Hechingen · Zollernalbkreis",
  "contactPage.title": "Contact",
  "contactPage.intro":
    "Describe the opening, or send the measurements you already have. You will get an answer from Dominik, not from a call centre.",
  "contactPage.formHeading": "Send a message",
  "contactPage.detailsHeading": "Direct contact",
  "contactPage.nameLabel": "Name",
  "contactPage.emailLabel": "Email",
  "contactPage.phoneLabel": "Phone (optional)",
  "contactPage.productLabel": "Product of interest (optional)",
  // La misma etiqueta, sin el "(optional)", para la línea del email que
  // recibe el dueño: allí no hay nada que sea opcional.
  "contactPage.productEmailLabel": "Product of interest",
  "contactPage.messageLabel": "Message",
  "contactPage.messagePlaceholder":
    "Type of element, number of openings, approximate sizes, and when you need it.",
  "contactPage.consentLabel":
    "I agree that my details may be used to answer this enquiry, as described in the",
  "contactPage.consentLink": "privacy policy",
  "contactPage.submit": "Send message",
  "contactPage.sending": "Sending…",
  "contactPage.successTitle": "Message sent",
  "contactPage.successBody":
    "Thank you — the enquiry has arrived. You will normally get an answer within one working day.",
  "contactPage.errorTitle": "The message could not be sent",
  "contactPage.errorBody": "Please try again, or call the number on this page.",
  "contactPage.fallbackTitle": "Finish sending from your email app",
  "contactPage.fallbackBody":
    "The message could not be sent from the website. Your text has been prepared as an email — open it and press send.",
  "contactPage.fallbackAction": "Open in your email app",
  "contactPage.requiredMark": "required",
  "contactPage.errorName": "Please give a name we can address you by.",
  "contactPage.errorEmail": "Please give a valid email address.",
  "contactPage.errorMessage": "Please describe what you need — at least a couple of sentences.",
  "contactPage.errorConsent": "We need this agreement before we may answer by email.",
  "contactPage.enquiryAbout": "Enquiry about {product}",
  "contactPage.enquiryGeneral": "Enquiry from the website",

  // ── Categorías ───────────────────────────────────────────────
  "category.comingSoonTitle": "This range is being prepared",
  "category.comingSoonBody":
    "We supply and install this range, but the catalogue pages are not online yet. Call or write and we will send the current documentation.",
} satisfies Record<string, string>;

/** Todas las claves válidas de la capa de contenido. */
export type ContentKey = keyof typeof en;
