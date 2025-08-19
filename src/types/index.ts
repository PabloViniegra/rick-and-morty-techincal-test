export interface ResponseCharacterList {
  info: Info
  results: Character[]
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: any
}

export interface ResponseCharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export interface DetailedLocation {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface DetailedEpisode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface SimpleCharacter {
  id: number
  name: string
  image: string
}

export interface DetailedEpisodeCharacterized extends DetailedEpisode {
  characters_image: SimpleCharacter[]
}
