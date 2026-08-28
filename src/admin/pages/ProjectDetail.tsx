import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { api, type Project } from '../api'
import { IconArrow, IconCheck, IconX } from '../AdminIcons'

const STATUSES = [
  { v: 'en_cours', label: 'En cours' },
  { v: 'livre', label: 'Livre' },
  { v: 'pause', label: 'Pause' },
  { v: 'annule', label: 'Annule' },
]

export function ProjectDetail({ mode }: { mode: 'new' | 'edit' }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [name, setName] = useState('')
  const [client, setClient] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('en_cours')
  const [budget, setBudget] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && id) {
      api.getProject(Number(id)).then((r) => {
        const p = r.project
        setProject(p)
        setName(p.name)
        setClient(p.client)
        setDescription(p.description || '')
        setStatus(p.status)
        setBudget(p.budget?.toString() || '')
        setStartDate(p.start_date || '')
        setEndDate(p.end_date || '')
      })
    }
  }, [id, mode])

  async function save() {
    setSaving(true)
    try {
      const payload = {
        name,
        client,
        description: description || null,
        status: status as Project['status'],
        budget: budget ? Number(budget) : null,
        start_date: startDate || null,
        end_date: endDate || null,
      }
      if (mode === 'new') {
        const r = await api.createProject(payload)
        navigate(`/admin/projects/${r.project.id}`)
      } else if (project) {
        const r = await api.updateProject(project.id, payload)
        setProject(r.project)
      }
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!project) return
    if (!confirm(`Supprimer le projet "${project.name}" ?`)) return
    await api.deleteProject(project.id)
    navigate('/admin/projects')
  }

  return (
    <div className="p-8 max-w-3xl">
      <Link to="/admin/projects" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white mb-6">
        <IconArrow size={14} /> Retour aux projets
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="font-mono text-xs text-white/40">{mode === 'new' ? 'Nouveau projet' : `Projet #${project?.id}`}</div>
          <h1 className="text-3xl font-display font-semibold mt-1">{name || 'Sans nom'}</h1>
        </div>
        {mode === 'edit' && (
          <button onClick={remove} className="text-white/40 hover:text-coral-400 text-sm flex items-center gap-1.5">
            <IconX size={14} /> Supprimer
          </button>
        )}
      </div>

      <div className="card p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-white/55 mb-2">Nom du projet</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20" />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/55 mb-2">Client</label>
            <input value={client} onChange={(e) => setClient(e.target.value)} required
              className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-white/55 mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
            className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20" />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-white/55 mb-2">Statut</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white">
              {STATUSES.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-white/55 mb-2">Budget (EUR)</label>
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/55 mb-2">Debut</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none" />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center gap-3">
          <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Sauvegarde...' : (
              <><IconCheck size={14} /> {mode === 'new' ? 'Creer le projet' : 'Enregistrer'}</>
            )}
          </button>
          <Link to="/admin/projects" className="text-sm text-white/55 hover:text-white">Annuler</Link>
        </div>
      </div>
    </div>
  )
}
