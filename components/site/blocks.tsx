import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Body, Section } from "@/lib/content"
import { href, type Locale } from "@/lib/i18n"
import { company, dict, media } from "@/lib/site"
import { cn } from "@/lib/utils"
import { PhotoReveal, Reveal } from "./motion"
import { Btn, Container, tidy } from "./primitives"

export function PageHero({
  locale,
  title,
  lead,
  image,
  crumbs,
  compact,
}: {
  locale: Locale
  title: string
  lead?: string
  image: string
  crumbs?: { label: string; href?: string }[]
  compact?: boolean
}) {
  const t = dict[locale]
  return (
    <section className={cn("relative isolate flex flex-col justify-end overflow-hidden bg-ink text-cream", compact ? "min-h-[64svh]" : "min-h-[82svh]")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/media/${image}.webp`} alt="" fetchPriority="high" className="photo absolute inset-0 -z-10 size-full object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(20_18_16/0.7)_0%,rgb(20_18_16/0.15)_35%,rgb(20_18_16/0.55)_70%,rgb(20_18_16/0.92)_100%)]"
      />
      <Container className="pb-14 pt-36 sm:pb-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-1.5 text-[13px] text-cream/70">
            <Link href={href(locale)} className="hover:text-cream">
              {t.home}
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden />
                {c.href ? (
                  <Link href={c.href} className="hover:text-cream">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-cream/90">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          <h1 className={cn("display", title.length > 70 ? "max-w-[26ch] text-[clamp(32px,4.2vw,60px)]" : "max-w-[20ch] text-[clamp(38px,6vw,84px)]")}>{title}</h1>
        </Reveal>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {lead ? <p className="max-w-[58ch] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-cream/85">{lead}</p> : <span />}
          <div className="flex flex-wrap gap-3">
            <Btn href={href(locale, "devis-demenagement")} variant="red" arrow>
              {t.quote}
            </Btn>
            <Btn href={company.mobileHref} variant="line-cream">
              {company.mobile}
            </Btn>
          </div>
        </div>
      </Container>
      <span className="absolute bottom-3 right-4 hidden text-[11px] uppercase tracking-[0.14em] text-cream/50 sm:block">{t.realPhotos}</span>
    </section>
  )
}

function BodyBlocks({ body, tone = "paper" }: { body: Body[]; tone?: "paper" | "ink" }) {
  return (
    <div className={cn("prose-gf text-[17.5px] leading-[1.75]", tone === "ink" ? "text-cream/80" : "text-ink/80")}>
      {body.map((b, i) => {
        if ("ul" in b)
          return (
            <ul key={i}>
              {b.ul.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )
        if ("box" in b) return null
        return <p key={i}>{b.p}</p>
      })}
    </div>
  )
}

/** Renders the original page structure (headings, text, lists, photos) in the new design. */
export function ContentSections({ locale, sections, fallbackImages }: { locale: Locale; sections: Section[]; fallbackImages: string[] }) {
  const t = dict[locale]
  let imgSide = 0
  let fb = 0
  // Use the photos once each; give image-less long sections a real photo from the pool.
  const used = new Set<string>()

  return (
    <div className="bg-paper">
      {sections.map((s, i) => {
        const key = `${i}-${s.h}`
        const next = sections[i + 1]
        // A heading with no text of its own introduces the steps/commitments that follow.
        if (!s.body.length && !s.imgs?.length && next?.kind === "boxes") return null
        const prev = sections[i - 1]
        const boxTitle = s.kind === "boxes" && prev && !prev.body.length && !prev.imgs?.length ? tidy(prev.h) : ""

        // Highlight line (e.g. "Up to the 24th floor!")
        if (s.level === 1)
          return (
            <Container key={key} className="py-16 sm:py-20">
              <Reveal>
                <p className="font-serif text-[clamp(32px,5vw,68px)] leading-[1.05] text-red">{tidy(s.h)}</p>
              </Reveal>
            </Container>
          )

        // Steps (piano) or commitments
        if (s.kind === "boxes") {
          return (
            <section key={key} className="bg-ink py-20 text-cream sm:py-28">
              <Container>
                {boxTitle && (
                  <Reveal>
                    <h2 className="display mb-12 max-w-[22ch] text-[clamp(30px,3.8vw,52px)]">{boxTitle}</h2>
                  </Reveal>
                )}
                {s.steps ? (
                  <ol className="grid gap-px overflow-hidden rounded-[22px] bg-cream/10 md:grid-cols-5">
                    {s.body.map((b, j) => (
                      <Reveal as="li" key={j} delay={j * 0.06} className="flex flex-col bg-ink-2 p-7">
                        <span className="font-serif text-[40px] leading-none text-red-ink">{j + 1}</span>
                        <span className="display mt-6 text-[22px] leading-tight">{"box" in b ? b.box : ""}</span>
                        <span className="mt-3 text-[15px] leading-relaxed text-muted-ink">{"box" in b ? b.p : ""}</span>
                      </Reveal>
                    ))}
                  </ol>
                ) : (
                  <ul className="grid gap-x-10 sm:grid-cols-2">
                    {s.body.map((b, j) => (
                      <Reveal as="li" key={j} delay={j * 0.05} className="flex items-baseline gap-4 border-b border-cream/15 py-6">
                        <span className="size-2 shrink-0 translate-y-[-3px] rounded-full bg-red-ink" aria-hidden />
                        <span className="display text-[clamp(22px,2vw,28px)]">{"box" in b ? b.box : ""}</span>
                      </Reveal>
                    ))}
                  </ul>
                )}
              </Container>
            </section>
          )
        }

        const imgs = (s.imgs ?? []).map(media).filter((m) => !used.has(m))
        const longText = s.body.reduce((n, b) => n + ("p" in b ? b.p.length : 0) + ("ul" in b ? b.ul.join("").length : 0), 0)
        if (!imgs.length && s.level === 2 && longText > 600 && fb < fallbackImages.length) {
          const f = fallbackImages[fb++]
          if (!used.has(f)) imgs.push(f)
        }
        imgs.forEach((m) => used.add(m))
        const sub = s.level >= 3

        if (imgs.length) {
          const flip = imgSide++ % 2 === 1
          return (
            <section key={key} className="py-16 sm:py-24">
              <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={cn("lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
                  {s.h && (
                    <Reveal>
                      <h2 className={cn("display text-ink", sub ? "text-[clamp(28px,3vw,40px)]" : "text-[clamp(32px,4vw,54px)]")}>{tidy(s.h)}</h2>
                    </Reveal>
                  )}
                  <Reveal className="mt-7 max-w-[62ch]">
                    <BodyBlocks body={s.body} />
                  </Reveal>
                  {s.cta && (
                    <Reveal className="mt-8">
                      <Btn href={href(locale, s.cta.slug)} variant="ink" arrow>
                        {s.cta.label}
                      </Btn>
                    </Reveal>
                  )}
                </div>
                <div className={cn("grid gap-5 lg:col-span-5 lg:sticky lg:top-28", flip ? "lg:order-1" : "lg:col-start-8", imgs.length > 1 && "grid-cols-2")}>
                  {imgs.slice(0, 3).map((m, j) => (
                    <PhotoReveal
                      key={m}
                      src={m}
                      alt={tidy(s.h) || t.realPhotos}
                      className={cn(imgs.length === 1 ? "aspect-[4/5]" : j === 2 ? "col-span-2 aspect-[16/10]" : "aspect-[3/4]", imgs.length > 1 && j === 1 && "mt-10")}
                    />
                  ))}
                </div>
              </Container>
            </section>
          )
        }

        return (
          <section key={key} className={cn(sub ? "py-10 sm:py-12" : "py-16 sm:py-20")}>
            <Container className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                {s.h && (
                  <Reveal>
                    <h2 className={cn("display text-ink", sub ? "text-[clamp(24px,2.4vw,32px)]" : "text-[clamp(30px,3.6vw,48px)]")}>{tidy(s.h)}</h2>
                  </Reveal>
                )}
              </div>
              <Reveal className="max-w-[66ch] lg:col-span-7 lg:col-start-6">
                <BodyBlocks body={s.body} />
                {s.cta && (
                  <div className="mt-8">
                    <Btn href={href(locale, s.cta.slug)} variant="ink" arrow>
                      {s.cta.label}
                    </Btn>
                  </div>
                )}
              </Reveal>
            </Container>
          </section>
        )
      })}
    </div>
  )
}

export function CtaBand({ locale, title, text, image }: { locale: Locale; title?: string; text?: string; image?: string }) {
  const t = dict[locale]
  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/media/${image ?? "camion-lift-dernier-etage"}.webp`} alt="" loading="lazy" className="photo absolute inset-0 -z-10 size-full object-cover opacity-35" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <Container className="grid gap-10 py-24 sm:py-32 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="display text-[clamp(36px,5vw,72px)]">{title ?? t.ctaTitle}</h2>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.7] text-cream/80">{text ?? t.ctaText}</p>
          </Reveal>
        </div>
        <Reveal className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <Btn href={href(locale, "devis-demenagement")} variant="red" arrow>
            {t.quoteLong}
          </Btn>
          <Btn href={company.phoneHref} variant="line-cream">
            {company.phone}
          </Btn>
        </Reveal>
      </Container>
    </section>
  )
}
