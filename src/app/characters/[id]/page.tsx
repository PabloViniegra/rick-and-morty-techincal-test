import { Metadata } from 'next'
import { Suspense } from 'react'
import CharacterServer from '@/components/server/CharacterServer'
import CharacterSkeleton from '@/components/shared/skeletons/CharacterSkeleton'
import { getCharacterById } from '@/lib/characters'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const character = await getCharacterById(parseInt(params.id, 10)).catch(() => null)

  if (!character) {
    return {
      title: 'Character Not Found | Rick and Morty',
      description: 'The requested character could not be found.',
    }
  }

  const title = `${character.name} | Rick and Morty Character`
  const description = `Learn more about ${character.name}, a ${character.species} from ${
    character.origin?.name || 'unknown origin'
  }. Status: ${character.status}.`
  const imageUrl = character.image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: [
        {
          url: imageUrl,
          width: 300,
          height: 300,
          alt: character.name,
        },
      ],
      siteName: 'Rick and Morty Characters',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://yourdomain.com/characters/${character.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = await params
  return (
    <Suspense fallback={<CharacterSkeleton />}>
      <CharacterServer id={id} />
    </Suspense>
  )
}
