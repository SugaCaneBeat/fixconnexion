# Fixconnexion

Site institutionnel + dashboard admin pour l'agence **Fixconnexion**. Stack moderne, full TypeScript, deployable en 10 minutes.

## Stack

- **Frontend** : Vite 5 + React 18 + TypeScript + Tailwind 3
- **Backend** : Node 20 + Express + TypeScript + SQLite (better-sqlite3)
- **Auth** : JWT (Bearer token)
- **Email** : Nodemailer (SMTP classique, Gmail / OVH / Infomaniak)
- **i18n** : FR/EN integre (localStorage), pas de dependance externe
- **Deploiement** : Vercel/Netlify pour le front, Railway/Fly/Render pour l'API

## Structure

```
Fixconnexion/
  public/                # favicon, logo SVG, hero slides
  src/
    components/          # Site public : Navbar, Hero, Services, etc.
    admin/               # Dashboard admin (hash routing sous /admin)
      pages/             # Login, Dashboard, Requests, Projects
      AdminApp.tsx       # Router + layout
      api.ts             # Client API
      AdminIcons.tsx     # Icones dediees a l'admin
    locales/             # fr.ts, en.ts
    hooks/               # useI18n
    App.tsx              # Switch public / admin via hash
  server/                # Backend Express
    src/
      routes/            # requests, projects, auth, stats
      templates/         # Templates email
      db.ts              # SQLite + schema + seed admin
      email.ts           # Nodemailer
      auth.ts            # JWT
      index.ts           # Entry point
    data/                # SQLite file (gitignored)
    .env.example         # SMTP + admin credentials
  start.command          # Lanceur macOS (frontend seul)
  start-all.command      # Lanceur macOS (frontend + backend)
  pnpm-workspace.yaml    # Workspace pnpm (root + server)
```

## Demarrage rapide

```bash
# 1. Installer toutes les dependances (root + server)
pnpm install

# 2. Configurer le backend
cp server/.env.example server/.env
# Editer server/.env avec vos identifiants SMTP

# 3. Tout lancer (frontend + API)
./start-all.command
```

- **Site public** : http://localhost:5173
- **API** : http://localhost:3001/api
- **Admin** : http://localhost:5173/#/admin/login (admin / changeme par defaut)

## Configuration SMTP

Le backend envoie deux emails a chaque nouvelle demande :
1. **Auto-reponse** au demandeur (accuse de reception avec reference)
2. **Notification** a l'equipe (NOTIFY_EMAIL dans .env)

Si `SMTP_HOST` n'est pas configure, le serveur fonctionne en **mode mock** : les emails sont journalises en console + stockes en BDD pour preview dans l'admin.

### Exemples de config

**Gmail** (app password obligatoire) :
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=votre@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
```

**OVH** :
```
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@votredomaine.com
SMTP_PASS=xxxx
```

## Deploiement

### Frontend (statique)

```bash
pnpm build
# Deployer dist/ sur Vercel, Netlify, Cloudflare Pages, ou tout hebergeur statique
```

### Backend (Node + SQLite)

Le plus simple : **Railway**, **Fly.io** ou **Render**. Tous supportent SQLite avec un volume persistant.

#### Railway (recommande)

1. Creer un nouveau service depuis ce repo GitHub
2. Root directory : `server`
3. Build command : `pnpm install && pnpm build`
4. Start command : `pnpm start`
5. Variables d'environnement : copier le contenu de `server/.env.example`
6. Ajouter un volume persistant monte sur `/app/data`

#### Fly.io

```bash
fly launch --copy-config
fly volumes create fixconnexion_data --size 1
fly secrets set SMTP_HOST=... SMTP_USER=... SMTP_PASS=...
fly deploy
```

#### Render

1. Web Service depuis ce repo
2. Root : `server`, Build : `pnpm install && pnpm build`, Start : `pnpm start`
3. Disk : 1 GB monte sur `/opt/render/project/src/data`

### Domaine

- Frontend : CNAME `www.fixconnexion.com` vers l'URL de votre hebergement statique
- API : A record `api.fixconnexion.com` vers l'IP Railway/Fly, puis CORS avec `https://www.fixconnexion.com`

## API

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/health | - | Health check |
| POST | /api/requests | - | Soumettre une demande (formulaire public) |
| GET | /api/requests | JWT | Liste des demandes |
| GET | /api/requests/:id | JWT | Detail d'une demande |
| PATCH | /api/requests/:id | JWT | Modifier statut / notes |
| DELETE | /api/requests/:id | JWT | Supprimer une demande |
| GET | /api/projects | JWT | Liste des projets |
| POST | /api/projects | JWT | Creer un projet |
| PATCH | /api/projects/:id | JWT | Modifier un projet |
| DELETE | /api/projects/:id | JWT | Supprimer un projet |
| POST | /api/auth/login | - | Login admin (retourne JWT) |
| GET | /api/auth/me | JWT | Verifier le token |
| GET | /api/stats | JWT | Stats dashboard |

## Licence

MIT.
