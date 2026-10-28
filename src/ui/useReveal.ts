import { useEffect, useRef } from 'react'

/** Fades `.reveal` children in as they scroll into view (the ART site's section entrance). */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll('.reveal:not(.is-in)')
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { targets.forEach(node => node.classList.add('is-in')); return }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-in'); observer.unobserve(entry.target) } }), { threshold: .06, rootMargin: '0px 0px -40px 0px' })
    targets.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}
