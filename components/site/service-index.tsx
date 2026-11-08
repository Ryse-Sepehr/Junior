"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type IndexItem = { title: string; text: string; href: string; image: string; label: string }

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Services as an editorial index rather than a grid of identical cards.
 * Hovering (or focusing) a row swaps the job-site photo in the sticky panel.
 */
export function ServiceIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = React.useState(0)
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <ol className="border-t border-ink/15">
        {items.map((it, i) => (
          <li key={it.href} className="border-b border-ink/15">
            <Link
              href={it.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3 py-7 outline-none sm:py-8"
            >
              <span>
                <span
                  className={cn(
                    "display block text-[clamp(28px,3.4vw,46px)] transition-colors duration-300",
                    active === i ? "text-ink" : "text-ink/45 group-hover:text-ink lg:text-ink/40",
                  )}
                >
                  {it.title}
                </span>
                <span className="mt-3 block max-w-[56ch] text-[16px] leading-relaxed text-muted">{it.text}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-red">
                  {it.label}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt=""
                loading="lazy"
                className="photo mt-1 aspect-[4/5] w-24 rounded-xl object-cover sm:w-28 lg:hidden"
              />
            </Link>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[22px] bg-ink-3">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={items[active].image}
              src={items[active].image}
              alt={items[active].title}
              className="photo absolute inset-0 size-full object-cover"
              initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6 pt-20">
            <p className="text-[13px] text-cream/80">{items[active].title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
