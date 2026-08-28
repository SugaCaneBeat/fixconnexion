import type { Dictionary } from './fr'

export const en: Dictionary = {
  meta: {
    nav: {
      services: 'Services',
      catalog: 'Free apps',
      process: 'Method',
      about: 'Studio',
      contact: 'Contact',
      cta: 'Start a project',
    },
  },
  hero: {
    eyebrow: 'Creative & cross-disciplinary app studio',
    titleA: 'We craft apps',
    titleB: 'people actually',
    titleC: 'use everyday.',
    subtitle:
      'Fixconnexion designs, builds and ships modern digital products: mobile apps, web apps, brand systems and internal tools. From prototype to a million users, no detours.',
    cta1: 'See the free catalog',
    cta2: 'Discuss your project',
    stats: [
      { k: '60+', v: 'products shipped' },
      { k: '12', v: 'countries live' },
      { k: '4.9/5', v: 'client satisfaction' },
    ],
  },
  marquee: ['iOS', 'Android', 'React', 'TypeScript', 'Node', 'Swift', 'Kotlin', 'Flutter', 'AWS', 'GCP', 'Figma', 'Postgres'],
  services: {
    eyebrow: 'What we do',
    title: 'End-to-end services, from sketch to runtime.',
    subtitle: 'One point of contact, one cross-functional team, results that run in production.',
    items: [
      { n: '01', t: 'Mobile & web apps', d: 'iOS, Android, Progressive Web Apps. Native feel, smooth UX, clean API integrations.' },
      { n: '02', t: 'Product & system design', d: 'Brand identity, design system, high-fidelity prototypes. Brands and products built to scale.' },
      { n: '03', t: 'SaaS platforms', d: 'Dashboards, back-offices, business tools. Multi-tenant architecture, billing, observability.' },
      { n: '04', t: 'Cloud, DevOps & AI', d: 'CI/CD, Kubernetes, security, integrated AI models, RAG, agents. We industrialise, you sleep well.' },
      { n: '05', t: 'Marketing & content', d: 'Launch strategies, ASO, SEO, social, brand content. We ship the app, we take it to the public.' },
      { n: '06', t: 'Advisory & scoping', d: 'Audit, technical due diligence, stack choices, roadmaps. We lay the right foundations.' },
    ],
  },
  catalog: {
    eyebrow: 'Free catalog',
    title: 'Six ready-to-use apps. Free. Modern. Useful.',
    subtitle:
      'Our team publishes free tools for the community. That is also Fixconnexion: we show what we do, we share what helps.',
    badge: 'Open Source',
    cta: 'Browse the catalog',
    note: 'MIT licensed apps, self-hosted or locally installable.',
  },
  process: {
    eyebrow: 'Method',
    title: 'Four steps. Zero ambiguity.',
    steps: [
      { n: '01', t: 'Scope', d: 'Discovery workshop, perimeter definition, measurable goals.' },
      { n: '02', t: 'Design', d: 'UX flows, wireframes, design system, interactive prototype to validate.' },
      { n: '03', t: 'Build', d: 'Short sprints, weekly demos, systematic code review.' },
      { n: '04', t: 'Run', d: 'Production, monitoring, evolutions, level 1 to 3 support.' },
    ],
  },
  about: {
    eyebrow: 'The studio',
    title: 'A senior team, demanding references.',
    body:
      'Fixconnexion was born from a meeting between senior profiles who shipped for Mercedes, Aston Martin, Apple, and construction projects in Dubai. One conviction: tech only matters when it serves a real use. Short teams, French-speaking, shipping in weeks, owning our choices.',
    pillars: [
      { t: 'Cross-functional', d: 'Mobile, web, brand, growth, infra. One team, one point of contact.' },
      { t: 'Senior only', d: 'No junior hidden behind a slide deck. You see the people who code.' },
      { t: 'Industrialisable', d: 'Tested, documented, deployable code. No thrown-away prototype.' },
      { t: 'On-time delivery', d: 'Short sprints, real demos, no surprise at go-live.' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Tell us about your project.',
    subtitle: 'Reply within 24 business hours. First call is free, no commitment.',
    name: 'Your name',
    email: 'Professional email',
    company: 'Company',
    budget: 'Estimated budget',
    message: 'Your project, in a few lines',
    send: 'Send request',
    sending: 'Sending...',
    success: 'Request sent. We will get back to you shortly.',
    direct: 'Or directly',
  },
  footer: {
    tagline: 'Creative, modern and cross-disciplinary app studio.',
    columns: [
      { t: 'Studio', items: ['About', 'Method', 'Careers', 'Press'] },
      { t: 'Services', items: ['Mobile apps', 'SaaS', 'Design system', 'DevOps & AI'] },
      { t: 'Resources', items: ['Free catalog', 'Changelog', 'Blog', 'Legal'] },
    ],
    rights: 'All rights reserved.',
  },
}
