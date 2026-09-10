import type { CSSProperties } from 'react'

const STAR_COUNT = 64

/**
 * 씨앗값이 같으면 언제나 같은 수열을 내는 난수기.
 * Math.random을 쓰면 렌더마다 별자리가 바뀌므로 고정된 하늘을 위해 직접 만든다.
 */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Star {
  top: number
  left: number
  size: number
  peak: number
  delay: number
  duration: number
  tint: string
}

/* 별에 살짝 색을 섞어야 평면적으로 보이지 않는다 */
const TINTS = [
  'rgba(255, 255, 255, 1)',
  'rgba(255, 255, 255, 1)',
  'rgba(226, 220, 255, 1)',
  'rgba(196, 181, 253, 1)',
  'rgba(199, 210, 254, 1)',
]

/* 모듈이 처음 불릴 때 한 번만 만들어 두고 계속 같은 하늘을 쓴다 */
const STARS: Star[] = (() => {
  const rand = mulberry32(20260910)
  return Array.from({ length: STAR_COUNT }, () => {
    // 큰 별은 드물게 — 제곱해서 작은 값 쪽으로 몰아준다
    const roll = rand()

    /* 원 안에 고르게 뿌린다.
       반지름을 그냥 난수로 잡으면 넓은 바깥쪽에 같은 수가 들어가 중심만 빽빽해지므로
       제곱근을 취해 면적에 비례하도록 편다. */
    const radius = Math.sqrt(rand()) * 50
    const angle = rand() * Math.PI * 2

    return {
      top: 50 + radius * Math.sin(angle),
      left: 50 + radius * Math.cos(angle),
      size: 0.8 + roll * roll * 1.5,
      peak: 0.35 + rand() * 0.65,
      delay: rand() * 4200,
      duration: 2400 + rand() * 3200,
      tint: TINTS[Math.floor(rand() * TINTS.length)],
    }
  })
})()

/**
 * 인트로 배경에 깔리는 별하늘. 각 별이 제 속도로 깜빡인다.
 * 보라 영역과 같은 크기(46rem)의 원 안에만 뿌려지고, 가장자리는 흐려져 배경에 묻는다.
 */
export function Starfield() {
  return (
    <div aria-hidden="true" className="starfield pointer-events-none absolute h-[46rem] w-[46rem]">
      {STARS.map((star, index) => (
        <span
          key={index}
          className="star"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.tint,
              animationDelay: `${star.delay}ms`,
              animationDuration: `${star.duration}ms`,
              '--star-peak': star.peak,
              '--star-size': `${star.size}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
