import { CalendarX2, Clock, MapPin } from 'lucide-react'
import { type CSSProperties, useMemo } from 'react'
import { dayMonth, formatLongDate, upcomingEvents } from '../../lib/format'
import type { ChurchEvent } from '../../types/content'
import { SectionHeading } from '../ui/SectionHeading'
import './events.css'

interface EventsProps {
  events: ChurchEvent[]
}

export function Events({ events }: EventsProps) {
  const upcoming = useMemo(() => upcomingEvents(events), [events])

  return (
    <section id="kegiatan" className="section" aria-labelledby="kegiatan-title">
      <div className="container">
        <SectionHeading
          id="kegiatan-title"
          eyebrow="Agenda Terdekat"
          title="Agenda & Kegiatan Jemaat"
          lead="Agenda ibadah khusus, persekutuan kategorial, dan kegiatan pelayanan warga sepanjang pekan dan bulan ini."
        />

        {upcoming.length === 0 ? (
          <div className="events-empty" data-reveal>
            <CalendarX2 size={28} aria-hidden="true" />
            <p>Belum ada kegiatan terjadwal. Informasi terbaru diumumkan melalui warta jemaat.</p>
          </div>
        ) : (
          <ol role="list" className="event-list">
            {upcoming.map((event, index) => {
              const { day, month } = dayMonth(event.date)
              return (
                <li
                  key={event.id}
                  className="event-card"
                  data-reveal
                  style={{ '--reveal-index': index } as CSSProperties}
                >
                  <time className="event-card__date" dateTime={event.date}>
                    <span className="event-card__day">{day}</span>
                    <span className="event-card__month">{month}</span>
                    <span className="visually-hidden">{formatLongDate(event.date)}</span>
                  </time>
                  <div>
                    <h3 className="event-card__title">{event.title}</h3>
                    <p className="event-card__meta">
                      <Clock size={14} aria-hidden="true" />
                      {event.time}
                    </p>
                    <p className="event-card__meta">
                      <MapPin size={14} aria-hidden="true" />
                      {event.location}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}
