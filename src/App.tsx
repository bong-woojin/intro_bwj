import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Skills } from '@/components/sections/Skills'
import { Strengths } from '@/components/sections/Strengths'
import { Works } from '@/components/sections/Works'

function App() {
  return (
    <>
      <Header />
      <main>
        {/* Hero가 첫 화면을 채우면서 소개 글까지 함께 담는다 */}
        <Hero />
        <Strengths />
        <Skills />
        <Works />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
