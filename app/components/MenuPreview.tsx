'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Colazione', desc: 'Cornetti, paste, brioche e molto altro per iniziare la giornata nel migliore dei modi.' },
  { name: 'Pasticceria', desc: 'Torta Donizetti, mignon, crostate stagionali. La nostra arte dolciaria dal 1850.' },
  { name: 'Pranzo', desc: 'Cucina lombarda contemporanea. Primi, secondi, insalate gourmet e piatti del giorno.' },
  { name: 'Aperitivo', desc: 'Spritz, bollicine, cocktail classici e stuzzichini selezionati per l\'ora più attesa.' },
  { name: 'Cocktail', desc: 'Signature drinks e grandi classici preparati con cura dai nostri barman.' },
  { name: 'Gelato', desc: 'Gelato artigianale con ingredienti di qualità superiore, disponibile nelle stagioni calde.' },
];

function CategoryRow({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/menu"
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr auto',
          gap: '1.5rem',
          alignItems: 'center',
          padding: '1.5rem 0',
          borderBottom: '1px solid var(--stone)',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.paddingLeft = '0.75rem';
          el.style.paddingRight = '0.75rem';
          el.style.background = 'var(--ivory)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.paddingLeft = '0';
          el.style.paddingRight = '0';
          el.style.background = 'transparent';
        }}
      >
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 700,
          color: 'var(--gold)',
          letterSpacing: '0.08em',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.35rem',
            fontWeight: 500,
            color: 'var(--balzer-blue)',
            marginBottom: '0.25rem',
          }}>
            {cat.name}
          </div>
          <div style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.75rem',
            color: 'var(--text-light)',
            lineHeight: 1.5,
          }}>
            {cat.desc}
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--balzer-blue)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.div>
  );
}

export default function MenuPreview() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section style={{ background: 'var(--cream)' }} className="section-padding">
      <div className="container-balzer">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'start' }} className="menu-preview-grid">

          {/* Right col: big label */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="menu-preview-head"
          >
            <p className="label-small" style={{ marginBottom: '1.5rem', display: 'block' }}>
              Il nostro menu
            </p>
            <div className="divider-gold" style={{ marginBottom: '2rem' }} />
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(5rem, 10vw, 9rem)',
              fontWeight: 300,
              color: 'var(--balzer-blue)',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              opacity: 0.15,
              userSelect: 'none',
              marginBottom: '3rem',
            }}>
              MENU
            </div>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.85rem',
              lineHeight: 1.8,
              color: 'var(--text-mid)',
              maxWidth: '280px',
              marginBottom: '2.5rem',
            }}>
              Esplora le nostre proposte. Dal mattino alla sera, ogni momento trova la sua espressione culinaria.
            </p>
            <Link href="/menu" className="btn-primary">
              Menu completo
            </Link>
          </motion.div>

          {/* Left col: list */}
          <div>
            {CATEGORIES.map((cat, i) => (
              <CategoryRow key={cat.name} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .menu-preview-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .menu-preview-head { order: 0; }
        }
      `}</style>
    </section>
  );
}
