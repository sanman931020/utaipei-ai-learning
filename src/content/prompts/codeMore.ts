import type { PromptItem } from '../types'

export const codeMorePrompts: PromptItem[] = [
  {
    id: 'code-09',
    title: '需求規格書：使用者故事與驗收條件',
    category: 'code',
    subcategory: '需求規劃',
    description: '在寫程式之前，把專題或課程作業的想法整理成使用者故事、驗收條件與優先順序，讓組員與 AI 都知道「做到什麼程度才算完成」。',
    content: '我要開發一個小型系統，請先協助我把想法整理成需求規格書，暫時不要寫任何程式碼。\n\n' +
      '專案名稱與一句話目的：[專案名稱與目的]\n' +
      '使用者角色：[例如：學生、助教、社團幹部]\n' +
      '我想到的功能（口語描述即可）：[功能清單]\n' +
      '限制條件：[例如：期末前完成、只有 2 人開發、只能用免費方案、需在手機上使用]\n\n' +
      '請輸出：\n' +
      '1. 範圍界定：這一版要做（MVP）與先不做的功能，各列出理由。\n' +
      '2. 使用者故事表：編號｜角色｜「身為……我想要……以便……」｜優先順序（必要／應有／可有）。\n' +
      '3. 每個必要故事的驗收條件，以「假設（Given）／當（When）／則（Then）」格式撰寫，至少包含 1 個正常情境與 1 個例外情境（例如輸入空白、重複送出、沒有網路）。\n' +
      '4. 非功能需求：效能、無障礙、個資保護、瀏覽器或裝置支援。\n' +
      '5. 需要我或組員決定的模糊之處，條列成問題。\n\n' +
      '限制：不要替我假設不存在的使用者需求；推測的部分請標示「推測，待確認」。若功能描述太少，請先問我最多 5 個問題再開始。',
    tags: ['需求規格', '使用者故事', '驗收條件', '專題規劃', '系統分析'],
    keywords: ['requirements', 'user stories', 'acceptance criteria', 'Given When Then', 'MVP', 'specification', 'PRD'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l02', 'agent-l06'],
    addedOrder: 2,
  },
  {
    id: 'code-10',
    title: '資料庫與資料結構設計',
    category: 'code',
    subcategory: '需求規劃',
    description: '依功能需求設計資料表、欄位型態、關聯與限制條件，並用範例資料檢查設計是否能支援每個功能。',
    content: '請協助我為以下系統設計資料結構。\n\n' +
      '系統用途與主要功能：[功能清單或貼上需求規格]\n' +
      '資料庫類型：[例如：SQLite、MySQL、PostgreSQL、試算表、JSON 檔；若不確定請比較後建議]\n' +
      '預估資料量：[例如：約 500 位使用者、每學期數千筆紀錄]\n' +
      '會存放的敏感資料：[例如：學號、電子郵件；若沒有請寫「無」]\n\n' +
      '請依序輸出：\n' +
      '1. 實體（資料表）清單與每個實體的用途。\n' +
      '2. 每張表的欄位表：欄位名稱｜型態｜是否必填｜預設值｜說明｜限制（主鍵、外鍵、唯一、檢查條件）。\n' +
      '3. 表與表之間的關聯（一對一、一對多、多對多），用文字描述或簡易 ER 圖表示。\n' +
      '4. 建立資料表的 SQL（或對應格式），附中文註解。\n' +
      '5. 用 3～5 筆明顯是假資料的範例，逐一說明每個主要功能要如何查詢，證明設計夠用。\n' +
      '6. 邊界情況：刪除使用者時相關資料怎麼處理、重複資料如何避免、欄位長度上限。\n' +
      '7. 個資最小化建議：哪些欄位其實不需要存、哪些需要加密或去識別化。\n\n' +
      '請標出你做的假設；資訊不足時先問我。',
    tags: ['資料庫設計', '資料表', 'SQL', 'ER 圖', '資料結構'],
    keywords: ['database design', 'schema', 'SQL', 'ER diagram', 'data modeling', 'normalization', 'foreign key'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l06', 'research-r10'],
    caution: '範例請使用假資料；不要把真實學號、姓名或聯絡資料貼給 AI。',
    addedOrder: 2,
  },
  {
    id: 'code-11',
    title: '前端元件設計（React）',
    category: 'code',
    subcategory: '網站與 App',
    description: '先定義元件的用途、屬性、狀態與互動，再產生可重用的 React 元件與使用範例，涵蓋載入中、空資料與錯誤狀態。',
    content: '請協助我設計並撰寫一個可重用的 React 前端元件。\n\n' +
      '元件用途：[例如：課程卡片、可篩選的清單、分頁按鈕、表單輸入欄位]\n' +
      '技術環境：[React 版本、JavaScript 或 TypeScript、樣式方式（CSS Modules、Tailwind 等）]\n' +
      '資料來源與格式：[例如：父元件傳入的陣列，每筆含 id、title、date]\n' +
      '需要的互動：[例如：點擊展開、鍵盤操作、篩選]\n\n' +
      '請先輸出設計，等我確認後再寫程式：\n' +
      '1. 元件職責（只做什麼、不做什麼）。\n' +
      '2. Props 表：名稱｜型態｜必填｜預設值｜說明。\n' +
      '3. 內部狀態與觸發變化的事件。\n' +
      '4. 需處理的狀態：載入中、空資料、錯誤、資料很長或很多筆時的顯示。\n' +
      '5. 無障礙：語意化標籤、鍵盤操作、焦點樣式、螢幕閱讀器標示。\n\n' +
      '確認後再輸出：\n' +
      '6. 元件程式碼（附中文註解）與一個使用範例。\n' +
      '7. 3～5 個測試情境（例如傳入空陣列、缺少必填屬性），若我有測試工具請寫成測試程式。\n\n' +
      '限制：不要加入我沒要求的外部套件；若需要，先說明理由讓我決定。',
    tags: ['React', '前端', '元件設計', '網頁開發', 'UI 元件'],
    keywords: ['React', 'component', 'frontend', 'props', 'state', 'UI', 'TypeScript', 'reusable component'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l06', 'agent-l07'],
    addedOrder: 2,
  },
  {
    id: 'code-12',
    title: '響應式（RWD）版面除錯',
    category: 'code',
    subcategory: '除錯優化',
    description: '網頁在手機或特定螢幕寬度下跑版、出現橫向捲軸或文字重疊時，請 AI 協助找出原因並教你用開發者工具驗證。',
    content: '我的網頁在某些螢幕尺寸下版面出問題，請協助我除錯。\n\n' +
      '問題描述：[例如：手機上出現橫向捲軸、選單蓋住內容、圖片超出容器、文字重疊]\n' +
      '出現的寬度或裝置：[例如：寬度 375px 的手機、平板直向]\n' +
      '正常的寬度或裝置：[例如：桌機 1280px]\n' +
      '使用的技術：[純 CSS、Flexbox、Grid、Bootstrap、Tailwind 等]\n' +
      '相關 HTML：\n[HTML 片段]\n' +
      '相關 CSS（含 media query）：\n[CSS 片段]\n\n' +
      '請輸出：\n' +
      '1. 可能原因清單，依可能性排序（例如固定寬度、未設定 box-sizing、min-width、長字串或網址未換行、圖片未設 max-width、viewport 設定缺漏）。\n' +
      '2. 每個原因如何用瀏覽器開發者工具驗證（要看哪個元素、哪個屬性）。\n' +
      '3. 針對最可能原因的最小修改，標出改了哪一行與理由。\n' +
      '4. 修改後要在哪些寬度重新檢查（至少手機、平板、桌機各一），以及檢查重點。\n' +
      '5. 修改可能影響到的其他頁面或元件。\n\n' +
      '請不要整份 CSS 重寫；若片段不足以判斷，告訴我還需要哪一段程式碼或截圖說明。',
    tags: ['RWD', '響應式設計', '跑版', 'CSS', '手機版網頁'],
    keywords: ['responsive design', 'RWD', 'CSS', 'media query', 'layout bug', 'overflow', 'mobile', 'Flexbox', 'Grid'],
    supportedTools: ['通用'],
    difficulty: '入門',
    relatedLessonIds: ['agent-l07', 'agent-l08'],
    addedOrder: 2,
  },
  {
    id: 'code-13',
    title: '網頁無障礙（WCAG）檢查',
    category: 'code',
    subcategory: '網站與 App',
    description: '依 WCAG 原則檢查網頁程式碼的替代文字、標題層級、色彩對比、鍵盤操作與表單標籤，產出問題清單與修正方式。',
    content: '請以網頁無障礙檢查者的角度，依 WCAG 的原則（可感知、可操作、可理解、穩健）檢查以下網頁程式碼。\n\n' +
      '網頁用途與主要讀者：[例如：系所活動報名頁，讀者含視障同學]\n' +
      '希望對照的等級：[例如：WCAG 2.1 AA；若不確定請說明差異]\n' +
      'HTML（必要時附 CSS 與 JavaScript）：\n[程式碼]\n' +
      '主要文字色與背景色：[色碼]\n\n' +
      '請輸出：\n' +
      '1. 問題表：位置｜問題｜影響哪類使用者｜對應的 WCAG 原則或準則（只寫你確定的編號，不確定請寫「待查證」）｜嚴重程度｜修正方式。\n' +
      '2. 重點檢查項：圖片替代文字、標題層級是否跳級、連結文字是否有意義、表單是否有 label 與錯誤提示、鍵盤能否操作所有功能、焦點是否看得見、色彩是否是唯一的資訊傳達方式。\n' +
      '3. 色彩對比：說明計算方式，並建議我用對比檢查工具實際驗證，不要只相信你的估算。\n' +
      '4. 修正後的程式碼片段（只改有問題的部分）。\n' +
      '5. 需要人工測試的項目：例如只用鍵盤走一遍、用螢幕閱讀器朗讀一次，並列出測試步驟。\n\n' +
      '若沒有發現某類問題，請明確寫「未發現」。',
    tags: ['無障礙', 'WCAG', '網頁檢查', 'a11y', '可及性'],
    keywords: ['accessibility', 'WCAG', 'a11y', 'screen reader', 'color contrast', 'keyboard navigation', 'alt text', 'ARIA'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l07', 'agent-l08'],
    caution: 'AI 的檢查無法取代實際測試；請用瀏覽器檢測工具、對比檢查工具與螢幕閱讀器親自驗證。',
    addedOrder: 2,
  },
  {
    id: 'code-14',
    title: '簡易 App 原型規劃：畫面流程與功能清單',
    category: 'code',
    subcategory: '網站與 App',
    description: '把 App 點子整理成畫面清單、畫面流程、每頁元件與資料需求，作為畫線框稿或開發前的共同藍圖。',
    content: '我有一個 App 的點子，請協助我在動手做之前規劃原型。\n\n' +
      'App 點子與要解決的問題：[點子描述]\n' +
      '目標使用者與使用情境：[誰、在什麼時候用]\n' +
      '平台：[手機 App／網頁 App／尚未決定]\n' +
      '開發方式：[例如：用原型工具畫線框稿、無程式碼工具、Flutter、React Native；若不確定請比較]\n' +
      '時間與人力：[期限與人數]\n\n' +
      '請輸出：\n' +
      '1. 核心任務：使用者打開 App 最常做的 3 件事。\n' +
      '2. 功能清單：功能｜對應的核心任務｜優先順序（第一版必做／之後再做）。\n' +
      '3. 畫面清單：每個畫面的名稱、目的、主要元件（按鈕、清單、輸入框）、需要的資料。\n' +
      '4. 畫面流程：用「畫面 A →（動作）→ 畫面 B」寫出主要流程，並包含例外流程（未登入、沒有網路、沒有資料、輸入錯誤）。\n' +
      '5. 需要存取的手機權限（相機、定位、通知等）與必要性；不必要的權限請建議拿掉。\n' +
      '6. 可用 5 位同學做的簡易可用性測試：任務腳本與觀察重點。\n\n' +
      '請不要假設特定工具具備某項功能；寫成「若你使用的工具支援……」。資訊不足時先問我。',
    tags: ['App 原型', '畫面流程', '線框稿', 'App 規劃', '使用者體驗'],
    keywords: ['app prototype', 'wireframe', 'user flow', 'screen flow', 'feature list', 'UX', 'mobile app', 'MVP'],
    supportedTools: ['通用'],
    difficulty: '入門',
    relatedLessonIds: ['agent-l06', 'agent-l02'],
    addedOrder: 2,
  },
  {
    id: 'code-15',
    title: 'API 串接說明與錯誤處理',
    category: 'code',
    subcategory: '網站與 App',
    description: '依你提供的 API 文件片段，整理串接步驟、請求與回應格式，並撰寫含逾時、重試與錯誤處理的範例程式，金鑰一律用環境變數佔位。',
    content: '請協助我串接一個 API，並把錯誤處理寫完整。\n\n' +
      'API 用途：[例如：取得公開天氣資料、查詢開放資料平台]\n' +
      '程式語言與環境：[例如：Python requests、JavaScript fetch、Node.js]\n' +
      'API 文件重點（請貼上官方文件中的端點、參數、回應範例與使用限制；不要貼真實金鑰）：\n[文件片段]\n' +
      '我要的資料與用法：[需要哪些欄位、多久呼叫一次]\n\n' +
      '請輸出：\n' +
      '1. 依文件整理：端點、方法、必要參數、驗證方式、回應欄位。文件沒寫到的地方請標「文件未說明」，不要自行補上。\n' +
      '2. 範例程式：金鑰從環境變數讀取（例如 [API_KEY_環境變數名稱]），並說明如何設定 .env 且把它加入 .gitignore。\n' +
      '3. 錯誤處理：網路逾時、連線失敗、HTTP 4xx 與 5xx、超過呼叫次數限制、回應格式不符或欄位缺漏，各自的處理方式與給使用者看的訊息。\n' +
      '4. 重試策略：哪些錯誤可以重試、間隔與次數上限；哪些錯誤不應重試。\n' +
      '5. 測試方式：用假的回應資料模擬成功與各種失敗情況，不必真的呼叫 API。\n' +
      '6. 使用前要確認的事項：服務條款、資料授權、呼叫次數限制。',
    tags: ['API', '串接', '錯誤處理', '開放資料', '後端'],
    keywords: ['API integration', 'REST', 'error handling', 'retry', 'timeout', 'environment variables', 'fetch', 'requests'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l05', 'agent-l08'],
    caution: '請勿把真實 API 金鑰、權杖或密碼貼給 AI 或寫進程式碼；若不小心外洩，請立即到該服務撤銷並重新產生。',
    addedOrder: 2,
  },
  {
    id: 'code-16',
    title: '重構既有程式（行為不變）',
    category: 'code',
    subcategory: '除錯優化',
    description: '在不改變程式行為的前提下，分小步驟改善命名、拆分函式與移除重複程式，並先建立測試確認重構前後結果一致。',
    content: '請協助我重構以下程式碼。重構的原則是「外部行為不變」，只改善結構與可讀性。\n\n' +
      '程式語言與版本：[語言與版本]\n' +
      '程式用途：[這段程式在做什麼]\n' +
      '我覺得難維護的地方：[例如：函式太長、重複程式很多、變數名稱看不懂]\n' +
      '目前是否有測試：[有／沒有]\n' +
      '程式碼（已移除金鑰與密碼）：\n[程式碼]\n\n' +
      '請依序進行：\n' +
      '1. 先描述你理解的程式行為（輸入、輸出、副作用），請我確認。\n' +
      '2. 若沒有測試，先寫出能鎖定目前行為的測試案例（含邊界情況），讓重構前後都能執行比對。\n' +
      '3. 列出重構計畫，分成數個小步驟（例如：改名 → 抽出函式 → 合併重複邏輯），每步說明目的。\n' +
      '4. 逐步提供修改後的程式碼，每一步都可以單獨執行測試。\n' +
      '5. 列出可能「不小心改變行為」的地方，例如例外處理、預設值、執行順序。\n\n' +
      '限制：不要順便新增功能或改變輸出格式；若發現原本就有的錯誤，請另外列出，問我要不要修，不要混在重構裡。',
    tags: ['重構', 'refactor', '程式品質', '可讀性', '維護'],
    keywords: ['refactoring', 'clean code', 'code smell', 'maintainability', 'regression test', 'readability'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l08'],
    caution: '重構前請先用 Git 提交或備份目前版本，方便比對與還原。',
    addedOrder: 2,
  },
  {
    id: 'code-17',
    title: '程式效能問題分析',
    category: 'code',
    subcategory: '除錯優化',
    description: '程式跑很慢或很吃記憶體時，先量測找出真正的瓶頸，再依影響大小提出改善方式，避免憑感覺優化。',
    content: '我的程式執行太慢（或記憶體用量過高），請協助我分析。\n\n' +
      '程式語言與環境：[語言、版本、執行環境，例如 Colab、本機、伺服器]\n' +
      '資料規模：[例如：CSV 約 50 萬列、每次處理 2,000 張圖片]\n' +
      '目前表現：[例如：跑完需要 40 分鐘]\n' +
      '期望表現：[例如：10 分鐘內]\n' +
      '程式碼（已移除機密資訊）：\n[程式碼]\n' +
      '若已量測，請附上量測結果：[計時或 profiler 輸出]\n\n' +
      '請輸出：\n' +
      '1. 量測方法：教我用計時或 profiler 找出最耗時的區塊，以及要記錄哪些數字。若我還沒量測，請先停在這一步。\n' +
      '2. 依程式碼推測的可能瓶頸（例如迴圈內重複讀檔、逐列處理、重複計算、不必要的資料複製），標示「推測」或「依量測結果」。\n' +
      '3. 改善方案表：方案｜預期效果｜實作難度｜風險（是否可能改變結果）。\n' +
      '4. 最優先方案的修改程式碼。\n' +
      '5. 驗證方式：改善前後用同一份資料比對輸出是否完全一致，並比較執行時間。\n\n' +
      '請不要保證具體的加速倍數；你沒有執行我的程式，數字要由我實測。',
    tags: ['效能', '程式優化', '執行速度', '記憶體', 'profiling'],
    keywords: ['performance', 'optimization', 'profiling', 'bottleneck', 'speed up', 'memory usage', 'vectorization'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r08', 'agent-l08'],
    addedOrder: 2,
  },
  {
    id: 'code-18',
    title: '撰寫 README 與使用說明',
    category: 'code',
    subcategory: '文件與版本',
    description: '依專案實際內容撰寫 README，讓組員、助教或未來的自己能順利安裝、執行與理解專案，不寫不存在的功能。',
    content: '請協助我為程式專案撰寫 README 與使用說明。\n\n' +
      '專案名稱與用途：[名稱與一句話說明]\n' +
      '讀者：[例如：助教、組員、第一次接觸的同學]\n' +
      '技術與環境：[語言、版本、主要套件]\n' +
      '資料夾結構：\n[資料夾結構]\n' +
      '安裝與執行方式（我目前的做法）：[步驟]\n' +
      '設定檔或環境變數：[名稱與用途，不要貼實際的值]\n' +
      '已知限制與尚未完成的功能：[清單]\n\n' +
      '請輸出 Markdown 格式的 README，包含：\n' +
      '1. 專案簡介與主要功能（只寫我列出的功能）。\n' +
      '2. 環境需求與安裝步驟，每一步附可複製的指令。\n' +
      '3. 設定方式：用 .env.example 示範變數名稱，值一律用佔位文字。\n' +
      '4. 使用範例：輸入與預期輸出。\n' +
      '5. 常見問題與排除方式。\n' +
      '6. 專案結構說明、已知限制、作者與分工、授權（若尚未決定請標「待決定」）。\n' +
      '7. 若有使用 AI 協助開發，提供一段可依課程規定修改的 AI 使用揭露範例。\n\n' +
      '寫完後請列出：你依推測補上、需要我實際照步驟操作一次驗證的段落。',
    tags: ['README', '說明文件', '技術文件', '使用說明', '專案文件'],
    keywords: ['README', 'documentation', 'Markdown', 'installation guide', 'user guide', 'project docs'],
    supportedTools: ['通用'],
    difficulty: '入門',
    relatedLessonIds: ['agent-l05', 'agent-l07', 'literacy-c02'],
    addedOrder: 2,
  },
  {
    id: 'code-19',
    title: '正規表示式撰寫與測試案例',
    category: 'code',
    subcategory: '測試與審查',
    description: '用範例描述要比對與不比對的字串，請 AI 寫出正規表示式、逐段解釋，並附上應符合與不應符合的測試案例。',
    content: '請協助我撰寫一個正規表示式（regex），並附上測試案例。\n\n' +
      '使用環境：[例如：Python re、JavaScript、Excel、VS Code 搜尋取代]\n' +
      '要做的事：[比對／擷取／取代]\n' +
      '規則描述：[例如：找出格式為「年-月-日」的日期、擷取括號內的文字]\n' +
      '應該符合的範例：[至少 3 個]\n' +
      '不應該符合的範例：[至少 3 個]\n\n' +
      '請輸出：\n' +
      '1. 正規表示式本身，以及在我的環境中的使用寫法（注意跳脫字元差異）。\n' +
      '2. 逐段解釋每個符號的意義，用表格呈現。\n' +
      '3. 測試案例表：輸入字串｜預期結果（符合／不符合／擷取內容）｜這個案例在測什麼。請補上我沒想到的邊界情況，例如空字串、前後有空白、全形字元、換行、過長字串。\n' +
      '4. 可直接執行的測試程式，逐一跑過測試案例並印出通過或失敗。\n' +
      '5. 這個寫法的限制（例如不會檢查日期是否真的存在），以及是否有更簡單、更好維護的替代做法。\n\n' +
      '若我的規則描述有模糊之處（例如是否接受個位數月份），請先問我。',
    tags: ['正規表示式', 'regex', '字串處理', '測試案例', '文字比對'],
    keywords: ['regular expression', 'regex', 'pattern matching', 'string', 'test cases', 'find and replace'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['research-r07', 'agent-l08'],
    addedOrder: 2,
  },
  {
    id: 'code-20',
    title: '把 Excel 重複工作改成 Python 自動化腳本',
    category: 'code',
    subcategory: '自動化腳本',
    description: '把每週手動在 Excel 做的整理步驟寫成 Python 腳本，內建試跑（dry-run）、自動備份與處理紀錄，先預覽再實際寫檔。',
    content: '我每 [頻率] 都要在 Excel 重複做同樣的整理工作，請協助我改寫成 Python 自動化腳本。\n\n' +
      '目前的手動步驟（依順序條列）：[例如：合併多個工作表、刪除空白列、依欄位分類、計算小計、另存新檔]\n' +
      '輸入檔案：[檔案位置、命名方式、工作表名稱]\n' +
      '欄位名稱與範例（請用假資料示範格式）：[欄位與範例]\n' +
      '輸出需求：[輸出檔名、格式、位置]\n' +
      '執行環境：[作業系統、Python 版本、是否能安裝 pandas、openpyxl]\n\n' +
      '腳本要求：\n' +
      '- 提供試跑模式（dry-run）：只顯示將會處理哪些檔案、幾筆資料、會產生什麼輸出，不寫入任何檔案。\n' +
      '- 正式執行前自動把原始檔複製到備份資料夾（檔名加上日期時間），絕不覆寫原始檔。\n' +
      '- 處理紀錄：每次執行記錄時間、處理的檔案、筆數、略過或錯誤的列與原因。\n' +
      '- 錯誤處理：找不到檔案、欄位名稱不符、檔案正被開啟、資料格式錯誤時，清楚提示並停止，不產生半成品。\n' +
      '- 設定（路徑、欄位名稱）集中在檔案開頭，附中文註解。\n\n' +
      '請另外附上：執行方式、用一份小型測試檔驗證的步驟，以及我應該手動比對的結果（例如總筆數、小計是否與手動版本一致）。資訊不足時先問我。',
    tags: ['Python', 'Excel 自動化', '自動化腳本', '試算表', '重複工作'],
    keywords: ['Python', 'Excel automation', 'openpyxl', 'pandas', 'dry-run', 'backup', 'script', 'spreadsheet'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l05', 'research-r07', 'research-r08'],
    caution: '第一次請在備份資料上以試跑模式測試；含個資的資料請勿貼給 AI，只提供欄位名稱與假資料。',
    addedOrder: 2,
  },
]
