import { Suspense } from 'react'
import { Metadata } from 'next'
import CharactersServerList from '@/components/server/CharactersServerList'
import GrillCardCharactersSkeleton from '@/components/shared/skeletons/GrillCardCharactersSkeleton'
import HeroIntroDialog from '@/components/client/HeroIntroDialog'

function firstParam(v?: string | string[]) {
  return Array.isArray(v) ? v[0] : v
}

type Status = 'alive' | 'dead' | 'unknown'
type Gender = 'female' | 'male' | 'genderless' | 'unknown'

type SearchParams = Promise<
  Partial<{
    page: string | string[]
    name: string | string[]
    status: Status | Status[] | string | string[]
    species: string | string[]
    gender: Gender | Gender[] | string | string[]
  }>
>

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rick and Morty Characters | Explore the Multiverse',
  description:
    'Browse through the complete collection of Rick and Morty characters. Filter by status, species, and gender to find your favorite characters from the multiverse.',
  keywords: [
    'Rick and Morty',
    'Characters',
    'Cartoon Network',
    'Adult Swim',
    'Rick Sanchez',
    'Morty Smith',
    'Science Fiction',
    'Animation',
  ],
  openGraph: {
    title: 'Rick and Morty Characters | Explore the Multiverse',
    description:
      'Browse through the complete collection of Rick and Morty characters from the hit TV show.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Rick and Morty Characters',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rick and Morty Characters | Explore the Multiverse',
    description: 'Discover all your favorite characters from the Rick and Morty universe!',
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams

  const page = firstParam(sp.page)
  const name = firstParam(sp.name)
  const status = firstParam(sp.status) as Status | undefined
  const species = firstParam(sp.species)
  const gender = firstParam(sp.gender) as Gender | undefined

  return (
    <main>
      <HeroIntroDialog />
      <Suspense fallback={<GrillCardCharactersSkeleton />}>
        <CharactersServerList
          page={page}
          name={name}
          status={status}
          species={species}
          gender={gender}
        />
      </Suspense>
    </main>
  )
}
