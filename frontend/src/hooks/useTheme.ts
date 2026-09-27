import { useCallback, useEffect, useState } from 'react'
import { DARK_QUERY, type Theme, readStoredTheme, resolveTheme, writeStoredTheme } from '../lib/theme'

function safeLocalStorage(): Storage | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

const systemTheme = (): Theme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light')

/**
 * Follows the OS light/dark setting until the visitor picks one with the toggle.
 * Keeps `<html data-theme>` in sync; /theme-init.js sets the same attribute before paint.
 */
export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [system, setSystem] = useState<Theme>(systemTheme)
  const [stored, setStored] = useState<Theme | null>(() => readStoredTheme(safeLocalStorage()))
  const theme = resolveTheme(stored, system)

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => setSystem(event.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setStored(writeStoredTheme(safeLocalStorage(), next, system))
  }, [theme, system])

  return { theme, toggleTheme }
}
