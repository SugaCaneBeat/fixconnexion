import nodemailer, { type Transporter } from 'nodemailer'
import { db } from './db.js'

let transporter: Transporter | null = null
let smtpConfigured = false

function getTransporter(): Transporter | null {
  if (transporter) return transporter
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) {
    smtpConfigured = false
    return null
  }
  transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user, pass },
  })
  smtpConfigured = true
  return transporter
}

export type EmailKind = 'auto_reply' | 'notify_team'

export async function sendEmail(opts: {
  to: string
  subject: string
  html: string
  text: string
  kind: EmailKind
  requestId?: number
}): Promise<{ ok: boolean; error?: string }> {
  const from = process.env.SMTP_FROM || `Fixconnexion <${process.env.SMTP_USER || 'noreply@fixconnexion.com'}>`
  const t = getTransporter()
  const status = t ? 'pending' : 'mock'
  const logStmt = db.prepare(`
    INSERT INTO email_logs (to_email, subject, body, kind, status, request_id, error)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  if (!t) {
    // Mock mode: log to console + DB
    console.log('\n========== [MOCK EMAIL] ==========')
    console.log(`From:    ${from}`)
    console.log(`To:      ${opts.to}`)
    console.log(`Subject: ${opts.subject}`)
    console.log(`Kind:    ${opts.kind}`)
    console.log('--- Text ---')
    console.log(opts.text)
    console.log('===================================\n')
    logStmt.run(opts.to, opts.subject, opts.text, opts.kind, 'mock', opts.requestId ?? null, 'SMTP non configure, email en mode mock')
    return { ok: true, error: 'mock' }
  }

  try {
    await t.sendMail({ from, to: opts.to, subject: opts.subject, html: opts.html, text: opts.text })
    logStmt.run(opts.to, opts.subject, opts.text, opts.kind, 'sent', opts.requestId ?? null, null)
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    logStmt.run(opts.to, opts.subject, opts.text, opts.kind, 'failed', opts.requestId ?? null, message)
    console.error('[email] send failed:', message)
    return { ok: false, error: message }
  }
}

export function isSmtpReady() {
  getTransporter()
  return smtpConfigured
}
