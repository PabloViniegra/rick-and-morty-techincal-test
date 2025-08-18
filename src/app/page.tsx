import { Suspense } from 'react'
import { Metadata } from 'next'
import CharactersServerList from '@/components/server/CharactersServerList'
import GrillCardCharactersSkeleton from '@/components/shared/skeletons/GrillCardCharactersSkeleton'
import HeroIntroDialog from '@/components/client/HeroIntroDialog'

interface PageProps {
  searchParams: {
    page?: string
    name?: string
    status?: 'alive' | 'dead' | 'unknown'
    species?: string
    gender?: 'female' | 'male' | 'genderless' | 'unknown'
  }
}

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

export default function Home({ searchParams }: PageProps) {
  const sp = searchParams
  return (
    <main>
      <HeroIntroDialog />
      <Suspense fallback={<GrillCardCharactersSkeleton />}>
        <CharactersServerList
          page={sp.page}
          name={sp.name}
          status={sp.status}
          species={sp.species}
          gender={sp.gender}
        />
      </Suspense>
    </main>
  )
}
