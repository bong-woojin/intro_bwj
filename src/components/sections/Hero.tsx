import { profile } from '@/data/profile'

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex w-full max-w-5xl flex-col justify-center px-6 py-28 sm:py-36"
    >
      {/* 히어로 뒤에 은은하게 깔리는 보라 글로우 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-32 h-[32rem] w-[32rem] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0) 70%)',
        }}
      />

      <div className="relative">
        <p className="text-sm font-medium tracking-[0.3em] text-accent uppercase">{profile.role}</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
          안녕하세요,
          <br />
          <span className="text-accent">{profile.name}</span>입니다.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline}</p>
        <div className="mt-10 flex flex-wrap gap-3">
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
    </section>
  )
}
