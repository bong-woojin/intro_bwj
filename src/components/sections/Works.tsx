import { useEffect, useMemo, useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { DeviceStage } from '@/components/works/DeviceStage'
import { useInView } from '@/hooks/useInView'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { PLATFORM_LABEL, categoryLabel, showcaseProjects } from '@/lib/projects'
import { revealDelay } from '@/lib/reveal'
import type { Project } from '@/types'

interface WorkCardProps {
  project: Project
  visible: boolean
  /** 등장 순서를 만드는 지연(ms) */
  delay: number
}

/* 설명(description)은 싣지 않는다. 3열 카드는 폭이 좁아 긴 글을 넣으면
   한 줄에 열 글자 남짓씩 세로로 끝없이 늘어나 전시대가 글에 묻힌다. */
function WorkCard({ project, visible, delay }: WorkCardProps) {
  const platform = project.platform ?? 'pc'

  return (
    <article
      className={`works-item group ${visible ? 'card-in' : 'card-hidden'}`}
      style={revealDelay(delay)}
    >
      {/* 전시대 — 위에서 조명이 떨어지는 받침 위에 기기를 세운다 */}
      <div className="works-plinth relative rounded-2xl border border-line px-[12%] pt-[13%] pb-[7%] transition-colors duration-300 group-hover:border-accent/50">
        {/* 틀 모양만으로는 반응형인지 바로 읽히지 않을 수 있어 글자로도 적는다 */}
        <span className="absolute top-3 left-3 rounded-full bg-ink/60 px-2 py-0.5 text-[0.65rem] font-medium tracking-[0.12em] text-muted ring-1 ring-line">
          {PLATFORM_LABEL[platform]}
        </span>
        <div className="works-tilt">
          <DeviceStage
            platform={platform}
            thumbnail={project.thumbnail}
            thumbnailMobile={project.thumbnailMobile}
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted">
          <span>{categoryLabel(project)}</span>
          <span aria-hidden="true" className="text-line">
            ·
          </span>
          <span>{project.period}</span>
        </p>

        <h3 className="mt-2 text-lg font-semibold tracking-tight">{project.title}</h3>

        <p className="mt-1.5 text-sm leading-relaxed text-accent">{project.summary}</p>

        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs tracking-wide text-muted/85">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="after:ml-2 after:text-line after:content-['·'] last:after:content-none"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              사이트 보기 →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-fg hover:underline"
            >
              GitHub →
            </a>
          )}
          {/* 링크를 걸 수 없는 이유를 밝혀 둔다. 빈 자리로 두면 왜 없는지 알 수 없다. */}
          {project.linkNote && !project.demoUrl && (
            <span className="rounded-full bg-fg/8 px-2.5 py-1 text-[0.7rem] font-normal text-fg/75 ring-1 ring-fg/10">
              {project.linkNote}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

/** 서랍이 열리고 닫히는 시간. index.css의 .works-drawer와 짝을 이룬다. */
const DRAWER_MS = 700
/** 닫혀 있을 때 서랍 틈으로 비치는 높이. 다음 줄 받침의 윗부분만 보인다. */
const PEEK_PX = 128
const STAGGER_MS = 70

const GRID = 'grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3'

/**
 * 작업이 계속 늘어나므로 첫 줄만 펼쳐 두고 나머지는 서랍에 넣는다.
 * 닫힌 서랍은 0이 아니라 다음 줄 윗부분까지 열어 두어, 안에 더 있다는 걸 보여 준다.
 */
export function Works() {
  const { ref, inView } = useInView<HTMLDivElement>()

  const isLg = useMediaQuery('(min-width: 64rem)')
  const isSm = useMediaQuery('(min-width: 40rem)')
  const columns = isLg ? 3 : isSm ? 2 : 1
  /* 한 열일 때 한 장만 두면 전시대가 비어 보여 두 장까지는 펼쳐 둔다 */
  const headCount = Math.max(columns, 2)

  const [head, rest] = useMemo(
    () => [showcaseProjects.slice(0, headCount), showcaseProjects.slice(headCount)],
    [headCount],
  )

  const [open, setOpen] = useState(false)
  /* 다 열린 뒤에만 잘라내기를 푼다. 열리는 중에 풀면 아직 펼쳐지지 않은 카드가 비어져 나온다. */
  const [settled, setSettled] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)
  const [fullHeight, setFullHeight] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const duration = reducedMotion ? 0 : DRAWER_MS
  const scrollBehavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth'

  /* 서랍 높이를 auto로 두면 전환이 걸리지 않으므로 안쪽 높이를 재서 넘긴다.
     화면 폭이 바뀌면 줄 수가 달라지므로 계속 따라 잰다. */
  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    const observer = new ResizeObserver(() => setFullHeight(inner.scrollHeight))
    observer.observe(inner)
    return () => observer.disconnect()
  }, [rest.length])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const openDrawer = () => {
    setOpen(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setSettled(true), duration)
  }

  /* 펼친 채로 한참 내려가 있다가 닫으면 화면이 통째로 위로 사라져 위치를 잃는다.
     섹션 머리가 화면 위로 지나가 있으면 그 자리로 되돌린다. */
  const closeDrawer = () => {
    window.clearTimeout(timer.current)
    setSettled(false)
    setOpen(false)
    const section = document.getElementById('works')
    if (section && section.getBoundingClientRect().top < 0) {
      section.scrollIntoView({ behavior: scrollBehavior })
    }
  }

  return (
    <Section id="works" title="Works" description="직접 만들고 배포한 결과물입니다.">
      <div ref={ref}>
        <div className={GRID}>
          {head.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              visible={inView}
              delay={index * STAGGER_MS}
            />
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <div
              id="works-drawer"
              className={`works-drawer relative mt-14 ${settled ? '' : 'overflow-hidden'}`}
              style={{ height: open ? fullHeight : PEEK_PX, transitionDuration: `${duration}ms` }}
            >
              {/* 닫혀 있는 동안은 틈으로 비치기만 하고 포커스는 받지 않는다 */}
              <div ref={innerRef} inert={!open} className={GRID}>
                {rest.map((project, index) => {
                  /* 틈으로 비치는 첫 줄은 위 카드들과 함께 올라오고,
                     그 아래 줄은 서랍이 열릴 때 차례로 올라온다 */
                  const peeking = index < columns
                  return (
                    <WorkCard
                      key={project.id}
                      project={project}
                      visible={peeking ? inView : open}
                      delay={
                        peeking
                          ? (head.length + index) * STAGGER_MS
                          : (index - columns + 1) * STAGGER_MS
                      }
                    />
                  )
                })}
              </div>

              {/* 비치는 카드를 바닥 색으로 덮어 서랍 안쪽처럼 어둡게 한다. 눌러도 열린다. */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => openDrawer()}
                className={`absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/75 to-ink transition-opacity duration-500 ${
                  open ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                aria-expanded={open}
                aria-controls="works-drawer"
                onClick={open ? closeDrawer : () => openDrawer()}
                className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted transition duration-200 hover:border-accent hover:text-fg active:scale-[0.97]"
              >
                {open ? '접기' : '전체 작업 보기'}
                {!open && (
                  <span className="text-xs text-accent tabular-nums">
                    {showcaseProjects.length}
                  </span>
                )}
                <svg
                  viewBox="0 0 24 24"
                  className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
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
            </div>
          </>
        )}
      </div>
    </Section>
  )
}
