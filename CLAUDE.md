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
├─ assets/works/          ← Works 스크린샷 원본 (한 장씩)
├─ lib/
│  ├─ stages.ts           세 축(Publisher · Frontend · AI)의 이름과 색
│  ├─ reveal.ts           등장 지연값 헬퍼
│  ├─ projects.ts         Works / Experience에 들어갈 목록, 분류·대응 화면 라벨
│  └─ screenshots.ts      스크린샷 이름 → 크기별 webp(srcset)
├─ hooks/
│  ├─ useInView.ts        화면 진입 감지
│  ├─ useActiveSection.ts 현재 섹션 표시
│  └─ useMediaQuery.ts    미디어쿼리 일치 여부 (Strengths 배치, Works 서랍의 열 수)
├─ components/
│  ├─ intro/              첫 진입 인트로 (두 연출 + 껍데기 + 별하늘)
│  ├─ hero/StageOrbit.tsx 첫 화면 오른쪽 세 원 그림
│  ├─ works/              DeviceStage(모니터·폰 틀), WorkDialog(자세히 보기 팝업), ProjectMeta
│  ├─ layout/             Header(로고 + 내비), Footer, BrandMark
│  ├─ sections/           Hero, Strengths, Skills, Works, Experience, Contact
│  └─ ui/                 Section(섹션 공통 껍데기), Disclosure(자세히 펼침), ScrollCue
└─ index.css              테마 토큰 + 모든 애니메이션
```

## 내용을 바꿀 때

**`src/data/profile.ts` 하나만 고친다.** 이름, 소개 글, 인트로 문구, 강점, 기술, 프로젝트, 연락처가 모두 여기 있다. 화면 코드에는 문구를 직접 넣지 않는다.

`index.html`의 `<title>`과 `description`은 별도로 관리하므로 이름이 바뀌면 함께 고친다.

### 스크린샷을 넣을 때

1. 캡처를 `src/assets/works/`에 `{작업}-pc.png` / `{작업}-mo.png`로 넣는다. **구분은 하이픈(`-`)만.** `_pc`처럼 밑줄을 쓰면 크기별 변환 대상에서 빠진다.
2. `profile.ts`의 해당 프로젝트에 **확장자 없이 이름만** 적는다.

```ts
platform: 'both',
thumbnail: 'mksignal-pc',        // 모니터
thumbnailMobile: 'mksignal-mo',  // 앞에 겹친 폰
```

크기별 webp는 `vite-imagetools`가 dev·build 때 만든다. 손으로 변환하지 않는다. 이름 끝이 `-pc`면 320~960, `-mo`면 120~400 폭으로 만들어진다. 이름이 틀리면 dev에서 바로 오류가 난다.

| | 캡처 크기 | 이유 |
| --- | --- | --- |
| PC | 1920 폭 모니터에서 브라우저 화면 영역 그대로 (약 1.92:1) | 모니터 틀이 16:9 화면 위에 탭 바를 얹은 모양이라, 탭 바를 뺀 나머지가 이 비율이다 |
| MO | DevTools 기기 모드 `390 × 806` | 폰 틀 비율 9:18.6 |

세로 전체 캡처는 쓰지 않는다. 위쪽 기준으로 잘려서 첫 화면만 남는다. `captures/`는 지금 쓰지 않는 원본을 보관하는 곳이고 git에서 빠져 있다.

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

Works 서랍처럼 나중에 다시 재생돼야 하는 곳은 `.card-in`처럼 animation을 쓰고, 클래스를 바꾸거나 `key`를 바꿔 다시 마운트한다.

### 높이가 바뀌는 영역은 0fr → 1fr, 또는 재서 넘긴다

`height: auto`에는 전환이 걸리지 않는다.

- **0에서 펼칠 때** — `ui/Disclosure`처럼 grid 행을 `0fr`에서 `1fr`로 움직인다. 내용 높이를 몰라도 된다.
- **0이 아닌 높이에서 펼칠 때** — Works 서랍은 닫혀서도 다음 줄을 128px 비쳐 보여야 해서 `0fr`을 못 쓴다. `ResizeObserver`로 안쪽 높이를 재서 px로 넘긴다.

잘라내기(`overflow: hidden`)는 다 열린 뒤에 푼다. 열리는 중에 풀면 아직 펼쳐지지 않은 카드가 비어져 나온다. 닫혀 비치는 카드는 `inert`로 포커스를 막는다.

### 작은 칸의 이미지는 미리 줄여서 srcset으로

기기 속 화면은 폭 45~250px밖에 안 된다. 큰 이미지 한 장을 넣으면 브라우저가 3~5배 줄이면서 **주변 몇 픽셀만 보고 색을 정해** 글자와 경계가 계단처럼 깨진다. 형식(PNG·WebP)과는 상관없다.

크기별로 미리 고품질 축소(Lanczos)해 두고 `srcset` + `sizes`로 표시 크기에 가장 가까운 것을 고르게 한다. `sizes`는 `DeviceStage.tsx`의 `sizesOf()`가 받침 칸 폭 대비 비율로 계산하므로, Works 격자의 열 수나 여백을 바꾸면 이 값도 맞춘다.

선명하게 다듬기(sharpen)는 넣지 않는다. 날카로워진 경계가 축소될 때 더 깨진다.

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

첫 화면 소개는 태도만 담백하게 담는다. 숫자는 Strengths 카드의 근거와 Works·Experience의 요약으로 옮겼다. 소개 글에 숫자가 박히면 읽는 흐름이 끊긴다.

Strengths 카드는 **주장(제목) + 근거(구분선 아래 목록)** 구조를 지킨다. 주장만 있으면 자기 평가가 되고, 근거가 있어야 읽는 사람이 판단할 수 있다.

### Strengths와 Skills는 성격이 다르다

- **Skills** — 무엇을 다룰 수 있는지 (기술명 나열)
- **Strengths** — 무엇을 해냈는지 (행동과 결과)

겹치면 스크롤만 길어진다.

### 결과물(Works)과 이력(Experience)을 나눈다

화면을 보여줄 수 있는 결과물과, 리팩토링·사내 운영처럼 화면이 없는 일을 같은 카드로 나란히 두면 화면 없는 쪽이 빈약해 보인다. 화면 없는 일은 수치와 과정이 강점이라 그릇을 달리한다.

| | 들어가는 것 | 정하는 값 |
| --- | --- | --- |
| **Works** | 화면을 보여줄 수 있는 결과물. 전시대 격자 | `showcase: true` |
| **Experience** | 회사에서 한 일 전부. 타임라인 | `category`가 `'personal'`이 아닌 것 전부 |

한 프로젝트가 양쪽에 다 나올 수 있다. 데이터는 `profile.projects` 하나이고 `lib/projects.ts`가 갈라 준다. 회사 정보는 `profile.company`.

- **Works 카드에는 설명(description)을 넣지 않는다.** 3열 카드는 폭이 좁아 긴 글이 세로로 끝없이 늘어나고 전시대가 글에 묻힌다. 카드 안에 펼침으로 넣어 봤다가 뺐다. 전시대나 `자세히 보기`를 누르면 섹션 폭의 팝업(`WorkDialog`)에서 큰 화면과 설명을 나란히 보여 준다. 팝업은 네이티브 `<dialog>`의 `showModal()`이라 Esc·포커스 가두기·포커스 되돌리기를 브라우저가 맡는다.
- **description은 팝업과 Experience의 `자세히` 양쪽에 나온다.** 한 곳만 고치면 된다. 길면 아무도 안 읽으므로 짧게 쓴다.
- **Works는 첫 줄만 펼치고 나머지는 서랍에 넣는다.** 계속 추가될 목록이라서다. 최신순이라 새 작업이 첫 줄에 온다.
- **Works에서 Experience로, Experience에서 Works로 건너가는 링크는 두지 않는다.** 읽던 자리를 잃는다. Experience에는 `사이트 보기 →`(외부 링크)만 단다.
- **대표작(Main) 표시는 없앴다.** 8개 중 4개에 붙어 강조 효과가 없었다.
- `ProjectCategory`(서비스 런칭 · 구조 개선 · 랜딩·홍보 · 개인)는 탭이 아니라 라벨로만 쓴다.

### 기기 틀은 대응 화면을 나타낸다

`platform` 하나로 틀과 태그가 함께 정해진다.

| `platform` | 틀 | 태그 |
| --- | --- | --- |
| `pc` | 모니터 | `PC` |
| `mo` | 폰 | `MO` |
| `both` | 모니터 앞에 작은 폰을 겹쳐 세움 | `PC · MO` |

`both`는 화면 폭에 따라 레이아웃이 바뀌는 **반응형**일 때만 쓴다. PC에서도 모바일 화면을 가운데 띄우는 웹앱(AI시그널프로)은 `mo`다.

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

- **링크 공유 미리보기** — `index.html`에 `og:image`가 없어 메신저에 주소를 보내면 글자만 뜬다.
- **설명 글 줄이기** — description이 대부분 5~6문장 문단이라 팝업에서 길다. 하나씩 줄이는 중.
- **배포** — GitHub 저장소 연결 후 Vercel이 가장 간단하다.
- **개인 프로젝트 추가** — `category: 'personal'`, `showcase: true`, `platform`, 스크린샷을 넣으면 Works 첫 줄에 들어간다.
