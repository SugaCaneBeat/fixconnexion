import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 20, className = '', ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    ...rest,
  }
}

/* ----- Service icons (6) ----- */
export const IconMobile = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M10 18h4" />
    <path d="M8 6h8" opacity="0.5" />
  </svg>
)

export const IconDesign = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18" />
    <circle cx="12" cy="12" r="4" />
  </svg>
)

export const IconSaaS = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 9h18" />
    <circle cx="6" cy="6.5" r="0.5" fill="currentColor" />
    <circle cx="8" cy="6.5" r="0.5" fill="currentColor" />
    <path d="M7 14l2-3 2 2 3-4 3 5" />
  </svg>
)

export const IconCloud = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 18a5 5 0 1 1 1.5-9.75A6 6 0 0 1 20 11.5a4 4 0 0 1-1 7.5H7z" />
    <path d="M12 12v6M9.5 14.5L12 17l2.5-2.5" />
  </svg>
)

export const IconMarketing = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 11l16-7v16L3 13z" />
    <path d="M7 13v4a2 2 0 0 0 4 0v-3" />
  </svg>
)

export const IconCompass = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5L13 13l-4.5 2.5L11 11z" />
  </svg>
)

/* ----- Process step icons (4) ----- */
export const IconScope = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M16 16l5 5" />
  </svg>
)

export const IconSketch = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 21l4-4 11-11 3 3-11 11-4 4z" />
    <path d="M14 6l3 3" />
  </svg>
)

export const IconBuild = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 6l-5 5 5 5M16 6l5 5-5 5M14 4l-4 16" />
  </svg>
)

export const IconRocket = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 19c0-3 2-7 7-12 5 5 7 9 7 12-2 1-4 1-7 1s-5 0-7-1z" />
    <circle cx="12" cy="11" r="2" />
    <path d="M9 19l-2 3M15 19l2 3" />
  </svg>
)

/* ----- Pillar icons (4) ----- */
export const IconLayers = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
)

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const IconCpu = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    <rect x="10" y="10" width="4" height="4" />
  </svg>
)

export const IconClock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

/* ----- Category icons (6) ----- */
export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export const IconNote = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 3h11l3 3v15H5z" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
)

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M7 9l2 2 4-4M7 15l2 2 4-4" />
  </svg>
)

export const IconPlay = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
  </svg>
)

export const IconLock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

export const IconChat = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-4 4v-4H5a2 2 0 0 1-2-2z" />
    <path d="M21 10v8a2 2 0 0 1-2 2h-2l-3 3v-3" />
  </svg>
)

/* ----- Misc UI icons ----- */
export const IconArrow = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

export const IconCheckCircle = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-6" />
  </svg>
)

export const IconSparkles = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
    <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75z" />
  </svg>
)

/* ----- Menu / Nav icons ----- */
export const IconGrid = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export const IconBox = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2l9 5v10l-9 5-9-5V7z" />
    <path d="M3 7l9 5 9-5M12 12v10" />
  </svg>
)

export const IconRoute = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M7 6h6a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3" />
  </svg>
)

export const IconUsers = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
    <path d="M15 20c0-2 2-3 4-3s4 1 4 3" />
  </svg>
)

export const IconSend = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 12l18-9-7 18-3-7z" />
  </svg>
)

export const IconChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)

/* ----- Footer / link icons ----- */
export const IconInfo = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M11 12h1v5h1" />
  </svg>
)

export const IconBriefcase = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V4h6v3" />
    <path d="M3 12h18" />
  </svg>
)

export const IconHeart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
  </svg>
)

export const IconBook = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" />
    <path d="M20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z" />
  </svg>
)

export const IconGitHub = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.46-1.12-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.82.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
)

export const IconTwitter = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 3h3l-7 8 8 10h-6l-5-6-5 6H3l7-8L2 3h6l4 5z" />
  </svg>
)

export const IconLinkedIn = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="9" width="4" height="11" rx="1" />
    <circle cx="5" cy="5" r="1.5" />
    <path d="M10 9h4v2a3 3 0 0 1 6 0v9h-4v-8a1.5 1.5 0 0 0-3 0v8h-3z" />
  </svg>
)

export const IconGlobe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
)

export const IconDownload = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v12M7 10l5 5 5-5" />
    <path d="M3 18h18v3H3z" />
  </svg>
)

export const IconCode = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 6L2 12l6 6M16 6l6 6-6 6M14 4l-4 16" />
  </svg>
)

export const IconHome = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />
  </svg>
)

export const IconStar = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.5 9.5 9z" />
  </svg>
)

export const IconFile = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 3h10l4 4v14H5z" />
    <path d="M14 3v5h5" />
  </svg>
)

export const IconTerminal = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 9l3 3-3 3M13 15h4" />
  </svg>
)

export const IconPalette = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3a9 9 0 1 0 0 18c2 0 2-2 2-3s-1-1-1-2 1-2 3-2h2a3 3 0 0 0 3-3 9 9 0 0 0-9-8z" />
    <circle cx="7" cy="11" r="1.2" fill="currentColor" />
    <circle cx="9.5" cy="6.5" r="1.2" fill="currentColor" />
    <circle cx="14.5" cy="6.5" r="1.2" fill="currentColor" />
    <circle cx="17" cy="11" r="1.2" fill="currentColor" />
  </svg>
)
