import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>
}

type BtnProps = {
  href: string
  children: React.ReactNode
  variant?: "red" | "ink" | "line-cream" | "line-ink" | "cream"
  className?: string
  arrow?: boolean
}

export function Btn({ href, children, variant = "red", className, arrow }: BtnProps) {
  const styles = {
    red: "bg-red text-cream hover:bg-[#b02a31]",
    ink: "bg-ink text-cream hover:bg-ink-3",
    cream: "bg-cream text-ink hover:bg-white",
    "line-cream": "text-cream ring-1 ring-inset ring-cream/40 hover:ring-cream hover:bg-cream/5",
    "line-ink": "text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink hover:bg-ink/[0.03]",
  }[variant]
  const cls = cn(
    "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-out)] active:scale-[0.97]",
    styles,
    className,
  )
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2}
          aria-hidden
        />
      )}
    </>
  )
  if (/^(tel|mailto|https?):/.test(href))
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}

/** Headings in the source are sometimes in capitals or start with ellipses; tidy them for display. */
export function tidy(h: string): string {
  let s = h.replace(/^\.\.\.\s*/, "… ").trim()
  if (s.length > 4 && s === s.toUpperCase()) s = s.charAt(0) + s.slice(1).toLowerCase()
  return s
}
