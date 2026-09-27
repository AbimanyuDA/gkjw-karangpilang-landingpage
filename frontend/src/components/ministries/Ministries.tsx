import type { CSSProperties } from 'react'
import type { Ministry } from '../../types/content'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import './ministries.css'

interface MinistriesProps {
  ministries: Ministry[]
}

export function Ministries({ ministries }: MinistriesProps) {
  return (
    <section id="pelayanan" className="section section--paper" aria-labelledby="pelayanan-title">
      <div className="container">
        <SectionHeading
          id="pelayanan-title"
          eyebrow="Komisi & Pelayanan"
          title="Wadah Pelayanan Jemaat"
          lead="Setiap warga jemaat diajak mengambil bagian dalam kehidupan bergereja, mulai dari pembinaan iman anak dan pemuda, pelayanan kasih diakonia, hingga kepedulian warga sekitar."
          action={{ label: 'Tanya tentang pelayanan', href: '#kontak' }}
        />

        <ul role="list" className="ministry-grid">
          {ministries.map((ministry, index) => (
            <li
              key={ministry.id}
              className="ministry-card"
              data-reveal
              style={{ '--reveal-index': index % 3 } as CSSProperties}
            >
              <div className="ministry-card__media">
                <img src={ministry.image} alt="" width="560" height="400" loading="lazy" />
              </div>
              <div className="ministry-card__body">
                <span className="ministry-card__icon">
                  <Icon name={ministry.icon} size={20} />
                </span>
                <h3 className="ministry-card__title">{ministry.name}</h3>
                <p className="ministry-card__text">{ministry.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
