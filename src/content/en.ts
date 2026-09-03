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
  // Marca del proveedor, no se traduce; enlace externo del programa
  // de partners de ROKA (ver rokaPartnerUrl en data/company.ts).
  "nav.rokaDoors": "ROKA Doors",
  "nav.contact": "Contact",
  "nav.allCategories": "All categories",

  // ── Etiquetas de contacto ────────────────────────────────────
  "contact.phoneLabel": "Phone",
  "contact.whatsappLabel": "WhatsApp",
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
  "common.browse": "Browse",
  "common.download": "Download",
  "common.openInNewTab": "Open in new tab",
  "common.comingSoon": "Coming soon",

  // ── Hub de productos ─────────────────────────────────────────
  "products.eyebrow": "Product ranges",
  "products.title": "Products",
  "products.intro":
    "Eight ranges covering the whole opening: the element, its shading, its screen and its hardware. Every model page lists the specification and links to the exact catalogue page.",

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
  // Banner del programa de distribuidores ROKA (pedido del dueño).
  "home.rokaEyebrow": "Our entrance-door partner",
  "home.rokaBody":
    "All ROKA collections on the official partner page — Signature, Steel, Select, Essential and Function, always up to date.",
  "home.coloursEyebrow": "Colours and finishes",
  "home.coloursTitle": "RAL, wood decor and anodised",
  "home.coloursIntro":
    "Frames can be finished in a different colour inside and outside — from RAL through wood decors to anodised, each with its original code.",
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
  "map.showMap": "Show map",
  "map.notice":
    "The map is only loaded when you ask for it. Showing it connects your browser to Google Maps, and Google may set cookies.",
  "home.mapAlt": "Map showing the location of Kamika Bauelemente in Hechingen",
  "home.colourRenderAlt": "Window frame shown in the selected colour",
  "home.colourHeroAlt": "Fan of colour samples next to a window profile cutaway",

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
  "catalogue.models": "Models in this catalogue",
  "catalogue.viewAllModels": "View all models",
  "catalogue.modelCount": "{count} models",
  "catalogue.modelsIntro":
    "Every model in the catalogue, straight from its pages. Open one to see its specification and jump to that page of the PDF.",
  "catalogue.fromCatalogue": "From the catalogue",
  "catalogue.openAtPage": "Open catalogue at page {page}",
  "catalogue.otherModels": "Other models in this catalogue",
  "catalogue.modelFamilies": "Series",
  "catalogue.modelNote":
    "Images and data come from the manufacturer's catalogue. Ask us which models are stocked, what they cost and how long they take.",
  // ── Colecciones ──────────────────────────────────────────────
  "collection.heading": "Collections",
  "collection.intro":
    "Each collection is a manufacturer's own catalogue. Open one to see every model in it, with the specification as printed and a link to the exact page of the PDF.",
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
    "Kamika Bauelemente supplies building elements for houses and flats in Hechingen and the surrounding area: windows, patio and entrance doors, roller shutters, insect screens, gates, pergolas and the hardware that goes with them.",
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
  "about.factAreaValue": "Hechingen and around 150–200 km beyond — and further by arrangement",
  "about.factRangesLabel": "Ranges",
  "about.factRangesValue": "{count} product ranges, from windows to hardware",
  "about.factOwnerLabel": "Run by",
  "about.ownerEyebrow": "About me",
  "about.ownerRole": "Managing director",
  // Texto REAL del dueño (2026-08), traducido del alemán. El original
  // alemán está guardado TAL CUAL en de.ts, para publicarlo literal
  // cuando el sitio pase a alemán. Si se retoca la traducción, el
  // alemán no se toca: es su texto, no el nuestro.
  "about.ownerBody1":
    "Behind Kamika stand personal service, experience in the trade and direct cooperation with proven manufacturers. Every project is looked after individually — from the consultation and the measurement on site, through the choice of the right products, to professional installation and final hand-over.",
  "about.ownerBody2":
    "As the owner, I personally stand for the quality of our solutions and for the smooth running of every project.",
  "about.factoryAlt":
    "Aerial view of the production plant where our windows and doors are manufactured",
  "about.factoryCaption":
    "Where the elements are made — our supplier's production plant. Measured, ordered and fitted from Hechingen.",
  "about.ownerPortraitAlt": "Portrait of Dominik Kamieński, owner of Kamika Bauelemente",

  // ── Colores y acabados ───────────────────────────────────────
  "colours.eyebrow": "Colours and finishes",
  "colours.title": "Colours and finishes",
  "colours.intro":
    "Frames can be finished in a different colour inside and outside. RAL powder coatings, wood decor foils, wood stains, anodised aluminium and the numbered shutter-slat palette — filter by finish or by the material you are ordering.",
  "colours.filterGroup": "Finish",
  "colours.filterMaterial": "Material",
  "colours.filterCatalogue": "Catalogue",
  "colours.filterAll": "All",
  "colours.groupRal": "RAL",
  "colours.groupWoodDecor": "Wood decor",
  "colours.groupAnodised": "Anodised",
  "colours.groupWoodStain": "Wood stain",
  "colours.groupLamella": "Shutter slats",
  "colours.groupSalFoil": "Salamander foils",
  "colours.groupPvcFoil": "PVC decor foils",
  "colours.groupPowder": "Powder coating",
  "colours.groupGlass": "Tempered colour glass",
  "colours.groupCeramic": "Ceramic",
  "colours.groupLiquidMetal": "Liquid metal",
  "colours.groupSpecial": "Special",
  "colours.availableOn": "Available on",
  "colours.noMatch": "No finish matches that combination.",
  "colours.disclaimer":
    "Screen colours are approximate: brightness, calibration and the finish of the surface all shift them. Ask for a physical sample before deciding.",
  "colours.count": "{count} finishes",
  "colours.standardSection": "Standard colour charts (RAL, decors, anodised)",
  "colours.standardChip": "Standard",
  "colours.glassEyebrow": "Glazing",
  "colours.glassTitle": "Glass types",
  "colours.glassIntro":
    "The glass decides the character of the whole window or door: how much light comes in, and how much of the room stays private. These are the glass types printed in our catalogues — each sample is photographed with an object behind it, so you can judge the transparency for yourself.",
  "colours.glassCount": "{count} glass types",
  "colours.clickHint": "Click any sample to see it on the window in the live preview above.",
  "colours.approxTone": "The sample is stretched over the frame — the grain scale is preview-only.",
  "colours.previewJump": "View in the frame",

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
  "contactPage.fallbackTitle": "Your message is ready — choose how to send it",
  "contactPage.fallbackBody":
    "The website cannot send email itself yet, so nothing has left your browser. The message is written out below: send it in one tap, or copy it and paste it wherever you like.",
  "contactPage.fallbackAction": "Open in your email app",
  "contactPage.fallbackWhatsApp": "Send by WhatsApp",
  "contactPage.fallbackCopy": "Copy the message",
  "contactPage.fallbackCopied": "Copied",
  "contactPage.fallbackAddress": "Or write to",
  "contactPage.fallbackNoMailApp":
    "If nothing happens when you press the email button, this device has no email app set up — copy the message and paste it into your webmail or a WhatsApp chat.",
  "contactPage.requiredMark": "required",
  "contactPage.errorName": "Please give a name we can address you by.",
  "contactPage.errorEmail": "Please give a valid email address.",
  "contactPage.errorMessage": "Please describe what you need — at least a couple of sentences.",
  "contactPage.errorConsent": "We need this agreement before we may answer by email.",
  "contactPage.enquiryAbout": "Enquiry about {product}",
  "contactPage.enquiryGeneral": "Enquiry from the website",

  // ── Página no encontrada ─────────────────────────────────────
  "notFound.eyebrow": "Error 404",
  "notFound.title": "This page does not exist",
  "notFound.body":
    "The address may be mistyped, or the page may have moved. Everything on the site is one click away from here.",
  "notFound.backHome": "Back to the home page",

  // ── Fabricantes y sistemas ───────────────────────────────────
  "manufacturer.eyebrow": "System manufacturer",
  "manufacturer.systemCountOne": "1 system",
  "manufacturer.systemCountOther": "{count} systems",
  "manufacturer.systemsHeading": "Systems",
  "manufacturer.systemsIntro":
    "Which system an opening needs depends on the wall build-up and on what the room has to hold. That is decided when we measure — these pages show what each system is for.",
  "manufacturer.chooseIntro":
    "This range is quoted by profile system: first the manufacturer, then the series, then the version. Pick the manufacturer to see its systems.",
  "system.versionsTitle": "Versions and specifications",
  "system.versionsComingSoon":
    "The manufacturer's catalogue for this system is being prepared for the site. Until it is online, call or write and we will send the current documentation and advise which version fits your opening.",
  "system.otherSystems": "Other systems",
  "system.fromManufacturer": "A system by",

  // ── Categorías ───────────────────────────────────────────────
  "category.fromCataloguesIntro":
    "Straight from the manufacturers' catalogues, grouped the way they are printed. Every piece opens the catalogue at the page it came from.",
  "category.typesHeading": "Types of door",
  "category.typesIntro":
    "Each type is a range of its own, with its own models, specifications and catalogues. Pick the one that matches the opening.",
  "category.comingSoonTitle": "This range is being prepared",
  "category.comingSoonBody":
    "We supply and install this range, but the catalogue pages are not online yet. Call or write and we will send the current documentation.",
} satisfies Record<string, string>;

/** Todas las claves válidas de la capa de contenido. */
export type ContentKey = keyof typeof en;
