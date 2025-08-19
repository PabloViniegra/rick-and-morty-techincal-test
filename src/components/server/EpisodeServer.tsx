import { getEpisode } from '@/lib/characters'
import { Suspense } from 'react'
import { EpisodeModal } from '@/components/shared/EpisodeModal'
import { EpisodeSkeleton } from '@/components/shared/skeletons/EpisodeSkeleton'

export default async function EpisodeServer({ id }: { id: number }) {
  const episode = await getEpisode(id)
  return (
    <Suspense fallback={<EpisodeSkeleton />}>
      <EpisodeModal episode={episode} />
    </Suspense>
  )
}
