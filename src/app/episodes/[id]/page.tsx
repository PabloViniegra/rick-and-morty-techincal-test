import type { Metadata } from 'next'
import EpisodeServer from '@/components/server/EpisodeServer'

type Params = Promise<{ id: string }>

async function fetchEpisodeMeta(id: number) {
  const api = process.env.NEXT_RICK_AND_MORTY_API_URL
  if (!api) return null
  try {
    const res = await fetch(`${api}/episode/${id}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return (await res.json()) as { id: number; name: string; episode: string; air_date: string }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const ep = Number.isFinite(Number(id)) ? await fetchEpisodeMeta(Number(id)) : null

  const title = ep ? `${ep.name} (${ep.episode}) · Episode ${ep.id}` : `Episode ${id}`
  const description = ep
    ? `Rick and Morty ${ep.episode} • ${ep.name} • Air date: ${ep.air_date}. Characters and details.`
    : `Details for Rick and Morty episode ${id}.`

  const url = `/episodes/${id}`
  const image = '/images/rick-and-morty.png'

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function EpisodePage({ params }: { params: Params }) {
  const { id } = await params

  return <EpisodeServer id={Number(id)} />
}
