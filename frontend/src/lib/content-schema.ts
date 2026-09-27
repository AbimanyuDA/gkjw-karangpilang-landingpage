import { z } from 'zod'

const icon = z.enum(['church', 'family', 'youth', 'bible', 'child', 'music', 'heart', 'people'])
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

export const contentSchema = z.object({
  site: z.object({
    name: z.string(),
    fullName: z.string(),
    greeting: z.string(),
    tagline: z.string(),
    about: z.string(),
    aboutPoints: z.array(z.string()),
    address: z.object({ street: z.string(), city: z.string(), province: z.string() }),
    mapsQuery: z.string(),
    contact: z.object({
      phone: z.string(),
      whatsapp: z.string(),
      email: z.string(),
      instagram: z.string(),
      youtube: z.string(),
      youtubeUrl: z.string(),
    }),
    officeHours: z.string(),
  }),
  schedules: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      day: z.string(),
      times: z.array(z.string()),
      note: z.string(),
      icon,
    }),
  ),
  announcements: z.array(
    z.object({
      id: z.string(),
      date: isoDate,
      title: z.string(),
      summary: z.string(),
      image: z.string(),
      pdfUrl: z.string().nullable(),
    }),
  ),
  ministries: z.array(
    z.object({ id: z.string(), name: z.string(), description: z.string(), image: z.string(), icon }),
  ),
  events: z.array(
    z.object({ id: z.string(), date: isoDate, title: z.string(), time: z.string(), location: z.string() }),
  ),
  gallery: z.array(z.object({ id: z.string(), image: z.string(), caption: z.string() })),
})
