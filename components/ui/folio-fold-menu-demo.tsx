"use client"

import FolioFoldMenu, { type FoldLink } from "@/components/ui/folio-fold-menu"

// Demo adapted for Gérard & Fils: a real job-site photo instead of a stock image.
const links: FoldLink[] = [
  { label: "Particuliers" },
  { label: "Pianos" },
  { label: "Garde-meubles" },
  { label: "Photos" },
  { label: "Contact" },
]

export default function Demo() {
  return (
    <FolioFoldMenu brand="Gérard & Fils" links={links} accent="#c8323a">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/camion-lift-dernier-etage.webp"
        alt="Camion et lift Gérard & Fils devant un immeuble bruxellois"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(10,9,7,.5) 0%,rgba(10,9,7,0) 30%,rgba(10,9,7,0) 55%,rgba(10,9,7,.75) 100%)" }} />
      <h1
        className="ffm-serif"
        style={{ position: "absolute", left: "clamp(18px,3vw,40px)", bottom: "clamp(28px,6vh,64px)", margin: 0, color: "#f4efe6", fontSize: "clamp(46px,7.6vw,120px)", lineHeight: 0.92, letterSpacing: "-0.025em", maxWidth: "11ch" }}
      >
        Votre déménagement, entre de bonnes mains.
      </h1>
    </FolioFoldMenu>
  )
}
