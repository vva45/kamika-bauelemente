/**
 * Imagen para cuando alguien comparte el enlace (WhatsApp, LinkedIn,
 * Google). Se genera en el build, no es un JPG que haya que mantener.
 *
 * Dibuja el mismo gesto que el resto del sitio: un marco de ventana con
 * la marca dentro, en los colores del logo. Sin fotos: una foto de
 * producto en 1200×630 se ve mal recortada en cada red social.
 *
 * Nota técnica: aquí NO se pueden usar `next/font` ni las clases de
 * Tailwind — esto lo pinta Satori en el servidor, con estilos en línea.
 */
import { ImageResponse } from "next/og";
import { COMPANY, companyAddressLine } from "@/data/company";
import { t } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = COMPANY.tradeNameFull;

const INK = "#0F1114";
const BLUE = "#AFC9EF";
const BLUE_50 = "#F0F5FC";
const STEEL = "#2F4C74";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BLUE_50,
          padding: 64,
        }}
      >
        {/* Marco: cerco exterior, galce interior y peinazo, como en la
            máscara del sitio. */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: `2px solid ${STEEL}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 58,
            left: 58,
            right: 58,
            bottom: 58,
            border: `1px solid ${BLUE}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 58,
            bottom: 58,
            left: 600,
            width: 1,
            backgroundColor: BLUE,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: STEEL,
            }}
          >
            {`${COMPANY.city} · ${COMPANY.country}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 600, color: INK, lineHeight: 1 }}>
            {COMPANY.tradeName}
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 30,
              letterSpacing: 14,
              textTransform: "uppercase",
              color: INK,
            }}
          >
            {COMPANY.wordmarkSuffix}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: INK, maxWidth: 900 }}>{t("footer.blurb")}</div>
          <div style={{ marginTop: 18, fontSize: 24, color: STEEL }}>
            {`${companyAddressLine} · ${COMPANY.phone}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
