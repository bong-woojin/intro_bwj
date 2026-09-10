# intro-project

React + TypeScript로 만든 프론트엔드 포트폴리오(자기소개) 페이지.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입 체크 + 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
npm run lint     # oxlint
```

## 기술 스택

- React 19 / TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite` 플러그인, 설정 파일 없이 `src/index.css`에서 테마 정의)

## 구조

```
src/
├─ components/
│  ├─ intro/      IntroOverlay (첫 화면 키네틱 타이포 인트로)
│  ├─ layout/     Header(스크롤 연동 내비), Footer
│  ├─ sections/   Hero, About, Skills, Projects, Contact
│  └─ ui/         Section (섹션 공통 껍데기)
├─ data/profile.ts  ← 내용은 전부 여기서 관리
├─ hooks/useActiveSection.ts
├─ types/index.ts
└─ index.css       Tailwind import + 테마 토큰
```

## 내용 수정

`src/data/profile.ts` 하나만 고치면 페이지 전체가 바뀝니다.
이름, 소개 문구, 스킬, 프로젝트, 연락처가 모두 이 파일에 있습니다.
`index.html`의 `<title>`과 `description`도 함께 바꿔 주세요.

경로 별칭 `@/`는 `src/`를 가리킵니다.

## 인트로 애니메이션

첫 진입 시 약 5초짜리 인트로가 재생된 뒤 위로 걷히면서 본문이 드러납니다.

- 문구: `profile.introLines`
- 타이밍: `src/components/intro/IntroOverlay.tsx` 상단 상수 (`LINE_INTERVAL`, `NAME_AT`, `EXIT_AT` 등)
- 키프레임: `src/index.css` 하단
- 매번 보여주지 않으려면 `src/App.tsx`의 `SHOW_ONCE_PER_SESSION`을 `true`로 변경
- `prefers-reduced-motion: reduce` 설정 시 인트로는 자동으로 건너뜁니다

## 테마

다크 테마 고정입니다. 색은 `src/index.css`의 `@theme` 블록에서만 관리합니다
(`--color-ink` 배경 / `--color-fg` 본문 / `--color-accent` 보라 포인트).
