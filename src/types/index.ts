export interface SectionId {
  id: 'about' | 'strengths' | 'skills' | 'works' | 'experience' | 'contact'
  label: string
  href?: string
}

export type StrengthVisualName = 'quality' | 'structure' | 'ai'

export interface Strength {
  visual: StrengthVisualName
  title: string
  description: string
  evidence: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export type ProjectCategory = 'launch' | 'improve' | 'landing' | 'personal'

export type Platform = 'pc' | 'mo' | 'both'

export interface Project {
  id: string
  title: string
  period: string
  category: ProjectCategory

  showcase?: boolean
  platform?: Platform
  thumbnail?: string
  thumbnailMobile?: string
  summary: string
  description: string
  stack: string[]
  demoUrl?: string
  repoUrl?: string
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
  introLines: string[]
  tagline: string
  introduction: string[]
  strengths: Strength[]
  skills: SkillGroup[]
  company: Company
  projects: Project[]
  contacts: ContactLink[]
}