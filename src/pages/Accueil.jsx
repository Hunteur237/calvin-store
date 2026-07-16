import { lazy, Suspense } from 'react'
import Hero from '../components/Hero.jsx'
import CategoriesSection from '../components/Categories.jsx'

const BoutiqueSection  = lazy(() => import('../components/Boutique.jsx'))
const ReviewsSection   = lazy(() => import('../components/Reviews.jsx'))

const Load = () => <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
  <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #E2E8F0', borderTopColor: '#22C55E', animation: 'spin .7s linear infinite' }}/>
</div>

export default function PageAccueil({ onRdvOpen }) {
  return (
    <>
      <Hero onRdvOpen={onRdvOpen} />
      <CategoriesSection />
      <Suspense fallback={<Load />}><BoutiqueSection /></Suspense>
      <Suspense fallback={<Load />}><ReviewsSection /></Suspense>
    </>
  )
}
