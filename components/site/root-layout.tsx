import type { Locale } from "@/lib/i18n"
import { body, display, logoAmp, logoSans } from "@/lib/fonts"
import { SiteShell } from "./site-shell"
import { Footer } from "./footer"
import "../../app/globals.css"

export function RootLayout({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${logoSans.variable} ${logoAmp.variable}`}>
      <body>
        <SiteShell locale={locale}>
          <main id="contenu">{children}</main>
          <Footer locale={locale} />
        </SiteShell>
      </body>
    </html>
  )
}
