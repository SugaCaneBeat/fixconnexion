import type { Dictionary } from '../hooks/useI18n'
import { apps, type App } from '../data/catalog'
import { IconMail, IconNote, IconCheck, IconPlay, IconLock, IconChat } from './Icons'

function statusColor(s: App['status']) {
  if (s === 'stable') return 'bg-lime-400/10 text-lime-400 border-lime-400/30'
  if (s === 'beta') return 'bg-coral-400/10 text-coral-400 border-coral-400/30'
  return 'bg-electric-500/10 text-electric-400 border-electric-500/30'
}

const slugToIcon: Record<string, (p: { size?: number }) => JSX.Element> = {
  fixmail: IconMail,
  fixnote: IconNote,
  fixtask: IconCheck,
  fixmedia: IconPlay,
  fixvault: IconLock,
  fixchat: IconChat,
}

export function Catalog({ t, lang }: { t: Dictionary; lang: 'fr' | 'en' }) {
  return (
    <section id="catalog" className="py-24 md:py-32 relative bg-ink-900/30 border-y border-white/5">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                {t.catalog.eyebrow}
              </span>
              <span className="chip text-lime-400 border-lime-400/30 bg-lime-400/5">
                {t.catalog.badge}
              </span>
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              {t.catalog.title}
            </h2>
            <p className="mt-5 text-lg text-white/65">{t.catalog.subtitle}</p>
          </div>
          <a href="#contact" className="btn-ghost self-start md:self-end">{t.catalog.cta}</a>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => {
            const Icon = slugToIcon[app.slug]
            return (
              <article
                key={app.slug}
                className="group card overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-ink-800">
                  <img
                    src={app.image}
                    alt={`${app.name} - app icon`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
                  <span className={`absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded-full border backdrop-blur bg-ink-950/60 ${statusColor(app.status)}`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-lg bg-electric-500/10 border border-electric-500/30 text-electric-400 flex items-center justify-center group-hover:bg-electric-500/20 transition-colors">
                      <Icon size={16} />
                    </span>
                    <h3 className="text-2xl font-display font-semibold text-white">{app.name}</h3>
                  </div>
                  <p className="mt-3 text-sm text-electric-400">{app.tag[lang]}</p>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">{app.desc[lang]}</p>

                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-1.5 flex-wrap">
                      {app.platform.map((p) => (
                        <span key={p} className="text-[10px] font-mono text-white/45 px-1.5 py-0.5 rounded bg-white/5">
                          {p}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-white/40">{app.category[lang]}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-10 text-center text-sm text-white/40 font-mono">{t.catalog.note}</p>
      </div>
    </section>
  )
}
