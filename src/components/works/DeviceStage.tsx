import { screenshotOf } from '@/lib/screenshots'
import type { Platform } from '@/types'

/** 받침 칸이 놓이는 곳. 칸 폭이 달라 고를 이미지 크기도 달라진다. */
export type StageSize = 'card' | 'dialog'

/*
 * 받침 칸의 폭. [미디어쿼리, 3열·2열·1열에서의 폭(px 또는 vw 식), 비율]
 * card   — Works 격자. 3열이면 약 230px, 2열·1열이면 화면 폭을 따라간다.
 * dialog — 자세히 보기 팝업의 왼쪽 열. 넓으면 약 395px, 좁으면 한 열로 화면 폭을 따라간다.
 * 격자나 팝업의 열·여백을 바꾸면 이 값도 맞춘다.
 */
const STAGE_WIDTHS: Record<StageSize, [query: string | null, base: string, factor: number][]> = {
  card: [
    ['(min-width: 64rem)', '230px', 1],
    ['(min-width: 40rem)', '(100vw - 80px)', 0.38],
    [null, '(100vw - 48px)', 0.76],
  ],
  dialog: [
    ['(min-width: 64rem)', '395px', 1],
    [null, '(100vw - 96px)', 0.84],
  ],
}

/** 화면 폭을 받침 칸 폭에 대한 비율로 받아 img의 sizes를 만든다 */
const sizesOf = (ratio: number, stage: StageSize) =>
  STAGE_WIDTHS[stage]
    .map(([query, base, factor]) => {
      const width = base.endsWith('px')
        ? `${Math.round(parseFloat(base) * factor * ratio)}px`
        : `calc(${base} * ${(factor * ratio).toFixed(3)})`
      return query ? `${query} ${width}` : width
    })
    .join(', ')

interface ScreenProps {
  /** src/assets/works/의 파일 이름 (확장자 없이) */
  thumbnail?: string
  /** 받침 칸 폭 대비 이 화면의 폭 */
  ratio: number
  stage: StageSize
  className?: string
}

/** 스크린샷이 없으면 흰 바탕으로 자리만 잡는다. 이미지만 넣으면 그대로 채워진다. */
function Screen({ thumbnail, ratio, stage, className = '' }: ScreenProps) {
  const shot = screenshotOf(thumbnail)

  if (shot) {
    return (
      <img
        src={shot.src}
        srcSet={shot.srcSet}
        sizes={sizesOf(ratio, stage)}
        alt=""
        /* 팝업은 열리자마자 보여야 하고, 전환이 이 이미지를 기다린다 */
        loading={stage === 'dialog' ? 'eager' : 'lazy'}
        decoding="async"
        className={`bg-white object-cover object-top ${className}`}
      />
    )
  }

  return (
    <div className={`flex items-center justify-center bg-white ${className}`}>
      <span className="text-[0.65rem] font-medium tracking-[0.25em] text-black/20 uppercase">
        Screenshot
      </span>
    </div>
  )
}

/**
 * 너비를 부모에 맞춘다. 높이는 너비의 약 0.65배.
 *
 * 화면은 가장 흔한 16:9로 두고 위에 브라우저 탭 바를 얹는다.
 * 탭 바를 뺀 나머지가 약 1.92:1 — 1920 폭 모니터에서 브라우저 화면 영역을 그대로 찍은 비율이라
 * 캡처를 따로 자르지 않아도 좌우가 잘리지 않는다.
 */
interface DeviceProps {
  thumbnail?: string
  stage: StageSize
}

function Monitor({ thumbnail, ratio, stage }: DeviceProps & { ratio: number }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full rounded-[0.6rem] bg-[#1c1c24] p-[2%] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
        <div className="flex aspect-[16/9] w-full flex-col overflow-hidden rounded-[0.3rem]">
          <div
            aria-hidden="true"
            className="flex h-[7.5%] flex-none items-center gap-[1.2%] bg-[#e7e7ec] px-[2%]"
          >
            <span className="aspect-square h-[38%] rounded-full bg-[#ff5f57]" />
            <span className="aspect-square h-[38%] rounded-full bg-[#febc2e]" />
            <span className="aspect-square h-[38%] rounded-full bg-[#28c840]" />
          </div>
          <Screen
            thumbnail={thumbnail}
            ratio={ratio}
            stage={stage}
            className="min-h-0 w-full flex-1"
          />
        </div>
      </div>
      <div className="aspect-[3/1] w-[16%] bg-gradient-to-b from-[#2a2a33] to-[#17171d]" />
      <div className="aspect-[18/1] w-[34%] rounded-full bg-[#2a2a33]" />
    </div>
  )
}

/* 모니터 앞에 겹쳐 세우는 폰은 크기가 절반 남짓이라
   테두리와 모서리를 같은 값으로 두면 화면보다 틀이 두꺼워 보인다 */
const PHONE_SIZE = {
  lg: {
    frame: 'rounded-[1.15rem] p-[3px]',
    screen: 'rounded-[0.98rem]',
    notch: 'top-2 h-1',
    /* 높이 94% × 칸 비율 0.75 × 폰 비율 9/18.6 */
    ratio: 0.33,
  },
  sm: {
    frame: 'rounded-[0.7rem] p-[2px]',
    screen: 'rounded-[0.58rem]',
    notch: 'top-1 h-[3px]',
    /* 높이 58% × 0.75 × 9/18.6 */
    ratio: 0.21,
  },
}

/** 높이를 부모에 맞춘다. 모니터와 나란히 놓여도 바닥선이 같도록. */
function Phone({ thumbnail, stage, size = 'lg' }: DeviceProps & { size?: 'lg' | 'sm' }) {
  const style = PHONE_SIZE[size]

  return (
    <div
      className={`relative aspect-[9/18.6] h-full bg-[#1c1c24] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/10 ${style.frame}`}
    >
      <Screen
        thumbnail={thumbnail}
        ratio={style.ratio}
        stage={stage}
        className={`h-full w-full ${style.screen}`}
      />
      <span
        aria-hidden="true"
        className={`absolute left-1/2 w-[28%] -translate-x-1/2 rounded-full bg-[#1c1c24] ${style.notch}`}
      />
    </div>
  )
}

interface DeviceStageProps {
  platform: Platform
  thumbnail?: string
  thumbnailMobile?: string
  /** 칸이 놓이는 곳. 고를 이미지 크기가 정해진다. 기본은 Works 카드 */
  stage?: StageSize
}

/**
 * 4:3 칸 안에 기기를 바닥에 붙여 세운다.
 * 기기 조합이 달라도 칸 크기가 같아 목록의 줄이 맞는다.
 *
 * pc   — 모니터
 * mo   — 폰
 * both — 모니터 앞에 폰을 겹쳐 세워 반응형임을 그림으로 보여 준다
 */
export function DeviceStage({
  platform,
  thumbnail,
  thumbnailMobile,
  stage = 'card',
}: DeviceStageProps) {
  return (
    <div className="relative flex aspect-[4/3] w-full items-end justify-center">
      {/* 바닥 그림자 — 기기가 떠 있지 않고 놓여 있는 것처럼 */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-[6%] w-[70%] -translate-x-1/2 translate-y-1/2 rounded-[50%] bg-black/60 blur-md"
      />

      {platform === 'pc' && (
        <div className="relative w-full">
          <Monitor thumbnail={thumbnail} ratio={0.96} stage={stage} />
        </div>
      )}

      {platform === 'mo' && (
        <div className="relative h-[94%]">
          <Phone thumbnail={thumbnail} stage={stage} />
        </div>
      )}

      {platform === 'both' && (
        <>
          {/* 폰이 들어설 자리만큼 모니터를 왼쪽으로 비켜 둔다 */}
          <div className="relative mr-[14%] w-[86%]">
            <Monitor thumbnail={thumbnail} ratio={0.83} stage={stage} />
          </div>
          <div className="absolute right-0 bottom-0 h-[58%]">
            <Phone thumbnail={thumbnailMobile} stage={stage} size="sm" />
          </div>
        </>
      )}
    </div>
  )
}
