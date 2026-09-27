import { Router } from 'express'
import { parseLimit } from '../lib/query.js'
import { fail, ok } from '../lib/response.js'
import { findAll, findSection } from '../services/content-repository.js'

// Content changes rarely: let Vercel's CDN cache it and refresh in the background.
const CACHE_HEADER = 'public, s-maxage=300, stale-while-revalidate=86400'

export function contentRouter() {
  const router = Router()

  router.get('/', (_req, res) => {
    res.set('Cache-Control', CACHE_HEADER)
    ok(res, findAll())
  })

  router.get('/:section', (req, res) => {
    const limit = parseLimit(req.query.limit)
    if (!limit.ok) return fail(res, 400, limit.error)

    const data = findSection(req.params.section, limit.value)
    if (data === undefined) return fail(res, 404, 'Bagian konten tidak ditemukan.')

    res.set('Cache-Control', CACHE_HEADER)
    return ok(res, data)
  })

  return router
}
