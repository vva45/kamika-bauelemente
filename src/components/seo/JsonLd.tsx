/**
 * Inyecta un bloque JSON-LD.
 *
 * `dangerouslySetInnerHTML` es la forma correcta aquí: React escaparía
 * las comillas del JSON y el buscador no podría leerlo. El contenido no
 * viene de fuera —lo construimos nosotros desde la capa de datos—, pero
 * aun así se escapa `<` para que un texto no pueda cerrar el <script>.
 */
export function JsonLd({ schema }: { schema: object }) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
