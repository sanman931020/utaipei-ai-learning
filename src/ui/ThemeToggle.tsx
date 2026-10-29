import { useState } from 'react'
import type { MouseEvent } from 'react'
import { THEME_KEY } from '../lib/storage'

type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => unknown }

/**
 * Day/night switch. Light is the default: the page only turns dark after the visitor chooses it here,
 * and that choice is remembered. Where the browser supports view transitions the new theme is revealed
 * as a circle growing from the switch; otherwise colours cross-fade briefly.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const apply = (nextDark: boolean) => {
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light'
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', nextDark ? '#0b0d11' : '#f2f4f7')
    try { localStorage.setItem(THEME_KEY, nextDark ? 'dark' : 'light') } catch { /* Private browsing may block storage. */ }
    setDark(nextDark)
  }
  const change = (nextDark: boolean, event?: MouseEvent<HTMLButtonElement>) => {
    if (nextDark === dark) return
    const root = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as ViewTransitionDocument
    if (!reduce && doc.startViewTransition) {
      const box = event?.currentTarget.getBoundingClientRect()
      root.style.setProperty('--vt-x', `${box ? box.left + box.width / 2 : innerWidth - 40}px`)
      root.style.setProperty('--vt-y', `${box ? box.top + box.height / 2 : 36}px`)
      doc.startViewTransition(() => apply(nextDark))
      return
    }
    if (!reduce) { root.classList.add('theme-switching'); window.setTimeout(() => root.classList.remove('theme-switching'), 450) }
    apply(nextDark)
  }
  return <button type="button" className="theme-toggle" role="switch" aria-checked={dark}
    aria-label={`深色模式${dark ? '已開啟' : '已關閉'}，按下切換`} title={dark ? '切換為日間模式' : '切換為夜間模式'}
    onClick={event => change(!dark, event)} onKeyDown={event => { if (event.key === 'ArrowLeft') change(false); if (event.key === 'ArrowRight') change(true) }}>
    <i className="theme-knob" aria-hidden="true" />
    <svg className="theme-icon is-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" /></svg>
    <svg className="theme-icon is-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1Z" /></svg>
  </button>
}
