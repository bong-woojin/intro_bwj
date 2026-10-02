import { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Section } from '@/components/ui/Section'
import { DeviceStage } from '@/components/works/DeviceStage'
import { ProjectLinks, StackList } from '@/components/works/ProjectMeta'
import { WORK_DEVICE_TRANSITION, WorkDialog } from '@/components/works/WorkDialog'
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
  /** device — 팝업으로 이어 줄 이 카드의 기기 요소 */
  onOpen: (project: Project, device: HTMLElement | null) => void
}

/* 설명(description)은 카드에 싣지 않고 팝업(WorkDialog)으로 보낸다. 3열 카드는 폭이 좁아
   긴 글을 넣으면 한 줄에 열 글자 남짓씩 세로로 끝없이 늘어나 전시대가 글에 묻힌다. */
function WorkCard({ project, visible, delay, onOpen }: WorkCardProps) {
  const platform = project.platform ?? 'pc'
  const deviceRef = useRef<HTMLDivElement>(null)
  const open = () => onOpen(project, deviceRef.current)

  return (
    <article
      className={`works-item group ${visible ? 'card-in' : 'card-hidden'}`}
      style={revealDelay(delay)}
    >
      {/* 전시대 — 위에서 조명이 떨어지는 받침 위에 기기를 세운다. 누르면 자세히 보기가 열린다. */}
      <button
        type="button"
        onClick={open}
        aria-label={`${project.title} 자세히 보기`}
        className="works-plinth relative block w-full rounded-2xl border border-line px-[12%] pt-[13%] pb-[7%] transition-colors duration-300 group-hover:border-accent/50"
      >
        {/* 틀 모양만으로는 반응형인지 바로 읽히지 않을 수 있어 글자로도 적는다 */}
        <span className="absolute top-3 left-3 rounded-full bg-ink/60 px-2 py-0.5 text-[0.65rem] font-medium tracking-[0.12em] text-muted ring-1 ring-line">
          {PLATFORM_LABEL[platform]}
        </span>
        <div ref={deviceRef} className="works-tilt">
          <DeviceStage
            platform={platform}
            thumbnail={project.thumbnail}
            thumbnailMobile={project.thumbnailMobile}
          />
        </div>
      </button>

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

        <StackList stack={project.stack} className="mt-3" />

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium">
          <ProjectLinks project={project} />
          {/* 전시대를 눌러도 열리지만, 기기 그림만 보고는 눌린다는 걸 알기 어렵다 */}
          <button
            type="button"
            onClick={open}
            className="ml-auto text-xs font-normal text-muted transition-colors hover:text-fg"
          >
            자세히 보기
          </button>
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

  const [selected, setSelected] = useState<Project | null>(null)
  const [morphed, setMorphed] = useState(false)

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

  /*
   * 카드의 기기가 그대로 커지며 팝업 자리로 옮겨 가는 전환.
   * 누른 카드의 기기와 팝업의 기기에 같은 view-transition-name을 붙이면 브라우저가 둘을
   * 같은 물체로 보고 위치·크기를 이어 준다. 이름은 한 화면에 하나만 있어야 하므로
   * 카드 쪽에는 전환하는 순간에만 붙인다. 지원하지 않는 브라우저는 그냥 열린다.
   */
  const origin = useRef<HTMLElement | null>(null)
  const canTransition = () => 'startViewTransition' in document && !reducedMotion

  /* 팝업은 카드보다 큰 이미지를 쓴다. 받기 전에 새 화면을 찍으면 흰 화면으로 날아갔다가
     다 받은 뒤 그림이 툭 바뀐다. 전환은 이 약속이 끝날 때까지 옛 화면에 머문다.
     너무 오래 멈춰 있지 않게 0.4초에서 끊는다. */
  const screenshotsReady = () => {
    const images = [...document.querySelectorAll<HTMLImageElement>('.work-dialog img')]
    const decoded = Promise.all(images.map((image) => image.decode().catch(() => {})))
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 400))
    return Promise.race([decoded, timeout])
  }

  const openWork = (project: Project, device: HTMLElement | null) => {
    origin.current = device
    if (!device || !canTransition()) {
      setMorphed(false)
      setSelected(project)
      return
    }
    device.style.viewTransitionName = WORK_DEVICE_TRANSITION
    document.startViewTransition(async () => {
      // 옛 화면을 찍은 뒤: 카드에서 이름을 떼고 팝업을 연다 (팝업 기기가 이름을 이어받는다)
      device.style.viewTransitionName = ''
      flushSync(() => {
        setMorphed(true)
        setSelected(project)
      })
      await screenshotsReady()
    })
  }

  const closeWork = () => {
    const device = origin.current
    // 그사이 화면 폭이 바뀌어 카드가 다시 그려졌으면 돌아갈 자리가 없다
    if (!device?.isConnected || !canTransition()) {
      setSelected(null)
      return
    }
    const transition = document.startViewTransition(() => {
      flushSync(() => setSelected(null))
      device.style.viewTransitionName = WORK_DEVICE_TRANSITION
    })
    transition.finished.finally(() => {
      device.style.viewTransitionName = ''
    })
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
              onOpen={openWork}
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
                      onOpen={openWork}
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

      <WorkDialog project={selected} onClose={closeWork} morphed={morphed} />
    </Section>
  )
}
