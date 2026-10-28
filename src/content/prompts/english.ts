import type { PromptItem } from '../types'

export const englishPrompts: PromptItem[] = [
  {
    id: 'english-01',
    title: '英文學術寫作文法與用詞回饋（不代寫）',
    category: 'english',
    subcategory: '學術英文',
    description: '針對你寫的英文學術段落，依錯誤類型列出問題與理由，幫你看懂自己常犯的錯，而不是整篇代寫。',
    content:
      '請擔任英文學術寫作助教，檢視我寫的英文段落。目的是讓我學會自己修改，請不要整篇改寫。\n\n' +
      '文本類型：[例如期末報告、研究計畫、碩士論文第二章]\n' +
      '學科領域：[領域]\n' +
      '我的英文程度與常見困擾：[例如時態常混用、冠詞不確定]\n' +
      '段落：\n[貼上英文段落，建議一次 200～400 字]\n\n' +
      '請輸出：\n' +
      '1. 錯誤清單表格：編號｜原句片段｜錯誤類型（文法、冠詞、時態、主詞動詞一致、介系詞、用詞搭配、語域過於口語、句構不清）｜為什麼錯（中文說明）｜建議修正。\n' +
      '2. 錯誤類型統計：哪 2～3 類最常出現，各附一條我可以自己檢查的規則。\n' +
      '3. 學術語氣：指出過於口語或主觀的用字（例如 a lot of, very, I think），提供較學術的替代選項，並說明在我的學科是否慣用。\n' +
      '4. 只挑 1 句示範完整修改，其餘由我依清單自己改。\n\n' +
      '限制：不更動我的論點與內容；你不確定的修改請標「可選」並說明兩種寫法的差異。',
    tags: ['英文寫作', '文法', '學術英文', '用詞', '英文修改', '回饋'],
    keywords: ['academic writing', 'grammar feedback', 'error analysis', 'collocation', 'register', 'proofreading'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['chatgpt-a02', 'literacy-c02', 'research-r09'],
    caution: '若作業或論文規範限制 AI 協助語言修改，請依授課教師、指導教授或期刊規定使用並揭露。',
    addedOrder: 2,
  },
  {
    id: 'english-02',
    title: '中文學術摘要翻成英文（附術語對照表）',
    category: 'english',
    subcategory: '翻譯',
    description: '把你自己寫好的中文摘要翻成英文學術摘要，先建立術語對照表再翻譯，並標出需要你決定的譯法。',
    content:
      '請協助我把自己寫的中文論文摘要翻譯成英文學術摘要。\n\n' +
      '論文類型與領域：[例如教育學碩士論文、運動科學期末專題]\n' +
      '目標格式：[例如 APA、投稿期刊要求、學校論文格式]；英文字數上限：[字數]\n' +
      '英美拼字偏好：[美式／英式]\n' +
      '我已確定的術語譯法（若有）：[中文＝英文]\n' +
      '中文摘要：\n[貼上摘要]\n\n' +
      '請分三步驟：\n' +
      '1. 術語對照表：中文術語｜建議英文｜其他可能譯法｜選擇理由。研究工具、量表、理論名稱若有正式英文名稱，請標「請以原始文獻核對」，不要自行創造。\n' +
      '2. 等我確認術語後再翻譯（若我說「直接翻」則用你建議的版本）。翻譯時依英文摘要慣例調整句序（目的→方法→結果→結論），時態依慣例使用並說明。\n' +
      '3. 對照檢查：逐句列出中文原句與英文譯句，標出有省略、合併或語意可能偏移的地方。\n\n' +
      '限制：不得新增原文沒有的結果、數字或結論；不得把「可能」「顯示」等保留語氣改得更肯定。',
    tags: ['中翻英', '英文摘要', '論文翻譯', '學術英文', '術語', '翻譯'],
    keywords: ['abstract translation', 'Chinese to English', 'terminology', 'academic translation', 'thesis abstract', 'glossary'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r09', 'research-r10', 'literacy-c02'],
    caution: '譯文須由你與指導教授確認；未公開的研究內容請依指導教授與研究倫理規範決定能否貼入 AI，並依學校或期刊規定揭露 AI 協助翻譯。',
    addedOrder: 2,
  },
  {
    id: 'english-03',
    title: '英文文章閱讀理解輔助（英翻中＋理解檢核）',
    category: 'english',
    subcategory: '翻譯',
    description: '讀英文課本或文章卡住時，分段提供翻譯、難句說明與理解題，幫你真正讀懂而不只是看中文。',
    content:
      '我正在讀一篇英文 [課本章節／文章／講義]，需要閱讀理解輔助。我希望學會讀懂，而不是只拿到中文翻譯。\n\n' +
      '文章主題與課程：[主題、課程名稱]\n' +
      '我的英文程度：[例如能讀懂大意但長句常卡住]\n' +
      '段落（一次 1～3 段）：\n[貼上英文段落]\n\n' +
      '請依序：\n' +
      '1. 先給每段一句中文大意，讓我知道段落在講什麼。\n' +
      '2. 挑出最難的 2～3 句，提供「直譯」與「通順意譯」兩種版本，並說明句子結構（主詞、主要動詞、修飾成分）。\n' +
      '3. 列出影響理解的關鍵字詞（含學科術語）：英文｜在此語境的意思｜詞性。\n' +
      '4. 出 3 題理解檢核題（一題細節、一題推論、一題作者態度），先不要給答案，等我回答後再批改。\n\n' +
      '限制：翻譯忠於原文，不補充原文沒有的內容；有多種解讀的句子請列出可能性，不要擅自選一種。',
    tags: ['英翻中', '閱讀理解', '英文閱讀', '原文書', '翻譯', '難句'],
    keywords: ['reading comprehension', 'English to Chinese', 'translation', 'textbook reading', 'difficult sentences', 'comprehension check'],
    supportedTools: ['通用'],
    difficulty: '入門',
    relatedLessonIds: ['chatgpt-a03', 'chatgpt-a02'],
    caution: '有版權的教科書內容請只貼必要的段落供個人學習使用，不要整本上傳或散布翻譯。',
    addedOrder: 2,
  },
  {
    id: 'english-04',
    title: '建立學科專業術語表',
    category: 'english',
    subcategory: '單字文法',
    description: '從你提供的課程講義或文章中整理中英專業術語表，含定義、常見搭配與易混淆詞，方便長期複習。',
    content:
      '請從我提供的資料中，整理一份中英對照的專業術語表。\n\n' +
      '學科與課程：[例如教育心理學、運動生理學、統計學]\n' +
      '資料來源（講義、文章或我讀到的英文段落）：\n[貼上內容]\n' +
      '用途：[例如準備英文授課期末考、寫英文報告、讀原文書]\n\n' +
      '請輸出表格：英文術語｜中文譯名｜詞性｜一句話定義（根據資料內容，用中文）｜常見搭配或句型（例如 conduct a study）｜資料中的原句。\n\n' +
      '另外整理：\n' +
      '1. 易混淆術語組（例如 validity／reliability），說明差異。\n' +
      '2. 中文譯名不統一的術語，列出常見譯法並標「請以課程教材或國家教育研究院等權威詞彙資料核對」。\n' +
      '3. 依重要性分成「必背」「理解即可」兩級。\n\n' +
      '限制：只收錄資料中出現的術語，不要自行擴充；定義依據資料語境，你不確定的請標示。',
    tags: ['術語表', '專業英文', '單字', '詞彙', '中英對照', '學科英文'],
    keywords: ['glossary', 'terminology', 'ESP', 'vocabulary list', 'technical terms', 'bilingual glossary'],
    supportedTools: ['通用'],
    difficulty: '入門',
    relatedLessonIds: ['agent-l04', 'chatgpt-a03'],
    addedOrder: 2,
  },
  {
    id: 'english-05',
    title: '寫給國外教授或研討會的英文 Email',
    category: 'english',
    subcategory: '英文寫作',
    description: '依你的實際目的與資訊撰寫得體的英文正式信件，例如詢問交換、研究合作或研討會事務，並解釋用語選擇。',
    content:
      '請協助我寫一封英文正式電子郵件，並幫我理解英文信件的禮貌慣例。\n\n' +
      '收件人：[例如國外大學教授、研討會主辦單位；稱謂如 Professor Smith、Dr. Lee]\n' +
      '我們的關係：[第一次聯絡／曾在某場合見過／已通信過]\n' +
      '我的身分：[學校、系所、年級]\n' +
      '寫信目的：[例如詢問交換或暑期研究機會、詢問研討會投稿或註冊事宜、索取論文全文、請求訪談]\n' +
      '需要提到的事實：[具體資訊，例如會議名稱、投稿編號、我讀過對方哪篇論文以及我的真實想法]\n' +
      '希望對方做什麼、期限：[具體請求]\n\n' +
      '要求：\n' +
      '1. 主旨簡潔且具體。\n' +
      '2. 結構：稱謂 → 一句自我介紹 → 來信目的 → 必要背景 → 具體請求 → 致謝 → 署名（姓名與聯絡資訊留空讓我填）。\n' +
      '3. 篇幅精簡，語氣禮貌但不卑微，避免中式客套直譯（例如 Sorry to bother you 過度使用）。\n' +
      '4. 寫完後用中文說明 3～5 個關鍵用語的語氣（例如 I was wondering if 與 Could you 的差別）。\n' +
      '5. 提供一版更簡短的版本。\n\n' +
      '限制：只使用我提供的事實，不要編造我讀過的論文內容或經歷；缺少資訊時先問我。',
    tags: ['英文 Email', '英文書信', '國外教授', '研討會', '正式信件', '電子郵件'],
    keywords: ['English email', 'formal email', 'professor', 'conference', 'exchange program', 'academic correspondence'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['chatgpt-a02'],
    caution: '信件內容須真實；勿把護照號碼、學號等個資貼進 AI 對話，寄出前再自行補上。',
    addedOrder: 2,
  },
  {
    id: 'english-06',
    title: '英文簡報講稿與發音提示',
    category: 'english',
    subcategory: '口說練習',
    description: '把你的簡報重點整理成好唸、好記的英文講稿，標出重音、停頓與易錯發音，並準備可能的提問。',
    content:
      '我要用英文做 [課堂報告／研討會口頭發表／交換學生分享]，請協助我準備講稿。\n\n' +
      '主題：[主題]\n' +
      '時間：[分鐘]\n' +
      '聽眾：[例如外籍教授與同學、國際研討會聽眾]\n' +
      '我的口說程度：[例如能讀但說得不流利]\n' +
      '每張投影片的重點（中文或英文皆可，可附我寫的英文草稿）：\n[逐張貼上]\n\n' +
      '請輸出：\n' +
      '1. 逐張講稿：口語化、句子短（盡量 20 字以內），適合唸出來而不是書面文字；每張標註預估秒數。\n' +
      '2. 轉場句：投影片之間的銜接（例如 Now let us move on to...）。\n' +
      '3. 發音提示：列出講稿中容易唸錯的單字（含專有名詞），標出重音節，並用簡單方式說明（例如 ANalysis 或 a-NAL-y-sis）；不確定的請提醒我用字典的發音功能確認。\n' +
      '4. 在講稿中用 / 標出建議停頓、用粗體標出要強調的字。\n' +
      '5. 聽眾可能問的 3 個問題，以及回答的句型骨架（內容由我填）。\n\n' +
      '限制：講稿內容只根據我提供的重點，不新增數據或結論；我的英文草稿請保留原意，只調整成口語版。',
    tags: ['英文簡報', '講稿', '發音', '口說', '上台報告', 'presentation'],
    keywords: ['English presentation', 'speech script', 'pronunciation', 'word stress', 'signposting', 'public speaking'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l07', 'chatgpt-a02'],
    caution: 'AI 以文字描述的發音僅供參考，請搭配字典的真人或語音發音確認；若使用語音對話練習，功能是否可用取決於方案與地區。',
    addedOrder: 2,
  },
  {
    id: 'english-07',
    title: '英文情境角色扮演：研討會提問與教授 Office Hour',
    category: 'english',
    subcategory: '口說練習',
    description: '模擬學術場合的英文對話，例如研討會發表後被提問或到國外教授 office hour 討論，每輪給語用與表達回饋。',
    content:
      '請和我進行英文角色扮演，模擬學術場合的真實對話。\n\n' +
      '情境：[擇一或自訂：研討會發表後的 Q&A／到教授 office hour 討論報告題目／小組討論中表達不同意見]\n' +
      '你扮演：[例如提問的外國學者、授課教授]\n' +
      '我扮演：[例如發表者、修課學生]\n' +
      '我的發表或報告內容摘要（讓你的提問有依據）：[摘要]\n' +
      '我的程度與想加強的地方：[例如聽不懂時不知道怎麼請對方重述、反駁時語氣太直接]\n\n' +
      '進行規則：\n' +
      '1. 你用英文說話，每次 1～3 句，並自然地提出一個問題或回應，然後停下來等我。\n' +
      '2. 我回覆後，先用英文繼續對話，再於下方用中文給回饋，聚焦在學術場合的「語用」：禮貌程度、是否回答到問題、如何爭取思考時間（例如 That is a good question. Let me think...）、如何請對方澄清、如何委婉表達不同意見。\n' +
      '3. 每輪回饋最多 3 點，附一個更自然的說法。\n' +
      '4. 難度逐步提高，偶爾加入追問或質疑。\n' +
      '5. 我說「End」時，整理本次可以直接套用的 8 個實用句型。\n\n' +
      '請你先開場。',
    tags: ['英文口說', '角色扮演', '研討會', 'office hour', '學術英文', '對話練習'],
    keywords: ['role play', 'speaking practice', 'conference Q&A', 'office hours', 'pragmatics', 'academic discussion'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['chatgpt-a01', 'chatgpt-a02'],
    caution: '若使用語音對話功能，是否可用取決於你的方案與地區；勿在對話中透露未公開研究的敏感細節。',
    addedOrder: 2,
  },
  {
    id: 'english-08',
    title: '多益、雅思、托福寫作練習批改',
    category: 'english',
    subcategory: '檢定準備',
    description: '依你選擇的檢定寫作題型與評分面向給練習回饋，只提供練習用的大致程度推估，不冒充官方分數。',
    content:
      '請依 [TOEIC 寫作／IELTS Writing Task 1 或 2／TOEFL Writing] 的題型，批改我的練習作文。\n\n' +
      '題目：[貼上題目]\n' +
      '寫作時間與字數：[實際花了幾分鐘、約幾字]\n' +
      '我的目標：[例如 IELTS 6.5、多益寫作 150 以上]\n' +
      '我的作文：\n[貼上作文]\n\n' +
      '請輸出：\n' +
      '1. 依該檢定公開的評分面向逐項回饋（例如 IELTS 的 Task Response、Coherence and Cohesion、Lexical Resource、Grammatical Range and Accuracy）。若你不確定某檢定的評分面向細節，請說明並改用一般寫作面向，提醒我查閱官方說明。\n' +
      '2. 每個面向：做得好的地方｜主要問題（引用原句）｜具體改進方法。\n' +
      '3. 練習用程度推估：只給大致區間並說明推估理由，清楚標示「非官方分數，僅供練習參考」。\n' +
      '4. 改寫示範：只示範改寫一個段落，讓我比較差異，其餘自己改。\n' +
      '5. 下一次練習的 2 個重點。\n\n' +
      '限制：不要替我寫一篇完整範文；不要引用你無法確認的官方評分標準原文。',
    tags: ['多益', '雅思', '托福', '英文檢定', '寫作批改', 'IELTS'],
    keywords: ['TOEIC', 'IELTS writing', 'TOEFL writing', 'essay feedback', 'band score', 'exam preparation'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['agent-l03', 'chatgpt-a02'],
    caution: 'AI 的程度推估不是官方分數，評分標準與題型請以各檢定官方網站最新說明為準。',
    addedOrder: 2,
  },
  {
    id: 'english-09',
    title: '單字學習：語境例句與間隔複習計畫',
    category: 'english',
    subcategory: '單字文法',
    description: '把你在閱讀或課程中遇到的生字整理成語境例句、搭配詞與測驗，並排出間隔複習時程。',
    content:
      '請協助我把一批生字變成真正會用的單字，並排出間隔複習計畫。\n\n' +
      '單字來源：[例如原文書第三章、英文新聞、檢定單字書]\n' +
      '單字清單（可附我遇到時的原句）：\n[貼上單字或原句]\n' +
      '我的程度與目標：[例如準備多益、讀原文書、寫英文報告]\n' +
      '每天可用時間：[分鐘]\n\n' +
      '請輸出：\n' +
      '1. 單字卡表格：單字｜詞性｜在我原句中的意思｜常見搭配詞（collocation）｜一個新的語境例句（貼近大學生活或我的學科）｜易混淆詞。\n' +
      '2. 若某個字在我的原句中是罕見用法，請特別說明。\n' +
      '3. 間隔複習時程：以學習當天為第 0 天，安排第 1、3、7、14、30 天各複習哪些字，以表格呈現，並說明每次複習的方式（例如看中文說英文、填空、造句）。\n' +
      '4. 第一次測驗：10 題填空或選擇題，先不給答案，我作答後再批改並標出要提前複習的字。\n\n' +
      '限制：例句要自然、符合英文母語者常見用法；不確定的搭配詞請標示，提醒我用學習者字典或語料庫查證。',
    tags: ['單字', '背單字', '詞彙', '間隔複習', '例句', '記憶'],
    keywords: ['vocabulary', 'spaced repetition', 'collocation', 'flashcards', 'context sentences', 'word learning'],
    supportedTools: ['通用'],
    difficulty: '入門',
    relatedLessonIds: ['agent-l03', 'chatgpt-a02'],
    addedOrder: 2,
  },
  {
    id: 'english-10',
    title: '英文論文難句拆解',
    category: 'english',
    subcategory: '學術英文',
    description: '把英文期刊論文中的長難句拆成主幹與修飾，說明學術句型的作用，幫你讀懂並學會判斷作者語氣。',
    content:
      '我在讀英文學術論文時遇到難以理解的句子，請幫我拆解結構。\n\n' +
      '論文領域：[領域]\n' +
      '句子所在段落（請一併貼上前後文）：\n[貼上段落]\n' +
      '我看不懂的句子：[貼上 1～3 句]\n\n' +
      '每個句子請依序：\n' +
      '1. 標出主要子句的主詞、動詞與受詞（主幹），用一句簡單英文改寫主幹。\n' +
      '2. 逐一說明修飾成分：關係子句、分詞構句、名詞化結構（例如 the implementation of...）、插入語，各修飾什麼。\n' +
      '3. 指出句中的學術功能詞：hedging（例如 may, suggest, appear to）、對比（whereas, nevertheless）、因果（thereby, due to），說明作者的確定程度與立場。\n' +
      '4. 中文翻譯：先直譯再意譯。\n' +
      '5. 這個句型若我寫報告時想借用，可以怎麼套用（給一個骨架，不給完整內容）。\n\n' +
      '限制：只根據我貼的文字解讀，不要補充你對這篇論文其他內容的猜測；遇到專業術語你不確定其在該領域的意思時，請標示並提醒我查原文或教科書。',
    tags: ['論文閱讀', '英文論文', '長難句', '句型', '學術英文', '文法'],
    keywords: ['academic reading', 'sentence parsing', 'complex sentences', 'research paper', 'nominalization', 'hedging'],
    supportedTools: ['通用'],
    difficulty: '研究應用',
    relatedLessonIds: ['research-r04', 'chatgpt-a03'],
    caution: '請貼必要段落即可；尚未公開或受審稿保密的論文內容不要貼入 AI。',
    addedOrder: 2,
  },
  {
    id: 'english-11',
    title: '學術英文常用句型：避免武斷與引導讀者',
    category: 'english',
    subcategory: '學術英文',
    description: '學會 hedging（委婉保留）與 signposting（引導語）句型，並檢查你的英文段落語氣是否過度武斷或缺少銜接。',
    content:
      '請教我學術英文的 hedging 與 signposting 句型，並用我自己的段落練習。\n\n' +
      '寫作類型：[例如研究計畫、文獻回顧、結果討論]\n' +
      '學科：[學科]\n' +
      '我的段落：\n[貼上英文段落]\n\n' +
      '第一部分：句型整理\n' +
      '1. Hedging：依確定程度由強到弱排列常用表達（動詞、情態動詞、副詞、句型各舉例），說明何時該保留、何時保留過度會顯得沒有主見。\n' +
      '2. Signposting：依功能分組（提出目的、列舉、轉折、舉例、總結、指回前文），每組 3～4 個句型。\n\n' +
      '第二部分：檢查我的段落\n' +
      '3. 標出語氣過於武斷的句子（例如 prove, always, clearly shows），說明理由並提供 2 種修改選項。\n' +
      '4. 標出句與句、段與段之間缺少引導語的位置，建議可用的 signposting。\n' +
      '5. 若有保留過度、讓主張變得模糊的地方也請指出。\n\n' +
      '第三部分：練習\n' +
      '6. 出 5 題改寫練習（把武斷句改成適度保留），我作答後再給回饋。\n\n' +
      '限制：不改變我的研究結果與主張；語氣強弱應符合我實際的證據強度，若你無法判斷證據強度，請問我。',
    tags: ['學術英文', '句型', 'hedging', '轉折語', '英文寫作', '論文寫作'],
    keywords: ['hedging', 'signposting', 'academic phrases', 'cautious language', 'transitions', 'academic tone'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['research-r09', 'literacy-c02'],
    addedOrder: 2,
  },
  {
    id: 'english-12',
    title: '翻譯品質檢查：找出漏譯、誤譯與術語不一致',
    category: 'english',
    subcategory: '翻譯',
    description: '逐句比對原文與譯文（你自己或機器翻譯的），找出漏譯、誤譯、增譯與術語前後不一致，並說明嚴重程度。',
    content:
      '請幫我檢查一份翻譯的品質。\n\n' +
      '翻譯方向：[中翻英／英翻中]\n' +
      '譯文來源：[我自己翻的／機器翻譯後我修改過／組員翻的]\n' +
      '用途與讀者：[例如交換學生申請文件、活動英文簡介、課堂翻譯作業]\n' +
      '指定術語（若有）：[原文＝譯文]\n' +
      '原文：\n[貼上原文，建議分段編號]\n' +
      '譯文：\n[貼上譯文，段落編號對應原文]\n\n' +
      '請逐段檢查並輸出表格：段落｜原文片段｜譯文片段｜問題類型（漏譯、誤譯、增譯、術語不一致、數字或專有名詞錯誤、語氣不符、不通順）｜嚴重程度（高：改變意思／中：影響理解／低：風格）｜建議修正與理由。\n\n' +
      '另外提供：\n' +
      '1. 術語一致性清單：同一原文詞在譯文中出現的所有譯法。\n' +
      '2. 數字、日期、人名、機構名稱逐一核對結果。\n' +
      '3. 整體評語：最需要優先處理的 3 個問題。\n\n' +
      '限制：不要直接給整篇新譯文；遇到原文本身語意模糊的地方，列出可能解讀並請我確認。',
    tags: ['翻譯', '翻譯檢查', '誤譯', '漏譯', '校對', '譯文'],
    keywords: ['translation review', 'translation quality', 'mistranslation', 'omission', 'terminology consistency', 'QA'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['chatgpt-a03', 'agent-l08'],
    caution: '若是課堂翻譯作業，請依授課教師規範使用 AI 並揭露；正式文件的譯文仍須由你或專業人員最終確認。',
    addedOrder: 2,
  },
  {
    id: 'english-13',
    title: '英文履歷與 CV 用詞檢視',
    category: 'english',
    subcategory: '英文寫作',
    description: '檢視你的英文履歷或學術 CV，改善動詞選擇、句構一致與格式慣例，同時確保內容忠於真實經歷。',
    content:
      '請檢視我的英文 [Resume／學術 CV]，聚焦在英文用詞與格式慣例。\n\n' +
      '用途：[例如申請國外研究所、交換計畫、外商實習]\n' +
      '目標地區或單位慣例（若知道）：[例如美國業界一頁式 Resume、歐洲學術 CV]\n' +
      '我的英文履歷（已移除電話、地址、生日等個資）：\n[貼上內容]\n' +
      '（可選）對應的中文經歷描述，讓你確認英文是否忠於原意：[貼上]\n\n' +
      '請輸出：\n' +
      '1. 用詞表格：原句｜問題（例如動詞太弱如 responsible for、時態不一致、冠詞多餘、中式表達）｜建議改法（1～2 個選項）。\n' +
      '2. 動作動詞替換建議：依我的經歷性質分類提供（例如研究、教學、領導、分析），但只能用來描述我實際做過的事。\n' +
      '3. 一致性檢查：時態（現職用現在式、過去經歷用過去式）、日期格式、標點、大小寫、條列句型是否一致。\n' +
      '4. Resume 與 CV 慣例差異提醒（例如是否放照片、出版與發表的列法），並說明各地慣例可能不同，請我查閱申請單位的要求。\n\n' +
      '限制：不得誇大職稱、成果或技能程度；若英文描述比中文原意更誇大，請標出來。',
    tags: ['英文履歷', 'CV', 'Resume', '申請', '用詞', '求職'],
    keywords: ['English resume', 'CV', 'action verbs', 'academic CV', 'resume wording', 'graduate application'],
    supportedTools: ['通用'],
    difficulty: '進階',
    relatedLessonIds: ['chatgpt-a02', 'literacy-c02'],
    caution: '履歷內容必須真實；請勿貼上身分證字號、護照號碼、住址等個資。',
    addedOrder: 2,
  },
  {
    id: 'english-14',
    title: '用我的逐字稿出英文聽力練習題',
    category: 'english',
    subcategory: '檢定準備',
    description: '依你提供的英文音檔逐字稿（課程錄音、Podcast、演講）設計分層聽力題，並在作答後分析你漏聽的原因。',
    content:
      '我會一邊聽英文音檔，一邊用你出的題目練習聽力。請根據我提供的逐字稿出題。\n\n' +
      '音檔類型與長度：[例如 TED 演講 8 分鐘、課程錄音片段、Podcast]\n' +
      '練習目標：[例如多益聽力、聽懂英文授課、日常理解]\n' +
      '我的程度：[程度]\n' +
      '逐字稿（請附時間碼或段落編號）：\n[貼上逐字稿]\n\n' +
      '請設計三層題目，先只給題目、不給答案與逐字稿內容：\n' +
      '1. 第一遍（大意）：3 題，問主旨、說話者目的、整體態度。\n' +
      '2. 第二遍（細節）：5 題，問數字、原因、例子；標示答案出現在哪個時間碼或段落，方便我回放。\n' +
      '3. 第三遍（聽寫）：挑 3 句含連音、弱讀或縮讀的句子，給挖空填寫。\n\n' +
      '我作答後請：\n' +
      '- 批改並附逐字稿依據。\n' +
      '- 分析漏聽原因（不認識的字、連音、語速、數字、腔調），並針對最常見的原因給練習建議。\n\n' +
      '限制：題目答案必須能在逐字稿中找到，不要出需要外部知識的題目。',
    tags: ['聽力', '英文聽力', '逐字稿', '多益', '練習題', 'Podcast'],
    keywords: ['listening practice', 'transcript', 'dictation', 'comprehension questions', 'TOEIC listening', 'connected speech'],
    supportedTools: ['通用'],
    difficulty: '入門',
    relatedLessonIds: ['agent-l03', 'chatgpt-a02'],
    caution: '逐字稿請來自你有權使用的教材或公開資源，僅供個人練習；自動產生的逐字稿可能有誤，請先對照音檔確認。',
    addedOrder: 2,
  },
  {
    id: 'english-15',
    title: '中式英文（Chinglish）診斷與修正',
    category: 'english',
    subcategory: '單字文法',
    description: '找出你英文中受中文思維影響的句子，例如直譯、主題句結構、動詞連用，說明背後原因並提供自然寫法。',
    content:
      '請幫我找出以下英文中的中式英文（Chinglish），並讓我理解為什麼不自然。\n\n' +
      '文本用途：[例如課堂作業、社群貼文、自我介紹、Email]\n' +
      '我的英文：\n[貼上英文]\n' +
      '（可選）我原本想表達的中文意思：[貼上]\n\n' +
      '請依下列常見類型檢查，引用原句：\n' +
      '- 逐字直譯的詞組（例如 open the light、learn knowledge）\n' +
      '- 主題－評論句構（例如 This problem, we should discuss it）\n' +
      '- 多個動詞直接連用、缺少連接詞的長串句\n' +
      '- 冗餘用字（例如 more better、the reason is because）\n' +
      '- 中文特有的客套或語氣直譯\n' +
      '- 可數與不可數、單複數、冠詞受中文影響的錯誤\n\n' +
      '請輸出：\n' +
      '1. 表格：原句｜類型｜為什麼母語者會覺得不自然（中文說明）｜自然的說法（1～2 個選項，標示正式或口語）。\n' +
      '2. 我最常出現的 2 種模式，以及寫作時可以自問的檢查問題。\n' +
      '3. 5 句針對我的弱點設計的改錯練習，我作答後再批改。\n\n' +
      '限制：保留我的原意；正確但只是不同風格的句子不要硬改，請標示「可接受」。',
    tags: ['中式英文', 'Chinglish', '英文文法', '道地英文', '用詞', '改錯'],
    keywords: ['Chinglish', 'L1 interference', 'natural English', 'error correction', 'direct translation', 'idiomatic'],
    supportedTools: ['通用'],
    difficulty: '入門',
    relatedLessonIds: ['chatgpt-a02'],
    addedOrder: 2,
  },
]
