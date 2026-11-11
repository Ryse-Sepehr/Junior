import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { excerpt, getPage } from "@/lib/content"
import { href, type Locale } from "@/lib/i18n"
import { communeNames, communes, dict, gallery, media, moveServices, otherServices, pages, posts, videos } from "@/lib/site"
import { CtaBand, ContentSections, PageHero } from "./blocks"
import { Gallery } from "./gallery"
import { Faq, Reveal } from "./motion"
import { Container, tidy } from "./primitives"
import { Accent } from "./accent"
import { QuoteForm } from "./quote-form"
import { VolumeCalculator } from "./volume-calculator"
import { LiftReach } from "./lift-reach"

const firstP = (body: { p?: string }[]) => body.find((b) => b.p)?.p

/** Real photos used to illustrate long text sections that had no picture on the old site. */
const pool = [
  "chargement-lift-deux-camions",
  "stationnement-camion-demenagement-gerard",
  "service-lift-deuxieme-etage",
  "materiel-emballage-valises-penderies",
  "camion-lift-quartier-residentiel",
  "emballage-assiettes-fragiles",
].map(media)

export function RoutePage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = dict[locale]
  const page = getPage(locale, slug)
  const meta = pages[slug]
  const group = moveServices.includes(slug)
    ? { label: t.groups.moving }
    : otherServices.includes(slug)
      ? { label: t.groups.other }
      : communes.includes(slug)
        ? { label: t.groups.communes }
        : meta.kind === "post"
          ? { label: t.nav.blog, href: href(locale, "blog") }
          : null
  const crumbs = [...(group ? [group] : []), { label: meta.kind === "commune" ? communeNames[locale][slug] : (t.nav[slug] ?? page.h1) }]

  if (meta.kind === "devis") {
    return (
      <>
        <PageHero locale={locale} title={page.h1} image={meta.hero} crumbs={crumbs} compact />
        <section className="bg-paper py-20 sm:py-28">
          <Container className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="prose-gf text-[17px] leading-[1.75] text-ink/80 lg:sticky lg:top-28">
                {page.intro.map((b, i) => ("p" in b && !("box" in b) ? <p key={i}>{b.p}</p> : null))}
              </div>
            </div>
            <div className="grid min-w-0 gap-12 lg:col-span-8">
              <VolumeCalculator locale={locale} />
              <QuoteForm locale={locale} />
            </div>
          </Container>
        </section>
      </>
    )
  }

  if (meta.kind === "photos") {
    const s = page.sections[0]
    return (
      <>
        <PageHero locale={locale} title={page.h1} image={meta.hero} crumbs={crumbs} compact lead={tidy(s.h)} />
        <section className="bg-ink pb-24 pt-16 text-cream sm:pb-32">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="prose-gf text-[17px] leading-[1.75] text-cream/80 lg:col-span-7">
                {s.body.map((b, i) => ("p" in b && !("box" in b) ? <p key={i}>{b.p}</p> : null))}
              </div>
              <p className="text-[14px] text-muted-ink lg:col-span-4 lg:col-start-9">{t.galleryNote}</p>
            </div>
            <div className="mt-14">
              <Gallery images={gallery.map((g) => `/media/${g}.webp`)} videos={videos} />
            </div>
          </Container>
        </section>
        <CtaBand locale={locale} />
      </>
    )
  }

  if (meta.kind === "blog") {
    return (
      <>
        <PageHero locale={locale} title={page.h1} image={meta.hero} crumbs={crumbs} compact />
        <section className="bg-paper py-20 sm:py-28">
          <Container>
            <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => {
                const post = getPage(locale, p)
                return (
                  <Reveal as="li" key={p} delay={(i % 3) * 0.06}>
                    <Link href={href(locale, p)} className="group block">
                      <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-ink-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/media/${pages[p].hero}.webp`}
                          alt=""
                          loading="lazy"
                          className="photo size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                        />
                      </div>
                      <h2 className="display mt-6 text-[26px] leading-[1.08] text-ink transition-colors group-hover:text-red">{post.h1}</h2>
                      <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{excerpt(post, 150)}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-red">
                        {t.readMore}
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </Link>
                  </Reveal>
                )
              })}
            </ul>
          </Container>
        </section>
        <CtaBand locale={locale} title={tidy(page.sections[0]?.h ?? t.ctaTitle)} text={firstP(page.sections[0]?.body as { p?: string }[])} />
      </>
    )
  }

  if (meta.kind === "post") {
    const others = posts.filter((p) => p !== slug).slice(0, 3)
    return (
      <>
        <PageHero locale={locale} title={page.h1} image={meta.hero} crumbs={crumbs} compact />
        <article className="bg-paper py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-[72ch]">
              {page.intro.length > 0 && (
                <div className="prose-gf text-[20px] leading-[1.7] text-ink/85">
                  {page.intro.map((b, i) => ("p" in b && !("box" in b) ? <p key={i}>{b.p}</p> : null))}
                </div>
              )}
              {page.sections.map((s, i) => (
                <section key={i} className={s.level <= 2 ? "mt-14" : "mt-9"}>
                  {s.h && (
                    <h2 className={s.level <= 2 ? "display text-[clamp(28px,3vw,38px)] text-ink" : "text-[21px] font-bold tracking-[-0.01em] text-ink"}>
                      {tidy(s.h)}
                    </h2>
                  )}
                  <div className="prose-gf mt-4 text-[18px] leading-[1.8] text-ink/80">
                    {s.body.map((b, j) =>
                      "ul" in b ? (
                        <ul key={j}>
                          {b.ul.map((li) => (
                            <li key={li}>{li}</li>
                          ))}
                        </ul>
                      ) : "box" in b ? null : (
                        <p key={j}>{b.p}</p>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>
          </Container>
        </article>
        <section className="bg-paper-2 py-20 sm:py-24">
          <Container>
            <h2 className="display text-[clamp(28px,3vw,40px)] text-ink"><Accent text={t.related} /></h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {others.map((p) => {
                const post = getPage(locale, p)
                return (
                  <li key={p}>
                    <Link href={href(locale, p)} className="group grid grid-cols-[96px_1fr] gap-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/media/${pages[p].hero}.webp`} alt="" loading="lazy" className="photo aspect-square rounded-xl object-cover" />
                      <span className="text-[17px] font-semibold leading-snug text-ink transition-colors group-hover:text-red">{post.h1}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Container>
        </section>
        <CtaBand locale={locale} />
      </>
    )
  }

  // service + commune
  const leadSec = page.sections[0]
  const lead = page.intro.length ? firstP(page.intro as { p?: string }[]) : undefined
  const faqFromSections = page.faq
  const neighbours = communes.filter((c) => c !== slug)

  return (
    <>
      <PageHero locale={locale} title={page.h1} image={meta.hero} crumbs={crumbs} lead={lead ?? (leadSec && !leadSec.h ? firstP(leadSec.body as { p?: string }[]) : undefined)} />
      {page.intro.length > 1 && (
        <Container className="bg-paper py-12">
          <div className="prose-gf max-w-[66ch] text-[18px] leading-[1.75] text-ink/80">
            {page.intro.slice(1).map((b, i) => ("p" in b && !("box" in b) ? <p key={i}>{b.p}</p> : null))}
          </div>
        </Container>
      )}
      {slug === "location-de-lift" && <LiftReach locale={locale} />}
      <ContentSections locale={locale} sections={slug === "location-de-lift" ? page.sections.filter((s) => s.level !== 1) : page.sections} fallbackImages={pool} hero={meta.hero} />
      {faqFromSections.length > 0 && (
        <section className="bg-paper py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-12">
            <h2 className="display text-[clamp(30px,3.6vw,48px)] text-ink lg:col-span-4"><Accent text={t.faqTitle} /></h2>
            <div className="lg:col-span-8">
              <Faq items={faqFromSections} />
            </div>
          </Container>
        </section>
      )}
      {meta.kind === "commune" && (
        <section className="bg-paper-2 py-16 sm:py-20">
          <Container>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{t.groups.communes}</h2>
            <p className="mt-6 text-[clamp(22px,2.6vw,34px)] leading-[1.3]">
              {neighbours.map((c, i) => (
                <span key={c}>
                  <Link href={href(locale, c)} className="display text-ink/80 decoration-red decoration-2 hover:text-red hover:underline">
                    {communeNames[locale][c]}
                  </Link>
                  {i < neighbours.length - 1 && <span className="mx-2 font-serif text-red/60">/</span>}{" "}
                </span>
              ))}
            </p>
          </Container>
        </section>
      )}
      <CtaBand locale={locale} image={meta.hero} />
    </>
  )
}
