export const locales = ["fr", "nl", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "fr"

/** FR keeps the exact URLs of the current site (SEO); NL and EN live under /nl and /en. */
export function href(locale: Locale, slug = ""): string {
  const base = locale === "fr" ? "" : `/${locale}`
  return slug ? `${base}/${slug}/` : `${base}/`
}

/** Split a pathname into its locale and page slug. */
export function parsePath(pathname: string): { locale: Locale; slug: string } {
  const parts = pathname.split("/").filter(Boolean)
  if (parts[0] === "nl" || parts[0] === "en") return { locale: parts[0], slug: parts[1] ?? "" }
  return { locale: "fr", slug: parts[0] ?? "" }
}

export const localeNames: Record<Locale, string> = { fr: "Français", nl: "Nederlands", en: "English" }
