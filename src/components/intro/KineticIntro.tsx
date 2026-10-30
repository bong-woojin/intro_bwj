import { profile } from '@/data/profile'

const WORD_DURATION = 800 // 어절 하나가 올라와 머물다 빠져나가기까지
const WORD_STAGGER = 70 // 어절 사이 지연 — 문구에 리듬을 만든다
const LINE_GAP = 40
const CHAR_DURATION = 800 // 이름 글자 하나가 마스크를 통과하는 시간
const CHAR_STAGGER = 80
const TRACK_DURATION = 1200 // 자간이 조여드는 시간
const ROLE_DURATION = 900

const LINES = profile.introLines.map((line) => line.split(/\s+/).filter(Boolean))
const NAME_CHARS = Array.from(profile.name)
const MAX_WORDS = Math.max(...LINES.map((words) => words.length))
const LINE_SPAN = (MAX_WORDS - 1) * WORD_STAGGER + WORD_DURATION
const LINE_INTERVAL = LINE_SPAN + LINE_GAP
const LINES_END = (LINES.length - 1) * LINE_INTERVAL + LINE_SPAN
const NAME_AT = LINES_END + LINE_GAP
const NAME_END = NAME_AT + (NAME_CHARS.length - 1) * CHAR_STAGGER + CHAR_DURATION
const RULE_AT = NAME_END - 300
const ROLE_AT = RULE_AT + 120

export const KINETIC_DURATION = ROLE_AT + ROLE_DURATION + 250

export function KineticIntro() {
  return (
    <div className="relative flex w-full max-w-4xl flex-col items-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0">
        {LINES.map((words, lineIndex) => {
          // 마지막 문구는 색을 달리해 강조한다
          const isLast = lineIndex === LINES.length - 1
          return (
            <p
              key={words.join(' ')}
              className={`absolute inset-0 flex items-center justify-center gap-x-[0.3em] text-xl font-medium tracking-tight whitespace-nowrap sm:text-3xl md:text-4xl ${
                isLast ? 'text-accent' : 'text-fg/85'
              }`}
            >
              {words.map((word, wordIndex) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className="kin-word"
                  style={{
                    animationDelay: `${lineIndex * LINE_INTERVAL + wordIndex * WORD_STAGGER}ms`,
                    animationDuration: `${WORD_DURATION}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </p>
          )
        })}
      </div>
      <h1
        className="kin-pop text-6xl font-bold sm:text-8xl"
        style={{ animationDelay: `${NAME_AT}ms` }}
      >
        <span
          className="kin-track inline-flex"
          style={{ animationDelay: `${NAME_AT}ms`, animationDuration: `${TRACK_DURATION}ms` }}
        >
          {NAME_CHARS.map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="kin-char"
              style={{
                animationDelay: `${NAME_AT + index * CHAR_STAGGER}ms`,
                animationDuration: `${CHAR_DURATION}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </h1>

      <div
        className="intro-rule mt-8 h-px w-40 bg-accent"
        style={{ animationDelay: `${RULE_AT}ms` }}
      />
      <p
        className="kin-role mt-6 text-sm text-accent uppercase sm:text-base"
        style={{ animationDelay: `${ROLE_AT}ms`, animationDuration: `${ROLE_DURATION}ms` }}
      >
        {profile.role}
      </p>
    </div>
  )
}