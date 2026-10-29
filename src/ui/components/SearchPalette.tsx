import { useEffect, useMemo, useRef, useState } from 'react'
import { lessonById, lessons, trackById } from '../../content/lessons'
import { categoryById, prompts } from '../../content/prompts'
import { seriesById, videos } from '../../content/videos'
import { expandTerm, scorePrompt } from '../../lib/promptSearch'
import { href, navigate } from '../../lib/router'
import { useStoredList } from '../../lib/storage'

type Result = { id: string; kind: 'lesson' | 'video' | 'prompt' | 'link'; code: string; title: string; meta: string; link: string }

const normalize = (text: string) => text.toLowerCase().normalize('NFKC')

/** Every term (or one of its synonyms) must appear in the text. */
const matches = (text: string, query: string) => {
  const haystack = normalize(text)
  return normalize(query).split(/\s+/).filter(Boolean).every(term => expandTerm(term).some(variant => haystack.includes(variant)))
}

const shortcuts: Result[] = [
  { id: 's-learn', kind: 'link', code: 'GO', title: '從 ChatGPT 網頁版開始學', meta: '學習知識', link: href('learn', { track: 'chatgpt-web' }) },
  { id: 's-gemini', kind: 'link', code: 'GO', title: 'Gemini：文件、Canvas 與 Deep Research', meta: '學習知識', link: href('learn/gemini-b02') },
  { id: 's-plan', kind: 'link', code: 'TC', title: '教案產生器：專業完整教案設計', meta: 'Prompt 資源庫', link: href('prompts/teach-core') },
  { id: 's-research', kind: 'link', code: 'RS', title: 'AI Agent 學術研究應用', meta: '學習知識', link: href('learn', { track: 'agent-research' }) },
  { id: 's-ethics', kind: 'link', code: 'ET', title: '學術倫理：在作業中負責使用 AI', meta: '學習知識', link: href('learn/literacy-c02') },
]

/** Site-wide quick search (Ctrl/⌘+K): lessons, videos and prompts in one list, fully keyboard operable. */
export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [recent] = useStoredList('recent-lessons')

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (open && !node.open) { node.showModal(); document.documentElement.classList.add('has-dialog'); setQuery(''); setActive(0); requestAnimationFrame(() => input.current?.focus()) }
    if (!open && node.open) { node.close(); document.documentElement.classList.remove('has-dialog') }
  }, [open])

  const { groups, flat, promptTotal } = useMemo(() => {
    const q = query.trim()
    if (!q) {
      const recentItems: Result[] = recent.map(id => lessonById[id]).filter(Boolean).slice(0, 3).map(lesson => ({ id: `r-${lesson.id}`, kind: 'lesson', code: lesson.code, title: lesson.title, meta: `最近閱讀・${trackById[lesson.track].label}`, link: href(`learn/${lesson.id}`) }))
      const groups = [{ label: '最近閱讀', items: recentItems }, { label: '常用入口', items: shortcuts }].filter(group => group.items.length)
      return { groups, flat: groups.flatMap(group => group.items), promptTotal: 0 }
    }
    // Lessons whose title (or code) matches come before those that only mention the term in the summary.
    const lessonHits: Result[] = lessons.filter(lesson => matches(`${lesson.code} ${lesson.title} ${lesson.subtitle ?? ''} ${lesson.summary} ${trackById[lesson.track].label}`, q))
      .sort((a, b) => Number(matches(`${b.code} ${b.title}`, q)) - Number(matches(`${a.code} ${a.title}`, q))).slice(0, 5)
      .map(lesson => ({ id: lesson.id, kind: 'lesson', code: lesson.code, title: lesson.title, meta: trackById[lesson.track].label, link: href(`learn/${lesson.id}`) }))
    const videoHits: Result[] = videos.filter(video => matches(`${video.code} ${video.title} ${video.description} ${seriesById[video.seriesId].label}`, q))
      .sort((a, b) => Number(matches(`${b.code} ${b.title}`, q)) - Number(matches(`${a.code} ${a.title}`, q))).slice(0, 4)
      .map(video => ({ id: video.id, kind: 'video', code: video.code, title: video.title, meta: seriesById[video.seriesId].label, link: href(`videos/${video.id}`) }))
    const promptScored = prompts.map(prompt => ({ prompt, score: scorePrompt(prompt, q, categoryById[prompt.category].label) })).filter(entry => entry.score > 0).sort((a, b) => b.score - a.score)
    const promptHits: Result[] = promptScored.slice(0, 6).map(({ prompt }) => ({ id: prompt.id, kind: 'prompt', code: categoryById[prompt.category].code, title: prompt.title, meta: `${categoryById[prompt.category].short} / ${prompt.subcategory}`, link: href(`prompts/${prompt.id}`) }))
    const groups = [{ label: '學習知識', items: lessonHits }, { label: '學習影片', items: videoHits }, { label: 'Prompt', items: promptHits }].filter(group => group.items.length)
    return { groups, flat: groups.flatMap(group => group.items), promptTotal: promptScored.length }
  }, [query, recent])

  useEffect(() => { setActive(0) }, [query])
  useEffect(() => { list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' }) }, [active])

  const go = (result?: Result) => { if (!result) return; onClose(); location.hash = result.link }
  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive(value => Math.min(flat.length - 1, value + 1)) }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive(value => Math.max(0, value - 1)) }
    if (event.key === 'Enter') { event.preventDefault(); go(flat[active]) }
  }

  let index = -1
  return <dialog ref={dialog} className="palette" aria-label="全站快速搜尋" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === dialog.current) onClose() }}>
    <div className="palette-field">
      <span className="search-icon" aria-hidden="true" />
      <input ref={input} type="search" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={onKey} placeholder="搜尋單元、影片或 Prompt，例如：提問、Canvas、文獻、教案" aria-label="搜尋全站內容" aria-controls="palette-results" aria-activedescendant={flat[active] ? `palette-${flat[active].id}` : undefined} role="combobox" aria-expanded="true" autoComplete="off" />
      <button type="button" className="palette-close" onClick={onClose} aria-label="關閉搜尋（Esc）" title="關閉（Esc）"><span aria-hidden="true" /></button>
    </div>
    <ul ref={list} id="palette-results" className="palette-results" role="listbox">
      {groups.map(group => <li key={group.label} role="presentation">
        <span className="palette-group mono">{group.label}</span>
        <ul role="presentation">{group.items.map(item => { index += 1; const current = index; return <li key={item.id} id={`palette-${item.id}`} role="option" aria-selected={active === current} data-index={current} className={`palette-item is-${item.kind}`} onMouseMove={() => setActive(current)} onClick={() => go(item)}>
          <span className="palette-code mono">{item.code}</span>
          <span className="palette-text"><b>{item.title}</b><small>{item.meta}</small></span>
          <span className="palette-enter mono" aria-hidden="true">↵</span>
        </li> })}</ul>
      </li>)}
      {query.trim() && !flat.length && <li className="palette-empty" role="presentation"><b>找不到「{query.trim()}」</b><span>試試較短的關鍵字、同義詞或英文，例如「簡報」「photo」「研究」。</span></li>}
    </ul>
    <footer className="palette-foot mono">
      <span><kbd>↑</kbd><kbd>↓</kbd> 選擇</span><span><kbd>↵</kbd> 開啟</span>
      {promptTotal > 6 && <button type="button" className="text-link" onClick={() => { onClose(); navigate('prompts', { q: query.trim() }) }}>在 Prompt 資源庫查看全部 {promptTotal} 則<span className="arrow" aria-hidden="true" /></button>}
    </footer>
  </dialog>
}
