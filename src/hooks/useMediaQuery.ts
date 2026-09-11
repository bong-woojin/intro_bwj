import { useCallback, useSyncExternalStore } from 'react'

/**
 * 화면 조건이 맞는지 알려주고, 창 크기가 바뀌면 따라간다.
 * matchMedia는 React 밖에 있는 값이라 useSyncExternalStore로 구독한다.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
