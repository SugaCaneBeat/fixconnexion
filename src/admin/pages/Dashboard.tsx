import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Stats } from '../api'
import { IconBox, IconRoute, IconCheck, IconMail, IconArrow, IconClock } from '../AdminIcons'

function statusLabel(s: string, lang = 'fr') {
  const labels: Record<string, Record<string, string>> = {
    fr: { nouveau: 'Nouveau', contacte: 'Contacte', en_cours: 'En cours', livre: 'Livre', refuse: 'Refuse', pause: 'Pause', annule: 'Annule' },
    en: { nouveau: 'New', contacte: 'Contacted', en_cours: 'In progress', livre: 'Delivered', refuse: 'Declined', pause: 'Paused', annule: 'Cancelled' },
  }
  return labels[lang][s] || s
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return "a l'instant"
  if (min < 60) return `il y a ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `il y a ${h} h`
  const d = Math.floor(h / 24)
  return `il y a ${d} j`
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getStats().then(setStats).finally(() => setLoading(false))
  }, [])

  if (loading || !stats) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-white/40 font-mono text-sm">Chargement...</div>
      </div>
    )
  }

  const cards = [
    { label: 'Demandes total', value: stats.totals.total_requests, sub: `${stats.totals.requests_7d} cette semaine`, Icon: IconBox, color: 'electric' },
    { label: 'Projets en cours', value: stats.totals.total_projects, sub: 'Tous statuts confondus', Icon: IconRoute, color: 'lime' },
    { label: 'Demandes 7 jours', value: stats.totals.requests_7d, sub: 'Nouveaux leads', Icon: IconMail, color: 'coral' },
    { label: 'Demandes 30 jours', value: stats.totals.requests_30d, sub: 'Tendance', Icon: IconClock, color: 'electric' },
  ]

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold">Dashboard</h1>
        <p className="text-white/55 mt-1">Vue d'ensemble de l'activite</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="h-10 w-10 rounded-xl bg-electric-500/10 border border-electric-500/30 text-electric-400 flex items-center justify-center">
                <c.Icon size={18} />
              </span>
            </div>
            <div className="mt-5">
              <div className="font-mono text-3xl text-white">{c.value}</div>
              <div className="text-sm text-white/60 mt-1">{c.label}</div>
              <div className="text-xs text-white/40 mt-1 font-mono">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Demandes recentes</h2>
            <Link to="/admin/requests" className="text-sm text-electric-400 flex items-center gap-1 hover:text-white">
              Voir tout <IconArrow size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {stats.recent.length === 0 ? (
              <div className="text-white/40 text-sm font-mono py-6 text-center">Aucune demande</div>
            ) : stats.recent.map((r) => (
              <Link
                key={r.id}
                to={`/admin/requests/${r.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className={`h-2 w-2 rounded-full ${r.status === 'nouveau' ? 'bg-lime-400' : 'bg-white/30'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{r.name}</div>
                  <div className="text-xs text-white/45 truncate">{r.email}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] font-mono text-white/55">{statusLabel(r.status)}</div>
                  <div className="text-[10px] font-mono text-white/35">{timeAgo(r.created_at)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Projets recents</h2>
            <Link to="/admin/projects" className="text-sm text-electric-400 flex items-center gap-1 hover:text-white">
              Voir tout <IconArrow size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {stats.recentProjects.length === 0 ? (
              <div className="text-white/40 text-sm font-mono py-6 text-center">Aucun projet</div>
            ) : stats.recentProjects.map((p) => (
              <Link
                key={p.id}
                to={`/admin/projects/${p.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="h-10 w-10 rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center text-xs font-mono">
                  #{p.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{p.name}</div>
                  <div className="text-xs text-white/45 truncate">{p.client}</div>
                </div>
                <div className="text-[10px] font-mono text-white/55">{statusLabel(p.status)}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
