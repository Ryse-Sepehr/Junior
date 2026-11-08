"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MessageCircle, Phone } from "lucide-react"
import FolioFoldMenu, { type FoldLink } from "@/components/ui/folio-fold-menu"
import { href, locales, parsePath, type Locale } from "@/lib/i18n"
import { company, dict, menuLabels } from "@/lib/site"
import { cn } from "@/lib/utils"

const order = [
  "home",
  "demenagement-de-particulier",
  "demenagement-bureau",
  "demenagement-piano",
  "demenagements-nationaux",
  "demenagements-internationaux",
  "garde-meubles",
  "location-de-lift",
  "dechetterie-vide-maison-nettoyage",
  "photos",
  "blog",
  "devis-demenagement",
]

const closeLabels: Record<Locale, string> = { fr: "Fermer", nl: "Sluiten", en: "Close" }
const navLabels: Record<Locale, string> = { fr: "Navigation principale", nl: "Hoofdnavigatie", en: "Main navigation" }

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const t = dict[locale]
  const { slug } = parsePath(pathname)
  const scroller = React.useRef<HTMLDivElement>(null)
  const shell = React.useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const links: FoldLink[] = order.map((s) => ({
    label: menuLabels[locale][s],
    href: href(locale, s === "home" ? "" : s),
  }))

  // New page: back to the top of the scroll container.
  React.useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    setScrolled(false)
  }, [pathname])

  // Mark the current page in the fold menu.
  React.useEffect(() => {
    shell.current?.querySelectorAll<HTMLAnchorElement>(".ffm-link").forEach((a) => {
      if (a.getAttribute("href") === pathname) a.setAttribute("aria-current", "page")
      else a.removeAttribute("aria-current")
    })
  }, [pathname, locale])

  // Menu links: let the page fold back first, then navigate client-side.
  const onClickCapture = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a.ffm-link") as HTMLAnchorElement | null
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    const to = a.getAttribute("href") ?? "/"
    const page = shell.current?.querySelector<HTMLElement>(".ffm-page")
    page?.click()
    window.setTimeout(() => router.push(to), to === pathname ? 0 : 260)
  }

  const brand = (
    <div className="flex w-full items-center justify-between gap-3">
      <Link
        href={href(locale)}
        aria-label={`${company.name} — ${t.home}`}
        className="flex h-12 items-center rounded-[12px] bg-cream px-3 sm:h-14 shadow-[0_6px_20px_-10px_rgb(0_0_0/0.55)] transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-px"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo-dark.png" alt={company.name} width={546} height={346} className="h-10 w-auto sm:h-12" />
      </Link>

      <div className={cn("flex items-center gap-2 transition-opacity duration-300", open && "pointer-events-none opacity-0")}>
        <nav aria-label="Langue / Taal / Language" className="flex items-center rounded-full bg-ink/40 p-1 backdrop-blur-sm">
          {locales.map((l) => (
            <Link
              key={l}
              href={href(l, slug)}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "true" : undefined}
              className={cn(
                "grid h-9 min-w-9 place-items-center rounded-full px-2 text-[12px] font-semibold uppercase tracking-wider transition-colors",
                l === locale ? "bg-cream text-ink" : "text-cream/80 hover:text-cream",
              )}
            >
              {l}
            </Link>
          ))}
        </nav>
        <a
          href={company.mobileHref}
          className="hidden h-11 items-center gap-2 rounded-full px-3 text-[14px] font-medium text-cream/90 transition-colors hover:text-cream md:inline-flex"
        >
          <Phone className="size-4" strokeWidth={1.75} aria-hidden />
          {company.mobile}
        </a>
        <Link
          href={href(locale, "devis-demenagement")}
          className="hidden h-11 items-center rounded-full bg-red px-5 text-[14px] font-semibold text-cream transition-[background-color,transform] duration-300 hover:bg-[#b02a31] active:scale-[0.97] sm:inline-flex"
        >
          {t.quote}
        </Link>
      </div>
    </div>
  )

  return (
    <div ref={shell} onClickCapture={onClickCapture} className="contents">
      <FolioFoldMenu
        links={links}
        brand={brand}
        accent="#c8323a"
        className={cn("gf-shell", scrolled && "gf-scrolled")}
        onOpenChange={setOpen}
        openLabel={t.menu}
        closeLabel={closeLabels[locale]}
        navLabel={navLabels[locale]}
      >
        <div
          ref={scroller}
          className="gf-scroll"
          onScroll={(e) => {
            const s = (e.currentTarget as HTMLDivElement).scrollTop > 24
            if (s !== scrolled) setScrolled(s)
          }}
        >
          {children}
        </div>

        {/* WhatsApp, always one tap away (desktop) */}
        <a
          href={company.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="group absolute bottom-6 right-6 z-[4] hidden h-14 items-center gap-0 overflow-hidden rounded-full bg-[#1f8f4e] pl-4 pr-4 text-cream shadow-[0_14px_34px_-14px_rgb(0_0_0/0.7)] transition-[gap,padding] duration-500 ease-[var(--ease-out)] hover:gap-2.5 hover:pr-5 sm:inline-flex"
        >
          <MessageCircle className="size-6 shrink-0" strokeWidth={1.75} aria-hidden />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-semibold transition-[max-width] duration-500 ease-[var(--ease-out)] group-hover:max-w-[160px]">
            WhatsApp
          </span>
        </a>

        {/* Thumb-reach actions on phones */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] flex gap-2 p-3 sm:hidden">
          <a
            href={company.mobileHref}
            className="pointer-events-auto inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-semibold text-cream shadow-[0_10px_30px_-12px_rgb(0_0_0/0.7)]"
          >
            <Phone className="size-4" strokeWidth={1.75} aria-hidden />
            {t.call}
          </a>
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="pointer-events-auto grid size-12 shrink-0 place-items-center rounded-full bg-[#1f8f4e] text-cream shadow-[0_10px_30px_-12px_rgb(0_0_0/0.7)]"
          >
            <MessageCircle className="size-5" strokeWidth={1.75} aria-hidden />
          </a>
          <Link
            href={href(locale, "devis-demenagement")}
            className="pointer-events-auto inline-flex h-12 flex-[1.4] items-center justify-center rounded-full bg-red text-[15px] font-semibold text-cream shadow-[0_10px_30px_-12px_rgb(0_0_0/0.7)]"
          >
            {t.quote}
          </Link>
        </div>
      </FolioFoldMenu>
    </div>
  )
}
