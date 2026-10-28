import { useEffect, useRef, useState } from 'react'

/**
 * Hash routes (#/learn/chatgpt-a02?from=…) so the built site works from any static folder
 * and the browser back button returns to the previous page and scroll position.
 */
export interface Route {
  path: string[]
  query: URLSearchParams
  /** 'pop' when reached with back/forward, so pages can restore where the reader was. */
  via: 'push' | 'pop'
  key: string
}

const parse = (via: Route['via']): Route => {
  const raw = location.hash.replace(/^#\/?/, '')
  const [pathPart, queryPart = ''] = raw.split('?')
  return { path: pathPart.split('/').filter(Boolean).map(decodeURIComponent), query: new URLSearchParams(queryPart), via, key: raw }
}

let pendingVia: Route['via'] = 'pop'

export function href(path: string, query?: Record<string, string | undefined>) {
  const params = new URLSearchParams()
  Object.entries(query ?? {}).forEach(([key, value]) => { if (value) params.set(key, value) })
  const search = params.toString()
  return `#/${path.replace(/^\/+/, '')}${search ? `?${search}` : ''}`
}

export function navigate(path: string, query?: Record<string, string | undefined>, options: { replace?: boolean; preserveScroll?: boolean } = {}) {
  const target = href(path, query)
  if (target === location.hash) return
  saveScroll()
  pendingVia = 'push'
  if (options.replace) { history.replaceState(null, '', target); dispatchEvent(new HashChangeEvent('hashchange')) }
  else if (options.preserveScroll) { history.pushState(null, '', target); dispatchEvent(new HashChangeEvent('hashchange')) }
  else location.hash = target
}

const scrollKey = (key: string) => `utaipei-ai:scroll:${key}`
function saveScroll() {
  try { sessionStorage.setItem(scrollKey(location.hash.replace(/^#\/?/, '')), String(Math.round(scrollY))) } catch { /* Storage may be unavailable. */ }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse('push'))
  useEffect(() => {
    const update = () => { const via = pendingVia; pendingVia = 'pop'; setRoute(parse(via)) }
    // Plain <a href="#/…"> clicks are new pages; only back/forward should restore scroll.
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#/"]') : null
      if (link && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey) { saveScroll(); pendingVia = 'push' }
    }
    addEventListener('hashchange', update)
    // Bubble phase, so a link whose own handler called preventDefault (e.g. a history.back() link) is skipped.
    addEventListener('click', click)
    return () => { removeEventListener('hashchange', update); removeEventListener('click', click) }
  }, [])
  return route
}

/**
 * Back/forward restores the saved scroll position; a new page starts at the top.
 * With `keepOnQueryChange`, a change that only touches the query (a tab or filter) keeps the position.
 */
export function useScrollRestore(route: Route, ready = true, options: { keepOnQueryChange?: boolean } = {}) {
  const lastPath = useRef<string>(undefined)
  const path = route.path.join('/')
  useEffect(() => {
    if (!ready) return
    const samePath = lastPath.current === path
    lastPath.current = path
    if (options.keepOnQueryChange && samePath && route.via === 'push') return
    let target = 0
    if (route.via === 'pop') { try { target = Number(sessionStorage.getItem(scrollKey(route.key)) ?? 0) } catch { target = 0 } }
    requestAnimationFrame(() => scrollTo({ top: target, behavior: 'auto' }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.key, route.via, ready])
}
