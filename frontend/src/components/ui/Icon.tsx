import { Baby, BookOpen, Church, HandHeart, Music, UsersRound, type LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import type { IconName } from '../../types/content'

function FamilyIcon(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth ?? 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={props.className}
    >
      <circle cx="6.5" cy="5" r="2.2" />
      <circle cx="17.5" cy="5" r="2.2" />
      <circle cx="12" cy="11" r="1.8" />
      <path d="M3 20v-6.5A3.5 3.5 0 0 1 6.5 10h0A3.5 3.5 0 0 1 10 13.5" />
      <path d="M21 20v-6.5a3.5 3.5 0 0 0-3.5-3.5h0a3.5 3.5 0 0 0-3.5 3.5" />
      <path d="M9.5 20v-3.2a2.5 2.5 0 0 1 5 0V20" />
    </svg>
  )
}

const ICONS: Record<IconName, ComponentType<LucideProps>> = {
  church: Church,
  family: FamilyIcon,
  youth: UsersRound,
  bible: BookOpen,
  child: Baby,
  music: Music,
  heart: HandHeart,
  people: UsersRound,
}

interface IconProps {
  name: IconName
  size?: number
}

export function Icon({ name, size = 24 }: IconProps) {
  const Component = ICONS[name] ?? Church
  return <Component size={size} strokeWidth={1.75} aria-hidden="true" />
}
