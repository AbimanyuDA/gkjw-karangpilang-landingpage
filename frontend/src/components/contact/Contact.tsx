import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { directionsUrl, instagramUrl, mapEmbedUrl, whatsappUrl } from '../../lib/links'
import type { SiteInfo } from '../../types/content'
import { InstagramIcon, WhatsappIcon, YoutubeIcon } from '../ui/BrandIcons'
import './contact.css'

interface ContactProps {
  site: SiteInfo
}

interface ContactRow {
  key: string
  icon: ReactNode
  label: string
  value: string
  href?: string | null
}

function buildRows(site: SiteInfo): ContactRow[] {
  const { contact, address } = site
  const whatsapp = whatsappUrl(contact.whatsapp)
  const rows: (ContactRow | null)[] = [
    {
      key: 'alamat',
      icon: <MapPin size={20} aria-hidden="true" />,
      label: site.name,
      value: `${address.street}, ${address.city}, ${address.province}`,
      href: directionsUrl(site.mapsQuery),
    },
    { key: 'jam', icon: <Clock size={20} aria-hidden="true" />, label: 'Kantor Gereja', value: site.officeHours },
    contact.instagram
      ? {
          key: 'instagram',
          icon: <InstagramIcon />,
          label: 'Instagram',
          value: `@${contact.instagram.replace(/^@/, '')}`,
          href: instagramUrl(contact.instagram),
        }
      : null,
    contact.youtube
      ? { key: 'youtube', icon: <YoutubeIcon />, label: 'YouTube', value: contact.youtube, href: contact.youtubeUrl || null }
      : null,
    whatsapp
      ? { key: 'wa', icon: <WhatsappIcon />, label: 'WhatsApp', value: contact.whatsapp, href: whatsapp }
      : { key: 'telp', icon: <Phone size={20} aria-hidden="true" />, label: 'Hubungi Kami', value: contact.phone },
    contact.email
      ? { key: 'email', icon: <Mail size={20} aria-hidden="true" />, label: 'Email', value: contact.email, href: `mailto:${contact.email}` }
      : null,
  ]
  return rows.filter((row): row is ContactRow => row !== null)
}

export function Contact({ site }: ContactProps) {
  const rows = buildRows(site)

  return (
    <section id="kontak" className="section contact" aria-labelledby="kontak-title">
      <div className="container contact__inner">
        <div className="contact__intro" data-reveal>
          <img className="contact__logo" src="/logo.webp" alt={`Lambang ${site.name}`} width="150" height="137" loading="lazy" />
          <div>
            <p className="eyebrow">Pintu Terbuka</p>
            <h2 id="kontak-title" className="section-title">
              Sugeng Rawuh ing GKJW Karangpilang
            </h2>
            <p className="contact__lead">
              Baik Anda yang baru pertama kali beribadah, jemaat yang membutuhkan perkunjungan pastoral, maupun ingin bersilaturahmi, majelis jemaat siap menyambut Anda dengan sukacita.
            </p>
            <a className="btn btn--gold" href={directionsUrl(site.mapsQuery)} target="_blank" rel="noopener noreferrer">
              <Navigation size={18} aria-hidden="true" />
              Petunjuk Arah
            </a>
          </div>
        </div>

        <ul role="list" className="contact__list" data-reveal>
          {rows.map((row) => (
            <li key={row.key}>
              <span className="contact__icon">{row.icon}</span>
              <span>
                <strong>{row.label}</strong>
                {row.href ? (
                  <a href={row.href} target={row.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {row.value}
                  </a>
                ) : (
                  <span>{row.value}</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="contact__map" data-reveal>
          <iframe
            title={`Peta lokasi ${site.name}`}
            src={mapEmbedUrl(site.mapsQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
