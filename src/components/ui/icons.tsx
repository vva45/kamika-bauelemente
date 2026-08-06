/**
 * Iconos de línea propios, trazo 1.5px, sin relleno.
 * Nada de emojis y ninguna librería de iconos: son diez trazos.
 *
 * Todos heredan el color (`stroke="currentColor"`) y el tamaño se
 * controla con clases (`size-5`). Son decorativos por defecto
 * (`aria-hidden`): el texto que los acompaña es el que informa.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const ArrowDownIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 4v15" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

export const PhoneIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const PinIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const DocumentIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5Z" />
    <path d="M14 3v4.5h4.5" />
    <path d="M9 13h6" />
    <path d="M9 16.5h4" />
  </svg>
);

export const DownloadIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 4v11" />
    <path d="m7.5 11 4.5 4 4.5-4" />
    <path d="M5 19h14" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

/**
 * Bocadillo de conversación, para WhatsApp.
 *
 * NO es el logotipo de WhatsApp. La regla del sitio es no reproducir
 * marcas ajenas —se quitó el logo de un competidor de un catálogo y no
 * se dibuja el de Aluplast—, y el logotipo verde de WhatsApp además se
 * daría de bofetadas con la paleta. El servicio se nombra por escrito
 * al lado, que es lo que de verdad lo identifica.
 */
export const ChatIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M20.5 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.3A8 8 0 1 1 20.5 11.5Z" />
  </svg>
);
