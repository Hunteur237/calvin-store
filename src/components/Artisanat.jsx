import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DS, FONTS } from '../lib/design.js'

/* ============================================================
   ARTISANAT AFRICAIN — "La Tech rencontre la Tradition"
   ============================================================ */
const CATEGORIES = [
  {
    id: 'decoration',
    title: 'Décoration',
    items: ['Masques traditionnels', 'Statues sculptées', 'Paniers tressés'],
    img: 'https://images.unsplash.com/photo-1604709177595-ee9c2580e35d?w=700&h=520&fit=crop&q=80',
  },
  {
    id: 'mode',
    title: 'Mode',
    items: ['Sacs imprimés africains', 'Vêtements Wax & Bogolan', 'Accessoires textiles'],
    img: 'https://images.unsplash.com/photo-1590736969596-05c4dc36e02f?w=700&h=520&fit=crop&q=80',
  },
  {
    id: 'africulture',
    title: 'Objets Design "Africulture"',
    items: ['Lampes artisanales', 'Tableaux & toiles', 'Accessoires déco'],
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=700&h=520&fit=crop&q=80',
  },
]

function CategoryCard({ cat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: DS.surface, border: `1px solid ${DS.border}`,
        borderRadius: DS.r3, overflow: 'hidden',
      }}
    >
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${DS.surface}, transparent 60%)` }} />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.1rem', color: DS.white, marginBottom: '.9rem' }}>
          {cat.title}
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cat.items.map(it => (
            <li key={it} style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: FONTS.body, fontSize: '.88rem', color: DS.gray3, fontWeight: 300 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: DS.afro || DS.orange, flexShrink: 0 }} />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function ArtisanatSection() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const afro = DS.afro || DS.orange

  return (
    <section style={{ position: 'relative', background: DS.bg2, padding: '6rem 0', overflow: 'hidden' }}>
      {/* Motif de fond discret */}
      <div style={{
        position: 'absolute', inset: 0, opacity: .05, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(45deg, ${afro} 0, ${afro} 1px, transparent 1px, transparent 22px)`,
      }} />

      <div style={{ maxWidth: 1680, width: '100%', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,3.5rem)', position: 'relative', zIndex: 2 }}>

        {/* En-tête */}
        <div ref={titleRef} style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .6 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: FONTS.mono, fontSize: '.7rem', color: afro,
              letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              Artisanat Africain
            </span>
            <h2 style={{
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)', color: DS.white,
              lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-.02em',
            }}>
              La Tech rencontre la <span style={{ color: afro }}>Tradition</span>
            </h2>
            <p style={{ fontFamily: FONTS.body, color: DS.gray3, fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}>
              Une sélection de pièces artisanales authentiques — décoration, mode et objets design — fabriquées par des artisans camerounais et africains.
            </p>
          </motion.div>
        </div>

        {/* Grille des catégories */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem',
        }} className="artisanat-grid">
          {CATEGORIES.map((cat, i) => <CategoryCard key={cat.id} cat={cat} index={i} />)}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/23776075720?text=Bonjour%20Calvin%20Telecom%2C%20je%20souhaite%20commander%20un%20article%20artisanal."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', borderRadius: DS.r2,
              background: afro, color: '#fff',
              fontFamily: FONTS.body, fontWeight: 600, fontSize: '.92rem',
              textDecoration: 'none', transition: 'transform .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            Commander sur WhatsApp
          </a>
          <a
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 24px', borderRadius: DS.r2,
              background: 'transparent', border: `1px solid ${DS.border}`,
              color: DS.gray3, fontFamily: FONTS.body, fontSize: '.92rem',
              textDecoration: 'none', transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${afro}55`; e.currentTarget.style.color = DS.white }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.gray3 }}
          >
            Demander un devis
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .artisanat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
