import type { Metadata, Viewport } from "next"
import { RootLayout } from "@/components/site/root-layout"
import { siteMetadata } from "@/lib/seo"

export const metadata: Metadata = siteMetadata("fr")
export const viewport: Viewport = { themeColor: "#141210", width: "device-width", initialScale: 1 }

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout locale="fr">{children}</RootLayout>
}
