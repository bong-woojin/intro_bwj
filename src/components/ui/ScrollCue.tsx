interface ScrollCueProps {
  /** 눌렀을 때 이동할 섹션 */
  href: string
  className?: string
}

/** 아래로 더 볼 것이 있다는 표시. 가는 선을 따라 빛이 흘러내린다. */
export function ScrollCue({ href, className = '' }: ScrollCueProps) {
  return (
    <a
      href={href}
      aria-label="아래 섹션으로 이동"
      className={`group mx-auto mb-10 w-fit flex-col items-center gap-3 ${className || 'flex'}`}
    >
      <span className="text-[0.65rem] tracking-[0.35em] text-muted uppercase transition-colors group-hover:text-fg">
        Scroll
      </span>
      {/* 선을 잘라내는 창. 빛 조각이 이 안을 지나간다. */}
      <span className="relative block h-10 w-px overflow-hidden bg-line">
        <span className="scroll-cue-bar absolute inset-x-0 top-0 block h-4 bg-accent" />
      </span>
    </a>
  )
}
