import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'

const app = createApp({ allowedOrigins: ['https://gkjw.example'] })

describe('GET /api/health', () => {
  it('reports ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ success: true, data: { status: 'ok' }, error: null })
  })
})

describe('GET /api/content', () => {
  it('returns every section in one envelope', async () => {
    const res = await request(app).get('/api/content')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Object.keys(res.body.data).sort()).toEqual(
      ['announcements', 'events', 'gallery', 'ministries', 'schedules', 'site'].sort(),
    )
    expect(res.headers['cache-control']).toContain('s-maxage')
  })

  it('sorts announcements newest first and events soonest first', async () => {
    const { body } = await request(app).get('/api/content')
    const wartaDates = body.data.announcements.map((a) => a.date)
    const eventDates = body.data.events.map((e) => e.date)
    expect(wartaDates).toEqual([...wartaDates].sort().reverse())
    expect(eventDates).toEqual([...eventDates].sort())
  })
})

describe('GET /api/content/:section', () => {
  it('returns a single section', async () => {
    const res = await request(app).get('/api/content/schedules')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data[0]).toHaveProperty('title')
  })

  it('applies a valid limit to list sections', async () => {
    const res = await request(app).get('/api/content/announcements?limit=1')
    expect(res.status).toBe(200)
    expect(res.body.data).toHaveLength(1)
  })

  it('rejects an invalid limit', async () => {
    const res = await request(app).get('/api/content/announcements?limit=abc')
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toMatch(/limit/i)
  })

  it('returns 404 for an unknown section', async () => {
    const res = await request(app).get('/api/content/rahasia')
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ success: false, data: null, error: 'Bagian konten tidak ditemukan.' })
  })

  it('does not accept limit on the site object', async () => {
    const res = await request(app).get('/api/content/site?limit=1')
    expect(res.status).toBe(200)
    expect(res.body.data).toHaveProperty('name')
  })
})

describe('HTTP hardening', () => {
  it('returns 404 envelope for unknown routes', async () => {
    const res = await request(app).get('/nope')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('rejects write methods', async () => {
    const res = await request(app).post('/api/content').send({})
    expect(res.status).toBe(405)
  })

  it('sets security headers and hides the framework', async () => {
    const res = await request(app).get('/api/health')
    expect(res.headers['x-content-type-options']).toBe('nosniff')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  it('allows configured origins only', async () => {
    const allowed = await request(app).get('/api/health').set('Origin', 'https://gkjw.example')
    const blocked = await request(app).get('/api/health').set('Origin', 'https://evil.example')
    expect(allowed.headers['access-control-allow-origin']).toBe('https://gkjw.example')
    expect(blocked.headers['access-control-allow-origin']).toBeUndefined()
  })

  it('allows any origin when no allowlist is configured', async () => {
    const open = createApp({ allowedOrigins: [] })
    const res = await request(open).get('/api/health').set('Origin', 'https://mana.saja')
    expect(res.headers['access-control-allow-origin']).toBe('*')
  })
})

describe('readAllowedOrigins', () => {
  it('splits, trims and drops empty entries', async () => {
    const { readAllowedOrigins } = await import('../src/app.js')
    expect(readAllowedOrigins({ ALLOWED_ORIGINS: ' https://a.id, ,https://b.id ' })).toEqual([
      'https://a.id',
      'https://b.id',
    ])
    expect(readAllowedOrigins({})).toEqual([])
  })
})
