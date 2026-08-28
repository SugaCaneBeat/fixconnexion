import type { Dictionary } from '../hooks/useI18n'
import { IconScope, IconSketch, IconBuild, IconRocket } from './Icons'

const stepIcons = [IconScope, IconSketch, IconBuild, IconRocket]

export function Process({ t }: { t: Dictionary }) {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-400" />
            {t.process.eyebrow}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            {t.process.title}
          </h2>
        </div>

        <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.process.steps.map((s, i) => {
            const Icon = stepIcons[i]
            return (
              <li key={s.n} className="card p-6 relative group hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="h-10 w-10 rounded-xl bg-electric-500/10 border border-electric-500/30 text-electric-400 flex items-center justify-center group-hover:bg-electric-500/20 transition-colors">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-3xl grad-text">{s.n}</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.d}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
