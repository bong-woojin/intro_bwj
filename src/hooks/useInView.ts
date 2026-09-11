import { useEffect, useRef, useState } from 'react'

/**
 * 요소가 화면에 들어왔는지 알려준다.
 *
 * 한 번 들어오면 계속 true로 둔다. 스크롤을 되돌릴 때마다 사라졌다 다시 나타나면
 * 읽는 사람이 산만해지기 때문이다. 그래서 처음 감지한 뒤 관찰을 끊는다.
 */
export function useInView<T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)

  // 모션을 줄여 달라는 설정이면 관찰하지 않고 처음부터 보여 준다
  const [inView, setInView] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const element = ref.current
    if (!element || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      /* threshold는 '요소 전체 넓이 대비 보이는 비율'이다.
         화면보다 긴 요소는 가능한 최대 비율 자체가 작아서(화면높이 / 요소높이)
         값을 올리면 한참 스크롤해야 감지된다. 시점은 rootMargin으로만 잡는다. */
      { rootMargin, threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin, inView])

  return { ref, inView }
}
