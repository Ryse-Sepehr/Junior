"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Container } from "./primitives"

const ease = [0.16, 1, 0.3, 1] as const

const steps: { img: string; title: Record<Locale, string>; text: Record<Locale, string> }[] = [
  {
    img: "/media/materiel-emballage-valises-penderies.webp",
    title: { fr: "Votre devis, sans surprises", nl: "Uw offerte, zonder verrassingen", en: "Your quote, no surprises" },
    text: {
      fr: "Vous nous décrivez votre projet par téléphone, par e-mail ou via le formulaire. Volume, accès, étages, options : nous revenons vers vous avec un devis gratuit et détaillé.",
      nl: "U beschrijft uw project telefonisch, per e-mail of via het formulier. Volume, toegang, verdiepingen, opties: u ontvangt een gratis en gedetailleerde offerte.",
      en: "Tell us about your move by phone, email or through the form. Volume, access, floors, options: we come back with a free, detailed quote.",
    },
  },
  {
    img: "/media/emballage-assiettes-fragiles.webp",
    title: { fr: "On prépare tout", nl: "Wij bereiden alles voor", en: "We prepare everything" },
    text: {
      fr: "Mise en cartons, emballage du fragile dans nos caisses de protection, démontage des meubles, autorisations de stationnement pour le camion et le lift : nous organisons chaque détail.",
      nl: "Inpakken in dozen, breekbare spullen in onze beschermkisten, demontage van meubels, parkeervergunningen voor vrachtwagen en lift: wij regelen elk detail.",
      en: "Packing into boxes, fragile items in our protective crates, dismantling furniture, parking permits for the lorry and the lift: we organise every detail.",
    },
  },
  {
    img: "/media/camion-lift-dernier-etage.webp",
    title: { fr: "Le jour J", nl: "De grote dag", en: "Moving day" },
    text: {
      fr: "Notre équipe arrive avec ses camions et, si besoin, un lift jusqu’au 24ᵉ étage. Chargement protégé, transport sécurisé, à Bruxelles comme dans toute l’Europe.",
      nl: "Onze ploeg komt met haar vrachtwagens en, indien nodig, een verhuislift tot de 24ste verdieping. Beschermd laden, veilig transport, in Brussel en in heel Europa.",
      en: "Our team arrives with its lorries and, if needed, a lift reaching the 24th floor. Protected loading, secure transport, in Brussels and across Europe.",
    },
  },
  {
    img: "/media/piano-sur-elevateur.webp",
    title: { fr: "Vous êtes chez vous", nl: "U bent thuis", en: "You’re home" },
    text: {
      fr: "Remontage des meubles, installation dans les pièces de votre choix, et si vous le souhaitez, évacuation de ce que vous ne gardez pas. Il ne vous reste qu’à vous installer.",
      nl: "Montage van de meubels, plaatsing in de kamers van uw keuze en, als u dat wenst, afvoer van wat u niet houdt. U hoeft enkel nog te settelen.",
      en: "Furniture reassembled, placed in the rooms you choose and, if you wish, removal of what you are not keeping. All that’s left is to settle in.",
    },
  },
]

const titles: Record<Locale, string> = {
  fr: "Comment se passe votre déménagement",
  nl: "Zo verloopt uw verhuizing",
  en: "How your move works",
}

function Step({ i, active, onActive, locale }: { i: number; active: boolean; onActive: (i: number) => void; locale: Locale }) {
  const ref = React.useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })
  React.useEffect(() => {
    if (inView) onActive(i)
  }, [inView, i, onActive])
  const s = steps[i]
  return (
    <li ref={ref} className="relative pb-16 pl-14 last:pb-0 lg:min-h-[52vh] lg:pb-0">
      <span
        className={cn(
          "absolute left-0 top-0 grid size-10 place-items-center rounded-full font-serif text-[20px] transition-colors duration-500",
          active ? "bg-red text-cream" : "bg-ink/8 text-ink/50 ring-1 ring-ink/15",
        )}
      >
        {i + 1}
      </span>
      <h3 className={cn("display text-[clamp(26px,2.8vw,40px)] transition-colors duration-500", active ? "text-ink" : "text-ink/45 lg:text-ink/35")}>{s.title[locale]}</h3>
      <p className={cn("mt-4 max-w-[48ch] text-[17px] leading-[1.7] transition-colors duration-500", active ? "text-ink/80" : "text-ink/55")}>{s.text[locale]}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.img} alt="" loading="lazy" className="photo mt-6 aspect-[4/3] w-full rounded-[18px] object-cover lg:hidden" />
    </li>
  )
}

/** The four stages of a move, told with the company's own photos. Steps are numbered because order matters here. */
export function ProcessStory({ locale }: { locale: Locale }) {
  const [active, setActive] = React.useState(0)
  const onActive = React.useCallback((i: number) => setActive(i), [])
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container>
        <h2 className="display max-w-[16ch] text-[clamp(34px,4.6vw,64px)] text-ink">{titles[locale]}</h2>
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <ol className="relative lg:col-span-6">
            <span aria-hidden className="absolute bottom-0 left-5 top-2 w-px bg-ink/12" />
            <motion.span
              aria-hidden
              className="absolute left-5 top-2 w-px origin-top bg-red"
              animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease }}
            />
            {steps.map((_, i) => (
              <Step key={i} i={i} active={active === i} onActive={onActive} locale={locale} />
            ))}
          </ol>
          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="sticky top-[18vh] aspect-[4/5] overflow-hidden rounded-[24px] bg-ink-3">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={steps[active].img}
                  src={steps[active].img}
                  alt={steps[active].title[locale]}
                  className="photo absolute inset-0 size-full object-cover"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.9, ease }}
                />
              </AnimatePresence>
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-[12px] font-semibold text-cream backdrop-blur-sm">
                {active + 1} / {steps.length}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
