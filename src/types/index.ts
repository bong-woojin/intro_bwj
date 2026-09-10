export interface SectionId {
  id: 'about' | 'skills' | 'projects' | 'contact'
  label: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  period: string
  summary: string
  description: string
  stack: string[]
  /** 배포된 사이트 주소 (없으면 생략) */
  demoUrl?: string
  repoUrl?: string
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
  skills: SkillGroup[]
  projects: Project[]
  contacts: ContactLink[]
}
