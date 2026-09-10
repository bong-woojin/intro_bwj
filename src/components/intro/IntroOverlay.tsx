import { useEffect, useState } from 'react'
import { KINETIC_DURATION, KineticIntro } from './KineticIntro'
import { Starfield } from './Starfield'
import { SUBTLE_DURATION, SubtleIntro } from './SubtleIntro'
import { INTRO_VARIANT } from './variant'

const EXIT_MS = 900 // 오버레이가 걷히는 시간 (index.css의 .intro-exit과 동일)

const VARIANTS = {
  kinetic: { Content: KineticIntro, duration: KINETIC_DURATION },
  subtle: { Content: SubtleIntro, duration: SUBTLE_DURATION },
} as const

interface IntroOverlayProps {
  /** 오버레이가 완전히 걷힌 뒤 호출된다 */
  onFinish: () => void
}

/** 배경과 걷힘 처리를 맡는 껍데기. 안쪽 연출은 variant.ts로 고른다. */
export function IntroOverlay({ onFinish }: IntroOverlayProps) {
  const [exiting, setExiting] = useState(false)
  const { Content, duration } = VARIANTS[INTRO_VARIANT]

  useEffect(() => {
    const toExit = window.setTimeout(() => setExiting(true), duration)
    return () => window.clearTimeout(toExit)
  }, [duration])

  useEffect(() => {
    if (!exiting) return
    const toFinish = window.setTimeout(onFinish, EXIT_MS)
    return () => window.clearTimeout(toFinish)
  }, [exiting, onFinish])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-ink ${
        exiting ? 'intro-exit' : ''
      }`}
    >
      {/* 별하늘 — 가장 뒤에 깔린다. 보라 영역과 같은 크기라 그 안에만 보인다. */}
      <Starfield />

      {/* 바깥 번짐 — 보라 영역의 가장자리를 만든다 */}
      <div
        className="intro-nebula pointer-events-none absolute h-[46rem] w-[46rem] rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(88,28,135,0.3) 48%, rgba(76,29,149,0) 72%)',
        }}
      />

      {/* 안쪽 핵 — 좁고 진하게. 두 겹을 겹쳐야 평면적으로 보이지 않는다. */}
      <div
        className="intro-glow pointer-events-none absolute h-[26rem] w-[26rem] rounded-full blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, rgba(196,181,253,0.6) 0%, rgba(139,92,246,0.72) 34%, rgba(109,40,217,0) 74%)',
        }}
      />

      <Content />
    </div>
  )
}
