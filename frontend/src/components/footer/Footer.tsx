import { Navigation } from 'lucide-react'
import { directionsUrl, instagramUrl } from '../../lib/links'
import type { SiteInfo } from '../../types/content'
import { NAV_ITEMS } from '../header/nav-items'
import { InstagramIcon, YoutubeIcon } from '../ui/BrandIcons'
import './footer.css'

interface FooterProps {
  site: SiteInfo
}

export function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear()
  const { contact, address } = site

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <nav aria-label="Navigasi footer">
          <h2 className="site-footer__heading">Navigasi</h2>
          <ul role="list" className="site-footer__links site-footer__links--cols">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">Ikuti Kami</h2>
          <ul role="list" className="site-footer__links">
            {contact.instagram ? (
              <li>
                <a href={instagramUrl(contact.instagram)} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={16} /> Instagram
                </a>
              </li>
            ) : null}
            {contact.youtubeUrl ? (
              <li>
                <a href={contact.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <YoutubeIcon size={16} /> YouTube
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Lokasi</h2>
          <address className="site-footer__address">
            {address.street}, {address.city}
            <br />
            {address.province}
          </address>
          <a
            className="btn btn--ghost-light btn--sm"
            href={directionsUrl(site.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={14} aria-hidden="true" />
            Petunjuk Arah
          </a>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {year} {site.name} · {site.fullName}
        </p>
        <p>Melayani dalam kasih dan kerukunan di Karangpilang, Surabaya.</p>
      </div>
    </footer>
  )
}
