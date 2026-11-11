"use client"

import * as React from "react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Check } from "lucide-react"
import type { Locale } from "@/lib/i18n"

const delivered: Record<Locale, string> = { fr: "Livré", nl: "Geleverd", en: "Delivered" }

/**
 * Reading progress as a Gérard & Fils truck driving along a thin road at the bottom
 * of the screen. It reaches the end of the road when the page is read: "Delivered".
 */
export function ScrollTruck({ locale, pathname }: { locale: Locale; pathname: string }) {
  const raw = useMotionValue(0)
  const progress = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.6 })
  const [done, setDone] = React.useState(false)
  const [width, setWidth] = React.useState(0)
  const road = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const s = document.querySelector<HTMLElement>(".gf-scroll")
    if (!s) return
    const update = () => {
      const max = s.scrollHeight - s.clientHeight
      const v = max > 0 ? s.scrollTop / max : 0
      raw.set(v)
      setDone(v > 0.985)
    }
    const measure = () => setWidth(road.current?.clientWidth ?? 0)
    update()
    measure()
    s.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      s.removeEventListener("scroll", update)
      window.removeEventListener("resize", measure)
    }
  }, [raw, pathname])

  const TRUCK = 58
  const x = useTransform(progress, (v) => v * Math.max(width - TRUCK, 0))
  const wheel = useTransform(progress, (v) => v * 360 * 18) // wheels turn as it drives
  const trail = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] hidden h-7 px-5 sm:block lg:px-8">
      <div ref={road} className="relative h-full">
        {/* road */}
        <span className="absolute inset-x-0 bottom-[5px] h-px bg-[repeating-linear-gradient(90deg,rgb(20_18_16/0.35)_0_8px,transparent_8px_14px)] mix-blend-multiply" />
        <motion.span className="absolute bottom-[5px] left-0 h-[2px] rounded-full bg-red" style={{ width: trail }} />
        <motion.div className="absolute bottom-[3px] left-0" style={{ x }}>
          <svg width={TRUCK} height="24" viewBox="0 0 58 24" className="drop-shadow-[0_3px_4px_rgb(0_0_0/0.35)]">
            {/* box */}
            <rect x="1" y="2" width="36" height="15" rx="2" fill="#f6f1e8" stroke="#141210" strokeWidth="1.2" />
            <rect x="1" y="12" width="36" height="2.4" fill="#c8323a" />
            <text x="19" y="10" textAnchor="middle" fontSize="6.2" fontWeight="700" fill="#141210" fontFamily="sans-serif">
              G&amp;F
            </text>
            {/* cab */}
            <path d="M38 6h9.5l5.5 6v5H38z" fill="#141210" />
            <path d="M41 8h5.6l3.4 4H41z" fill="#9fb3bf" />
            {/* wheels */}
            <motion.g style={{ rotate: wheel, originX: "11px", originY: "19px" }}>
              <circle cx="11" cy="19" r="3.6" fill="#141210" stroke="#f6f1e8" strokeWidth="1.2" />
              <line x1="11" y1="16.4" x2="11" y2="21.6" stroke="#f6f1e8" strokeWidth=".8" />
            </motion.g>
            <motion.g style={{ rotate: wheel, originX: "45px", originY: "19px" }}>
              <circle cx="45" cy="19" r="3.6" fill="#141210" stroke="#f6f1e8" strokeWidth="1.2" />
              <line x1="45" y1="16.4" x2="45" y2="21.6" stroke="#f6f1e8" strokeWidth=".8" />
            </motion.g>
          </svg>
        </motion.div>
        <AnimatePresence>
          {done && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute bottom-[30px] right-0 inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-cream"
            >
              <Check className="size-3" strokeWidth={2.5} />
              {delivered[locale]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
