import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'

export function Contact() {
  return (
    <Section id="contact" title="Contact" description="편하게 연락 주세요.">
      <ul className="grid gap-3 sm:grid-cols-2">
        {profile.contacts.map((contact) => {
          const isExternal = contact.href.startsWith('http')
          return (
            <li key={contact.label}>
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
