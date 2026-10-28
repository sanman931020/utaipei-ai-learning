import { lessons, tracks, lessonsInTrack } from '../../content/lessons'
import { promptCategories, prompts } from '../../content/prompts'
import { videos } from '../../content/videos'
import { href, useScrollRestore } from '../../lib/router'
import type { Route } from '../../lib/router'
import { clearLearningTraces } from '../../lib/storage'
import { OfficialLogo } from '../components/OfficialLogos'
import { useReveal } from '../useReveal'

const pillars = [
  ['PURPOSE', '建置目的', '提供臺北市立大學學生公開、免登入的自主學習入口，透過工具教學、知識教材、影音資源與 Prompt 資源庫，建立 AI 應用能力、自主學習能力與負責任的使用觀念。'],
  ['TOOLS', '生成式 AI 工具與 AI 素養', 'ChatGPT、Gemini 網頁版的系統化操作與提問教學，以及跨工具共通的 AI 素養與學術倫理課程。'],
  ['AGENT · LEARNING', 'AI Agent 自主學習與專題實作', '用 AI Agent 拆解任務、安排學習計畫、整理資料與完成專題成果，並建立審查與修正的人機協作習慣。'],
  ['AGENT · RESEARCH', 'AI Agent 學術研究應用', '面向研究生與有研究需求的學生：文獻檢索與整理、研究設計、資料分析、學術寫作與研究倫理。'],
]

const stances = [
  'AI 是學習的協助者，不是答案的來源：重要資訊都要回到原始來源查核。',
  '學術誠信優先：分辨「AI 協助」與「AI 代做」，依課程規範使用並誠實揭露。',
  '保護隱私與研究資料：不上傳個資、未公開研究資料或機密文件。',
  '保留自己的思考：教材以練習與自我檢核為主，鼓勵理解與判斷，而非完全依賴 AI。',
]

export function AboutPage({ route }: { route: Route }) {
  useScrollRestore(route)
  const ref = useReveal<HTMLDivElement>()
  return <div ref={ref} className="page about-page">
    <header className="page-head">
      <span className="kicker"><b>04</b> About</span>
      <h1>臺北市立大學<br /><em>生成式 AI 與 AI Agent</em><br />自主學習平台</h1>
      <p className="page-lead">網站旨在透過生成式 AI 工具教學、知識教材、影音資源及 Prompt 資源庫，協助學生建立人工智慧應用能力、自主學習能力及負責任的 AI 使用觀念。</p>
    </header>
    <div className="page-body">
      <section className="about-intro reveal" aria-label="建置目的與三大學習方向">{pillars.map(([en, title, text], index) => <article key={en}><span className="mono">{String(index + 1).padStart(2, '0')} · {en}</span><h2>{title}</h2><p>{text}</p></article>)}</section>

      <section className="about-split reveal">
        <div>
          <header className="section-head"><span className="kicker">For whom</span><h2>適用學習對象</h2></header>
          <ul className="check-list">
            <li><b>大學部學生</b>：想系統化學會 ChatGPT、Gemini 的操作與提問，或用 AI Agent 規劃學習與專題。</li>
            <li><b>研究生與研究工作者</b>：想把 AI 安全地納入文獻、資料分析與學術寫作流程。</li>
            <li><b>所有自主學習者</b>：所有內容公開瀏覽，不需帳號或登入。</li>
          </ul>
        </div>
        <div>
          <header className="section-head"><span className="kicker">Resources</span><h2>網站提供的學習資源</h2></header>
          <dl className="about-stats">
            <div><dt>知識單元</dt><dd>{lessons.length}</dd><p>{tracks.map(track => `${track.short} ${lessonsInTrack(track.id).length}`).join('・')}</p></div>
            <div><dt>教學影片（已規劃）</dt><dd>{String(videos.length).padStart(2, '0')}</dd><p>ChatGPT、Gemini 網頁版各 3 支，AI 素養與學術倫理 2 支；桌面版待規劃</p></div>
            <div><dt>Prompt</dt><dd>{prompts.length}</dd><p>{promptCategories.length} 個類別，可搜尋、篩選、填寫變數與一鍵複製</p></div>
          </dl>
        </div>
      </section>

      <section className="about-stance reveal">
        <header className="section-head"><span className="kicker">Our stance</span><h2>AI 素養及學術倫理立場</h2><a className="text-link" href={href('learn', { track: 'literacy' })}>閱讀 AI 素養與學術倫理課程<span className="arrow" aria-hidden="true" /></a></header>
        <ol>{stances.map(item => <li key={item}>{item}</li>)}</ol>
      </section>

      <section className="about-split reveal">
        <div>
          <header className="section-head"><span className="kicker">Updates</span><h2>教材更新及使用提醒</h2></header>
          <ul className="check-list">
            <li>AI 工具的介面、功能與方案經常更新，且可能因帳號、地區與版本而不同；教材以功能說明為主，請以實際畫面為準。</li>
            <li>標示「影片課程內容」的段落依影片規劃大綱撰寫，正式腳本核對後會再更新；標示「網站延伸教材」的段落為網站補充內容。</li>
            <li>本網站不連接任何 AI 服務，也不會執行或傳送你輸入的 Prompt。</li>
            <li>最近閱讀、最近觀看與收藏的 Prompt 只存在你的瀏覽器（localStorage），不會傳送到任何伺服器。</li>
          </ul>
          <button type="button" className="btn btn-small" onClick={() => { clearLearningTraces(); alert('已清除這個瀏覽器中的學習紀錄與收藏。') }}>清除本機學習紀錄與收藏</button>
        </div>
        <div>
          <header className="section-head"><span className="kicker">Roadmap</span><h2>未來發展方向</h2></header>
          <ul className="check-list">
            <li>依正式腳本核對並上架八支網頁版教學影片。</li>
            <li>規劃 ChatGPT、Gemini 桌面版影片系列。</li>
            <li>製作 AI Agent 兩大專區的教學影片。</li>
            <li>加入校內 AI 伺服器的正式介紹與使用教學（待計中提供資訊）。</li>
            <li>持續擴充 Prompt 與教材，並依使用回饋改善。</li>
          </ul>
        </div>
      </section>

      <section className="about-contact reveal" aria-labelledby="contact-title">
        <header className="section-head"><span className="kicker">Contact</span><h2 id="contact-title">單位與聯絡資訊</h2></header>
        <div className="about-logos"><OfficialLogo logo="university" /><OfficialLogo logo="computingCenter" /></div>
        <dl>
          <div><dt>建置單位</dt><dd>臺北市立大學 計算機與網路中心</dd></div>
          <div><dt>維護人員</dt><dd><span className="status-chip is-planned">待計中確認</span></dd></div>
          <div><dt>聯絡方式</dt><dd><span className="status-chip is-planned">待計中確認</span></dd></div>
          <div><dt>官方連結</dt><dd><span className="status-chip is-planned">待計中確認</span></dd></div>
          <div><dt>網站版本</dt><dd className="mono">v{__APP_VERSION__}</dd></div>
        </dl>
        <p className="muted small">為避免提供錯誤資訊，維護人員、聯絡方式與官方連結在學校確認前不顯示。</p>
      </section>
    </div>
  </div>
}
