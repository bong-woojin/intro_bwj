import { useEffect, useRef, useState } from 'react'

/**
 * 좁은 화면에서 hover를 대신한다.
 *
 * 화면 가운데에 가장 가까운 항목을 활성으로 본다. 스크롤만 해도 차례로 켜지므로
 * 마우스가 없는 기기에서도 카드마다 준비된 연출이 재생된다.
 * 넓은 화면에서는 hover가 있으므로 동작하지 않는다.
 */
export function useActiveOnScroll(count: number, enabled: boolean) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    let frame = 0

    const update = () => {
      frame = 0
      const middle = window.innerHeight / 2
      let nearest: number | null = null
      let shortest = Infinity

      refs.current.forEach((element, index) => {
        if (!element) return
        const box = element.getBoundingClientRect()
        // 화면 밖에 있는 카드는 후보로 보지 않는다
        if (box.bottom < 0 || box.top > window.innerHeight) return

        const distance = Math.abs(box.top + box.height / 2 - middle)
        if (distance < shortest) {
          shortest = distance
          nearest = index
        }
      })

      setActive(nearest)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    // 첫 계산도 프레임에 맞춰 돌린다. 효과 안에서 곧바로 상태를 바꾸면 렌더가 한 번 더 돈다.
    frame = requestAnimationFrame(update)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [count, enabled])

  const register = (index: number) => (element: HTMLElement | null) => {
    refs.current[index] = element
  }

  // 꺼져 있을 때는 상태를 건드리지 않고 값만 비운다
  return { active: enabled ? active : null, register }
}
