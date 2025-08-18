import { ResponseCharacter, ResponseCharacterList } from '@/types'

const API_URL = process.env.NEXT_RICK_AND_MORTY_API_URL

interface CharacterQuery {
  page?: number
  name?: string
  status?: 'alive' | 'dead' | 'unknown'
  species?: string
  gender?: 'female' | 'male' | 'genderless' | 'unknown'
  signal?: AbortSignal
  fetchOptions?: RequestInit
}

export async function getCharacters(page?: number): Promise<ResponseCharacterList>
export async function getCharacters(options?: CharacterQuery): Promise<ResponseCharacterList>

export async function getCharacters(arg?: number | CharacterQuery): Promise<ResponseCharacterList> {
  if (!API_URL) {
    throw new Error('NEXT_RICK_AND_MORTY_API_URL is not defined')
  }

  const {
    page = typeof arg === 'number' ? arg : arg?.page ?? 1,
    name = typeof arg === 'number' ? '' : arg?.name ?? '',
    status = typeof arg === 'number' ? undefined : arg?.status,
    species = typeof arg === 'number' ? undefined : arg?.species,
    gender = typeof arg === 'number' ? undefined : arg?.gender,
    signal = typeof arg === 'number' ? undefined : arg?.signal,
    fetchOptions = typeof arg === 'number' ? undefined : arg?.fetchOptions,
  } = (typeof arg === 'number' ? {} : arg ?? {}) as CharacterQuery

  const params = new URLSearchParams()
  if (page && page > 0) params.set('page', String(page))
  if (name) params.set('name', name)
  if (status) params.set('status', status)
  if (species) params.set('species', species)
  if (gender) params.set('gender', gender)

  const url = `${API_URL}/character${params.toString() ? `?${params.toString()}` : ''}`

  const response = await fetch(url, {
    cache: 'no-store',
    signal,
    ...fetchOptions,
  })

  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null as unknown as string, prev: null },
        results: [],
      } as unknown as ResponseCharacterList
    }
    const text = await response.text().catch(() => '')
    throw new Error(
      `Failed to fetch characters (${response.status}): ${text || response.statusText}`
    )
  }

  return response.json()
}

export async function getCharacterById(id: number): Promise<ResponseCharacter> {
  if (!API_URL) {
    throw new Error('NEXT_RICK_AND_MORTY_API_URL is not defined')
  }

  const url = `${API_URL}/character/${id}`

  const response = await fetch(url, {
    cache: 'no-store',
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(
      `Failed to fetch character (${response.status}): ${text || response.statusText}`
    )
  }

  return response.json()
}
