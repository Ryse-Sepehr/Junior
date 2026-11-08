"use client"

import * as React from "react"
import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Minus, Plus, RotateCcw } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Item = { id: string; m3: number; label: Record<Locale, string> }
type Room = { id: string; label: Record<Locale, string>; items: Item[] }

// Usual volumes (m³) used by removal companies for a first estimate.
const rooms: Room[] = [
  {
    id: "salon",
    label: { fr: "Salon", nl: "Woonkamer", en: "Living room" },
    items: [
      { id: "canape3", m3: 2, label: { fr: "Canapé 3 places", nl: "Driezitsbank", en: "3-seater sofa" } },
      { id: "canape2", m3: 1.5, label: { fr: "Canapé 2 places", nl: "Tweezitsbank", en: "2-seater sofa" } },
      { id: "fauteuil", m3: 0.8, label: { fr: "Fauteuil", nl: "Fauteuil", en: "Armchair" } },
      { id: "tablebasse", m3: 0.4, label: { fr: "Table basse", nl: "Salontafel", en: "Coffee table" } },
      { id: "meubletv", m3: 0.6, label: { fr: "Meuble TV", nl: "Tv-meubel", en: "TV unit" } },
      { id: "biblio", m3: 1, label: { fr: "Bibliothèque", nl: "Boekenkast", en: "Bookcase" } },
      { id: "buffet", m3: 1.2, label: { fr: "Buffet / bahut", nl: "Dressoir", en: "Sideboard" } },
      { id: "piano", m3: 1.5, label: { fr: "Piano droit", nl: "Rechte piano", en: "Upright piano" } },
    ],
  },
  {
    id: "repas",
    label: { fr: "Salle à manger", nl: "Eetkamer", en: "Dining room" },
    items: [
      { id: "table", m3: 1, label: { fr: "Table (6 pers.)", nl: "Tafel (6 pers.)", en: "Table (6 people)" } },
      { id: "chaise", m3: 0.2, label: { fr: "Chaise", nl: "Stoel", en: "Chair" } },
      { id: "vaisselier", m3: 1.5, label: { fr: "Vaisselier", nl: "Vitrinekast", en: "Display cabinet" } },
    ],
  },
  {
    id: "chambre",
    label: { fr: "Chambres", nl: "Slaapkamers", en: "Bedrooms" },
    items: [
      { id: "litdouble", m3: 2, label: { fr: "Lit double", nl: "Tweepersoonsbed", en: "Double bed" } },
      { id: "litsimple", m3: 1.2, label: { fr: "Lit simple", nl: "Eenpersoonsbed", en: "Single bed" } },
      { id: "armoire2", m3: 1.5, label: { fr: "Armoire 2 portes", nl: "Kleerkast 2 deuren", en: "2-door wardrobe" } },
      { id: "armoire3", m3: 2.2, label: { fr: "Armoire 3 portes", nl: "Kleerkast 3 deuren", en: "3-door wardrobe" } },
      { id: "commode", m3: 0.8, label: { fr: "Commode", nl: "Commode", en: "Chest of drawers" } },
      { id: "chevet", m3: 0.2, label: { fr: "Table de nuit", nl: "Nachtkastje", en: "Bedside table" } },
      { id: "bureau", m3: 0.8, label: { fr: "Bureau", nl: "Bureau", en: "Desk" } },
    ],
  },
  {
    id: "cuisine",
    label: { fr: "Cuisine & buanderie", nl: "Keuken & wasplaats", en: "Kitchen & laundry" },
    items: [
      { id: "frigo", m3: 1, label: { fr: "Réfrigérateur", nl: "Koelkast", en: "Fridge" } },
      { id: "frigous", m3: 1.8, label: { fr: "Frigo américain", nl: "Amerikaanse koelkast", en: "American fridge" } },
      { id: "lavelinge", m3: 0.6, label: { fr: "Lave-linge", nl: "Wasmachine", en: "Washing machine" } },
      { id: "secheling", m3: 0.6, label: { fr: "Sèche-linge", nl: "Droogkast", en: "Tumble dryer" } },
      { id: "lavevaiss", m3: 0.5, label: { fr: "Lave-vaisselle", nl: "Vaatwasser", en: "Dishwasher" } },
      { id: "tablecuis", m3: 0.6, label: { fr: "Table de cuisine", nl: "Keukentafel", en: "Kitchen table" } },
    ],
  },
  {
    id: "divers",
    label: { fr: "Cartons & divers", nl: "Dozen & diversen", en: "Boxes & other" },
    items: [
      { id: "carton", m3: 0.1, label: { fr: "Carton standard", nl: "Standaard doos", en: "Standard box" } },
      { id: "velo", m3: 0.5, label: { fr: "Vélo", nl: "Fiets", en: "Bicycle" } },
      { id: "plante", m3: 0.2, label: { fr: "Grande plante", nl: "Grote plant", en: "Large plant" } },
      { id: "jardin", m3: 1, label: { fr: "Mobilier de jardin (lot)", nl: "Tuinmeubelen (set)", en: "Garden furniture (set)" } },
    ],
  },
]

const copy: Record<Locale, { title: string; intro: string; total: string; items: string; use: string; used: string; reset: string; note: string; size: (m3: number) => string }> = {
  fr: {
    title: "Calculez votre volume",
    intro: "Ajoutez vos meubles pièce par pièce : le volume s’affiche en direct. Une estimation suffit, nous l’affinons avec vous.",
    total: "Volume estimé",
    items: "objets",
    use: "Utiliser ce volume dans ma demande",
    used: "Volume ajouté au formulaire",
    reset: "Recommencer",
    note: "Estimation indicative, basée sur les volumes usuels du métier.",
    size: (v) => (v === 0 ? "Ajoutez vos premiers meubles" : v <= 12 ? "Petit déménagement : studio ou une chambre" : v <= 30 ? "Appartement 2–3 chambres" : v <= 50 ? "Grande maison familiale" : "Grand volume : nous vous conseillons une visite"),
  },
  nl: {
    title: "Bereken uw volume",
    intro: "Voeg uw meubels per kamer toe: het volume verschijnt meteen. Een schatting volstaat, wij verfijnen ze samen met u.",
    total: "Geschat volume",
    items: "stuks",
    use: "Dit volume gebruiken in mijn aanvraag",
    used: "Volume toegevoegd aan het formulier",
    reset: "Opnieuw beginnen",
    note: "Indicatieve schatting, op basis van de gangbare volumes in de sector.",
    size: (v) => (v === 0 ? "Voeg uw eerste meubels toe" : v <= 12 ? "Kleine verhuizing: studio of één slaapkamer" : v <= 30 ? "Appartement met 2–3 slaapkamers" : v <= 50 ? "Grote gezinswoning" : "Groot volume: wij raden een bezoek aan"),
  },
  en: {
    title: "Work out your volume",
    intro: "Add your furniture room by room and the volume updates live. An estimate is enough; we refine it with you.",
    total: "Estimated volume",
    items: "items",
    use: "Use this volume in my request",
    used: "Volume added to the form",
    reset: "Start again",
    note: "Indicative estimate, based on standard industry volumes.",
    size: (v) => (v === 0 ? "Add your first pieces of furniture" : v <= 12 ? "Small move: studio or one bedroom" : v <= 30 ? "2–3 bedroom flat" : v <= 50 ? "Large family house" : "Large volume: we recommend a visit"),
  },
}

function Count({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 140, damping: 22 })
  const text = useTransform(spring, (v) => v.toFixed(1).replace(".", ","))
  React.useEffect(() => spring.set(value), [value, spring])
  return <motion.span>{text}</motion.span>
}

export function VolumeCalculator({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const [counts, setCounts] = React.useState<Record<string, number>>({})
  const [room, setRoom] = React.useState(rooms[0].id)
  const [applied, setApplied] = React.useState(false)
  const all = rooms.flatMap((r) => r.items)
  const total = Math.round(all.reduce((s, i) => s + (counts[i.id] ?? 0) * i.m3, 0) * 10) / 10
  const pieces = Object.values(counts).reduce((a, b) => a + b, 0)
  const capacity = Math.min(total / 60, 1)

  const change = (id: string, d: number) => {
    setApplied(false)
    setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }))
  }

  const apply = () => {
    const input = document.querySelector<HTMLInputElement>('form[name="devis"] input[name="volume"]')
    if (input) {
      input.value = String(total)
      input.dispatchEvent(new Event("input", { bubbles: true }))
      input.scrollIntoView({ behavior: "smooth", block: "center" })
      window.setTimeout(() => input.focus({ preventScroll: true }), 600)
    }
    setApplied(true)
  }

  const current = rooms.find((r) => r.id === room)!

  return (
    <section aria-labelledby="calc-title" className="overflow-hidden rounded-[26px] bg-ink text-cream">
      <div className="grid xl:grid-cols-[minmax(0,1fr)_290px]">
        <div className="min-w-0 p-6 sm:p-9">
          <h2 id="calc-title" className="display text-[clamp(28px,3vw,40px)]">
            {t.title}
          </h2>
          <p className="mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-muted-ink">{t.intro}</p>

          <div role="tablist" aria-label={t.title} className="-mx-1 mt-7 flex gap-1 overflow-x-auto px-1 pb-1">
            {rooms.map((r) => {
              const n = r.items.reduce((s, i) => s + (counts[i.id] ?? 0), 0)
              return (
                <button
                  key={r.id}
                  role="tab"
                  type="button"
                  aria-selected={room === r.id}
                  onClick={() => setRoom(r.id)}
                  className={cn(
                    "relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[14px] font-semibold transition-colors",
                    room === r.id ? "text-ink" : "text-cream/75 hover:text-cream",
                  )}
                >
                  {room === r.id && <motion.span layoutId="calc-tab" className="absolute inset-0 rounded-full bg-cream" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{r.label[locale]}</span>
                  {n > 0 && <span className="relative grid size-5 place-items-center rounded-full bg-red text-[11px] text-cream">{n}</span>}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={room}
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-5 grid gap-x-6 md:grid-cols-2"
            >
              {current.items.map((it) => {
                const n = counts[it.id] ?? 0
                return (
                  <li key={it.id} className="flex items-center justify-between gap-3 border-b border-cream/10 py-2.5">
                    <span className="min-w-0">
                      <span className={cn("block text-[15px] transition-colors", n ? "text-cream" : "text-cream/80")}>{it.label[locale]}</span>
                      <span className="text-[12px] tabular-nums text-muted-ink">{String(it.m3).replace(".", ",")} m³</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => change(it.id, -1)}
                        disabled={!n}
                        aria-label={`− ${it.label[locale]}`}
                        className="grid size-10 place-items-center rounded-full text-cream/80 ring-1 ring-cream/20 transition hover:bg-cream/10 disabled:opacity-30"
                      >
                        <Minus className="size-4" aria-hidden />
                      </button>
                      <span className="w-7 text-center text-[16px] font-semibold tabular-nums" aria-live="polite">
                        {n}
                      </span>
                      <button
                        type="button"
                        onClick={() => change(it.id, 1)}
                        aria-label={`+ ${it.label[locale]}`}
                        className="grid size-10 place-items-center rounded-full bg-cream text-ink transition hover:bg-white active:scale-95"
                      >
                        <Plus className="size-4" aria-hidden />
                      </button>
                    </span>
                  </li>
                )
              })}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* Result: the truck fills up as you add furniture */}
        <div className="flex flex-col justify-between gap-6 border-t border-cream/10 bg-ink-2 p-6 sm:p-9 xl:border-l xl:border-t-0">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-cream/55">{t.total}</p>
            <p className="display mt-2 text-[64px] leading-none tabular-nums">
              <Count value={total} />
              <span className="ml-1 text-[26px] text-cream/70">m³</span>
            </p>
            <p className="mt-2 text-[14px] text-muted-ink">
              {pieces} {t.items}
            </p>
            <div className="relative mt-6 h-24 overflow-hidden rounded-xl ring-1 ring-cream/15" aria-hidden>
              <motion.div
                className="absolute inset-y-0 left-0 bg-[repeating-linear-gradient(90deg,#c8323a_0_22px,#b02a31_22px_24px)]"
                animate={{ width: `${capacity * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
              <span className="absolute inset-0 grid place-items-center px-3 text-center text-[13px] font-semibold text-cream  [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">{t.size(total)}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <button
              type="button"
              onClick={apply}
              disabled={!total}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-red px-5 text-[15px] font-semibold text-cream transition hover:bg-[#b02a31] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {applied ? t.used : t.use}
              {!applied && <ArrowDown className="size-4" aria-hidden />}
            </button>
            {pieces > 0 && (
              <button type="button" onClick={() => (setCounts({}), setApplied(false))} className="inline-flex h-11 items-center justify-center gap-2 text-[14px] text-cream/70 hover:text-cream">
                <RotateCcw className="size-3.5" aria-hidden />
                {t.reset}
              </button>
            )}
            <p className="text-[12px] leading-snug text-cream/45">{t.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
