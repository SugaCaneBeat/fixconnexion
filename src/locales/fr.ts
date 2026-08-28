export const fr = {
  meta: {
    nav: {
      services: 'Services',
      catalog: 'Apps gratuites',
      process: 'Methode',
      about: 'Agence',
      contact: 'Contact',
      cta: 'Demarrer un projet',
    },
  },
  hero: {
    eyebrow: 'Agence d applications creatives & transversales',
    titleA: 'On concoit des apps',
    titleB: 'que les gens',
    titleC: 'utilisent vraiment.',
    subtitle:
      'Fixconnexion design, developpe et deploie des produits numeriques modernes : apps mobiles, web apps, brand systems et outils internes. Du prototype au million d utilisateurs, sans detours.',
    cta1: 'Voir le catalogue gratuit',
    cta2: 'Discuter de votre projet',
    stats: [
      { k: '60+', v: 'produits livres' },
      { k: '12', v: 'pays deployes' },
      { k: '4.9/5', v: 'satisfaction client' },
    ],
  },
  marquee: ['iOS', 'Android', 'React', 'TypeScript', 'Node', 'Swift', 'Kotlin', 'Flutter', 'AWS', 'GCP', 'Figma', 'Postgres'],
  services: {
    eyebrow: 'Ce qu on fait',
    title: 'Services de bout en bout, du croquis au runtime.',
    subtitle: 'Un seul interlocuteur, une equipe transverse, des resultats qui tournent en production.',
    items: [
      {
        n: '01',
        t: 'Apps mobiles & web',
        d: 'iOS, Android, Progressive Web Apps. Performance native, UX fluide, integration API soignee.',
      },
      {
        n: '02',
        t: 'Design produit & systeme',
        d: 'Identite visuelle, design system, prototypage haute fidelite. Marques et produits dessines pour scaler.',
      },
      {
        n: '03',
        t: 'Plateformes SaaS',
        d: 'Dashboards, back-offices, outils metier. Architecture multi-tenant, facturation, observabilite.',
      },
      {
        n: '04',
        t: 'Cloud, DevOps & AI',
        d: 'CI/CD, Kubernetes, securite, modeles d IA integres, RAG, agents. On industrialise, vous dormez tranquille.',
      },
      {
        n: '05',
        t: 'Marketing & contenu',
        d: 'Strategies de lancement, ASO, SEO, social, brand content. On livre l app, on l emmene au public.',
      },
      {
        n: '06',
        t: 'Conseil & cadrage',
        d: 'Audit, due diligence technique, choix de stack, schemas directeurs. On pose les bonnes fondations.',
      },
    ],
  },
  catalog: {
    eyebrow: 'Catalogue gratuit',
    title: 'Six apps pretes a l emploi. Libres. Modernes. Utilitaires.',
    subtitle:
      'Notre equipe edite des outils gratuits pour la communaute. C est aussi ca Fixconnexion : on montre ce qu on sait faire, on partage ce qui peut servir.',
    badge: 'Open Source',
    cta: 'Acceder au catalogue',
    note: 'Apps en license MIT, auto-hebergees ou installables localement.',
  },
  process: {
    eyebrow: 'Methode',
    title: 'Quatre etapes. Aucune ambiguite.',
    steps: [
      { n: '01', t: 'Cadrage', d: 'Atelier de decouverte, definition du perimetre, objectifs chiffrables.' },
      { n: '02', t: 'Design', d: 'UX flows, wireframes, design system, prototype interactif a valider.' },
      { n: '03', t: 'Build', d: 'Developpement par sprints courts, demos hebdo, code review systematique.' },
      { n: '04', t: 'Run', d: 'Mise en production, monitoring, evolutions, support niveau 1 a 3.' },
    ],
  },
  about: {
    eyebrow: 'L agence',
    title: 'Une equipe senior, des references exigeantes.',
    body:
      'Fixconnexion est nee de la rencontre entre des profils senior ayant livre pour Mercedes, Aston Martin, Apple, et des projets de construction a Dubai. Une seule conviction : la tech ne vaut que si elle sert un usage reel. On monte des equipes courtes, on parle en francais, on livre en semaines, on assume nos choix.',
    pillars: [
      { t: 'Transversal', d: 'Mobile, web, brand, growth, infra. Une equipe, un interlocuteur.' },
      { t: 'Senior uniquement', d: 'Aucun junior cache derriere un PowerPoint. Vous voyez ceux qui codent.' },
      { t: 'Industriable', d: 'Code teste, documente, deployable. Pas de prototype jete.' },
      { t: 'Honore les delais', d: 'Sprints courts, demos reelles, pas de surprise au go-live.' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Parlez-nous de votre projet.',
    subtitle: 'Reponse sous 24h ouvrables. Premier echange gratuit, sans engagement.',
    name: 'Votre nom',
    email: 'Email professionnel',
    company: 'Societe',
    budget: 'Budget estime',
    message: 'Votre projet, en quelques lignes',
    send: 'Envoyer la demande',
    sending: 'Envoi en cours...',
    success: 'Demande envoyee. On revient vers vous tres vite.',
    direct: 'Ou directement',
  },
  footer: {
    tagline: 'Agence d applications creatives, modernes et transversales.',
    columns: [
      { t: 'Agence', items: ['A propos', 'Methode', 'Carrieres', 'Presse'] },
      { t: 'Services', items: ['Apps mobiles', 'SaaS', 'Design system', 'DevOps & AI'] },
      { t: 'Ressources', items: ['Catalogue gratuit', 'Changelog', 'Blog', 'Mentions legales'] },
    ],
    rights: 'Tous droits reserves.',
  },
}

export type Dictionary = typeof fr
