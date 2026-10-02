import { PROJECT_CATEGORIES, profile } from '@/data/profile'
import type { Platform, Project } from '@/types'

export const categoryLabel = (project: Project) =>
  PROJECT_CATEGORIES.find((category) => category.id === project.category)?.label ?? ''

/** 전시대 모서리에 붙는 대응 화면 표시 */
export const PLATFORM_LABEL: Record<Platform, string> = {
  pc: 'PC',
  mo: 'MO',
  both: 'PC · MO',
}

/** 화면을 보여줄 수 있는 결과물 — Works */
export const showcaseProjects = profile.projects.filter((project) => project.showcase)

/** 회사에서 해 온 일 전부 — Experience. 개인 프로젝트는 회사 이력이 아니므로 뺀다. */
export const companyProjects = profile.projects.filter((project) => project.category !== 'personal')
