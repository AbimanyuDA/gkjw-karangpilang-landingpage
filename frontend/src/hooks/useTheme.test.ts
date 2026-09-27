import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY } from '../lib/theme'
import { useTheme } from './useTheme'

let systemDark = false
let listeners: ((event: { matches: boolean }) => void)[] = []

beforeEach(() => {
  systemDark = false
  listeners = []
  localStorage.clear()
  vi.stubGlobal('matchMedia', () => ({
    matches: systemDark,
    addEventListener: (_: string, cb: (event: { matches: boolean }) => void) => listeners.push(cb),
    removeEventListener: vi.fn(),
  }))
})

afterEach(() => vi.unstubAllGlobals())

describe('useTheme', () => {
  it('follows the system theme by default', () => {
    systemDark = true
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('reacts to live system changes while no choice is stored', () => {
    const { result } = renderHook(() => useTheme())
    act(() => listeners.forEach((cb) => cb({ matches: true })))
    expect(result.current.theme).toBe('dark')
  })

  it('toggles and remembers a manual choice', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('goes back to following the system when toggled to match it', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
  })
})
