import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'

export function Skills() {
  return (
    <Section id="skills" title="Skills" description="사용해 본 기술과 도구입니다.">
      <dl className="grid gap-6 sm:grid-cols-2">
        {profile.skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-accent/60"
          >
            <dt className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
              {group.category}
            </dt>
            <dd className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full bg-surface px-3 py-1 text-sm text-fg">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
