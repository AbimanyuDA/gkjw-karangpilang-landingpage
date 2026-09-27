import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../../lib/theme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  const label = isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'

  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label={label} title={label}>
      <span className="theme-toggle__icon" data-active={!isDark}>
        <Sun size={20} aria-hidden="true" />
      </span>
      <span className="theme-toggle__icon" data-active={isDark}>
        <Moon size={19} aria-hidden="true" />
      </span>
    </button>
  )
}
