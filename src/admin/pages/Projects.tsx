import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Project } from '../api'
import { IconPlus, IconBriefcase } from '../AdminIcons'

const STATUSES = [
  { v: 'en_cours', label: 'En cours', color: 'bg-electric-500/10 text-electric-400 border-electric-500/30' },
  { v: 'livre', label: 'Livre', color: 'bg-lime-400/10 text-lime-400 border-lime-400/30' },
  { v: 'pause', label: 'Pause', color: 'bg-coral-400/10 text-coral-400 border-coral-400/30' },
  { v: 'annule', label: 'Annule', color: 'bg-white/5 text-white/45 border-white/10' },
]

function statusMeta(s: string) {
  return STATUSES.find((x) => x.v === s) || STATUSES[0]
}

export function Projects() {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  function refresh() {
    setLoading(true)
    api.listProjects().then((r) => setItems(r.projects)).finally(() => setLoading(false))
  }

  useEffect(refresh, [])

  // Group by status
  const groups = STATUSES.map((s) => ({
    ...s,
    items: items.filter((p) => p.status === s.v),
  }))

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-semibold">Projets</h1>
          <p className="text-white/55 mt-1">{items.length} projet{items.length > 1 ? 's' : ''}</p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary text-sm">
          <IconPlus size={14} /> Nouveau projet
        </Link>
      </div>

      {loading ? (
        <div className="text-white/40 font-mono text-sm">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {groups.map((g) => (
            <div key={g.v}>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${g.color}`}>
                  {g.label}
                </span>
                <span className="text-xs font-mono text-white/40">{g.items.length}</span>
              </div>
              <div className="space-y-2 min-h-[200px]">
                {g.items.length === 0 ? (
                  <div className="card p-4 text-center text-white/30 text-xs font-mono">vide</div>
                ) : g.items.map((p) => (
                  <Link
                    key={p.id}
                    to={`/admin/projects/${p.id}`}
                    className="card p-4 block hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-electric-400 shrink-0">
                        <IconBriefcase size={14} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium truncate">{p.name}</div>
                        <div className="text-xs text-white/45 truncate">{p.client}</div>
                        {p.budget && <div className="text-[10px] font-mono text-lime-400 mt-1">{p.budget.toLocaleString('fr-FR')} EUR</div>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
