'use client'

import type { Character } from '@/types'
import CharacterCard from './CharacterCard'
import Search from '@/components/shared/Search'
import FilterPanel from './FilterPanel'

type Props = {
  characters: Character[]
  className?: string
}

export default function GrillCardCharacters({ characters, className }: Props) {
  if (characters.length === 0) {
    return (
      <section className={'w-full ' + (className ?? '')}>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <header className='mb-4 sm:mb-6 flex flex-row items-center justify-between mt-5'>
            <h2 className='font-sans tracking-tight leading-relaxed text-xl sm:text-2xl font-extrabold text-foreground'>
              Characters
            </h2>
            <FilterPanel />
            <Search />
          </header>
          <p className='text-md text-center tracking-tight text-muted-foreground font-serif'>
            No characters found
          </p>
        </div>
      </section>
    )
  }
  return (
    <section className={'w-full ' + (className ?? '')}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <header className='mb-4 sm:mb-6 flex flex-row items-center justify-between mt-5'>
          <h2 className='font-sans tracking-tight leading-relaxed text-xl sm:text-2xl font-extrabold text-foreground'>
            Characters
          </h2>
          <p className='text-sm text-background font-serif'>Total: {characters.length}</p>
          <FilterPanel />
          <Search />
        </header>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
          {characters.map(c => (
            <CharacterCard key={c.id} character={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
