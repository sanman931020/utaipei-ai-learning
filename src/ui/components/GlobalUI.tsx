import { useEffect, useRef, useState } from 'react'
import { TOAST_EVENT } from '../../lib/ui-events'

/** Visual toast only; the copy buttons already announce their result to screen readers. */
export function Toast() {
  const [message, setMessage] = useState('')
  const [key, setKey] = useState(0)
  const timer = useRef<number>(undefined)
  useEffect(() => {
    const show = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail)
      setKey(value => value + 1)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setMessage(''), 2400)
    }
    addEventListener(TOAST_EVENT, show)
    return () => { removeEventListener(TOAST_EVENT, show); window.clearTimeout(timer.current) }
  }, [])
  if (!message) return null
  return <div key={key} className="toast" aria-hidden="true"><span className="toast-check" /><span>{message}</span><i className="toast-timer" /></div>
}

/** Back to top, with a ring that shows how far down the page the reader is. */
export function BackToTop() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0)
      setVisible(scrollY > 640)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [])
  const length = 2 * Math.PI * 20
  return <button type="button" className={`back-to-top ${visible ? 'is-visible' : ''}`} tabIndex={visible ? 0 : -1} aria-hidden={!visible} aria-label="回到頁面頂端" onClick={() => scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>
    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" className="btt-track" /><circle cx="24" cy="24" r="20" className="btt-ring" style={{ strokeDasharray: length, strokeDashoffset: length * (1 - progress) }} /></svg>
    <span className="btt-arrow" aria-hidden="true" />
  </button>
}
