import { describe, expect, it } from 'vitest'
import { dayMonth, formatLongDate, formatTimes, toISODate, upcomingEvents } from './format'

describe('formatLongDate', () => {
  it('formats an ISO date in Indonesian', () => {
    expect(formatLongDate('2026-09-27')).toBe('27 September 2026')
  })

  it('returns the input when it is not a valid ISO date', () => {
    expect(formatLongDate('besok')).toBe('besok')
  })
})

describe('dayMonth', () => {
  it('splits into zero-padded day and short month', () => {
    expect(dayMonth('2026-10-04')).toEqual({ day: '04', month: 'Okt' })
  })

  it('falls back gracefully for invalid input', () => {
    expect(dayMonth('xx')).toEqual({ day: '–', month: '' })
  })
})

describe('formatTimes', () => {
  it('joins times with a bullet and WIB suffix', () => {
    expect(formatTimes(['07.00', '09.00'])).toBe('07.00 • 09.00 WIB')
  })

  it('returns an empty string when there are no times', () => {
    expect(formatTimes([])).toBe('')
  })
})

describe('toISODate', () => {
  it('uses the local calendar date', () => {
    expect(toISODate(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05')
  })
})

describe('upcomingEvents', () => {
  const events = [
    { id: 'b', date: '2026-10-10', title: 'B', time: '', location: '' },
    { id: 'past', date: '2026-09-01', title: 'Lalu', time: '', location: '' },
    { id: 'a', date: '2026-09-27', title: 'A', time: '', location: '' },
  ]

  it('keeps today and future events, soonest first, without mutating input', () => {
    const snapshot = structuredClone(events)
    const result = upcomingEvents(events, new Date(2026, 8, 27, 20))
    expect(result.map((e) => e.id)).toEqual(['a', 'b'])
    expect(events).toEqual(snapshot)
  })

  it('respects the limit', () => {
    expect(upcomingEvents(events, new Date(2026, 0, 1), 1)).toHaveLength(1)
  })
})
