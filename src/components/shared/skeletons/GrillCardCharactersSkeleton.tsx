import CharacterCardSkeleton from './CharacterCardSkeleton'
import { Skeleton } from './Skeleton'

interface Props {
  items?: number
  className?: string
}

export default function GrillCardCharactersSkeleton({ items = 8 }: Props) {
  return (
    <section className='w-full'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <header className='mb-4 sm:mb-6'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='mt-2 h-4 w-24' />
        </header>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
          {Array.from({ length: items }).map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
