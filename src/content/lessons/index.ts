import type { Lesson, TrackId } from '../types'
import { chatgptLessons } from './chatgpt'
import { geminiLessons } from './gemini'
import { literacyLessons } from './literacy'
import { agentLearningLessons } from './agentLearning'
import { agentResearchLessons } from './agentResearch'

export interface Track {
  id: TrackId
  label: string
  short: string
  en: string
  description: string
  audience: string
}

/** Order here is the order of the knowledge page's track selector. */
export const tracks: Track[] = [
  { id: 'chatgpt-desktop', label: 'ChatGPT 桌面版', short: 'ChatGPT', en: 'CHATGPT · DESKTOP', description: '桌面版教材尚待規劃；內容確定後會在此新增。', audience: '所有學生' },
  { id: 'gemini-desktop', label: 'Gemini 桌面版', short: 'Gemini', en: 'GEMINI · DESKTOP', description: '桌面版教材尚待規劃；內容確定後會在此新增。', audience: '所有學生' },
  { id: 'chatgpt-web', label: 'ChatGPT 網頁版', short: 'ChatGPT', en: 'CHATGPT', description: '從介面操作、提問技巧到使用資料與查核來源，三個單元對應 A01–A03 影片。', audience: '所有學生' },
  { id: 'gemini-web', label: 'Gemini 網頁版', short: 'Gemini', en: 'GEMINI', description: '從第一次提問、文件與 Canvas、Deep Research 到建立自己的 Gem，三個單元對應 B01–B03 影片。', audience: '所有學生' },
  { id: 'literacy', label: 'AI 素養與學術倫理', short: '素養與倫理', en: 'LITERACY & ETHICS', description: '跨工具共通課程：理解 AI 如何產生回答、判斷可信度，並在學習與作業中負責任地使用 AI。', audience: '所有學生' },
  { id: 'agent-learning', label: 'AI Agent 自主學習與專題實作', short: 'Agent 專題實作', en: 'AGENT · LEARNING', description: '運用 AI Agent 拆解任務、安排學習、整理資料與完成專題成果，同時建立人機協作與審查習慣。', audience: '臺北市立大學學生' },
  { id: 'agent-research', label: 'AI Agent 學術研究應用', short: 'Agent 學術研究', en: 'AGENT · RESEARCH', description: '把 AI Agent 放進研究流程：問題發想、文獻檢索與整理、研究設計、資料分析、學術寫作與研究倫理。', audience: '研究生及有研究需求的學生' },
]

export const lessons: Lesson[] = [...chatgptLessons, ...geminiLessons, ...literacyLessons, ...agentLearningLessons, ...agentResearchLessons]
export const lessonById: Record<string, Lesson> = Object.fromEntries(lessons.map(lesson => [lesson.id, lesson]))
export const trackById = Object.fromEntries(tracks.map(track => [track.id, track])) as Record<TrackId, Track>
export const lessonsInTrack = (track: TrackId) => lessons.filter(lesson => lesson.track === track)
