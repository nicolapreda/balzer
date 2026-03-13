'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MILESTONES = [
  {
    year: '1850',
    title: 'La fondazione',
    text: 'La famiglia Balzer, di origine liechtensteiniana, apre le porte del suo caffè sotto i Portici del Sentierone. Bergamo scopre un nuovo punto di riferimento per l\'eleganza e il gusto.',
  },
  {
    year: '1900',
    title: 'Il cuore della città',
    text: 'Agli albori del Novecento, Balzer è già il salotto di Bergamo. Artisti, intellettuali e notabili si ritrovano qui per vivere il ritmo della città.',
  },
  {
    year: '1948',
    title: 'La Torta Donizetti',
    text: 'Balzer ottiene la licenza esclusiva della Torta Donizetti, il dolce ufficiale del compositore gaetano Donizetti. Un legame indissolubile tra pasticceria e cultura.',
  },
  {
    year: '2000s',
    title: 'Il bistrot contemporaneo',
    text: 'Rinnovato nella forma ma fedele all\'essenza, Balzer evolve in un bistrot moderno capace di ospitare colazioni, pranzi gourmet e cocktail d\'autore mantenendo intatta la sua anima storica.',
  },
  {
    year: 'Oggi',
    title: 'Un\'icona italiana',
    text: 'Italia.it riconosce Balzer tra i 10 caffè storici più importanti d\'Italia. Oltre 175 anni di storia, un solo indirizzo: Portici del Sentierone 41, Bergamo.',
  },
];

function MilestoneItem({ m, index }: { m: typeof MILESTONES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1px 1fr',
        gap: '0 2rem',
        alignItems: 'start',
      }}
    >
      {/* Year */}
      <div style={{ textAlign: 'right', paddingTop: '0.15rem' }}>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1rem',
          fontWeight: 500,
          color: 'var(--balzer-blue)',
          letterSpacing: '0.02em',
        }}>
          {m.year}
        </span>
      </div>

      {/* Timeline line + dot */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1px', background: 'var(--stone)', position: 'absolute', top: 0, bottom: '-3rem', left: '50%' }} />
        <div style={{
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          background: 'var(--balzer-blue)',
          border: '2px solid var(--cream)',
          outline: '1px solid var(--balzer-blue)',
          position: 'relative',
          zIndex: 1,
          marginTop: '0.25rem',
        }} />
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '3rem' }}>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.4rem',
          fontWeight: 500,
          color: 'var(--text-dark)',
          marginBottom: '0.5rem',
        }}>
          {m.title}
        </h3>
        <p style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.85rem',
          lineHeight: 1.8,
          color: 'var(--text-mid)',
          maxWidth: '420px',
        }}>
          {m.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function Storia() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section id="storia" className="section-padding" style={{ background: 'var(--cream)' }}>
      <div className="container-balzer">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }} className="storia-grid">

          {/* Left: header */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, x: -30 }}
            animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'sticky', top: '120px' }}
            className="storia-left"
          >
            <p className="label-small" style={{ marginBottom: '1.5rem', display: 'block' }}>
              La nostra storia
            </p>
            <div className="divider-gold" style={{ marginBottom: '2rem' }} />
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                fontWeight: 400,
                color: 'var(--balzer-blue)',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              175 anni
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--text-mid)' }}>di eleganza</em>
              <br />
              bergamasca.
            </h2>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.85rem',
              lineHeight: 1.85,
              color: 'var(--text-mid)',
              maxWidth: '340px',
            }}>
              Sotto i Portici del Sentierone, Balzer ha attraversato due secoli di storia italiana conservando la sua vocazione originale: essere il caffè più bello di Bergamo.
            </p>
          </motion.div>

          {/* Right: timeline */}
          <div>
            {MILESTONES.map((m, i) => (
              <MilestoneItem key={m.year} m={m} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .storia-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .storia-left { position: static !important; }
        }
      `}</style>
    </section>
  );
}
