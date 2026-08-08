/**
 * Modelo de datos del sitio. Todo el contenido de catálogo vive en
 * ficheros TS tipados dentro de `src/data`: sin CMS y sin base de datos.
 */
import type { Localized } from "@/lib/i18n";

export type CategorySlug =
  | "windows"
  | "doors"
  | "entrance-doors"
  | "patio-doors"
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
  /**
   * Gama padre, para las que son un tipo dentro de otra.
   *
   * Lo pidió el dueño para puertas: en vez de tres entradas sueltas en
   * la home, una sola —"Doors"— y dentro los tipos. La URL NO se anida
   * (`/products/entrance-doors` sigue siendo la misma): lo que cambia
   * es por dónde se llega, no dónde vive. Anidarla habría roto los
   * enlaces ya compartidos a cambio de nada.
   */
  parent?: CategorySlug;
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
  /**
   * Fabricante del catálogo. No se traduce y NUNCA se enlaza a su web.
   *
   * Es lo que pidió el dueño: que el visitante vea primero de quién es
   * la gama y después qué colecciones tiene. Un catálogo sin marca
   * conocida —los paneles— simplemente no la lleva; antes que inventarla
   * se queda sin ella.
   */
  brand?: string;
  /**
   * Nombre corto de la colección para las tarjetas: "Signature",
   * "Select". El `title` sigue siendo el nombre completo del PDF, que es
   * lo que se enseña en la página de catálogos.
   */
  collection?: Localized<string>;
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
  /**
   * Modelos de catálogo que se instalaron, por catálogo e id.
   *
   * Desde que las puertas de entrada se enseñan por colección y no por
   * ficha propia, lo que se instaló en una casa es un modelo del
   * catálogo, no un `Product`. Los que no existan se descartan solos.
   */
  models?: { catalogue: string; id: string }[];
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
  /**
   * Las specs tal y como están impresas. `label` vacío = viñeta suelta
   * (los catálogos de persianas listan ventajas sin etiqueta).
   */
  specs: { label: string; value: string }[];
  /**
   * Párrafo del fabricante, cuando el catálogo lo trae. Los de puertas
   * no lo tienen —son rejillas de fotos— y los de persianas sí.
   */
  description?: string;
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
  /**
   * Descripción y specs, SOLO cuando llegan del fabricante.
   *
   * El proveedor manda fichas de una página por sistema (Ideal 5000,
   * BluEvolution 82…) y de ahí sale todo esto copiado, no redactado.
   * Un sistema sin ficha simplemente no lleva estos campos y su página
   * dice honestamente que los datos están en camino.
   */
  description?: Localized<string>;
  specs?: Spec[];
  /** La ficha del fabricante, autoalojada: /pdf/windows/{id}.pdf. */
  datasheet?: string;
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
