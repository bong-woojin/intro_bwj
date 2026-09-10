import type { CSSProperties } from 'react'

/**
 * .reveal 요소가 차례로 올라오도록 주는 지연값.
 *
 * inline style의 transition-delay를 직접 쓰면 hover 같은 다른 전환까지 함께 늦어지므로,
 * index.css에서 opacity/transform에만 물려 둔 --reveal-delay 변수로 넘긴다.
 */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties
