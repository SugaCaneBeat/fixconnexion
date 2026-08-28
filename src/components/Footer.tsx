import type { Dictionary, Lang } from '../hooks/useI18n'
import { Logo } from './Logo'
import {
  IconInfo,
  IconBriefcase,
  IconHeart,
  IconBook,
  IconFile,
  IconDownload,
  IconStar,
  IconUsers,
  IconGitHub,
  IconTwitter,
  IconLinkedIn,
  IconGlobe,
  IconChevronRight,
  IconRoute,
  IconBox,
  IconCloud,
  IconPalette,
  IconTerminal,
} from './Icons'

const FOOTER_ICONS: Record<string, (p: { size?: number; className?: string }) => JSX.Element> = {
  'A propos': IconInfo,
  'Methode': IconRoute,
  'Carrieres': IconBriefcase,
  'Presse': IconStar,
  'About': IconInfo,
  'Method': IconRoute,
  'Careers': IconBriefcase,
  'Press': IconStar,
  'Apps mobiles': IconBox,
  'Mobile apps': IconBox,
  'SaaS': IconCloud,
  'Design system': IconPalette,
  'DevOps & AI': IconTerminal,
  'Catalogue gratuit': IconDownload,
  'Changelog': IconFile,
  'Blog': IconBook,
  'Mentions legales': IconFile,
  'Free catalog': IconDownload,
  'Legal': IconFile,
}

const COLUMN_ICONS: Record<string, (p: { size?: number; className?: string }) => JSX.Element> = {
  Agence: IconUsers,
  Studio: IconUsers,
  Services: IconBriefcase,
  Ressources: IconBook,
  Resources: IconBook,
}

export function Footer({ t, lang, onToggleLang }: { t: Dictionary; lang: Lang; onToggleLang: () => void }) {
  return (
    <footer className="bg-ink-950 border-t border-white/5 py-16">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Logo className="h-7" />
            <p className="mt-4 text-white/55 max-w-sm">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-2">
              <a aria-label="Twitter" href="#" className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30">
                <IconTwitter size={14} />
              </a>
              <a aria-label="GitHub" href="#" className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30">
                <IconGitHub size={14} />
              </a>
              <a aria-label="LinkedIn" href="#" className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30">
                <IconLinkedIn size={14} />
              </a>
            </div>
          </div>

          {t.footer.columns.map((col) => {
            const ColumnIcon = COLUMN_ICONS[col.t] || IconBriefcase
            return (
              <div key={col.t} className="lg:col-span-2">
                <h4 className="flex items-center gap-2 text-sm font-medium text-white">
                  <ColumnIcon size={14} className="text-electric-400" />
                  {col.t}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((it) => {
                    const ItemIcon = FOOTER_ICONS[it] || IconChevronRight
                    return (
                      <li key={it}>
                        <a href="#" className="group flex items-center gap-2 text-sm text-white/55 hover:text-white">
                          <ItemIcon size={12} className="text-white/30 group-hover:text-lime-400 transition-colors" />
                          {it}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}

          <div className="lg:col-span-1 flex lg:justify-end">
            <button onClick={onToggleLang} className="chip hover:border-white/30 transition-colors" aria-label="Toggle language">
              <IconGlobe size={12} className="text-white/50" />
              <span className={lang === 'fr' ? 'text-white' : 'text-white/40'}>FR</span>
              <span className="text-white/30">/</span>
              <span className={lang === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
            </button>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="flex items-center gap-2 text-xs font-mono text-white/40">
            <IconHeart size={12} className="text-coral-400" />
            © {new Date().getFullYear()} Fixconnexion. {t.footer.rights}
          </p>
          <p className="text-xs font-mono text-white/30">v1.0.0 - build {new Date().toISOString().slice(0, 10)}</p>
        </div>
      </div>
    </footer>
  )
}
