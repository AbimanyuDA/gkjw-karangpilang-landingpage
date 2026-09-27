import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  lead?: ReactNode
  action?: { label: string; href: string }
}

export function SectionHeading({ id, eyebrow, title, lead, action }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="section-title">
          {title}
        </h2>
        {lead ? <p className="section-lead">{lead}</p> : null}
      </div>
      {action ? (
        <a className="text-link" href={action.href}>
          {action.label}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      ) : null}
    </div>
  )
}
