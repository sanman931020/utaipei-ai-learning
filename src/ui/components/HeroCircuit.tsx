import { useEffect, useId, useRef, useState } from 'react'
import { href } from '../../lib/router'

const nodes = [
  { label: '學習知識', code: 'READ', x: 32, y: 98, path: 'M209 213H190V124H155', link: href('learn') },
  { label: '學習影片', code: 'WATCH', x: 357, y: 98, path: 'M313 213H330V124H357', link: href('videos') },
  { label: 'Prompt 資源庫', code: 'CREATE', x: 350, y: 275, path: 'M313 240H318V301H350', link: href('prompts') },
  { label: 'AI Agent', code: 'EXPLORE', x: 36, y: 275, path: 'M209 240H198V301H159', link: href('learn', { track: 'agent-learning' }) },
  { label: 'AI 素養與倫理', code: 'REFLECT', x: 192, y: 368, path: 'M260 268V368', link: href('learn', { track: 'literacy' }) },
]

/** A small campus of learning paths, connected to one chip. No imitation logos. */
export function HeroCircuit() {
  const ref = useRef<HTMLElement>(null)
  const gridId = useId()
  const [running, setRunning] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    let inView = false
    const update = () => setRunning(inView && !document.hidden)
    const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; update() })
    observer.observe(node)
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])
  return <figure ref={ref} className={`hero-circuit ${running ? 'is-running' : ''}`}>
    <figcaption><span className="kicker">Inside the platform</span><b>讓好奇心，接上新的學習路徑。</b></figcaption>
    <svg viewBox="0 0 520 440" aria-label="平台晶片連接五個學習區塊，可點選進入" role="group">
      <defs><pattern id={gridId} width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" className="circuit-grid-line" /></pattern></defs>
      <g aria-hidden="true">
        <path d="M260 28A190 190 0 1 1 70 218A190 190 0 0 1 260 28Z" className="circuit-wafer" />
        <circle cx="260" cy="218" r="174" fill={`url(#${gridId})`} />
        <path d="M152 70H368M90 218H430M152 366H368" className="circuit-guide" />
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={207 + (i % 4) * 27} y={159 + Math.floor(i / 4) * 98} width="17" height="13" className="circuit-pin" />)}
        <path d="M209 185H298L313 200V253L298 268H209Z" className="circuit-core" />
        <path d="M221 196H288L300 208V253H221Z" className="circuit-core-inner" />
        <text x="260" y="222" textAnchor="middle" className="circuit-ai">AI</text>
        <text x="260" y="244" textAnchor="middle" className="circuit-core-label">UTAIPEI</text>
        <g className="circuit-campus"><path d="M204 64L260 42L316 64ZM213 69V91M237 69V91M283 69V91M307 69V91M202 95H318" /><text x="260" y="112" textAnchor="middle">LEARNING CAMPUS</text></g>
      </g>
      {nodes.map((node, index) => <a key={node.code} href={node.link} className="circuit-node" style={{ '--i': index } as React.CSSProperties} aria-label={`前往${node.label}`}>
        <path d={node.path} className="circuit-trace" aria-hidden="true" />
        <path d={node.path} pathLength="100" className="circuit-pulse" aria-hidden="true" />
        <rect x={node.x} y={node.y} width="132" height="52" className="circuit-station" />
        <text x={node.x + 12} y={node.y + 18} className="circuit-node-code" aria-hidden="true">0{index + 1} / {node.code}</text>
        <text x={node.x + 12} y={node.y + 39} className="circuit-node-label">{node.label}</text>
      </a>)}
    </svg>
    <p><span className="mono">CONNECT · LEARN · CREATE</span><span>從知識到實作，自主探索 AI 校園。</span></p>
  </figure>
}
