'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const MILESTONES = [
  { year: '1850', title: 'La fondazione', text: 'La famiglia Balzer apre le porte del suo caffè sotto i Portici del Sentierone. Bergamo scopre un nuovo punto di riferimento per l\'eleganza e il gusto.' },
  { year: '1900', title: 'Il cuore della città', text: 'Agli albori del Novecento, Balzer è già il salotto di Bergamo. Artisti, intellettuali e notabili si ritrovano qui per vivere il ritmo della città.' },
  { year: '1948', title: 'La Torta Donizetti', text: 'Balzer ottiene la licenza esclusiva della Torta Donizetti. Un legame indissolubile tra pasticceria e cultura bergamasca.' },
  { year: '2000s', title: 'Il bistrot contemporaneo', text: 'Rinnovato nella forma ma fedele all\'essenza, Balzer evolve in un bistrot moderno capace di ospitare colazioni, pranzi e cocktail d\'autore.' },
  { year: 'Oggi', title: 'Un\'icona italiana', text: 'Italia.it riconosce Balzer tra i 10 caffè storici più importanti d\'Italia. Oltre 175 anni di storia, un solo indirizzo.' },
];

function MilestoneItem({ m, index }: { m: typeof MILESTONES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1px 1fr',
        gap: '0 1.5rem',
        alignItems: 'start',
        paddingBottom: '2.5rem',
      }}
    >
      {/* Year */}
      <div style={{ textAlign: 'right', paddingTop: '0.1rem' }}>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--terracotta)',
        }}>
          {m.year}
        </span>
      </div>

      {/* Line + dot */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1px', background: 'var(--stone)', position: 'absolute', top: 0, bottom: '-2.5rem', left: '50%' }} />
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%',
          background: 'var(--terracotta)',
          position: 'relative', zIndex: 1, marginTop: '0.2rem',
          boxShadow: '0 0 0 3px var(--cream), 0 0 0 4px var(--stone)',
        }} />
      </div>

      {/* Text */}
      <div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'var(--text-dark)',
          marginBottom: '0.4rem',
        }}>
          {m.title}
        </h3>
        <p style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '0.88rem',
          lineHeight: 1.8,
          color: 'var(--text-mid)',
          maxWidth: '380px',
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
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-60px' });

  return (
    <section id="storia" style={{ background: 'var(--ivory)', overflow: 'hidden' }}>
      {/* Top full-width photo strip */}
      <div style={{ height: '420px', position: 'relative', overflow: 'hidden' }} className="img-zoom">
        <Image
          src="/balzer-1.png"
          alt="Interno Balzer 1850"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 70%' }}
          sizes="100vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(245,239,230,0) 0%, rgba(245,239,230,0.7) 80%, rgba(245,239,230,1) 100%)',
        }} />
        {/* Floating badge */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '2.5rem',
          background: 'var(--balzer-blue)',
          padding: '1rem 1.75rem',
          color: 'white',
        }}>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, display: 'block', marginBottom: '0.2rem' }}>
            Top 10 caffè storici
          </span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700 }}>
            Italia.it — Italia
          </span>
        </div>
      </div>

      <div className="container-balzer section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }} className="storia-grid">

          {/* Left: header */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'sticky', top: '120px' }}
            className="storia-left"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '2.5rem', height: '2px', background: 'var(--terracotta)', borderRadius: '2px' }} />
              <span className="label-small">La nostra storia</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--balzer-blue)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              marginBottom: '1.5rem',
            }}>
              175 anni
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-mid)' }}>di eleganza</em>
              <br />
              bergamasca.
            </h2>
            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: 'var(--text-mid)',
              maxWidth: '340px',
              marginBottom: '2.5rem',
            }}>
              Sotto i Portici del Sentierone, Balzer ha attraversato due secoli di storia italiana conservando la sua vocazione originale: essere il caffè più bello di Bergamo.
            </p>

            {/* Photo card */}
            <motion.div
              ref={imgRef}
              initial={{ opacity: 0, y: 20 }}
              animate={imgInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="img-zoom"
              style={{ borderRadius: '4px', overflow: 'hidden', height: '260px', position: 'relative' }}
            >
              <Image
                src="/balzer-2.png"
                alt="Atmosfera Balzer"
                fill
                style={{ objectFit: 'cover' }}
                sizes="50vw"
              />
            </motion.div>
          </motion.div>

          {/* Right: timeline */}
          <div style={{ paddingTop: '0.5rem' }}>
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
