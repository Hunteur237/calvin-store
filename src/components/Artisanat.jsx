import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DS, FONTS } from '../lib/design.js'

/* ============================================================
   ARTISANAT AFRICAIN — "La Tech rencontre la Tradition"
   Photos issues du catalogue Calvin Telecom
   ============================================================ */
const CATEGORIES = [
  {
    id: 'decoration',
    title: 'Décoration',
    items: ['Masques traditionnels sculptés', 'Bustes en ébène', 'Carte "Afrique" en bois'],
    cover: '/img/artisanat/masque-1.jpg',
    thumbs: ['/img/artisanat/masque-2.jpg', '/img/artisanat/bustes-ebene.jpg', '/img/artisanat/afrique-bois.jpg'],
  },
  {
    id: 'animaux',
    title: 'Sculptures Animalières',
    items: ['Éléphants sculptés', 'Lions ajourés', 'Fauves rugissants'],
    cover: '/img/artisanat/elephant-1.jpg',
    thumbs: ['/img/artisanat/elephant-2.jpg', '/img/artisanat/lion-ajoure.jpg', '/img/artisanat/lion-rugissant.jpg'],
  },
  {
    id: 'coco',
    title: 'Artisanat en Noix de Coco',
    items: ['Bols et coupelles en coco', 'Porte-bijoux en forme de mains', 'Théières décoratives'],
    cover: '/img/artisanat/coco-mains.jpg',
    thumbs: ['/img/artisanat/coco-bols.jpg', '/img/artisanat/coco-theiere.jpg'],
  },
  {
    id: 'mode',
    title: 'Mode Africaine',
    items: ['Vestes bomber imprimé Kenté', 'Vestes à capuche', 'Motifs Wax & tribal'],
    cover: '/img/artisanat/mode-couple.jpg',
    thumbs: ['/img/artisanat/mode-veste-mannequin.jpg', '/img/artisanat/mode-homme-capuche.jpg', '/img/artisanat/mode-homme-bleu.jpg'],
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
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: DS.surface, border: `1px solid ${DS.border}`,
        borderRadius: DS.r3, overflow: 'hidden',
      }}
    >
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <img src={cat.cover} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>

      {/* Bandeau de vignettes */}
      {cat.thumbs?.length > 0 && (
        <div style={{ display: 'flex', gap: 2 }}>
          {cat.thumbs.map((t, i) => (
            <div key={i} style={{ flex: 1, height: 56, overflow: 'hidden' }}>
              <img src={t} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem', color: DS.white, marginBottom: '.9rem' }}>
          {cat.title}
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cat.items.map(it => (
            <li key={it} style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: FONTS.body, fontSize: '.85rem', color: DS.gray3, fontWeight: 300 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: DS.afro, flexShrink: 0 }} />
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
  const afro = DS.afro

  return (
    <section style={{ position: 'relative', background: DS.bg2, padding: '6rem 0', overflow: 'hidden' }}>
      {/* Motif de fond discret */}
      <div style={{
        position: 'absolute', inset: 0, opacity: .04, pointerEvents: 'none',
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
              Sculptures en bois, artisanat en noix de coco et mode africaine — une sélection de pièces authentiques fabriquées par des artisans camerounais et africains.
            </p>
          </motion.div>
        </div>

        {/* Grille des catégories */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem',
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
        @media (max-width: 1100px) {
          .artisanat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .artisanat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
