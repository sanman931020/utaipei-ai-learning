import { useEffect } from 'react'
import { useRoute } from '../lib/router'
import { SiteFooter, SiteHeader } from './SiteShell'
import type { SectionId } from './SiteShell'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { VideosPage } from './pages/VideosPage'
import { PromptsPage } from './pages/PromptsPage'
import { AboutPage } from './pages/AboutPage'
import { NotFound } from './pages/NotFound'

const titles: Record<SectionId, string> = { home: '首頁', learn: '學習知識', videos: '學習影片', prompts: 'Prompt 資源庫', about: '關於' }
const SITE = '生成式 AI 與 AI Agent 自主學習平台｜臺北市立大學'

export function App() {
  const route = useRoute()
  const [first = ''] = route.path
  const section: SectionId | undefined = first === '' ? 'home' : (['learn', 'videos', 'prompts', 'about'] as const).find(id => id === first)

  useEffect(() => { document.title = section && section !== 'home' ? `${titles[section]}｜${SITE}` : SITE }, [section])

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
    <SiteHeader current={section} />
    {/* A new page fades in; opening a prompt over the library list is not a new page. */}
    <main id="main" tabIndex={-1}><div key={section === 'prompts' ? section : route.path.join('/')} className="page-enter">{page}</div></main>
    <SiteFooter />
  </div>
}
