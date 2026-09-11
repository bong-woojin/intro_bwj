import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { revealDelay } from '@/lib/reveal'

export function Skills() {
  const { ref, inView } = useInView<HTMLDListElement>()

  return (
    <Section id="skills" title="Skills" description="사용해 본 기술과 도구입니다.">
      {/* 좁은 화면에서도 카드를 쓰되 여백만 줄인다(24px → 20px).
          그룹이 8개라 세로로 길어지는 편이므로 카드 사이 간격도 좁게 잡는다. */}
      <dl
        ref={ref}
        className={`reveal-group grid gap-4 sm:grid-cols-2 sm:gap-6 ${inView ? 'is-visible' : ''}`}
      >
        {profile.skills.map((group, index) => (
          <div
            key={group.category}
            className="reveal rounded-2xl border border-line bg-surface/40 p-5 hover:border-accent/60 sm:p-6"
            style={revealDelay(index * 80)}
          >
            <dt className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
              {group.category}
            </dt>
            {/* Skills는 기술 자체가 주인공이라 칩을 쓴다.
                카드 배경과 같은 색이면 있는 듯 없는 듯 보이므로 한 단계 올린다. */}
            <dd className="mt-3 flex flex-wrap gap-2 sm:mt-4">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-fg/10 px-3 py-1 text-sm text-fg ring-1 ring-fg/12"
                >
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
