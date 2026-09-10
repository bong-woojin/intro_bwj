import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'
import { useInView } from '@/hooks/useInView'
import { revealDelay } from '@/lib/reveal'

export function Contact() {
  const { ref, inView } = useInView<HTMLUListElement>()

  return (
    <Section id="contact" title="Contact" description="편하게 연락 주세요.">
      <ul
        ref={ref}
        className={`reveal-group grid gap-3 sm:grid-cols-2 ${inView ? 'is-visible' : ''}`}
      >
        {profile.contacts.map((contact, index) => {
          const isExternal = contact.href.startsWith('http')
          return (
            <li key={contact.label} className="reveal" style={revealDelay(index * 80)}>
              <a
                href={contact.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="flex items-center justify-between rounded-2xl border border-line bg-surface/40 px-6 py-5 transition-colors hover:border-accent/60"
              >
                <span className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
                  {contact.label}
                </span>
                <span className="text-muted">{contact.value}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
