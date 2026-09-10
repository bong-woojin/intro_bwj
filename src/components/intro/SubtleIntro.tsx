import { profile } from '@/data/profile'

/* index.css의 .subtle-* 길이와 짝을 이룬다 */
const LINE_DURATION = 850
const LINE_GAP = 60
const LINE_INTERVAL = LINE_DURATION + LINE_GAP
const NAME_DURATION = 900
const CHAR_STAGGER = 70

const LINES = profile.introLines
const NAME_CHARS = Array.from(profile.name)

const LINES_END = (LINES.length - 1) * LINE_INTERVAL + LINE_DURATION
const NAME_AT = LINES_END + LINE_GAP
const NAME_END = NAME_AT + (NAME_CHARS.length - 1) * CHAR_STAGGER + NAME_DURATION
const ROLE_AT = NAME_END - 220

/** 오버레이가 걷히기 시작할 시점 */
export const SUBTLE_DURATION = ROLE_AT + 900

export function SubtleIntro() {
  return (
    <div className="relative flex flex-col items-center px-6 text-center">
      {/* 한 줄씩 스쳐 지나가는 문구 — 흐름에서 빼내 이름과 같은 자리에 겹쳐 둔다 */}
      <div className="pointer-events-none absolute inset-0">
        {LINES.map((line, index) => (
          <p
            key={line}
            className="subtle-line absolute inset-0 flex items-center justify-center text-2xl font-medium tracking-tight text-muted sm:text-4xl"
            style={{
              animationDelay: `${index * LINE_INTERVAL}ms`,
              animationDuration: `${LINE_DURATION}ms`,
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* 이름 — 글자별로 시간차를 두고 올라온다 */}
      <h1 className="flex text-6xl font-bold tracking-tight sm:text-8xl">
        {NAME_CHARS.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="subtle-name-char"
            style={{
              animationDelay: `${NAME_AT + index * CHAR_STAGGER}ms`,
              animationDuration: `${NAME_DURATION}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      <div
        className="intro-rule mt-6 h-px w-40 bg-accent"
        style={{ animationDelay: `${ROLE_AT}ms` }}
      />

      <p
        className="intro-fade-in mt-6 text-sm tracking-[0.3em] text-accent uppercase sm:text-base"
        style={{ animationDelay: `${ROLE_AT + 120}ms` }}
      >
        {profile.role}
      </p>
    </div>
  )
}
