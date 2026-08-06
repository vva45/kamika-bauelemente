# STATUS — checkpoint estable

**Checkpoint:** `checkpoint-1` · estado auditado en commit `46e3d18` (la auditoría
completa) + este fichero encima · 2026-08-06
**Estado:** todo verde. `npm run check` (build + i18n + auditoría de 375 páginas) sin un solo problema.
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

1. **Fabricantes** — Windows → Aluplast → 4 sistemas (IDEAL 4000/5000/7000,
   energeto 8000) → versiones "coming soon" hasta que llegue el catálogo Aluplast.
2. **Colecciones** — Entrance doors → 4 portadas de catálogo (ROKA Signature 100,
   ROKA Select 22, Despiro 48, paneles 144 = **314 modelos extraídos de los PDF**
   por `scripts/extract_catalogue_models.py`). Cada modelo: ficha + specs impresas
   + botón al PDF por su página exacta.
3. **Fichas de producto** — las otras 6 gamas, con 24 productos **de ejemplo**
   (marcados como tales) hasta que lleguen sus catálogos.

## Reglas de negocio que no se tocan

- **Nunca** enlazar la web de un fabricante: catálogo autoalojado + botón a contacto.
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
2. Catálogo Aluplast → rellenar sistemas/versiones de Windows.
3. Catálogos de las otras 6 gamas → sustituir los 24 productos de ejemplo.
4. Traducción alemana (215 claves) y textos reales de /about (retrato, bio).
5. Legal, con abogado: NIF/IVA o Kleinunternehmer, cámara de oficios, horario;
   preguntar por el mapa de dos clics ya de paso.
6. Dominio definitivo (`kamika-bauelemente.de`?) — al conectarlo en Vercel,
   canonical/sitemap se corrigen solos.
