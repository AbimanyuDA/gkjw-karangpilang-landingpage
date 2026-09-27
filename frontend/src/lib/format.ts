import type { ChurchEvent } from '../types/content'

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
] as const

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'] as const

interface DateParts {
  year: number
  month: number
  day: number
}

// Parse manually: `new Date('2026-09-27')` is UTC and can shift a day in WIB.
function parseISODate(iso: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null
  const [year, month, day] = match.slice(1).map(Number)
  if (month < 1 || month > 12 || day < 1 || day > 31) return null
  return { year, month, day }
}

export function formatLongDate(iso: string): string {
  const parts = parseISODate(iso)
  if (!parts) return iso
  return `${parts.day} ${MONTHS[parts.month - 1]} ${parts.year}`
}

export function dayMonth(iso: string): { day: string; month: string } {
  const parts = parseISODate(iso)
  if (!parts) return { day: '–', month: '' }
  return { day: String(parts.day).padStart(2, '0'), month: SHORT_MONTHS[parts.month - 1] }
}

export function formatTimes(times: readonly string[]): string {
  return times.length === 0 ? '' : `${times.join(' • ')} WIB`
}

export function toISODate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function upcomingEvents(
  events: readonly ChurchEvent[],
  now: Date = new Date(),
  limit = 4,
): ChurchEvent[] {
  const today = toISODate(now)
  return events
    .filter((event) => event.date >= today)
    .toSorted((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
}
