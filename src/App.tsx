import { useCallback, useEffect, useState } from 'react'
import { IntroOverlay } from '@/components/intro/IntroOverlay'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'

/** true로 바꾸면 인트로를 탭당 한 번만 보여준다 */
const SHOW_ONCE_PER_SESSION = false
const SESSION_KEY = 'intro-played'

function shouldPlayIntro(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (SHOW_ONCE_PER_SESSION && sessionStorage.getItem(SESSION_KEY) === '1') return false
  return true
}

function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro)

  const finishIntro = useCallback(() => {
    setShowIntro(false)
    if (SHOW_ONCE_PER_SESSION) sessionStorage.setItem(SESSION_KEY, '1')
  }, [])

  // 인트로가 도는 동안에는 뒤쪽 페이지가 스크롤되지 않게 막는다
  useEffect(() => {
    if (!showIntro) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [showIntro])

  return (
    <>
      {showIntro && (
        <>
          <IntroOverlay onFinish={finishIntro} />
          <button
            type="button"
            onClick={finishIntro}
            className="fixed right-6 bottom-6 z-[101] rounded-full border border-line px-4 py-2 text-xs tracking-widest text-muted uppercase transition-colors hover:border-accent hover:text-fg"
          >
            Skip
          </button>
        </>
      )}

      {/* 오버레이가 위로 걷히면 이 화면이 그대로 드러난다.
          인트로 중에는 inert로 키보드 포커스가 들어가지 않게 막는다. */}
      <div inert={showIntro}>
        <Header />
        <main>
          {/* Hero가 첫 화면을 채우면서 About(자기소개)까지 함께 담는다 */}
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
