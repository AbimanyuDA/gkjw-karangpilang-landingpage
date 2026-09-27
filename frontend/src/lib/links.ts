const MAPS_BASE = 'https://www.google.com/maps'

export function directionsUrl(query: string): string {
  return `${MAPS_BASE}/dir/?api=1&destination=${encodeURIComponent(query)}`
}

export function mapEmbedUrl(query: string): string {
  return `${MAPS_BASE}?q=${encodeURIComponent(query)}&output=embed`
}

export function instagramUrl(handle: string): string {
  return `https://www.instagram.com/${encodeURIComponent(handle.replace(/^@/, ''))}/`
}

/** Turns "0812-3456-789" or "+62 812..." into a wa.me link; null when no usable number. */
export function whatsappUrl(phone: string): string | null {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 9) return null
  const international = digits.startsWith('0') ? `62${digits.slice(1)}` : digits
  return `https://wa.me/${international}`
}
