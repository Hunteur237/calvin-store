import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { DS, FONTS } from '../lib/design.js'

const IconPhone    = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
const IconLaptop   = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="21" x2="22" y2="21"/></svg>
const IconHeadphones = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
const IconTv       = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
const IconWatch    = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l.35 3.83a2 2 0 01-2 2.18h-5.72a2 2 0 01-2-2.18l.35-3.83m9.02-10.7l.35-3.83a2 2 0 00-2-2.18H9.19a2 2 0 00-2 2.18l.35 3.83"/></svg>

const CATEGORIES = [
  { label: 'Téléphones',        icon: <IconPhone />,      to: '/boutique?cat=telephones' },
  { label: 'Ordinateurs',       icon: <IconLaptop />,      to: '/boutique?cat=ordinateurs' },
  { label: 'Accessoires',       icon: <IconHeadphones />,  to: '/boutique?cat=accessoires' },
  { label: 'TV',                icon: <IconTv />,          to: '/boutique?cat=tv' },
  { label: 'Gadgets Connectés', icon: <IconWatch />,       to: '/boutique?cat=gadgets' },
]

export default function CategoriesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ background: DS.bg2, padding: '5rem 0', borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}` }}>
      <div style={{ maxWidth: 1680, width: '100%', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,3.5rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <span style={{ fontFamily: FONTS.mono, fontSize: '.7rem', color: DS.lime, letterSpacing: '.14em', textTransform: 'uppercase' }}>Nos catégories</span>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', color: DS.white, marginTop: '.6rem' }}>
            Faites votre choix
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }} className="cat-grid">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: .5 }}
            >
              <Link
                to={c.to}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  padding: '2rem 1rem', borderRadius: DS.r3,
                  background: DS.surface, border: `1px solid ${DS.border}`,
                  textDecoration: 'none', transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${DS.lime}55`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.transform = 'none' }}
              >
                <span style={{ color: DS.lime }}>{c.icon}</span>
                <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: '.88rem', color: DS.white, textAlign: 'center' }}>{c.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cat-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 560px) { .cat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  )
}
