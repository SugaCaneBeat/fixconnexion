import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { IconGrid, IconBox, IconRoute, IconUsers, IconSend, IconGlobe, IconChevronRight } from './Icons'
import type { Dictionary, Lang } from '../hooks/useI18n'

type Props = {
  t: Dictionary
  lang: Lang
  onToggleLang: () => void
}

type NavKey = 'services' | 'catalog' | 'process' | 'about'
const NAV_ITEMS: Array<{ id: string; labelKey: NavKey; Icon: (p: { size?: number }) => JSX.Element }> = [
  { id: 'services', labelKey: 'services', Icon: IconGrid },
  { id: 'catalog', labelKey: 'catalog', Icon: IconBox },
  { id: 'process', labelKey: 'process', Icon: IconRoute },
  { id: 'about', labelKey: 'about', Icon: IconUsers },
]

export function Navbar({ t, lang, onToggleLang }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-ink-950/80 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <Logo className="h-7" />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.Icon
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                <Icon size={15} />
                {t.meta.nav[item.labelKey]}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLang}
            className="hidden sm:inline-flex chip hover:border-white/30 transition-colors"
            aria-label="Toggle language"
          >
            <IconGlobe size={12} className="text-white/50" />
            <span className={lang === 'fr' ? 'text-white' : 'text-white/40'}>FR</span>
            <span className="text-white/30">/</span>
            <span className={lang === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
          </button>
          <a href="#contact" className="hidden md:inline-flex btn-primary text-sm py-2 px-4">
            <IconSend size={13} />
            {t.meta.nav.cta}
            <IconChevronRight size={12} />
          </a>
          <button
            className="md:hidden p-2 rounded-lg border border-white/10 text-white/80"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-ink-950/95 backdrop-blur-md">
          <div className="container-x py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.Icon
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-white/5"
                >
                  <Icon size={16} />
                  {t.meta.nav[item.labelKey]}
                </a>
              )
            })}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 text-ink-950 px-6 py-3 font-medium"
            >
              <IconSend size={14} />
              {t.meta.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
