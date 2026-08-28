import type { Dictionary } from '../hooks/useI18n'
import { serviceImages } from '../data/catalog'
import { IconMobile, IconDesign, IconSaaS, IconCloud, IconMarketing, IconCompass } from './Icons'

const serviceIcons = [IconMobile, IconDesign, IconSaaS, IconCloud, IconMarketing, IconCompass]
const serviceKeys = ['s1', 's2', 's3', 's4', 's5', 's6']

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="chip">
            <IconSparklesSm />
            {t.services.eyebrow}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            {t.services.title}
          </h2>
          <p className="mt-5 text-lg text-white/65">{t.services.subtitle}</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i]
            return (
              <article
                key={s.n}
                className="group card overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-ink-800">
                  <img
                    src={serviceImages[serviceKeys[i]]}
                    alt={s.t}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-xl bg-electric-500/10 border border-electric-500/30 text-electric-400 flex items-center justify-center group-hover:bg-electric-500/20 group-hover:border-electric-500/50 transition-colors">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-xs text-white/40">{s.n}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-medium text-white">{s.t}</h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{s.d}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function IconSparklesSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
    </svg>
  )
}
