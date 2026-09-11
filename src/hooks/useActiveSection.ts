import { useEffect, useState } from 'react'

/**
 * 화면에 보이는 섹션 id를 돌려준다.
 * 헤더 높이만큼 위쪽 여백을 빼고, 그 띠 안에서 가장 위에 있는 섹션을 활성으로 본다.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    /* 콜백은 '상태가 바뀐' 요소만 넘겨준다. 그것만 보고 판단하면 이미 띠 안에
       들어와 있던 섹션을 놓치므로, 현재 보이는 목록을 따로 들고 간다. */
    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })

        const topmost = elements
          .filter((element) => visible.has(element.id))
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0]

        if (topmost) setActive(topmost.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return active
}
