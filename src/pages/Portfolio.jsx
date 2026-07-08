import { lazy, Suspense } from 'react'
import PortfolioSection from '../components/Portfolio.jsx'
import LogicielsIntro from '../components/LogicielsIntro.jsx'

const DevisSection = lazy(() => import('../components/Devis.jsx').then(m => ({ default: m.DevisSection })))
const FAQSection   = lazy(() => import('../components/Devis.jsx').then(m => ({ default: m.FAQSection })))
const Load = () => <div style={{ padding: '4rem 2rem', minHeight: '20vh' }}/>

export default function PagePortfolio() {
  return (
    <div style={{ paddingTop: 66 }}>
      <LogicielsIntro />
      <PortfolioSection />
      <Suspense fallback={<Load />}><DevisSection /></Suspense>
      <Suspense fallback={<Load />}><FAQSection /></Suspense>
    </div>
  )
}
