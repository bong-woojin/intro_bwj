export interface SectionId {
  id: 'about' | 'strengths' | 'skills' | 'projects' | 'contact'
  label: string
  /**
   * 눌렀을 때 이동할 주소. 기본은 '#' + id.
   * 관찰 대상과 이동 지점이 다를 때만 지정한다.
   */
  href?: string
}

/** 강점 카드에 들어가는 움직이는 그림 */
export type StrengthVisualName = 'quality' | 'structure' | 'ai'

export interface Strength {
  visual: StrengthVisualName
  title: string
  description: string
  /** 주장을 받치는 근거. 숫자가 있으면 함께 적는다. */
  evidence: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

/**
 * 프로젝트 성격. Projects 섹션의 탭이 이 값으로 갈린다.
 * 기술 스택으로 나누지 않는 이유는 한쪽으로 쏠려 필터의 의미가 없기 때문이다.
 */
export type ProjectCategory = 'launch' | 'improve' | 'landing' | 'personal'

export interface Project {
  id: string
  title: string
  period: string
  category: ProjectCategory
  /** 대표작 표시. 탭과 무관하게 눈에 띄게 한다. */
  featured?: boolean
  summary: string
  description: string
  stack: string[]
  /** 배포된 사이트 주소 (없으면 생략) */
  demoUrl?: string
  repoUrl?: string
  /**
   * 링크를 걸 수 없는 이유. 예: '증권사 앱 내장', '서비스 종료', '사내 운영 페이지'.
   * 링크가 없는 자리를 비워 두면 왜 없는지 알 수 없으므로 이 문구로 대신한다.
   */
  linkNote?: string
}

export interface ContactLink {
  label: string
  value: string
  href: string
}

export interface Profile {
  name: string
  role: string
  /** 인트로 애니메이션에서 한 줄씩 스쳐 지나가는 문구 */
  introLines: string[]
  tagline: string
  introduction: string[]
  strengths: Strength[]
  skills: SkillGroup[]
  projects: Project[]
  contacts: ContactLink[]
}
