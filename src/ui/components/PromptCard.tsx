import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { PromptItem } from '../../content/types'
import { categoryById } from '../../content/prompts'
import { lessonsForPrompt } from '../../content/relations'
import { fillPlaceholders, placeholdersOf } from '../../lib/promptSearch'
import { href } from '../../lib/router'
import { useStoredList } from '../../lib/storage'
import { CopyButton } from './CopyButton'
import { PromptForm } from './PromptForm'

export function FavoriteButton({ id, title }: { id: string; title: string }) {
  const [favorites, setFavorites] = useStoredList('favorite-prompts')
  const on = favorites.includes(id)
  return <button type="button" className={`favorite-button ${on ? 'is-on' : ''}`} aria-pressed={on} aria-label={on ? `取消收藏「${title}」` : `收藏「${title}」`} title={on ? '取消收藏' : '收藏（只存在這個瀏覽器）'}
    onClick={() => setFavorites(on ? favorites.filter(item => item !== id) : [id, ...favorites])}><span aria-hidden="true">{on ? '★' : '☆'}</span></button>
}

const preview = (content: string, length = 110) => {
  const flat = content.replace(/\s*\n+\s*/g, ' ')
  return flat.length > length ? `${flat.slice(0, length)}…` : flat
}

/** Library card: index, category code, what it helps with, tags and the two actions. */
export function PromptCard({ prompt, onOpen, index, compact = false }: { prompt: PromptItem; onOpen: (prompt: PromptItem) => void; index?: number; compact?: boolean }) {
  const category = categoryById[prompt.category]
  const fields = placeholdersOf(prompt.content).length
  return <article className={`prompt-card ${compact ? 'is-compact' : ''}`}>
    <header>
      {index !== undefined && <span className="prompt-index mono">{String(index).padStart(3, '0')}</span>}
      <span className="cat-code" title={category.label}>{category.code}</span>
      <span className="prompt-sub">{category.short}<i aria-hidden="true">/</i>{prompt.subcategory}</span>
      <FavoriteButton id={prompt.id} title={prompt.title} />
    </header>
    <h3><button type="button" className="prompt-title-button" onClick={() => onOpen(prompt)}>{prompt.title}</button></h3>
    <p className="prompt-desc">{prompt.description}</p>
    {!compact && <p className="prompt-preview" aria-label="提示詞預覽">{preview(prompt.content)}</p>}
    <ul className="prompt-tags" aria-label="關鍵字">{prompt.tags.slice(0, compact ? 2 : 4).map(tag => <li key={tag}>#{tag}</li>)}</ul>
    <footer>
      <span className="prompt-specs">
        {prompt.supportedTools.map(tool => <span key={tool} className="tag is-tool">{tool}</span>)}
        <span className="tag is-level">{prompt.difficulty}</span>
        {fields > 0 && <span className="tag is-fields mono" title="可填寫的欄位數">[{fields}]</span>}
      </span>
      <span className="prompt-actions">
        <button type="button" className="btn btn-small" onClick={() => onOpen(prompt)}>完整內容</button>
        <CopyButton text={prompt.content} label="複製" className="btn-small btn-primary" onFailed={() => onOpen(prompt)} />
      </span>
    </footer>
  </article>
}

/** Full prompt: fields for every [placeholder] next to a live preview, and separate copy actions for the template and the filled version. */
export function PromptDialog({ prompt, onClose }: { prompt: PromptItem; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const manualRef = useRef<HTMLTextAreaElement>(null)
  const [manualCopy, setManualCopy] = useState<{ text: string }>()
  const titleId = useId()
  const fields = useMemo(() => placeholdersOf(prompt.content), [prompt.content])
  const [values, setValues] = useState<Record<string, string>>({})
  const filled = fillPlaceholders(prompt.content, values)
  const filledCount = fields.filter(field => values[field]?.trim()).length
  const category = categoryById[prompt.category]
  const lessons = lessonsForPrompt(prompt)

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (!node.open) node.showModal()
    document.documentElement.classList.add('has-dialog')
    return () => { document.documentElement.classList.remove('has-dialog'); if (node.open) node.close() }
  }, [])
  useEffect(() => { setValues({}) }, [prompt.id])

  // Keep fallback text separate so template failure never selects the filled version.
  const selectText = (text: string) => setManualCopy({ text })
  useEffect(() => {
    if (!manualCopy) return
    manualRef.current?.focus()
    manualRef.current?.select()
  }, [manualCopy])

  // Unfilled placeholders are shown as marked fields in the preview so they cannot be mistaken for content.
  const previewNodes = filled.split(/(\[[^[\]\n]{1,40}\])/).map((chunk, index) => /^\[[^[\]\n]{1,40}\]$/.test(chunk) ? <mark key={index}>{chunk}</mark> : chunk)

  return <dialog ref={dialog} className={`prompt-dialog ${prompt.form ? 'is-lesson-plan' : ''}`} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === dialog.current) onClose() }}>
    <div className="prompt-dialog-inner">
      <header className="dialog-head">
        <div className="dialog-crumbs"><span className="cat-code">{category.code}</span><span>{category.label}</span><i aria-hidden="true">/</i><span>{prompt.subcategory}</span><span className="mono dialog-id">{prompt.id}</span></div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="關閉">✕</button>
      </header>
      <div className="dialog-title">
        <h2 id={titleId}>{prompt.title}</h2>
        <p>{prompt.description}</p>
        <div className="prompt-specs">
          {prompt.supportedTools.map(tool => <span key={tool} className="tag is-tool">適用：{tool}</span>)}
          <span className="tag is-level">{prompt.difficulty}</span>
          {prompt.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
        </div>
      </div>
      {prompt.caution && <aside className="note is-warn"><b>使用提醒</b><p>{prompt.caution}</p></aside>}

      <div className={`dialog-work ${fields.length ? '' : 'is-single'}`}>
        {fields.length > 0 && <section className="fill-panel" aria-label="填入自己的需求">
          <div className="fill-head">
            <span className="kicker">Fill in</span>
            <b>{prompt.form ? '基本條件填寫區' : '填入自己的需求'}</b>
            <small>{filledCount}/{fields.length} 個欄位已填寫；未填的欄位會保留 [方括號]。</small>
            <i className="fill-meter" aria-hidden="true"><b style={{ width: `${fields.length ? (filledCount / fields.length) * 100 : 0}%` }} /></i>
          </div>
          <div className="fill-grid">
            {prompt.form ? <PromptForm fields={prompt.form} values={values} onChange={(field, value) => setValues(current => ({ ...current, [field]: value }))} /> : fields.map(field => <label key={field} className={values[field]?.trim() ? 'is-filled' : ''}><span>{field}</span>
              <textarea rows={field.length > 12 ? 2 : 1} value={values[field] ?? ''} maxLength={2000} onChange={event => setValues(current => ({ ...current, [field]: event.target.value }))} placeholder={`輸入${field.replace(/^填入/, '')}`} /></label>)}
          </div>
          {filledCount > 0 && <button type="button" className="text-link is-muted" onClick={() => setValues({})}>清除填寫內容</button>}
        </section>}
        <section className="prompt-full" aria-label="完整提示詞">
          <div className="prompt-full-head"><span className="kicker">{filledCount > 0 ? `Preview · ${filledCount}/${fields.length} filled` : 'Template'}</span></div>
          <pre tabIndex={0}>{previewNodes}</pre>
        </section>
      </div>

      <div className="dialog-actions">
        <CopyButton text={prompt.content} label="複製原始模板" className={prompt.form || filledCount > 0 ? '' : 'btn-primary'} onFailed={() => selectText(prompt.content)} />
        {fields.length > 0 && <CopyButton text={filled} label={prompt.form ? '複製完整教案 Prompt' : filledCount === fields.length ? '複製已填寫版本' : `複製已填寫版本（${fields.length - filledCount} 欄未填）`} className={prompt.form || filledCount > 0 ? 'btn-primary' : ''} disabled={!prompt.form && filledCount === 0} onFailed={() => selectText(filled)} />}
        <FavoriteButton id={prompt.id} title={prompt.title} />
      </div>
      {manualCopy && <label className="manual-copy">自動複製未成功：已選取這次要複製的完整文字，請按 Ctrl+C 或長按複製。
        <textarea ref={manualRef} readOnly rows={5} value={manualCopy.text} />
      </label>}
      <p className="muted small">本網站不會執行或傳送 Prompt；請複製後貼到你使用的 AI 工具。貼上前請確認不含個資或機密資料。</p>
      {lessons.length > 0 && <section className="related-lessons"><span className="kicker">Related lessons</span><ul className="link-list">{lessons.map(lesson => <li key={lesson.id}><a href={href(`learn/${lesson.id}`)} onClick={onClose}><span><span className="mono">{lesson.code}</span> {lesson.title}</span></a></li>)}</ul></section>}
    </div>
  </dialog>
}
