"use client"

import * as React from "react"
import { motion } from "framer-motion"
import type { Locale } from "@/lib/i18n"
import { Container } from "./primitives"

const MAX = 24
const FLOOR_M = 3 // approximate height of one storey in metres

const copy: Record<Locale, { title: string; text: string; label: string; floor: (n: number) => string; height: string; ok: string }> = {
  fr: {
    title: "Jusqu’à quel étage ?",
    text: "Faites glisser pour choisir votre étage. Nos lifts montent jusqu’au 24ᵉ, par la fenêtre ou le balcon, quand l’escalier ou l’ascenseur ne suffisent pas.",
    label: "Votre étage",
    floor: (n) => (n === 0 ? "Rez-de-chaussée" : n === 1 ? "1er étage" : `${n}ᵉ étage`),
    height: "hauteur approximative",
    ok: "Accessible avec nos lifts",
  },
  nl: {
    title: "Tot welke verdieping?",
    text: "Schuif om uw verdieping te kiezen. Onze verhuisliften gaan tot de 24ste verdieping, via raam of balkon, wanneer trap of lift niet volstaan.",
    label: "Uw verdieping",
    floor: (n) => (n === 0 ? "Gelijkvloers" : `${n}${n === 1 || n === 8 || n >= 20 ? "ste" : "de"} verdieping`),
    height: "geschatte hoogte",
    ok: "Bereikbaar met onze verhuisliften",
  },
  en: {
    title: "Which floor are you on?",
    text: "Slide to choose your floor. Our furniture lifts reach the 24th floor, through a window or balcony, when stairs or the lift are not enough.",
    label: "Your floor",
    floor: (n) => {
      if (n === 0) return "Ground floor"
      const s = n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th"
      return `${n}${s} floor`
    },
    height: "approximate height",
    ok: "Within reach of our lifts",
  },
}

/** Interactive check of the company's main lift claim: up to the 24th floor. */
export function LiftReach({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const [floor, setFloor] = React.useState(6)
  const h = 380 // svg height
  const floorH = (h - 30) / (MAX + 1)
  const y = h - 20 - (floor + 0.5) * floorH

  return (
    <section className="bg-ink py-20 text-cream sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="display text-[clamp(32px,4vw,56px)]">{t.title}</h2>
          <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.7] text-muted-ink">{t.text}</p>

          <label className="mt-10 block">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-cream/55">{t.label}</span>
            <input
              type="range"
              min={0}
              max={MAX}
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
              className="gf-range mt-4 w-full"
              aria-valuetext={t.floor(floor)}
            />
          </label>
          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-3">
            <p className="display text-[48px] leading-none">{t.floor(floor)}</p>
            <p className="text-[15px] text-muted-ink">
              ≈ {Math.max(floor * FLOOR_M, 0)} m · {t.height}
            </p>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream/8 px-4 py-2 text-[14px] font-semibold text-cream ring-1 ring-cream/15">
            <span className="size-2 rounded-full bg-red-ink" aria-hidden />
            {t.ok}
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <svg viewBox={`0 0 320 ${h}`} className="mx-auto w-full max-w-[360px]" aria-hidden>
            {/* ground */}
            <line x1="0" x2="320" y1={h - 20} y2={h - 20} stroke="currentColor" strokeOpacity=".25" />
            {/* building */}
            {Array.from({ length: MAX + 1 }, (_, i) => {
              const fy = h - 20 - (i + 1) * floorH
              const lit = i <= floor
              return (
                <g key={i}>
                  <rect x="170" y={fy} width="120" height={floorH - 1.5} fill={lit ? "#2a2622" : "#1d1a17"} />
                  {[0, 1, 2].map((w) => (
                    <rect
                      key={w}
                      x={182 + w * 36}
                      y={fy + floorH * 0.25}
                      width="22"
                      height={floorH * 0.45}
                      rx="1"
                      fill={i === floor ? "#e2525a" : lit ? "#f6f1e8" : "#f6f1e8"}
                      fillOpacity={i === floor ? 1 : lit ? 0.35 : 0.08}
                    />
                  ))}
                </g>
              )
            })}
            {/* truck */}
            <rect x="20" y={h - 48} width="96" height="24" rx="3" fill="#f6f1e8" />
            <rect x="96" y={h - 44} width="20" height="12" rx="2" fill="#141210" fillOpacity=".7" />
            <circle cx="40" cy={h - 20} r="7" fill="#141210" stroke="#f6f1e8" strokeWidth="2" />
            <circle cx="98" cy={h - 20} r="7" fill="#141210" stroke="#f6f1e8" strokeWidth="2" />
            {/* lift arm, pivoting on the truck */}
            <motion.line
              x1="60"
              y1={h - 50}
              x2="168"
              animate={{ y2: y }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              stroke="#c8323a"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <motion.line
              x1="60"
              y1={h - 50}
              x2="168"
              animate={{ y2: y }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              stroke="#f6f1e8"
              strokeWidth="1.5"
              strokeDasharray="3 5"
            />
            {/* platform */}
            <motion.rect x="150" width="20" height="10" rx="2" fill="#f6f1e8" animate={{ y: y - 5 }} transition={{ type: "spring", stiffness: 90, damping: 18 }} />
          </svg>
        </div>
      </Container>
    </section>
  )
}
