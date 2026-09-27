export const MAX_LIMIT = 50

/**
 * Validate the optional `?limit=` query value.
 * Returns `{ ok: true, value }` (value undefined when absent) or `{ ok: false, error }`.
 */
export function parseLimit(raw) {
  if (raw === undefined) return { ok: true, value: undefined }

  const text = typeof raw === 'string' ? raw : ''
  if (!/^\d+$/.test(text)) {
    return { ok: false, error: `Parameter limit harus bilangan bulat 1–${MAX_LIMIT}.` }
  }

  const value = Number(text)
  if (value < 1 || value > MAX_LIMIT) {
    return { ok: false, error: `Parameter limit harus bilangan bulat 1–${MAX_LIMIT}.` }
  }

  return { ok: true, value }
}
