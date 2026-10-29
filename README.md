# 臺北市立大學｜生成式 AI 與 AI Agent 自主學習平台

提供學生自主學習生成式 AI、ChatGPT、Gemini、AI Agent 及 AI 素養與學術倫理的公開學習網站。所有內容免登入瀏覽，預設為日間模式。

- 網站版本：v0.6.0（見 `package.json`）
- 模板來源：`C:\Users\53M\Desktop\ART\art-portal`（走進畫中），本專案為獨立的新資料夾，未修改 ART 任何檔案。

## 一、本機啟動

需要 Node.js 20 以上（開發時使用 Node 24）。

```bash
npm install
npm run dev        # 開發模式：http://localhost:5174
npm run build      # 產生正式版到 dist/
npm run preview    # 預覽正式版
npm test           # 內容完整性測試（Prompt 數量、關聯 ID、搜尋等）
npm run lint       # ESLint
npm run typecheck  # TypeScript 型別檢查
```

`dist/` 是純靜態檔案（使用相對路徑與 hash 路由），可直接放到學校網頁伺服器的任一子資料夾，不需要後端。

## 二、技術架構

| 項目 | 說明 |
|---|---|
| 框架 | React 19 + TypeScript + Vite 7（與 ART 相同版本） |
| 路由 | 自製 hash 路由（`src/lib/router.ts`），例：`#/learn/chatgpt-a02`、`#/videos/A02?from=chatgpt-a02`、`#/prompts?q=簡報&cat=slides`。支援上一頁回到原閱讀位置 |
| 樣式 | 原生 CSS + CSS 變數（`src/styles/`），沿用 ART 的版面語彙：方形品牌標誌、中英雙語導覽、英文小標＋大標的頁首、電子書側欄目錄＋紙張式內頁、捲動淡入、日夜切換開關 |
| 日夜模式 | 首次進站一律日間模式；只有使用者按切換鈕後才以 localStorage 記住。`index.html` 在第一次繪製前套用，避免閃爍 |
| 資料 | 全部是 TypeScript 資料檔（`src/content/`），不需要 CMS 或資料庫 |
| 本機紀錄 | 最近閱讀、最近觀看、收藏 Prompt 只存在瀏覽器 localStorage，不傳送任何資料；「關於」頁可一鍵清除 |
| 外部服務 | 無。不使用任何 AI API、登入或分析服務。只在使用者按下播放後才連線 YouTube（若影片使用 YouTube） |

已移除 ART 中的 Google 登入、班級碼、教師工作室、教師簡報、Supabase、3D 場景等功能與依賴。

### 目錄

```
src/
  content/
    types.ts          資料型別（影片、教材、Prompt）
    videos.ts         影片與系列（唯一的影片資料來源）
    lessons/          知識教材：chatgpt / gemini / literacy / agentLearning / agentResearch
    prompts/          Prompt：18 個分類與教案專用資料檔
    relations.ts      影片 ↔ 教材 ↔ Prompt 雙向關聯
    content.test.ts   內容完整性測試
  lib/                路由、搜尋（含同義詞）、剪貼簿、localStorage
  ui/                 頁面與元件
  styles/             CSS
docs/CONTENT_GUIDE.md 內容撰寫規範（用語、正確性、ID 規則）
```

## 三、目前內容

| 區塊 | 數量 |
|---|---|
| ChatGPT 網頁版教材（A01–A03） | 3 |
| Gemini 網頁版教材（B01–B03） | 3 |
| AI 素養與學術倫理（C01–C02） | 2 |
| AI Agent 自主學習與專題實作（L01–L10） | 10 |
| AI Agent 學術研究（R01–R12） | 12 |
| 已登錄影片 | 8（全部為「影片準備中」） |
| Prompt | 316（18 類） |

Prompt 分類（共 316 則）：

| 代碼 | 分類 | 數量 | 代碼 | 分類 | 數量 |
|---|---|---:|---|---|---:|
| ST | 自主學習、讀書計畫與考試準備 | 20 | EN | 英文學習、翻譯與語言應用 | 15 |
| SL | 簡報設計、PPT 與口頭報告 | 20 | CD | 程式設計、網站與 App 開發 | 20 |
| IM | AI 圖片生成與視覺設計 | 20 | AG | AI Agent、任務自動化與工作流程 | 20 |
| VD | 影片企劃、腳本、分鏡與剪輯 | 20 | TC | 教育教學、課程與教材設計 | 36 |
| RS | 學術研究與論文寫作 | 25 | AU | 聲音製作、配音與逐字稿 | 10 |
| LT | 文獻檢索、文獻回顧與引用 | 20 | AD | 行政文書與工作效率 | 10 |
| MT | 研究方法與研究設計 | 15 | CR | 履歷、面試與職涯規劃 | 10 |
| DA | 統計分析、資料處理與視覺化 | 20 | CT | 創意發想、行銷與社群內容 | 10 |
| WR | 文字撰寫、校對與改寫 | 15 | ET | AI 素養、資訊查核與學術倫理 | 10 |

每個分類另有 4–10 個子分類，可在資源庫中篩選。

## 四、維護與新增內容

所有新增都只要改資料檔，不需修改頁面程式。改完執行 `npm test` 與 `npm run build` 確認。撰寫規範見 `docs/CONTENT_GUIDE.md`。

### 上架影片

只改 `src/content/videos.ts` 中該影片的一筆資料：

```ts
// 專案內 MP4：把檔案放在 public/videos/A01.mp4、縮圖放在 public/thumbnails/A01.jpg
videoUrl: { kind: 'mp4', src: 'videos/A01.mp4' },
thumbnail: 'thumbnails/A01.jpg',
durationText: '8:30',
status: 'published',

// 或 YouTube（填 11 碼影片 ID；播放時使用 youtube-nocookie.com，按下播放才載入）
videoUrl: { kind: 'youtube', id: 'xxxxxxxxxxx' },
status: 'published',
```

影片頁與對應的知識單元會同時更新。沒有 `videoUrl` 的影片永遠不會顯示播放器，只會顯示狀態（已上架／影片準備中／未來規劃）。

### 新增影片（例如桌面版系列）

在 `videos` 陣列加一筆，`seriesId` 用 `chatgpt-desktop` 或 `gemini-desktop`，`lessonIds` 填對應教材 ID。系列的說明文字在同檔的 `series`。

### 新增或修改教材

在 `src/content/lessons/` 對應檔案的陣列加一筆 `Lesson`。每段內容都要標 `origin`：`'script'`（影片腳本既有內容）或 `'extension'`（網站延伸教材），頁面會自動顯示標籤。可用的內容區塊有 `p`、`list`、`steps`、`flow`（流程圖）、`cards`、`table`、`compare`（模糊 vs 清楚對照）、`note`、`pending`（待確認資訊）。

### 新增 Prompt

在 `src/content/prompts/` 中對應分類的檔案（例如 `research.ts` 或 `researchMore.ts`、`literature.ts`）加一筆 `PromptItem`，並沿用該分類現有的子分類名稱。`id` 只要全站唯一即可（既有 ID 不要更改；新增時沿用該檔案的前綴與流水號，如 `lit-13`）；`category` 決定它出現在哪個分類，`relatedLessonIds` 填相關教材 ID，教材頁會自動推薦；`addedOrder` 設大於現有值，「新加入」排序就會排在前面。變數用 `[名稱]`，「填入自己的需求」會自動產生輸入欄位。搜尋同義詞在 `src/lib/promptSearch.ts` 的 `synonymGroups`。

## 五、設計系統

v0.2.0 起採用「精密介面」設計語言，所有樣式集中在 `src/styles/`：

| 檔案 | 內容 |
|---|---|
| `base.css` | 色彩、字體、間距等設計變數（日間為預設，`[data-theme=dark]` 為使用者選擇的深色）、微型標籤 `.kicker`、捲動淡入與頁面切換動畫 |
| `components.css` | 切角按鈕 `.btn`（`btn-primary`、`btn-small`、`btn-lg`）與移動箭頭、複製按鈕狀態、標籤、狀態標示、提醒框、第一層切換元件 `.switch`、第二層線型分頁 `.line-tabs`、日夜切換、表單控制項 |
| `layout.css` | 頁首（含校徽與計中標誌、移動式導覽底線）、頁尾、頁面標題區、關於頁 |
| `home.css`、`learn.css`、`videos.css`、`prompts.css` | 各頁面版面 |

設計原則：以校徽的深藍作為主色、只少量使用一種訊號藍；以細分隔線、單色等寬字體編號與切角幾何建立層次，不使用大面積漸層、發光球體或一律相同的圓角卡片；所有動畫在 `prefers-reduced-motion` 下停用。滑動指示線由 `src/ui/useIndicator.ts` 定位。


### v0.6.0 字體系統與日間鈦銀材質

- **字體角色**（`src/styles/refine.css`）：展示字體 Space Grotesk（英文、數字、標題、按鈕、導覽，中文自動回退 Noto Sans TC）；閱讀字體 Inter＋Noto Sans TC；技術標籤 IBM Plex Mono。數字使用等寬數字對齊；長篇教材字級 1.04rem、行高 1.95、每行約 40 字寬。
- **日間材質**：霧白／冷鈦銀底、拉絲金屬邊框（`--metal`）、銀色漸隱分隔線（`--metal-line`）；主要按鈕為深藍漸層＋內緣高光雙層邊，次要按鈕為霧銀面＋金屬邊。
- **夜間配色**：互動藍改為與首頁 CORE 讀數一致的冷青色（`--signal:#6fd6fb`）。
- **箭頭方塊**：Hover 不再整塊填色，改為邊框發亮、四角刻度與箭頭穿出再回來的動態。

### v0.5.0 日夜雙主題材質

- **主題層** `src/styles/theme.css`（最後載入）：日間為霧白紙面＋冷銀灰底、校徽深藍字；夜間為石墨／鈦金屬三層表面（背景、內容、浮動面板），銀色只用在主要按鈕、選取指示、精選面板邊框與頁面標題。
- **主題切換**：新版日夜開關（SVG 圖示＋鈦金屬滑塊）；支援 View Transitions 的瀏覽器會從開關位置以圓形展開新主題，否則顏色淡入；仍預設日間、記住手動選擇、首次載入不閃爍。
- **按鈕狀態**：預設、Hover（底色加深＋沿邊框跑一圈光＋一次光澤掠過）、按下、Focus、Disabled、Loading（`.btn.is-loading`）、成功（複製後轉綠）。
- **課程識別色**：以 `data-track` 區分 ChatGPT、Gemini、AI 素養與倫理，以及兩個 AI Agent 專區（斜紋標記）；用於單元代碼、章節標題線、目錄選取、閱讀進度與練習區。
- **區塊分層**：首頁「三大學習方向」與「熱門 Prompt」改為全寬色帶；夜間的區段線改為兩端漸隱的銀色細線。

### v0.4.0 介面與體驗更新

- **首頁算力面板**：Hero 右側為深色晶圓／晶片動畫（`src/ui/components/HeroCircuit.tsx`）：晶粒依序點亮、雷達掃描、核心陣列對角波動、訊號封包沿走線往返各學習區塊並點亮指示燈、滑鼠視差；五個區塊可直接點選。畫面不在視窗內時暫停，偏好減少動態時改為靜態。
- **全站快速搜尋**：頁首「搜尋」或 `Ctrl／⌘ + K` 開啟（`src/ui/components/SearchPalette.tsx`），同時搜尋學習單元、影片與 Prompt，支援同義詞與方向鍵／Enter 操作；空白時顯示最近閱讀與常用入口。
- **Prompt 任務情境**：資源庫搜尋欄下方的「我想要…」列，一鍵套用對應分類（如準備期末簡報、寫文獻回顧、準備試教或教案）。
- **全站回饋元件**：複製成功時的底部提示（`showToast`，`src/lib/ui-events.ts`）、帶閱讀進度環的回到頂端按鈕、按鈕游標微光（`usePointerLight`）。
- **單元資訊**：每個單元顯示序號（UNIT 02 / 03）與約略閱讀時間。

## 六、測試

`npm test` 會檢查：Prompt ≥ 316 則（教學設計 ≥ 36 則）、18 個分類與各分類最低數量、子分類數不超過 10、ID 不重複、內容不重複、關聯 ID 存在、研究、文獻與研究方法類 Prompt 皆含不得編造的提醒、八支影片編號、影片與教材雙向關聯、沒有影片網址就不能顯示為可播放、各專區單元數量、R12 標示「待計中確認」、Gem 未被描述為重新訓練模型、常見非臺灣用語，以及搜尋關鍵字（簡報、照片、論文、PPT、AI Agent、Literature Review、英文、教案等）、跨分類搜尋（照片、研究、簡報）與子分類篩選。

## 七、待補資料

1. **正式影片腳本** `生成式ai使用教學影片.docx`：開發時在本機找不到。標示「影片課程內容」的段落目前依開發指令中的影片大綱撰寫，取得腳本後需逐段核對。
2. **八支影片檔或 YouTube 連結與縮圖**。
3. **ChatGPT／Gemini 桌面版影片**的數量與內容。
4. **校內 AI 伺服器**：介紹、資源規格、使用資格、申請流程、使用規範、官方文件與聯絡方式（R12 單元已預留）。
5. **計中維護人員、聯絡方式、官方連結**（關於頁與頁尾已預留；單位名稱已依計中標誌使用「計算機與網路中心」）。
6. **校徽與計中標誌**：已放入 `public/brand/`（由 `LOGO/` 資料夾的原檔裁切並去除白底）。若有官方高解析度或 SVG 版本，請直接替換同名檔案。原說明：：請存成 `public/brand/utaipei-logo.png`（臺北市立大學橫式標誌）與 `public/brand/computing-center-logo.png`（計算機與網路中心圓形標誌），建議透明背景 PNG 或 SVG（改 SVG 時一併修改 `src/ui/components/OfficialLogos.tsx` 的檔名）。檔案放入後頁首、頁尾與關於頁會自動顯示；缺檔時自動隱藏，不會出現破圖。
7. **學校帳號使用 Gemini／ChatGPT 的規定**（部分教材已標示「待計中確認」）。

## v0.3.0 教案產生器與教材版本

- 新增 `teachingPlans.ts`：核心教案全文 + 15 則不同用途的教案 Prompt，教學設計共 36 則、全站 316 則。
- 核心 `teach-core` 提供 3 組共 14 欄的結構化表單，含教學對象、環境單選與教學策略多選。可部分填寫、即時全文預覽、查看填寫進度及清除；未填占位符保留。
- 「複製完整教案 Prompt」複製代入後全文；「複製原始模板」複製未代入全文，含全部 18 項要求及 A–J 輸出。僅整理提示詞，不呼叫 AI API。
- 首頁以可鍵盤操作的 SVG 晶片學習地圖介紹五大區塊；離開視窗、隱藏分頁時暫停動畫，減少動態效果偏好下顯示靜態圖。
- 學習知識新增 ChatGPT／Gemini → 網頁版／桌面版兩層切換；桌面版目前各 0 個單元，教材尚待規劃，不提供推測內容。

## GitHub 與網站部署

- 公開原始碼：https://github.com/sanman931020/utaipei-ai-learning
- GitHub Pages 網站：https://sanman931020.github.io/utaipei-ai-learning/
- Vercel 網站：https://utaipei-ai-learning.vercel.app/
- Vercel 建置前執行 lint、typecheck、test、build。GitHub Actions 範例保留於 `docs/GITHUB_ACTIONS_CI.example.yml`；目前 Git 推送憑證未含 workflow 權限，因此不啟用 Actions。
- 推送 `main` 後，已連接的 Vercel Git 整合會自動部署；儲存庫公開，GitHub Pages 使用 `gh-pages` 分支根目錄，Vercel 仍提供 `main` 分支自動部署。
- Vite 保留相對 `base: './'` 與 hash 路由。不上傳 `node_modules`、環境設定或憑證；無需 AI API 金鑰。

GitHub Pages 更新時須重新執行 `npm run build`，將 `dist/` 的完整內容與 `.nojekyll` 發布至 `gh-pages` 分支。
