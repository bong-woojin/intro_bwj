import { useEffect, useState } from 'react'
import { KINETIC_DURATION, KineticIntro } from './KineticIntro'
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
      {/* 배경 글로우 */}
      <div
        className="intro-glow pointer-events-none absolute h-[46rem] w-[46rem] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 70%)',
        }}
      />
      <Content />
    </div>
  )
}
