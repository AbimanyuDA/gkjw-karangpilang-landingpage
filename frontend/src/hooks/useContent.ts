import { useEffect, useState } from 'react'
import fallbackContent from '../data/fallback-content.json'
import { fetchContent } from '../lib/api'
import type { Content } from '../types/content'

export type ContentSource = 'bundled' | 'api'

const FALLBACK = fallbackContent as Content

/**
 * Renders instantly from the bundled copy, then swaps in live API content when
 * VITE_API_URL is configured. If the API fails the page keeps the bundled copy.
 */
export function useContent(apiUrl: string | undefined = import.meta.env.VITE_API_URL): {
  content: Content
  source: ContentSource
} {
  const [state, setState] = useState<{ content: Content; source: ContentSource }>({
    content: FALLBACK,
    source: 'bundled',
  })

  useEffect(() => {
    if (!apiUrl) return
    const controller = new AbortController()

    fetchContent(apiUrl, { signal: controller.signal })
      .then((content) => setState({ content, source: 'api' }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.warn('[konten] API tidak tersedia, memakai data bawaan.', error)
      })

    return () => controller.abort()
  }, [apiUrl])

  return state
}
