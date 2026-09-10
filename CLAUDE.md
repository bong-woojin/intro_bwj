# intro-project

봉우진(프론트엔드 개발자)의 개인 포트폴리오 페이지. 단일 페이지 스크롤 구성.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입 체크 + 프로덕션 빌드
npm run lint     # oxlint
```

작업 후에는 `npm run build`와 `npm run lint`를 함께 돌린다. 빌드에 `tsc -b`가 포함되어 타입 오류를 잡는다.

## 기술 스택

React 19 · TypeScript · Vite 8 · Tailwind CSS v4

- Tailwind v4라 `tailwind.config.js`가 없다. 테마는 `src/index.css`의 `@theme` 블록에서 정의한다.
- 경로 별칭 `@/` → `src/`. `vite.config.ts`와 `tsconfig.app.json` 양쪽에 설정되어 있다.
- TypeScript 6.0에서 `baseUrl`이 deprecated이므로 `paths`만 쓴다. `baseUrl`을 넣으면 빌드가 실패한다.

## 구조

```
src/
├─ data/profile.ts        ← 페이지의 모든 내용
├─ types/index.ts         ← 내용의 형태
├─ lib/
│  ├─ stages.ts           세 축(Publisher · Frontend · AI)의 이름과 색
│  └─ reveal.ts           등장 지연값 헬퍼
├─ hooks/
│  ├─ useInView.ts        화면 진입 감지
│  └─ useActiveSection.ts 현재 섹션 표시
├─ components/
│  ├─ intro/              첫 진입 인트로 (두 연출 + 껍데기 + 별하늘)
│  ├─ hero/StageOrbit.tsx 첫 화면 오른쪽 세 원 그림
│  ├─ layout/             Header(로고 + 내비), Footer, BrandMark
│  ├─ sections/           Hero, Strengths, Skills, Projects, Contact
│  └─ ui/                 Section(섹션 공통 껍데기), ScrollCue
└─ index.css              테마 토큰 + 모든 애니메이션
```

## 내용을 바꿀 때

**`src/data/profile.ts` 하나만 고친다.** 이름, 소개 글, 인트로 문구, 강점, 기술, 프로젝트, 연락처가 모두 여기 있다. 화면 코드에는 문구를 직접 넣지 않는다.

`index.html`의 `<title>`과 `description`은 별도로 관리하므로 이름이 바뀌면 함께 고친다.

---

## 설계 규칙

### 세 축을 세 곳이 공유한다

`Publisher · Frontend · AI`는 이 사이트의 중심 상징이다. `src/lib/stages.ts`의 `STAGES` 배열 하나를 세 곳이 함께 쓴다.

| 곳 | 쓰는 방식 |
| --- | --- |
| `layout/BrandMark.tsx` | 헤더 로고의 원 세 개 |
| `hero/StageOrbit.tsx` | 첫 화면 오른쪽 그림 |
| `sections/Strengths.tsx` | 카드 세 장의 라벨과 색 |

**순서가 곧 의미다.** `STAGES`의 순서를 바꾸면 세 곳이 함께 바뀐다. Strengths 카드는 배열 순서로 색을 가져가므로 `profile.strengths`의 순서도 같이 맞춘다.

### 인트로는 두 연출을 모두 남긴다

`components/intro/variant.ts`의 `INTRO_VARIANT` 한 줄로 전환한다.

```ts
export const INTRO_VARIANT: IntroVariant = 'kinetic'  // 어절 모션
// 'subtle' — 페이드 + 블러 (이전 버전)
```

지우지 않고 둘 다 유지하는 이유는 되돌릴 때 코드를 다시 쓰지 않기 위해서다.

### 타임라인은 내용에서 계산한다

인트로 시점을 손으로 박지 않는다. `profile.introLines`의 어절 수에서 자동으로 계산하므로 문구를 늘리거나 줄여도 뒤 순서가 알아서 밀린다.

**가장 어절이 많은 줄이 전체 속도를 결정한다.** 한 줄에 어절을 많이 넣으면 인트로 전체가 길어진다.

### 뒤 화면 연출은 인트로가 걷힐 때 시작한다

컴포넌트를 마운트하는 순간부터 CSS 애니메이션이 돌기 때문에, 페이지 로드와 동시에 시작하면 **인트로에 가려진 채로 다 끝나 버린다.**

`App` → `IntroOverlay.onExitStart` → `heroReady` → `Hero` → `StageOrbit.active` 순으로 신호를 넘긴다. 첫 화면에 새 연출을 추가할 때도 같은 신호를 쓴다.

---

## 애니메이션에서 반복해서 부딪힌 함정

### 글자를 마스크로 잘라내지 않는다

`overflow: hidden`으로 글자를 잘라 내면 **경계에 걸리는 순간 가로줄이 그어진 것처럼 보인다.** 문구와 이름 모두 마스크를 걷어내고 투명도로 사라지게 했다. 잘라낼 필요가 없으니 이동 거리도 짧다.

마스크를 다시 쓸 일이 있다면, **여백(padding)으로 여유를 주면 안 된다.** `overflow: hidden`은 padding 안쪽 경계에서 자르므로 여백만큼 잘라내는 범위도 넓어져, 밀어둔 글자가 그 틈으로 비어져 나온다. `line-height`로 확보한다.

### 자간을 주면 중앙 정렬이 어긋난다

`letter-spacing`은 글자 사이가 아니라 **각 글자 뒤**에 붙는다. 마지막 글자 뒤 빈칸까지 폭에 포함되어 글자가 왼쪽으로 치우친다.

같은 크기의 음수 `margin-right`로 상쇄한다. 자간이 애니메이션으로 변하면 여백도 같은 키프레임에서 함께 움직여야 한다. (`kin-track`, `kin-role`)

### 회전하는 그룹에 글자를 넣지 않는다

원이 한 바퀴 돌면 원끼리 자리를 바꾸므로, 이름을 붙여 두면 어떻게 해도 어긋난다. 위치를 고정하면 짝이 틀리고, 따라 돌게 하면 글자가 화면을 돌아다닌다.

`StageOrbit`은 이름을 그림 아래 범례로 빼고 색으로 짝을 맞춘다.

### 등장 지연은 CSS 변수로 넘긴다

inline `transition-delay`를 쓰면 **hover 같은 다른 전환까지 함께 늦어진다.** 마지막 카드는 hover 반응이 0.3초씩 밀린다.

`lib/reveal.ts`의 `revealDelay()`로 `--reveal-delay`를 넘기고, `index.css`에서 opacity와 transform에만 물린다.

### 다시 마운트되는 요소는 transition이 아니라 animation

`.reveal`은 transition이라 요소가 다시 마운트돼도 재생되지 않는다. 부모에 이미 `is-visible`이 있으면 새 요소는 처음부터 보이는 상태로 나타난다.

Projects의 탭 전환처럼 다시 재생돼야 하는 곳은 `.card-in`처럼 animation을 쓰고 `key`를 바꿔 다시 마운트한다.

### 관찰자는 묶음마다 하나만

요소마다 `IntersectionObserver`를 붙이지 않는다. 컨테이너 하나만 관찰하고 자식은 CSS 지연으로 차례를 만든다. 카드가 수십 개여도 관찰자는 섹션당 하나다.

`useInView`는 한 번 감지하면 관찰을 끊는다. 스크롤을 되돌릴 때마다 다시 재생되면 산만하다.

### SVG 경로를 그릴 때는 pathLength

`pathLength="1"`을 주면 실제 길이와 무관하게 `stroke-dashoffset`을 0~1로 다룰 수 있다. 반지름을 바꿔도 값을 다시 계산할 필요가 없다.

---

## 레이아웃 규칙

### 폭은 전 구간 동일

모든 섹션이 `max-w-5xl px-6`을 쓴다. 헤더, 첫 화면, 각 섹션, 푸터가 좌우 끝선이 맞아야 한다. 첫 화면만 2단 배치라 오른쪽 열을 `20rem`으로 잡아 폭을 맞췄다.

### flex로 균등 분할할 때는 basis-0

`flex-basis` 기본값 `auto`는 **내용 길이가 시작 폭을 정한다.** 근거 항목이 많은 카드가 저절로 넓어져 비율이 어긋난다. `basis-0`을 줘야 `grow` 배율로만 폭이 정해진다.

### 첫 화면 높이는 svh

`min-h-[calc(100svh-4rem)]` — 헤더(4rem)를 뺀 나머지. `vh`가 아니라 `svh`를 쓰는 이유는 모바일에서 주소창이 접혔다 펴질 때 `vh`가 튀기 때문이다.

---

## 콘텐츠 규칙

### 소개 글에는 수치를 넣지 않는다

첫 화면 소개는 태도만 담백하게 담는다. 숫자는 Strengths 카드의 근거와 Projects 카드로 옮겼다. 소개 글에 숫자가 박히면 읽는 흐름이 끊긴다.

Strengths 카드는 **주장(제목) + 근거(구분선 아래 목록)** 구조를 지킨다. 주장만 있으면 자기 평가가 되고, 근거가 있어야 읽는 사람이 판단할 수 있다.

### Strengths와 Skills는 성격이 다르다

- **Skills** — 무엇을 다룰 수 있는지 (기술명 나열)
- **Strengths** — 무엇을 해냈는지 (행동과 결과)

겹치면 스크롤만 길어진다.

### Projects는 성격별로 나눈다

기술 스택으로 나누면 jQuery에 10건이 몰려 필터의 의미가 없고, "React/Next 1건"으로 보여 최신 스택 경험이 얕아 보인다.

`types/index.ts`의 `ProjectCategory`와 `data/profile.ts`의 `PROJECT_CATEGORIES`로 관리한다. **항목이 0개인 분류는 탭에서 자동으로 빠지므로**, 개인 프로젝트를 추가하면 그때 탭이 생긴다.

대표작은 탭이 아니라 `featured: true` 표시로 둔다. 탭으로 만들면 다른 탭과 중복되거나 한쪽에서 빠진다.

### 링크가 없으면 이유를 적는다

회사 프로젝트는 링크가 없는 게 기본이다. `linkNote`에 이유를 적으면 "링크가 없다"가 아니라 "원래 외부에서 볼 수 없는 서비스다"로 읽힌다.

```ts
linkNote: '증권사 앱 내장'      // 앱 웹뷰
linkNote: '사내 운영 페이지'    // 외부 접근 불가
linkNote: '서비스 종료'         // 내린 서비스
```

---

## 접근성

- 모든 애니메이션이 `prefers-reduced-motion: reduce`를 존중한다. 새 애니메이션을 추가하면 `index.css` 하단의 해당 미디어쿼리에도 등록한다.
- 인트로가 도는 동안 본문은 `inert`로 키보드 포커스를 막고, `body.overflow`로 스크롤을 잠근다.
- 색만으로 정보를 전달하지 않는다. 세 축은 색과 함께 이름을 항상 적는다.

## 다크 테마 고정

라이트 모드는 없다. 색은 `src/index.css`의 `@theme`에서만 정의한다.

```
--color-ink      배경
--color-surface  카드 배경
--color-line     테두리
--color-fg       본문
--color-muted    보조 텍스트
--color-accent   포인트
```

`index.html`에 배경색과 `color-scheme: dark`를 미리 넣어 CSS 로드 전 흰 화면이 번쩍이는 것을 막는다.

---

## 작업할 때 주의

**파일을 연달아 덮어쓰면 dev 서버가 깨질 수 있다.** Vite가 파일을 쓰는 도중(내용이 비어 있는 순간)에 읽어 캐시에 물면, 소스는 정상인데 화면만 검게 나온다. 이때는 이렇게 복구한다.

```bash
# 포트 5173 프로세스 종료 후
rm -rf node_modules/.vite
npm run dev
```

여러 파일을 한 번에 고칠 때는 임시 파일에 쓰고 원자적으로 교체하는 편이 안전하다.

프로덕션 빌드가 통과해도 dev 서버가 깨져 있을 수 있으므로, **빌드만 보고 정상이라 판단하지 않는다.**

---

## 남은 작업

- **연락처** — GitHub 주소가 `data/profile.ts`에 주석으로 남아 있다. 실제 주소를 넣어야 한다. 이메일이 회사 주소이므로 이직용이면 개인 메일로 교체한다.
- **프로젝트 링크** — 살아 있는 서비스의 실제 URL을 `demoUrl`에 넣는다.
- **배포** — 아직 안 했다. GitHub 저장소 연결 후 Vercel이 가장 간단하다.
- **개인 프로젝트** — `category: 'personal'`로 추가하면 탭이 자동으로 생긴다.
