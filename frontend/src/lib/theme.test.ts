import { describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY, readStoredTheme, resolveTheme, writeStoredTheme } from './theme'

const memoryStorage = (initial: Record<string, string> = {}) => {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: vi.fn((key: string, value: string) => void data.set(key, value)),
    removeItem: vi.fn((key: string) => void data.delete(key)),
  }
}

describe('readStoredTheme', () => {
  it('returns a valid stored theme', () => {
    expect(readStoredTheme(memoryStorage({ [THEME_STORAGE_KEY]: 'dark' }))).toBe('dark')
  })

  it('ignores garbage and missing storage', () => {
    expect(readStoredTheme(memoryStorage({ [THEME_STORAGE_KEY]: 'ungu' }))).toBeNull()
    expect(readStoredTheme(undefined)).toBeNull()
  })

  it('survives storage that throws', () => {
    const blocked = { getItem: () => { throw new Error('blocked') } }
    expect(readStoredTheme(blocked)).toBeNull()
  })
})

describe('writeStoredTheme', () => {
  it('stores a choice that differs from the system', () => {
    const storage = memoryStorage()
    expect(writeStoredTheme(storage, 'dark', 'light')).toBe('dark')
    expect(storage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, 'dark')
  })

  it('clears the override when the choice matches the system', () => {
    const storage = memoryStorage({ [THEME_STORAGE_KEY]: 'dark' })
    expect(writeStoredTheme(storage, 'dark', 'dark')).toBeNull()
    expect(storage.removeItem).toHaveBeenCalledWith(THEME_STORAGE_KEY)
  })

  it('does not throw when storage is blocked', () => {
    const blocked = { setItem: () => { throw new Error('x') }, removeItem: () => {} }
    expect(writeStoredTheme(blocked, 'dark', 'light')).toBe('dark')
  })
})

describe('resolveTheme', () => {
  it('prefers the stored choice over the system', () => {
    expect(resolveTheme('light', 'dark')).toBe('light')
    expect(resolveTheme(null, 'dark')).toBe('dark')
  })
})
