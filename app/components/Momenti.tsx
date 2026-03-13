'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MOMENTS = [
  {
    id: 'colazione',
    label: 'Colazione',
    title: 'Il mattino\nha l\'oro in bocca.',
    desc: 'Cornetti ancora caldi, pasticceria fresca, caffè di qualità superiore. La colazione da Balzer è un rito quotidiano per migliaia di bergamaschi.',
    time: '7:00 – 11:00',
    accent: '#f7f3eb',
    bg: 'var(--balzer-blue)',
    textColor: 'white',
  },
  {
    id: 'pasticceria',
    label: 'Pasticceria',
    title: 'Dolci\nd\'autore.',
    desc: 'La nostra pasticceria artigianale è il cuore pulsante di Balzer. Dalla celebre Torta Donizetti ai mignon stagionali, ogni creazione è un omaggio alla tradizione bergamasca.',
    time: '7:00 – chiusura',
    accent: 'var(--balzer-blue)',
    bg: 'var(--ivory)',
    textColor: 'var(--text-dark)',
  },
  {
    id: 'pranzo',
    label: 'Pranzo',
    title: 'Cucina del\nterritorio.',
    desc: 'Piatti che raccontano Bergamo e la Lombardia, con ingredienti selezionati e una cura maniacale per la stagionalità. Un pranzo che vale il viaggio.',
    time: '12:00 – 15:00',
    accent: 'var(--ivory)',
    bg: 'var(--balzer-blue-deep)',
    textColor: 'white',
  },
  {
    id: 'aperitivo',
    label: 'Aperitivo',
    title: 'L\'ora\ndell\'aperitivo.',
    desc: 'Quando il pomeriggio sfuma nella sera, Balzer si anima. Cocktail di qualità, bollicine, e uno spritz perfetto sotto i Portici del Sentierone.',
    time: '17:00 – 21:00',
    accent: 'var(--balzer-blue)',
    bg: 'var(--ivory)',
    textColor: 'var(--text-dark)',
  },
  {
    id: 'cocktail',
    label: 'Cocktail & Sera',
    title: 'La notte\ndi Bergamo.',
    desc: 'I nostri barman creano cocktail classici e signature drinks con un\'attenzione sartoriale agli ingredienti. Il posto giusto per concludere la serata con stile.',
    time: '21:00 – chiusura',
    accent: 'var(--ivory)',
    bg: 'var(--balzer-blue)',
    textColor: 'white',
  },
];

function MomentCard({ m, index }: { m: typeof MOMENTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
        minHeight: '480px',
        overflow: 'hidden',
      }}
      className="moment-card"
    >
      {/* Text panel */}
      <div
        style={{
          background: m.bg,
          padding: 'clamp(3rem, 6vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: isEven ? 0 : 1,
        }}
        className="moment-text"
      >
        <p className="label-small" style={{ color: m.textColor === 'white' ? 'rgba(255,255,255,0.6)' : 'var(--gold)', marginBottom: '1rem', display: 'block' }}>
          {m.label}
        </p>
        <div style={{ width: '2rem', height: '1px', background: m.textColor === 'white' ? 'rgba(255,255,255,0.3)' : 'var(--gold)', marginBottom: '1.5rem' }} />
        <h3
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 400,
            color: m.textColor === 'white' ? 'white' : 'var(--balzer-blue)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            whiteSpace: 'pre-line',
          }}
        >
          {m.title}
        </h3>
        <p style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.82rem',
          lineHeight: 1.85,
          color: m.textColor === 'white' ? 'rgba(255,255,255,0.65)' : 'var(--text-mid)',
          maxWidth: '340px',
          marginBottom: '2rem',
        }}>
          {m.desc}
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{ width: '2rem', height: '1px', background: m.textColor === 'white' ? 'rgba(255,255,255,0.3)' : 'var(--stone-mid)' }} />
          <span style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: m.textColor === 'white' ? 'rgba(255,255,255,0.45)' : 'var(--text-light)',
          }}>
            {m.time}
          </span>
        </div>
      </div>

      {/* Visual panel */}
      <div
        style={{
          background: m.accent,
          order: isEven ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '300px',
        }}
        className="moment-visual"
      >
        {/* Abstract visual element */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(8rem, 18vw, 16rem)',
            fontWeight: 300,
            color: m.bg === 'var(--ivory)' ? 'rgba(54,80,113,0.07)' : 'rgba(255,255,255,0.06)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}>
            {m.label.charAt(0)}
          </div>
        </div>
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: `1px solid ${m.bg === 'var(--ivory)' ? 'rgba(54,80,113,0.2)' : 'rgba(255,255,255,0.15)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem',
              color: m.bg === 'var(--ivory)' ? 'var(--balzer-blue)' : 'rgba(255,255,255,0.5)',
            }}>
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Momenti() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section id="momenti" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="container-balzer section-padding" style={{ paddingBottom: '4rem' }}>
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <p className="label-small" style={{ marginBottom: '1rem', display: 'block' }}>Esperienze</p>
            <div className="divider-gold" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              color: 'var(--balzer-blue)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}>
              Ogni momento
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--text-mid)' }}>ha il suo posto.</em>
            </h2>
          </div>
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            color: 'var(--text-mid)',
            maxWidth: '340px',
          }}>
            Dalla colazione mattutina ai cocktail serali, Balzer accompagna ogni momento della giornata con la stessa cura e raffinatezza.
          </p>
        </motion.div>
      </div>

      {/* Cards */}
      <div>
        {MOMENTS.map((m, i) => (
          <MomentCard key={m.id} m={m} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .moment-card { grid-template-columns: 1fr !important; min-height: auto !important; }
          .moment-text { order: 0 !important; }
          .moment-visual { order: 1 !important; min-height: 200px !important; }
        }
      `}</style>
    </section>
  );
}
