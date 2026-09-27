import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin, Navigation } from 'lucide-react'
import { directionsUrl } from '../../lib/links'
import type { Schedule, SiteInfo } from '../../types/content'
import { Icon } from '../ui/Icon'
import './hero.css'

function formatQuickScheduleTimes(times: string[]): string {
  if (!times || times.length === 0) return ''
  return times.map((t) => `${t} WIB`).join(' & ')
}

interface HeroProps {
  site: SiteInfo
  schedules: Schedule[]
}

export function Hero({ site, schedules }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [first, ...rest] = site.name.split(' ')
  const restText = rest.join(' ')
  const quickSchedules = [
    schedules.find((s) => s.id === 'ibadah-minggu'),
    schedules.find((s) => s.id === 'ibadah-keluarga'),
  ].filter((s): s is Schedule => Boolean(s))

  const [inView, setInView] = useState(true)
  const [typedFirst, setTypedFirst] = useState('')
  const [typedRest, setTypedRest] = useState('')
  const [activeLine, setActiveLine] = useState<1 | 2 | null>(1)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const el = heroRef.current
    if (!el || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setInView(entry.isIntersecting)
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) {
      setTypedFirst('')
      setTypedRest('')
      setActiveLine(1)
      setShowCursor(true)
      return
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedFirst(first)
      setTypedRest(restText)
      setActiveLine(null)
      setShowCursor(false)
      return
    }

    let timeoutId: ReturnType<typeof setTimeout>
    let firstIdx = 0
    let restIdx = 0

    setTypedFirst('')
    setTypedRest('')
    setActiveLine(1)
    setShowCursor(true)

    timeoutId = setTimeout(() => {
      const typeFirst = () => {
        if (firstIdx < first.length) {
          firstIdx++
          setTypedFirst(first.slice(0, firstIdx))
          timeoutId = setTimeout(typeFirst, 60)
        } else {
          timeoutId = setTimeout(() => {
            setActiveLine(2)
            typeRest()
          }, 130)
        }
      }

      const typeRest = () => {
        if (restIdx < restText.length) {
          restIdx++
          setTypedRest(restText.slice(0, restIdx))
          timeoutId = setTimeout(typeRest, 50)
        } else {
          timeoutId = setTimeout(() => {
            setShowCursor(false)
            setActiveLine(null)
          }, 2400)
        }
      }

      typeFirst()
    }, 220)

    return () => clearTimeout(timeoutId)
  }, [inView, first, restText])

  return (
    <section
      id="beranda"
      ref={heroRef}
      className={`hero${inView ? ' is-visible' : ''}`}
      aria-labelledby="hero-title"
    >
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
        <h1 id="hero-title" className="hero__title" aria-label={site.name}>
          <span className="hero__title-line">
            <span aria-hidden="true">{typedFirst}</span>
            {showCursor && activeLine === 1 && (
              <span className="hero__cursor" aria-hidden="true" />
            )}
          </span>
          <span className="hero__title-accent hero__title-line">
            <span aria-hidden="true">{typedRest}</span>
            {showCursor && activeLine === 2 && (
              <span className="hero__cursor hero__cursor--accent" aria-hidden="true" />
            )}
          </span>
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
                <div className="quick-info__body">
                  <strong>{schedule.title}</strong>
                  <span className="quick-info__day">{schedule.day}</span>
                  <span className="quick-info__time">
                    {formatQuickScheduleTimes(schedule.times)}
                  </span>
                </div>
              </li>
            ))}
            <li className="quick-info__item quick-info__item--location">
              <span className="quick-info__icon">
                <MapPin size={26} aria-hidden="true" />
              </span>
              <div className="quick-info__body">
                <strong>Lokasi Gereja</strong>
                <span className="quick-info__address">
                  {site.address.street}, {site.address.city}
                </span>
              </div>
              <a
                className="btn btn--ghost-chrome btn--sm quick-info__directions-btn"
                href={directionsUrl(site.mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation size={15} aria-hidden="true" />
                Petunjuk Arah
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
