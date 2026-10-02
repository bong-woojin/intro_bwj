import { StageOrbit } from '@/components/hero/StageOrbit'
import { ScrollCue } from '@/components/ui/ScrollCue'
import { profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { revealDelay as delay } from '@/lib/reveal'

interface HeroProps {
  /** 인트로가 걷히기 시작하면 true. 오른쪽 그림의 등장 연출이 이때 시작된다. */
  heroReady: boolean
}

export function Hero({ heroReady }: HeroProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const introEnd = 260 + profile.introduction.length * 90

  /* 한 줄 소개는 첫 쉼표에서 끊어 둔다. 좁은 화면에서 그 자리에 줄을 바꾸기 위해서다. */
  const [taglineHead, ...taglineRest] = profile.tagline.split(/,\s*/)
  const taglineTail = taglineRest.join(', ')

  /* 소개 문단은 놓이는 자리가 화면 크기에 따라 달라 한 번 만들어 두 곳에서 쓴다.
     한쪽은 display로 감추므로 화면에 두 번 보이지는 않는다. */
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
      {/* 히어로 뒤에 은은하게 깔리는 보라 글로우 */}
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
        {/* 좁은 화면에서는 이 블록까지가 첫 화면이다.
            소개 문단까지 넣으면 폰 높이의 두 배를 넘겨 잘려 보인다.
            vh가 아니라 svh를 쓰는 이유는 주소창이 접혔다 펴질 때 vh가 튀기 때문이다. */}
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
            /* text-4xl·6xl이 각각 1.11·1.0의 줄 간격을 함께 지정해서 두 줄이 붙어 보인다.
               크기와 무관하게 같은 비율이 되도록 따로 잡는다. */
            className="reveal mt-5 text-4xl leading-[1.18] font-bold tracking-tight sm:text-6xl"
            style={delay(90)}
          >
            안녕하세요,
            <br />
            <span className="text-accent">{profile.name}</span>입니다.
          </h1>

          <p className="reveal mt-6 max-w-xl text-lg text-fg/90" style={delay(180)}>
            {/* 좁은 화면에서는 쉼표에서 줄을 바꾼다.
                br을 감추면 줄바꿈도 사라지므로 넓은 화면에서는 한 줄로 이어진다. */}
            {taglineHead}
            {taglineTail && (
              <>
                ,<br className="sm:hidden" /> {taglineTail}
              </>
            )}
          </p>

          {/* 넓은 화면에서는 소개가 버튼 위에 놓여 한 화면에 함께 보인다 */}
          <div className="mt-7 hidden max-w-2xl space-y-3 text-muted lg:block">{introduction}</div>

          <div className="reveal mt-9 flex flex-wrap gap-3 lg:mt-8" style={delay(introEnd + 60)}>
            <a
              href="#works"
              className="rounded-full bg-accent-strong px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:opacity-85 active:scale-[0.97]"
            >
              작업물 보기
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition duration-200 hover:border-accent hover:text-accent active:scale-[0.97]"
            >
              연락하기
            </a>
          </div>
        </div>

        {/* 넓은 화면에서는 오른쪽 열에 그림이 놓인다.
            좁은 화면에서는 첫 화면 다음에 소개 글이 이어진다. 제목을 붙이지 않으면
            아무 설명 없는 덩어리로 떠 있어 뜬금없이 나온 것처럼 보인다. */}
        <div className="pb-4 lg:pb-0">
          <div className="pt-2 pb-4 lg:hidden">
            <h2 className="text-2xl font-bold tracking-tight">About</h2>
            <div className="mt-5 h-px w-16 bg-accent" />
            <div className="mt-8 space-y-3 text-muted">{introduction}</div>
          </div>

          {/* 퍼블리셔 · 프론트엔드 · AI가 맞물려 도는 그림.
              좁은 화면에서는 감춘다. 같은 이야기를 Strengths가 근거까지 붙여 다시 한다. */}
          <div className="reveal hidden lg:block" style={delay(introEnd + 140)}>
            <StageOrbit active={heroReady} />
          </div>
        </div>
      </div>

      <ScrollCue href="#strengths" className="hidden lg:flex" />
    </section>
  )
}
