import { CalendarDays, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useActiveSection, useScrolled } from '../../hooks/usePageEffects'
import { useTheme } from '../../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'
import './header.css'
import { NAV_ITEMS } from './nav-items'

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

interface HeaderProps {
  name: string
}

export function Header({ name }: HeaderProps) {
  const scrolled = useScrolled()
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const [first, ...rest] = name.split(' ')

  return (
    <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#beranda" aria-label={`${name} — kembali ke atas`}>
          <img src="/logo.webp" alt="" width="46" height="42" />
          <span className="brand__text">
            <span>{first}</span>
            <span>{rest.join(' ')}</span>
          </span>
        </a>

        <nav id="main-nav" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Navigasi utama">
          <ul role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--gold main-nav__cta" href="#jadwal" onClick={() => setOpen(false)}>
            <CalendarDays size={18} aria-hidden="true" />
            Jadwal Ibadah
          </a>
        </nav>

        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        <a className="btn btn--gold btn--sm site-header__cta" href="#jadwal">
          Jadwal Ibadah
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          <span className="visually-hidden">{open ? 'Tutup menu' : 'Buka menu'}</span>
        </button>
      </div>
    </header>
  )
}
