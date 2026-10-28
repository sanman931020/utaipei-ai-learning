import type { PromptItem } from '../types'

const CAUTION_BASE =
  '請逐筆查核 AI 提到的文獻、作者、年份與 DOI 是否真實存在並與原文一致；不要上傳個資、受試者資料或未經許可的研究資料（含有版權限制的全文）；使用前請確認授課教師、指導教授、學校與期刊對 AI 使用的規定。'

const NO_FABRICATION =
  '不得編造文獻、作者、年份、DOI、統計數字或研究結果；只根據我提供的內容回答，不確定處請標示「待查證」或「待確認」。'

export const literaturePrompts: PromptItem[] = [
  {
    id: 'lit-01',
    title: '文獻回顧章節大綱：主題式或時間序',
    category: 'literature',
    subcategory: '文獻回顧撰寫',
    description: '依你已整理的文獻，比較主題式、時間序與方法別等組織方式，規劃文獻回顧章節的大綱。',
    content:
      '請協助我規劃論文文獻回顧（文獻探討）章節的大綱。\n\n' +
      '研究問題：[貼上]\n' +
      '已整理的文獻清單（作者＋年份＋一句重點，由我提供）：\n[貼上，或貼上文獻矩陣]\n' +
      '系所或指導教授的要求：[例如 需包含理論基礎、相關研究兩大節，可空白]\n\n' +
      '請完成：\n' +
      '1. 說明主題式、時間序（發展脈絡）、方法別、理論別等組織方式各適合什麼情況，並判斷哪一種最適合我的研究問題，理由要扣回研究問題。\n' +
      '2. 用建議的方式提出兩層大綱，每個小節寫：這節要建立的論點、放哪幾篇文獻（只用我清單中的，以「[作者，年份]」標示）。\n' +
      '3. 指出大綱中文獻偏少或空白的小節，標示「需補充檢索」，並說明需要哪一類文獻。\n' +
      '4. 說明各節如何收斂到我的研究問題，避免變成逐篇摘要的「流水帳」。\n\n' +
      '限制：' + NO_FABRICATION + '不要為空白小節推薦任何具體文獻；文獻內容的歸類若僅依我的一句重點判斷，請標示「請回原文確認」。',
    tags: ['文獻', '文獻回顧', '文獻探討', '大綱', '論文'],
    keywords: ['literature review outline', 'thematic', 'chronological', 'review structure', 'chapter 2', '文獻探討大綱'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r05', 'research-r09'],
    caution: CAUTION_BASE,
    addedOrder: 2,
  },
  {
    id: 'lit-02',
    title: '多篇文獻異同綜整（從我的筆記出發）',
    category: 'literature',
    subcategory: '文獻整理',
    description: '用你自己的閱讀筆記，把多篇文獻綜整成「共識、分歧、可能原因」的綜合論點，而不是逐篇摘要。',
    content:
      '以下是我針對同一議題閱讀多篇文獻後寫的筆記，請協助我做綜整（synthesis）而不是逐篇摘要。\n\n' +
      '議題或要回答的子問題：[例如 同儕回饋對寫作表現的效果]\n' +
      '我的閱讀筆記（每篇以「文獻 1」「文獻 2」分隔，含作者、年份、對象、方法、發現）：\n[貼上]\n\n' +
      '請完成：\n' +
      '1. 共識：多數文獻一致的發現，每點註明依據哪幾篇（文獻 N）。\n' +
      '2. 分歧：結果互相矛盾的地方，並從對象、情境、方法、測量、時間等面向比較，列出「筆記中可見的差異」作為可能原因；屬於你推論的請標示「推論」。\n' +
      '3. 綜整論點：寫出 3–5 個可以當作文獻回顧段落主題句的綜合論點，每個論點後面列出支持的文獻。\n' +
      '4. 筆記中資訊不足、無法判斷異同的地方，列成「需回原文查」清單。\n\n' +
      '限制：' + NO_FABRICATION + '不要加入任何我沒提供的文獻或「一般認為」的說法；我的筆記可能有誤，提醒我引用前回原文核對。',
    tags: ['文獻', '文獻綜整', '文獻回顧', '比較', '閱讀筆記'],
    keywords: ['literature synthesis', 'compare and contrast', 'consensus', 'conflicting findings', 'reading notes', '文獻綜合'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r04', 'research-r05'],
    caution: CAUTION_BASE,
    addedOrder: 2,
  },
  {
    id: 'lit-03',
    title: '改寫與引用自我檢查：避免拼貼式抄寫',
    category: 'literature',
    subcategory: '文獻回顧撰寫',
    description: '比對你寫的段落與原文摘錄，檢查是否只是換字（patchwriting）、引用是否到位，並學會真正的改寫。',
    content:
      '我想檢查自己寫的文獻段落是否有不當改寫或引用不足的問題。請給我回饋，而不是替我重寫。\n\n' +
      '原文摘錄（我從文獻中摘錄，附 [作者，年份，頁碼]）：\n[貼上]\n' +
      '我自己寫的段落：\n[貼上]\n' +
      '使用的引用格式：[例如 APA 第 7 版]\n\n' +
      '請完成：\n' +
      '1. 逐句對照：我的句子、最接近的原文句子、判定（獨立改寫／拼貼式抄寫：只換同義詞或調換語序／直接引用但未加引號／原文沒有的內容）。\n' +
      '2. 對判定為拼貼式抄寫的句子，說明問題在哪裡，並給我改寫的方法（例如先闔上原文用自己的話說、改變句子結構與論述角度、與其他文獻整合），不要提供完整改寫好的句子。\n' +
      '3. 檢查引用：每個來自原文的觀點是否都有標註出處；直接引用是否有引號與頁碼。\n' +
      '4. 提醒何時適合直接引用、何時適合改寫或摘述。\n\n' +
      '限制：' + NO_FABRICATION + '這不是正式的比對系統結果，提醒我以學校提供的比對工具與學術倫理規範為準。',
    tags: ['文獻', '改寫', '抄襲', '引用', '學術倫理'],
    keywords: ['paraphrasing', 'patchwriting', 'plagiarism', 'citation', 'academic integrity', '避免抄襲'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['research-r09', 'literacy-c02'],
    caution: CAUTION_BASE + 'AI 檢查無法取代學校的論文比對系統；文字應由你自己改寫完成。',
    addedOrder: 2,
  },
  {
    id: 'lit-04',
    title: '文獻篩選納入排除標準與流程紀錄',
    category: 'literature',
    subcategory: '文獻篩選',
    description: '事先訂好可操作的納入與排除標準，設計篩選紀錄表，並把篩選數字整理成 PRISMA 風格的流程。',
    content:
      '我正在進行文獻回顧，需要建立清楚的文獻篩選標準與紀錄方式。\n\n' +
      '研究問題：[貼上]\n' +
      '回顧類型：[例如 系統性回顧、範域回顧、學位論文的文獻探討]\n' +
      '初步想到的條件：[例如 對象、介入或現象、研究設計、年份、語言、出版類型]\n' +
      '篩選人力：[例如 只有我一人、有同學可協助雙人篩選]\n\n' +
      '請完成：\n' +
      '1. 把條件整理成納入與排除標準表，每條寫成可直接判斷「是／否」的句子，並附說明理由與邊界案例的判斷方式。\n' +
      '2. 設計兩階段篩選表：標題摘要篩選、全文篩選；欄位包括編號、書目、判定、排除理由代碼、備註、判定者。\n' +
      '3. 說明 PRISMA 風格流程圖的各階段（檢索、去重、標題摘要篩選、全文篩選、納入），並提供一個空白流程模板，數字欄位用「[n=__]」保留給我填。\n' +
      '4. 建議如何處理判定不一致（例如雙人篩選後討論、先試篩 [篇數] 篇校準標準）。\n\n' +
      '限制：' + NO_FABRICATION + '流程圖的數字必須由我依實際篩選填入，不得推估。提醒我以 PRISMA 官方文件的最新版本為準。',
    tags: ['文獻', '文獻篩選', '納入排除', 'PRISMA', '系統性回顧'],
    keywords: ['inclusion criteria', 'exclusion criteria', 'screening', 'PRISMA flow diagram', 'systematic review', '篩選標準'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r03', 'research-r11'],
    caution: CAUTION_BASE,
    addedOrder: 2,
  },
  {
    id: 'lit-05',
    title: '系統性回顧檢索策略規劃',
    category: 'literature',
    subcategory: '文獻檢索',
    description: '用 PICO 等架構規劃系統性回顧的完整檢索計畫：資料庫選擇、檢索式版本、補充檢索與紀錄方式。',
    content:
      '我要進行系統性回顧（或較嚴謹的文獻回顧），請協助我規劃完整的檢索策略計畫書。\n\n' +
      '回顧問題：[貼上]\n' +
      '學門：[例如 教育、心理、運動科學、護理]\n' +
      '可使用的資料庫（依學校圖書館實際訂閱）：[列出]\n' +
      '時間與人力：[例如 一學期、一人]\n\n' +
      '請完成：\n' +
      '1. 用適合的架構拆解問題（例如 PICO、PICo、SPIDER），說明為什麼選這個架構，並列出各要素。\n' +
      '2. 資料庫策略：依我的學門說明各類資料庫的角色（綜合型、學科型、學位論文、在地中文資料），並提醒我向圖書館確認可用範圍。\n' +
      '3. 檢索式規劃：主檢索式的概念區塊、自由詞與主題詞並用的原則，以及如何把主檢索式改寫成各資料庫版本（只說明原則，語法以各資料庫說明頁為準）。\n' +
      '4. 補充檢索：引用追蹤（往前、往後）、手動翻查期刊、灰色文獻、聯絡作者。\n' +
      '5. 紀錄與重現：需要記錄的項目、檢索日期、匯出與去重方式，以及請圖書館員或同儕檢查檢索式的時機。\n\n' +
      '限制：' + NO_FABRICATION + '不要列出具體文獻或宣稱某主題已有多少研究；不確定某資料庫是否收錄某領域時請標示「請向圖書館確認」。',
    tags: ['文獻', '系統性回顧', '檢索策略', '資料庫', 'PICO'],
    keywords: ['systematic review', 'search strategy', 'PICO', 'database selection', 'citation chasing', '系統性文獻回顧'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r03', 'research-r11', 'agent-l04'],
    caution: CAUTION_BASE + '正式系統性回顧建議參考 PRISMA、Cochrane 或 JBI 等官方指引，並與圖書館員討論。',
    addedOrder: 2,
  },
  {
    id: 'lit-06',
    title: '文獻管理工具使用規劃',
    category: 'literature',
    subcategory: '文獻整理',
    description: '依你的寫作環境與合作方式，規劃 Zotero、EndNote 等文獻管理工具的資料夾、標籤、筆記與引用流程。',
    content:
      '請協助我規劃論文期間的文獻管理方式，並建立一套我能持續使用的流程。\n\n' +
      '我考慮或已在使用的工具：[例如 Zotero、EndNote、Mendeley、其他]\n' +
      '寫作環境：[例如 Word、Google 文件、LaTeX]\n' +
      '目前文獻數量與狀態：[例如 約 80 篇 PDF 散在資料夾、部分有書目、部分沒有]\n' +
      '是否需要與他人共用：[例如 與研究室同學共用文獻庫]\n' +
      '引用格式：[例如 APA 第 7 版、系所指定格式]\n\n' +
      '請完成：\n' +
      '1. 比較我考慮的工具在我的情境下的取捨（以一般功能類型說明，例如瀏覽器擷取、文書處理器外掛、群組共享、PDF 註記），並提醒我以各工具官網目前的功能與授權為準。\n' +
      '2. 設計資料夾或集合結構，以及標籤規則（例如 依章節、依閱讀狀態、依研究方法），附命名規則。\n' +
      '3. 規劃一篇文獻從找到 → 匯入 → 檢查書目 → 閱讀筆記 → 引用的流程，標出需要人工核對書目欄位的步驟。\n' +
      '4. 備份與同步的注意事項，以及中文文獻書目常見的匯入問題與處理方式。\n\n' +
      '限制：' + NO_FABRICATION + '不得編造工具的功能、價格或選單位置；不確定處請標示「請以官方說明為準」。',
    tags: ['文獻', '文獻管理', 'Zotero', 'EndNote', '書目'],
    keywords: ['reference manager', 'Zotero', 'EndNote', 'Mendeley', 'citation management', 'bibliography', '書目管理'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['research-r04', 'research-r11', 'agent-l05'],
    caution: CAUTION_BASE + '各文獻管理工具的功能、授權與費用可能因版本與學校授權而不同，請以官方說明與圖書館公告為準。',
    addedOrder: 2,
  },
  {
    id: 'lit-07',
    title: '中英文關鍵字對照與主題詞（MeSH 等）概念',
    category: 'literature',
    subcategory: '文獻檢索',
    description: '建立中英文概念對照表，理解自由詞與控制詞彙（如 MeSH、ERIC Thesaurus）的差別，並規劃如何查證主題詞。',
    content:
      '請協助我建立研究主題的中英文關鍵字對照，並理解如何使用資料庫的主題詞（控制詞彙）。\n\n' +
      '研究主題：[貼上]\n' +
      '核心概念（中文）：[列出 2–4 個]\n' +
      '預計使用的資料庫：[例如 PubMed、ERIC、PsycINFO、華藝]\n\n' +
      '請完成：\n' +
      '1. 說明自由詞（關鍵字）與主題詞（例如 MeSH、ERIC Thesaurus、APA Thesaurus 這類控制詞彙）的差別、各自的優缺點，以及為何系統性檢索通常兩者並用。\n' +
      '2. 中英對照表：中文概念、英文常見用語、拼寫變化（英美拼法、單複數）、縮寫、可能對應的主題詞，主題詞欄一律標示「待在詞表中確認」。\n' +
      '3. 教我在資料庫中查證主題詞的步驟（以一般原則說明：查詞表、看定義與上下位詞、看已知相關文章被標了哪些主題詞）。\n' +
      '4. 提醒臺灣常用中文術語與中國大陸用語可能不同，並建議兩者是否都要檢索。\n\n' +
      '限制：' + NO_FABRICATION + '你提出的任何主題詞都只是候選，不得宣稱它一定是某詞表的正式詞彙；英文用語不確定是否為該領域常用時請標示「待確認」。',
    tags: ['文獻', '關鍵字', '主題詞', 'MeSH', '中英對照'],
    keywords: ['MeSH', 'controlled vocabulary', 'thesaurus', 'subject headings', 'keywords translation', '控制詞彙'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r03', 'chatgpt-a03'],
    caution: CAUTION_BASE,
    addedOrder: 2,
  },
  {
    id: 'lit-08',
    title: '判斷研究設計與證據等級',
    category: 'literature',
    subcategory: '批判閱讀',
    description: '依你提供的方法段落，辨識一篇研究的設計類型、它能支持什麼程度的結論，以及證據等級的判斷限制。',
    content:
      '請協助我判斷一篇研究的研究設計與證據強度，讓我在文獻回顧中給予適當的權重。\n\n' +
      '文獻書目（由我提供）：[作者，年份，標題]\n' +
      '方法段落摘錄（研究對象、分派方式、有無對照組、資料蒐集時間點、分析方式）：\n[貼上]\n' +
      '作者宣稱的主要結論：[貼上]\n' +
      '我的學門：[例如 教育、護理、運動科學]\n\n' +
      '請完成：\n' +
      '1. 根據摘錄判斷研究設計（例如隨機對照試驗、準實驗、世代研究、橫斷調查、個案研究、質性研究、系統性回顧），逐項列出判斷依據；摘錄不足以判斷時寫「資訊不足」。\n' +
      '2. 說明常見證據等級架構的一般概念，並提醒：不同學門與指引的分級方式不同，質性研究不適用同一把尺。\n' +
      '3. 評估作者的結論是否與設計相稱（例如橫斷設計卻宣稱因果），列出結論中超出設計的部分。\n' +
      '4. 建議我還要檢查的品質面向，並提醒可使用的正式評讀工具類型（例如針對隨機試驗或質性研究的評讀清單），由我自行查找官方版本。\n\n' +
      '限制：' + NO_FABRICATION + '只根據我貼上的摘錄判斷，不要憑記憶補充這篇文獻的內容；最終判斷需由我閱讀全文確認。',
    tags: ['文獻', '證據等級', '研究設計', '批判閱讀', '實證'],
    keywords: ['levels of evidence', 'study design', 'evidence hierarchy', 'critical appraisal', 'evidence-based', '證據金字塔'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r06', 'research-r04'],
    caution: CAUTION_BASE,
    addedOrder: 2,
  },
  {
    id: 'lit-09',
    title: '單篇論文批判性閱讀導引',
    category: 'literature',
    subcategory: '批判閱讀',
    description: '帶著問題讀一篇論文：拆解研究問題、方法、結果與限制，並先寫下自己的判斷再與 AI 的觀察比較。',
    content:
      '請引導我批判性閱讀一篇論文。我希望練習自己判斷，所以請依步驟進行，不要一次給完答案。\n\n' +
      '論文書目：[作者，年份，標題]\n' +
      '我貼上的論文內容（摘要、方法、結果、討論的段落；請注意授權範圍）：\n[貼上]\n' +
      '我讀這篇的目的：[例如 作為文獻探討的依據、課堂報告、參考研究工具]\n\n' +
      '步驟：\n' +
      '1. 先問我 4 個問題：研究問題是什麼、用什麼方法回答、主要發現是什麼、我認為最大的限制是什麼。等我回答後再繼續。\n' +
      '2. 根據我貼上的內容，比較我的回答與文本：哪裡理解正確、哪裡遺漏或誤讀，引用原文短句作依據。\n' +
      '3. 依面向提出批判性問題：研究問題是否清楚、樣本與抽樣、測量工具、分析是否適當、結果是否支持結論、作者是否承認限制、利益衝突。\n' +
      '4. 最後整理一張閱讀卡：重點、優點、限制、對我研究的用處、還需查證的地方。\n\n' +
      '限制：' + NO_FABRICATION + '只根據我貼上的段落，不要憑記憶補充這篇論文的其他內容或評價；沒貼上的部分請標示「未提供」。',
    tags: ['文獻', '批判閱讀', '論文閱讀', '研究評讀', '閱讀卡'],
    keywords: ['critical reading', 'critical appraisal', 'paper reading', 'journal article', 'reading guide', '論文閱讀'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['research-r04', 'chatgpt-a02', 'literacy-c01'],
    caution: CAUTION_BASE + '上傳或貼上全文前請確認授權與學校規範，可只貼必要段落。',
    addedOrder: 2,
  },
  {
    id: 'lit-10',
    title: '文中引用與參考文獻清單一致性檢查',
    category: 'literature',
    subcategory: '引用格式',
    description: '比對整份稿件的文中引用與參考文獻清單，找出漏列、多列、作者拼寫或年份不一致的地方。',
    content:
      '請協助我檢查論文中的文中引用與參考文獻清單是否一一對應。\n\n' +
      '引用格式：[例如 APA 第 7 版]\n' +
      '文中引用（我從各章節擷取出的所有引用，或貼上含引用的段落）：\n[貼上]\n' +
      '參考文獻清單：\n[貼上]\n\n' +
      '請完成：\n' +
      '1. 建立對照表：文中引用、對應的參考文獻編號、狀態（一致／只在文中出現／只在清單出現／作者拼寫不同／年份不同／同作者同年未加 a、b 區分）。\n' +
      '2. 檢查文中引用寫法：多位作者的簡寫規則、中英文作者的寫法、多筆引用的排序、二手引用的標示方式是否一致。\n' +
      '3. 列出待我處理的清單，依「必須修正」與「建議確認」分類。\n' +
      '4. 若我貼上的資料不完整（例如只貼了部分章節），請說明檢查範圍的限制。\n\n' +
      '嚴格限制：' + NO_FABRICATION + '不得自行補上缺漏的書目資料，也不得判斷哪個年份才是「正確的」；不一致之處一律標示，請我回原始文獻或資料庫核對後再修正。',
    tags: ['文獻', '引用', '參考文獻', '一致性', 'APA'],
    keywords: ['in-text citation', 'reference list', 'citation consistency', 'cross-check', 'APA 7', '引用核對'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['research-r09', 'research-r04'],
    caution: CAUTION_BASE + '引用格式細節以官方手冊與系所規定為準。',
    addedOrder: 2,
  },
  {
    id: 'lit-11',
    title: '灰色文獻與政府報告的使用與查核',
    category: 'literature',
    subcategory: '來源查核',
    description: '判斷政府報告、統計資料、研討會論文、學位論文等灰色文獻能不能用、怎麼引用，以及要查核哪些細節。',
    content:
      '我想在論文中使用灰色文獻（非期刊出版的資料），請協助我判斷是否適合引用，以及引用前要查核什麼。\n\n' +
      '資料清單（每筆附：名稱、發布單位、日期、網址、文件類型，由我提供）：\n[貼上]\n' +
      '我想用它來支持的論點或數字：[貼上]\n' +
      '引用格式：[例如 APA 第 7 版]\n\n' +
      '請完成：\n' +
      '1. 逐筆分類（政府報告、官方統計、研究計畫成果報告、學位論文、研討會論文、預印本、機構白皮書、新聞稿等），並說明各類型的可信度考量與適合的用途。\n' +
      '2. 查核清單：是否為最新版本或已有更新、發布單位是否為原始來源（而非轉載）、統計的定義與時間範圍、是否經過審查、是否有正式出版版本可替代（例如預印本是否已正式刊登）。\n' +
      '3. 說明各類型在我指定的引用格式中通常需要的書目要素（例如發布單位、報告編號、網址、擷取日期），以佔位符示範，不要填入任何實際資料。\n' +
      '4. 提醒如何保存證據（例如下載存檔、記錄擷取日期），以免網頁更動。\n\n' +
      '限制：' + NO_FABRICATION + '不得補上報告編號、統計數字或網址；你無法確認的資訊請標示「無法確認」，提醒我直接到發布單位官網核對。',
    tags: ['文獻', '灰色文獻', '政府報告', '官方統計', '來源查核'],
    keywords: ['grey literature', 'gray literature', 'government report', 'official statistics', 'preprint', 'source verification', '政府出版品'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['chatgpt-a03', 'research-r03', 'research-r09'],
    caution: CAUTION_BASE + '政府與機構網站內容可能更新或移除，引用前請確認版本並保存原始檔。',
    addedOrder: 2,
  },
  {
    id: 'lit-12',
    title: '文獻回顧段落的論證結構回饋',
    category: 'literature',
    subcategory: '文獻回顧撰寫',
    description: '檢查你寫的文獻回顧段落是否有清楚的主張、證據與連結，指出逐篇堆疊、缺乏比較與結論懸空的地方。',
    content:
      '以下是我自己寫的一段文獻回顧，請針對論證結構給回饋，讓我自行修改。\n\n' +
      '這一段在章節中的任務：[例如 說明某變項與學習成效的關係仍有爭議，帶出本研究問題]\n' +
      '段落草稿：\n[貼上]\n' +
      '段落中引用的文獻重點（我的筆記，作為核對依據）：[貼上，可空白]\n\n' +
      '請依下列結構分析：\n' +
      '1. 拆解段落：主題句（主張）、支持證據（哪些句子、引用哪些文獻）、比較或評論、小結或過渡。用表格標示每一句的功能。\n' +
      '2. 指出問題：逐篇堆疊沒有比較、只有描述沒有評論、主張與證據不相符、引用的文獻無法支持該句（依我的筆記判斷）、結尾沒有連回本研究。\n' +
      '3. 提出 2–3 種重組段落的方式（說明順序與每部分該寫什麼），不直接寫成完整段落。\n' +
      '4. 列出段落中需要回原文確認引用是否正確的句子。\n\n' +
      '限制：' + NO_FABRICATION + '不得建議我加入任何你憑記憶提出的文獻；若證據不足，只描述需要哪一類文獻。提醒我依規定揭露 AI 協助情形。',
    tags: ['文獻', '文獻回顧', '論證', '段落結構', '學術寫作'],
    keywords: ['literature review paragraph', 'argument structure', 'academic writing', 'synthesis', 'feedback', '論證結構'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r09', 'research-r05', 'literacy-c02'],
    caution: CAUTION_BASE,
    addedOrder: 2,
  },
]
