import { useEffect, useState, useRef } from 'react'
import type { Dictionary } from '../hooks/useI18n'
import { IconArrow, IconCheckCircle, IconSparkles } from './Icons'

type Slide = {
  image: string
  badge: { fr: string; en: string }
  title: { fr: string; en: string }
}

const slides: Slide[] = [
  {
    image: '/img/hero-slide-1-clean.webp',
    badge: { fr: 'Mobile & Web', en: 'Mobile & Web' },
    title: { fr: 'Apps natives iOS, Android, PWA', en: 'Native iOS, Android, PWA apps' },
  },
  {
    image: '/img/hero-slide-2-clean.webp',
    badge: { fr: 'Design system', en: 'Design system' },
    title: { fr: 'Identites et produits dessines pour scaler', en: 'Brands and products built to scale' },
  },
  {
    image: '/img/hero-slide-3-clean.webp',
    badge: { fr: 'SaaS & Cloud', en: 'SaaS & Cloud' },
    title: { fr: 'Plateformes qui tournent en production', en: 'Platforms that run in production' },
  },
  {
    image: '/img/hero-slide-4-clean.webp',
    badge: { fr: 'Open Source', en: 'Open Source' },
    title: { fr: 'Six apps MIT, gratuites, auto-hebergeables', en: 'Six MIT apps, free, self-hostable' },
  },
]

export function Hero({ t, lang }: { t: Dictionary; lang: 'fr' | 'en' }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    timer.current = window.setTimeout(() => {
      setActive((a) => (a + 1) % slides.length)
    }, 5500)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [active, paused])

  return (
    <section
      id="top"
      className="relative w-screen overflow-hidden"
      style={{ marginLeft: 'calc(50% - 50vw)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background grid + glow overlays */}
      <div className="absolute inset-0 bg-grid-fade pointer-events-none z-10" aria-hidden />
      <div className="absolute inset-0 bg-lines pointer-events-none z-10" aria-hidden />
      <div className="absolute inset-0 bg-hero-noise opacity-[0.05] pointer-events-none z-10" aria-hidden />

      {/* Slides background — full-bleed, edge to edge */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== active}
          >
            <img
              src={s.image}
              alt={s.title[lang]}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          </div>
        ))}
        {/* Vignette: dark from left to transparent on right for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 via-45% to-ink-950/30 to-80%" aria-hidden />
        {/* Bottom darkening for stats area */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" aria-hidden />
      </div>

      {/* Content layer */}
      <div className="relative z-20 container-x min-h-[88vh] flex flex-col justify-center pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-3xl">
          <span className="chip">
            <IconSparkles size={12} className="text-lime-400" />
            {t.hero.eyebrow}
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
            <span className="block text-white">{t.hero.titleA}</span>
            <span className="block text-white">{t.hero.titleB}</span>
            <span className="block grad-text">{t.hero.titleC}</span>
          </h1>

          <p className="mt-8 text-lg text-white/80 leading-relaxed max-w-xl">{t.hero.subtitle}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#catalog" className="btn-primary">
              {t.hero.cta1}
              <IconArrow size={14} />
            </a>
            <a href="#contact" className="btn-ghost">{t.hero.cta2}</a>
          </div>
        </div>

        {/* Active slide title badge + stats row at the bottom */}
        <div className="mt-12 md:mt-16 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-5">
            {/* Active slide label */}
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-400 animate-pulse" />
              <span className="text-[10px] font-mono text-white/55 tracking-widest uppercase">
                {slides[active].badge[lang]} - {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-semibold text-white">
              {slides[active].title[lang]}
            </h3>

            {/* Dots + progress */}
            <div className="mt-8 flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="group p-1"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === active ? 'w-10 bg-lime-400' : 'w-3 bg-white/20 group-hover:bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 lg:justify-self-end">
            <dl className="grid grid-cols-3 max-w-2xl gap-6 border-t border-white/15 pt-6">
              {t.hero.stats.map((s) => (
                <div key={s.v}>
                  <dt className="font-mono text-2xl md:text-4xl text-white">{s.k}</dt>
                  <dd className="mt-1 text-xs md:text-sm text-white/55">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Floating deploy card overlay (top right) */}
        <div className="hidden md:flex absolute top-28 right-6 lg:right-10 gap-3 items-center rounded-2xl border border-white/10 bg-ink-950/70 backdrop-blur-md p-3.5 shadow-2xl">
          <span className="h-9 w-9 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
            <IconCheckCircle size={16} />
          </span>
          <div>
            <div className="text-[10px] font-mono text-white/45">DEPLOY</div>
            <div className="text-xs text-white">v2.4.1 live</div>
          </div>
        </div>
      </div>

      {/* Bottom progress bar (full-bleed) */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/5 z-20">
        <div
          key={active}
          className="h-full bg-gradient-to-r from-electric-500 to-lime-400"
          style={{
            animation: paused ? 'none' : 'progress 5500ms linear',
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}
