import type { Metadata } from "next"
import { getPage } from "./content"
import { href, locales, type Locale } from "./i18n"
import { company, pages } from "./site"

export const siteUrl = "https://www.demenagementgerardetfils.be"

export function siteMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    applicationName: company.name,
    icons: { icon: [{ url: "/media/badge.svg", type: "image/svg+xml" }, { url: "/media/badge-192.png", sizes: "192x192" }], apple: "/media/badge-180.png" },
    openGraph: { siteName: company.name, locale: { fr: "fr_BE", nl: "nl_BE", en: "en_GB" }[locale], type: "website" },
  }
}

export function pageMetadata(locale: Locale, slug: string): Metadata {
  const page = getPage(locale, slug)
  const s = slug === "home" ? "" : slug
  const languages = Object.fromEntries(locales.map((l) => [{ fr: "fr-BE", nl: "nl-BE", en: "en" }[l], href(l, s)]))
  const image = `/media/${pages[slug]?.hero ?? "camion-lift-dernier-etage"}.webp`
  return {
    title: page.seoTitle,
    description: page.seoDesc || undefined,
    alternates: { canonical: href(locale, s), languages: { ...languages, "x-default": href("fr", s) } },
    openGraph: { title: page.seoTitle, description: page.seoDesc || undefined, url: href(locale, s), images: [image] },
  }
}
