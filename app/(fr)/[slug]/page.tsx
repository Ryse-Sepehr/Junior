import type { Metadata } from "next"
import { RoutePage } from "@/components/site/route-page"
import { allSlugs } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return pageMetadata("fr", slug)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <RoutePage locale="fr" slug={slug} />
}
