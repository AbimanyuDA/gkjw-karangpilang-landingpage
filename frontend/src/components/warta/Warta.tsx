import { CalendarDays, Download, FileClock } from 'lucide-react'
import type { CSSProperties } from 'react'
import { formatLongDate } from '../../lib/format'
import type { Announcement } from '../../types/content'
import './warta.css'

interface WartaProps {
  announcements: Announcement[]
}

function WartaAction({ item }: { item: Announcement }) {
  if (!item.pdfUrl) {
    return (
      <span className="warta-card__pending">
        <FileClock size={15} aria-hidden="true" />
        PDF segera tersedia
      </span>
    )
  }
  return (
    <a className="btn btn--outline btn--sm" href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
      <Download size={15} aria-hidden="true" />
      Unduh PDF
      <span className="visually-hidden"> warta {formatLongDate(item.date)}</span>
    </a>
  )
}

export function Warta({ announcements }: WartaProps) {
  const items = announcements.slice(0, 3)

  return (
    <section id="warta" className="section warta" aria-labelledby="warta-title">
      <img className="warta__bg" src="/images/hero/warta-bg.webp" alt="" width="1600" height="900" loading="lazy" />
      <div className="container warta__inner">
        <div className="warta__intro" data-reveal>
          <p className="eyebrow">Warta Jemaat</p>
          <h2 id="warta-title" className="section-title">
            Warta & Kabar Pelayanan
          </h2>
          <p className="warta__lead">
            Susunan pelayan kebaktian mingguan, laporan persembahan jemaat, serta pokok doa bersama warga yang terbit setiap hari Minggu dalam format cetak dan digital (PDF).
          </p>
        </div>

        {items.length === 0 ? (
          <p className="warta__empty">Warta jemaat belum tersedia. Silakan cek kembali hari Minggu.</p>
        ) : (
          <ul role="list" className="warta__list">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={`warta-card${index === 0 ? ' warta-card--latest' : ''}`}
                data-reveal
                style={{ '--reveal-index': index + 1 } as CSSProperties}
              >
                <div className="warta-card__media">
                  <img src={item.image} alt="" width="640" height="400" loading="lazy" />
                  {index === 0 ? <span className="warta-card__tag">Terbaru</span> : null}
                </div>
                <div className="warta-card__body">
                  <p className="warta-card__date">
                    <CalendarDays size={14} aria-hidden="true" />
                    <time dateTime={item.date}>{formatLongDate(item.date)}</time>
                  </p>
                  <h3 className="warta-card__title">{item.title}</h3>
                  <p className="warta-card__summary">{item.summary}</p>
                  <WartaAction item={item} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
