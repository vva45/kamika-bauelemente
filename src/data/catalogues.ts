/**
 * Catálogos REALES, los que envió el proveedor. Ya no son de ejemplo.
 *
 * Título, año, número de páginas y peso están leídos del propio PDF, no
 * estimados. Si se sustituye un fichero hay que volver a leerlos: el
 * peso lo ve el visitante antes de descargar y el número de páginas
 * sale en la tarjeta.
 *
 * Los cuatro son de puertas de entrada; todavía no hay catálogo de
 * ventanas, persianas ni el resto de gamas.
 *
 * ⚠️ Los nombres de marca (ROKA, Despiro) no se traducen nunca.
 *
 * Nota sobre `entrance-door-panels`: el PDF llegó rotulado con el
 * logotipo de OTRA empresa del sector en la primera página. Se sustituyó
 * por el de Kamika dentro del propio fichero —reemplazando los datos de
 * la imagen, no tapándola, así que el logo ajeno ya no existe en el
 * PDF— y se limpiaron los metadatos. Si el proveedor manda una versión
 * nueva, hay que repetir la operación ANTES de publicarla: en esta web
 * no puede aparecer la marca de un competidor.
 */
import type { Catalogue } from "./types";

export const CATALOGUES: Catalogue[] = [
  {
    id: "roka-signature-2025",
    title: { en: "ROKA Signature — entrance doors", de: "ROKA Signature — Haustüren" },
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
    category: "entrance-doors",
    file: "/pdf/catalogues/roka-select-2025.pdf",
    cover: "/images/catalogues/roka-select-2025-cover.jpg",
    pages: 23,
    sizeMb: 11.3,
    year: 2025,
  },
  {
    id: "entrance-door-panels",
    title: { en: "Entrance door panels", de: "Haustür-Paneele" },
    category: "entrance-doors",
    file: "/pdf/catalogues/entrance-door-panels.pdf",
    cover: "/images/catalogues/entrance-door-panels-cover.jpg",
    pages: 194,
    sizeMb: 16.4,
    year: 2025,
  },
  {
    id: "despiro-entrance-doors",
    title: { en: "Despiro entrance doors", de: "Despiro Haustüren" },
    category: "entrance-doors",
    file: "/pdf/catalogues/despiro-entrance-doors.pdf",
    cover: "/images/catalogues/despiro-entrance-doors-cover.jpg",
    pages: 37,
    sizeMb: 5.2,
    year: 2025,
  },
];

export const getCatalogue = (id: string): Catalogue | undefined =>
  CATALOGUES.find((catalogue) => catalogue.id === id);
