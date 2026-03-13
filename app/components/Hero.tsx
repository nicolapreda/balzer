'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        background: 'var(--balzer-blue-deep)',
      }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-15%',
          backgroundImage: 'linear-gradient(160deg, #243650 0%, #365071 40%, #1a2a40 100%)',
          zIndex: 0,
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(184,150,90,0.06) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
          zIndex: 1,
        }}
      />

      {/* Year badge — top right */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          zIndex: 10,
          textAlign: 'right',
        }}
        className="hero-badge"
      >
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '6rem',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.06)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          display: 'block',
        }}>
          1850
        </span>
      </div>

      {/* Bottom horizontal rule */}
      <div
        style={{
          position: 'absolute',
          bottom: '11rem',
          left: '2rem',
          right: '2rem',
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="container-balzer"
        style={{
          position: 'relative',
          zIndex: 5,
          paddingBottom: '5rem',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '780px' }}>
          <p className="label-small" style={{ color: 'var(--gold)', marginBottom: '1.5rem', display: 'block' }}>
            Bergamo, Sentierone — Dal 1850
          </p>

          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              fontWeight: 400,
              color: 'white',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}
          >
            Un luogo
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.82)' }}>fuori</em>
            <br />
            dal tempo.
          </h1>

          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.75,
              maxWidth: '380px',
              marginBottom: '2.5rem',
            }}
          >
            Caffetteria, pasticceria e ristorante sotto i Portici del Sentierone.
            Colazioni, aperitivi, pranzi e dolci d&apos;autore dal 1850.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/menu" className="btn-primary">
              Scopri il menu
            </Link>
            <Link href="#storia" className="btn-outline-white">
              La nostra storia
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: '5.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              background: 'var(--gold)',
              animation: 'scrollLine 2s ease-in-out infinite',
            }} />
          </div>
          <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', writingMode: 'vertical-rl' }}>
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
        @media (max-width: 640px) {
          .hero-badge { display: none; }
        }
      `}</style>
    </section>
  );
}
