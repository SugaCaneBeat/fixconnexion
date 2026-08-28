import type { Dictionary } from '../hooks/useI18n'
import { IconLayers, IconShield, IconCpu, IconClock } from './Icons'

const pillarIcons = [IconLayers, IconShield, IconCpu, IconClock]

export function About({ t }: { t: Dictionary }) {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-grid-fade pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
              {t.about.eyebrow}
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              {t.about.title}
            </h2>
            <div className="mt-8 relative rounded-3xl border border-white/10 overflow-hidden bg-ink-900 ring-soft">
              <img
                src="/img/about-team-v2-clean.webp"
                alt="Equipe Fixconnexion - constellation collaborative"
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-ink-950/95 to-transparent">
                <div className="text-xs font-mono text-white/60">SQUAD TRANSVERSALE / PARIS - DUBAI - LAUSANNE</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg text-white/70 leading-relaxed">{t.about.body}</p>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {t.about.pillars.map((p, i) => {
                const Icon = pillarIcons[i]
                return (
                  <div key={p.t} className="card p-5 hover:border-white/20 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="h-9 w-9 rounded-lg bg-electric-500/10 border border-electric-500/30 text-electric-400 flex items-center justify-center group-hover:bg-electric-500/20 transition-colors">
                        <Icon size={16} />
                      </span>
                      <h3 className="text-base font-medium text-white">{p.t}</h3>
                    </div>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">{p.d}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
