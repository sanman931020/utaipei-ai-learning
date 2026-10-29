import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { href } from '../../lib/router'

/** Each learning area is a station wired to the platform core; packets travel out and back along its trace. */
const stations = [
  { label: '學習知識', code: 'READ', x: 24, y: 70, path: 'M222 200H186L172 186V96H164', link: href('learn') },
  { label: '學習影片', code: 'WATCH', x: 396, y: 70, path: 'M338 200H374L388 186V96H396', link: href('videos') },
  { label: 'Prompt 資源庫', code: 'CREATE', x: 396, y: 330, path: 'M338 270H374L388 284V356H396', link: href('prompts') },
  { label: 'AI Agent', code: 'EXPLORE', x: 24, y: 330, path: 'M222 270H186L172 284V356H164', link: href('learn', { track: 'agent-learning' }) },
  { label: 'AI 素養與倫理', code: 'REFLECT', x: 210, y: 394, path: 'M280 296V394', link: href('learn', { track: 'literacy' }) },
]

const CX = 280
const CY = 235
// A fixed scatter of "active" dies on the wafer map; deterministic so the server and client render the same.
const dies = Array.from({ length: 46 }, (_, i) => {
  const angle = (i * 137.508 * Math.PI) / 180
  const radius = 60 + ((i * 53) % 150)
  const x = Math.round((CX + Math.cos(angle) * radius) / 22) * 22 - 9
  const y = Math.round((CY + Math.sin(angle) * radius * 0.92) / 22) * 22 - 9
  return { x, y, delay: ((i * 0.37) % 6).toFixed(2) }
}).filter(die => Math.hypot(die.x - CX, die.y - CY) < 205 && !(Math.abs(die.x + 9 - CX) < 80 && Math.abs(die.y + 9 - CY) < 80))

const cores = Array.from({ length: 16 }, (_, i) => ({ row: Math.floor(i / 4), col: i % 4 }))

export function HeroCircuit() {
  const ref = useRef<HTMLElement>(null)
  const uid = useId().replace(/:/g, '')
  const [running, setRunning] = useState(false)
  const [load, setLoad] = useState(62)

  // Animate only while visible; the readout ticks once a second.
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
  useEffect(() => {
    if (!running || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setLoad(value => Math.max(38, Math.min(94, value + Math.round((Math.random() - .5) * 18)))), 1200)
    return () => window.clearInterval(timer)
  }, [running])

  // Pointer parallax: layers drift a few pixels toward the cursor (fine pointers only).
  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--px', ((event.clientX - box.left) / box.width - .5).toFixed(3))
    event.currentTarget.style.setProperty('--py', ((event.clientY - box.top) / box.height - .5).toFixed(3))
  }
  const onLeave = (event: React.PointerEvent<HTMLElement>) => { event.currentTarget.style.setProperty('--px', '0'); event.currentTarget.style.setProperty('--py', '0') }

  return <figure ref={ref} className={`hero-circuit ${running ? 'is-running' : ''}`} onPointerMove={onMove} onPointerLeave={onLeave}>
    <figcaption>
      <span className="kicker">Inside the platform</span>
      <b>讓好奇心，接上新的學習路徑。</b>
      <span className="circuit-readout mono" aria-hidden="true"><i className="circuit-led" />CORE {String(load).padStart(2, '0')}%<span className="circuit-bars">{[0, 1, 2, 3, 4].map(bar => <i key={bar} style={{ '--b': bar } as CSSProperties} />)}</span></span>
    </figcaption>
    <svg viewBox="0 0 560 460" role="group" aria-label="平台核心晶片連接五個學習區塊，可點選進入">
      <defs>
        <pattern id={`${uid}-tiles`} width="22" height="22" patternUnits="userSpaceOnUse" x="-9" y="-9"><rect width="18" height="18" rx="1" className="circuit-tile" /></pattern>
        <clipPath id={`${uid}-wafer`}><circle cx={CX} cy={CY} r="214" /></clipPath>
        <linearGradient id={`${uid}-sweep`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="var(--circuit-hot)" stopOpacity="0" /><stop offset="1" stopColor="var(--circuit-hot)" stopOpacity=".28" /></linearGradient>
        <radialGradient id={`${uid}-halo`}><stop offset="0" stopColor="var(--circuit-hot)" stopOpacity=".35" /><stop offset="1" stopColor="var(--circuit-hot)" stopOpacity="0" /></radialGradient>
      </defs>

      <g className="circuit-layer is-far" aria-hidden="true">
        <circle cx={CX} cy={CY} r="214" className="circuit-wafer" />
        <g clipPath={`url(#${uid}-wafer)`}>
          <rect width="560" height="460" fill={`url(#${uid}-tiles)`} />
          {dies.map((die, index) => <rect key={index} x={die.x} y={die.y} width="18" height="18" rx="1" className="circuit-die" style={{ animationDelay: `${die.delay}s` }} />)}
          <path d={`M${CX} ${CY}L${CX + 240} ${CY - 70}A250 250 0 0 1 ${CX + 250} ${CY}Z`} fill={`url(#${uid}-sweep)`} className="circuit-sweep" />
        </g>
        <circle cx={CX} cy={CY} r="214" className="circuit-wafer-edge" />
        <path d={`M${CX - 14} ${CY + 214}h28`} className="circuit-notch" />
        <circle cx={CX} cy={CY} r="120" fill={`url(#${uid}-halo)`} className="circuit-halo" />
      </g>

      <g className="circuit-layer is-mid" aria-hidden="true">
        <g className="circuit-campus">
          <path d="M238 56L280 38L322 56Z M246 60V82 M266 60V82 M294 60V82 M314 60V82 M236 86H324" />
          <text x={CX} y="104" textAnchor="middle">LEARNING CAMPUS</text>
        </g>
        {[262, 280, 298].map((x, index) => <g key={x}>
          <path d={`M${x} 174V112`} className="circuit-trace" />
          <path d={`M${x} 174V112`} pathLength="100" className="circuit-packet is-up" style={{ '--i': index } as CSSProperties} />
        </g>)}
      </g>

      <g className="circuit-layer is-near">
        {stations.map((station, index) => <a key={station.code} href={station.link} className="circuit-node" style={{ '--i': index } as CSSProperties} aria-label={`前往${station.label}`}>
          <path d={station.path} className="circuit-trace" aria-hidden="true" />
          <path d={station.path} pathLength="100" className="circuit-packet is-out" aria-hidden="true" />
          <path d={station.path} pathLength="100" className="circuit-packet is-in" aria-hidden="true" />
          {station.path.match(/[HV]\d+L\d+ \d+/g)?.map((bend, bendIndex) => {
            const [x, y] = bend.replace(/^[HV]\d+L/, '').split(' ').map(Number)
            return <circle key={bendIndex} cx={x} cy={y} r="2.6" className="circuit-via" aria-hidden="true" />
          })}
          <rect x={station.x} y={station.y} width="140" height="52" className="circuit-station" />
          <circle cx={station.x + 126} cy={station.y + 14} r="3" className="circuit-station-led" aria-hidden="true" />
          <text x={station.x + 12} y={station.y + 19} className="circuit-node-code" aria-hidden="true">0{index + 1} / {station.code}</text>
          <text x={station.x + 12} y={station.y + 40} className="circuit-node-label">{station.label}</text>
        </a>)}

        <g className="circuit-chip" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => <g key={i}>
            <path d={`M${238 + i * 14} 174V166M${238 + i * 14} 296V304M222 ${193 + i * 14}H214M338 ${193 + i * 14}H346`} className="circuit-pin" />
          </g>)}
          <rect x="222" y="174" width="116" height="122" className="circuit-package" />
          <path d="M226 178h12M226 178v12" className="circuit-index-mark" />
          {cores.map(core => <rect key={`${core.row}-${core.col}`} x={236 + core.col * 22} y={188 + core.row * 22} width="18" height="18" className="circuit-core" style={{ '--d': core.row + core.col } as CSSProperties} />)}
          <text x={CX} y="291" textAnchor="middle" className="circuit-chip-label">UTAIPEI · AI CORE</text>
        </g>
      </g>
    </svg>
    <p><span className="mono">CONNECT · LEARN · CREATE</span><span>從知識到實作，點選任一學習區塊開始探索。</span></p>
  </figure>
}
