import { useState } from 'react'
import type { PromptItem } from '../../content/types'
import { categoryById, promptCategories, prompts } from '../../content/prompts'
import { lessonById, lessons, lessonsInTrack } from '../../content/lessons'
import { videoById, videos } from '../../content/videos'
import { href, useScrollRestore } from '../../lib/router'
import type { Route } from '../../lib/router'
import { useStoredList } from '../../lib/storage'
import { CopyButton } from '../components/CopyButton'
import { HeroCircuit } from '../components/HeroCircuit'
import { PromptDialog } from '../components/PromptCard'
import { VideoTile } from '../components/VideoCard'
import { useReveal } from '../useReveal'

const directions = [
  { no: '01', en: 'TOOLS & LITERACY', title: '生成式 AI 工具與 AI 素養', text: 'ChatGPT、Gemini 的操作、提示詞設計、資料整理與來源查證，以及 AI 素養與學術倫理。', who: '所有學生', link: href('learn', { track: 'chatgpt-web' }), count: lessonsInTrack('chatgpt-web').length + lessonsInTrack('gemini-web').length + lessonsInTrack('literacy').length },
  { no: '02', en: 'AGENT · LEARNING', title: 'AI Agent 自主學習與專題實作', text: '用 AI Agent 規劃學習、拆解任務、整理資料、協作專題與製作成果，並建立人機協作與審查習慣。', who: '大學部學生', link: href('learn', { track: 'agent-learning' }), count: lessonsInTrack('agent-learning').length },
  { no: '03', en: 'AGENT · RESEARCH', title: 'AI Agent 學術研究應用', text: '把 AI Agent 安全地放進研究流程：文獻檢索、資料整理與分析、研究工作流程與研究倫理。', who: '研究生與研究工作者', link: href('learn', { track: 'agent-research' }), count: lessonsInTrack('agent-research').length },
]

export function HomePage({ route }: { route: Route }) {
  useScrollRestore(route)
  const ref = useReveal<HTMLDivElement>()
  const [open, setOpen] = useState<PromptItem>()
  const featured = prompts.filter(prompt => prompt.featured && !prompt.form).slice(0, 8)
  const [recentLessons] = useStoredList('recent-lessons')
  const [recentVideos] = useStoredList('recent-videos')
  const recents = [...recentLessons.map(id => lessonById[id]).filter(Boolean).slice(0, 3)]
  const recentVideoItems = recentVideos.slice(0, 2).map(id => videoById[id]).filter(Boolean)

  return <div ref={ref} className="home">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <span className="kicker"><b>UTAIPEI</b> Computing Center · Self-directed AI Learning</span>
        <h1 id="hero-title">生成式 AI 與 <span className="nowrap">AI Agent</span><span>自主學習平台</span></h1>
        <p className="hero-lead">從 AI 工具操作到自主學習與學術研究，建立有效、負責任的人工智慧應用能力。</p>
        <div className="hero-actions">
          <a className="btn btn-primary btn-lg" href={href('learn')}>開始學習<span className="arrow" aria-hidden="true" /></a>
          <a className="btn btn-lg" href={href('videos')}>觀看教學影片</a>
        </div>
      </div>
      <HeroCircuit />
      <dl className="hero-index">
        <div><dt>知識單元</dt><dd>{lessons.length}</dd></div>
        <div><dt>規劃影片</dt><dd>{String(videos.length).padStart(2, '0')}</dd></div>
        <div><dt>Prompt</dt><dd>{prompts.length}</dd></div>
        <div><dt>需要登入</dt><dd>00</dd></div>
      </dl>
    </section>

    {(recents.length > 0 || recentVideoItems.length > 0) && <section className="wrap home-recent" aria-labelledby="recent-title">
      <h2 id="recent-title" className="kicker">繼續上次的學習</h2>
      <div className="recent-row">
        {recents.map(lesson => <a key={lesson.id} href={href(`learn/${lesson.id}`)}><small className="mono">{lesson.code}</small>{lesson.title}</a>)}
        {recentVideoItems.map(video => <a key={video.id} href={href(`videos/${video.id}`)}><small className="mono">▶ {video.code}</small>{video.title}</a>)}
      </div>
    </section>}

    <section className="wrap home-block reveal" aria-labelledby="directions-title">
      <header className="section-head is-row">
        <div><span className="kicker"><b>01</b> Learning paths</span><h2 id="directions-title">三大學習方向</h2></div>
        <p>依需求選擇起點。每個方向都有完整教材、可複製的 Prompt 與自主練習任務。</p>
      </header>
      <ol className="direction-list">
        {directions.map(item => <li key={item.no}>
          <a href={item.link}>
            <span className="direction-no mono">{item.no}</span>
            <span className="direction-main"><small className="mono">{item.en}</small><b>{item.title}</b><span>{item.text}</span></span>
            <span className="direction-meta"><span>{item.who}</span><span className="mono">{String(item.count).padStart(2, '0')} UNITS</span></span>
            <span className="direction-go" aria-hidden="true"><span className="arrow" /></span>
          </a>
        </li>)}
      </ol>
      <p className="direction-extra"><a className="text-link" href={href('learn', { track: 'literacy' })}>AI 素養與學術倫理：跨工具共通課程<span className="arrow" aria-hidden="true" /></a></p>
    </section>

    <section className="home-block home-videos reveal" aria-labelledby="videos-title">
      <header className="wrap section-head is-row">
        <div><span className="kicker"><b>02</b> Video lessons</span><h2 id="videos-title">精選教學影片</h2></div>
        <div className="row-actions"><p>八支正式規劃的網頁版教學影片；尚未上架時標示「影片準備中」，可先閱讀對應教材。</p><a className="btn" href={href('videos')}>全部影片<span className="arrow" aria-hidden="true" /></a></div>
      </header>
      <div className="video-rail" tabIndex={0} role="region" aria-label="精選教學影片，可左右捲動">
        {videos.slice(0, 8).map((video, index) => <VideoTile key={video.id} video={video} index={index} />)}
      </div>
    </section>

    <section className="wrap home-block reveal" aria-labelledby="prompts-title">
      <header className="section-head is-row">
        <div><span className="kicker"><b>03</b> Prompt library</span><h2 id="prompts-title">熱門 Prompt</h2></div>
        <p>複製到 ChatGPT 或 Gemini，把 [方括號] 換成你的內容；也可以先在網站上填好再複製。</p>
      </header>
      <aside className="plan-entry home-plan-entry">
        <div><span className="kicker">New · Lesson plan studio</span><b>完整教案設計：填入條件，帶走完整提示詞</b><p>為備課、試教與教學演示準備；不必填完也能複製。</p></div>
        <button type="button" className="btn btn-primary" onClick={() => setOpen(prompts.find(prompt => prompt.id === 'teach-core'))}>開啟教案產生器<span className="arrow" aria-hidden="true" /></button>
      </aside>
      <div className="prompt-board">
        <ol className="featured-list">
          {featured.map((prompt, index) => <li key={prompt.id}>
            <span className="mono featured-no">{String(index + 1).padStart(2, '0')}</span>
            <button type="button" className="featured-main" onClick={() => setOpen(prompt)}>
              <span className="cat-code">{categoryById[prompt.category].code}</span>
              <b>{prompt.title}</b>
              <span>{prompt.description}</span>
            </button>
            <CopyButton text={prompt.content} label="複製" className="btn-small" />
          </li>)}
        </ol>
        <aside className="category-index" aria-label="Prompt 分類索引">
          <span className="kicker">{promptCategories.length} categories · {prompts.length} prompts</span>
          <ul>{promptCategories.map(category => <li key={category.id}><a href={href('prompts', { cat: category.id })}><span className="mono">{category.code}</span>{category.short}<small className="mono">{prompts.filter(prompt => prompt.category === category.id).length}</small></a></li>)}</ul>
          <a className="btn btn-primary btn-block" href={href('prompts')}>進入 Prompt 資源庫<span className="arrow" aria-hidden="true" /></a>
        </aside>
      </div>
    </section>

    <section className="wrap home-block reveal" aria-labelledby="responsible-title">
      <div className="responsibility">
        <div className="responsibility-lead">
          <span className="kicker"><b>04</b> Responsible AI</span>
          <h2 id="responsible-title">AI 可以協助學習，<br />但資訊查核、學術誠信與最終判斷，<br /><em>仍須由使用者負責。</em></h2>
        </div>
        <ul>
          <li><span className="mono">VERIFY</span><b>查核</b>重要事實、數據與文獻，都要回到原始來源確認。</li>
          <li><span className="mono">INTEGRITY</span><b>誠信</b>遵守課程與學校規範，誠實揭露 AI 使用方式。</li>
          <li><span className="mono">PRIVACY</span><b>隱私</b>不上傳個資、未公開的研究資料或機密文件。</li>
        </ul>
        <a className="text-link" href={href('learn', { track: 'literacy' })}>閱讀 AI 素養與學術倫理課程<span className="arrow" aria-hidden="true" /></a>
      </div>
    </section>
    {open && <PromptDialog prompt={open} onClose={() => setOpen(undefined)} />}
  </div>
}
