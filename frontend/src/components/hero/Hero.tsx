import { ArrowRight, MapPin, Navigation } from 'lucide-react'
import { formatTimes } from '../../lib/format'
import { directionsUrl } from '../../lib/links'
import type { Schedule, SiteInfo } from '../../types/content'
import { Icon } from '../ui/Icon'
import './hero.css'

interface HeroProps {
  site: SiteInfo
  schedules: Schedule[]
}

export function Hero({ site, schedules }: HeroProps) {
  const [first, ...rest] = site.name.split(' ')
  const quickSchedules = schedules.filter((s) => s.times.length > 0).slice(0, 3)

  return (
    <section id="beranda" className="hero" aria-labelledby="hero-title">
      <img
        className="hero__image"
        src="/images/hero/gereja.webp"
        srcSet="/images/hero/gereja-828.webp 828w, /images/hero/gereja.webp 1024w"
        sizes="100vw"
        alt="Gedung gereja GKJW Karangpilang"
        width="1024"
        height="576"
        fetchPriority="high"
        loading="eager"
      />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__content">
        <p className="eyebrow hero__greeting">{site.greeting}</p>
        <h1 id="hero-title" className="hero__title">
          <span>{first}</span>
          <span className="hero__title-accent">{rest.join(' ')}</span>
        </h1>
        <p className="hero__tagline">{site.tagline}</p>
        <div className="hero__actions">
          <a className="btn btn--gold" href="#jadwal">
            Lihat Jadwal Ibadah
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn btn--ghost-chrome" href="#tentang">
            Mengenal Jemaat
          </a>
        </div>
      </div>

      <div className="quick-info">
        <div className="container quick-info__inner">
          <ul role="list" className="quick-info__list">
            {quickSchedules.map((schedule) => (
              <li key={schedule.id} className="quick-info__item">
                <span className="quick-info__icon">
                  <Icon name={schedule.icon} size={26} />
                </span>
                <span>
                  <strong>{schedule.title}</strong>
                  <span>
                    {schedule.day} · {formatTimes(schedule.times)}
                  </span>
                </span>
              </li>
            ))}
            <li className="quick-info__item">
              <span className="quick-info__icon">
                <MapPin size={26} aria-hidden="true" />
              </span>
              <span>
                <strong>Lokasi Gereja</strong>
                <span>
                  {site.address.street}, {site.address.city}
                </span>
              </span>
            </li>
          </ul>
          <a
            className="btn btn--ghost-chrome btn--sm quick-info__cta"
            href={directionsUrl(site.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={16} aria-hidden="true" />
            Petunjuk Arah
          </a>
        </div>
      </div>
    </section>
  )
}
