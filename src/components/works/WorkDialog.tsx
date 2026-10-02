import { useEffect, useRef } from 'react'
import { DeviceStage } from '@/components/works/DeviceStage'
import { ProjectLinks, StackList } from '@/components/works/ProjectMeta'
import { PLATFORM_LABEL, categoryLabel } from '@/lib/projects'
import type { Project } from '@/types'

interface WorkDialogProps {
  project: Project | null
  onClose: () => void
}

/**
 * Works 카드의 자세히 보기.
 * 카드는 폭이 좁아 설명을 넣으면 글이 세로로 끝없이 늘어나므로, 섹션 폭의 팝업에서
 * 큰 화면과 설명을 나란히 보여 준다.
 *
 * 네이티브 <dialog>의 showModal()을 쓴다. Esc로 닫기, 뒤쪽 포커스 막기,
 * 닫은 뒤 누른 버튼으로 포커스 되돌리기를 브라우저가 해 준다.
 */
export function WorkDialog({ project, onClose }: WorkDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  /* <dialog>는 뒤쪽 스크롤까지 막아 주지 않는다. 열려 있는 동안 본문을 잠근다. */
  useEffect(() => {
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
      onClose={onClose}
      /* 바깥(배경)을 누르면 닫는다. 안쪽 내용을 누른 것은 target이 dialog가 아니다. */
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="work-dialog m-auto max-h-[calc(100svh-3rem)] w-[min(61rem,calc(100vw-3rem))] overflow-y-auto rounded-2xl border border-line bg-ink p-0 text-fg"
    >
      {project && (
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
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
            <DeviceStage
              platform={platform}
              thumbnail={project.thumbnail}
              thumbnailMobile={project.thumbnailMobile}
              stage="dialog"
            />
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
