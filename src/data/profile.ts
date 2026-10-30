import type { Profile, ProjectCategory, SectionId } from '@/types'

export const SECTIONS: SectionId[] = [
  { id: 'about', label: 'About', href: '#top' },
  { id: 'strengths', label: 'Strengths' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'launch', label: '서비스 런칭' },
  { id: 'improve', label: '구조 개선' },
  { id: 'landing', label: '랜딩·홍보' },
  { id: 'personal', label: '개인 프로젝트' },
]

export const profile: Profile = {
  name: '봉우진',
  role: 'Frontend Developer',
  introLines: [
    '안녕하세요',
    '퍼블리셔에서 프론트엔드까지',
    '그리고 AI까지',
    '발전하는 프론트엔드',
  ],
  tagline: '화면부터 배포까지, 서비스 하나를 끝까지 만듭니다.',
  introduction: [
    '웹 퍼블리셔로 시작해 프론트엔드 개발까지 범위를 넓혀왔습니다. 주식·투자 도메인에서 사내 서비스의 화면을 혼자 맡아, 새 서비스를 열고 이어서 운영해 왔습니다.',
    'Vue와 React 양쪽에서 화면 개발과 공통 컴포넌트 설계부터 배포까지 담당했습니다. 가장 신경 쓰는 건 나중에 고칠 곳을 줄이는 일입니다. 같은 UI가 두 번 나오면 공통으로 묶고, 조건이 늘어날 걸 예상해 구조를 열어둡니다.',
    '마크업 구조와 접근성, 검색 노출, 로딩 속도까지 눈에 보이지 않는 부분도 화면의 품질이라고 봅니다. AI도 개발 과정에 적극적으로 쓰며, 반복되는 작업은 도구로 만들어 덜어냅니다.',
  ],

  strengths: [
    {
      visual: 'quality',
      title: '화면 품질을 수치로 증명합니다',
      description:
        '눈에 보이지 않는 부분까지 챙겼습니다. 시맨틱 마크업과 접근성, 검색 대응을 함께 맡아왔습니다.',
      evidence: [
        '웹표준·웹접근성 준수율 100%',
        '3개 서비스 312개 파일 SEO 전수 개선',
        'Lighthouse 90점대 · Core Web Vitals 전 항목 통과',
        '320~768px 전 구간 동일 렌더링 확보',
      ],
    },
    {
      visual: 'structure',
      title: '반복을 구조로 바꿉니다',
      description:
        '같은 작업이 두 번 나오면 공통으로 묶었습니다. 고칠 곳을 줄이는 것이 곧 실수를 줄이는 일이라고 봅니다.',
      evidence: [
        'Vue 3·Nuxt 3 기반 전 화면 개발 및 공통 컴포넌트 아키텍처 설계',
        'React·Next.js SSR 구조 설계부터 배포까지 단독 수행',
        '신규 기능 추가 시 화면 제작부터 API 연동까지 단독 처리',
        '반복 UI를 단일 컴포넌트로 통합해 유지보수 지점 축소',
      ],
    },
    {
      visual: 'ai',
      title: 'AI를 도구로 만들어 씁니다',
      description: '쓰는 데서 멈추지 않고 반복 작업을 대신할 도구로 만들었습니다.',
      evidence: [
        '사내 AI 활용 환경 도입 제안',
        '컴포넌트 제너레이터 직접 개발',
        'AI 크롤러 허용 정책 및 llms.txt 설계',
        '신규 스택 도입 기간 단축',
      ],
    },
  ],
  skills: [
    { category: 'Language', items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
    { category: 'Framework', items: ['Vue 3', 'Nuxt 3', 'React 19', 'Next.js 16'] },
    { category: 'Styling', items: ['SCSS', 'CSS Modules', '반응형 레이아웃', 'rem 기반 설계'] },
    { category: 'State & Data', items: ['Pinia', 'SWR', 'Ajax'] },
    {
      category: 'Chart & UI',
      items: ['Highcharts', 'amCharts 5', 'ApexCharts', 'Swiper', 'SortableJS'],
    },
    { category: 'Template', items: ['Thymeleaf', 'JSP / JSTL', 'jQuery', 'jQuery UI'] },
    { category: 'SEO & 표준', items: ['시맨틱 마크업', '웹접근성', 'JSON-LD', 'GA4 / GTM'] },
    { category: 'Tooling', items: ['Git', 'PM2', 'Nginx', 'W3C Validator'] },
  ],

  company: {
    name: '(주)이머니',
    period: '2023.07 – 현재',
  },
  projects: [
    {
      id: 'airbnb-clone',
      title: '숙소 예약 서비스 — 검색·필터링 구현',
      period: '2026.06 – 2026.07, 2026.09',
      category: 'personal',
      showcase: true,
      platform: 'both',
      thumbnail: 'airbnb-pc',
      thumbnailMobile: 'airbnb-mo',
      summary: '숙소 검색부터 예약 요청까지의 흐름을 Next.js App Router로 구현',
      description:
        '검색 조건을 전역 상태 대신 URL에 두고 서버 컴포넌트가 searchParams로 필터링하게 해, 새로고침·뒤로가기·링크 공유가 그대로 재현되도록 했습니다. 실제로는 별개의 DOM인 확장·압축 검색바는 FLIP으로 위치와 크기를 보간해 하나처럼 변형되게 했습니다.',
      stack: [
        'Next.js 16',
        'React 19',
        'TypeScript',
        'Redux Toolkit',
        'CSS Modules',
        'Vitest',
      ],
      demoUrl: 'https://airbnb-bwj.vercel.app',
      repoUrl: 'https://github.com/bong-woojin/airbnb-clone',
    },
    {
      id: 'coinflow',
      title: 'COINFLOW — 암호화폐 실시간 시세',
      period: '2026.09 – 2026.10',
      category: 'personal',
      showcase: true,
      platform: 'pc',
      thumbnail: 'coinflow-pc',
      summary: '업비트 원화마켓 전 종목의 실시간 시세를 다루는 데스크톱 대시보드',
      description:
        '초당 수십 건씩 들어오는 시세에도 289개 종목 표가 끊기지 않도록, 수신한 값을 200ms 단위로 모아 반영하고 값이 바뀐 행만 다시 그리게 했습니다. React DevTools Profiler로 전후를 측정해 렌더링 횟수를 80% 줄이고, 가장 오래 걸리던 렌더를 151ms에서 7ms로 단축했습니다.',
      stack: [
        'React 19',
        'TypeScript',
        'Vite 8',
        'Zustand',
        'CSS Modules',
        'lightweight-charts',
        'Vercel',
      ],
      demoUrl: 'https://coinflow-bwj.vercel.app',
      repoUrl: 'https://github.com/bong-woojin/coinflow-bwj',
    },
    {
      id: 'ai-signal-pro-seo',
      title: 'AI시그널프로 SEO 전용 페이지',
      period: '2026.03 – 2026.04',
      category: 'landing',
      showcase: true,
      platform: 'both',
      thumbnail: 'aisignal-lp-pc',
      thumbnailMobile: 'aisignal-lp-mo',
      summary: '검색 유입을 위한 랜딩·리포트 페이지를 환경 구성부터 배포까지 단독 구축',
      description:
        '검색 유입이 목적인 페이지로 SEO·AEO·GEO를 전담했습니다. 서버에서 화면을 완성해 보내 검색엔진이 바로 읽게 하고, 국내 전 종목 리포트를 템플릿 하나로 자동 생성해 종목마다 제목·설명과 구조화 데이터, 사이트맵을 갖춰 종목명 검색 유입 경로를 만들었습니다. AI 답변과 생성형 검색에도 인용되도록 AI 크롤러를 허용하고 llms.txt를 설계했습니다.',
      stack: [
        'React 19',
        'Next.js 16',
        'TypeScript',
        'CSS Modules',
        'SWR',
        'Highcharts',
        'PM2',
        'Nginx',
      ],
      demoUrl: 'https://lp.aisignalpro.co.kr/',
    },
    {
      id: 'ai-signal',
      title: 'AI시그널프로 — 주식 종목추천 서비스',
      period: '2025.01 – 현재',
      category: 'launch',
      showcase: true,
      platform: 'mo',
      thumbnail: 'aisignal-mo',
      summary: '모바일 웹·앱 웹뷰 전 화면의 퍼블리싱과 UI 개발 단독 담당',
      description:
        '반복되는 UI를 다이얼로그·바텀시트 등 공통 컴포넌트로 분리해 이후 화면은 조합만으로 만들 수 있게 했고, Highcharts·amCharts로 차트 UI를 구현했습니다. 미국주식을 추가할 때는 국가 상태를 Pinia로 중앙화해 토글 하나로 국내·미국이 함께 바뀌게 했고, 미국 화면은 기존 마크업 재사용만으로 구축했습니다.',
      stack: [
        'Vue 3',
        'Nuxt 3',
        'TypeScript',
        'SCSS',
        'Pinia',
        'Highcharts',
        'amCharts 5',
        'SortableJS',
      ],
      demoUrl: 'https://www.aisignalpro.co.kr/'
    },
    {
      id: 'em-homepage',
      title: 'eM 회사 홈페이지 전면 개편',
      period: '2025.06 – 2025.07',
      category: 'landing',
      showcase: true,
      platform: 'both',
      thumbnail: 'emoney-pc',
      thumbnailMobile: 'emoney-mo',
      summary: '메인·회사소개·비즈니스와 공통 영역 전량을 단독 담당해 일정 내 오픈',
      description:
        '흩어져 있던 5개 페이지를 탭·스크롤 연동 구조의 3개로 통합해 페이지 이동 없이 전체를 탐색하게 했습니다. 3개 파일에 중복되던 헤더·GNB·푸터를 Thymeleaf fragment 하나로 묶어, 오픈 후 반복된 로고·문구 수정 공수를 3분의 1로 줄였습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Swiper', 'Thymeleaf', 'Kakao Map', 'GTM'],
      demoUrl: 'https://emoney.co.kr/'
    },
    {
      id: 'condition-signal',
      title: '영웅문 내 조건검색시그널 서비스 런칭',
      period: '2024.10 – 현재',
      linkNote: '증권사 앱 내장',
      category: 'launch',
      showcase: true,
      platform: 'mo',
      thumbnail: 'cssignal-mo',
      summary: '키움증권 앱 웹뷰로 제공되는 조건검색시그널 서비스의 실시간 포착, 수익률 TOP·랭킹, 종목 상세, 체험하기 화면을 PC와 모바일용으로 퍼블리싱하고 차트 구현',
      description:
        'Highcharts로 검색식별 수익률 비교 차트와 포착일·포착가를 표시한 주가 차트를 구현하고 툴팁·범례를 커스텀했습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Swiper', 'Highcharts', 'Thymeleaf'],
    },
    {
      id: 'seo-optimization',
      title: 'SEO 최적화 작업',
      period: '2024.11 – 2024.12',
      linkNote: '사내 운영 페이지',
      category: 'improve',
      summary: '3개 서비스 312개 파일을 전수 개선해 크롤링·색인 대응 체계 구축',
      description:
        'onclick만 있어 크롤러가 따라가지 못하던 링크 99개에 href와 aria-label을 부여했습니다. div 위주 구조에 시맨틱 태그 158건을 적용하고, title 207건과 meta·OG 24건을 키워드가 앞에 오도록 다시 썼습니다.',
      stack: ['HTML5', '시맨틱 마크업', 'XML sitemap', 'JSP', 'Thymeleaf', 'jQuery'],
    },
    {
      id: 'mk-signal-landing',
      title: 'MK시그널 홍보용 반응형 랜딩페이지',
      period: '2024.08 – 2024.09',
      category: 'landing',
      showcase: true,
      platform: 'both',
      thumbnail: 'mksignal-pc',
      thumbnailMobile: 'mksignal-mo',
      summary: '시안 반영부터 배포·GA 등록까지 단독 제작',
      description:
        '미디어쿼리 기반 반응형으로 PC·모바일 2벌 없이 단일 소스로 대응해 유지보수 대상 파일을 절반으로 줄였습니다. 가입 CTA는 스크롤 위치와 무관하게 상시 노출해 전환까지의 동선을 단축했습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Google Analytics (GA4)'],
      demoUrl: 'https://mksignal.com/mk'
    },
    {
      id: 'robostock-partners',
      title: '영웅문 내 로보스탁 증권사 3사 소개·체험 페이지',
      period: '2024.02 – 2024.03',
      linkNote: '증권사 앱 내장',
      category: 'launch',
      summary: '증권사 3사 × 화면 14종, 총 42개 화면을 단독 퍼블리싱',
      description:
        '공통 스타일과 헤더·상품메뉴·전략메뉴를 컴포넌트 4종으로 분리해, 공통 사양이 바뀔 때 증권사별로 3번 하던 수정을 1번으로 줄였습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Ajax', 'JSP / JSTL'],
    },
    {
      id: 'preset-refactoring',
      title: '운영 페이지 preset 통합 & 리팩토링',
      period: '2024.01 – 2024.02',
      linkNote: '사내 운영 페이지',
      category: 'improve',
      summary: 'include 한 줄로 최대 23개 리소스 선언을 대체',
      description:
        '페이지마다 중복 선언되던 CSS·JS 라이브러리를 공통 preset으로 묶어 페이지 간 스타일 불일치를 구조적으로 없앴습니다. 이벤트 페이지의 CSS 3개는 common.css로 통합해 페이지당 요청을 3건 줄였습니다.',
      stack: ['HTML5', 'CSS3', 'jQuery', 'JSP (include)', 'Thymeleaf'],
    },
    {
      id: 'aigo-stock',
      title: 'AIGO스탁 런칭 — AI 종목추천 모바일 웹',
      period: '2023.07 – 2024.04',
      linkNote: '서비스 종료',
      category: 'launch',
      showcase: true,
      platform: 'mo',
      thumbnail: 'aigostock-mo',
      summary: '22개 화면의 프론트엔드 마크업을 1인 단독 담당해 정상 오픈',
      description:
        '메인·종목 상세분석·급등주·HOT섹터·리포트·포트폴리오·정기결제 해지 등 본문 16개와 공통 6개, 총 22개 화면을 단독으로 맡아 일정 내 완료했습니다. 1rem을 10px로 두는 반응형 체계와 px→rem 환산 규칙을 세워 320~768px 전 구간에서 동일한 비율로 렌더링되도록 하고, 화면당 퍼블리싱 소요 시간을 30% 줄였습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Swiper', 'ApexCharts', 'Ajax', 'JSP'],
    },
  ],
  contacts: [
    { label: 'Email', value: 'bwj1993@naver.com', href: 'mailto:bwj1993@naver.com' },
    {
      label: 'GitHub',
      value: 'github.com/bong-woojin',
      href: 'https://github.com/bong-woojin',
    },
  ],
}