import { useEffect } from 'react'

export const TOAST_EVENT = 'utaipei-ai:toast'

/** Shows a short confirmation at the bottom of the screen, e.g. after a copy. */
export function showToast(message: string) {
  dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }))
}

/** Buttons, cards and list rows get a soft light that follows the pointer; one listener for the whole page. */
export function usePointerLight() {
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const move = (event: PointerEvent) => {
      const button = event.target instanceof Element ? event.target.closest<HTMLElement>('.btn, .prompt-card, .video-row, .lesson-index a, .direction-list a') : null
      if (!button) return
      const box = button.getBoundingClientRect()
      button.style.setProperty('--mx', `${event.clientX - box.left}px`)
      button.style.setProperty('--my', `${event.clientY - box.top}px`)
    }
    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [])
}
