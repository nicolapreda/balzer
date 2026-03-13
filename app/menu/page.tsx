import { Suspense } from 'react';
import Image from 'next/image';
import MenuClient from './MenuClient';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu — Balzer 1850 Bergamo',
  description: 'Sfoglia il menu di Balzer 1850: colazioni, pasticceria, pranzo, aperitivo e cocktail a Bergamo, Sentierone.',
};

export default function MenuPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
        {/* Premium Hero */}
        <div style={{ position: 'relative', minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'var(--balzer-blue-deep)' }}>
          <Image
            src="/balzer-dolci4.jpg"
            alt="Pasticceria Balzer 1850"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.85 }}
            sizes="100vw"
          />
          {/* Refined gradient overlay for text readability & Nav contrast */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(30,48,68,0.95) 0%, rgba(30,48,68,0.4) 40%, rgba(30,48,68,0.85) 100%)',
          }} />
          
          {/* Center Content */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '72px 2rem 2rem', // offset for Nav
            maxWidth: '800px',
            width: '100%',
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '2rem', height: '1.5px', background: 'var(--terracotta)', borderRadius: '2px' }} />
              <span style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--terracotta-light)',
              }}>
                Balzer 1850 — Bergamo
              </span>
              <div style={{ width: '2rem', height: '1.5px', background: 'var(--terracotta)', borderRadius: '2px' }} />
            </div>
            
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}>
              Il nostro <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--stone-mid)' }}>Menu.</em>
            </h1>
            
            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              maxWidth: '400px',
              margin: '0 auto',
            }}>
              Via Portici, Sentierone 41 — Bergamo
            </p>
          </div>
        </div>

        <Suspense fallback={<MenuSkeleton />}>
          <MenuClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function MenuSkeleton() {
  return (
    <div className="container-balzer section-padding" style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text-light)' }}>
        Caricamento menu…
      </p>
    </div>
  );
}
