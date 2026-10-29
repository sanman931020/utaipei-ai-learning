import type { Difficulty, PromptCategoryId, PromptItem, SupportedTool } from '../content/types'

/** Each group lists words people use for the same thing; typing any one also finds the others. */
const synonymGroups: string[][] = [
  ['簡報', 'ppt', 'powerpoint', '投影片', 'slides', 'slide', 'presentation', 'keynote'],
  ['圖片', '照片', '影像', 'image', 'photo', 'picture', '圖像', '插圖', 'illustration', '生圖'],
  ['影片', 'video', '短影音', 'youtube', 'reels', '剪輯'],
  ['分鏡', 'storyboard', '腳本', 'script', '鏡頭'],
  ['論文', 'paper', 'thesis', '學位論文', '期刊'],
  ['文獻', 'literature', '文獻回顧', 'literature review', '參考文獻', 'reference', 'references', '引用', 'citation'],
  ['資料分析', '數據分析', 'data analysis', '統計', 'statistics', 'spss'],
  ['表格', '試算表', 'excel', 'spreadsheet', 'sheet', '樞紐分析'],
  ['研究方法', 'research method', 'methodology', '研究設計', '質性', '量化', '混合研究'],
  ['讀書計畫', '學習計畫', 'study plan', '讀書', '考試', '複習', '時間管理'],
  ['ai agent', 'agent', '代理', '智慧代理', 'ai 代理', '自動化', 'workflow', '工作流程'],
  ['程式', 'code', 'coding', 'programming', 'python', '程式設計', '網站', 'website', 'html', 'css', 'javascript'],
  ['寫作', 'writing', '作文', '文章', '報告', 'essay', 'report'],
  ['履歷', 'resume', 'cv', '求職', '面試', 'interview', '職涯', 'career'],
  ['逐字稿', 'transcript', '字幕', 'subtitle', 'caption', '語音', '配音', 'voiceover', 'podcast'],
  ['查核', 'fact check', 'fact-check', '事實查核', '來源', 'source', '驗證'],
  ['倫理', 'ethics', '學術倫理', '誠信', 'integrity', '揭露', 'disclosure', '抄襲', 'plagiarism'],
  ['摘要', 'summary', 'summarize', '重點整理'],
  ['海報', 'poster', '視覺設計', 'infographic', '資訊圖表'],
  ['教案', 'lesson plan', '教學設計', '課程設計', '試教', '教甄', '教學演示', '微型教學', 'microteaching', '教學活動'],
  ['問卷', 'survey', 'questionnaire', '量表'],
  ['照片', '攝影', '相片', '拍照', 'photo', 'photography', '產品攝影', '商業攝影', '人物攝影', '修圖', '編修', '調色'],
  ['簡報', '口頭報告', '上台', '發表', 'pitch', '學術海報'],
  ['研究', 'research', '研究問題', '研究設計'],
  ['英文', 'english', '英語', '翻譯', 'translation', '多益', 'toeic', '雅思', 'ielts', '托福', 'toefl', '口說'],
  ['教學', 'teaching', '教案', '學習單', '評量', 'rubric', '課程', '教材'],
  ['行政', '公文', '簽呈', '會議', '議程', '信件', 'email', '邀請函', '企劃書', '核銷'],
  ['行銷', 'marketing', '社群', '貼文', '文案', 'slogan', '標語', '品牌', '宣傳'],
  ['logo', '標誌', '識別', '商標'],
  ['app', '應用程式', '手機程式', 'react', '前端'],
  ['統計', '迴歸', 'regression', '卡方', 't 檢定', 'anova', '效果量', '信度'],
  ['deep research', '深度研究'],
  ['gem', 'gems', '固定指示'],
  ['canvas', '畫布'],
]

const normalize = (text: string) => text.toLowerCase().normalize('NFKC').replace(/\s+/g, ' ').trim()

/** Expands one search term into itself plus the synonyms of every group it names. */
export function expandTerm(term: string): string[] {
  const value = normalize(term)
  const expanded = new Set([value])
  for (const group of synonymGroups) if (group.includes(value)) group.forEach(word => expanded.add(word))
  return [...expanded]
}

const searchableText = (prompt: PromptItem, categoryLabel: string) => normalize([prompt.title, prompt.description, prompt.content, prompt.subcategory, categoryLabel, ...prompt.tags, ...prompt.keywords, ...prompt.supportedTools].join(' '))

/**
 * Every term must match, directly or through a synonym. Terms are split on spaces; a query typed
 * as one phrase ("ai agent", "literature review") is also tried whole. Returns a relevance score, 0 = no match.
 */
export function scorePrompt(prompt: PromptItem, query: string, categoryLabel = ''): number {
  const whole = normalize(query)
  if (!whole) return 1
  const haystack = searchableText(prompt, categoryLabel)
  const title = normalize(prompt.title)
  const tags = normalize([...prompt.tags, ...prompt.keywords, prompt.subcategory].join(' '))
  const scoreTerms = (terms: string[]) => {
    let score = 0
    for (const term of terms) {
      const variants = expandTerm(term)
      if (!variants.some(variant => haystack.includes(variant))) return 0
      score += 1
      if (variants.some(variant => title.includes(variant))) score += 4
      if (variants.some(variant => tags.includes(variant))) score += 2
      if (title.includes(term)) score += 2
    }
    return score
  }
  return Math.max(scoreTerms(whole.split(' ')), whole.includes(' ') ? scoreTerms([whole]) : 0)
}

export type PromptSort = 'recommended' | 'title' | 'newest'

export interface PromptFilters {
  query: string
  category: PromptCategoryId | 'all'
  /** Only applies together with a category. */
  subcategory: string
  tool: SupportedTool | 'all'
  difficulty: Difficulty | 'all'
  sort: PromptSort
  favoritesOnly: boolean
}

export const defaultFilters: PromptFilters = { query: '', category: 'all', subcategory: '', tool: 'all', difficulty: 'all', sort: 'recommended', favoritesOnly: false }

export function filterPrompts(items: PromptItem[], filters: PromptFilters, categoryLabel: (id: PromptCategoryId) => string, favorites: string[] = []): PromptItem[] {
  const scored = items
    .filter(item => filters.category === 'all' || item.category === filters.category)
    .filter(item => !filters.subcategory || filters.category === 'all' || item.subcategory === filters.subcategory)
    // A prompt marked 通用 works in any chat tool, so it stays visible under ChatGPT and Gemini.
    .filter(item => filters.tool === 'all' || item.supportedTools.includes(filters.tool) || (filters.tool !== '通用' && item.supportedTools.includes('通用')))
    .filter(item => filters.difficulty === 'all' || item.difficulty === filters.difficulty)
    .filter(item => !filters.favoritesOnly || favorites.includes(item.id))
    .map((item, index) => ({ item, index, score: scorePrompt(item, filters.query, categoryLabel(item.category)) }))
    .filter(entry => entry.score > 0)
  scored.sort((a, b) => {
    if (filters.sort === 'title') return a.item.title.localeCompare(b.item.title, 'zh-Hant-TW')
    if (filters.sort === 'newest') return b.item.addedOrder - a.item.addedOrder || b.index - a.index
    const formPriority = Number(Boolean(b.item.form)) - Number(Boolean(a.item.form))
    if (formPriority) return formPriority
    if (filters.query.trim() && b.score !== a.score) return b.score - a.score
    return Number(Boolean(b.item.featured)) - Number(Boolean(a.item.featured)) || a.index - b.index
  })
  return scored.map(entry => entry.item)
}

const placeholderPattern = /\[([^[\]\n]{1,40})\]/g

/** Placeholders written as [名稱] in the prompt text, in order of first appearance. */
export function placeholdersOf(content: string): string[] {
  return [...new Set([...content.matchAll(placeholderPattern)].map(match => match[1].trim()))]
}

/** Replaces filled placeholders; empty ones stay as [名稱] so an unfilled template is never mistaken for a finished prompt. */
export function fillPlaceholders(content: string, values: Record<string, string>): string {
  return content.replace(placeholderPattern, (whole, name: string) => values[name.trim()]?.trim() || whole)
}
