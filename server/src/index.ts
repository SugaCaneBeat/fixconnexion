import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initSchema } from './db.js'
import { requestsRouter } from './routes/requests.js'
import { projectsRouter } from './routes/projects.js'
import { authRouter } from './routes/auth.js'
import { statsRouter } from './routes/stats.js'
import { isSmtpReady } from './email.js'

const app = express()
const PORT = Number(process.env.PORT || 3001)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({ origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:4173'], credentials: true }))
app.use(express.json({ limit: '1mb' }))

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, smtp: isSmtpReady(), env: process.env.NODE_ENV || 'development' })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/requests', requestsRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/stats', statsRouter)

// 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server] error:', err)
  res.status(500).json({ error: 'Internal server error', message: err.message })
})

initSchema()
app.listen(PORT, () => {
  console.log(`\n=================================`)
  console.log(`  Fixconnexion API`)
  console.log(`  http://localhost:${PORT}/api`)
  console.log(`  SMTP : ${isSmtpReady() ? 'OK' : 'non configure (mode mock)'}`)
  console.log(`=================================\n`)
})
