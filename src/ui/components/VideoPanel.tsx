import { useState } from 'react'
import type { Video } from '../../content/types'
import { isPlayable, seriesById, statusLabel } from '../../content/videos'
import { href } from '../../lib/router'
import { rememberRecent } from '../../lib/storage'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

/**
 * The player. Nothing is downloaded until the viewer presses play: MP4 files use preload="none",
 * and YouTube loads from youtube-nocookie.com only after the click.
 */
export function VideoPlayer({ video }: { video: Video }) {
  const [started, setStarted] = useState(false)
  if (!isPlayable(video) || !video.videoUrl) return <VideoPending video={video} />
  const source = video.videoUrl
  const start = () => { setStarted(true); rememberRecent('recent-videos', video.id) }
  if (source.kind === 'mp4') return <div className="video-frame">
    <video controls preload="none" playsInline poster={video.thumbnail ? asset(video.thumbnail) : undefined} src={asset(source.src)} onPlay={() => rememberRecent('recent-videos', video.id)}>
      你的瀏覽器不支援影片播放，請改用最新版瀏覽器。
    </video>
  </div>
  return <div className="video-frame">
    {started
      ? <iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(source.id)}?autoplay=1&rel=0`} title={`${video.code} ${video.title}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" loading="lazy" />
      : <button type="button" className="video-cover" onClick={start} aria-label={`播放 ${video.code}「${video.title}」（將載入 YouTube）`}>
        {video.thumbnail && <img src={asset(video.thumbnail)} alt="" loading="lazy" />}
        <span className="video-play" aria-hidden="true">▶</span>
        <small>按下播放後才會連線至 YouTube（隱私加強模式）</small>
      </button>}
  </div>
}

/** Shown instead of a player while a video has no real source; never a fake player. */
export function VideoPending({ video }: { video: Video }) {
  return <div className={`video-frame video-pending is-${video.status}`} role="img" aria-label={`${video.code}「${video.title}」：${statusLabel[video.status]}`}>
    <div>
      <span className="status-chip">{statusLabel[video.status]}</span>
      <strong>{video.code}｜{video.title}</strong>
      <p>{video.status === 'planned' ? '此影片列於未來規劃，完成後會在此直接播放。' : '影片正在製作中，上架後會在此直接播放；現在可以先閱讀對應的知識教材。'}</p>
    </div>
  </div>
}

export function StatusChip({ video }: { video: Video }) {
  return <span className={`status-chip is-${video.status}`}>{statusLabel[video.status]}</span>
}

/** The video block inside a lesson: the player (or its status) and a link to the full video page. */
export function LessonVideo({ video, lessonId }: { video: Video; lessonId: string }) {
  return <div className="lesson-video">
    <VideoPlayer video={video} />
    <div className="lesson-video-meta">
      <small>{seriesById[video.seriesId].label}・{video.code}</small>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
      <div className="row-actions"><StatusChip video={video} /><a className="text-link" href={href(`videos/${video.id}`, { from: lessonId })}>影片頁面與學習重點 →</a></div>
    </div>
  </div>
}
