import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { revealDelay } from '@/lib/reveal'

interface SectionProps {
  id: string
  title: string
  description?: string
  children: ReactNode
}

export function Section({ id, title, description, children }: SectionProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    /* 위아래 여백은 인접한 두 섹션에서 더해진다.
       py-28이면 섹션 사이가 224px이 되어 화면 높이의 4분의 1이 빈 공간이 된다. */
    <section id={id} className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
      <header ref={ref} className={`reveal-group mb-10 ${inView ? 'is-visible' : ''}`}>
        <h2 className="reveal text-2xl font-bold tracking-tight sm:text-3xl" style={revealDelay(0)}>
          {title}
        </h2>
        {description && (
          <p className="reveal mt-3 text-muted" style={revealDelay(90)}>
            {description}
          </p>
        )}
        <div className="reveal mt-5 h-px w-16 bg-accent" style={revealDelay(160)} />
      </header>
      {children}
    </section>
  )
}
