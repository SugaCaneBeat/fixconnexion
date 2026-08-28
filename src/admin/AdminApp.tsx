import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'
import { api } from './api'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Requests } from './pages/Requests'
import { RequestDetail } from './pages/RequestDetail'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { IconGrid, IconBox, IconRoute, IconUsers, IconLogOut, IconArrow, IconSettings } from './AdminIcons'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('fx-admin-token')
  const location = useLocation()
  if (!token) return <Navigate to="/admin/login" replace state={{ from: location }} />
  return children
}

function AdminLayout({ children }: { children: JSX.Element }) {
  const [me, setMe] = useState<{ username: string } | null>(null)
  useEffect(() => {
    api.me().then((r) => setMe(r.admin)).catch(() => {})
  }, [])

  const linkBase = 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors'
  const linkActive = 'bg-electric-500/10 text-white border border-electric-500/30'

  return (
    <div className="min-h-screen bg-ink-950 text-white flex">
      <aside className="w-64 border-r border-white/5 bg-ink-900/40 p-4 flex flex-col">
        <a href="#/" className="flex items-center gap-2 px-2 py-2 mb-6">
          <img src="/logo.svg" alt="Fixconnexion" className="h-7" />
        </a>
        <nav className="flex flex-col gap-1 flex-1">
          <NavLink to="/admin" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
            <IconGrid size={16} /> Dashboard
          </NavLink>
          <NavLink to="/admin/requests" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
            <IconBox size={16} /> Demandes
          </NavLink>
          <NavLink to="/admin/projects" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
            <IconRoute size={16} /> Projets
          </NavLink>
          <NavLink to="/admin/team" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
            <IconUsers size={16} /> Equipe
          </NavLink>
        </nav>
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="px-2 mb-2 text-xs text-white/40">
            Connecte : <span className="text-white/80">{me?.username || 'admin'}</span>
          </div>
          <button
            onClick={() => { localStorage.removeItem('fx-admin-token'); window.location.hash = '#/admin/login' }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5"
          >
            <IconLogOut size={14} /> Deconnexion
          </button>
          <a href="#/" className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5">
            <IconArrow size={14} /> Voir le site
          </a>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

export function AdminApp() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><AdminLayout><Dashboard /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/requests" element={<PrivateRoute><AdminLayout><Requests /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/requests/:id" element={<PrivateRoute><AdminLayout><RequestDetail /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/projects" element={<PrivateRoute><AdminLayout><Projects /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/projects/new" element={<PrivateRoute><AdminLayout><ProjectDetail mode="new" /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/projects/:id" element={<PrivateRoute><AdminLayout><ProjectDetail mode="edit" /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/team" element={<PrivateRoute><AdminLayout><TeamPlaceholder /></AdminLayout></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </HashRouter>
  )
}

function TeamPlaceholder() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-display font-semibold mb-4">Equipe</h1>
      <p className="text-white/60">Gestion multi-utilisateurs disponible en V2. En V1, l'acces est mono-admin via les variables d'environnement du serveur.</p>
      <div className="mt-6 card p-5">
        <div className="flex items-center gap-2 text-electric-400 mb-2">
          <IconSettings size={16} /> Configuration
        </div>
        <p className="text-sm text-white/60 leading-relaxed">
          Pour ajouter un admin : modifier <code className="text-lime-400">server/.env</code> puis executer la commande de seed du backend.
          Documentation complete dans <code className="text-lime-400">server/README.md</code>.
        </p>
      </div>
    </div>
  )
}
