import { Router, type Request as ExRequest, type Response, type NextFunction } from 'express'
import { z } from 'zod'
import { db, type Request } from '../db.js'
import { requireAuth, type AuthedRequest } from '../auth.js'
import { sendEmail } from '../email.js'
import { autoReplyEmail, notifyTeamEmail } from '../templates/email.js'

export const requestsRouter = Router()

const REQUEST_STATUSES = ['nouveau', 'contacte', 'en_cours', 'livre', 'refuse'] as const

const createSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(200).optional().nullable(),
  budget: z.string().max(50).optional().nullable(),
  message: z.string().min(10).max(5000),
})

const updateSchema = z.object({
  status: z.enum(REQUEST_STATUSES).optional(),
  notes: z.string().max(5000).optional().nullable(),
})

// POST /api/requests  (PUBLIC - depuis le formulaire de contact)
requestsRouter.post('/', (req, res) => {
  const parsed = createSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
  }
  const { name, email, company, budget, message } = parsed.data
  const stmt = db.prepare(`
    INSERT INTO requests (name, email, company, budget, message)
    VALUES (?, ?, ?, ?, ?)
  `)
  const info = stmt.run(name, email, company ?? null, budget ?? null, message)
  const id = Number(info.lastInsertRowid)

  // Envoi des emails (auto-reponse + notification equipe)
  const payload = { name, email, company, budget, message, requestId: id }
  const auto = autoReplyEmail(payload)
  sendEmail({ to: email, subject: auto.subject, html: auto.html, text: auto.text, kind: 'auto_reply', requestId: id })
    .catch((e) => console.error('[requests] auto-reply error', e))

  const notifyTo = process.env.NOTIFY_EMAIL || process.env.SMTP_USER
  if (notifyTo) {
    const team = notifyTeamEmail(payload)
    sendEmail({ to: notifyTo, subject: team.subject, html: team.html, text: team.text, kind: 'notify_team', requestId: id })
      .catch((e) => console.error('[requests] notify error', e))
  }

  res.status(201).json({ id, status: 'nouveau' })
})

// GET /api/requests  (ADMIN)
requestsRouter.get('/', requireAuth, (req: ExRequest, res: Response) => {
  const status = req.query.status as string | undefined
  let rows: Request[]
  if (status && REQUEST_STATUSES.includes(status as any)) {
    rows = db.prepare('SELECT * FROM requests WHERE status = ? ORDER BY created_at DESC').all(status) as Request[]
  } else {
    rows = db.prepare('SELECT * FROM requests ORDER BY created_at DESC').all() as Request[]
  }
  res.json({ requests: rows })
})

// GET /api/requests/:id  (ADMIN)
requestsRouter.get('/:id', requireAuth, (req: ExRequest, res: Response) => {
  const id = Number(req.params.id)
  const row = db.prepare('SELECT * FROM requests WHERE id = ?').get(id) as Request | undefined
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json({ request: row })
})

// PATCH /api/requests/:id  (ADMIN)
requestsRouter.patch('/:id', requireAuth, (req: ExRequest, res: Response) => {
  const id = Number(req.params.id)
  const parsed = updateSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })

  const existing = db.prepare('SELECT * FROM requests WHERE id = ?').get(id) as Request | undefined
  if (!existing) return res.status(404).json({ error: 'Not found' })

  const next = {
    status: parsed.data.status ?? existing.status,
    notes: parsed.data.notes !== undefined ? parsed.data.notes : existing.notes,
  }
  db.prepare(`
    UPDATE requests
    SET status = ?, notes = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(next.status, next.notes, id)

  const row = db.prepare('SELECT * FROM requests WHERE id = ?').get(id) as Request
  res.json({ request: row })
})

// DELETE /api/requests/:id  (ADMIN)
requestsRouter.delete('/:id', requireAuth, (req: ExRequest, res: Response) => {
  const id = Number(req.params.id)
  const info = db.prepare('DELETE FROM requests WHERE id = ?').run(id)
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' })
  res.status(204).end()
})
