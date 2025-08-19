import {
  getCharacterById,
  getEpisodesFromCharacter,
  getLocationFromCharacter,
  getSimpleCharactersFromEpisodes,
} from '@/lib/characters'
import CharacterDetail from '@/components/client/character/CharacterDetail'

function isValidHttpUrl(url?: string | null) {
  return !!url && /^https?:\/\//i.test(url)
}

export default async function CharacterServer({ id }: { id: string }) {
  const parsedId = Number.parseInt(id, 10)
  if (!Number.isFinite(parsedId) || parsedId <= 0) {
    throw new Error(`Invalid character id: ${id}`)
  }
  const character = await getCharacterById(parsedId)

  const originPromise = isValidHttpUrl(character.origin?.url)
    ? getLocationFromCharacter(character.origin.url)
    : Promise.resolve(null)

  const locationPromise = isValidHttpUrl(character.location?.url)
    ? getLocationFromCharacter(character.location.url)
    : Promise.resolve(null)

  const episodesPromise = getEpisodesFromCharacter(character.episode)

  const [origin, location, episodes] = await Promise.all([
    originPromise,
    locationPromise,
    episodesPromise,
  ])

  const episodesCharacters = await getSimpleCharactersFromEpisodes(episodes)

  return (
    <section>
      <CharacterDetail
        character={character}
        isModal={true}
        location={location ?? undefined}
        origin={origin ?? undefined}
        episodes={episodesCharacters}
      />
    </section>
  )
}
