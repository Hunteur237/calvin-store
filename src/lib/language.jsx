import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

function getInitialLang() {
  if (typeof window === 'undefined') return 'fr'
  const saved = window.localStorage.getItem('ct-lang')
  if (saved === 'fr' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem('ct-lang', lang)
  }, [lang])

  const toggleLang = () => setLang(l => (l === 'fr' ? 'en' : 'fr'))

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, t: (dict) => dict[lang] ?? dict.fr }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage doit être utilisé à l\'intérieur de <LanguageProvider>')
  return ctx
}

/* ------------------------------------------------------------------ */
/* Dictionnaire de traduction — chrome principal du site (nav, hero,   */
/* footer, CTAs). Le contenu détaillé des pages reste en français ;    */
/* étendre ce dictionnaire progressivement pour une couverture totale. */
/* ------------------------------------------------------------------ */
export const I18N = {
  nav: {
    boutique:   { fr: 'Boutique',             en: 'Shop' },
    services:   { fr: 'Services & Artisanat', en: 'Services & Crafts' },
    logiciels:  { fr: 'Logiciels',            en: 'Software' },
    blog:       { fr: 'Blog',                 en: 'Blog' },
    contact:    { fr: 'Contact',              en: 'Contact' },
  },
  hero: {
    tagline:  { fr: "Cameroun · Livraison internationale", en: 'Cameroon · International shipping' },
    titlePre: { fr: 'Calvin Telecom — ', en: 'Calvin Telecom — ' },
    titleMid: { fr: 'Tech & Innovation', en: 'Tech & Innovation' },
    titlePost:{ fr: " au cœur de l'Afrique", en: ' at the heart of Africa' },
    desc: {
      fr: "Téléphones, ordinateurs, TV et gadgets connectés au meilleur prix. Paiement en ligne sécurisé, retrait à Douala ou Yaoundé, expédition partout dans le monde.",
      en: 'Phones, computers, TVs and connected gadgets at the best price. Secure online payment, pickup in Douala or Yaoundé, shipping worldwide.',
    },
    ctaBuy: { fr: 'Acheter maintenant', en: 'Buy now' },
    ctaWa:  { fr: 'Commander sur WhatsApp', en: 'Order on WhatsApp' },
  },
  footer: {
    tagline: {
      fr: "Boutique électronique, services tech, artisanat africain et conception de logiciels — au Cameroun et pour l'international. La Tech rencontre la Tradition.",
      en: 'Electronics store, tech services, African crafts and software development — in Cameroon and internationally. Tech meets Tradition.',
    },
  },
  langToggle: { fr: 'EN', en: 'FR' },
}
