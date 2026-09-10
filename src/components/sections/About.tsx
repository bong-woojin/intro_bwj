import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'

export function About() {
  return (
    <Section id="about" title="About" description="제가 어떤 개발자인지 소개합니다.">
      <div className="space-y-4 text-lg leading-relaxed text-muted">
        {profile.introduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
