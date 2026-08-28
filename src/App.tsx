import { useI18n } from './hooks/useI18n'
import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Services } from './components/Services'
import { Catalog } from './components/Catalog'
import { Process } from './components/Process'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AdminApp } from './admin/AdminApp'

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function MainSite({ t, lang, toggle }: { t: ReturnType<typeof useI18n>['t']; lang: 'fr' | 'en'; toggle: () => void }) {
  return (
    <div className="min-h-screen">
      <Navbar t={t} lang={lang} onToggleLang={toggle} />
      <main>
        <Hero t={t} lang={lang} />
        <Marquee items={t.marquee} />
        <Services t={t} />
        <Catalog t={t} lang={lang} />
        <Process t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} lang={lang} onToggleLang={toggle} />
    </div>
  )
}

export default function App() {
  const { t, lang, toggle } = useI18n()
  const hash = useHashRoute()
  if (hash.startsWith('#/admin')) {
    return <AdminApp />
  }
  return <MainSite t={t} lang={lang} toggle={toggle} />
}
