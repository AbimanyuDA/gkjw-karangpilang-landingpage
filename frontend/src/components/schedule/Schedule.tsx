import { Clock, HeartHandshake } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Schedule as ScheduleItem } from '../../types/content'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import './schedule.css'

interface ScheduleProps {
  schedules: ScheduleItem[]
}

export function Schedule({ schedules }: ScheduleProps) {
  return (
    <section id="jadwal" className="section" aria-labelledby="jadwal-title">
      <div className="container">
        <SectionHeading
          id="jadwal-title"
          eyebrow="Jadwal Ibadah"
          title="Mari Beribadah Bersama"
          lead="Semua ibadah terbuka untuk jemaat dan tamu. Datang 15 menit lebih awal agar dapat bersekutu dengan tenang."
        />

        <ul role="list" className="schedule-grid">
          {schedules.map((item, index) => (
            <li
              key={item.id}
              className={`schedule-card${index === 0 ? ' schedule-card--primary' : ''}`}
              data-reveal
              style={{ '--reveal-index': index } as CSSProperties}
            >
              <div className="schedule-card__head">
                <span className="medallion">
                  <Icon name={item.icon} size={26} />
                </span>
                <span className="schedule-card__day">{item.day}</span>
              </div>
              <h3 className="schedule-card__title">{item.title}</h3>
              {item.times.length > 0 ? (
                <ul role="list" className="schedule-card__times" aria-label={`Waktu ${item.title}`}>
                  {item.times.map((time) => (
                    <li key={time}>
                      <Clock size={14} aria-hidden="true" />
                      {time} <small>WIB</small>
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="schedule-card__note">{item.note}</p>
            </li>
          ))}
        </ul>

        <div className="schedule-visitor" data-reveal style={{ '--reveal-index': 4 } as CSSProperties}>
          <div className="schedule-visitor__icon" aria-hidden="true">
            <HeartHandshake size={28} />
          </div>
          <div className="schedule-visitor__content">
            <h4 className="schedule-visitor__title">Baru Pertama Kali Hadir di GKJW Karangpilang?</h4>
            <p className="schedule-visitor__text">
              Kami menyambut Anda dengan sukacita dan kehangatan. Anda dipersilakan mengenakan busana yang rapi, sopan, dan nyaman.
              Bila Anda membutuhkan panduan tata kebaktian, Alkitab, atau kidung pujian, majelis penyambut jemaat di pintu utama
              dengan senang hati siap mendampingi Anda dan keluarga.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
