export interface TripMeta {
  id: string
  title: string
  memo?: string
  cover_image?: string
}

export interface Category {
  id: string
  label: string
  color: string
  emoji?: string
}

export interface TripEvent {
  title: string
  time: string
  time_end?: string
  category?: string
  memo?: string
  link?: string
  image?: string
  required?: boolean
}

export interface TripDay {
  title: string
  date: string
  timezone?: string
  locations?: string[]
  events: TripEvent[]
}

export interface TripData {
  meta: TripMeta
  categories?: Category[]
  days: TripDay[]
}
