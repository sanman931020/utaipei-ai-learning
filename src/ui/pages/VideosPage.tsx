import { useEffect } from 'react'
import type { SeriesId, Video } from '../../content/types'
import { lessonById, lessonsInTrack } from '../../content/lessons'
import { lessonsForVideo, promptsForLesson } from '../../content/relations'
import { isPlayable, seriesById, statusLabel, videoById, videos } from '../../content/videos'
import { href, navigate, useScrollRestore } from '../../lib/router'
import type { Route } from '../../lib/router'
import { VideoRow } from '../components/VideoCard'
import { StatusChip, VideoPlayer } from '../components/VideoPanel'
import { useIndicator } from '../useIndicator'

type Tool = 'chatgpt' | 'gemini'
type Platform = 'web' | 'desktop'
const tools: { id: Tool; label: string; mark: string }[] = [{ id: 'chatgpt', label: 'ChatGPT', mark: 'CG' }, { id: 'gemini', label: 'Gemini', mark: 'GM' }]
const platforms: { id: Platform; label: string; en: string }[] = [{ id: 'web', label: '網頁版', en: 'WEB' }, { id: 'desktop', label: '桌面版', en: 'DESKTOP' }]
const toolSeries: Record<Tool, Record<Platform, SeriesId>> = {
  chatgpt: { web: 'chatgpt-web', desktop: 'chatgpt-desktop' },
  gemini: { web: 'gemini-web', desktop: 'gemini-desktop' },
}
const topicSeries: SeriesId[] = ['literacy', 'agent-learning', 'agent-research']
const agentTrack: Partial<Record<SeriesId, 'agent-learning' | 'agent-research'>> = { 'agent-learning': 'agent-learning', 'agent-research': 'agent-research' }

/** Old links used ?series=…; they still open the right tool and version. */
function readSelection(query: URLSearchParams): { tool: Tool; platform: Platform } {
  const legacy = query.get('series')
  for (const tool of tools) for (const platform of platforms) if (toolSeries[tool.id][platform.id] === legacy) return { tool: tool.id, platform: platform.id }
  const tool = tools.some(item => item.id === query.get('tool')) ? query.get('tool') as Tool : 'chatgpt'
  const platform = platforms.some(item => item.id === query.get('platform')) ? query.get('platform') as Platform : 'web'
  return { tool, platform }
}

function SeriesList({ seriesId }: { seriesId: SeriesId }) {
  const info = seriesById[seriesId]
  const list = videos.filter(video => video.seriesId === seriesId)
  const track = agentTrack[seriesId]
  if (list.length) return <div className="video-list">{list.map((video, index) => <VideoRow key={video.id} video={video} order={index + 1} />)}</div>
  return <div className="series-empty">
    <div className="series-empty-art" aria-hidden="true"><span className="mono">{info.en}</span><i /><i /><i /></div>
    <div>
      <span className="status-chip is-planned">未來規劃</span>
      <h3>{info.label}影片尚待規劃</h3>
      <p>{info.emptyNote}</p>
      {track && <ul className="link-list">{lessonsInTrack(track).map(lesson => <li key={lesson.id}><a href={href(`learn/${lesson.id}`)}><span><span className="mono">{lesson.code}</span> {lesson.title}</span></a></li>)}</ul>}
    </div>
  </div>
}

function VideoDetail({ video, from }: { video: Video; from?: string }) {
  const lessons = lessonsForVideo(video)
  const fromLesson = from ? lessonById[from] : undefined
  const siblings = videos.filter(item => item.seriesId === video.seriesId)
  const index = siblings.findIndex(item => item.id === video.id)
  const prompts = lessons.flatMap(lesson => promptsForLesson(lesson)).slice(0, 5)
  const backQuery = video.tool === 'chatgpt' || video.tool === 'gemini' ? { tool: video.tool, platform: video.platform === 'desktop' ? 'desktop' : 'web' } : undefined
  return <div className="page-body video-detail">
    <nav className="back-row" aria-label="返回">
      {fromLesson
        ? <a className="btn btn-small" href={href(`learn/${fromLesson.id}`)} onClick={event => { if (history.length > 1) { event.preventDefault(); history.back() } }}>← 返回單元 {fromLesson.code}「{fromLesson.title}」</a>
        : <a className="btn btn-small" href={href('videos', backQuery)}>← 返回{seriesById[video.seriesId].label}</a>}
    </nav>
    <div className="video-detail-grid">
      <div className="video-stage">
        <VideoPlayer video={video} />
        <header className="video-detail-head">
          <p className="video-row-meta mono"><span>UNIT {video.code}</span><span>{seriesById[video.seriesId].label}</span>{video.durationText && <span>{video.durationText}</span>}</p>
          <h1>{video.title}</h1>
          <p>{video.description}</p>
          <StatusChip video={video} />
        </header>
      </div>
      <aside className="video-side">
        <section className="side-panel is-accent">
          <span className="kicker">Read the lesson</span>
          {lessons.map(lesson => <a key={lesson.id} className="side-lesson" href={href(`learn/${lesson.id}`)}><small className="mono">UNIT {lesson.code}</small><strong>{lesson.title}</strong><span>閱讀完整教材、步驟與練習<span className="arrow" aria-hidden="true" /></span></a>)}
        </section>
        <section className="side-panel"><span className="kicker">Learning points</span><ul className="check-list">{video.learningObjectives.map(item => <li key={item}>{item}</li>)}</ul></section>
        {prompts.length > 0 && <section className="side-panel"><span className="kicker">Prompts for this unit</span><ul className="link-list">{prompts.map(prompt => <li key={prompt.id}><a href={href(`prompts/${prompt.id}`)}><span>{prompt.title}</span></a></li>)}</ul></section>}
        <section className="side-panel"><span className="kicker">Source</span><p className="small muted">{video.transcriptOrScriptReference}</p></section>
      </aside>
    </div>
    <nav className="lesson-pager" aria-label="同系列上一支／下一支影片">
      {index > 0 ? <a href={href(`videos/${siblings[index - 1].id}`)}><small className="mono">← PREV</small>{siblings[index - 1].code}｜{siblings[index - 1].title}</a> : <span />}
      {index < siblings.length - 1 ? <a className="is-next" href={href(`videos/${siblings[index + 1].id}`)}><small className="mono">NEXT →</small>{siblings[index + 1].code}｜{siblings[index + 1].title}</a> : <span />}
    </nav>
  </div>
}

export function VideosPage({ route }: { route: Route }) {
  const videoId = route.path[1]
  const video = videoId ? videoById[videoId] : undefined
  const { tool, platform } = readSelection(route.query)
  const seriesId = toolSeries[tool][platform]
  const toolSwitch = useIndicator<HTMLDivElement>('[aria-current=true]', '.switch-plate', [tool, Boolean(video)])
  const platformTabs = useIndicator<HTMLDivElement>('[aria-current=true]', '.line-tabs-ink', [tool, platform, Boolean(video)])
  // Switching tools or versions is not a new page, so keep the reader where the menu is.
  useScrollRestore(route, true, { keepOnQueryChange: true })
  useEffect(() => { if (videoId && !video) navigate('videos', undefined, { replace: true }) }, [videoId, video])

  if (video) return <div className="page videos-page"><VideoDetail video={video} from={route.query.get('from') ?? undefined} /></div>

  const counts = { published: videos.filter(isPlayable).length, preparing: videos.filter(item => item.status === 'preparing').length }
  const select = (next: { tool?: Tool; platform?: Platform }) => href('videos', { tool: next.tool ?? tool, platform: next.platform ?? platform })
  return <div className="page videos-page">
    <header className="page-head">
      <span className="kicker"><b>02</b> Video lessons</span>
      <h1>學習影片</h1>
      <p className="page-lead">先選擇 AI 工具，再選擇使用版本。每支影片都連到對應的知識教材。目前登錄 {videos.length} 支：{statusLabel.published} {counts.published}、{statusLabel.preparing} {counts.preparing}。</p>
    </header>

    <div className="page-body">
      <section className="video-browser" aria-label="依工具與版本瀏覽影片">
        <div className="video-menu">
          <div ref={toolSwitch} className="switch is-large" role="group" aria-label="選擇 AI 工具">
            <i className="switch-plate" aria-hidden="true" />
            {tools.map(item => <a key={item.id} className="switch-option" href={select({ tool: item.id })} aria-current={tool === item.id ? 'true' : undefined}><span className="tool-glyph">{item.mark}</span>{item.label}</a>)}
          </div>
          <div ref={platformTabs} className="line-tabs" role="group" aria-label={`${tools.find(item => item.id === tool)?.label} 的使用版本`}>
            {platforms.map(item => <a key={item.id} className="line-tab" href={select({ platform: item.id })} aria-current={platform === item.id ? 'true' : undefined}>{item.label}<small>{videos.filter(entry => entry.seriesId === toolSeries[tool][item.id]).length}</small></a>)}
            <i className="line-tabs-ink" aria-hidden="true" />
          </div>
        </div>
        <div key={seriesId} className="series-panel page-enter" aria-live="polite">
          <header className="series-head">
            <span className="kicker"><b>{seriesById[seriesId].en}</b></span>
            <h2>{seriesById[seriesId].label}教學</h2>
            <p>{seriesById[seriesId].description}</p>
          </header>
          <SeriesList seriesId={seriesId} />
        </div>
      </section>

      <section className="topic-series" aria-labelledby="topic-title">
        <header className="section-head is-row">
          <div><span className="kicker"><b>+</b> Cross-tool series</span><h2 id="topic-title">專題學習系列</h2></div>
          <p>不限定單一工具的課程：AI 素養與學術倫理，以及 AI Agent 兩大學習方向。</p>
        </header>
        {topicSeries.map(id => <div key={id} className="topic-block">
          <header className="series-head is-compact"><span className="kicker"><b>{seriesById[id].en}</b></span><h3>{seriesById[id].label}</h3><p>{seriesById[id].description}</p></header>
          <SeriesList seriesId={id} />
        </div>)}
      </section>
    </div>
  </div>
}
