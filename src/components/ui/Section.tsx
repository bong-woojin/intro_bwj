import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  description?: string
  children: ReactNode
}

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
      <header className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description && <p className="mt-3 text-muted">{description}</p>}
        <div className="mt-5 h-px w-16 bg-accent" />
      </header>
      {children}
    </section>
  )
}
