import { href, useScrollRestore } from '../../lib/router'
import type { Route } from '../../lib/router'

export function NotFound({ route }: { route: Route }) {
  useScrollRestore(route)
  return <div className="page">
    <div className="empty-state is-page">
      <span aria-hidden="true">🧭</span>
      <h1>找不到這個頁面</h1>
      <p>連結可能已更新。你可以從以下入口繼續學習。</p>
      <div className="row-actions is-center"><a className="btn btn-primary" href={href('')}>回到首頁</a><a className="btn" href={href('learn')}>學習知識</a><a className="btn" href={href('prompts')}>Prompt 資源庫</a></div>
    </div>
  </div>
}
