import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { revealDelay } from '@/lib/reveal'

export function Skills() {
  const { ref, inView } = useInView<HTMLDListElement>()

  return (
    <Section id="skills" title="Skills" description="사용해 본 기술과 도구입니다.">
      <dl
        ref={ref}
        className={`reveal-group grid gap-6 sm:grid-cols-2 ${inView ? 'is-visible' : ''}`}
      >
        {profile.skills.map((group, index) => (
          <div
            key={group.category}
            className="reveal rounded-2xl border border-line bg-surface/40 p-6 hover:border-accent/60"
            style={revealDelay(index * 80)}
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
