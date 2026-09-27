import { afterEach, describe, expect, it, vi } from 'vitest'
import fallback from '../data/fallback-content.json'
import { fetchContent, isContent } from './api'

afterEach(() => vi.unstubAllGlobals())

const respond = (body: unknown, status = 200) =>
  vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }))

describe('isContent', () => {
  it('accepts the bundled fallback content', () => {
    expect(isContent(fallback)).toBe(true)
  })

  it.each([null, {}, { ...fallback, events: 'bukan array' }, { ...fallback, site: null }])(
    'rejects malformed payload %#',
    (value) => {
      expect(isContent(value)).toBe(false)
    },
  )
})

describe('fetchContent', () => {
  it('returns content from the API envelope', async () => {
    const fetchMock = respond({ success: true, data: fallback, error: null })
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchContent('https://api.example/')).resolves.toEqual(fallback)
    expect(fetchMock).toHaveBeenCalledWith('https://api.example/api/content', expect.any(Object))
  })

  it('throws on HTTP errors', async () => {
    vi.stubGlobal('fetch', respond({ success: false, data: null, error: 'x' }, 500))
    await expect(fetchContent('https://api.example')).rejects.toThrow(/500/)
  })

  it('throws when the payload shape is wrong', async () => {
    vi.stubGlobal('fetch', respond({ success: true, data: { site: {} }, error: null }))
    await expect(fetchContent('https://api.example')).rejects.toThrow(/format/i)
  })
})
