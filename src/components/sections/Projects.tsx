import { useMemo, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { PROJECT_CATEGORIES, profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { revealDelay } from '@/lib/reveal'
import type { Project, ProjectCategory } from '@/types'

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
        <div className="flex items-center gap-2 text-sm text-muted">
          {/* 링크를 걸 수 없는 이유를 밝혀 둔다. 빈 자리로 두면 왜 없는지 알 수 없다. */}
          {project.linkNote && !project.demoUrl && (
            <span className="rounded-full border border-line px-2 py-0.5 text-[0.7rem] text-muted/80">
              {project.linkNote}
            </span>
          )}
          <span>{project.period}</span>
        </div>
      </div>

      <p className="mt-2 text-accent">{project.summary}</p>
      <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full bg-surface px-3 py-1 text-sm text-fg">
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
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
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
        {filtered.map((project, index) => (
          <ProjectCard
            key={`${active}-${project.id}`}
            project={project}
            index={index}
            visible={inView}
          />
        ))}
      </div>
    </Section>
  )
}
