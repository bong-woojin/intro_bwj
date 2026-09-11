import { BrandMark } from '@/components/layout/BrandMark'
import { SECTIONS } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTION_IDS = SECTIONS.map((section) => section.id)

export function Header() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/70 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          aria-label="맨 위로"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <BrandMark />
          {/* 좁은 화면에서는 마크만 남긴다. 내비에 자리를 내주기 위해서다. */}
          <span className="hidden text-sm font-bold tracking-[0.12em] sm:inline">BWJ</span>
        </a>

        <nav aria-label="주요 섹션">
          {/* 360px에서는 다섯 항목의 글자가 들어가지 않는다.
              좁은 화면에서는 점으로 바꿔 현재 위치만 알리고, 넓어지면 이름을 되살린다. */}
          <ul className="flex items-center gap-1 sm:gap-2">
            {SECTIONS.map((section) => {
              const isActive = active === section.id
              return (
                <li key={section.id}>
                  <a
                    href={section.href ?? `#${section.id}`}
                    aria-label={section.label}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-center justify-center rounded-full transition-colors max-sm:size-9 sm:px-3 sm:py-1.5 sm:text-sm ${
                      isActive
                        ? 'sm:bg-accent-strong sm:text-white'
                        : 'sm:text-muted sm:hover:bg-surface sm:hover:text-fg'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`block rounded-full transition-all duration-300 sm:hidden ${
                        isActive ? 'size-2 bg-accent' : 'size-1.5 bg-muted/50'
                      }`}
                    />
                    <span className="hidden sm:inline">{section.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
