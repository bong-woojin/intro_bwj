import type { ReactNode } from 'react'

interface DisclosureButtonProps {
  open: boolean
  onToggle: () => void
  className?: string
}

/** 긴 설명을 펼치고 접는 버튼. Works 카드와 Experience 항목이 함께 쓴다. */
export function DisclosureButton({ open, onToggle, className = '' }: DisclosureButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`flex items-center gap-1 text-xs font-normal text-muted transition duration-200 hover:text-fg active:scale-[0.97] ${className}`}
    >
      {open ? '접기' : '자세히'}
      <svg
        viewBox="0 0 24 24"
        className={`size-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  )
}

/**
 * 높이를 auto로 두면 전환이 걸리지 않는다.
 * grid의 행 크기를 0fr에서 1fr로 움직이면 내용 높이를 몰라도 부드럽게 펼쳐진다.
 */
export function DisclosurePanel({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-400 ease-out ${
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      {/* 접혀 있는 동안 안쪽 링크에 Tab이 걸리지 않게 한다 */}
      <div inert={!open} className="overflow-hidden">
        {children}
      </div>
    </div>
  )
}
