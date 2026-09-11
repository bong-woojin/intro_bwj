import { useState } from 'react'
import { StrengthVisual } from '@/components/sections/StrengthVisual'
import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'
import { useActiveOnScroll } from '@/hooks/useActiveOnScroll'
import { useInView } from '@/hooks/useInView'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { revealDelay } from '@/lib/reveal'
import { STAGES } from '@/lib/stages'

export function Strengths() {
  /* 넓은 화면에서는 한 칸만 펼친다. 처음부터 하나를 열어 두어야
     펼칠 수 있다는 걸 알리고, 빈 칸처럼 보이지 않는다. */
  const [hovered, setHovered] = useState(0)
  const { ref, inView } = useInView<HTMLOListElement>()

  /* 좁은 화면에는 hover가 없어 두 번째·세 번째 카드의 연출이 영원히 멈춰 있었다.
     스크롤에 따라 화면 가운데 카드가 저절로 켜지도록 대신한다. */
  const isNarrow = useMediaQuery('(max-width: 1023px)')
  const { active: scrolledInto, register } = useActiveOnScroll(profile.strengths.length, isNarrow)
  const active = isNarrow ? scrolledInto : hovered

  return (
    <Section id="strengths" title="Strengths" description="일하면서 만든 결과로 정리한 강점입니다.">
      <ol
        ref={ref}
        className={`reveal-group flex flex-col gap-4 lg:flex-row lg:items-stretch ${
          inView ? 'is-visible' : ''
        }`}
      >
        {profile.strengths.map((strength, index) => {
          const isActive = active === index
          /* 헤더 로고와 첫 화면 그림의 세 축과 같은 색을 쓴다 */
          const stage = STAGES[index]
          const color = `rgb(${stage.rgb})`

          return (
            <li
              key={strength.title}
              /* 셋이 항상 같은 폭. basis를 0으로 둬야 내용 길이가 폭에 영향을 주지 않는다. */
              ref={register(index)}
              className="reveal min-w-0 lg:basis-0 lg:grow"
              style={revealDelay(index * 90)}
            >
              <button
                type="button"
                onMouseEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onClick={() => setHovered(index)}
                aria-expanded={isActive}
                className={`flex h-full w-full flex-col overflow-hidden rounded-2xl border p-6 text-left transition duration-300 active:scale-[0.99] ${
                  isActive
                    ? 'border-accent/50 bg-accent-strong/8'
                    : 'border-line bg-surface/40 hover:border-accent/40'
                }`}
              >
                <div
                  className="transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.45 }}
                >
                  <StrengthVisual name={strength.visual} color={color} active={isActive} />
                </div>

                <span
                  className="mt-5 text-[0.65rem] font-medium tracking-[0.22em] uppercase transition-opacity duration-300"
                  style={{ color, opacity: isActive ? 1 : 0.6 }}
                >
                  {stage.name}
                </span>

                <h3 className="mt-2 text-base font-semibold tracking-tight">{strength.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{strength.description}</p>

                <ul className="mt-auto space-y-1.5 border-t border-line pt-4 text-sm">
                  {strength.evidence.map((item) => (
                    <li key={item} className="flex gap-2 text-fg/85">
                      <span aria-hidden="true" style={{ color }}>
                        ·
                      </span>
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </button>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
