import type { Video } from '../../content/types'
import { isPlayable, seriesById } from '../../content/videos'
import { lessonsForVideo } from '../../content/relations'
import { href } from '../../lib/router'
import { StatusChip } from './VideoPanel'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const toolMark: Record<Video['tool'], string> = { chatgpt: 'CG', gemini: 'GM', common: 'AI', agent: 'AG' }

/**
 * The cover. A real thumbnail and play mark only when the video can actually be played;
 * otherwise a typographic cover that states the unit and its status.
 */
export function VideoCover({ video }: { video: Video }) {
  const playable = isPlayable(video)
  return <span className={`video-cover-art is-${video.tool} ${playable ? 'is-playable' : 'is-pending'}`}>
    {playable && video.thumbnail && <img src={asset(video.thumbnail)} alt="" loading="lazy" />}
    <span className="cover-grid" aria-hidden="true" />
    <span className="cover-mark mono" aria-hidden="true">{toolMark[video.tool]}</span>
    <span className="cover-code mono">{video.code}</span>
    {playable ? <span className="cover-play" aria-hidden="true" /> : <span className="cover-state mono">IN PRODUCTION</span>}
    {video.durationText && <span className="cover-duration mono">{video.durationText}</span>}
  </span>
}

/** Compact tile used in the home page rail. */
export function VideoTile({ video, index }: { video: Video; index: number }) {
  return <a className="video-tile" href={href(`videos/${video.id}`)}>
    <VideoCover video={video} />
    <span className="video-tile-body">
      <small className="mono">{String(index + 1).padStart(2, '0')} · {seriesById[video.seriesId].label}</small>
      <b>{video.title}</b>
      <StatusChip video={video} />
    </span>
  </a>
}

/** A full row on the video page: order, title, learning points, status and both entry points. */
export function VideoRow({ video, order }: { video: Video; order: number }) {
  const lesson = lessonsForVideo(video)[0]
  const playable = isPlayable(video)
  return <article className={`video-row is-${video.tool}`}>
    <span className="video-row-order mono" aria-hidden="true">{String(order).padStart(2, '0')}</span>
    <a className="video-row-cover" href={href(`videos/${video.id}`)} tabIndex={-1} aria-hidden="true"><VideoCover video={video} /></a>
    <div className="video-row-body">
      <p className="video-row-meta mono"><span>UNIT {video.code}</span><span>{seriesById[video.seriesId].label}</span></p>
      <h3><a href={href(`videos/${video.id}`)}>{video.title}</a></h3>
      <p>{video.description}</p>
      <ul className="video-points" aria-label="教學重點">{video.learningObjectives.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul>
    </div>
    <div className="video-row-actions">
      <StatusChip video={video} />
      <a className={`btn btn-small ${playable ? 'btn-primary' : ''}`} href={href(`videos/${video.id}`)}>{playable ? '觀看影片' : '影片資訊'}<span className="arrow" aria-hidden="true" /></a>
      {lesson && <a className="text-link" href={href(`learn/${lesson.id}`)}>閱讀對應知識<span className="arrow" aria-hidden="true" /></a>}
    </div>
  </article>
}
