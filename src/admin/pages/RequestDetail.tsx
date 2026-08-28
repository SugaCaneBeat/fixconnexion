import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api, type Request } from '../api'
import { IconArrow, IconMail, IconCheck, IconX } from '../AdminIcons'

const STATUSES = [
  { v: 'nouveau', label: 'Nouveau' },
  { v: 'contacte', label: 'Contacte' },
  { v: 'en_cours', label: 'En cours' },
  { v: 'livre', label: 'Livre' },
  { v: 'refuse', label: 'Refuse' },
]

export function RequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [req, setReq] = useState<Request | null>(null)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('nouveau')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    api.getRequest(Number(id)).then((r) => {
      setReq(r.request)
      setNotes(r.request.notes || '')
      setStatus(r.request.status)
    })
  }, [id])

  async function save() {
    if (!req) return
    setSaving(true)
    setSavedAt(null)
    try {
      const r = await api.updateRequest(req.id, { status, notes })
      setReq(r.request)
      setSavedAt(new Date().toLocaleTimeString('fr-FR'))
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!req) return
    if (!confirm(`Supprimer la demande #${req.id} ?`)) return
    await api.deleteRequest(req.id)
    navigate('/admin/requests')
  }

  if (!req) {
    return <div className="p-8 text-white/40 font-mono text-sm">Chargement...</div>
  }

  return (
    <div className="p-8 max-w-5xl">
      <Link to="/admin/requests" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white mb-6">
        <IconArrow size={14} /> Retour aux demandes
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="font-mono text-xs text-white/40">Demande #{req.id}</div>
          <h1 className="text-3xl font-display font-semibold mt-1">{req.name}</h1>
          <a href={`mailto:${req.email}`} className="text-electric-400 text-sm hover:text-white flex items-center gap-2 mt-2">
            <IconMail size={14} /> {req.email}
          </a>
        </div>
        <button onClick={remove} className="text-white/40 hover:text-coral-400 text-sm flex items-center gap-1.5">
          <IconX size={14} /> Supprimer
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-sm font-mono text-white/55 mb-3">Message</h2>
            <div className="whitespace-pre-wrap text-white/85 leading-relaxed">{req.message}</div>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-mono text-white/55 mb-3">Notes internes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Notes privees, contexte, prochaines etapes..."
              className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            />
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={save}
                disabled={saving}
                className="btn-primary disabled:opacity-60"
              >
                {saving ? 'Sauvegarde...' : (
                  <>
                    <IconCheck size={14} /> Enregistrer
                  </>
                )}
              </button>
              {savedAt && <span className="text-xs text-lime-400 font-mono">Sauvegarde a {savedAt}</span>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="text-xs font-mono text-white/55 mb-2">Statut</div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none"
            >
              {STATUSES.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
            </select>
          </div>

          <div className="card p-5 space-y-3 text-sm">
            <div>
              <div className="text-xs font-mono text-white/45">Societe</div>
              <div className="text-white mt-1">{req.company || '-'}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/45">Budget</div>
              <div className="text-lime-400 font-mono mt-1">{req.budget || '-'}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/45">Source</div>
              <div className="text-white/70 mt-1">{req.source || 'site'}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/45">Cree le</div>
              <div className="text-white/70 mt-1 font-mono text-xs">{new Date(req.created_at).toLocaleString('fr-FR')}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/45">Mis a jour</div>
              <div className="text-white/70 mt-1 font-mono text-xs">{new Date(req.updated_at).toLocaleString('fr-FR')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
