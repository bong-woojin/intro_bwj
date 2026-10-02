import { useLayoutEffect, useRef } from 'react'
import { DeviceStage } from '@/components/works/DeviceStage'
import { ProjectLinks, StackList } from '@/components/works/ProjectMeta'
import { PLATFORM_LABEL, categoryLabel } from '@/lib/projects'
import type { Project } from '@/types'

interface WorkDialogProps {
  project: Project | null
  /** 닫아 달라는 요청. 닫는 전환을 부모(Works)가 맡으므로 여기서 바로 닫지 않는다. */
  onClose: () => void
  /**
   * 카드의 기기가 날아와 열렸는지. 그렇다면 팝업 자체의 떠오르는 연출은 끈다.
   * 전환 중에만 끄면 전환이 끝나는 순간 연출이 처음부터 다시 재생되어 한 번 깜빡인다.
   */
  morphed: boolean
}

/** 카드의 기기와 팝업의 기기를 같은 물체로 잇는 이름. Works.tsx와 index.css가 함께 쓴다. */
export const WORK_DEVICE_TRANSITION = 'work-device'

/**
 * Works 카드의 자세히 보기.
 * 카드는 폭이 좁아 설명을 넣으면 글이 세로로 끝없이 늘어나므로, 섹션 폭의 팝업에서
 * 큰 화면과 설명을 나란히 보여 준다.
 *
 * 네이티브 <dialog>의 showModal()을 쓴다. 뒤쪽 포커스 막기,
 * 닫은 뒤 누른 버튼으로 포커스 되돌리기를 브라우저가 해 준다.
 *
 * 열고 닫기는 layout effect에서 한다. Works가 화면 전환(View Transition) 안에서
 * flushSync로 project를 바꾸는데, 그 순간 dialog도 함께 열려 있어야 새 화면으로 찍힌다.
 */
export function WorkDialog({ project, onClose, morphed }: WorkDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  /* <dialog>는 뒤쪽 스크롤까지 막아 주지 않는다. 열려 있는 동안 본문을 잠근다. */
  useLayoutEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [project])

  const platform = project?.platform ?? 'pc'

  return (
    <dialog
      ref={ref}
      aria-labelledby="work-dialog-title"
      data-morphed={morphed || undefined}
      /* Esc는 브라우저가 곧장 닫아 버려 닫는 전환을 걸 틈이 없다. 막고 직접 닫는다. */
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      /* 바깥(배경)을 누르면 닫는다. 안쪽 내용을 누른 것은 target이 dialog가 아니다. */
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="work-dialog m-auto max-h-[calc(100svh-3rem)] w-[min(61rem,calc(100vw-3rem))] overflow-y-auto rounded-2xl border border-line bg-ink p-0 text-fg"
    >
      {/* 한 열일 때는 닫기 버튼이 전시대 모서리를 덮지 않게 위를 비워 둔다 */}
      {project && (
        <div className="relative grid gap-8 p-6 pt-14 sm:p-8 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="works-plinth relative rounded-2xl border border-line px-[8%] pt-[10%] pb-[6%]">
            <span className="absolute top-3 left-3 rounded-full bg-ink/60 px-2 py-0.5 text-[0.65rem] font-medium tracking-[0.12em] text-muted ring-1 ring-line">
              {PLATFORM_LABEL[platform]}
            </span>
            <div style={{ viewTransitionName: WORK_DEVICE_TRANSITION }}>
              <DeviceStage
                platform={platform}
                thumbnail={project.thumbnail}
                thumbnailMobile={project.thumbnailMobile}
                stage="dialog"
              />
            </div>
          </div>

          <div>
            <p className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted">
              <span>{categoryLabel(project)}</span>
              <span aria-hidden="true" className="text-line">
                ·
              </span>
              <span>{project.period}</span>
            </p>

            <h3 id="work-dialog-title" className="mt-2 pr-8 text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-accent">{project.summary}</p>

            <p className="mt-5 text-sm leading-relaxed text-fg/75">{project.description}</p>

            <StackList stack={project.stack} className="mt-5 border-t border-line pt-4" />

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-medium">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
