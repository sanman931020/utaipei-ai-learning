import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lesson, LessonSection, PromptItem, TrackId } from '../../content/types'
import { lessonById, lessonsInTrack, trackById, tracks } from '../../content/lessons'
import { promptsForLesson, videosForLesson } from '../../content/relations'
import { href, navigate, useScrollRestore } from '../../lib/router'
import type { Route } from '../../lib/router'
import { rememberRecent, useStoredList } from '../../lib/storage'
import { BlockView, OriginBadge } from '../components/Blocks'
import { CopyButton } from '../components/CopyButton'
import { PromptCard, PromptDialog } from '../components/PromptCard'
import { LessonVideo } from '../components/VideoPanel'
import { useIndicator } from '../useIndicator'

const toolTracks: TrackId[] = ['chatgpt-web', 'gemini-web']
const isTrack = (value: string | null): value is TrackId => tracks.some(track => track.id === value)

/** ChatGPT | Gemini switch, plus separate entries for the shared course and the two AI Agent tracks. */
function TrackSwitch({ current, lesson }: { current: TrackId; lesson?: Lesson }) {
  const tool = current.startsWith('gemini-') ? 'gemini' : 'chatgpt'
  const platform = current.endsWith('-desktop') ? 'desktop' : 'web'
  const isTool = current.startsWith('chatgpt-') || current.startsWith('gemini-')
  const toolSwitch = useIndicator<HTMLDivElement>('[aria-current=true]', '.switch-plate', [current])
  const platformTabs = useIndicator<HTMLDivElement>('[aria-current=true]', '.line-tabs-ink', [current])
  const target = (track: TrackId) => {
    if (!lesson || !toolTracks.includes(lesson.track) || !toolTracks.includes(track)) return href('learn', { track })
    const index = lessonsInTrack(lesson.track).findIndex(item => item.id === lesson.id)
    const match = lessonsInTrack(track)[index]
    return match ? href(`learn/${match.id}`) : href('learn', { track })
  }
  // Native fragment navigation scrolls to the top even when React preserves the query.
  // For list tabs, push history explicitly; lesson links still open their matching unit.
  const select = (event: React.MouseEvent<HTMLAnchorElement>, track: TrackId) => {
    if (lesson || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate('learn', { track }, { preserveScroll: true })
  }
  return <div className="track-switch">
    <div className="knowledge-tool-menu">
      <div ref={toolSwitch} className="switch" role="group" aria-label="選擇 AI 工具">
        <i className="switch-plate" aria-hidden="true" />
        {(['chatgpt', 'gemini'] as const).map(id => <a key={id} href={target(`${id}-${platform}`)} onClick={event => select(event, `${id}-${platform}`)} className="switch-option" aria-current={isTool && tool === id ? 'true' : undefined}>
          <span className="tool-glyph">{id === 'chatgpt' ? 'CG' : 'GM'}</span>{id === 'chatgpt' ? 'ChatGPT' : 'Gemini'}
        </a>)}
      </div>
      <div ref={platformTabs} className="line-tabs" role="group" aria-label="教材使用版本">
        {(['web', 'desktop'] as const).map(id => <a key={id} className="line-tab" href={target(`${tool}-${id}`)} onClick={event => select(event, `${tool}-${id}`)} aria-current={isTool && platform === id ? 'true' : undefined}>
          {id === 'web' ? '網頁版' : '桌面版'}<small>{lessonsInTrack(`${tool}-${id}`).length}</small>
        </a>)}
        <i className="line-tabs-ink" aria-hidden="true" />
      </div>
    </div>
    <nav className="track-entries" aria-label="共通課程與 AI Agent 專區">
      {tracks.filter(track => !track.id.startsWith('chatgpt-') && !track.id.startsWith('gemini-')).map(track => <a key={track.id} href={target(track.id)} data-track={track.id} aria-current={current === track.id ? 'true' : undefined}>
        <small className="mono">{track.en}</small><span>{track.label}</span>
      </a>)}
    </nav>
  </div>
}

function TrackOverview({ track }: { track: TrackId }) {
  const info = trackById[track]
  const items = lessonsInTrack(track)
  const [recent] = useStoredList('recent-lessons')
  const recentLessons = recent.map(id => lessonById[id]).filter(Boolean).slice(0, 4)
  return <>
    <section className="track-intro">
      <div><span className="kicker"><b>{info.en}</b></span><h2>{info.label}</h2><p>{info.description}</p></div>
      <dl className="track-facts">
        <div><dt>適用對象</dt><dd>{info.audience}</dd></div>
        <div><dt>單元數</dt><dd className="mono">{String(items.length).padStart(2, '0')}</dd></div>
        {recentLessons.length > 0 && <div><dt>最近閱讀</dt><dd>{recentLessons.slice(0, 2).map(lesson => <a key={lesson.id} href={href(`learn/${lesson.id}`)}>{lesson.code} {lesson.title}</a>)}</dd></div>}
      </dl>
    </section>
    {items.length === 0 && <div className="series-empty">
      <div className="series-empty-art" aria-hidden="true"><span className="mono">{info.en}</span><i /><i /><i /></div>
      <div><span className="status-chip is-planned">未來規劃</span><h3>桌面版教材尚待規劃</h3>
        <p>教材內容確定後會在此新增。目前可先閱讀網頁版的知識單元。</p>
        <a className="btn" href={href('learn', { track: track === 'gemini-desktop' ? 'gemini-web' : 'chatgpt-web' })}>回到網頁版<span className="arrow" aria-hidden="true" /></a>
      </div>
    </div>}
    <ol className="lesson-index">
      {items.map(lesson => {
        const video = videosForLesson(lesson)[0]
        return <li key={lesson.id}>
          <a href={href(`learn/${lesson.id}`)}>
            <span className="lesson-index-code mono">{lesson.code}</span>
            <span className="lesson-index-main"><b>{lesson.title}</b><span>{lesson.summary}</span></span>
            <span className="lesson-index-meta"><span className="tag is-level">{lesson.level}</span><span className="mono">{video ? `VIDEO ${video.code}` : 'TEXT ONLY'}</span></span>
            <span className="direction-go" aria-hidden="true"><span className="arrow" /></span>
          </a>
        </li>
      })}
    </ol>
  </>
}

/** Rough reading time: about 400 Chinese characters a minute across all of the lesson's text. */
function readingMinutes(lesson: Lesson) {
  return Math.max(3, Math.round((JSON.stringify([lesson.summary, lesson.concepts, lesson.steps, lesson.examples, lesson.mistakes, lesson.extension, lesson.practice]).match(/[㐀-鿿]/g)?.length ?? 0) / 400))
}

type TocItem = { id: string; label: string; children?: { id: string; label: string }[] }

function SectionGroup({ id, title, en, sections }: { id: string; title: string; en: string; sections: LessonSection[] }) {
  if (!sections.length) return null
  return <section id={id} className="lesson-group" aria-labelledby={`${id}-title`}>
    <header className="lesson-group-head"><small>{en}</small><h2 id={`${id}-title`}>{title}</h2></header>
    {sections.map(section => <section key={section.id} id={section.id} className="lesson-section">
      <div className="lesson-section-head"><h3>{section.title}</h3><OriginBadge origin={section.origin} /></div>
      {section.blocks.map((block, index) => <BlockView key={index} block={block} />)}
    </section>)}
  </section>
}

function LessonView({ lesson }: { lesson: Lesson }) {
  const track = trackById[lesson.track]
  const siblings = lessonsInTrack(lesson.track)
  const index = siblings.findIndex(item => item.id === lesson.id)
  const lessonVideos = videosForLesson(lesson)
  const lessonPrompts = promptsForLesson(lesson)
  const [open, setOpen] = useState<PromptItem>()
  const [active, setActive] = useState<string>('objectives')
  const article = useRef<HTMLElement>(null)

  useEffect(() => { rememberRecent('recent-lessons', lesson.id) }, [lesson.id])

  // Reading progress through this lesson, shown as a thin line under the header.
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const box = article.current?.getBoundingClientRect()
      if (box) setProgress(Math.min(1, Math.max(0, -box.top / Math.max(1, box.height - innerHeight))))
    }
    update()
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [lesson.id])

  const toc: TocItem[] = useMemo(() => [
    { id: 'objectives', label: '學習目標' },
    { id: 'video', label: '對應教學影片' },
    { id: 'concepts', label: '核心概念', children: lesson.concepts.map(section => ({ id: section.id, label: section.title })) },
    { id: 'steps', label: '操作步驟', children: lesson.steps.map(section => ({ id: section.id, label: section.title })) },
    { id: 'examples', label: '使用示例與 Prompt' },
    { id: 'mistakes', label: '常見錯誤與注意事項' },
    { id: 'extension', label: '延伸學習', children: lesson.extension.map(section => ({ id: section.id, label: section.title })) },
    { id: 'practice', label: '自主練習任務' },
  ].filter(item => item.id !== 'steps' || lesson.steps.length).filter(item => item.id !== 'extension' || lesson.extension.length), [lesson])

  // Highlight the chapter being read.
  useEffect(() => {
    const root = article.current
    if (!root) return
    const nodes = root.querySelectorAll('[data-toc], .lesson-section[id]')
    const spy = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) }), { rootMargin: '-20% 0px -70% 0px' })
    nodes.forEach(node => spy.observe(node))
    return () => spy.disconnect()
  }, [lesson.id])

  const jump = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    const node = document.getElementById(id)
    if (!node) return
    node.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    node.querySelector<HTMLElement>('h2,h3')?.focus({ preventScroll: true })
    setActive(id)
    const details = document.querySelector<HTMLDetailsElement>('.lesson-toc-mobile')
    if (details) details.open = false
  }
  const isActive = (item: TocItem) => active === item.id || item.children?.some(child => child.id === active)
  const tocList = <ol className="toc-list">{toc.map(item => <li key={item.id}>
    <a href={`#${item.id}`} onClick={jump(item.id)} aria-current={isActive(item) ? 'location' : undefined}>{item.label}</a>
    {item.children && item.children.length > 0 && <ol>{item.children.map(child => <li key={child.id}><a href={`#${child.id}`} onClick={jump(child.id)} aria-current={active === child.id ? 'location' : undefined}>{child.label}</a></li>)}</ol>}
  </li>)}</ol>

  return <div className="lesson-layout">
    <div className="lesson-progress" role="progressbar" aria-label="本單元閱讀進度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><b style={{ '--p': progress } as React.CSSProperties} /></div>
    <aside className="lesson-sidebar" aria-label="單元與章節導覽">
      <div className="sidebar-card">
        <b className="sidebar-title"><small>{track.en}</small>{track.label}</b>
        <ol className="sidebar-lessons">{siblings.map(item => <li key={item.id}><a href={href(`learn/${item.id}`)} aria-current={item.id === lesson.id ? 'page' : undefined}><span>{item.code}</span>{item.title}</a></li>)}</ol>
      </div>
      <nav className="sidebar-card lesson-toc-desktop" aria-label="本單元目錄"><b className="sidebar-title"><small>CONTENTS</small>本單元目錄</b>{tocList}</nav>
    </aside>

    <article ref={article} className="lesson-paper" aria-labelledby="lesson-title">
      <details className="lesson-toc-mobile"><summary>本單元目錄</summary>{tocList}</details>
      <header className="lesson-cover" id="objectives" data-toc>
        <p className="lesson-crumbs"><a href={href('learn', { track: lesson.track })}>{track.label}</a><span aria-hidden="true">／</span>單元 {lesson.code}</p>
        <div className="lesson-cover-title"><span className="lesson-code is-large">{lesson.code}</span><div><h1 id="lesson-title" tabIndex={-1}>{lesson.title}</h1>{lesson.subtitle && <p className="lesson-subtitle">{lesson.subtitle}</p>}</div></div>
        <p className="lesson-summary">{lesson.summary}</p>
        <ul className="lesson-tags"><li className="mono">UNIT {String(index + 1).padStart(2, '0')} / {String(siblings.length).padStart(2, '0')}</li><li>約 {readingMinutes(lesson)} 分鐘閱讀</li><li>難度：{lesson.level}</li>{lesson.audience && <li>對象：{lesson.audience}</li>}<li>{lessonVideos.length ? `對應影片：${lessonVideos.map(video => video.code).join('、')}` : '影片：尚待製作'}</li><li>相關 Prompt：{lessonPrompts.length} 則</li></ul>
        <section className="objectives" aria-labelledby="objectives-title"><h2 id="objectives-title" tabIndex={-1}>學習目標</h2><ol>{lesson.learningObjectives.map(item => <li key={item}>{item}</li>)}</ol></section>
      </header>

      <section id="video" className="lesson-group" data-toc aria-labelledby="video-title">
        <header className="lesson-group-head"><small>VIDEO</small><h2 id="video-title" tabIndex={-1}>對應教學影片</h2></header>
        {lessonVideos.length
          ? lessonVideos.map(video => <LessonVideo key={video.id} video={video} lessonId={lesson.id} />)
          : <div className="video-frame video-pending is-planned"><div><span className="status-chip is-planned">影片尚待製作</span><strong>{lesson.plannedVideoTitle ?? `${lesson.code}｜${lesson.title}`}</strong><p>本模組目前提供完整文字教材，影片規劃確定後會在此直接播放。</p></div></div>}
      </section>

      <div id="concepts" data-toc><SectionGroup id="concepts-group" title="核心概念" en="CONCEPTS" sections={lesson.concepts} /></div>
      {lesson.steps.length > 0 && <div id="steps" data-toc><SectionGroup id="steps-group" title="操作步驟" en="HOW-TO" sections={lesson.steps} /></div>}

      <section id="examples" className="lesson-group" data-toc aria-labelledby="examples-title">
        <header className="lesson-group-head"><small>EXAMPLES</small><h2 id="examples-title" tabIndex={-1}>使用示例與 Prompt</h2></header>
        <div className="example-list">{lesson.examples.map(example => <article key={example.title} className="example">
          <h3>{example.title}</h3><p>{example.scenario}</p>
          {example.prompt && <div className="example-prompt"><div className="example-prompt-head"><small>示例 Prompt</small><CopyButton text={example.prompt} label="複製" className="btn btn-small" /></div><pre tabIndex={0}>{example.prompt}</pre></div>}
          {example.note && <p className="muted small">{example.note}</p>}
        </article>)}</div>
        {lessonPrompts.length > 0 && <div className="lesson-prompts">
          <h3>本單元推薦的 Prompt（{lessonPrompts.length} 則）</h3>
          <div className="prompt-grid is-tight">{lessonPrompts.slice(0, 6).map(prompt => <PromptCard key={prompt.id} prompt={prompt} onOpen={setOpen} compact />)}</div>
          {lessonPrompts.length > 6 && <p><a className="text-link is-strong" href={href('prompts', { lesson: lesson.id })}>查看全部 {lessonPrompts.length} 則相關 Prompt →</a></p>}
        </div>}
      </section>

      <section id="mistakes" className="lesson-group" data-toc aria-labelledby="mistakes-title">
        <header className="lesson-group-head"><small>PITFALLS</small><h2 id="mistakes-title" tabIndex={-1}>常見錯誤與注意事項</h2></header>
        <ul className="mistakes">{lesson.mistakes.map(item => <li key={item.mistake}><p className="mistake"><span aria-hidden="true">✕</span><span className="sr-only">常見錯誤：</span>{item.mistake}</p><p className="fix"><span aria-hidden="true">✓</span><span className="sr-only">建議做法：</span>{item.fix}</p></li>)}</ul>
      </section>

      {lesson.extension.length > 0 && <div id="extension" data-toc><SectionGroup id="extension-group" title="延伸學習與進階應用" en="GOING FURTHER" sections={lesson.extension} /></div>}

      <section id="practice" className="lesson-group" data-toc aria-labelledby="practice-title">
        <header className="lesson-group-head"><small>PRACTICE</small><h2 id="practice-title" tabIndex={-1}>自主練習任務</h2></header>
        <div className="practice">
          <h3>{lesson.practice.title}</h3>
          <ol>{lesson.practice.tasks.map(task => <li key={task}>{task}</li>)}</ol>
          {lesson.practice.check && <div className="practice-check"><b>完成後自我檢核</b><ul>{lesson.practice.check.map(item => <li key={item}><label><input type="checkbox" /> {item}</label></li>)}</ul><small className="muted">勾選只用於自我檢查，不會儲存或上傳。</small></div>}
        </div>
      </section>

      <footer className="lesson-source">
        <p><b>內容來源：</b>{lesson.sourceReference}</p>
        <p><b>延伸說明：</b>{lesson.extensionNotes}</p>
        <p className="muted">AI 工具的介面與功能會因帳號方案、地區與版本更新而不同，請以你實際看到的畫面為準。</p>
      </footer>

      <nav className="lesson-pager" aria-label="上一單元／下一單元">
        {index > 0 ? <a href={href(`learn/${siblings[index - 1].id}`)}><small>← 上一單元</small>{siblings[index - 1].code}｜{siblings[index - 1].title}</a> : <span />}
        {index < siblings.length - 1 ? <a className="is-next" href={href(`learn/${siblings[index + 1].id}`)}><small>下一單元 →</small>{siblings[index + 1].code}｜{siblings[index + 1].title}</a> : <a className="is-next" href={href('learn', { track: lesson.track })}><small>本系列完成 →</small>回到{track.label}單元列表</a>}
      </nav>
    </article>
    {open && <PromptDialog prompt={open} onClose={() => setOpen(undefined)} />}
  </div>
}

export function LearnPage({ route }: { route: Route }) {
  const lessonId = route.path[1]
  const lesson = lessonId ? lessonById[lessonId] : undefined
  const queryTrack = route.query.get('track')
  const track: TrackId = lesson?.track ?? (isTrack(queryTrack) ? queryTrack : 'chatgpt-web')
  useScrollRestore(route, true, { keepOnQueryChange: true })
  useEffect(() => { if (lessonId && !lesson) navigate('learn', undefined, { replace: true }) }, [lessonId, lesson])

  // data-track drives the track accent colour (tool courses, shared course and the two AI Agent tracks differ).
  return <div className="page learn-page" data-track={track}>
    <header className="page-head">
      <span className="kicker"><b>01</b> Knowledge base</span>
      <h1>學習知識</h1>
      <p className="page-lead">選擇 ChatGPT 或 Gemini，依單元閱讀教材、觀看對應影片、複製 Prompt 並完成練習；AI 素養與學術倫理、AI Agent 兩大專區另有獨立入口。</p>
      <div className="page-head-extra"><TrackSwitch current={track} lesson={lesson} /></div>
    </header>
    {lesson ? <LessonView key={lesson.id} lesson={lesson} /> : <div className="page-body"><TrackOverview track={track} /></div>}
  </div>
}
