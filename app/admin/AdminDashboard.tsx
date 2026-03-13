'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from './components/AdminLayout';

interface Stats {
  categories: number;
  items: number;
  available: number;
  unavailable: number;
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
    <AdminLayout active="/admin" onLogout={handleLogout}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 400, color: 'var(--balzer-blue)', marginBottom: '0.5rem' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
          Benvenuto nel pannello di gestione di Balzer 1850.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
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
    </AdminLayout>
  );
}
