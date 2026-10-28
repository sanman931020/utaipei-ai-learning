import { useCallback, useEffect, useState } from 'react'

/**
 * Learning traces stay in this browser only (localStorage). Nothing is sent anywhere,
 * and every read and write tolerates storage being blocked or full.
 */
const PREFIX = 'utaipei-ai:'
const EVENT = 'utaipei-ai-storage'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) as T : fallback
  } catch { return fallback }
}

function write<T>(key: string, value: T) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)) } catch { /* Private mode or full storage: keep working without saving. */ }
  dispatchEvent(new CustomEvent(EVENT, { detail: key }))
}

/** A list kept in localStorage and shared live between components. */
export function useStoredList(key: 'recent-lessons' | 'recent-videos' | 'favorite-prompts') {
  const [items, setItems] = useState<string[]>(() => read<string[]>(key, []))
  useEffect(() => {
    const sync = (event: Event) => { if (!(event instanceof CustomEvent) || event.detail === key) setItems(read<string[]>(key, [])) }
    addEventListener(EVENT, sync)
    return () => removeEventListener(EVENT, sync)
  }, [key])
  const set = useCallback((next: string[]) => write(key, next), [key])
  return [items, set] as const
}

/** Moves an id to the front of a recent list, keeping at most `limit` entries. */
export function rememberRecent(key: 'recent-lessons' | 'recent-videos', id: string, limit = 6) {
  const current = read<string[]>(key, [])
  write(key, [id, ...current.filter(item => item !== id)].slice(0, limit))
}

export function clearLearningTraces() {
  for (const key of ['recent-lessons', 'recent-videos', 'favorite-prompts']) write(key, [])
}

export const THEME_KEY = 'utaipei-ai-theme'
