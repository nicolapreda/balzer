'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ORARI = [
  { day: 'Lunedì', hours: '7:00 – 23:00' },
  { day: 'Martedì', hours: '7:00 – 22:00' },
  { day: 'Mercoledì', hours: '7:00 – 22:00' },
  { day: 'Giovedì', hours: '7:00 – 23:00' },
  { day: 'Venerdì', hours: '7:00 – 02:00' },
  { day: 'Sabato', hours: '7:30 – 02:00' },
  { day: 'Domenica', hours: '8:00 – 23:00' },
];

const SERVICES = [
  { icon: '☀', label: 'Terrazza panoramica' },
  { icon: '◻', label: 'Tavoli all\'aperto' },
  { icon: '⬡', label: 'Cocktail bar' },
  { icon: '✦', label: 'Pasticceria artigianale' },
  { icon: '◯', label: 'Gelato artigianale' },
  { icon: '◈', label: 'Prenotazione tavoli' },
];

export default function InfoOrari() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="info" style={{ background: 'var(--balzer-blue)' }} className="section-padding">
      <div className="container-balzer">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section header */}
          <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <p className="label-small" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '1rem', display: 'block' }}>
                Dove siamo
              </p>
              <div style={{ width: '2.5rem', height: '1px', background: 'var(--gold)', marginBottom: '1.5rem' }} />
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 400,
                color: 'white',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}>
                Trovaci
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>al Sentierone.</em>
              </h2>
            </div>

            <a
              href="https://maps.google.com/?q=Balzer+Bergamo+Sentierone+41"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              Apri su Maps
            </a>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem' }} className="info-grid">

            {/* Address */}
            <div>
              <p className="label-small" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem', display: 'block' }}>
                Indirizzo
              </p>
              <address style={{ fontStyle: 'normal' }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'white',
                  lineHeight: 1.4,
                  marginBottom: '1rem',
                }}>
                  Via Portici, Sentierone 41
                  <br />
                  24121 Bergamo BG
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <a
                    href="tel:+390350868549"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    <span>T</span> 035 086 8549
                  </a>
                  <a
                    href="https://wa.me/39375540559"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>W</span> 375 540 5592
                  </a>
                </div>
              </address>
            </div>

            {/* Orari */}
            <div>
              <p className="label-small" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem', display: 'block' }}>
                Orari di apertura
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {ORARI.map((o) => (
                  <div key={o.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                      {o.day}
                    </span>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: 'white' }}>
                      {o.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Servizi */}
            <div>
              <p className="label-small" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem', display: 'block' }}>
                Servizi
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {SERVICES.map((s) => (
                  <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1rem', opacity: 0.5 }}>{s.icon}</span>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recognition */}
              <div style={{
                marginTop: '2.5rem',
                padding: '1.25rem',
                border: '1px solid rgba(184,150,90,0.3)',
                background: 'rgba(184,150,90,0.05)',
              }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                  Riconoscimento
                </p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                  Top 10 caffè storici d&apos;Italia — Italia.it
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .info-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
