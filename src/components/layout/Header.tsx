import { SECTIONS, profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTION_IDS = SECTIONS.map((section) => section.id)

export function Header() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/70 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <a href="#top" className="text-sm font-bold tracking-tight">
          {profile.name}
        </a>
        <nav aria-label="주요 섹션">
          <ul className="flex items-center gap-1 sm:gap-2">
            {SECTIONS.map((section) => {
              const isActive = active === section.id
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-accent-strong text-white'
                        : 'text-muted hover:bg-surface hover:text-fg'
                    }`}
                  >
                    {section.label}
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
