import { ArrowRight } from 'lucide-react'
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
          <p className="eyebrow">Mengenal Jemaat</p>
          <h2 id="tentang-title" className="section-title">
            {site.name}
          </h2>
          <p className="about__full-name">{site.fullName}</p>

          <div className="about__motto" aria-hidden="true">
            <span className="about__motto-quote">“Patembayan Kang Nyawiji”</span>
            <span className="about__motto-desc">Guyub rukun ndherek Gusti · Melayani sejak 1973</span>
          </div>

          <p className="section-lead">{site.about}</p>
          <ul role="list" className="about__points">
            {site.aboutPoints.map((point) => (
              <li key={point}>
                <span className="about__point-bullet" aria-hidden="true">◆</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="about__action-group">
            <a className="btn btn--outline" href="#kontak">
              Kunjungi Kami
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="about__link-sub" href="#jadwal">
              Lihat jadwal ibadah →
            </a>
          </div>
        </div>

        <div className="about__mosaic" data-reveal style={{ '--reveal-index': 1 } as CSSProperties}>
          <figure className="about__photo about__photo--main">
            <img src="/images/about/ruang-ibadah.webp" alt="Pendeta dan Majelis Jemaat GKJW Karangpilang di depan mimbar gereja" width="900" height="700" loading="lazy" />
          </figure>
          <figure className="about__photo">
            <img src="/images/about/pujian.webp" alt="Persekutuan Pemuda dan Mahasiswa (KPPM) GKJW Karangpilang" width="600" height="420" loading="lazy" />
          </figure>
          <figure className="about__photo">
            <img src="/images/about/persekutuan.webp" alt="Kebersamaan warga jemaat GKJW Karangpilang dalam ibadah padang" width="600" height="420" loading="lazy" />
          </figure>
          <div className="about__badge" aria-hidden="true">
            <img src="/logo.webp" alt="" width="56" height="51" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
