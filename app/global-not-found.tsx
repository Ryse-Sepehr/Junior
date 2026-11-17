import type { Metadata } from "next"
import Link from "next/link"
import { Logo } from "@/components/site/logo"
import { body, display, logoAmp, logoSans } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cette page a déménagé · Déménagement Gérard & Fils",
  robots: { index: false },
}

const lines = [
  { lang: "nl", href: "/nl/", text: "Deze pagina is verhuisd… maar wij laten u niet in de steek.", cta: "Naar de homepage" },
  { lang: "en", href: "/en/", text: "This page has moved… but we won’t leave you stranded.", cta: "Go to the homepage" },
]

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${logoSans.variable} ${logoAmp.variable}`}>
      <body style={{ overflow: "auto" }}>
        <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-red text-cream">
          <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_0%_0%,#d9434b_0%,#c8323a_45%,#a8262d_100%)]" />
          {/* The man from the logo still holds out his hand. */}
          <div aria-hidden className="pointer-events-none absolute -bottom-6 right-[-20%] -z-10 aspect-[720/900] h-[70%] opacity-30 md:right-[2%] md:h-[88%] md:opacity-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/homme-main-body.png" alt="" className="absolute inset-0 size-full" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/homme-main-hand.png" alt="" className="gf-handshake absolute inset-0 size-full" />
          </div>

          <header className="px-5 pt-5 sm:px-10 sm:pt-8">
            <Link href="/" aria-label="Déménagement Gérard & Fils" className="inline-flex rounded-[14px] bg-cream py-1.5 pl-1.5 pr-4">
              <Logo size={46} row />
            </Link>
          </header>

          <div className="flex flex-1 flex-col justify-center px-5 py-16 sm:px-10 lg:px-20">
            <p className="font-serif text-[clamp(96px,16vw,220px)] leading-[0.8] text-cream/25">404</p>
            <h1 className="display mt-4 max-w-[14ch] text-[clamp(44px,6.5vw,96px)]">
              Cette page a <span className="font-serif font-normal">déménagé.</span>
            </h1>
            <p className="mt-6 max-w-[36ch] text-[clamp(18px,1.6vw,22px)] leading-relaxed text-cream/90">
              Mais nous, on ne vous laisse pas tomber : on vous ramène à bon port.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/" className="inline-flex h-12 items-center rounded-full bg-cream px-6 text-[15px] font-semibold text-ink transition hover:bg-white">
                Retour à l’accueil
              </Link>
              <Link href="/devis-demenagement/" className="inline-flex h-12 items-center rounded-full px-6 text-[15px] font-semibold text-cream ring-1 ring-inset ring-cream/50 transition hover:bg-cream/10">
                Demander un devis
              </Link>
            </div>
            <ul className="mt-14 grid max-w-[44ch] gap-3 border-t border-cream/25 pt-6 text-[15px] text-cream/85">
              {lines.map((l) => (
                <li key={l.lang} lang={l.lang}>
                  {l.text}{" "}
                  <Link href={l.href} className="font-semibold text-cream underline decoration-cream/50 underline-offset-4 hover:decoration-cream">
                    {l.cta}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </html>
  )
}
