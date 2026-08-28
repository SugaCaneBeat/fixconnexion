import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Request } from '../api'
import { IconSearch, IconPlus } from '../AdminIcons'

const STATUSES = [
  { v: '', label: 'Tous' },
  { v: 'nouveau', label: 'Nouveau' },
  { v: 'contacte', label: 'Contacte' },
  { v: 'en_cours', label: 'En cours' },
  { v: 'livre', label: 'Livre' },
  { v: 'refuse', label: 'Refuse' },
]

function statusColor(s: string) {
  return {
    nouveau: 'bg-lime-400/10 text-lime-400 border-lime-400/30',
    contacte: 'bg-electric-500/10 text-electric-400 border-electric-500/30',
    en_cours: 'bg-coral-400/10 text-coral-400 border-coral-400/30',
    livre: 'bg-lime-400/10 text-lime-400 border-lime-400/30',
    refuse: 'bg-white/5 text-white/45 border-white/10',
  }[s] || ''
}

export function Requests() {
  const [items, setItems] = useState<Request[]>([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.listRequests(filter || undefined).then((r) => setItems(r.requests)).finally(() => setLoading(false))
  }, [filter])

  const filtered = search
    ? items.filter((r) => [r.name, r.email, r.company, r.message].join(' ').toLowerCase().includes(search.toLowerCase()))
    : items

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-semibold">Demandes</h1>
          <p className="text-white/55 mt-1">{items.length} demande{items.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 bg-ink-800/60 border border-white/10 rounded-lg px-3 py-2">
          <IconSearch size={14} className="text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, email, societe..."
            className="bg-transparent flex-1 text-sm text-white outline-none placeholder-white/30"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s.v}
              onClick={() => setFilter(s.v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                filter === s.v
                  ? 'bg-electric-500/10 border-electric-500/30 text-electric-400'
                  : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-white/55 text-xs font-mono">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Nom</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Societe</th>
              <th className="text-left px-4 py-3">Budget</th>
              <th className="text-left px-4 py-3">Statut</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center text-white/40 py-8 font-mono text-xs">Chargement...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center text-white/40 py-8 font-mono text-xs">Aucune demande</td></tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-mono text-white/40 text-xs">#{r.id}</td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/requests/${r.id}`} className="text-white hover:text-lime-400">{r.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    <a href={`mailto:${r.email}`} className="hover:text-electric-400">{r.email}</a>
                  </td>
                  <td className="px-4 py-3 text-white/60">{r.company || '-'}</td>
                  <td className="px-4 py-3 text-lime-400 font-mono text-xs">{r.budget || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusColor(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/45 text-xs font-mono">
                    {new Date(r.created_at).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
