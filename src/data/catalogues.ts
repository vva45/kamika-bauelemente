/**
 * Catálogos REALES, los que envió el proveedor. Ya no son de ejemplo.
 *
 * Título, año, número de páginas y peso están leídos del propio PDF, no
 * estimados. Si se sustituye un fichero hay que volver a leerlos: el
 * peso lo ve el visitante antes de descargar y el número de páginas
 * sale en la tarjeta.
 *
 * Cuatro son de puertas de entrada y dos de persianas. Todavía no hay
 * catálogo de ventanas —esa gama va por fabricante y ficha de sistema—
 * ni del resto de gamas.
 *
 * ⚠️ Los nombres de marca (ROKA, Despiro, Aluprof) no se traducen nunca.
 *
 * Nota sobre `entrance-door-panels`: el PDF llegó rotulado con el
 * logotipo de OTRA empresa del sector en la primera página — no el del
 * fabricante, que es Aluprof según confirmó el dueño, sino el de un
 * competidor local. Se sustituyó por el de Kamika dentro del propio
 * fichero —reemplazando los datos de la imagen, no tapándola, así que
 * el logo ajeno ya no existe en el PDF— y se limpiaron los metadatos.
 * Si el proveedor manda una versión nueva, hay que repetir la operación
 * ANTES de publicarla: en esta web no puede aparecer la marca de un
 * competidor.
 */
import type { Catalogue } from "./types";

export const CATALOGUES: Catalogue[] = [
  {
    id: "roka-signature-2025",
    title: { en: "ROKA Signature — entrance doors", de: "ROKA Signature — Haustüren" },
    brand: "ROKA",
    collection: { en: "Signature", de: "Signature" },
    category: "entrance-doors",
    file: "/pdf/catalogues/roka-signature-2025.pdf",
    cover: "/images/catalogues/roka-signature-2025-cover.jpg",
    pages: 298,
    sizeMb: 27.4,
    year: 2025,
  },
  {
    id: "roka-select-2025",
    title: { en: "ROKA Select — entrance doors", de: "ROKA Select — Haustüren" },
    brand: "ROKA",
    collection: { en: "Select", de: "Select" },
    category: "entrance-doors",
    file: "/pdf/catalogues/roka-select-2025.pdf",
    cover: "/images/catalogues/roka-select-2025-cover.jpg",
    pages: 23,
    sizeMb: 11.3,
    year: 2025,
  },
  {
    id: "despiro-entrance-doors",
    title: { en: "Despiro entrance doors", de: "Despiro Haustüren" },
    brand: "Despiro",
    collection: { en: "Entrance doors", de: "Haustüren" },
    category: "entrance-doors",
    file: "/pdf/catalogues/despiro-entrance-doors.pdf",
    cover: "/images/catalogues/despiro-entrance-doors-cover.jpg",
    pages: 37,
    sizeMb: 5.2,
    year: 2025,
  },
  {
    id: "entrance-door-panels",
    title: { en: "Aluprof entrance door panels", de: "Aluprof Haustür-Paneele" },
    // Estuvo sin marca mientras no constaba el fabricante; el dueño
    // confirmó que es Aluprof (2026-08). El logotipo que traía el PDF
    // era de un competidor, no de Aluprof — ver la nota de arriba.
    brand: "Aluprof",
    collection: { en: "Door panels", de: "Haustür-Paneele" },
    category: "entrance-doors",
    file: "/pdf/catalogues/entrance-door-panels.pdf",
    cover: "/images/catalogues/entrance-door-panels-cover.jpg",
    pages: 194,
    sizeMb: 16.4,
    year: 2025,
  },
  {
    id: "rollladen-produktkatalog",
    title: { en: "Roller shutters — product catalogue", de: "Rollladen Produktkatalog" },
    // Sin marca a propósito: el fabricante de estas persianas vende
    // también directamente al cliente final en Alemania, así que su
    // nombre y sus enlaces se quitaron del PDF autoalojado. Enseñar la
    // marca aquí sería mandarle el cliente. Ver la nota de arriba.
    collection: { en: "Roller shutters", de: "Rollläden" },
    category: "roller-shutters",
    file: "/pdf/catalogues/rollladen-produktkatalog.pdf",
    cover: "/images/catalogues/rollladen-produktkatalog-cover.jpg",
    pages: 54,
    sizeMb: 27.4,
    year: 2026,
  },
  {
    id: "fassadenjalousien",
    title: { en: "Facade blinds — catalogue", de: "Katalog der Fassadenjalousien" },
    collection: { en: "Facade blinds", de: "Fassadenjalousien" },
    category: "roller-shutters",
    file: "/pdf/catalogues/fassadenjalousien.pdf",
    cover: "/images/catalogues/fassadenjalousien-cover.jpg",
    pages: 34,
    sizeMb: 20.8,
    year: 2026,
  },
];

export const getCatalogue = (id: string): Catalogue | undefined =>
  CATALOGUES.find((catalogue) => catalogue.id === id);
