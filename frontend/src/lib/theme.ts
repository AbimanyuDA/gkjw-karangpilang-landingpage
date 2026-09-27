export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'gkjw-theme'
export const DARK_QUERY = '(prefers-color-scheme: dark)'

/** The visitor's explicit choice, or null when they are following the system setting. */
export function readStoredTheme(storage: Pick<Storage, 'getItem'> | undefined): Theme | null {
  try {
    const value = storage?.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

/**
 * Persists a manual choice. Picking the same theme as the system clears the override,
 * so the site goes back to following the OS automatically.
 */
export function writeStoredTheme(
  storage: Pick<Storage, 'setItem' | 'removeItem'> | undefined,
  theme: Theme,
  systemTheme: Theme,
): Theme | null {
  const next = theme === systemTheme ? null : theme
  try {
    if (next === null) storage?.removeItem(THEME_STORAGE_KEY)
    else storage?.setItem(THEME_STORAGE_KEY, next)
  } catch {
    // Storage can be blocked (private mode); the toggle still works for this visit.
  }
  return next
}

export function resolveTheme(stored: Theme | null, systemTheme: Theme): Theme {
  return stored ?? systemTheme
}
