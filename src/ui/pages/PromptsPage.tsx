import { useEffect, useMemo, useRef, useState } from 'react'
import type { Difficulty, PromptCategoryId, PromptItem, SupportedTool } from '../../content/types'
import { categoryById, promptById, promptCategories, prompts } from '../../content/prompts'
import { lessonById } from '../../content/lessons'
import { promptsForLesson } from '../../content/relations'
import { defaultFilters, filterPrompts } from '../../lib/promptSearch'
import type { PromptFilters, PromptSort } from '../../lib/promptSearch'
import { href, navigate, useScrollRestore } from '../../lib/router'
import type { Route } from '../../lib/router'
import { useStoredList } from '../../lib/storage'
import { PromptCard, PromptDialog } from '../components/PromptCard'
import { useIndicator } from '../useIndicator'

const suggestions = ['簡報', '照片', '論文', '文獻', '研究方法', '資料分析', '讀書計畫', '英文', '教案', 'AI Agent', 'PPT', 'Python']
/** Task-first entry points: one click applies the search and filters that answer the task. */
const scenarios: { label: string; query: Record<string, string> }[] = [
  { label: '準備期末簡報', query: { cat: 'slides' } },
  { label: '寫文獻回顧', query: { cat: 'literature' } },
  { label: '準備試教或教案', query: { cat: 'teaching' } },
  { label: '分析問卷資料', query: { cat: 'data' } },
  { label: '規劃研究設計', query: { cat: 'methods' } },
  { label: '拍攝與剪輯影片', query: { cat: 'video' } },
  { label: '生成圖片或海報', query: { cat: 'image' } },
  { label: '用 AI Agent 做專題', query: { cat: 'agent' } },
  { label: '英文寫作與翻譯', query: { cat: 'english' } },
  { label: '準備考試', query: { q: '考試' } },
  { label: '履歷與面試', query: { cat: 'career' } },
  { label: '查核 AI 回答', query: { cat: 'ethics' } },
]
const tools: (SupportedTool | 'all')[] = ['all', 'ChatGPT', 'Gemini', '通用']
const levels: (Difficulty | 'all')[] = ['all', '入門', '進階', '研究應用']
const PAGE = 18
const label = (id: PromptCategoryId) => categoryById[id].label

/** Filters live in the URL query, so a search can be shared, bookmarked and restored with Back. */
function readFilters(query: URLSearchParams): PromptFilters {
  const category = query.get('cat')
  const tool = query.get('tool')
  const level = query.get('level')
  const sort = query.get('sort')
  return {
    query: query.get('q') ?? '',
    category: promptCategories.some(item => item.id === category) ? category as PromptCategoryId : 'all',
    subcategory: query.get('sub') ?? '',
    tool: tools.includes(tool as SupportedTool) ? tool as SupportedTool : 'all',
    difficulty: levels.includes(level as Difficulty) ? level as Difficulty : 'all',
    sort: (['recommended', 'title', 'newest'] as const).includes(sort as PromptSort) ? sort as PromptSort : 'recommended',
    favoritesOnly: query.get('fav') === '1',
  }
}

function toQuery(filters: PromptFilters, lesson?: string): Record<string, string | undefined> {
  return {
    q: filters.query.trim() || undefined,
    cat: filters.category === 'all' ? undefined : filters.category,
    sub: filters.category === 'all' ? undefined : filters.subcategory || undefined,
    tool: filters.tool === 'all' ? undefined : filters.tool,
    level: filters.difficulty === 'all' ? undefined : filters.difficulty,
    sort: filters.sort === 'recommended' ? undefined : filters.sort,
    fav: filters.favoritesOnly ? '1' : undefined,
    lesson,
  }
}

export function PromptsPage({ route }: { route: Route }) {
  const openId = route.path[1]
  const opened = openId ? promptById[openId] : undefined
  const filters = useMemo(() => readFilters(route.query), [route.query])
  const lessonFilter = route.query.get('lesson') ?? undefined
  const lesson = lessonFilter ? lessonById[lessonFilter] : undefined
  const [favorites] = useStoredList('favorite-prompts')
  const [text, setText] = useState(filters.query)
  const [limit, setLimit] = useState(PAGE)
  const searchBox = useRef<HTMLInputElement>(null)
  const subTabs = useIndicator<HTMLDivElement>('[aria-pressed=true]', '.line-tabs-ink', [filters.category, filters.subcategory])
  // Filtering is not a new page, and the list keeps its position while a prompt is open on top of it.
  useScrollRestore(route, !openId, { keepOnQueryChange: true })

  useEffect(() => { setText(filters.query) }, [filters.query])
  useEffect(() => { setLimit(PAGE) }, [filters.query, filters.category, filters.subcategory, filters.tool, filters.difficulty, filters.sort, filters.favoritesOnly, lessonFilter])

  const update = (patch: Partial<PromptFilters>, options: { replace?: boolean } = {}) => navigate('prompts', toQuery({ ...filters, ...patch }, lessonFilter), options)
  // Results update while typing; the URL is replaced so Back is not flooded with keystrokes.
  useEffect(() => {
    if (text === filters.query) return
    const timer = window.setTimeout(() => update({ query: text }, { replace: true }), 180)
    return () => window.clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const pool = lesson ? promptsForLesson(lesson) : prompts
  const live = { ...filters, query: text }
  const results = filterPrompts(pool, live, label, favorites)
  const subcategories = filters.category === 'all' ? [] : [...new Set(pool.filter(item => item.category === filters.category).map(item => item.subcategory))]
  const advancedActive = filters.tool !== 'all' || filters.difficulty !== 'all' || filters.sort !== 'recommended' || filters.favoritesOnly
  const active = Boolean(text.trim()) || filters.category !== 'all' || advancedActive || Boolean(lesson)
  const featured = prompts.filter(item => item.featured)
  // When filters hide matches, say how many the query finds without them.
  const everywhere = results.length === 0 && text.trim() ? filterPrompts(prompts, { ...defaultFilters, query: text }, label) : []
  const clear = () => { setText(''); navigate('prompts'); searchBox.current?.focus() }
  const openPrompt = (prompt: PromptItem) => navigate(`prompts/${prompt.id}`, toQuery(live, lessonFilter))
  const closePrompt = () => navigate('prompts', toQuery(live, lessonFilter))
  const count = (id: PromptCategoryId) => pool.filter(item => item.category === id).length

  return <div className="page prompts-page">
    <header className="page-head">
      <span className="kicker"><b>03</b> Prompt library</span>
      <h1>Prompt 資源庫</h1>
      <p className="page-lead">{prompts.length} 則為大學生與研究生設計的繁體中文提示詞，涵蓋 {promptCategories.length} 個類別。搜尋、篩選後複製，或先填入自己的需求再複製，貼到 ChatGPT、Gemini 使用。</p>
    </header>

    <div className="page-body">
      <section className="library-search" role="search" aria-label="搜尋與篩選 Prompt">
        <form className="search-field" onSubmit={event => { event.preventDefault(); update({ query: text }) }}>
          <label htmlFor="prompt-q" className="sr-only">搜尋 Prompt</label>
          <span className="search-icon" aria-hidden="true" />
          <input ref={searchBox} id="prompt-q" type="search" value={text} onChange={event => setText(event.target.value)} placeholder="搜尋任務、關鍵字或英文：簡報、照片、論文、Literature Review…" autoComplete="off" enterKeyHint="search" maxLength={80} />
          {text && <button type="button" className="search-clear" onClick={() => { setText(''); update({ query: '' }) }} aria-label="清除搜尋文字">✕</button>}
          <span className="search-count mono" aria-hidden="true">{results.length}</span>
        </form>
        <div className="scenario-row" role="group" aria-label="依任務情境快速篩選"><span className="mono">我想要</span>{scenarios.map(item => {
          const on = Object.entries(item.query).every(([key, value]) => route.query.get(key) === value) && (!item.query.q ? !filters.query : true)
          return <button key={item.label} type="button" aria-pressed={on} onClick={() => { setText(item.query.q ?? ''); navigate('prompts', on ? {} : item.query) }}>{item.label}</button>
        })}</div>
        <details className="advanced" open={advancedActive || undefined}>
          <summary><span>進階篩選</span>{advancedActive && <span className="mono advanced-on">ON</span>}</summary>
          <div className="advanced-grid">
            <label className="field"><span>適用工具</span><select className="select" value={filters.tool} onChange={event => update({ tool: event.target.value as PromptFilters['tool'] })}>
              {tools.map(tool => <option key={tool} value={tool}>{tool === 'all' ? '全部工具' : tool === '通用' ? '通用（任何對話式 AI）' : tool}</option>)}
            </select></label>
            <label className="field"><span>難度</span><select className="select" value={filters.difficulty} onChange={event => update({ difficulty: event.target.value as PromptFilters['difficulty'] })}>
              {levels.map(level => <option key={level} value={level}>{level === 'all' ? '全部難度' : level}</option>)}
            </select></label>
            <label className="field"><span>排序</span><select className="select" value={filters.sort} onChange={event => update({ sort: event.target.value as PromptSort })}>
              <option value="recommended">推薦</option><option value="title">標題</option><option value="newest">新加入</option>
            </select></label>
            <label className="check"><input type="checkbox" checked={filters.favoritesOnly} onChange={event => update({ favoritesOnly: event.target.checked })} /><span>只看收藏（{favorites.length}）</span></label>
          </div>
        </details>
      </section>

      <nav className="category-strip" aria-label="Prompt 分類">
        <button type="button" aria-pressed={filters.category === 'all'} onClick={() => update({ category: 'all', subcategory: '' })}><span className="mono">ALL</span>全部<small className="mono">{pool.length}</small></button>
        {promptCategories.map(item => <button key={item.id} type="button" aria-pressed={filters.category === item.id} onClick={() => update({ category: item.id, subcategory: '' })} title={item.label}><span className="mono">{item.code}</span>{item.short}<small className="mono">{count(item.id)}</small></button>)}
      </nav>

      {filters.category !== 'all' && <div className="category-detail">
        <div><b>{categoryById[filters.category].label}</b><p>{categoryById[filters.category].description}</p></div>
        <div ref={subTabs} className="line-tabs is-scroll" role="group" aria-label="子分類">
          <button type="button" className="line-tab" aria-pressed={!filters.subcategory} onClick={() => update({ subcategory: '' })}>全部</button>
          {subcategories.map(sub => <button key={sub} type="button" className="line-tab" aria-pressed={filters.subcategory === sub} onClick={() => update({ subcategory: sub })}>{sub}<small>{pool.filter(item => item.category === filters.category && item.subcategory === sub).length}</small></button>)}
          <i className="line-tabs-ink" aria-hidden="true" />
        </div>
      </div>}

      {filters.category === 'teaching' && <aside className="plan-entry">
        <div><span className="kicker">Lesson plan studio</span><b>完整教案設計：從教學條件到完整提示詞</b><p>可部分填寫，保留 18 項設計要求、學習單與評量規準。</p></div>
        <button type="button" className="btn btn-primary" onClick={() => openPrompt(promptById['teach-core'])}>開啟教案產生器<span className="arrow" aria-hidden="true" /></button>
      </aside>}

      {!active && <section className="featured-strip" aria-labelledby="featured-title">
        <header className="section-head is-row"><div><span className="kicker">Featured</span><h2 id="featured-title">精選 Prompt</h2></div><p>從最常用的任務開始：完整教案、簡報、研究、圖片、影片、讀書計畫與 AI Agent。</p></header>
        <div className="prompt-grid is-featured">{featured.map((prompt, index) => <PromptCard key={prompt.id} prompt={prompt} onOpen={openPrompt} index={index + 1} compact />)}</div>
      </section>}

      <div className="result-bar" aria-live="polite">
        <p><span className="mono result-count">{String(results.length).padStart(3, '0')}</span>{lesson && <span className="lesson-filter">單元 {lesson.code}「{lesson.title}」的相關 Prompt・</span>}{active ? <>則符合{text.trim() && <>「{text.trim()}」</>}{filters.category !== 'all' && <>・{categoryById[filters.category].short}{filters.subcategory && ` / ${filters.subcategory}`}</>}</> : '則・全部 Prompt'}</p>
        {active && <button type="button" className="text-link" onClick={clear}>清除搜尋與篩選</button>}
      </div>

      {results.length
        ? <>
          <div className="prompt-grid">{results.slice(0, limit).map((prompt, index) => <PromptCard key={prompt.id} prompt={prompt} onOpen={openPrompt} index={index + 1} />)}</div>
          <div className="more-row">
            <span className="mono">顯示 {Math.min(limit, results.length)} / {results.length}</span>
            {results.length > limit && <button type="button" className="btn" onClick={() => setLimit(value => value + PAGE)}>再載入 {Math.min(PAGE, results.length - limit)} 則<span className="arrow" aria-hidden="true" /></button>}
          </div>
        </>
        : <div className="empty-state">
          <span className="kicker">No match</span>
          <h2>沒有符合條件的 Prompt</h2>
          {everywhere.length > 0
            ? <p>目前的分類或篩選把結果都排除了；在全部分類中有 <b>{everywhere.length}</b> 則符合「{text.trim()}」。</p>
            : <p>試試較短的關鍵字、同義詞或英文（例如「圖片」「photo」），或從下方常用任務開始。</p>}
          <div className="row-actions is-center">
            {everywhere.length > 0 && <button type="button" className="btn btn-primary" onClick={() => navigate('prompts', { q: text.trim() })}>在全部分類中搜尋<span className="arrow" aria-hidden="true" /></button>}
            <button type="button" className={`btn ${everywhere.length ? '' : 'btn-primary'}`} onClick={clear}>清除搜尋與篩選</button>
          </div>
          <div className="search-suggest is-center">{suggestions.slice(0, 8).map(word => <button key={word} type="button" onClick={() => { setText(word); navigate('prompts', { q: word }) }}>{word}</button>)}</div>
        </div>}

      <aside className="note is-ethics prompt-ethics"><b>使用提醒</b><p>Prompt 只是起點：AI 的回答需要你查核與判斷。研究相關用途不得要求 AI 編造文獻、DOI 或數據，未閱讀的來源不可宣稱已閱讀；個資與研究機密未經許可請勿上傳；學術使用請遵守教師、學校及投稿單位的規範。</p></aside>
    </div>
    {opened && <PromptDialog key={opened.id} prompt={opened} onClose={closePrompt} />}
    {openId && !opened && <div className="empty-state is-floating" role="alert"><h2>找不到這則 Prompt</h2><p>它可能已被移除或改名。</p><button type="button" className="btn btn-primary" onClick={closePrompt}>回到 Prompt 資源庫</button><a className="text-link" href={href('prompts')}>查看全部</a></div>}
  </div>
}
