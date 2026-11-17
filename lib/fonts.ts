import { Bricolage_Grotesque, Figtree, Instrument_Serif, Lexend } from "next/font/google"

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
})

export const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

/* Logo wordmark: Lexend (same family as the original logo) + an italic serif "&". */
export const logoSans = Lexend({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-logo",
  display: "swap",
})

export const logoAmp = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-logo-amp",
  display: "swap",
})
