import { StageOrbit } from '@/components/hero/StageOrbit'
import { ScrollCue } from '@/components/ui/ScrollCue'
import { profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { revealDelay as delay } from '@/lib/reveal'

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const introEnd = 260 + profile.introduction.length * 90

  const [taglineHead, ...taglineRest] = profile.tagline.split(/,\s*/)
  const taglineTail = taglineRest.join(', ')

  const introduction = profile.introduction.map((paragraph, index) => (
    <p key={paragraph} className="reveal leading-relaxed" style={delay(260 + index * 90)}>
      {paragraph}
    </p>
  ))

  return (
    <section
      id="top"
      className="relative flex flex-col px-6 lg:min-h-[calc(100svh-4rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-32 h-[32rem] w-[32rem] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0) 70%)',
        }}
      />

      <div
        ref={ref}
        className={`reveal-group relative mx-auto w-full max-w-5xl lg:grid lg:flex-1 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center lg:gap-10 lg:py-12 ${
          inView ? 'is-visible' : ''
        }`}
      >
        <div
          id="about"
          className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-12 lg:block lg:min-h-0 lg:py-0"
        >
          <p
            className="reveal text-sm font-medium tracking-[0.3em] text-accent uppercase"
            style={delay(0)}
          >
            {profile.role}
          </p>

          <h1
            className="reveal mt-5 text-4xl leading-[1.18] font-bold tracking-tight sm:text-6xl"
            style={delay(90)}
          >
            안녕하세요,
            <br />
            <span className="text-accent">{profile.name}</span>입니다.
          </h1>

          <p className="reveal mt-6 max-w-xl text-lg text-fg/90" style={delay(180)}>
            {taglineHead}
            {taglineTail && (
              <>
                ,<br className="sm:hidden" /> {taglineTail}
              </>
            )}
          </p>

          <div className="mt-7 hidden max-w-2xl space-y-3 text-muted lg:block">{introduction}</div>

          <div className="reveal mt-9 flex flex-wrap gap-3 lg:mt-8" style={delay(introEnd + 60)}>
            <a
              href="#works"
              className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:opacity-85 active:scale-[0.97]"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
              작업물 보기
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-nudge inline-flex items-center gap-2 rounded-full border border-accent px-5 py-2.5 text-sm font-medium transition duration-200 hover:bg-accent/10 hover:text-accent active:scale-[0.97]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 13h6M9 17h4" />
                </svg>
                이력서 보기
              </a>
            )}
          </div>
        </div>

        <div className="pb-4 lg:pb-0">
          <div className="pt-2 pb-4 lg:hidden">
            <h2 className="text-2xl font-bold tracking-tight">About</h2>
            <div className="mt-5 h-px w-16 bg-accent" />
            <div className="mt-8 space-y-3 text-muted">{introduction}</div>
          </div>

          <div className="reveal hidden lg:block" style={delay(introEnd + 140)}>
            <StageOrbit />
          </div>
        </div>
      </div>

      <ScrollCue href="#strengths" className="hidden lg:flex" />
    </section>
  )
}
