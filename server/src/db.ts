import Database from 'better-sqlite3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'fixconnexion.db')

export const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      budget TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'nouveau',
      notes TEXT,
      source TEXT DEFAULT 'site',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      client TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'en_cours',
      budget REAL,
      start_date TEXT,
      end_date TEXT,
      request_id INTEGER REFERENCES requests(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS email_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      to_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT,
      kind TEXT NOT NULL,
      status TEXT NOT NULL,
      error TEXT,
      request_id INTEGER REFERENCES requests(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
    CREATE INDEX IF NOT EXISTS idx_requests_created ON requests(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
  `)

  // Seed admin if none exists
  const adminCount = db.prepare('SELECT COUNT(*) as c FROM admins').get() as { c: number }
  if (adminCount.c === 0) {
    const username = process.env.ADMIN_USERNAME || 'admin'
    const password = process.env.ADMIN_PASSWORD || 'changeme'
    const hash = bcrypt.hashSync(password, 10)
    db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(username, hash)
    console.log(`[db] Admin cree : ${username} / ${password}  (changez dans .env)`)
  }
}

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
