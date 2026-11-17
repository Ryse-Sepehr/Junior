import Link from "next/link"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { href, type Locale } from "@/lib/i18n"
import { communeNames, communes, company, dict, moveServices, otherServices } from "@/lib/site"
import { Container } from "./primitives"
import { Logo } from "./logo"

export function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const col = "text-[15px] text-cream/75 transition-colors hover:text-cream"
  return (
    <footer className="bg-ink pb-28 pt-20 text-cream sm:pb-10">
      <Container>
        <div className="grid gap-12 border-b border-cream/12 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href={href(locale)} aria-label={company.name} className="inline-flex">
              <Logo size={84} tone="light" />
            </Link>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-muted-ink">{t.footerAbout}</p>
            <div className="mt-8 flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/cbd-light.png" alt="CBD" className="h-10 w-auto shrink-0" loading="lazy" />
              <p className="max-w-[40ch] text-[13px] leading-relaxed text-muted-ink">{t.footerCbd}</p>
            </div>
          </div>

          <nav aria-label={t.groups.moving} className="lg:col-span-2">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/50">{t.groups.moving}</h2>
            <ul className="mt-5 grid gap-3">
              {moveServices.map((s) => (
                <li key={s}>
                  <Link href={href(locale, s)} className={col}>
                    {t.nav[s]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.groups.other} className="lg:col-span-2">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/50">{t.groups.other}</h2>
            <ul className="mt-5 grid gap-3">
              {[...otherServices, "photos", "blog", "devis-demenagement"].map((s) => (
                <li key={s}>
                  <Link href={href(locale, s)} className={col}>
                    {t.nav[s]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.groups.communes} className="lg:col-span-2">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/50">{t.groups.communes}</h2>
            <ul className="mt-5 grid gap-3">
              {communes.map((s) => (
                <li key={s}>
                  <Link href={href(locale, s)} className={col}>
                    {communeNames[locale][s]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/50">{t.groups.info}</h2>
            <ul className="mt-5 grid gap-3.5 text-[15px] text-cream/80">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-red-ink" strokeWidth={1.75} aria-hidden />
                <span>
                  {company.street}
                  <br />
                  {company.city}
                </span>
              </li>
              <li>
                <a href={company.mobileHref} className="flex gap-2.5 hover:text-cream">
                  <Phone className="mt-0.5 size-4 shrink-0 text-red-ink" strokeWidth={1.75} aria-hidden />
                  {company.mobile}
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className="flex gap-2.5 hover:text-cream">
                  <Phone className="mt-0.5 size-4 shrink-0 text-red-ink" strokeWidth={1.75} aria-hidden />
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex gap-2.5 break-all hover:text-cream">
                  <Mail className="mt-0.5 size-4 shrink-0 text-red-ink" strokeWidth={1.75} aria-hidden />
                  {company.email}
                </a>
              </li>
              <li className="flex gap-2 pt-1">
                <a href={company.whatsapp} aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full ring-1 ring-cream/20 transition hover:bg-cream/10">
                  <MessageCircle className="size-[18px]" strokeWidth={1.75} aria-hidden />
                </a>
                <a href={company.facebook} aria-label="Facebook" className="grid size-11 place-items-center rounded-full ring-1 ring-cream/20 transition hover:bg-cream/10">
                  <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-[13px] text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name} · TVA {company.vat}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {t.legal.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
