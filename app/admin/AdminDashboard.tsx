'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Stats {
  categories: number;
  items: number;
  available: number;
  unavailable: number;
}

const SIDEBAR_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/categories', label: 'Categorie', icon: '◻' },
  { href: '/admin/products', label: 'Prodotti', icon: '◯' },
  { href: '/admin/qr', label: 'QR Code', icon: '⬡' },
];

function AdminSidebar({ active, onLogout }: { active: string; onLogout: () => void }) {
  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: 'var(--balzer-blue-deep)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 0',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 1.5rem', marginBottom: '3rem' }}>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 400, color: 'white', marginBottom: '0.25rem' }}>
          Balzer 1850
        </p>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          Pannello Admin
        </p>
      </div>

      {/* Links */}
      <nav style={{ flex: 1 }}>
        {SIDEBAR_LINKS.map((l) => {
          const isActive = active === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1.5rem',
                textDecoration: 'none',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--terracotta)' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{l.icon}</span>
              <span style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.8rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
              }}>
                {l.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ padding: '0 1.5rem' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'block',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            marginBottom: '0.75rem',
            transition: 'color 0.2s',
          }}
        >
          Vedi il sito →
        </Link>
        <button
          onClick={onLogout}
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.4)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'color 0.2s',
          }}
        >
          Esci
        </button>
      </div>
    </aside>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/categories').then((r) => r.json()),
      fetch('/api/admin/items').then((r) => r.json()),
    ]).then(([cats, items]) => {
      if (Array.isArray(cats) && Array.isArray(items)) {
        setStats({
          categories: cats.length,
          items: items.length,
          available: items.filter((i: { isAvailable: boolean }) => i.isAvailable).length,
          unavailable: items.filter((i: { isAvailable: boolean }) => !i.isAvailable).length,
        });
      }
    }).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const statCards = [
    { label: 'Categorie', value: stats?.categories ?? '—', icon: '◻' },
    { label: 'Prodotti totali', value: stats?.items ?? '—', icon: '◯' },
    { label: 'Disponibili', value: stats?.available ?? '—', icon: '✓' },
    { label: 'Non disponibili', value: stats?.unavailable ?? '—', icon: '✗' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ivory)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <AdminSidebar active="/admin" onLogout={handleLogout} />

      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 400, color: 'var(--balzer-blue)', marginBottom: '0.5rem' }}>
            Dashboard
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
            Benvenuto nel pannello di gestione di Balzer 1850.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
          {statCards.map((s) => (
            <div key={s.label} style={{
              background: 'white',
              padding: '1.5rem',
              border: '1px solid var(--stone)',
            }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.75rem', opacity: 0.5 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 400, color: 'var(--balzer-blue)', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '0.5rem', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '1.25rem' }}>
            Azioni rapide
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/admin/categories" className="btn-primary" style={{ fontSize: '0.65rem' }}>
              + Nuova categoria
            </Link>
            <Link href="/admin/products" className="btn-outline" style={{ fontSize: '0.65rem' }}>
              + Nuovo prodotto
            </Link>
            <Link href="/admin/qr" className="btn-outline" style={{ fontSize: '0.65rem' }}>
              Scarica QR Code
            </Link>
          </div>
        </div>

        {/* Info */}
        <div style={{
          background: 'var(--balzer-blue)',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'white', marginBottom: '0.25rem' }}>
              Menu pubblico attivo
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>
              Il menu è visibile all&apos;indirizzo /menu
            </p>
          </div>
          <Link href="/menu" target="_blank" className="btn-outline-white" style={{ fontSize: '0.65rem' }}>
            Apri menu pubblico →
          </Link>
        </div>
      </main>

      <style>{`
        @media (max-width: 1024px) {
          /* Responsive handled by inline flex */
        }
      `}</style>
    </div>
  );
}
