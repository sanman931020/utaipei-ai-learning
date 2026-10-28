/**
 * Shared content model. Videos, lessons and prompts reference each other only by id,
 * so a video URL or a lesson title is edited in exactly one place.
 */

/** 已上架 / 準備中 / 未來規劃 */
export type VideoStatus = 'published' | 'preparing' | 'planned'

export type ToolId = 'chatgpt' | 'gemini' | 'common' | 'agent'

/** A learning track groups lessons; it is what the knowledge page switches between. */
export type TrackId = 'chatgpt-desktop' | 'gemini-desktop' | 'chatgpt-web' | 'gemini-web' | 'literacy' | 'agent-learning' | 'agent-research'

export type SeriesId = 'chatgpt-web' | 'gemini-web' | 'chatgpt-desktop' | 'gemini-desktop' | 'literacy' | 'agent-learning' | 'agent-research'

export type VideoSource =
  /** A file under public/videos, e.g. "videos/A01.mp4". */
  | { kind: 'mp4'; src: string }
  /** The 11-character YouTube id; played through youtube-nocookie.com only after the viewer presses play. */
  | { kind: 'youtube'; id: string }

export interface Video {
  id: string
  seriesId: SeriesId
  tool: ToolId
  platform: 'web' | 'desktop' | 'any'
  /** Official unit code such as A01. Never renumber. */
  code: string
  title: string
  description: string
  learningObjectives: string[]
  /** Lessons that teach the same topic; the lesson page embeds this video. */
  lessonIds: string[]
  /** Leave undefined until the real file or link exists. */
  videoUrl?: VideoSource
  /** Path under public/, e.g. "thumbnails/A01.jpg". */
  thumbnail?: string
  durationText?: string
  status: VideoStatus
  /** Where the content of this video comes from. */
  transcriptOrScriptReference: string
}

export interface Series {
  id: SeriesId
  label: string
  en: string
  description: string
  /** Shown when a series has no videos registered yet. */
  emptyNote?: string
}

/** Where a section's content comes from. The page shows this as a label so extensions are never presented as video content. */
export type SectionOrigin = 'script' | 'extension'

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'steps'; items: { title: string; text: string }[] }
  /** A left-to-right process diagram. */
  | { kind: 'flow'; title?: string; items: { label: string; text?: string }[] }
  | { kind: 'cards'; items: { title: string; text: string; meta?: string }[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  /** A good/weak comparison, e.g. a vague prompt next to a clear one. */
  | { kind: 'compare'; weak: { label?: string; text: string }; strong: { label?: string; text: string }; note?: string }
  | { kind: 'note'; title: string; text: string; tone?: 'info' | 'warn' | 'ethics' }
  | { kind: 'pending'; title: string; text: string }

export interface LessonSection {
  id: string
  title: string
  origin: SectionOrigin
  blocks: Block[]
}

export interface Lesson {
  id: string
  track: TrackId
  tool: ToolId
  /** Unit code: A01 / B02 / C01 for video units, L01 / R01 for AI Agent modules. */
  code: string
  title: string
  subtitle?: string
  level: Difficulty
  audience?: string
  summary: string
  learningObjectives: string[]
  /** 核心概念 */
  concepts: LessonSection[]
  /** 實際操作步驟 */
  steps: LessonSection[]
  /** 使用示例 */
  examples: { title: string; scenario: string; prompt?: string; note?: string }[]
  /** 常見錯誤與注意事項 */
  mistakes: { mistake: string; fix: string }[]
  /** 延伸學習或進階應用 */
  extension: LessonSection[]
  /** 自主練習任務 */
  practice: { title: string; tasks: string[]; check?: string[] }
  relatedVideoIds: string[]
  relatedPromptIds: string[]
  /** For modules without a video yet: the title the future video is planned under. */
  plannedVideoTitle?: string
  sourceReference: string
  extensionNotes: string
}

export type Difficulty = '入門' | '進階' | '研究應用'

export type PromptCategoryId =
  | 'study' | 'slides' | 'image' | 'video' | 'research' | 'literature' | 'methods' | 'data' | 'writing'
  | 'english' | 'code' | 'agent' | 'teaching' | 'audio' | 'admin' | 'career' | 'creative' | 'ethics'

export interface PromptCategory {
  id: PromptCategoryId
  label: string
  /** Short label for chips and card headers. */
  short: string
  /** Two-letter code shown in place of an emoji icon. */
  code: string
  description: string
}

export type SupportedTool = 'ChatGPT' | 'Gemini' | '通用'

export interface PromptFormField {
  group: string
  label: string
  /** Exact placeholder name, without brackets. */
  placeholder: string
  type: 'text' | 'number' | 'textarea' | 'select' | 'multiselect'
  options?: string[]
}

export interface PromptItem {
  form?: PromptFormField[]
  id: string
  title: string
  category: PromptCategoryId
  subcategory: string
  description: string
  /** Full prompt text. Placeholders are written as [名稱] and can be filled in on the page. */
  content: string
  tags: string[]
  /** Extra search terms, including English names and synonyms. */
  keywords: string[]
  supportedTools: SupportedTool[]
  difficulty: Difficulty
  relatedLessonIds: string[]
  featured?: boolean
  /** Shown above the prompt, e.g. reminders to verify references. */
  caution?: string
  /** Order of addition; higher is newer. */
  addedOrder: number
}
