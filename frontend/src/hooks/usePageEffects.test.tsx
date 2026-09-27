import { act, render, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useActiveSection, useScrollReveal, useScrolled } from './usePageEffects'

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void

let callback: Callback = () => {}
const observed: Element[] = []

class FakeObserver {
  constructor(cb: Callback) {
    callback = cb
  }
  observe = (el: Element) => observed.push(el)
  unobserve = vi.fn()
  disconnect = vi.fn()
}

afterEach(() => {
  observed.length = 0
  vi.unstubAllGlobals()
})

function Harness({ items }: { items: string[] }) {
  useScrollReveal(items)
  return (
    <ul>
      {items.map((item) => (
        <li key={item} data-reveal>
          {item}
        </li>
      ))}
    </ul>
  )
}

describe('useScrollReveal', () => {
  it('marks elements visible when they intersect', () => {
    vi.stubGlobal('IntersectionObserver', FakeObserver)
    const { getByText } = render(<Harness items={['a']} />)
    const el = getByText('a')
    callback([{ isIntersecting: true, target: el }])
    expect(el).toHaveClass('is-visible')
  })

  it('observes elements added after new content arrives', () => {
    vi.stubGlobal('IntersectionObserver', FakeObserver)
    const { rerender, getByText } = render(<Harness items={['a']} />)
    rerender(<Harness items={['a', 'b']} />)
    expect(observed).toContain(getByText('b'))
  })
})

describe('useScrollReveal without IntersectionObserver', () => {
  it('reveals everything immediately', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const original = window.IntersectionObserver
    // @ts-expect-error -- simulate an old browser
    delete window.IntersectionObserver
    const { getByText } = render(<Harness items={['x']} />)
    expect(getByText('x')).toHaveClass('is-visible')
    window.IntersectionObserver = original
  })
})

describe('useActiveSection', () => {
  it('defaults to the first id and follows the intersecting section', () => {
    vi.stubGlobal('IntersectionObserver', FakeObserver)
    document.body.innerHTML = '<section id="satu"></section><section id="dua"></section>'
    const ids = ['satu', 'dua']
    const { result } = renderHook(() => useActiveSection(ids))
    expect(result.current).toBe('satu')
    expect(observed).toHaveLength(2)
    act(() => callback([{ isIntersecting: true, target: document.getElementById('dua')! }]))
    expect(result.current).toBe('dua')
  })
})

describe('useScrolled', () => {
  it('flips to true after scrolling past the offset', () => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0)
      return 1
    })
    const { result } = renderHook(() => useScrolled(10))
    expect(result.current).toBe(false)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)
  })
})
