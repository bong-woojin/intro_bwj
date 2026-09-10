import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line/70 py-10">
      <div className="mx-auto w-full max-w-5xl px-6 text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with React &amp; TypeScript.
      </div>
    </footer>
  )
}
