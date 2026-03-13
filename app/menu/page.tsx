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
        {/* Hero */}
        <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
          <Image
            src="/balzer-dolci4.jpg"
            alt="Pasticceria Balzer 1850"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(27,42,61,0.95) 0%, rgba(27,42,61,0.75) 55%, rgba(27,42,61,0.35) 100%)',
          }} />
          {/* Navbar spacer + content */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center',
            paddingTop: '72px',
          }}>
            <div className="container-balzer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '2.5rem', height: '2px', background: 'var(--terracotta)', borderRadius: '2px' }} />
                <span style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--terracotta-light)',
                }}>
                  Balzer 1850 — Bergamo
                </span>
              </div>
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.025em',
                lineHeight: 1.0,
                marginBottom: '1.25rem',
              }}>
                Il nostro
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>Menu.</em>
              </h1>
              <p style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.88rem',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.6,
              }}>
                Via Portici, Sentierone 41 — Bergamo
              </p>
            </div>
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
