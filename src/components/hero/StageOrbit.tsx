import { useState } from 'react'
import type { CSSProperties } from 'react'
import { STAGES } from '@/lib/stages'

/* 그림 좌표계. 아래쪽에 지시선이 내려갈 자리를 두려고 세로를 길게 잡았다. */
const VW = 200
const VH = 252
const CX = VW / 2
const CY = 92
const R = 56 // 원의 반지름
const D = 30 // 중심에서 각 원까지의 거리
const CIRCUMFERENCE = 2 * Math.PI * R

/* 지시선 — 중심에서 아래로 내려가 문구를 가리킨다 */
const LEAD_FROM = CY + 12
const LEAD_TO = VH - 26
const LEAD_LENGTH = LEAD_TO - LEAD_FROM

/* 타임라인 (ms). index.css의 .orbit-* 길이와 짝을 이룬다. */
const DRAW_STAGGER = 380 // 원이 하나씩 그려지는 간격
const DRAW_MS = 900
const CORE_AT = 1750 // 셋이 모여 중심이 켜지는 시점
const CORE_MS = 700
const LEAD_AT = 2250 // 지시선이 뻗기 시작
const LEAD_MS = 600
const TYPE_AT = 2900 // 문구 타이핑
const LEGEND_AT = 3150

/* 색과 이름은 헤더 로고와 공유한다 */
const POSITIONS = [
  { cx: CX, cy: CY - D },
  { cx: CX - D * 0.866, cy: CY + D * 0.5 },
  { cx: CX + D * 0.866, cy: CY + D * 0.5 },
]

const RINGS = STAGES.map((stage, index) => ({ ...stage, ...POSITIONS[index] }))

const CAPTION = '세 가지를 아우르는 프론트엔드'

function vars(entries: Record<string, string>): CSSProperties {
  return entries as CSSProperties
}

interface StageOrbitProps {
  /** 인트로가 걷히기 시작하면 true. 이때 마운트되어야 등장 연출이 보인다. */
  active: boolean
}

/**
 * 퍼블리셔 · 프론트엔드 · AI가 겹쳐 도는 그림.
 *
 * 원이 하나씩 그려지고 → 셋이 모이면 중심이 켜지고 → 지시선이 뻗으며 문구가 타이핑된다.
 * 그 뒤로는 천천히 돌며, 아래 범례에 마우스를 올리면 해당 원만 남는다.
 */
export function StageOrbit({ active }: StageOrbitProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  if (!active) return <div className="mx-auto aspect-4/5 w-full max-w-sm" />

  const lastDrawEnd = (RINGS.length - 1) * DRAW_STAGGER + DRAW_MS

  return (
    <figure className="mx-auto w-full max-w-sm">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label="퍼블리셔, 프론트엔드, AI 세 영역이 겹치는 그림"
      >
        <defs>
          {RINGS.map((ring) => (
            <radialGradient key={ring.name} id={`orbit-grad-${ring.name}`}>
              <stop offset="0%" stopColor={`rgba(${ring.rgb}, 0.15)`} />
              <stop offset="45%" stopColor={`rgba(${ring.rgb}, 0.13)`} />
              <stop offset="88%" stopColor={`rgba(${ring.rgb}, 0)`} />
            </radialGradient>
          ))}

          {/* 채움의 경계를 지워 눈에 덜 부담스럽게 한다 */}
          <filter id="orbit-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>

          <filter id="orbit-core-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* 다 그려진 뒤부터 돌기 시작한다 */}
        <g
          className="orbit-spin-group"
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            ...vars({ '--spin-delay': `${lastDrawEnd}ms` }),
          }}
        >
          {RINGS.map((ring, index) => {
            const dimmed = hovered !== null && hovered !== ring.name
            const drawAt = index * DRAW_STAGGER
            return (
              <g
                key={ring.name}
                style={{ opacity: dimmed ? 0.15 : 1, transition: 'opacity 300ms ease' }}
              >
                <g
                  className="orbit-breathe"
                  style={{
                    transformOrigin: `${ring.cx}px ${ring.cy}px`,
                    ...vars({ '--breathe-delay': `${lastDrawEnd + index * 2300}ms` }),
                  }}
                >
                  <circle
                    className="orbit-fill-shape"
                    cx={ring.cx}
                    cy={ring.cy}
                    r={R}
                    fill={`url(#orbit-grad-${ring.name})`}
                    filter="url(#orbit-soft)"
                    style={vars({ '--fill-delay': `${drawAt + 300}ms` })}
                  />
                  <circle
                    className="orbit-edge-path"
                    cx={ring.cx}
                    cy={ring.cy}
                    r={R}
                    fill="none"
                    stroke={`rgba(${ring.rgb}, 0.32)`}
                    strokeWidth="0.9"
                    /* 12시 방향에서 그리기 시작하도록 돌려 둔다 */
                    transform={`rotate(-90 ${ring.cx} ${ring.cy})`}
                    style={vars({
                      '--circumference': `${CIRCUMFERENCE}`,
                      '--draw-delay': `${drawAt}ms`,
                    })}
                  />
                </g>
              </g>
            )
          })}
        </g>

        {/* 셋이 만나는 자리 — 돌지 않고 가운데에 머문다 */}
        <g
          className="orbit-core-in"
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            ...vars({
              '--core-delay': `${CORE_AT}ms`,
              '--pulse-delay': `${CORE_AT + CORE_MS}ms`,
            }),
          }}
        >
          <circle cx={CX} cy={CY} r={11} fill="rgba(255,255,255,0.45)" filter="url(#orbit-core-glow)" />
          <circle cx={CX} cy={CY} r={2.2} fill="rgba(255,255,255,0.9)" />
        </g>

        {/* 지시선 + 화살촉 — 중심이 무엇인지 아래 문구로 이어 준다 */}
        <line
          className="orbit-lead"
          x1={CX}
          y1={LEAD_FROM}
          x2={CX}
          y2={LEAD_TO}
          stroke="rgba(236,235,242,0.4)"
          strokeWidth="1"
          style={vars({ '--lead-length': `${LEAD_LENGTH}`, '--lead-delay': `${LEAD_AT}ms` })}
        />
        <path
          className="orbit-arrow"
          d={`M${CX - 4},${LEAD_TO} L${CX},${LEAD_TO + 7} L${CX + 4},${LEAD_TO} Z`}
          fill="rgba(236,235,242,0.55)"
          style={vars({ '--arrow-delay': `${LEAD_AT + LEAD_MS}ms` })}
        />
      </svg>

      <figcaption>
        <p className="flex items-center justify-center gap-0.5 text-center text-sm text-fg/90">
          <span className="orbit-type" style={vars({ '--type-delay': `${TYPE_AT}ms` })}>
            {CAPTION}
          </span>
          <span
            aria-hidden="true"
            className="orbit-caret inline-block h-4 w-px bg-accent"
            style={vars({ '--type-delay': `${TYPE_AT}ms` })}
          />
        </p>

        {/* 이름은 원에 붙이지 않는다. 원이 한 바퀴 돌면 서로 자리를 바꾸기 때문이다. */}
        <ul
          className="orbit-legend mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          style={vars({ '--legend-delay': `${LEGEND_AT}ms` })}
        >
          {RINGS.map((ring) => (
            <li key={ring.name}>
              <button
                type="button"
                onMouseEnter={() => setHovered(ring.name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(ring.name)}
                onBlur={() => setHovered(null)}
                className="flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-opacity"
                style={{
                  color: `rgb(${ring.rgb})`,
                  opacity: hovered !== null && hovered !== ring.name ? 0.4 : 1,
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 rounded-full"
                  style={{ background: `rgb(${ring.rgb})` }}
                />
                {ring.name}
              </button>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
