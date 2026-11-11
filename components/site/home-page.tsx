import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { getPage, type Body, type Section } from "@/lib/content"
import { href, type Locale } from "@/lib/i18n"
import { communeNames, communes, company, dict, media, pages, videos } from "@/lib/site"
import { HomeHero } from "./home-hero"
import { Faq, PhotoReveal, Reveal, SiteVideo } from "./motion"
import { Btn, Container, tidy } from "./primitives"
import { Accent } from "./accent"
import { ServiceIndex } from "./service-index"
import { ProcessStory } from "./process-story"
import { CtaBand } from "./blocks"

const ps = (b: Body[]) => b.filter((x): x is { p: string } => "p" in x && !("box" in x)).map((x) => x.p)
const lis = (b: Body[]) => b.flatMap((x) => ("ul" in x ? x.ul : []))

const homeCopy: Record<Locale, { caption: string; since: string; sinceText: string; charter: string; videoLabel: string }> = {
  fr: {
    caption: "Images réelles de nos chantiers à Bruxelles",
    since: "Depuis 1995",
    sinceText: "Une entreprise familiale, de père en fils, avec ses propres camions, lifts et déménageurs.",
    charter: "La charte qualité de la Chambre Belge des Déménageurs",
    videoLabel: "Vidéo d’un chantier Gérard & Fils",
  },
  nl: {
    caption: "Echte beelden van onze verhuizingen in Brussel",
    since: "Sinds 1995",
    sinceText: "Een familiebedrijf, van vader op zoon, met eigen vrachtwagens, verhuisliften en verhuizers.",
    charter: "Het kwaliteitscharter van de Belgische Kamer van Verhuizers",
    videoLabel: "Video van een verhuizing door Gérard & Fils",
  },
  en: {
    caption: "Real footage from our jobs in Brussels",
    since: "Since 1995",
    sinceText: "A family business, passed from father to son, with its own lorries, lifts and removal crews.",
    charter: "The quality charter of the Belgian Chamber of Removers",
    videoLabel: "Video of a Gérard & Fils removal",
  },
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const c = homeCopy[locale]
  const page = getPage(locale, "home")
  const S = page.sections
  const find = (slug: string) => S.find((s) => s.cta?.slug === slug) as Section
  const intro = S[1]
  const services = ["demenagement-de-particulier", "demenagement-piano", "demenagement-bureau", "demenagements-nationaux", "demenagements-internationaux"]
  const serviceImg: Record<string, string> = {
    "demenagement-de-particulier": "/media/camion-lift-quartier-residentiel.webp",
    "demenagement-piano": "/media/piano-sur-elevateur.webp",
    "demenagement-bureau": "/media/cartons-bleus-demenagement-camion.webp",
    "demenagements-nationaux": "/media/demenagement-gerard-rue-bruxelles.webp",
    "demenagements-internationaux": "/media/chargement-lift-deux-camions.webp",
  }
  const others = ["garde-meubles", "location-de-lift", "dechetterie-vide-maison-nettoyage"]
  const otherImg: Record<string, string> = {
    "garde-meubles": "/media/garde-meubles-container.webp",
    "location-de-lift": "/media/lift-dernier-etage-haut-immeuble.webp",
    "dechetterie-vide-maison-nettoyage": "/media/meuble-emcombrants.webp",
  }
  const boxes = S.find((s) => s.kind === "boxes")!
  const atouts = S[13]
  const capital = S[14]
  const quoteSec = S[15]

  return (
    <>
      <HomeHero
        title={t.heroTitle}
        sub={t.heroSub}
        quote={t.quote}
        quoteHref={href(locale, "devis-demenagement")}
        phone={company.mobile}
        phoneHref={company.mobileHref}
        caption={c.caption}
        scroll={t.scroll}
      />

      {/* Who we are */}
      <section className="bg-paper py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display text-[clamp(38px,5.4vw,76px)] text-ink"><Accent text={tidy(intro.h)} /></h2>
            </Reveal>
            <Reveal className="prose-gf mt-10 max-w-[62ch] text-[18px] leading-[1.7] text-ink/80">
              {ps(intro.body).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
            <Reveal className="mt-10 flex flex-wrap gap-3">
              <Btn href={href(locale, "devis-demenagement")} variant="ink" arrow>
                {t.quoteLong}
              </Btn>
              <Btn href={href(locale, "photos")} variant="line-ink">
                {t.nav.photos}
              </Btn>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <PhotoReveal src={media("service-lift-vue-plongeante")} alt={tidy(intro.h)} className="aspect-[4/5] w-full" />
            <div className="mt-6 grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t border-ink/15 pt-5">
              <span className="font-serif text-[34px] leading-none text-red">{c.since}</span>
              <p className="text-[15px] leading-relaxed text-muted">{c.sinceText}</p>
            </div>
          </div>
        </Container>
      </section>

      <ProcessStory locale={locale} />

      {/* Services index */}
      <section className="bg-paper pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-8 border-t border-ink/15 pt-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="display text-[clamp(34px,4.4vw,60px)] text-ink"><Accent text={tidy(S[2].h)} /></h2>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-[60ch] text-[18px] leading-[1.7] text-ink/75">{ps(S[2].body)[0]}</p>
            </Reveal>
          </div>
          <div className="mt-14">
            <ServiceIndex
              items={services.map((slug) => {
                const s = find(slug)
                return {
                  title: t.nav[slug],
                  text: ps(s.body)[0],
                  href: href(locale, slug),
                  image: serviceImg[slug],
                  label: s.cta?.label ?? t.learnMore,
                }
              })}
            />
          </div>
        </Container>
      </section>

      {/* Complementary services */}
      <section className="bg-paper-2 py-24 text-ink sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <h2 className="display text-[clamp(34px,4.4vw,60px)]"><Accent text={tidy(S[8].h)} /></h2>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8">
              <p className="text-[17px] leading-[1.7] text-ink/75">{ps(S[8].body)[0]}</p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:h-[680px] lg:grid-cols-[1.25fr_1fr] lg:grid-rows-2">
            {others.map((slug, i) => {
              const s = find(slug)
              return (
                <Reveal key={slug} delay={i * 0.06} className={i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : "min-h-0"}>
                  <Link
                    href={href(locale, slug)}
                    className="group relative flex h-full min-h-[340px] lg:min-h-0 flex-col justify-end overflow-hidden rounded-[22px] bg-ink-3 p-7 sm:p-9"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={otherImg[slug]}
                      alt=""
                      loading="lazy"
                      className="photo absolute inset-0 -z-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" aria-hidden />
                    <span className="relative">
                      <span className="display block text-[clamp(26px,2.6vw,38px)]">{tidy(s.h)}</span>
                      <span className="mt-3 block max-w-[52ch] text-[15.5px] leading-relaxed text-cream/80">{ps(s.body)[0]}</span>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cream">
                        {s.cta?.label}
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Real footage */}
      <section className="overflow-hidden bg-ink-2 py-24 text-cream sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="display text-[clamp(34px,4.2vw,58px)]"><Accent text={t.videosTitle} /></h2>
              <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.7] text-muted-ink">{t.videosText}</p>
              <div className="mt-8">
                <Btn href={href(locale, "photos")} variant="line-cream" arrow>
                  {t.nav.photos}
                </Btn>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
              {videos.map((v, i) => (
                <Reveal
                  key={v.src}
                  delay={i * 0.08}
                  className={`aspect-[9/16] w-[68vw] shrink-0 snap-center overflow-hidden rounded-[20px] bg-ink-3 sm:w-auto ${i === 1 ? "sm:translate-y-10" : ""}`}
                >
                  <SiteVideo src={v.src} poster={v.poster} label={c.videoLabel} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Commitments + CBD charter */}
      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="display text-[clamp(34px,4.4vw,60px)] text-ink"><Accent text={tidy(atouts.h)} /></h2>
              </Reveal>
              <Reveal className="prose-gf mt-8 max-w-[60ch] text-[17px] leading-[1.7] text-ink/80">
                <p>{ps(atouts.body)[0]}</p>
                <ul>
                  {lis(atouts.body).map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="mt-10 flex items-center gap-5 rounded-2xl bg-ink px-6 py-5 text-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/cbd-light.png" alt="CBD — Chambre Belge des Déménageurs" className="h-12 w-auto" />
                <p className="text-[14px] leading-snug text-muted-ink">{c.charter}</p>
              </Reveal>
            </div>
            <ol className="lg:col-span-5 lg:col-start-8">
              {boxes.body.map((b, i) => (
                <Reveal as="li" key={i} delay={i * 0.05} className="flex items-start gap-5 border-b border-ink/15 py-7 first:border-t">
                  <Check className="size-6 shrink-0 translate-y-1 text-red" strokeWidth={2} aria-hidden />
                  <span className="display text-[clamp(22px,2.1vw,30px)] text-ink">{"box" in b ? b.box : ""}</span>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="mt-20 grid gap-5 sm:grid-cols-2">
            <PhotoReveal src={media("piano-emballage-lift-exterieur-allongee")} alt="" className="aspect-[16/10]" />
            <PhotoReveal src={media("camion-lift-quartier-residentiel-allongee")} alt="" className="aspect-[16/10] sm:mt-16" />
          </div>
        </Container>
      </section>

      {/* All of Brussels */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display text-[clamp(34px,4.4vw,60px)] text-ink"><Accent text={tidy(capital.h)} /></h2>
              <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.7] text-ink/75">{t.communesText}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="text-[clamp(26px,3.2vw,44px)] leading-[1.25]">
              {communes.map((slug, i) => (
                <span key={slug}>
                  <Link
                    href={href(locale, slug)}
                    className="display text-ink/85 decoration-red decoration-2 transition-colors hover:text-red hover:underline"
                  >
                    {communeNames[locale][slug]}
                  </Link>
                  {i < communes.length - 1 && <span className="mx-2 font-serif text-red/70">/</span>}{" "}
                </span>
              ))}
            </Reveal>
            <Reveal className="prose-gf mt-10 max-w-[64ch] text-[16px] leading-[1.75] text-ink/70">
              {ps(capital.body).slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-[clamp(34px,4.4vw,60px)] text-ink"><Accent text={t.faqTitle} /></h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Faq items={page.faq} />
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} title={tidy(quoteSec.h)} text={ps(quoteSec.body)[0]} image={pages.home.hero} />
    </>
  )
}
