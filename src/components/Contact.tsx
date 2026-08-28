import { useState, type FormEvent } from 'react'
import type { Dictionary } from '../hooks/useI18n'
import { api } from '../admin/api'

export function Contact({ t }: { t: Dictionary }) {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<{ id: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      company: String(fd.get('company') || '').trim() || undefined,
      budget: String(fd.get('budget') || '').trim() || undefined,
      message: String(fd.get('message') || '').trim(),
    }
    try {
      const r = await api.submitRequest(payload)
      setSent({ id: r.id })
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur reseau')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-ink-900/30 border-y border-white/5 relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-electric-500/20 blur-3xl pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="chip">{t.contact.eyebrow}</span>
            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              {t.contact.title}
            </h2>
            <p className="mt-5 text-lg text-white/65">{t.contact.subtitle}</p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <span className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-electric-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <a href="mailto:hello@fixconnexion.com" className="hover:text-white">hello@fixconnexion.com</a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <span className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-electric-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                <span>Discord & Slack: @fixconnexion</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <span className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-electric-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <a href="https://www.fixconnexion.com" className="hover:text-white">www.fixconnexion.com</a>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="card p-7 md:p-8">
            {sent ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="h-14 w-14 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="mt-5 text-white text-lg">{t.contact.success}</p>
                <p className="mt-2 text-sm text-white/55 font-mono">Reference #{sent.id}</p>
                <button
                  type="button"
                  onClick={() => setSent(null)}
                  className="mt-6 text-sm text-white/60 hover:text-white underline underline-offset-4"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={t.contact.name} name="name" required />
                  <Field label={t.contact.email} name="email" type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={t.contact.company} name="company" />
                  <SelectField
                    label={t.contact.budget}
                    name="budget"
                    options={[
                      '< 10k EUR',
                      '10k - 30k EUR',
                      '30k - 80k EUR',
                      '80k - 200k EUR',
                      '> 200k EUR',
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/55 mb-2">{t.contact.message}</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20 transition"
                  />
                </div>
                {error && (
                  <div className="text-sm text-coral-400 bg-coral-500/10 border border-coral-500/30 rounded-lg px-3 py-2">{error}</div>
                )}
                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
                  {submitting ? t.contact.sending : t.contact.send}
                </button>
                <p className="text-xs text-white/40 text-center">{t.contact.direct} hello@fixconnexion.com</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-mono text-white/55 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20 transition"
      />
    </div>
  )
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-mono text-white/55 mb-2">{label}</label>
      <select
        name={name}
        className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20 transition"
        defaultValue=""
      >
        <option value="" disabled>-</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}
