"use client";

/**
 * Navegación principal: barra en desktop (con desplegable de
 * categorías) y menú a pantalla completa en móvil.
 *
 * Los enlaces llegan como props desde el Header, que es un componente
 * de servidor: así el cliente no se descarga toda la capa de datos de
 * categorías solo para pintar ocho nombres.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/layout/LocaleProvider";

export type NavLink = {
  href: string;
  label: string;
  /** Tipos que cuelgan de una gama (los tres de puertas). */
  children?: NavLink[];
};

type SiteNavProps = {
  links: NavLink[];
  categories: NavLink[];
  phone: string;
  phoneHref: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteNav({ links, categories, phone, phoneHref }: SiteNavProps) {
  const { t, routes } = useI18n();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const smoothScroll = useSmoothScroll();

  /**
   * El menú móvil se pinta con un portal en <body>, y no donde vive el
   * componente. Motivo, que costó una tarde: el <header> lleva
   * `backdrop-blur`, y un backdrop-filter convierte al elemento en
   * bloque contenedor de sus descendientes `position: fixed`. Dentro del
   * header, `fixed inset-0` no se resuelve contra la ventana sino contra
   * la barra: el panel quedaba recortado a la altura del header y solo
   * se veía su fila con la X. Fuera del header, vuelve a ser la ventana.
   *
   * La comprobación de `document` evita pintar el portal en el
   * servidor, donde no hay DOM. Con el menú cerrado el portal no mete
   * nada en <body>, así que la hidratación no ve ninguna diferencia.
   */
  const canPortal = typeof document !== "undefined";

  // Al navegar, se cierra todo. Sin esto el menú se queda abierto sobre
  // la página nueva. Se ajusta en render, no en un efecto: así no hay
  // un frame intermedio con el menú abierto sobre la ruta nueva.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setMenuOpen(false);
    setProductsOpen(false);
  }

  // Mientras el menú a pantalla completa está abierto, la página de
  // detrás no se mueve.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    smoothScroll.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      smoothScroll.start();
    };
  }, [menuOpen, smoothScroll]);

  // Escape cierra lo que esté abierto, empezando por lo más superficial.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (productsOpen) {
        setProductsOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (menuOpen) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, productsOpen]);

  // Foco atrapado dentro del menú móvil mientras está abierto.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname],
  );

  const linkClasses = (href: string) =>
    cn(
      "relative py-2 text-sm font-medium motion-safe:transition-colors",
      isActive(href) ? "text-kamika-ink" : "text-kamika-ink/65 hover:text-kamika-ink",
    );

  return (
    <>
      {/* ── Barra de desktop ─────────────────────────────────── */}
      <nav aria-label={t("a11y.mainNavigation")} className="hidden lg:block">
        <ul className="flex items-center gap-7">
          <li
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <span className="flex items-center gap-1">
              <Link href={routes.products} className={linkClasses(routes.products)}>
                {t("nav.products")}
                {isActive(routes.products) && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-kamika-steel" />
                )}
              </Link>
              <button
                ref={triggerRef}
                type="button"
                aria-label={t("a11y.openProductsMenu")}
                aria-expanded={productsOpen}
                aria-controls={productsId}
                onClick={() => setProductsOpen((open) => !open)}
                className="rounded-kamika p-1 text-kamika-ink/65 hover:text-kamika-ink"
              >
                <ChevronDownIcon
                  className={cn(
                    "size-4 motion-safe:transition-transform motion-safe:duration-200",
                    productsOpen && "rotate-180",
                  )}
                />
              </button>
            </span>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  id={productsId}
                  initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  // Una columna desde que las puertas cuelgan de su gama: en dos, la
                  // fila del grupo alto dejaba un hueco muerto al lado.
                  className="absolute top-full left-0 z-50 w-[19rem] rounded-kamika border border-kamika-mist bg-kamika-paper p-2 shadow-profile"
                >
                  <ul className="grid">
                    {categories.map((category) => (
                      <li key={category.href}>
                        <Link
                          href={category.href}
                          className="block rounded-kamika px-3 py-2 text-sm text-kamika-ink/80 hover:bg-kamika-blue-50 hover:text-kamika-ink"
                        >
                          {category.label}
                        </Link>
                        {/* Los tipos de puerta, sangrados bajo su gama:
                            el visitante que busca "entrance doors" la ve
                            aquí y no a dos clics. */}
                        {category.children && (
                          <ul className="mb-1 ml-3 border-l border-kamika-mist pl-2">
                            {category.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block rounded-kamika px-3 py-1.5 text-[0.8125rem] text-kamika-ink/60 hover:bg-kamika-blue-50 hover:text-kamika-ink"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={routes.products}
                    className="mt-1 block border-t border-kamika-mist px-3 pt-3 pb-2 font-mono text-[0.6875rem] tracking-[0.18em] text-kamika-steel uppercase hover:text-kamika-ink"
                  >
                    {t("nav.allCategories")}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClasses(link.href)}>
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-kamika-steel" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Idioma y contacto directo, siempre visibles en desktop ── */}
      <div className="hidden items-center gap-4 lg:flex">
        <LanguageSwitcher />
        <a
          href={phoneHref}
          className="flex items-center gap-2 font-mono text-[0.8125rem] text-kamika-steel hover:text-kamika-ink"
        >
          <PhoneIcon className="size-4" />
          {phone}
        </a>
        <ButtonLink href={routes.contact} size="sm">
          {t("nav.contact")}
        </ButtonLink>
      </div>

      {/* ── Disparador móvil ─────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? t("a11y.closeMenu") : t("a11y.openMenu")}
        aria-expanded={menuOpen}
        className="-mr-2 rounded-kamika p-2 text-kamika-ink lg:hidden"
      >
        {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      {/* ── Menú móvil a pantalla completa ────────────────────── */}
      {canPortal &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={t("a11y.mainNavigation")}
                initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.45, ease: EASE }}
                className="fixed inset-0 z-100 flex flex-col bg-kamika-paper lg:hidden"
              >
                <div className="flex h-16 shrink-0 items-center justify-end border-b border-kamika-mist px-5">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label={t("a11y.closeMenu")}
                    className="-mr-2 rounded-kamika p-2 text-kamika-ink"
                  >
                    <CloseIcon className="size-6" />
                  </button>
                </div>

                {/* Compacto a propósito: en una pantalla de 360×640 las
                    ocho gamas y los cuatro enlaces tienen que caber sin
                    hacer scroll dentro del menú. */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
                  <p className="eyebrow">{t("nav.products")}</p>
                  <ul className="mt-4 grid gap-1">
                    {categories.map((category) => (
                      <li key={category.href}>
                        <Link
                          href={category.href}
                          className="font-display block py-1.5 text-xl font-medium tracking-[-0.02em] text-kamika-ink sm:py-2 sm:text-2xl"
                        >
                          {category.label}
                        </Link>
                        {category.children && (
                          <ul className="mb-1 ml-1 border-l border-kamika-mist pl-3">
                            {category.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block py-1 text-base text-kamika-ink/70"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 grid gap-1 border-t border-kamika-mist pt-5">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="block py-2 text-base text-kamika-ink/80">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 border-t border-kamika-mist px-5 py-6">
                  <LanguageSwitcher className="mb-4" />
                  <a
                    href={phoneHref}
                    className="flex items-center gap-2 font-mono text-sm text-kamika-steel"
                  >
                    <PhoneIcon className="size-4" />
                    {phone}
                  </a>
                  <ButtonLink href={routes.contact} className="mt-4 w-full">
                    {t("nav.contact")}
                  </ButtonLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
