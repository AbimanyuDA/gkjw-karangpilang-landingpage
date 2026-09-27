import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import fallback from '../data/fallback-content.json'
import { useContent } from './useContent'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('useContent', () => {
  it('uses bundled content when no API url is configured', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const { result } = renderHook(() => useContent(''))
    expect(result.current.source).toBe('bundled')
    expect(result.current.content.site.name).toBe(fallback.site.name)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('switches to API content when the request succeeds', async () => {
    const live = { ...fallback, site: { ...fallback.site, name: 'Dari API' } }
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, data: live, error: null }))),
    )
    const { result } = renderHook(() => useContent('https://api.example'))
    await waitFor(() => expect(result.current.source).toBe('api'))
    expect(result.current.content.site.name).toBe('Dari API')
  })

  it('keeps bundled content and warns when the API fails', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const { result } = renderHook(() => useContent('https://api.example'))
    await waitFor(() => expect(warn).toHaveBeenCalled())
    expect(result.current.source).toBe('bundled')
  })
})
