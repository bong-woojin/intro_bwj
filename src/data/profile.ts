import type { Profile, SectionId } from '@/types'

export const SECTIONS: SectionId[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

/**
 * 이 파일의 내용만 바꾸면 페이지 전체가 갱신됩니다.
 * 아래 값은 자리표시자이므로 실제 정보로 교체해 주세요.
 */
export const profile: Profile = {
  name: '홍길동',
  role: 'Frontend Developer',
  introLines: ['안녕하세요', '화면을 만드는 사람', '프론트엔드 개발자'],
  tagline: '사용자가 머무르고 싶은 화면을 만듭니다.',
  introduction: [
    'React와 TypeScript로 웹 서비스를 만드는 프론트엔드 개발자입니다.',
    '작은 인터랙션 하나에도 이유를 두는 것을 좋아하고, 재사용 가능한 컴포넌트 설계와 접근성에 관심이 많습니다.',
    '함께 일하는 사람들이 편하게 읽을 수 있는 코드를 쓰려고 노력합니다.',
  ],
  skills: [
    { category: 'Language', items: ['TypeScript', 'JavaScript (ES2023+)', 'HTML', 'CSS'] },
    { category: 'Framework', items: ['React', 'Next.js', 'Vite'] },
    { category: 'Styling', items: ['Tailwind CSS', 'CSS Modules', 'styled-components'] },
    { category: 'State & Data', items: ['TanStack Query', 'Zustand', 'Redux Toolkit'] },
    { category: 'Tooling', items: ['Git', 'Vitest', 'Storybook', 'ESLint / Prettier'] },
  ],
  projects: [
    {
      id: 'portfolio',
      title: '포트폴리오 사이트',
      period: '2026.09',
      summary: 'React + TypeScript + Tailwind로 만든 개인 소개 페이지',
      description:
        '데이터와 화면을 분리해 profile.ts 한 곳만 수정하면 전체 내용이 갱신되도록 구성했습니다. 스크롤 위치에 따라 현재 섹션을 표시하는 내비게이션을 직접 구현했습니다.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      demoUrl: undefined,
      repoUrl: undefined,
    },
    {
      id: 'sample-project',
      title: '프로젝트 제목',
      period: '2026.01 - 2026.06',
      summary: '한 줄 요약을 적어 주세요.',
      description:
        '어떤 문제를 어떻게 풀었는지, 본인이 맡은 역할과 성과를 숫자와 함께 적으면 좋습니다.',
      stack: ['React', 'TypeScript'],
      demoUrl: undefined,
      repoUrl: undefined,
    },
  ],
  contacts: [
    { label: 'Email', value: 'bwj1993@emoney.co.kr', href: 'mailto:bwj1993@emoney.co.kr' },
    { label: 'GitHub', value: 'github.com/username', href: 'https://github.com/username' },
    { label: 'Blog', value: 'blog.example.com', href: 'https://blog.example.com' },
  ],
}
