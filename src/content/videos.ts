import type { Series, SeriesId, Video } from './types'

const scriptRef = (code: string) => `影片 ${code} 規劃大綱（開發指令所列主題）；正式腳本《生成式ai使用教學影片.docx》待核對`

/**
 * The single source for every video. Lesson pages and the video page both read this list,
 * so publishing a video means setting `videoUrl`, `thumbnail` and `status: 'published'` here only.
 */
export const videos: Video[] = [
  {
    id: 'A01', seriesId: 'chatgpt-web', tool: 'chatgpt', platform: 'web', code: 'A01',
    title: '認識 ChatGPT：介面與基本功能',
    description: '從打開 ChatGPT 網頁開始，認識主要操作介面、對話紀錄、輸入與附件入口、模型與回答設定，並完成第一次提問。',
    learningObjectives: ['認識頁面及主要操作介面', '建立新對話並找回歷史紀錄', '找到輸入區、附件、搜尋與語音入口', '了解模型與回答設定、使用偏好', '完成第一次提問與基本操作練習'],
    lessonIds: ['chatgpt-a01'], status: 'preparing', transcriptOrScriptReference: scriptRef('A01'),
  },
  {
    id: 'A02', seriesId: 'chatgpt-web', tool: 'chatgpt', platform: 'web', code: 'A02',
    title: '學會提問：讓回答更符合需求',
    description: '把需求說清楚：說明任務、補充背景、指定格式，並透過追問與修正讓回答逐步接近你要的結果。',
    learningObjectives: ['清楚說明任務並補充背景與需求', '指定回答格式', '用追問與修正調整回答', '資訊不足時請 AI 先釐清', '判斷何時建立新對話'],
    lessonIds: ['chatgpt-a02'], status: 'preparing', transcriptOrScriptReference: scriptRef('A02'),
  },
  {
    id: 'A03', seriesId: 'chatgpt-web', tool: 'chatgpt', platform: 'web', code: 'A03',
    title: '使用資料與搜尋：從回答到查核',
    description: '貼上文字或上傳文件請 ChatGPT 處理，確認讀取是否正確、對照摘要與原文，並用搜尋補充資料後查核來源。',
    learningObjectives: ['貼上文字並清楚說明任務', '上傳文件並確認正確讀取', '對照摘要與原文、理解圖表', '搜尋補充資料並查核來源'],
    lessonIds: ['chatgpt-a03'], status: 'preparing', transcriptOrScriptReference: scriptRef('A03'),
  },
  {
    id: 'B01', seriesId: 'gemini-web', tool: 'gemini', platform: 'web', code: 'B01',
    title: '認識頁面、選擇模式與第一次提問',
    description: '熟悉 Gemini 網頁版的頁面、對話紀錄、工具與 Gem 入口，選擇合適的模型或模式，完成第一次提問並學會追問與管理對話。',
    learningObjectives: ['操作 Gemini 頁面、新對話與歷史紀錄', '找到輸入區、工具、Gem 與設定入口', '依任務選擇模型或模式', '完成第一次提問、追問調整並管理對話'],
    lessonIds: ['gemini-b01'], status: 'preparing', transcriptOrScriptReference: scriptRef('B01'),
  },
  {
    id: 'B02', seriesId: 'gemini-web', tool: 'gemini', platform: 'web', code: 'B02',
    title: '使用文件、Canvas 與 Deep Research',
    description: '在 Gemini 中加入並確認文件內容，用 Canvas 建立與修改內容，並以 Deep Research 規劃研究、閱讀報告與查核來源。',
    learningObjectives: ['加入與整理文件並確認讀取', '了解 Canvas 的用途並建立、修改內容', '理解 Deep Research 的研究用途並確認研究計畫', '閱讀報告並查核資料來源'],
    lessonIds: ['gemini-b02'], status: 'preparing', transcriptOrScriptReference: scriptRef('B02'),
  },
  {
    id: 'B03', seriesId: 'gemini-web', tool: 'gemini', platform: 'web', code: 'B03',
    title: '建立與使用自己的 Gem',
    description: '認識 Gem 的用途，建立有固定指示的 Gem，區分固定指示與當次任務，並測試、儲存、更新與再次確認。',
    learningObjectives: ['理解 Gem 的用途（保存固定指示，不是重新訓練模型）', '建立 Gem 並設定名稱與固定需求', '區分固定指示和當次任務', '測試、修改、儲存與更新後重新確認'],
    lessonIds: ['gemini-b03'], status: 'preparing', transcriptOrScriptReference: scriptRef('B03'),
  },
  {
    id: 'C01', seriesId: 'literacy', tool: 'common', platform: 'any', code: 'C01',
    title: 'AI 素養：理解工具，判斷回答',
    description: '理解生成式 AI 如何產生回答、能做與不能做的事，學會辨識幻覺與偏誤、查核資訊、保護資料，並保留自己的判斷。',
    learningObjectives: ['說明生成式 AI 產生回答的方式', '辨識能力與限制、幻覺與不確定資訊', '查核資訊並注意偏誤與遺漏觀點', '保護資料與隱私，保留自己的思考與判斷'],
    lessonIds: ['literacy-c01'], status: 'preparing', transcriptOrScriptReference: scriptRef('C01'),
  },
  {
    id: 'C02', seriesId: 'literacy', tool: 'common', platform: 'any', code: 'C02',
    title: '學術倫理：在學習與作業中負責使用 AI',
    description: '認識課程與作業的 AI 使用規範，分辨協助與代做，避免抄襲與捏造，正確引用原始來源、揭露 AI 使用並保留工作過程。',
    learningObjectives: ['遵守課程與作業的 AI 使用規範', '分辨 AI 協助與代做、理解原創性', '不捏造資料、文獻或過程並引用原始來源', '揭露 AI 使用、保留過程並在提交前檢查'],
    lessonIds: ['literacy-c02'], status: 'preparing', transcriptOrScriptReference: scriptRef('C02'),
  },
]

export const series: Series[] = [
  { id: 'chatgpt-web', label: 'ChatGPT｜網頁版', en: 'CHATGPT · WEB', description: '已規劃 3 支影片：A01 介面與基本功能、A02 學會提問、A03 使用資料與搜尋。' },
  { id: 'gemini-web', label: 'Gemini｜網頁版', en: 'GEMINI · WEB', description: '已規劃 3 支影片：B01 頁面與第一次提問、B02 文件、Canvas 與 Deep Research、B03 建立自己的 Gem。' },
  { id: 'chatgpt-desktop', label: 'ChatGPT｜桌面版', en: 'CHATGPT · DESKTOP', description: 'ChatGPT 桌面應用程式的操作教學。', emptyNote: '影片數量與內容尚未確定；確定後會直接登錄在此，不會預先放置未製作的影片。' },
  { id: 'gemini-desktop', label: 'Gemini｜桌面版', en: 'GEMINI · DESKTOP', description: 'Gemini 桌面版的操作教學。', emptyNote: '影片數量與內容尚未確定；確定後會直接登錄在此，不會預先放置未製作的影片。' },
  { id: 'literacy', label: 'AI 素養與學術倫理', en: 'AI LITERACY & ETHICS', description: '跨工具共通課程：C01 AI 素養、C02 學術倫理。' },
  { id: 'agent-learning', label: 'AI Agent｜自主學習與專題實作', en: 'AGENT · LEARNING', description: '十個文字課程模組已可在學習知識閱讀。', emptyNote: '本系列影片尚待製作；課程內容已可於「學習知識」閱讀。' },
  { id: 'agent-research', label: 'AI Agent｜學術研究', en: 'AGENT · RESEARCH', description: '十二個文字課程模組已可在學習知識閱讀。', emptyNote: '本系列影片尚待製作；課程內容已可於「學習知識」閱讀。' },
]

export const videoById: Record<string, Video> = Object.fromEntries(videos.map(video => [video.id, video]))
export const seriesById = Object.fromEntries(series.map(item => [item.id, item])) as Record<SeriesId, Series>

export const statusLabel: Record<Video['status'], string> = { published: '已上架', preparing: '影片準備中', planned: '未來規劃' }

/** Only a published video with a real source can be played; everything else shows its status instead. */
export const isPlayable = (video: Video) => video.status === 'published' && Boolean(video.videoUrl)
