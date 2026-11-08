import type { Metadata } from "next"
import { HomePage } from "@/components/site/home-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("nl", "home")

export default function Page() {
  return <HomePage locale="nl" />
}
