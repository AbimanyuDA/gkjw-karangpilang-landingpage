import { describe, expect, it } from 'vitest'
import { parseLimit } from '../src/lib/query.js'

describe('parseLimit', () => {
  it('returns undefined when no limit is given', () => {
    expect(parseLimit(undefined)).toEqual({ ok: true, value: undefined })
  })

  it('parses a valid positive integer', () => {
    expect(parseLimit('3')).toEqual({ ok: true, value: 3 })
  })

  it.each(['0', '-1', '51', 'abc', '2.5', ''])('rejects %j', (raw) => {
    expect(parseLimit(raw).ok).toBe(false)
  })

  it('rejects repeated query params', () => {
    expect(parseLimit(['1', '2']).ok).toBe(false)
  })
})
