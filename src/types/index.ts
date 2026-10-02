export interface SectionId {
  id: 'about' | 'strengths' | 'skills' | 'works' | 'experience' | 'contact'
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
 * 프로젝트 성격. Works 카드와 Experience 목록에 라벨로 붙는다.
 * 'personal'은 회사 이력이 아니므로 Experience에서 빠진다.
 */
export type ProjectCategory = 'launch' | 'improve' | 'landing' | 'personal'

/**
 * 작업이 대응하는 화면. Works 전시대의 기기 틀과 태그가 이 값 하나로 정해진다.
 * both는 반응형 — 모니터 앞에 폰을 겹쳐 세운다.
 */
export type Platform = 'pc' | 'mo' | 'both'

export interface Project {
  id: string
  title: string
  period: string
  category: ProjectCategory
  /**
   * Works 전시대에 올린다. 화면을 보여줄 수 있는 결과물만 켠다.
   * 화면이 없는 작업(리팩토링, 사내 운영 등)은 Experience에만 남긴다.
   */
  showcase?: boolean
  /** 대응하는 화면. showcase 항목에는 반드시 적는다. 없으면 pc로 본다 */
  platform?: Platform
  /**
   * 스크린샷 이름. src/assets/works/의 파일 이름에서 확장자를 뺀 것(예: 'coinflow-pc').
   * 없으면 흰 화면으로 자리만 잡는다. pc·both는 모니터에, mo는 폰에 들어간다.
   * 이름 끝이 -pc면 모니터용, -mo면 폰용 크기로 만들어진다.
   */
  thumbnail?: string
  /** both일 때 앞에 겹친 폰에 들어가는 모바일 스크린샷 이름 (예: 'airbnb-mo') */
  thumbnailMobile?: string
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

export interface Company {
  name: string
  period: string
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
  company: Company
  projects: Project[]
  contacts: ContactLink[]
}
