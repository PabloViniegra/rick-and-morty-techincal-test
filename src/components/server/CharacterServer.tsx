import { getCharacterById } from '@/lib/characters'
import CharacterDetail from '../client/character/CharacterDetail'

export default async function CharacterServer({ id }: { id: string }) {
  const character = await getCharacterById(parseInt(id, 10))
  
  return (
    <section>
      <CharacterDetail 
        character={character}
        isModal={true}
      />
    </section>
  )
}
