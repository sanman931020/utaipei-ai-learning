import { useLayoutEffect, useRef } from 'react'

/**
 * Positions a sliding indicator (switch plate or tab underline) under the active item.
 * The container gets `is-measured` once positioned; until then CSS shows a static fallback.
 */
export function useIndicator<T extends HTMLElement>(activeSelector: string, indicatorSelector: string, deps: unknown[]) {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const place = () => {
      const active = root.querySelector<HTMLElement>(activeSelector)
      const indicator = root.querySelector<HTMLElement>(indicatorSelector)
      if (!indicator) return
      if (!active) { indicator.style.setProperty('--w', '0px'); return }
      indicator.style.setProperty('--x', `${active.offsetLeft}px`)
      indicator.style.setProperty('--w', `${active.offsetWidth}px`)
      root.classList.add('is-measured')
    }
    place()
    const observer = new ResizeObserver(place)
    observer.observe(root)
    // Web fonts change label widths after the first paint.
    void document.fonts?.ready.then(place)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}
