import { ArrowRight, Check } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { SiteInfo } from '../../types/content'
import './about.css'

interface AboutProps {
  site: SiteInfo
}

export function About({ site }: AboutProps) {
  return (
    <section id="tentang" className="section section--paper" aria-labelledby="tentang-title">
      <div className="container about">
        <div className="about__text" data-reveal>
          <p className="eyebrow">Selamat Datang</p>
          <h2 id="tentang-title" className="section-title">
            {site.name}
          </h2>
          <p className="about__full-name">{site.fullName}</p>
          <p className="section-lead">{site.about}</p>
          <ul role="list" className="about__points">
            {site.aboutPoints.map((point) => (
              <li key={point}>
                <Check size={18} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <a className="btn btn--outline" href="#kontak">
            Kunjungi Kami
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="about__mosaic" data-reveal style={{ '--reveal-index': 1 } as CSSProperties}>
          <figure className="about__photo about__photo--main">
            <img src="/images/about/ruang-ibadah.jpg" alt="Suasana ruang ibadah" width="900" height="700" loading="lazy" />
          </figure>
          <figure className="about__photo">
            <img src="/images/about/pujian.jpg" alt="Pelayanan pujian jemaat" width="600" height="420" loading="lazy" />
          </figure>
          <figure className="about__photo">
            <img src="/images/about/persekutuan.jpg" alt="Persekutuan jemaat" width="600" height="420" loading="lazy" />
          </figure>
          <div className="about__badge" aria-hidden="true">
            <img src="/logo.png" alt="" width="56" height="51" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
