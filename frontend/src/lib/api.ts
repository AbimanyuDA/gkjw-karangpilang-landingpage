import type { Content } from '../types/content'
import { contentSchema } from './content-schema'

const DEFAULT_TIMEOUT_MS = 6000

export function isContent(value: unknown): value is Content {
  return contentSchema.safeParse(value).success
}

/** Fetches `/api/content` from the backend and validates the envelope before trusting it. */
export async function fetchContent(
  baseUrl: string,
  { signal, timeoutMs = DEFAULT_TIMEOUT_MS }: { signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<Content> {
  const url = `${baseUrl.replace(/\/+$/, '')}/api/content`
  const timeout = AbortSignal.timeout(timeoutMs)
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  })

  if (!response.ok) {
    throw new Error(`API konten merespons ${response.status}`)
  }

  const body: unknown = await response.json()
  const data = (body as { data?: unknown } | null)?.data
  if (!isContent(data)) {
    throw new Error('Format data dari API konten tidak sesuai')
  }
  return data
}
