import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'
import type { Project } from '@/types'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-accent/60">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
        <span className="text-sm text-muted">{project.period}</span>
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
  return (
    <Section id="projects" title="Projects" description="직접 만들고 배포한 결과물입니다.">
      <div className="grid gap-6">
        {profile.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
