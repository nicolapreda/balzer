'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section style={{ position: 'relative', height: '100svh', minHeight: '640px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
      {/* Background photo */}
      <div ref={bgRef} style={{ position: 'absolute', inset: '-15%', zIndex: 0 }}>
        <Image
          src="/hero-balzer.jpeg"
          alt="Interno Balzer 1850"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(26,32,48,0.93) 0%, rgba(26,32,48,0.5) 50%, rgba(26,32,48,0.1) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(26,32,48,0.4) 0%, transparent 25%)',
      }} />

      {/* Year badge */}
      <div style={{ position: 'absolute', top: '7rem', right: '2.5rem', zIndex: 5 }} className="hero-year">
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(5rem, 12vw, 10rem)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.06)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          display: 'block',
        }}>
          1850
        </span>
      </div>

      {/* Content */}
      <div className="container-balzer" style={{ position: 'relative', zIndex: 5, paddingBottom: '5rem', width: '100%' }}>
        <div style={{ maxWidth: '820px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
            <div style={{ width: '2.5rem', height: '2px', background: 'var(--terracotta)', borderRadius: '2px' }} />
            <span style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--terracotta-light)',
            }}>
              Bergamo, Sentierone — Dal 1850
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 800,
            color: 'white',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
            marginBottom: '2rem',
          }}>
            Il caffè
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>più amato</em>
            <br />
            di Bergamo.
          </h1>

          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '1.05rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            maxWidth: '420px',
            marginBottom: '2.5rem',
          }}>
            Caffetteria, pasticceria e ristorante sotto i Portici del Sentierone.
            Colazioni, aperitivi, pranzi e dolci d&apos;autore dal 1850.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/menu" className="btn-terracotta">Scopri il menu</Link>
            <Link href="#storia" className="btn-outline-white">La nostra storia</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', right: 0, bottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '1px', height: '56px', background: 'rgba(255,255,255,0.2)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'var(--terracotta)', animation: 'scrollLine 2s ease-in-out infinite' }} />
          </div>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', writingMode: 'vertical-rl' }}>
            Scorri
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { height: 0%; top: 0; }
          50%  { height: 100%; top: 0; }
          100% { height: 0%; top: 100%; }
        }
        @media (max-width: 640px) { .hero-year { display: none; } }
      `}</style>
    </section>
  );
}
