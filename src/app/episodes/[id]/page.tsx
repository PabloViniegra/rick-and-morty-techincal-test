import EpisodeServer from '@/components/server/EpisodeServer'

export default async function EpisodePage({ params }: { params: { id: string } }) {
  const { id } = await params

  return <EpisodeServer id={Number(id)} />
}
