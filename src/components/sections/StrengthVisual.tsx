import type { CSSProperties } from 'react'
import type { StrengthVisualName } from '@/types'

const W = 132
const H = 64

/** 반원 눈금의 반지름 */
const ARC_R = 22

function delay(ms: number): CSSProperties {
  return { '--sv-delay': `${ms}ms` } as CSSProperties
}

/** 품질 — 눈금이 목표치까지 차오른다 */
function Quality({ color }: { color: string }) {
  const cx = 44
  const cy = H - 10
  const arc = `M${cx - ARC_R},${cy} A${ARC_R},${ARC_R} 0 0 1 ${cx + ARC_R},${cy}`

  /* 눈금 자국 — 반원을 따라 일정 간격으로 세워 계기판처럼 보이게 한다 */
  const ticks = Array.from({ length: 9 }, (_, index) => {
    const angle = Math.PI - (index / 8) * Math.PI
    const inner = ARC_R + 7
    const outer = ARC_R + 11
    return {
      x1: cx + Math.cos(angle) * inner,
      y1: cy - Math.sin(angle) * inner,
      x2: cx + Math.cos(angle) * outer,
      y2: cy - Math.sin(angle) * outer,
    }
  })

  return (
    <>
      {ticks.map((tick, index) => (
        <line
          key={index}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={index >= 7 ? 0.65 : 0.2}
        />
      ))}

      {/* 배경 트랙 */}
      <path d={arc} fill="none" stroke="rgba(236,235,242,0.12)" strokeWidth="7" />

      {/* 차오르는 눈금 */}
      <path
        className="sv-gauge"
        d={arc}
        pathLength={1}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </>
  )
}

/** 구조 — 흩어진 조각이 한 자리로 모인다 */
function Structure({ color }: { color: string }) {
  const pieces = [
    { y: 10, d: 0 },
    { y: 27, d: 260 },
    { y: 44, d: 520 },
  ]

  return (
    <>
      {pieces.map((piece) => (
        <rect
          key={piece.y}
          className="sv-piece"
          x="14"
          y={piece.y}
          width="16"
          height="11"
          rx="2.5"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          style={delay(piece.d)}
        />
      ))}

      <path d="M40 32h14" stroke={color} strokeWidth="1.4" opacity="0.4" />
      <path d="M50 28l4 4-4 4" fill="none" stroke={color} strokeWidth="1.4" opacity="0.4" />

      {/* 모인 자리 */}
      <rect
        className="sv-target"
        x="66"
        y="14"
        width="34"
        height="36"
        rx="5"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
      />
    </>
  )
}

/** AI — 칸이 저절로 채워지고 그 위에서 반짝인다 */
function Ai({ color }: { color: string }) {
  const cells = [
    { x: 22, y: 12, w: 40, h: 9, d: 0 },
    { x: 22, y: 26, w: 26, h: 9, d: 220 },
    { x: 22, y: 40, w: 46, h: 9, d: 440 },
    { x: 74, y: 26, w: 36, h: 23, d: 660 },
  ]

  const sparks = [
    { x: 96, y: 12, s: 5, d: 0 },
    { x: 108, y: 20, s: 3.4, d: 500 },
    { x: 86, y: 52, s: 3.4, d: 900 },
  ]

  return (
    <>
      {cells.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          className="sv-cell"
          x={cell.x}
          y={cell.y}
          width={cell.w}
          height={cell.h}
          rx="2.5"
          fill={color}
          opacity="0.28"
          stroke={color}
          strokeWidth="1"
          style={delay(cell.d)}
        />
      ))}

      {sparks.map((spark) => (
        <path
          key={`${spark.x}-${spark.y}`}
          className="sv-spark"
          d={`M${spark.x},${spark.y - spark.s} L${spark.x + spark.s * 0.32},${spark.y - spark.s * 0.32} L${spark.x + spark.s},${spark.y} L${spark.x + spark.s * 0.32},${spark.y + spark.s * 0.32} L${spark.x},${spark.y + spark.s} L${spark.x - spark.s * 0.32},${spark.y + spark.s * 0.32} L${spark.x - spark.s},${spark.y} L${spark.x - spark.s * 0.32},${spark.y - spark.s * 0.32} Z`}
          fill={color}
          style={delay(spark.d)}
        />
      ))}
    </>
  )
}

const VISUALS = { quality: Quality, structure: Structure, ai: Ai }

interface StrengthVisualProps {
  name: StrengthVisualName
  color: string
  /** 펼쳐진 칸에서만 움직인다 */
  active: boolean
}

export function StrengthVisual({ name, color, active }: StrengthVisualProps) {
  const Shape = VISUALS[name]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`h-16 w-full ${active ? 'sv-run' : ''}`}
      /* 펼칠 때마다 처음부터 다시 재생되도록 다시 마운트한다 */
      key={active ? 'on' : 'off'}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMinYMid meet"
    >
      <Shape color={color} />
    </svg>
  )
}
