import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DS, FONTS } from '../lib/design.js'

const LOGICIEL_SERVICES = [
  { title: 'Sites Web',            desc: 'Vitrines, e-commerce et plateformes sur mesure.' },
  { title: 'Applications Mobiles', desc: 'iOS, Android et cross-platform, Mobile Money intégré.' },
  { title: 'Logiciels de Gestion', desc: 'ERP, CRM et outils métier adaptés à votre activité.' },
  { title: 'Caisse (POS)',         desc: 'Point de vente intelligent, avec ou sans connexion internet.' },
  { title: 'Gestion de Stock',     desc: 'Suivi des stocks en temps réel, alertes et rapports.' },
]

const PROCESS = [
  { num: '01', title: 'Analyse',        desc: "Étude de votre besoin et de vos objectifs métier." },
  { num: '02', title: 'Devis',          desc: 'Devis détaillé et transparent, sans engagement.' },
  { num: '03', title: 'Développement',  desc: 'Conception et développement avec points d\'étape réguliers.' },
  { num: '04', title: 'Livraison',      desc: 'Mise en production, formation et garantie incluses.' },
]

export default function LogicielsIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ background: DS.bg, padding: '7rem 0 3rem' }}>
      <div style={{ maxWidth: 1680, width: '100%', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,3.5rem)' }}>

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .6 }}
          style={{ maxWidth: 760, marginBottom: '3.5rem' }}
        >
          <span style={{ fontFamily: FONTS.mono, fontSize: '.7rem', color: DS.lime, letterSpacing: '.14em', textTransform: 'uppercase' }}>
            Conception de Logiciels
          </span>
          <h1 style={{
            fontFamily: FONTS.display, fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: DS.white,
            lineHeight: 1.12, margin: '.75rem 0 1.1rem', letterSpacing: '-.02em',
          }}>
            Des logiciels sur mesure pour <span style={{ color: DS.lime }}>faire grandir votre business</span>
          </h1>
          <p style={{ fontFamily: FONTS.body, color: DS.gray3, fontSize: '1.02rem', lineHeight: 1.8, fontWeight: 300 }}>
            Sites web, applications mobiles, logiciels de gestion, caisse et stock — conçus et développés par Calvin Telecom pour les entreprises au Cameroun et à l'international.
          </p>
        </motion.div>

        {/* Services */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '4rem' }} className="logiciels-grid">
          {LOGICIEL_SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: .55 }}
              style={{ background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.r3, padding: '1.25rem' }}
            >
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '.95rem', color: DS.white, marginBottom: '.4rem' }}>{s.title}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: '.8rem', color: DS.gray3, lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Processus + CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 340px', gap: '3rem', alignItems: 'start' }} className="logiciels-split">
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: '.65rem', color: DS.gray2, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Notre processus</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="process-grid">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: .2 + i * 0.1, duration: .55 }}
                >
                  <div style={{ fontFamily: FONTS.mono, fontSize: '.75rem', color: DS.lime, marginBottom: '.5rem' }}>{step.num}</div>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '.95rem', color: DS.white, marginBottom: '.3rem' }}>{step.title}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: '.8rem', color: DS.gray3, lineHeight: 1.6, fontWeight: 300 }}>{step.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ background: DS.border, height: '100%', minHeight: 140 }} className="logiciels-sep" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: .3, duration: .6 }}
            style={{ background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.r3, padding: '1.75rem' }}
          >
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.1rem', color: DS.white, marginBottom: '.6rem' }}>
              Un projet en tête ?
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: '.85rem', color: DS.gray3, lineHeight: 1.7, marginBottom: '1.25rem', fontWeight: 300 }}>
              Décrivez-nous votre projet, nous revenons vers vous avec un devis clair sous 24h.
            </p>
            <a
              href="https://wa.me/23776075720?text=Bonjour%20Calvin%20Telecom%2C%20je%20souhaite%20discuter%20d'un%20projet%20de%20logiciel."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', padding: '13px 20px', borderRadius: DS.r2,
                background: DS.lime, color: DS.bg, textDecoration: 'none',
                fontFamily: FONTS.body, fontWeight: 600, fontSize: '.9rem', transition: 'transform .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              Discutons sur WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .logiciels-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .logiciels-split { grid-template-columns: 1fr !important; }
          .logiciels-sep { display: none; }
        }
        @media (max-width: 640px) {
          .logiciels-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
