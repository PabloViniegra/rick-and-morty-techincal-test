import { getCharacters } from '@/lib/characters'
import GrillCardCharacters from '@/components/client/characters/GrillCardCharacters'
import { Pagination } from '@/components/ui/pagination'

interface CharactersServerListProps {
  page?: string
  name?: string
  status?: 'alive' | 'dead' | 'unknown'
  species?: string
  gender?: 'female' | 'male' | 'genderless' | 'unknown'
}

export default async function CharactersServerList({
  page,
  name,
  status,
  species,
  gender,
}: CharactersServerListProps) {
  const pageNumber = page ? parseInt(page, 10) : 1
  const nameParam = name || ''
  const normalizedStatus = status
    ? (status.toLowerCase() as 'alive' | 'dead' | 'unknown')
    : undefined
  const normalizedGender = gender
    ? (gender.toLowerCase() as 'female' | 'male' | 'genderless' | 'unknown')
    : undefined
  const characters = await getCharacters({
    page: pageNumber,
    name: nameParam,
    status: normalizedStatus,
    species,
    gender: normalizedGender,
  })

  return (
    <div className='space-y-6'>
      <GrillCardCharacters characters={characters.results} />
      <div className='flex justify-center'>
        <Pagination
          next={characters.info?.next || null}
          prev={characters.info?.prev || null}
          currentPage={pageNumber}
          totalPages={characters.info?.pages || 1}
          className='w-full max-w-md'
        />
      </div>
    </div>
  )
}
