/** Une clases condicionales sin arrastrar una dependencia para ello. */
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(" ");
