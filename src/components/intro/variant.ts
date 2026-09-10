export type IntroVariant = 'kinetic' | 'subtle'

/**
 * 첫 화면 인트로 연출.
 *
 *   'kinetic' — 마스크 와이프 + 자간 응집 + 오버슛 (키네틱 타이포그래피)
 *   'subtle'  — 페이드 + 블러 (잔잔한 이전 버전)
 *
 * 이 값만 바꾸면 즉시 전환된다. 두 구현 모두 유지되므로 원복에 삭제가 필요 없다.
 */
export const INTRO_VARIANT: IntroVariant = 'kinetic'
