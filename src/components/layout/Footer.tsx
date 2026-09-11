import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line/70 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
          <span className="mx-2 text-line">·</span>
          Built with React &amp; TypeScript
        </p>

        <div className="flex items-center gap-4">
          {profile.contacts.map((contact) => {
            const isExternal = contact.href.startsWith('http')
            return (
              <a
                key={contact.label}
                href={contact.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="transition-colors hover:text-fg"
              >
                {contact.label}
              </a>
            )
          })}

          {/* 페이지가 길어 위로 돌아가기 번거롭다. 맨 끝에 하나 둔다. */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 transition duration-200 hover:text-fg active:scale-[0.96]"
          >
            맨 위로
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="M6 11l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
