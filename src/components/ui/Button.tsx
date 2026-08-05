/**
 * Botones y enlaces con aspecto de botón.
 *
 * Cuatro variantes y ninguna más:
 *  - primary   → negro del logo. La acción principal.
 *  - secondary → contorno. La acción alternativa.
 *  - blue      → azul del logo. Reservado a "Technical data sheet".
 *  - quiet     → sobre foto o fondo azul.
 */
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "blue" | "quiet";
export type ButtonSize = "sm" | "md";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-kamika-ink text-kamika-paper hover:bg-kamika-steel",
  secondary:
    "border border-kamika-ink text-kamika-ink hover:bg-kamika-ink hover:text-kamika-paper",
  blue: "bg-kamika-blue text-kamika-ink hover:bg-kamika-steel hover:text-kamika-paper",
  quiet:
    "border border-kamika-paper/70 bg-kamika-paper/10 text-kamika-paper backdrop-blur-sm hover:bg-kamika-paper hover:text-kamika-ink",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-12 px-6 text-sm",
};

export const buttonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-kamika font-medium",
    "motion-safe:transition-colors motion-safe:duration-200",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
  );

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  /** Enlaces a PDF y a mapas salen en pestaña nueva. */
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(buttonClasses(variant, size), className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(buttonClasses(variant, size), className)} {...rest}>
      {children}
    </button>
  );
}
