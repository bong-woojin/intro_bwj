import { Fragment, useMemo, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { PROJECT_CATEGORIES, profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { revealDelay } from '@/lib/reveal'
import type { Project, ProjectCategory } from '@/types'

/** 카드와 같은 등장 규칙을 연도 구분선에도 쓴다 */
const visibleClass = (visible: boolean) => (visible ? 'card-in' : 'card-hidden')

type TabId = ProjectCategory | 'all'

interface Tab {
  id: TabId
  label: string
  count: number
}

interface ProjectCardProps {
  project: Project
  index: number
  visible: boolean
}

function ProjectCard({ project, index, visible }: ProjectCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <article
      className={`rounded-2xl border p-6 transition-colors ${
        visible ? 'card-in' : 'card-hidden'
      } ${
        project.featured
          ? 'border-accent/45 bg-accent-strong/8 hover:border-accent'
          : 'border-line bg-surface/40 hover:border-accent/60'
      }`}
      style={revealDelay(index * 90)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          {project.title}
          {project.featured && (
            <span className="rounded-full border border-accent/50 px-2 py-0.5 text-[0.65rem] font-medium tracking-[0.15em] text-accent uppercase">
              Main
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2.5 text-sm text-muted">
          {/* 링크를 걸 수 없는 이유를 밝혀 둔다. 빈 자리로 두면 왜 없는지 알 수 없다.
              테두리만 두면 옆의 기간 글자와 같은 밝기로 묻히므로 Skills 칩과 같은 채움을 쓴다. */}
          {project.linkNote && !project.demoUrl && (
            <span className="rounded-full bg-fg/8 px-2.5 py-1 text-[0.7rem] whitespace-nowrap text-fg/75 ring-1 ring-fg/10">
              {project.linkNote}
            </span>
          )}
          <span className="whitespace-nowrap">{project.period}</span>
        </div>
      </div>

      <p className="mt-2 text-accent">{project.summary}</p>

      {/* 설명은 기본으로 접어 둔다. 카드 11개가 5~6줄씩 펼쳐져 있으면
          훑어보려는 사람이 카드마다 벽을 만난다. 요약 한 줄로도 무엇을 했는지는 전달된다. */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-fit items-center gap-1.5 text-sm text-muted transition duration-200 hover:text-fg active:scale-[0.97]"
        >
          {open ? '접기' : '자세히'}
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

        {/* 높이를 auto로 두면 전환이 걸리지 않는다.
            grid의 행 크기를 0fr에서 1fr로 움직이면 내용 높이를 몰라도 부드럽게 펼쳐진다. */}
        <div
          className={`grid transition-[grid-template-rows] duration-400 ease-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <p className="pt-3 leading-relaxed text-muted">{project.description}</p>
          </div>
        </div>
      </div>

      {/* 스택은 보조 정보라 알약으로 감싸지 않는다.
          다만 설명과 같은 회색이라 그냥 두면 문장이 이어지는 것처럼 보이므로,
          구분선을 긋고 글자를 한 단계 줄여 성격이 다른 정보임을 드러낸다. */}
      <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1 border-t border-line pt-4 text-xs tracking-wide text-muted/85">
        {project.stack.map((tech) => (
          /* 구분점은 항목 뒤에 붙인다. 앞에 두면 줄이 바뀔 때 점이 새 줄 맨 앞으로 가서
             들여쓰기한 것처럼 보인다. */
          <li
            key={tech}
            className="after:ml-2 after:text-line after:content-['·'] last:after:content-none"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-6 flex gap-4 text-sm font-medium">
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
        </div>
      )}
    </article>
  )
}

export function Projects() {
  const [active, setActive] = useState<TabId>('all')
  const { ref, inView } = useInView<HTMLDivElement>()

  /* 항목이 하나도 없는 분류는 탭에 띄우지 않는다.
     개인 프로젝트를 profile.ts에 추가하면 그때 탭이 저절로 생긴다. */
  const tabs = useMemo<Tab[]>(() => {
    const counted = PROJECT_CATEGORIES.map((category) => ({
      id: category.id as TabId,
      label: category.label,
      count: profile.projects.filter((project) => project.category === category.id).length,
    })).filter((tab) => tab.count > 0)

    return [{ id: 'all', label: '전체', count: profile.projects.length }, ...counted]
  }, [])

  const filtered = useMemo(
    () =>
      active === 'all'
        ? profile.projects
        : profile.projects.filter((project) => project.category === active),
    [active],
  )

  return (
    <Section id="projects" title="Projects" description="직접 만들고 배포한 결과물입니다.">
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(tab.id)}
              className={`rounded-full border px-4 py-2 text-sm transition duration-200 active:scale-[0.97] ${
                isActive
                  ? 'border-accent bg-accent-strong/20 text-fg'
                  : 'border-line text-muted hover:border-accent/50 hover:text-fg'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs ${isActive ? 'text-accent' : 'text-muted/70'}`}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* 탭이 바뀌면 key가 달라져 카드가 다시 마운트되고, 등장 애니메이션이 새로 재생된다 */}
      <div ref={ref} className="grid gap-6">
        {filtered.map((project, index) => {
          /* 최신순이라 내려갈수록 과거가 된다. 연도를 끊어 두면 쓰던 기술이
             jQuery에서 Vue, React로 옮겨간 흐름이 눈에 들어온다. */
          const year = project.period.slice(0, 4)
          const isNewYear = index === 0 || filtered[index - 1].period.slice(0, 4) !== year

          return (
            <Fragment key={`${active}-${project.id}`}>
              {isNewYear && (
                <div
                  className={`flex items-center gap-4 ${visibleClass(inView)}`}
                  style={revealDelay(index * 90)}
                >
                  <span className="text-sm font-semibold tracking-[0.2em] text-muted">{year}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </div>
              )}

              <ProjectCard project={project} index={index} visible={inView} />
            </Fragment>
          )
        })}
      </div>
    </Section>
  )
}
