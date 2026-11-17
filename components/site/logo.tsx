import { cn } from "@/lib/utils"

/**
 * Gérard & Fils logo: the red medallion with the man from the original logo,
 * next to the wordmark (Lexend, italic serif "&"). `size` is the medallion size in px.
 */
export function Logo({
  size = 48,
  tagline = true,
  tone = "dark",
  row = false,
  className,
}: {
  size?: number
  tagline?: boolean
  tone?: "dark" | "light"
  /** One-line wordmark ("Gerard & fils") for tight spots such as the header. */
  row?: boolean
  className?: string
}) {
  const word = row ? size * 0.44 : size * 0.34
  return (
    <span className={cn("inline-flex items-center", className)} style={{ gap: size * 0.16 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/badge.svg" alt="" width={size} height={size} className="shrink-0" style={{ width: size, height: size }} />
      <span
        className={cn("block whitespace-nowrap", tone === "light" ? "text-cream" : "text-ink")}
        style={{ fontFamily: "var(--font-logo)", lineHeight: 0.88, letterSpacing: "-0.04em", fontWeight: 700 }}
      >
        {tagline && (
          <span
            className="block text-red"
            style={{ fontSize: row ? size * 0.17 : Math.max(size * 0.085, 7), fontWeight: 600, letterSpacing: "0.24em", marginBottom: row ? size * 0.1 : size * 0.07 }}
          >
            DÉMÉNAGEMENT
          </span>
        )}
        <span className={row ? "" : "block"} style={{ fontSize: word }}>Gerard</span>
        {row && " "}
        <span className={row ? "" : "block"} style={{ fontSize: word }}>
          <span className="text-red" style={{ fontFamily: "var(--font-logo-amp)", fontStyle: "italic", fontWeight: 400, fontSize: "1.2em", letterSpacing: 0, lineHeight: 0.5 }}>
            &amp;
          </span>{" "}
          fils
        </span>
      </span>
    </span>
  )
}
