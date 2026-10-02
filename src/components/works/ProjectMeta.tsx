import type { Project } from '@/types'

/* Works 카드와 자세히 보기 팝업이 함께 쓰는 조각 */

/** 스택은 보조 정보라 알약으로 감싸지 않고 점으로만 나눈다 */
export function StackList({ stack, className = '' }: { stack: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-2 gap-y-1 text-xs tracking-wide text-muted/85 ${className}`}>
      {stack.map((tech) => (
        /* 구분점은 항목 뒤에 붙인다. 앞에 두면 줄이 바뀔 때 점이 새 줄 맨 앞으로 간다. */
        <li
          key={tech}
          className="after:ml-2 after:text-line after:content-['·'] last:after:content-none"
        >
          {tech}
        </li>
      ))}
    </ul>
  )
}

/** 사이트·저장소 링크. 링크를 걸 수 없으면 그 이유를 대신 적는다. */
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
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
      {/* 빈 자리로 두면 왜 없는지 알 수 없다 */}
      {project.linkNote && !project.demoUrl && (
        <span className="rounded-full bg-fg/8 px-2.5 py-1 text-[0.7rem] font-normal text-fg/75 ring-1 ring-fg/10">
          {project.linkNote}
        </span>
      )}
    </>
  )
}
