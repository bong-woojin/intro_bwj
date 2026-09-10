import type { Profile, ProjectCategory, SectionId } from '@/types'

export const SECTIONS: SectionId[] = [
  { id: 'about', label: 'About' },
  { id: 'strengths', label: 'Strengths' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

/** Projects 탭에 쓰이는 이름. 항목이 하나도 없는 분류는 탭에서 자동으로 빠집니다. */
export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'launch', label: '서비스 런칭' },
  { id: 'improve', label: '구조 개선' },
  { id: 'landing', label: '랜딩·홍보' },
  { id: 'personal', label: '개인 프로젝트' },
]

/**
 * 이 파일의 내용만 바꾸면 페이지 전체가 갱신됩니다.
 * 프로젝트는 최신순으로 정렬합니다.
 */
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
  /* 헤더 로고와 첫 화면 그림의 세 축(Publisher · Frontend · AI)과 순서를 맞춘다 */
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
  projects: [
    {
      id: 'ai-signal-pro-seo',
      title: 'AI시그널프로 SEO 전용 페이지',
      period: '2026.03 – 2026.04',
      category: 'landing',
      featured: true,
      summary: '검색 유입을 위한 랜딩·리포트 페이지를 환경 구성부터 배포까지 단독 구축',
      description:
        'SSR과 SWR fallback을 결합해 크롤러에는 완성된 HTML을, 사용자에게는 재요청 없는 초기 렌더를 제공했습니다. 종목별 동적 메타태그와 JSON-LD 5종, 동적 sitemap, AI 크롤러 허용 및 llms.txt까지 SEO·AEO·GEO를 전담했고, 동적 라우팅으로 국내 전 종목 리포트를 템플릿 하나로 자동 생성해 종목명 검색 유입 채널을 확보했습니다. Vue·Nuxt 경험을 바탕으로 React·Next.js를 신규 도입한 프로젝트입니다.',
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
    },
    {
      id: 'ai-signal',
      title: 'AI시그널 — 주식 종목추천 서비스',
      period: '2025.01 – 현재',
      category: 'launch',
      featured: true,
      summary: '모바일 웹·앱 웹뷰 전 화면의 퍼블리싱과 UI 개발 단독 담당',
      description:
        '메인·종목분석·매매시그널·관심종목·결제·멤버십·마이페이지 등 전 영역을 구현하고 신규 기능은 화면 제작부터 API 연동까지 처리했습니다. 반복되는 UI를 공통 컴포넌트(다이얼로그·바텀시트·툴팁·상단바·하단 내비)로 분리해 이후 화면은 조합만으로 제작할 수 있게 정리했고, 차트 UI 12종을 구현했습니다. 미국주식을 추가하면서 국가 상태를 Pinia로 중앙화해 토글 하나로 국내·미국이 함께 대응되는 구조를 만들었고, 덕분에 미국 매매시그널 화면은 기존 마크업 재사용만으로 구축했습니다.',
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
    },
    {
      id: 'em-homepage',
      title: 'eM 회사 홈페이지 전면 개편',
      period: '2025.06 – 2025.07',
      category: 'landing',
      summary: '메인·회사소개·비즈니스와 공통 영역 전량을 단독 담당해 일정 내 오픈',
      description:
        '흩어져 있던 5개 페이지를 탭·스크롤 연동 구조의 3개로 통합해 페이지 이동 없이 전체 콘텐츠를 탐색하도록 개선했습니다. 3개 파일에 중복되던 헤더·GNB·푸터를 Thymeleaf fragment로 컴포넌트화해 1개 파일 관리 체계로 전환, 오픈 후 반복된 로고·문구 변경 대응 공수를 3분의 1로 줄였습니다. 4단 브레이크포인트(1200~605px)로 레이아웃을 분기하고 히어로 배경 영상을 PC·모바일용으로 나눠 모바일 불필요 로딩을 제거했습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Swiper', 'Thymeleaf', 'Kakao Map', 'GTM'],
    },
    {
      id: 'condition-signal',
      title: '영웅문 내 조건검색시그널 서비스 런칭',
      period: '2024.10 – 현재',
      linkNote: '증권사 앱 내장',
      category: 'launch',
      featured: true,
      summary: '증권사 앱 웹뷰 내장 서비스의 마크업 전량을 단독 담당',
      description:
        '본문 6개와 공통·에러 3개를 합쳐 9개 화면, 탭·팝업·바텀시트를 포함한 세부 뷰 15개를 일정 내 완료해 정상 오픈에 기여했습니다. 리셋 CSS와 Pretendard 가변폰트 자체 호스팅, 등락 컬러 규칙을 단일 정의로 통합해 퍼블리싱 소요를 30% 줄이고 320~768px 전 구간에서 동일한 렌더링을 확보했습니다.',
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
        'onclick만 있어 크롤러가 인식하지 못하던 링크 99개에 href와 aria-label을 부여해 탐색 가능성과 접근성을 동시에 확보했습니다. div 위주 구조에 main·section 등 시맨틱 태그를 158건 적용해 문서 구조를 명확히 하고, 페이지별 title 207건과 meta·OG 태그 24건을 키워드 전치 구조로 재작성해 검색 결과 노출 문구를 표준화했습니다.',
      stack: ['HTML5', '시맨틱 마크업', 'XML sitemap', 'JSP', 'Thymeleaf', 'jQuery'],
    },
    {
      id: 'vod-service',
      title: '종목분석 VOD 서비스 런칭',
      period: '2024.09 – 2024.11',
      linkNote: '서비스 종료',
      category: 'launch',
      summary: '자동완성 검색창을 신설하고 진입점 6곳을 일괄 구축',
      description:
        'PC 헤더에 종목명·코드 자동완성 검색창을 만들어 신규 VOD 서비스의 상시 진입 경로를 확보했습니다. jQuery UI autocomplete를 도입하며 공통 preset에 라이브러리를 편입했고, PC·모바일 헤더·GNB·메인·전문가홈 탭·플로팅 버튼까지 진입점 6곳을 일괄 구축해 전 채널 동선을 일원화했습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery UI', 'SVG', 'Thymeleaf', 'JSP'],
    },
    {
      id: 'mk-signal-landing',
      title: 'MK시그널 홍보용 반응형 랜딩페이지',
      period: '2024.08 – 2024.09',
      category: 'landing',
      summary: '시안 반영부터 배포·GA 등록까지 단독 제작',
      description:
        '미디어쿼리 기반 반응형으로 구현해 PC·모바일 2벌 운영 없이 단일 소스로 전 기기에 대응했고, 유지보수 대상 파일을 절반으로 줄였습니다. 서비스 소개·핵심 기능·이용 안내를 섹션 단위로 구성하고 스크롤 위치와 무관하게 가입 CTA를 상시 노출해 유입에서 전환까지의 동선을 단축했습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Google Analytics (GA4)'],
    },
    {
      id: 'robostock-partners',
      title: '영웅문 내 로보스탁 증권사 3사 소개·체험 페이지',
      period: '2024.02 – 2024.03',
      linkNote: '증권사 앱 내장',
      category: 'launch',
      summary: '증권사 3사 × 화면 14종, 총 42개 화면을 단독 퍼블리싱',
      description:
        '단일 서비스를 신한투자증권·키움증권·하이투자증권 3개 제휴 채널로 확장했습니다. 공통 스타일과 헤더·상품메뉴·전략메뉴를 컴포넌트 4종으로 분리해, 공통 사양이 바뀔 때 증권사별로 3번 하던 수정을 1번으로 줄였습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Ajax', 'JSP / JSTL'],
    },
    {
      id: 'preset-refactoring',
      title: '운영 페이지 preset 통합 & 리팩토링',
      period: '2024.01 – 2024.02',
      linkNote: '사내 운영 페이지',
      category: 'improve',
      summary: '중복 선언된 리소스를 공통 preset으로 단일화',
      description:
        '페이지마다 중복 선언되던 CSS·JS 라이브러리를 공통 preset으로 묶어 include 한 줄로 최대 23개 리소스 선언을 대체하고, 페이지 간 스타일 불일치를 구조적으로 제거했습니다. 이벤트 페이지에 흩어진 CSS 3개(279줄)를 common.css로 통합해 페이지당 요청을 3건 줄였고, preset 미적용 레거시 페이지 4개를 찾아 공통 GNB 서브메뉴 미노출 오류를 해결했습니다. SDK 충돌 페이지는 선별 분리해 통합 기준을 세웠습니다.',
      stack: ['HTML5', 'CSS3', 'jQuery', 'JSP (include)', 'Thymeleaf'],
    },
    {
      id: 'x1-trial',
      title: 'X1 3일 무료체험 신청 페이지 신규 구축',
      period: '2023.08 – 2023.09',
      category: 'launch',
      summary: 'PC·모바일 신청 페이지를 단독 퍼블리싱해 양 디바이스 동시 오픈',
      description:
        'Swiper 기반 전문가 슬라이더와 하단 슬라이드업 모달을 구현했습니다. 로그인 여부에 따라 입력 단계를 분기해 기존 회원의 입력 항목을 6개에서 2개로 줄여 신청 이탈 요인을 최소화했고, 고정값에 의존하던 구조를 개선해 전문가가 추가돼도 레이아웃이 깨지지 않도록 바꿔 운영자가 코드 수정 요청 없이 전문가를 상시 교체할 수 있게 했습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'jQuery', 'Swiper 10', 'Ajax', 'JSP'],
    },
    {
      id: 'aigo-stock',
      title: 'AIGO스탁 런칭 — AI 종목추천 모바일 웹',
      period: '2023.07 – 2024.04',
      linkNote: '서비스 종료',
      category: 'launch',
      summary: '22개 화면의 프론트엔드 마크업을 1인 단독 담당해 정상 오픈',
      description:
        '메인·종목 상세분석·급등주·HOT섹터·리포트·포트폴리오·정기결제 해지 등 본문 16개와 공통 6개, 총 22개 화면을 단독으로 맡아 일정 내 완료했습니다. 1rem을 10px로 두는 반응형 체계와 px→rem 환산 규칙을 세워 320~768px 전 구간에서 동일한 비율로 렌더링되도록 하고, 화면당 퍼블리싱 소요 시간을 30% 줄였습니다.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Swiper', 'ApexCharts', 'Ajax', 'JSP'],
    },
  ],
  contacts: [
    { label: 'Email', value: 'bwj1993@emoney.co.kr', href: 'mailto:bwj1993@emoney.co.kr' },
    // TODO: 실제 주소를 알려 주시면 채웁니다
    // { label: 'GitHub', value: 'github.com/<id>', href: 'https://github.com/<id>' },
  ],
}
