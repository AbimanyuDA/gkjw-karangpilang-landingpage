import announcements from '../../data/announcements.json' with { type: 'json' }
import events from '../../data/events.json' with { type: 'json' }
import gallery from '../../data/gallery.json' with { type: 'json' }
import ministries from '../../data/ministries.json' with { type: 'json' }
import schedules from '../../data/schedules.json' with { type: 'json' }
import site from '../../data/site.json' with { type: 'json' }

const byDateDesc = (a, b) => b.date.localeCompare(a.date)
const byDateAsc = (a, b) => a.date.localeCompare(b.date)

// Frozen snapshots: handlers can never mutate the source data between requests.
const sections = Object.freeze({
  site: Object.freeze({ ...site }),
  schedules: Object.freeze([...schedules]),
  announcements: Object.freeze([...announcements].sort(byDateDesc)),
  ministries: Object.freeze([...ministries]),
  events: Object.freeze([...events].sort(byDateAsc)),
  gallery: Object.freeze([...gallery]),
})

export const SECTION_NAMES = Object.freeze(Object.keys(sections))

export function findAll() {
  return sections
}

/** Returns the section (optionally truncated) or `undefined` if the name is unknown. */
export function findSection(name, limit) {
  if (!Object.hasOwn(sections, name)) return undefined
  const section = sections[name]
  if (!Array.isArray(section) || limit === undefined) return section
  return section.slice(0, limit)
}
