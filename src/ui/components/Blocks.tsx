import type { Block, SectionOrigin } from '../../content/types'

export function OriginBadge({ origin }: { origin: SectionOrigin }) {
  return origin === 'script'
    ? <span className="origin-badge is-script" title="本段依影片規劃大綱撰寫；正式腳本全文尚待核對">影片課程內容<small>依規劃大綱・腳本待核對</small></span>
    : <span className="origin-badge is-extension" title="本段為網站補充的延伸教材，影片中不一定提到">網站延伸教材</span>
}

/** A left-to-right process diagram that wraps into a vertical list on narrow screens. */
export function FlowDiagram({ title, items }: { title?: string; items: { label: string; text?: string }[] }) {
  return <figure className="flow">
    {title && <figcaption>{title}</figcaption>}
    <ol>{items.map((item, index) => <li key={item.label + index}><span className="flow-index">{String(index + 1).padStart(2, '0')}</span><b>{item.label}</b>{item.text && <p>{item.text}</p>}</li>)}</ol>
  </figure>
}

const lines = (text: string) => text.split('\n').filter(Boolean)

export function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p': return <>{lines(block.text).map((line, index) => <p key={index}>{line}</p>)}</>
    case 'list': return block.ordered ? <ol className="prose-list">{block.items.map((item, index) => <li key={index}>{item}</li>)}</ol> : <ul className="prose-list">{block.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
    case 'steps': return <ol className="steps">{block.items.map((item, index) => <li key={index}><span aria-hidden="true">{index + 1}</span><div><b>{item.title}</b><p>{item.text}</p></div></li>)}</ol>
    case 'flow': return <FlowDiagram title={block.title} items={block.items} />
    case 'cards': return <div className="mini-cards">{block.items.map((item, index) => <article key={index}>{item.meta && <small>{item.meta}</small>}<b>{item.title}</b><p>{item.text}</p></article>)}</div>
    case 'table': return <div className="table-wrap" tabIndex={0} role="region" aria-label="表格，可左右捲動"><table><thead><tr>{block.head.map((cell, index) => <th key={index} scope="col">{cell}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>
    case 'compare': return <div className="compare">
      <div className="compare-weak"><small>{block.weak.label ?? '較模糊的寫法'}</small>{lines(block.weak.text).map((line, index) => <p key={index}>{line}</p>)}</div>
      <div className="compare-strong"><small>{block.strong.label ?? '較清楚的寫法'}</small>{lines(block.strong.text).map((line, index) => <p key={index}>{line}</p>)}</div>
      {block.note && <p className="compare-note">{block.note}</p>}
    </div>
    case 'note': return <aside className={`note is-${block.tone ?? 'info'}`}><b>{block.title}</b>{lines(block.text).map((line, index) => <p key={index}>{line}</p>)}</aside>
    case 'pending': return <aside className="pending-box"><span className="status-chip is-planned">待計中確認</span><b>{block.title}</b><p>{block.text}</p></aside>
  }
}
