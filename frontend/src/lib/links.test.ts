import { describe, expect, it } from 'vitest'
import { directionsUrl, instagramUrl, mapEmbedUrl, whatsappUrl } from './links'

describe('maps links', () => {
  it('encodes the destination query', () => {
    expect(directionsUrl('GKJW Karangpilang')).toBe(
      'https://www.google.com/maps/dir/?api=1&destination=GKJW%20Karangpilang',
    )
    expect(mapEmbedUrl('a&b')).toBe('https://www.google.com/maps?q=a%26b&output=embed')
  })
})

describe('instagramUrl', () => {
  it('strips a leading @', () => {
    expect(instagramUrl('@gkjwkarangpilang')).toBe('https://www.instagram.com/gkjwkarangpilang/')
  })
})

describe('whatsappUrl', () => {
  it('converts a local number to international format', () => {
    expect(whatsappUrl('0812-3456-7890')).toBe('https://wa.me/6281234567890')
  })

  it('keeps an international number', () => {
    expect(whatsappUrl('+62 812 3456 7890')).toBe('https://wa.me/6281234567890')
  })

  it('returns null for empty or placeholder numbers', () => {
    expect(whatsappUrl('')).toBeNull()
    expect(whatsappUrl('+62 8xx-xxxx-xxxx')).toBeNull()
  })
})
