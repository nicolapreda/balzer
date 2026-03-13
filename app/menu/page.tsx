import { Suspense } from 'react';
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
      <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--cream)' }}>
        {/* Hero */}
        <div style={{
          background: 'var(--balzer-blue)',
          padding: '5rem 0 4rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1rem',
          }}>
            Balzer 1850
          </p>
          <div style={{ width: '2.5rem', height: '1px', background: 'var(--gold)', margin: '0 auto 1.5rem' }} />
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 400,
            color: 'white',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
          }}>
            Il nostro Menu
          </h1>
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.55)',
            marginTop: '1rem',
          }}>
            Via Portici, Sentierone 41 — Bergamo
          </p>
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
      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.85rem', color: 'var(--text-light)' }}>
        Caricamento menu…
      </p>
    </div>
  );
}
