import type { Lesson, PromptItem, Video } from './types'
import { lessonById, lessons } from './lessons'
import { promptById, prompts } from './prompts'
import { videoById, videos } from './videos'

/** Prompts linked to a lesson from either side: the lesson's own list first, then prompts that name the lesson. */
export function promptsForLesson(lesson: Lesson): PromptItem[] {
  const explicit = lesson.relatedPromptIds.map(id => promptById[id]).filter(Boolean)
  const linked = prompts.filter(prompt => prompt.relatedLessonIds.includes(lesson.id) && !lesson.relatedPromptIds.includes(prompt.id))
  return [...explicit, ...linked]
}

/** Videos for a lesson, from the lesson's ids and from each video's lessonIds. */
export function videosForLesson(lesson: Lesson): Video[] {
  const ids = new Set([...lesson.relatedVideoIds, ...videos.filter(video => video.lessonIds.includes(lesson.id)).map(video => video.id)])
  return [...ids].map(id => videoById[id]).filter(Boolean)
}

export function lessonsForVideo(video: Video): Lesson[] {
  const ids = new Set([...video.lessonIds, ...lessons.filter(lesson => lesson.relatedVideoIds.includes(video.id)).map(lesson => lesson.id)])
  return [...ids].map(id => lessonById[id]).filter(Boolean)
}

export function lessonsForPrompt(prompt: PromptItem): Lesson[] {
  const ids = new Set([...prompt.relatedLessonIds, ...lessons.filter(lesson => lesson.relatedPromptIds.includes(prompt.id)).map(lesson => lesson.id)])
  return [...ids].map(id => lessonById[id]).filter(Boolean)
}
