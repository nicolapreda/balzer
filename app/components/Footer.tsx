'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--balzer-blue-deep)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* CTA strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '4rem 0' }}>
        <div className="container-balzer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}>
              Vieni a trovarci.
            </h2>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
              Ogni giorno, dal 1850, sotto i Portici del Sentierone.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://wa.me/39375540559" className="btn-outline-white" target="_blank" rel="noopener noreferrer">
              Prenota un tavolo
            </a>
            <Link href="/menu" className="btn-primary">
              Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-balzer" style={{ padding: '3.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <Image src="/logo.jpg" alt="Balzer 1850" width={52} height={52} style={{ borderRadius: '8px' }} />
            </div>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              maxWidth: '220px',
              marginBottom: '1.5rem',
            }}>
              Caffetteria, pasticceria e ristorante. Dal 1850, sotto i Portici del Sentierone.
            </p>
            <a
              href="https://instagram.com/balzer1850"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              @balzer1850 — Instagram
            </a>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>
              Navigazione
            </p>
            {[
              { href: '/', label: 'Home' },
              { href: '#storia', label: 'La nostra storia' },
              { href: '#momenti', label: 'Esperienze' },
              { href: '/menu', label: 'Menu' },
              { href: '#info', label: 'Info & Orari' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{
                display: 'block',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                marginBottom: '0.75rem',
                transition: 'color 0.2s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contatti */}
          <div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>
              Contatti
            </p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Via Portici, Sentierone 41
              <br />
              24121 Bergamo BG
            </p>
            <a href="tel:+390350868549" style={{ display: 'block', fontFamily: 'Manrope, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>
              035 086 8549
            </a>
            <a href="https://wa.me/39375540559" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontFamily: 'Manrope, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
              WhatsApp: 375 540 5592
            </a>
          </div>

          {/* Orari brevi */}
          <div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>
              Orari
            </p>
            {[
              { day: 'Lun – Gio', hours: '7:00 – 23:00' },
              { day: 'Venerdì', hours: '7:00 – 02:00' },
              { day: 'Sabato', hours: '7:30 – 02:00' },
              { day: 'Domenica', hours: '8:00 – 23:00' },
            ].map((o) => (
              <div key={o.day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{o.day}</span>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{o.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
            © {year} Balzer 1850. Tutti i diritti riservati.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Cookie Policy', 'Admin'].map((item) => (
              <Link
                key={item}
                href={item === 'Admin' ? '/admin' : '#'}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
