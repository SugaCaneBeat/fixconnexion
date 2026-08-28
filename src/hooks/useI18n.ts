import { useState, useEffect, useCallback } from 'react'
import { fr } from '../locales/fr'
import { en } from '../locales/en'
import type { Dictionary } from '../locales/fr'

export type { Dictionary }
export type Lang = 'fr' | 'en'

const dictionaries = { fr, en }

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem('fx-lang') as Lang | null
  if (stored === 'fr' || stored === 'en') return stored
  const nav = window.navigator.language.toLowerCase()
  return nav.startsWith('fr') ? 'fr' : 'en'
}

export function useI18n() {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem('fx-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = dictionaries[lang]
  const toggle = useCallback(() => setLang((l) => (l === 'fr' ? 'en' : 'fr')), [])

  return { lang, setLang, t, toggle }
}
