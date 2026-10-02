/*
 * 스크린샷 원본은 src/assets/works/에 한 장씩만 둔다. 이름은 '{작업}-pc.png' / '{작업}-mo.png'.
 * 크기별 webp는 vite-imagetools가 dev·build 때 만든다. 손으로 변환할 일이 없다.
 *
 * 크기를 여러 장 만드는 이유 — 기기 속 화면은 폭 45~250px밖에 안 돼서
 * 큰 한 장을 브라우저가 3~5배 줄이면 글자와 경계가 계단처럼 깨진다.
 * 표시 크기에 가장 가까운 것을 브라우저가 srcset에서 고르게 한다.
 */

export interface Screenshot {
  src: string
  srcSet: string
}

/* glob의 경로와 쿼리는 문자열 그대로여야 Vite가 빌드 때 읽을 수 있다 */
const pcSrcSet = import.meta.glob<string>('/src/assets/works/*-pc.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
  query: '?w=320;480;720;960&format=webp&quality=90&as=srcset',
})
const pcSrc = import.meta.glob<string>('/src/assets/works/*-pc.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
  query: '?w=960&format=webp&quality=90',
})
const moSrcSet = import.meta.glob<string>('/src/assets/works/*-mo.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
  query: '?w=120;200;320;400&format=webp&quality=90&as=srcset',
})
const moSrc = import.meta.glob<string>('/src/assets/works/*-mo.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
  query: '?w=400&format=webp&quality=90',
})

/** '/src/assets/works/airbnb-pc.png' → 'airbnb-pc' */
const nameOf = (path: string) => path.slice(path.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '')

const screenshots = new Map<string, Screenshot>()
for (const [srcSets, srcs] of [
  [pcSrcSet, pcSrc],
  [moSrcSet, moSrc],
] as const) {
  for (const path of Object.keys(srcs)) {
    screenshots.set(nameOf(path), { src: srcs[path], srcSet: srcSets[path] })
  }
}

/**
 * profile.ts에 적은 이름으로 스크린샷을 찾는다.
 * 이름이 틀리면 화면이 흰 칸으로 조용히 남으므로, 개발 중에는 바로 알 수 있게 오류를 낸다.
 */
export function screenshotOf(name?: string): Screenshot | undefined {
  if (!name) return undefined
  const found = screenshots.get(name)
  if (!found && import.meta.env.DEV) {
    throw new Error(`src/assets/works/에 '${name}' 스크린샷이 없습니다. 파일 이름을 확인하세요.`)
  }
  return found
}
