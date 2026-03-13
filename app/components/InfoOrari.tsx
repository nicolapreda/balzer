'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const ORARI = [
  { day: 'Lunedì', hours: '7:00 – 23:00' },
  { day: 'Martedì', hours: '7:00 – 22:00' },
  { day: 'Mercoledì', hours: '7:00 – 22:00' },
  { day: 'Giovedì', hours: '7:00 – 23:00' },
  { day: 'Venerdì', hours: '7:00 – 02:00', highlight: true },
  { day: 'Sabato', hours: '7:30 – 02:00', highlight: true },
  { day: 'Domenica', hours: '8:00 – 23:00' },
];

export default function InfoOrari() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="info" style={{ background: 'var(--balzer-blue-deep)', overflow: 'hidden' }}>
      {/* Photo strip */}
      <div style={{ height: '380px', position: 'relative', overflow: 'hidden' }} className="img-zoom">
        <Image
          src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1600&q=85&auto=format&fit=crop"
          alt="Bergamo Città Alta"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          sizes="100vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(30,48,68,0) 0%, rgba(30,48,68,0.65) 70%, rgba(30,48,68,1) 100%)',
        }} />
        {/* Overlay title */}
        <div style={{ position: 'absolute', bottom: '3rem', left: 0, right: 0, zIndex: 2 }}>
          <div className="container-balzer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.5rem', height: '2px', background: 'var(--terracotta)', borderRadius: '2px' }} />
              <span style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--terracotta-light)',
              }}>Dove siamo</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
            }}>
              Trovaci al
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.65)' }}>Sentierone.</em>
            </h2>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="container-balzer section-padding"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem' }} className="info-grid">

          {/* Indirizzo */}
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
              Indirizzo
            </p>
            <address style={{ fontStyle: 'normal' }}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.4,
                marginBottom: '1.5rem',
              }}>
                Via Portici,<br />Sentierone 41<br />24121 Bergamo BG
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a href="tel:+390350868549" style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'flex',
                  alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  035 086 8549
                </a>
                <a href="https://wa.me/39375540559" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'flex',
                  alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  WhatsApp: 375 540 5592
                </a>
              </div>
            </address>
            <a
              href="https://maps.google.com/?q=Balzer+Bergamo+Sentierone+41"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terracotta"
              style={{ fontSize: '0.62rem', marginTop: '2rem', display: 'inline-flex' }}
            >
              Apri su Maps
            </a>
          </div>

          {/* Orari */}
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
              Orari di apertura
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {ORARI.map((o) => (
                <div key={o.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
                    {o.day}
                  </span>
                  <span style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: o.highlight ? 'var(--terracotta-light)' : 'white',
                  }}>
                    {o.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Servizi + riconoscimento */}
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
              Servizi
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
              {[
                'Terrazza panoramica',
                'Tavoli all\'aperto',
                'Cocktail bar',
                'Pasticceria artigianale',
                'Gelato artigianale',
                'Prenotazione tavoli',
              ].map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--terracotta)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div style={{ border: '1px solid rgba(196,115,74,0.35)', background: 'rgba(196,115,74,0.07)', padding: '1.25rem' }}>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--terracotta-light)', marginBottom: '0.5rem' }}>
                Riconoscimento
              </p>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                Top 10 caffè storici d&apos;Italia — Italia.it
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .info-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
