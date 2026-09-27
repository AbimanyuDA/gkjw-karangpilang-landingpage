export type IconName =
  | 'church'
  | 'family'
  | 'youth'
  | 'bible'
  | 'child'
  | 'music'
  | 'heart'
  | 'people'

export interface SiteInfo {
  name: string
  fullName: string
  greeting: string
  tagline: string
  about: string
  aboutPoints: string[]
  address: { street: string; city: string; province: string }
  mapsQuery: string
  contact: {
    phone: string
    whatsapp: string
    email: string
    instagram: string
    youtube: string
    youtubeUrl: string
  }
  officeHours: string
}

export interface Schedule {
  id: string
  title: string
  day: string
  times: string[]
  note: string
  icon: IconName
}

export interface Announcement {
  id: string
  /** ISO date, YYYY-MM-DD */
  date: string
  title: string
  summary: string
  image: string
  pdfUrl: string | null
}

export interface Ministry {
  id: string
  name: string
  description: string
  image: string
  icon: IconName
}

export interface ChurchEvent {
  id: string
  /** ISO date, YYYY-MM-DD */
  date: string
  title: string
  time: string
  location: string
}

export interface GalleryItem {
  id: string
  image: string
  caption: string
}

export interface Content {
  site: SiteInfo
  schedules: Schedule[]
  announcements: Announcement[]
  ministries: Ministry[]
  events: ChurchEvent[]
  gallery: GalleryItem[]
}
