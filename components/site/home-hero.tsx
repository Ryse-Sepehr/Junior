"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Btn, Container } from "./primitives"
import { Accent } from "./accent"

const ease = [0.16, 1, 0.3, 1] as const

type Props = {
  title: [string, string]
  sub: string
  quote: string
  quoteHref: string
  phone: string
  phoneHref: string
  caption: string
  scroll: string
}

/**
 * The opening moment: a cream curtain carrying the logo lifts off a montage of the
 * company's own job-site footage, then the headline rises line by line.
 * Played once per visit; later visits (and reduced motion) skip straight to the page.
 */
export function HomeHero({ title, sub, quote, quoteHref, phone, phoneHref, caption, scroll }: Props) {
  const reduced = useReducedMotion()
  const [intro, setIntro] = React.useState<"pending" | "play" | "skip" | "done">("pending")
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem("gf-intro") === "1"
      sessionStorage.setItem("gf-intro", "1")
    } catch {}
    if (reduced || seen) return setIntro("skip")
    setIntro("play")
    const id = window.setTimeout(() => setIntro("done"), 1900)
    return () => window.clearTimeout(id)
  }, [reduced])

  // Gentle parallax on the footage while the hero scrolls away.
  const scroller = React.useRef<HTMLElement | null>(null)
  if (typeof document !== "undefined" && !scroller.current) scroller.current = document.querySelector<HTMLElement>(".gf-scroll")
  const { scrollYProgress } = useScroll({ target: ref, container: scroller, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"])
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.5])

  const play = intro === "play" || intro === "done"
  const d = play ? 1.25 : 0.05 // when the headline starts

  return (
    <section ref={ref} className="relative isolate flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-ink text-cream">
      {/* Footage: montage of real photos + clips from Gérard & Fils jobs */}
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <motion.video
          className="photo size-full object-cover"
          src="/video/hero.mp4"
          poster="/video/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          initial={play ? { scale: 1.12 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(20_18_16/0.62)_0%,rgb(20_18_16/0.12)_32%,rgb(20_18_16/0.25)_58%,rgb(20_18_16/0.88)_100%)]"
      />
      <motion.div aria-hidden className="absolute inset-0 -z-10 bg-ink" style={{ opacity: dim }} />

      <Container className="flex flex-1 flex-col justify-end pb-28 pt-32 sm:pb-24">
        <h1 className="display max-w-[15ch] text-[clamp(44px,8.2vw,112px)]">
          {title.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={i === 1 ? "block text-cream/95" : "block"}
                initial={intro === "skip" ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.05, ease, delay: d + i * 0.12 }}
              >
                {i === 1 ? <Accent text={line} /> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          initial={intro === "skip" ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: d + 0.35 }}
        >
          <p className="max-w-[46ch] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-cream/85">{sub}</p>
          <div className="flex flex-wrap gap-3">
            <Btn href={quoteHref} variant="red" arrow>
              {quote}
            </Btn>
            <Btn href={phoneHref} variant="line-cream">
              {phone}
            </Btn>
          </div>
        </motion.div>
      </Container>

      <div className="absolute inset-x-0 bottom-0 hidden border-t border-cream/15 sm:block">
        <Container className="flex h-14 items-center justify-between text-[13px] text-cream/70">
          <span className="inline-flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-ink opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-red-ink" />
            </span>
            {caption}
          </span>
          <span className="inline-flex items-center gap-2">
            {scroll}
            <ArrowDown className="size-3.5" strokeWidth={1.75} aria-hidden />
          </span>
        </Container>
      </div>

      <noscript>
        <style>{`.gf-curtain{display:none}`}</style>
      </noscript>
      {/* Curtain */}
      {(intro === "pending" || intro === "play") && (
        <motion.div
          aria-hidden
          className="gf-curtain absolute inset-0 z-20 grid place-items-center bg-cream"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={play ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.75 }}
        >
          <motion.img
            src="/media/logo-dark.png"
            alt=""
            className="w-[min(320px,62vw)]"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={play ? { opacity: [0, 1, 1, 0], y: [12, 0, 0, -24], scale: [0.98, 1, 1, 1] } : { opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.3, 0.6, 1], ease }}
          />
        </motion.div>
      )}
    </section>
  )
}
