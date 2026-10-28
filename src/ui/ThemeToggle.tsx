import { useState } from 'react'
import type { CSSProperties } from 'react'
import { THEME_KEY } from '../lib/storage'

/**
 * Day/night switch carried over from the ART site. Light is the default: the page only turns dark
 * after the visitor chooses it here, and that choice is remembered in localStorage.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const [burst, setBurst] = useState(0)
  const change = (nextDark: boolean) => {
    if (nextDark === dark) return
    setDark(nextDark)
    setBurst(value => value + 1)
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light'
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', nextDark ? '#0a1020' : '#f4f6f9')
    try { localStorage.setItem(THEME_KEY, nextDark ? 'dark' : 'light') } catch { /* Private browsing may block storage. */ }
  }
  return <button type="button" className="theme-toggle" role="switch" aria-checked={dark}
    aria-label={`深色模式${dark ? '已開啟' : '已關閉'}，按下切換`} title={dark ? '切換為日間模式' : '切換為夜間模式'}
    onClick={() => change(!dark)} onKeyDown={event => { if (event.key === 'ArrowLeft') change(false); if (event.key === 'ArrowRight') change(true) }}>
    <span className="theme-sun" aria-hidden="true">☀</span><i aria-hidden="true" /><span className="theme-moon" aria-hidden="true">☾</span>
    {burst > 0 && <b key={burst} className="theme-burst" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <em key={index} style={{ '--spark': index } as CSSProperties} />)}</b>}
  </button>
}
