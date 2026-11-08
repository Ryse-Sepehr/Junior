import fs from "node:fs"
import path from "node:path"
import type { Locale } from "./i18n"

export type Body = { p: string } | { ul: string[] } | { box: string; p: string }
export type Section = {
  h: string
  level: number
  body: Body[]
  imgs?: string[]
  cta?: { label: string; slug: string }
  kind?: "boxes"
  steps?: boolean
}
export type Page = {
  slug: string
  seoTitle: string
  seoDesc: string
  h1: string
  intro: Body[]
  sections: Section[]
  faq: { q: string; a: string }[]
  images: string[]
  image?: string
}

const dir = path.join(process.cwd(), "content")
let frCache: Record<string, Page> | null = null

function fr(): Record<string, Page> {
  if (!frCache) frCache = JSON.parse(fs.readFileSync(path.join(dir, "fr.json"), "utf8"))
  return frCache!
}

export function getPage(locale: Locale, slug: string): Page {
  if (locale === "fr") return fr()[slug]
  const file = path.join(dir, locale, `${slug}.json`)
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : fr()[slug]
}

export function allSlugs(): string[] {
  return Object.keys(fr()).filter((s) => s !== "home")
}

/** First paragraph of a page, shortened, for cards and meta. */
export function excerpt(page: Page, max = 170): string {
  const firstP =
    page.intro.find((b): b is { p: string } => "p" in b && !("box" in b))?.p ??
    page.sections.flatMap((s) => s.body).find((b): b is { p: string } => "p" in b && !("box" in b) && b.p.length > 60)?.p ??
    page.seoDesc
  if (firstP.length <= max) return firstP
  return firstP.slice(0, firstP.lastIndexOf(" ", max)) + "…"
}
