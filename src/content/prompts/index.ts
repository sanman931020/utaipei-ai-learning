import type { PromptCategory, PromptCategoryId, PromptItem } from '../types'
import { studyPrompts } from './study'
import { studyMorePrompts } from './studyMore'
import { slidesPrompts } from './slides'
import { slidesMorePrompts } from './slidesMore'
import { imagePrompts } from './image'
import { imageMorePrompts } from './imageMore'
import { videoPrompts } from './video'
import { videoMorePrompts } from './videoMore'
import { researchPrompts } from './research'
import { researchMorePrompts } from './researchMore'
import { literaturePrompts } from './literature'
import { methodsPrompts } from './methods'
import { dataPrompts } from './data'
import { dataMorePrompts } from './dataMore'
import { writingPrompts } from './writing'
import { writingMorePrompts } from './writingMore'
import { englishPrompts } from './english'
import { codePrompts } from './code'
import { codeMorePrompts } from './codeMore'
import { agentPrompts } from './agent'
import { agentMorePrompts } from './agentMore'
import { teachingPrompts } from './teaching'
import { teachingPlanPrompts } from './teachingPlans'
import { audioPrompts } from './audio'
import { audioMorePrompts } from './audioMore'
import { adminPrompts } from './admin'
import { careerPrompts } from './career'
import { careerMorePrompts } from './careerMore'
import { creativePrompts } from './creative'
import { ethicsPrompts } from './ethics'
import { ethicsMorePrompts } from './ethicsMore'

/** Order here is the order of the category strip and the filter menu. */
export const promptCategories: PromptCategory[] = [
  { id: 'study', label: '自主學習、讀書計畫與考試準備', short: '自主學習', code: 'ST', description: '讀書計畫、考試準備、複習、筆記與自我檢核。' },
  { id: 'slides', label: '簡報設計、PPT 與口頭報告', short: '簡報', code: 'SL', description: '簡報架構、投影片文字、講稿與上台演練。' },
  { id: 'image', label: 'AI 圖片生成與視覺設計', short: '圖片生成', code: 'IM', description: '攝影、插畫、海報、Logo、資訊圖表與圖片修改。' },
  { id: 'video', label: '影片企劃、腳本、分鏡與剪輯', short: '影片製作', code: 'VD', description: '企劃、分鏡、旁白、字幕、鏡頭與剪輯節奏。' },
  { id: 'research', label: '學術研究與論文寫作', short: '學術研究', code: 'RS', description: '研究問題、架構、假設、論文章節與研究限制。' },
  { id: 'literature', label: '文獻檢索、文獻回顧與引用', short: '文獻', code: 'LT', description: '檢索策略、文獻整理、矩陣、回顧撰寫與引用格式。' },
  { id: 'methods', label: '研究方法與研究設計', short: '研究方法', code: 'MT', description: '量化、質性、混合研究、抽樣、工具與效度。' },
  { id: 'data', label: '統計分析、資料處理與視覺化', short: '資料分析', code: 'DA', description: '資料清理、統計檢定、試算表與圖表。' },
  { id: 'writing', label: '文字撰寫、校對與改寫', short: '寫作', code: 'WR', description: '大綱、段落、校對、語氣與精簡。' },
  { id: 'english', label: '英文學習、翻譯與語言應用', short: '英文', code: 'EN', description: '英文寫作、口說、翻譯、學術英文與檢定準備。' },
  { id: 'code', label: '程式設計、網站與 App 開發', short: '程式開發', code: 'CD', description: '需求規劃、除錯、測試、網站與 App。' },
  { id: 'agent', label: 'AI Agent、任務自動化與工作流程', short: 'AI Agent', code: 'AG', description: '任務規劃、工具調用、工作流程與結果驗證。' },
  { id: 'teaching', label: '教育教學、課程與教材設計', short: '教學設計', code: 'TC', description: '教案、學習活動、評量、差異化與教材。' },
  { id: 'audio', label: '聲音製作、配音與逐字稿', short: '聲音', code: 'AU', description: '配音稿、逐字稿、Podcast 與會議紀錄。' },
  { id: 'admin', label: '行政文書與工作效率', short: '行政效率', code: 'AD', description: '公文、會議、信件、企劃與時間管理。' },
  { id: 'career', label: '履歷、面試與職涯規劃', short: '職涯', code: 'CR', description: '履歷、求職信、面試與能力規劃。' },
  { id: 'creative', label: '創意發想、行銷與社群內容', short: '創意行銷', code: 'CT', description: '點子發想、活動宣傳、社群貼文與品牌文案。' },
  { id: 'ethics', label: 'AI 素養、資訊查核與學術倫理', short: 'AI 素養', code: 'ET', description: '事實查核、偏誤、隱私與 AI 使用揭露。' },
]

export const prompts: PromptItem[] = [
  ...studyPrompts, ...studyMorePrompts, ...slidesPrompts, ...slidesMorePrompts, ...imagePrompts, ...imageMorePrompts,
  ...videoPrompts, ...videoMorePrompts, ...researchPrompts, ...researchMorePrompts, ...literaturePrompts, ...methodsPrompts,
  ...dataPrompts, ...dataMorePrompts, ...writingPrompts, ...writingMorePrompts, ...englishPrompts, ...codePrompts, ...codeMorePrompts,
  ...agentPrompts, ...agentMorePrompts, ...teachingPrompts, ...teachingPlanPrompts, ...audioPrompts, ...audioMorePrompts, ...adminPrompts,
  ...careerPrompts, ...careerMorePrompts, ...creativePrompts, ...ethicsPrompts, ...ethicsMorePrompts,
]

export const promptById: Record<string, PromptItem> = Object.fromEntries(prompts.map(prompt => [prompt.id, prompt]))
export const categoryById = Object.fromEntries(promptCategories.map(category => [category.id, category])) as Record<PromptCategoryId, PromptCategory>
