'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

const CARDS = [
  {
    id: 'colazione',
    label: 'Colazione',
    num: '01',
    title: 'Il mattino\ncomincia qui.',
    desc: 'Cornetti ancora caldi, pasticceria fresca, caffè d\'eccellenza. La colazione da Balzer è un rito per migliaia di bergamaschi.',
    time: '7:00 – 11:00',
    img: '/balzer-dolci2.jpg',
    color: 'var(--balzer-blue)',
    size: 'tall',
  },
  {
    id: 'pasticceria',
    label: 'Pasticceria',
    num: '02',
    title: 'Dolci\nd\'autore.',
    desc: 'La celebre Torta Donizetti, i mignon stagionali, le crostate. Ogni creazione è un omaggio alla tradizione bergamasca.',
    time: '7:00 – chiusura',
    img: '/balzer-dolci1.jpg',
    color: 'var(--terracotta)',
    size: 'wide',
  },
  {
    id: 'pranzo',
    label: 'Pranzo',
    num: '03',
    title: 'Cucina del\nterritorio.',
    desc: 'Piatti che raccontano Bergamo con ingredienti selezionati e cura maniacale per la stagionalità.',
    time: '12:00 – 15:00',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop',
    color: 'var(--balzer-blue-deep)',
    size: 'medium',
  },
  {
    id: 'aperitivo',
    label: 'Aperitivo',
    num: '04',
    title: 'L\'ora più\nattesa.',
    desc: 'Spritz perfetto, bollicine, cocktail classici. Il pomeriggio sfuma nella sera sotto i Portici.',
    time: '17:00 – 21:00',
    img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=85&auto=format&fit=crop',
    color: 'var(--terracotta)',
    size: 'wide',
  },
  {
    id: 'cocktail',
    label: 'Cocktail',
    num: '05',
    title: 'La notte\ndi Bergamo.',
    desc: 'Signature drinks e grandi classici preparati con cura sartoriale. Il posto giusto per finire in bellezza.',
    time: '21:00 – chiusura',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=85&auto=format&fit=crop',
    color: 'var(--balzer-blue)',
    size: 'tall',
  },
];

function Card({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="img-zoom"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
        cursor: 'default',
        minHeight: card.size === 'tall' ? '560px' : card.size === 'wide' ? '360px' : '420px',
      }}
    >
      {/* Background image */}
      <Image
        src={card.img}
        alt={card.label}
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(20,28,44,0.94) 0%, rgba(20,28,44,0.4) 55%, rgba(20,28,44,0.08) 100%)',
        zIndex: 1,
      }} />

      {/* Color accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '3px',
        height: '100%',
        background: card.color,
        zIndex: 2,
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        {/* Top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(4px)',
            padding: '0.3rem 0.7rem',
            borderRadius: '2px',
          }}>
            {card.label}
          </span>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.12)',
            lineHeight: 1,
          }}>
            {card.num}
          </span>
        </div>

        {/* Bottom */}
        <div>
          <div style={{ width: '2rem', height: '2px', background: card.color, marginBottom: '1rem', borderRadius: '2px' }} />
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: card.size === 'tall' ? 'clamp(1.8rem, 3vw, 2.5rem)' : 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '0.875rem',
            whiteSpace: 'pre-line',
          }}>
            {card.title}
          </h3>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.62)',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
            maxWidth: '280px',
          }}>
            {card.desc}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '1.5rem', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
            <span style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}>
              {card.time}
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
    <section id="momenti" style={{ background: 'var(--cream)', paddingBottom: '7rem' }}>
      {/* Header */}
      <div className="container-balzer" style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'flex-end' }}
          className="momenti-header"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '2.5rem', height: '2px', background: 'var(--terracotta)', borderRadius: '2px' }} />
              <span className="label-small">Esperienze</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 800,
              color: 'var(--balzer-blue)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
            }}>
              Ogni momento
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-mid)' }}>ha il suo posto.</em>
            </h2>
          </div>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'var(--text-mid)',
            maxWidth: '320px',
          }}>
            Dalla colazione mattutina ai cocktail serali, Balzer accompagna ogni momento con la stessa cura.
          </p>
        </motion.div>
      </div>

      {/* Magazine grid */}
      <div className="container-balzer">
        {/* Row 1: tall left + 2 stacked right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1rem', marginBottom: '1rem' }} className="momenti-grid-1">
          <Card card={CARDS[0]} index={0} />
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
            <Card card={CARDS[1]} index={1} />
            <Card card={CARDS[2]} index={2} />
          </div>
        </div>

        {/* Row 2: wide left + tall right */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '1rem' }} className="momenti-grid-2">
          <Card card={CARDS[3]} index={3} />
          <Card card={CARDS[4]} index={4} />
        </div>
      </div>

      {/* CTA */}
      <div className="container-balzer" style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
        <Link href="/menu" className="btn-primary">Esplora il menu completo</Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .momenti-header { grid-template-columns: 1fr !important; }
          .momenti-grid-1 { grid-template-columns: 1fr !important; }
          .momenti-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
