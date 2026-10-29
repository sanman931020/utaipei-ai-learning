import { useEffect, useState } from 'react'
import { useRoute } from '../lib/router'
import { SiteFooter, SiteHeader } from './SiteShell'
import type { SectionId } from './SiteShell'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { VideosPage } from './pages/VideosPage'
import { PromptsPage } from './pages/PromptsPage'
import { AboutPage } from './pages/AboutPage'
import { NotFound } from './pages/NotFound'
import { SearchPalette } from './components/SearchPalette'
import { BackToTop, Toast } from './components/GlobalUI'
import { usePointerLight } from '../lib/ui-events'

const titles: Record<SectionId, string> = { home: '首頁', learn: '學習知識', videos: '學習影片', prompts: 'Prompt 資源庫', about: '關於' }
const SITE = '生成式 AI 與 AI Agent 自主學習平台｜臺北市立大學'

export function App() {
  const route = useRoute()
  const [first = ''] = route.path
  const section: SectionId | undefined = first === '' ? 'home' : (['learn', 'videos', 'prompts', 'about'] as const).find(id => id === first)
  const [searching, setSearching] = useState(false)
  usePointerLight()

  useEffect(() => { document.title = section && section !== 'home' ? `${titles[section]}｜${SITE}` : SITE }, [section])
  useEffect(() => { setSearching(false) }, [route.key])
  // Ctrl/⌘+K opens quick search anywhere.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearching(true) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const page = (() => {
    switch (section) {
      case 'home': return <HomePage route={route} />
      case 'learn': return <LearnPage route={route} />
      case 'videos': return <VideosPage route={route} />
      case 'prompts': return <PromptsPage route={route} />
      case 'about': return <AboutPage route={route} />
      default: return <NotFound route={route} />
    }
  })()

  return <div className="site">
    <SiteHeader current={section} onSearch={() => setSearching(true)} />
    {/* A new page fades in; opening a prompt over the library list is not a new page. */}
    <main id="main" tabIndex={-1}><div key={section === 'prompts' ? section : route.path.join('/')} className="page-enter">{page}</div></main>
    <SiteFooter />
    <SearchPalette open={searching} onClose={() => setSearching(false)} />
    <BackToTop />
    <Toast />
  </div>
}
