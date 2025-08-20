'use client'

import { DetailedEpisodeCharacterized } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

interface GrillEpisodesProps {
  episodes: DetailedEpisodeCharacterized[]
}

export function GrillEpisodes({ episodes }: GrillEpisodesProps) {
  const router = useRouter()

  if (!episodes?.length) {
    return null
  }

  const sortedEpisodes = [...episodes].sort((a, b) => {
    const getNumber = (ep: string) => {
      const match = ep.match(/S(\d+)E(\d+)/i)
      return match ? parseInt(match[1] + match[2].padStart(2, '0'), 10) : 0
    }
    return getNumber(a.episode) - getNumber(b.episode)
  })

  const seasons = sortedEpisodes.reduce((acc, episode) => {
    const season = episode.episode.match(/S(\d+)/i)?.[1] || 'Unknown'
    if (!acc[season]) {
      acc[season] = []
    }
    acc[season].push(episode)
    return acc
  }, {} as Record<string, DetailedEpisodeCharacterized[]>)

  return (
    <div className='space-y-6 w-full'>
      <h2 className='text-lg font-bold tracking-tight font-sans'>Episodes</h2>

      {Object.entries(seasons).map(([season, seasonEpisodes]) => (
        <div key={season} className='space-y-4 w-full'>
          <h3 className='text-lg font-semibold font-sans tracking-tight'>Season {season}</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full [&>div]:h-full'>
            {seasonEpisodes.map(episode => (
              <Card
                key={episode.id}
                className='border-border hover:border-primary/50 transition-colors w-full max-w-full overflow-hidden h-full flex flex-col'
                onClick={() => router.push(`/episodes/${episode.id}`)}
              >
                <CardHeader className='pb-2'>
                  <div className='flex flex-col items-start gap-1'>
                    <CardTitle className='text-md font-sans line-clamp-2 leading-tight min-h-[2.75rem] flex items-center'>
                      {episode.name}
                    </CardTitle>
                    <Badge variant='outline' className='shrink-0 font-mono text-xs h-6'>
                      {episode.episode}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='pt-0 pb-3 flex-1'>
                  <div className='space-y-4 h-full flex flex-col'>
                    <div className='space-y-1'>
                      <p className='text-xs font-medium text-muted-foreground font-serif'>Aired</p>
                      <p className='text-sm font-sans text-foreground'>
                        {new Date(episode.air_date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <p className='text-xs font-medium text-muted-foreground font-serif'>
                        Characters
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {episode.characters_image.slice(0, 5).map(character => (
                          <Avatar key={character.id} className='h-8 w-8 border border-border'>
                            <AvatarImage
                              src={character.image}
                              alt={character.name}
                              width={40}
                              height={40}
                            />
                            <AvatarFallback className='text-xs'>
                              {character.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {episode.characters_image.length > 5 && (
                          <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium'>
                            +{episode.characters_image.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='text-[10px] font-mono text-muted-foreground mt-auto'>
                      {episode.characters.length} characters total
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
