import { Router, type Request as ExRequest, type Response } from 'express'
import { db } from '../db.js'
import { requireAuth } from '../auth.js'

export const statsRouter = Router()

statsRouter.get('/', requireAuth, (_req: ExRequest, res: Response) => {
  const requestsByStatus = db.prepare(`
    SELECT status, COUNT(*) as count
    FROM requests
    GROUP BY status
  `).all()

  const projectsByStatus = db.prepare(`
    SELECT status, COUNT(*) as count
    FROM projects
    GROUP BY status
  `).all()

  const totals = db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM requests) as total_requests,
      (SELECT COUNT(*) FROM projects) as total_projects,
      (SELECT COUNT(*) FROM requests WHERE created_at >= datetime('now', '-7 days')) as requests_7d,
      (SELECT COUNT(*) FROM requests WHERE created_at >= datetime('now', '-30 days')) as requests_30d
  `).get() as {
    total_requests: number
    total_projects: number
    requests_7d: number
    requests_30d: number
  }

  const recent = db.prepare(`
    SELECT * FROM requests ORDER BY created_at DESC LIMIT 5
  `).all()

  const recentProjects = db.prepare(`
    SELECT * FROM projects ORDER BY updated_at DESC LIMIT 5
  `).all()

  res.json({
    totals,
    requestsByStatus,
    projectsByStatus,
    recent,
    recentProjects,
  })
})
