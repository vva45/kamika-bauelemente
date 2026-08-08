# STATUS — checkpoint estable

**Checkpoint:** `checkpoint-3` · 2026-08-08 (los anteriores: `checkpoint-1` en `46e3d18`,
`checkpoint-2` = commit "Llena la página de colores…")
**Estado:** todo verde. `npm run check` (build + i18n + auditoría de 590 páginas) sin un solo problema.
**Volver aquí si algo se rompe:** `git log --oneline` para localizar este punto por
mensaje ("Checkpoint: STATUS.md…"), y `git reset --hard <ese hash>`. Todo commit de
`main` queda en GitHub para siempre: un checkpoint es un hash, la etiqueta es solo
el nombre bonito.

Este fichero es la foto del proyecto en este punto. El detalle vivo de lo que falta
por contenido está en `CONTENT.md`; esto es el resumen de qué hay y por qué.

## Qué es el sitio

Catálogo informativo de Kamika Bauelemente (Dominik Kamienski, Hechingen): ventanas,
puertas y elementos de construcción. Sin tienda, sin precios, sin CMS ni base de
datos. Next.js 16 (App Router, Turbopack), TypeScript estricto, Tailwind 4,
framer-motion, todo el contenido en ficheros TS tipados. Inglés hoy, alemán
preparado (`src/content/en.ts` + `de.ts`, paridad forzada por `check:i18n`;
DE 0/215 — pendiente de traducir).

## Cómo se estructura el catálogo (decisión del dueño)

Cada gama enseña lo más concreto que tiene, en este orden:

1. **Fabricantes** — Windows → 4 marcas: Aluplast (Ideal 5000 y 8000, con ficha
   real del proveedor), Salamander (BluEvolution 82 con ficha; greenEvolution
   Flex y bluEvolution 92 del folleto Salamander), VEKA (82) y REHAU (Synego),
   estos dos a la espera de su ficha. Y Patio doors → Salamander →
   evolutionDrive SF / Plus+ / 82 HST, del mismo folleto (autoalojado, botón
   por página). Specs copiadas, nunca de memoria.
2. **Colecciones** — dos gamas van por catálogo, con **457 modelos extraídos de los
   PDF**, cada uno con ficha, specs impresas y botón al PDF por su página exacta:
   · Entrance doors → ROKA Signature 100, ROKA Select 22, Despiro 48, Aluprof 144,
     D-ART LINE 23, Außentüren 87
     (`extract_catalogue_models.py`, `extract_drutex_models.py`)
   · Roller shutters → Rollläden 20, Fassadenjalousien 8, Drutex 5, en alemán y con
     descripción del fabricante (`extract_shutter_models.py`)
2b. **Mosquiteras** — 1 modelo real (Insektenschutz-Plisee), movido desde el
   catálogo de persianas de Drutex a su gama por decisión del dueño
   (`category` en el modelo). Los 4 ejemplos que había, fuera.
2c. **Puertas de interior** — 1 modelo real: System MB-45 (kalt), el único
   producto de interior en los diez catálogos (el de Außentüren lo recomienda
   "vor allem im Innenbereich"). Mismo mecanismo `category`; los 4 ejemplos,
   fuera. Sin marca: el catálogo white-label no nombra al sistemista.
3. **Accesorios** — 56 piezas sacadas del final de esos mismos catálogos
   (`extract_accessories.py`). Llevan `category: "accessories"`, que las saca del
   escaparate de su colección y las lleva a su gama, agrupadas por familia.
4. **Fichas de producto** — las gamas restantes (gates, fences y las 4
   tarjetas antiguas de persianas), con 12 productos **de ejemplo**
   (marcados como tales) hasta que lleguen sus catálogos.

**Jerarquía de gamas**: `Doors` es un hub que agrupa entrance / interior / patio.
La URL NO se anida —`/products/entrance-doors` sigue igual—; lo que cambia es por
dónde se llega. El contador del hub suma los de sus hijas.

## Reglas de negocio que no se tocan

- **Nunca** enlazar la web de un fabricante: catálogo autoalojado + botón a contacto.
- Los PDF **sin tratar** viven en `source-catalogues/`, fuera de `public/`. Lo que se
  sirve pasa antes por `prepare_drutex.py`: fuera logotipo, web, dirección y QR.
- **Ni rastro de KRISTALL FENSTER** (se limpió hasta del PDF y de la historia git).
- Nada inventado: ni specs, ni biografía, ni horario, ni testimonios.
- No reproducir logotipos ajenos (Aluplast es una lámina neutra; WhatsApp es un
  bocadillo genérico + nombre).
- Imágenes de gama: 3:2, con el wordmark Kamika arriba-izquierda — cualquier
  recorte se lo come primero.

## Qué funciona, verificado en navegador real

- Las 8 gamas con **fotos reales del dueño** (protegidas: `OWNER_PHOTOS` en
  `build-category-heroes.mjs` impide que un script las pise).
- Hero de la home a 3:2 sin recortar logo; mosaico y cabeceras a 3:2.
- Formulario de contacto: Server Action + honeypot + validación doble. **Sin
  RESEND_API_KEY en Vercel aún** → cae al bloque de reserva: mensaje a la vista +
  mailto + **WhatsApp** (+49 162 774 2992, confirmado activo) + copiar.
- Mapa Google con **solución de dos clics** (0 peticiones a Google sin clic,
  medido). Datenschutz §8/§9 reescritos acorde.
- Colores: 126 acabados en siete grupos. Los RAL, de la carta estándar; barnices,
  lamas y los 49 folios SAL, **medidos sobre la muestra impresa** del PDF.
- Home: los 3 catálogos del escaparate son elección del dueño — ROKA Signature,
  Rollladen Produktkatalog y D-ART LINE (`HOME_CATALOGUES` en `src/app/page.tsx`).
- /about ya lleva el retrato real de Dominik (la bio sigue siendo borrador).
- Auditoría: 40 páginas × 2 viewports sin errores de consola/imágenes rotas/
  overflow; teclado y reduced-motion OK; JSON-LD válido; sitemap 372 URLs;
  cabeceras de seguridad activas; 0 vulnerabilidades npm.

## Operativa

- **Una sola rama: `main`** (decisión del dueño). Vercel despliega de `main`.
- Vlad sube imágenes por GitHub web → luego `git fetch` + `git reset --hard
  origin/main` en local, y borrar `.next` si las imágenes se ven viejas.
- Tras reemplazar un PDF de catálogo: re-ejecutar el extractor y
  `build-collection-covers.mjs` (portadas compuestas de Despiro/paneles).

## Pendiente (nada bloquea, todo apuntado también en CONTENT.md)

1. **RESEND_API_KEY + RESEND_FROM en Vercel** — lo único que cambia de verdad
   lo que recibe el dueño (hoy el formulario no envía solo).
2. Fichas de VEKA 82 y REHAU Synego → completar sus páginas de sistema.
   (Terrassentüren: RESUELTO — los 3 sistemas evolutionDrive del folleto Salamander.)
3. Catálogos de las otras 2 gamas → sustituir los 12 productos de ejemplo. Eko-Okna
   los tiene en alemán: gates (Sektionaltore), fences (Grundstückszäune); y
   los de interior doors (hojas CPL/chapa/lacado) y mosquiteras, para
   acompañar a los dos modelos reales que ya hay. En
   accesorios ya solo faltan cilindros; las manillas/vierteaguas/aireadores
   entraron con la página Dodatki del folleto Salamander (nombres en polaco
   hasta que haya catálogo alemán).
4. Traducción alemana (215 claves) y textos reales de /about (retrato, bio).
5. Legal, con abogado: NIF/IVA o Kleinunternehmer, cámara de oficios, horario;
   preguntar por el mapa de dos clics ya de paso.
6. Dominio definitivo (`kamika-bauelemente.de`?) — al conectarlo en Vercel,
   canonical/sitemap se corrigen solos.
