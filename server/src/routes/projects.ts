import { Router, type Request as ExRequest, type Response } from 'express'
import { z } from 'zod'
import { db, type Project } from '../db.js'
import { requireAuth } from '../auth.js'

export const projectsRouter = Router()

const PROJECT_STATUSES = ['en_cours', 'livre', 'pause', 'annule'] as const

const createSchema = z.object({
  name: z.string().min(2).max(160),
  client: z.string().min(1).max(160),
  description: z.string().max(2000).optional().nullable(),
  status: z.enum(PROJECT_STATUSES).default('en_cours'),
  budget: z.number().nonnegative().optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  request_id: z.number().int().optional().nullable(),
})

const updateSchema = createSchema.partial()

projectsRouter.get('/', requireAuth, (req, res) => {
  const status = req.query.status as string | undefined
  let rows: Project[]
  if (status && PROJECT_STATUSES.includes(status as any)) {
    rows = db.prepare('SELECT * FROM projects WHERE status = ? ORDER BY updated_at DESC').all(status) as Project[]
  } else {
    rows = db.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all() as Project[]
  }
  res.json({ projects: rows })
})

projectsRouter.get('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project | undefined
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json({ project: row })
})

projectsRouter.post('/', requireAuth, (req, res) => {
  const parsed = createSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
  const d = parsed.data
  const info = db.prepare(`
    INSERT INTO projects (name, client, description, status, budget, start_date, end_date, request_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    d.name, d.client, d.description ?? null, d.status,
    d.budget ?? null, d.start_date ?? null, d.end_date ?? null, d.request_id ?? null
  )
  const id = Number(info.lastInsertRowid)
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project
  res.status(201).json({ project: row })
})

projectsRouter.patch('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project | undefined
  if (!existing) return res.status(404).json({ error: 'Not found' })
  const parsed = updateSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
  const d = parsed.data
  const next = {
    name: d.name ?? existing.name,
    client: d.client ?? existing.client,
    description: d.description !== undefined ? d.description : existing.description,
    status: d.status ?? existing.status,
    budget: d.budget !== undefined ? d.budget : existing.budget,
    start_date: d.start_date !== undefined ? d.start_date : existing.start_date,
    end_date: d.end_date !== undefined ? d.end_date : existing.end_date,
    request_id: d.request_id !== undefined ? d.request_id : existing.request_id,
  }
  db.prepare(`
    UPDATE projects
    SET name=?, client=?, description=?, status=?, budget=?, start_date=?, end_date=?, request_id=?, updated_at=datetime('now')
    WHERE id=?
  `).run(next.name, next.client, next.description, next.status, next.budget, next.start_date, next.end_date, next.request_id, id)
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project
  res.json({ project: row })
})

projectsRouter.delete('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const info = db.prepare('DELETE FROM projects WHERE id = ?').run(id)
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' })
  res.status(204).end()
})
