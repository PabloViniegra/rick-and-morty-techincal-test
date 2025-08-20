'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Character } from '@/types'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

type Props = {
  character: Character
}

export default function CharacterCard({ character }: Props) {
  const router = useRouter()
  const href = `/characters/${character.id}`
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    timerRef.current = setTimeout(() => {
      router.prefetch(href)
    }, 120)
  }

  const handleLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }
  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      onMouseLeave={handleLeave}
    >
      <article
        className='group rounded-lg border border-border bg-card text-foreground shadow-sm overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md hover:cursor-pointer'
        aria-label={`Character card for ${character.name}`}
        onClick={() => router.push(`/characters/${character.id}`)}
      >
        <div className='relative aspect-[4/3] w-full bg-muted'>
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw'
            className='object-cover'
            priority={false}
          />
          <span className='absolute left-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-xs font-mono'>
            {character.status}
          </span>
        </div>

        <div className='p-3 sm:p-4'>
          <h3 className='font-sans text-base sm:text-lg font-semibold leading-tight'>
            {character.name}
          </h3>
          <p className='mt-1 text-xs sm:text-sm text-muted-foreground font-serif'>
            {character.species} · {character.gender}
          </p>

          <dl className='mt-3 grid grid-cols-2 gap-2 text-xs sm:text-sm'>
            <div>
              <dt className='text-muted-foreground font-mono'>Origin</dt>
              <dd className='truncate font-sans' title={character.origin?.name}>
                {character.origin?.name || 'Unknown'}
              </dd>
            </div>
            <div>
              <dt className='text-muted-foreground font-mono'>Location</dt>
              <dd className='truncate font-sans' title={character.location?.name}>
                {character.location?.name || 'Unknown'}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  )
}
