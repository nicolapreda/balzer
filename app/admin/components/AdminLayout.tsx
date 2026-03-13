'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
  active: string;
  onLogout: () => void;
}

const SIDEBAR_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/categories', label: 'Categorie', icon: '◻' },
  { href: '/admin/products', label: 'Prodotti', icon: '◯' },
  { href: '/admin/qr', label: 'QR Code', icon: '⬡' },
];

export default function AdminLayout({ children, active, onLogout }: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div style={{ padding: '0 1.5rem', marginBottom: '3rem' }}>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 400, color: 'white', marginBottom: '0.25rem' }}>
          Balzer 1850
        </p>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          Pannello Admin
        </p>
      </div>

      <nav style={{ flex: 1 }}>
        {SIDEBAR_LINKS.map((l) => {
          const isActive = active === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
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

      <div style={{ padding: '2rem 1.5rem 0' }}>
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
    </>
  );

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--ivory)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Mobile Header */}
      <div className="admin-mobile-header" style={{
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        background: 'var(--balzer-blue-deep)',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
      }}>
        <div style={{ color: 'white', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>Balzer 1850</div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          ☰
        </button>
      </div>

      {/* Sidebar Desktop & Mobile Overlay */}
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`} style={{
        width: '240px',
        minHeight: '100vh',
        background: 'var(--balzer-blue-deep)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 0',
        flexShrink: 0,
        transition: 'transform 0.3s ease',
      }}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="admin-main" style={{ flex: 1, padding: '3rem', overflowY: 'auto', background: 'var(--ivory)' }}>
        {children}
      </main>

      {/* Mobile overlay backdrop */}
      {menuOpen && (
        <div
          className="admin-overlay"
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.5)', display: 'none'
          }}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .admin-layout { flex-direction: column; }
          .admin-mobile-header { display: flex !important; }
          .admin-sidebar {
            position: fixed; top: 0; left: 0; bottom: 0; z-index: 60;
            transform: translateX(-100%);
          }
          .admin-sidebar.open { transform: translateX(0); }
          .admin-main { padding: 5rem 1.5rem 2rem !important; }
          .admin-overlay { display: block !important; }
        }
      `}</style>
    </div>
  );
}
