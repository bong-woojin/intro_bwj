import { useState } from 'react'
import { DisclosureButton, DisclosurePanel } from '@/components/ui/Disclosure'
import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { categoryLabel, companyProjects } from '@/lib/projects'
import { revealDelay } from '@/lib/reveal'
import type { Project } from '@/types'

interface ExperienceItemProps {
  project: Project
  index: number
  visible: boolean
}

function ExperienceItem({ project, index, visible }: ExperienceItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <li
      className={`relative pl-7 sm:pl-9 ${visible ? 'card-in' : 'card-hidden'}`}
      style={revealDelay(index * 70)}
    >
      {/* 세로선 위의 점 — 회색 선 위에서 항목의 시작을 짚어 주도록 포인트 색으로 칠하고 은은하게 번지게 한다.
          바깥 고리는 카드 바탕(반투명 surface 아래로 비치는 ink)과 같은 색이라 선이 점 뒤로 끊겨 지나가는 것처럼 보인다.
          스크롤 연동을 지원하면 선이 지나갈 때 불이 켜진다 (index.css의 .exp-dot). */}
      <span
        aria-hidden="true"
        className="exp-dot absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-accent shadow-[0_0_10px_rgb(167_139_250/0.6)] ring-4 ring-ink"
      />

      <p className="text-xs tracking-wide text-muted tabular-nums">{project.period}</p>
      <h3 className="mt-1.5 font-semibold tracking-tight sm:text-lg">{project.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-fg/80">{project.summary}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
        <span className="text-muted">{categoryLabel(project)}</span>

        {/* 살아 있는 서비스는 바로 사이트로 보내고, 없는 작업은 그 이유를 적는다.
            위쪽 전시대로 건너가게 하면 읽던 자리를 잃고 다시 내려와야 한다. */}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent hover:underline"
          >
            사이트 보기 →
          </a>
        ) : (
          project.linkNote && (
            <span className="rounded-full bg-fg/8 px-2.5 py-1 text-[0.7rem] text-fg/75 ring-1 ring-fg/10">
              {project.linkNote}
            </span>
          )
        )}

        <DisclosureButton
          open={open}
          onToggle={() => setOpen((value) => !value)}
          className="ml-auto"
        />
      </div>

      <DisclosurePanel open={open}>
        <p className="pt-3 text-sm leading-relaxed text-muted">{project.description}</p>
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
      </DisclosurePanel>
    </li>
  )
}

export function Experience() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const { company } = profile

  return (
    <Section id="experience" title="Experience" description="회사에서 맡아 온 일입니다.">
      <div ref={ref} className="rounded-2xl border border-line bg-surface/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xl font-bold tracking-tight">{company.name}</p>
          <p className="text-sm text-muted tabular-nums">{company.period}</p>
        </div>

        <ol className="exp-line relative mt-8 space-y-9 border-l border-line">
          {companyProjects.map((project, index) => (
            <ExperienceItem key={project.id} project={project} index={index} visible={inView} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
