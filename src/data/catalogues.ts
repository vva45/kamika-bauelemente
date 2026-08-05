/**
 * ⚠️ DATOS DE EJEMPLO — PENDIENTES DE SUSTITUIR.
 *
 * Los tres catálogos son de relleno: título, año, nº de páginas y peso
 * hay que ponerlos con los PDF reales cuando el dueño los pase.
 * Los ficheros se autoalojan siempre en /public/pdf/catalogues.
 */
import type { Catalogue } from "./types";

export const CATALOGUES: Catalogue[] = [
  {
    id: "kamika-overview-2025",
    title: { en: "Range overview 2025" },
    file: "/pdf/catalogues/kamika-overview-2025.pdf",
    cover: "/images/catalogues/kamika-overview-2025-cover.jpg",
    pages: 48,
    sizeMb: 6.2,
    year: 2025,
  },
  {
    id: "windows-2025",
    title: { en: "Windows 2025" },
    category: "windows",
    file: "/pdf/catalogues/windows-2025.pdf",
    cover: "/images/catalogues/windows-2025-cover.jpg",
    pages: 56,
    sizeMb: 9.1,
    year: 2025,
  },
  {
    id: "doors-2025",
    title: { en: "Entrance and interior doors 2025" },
    category: "entrance-doors",
    file: "/pdf/catalogues/doors-2025.pdf",
    cover: "/images/catalogues/doors-2025-cover.jpg",
    pages: 52,
    sizeMb: 11.7,
    year: 2025,
  },
];

export const getCatalogue = (id: string): Catalogue | undefined =>
  CATALOGUES.find((catalogue) => catalogue.id === id);
