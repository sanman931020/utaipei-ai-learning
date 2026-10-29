import { useEffect, useRef, useState } from 'react'
import { copyText } from '../../lib/clipboard'
import { showToast } from '../../lib/ui-events'

type State = 'idle' | 'copied' | 'failed'

/**
 * Copies `text` and says whether it worked. On failure `onFailed` lets the caller show the text
 * selected for manual copying (Ctrl+C / long-press).
 */
export function CopyButton({ text, label = '複製', copiedLabel = '已複製', className = '', onFailed, disabled = false, toast }: { text: string; label?: string; copiedLabel?: string; className?: string; onFailed?: () => void; disabled?: boolean; toast?: string }) {
  const [state, setState] = useState<State>('idle')
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    const ok = await copyText(text)
    setState(ok ? 'copied' : 'failed')
    if (ok) showToast(toast ?? '已複製到剪貼簿，可貼到 ChatGPT 或 Gemini 使用')
    if (!ok) onFailed?.()
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), ok ? 2000 : 4000)
  }
  return <button type="button" className={`btn copy-button is-${state} ${className}`} onClick={() => void copy()} disabled={disabled}>
    <span className="copy-icon" aria-hidden="true" />
    <span>{state === 'copied' ? copiedLabel : state === 'failed' ? '複製失敗，請手動選取' : label}</span>
    <span className="sr-only" role="status">{state === 'copied' ? '已複製到剪貼簿' : state === 'failed' ? '無法自動複製，文字已選取，請按 Ctrl+C 或長按複製' : ''}</span>
  </button>
}
