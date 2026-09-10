import { profile } from '@/data/profile'

/* index.css의 .kin-* 길이와 짝을 이룬다 */
const LINE_DURATION = 900 // 밀려 올라와 머물다 빠져나가기까지
const LINE_GAP = 40
const LINE_INTERVAL = LINE_DURATION + LINE_GAP
const CHAR_DURATION = 800 // 이름 글자 하나가 마스크를 통과하는 시간
const CHAR_STAGGER = 80
const TRACK_DURATION = 1200 // 자간이 조여드는 시간
const ROLE_DURATION = 900

const LINES = profile.introLines
const NAME_CHARS = Array.from(profile.name)

/* 시점은 문구/이름 길이에서 자동 계산된다 */
const LINES_END = (LINES.length - 1) * LINE_INTERVAL + LINE_DURATION
const NAME_AT = LINES_END + LINE_GAP
const NAME_END = NAME_AT + (NAME_CHARS.length - 1) * CHAR_STAGGER + CHAR_DURATION
const RULE_AT = NAME_END - 300
const ROLE_AT = RULE_AT + 120

/** 오버레이가 걷히기 시작할 시점 */
export const KINETIC_DURATION = ROLE_AT + ROLE_DURATION + 250

export function KineticIntro() {
  return (
    <div className="relative flex flex-col items-center px-6 text-center">
      {/* 문구 — 마스크 안에서 아래→위로 밀려 지나간다.
          흐름에서 빼내 이름과 같은 자리에 겹쳐 놓는다. 그래야 이름과 직함이
          문구 높이만큼 아래로 밀리지 않고 화면 정중앙에 온다.
          시간상 문구가 모두 지나간 뒤 이름이 올라오므로 서로 가리지 않는다. */}
      <div className="pointer-events-none absolute inset-0">
        {LINES.map((line, index) => (
          <p
            key={line}
            className="absolute inset-0 flex items-center justify-center text-2xl font-medium tracking-tight text-muted sm:text-4xl"
          >
            <span className="kin-mask">
              <span
                className="kin-line"
                style={{
                  animationDelay: `${index * LINE_INTERVAL}ms`,
                  animationDuration: `${LINE_DURATION}ms`,
                }}
              >
                {line}
              </span>
            </span>
          </p>
        ))}
      </div>

      {/* 이름 — 세 겹으로 나눠 각각 다른 모션을 얹는다.
          바깥: 탄성 스케일 / 가운데: 자간 응집 / 안쪽: 글자별 마스크 와이프 */}
      <h1
        className="kin-pop text-6xl font-bold sm:text-8xl"
        style={{ animationDelay: `${NAME_AT}ms` }}
      >
        <span
          className="kin-track inline-flex"
          style={{ animationDelay: `${NAME_AT}ms`, animationDuration: `${TRACK_DURATION}ms` }}
        >
          {NAME_CHARS.map((char, index) => (
            <span key={`${char}-${index}`} className="kin-mask">
              <span
                className="kin-char"
                style={{
                  animationDelay: `${NAME_AT + index * CHAR_STAGGER}ms`,
                  animationDuration: `${CHAR_DURATION}ms`,
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </span>
      </h1>

      <div
        className="intro-rule mt-8 h-px w-40 bg-accent"
        style={{ animationDelay: `${RULE_AT}ms` }}
      />

      {/* 직함은 반대로 자간이 벌어지며 자리를 잡는다 */}
      <p
        className="kin-role mt-6 text-sm text-accent uppercase sm:text-base"
        style={{ animationDelay: `${ROLE_AT}ms`, animationDuration: `${ROLE_DURATION}ms` }}
      >
        {profile.role}
      </p>
    </div>
  )
}
