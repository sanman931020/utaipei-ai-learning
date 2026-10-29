import { useEffect, useState } from 'react'
import { href } from '../lib/router'
import { ThemeToggle } from './ThemeToggle'
import { OfficialLogo } from './components/OfficialLogos'
import { useIndicator } from './useIndicator'

export type SectionId = 'home' | 'learn' | 'videos' | 'prompts' | 'about'

const sections: { id: SectionId; label: string; en: string; path: string }[] = [
  { id: 'home', label: '首頁', en: 'HOME', path: '' },
  { id: 'learn', label: '學習知識', en: 'KNOWLEDGE', path: 'learn' },
  { id: 'videos', label: '學習影片', en: 'VIDEOS', path: 'videos' },
  { id: 'prompts', label: 'Prompt 資源庫', en: 'PROMPTS', path: 'prompts' },
  { id: 'about', label: '關於', en: 'ABOUT', path: 'about' },
]

export function SiteHeader({ current, onSearch }: { current?: SectionId; onSearch: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const nav = useIndicator<HTMLElement>('a[aria-current=page]', '.nav-ink', [current])
  useEffect(() => { setOpen(false) }, [current])
  useEffect(() => {
    const update = () => setScrolled(scrollY > 8)
    update()
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    addEventListener('keydown', close)
    return () => removeEventListener('keydown', close)
  }, [open])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
    <a className="header-brand" href={href('')} aria-label="臺北市立大學 計算機與網路中心｜生成式 AI 與 AI Agent 自主學習平台，回到首頁">
      <span className="header-logos"><OfficialLogo logo="university" /><span className="header-logo-divider" aria-hidden="true" /><OfficialLogo logo="computingCenter" /></span>
      <span className="header-title"><b>生成式 AI 與 AI Agent</b><small>自主學習平台</small></span>
    </a>
    <nav ref={nav} id="site-nav" className="site-nav" aria-label="網站主要導覽">
      {sections.map((item, index) => <a key={item.id} href={href(item.path)} aria-current={current === item.id ? 'page' : undefined}><small>{String(index + 1).padStart(2, '0')}</small><span>{item.label}</span></a>)}
      <i className="nav-ink" aria-hidden="true" />
    </nav>
    <div className="site-header-tools">
      <button type="button" className="header-search" onClick={onSearch} aria-label="全站快速搜尋（Ctrl+K）" aria-keyshortcuts="Control+K Meta+K"><span className="search-icon" aria-hidden="true" /><span className="header-search-label">搜尋</span><kbd className="mono">Ctrl K</kbd></button>
      <ThemeToggle />
      <button type="button" className="menu-button" aria-expanded={open} aria-controls="site-nav" aria-label={open ? '關閉選單' : '開啟選單'} onClick={() => setOpen(value => !value)}><i aria-hidden="true" /></button>
    </div>
  </header>
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer-inner">
      <section className="footer-identity">
        <div className="footer-logos"><OfficialLogo logo="university" /><OfficialLogo logo="computingCenter" /></div>
        <p className="footer-name">生成式 AI 與 AI Agent<br />自主學習平台</p>
        <p>所有教材與影片公開瀏覽，無須登入。</p>
      </section>
      <nav aria-label="頁尾導覽">
        <span className="kicker">Index</span>
        {sections.map((item, index) => <a key={item.id} href={href(item.path)}><small>{String(index + 1).padStart(2, '0')}</small>{item.label}</a>)}
      </nav>
      <section>
        <span className="kicker">Responsible use</span>
        <p className="footer-statement">AI 可以協助學習，但資訊查核、學術誠信與最終判斷，仍須由使用者負責。</p>
        <dl className="footer-meta">
          <div><dt>建置單位</dt><dd>臺北市立大學 計算機與網路中心</dd></div>
          <div><dt>聯絡方式</dt><dd>待計中確認</dd></div>
        </dl>
      </section>
    </div>
    <p className="site-footer-bar"><span>© {new Date().getFullYear()} University of Taipei</span><span>v{__APP_VERSION__}</span><span>不蒐集個人資料・學習紀錄僅存於你的瀏覽器</span></p>
  </footer>
}
