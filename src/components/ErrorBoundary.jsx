import { Component } from 'react'
import { Sentry } from '../lib/monitoring.js'
import { DS } from '../lib/design.js'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Erreur capturée par ErrorBoundary:', error, info)
    Sentry.captureException?.(error, { extra: { componentStack: info?.componentStack } })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 16, padding: '2rem',
          background: DS.bg2, color: DS.white, textAlign: 'center',
        }}>
          <img src="/img/logo-mark-128.png" alt="Calvin Telecom" style={{ width: 40, height: 40, objectFit: 'contain' }} />
          <div style={{ fontSize: '1.1rem', fontFamily: "'Archivo Black', sans-serif" }}>Une erreur s'est produite</div>
          <p style={{ color: DS.gray2, fontSize: '.85rem', fontFamily: "'Azeret Mono', monospace", maxWidth: 420 }}>
            Quelque chose a empêché l'affichage de cette page. Clique pour réessayer — si le problème persiste, recharge la page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{ padding: '10px 22px', background: DS.lime, color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: "'Archivo Black', sans-serif", fontSize: '.8rem' }}
          >Réessayer</button>
        </div>
      )
    }
    return this.props.children
  }
}
