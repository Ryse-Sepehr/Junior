"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"

type Item = { type: "img"; src: string } | { type: "video"; src: string; poster: string }
const ease = [0.16, 1, 0.3, 1] as const

export function Gallery({ images, videos }: { images: string[]; videos: { src: string; poster: string }[] }) {
  // Weave the clips into the photo stream so they are found, not hidden at the end.
  const items: Item[] = React.useMemo(() => {
    const out: Item[] = images.map((src) => ({ type: "img", src }))
    videos.forEach((v, i) => out.splice(2 + i * 9, 0, { type: "video", ...v }))
    return out
  }, [images, videos])
  const [index, setIndex] = React.useState<number | null>(null)
  const close = React.useCallback(() => setIndex(null), [])
  const step = React.useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length])

  React.useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, close, step])

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {items.map((it, i) => (
          <li key={it.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-[14px] bg-ink-3"
              aria-label={it.type === "video" ? "Vidéo" : "Photo"}
            >
              <motion.img
                layoutId={`g-${it.src}`}
                src={it.type === "video" ? it.poster : it.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="photo w-full transition-transform duration-[1.1s] ease-[var(--ease-out)] group-hover:scale-[1.035]"
              />
              {it.type === "video" && (
                <span className="absolute inset-0 grid place-items-center bg-ink/25">
                  <span className="grid size-14 place-items-center rounded-full bg-cream/95 text-ink shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)]">
                    <Play className="ml-0.5 size-5 fill-current" aria-hidden />
                  </span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="gf-lightbox fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            {items[index].type === "video" ? (
              <motion.video
                key={items[index].src}
                src={items[index].src}
                poster={(items[index] as { poster: string }).poster}
                controls
                autoPlay
                playsInline
                className="max-h-full max-w-full rounded-[14px]"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
              />
            ) : (
              <motion.img
                key={items[index].src}
                layoutId={`g-${items[index].src}`}
                src={items[index].src}
                alt=""
                className="max-h-full max-w-full rounded-[14px] object-contain"
                onClick={(e) => e.stopPropagation()}
                transition={{ duration: 0.5, ease }}
              />
            )}
            <button type="button" onClick={close} aria-label="Fermer" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20">
              <X className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Précédent"
              className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Suivant"
              className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
