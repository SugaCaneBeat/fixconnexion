import { Router, type Request as ExRequest, type Response } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { db } from '../db.js'
import { signToken, requireAuth, type AuthedRequest } from '../auth.js'

export const authRouter = Router()

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

authRouter.post('/login', (req: ExRequest, res: Response) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Validation failed' })
  const { username, password } = parsed.data
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as
    | { id: number; username: string; password_hash: string }
    | undefined
  if (!admin) return res.status(401).json({ error: 'Identifiants invalides' })
  const ok = bcrypt.compareSync(password, admin.password_hash)
  if (!ok) return res.status(401).json({ error: 'Identifiants invalides' })
  const token = signToken({ id: admin.id, username: admin.username })
  res.json({ token, admin: { id: admin.id, username: admin.username } })
})

authRouter.get('/me', requireAuth, (req: AuthedRequest, res: Response) => {
  res.json({ admin: { id: req.adminId, username: req.adminUsername } })
})
