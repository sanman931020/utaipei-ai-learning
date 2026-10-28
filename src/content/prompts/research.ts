import type { PromptItem } from '../types'

const CAUTION_BASE =
  '請逐筆查核 AI 提到的文獻、作者、年份與 DOI 是否真實存在並與原文一致；不要上傳個資、受試者資料或未經許可的研究資料；使用前請確認授課教師、學校與期刊對 AI 使用的規定。'

export const researchPrompts: PromptItem[] = [
  {
    id: 'research-01',
    title: '研究問題發想',
    category: 'research',
    subcategory: '研究問題',
    description: '從你的興趣、觀察與已讀資料出發，發想多個研究問題方向，並說明每個方向需要先確認的事。',
    content:
      '你是一位協助研究生釐清研究方向的指導助理。請根據我提供的資訊，協助我發想研究問題。\n\n' +
      '我的學門與系所：[學門／系所]\n' +
      '我感興趣的現象或議題：[描述你觀察到的現象]\n' +
      '我已經讀過或知道的資料（作者、年份、重點，由我提供）：[列出，可空白]\n' +
      '可能的研究對象與場域：[例如國小教師、大學生、某社區]\n' +
      '時間與資源限制：[例如一學期、無經費]\n\n' +
      '請完成：\n' +
      '1. 提出 5 個研究問題草案，涵蓋不同類型（描述型、關係型、比較型、歷程或經驗型、行動或設計型）。\n' +
      '2. 每個問題說明：核心變項或概念、可能的研究取向（量化／質性／混合）、需要什麼資料。\n' +
      '3. 每個問題列出「我需要先去查證的事」，例如此議題是否已有大量研究、概念定義是否有共識。\n\n' +
      '限制：\n' +
      '- 不得編造文獻、作者、DOI、數據或研究結果；不要用「研究顯示」這類說法，除非是我提供的資料。\n' +
      '- 只根據我提供的資料與一般方法論知識回答；不確定處請標示「待查證」。\n' +
      '- 提醒我自行到資料庫查核原始文獻後再決定方向。\n' +
      '若我的描述太模糊，請先問我 3 個問題幫助聚焦，再開始發想。',
    tags: ['研究', '研究問題', '論文', '題目發想', '研究方向'],
    keywords: ['research question', 'topic ideation', 'thesis topic', 'research direction', '論文題目'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r02', 'research-r01'],
    featured: true,
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-02',
    title: '研究問題可行性評估',
    category: 'research',
    subcategory: '研究問題',
    description: '從資料取得、時間、倫理、方法能力等面向，逐項檢視一個研究問題能不能做、要怎麼縮小範圍。',
    content:
      '請協助我評估以下研究問題的可行性。\n\n' +
      '研究問題：[你的研究問題]\n' +
      '預計研究方法：[例如問卷、訪談、次級資料分析]\n' +
      '預計研究對象與取得方式：[對象、人數、如何接觸]\n' +
      '時程：[可用時間]\n' +
      '我具備的能力與資源：[例如會用 SPSS、有指導教授、無經費]\n\n' +
      '請用表格逐項評估以下面向，每項給「可行／有風險／不可行」與理由：\n' +
      '概念是否可操作化、資料取得、樣本數或資料量、時間、研究倫理與同意程序、所需技術能力、研究貢獻是否清楚。\n\n' +
      '接著：\n' +
      '1. 指出風險最高的 2–3 項，並提出具體的縮小範圍或替代做法。\n' +
      '2. 提出 1–2 個調整後的研究問題版本。\n' +
      '3. 列出我應該與指導教授討論的問題。\n\n' +
      '限制：不得編造文獻、數據或「過去研究多半如何」的說法；只根據我提供的資訊與一般研究方法原則判斷；不確定處請標示，並提醒我查核原始文獻與學校的研究倫理審查規定。',
    tags: ['研究', '可行性', '研究問題', '研究設計', '論文'],
    keywords: ['feasibility', 'research scope', 'research design', 'thesis planning', '研究範圍'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r02', 'research-r10'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-03',
    title: '關鍵字、同義詞與布林檢索式',
    category: 'literature',
    subcategory: '文獻檢索',
    description: '把研究問題拆成概念，整理中英文關鍵字與同義詞，並組成可在資料庫使用的布林檢索式。',
    content:
      '請協助我把研究問題轉成資料庫檢索策略。\n\n' +
      '研究問題：[你的研究問題]\n' +
      '預計使用的資料庫：[例如華藝、臺灣博碩士論文知識加值系統、ERIC、Scopus、Web of Science]\n' +
      '已知的關鍵字：[可空白]\n' +
      '納入條件：[年份範圍、語言、文獻類型]\n\n' +
      '請依序：\n' +
      '1. 把研究問題拆成 2–4 個核心概念（例如對象、介入或現象、結果）。\n' +
      '2. 每個概念列出中文關鍵字、英文關鍵字、同義詞、縮寫、上下位詞，以表格呈現。\n' +
      '3. 組成布林檢索式：同概念用 OR、不同概念用 AND，必要時使用截字符號（*）與片語引號；分別提供寬鬆版與精準版。\n' +
      '4. 說明不同資料庫語法可能不同，提醒我查看該資料庫的說明頁。\n' +
      '5. 建議檢索結果太多或太少時，各可以如何調整。\n\n' +
      '限制：不要列出任何具體文獻或作者，也不得編造文獻或 DOI；只提供檢索詞與策略。若某個英文術語不確定是否為該領域常用詞，請標示「待確認」，並提醒我從找到的文獻與主題詞表（thesaurus）核對。',
    tags: ['研究', '文獻檢索', '關鍵字', '布林邏輯', '資料庫'],
    keywords: ['Boolean search', 'search string', 'keywords', 'synonyms', 'database search', 'literature search'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r03', 'chatgpt-a03'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-04',
    title: '學術文獻整理',
    category: 'literature',
    subcategory: '文獻整理',
    description: '只根據你提供的摘要或閱讀筆記，把多篇文獻整理成結構一致的重點卡，並標示資訊缺漏處。',
    content:
      '你是一位嚴謹的研究助理。以下是我整理的多篇文獻資料（每篇包含書目資訊與摘要或我的閱讀筆記）：\n\n' +
      '[貼上文獻資料，每篇以「文獻 1」「文獻 2」分隔]\n\n' +
      '我的研究問題：[研究問題]\n\n' +
      '請為每一篇文獻建立一張重點卡，欄位如下：\n' +
      '- 書目資訊（照我提供的抄錄，不要補寫）\n' +
      '- 研究目的或問題\n' +
      '- 研究方法（對象、樣本數、資料蒐集與分析方式）\n' +
      '- 主要發現\n' +
      '- 與我的研究問題的關聯\n' +
      '- 資料中缺少的資訊\n\n' +
      '最後用 5–8 句整理這些文獻的共同點與分歧點，每句註明依據哪幾篇（用「文獻 N」標示）。\n\n' +
      '嚴格限制：\n' +
      '- 只根據我提供的內容整理，不得編造或補充文獻、作者、DOI、數據或研究結果。\n' +
      '- 我提供的資料沒寫到的欄位，請填「資料未提供」，不要推測。\n' +
      '- 你的解讀與推論要和原文內容分開，並標示「推論」。\n' +
      '- 提醒我：摘要不等於全文，重要結論請回原文核對。',
    tags: ['研究', '文獻', '文獻回顧', '論文', '閱讀筆記'],
    keywords: ['Literature Review', 'paper', 'literature notes', 'summary', '論文', '文獻回顧', 'reading notes'],
    supportedTools: ['ChatGPT', 'Gemini'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r04', 'gemini-b02', 'chatgpt-a03'],
    featured: true,
    caution:
      '上傳 PDF 前請確認檔案授權與學校規範，並確認 AI 是否正確讀取全文。' + CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-05',
    title: '資料庫檢索紀錄表',
    category: 'literature',
    subcategory: '文獻檢索',
    description: '把你實際做過的檢索整理成可重現的檢索紀錄，方便寫進研究方法或文獻回顧的說明。',
    content:
      '我在不同資料庫做了文獻檢索，以下是我的原始紀錄（可能很零散）：\n\n' +
      '[貼上你的紀錄：日期、資料庫、使用的檢索式、篩選條件、筆數、保留幾篇]\n\n' +
      '請協助我：\n' +
      '1. 整理成一張檢索紀錄表，欄位：日期、資料庫、檢索式（原樣保留）、限定條件、檢索結果筆數、初篩保留筆數、備註。\n' +
      '2. 依照我提供的數字，整理篩選流程：檢索總數 → 去除重複 → 標題摘要篩選 → 全文篩選 → 最終納入，並列出每一階段的排除原因（以我提供的為準）。\n' +
      '3. 檢查紀錄是否有缺漏或前後數字不一致之處，列成待補清單。\n' +
      '4. 根據整理結果，寫一段 150 字左右的檢索過程說明草稿，供我修改後放入論文。\n\n' +
      '限制：不得修改、推算或補上我沒提供的數字；數字對不起來時直接指出，不要自行調整。不得編造任何文獻或 DOI。不確定處請標示，並提醒我回資料庫核對原始檢索結果。',
    tags: ['研究', '文獻檢索', '檢索紀錄', '資料庫', '系統性回顧'],
    keywords: ['search log', 'PRISMA', 'search documentation', 'database search', 'systematic review'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r03', 'research-r11'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-06',
    title: 'Deep Research 研究範圍設定',
    category: 'research',
    subcategory: '研究問題',
    description: '在啟動 Deep Research 前，先寫清楚研究範圍、納入排除條件與報告格式，並要求來源可追溯。',
    content:
      '請針對以下主題進行深度研究，並在開始前先向我提出研究計畫讓我確認。\n\n' +
      '研究主題：[主題]\n' +
      '研究目的：[例如了解現況、作為文獻回顧的起點、比較不同做法]\n' +
      '範圍設定：\n' +
      '- 時間範圍：[例如近 10 年]\n' +
      '- 地區或對象：[例如臺灣高等教育]\n' +
      '- 來源類型優先順序：[例如同儕審查期刊、政府公開資料、國際組織報告]\n' +
      '- 排除：[例如商業廣告、無作者的網頁、內容農場]\n' +
      '要回答的子問題：\n' +
      '1. [子問題 1]\n' +
      '2. [子問題 2]\n' +
      '3. [子問題 3]\n\n' +
      '報告要求：\n' +
      '- 每個重要論點都要附上可點擊的來源連結，並註明來源類型。\n' +
      '- 不得編造文獻、作者、DOI、數據或研究結果；找不到來源的說法請明確寫「未找到可靠來源」。\n' +
      '- 區分「來源明確說的」與「你的綜合推論」。\n' +
      '- 列出不同來源之間的矛盾或不一致。\n' +
      '- 最後列出這份報告的限制與我應該優先回原文查核的 5 個重點。',
    tags: ['研究', 'Deep Research', '研究範圍', '文獻', '資料蒐集'],
    keywords: ['Deep Research', 'research scope', 'research plan', 'literature scan', '深度研究'],
    supportedTools: ['Gemini'],
    difficulty: '研究應用',
    relatedLessonIds: ['gemini-b02', 'research-r03', 'chatgpt-a03'],
    caution:
      '需你的方案與地區支援 Gemini Deep Research（或其他工具的同類功能），功能名稱與額度可能不同。啟動後請先檢查並修改 AI 提出的研究計畫再執行；報告不是已查核的文獻回顧，每個來源都要點開確認。' +
      CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-07',
    title: '摘要與原文對照查核',
    category: 'literature',
    subcategory: '文獻整理',
    description: '把 AI 或自己寫的摘要與原文段落逐句對照，找出曲解、過度推論與遺漏。',
    content:
      '請幫我核對一份摘要是否忠於原文。\n\n' +
      '原文段落（由我從文獻中摘錄）：\n[貼上原文]\n\n' +
      '待核對的摘要：\n[貼上摘要，可能是 AI 產生或我自己寫的]\n\n' +
      '請逐句檢查摘要，輸出表格：摘要句子、對應的原文位置（引用原文短句）、判定（一致／過度推論／曲解／原文找不到）、說明。\n\n' +
      '接著列出：\n' +
      '1. 原文中重要但摘要遺漏的內容。\n' +
      '2. 摘要中數字、樣本、研究對象、因果用語（例如把「相關」寫成「導致」）是否與原文一致。\n' +
      '3. 修正後的摘要建議版本，只能使用原文支持的內容。\n\n' +
      '限制：只根據我貼上的原文判斷，不得編造文獻、作者、DOI、數據或研究結果，也不要引用你記憶中的其他文獻；原文不足以判斷時請標示「無法判斷」。提醒我：我貼的只是片段，最終仍需對照完整原文。',
    tags: ['研究', '摘要', '查核', '文獻', '原文對照'],
    keywords: ['summary verification', 'fact check', 'faithfulness', 'source check', 'hallucination', '摘要核對'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r04', 'chatgpt-a03', 'gemini-b02', 'literacy-c01'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-08',
    title: '文獻矩陣建立',
    category: 'literature',
    subcategory: '文獻整理',
    description: '依照你自訂的比較面向，把已整理的文獻放進矩陣，快速看出研究之間的異同。',
    content:
      '請把我提供的文獻資料整理成文獻矩陣（literature matrix）。\n\n' +
      '文獻資料（書目＋我的筆記或摘要）：\n[貼上，每篇以「文獻 1」「文獻 2」分隔]\n\n' +
      '我想比較的面向：[例如研究對象、理論基礎、研究方法、測量工具、主要發現、研究限制]\n\n' +
      '請輸出：\n' +
      '1. 一張矩陣表：列為文獻（作者＋年份，照我提供的寫）、欄為比較面向。\n' +
      '2. 資料沒提到的格子填「未提供」，不要推測。\n' +
      '3. 矩陣下方，依每個比較面向寫 1–2 句觀察（例如多數研究採問卷、對象集中於某族群），並標示依據哪幾篇。\n' +
      '4. 建議我還可以新增哪些比較面向。\n\n' +
      '限制：只根據我提供的資料，不得編造或新增文獻、作者、DOI、數據或研究結果；不確定的歸類請加註「待確認」，並提醒我回原文核對矩陣內容。輸出可直接貼到試算表的格式（用 Markdown 表格）。',
    tags: ['研究', '文獻矩陣', '文獻回顧', '比較', '論文'],
    keywords: ['literature matrix', 'synthesis matrix', 'literature review', 'comparison table', '文獻比較表'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r05', 'research-r04'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-09',
    title: '研究缺口分析',
    category: 'literature',
    subcategory: '文獻回顧撰寫',
    description: '根據你整理好的文獻矩陣，找出尚未被研究或研究不足的方向，並區分有依據與推測的缺口。',
    content:
      '以下是我整理的文獻矩陣與筆記：\n\n[貼上文獻矩陣或整理表]\n\n' +
      '我的初步研究興趣：[一句話說明]\n\n' +
      '請協助我分析研究缺口：\n' +
      '1. 從對象、情境、方法、理論、測量、時間或地區等角度，找出這批文獻中較少被探討的部分，每個缺口都要指出依據（哪幾篇、在矩陣哪一欄）。\n' +
      '2. 區分兩種缺口：「在我提供的文獻中未出現」與「可能整個領域都較少」——後者你無法確定，必須標示「需進一步檢索確認」。\n' +
      '3. 為最有潛力的 2–3 個缺口，各提出一個可能的研究問題，並說明我還需要檢索什麼來確認這真的是缺口。\n\n' +
      '限制：不得編造文獻、作者、DOI、數據或研究結果；不得宣稱「目前尚無研究」，除非我提供的資料能支持。只根據我提供的資料推論，不確定處請標示，並提醒我以更完整的檢索與原文閱讀確認缺口。',
    tags: ['研究', '研究缺口', '文獻回顧', '研究問題', '論文'],
    keywords: ['research gap', 'gap analysis', 'literature review', 'future research', '研究空白'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r05', 'research-r02'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-10',
    title: '理論架構與概念關係圖',
    category: 'research',
    subcategory: '研究架構',
    description: '把你選用的理論與研究變項整理成概念關係，檢查架構是否一致，並產出可畫圖的結構。',
    content:
      '請協助我整理研究的理論架構。\n\n' +
      '研究問題：[研究問題]\n' +
      '我採用的理論或模型（以及我讀到的定義，附出處）：[例如 [理論名稱]：[我摘錄的定義]，[作者，年份]]\n' +
      '研究變項或核心概念：[列出，並說明我打算如何定義或測量]\n' +
      '我假設的關係：[例如 A 影響 B，C 在其中扮演調節角色]\n\n' +
      '請完成：\n' +
      '1. 以表格整理：概念、理論中的對應構念、我的操作型定義、依據（引用我提供的出處）。\n' +
      '2. 檢查一致性：我的假設關係是否能由所選理論支持？有沒有概念沒有理論依據、或理論中的重要構念被我忽略？\n' +
      '3. 用文字描述架構圖（方塊與箭頭），並另外輸出一段 Mermaid 流程圖語法，方便我畫圖。\n' +
      '4. 列出我應該和指導教授確認的問題。\n\n' +
      '限制：只根據我提供的理論定義與出處，不得編造文獻、作者、DOI、數據或研究結果；若你知道該理論的其他說法，請標示「需查證原典」而不是直接寫入。不確定處請標示。',
    tags: ['研究', '理論架構', '概念架構', '研究設計', '論文'],
    keywords: ['theoretical framework', 'conceptual framework', 'model', 'variables', 'Mermaid', '研究架構'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r06', 'research-r05'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-11',
    title: '研究方法比較與選擇',
    category: 'methods',
    subcategory: '研究設計',
    description: '針對同一個研究問題比較不同研究方法的適配度、成本與限制，協助你準備與指導教授討論。',
    content:
      '我的研究問題是：[研究問題]\n' +
      '我正在考慮的研究方法：[例如問卷調查、半結構訪談、準實驗、內容分析、混合方法]\n' +
      '條件：[可接觸的對象、時間、能力、是否需要通過倫理審查]\n\n' +
      '請協助我比較這些方法：\n' +
      '1. 表格比較：方法、能回答研究問題的哪個部分、需要的資料與樣本、分析方式、所需時間與能力、主要限制、倫理考量。\n' +
      '2. 說明每種方法能得出什麼樣的結論、不能得出什麼結論（例如問卷無法直接推論因果）。\n' +
      '3. 依我的條件提出建議方案與備案，並說明取捨。\n' +
      '4. 若研究問題本身和方法不太相容，請指出並建議如何改寫問題。\n\n' +
      '限制：以一般研究方法原則說明，不要引用具體文獻，不得編造文獻、數據或研究結果；不確定處請標示。提醒我參考研究方法教科書與指導教授意見，並自行查核相關方法論文獻。',
    tags: ['研究', '研究方法', '研究設計', '量化', '質性'],
    keywords: ['research methods', 'methodology', 'research design', 'qualitative', 'quantitative', 'mixed methods'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r06'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-12',
    title: '問卷題目初稿檢視',
    category: 'methods',
    subcategory: '研究工具',
    description: '檢查你自擬的問卷題目是否有雙重問題、誘導、模糊用詞與量尺不一致，並提出修改建議。',
    content:
      '以下是我自擬的問卷題目初稿，請協助我檢視題目品質。\n\n' +
      '研究目的與要測量的構念：[構念名稱與我的定義]\n' +
      '填答對象：[對象]\n' +
      '量尺：[例如 Likert 五點量表：1 非常不同意～5 非常同意]\n' +
      '題目：\n[貼上題目，附題號]\n\n' +
      '請逐題檢查並以表格輸出：題號、原題、問題類型（雙重問題、誘導、否定句、模糊詞、超出填答者知識、敏感用詞、與構念不符、量尺不搭）、修改建議。\n\n' +
      '接著：\n' +
      '1. 檢查各題是否都對應到我定義的構念，指出可能遺漏的面向。\n' +
      '2. 建議題目排列順序與反向題使用的注意事項。\n' +
      '3. 提醒預試（pilot）時可以觀察的重點。\n\n' +
      '限制：不得編造或宣稱某題來自既有量表，也不得編造信效度數據；若我要使用既有量表，請提醒我取得原作者授權並引用原始文獻。不確定處請標示。問卷不得蒐集非必要的個資。',
    tags: ['研究', '問卷', '量表', '題目設計', '研究工具'],
    keywords: ['questionnaire', 'survey design', 'Likert scale', 'item review', 'instrument', '問卷調查'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r06', 'research-r10'],
    caution: CAUTION_BASE + '正式施測前請依學校規定確認是否需要研究倫理審查。',
    addedOrder: 1,
  },
  {
    id: 'research-13',
    title: '訪談大綱設計',
    category: 'methods',
    subcategory: '質性方法',
    description: '依研究問題設計半結構式訪談大綱，包含主問題、追問與知情同意說明的要點。',
    content:
      '請協助我設計質性研究的半結構式訪談大綱。\n\n' +
      '研究問題：[研究問題]\n' +
      '研究目的：[目的]\n' +
      '受訪者特性：[例如在職教師、轉學生；不要提供可辨識個人的資訊]\n' +
      '訪談長度：[分鐘數]\n\n' +
      '請輸出：\n' +
      '1. 研究問題與訪談主題的對應表，確認每個研究問題都有訪談題目涵蓋。\n' +
      '2. 訪談大綱：開場說明（研究目的、錄音、匿名、可隨時退出）、暖身題、主問題 6–8 題（每題附 2 個追問），收尾題。\n' +
      '3. 每題檢查是否為開放式、是否有誘導或預設立場，必要時改寫。\n' +
      '4. 標示可能觸及敏感經驗的題目，並建議提問方式與受訪者不適時的處理。\n\n' +
      '限制：不得編造文獻、作者、DOI 或研究結果作為題目依據；若需要理論依據，請標示「需查證文獻」。只根據我提供的研究問題設計，不確定處請標示並先問我。',
    tags: ['研究', '訪談', '質性研究', '訪談大綱', '研究工具'],
    keywords: ['interview protocol', 'semi-structured interview', 'qualitative research', 'interview guide', '深度訪談'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r06', 'research-r10'],
    caution: CAUTION_BASE + '訪談逐字稿含受訪者資料，請勿未經去識別化就上傳到 AI 工具。',
    addedOrder: 1,
  },
  {
    id: 'research-14',
    title: '來源可信度查核',
    category: 'literature',
    subcategory: '來源查核',
    description: '針對一筆你找到的資料或 AI 給出的說法，逐項檢查來源可信度，並列出回頭查核原始來源的步驟。',
    content:
      '請協助我評估以下資料來源的可信度。\n\n' +
      '說法或資料內容：[貼上你要查核的句子或段落]\n' +
      '來源資訊：[網址、出版單位、作者、日期、文獻類型；若是 AI 回答，請註明「AI 產生，來源未知」]\n' +
      '我打算如何使用它：[例如寫在文獻回顧、作為背景數據]\n\n' +
      '請依下列面向逐項評估，並以表格呈現「觀察到的事實／疑慮／我該怎麼查」：\n' +
      '作者與單位權威性、出版管道（同儕審查、政府、媒體、個人網站）、日期與時效、證據與引用是否可追溯、利益衝突或立場、與其他來源是否一致。\n\n' +
      '接著：\n' +
      '1. 給出整體判斷（可直接引用／需找原始出處／不建議使用）與理由。\n' +
      '2. 列出我應該去找的原始來源類型，以及可以用哪些關鍵字或管道查。\n' +
      '3. 若這是 AI 給的說法，提醒我哪些部分最可能是錯的。\n\n' +
      '限制：只根據我提供的資訊判斷，不得編造來源、作者、DOI、數據或研究結果；你無法確認的部分請標示「無法確認」，並提醒我自行打開原始來源核對。',
    tags: ['研究', '來源查核', '資訊查核', '可信度', '文獻'],
    keywords: ['source check', 'fact checking', 'credibility', 'CRAAP', 'information literacy', '事實查核'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['chatgpt-a03', 'gemini-b02', 'literacy-c01', 'research-r04'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-15',
    title: 'APA 7 參考文獻格式檢查',
    category: 'literature',
    subcategory: '引用格式',
    description: '檢查你提供的參考文獻清單是否符合 APA 第 7 版格式，列出每一筆需要修改的地方。',
    content:
      '請依 APA 第 7 版格式，檢查我提供的參考文獻清單。\n\n' +
      '參考文獻清單：\n[貼上你的參考文獻，每筆一行]\n\n' +
      '文中引用的寫法範例（可選）：[貼上幾處文中引用]\n\n' +
      '請逐筆檢查並以表格輸出：編號、原始寫法、問題（作者格式、年份、標題大小寫與斜體、期刊卷期頁碼、DOI 或網址格式、中文文獻格式等）、建議修正寫法。\n\n' +
      '接著：\n' +
      '1. 檢查排序是否正確（中英文文獻排序方式請依我的系所規定：[系所規定，若不知道請留空]）。\n' +
      '2. 若有提供文中引用，檢查文中引用與參考文獻是否一一對應。\n' +
      '3. 列出你無法判斷的項目（例如缺卷期、文獻類型不明）。\n\n' +
      '嚴格限制：只修正格式，不得補上或猜測缺少的作者、年份、頁碼、卷期或 DOI；缺少的資訊請標示「[缺：卷期]」這類佔位，提醒我回原始文獻或資料庫查核。不得編造或新增任何文獻、作者或 DOI。',
    tags: ['研究', '參考文獻', 'APA', '引用格式', '論文'],
    keywords: ['APA 7', 'reference list', 'citation format', 'bibliography', 'references', '引文格式'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['research-r09'],
    caution: CAUTION_BASE + '格式細節以 APA 官方手冊與系所規定為準。',
    addedOrder: 1,
  },
  {
    id: 'research-16',
    title: '依我的研究內容草擬摘要',
    category: 'research',
    subcategory: '論文結構',
    description: '根據你已完成的研究內容，整理出結構完整的摘要草稿，並檢查有無超出研究結果的說法。',
    content:
      '請根據我提供的研究內容，協助我草擬論文摘要的初稿，我會再自行修改。\n\n' +
      '研究目的與問題：[貼上]\n' +
      '研究方法（對象、樣本、工具、分析）：[貼上]\n' +
      '主要結果（我自己的分析結果與數字）：[貼上]\n' +
      '結論與建議：[貼上]\n' +
      '字數限制：[例如 300 字]；語言：[中文／英文]\n\n' +
      '請完成：\n' +
      '1. 依「背景與目的、方法、結果、結論」結構寫出摘要草稿，符合字數限制。\n' +
      '2. 提供 3–5 個關鍵詞建議。\n' +
      '3. 自我檢查：列出摘要中每個數字與結論句，對應到我提供的哪一段內容；若有任何句子超出我的結果（例如把相關寫成因果、過度概化），請標示並修正。\n\n' +
      '限制：只使用我提供的內容，不得編造文獻、作者、DOI、數據或研究結果，也不得修改我提供的數字；資訊不足的部分請標示「[待補]」並向我提問。提醒我：摘要需由我自己定稿，並依學校或期刊規定揭露 AI 協助的情形。',
    tags: ['研究', '摘要', '論文寫作', '學術寫作', '關鍵詞'],
    keywords: ['abstract', 'academic writing', 'thesis abstract', 'keywords', 'summary', '論文摘要'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r09', 'research-r10', 'literacy-c02'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-17',
    title: '研究限制與未來研究建議',
    category: 'research',
    subcategory: '研究限制',
    description: '依你的研究設計與實際執行情況，系統化整理研究限制，並提出有根據的未來研究方向。',
    content:
      '請協助我整理論文的「研究限制與未來研究建議」。\n\n' +
      '研究設計摘要：[對象、抽樣方式、樣本數、工具、分析方法]\n' +
      '實際執行時遇到的狀況：[例如回收率低、某族群樣本不足、訪談時間受限]\n' +
      '主要發現：[我的結果重點]\n\n' +
      '請完成：\n' +
      '1. 依面向整理限制：抽樣與代表性、測量工具、研究設計（例如橫斷面無法推論因果）、資料蒐集過程、分析方法、研究者角色。每項說明「限制是什麼」與「對結果解讀的影響」。\n' +
      '2. 區分「我提供的資訊直接支持的限制」與「你依方法論推測可能存在的限制」，後者請標示「請確認是否適用」。\n' +
      '3. 針對主要限制，提出對應的未來研究建議，要具體（對象、方法或情境如何調整）。\n\n' +
      '限制：不得編造文獻、作者、DOI、數據或研究結果；不要寫「已有研究指出」，除非我提供了該文獻。不確定處請標示，並提醒我查核原始文獻後再引用。',
    tags: ['研究', '研究限制', '未來研究', '論文', '結論'],
    keywords: ['limitations', 'future research', 'discussion', 'thesis conclusion', '研究建議'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r09', 'research-r06'],
    caution: CAUTION_BASE,
    addedOrder: 1,
  },
  {
    id: 'research-18',
    title: '同儕審查式自我檢視',
    category: 'research',
    subcategory: '投稿與口試',
    description: '請 AI 以審查者角度檢視你的草稿，指出論證、方法與寫作上的問題，但不代為改寫成提交版本。',
    content:
      '請以學術期刊審查者的角度，審閱我自己撰寫的論文草稿片段，目的是讓我自行修改。\n\n' +
      '草稿類型與章節：[例如碩士論文第二章文獻探討]\n' +
      '研究領域：[領域]\n' +
      '草稿內容：\n[貼上草稿，建議一次一個章節]\n\n' +
      '請依以下結構給回饋：\n' +
      '1. 整體評估：3–5 句說明這段草稿的主要貢獻與最大問題。\n' +
      '2. 主要問題（major）：論證邏輯、研究問題與內容的一致性、方法描述是否足以重現、結論是否超出證據。\n' +
      '3. 次要問題（minor）：段落結構、術語一致性、表達不清處。\n' +
      '4. 每個問題都要引用草稿中的原句或指出段落位置，並說明「為什麼是問題」與「修改方向」，不要直接替我重寫整段。\n' +
      '5. 列出審查者可能會提出的 3 個質疑問題，讓我練習回應。\n\n' +
      '限制：不得編造文獻、作者、DOI、數據或研究結果，也不要建議我引用你憑記憶提出的特定文獻；若認為缺少某類文獻支持，請只描述需要的文獻類型。只根據我提供的草稿判斷，不確定處請標示，並提醒我查核草稿中引用的原始文獻。',
    tags: ['研究', '同儕審查', '論文', '回饋', '自我檢視'],
    keywords: ['peer review', 'self-critique', 'manuscript review', 'feedback', 'thesis draft', '審稿'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r09', 'gemini-b02', 'literacy-c02'],
    caution: CAUTION_BASE + '未發表的研究草稿請留意保密，必要時先刪除可辨識資料或改用校方核可的工具。',
    addedOrder: 1,
  },
]
