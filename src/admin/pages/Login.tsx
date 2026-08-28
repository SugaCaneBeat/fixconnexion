import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const r = await api.login(username, password)
      localStorage.setItem('fx-admin-token', r.token)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="Fixconnexion" className="h-8" />
        </div>
        <form onSubmit={onSubmit} className="card p-8">
          <h1 className="text-xl font-display font-semibold mb-1">Espace admin</h1>
          <p className="text-sm text-white/55 mb-6">Connectez-vous pour gerer demandes et projets.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/55 mb-2">Identifiant</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/55 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl bg-ink-800/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
              />
            </div>
            {error && (
              <div className="text-sm text-coral-400 bg-coral-500/10 border border-coral-500/30 rounded-lg px-3 py-2">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-lime-400 text-ink-950 font-medium py-3 hover:bg-lime-500 transition-colors disabled:opacity-60"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-white/35 mt-6 font-mono">
          <a href="#/" className="hover:text-white">retour au site</a>
        </p>
      </div>
    </div>
  )
}
