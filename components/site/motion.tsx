"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Settles content into place as it enters. It starts already visible (never hidden),
 * so nothing depends on JavaScript or on the observer firing.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "li" | "figure"
}) {
  const reduced = useReducedMotion()
  const M = motion[as]
  if (reduced) return React.createElement(as, { className }, children)
  return (
    <M
      className={className}
      initial={{ opacity: 0.35, y: 18, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  )
}

/** Photo that opens like a shutter as it scrolls in (clip-path), then rests. */
export function PhotoReveal({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={cn("relative overflow-hidden bg-ink-3", className)}
      initial={reduced ? false : { clipPath: "inset(8% 6% 8% 6% round 18px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 18px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease }}
      style={{ borderRadius: 18 }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="photo absolute inset-0 size-full object-cover"
        initial={reduced ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease }}
      />
    </motion.div>
  )
}

export function Faq({ items, tone = "paper" }: { items: { q: string; a: string }[]; tone?: "paper" | "ink" }) {
  const [open, setOpen] = React.useState<number | null>(0)
  const ink = tone === "ink"
  return (
    <ul className={cn("border-t", ink ? "border-cream/15" : "border-ink/15")}>
      {items.map((it, i) => {
        const isOpen = open === i
        const id = `faq-${i}`
        return (
          <li key={i} className={cn("border-b", ink ? "border-cream/15" : "border-ink/15")}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-[clamp(18px,1.6vw,22px)] font-semibold tracking-[-0.01em] transition-colors",
                  ink ? "text-cream hover:text-white" : "text-ink hover:text-red",
                )}
              >
                {it.q}
                <ChevronDown
                  aria-hidden
                  strokeWidth={1.75}
                  className={cn("size-5 shrink-0 transition-transform duration-500 ease-[var(--ease-out)]", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <p className={cn("max-w-[68ch] pb-6 text-[17px] leading-relaxed", ink ? "text-muted-ink" : "text-muted")}>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}

/** Vertical job-site clip: plays only while on screen, muted, no controls until tapped. */
export function SiteVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" })
  React.useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="photo size-full object-cover"
    />
  )
}
