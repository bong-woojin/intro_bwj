import { ScrollCue } from '@/components/ui/ScrollCue'
import { profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { revealDelay as delay } from '@/lib/reveal'

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const introEnd = 260 + profile.introduction.length * 90

  return (
    /* 헤더(4rem)를 뺀 나머지를 꽉 채운다.
       svh를 쓰는 이유는 모바일에서 주소창이 접혔다 펴질 때 vh가 튀기 때문이다. */
    <section id="top" className="relative flex min-h-[calc(100svh-4rem)] flex-col px-6">
      {/* 히어로 뒤에 은은하게 깔리는 보라 글로우 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-32 h-[32rem] w-[32rem] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0) 70%)',
        }}
      />

      <div
        id="about"
        ref={ref}
        className={`reveal-group relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-16 ${
          inView ? 'is-visible' : ''
        }`}
      >
        <p className="reveal text-sm font-medium tracking-[0.3em] text-accent uppercase" style={delay(0)}>
          {profile.role}
        </p>

        <h1 className="reveal mt-5 text-4xl font-bold tracking-tight sm:text-6xl" style={delay(90)}>
          안녕하세요,
          <br />
          <span className="text-accent">{profile.name}</span>입니다.
        </h1>

        <p className="reveal mt-6 max-w-xl text-lg text-fg/90" style={delay(180)}>
          {profile.tagline}
        </p>

        <div className="mt-8 max-w-2xl space-y-3 text-muted">
          {profile.introduction.map((paragraph, index) => (
            <p key={paragraph} className="reveal leading-relaxed" style={delay(260 + index * 90)}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="reveal mt-10 flex flex-wrap gap-3" style={delay(introEnd + 60)}>
          <a
            href="#projects"
            className="rounded-full bg-accent-strong px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            연락하기
          </a>
        </div>
      </div>

      <ScrollCue href="#skills" />
    </section>
  )
}
