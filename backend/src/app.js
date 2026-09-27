import cors from 'cors'
import express from 'express'
import { fail, ok } from './lib/response.js'
import { contentRouter } from './routes/content.js'

export function readAllowedOrigins(env = process.env) {
  return (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

function securityHeaders(_req, res, next) {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
  })
  next()
}

/**
 * Read-only content API. With no allowlist every origin may read (it is public
 * church info); set ALLOWED_ORIGINS in production to restrict browsers to the site.
 */
export function createApp({ allowedOrigins = readAllowedOrigins() } = {}) {
  const app = express()
  app.disable('x-powered-by')
  app.use(securityHeaders)
  app.use(
    cors({
      origin: allowedOrigins.length === 0 ? '*' : allowedOrigins,
      methods: ['GET', 'HEAD', 'OPTIONS'],
    }),
  )

  // Only reads are supported; anything else is refused before reaching routes.
  app.use((req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next()
    res.set('Allow', 'GET, HEAD, OPTIONS')
    return fail(res, 405, 'Metode tidak diizinkan.')
  })

  app.get('/api/health', (_req, res) => ok(res, { status: 'ok' }))
  app.use('/api/content', contentRouter())

  app.use((_req, res) => fail(res, 404, 'Endpoint tidak ditemukan.'))

  // eslint-disable-next-line no-unused-vars -- Express needs the 4-arg signature
  app.use((err, _req, res, _next) => {
    console.error('[api] unhandled error', err)
    fail(res, 500, 'Terjadi kesalahan pada server.')
  })

  return app
}
