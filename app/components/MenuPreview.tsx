'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

const CATEGORIES = [
  { name: 'Colazione', desc: 'Cornetti, paste, brioche e caffè d\'eccellenza.' },
  { name: 'Pasticceria', desc: 'Torta Donizetti, mignon, crostate stagionali.' },
  { name: 'Pranzo', desc: 'Cucina lombarda contemporanea, ingredienti selezionati.' },
  { name: 'Aperitivo', desc: 'Spritz, bollicine, cocktail e stuzzichini.' },
  { name: 'Cocktail', desc: 'Signature drinks e grandi classici dal nostro bar.' },
  { name: 'Gelato', desc: 'Artigianale, con ingredienti di qualità superiore.' },
];

function CategoryRow({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/menu"
        style={{
          display: 'grid',
          gridTemplateColumns: '36px 1fr auto',
          gap: '1.25rem',
          alignItems: 'center',
          padding: '1.25rem 0.75rem',
          borderBottom: '1px solid var(--stone)',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.25s ease',
          borderRadius: '3px',
          margin: '0 -0.75rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--ivory)';
          e.currentTarget.style.paddingLeft = '1.5rem';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.paddingLeft = '0.75rem';
        }}
      >
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--terracotta)',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--balzer-blue)',
            marginBottom: '0.15rem',
          }}>
            {cat.name}
          </div>
          <div style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.78rem',
            color: 'var(--text-light)',
          }}>
            {cat.desc}
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
          <path d="M4 9h10M10 5l4 4-4 4" stroke="var(--balzer-blue)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '7rem', alignItems: 'start' }} className="menu-preview-grid">

          {/* Left: visual + head */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'sticky', top: '100px' }}
            className="menu-preview-left"
          >
            {/* Photo */}
            <div className="img-zoom" style={{ borderRadius: '4px', overflow: 'hidden', height: '340px', position: 'relative', marginBottom: '2.5rem' }}>
              <Image
                src="/balzer-dolci3.jpg"
                alt="Pasticceria Balzer"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="50vw"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '2.5rem', height: '2px', background: 'var(--terracotta)', borderRadius: '2px' }} />
              <span className="label-small">Il nostro menu</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--balzer-blue)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
            }}>
              Dal mattino
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-mid)' }}>alla sera.</em>
            </h2>
            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.92rem',
              lineHeight: 1.8,
              color: 'var(--text-mid)',
              maxWidth: '300px',
              marginBottom: '2rem',
            }}>
              Esplora le nostre proposte. Ogni momento della giornata trova la sua espressione culinaria.
            </p>
            <Link href="/menu" className="btn-primary">Menu completo</Link>
          </motion.div>

          {/* Right: list */}
          <div style={{ paddingTop: '0.5rem' }}>
            {CATEGORIES.map((cat, i) => (
              <CategoryRow key={cat.name} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .menu-preview-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .menu-preview-left { position: static !important; }
        }
      `}</style>
    </section>
  );
}
