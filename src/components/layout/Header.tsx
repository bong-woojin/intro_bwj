import { useLayoutEffect, useRef, useState } from 'react'
import { BrandMark } from '@/components/layout/BrandMark'
import { SECTIONS } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTION_IDS = SECTIONS.map((section) => section.id)

interface PillBox {
  left: number
  top: number
  width: number
  height: number
}

export function Header() {
  const active = useActiveSection(SECTION_IDS)

  /* 현재 위치 배경 — 메뉴마다 칠하지 않고 하나를 두어 현재 메뉴 아래로 미끄러지게 한다.
     메뉴 글자 폭이 저마다 달라 위치와 폭을 재서 넘긴다. */
  const listRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>())
  const [pill, setPill] = useState<PillBox | null>(null)
  /* 처음 자리를 잡을 때는 미끄러지지 않게 한다. 왼쪽 끝에서 날아오는 것처럼 보인다. */
  const [pillReady, setPillReady] = useState(false)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      const link = linkRefs.current.get(active)
      if (!link) return
      setPill({
        left: link.offsetLeft,
        top: link.offsetTop,
        width: link.offsetWidth,
        height: link.offsetHeight,
      })
    }

    measure()
    /* 글꼴이 늦게 들어오거나 화면 폭이 바뀌면 메뉴 폭이 달라진다 */
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [active])

  useLayoutEffect(() => {
    if (!pill || pillReady) return
    const frame = requestAnimationFrame(() => setPillReady(true))
    return () => cancelAnimationFrame(frame)
  }, [pill, pillReady])

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
          <ul ref={listRef} className="relative flex items-center gap-1 sm:gap-2">
            {/* 좁은 화면은 점으로 위치를 알리므로 배경은 넓은 화면에서만 쓴다 */}
            {pill && (
              <li
                aria-hidden="true"
                className={`nav-pill pointer-events-none absolute top-0 left-0 hidden rounded-full bg-accent-strong sm:block ${
                  pillReady ? 'is-ready' : ''
                }`}
                style={{
                  width: pill.width,
                  height: pill.height,
                  transform: `translate(${pill.left}px, ${pill.top}px)`,
                }}
              />
            )}
            {SECTIONS.map((section) => {
              const isActive = active === section.id
              return (
                <li key={section.id}>
                  <a
                    ref={(element) => {
                      if (element) linkRefs.current.set(section.id, element)
                      else linkRefs.current.delete(section.id)
                    }}
                    href={section.href ?? `#${section.id}`}
                    aria-label={section.label}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex items-center justify-center rounded-full transition-colors max-sm:size-9 sm:px-3 sm:py-1.5 sm:text-sm ${
                      isActive
                        ? 'sm:text-white'
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
