import { STAGES } from '@/lib/stages'

const SIZE = 24
const C = SIZE / 2
const R = 6.4 // 원의 반지름
const D = 3.4 // 중심에서 각 원까지의 거리

/* 첫 화면 그림과 같은 배치 — 위 / 왼아래 / 오른아래 */
const MARKS = [
  { cx: C, cy: C - D },
  { cx: C - D * 0.866, cy: C + D * 0.5 },
  { cx: C + D * 0.866, cy: C + D * 0.5 },
]

/** 헤더 로고. 첫 화면의 3원을 그대로 줄여 같은 상징으로 읽히게 한다. */
export function BrandMark() {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="size-6 shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      {MARKS.map((mark, index) => (
        <circle
          key={STAGES[index].name}
          cx={mark.cx}
          cy={mark.cy}
          r={R}
          fill={`rgba(${STAGES[index].rgb}, 0.14)`}
          stroke={`rgba(${STAGES[index].rgb}, 0.65)`}
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}
