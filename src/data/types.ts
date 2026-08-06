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
  /**
   * Modelos concretos que se instalaron, por id de producto.
   *
   * No venía en el modelo de datos del encargo, pero el detalle de
   * proyecto tiene que enlazar a las fichas de lo que se puso. Deducirlo
   * de `categories` daría una lista inventada: "se instalaron ventanas"
   * no es lo mismo que "se instaló este modelo". Es opcional: un
   * proyecto sin lista simplemente no enseña el bloque.
   */
  products?: string[];
  featured?: boolean;
}

/**
 * Un modelo tal y como sale en un catálogo del proveedor.
 *
 * No es un `Product`: los productos son los cuatro que Kamika destaca,
 * con ficha larga, galería y "goes well with". Esto es el escaparate
 * completo del catálogo —trescientos y pico— para que el cliente pueda
 * mirarlos sin descargarse un PDF de 27 MB.
 *
 * Lo genera `scripts/extract_catalogue_models.py` leyendo los PDF, así
 * que aquí no hay texto redactado: nombre, página, imagen y specs salen
 * del catálogo. Por eso las specs son texto plano y no `Localized`.
 */
export interface CatalogueModel {
  id: string; // único dentro de su catálogo
  catalogue: string; // id del catálogo al que pertenece
  name: string; // nombre del modelo, no se traduce
  /** Familia dentro de la colección, si el catálogo la declara. */
  family?: string;
  page: number; // página del PDF, para el enlace #page=N
  image: string;
  specs: { label: string; value: string }[];
}

/**
 * Un fabricante de sistemas dentro de una gama, y sus sistemas.
 *
 * Es la jerarquía que pidió el dueño para ventanas: la categoría enseña
 * fabricantes, el fabricante enseña sus sistemas, y cada sistema tendrá
 * sus versiones cuando llegue su catálogo. Los sistemas no llevan specs
 * aquí a propósito: se rellenarán desde el catálogo del fabricante,
 * nunca redactadas de memoria.
 */
export interface ManufacturerSystem {
  id: string; // slug dentro del fabricante
  name: string; // nombre del sistema, no se traduce
  tagline: Localized<string>;
  image: string;
  /** Catálogo autoalojado del sistema, cuando exista. */
  catalogue?: { id: string; page?: number };
}

export interface Manufacturer {
  id: string; // slug único dentro de su categoría
  category: CategorySlug;
  name: string; // marca, no se traduce
  tagline: Localized<string>;
  intro: Localized<string>;
  image: string;
  systems: ManufacturerSystem[];
}

export interface ColorFinish {
  id: string;
  name: Localized<string>; // "Anthracite grey" / "Anthrazitgrau"
  code: string; // "RAL 7016"
  hex: string;
  group: "ral" | "wood-decor" | "anodised";
  materials: Material[];
}
