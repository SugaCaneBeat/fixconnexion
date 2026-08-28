const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export type Request = {
  id: number
  name: string
  email: string
  company: string | null
  budget: string | null
  message: string
  status: 'nouveau' | 'contacte' | 'en_cours' | 'livre' | 'refuse'
  notes: string | null
  source: string | null
  created_at: string
  updated_at: string
}

export type Project = {
  id: number
  name: string
  client: string
  description: string | null
  status: 'en_cours' | 'livre' | 'pause' | 'annule'
  budget: number | null
  start_date: string | null
  end_date: string | null
  request_id: number | null
  created_at: string
  updated_at: string
}

export type Stats = {
  totals: {
    total_requests: number
    total_projects: number
    requests_7d: number
    requests_30d: number
  }
  requestsByStatus: { status: string; count: number }[]
  projectsByStatus: { status: string; count: number }[]
  recent: Request[]
  recentProjects: Project[]
}

function getToken(): string | null {
  return localStorage.getItem('fx-admin-token')
}

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string> | undefined),
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers })
  if (res.status === 401) {
    localStorage.removeItem('fx-admin-token')
    window.location.hash = '#/admin/login'
    throw new Error('Unauthorized')
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(data.error || 'Request failed')
  }
  if (res.status === 204) return null as T
  return res.json()
}

export const api = {
  // Public
  submitRequest: (data: { name: string; email: string; company?: string; budget?: string; message: string }) =>
    request<{ id: number; status: string }>('/requests', { method: 'POST', body: JSON.stringify(data) }),

  // Auth
  login: (username: string, password: string) =>
    request<{ token: string; admin: { id: number; username: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  me: () => request<{ admin: { id: number; username: string } }>('/auth/me'),

  // Requests
  listRequests: (status?: string) =>
    request<{ requests: Request[] }>(`/requests${status ? `?status=${status}` : ''}`),
  getRequest: (id: number) => request<{ request: Request }>(`/requests/${id}`),
  updateRequest: (id: number, data: { status?: string; notes?: string | null }) =>
    request<{ request: Request }>(`/requests/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteRequest: (id: number) => request<null>(`/requests/${id}`, { method: 'DELETE' }),

  // Projects
  listProjects: (status?: string) =>
    request<{ projects: Project[] }>(`/projects${status ? `?status=${status}` : ''}`),
  getProject: (id: number) => request<{ project: Project }>(`/projects/${id}`),
  createProject: (data: Partial<Project>) =>
    request<{ project: Project }>('/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: number, data: Partial<Project>) =>
    request<{ project: Project }>(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteProject: (id: number) => request<null>(`/projects/${id}`, { method: 'DELETE' }),

  // Stats
  getStats: () => request<Stats>('/stats'),
}
