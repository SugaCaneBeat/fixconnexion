export type App = {
  slug: string
  name: string
  tag: { fr: string; en: string }
  desc: { fr: string; en: string }
  category: { fr: string; en: string }
  status: 'stable' | 'beta' | 'new'
  platform: ('iOS' | 'Android' | 'macOS' | 'Web' | 'Linux' | 'Windows')[]
  hue: string
  image: string
}

export const apps: App[] = [
  {
    slug: 'fixmail',
    name: 'FixMail',
    tag: { fr: 'Boite mail minimale', en: 'Minimalist mail client' },
    desc: {
      fr: 'Client mail desktop, ultra rapide, auto-hebergezable. Tri par IA, raccourcis clavier, zero tracker.',
      en: 'Blazing-fast desktop mail client, self-hostable. AI sorting, keyboard-first, zero tracker.',
    },
    category: { fr: 'Productivite', en: 'Productivity' },
    status: 'stable',
    platform: ['macOS', 'Linux', 'Windows'],
    hue: 'from-electric-500/40 to-electric-700/10',
    image: '/img/app-fixmail-v2-clean.webp',
  },
  {
    slug: 'fixnote',
    name: 'FixNote',
    tag: { fr: 'Notes chiffrees', en: 'Encrypted notes' },
    desc: {
      fr: 'Notes en markdown chiffrees bout en bout, synchronisation E2EE, compatible Obsidian et Notion en import.',
      en: 'End-to-end encrypted markdown notes, E2EE sync, Obsidian and Notion import compatible.',
    },
    category: { fr: 'Productivite', en: 'Productivity' },
    status: 'stable',
    platform: ['iOS', 'Android', 'macOS', 'Web'],
    hue: 'from-lime-500/30 to-electric-500/10',
    image: '/img/app-fixnote-v2-clean.webp',
  },
  {
    slug: 'fixtask',
    name: 'FixTask',
    tag: { fr: 'Task manager solo', en: 'Solo task manager' },
    desc: {
      fr: 'Gestionnaire de taches GTD ultra simple. CLI, web, mobile. Synchronisation via fichier plat.',
      en: 'Ultra-simple GTD task manager. CLI, web, mobile. Sync through plain file.',
    },
    category: { fr: 'Productivite', en: 'Productivity' },
    status: 'beta',
    platform: ['iOS', 'Android', 'Web', 'Linux'],
    hue: 'from-coral-500/30 to-electric-500/10',
    image: '/img/app-fixtask-v2-clean.webp',
  },
  {
    slug: 'fixmedia',
    name: 'FixMedia',
    tag: { fr: 'Bibliotheque media', en: 'Media library' },
    desc: {
      fr: 'Self-hosted Plex-like, mais leger. Films, series, livres, musique, photos. Interface moderne et rapide.',
      en: 'Self-hosted Plex-like, lightweight. Movies, shows, books, music, photos. Modern and fast UI.',
    },
    category: { fr: 'Multimedia', en: 'Media' },
    status: 'new',
    platform: ['Web', 'iOS', 'Android', 'macOS'],
    hue: 'from-electric-500/40 to-coral-500/20',
    image: '/img/app-fixmedia-v2-clean.webp',
  },
  {
    slug: 'fixvault',
    name: 'FixVault',
    tag: { fr: 'Coffre-fort numerique', en: 'Digital vault' },
    desc: {
      fr: 'Gestionnaire de mots de passe et secrets d equipe. Partage chiffre, audit, export, CLI, browser extension.',
      en: 'Password and team secrets manager. Encrypted sharing, audit, export, CLI, browser extension.',
    },
    category: { fr: 'Securite', en: 'Security' },
    status: 'stable',
    platform: ['Web', 'iOS', 'Android', 'macOS', 'Linux'],
    hue: 'from-lime-500/30 to-electric-700/20',
    image: '/img/app-fixvault-v2-clean.webp',
  },
  {
    slug: 'fixchat',
    name: 'FixChat',
    tag: { fr: 'Messagerie d equipe', en: 'Team messaging' },
    desc: {
      fr: 'Slack-like pour petites equipes. Canaux, DM, fichiers, visio integree. Hebergez chez vous, gardez le controle.',
      en: 'Slack-like for small teams. Channels, DMs, files, built-in video. Self-host and keep control.',
    },
    category: { fr: 'Collaboration', en: 'Collaboration' },
    status: 'beta',
    platform: ['Web', 'macOS', 'Linux', 'iOS', 'Android'],
    hue: 'from-electric-400/30 to-lime-500/20',
    image: '/img/app-fixchat-v2-clean.webp',
  },
]

export const serviceImages: Record<string, string> = {
  s1: '/img/service-mobile-web-v2-clean.webp',
  s2: '/img/service-design-v2-clean.webp',
  s3: '/img/service-saas-v2-clean.webp',
  s4: '/img/service-devops-ai-v2-clean.webp',
  s5: '/img/service-marketing-v2-clean.webp',
  s6: '/img/service-advice-v2-clean.webp',
}

