/**
 * Modelo de datos del sitio. Todo el contenido de catálogo vive en
 * ficheros TS tipados dentro de `src/data`: sin CMS y sin base de datos.
 */
import type { Localized } from "@/lib/i18n";

export type CategorySlug =
  | "windows"
  | "entrance-doors"
  | "interior-doors"
  | "roller-shutters"
  | "insect-screens"
  | "gates"
  | "fences"
  | "accessories";

export type Material = "pvc" | "aluminium" | "steel" | "wood" | "wood-alu";

export interface Spec {
  label: Localized<string>; // "Frame depth" / "Bautiefe"
  value: string; // "82"
  unit?: string; // "mm"
  highlight?: boolean; // sale también en la cabecera de la ficha
}

export interface ProductImage {
  src: string; // /images/{category}/{id}-1.jpg
  alt: Localized<string>;
  caption?: Localized<string>;
}

export interface Product {
  id: string; // slug único en todo el sitio
  category: CategorySlug;
  name: string; // nombre de modelo, NO se traduce
  tagline: Localized<string>; // una línea, máx ~60 caracteres
  description: Localized<string>; // 2-4 frases, sin marketing hueco
  material?: Material;
  specs: Spec[]; // 6-10, las 3 primeras con highlight
  images: ProductImage[]; // mínimo 3
  datasheet?: string; // /pdf/{category}/{id}.pdf  (ficha propia)
  catalogue?: { id: string; page?: number }; // o página dentro del catálogo general
  related: string[]; // ids de "Goes well with" (cross-category)
  featured?: boolean;
  badge?: "new" | "bestseller";
}

export interface Category {
  slug: CategorySlug;
  name: Localized<string>;
  intro: Localized<string>;
  heroImage: string;
  order: number;
  comingSoon?: boolean; // si true, la página usa el layout coming-soon
}

export interface Catalogue {
  id: string;
  title: Localized<string>; // "Windows & doors 2025"
  category?: CategorySlug; // vacío = catálogo general
  file: string; // /pdf/catalogues/{id}.pdf
  cover: string; // /images/catalogues/{id}-cover.jpg
  pages?: number;
  sizeMb?: number;
  year?: number;
}

export interface Project {
  id: string;
  title: Localized<string>; // "Single-family home, Hechingen"
  location: string;
  year: number;
  categories: CategorySlug[]; // qué se instaló
  summary: Localized<string>; // 2-3 frases: qué pedía el cliente, qué se puso
  images: ProductImage[]; // mínimo 3
  featured?: boolean;
}

export interface ColorFinish {
  id: string;
  name: Localized<string>; // "Anthracite grey" / "Anthrazitgrau"
  code: string; // "RAL 7016"
  hex: string;
  group: "ral" | "wood-decor" | "anodised";
  materials: Material[];
}
