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
  tagline: '화면부터 배포까지, 서비스 하나를 끝까지 만듭니다.',
  resumeUrl: '/resume.pdf',
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
        '에어비앤비의 검색·필터링 경험을 참고해 만든 개인 프로젝트입니다. 검색 조건을 URL에 담아, 새로고침·뒤로가기·링크 공유 때도 같은 검색 결과가 그대로 나오게 했습니다.',
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
        '시세가 초당 수십 건씩 들어와도 289개 종목 표가 끊기지 않게 만드는 것이 과제였던 개인 프로젝트입니다. 수신한 값을 200ms 단위로 모아 반영하고 값이 바뀐 행만 다시 그리게 해, 렌더링 횟수를 80% 줄이고 가장 오래 걸리던 렌더를 151ms에서 7ms로 단축했습니다.',
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
        'AI시그널프로를 검색으로 알리기 위해 따로 만든 페이지로, 국내 전 종목의 리포트를 종목별 페이지로 보여 줍니다. SEO·AEO·GEO를 전담해 종목마다 제목·설명·구조화 데이터와 사이트맵을 갖춘 페이지를 서버에서 완성해 보내 종목명 검색 유입 경로를 만들고, AI 크롤러 허용과 llms.txt로 AI 답변·생성형 검색에도 인용되게 했습니다.',
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
        'AI가 분석한 종목과 매매시그널을 국내·미국 주식으로 제공하는 종목추천 서비스입니다. Highcharts·amCharts로 차트 UI를 구현했고, 국가 상태를 Pinia로 한곳에 모아 토글 하나로 국내·미국이 함께 바뀌게 해 미국 화면은 기존 마크업 재사용만으로 구축했습니다.',
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
        '재직 중인 (주)이머니의 공식 홈페이지를 전면 개편한 프로젝트입니다. 흩어져 있던 5개 페이지를 탭·스크롤 연동 구조의 3개로 합치고, 중복되던 헤더·GNB·푸터를 하나로 묶어 오픈 후 반복된 수정 공수를 3분의 1로 줄였습니다.',
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
        '키움증권 영웅문 앱 안에서 제공되는 서비스로, 조건검색식에 맞는 종목을 실시간으로 포착하고 검색식별 수익률을 보여 줍니다. Highcharts로 수익률 비교 차트와 포착일·포착가를 표시한 주가 차트를 만들어, 언제 얼마에 포착됐는지 차트에서 바로 읽히게 했습니다.',
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
        '검색엔진이 링크와 문서 구조를 제대로 읽지 못하던 기존 사내 서비스들을 손본 작업입니다. 크롤러가 따라가지 못하던 링크 99개를 정상 링크로 고치고, 시맨틱 태그 158건 적용과 title 207건·meta·OG 24건 재작성으로 검색 결과에 키워드가 앞에 보이게 했습니다.',
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
        'MK시그널 서비스를 소개하고 가입을 유도하는 홍보용 랜딩페이지입니다. 소스 하나가 화면 폭에 맞춰 바뀌는 반응형으로 만들어 PC·모바일 두 벌 없이 관리 파일을 절반으로 줄였고, 가입 버튼은 스크롤 위치와 무관하게 늘 보이게 했습니다.',
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
        '로보스탁 서비스를 신한투자증권·키움증권·하이투자증권 3개 제휴 채널로 넓히며 만든 소개·체험 페이지입니다. 공통 스타일과 헤더·메뉴를 컴포넌트 4종으로 분리해, 공통 사양이 바뀔 때 증권사별로 3번 하던 수정을 1번으로 줄였습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Ajax', 'JSP / JSTL'],
    },
    {
      id: 'preset-refactoring',
      title: '운영 페이지 preset 통합 & 리팩토링',
      period: '2024.01 – 2024.02',
      linkNote: '사내 운영 페이지',
      category: 'improve',
      summary: '공통 preset 한 줄로 최대 23개 리소스 선언을 대체',
      description:
        '운영 중인 사내 페이지들이 CSS·JS 라이브러리를 불러오는 방식을 정리한 리팩토링입니다. 페이지마다 따로 적던 선언을 공통 preset으로 묶어 페이지 간 스타일이 어긋나지 않게 했고, 이벤트 페이지의 CSS 3개를 하나로 합쳐 페이지당 요청을 3건 줄였습니다.',
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
        'AI가 추천한 종목과 급등주·섹터·리포트를 보여 주던 모바일 웹 서비스입니다. 글자와 여백이 화면 폭에 맞춰 함께 줄고 늘도록 1rem=10px 기준과 px→rem 환산 규칙을 세워, 화면당 퍼블리싱 시간을 30% 줄였습니다.',
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
