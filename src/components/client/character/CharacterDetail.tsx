'use client'

import { Character, DetailedLocation, DetailedEpisodeCharacterized } from '@/types'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { GrillEpisodes } from '@/components/shared/GrillEpisodes'

type CharacterDetailProps = {
  character: Character
  location?: DetailedLocation
  origin?: DetailedLocation
  episodes: DetailedEpisodeCharacterized[]
  isModal?: boolean
  onClose?: () => void
}

export default function CharacterDetail({
  character,
  location,
  origin,
  episodes,
  isModal = false,
  onClose = () => window.history.back(),
}: CharacterDetailProps) {
  useEffect(() => {
    if (!isModal) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isModal, onClose])

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const content = (
    <div className='w-full max-w-3xl mx-auto p-4 md:p-6'>
      <div className='flex flex-col items-center space-y-6 w-full'>
        <div className='w-full text-center space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight font-sans'>{character.name}</h1>
          <div className='flex items-center justify-center gap-2 text-muted-foreground'>
            <span
              className={`inline-block h-3 w-3 rounded-full font-serif tracking-tight ${
                character.status === 'Alive'
                  ? 'bg-green-500'
                  : character.status === 'Dead'
                  ? 'bg-red-500'
                  : 'bg-gray-500'
              }`}
            />
            <span>
              {character.status} - {character.species}
            </span>
          </div>
        </div>
        <div className='w-full max-w-xs'>
          <div className='relative aspect-square rounded-lg overflow-hidden border border-border'>
            <Image
              src={character.image}
              alt={character.name}
              fill
              className='object-cover'
              priority
            />
            <div className='absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-mono'>
              {character.species}
            </div>
          </div>
        </div>
        <div className='w-full space-y-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <h3 className='text-sm font-medium text-muted-foreground font-serif'>Gender</h3>
              <p className='capitalize font-sans text-foreground'>
                {character.gender.toLowerCase()}
              </p>
            </div>

            <div className='space-y-1'>
              <h3 className='text-sm font-medium text-muted-foreground font-serif'>Origin</h3>
              <p className='font-sans text-foreground'>{character.origin.name}</p>
            </div>

            <div className='space-y-1'>
              <h3 className='text-sm font-medium text-muted-foreground'>Last known location</h3>
              <p className='font-sans text-foreground'>{character.location.name}</p>
            </div>

            {character.type && (
              <div className='space-y-1'>
                <h3 className='text-sm font-medium text-muted-foreground font-serif'>Type</h3>
                <p className='font-sans text-foreground'>{character.type}</p>
              </div>
            )}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            {origin && (
              <div className='bg-muted/20 p-4 rounded-lg border border-border'>
                <h2 className='text-lg font-semibold mb-3 font-sans'>Origin</h2>
                <div className='space-y-3'>
                  <div>
                    <h3 className='text-xs font-medium text-muted-foreground font-serif'>Name</h3>
                    <p className='font-sans text-foreground'>{origin.name}</p>
                  </div>
                  <div>
                    <h3 className='text-xs font-medium text-muted-foreground font-serif'>Type</h3>
                    <p className='font-sans text-foreground capitalize'>
                      {origin.type.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <h3 className='text-xs font-medium text-muted-foreground font-serif'>
                      Dimension
                    </h3>
                    <p className='font-sans text-foreground'>{origin.dimension || 'Unknown'}</p>
                  </div>
                  <div>
                    <h3 className='text-xs font-medium text-muted-foreground font-serif'>
                      Residents
                    </h3>
                    <p className='font-sans text-foreground'>{origin.residents?.length || 0}</p>
                  </div>
                </div>
              </div>
            )}

            {location && (
              <div className='bg-muted/20 p-4 rounded-lg border border-border'>
                <h2 className='text-lg font-semibold mb-3 font-sans'>Current Location</h2>
                <div className='space-y-3'>
                  <div>
                    <h3 className='text-xs font-medium text-muted-foreground font-serif'>Name</h3>
                    <p className='font-sans text-foreground'>{location.name}</p>
                  </div>
                  <div>
                    <h3 className='text-xs font-medium text-muted-foreground font-serif'>Type</h3>
                    <p className='font-sans text-foreground capitalize'>
                      {location.type.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <h3 className='text-xs font-medium text-muted-foreground font-serif'>
                      Dimension
                    </h3>
                    <p className='font-sans text-foreground'>{location.dimension || 'Unknown'}</p>
                  </div>
                  <div>
                    <h3 className='text-xs font-medium text-muted-foreground font-serif'>
                      Residents
                    </h3>
                    <p className='font-sans text-foreground'>{location.residents?.length || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {episodes && episodes.length > 0 && (
            <div className='mt-6 w-full col-span-1 lg:col-span-3'>
              <GrillEpisodes episodes={episodes} />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (!isModal) {
    return content
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto'
      onClick={onClose}
    >
      <div
        className='relative bg-card rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border animate-in fade-in-90 zoom-in-90'
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          className='absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors z-10'
          aria-label='Cerrar modal'
        >
          <X className='h-5 w-5' />
        </button>
        {content}
      </div>
    </div>
  )
}
