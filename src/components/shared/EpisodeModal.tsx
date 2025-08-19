'use client'

import { DetailedEpisodeCharacterized } from '@/types'
import { Calendar, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface EpisodeModalProps {
  episode: DetailedEpisodeCharacterized
}

export function EpisodeModal({ episode }: EpisodeModalProps) {
  const router = useRouter()

  if (!episode) return null

  function handleClose() {
    router.back()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto'>
      <Card className='relative w-full max-w-3xl max-h-[90vh] overflow-y-auto'>
        <button
          onClick={handleClose}
          className='absolute right-4 top-4 z-10 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
          aria-label='Close'
        >
          <X className='h-5 w-5' />
        </button>

        <CardHeader className='border-b bg-muted/50 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-2xl font-bold font-sans tracking-wide'>
                {episode.name}
              </CardTitle>
              <div className='mt-2 flex items-center gap-2'>
                <Badge variant='secondary' className='font-mono tracking-tight'>
                  {episode.episode}
                </Badge>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <Calendar className='mr-1 h-4 w-4' />
                  <span className='font-serif text-xs'>
                    {new Date(episode.air_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-6'>
          <h3 className='mb-4 text-lg font-semibold font-sans tracking-tight'>
            Characters in this episode
          </h3>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {episode.characters_image.map(character => (
              <div
                key={character.id}
                className='group flex flex-col items-center space-y-2 rounded-lg p-2 transition-colors hover:bg-accent/50 cursor-pointer'
                onClick={() => {
                  router.push(`/characters/${character.id}`)
                }}
                role='button'
                tabIndex={0}
              >
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={character.image} alt={character.name} />
                  <AvatarFallback>
                    {character.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <span className='text-center text-sm font-medium font-serif tracking-tight'>
                  {character.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
