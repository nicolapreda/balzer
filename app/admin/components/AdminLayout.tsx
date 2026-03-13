'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AdminLayoutProps {
  children: React.ReactNode;
  active: string;
  onLogout: () => void;
}

const SIDEBAR_LINKS = [
  { href: '/admin',            label: 'Dashboard' },
  { href: '/admin/categories', label: 'Categorie' },
  { href: '/admin/products',   label: 'Prodotti' },
  { href: '/admin/qr',         label: 'QR Code' },
];

export default function AdminLayout({ children, active, onLogout }: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div style={{ padding: '0 1.75rem', marginBottom: '2.5rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <Image
            src="/logo.jpg"
            alt="Balzer 1850"
            width={38}
            height={38}
            style={{ borderRadius: '5px', objectFit: 'cover', flexShrink: 0 }}
          />
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.15rem',
            fontWeight: 400,
            color: 'white',
            letterSpacing: '0.01em',
            lineHeight: 1.2,
          }}>
            Balzer 1850
          </span>
        </Link>

        <div style={{ marginTop: '1.25rem', height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        <p style={{
          marginTop: '1rem',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '0.55rem',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>
          Pannello Admin
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {SIDEBAR_LINKS.map((l) => {
          const isActive = active === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="admin-nav-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem 1.75rem',
                textDecoration: 'none',
                background: isActive ? 'rgba(184,150,90,0.12)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              <span style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.78rem',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.02em',
                color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                transition: 'color 0.15s',
              }}>
                {l.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '1.5rem 1.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.35)',
            textDecoration: 'none',
            marginBottom: '0.6rem',
            transition: 'color 0.2s',
          }}
        >
          Vedi il sito →
        </Link>
        <button
          onClick={onLogout}
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.35)',
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
    <div className="admin-layout" style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--cream)',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>
      {/* Mobile Header */}
      <div className="admin-mobile-header" style={{
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.875rem 1.25rem',
        background: 'var(--balzer-blue-deep)',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <Image src="/logo.jpg" alt="Balzer" width={30} height={30} style={{ borderRadius: '4px', objectFit: 'cover' }} />
          <span style={{ color: 'white', fontFamily: 'Playfair Display, serif', fontSize: '1rem' }}>Balzer 1850</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            width: '34px',
            height: '34px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            borderRadius: '3px',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`} style={{
        width: '220px',
        minHeight: '100vh',
        background: 'var(--balzer-blue-deep)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 0 0',
        flexShrink: 0,
        transition: 'transform 0.25s ease',
      }}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <main className="admin-main" style={{
        flex: 1,
        padding: '2.5rem 3rem',
        overflowY: 'auto',
        background: 'var(--cream)',
        minWidth: 0,
      }}>
        {children}
      </main>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="admin-overlay"
          onClick={() => setMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.45)', display: 'none' }}
        />
      )}

      <style>{`
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.05) !important;
        }
        .admin-nav-link:hover span {
          color: rgba(255,255,255,0.8) !important;
        }
        @media (max-width: 900px) {
          .admin-layout { flex-direction: column; }
          .admin-mobile-header { display: flex !important; }
          .admin-sidebar {
            position: fixed; top: 0; left: 0; bottom: 0; z-index: 60;
            transform: translateX(-100%);
          }
          .admin-sidebar.open { transform: translateX(0); }
          .admin-main { padding: 4.5rem 1.25rem 2rem !important; }
          .admin-overlay { display: block !important; }
        }
        @media (max-width: 600px) {
          .admin-modal-outer { padding: 0 !important; align-items: flex-end !important; }
          .admin-modal-inner { padding: 1.75rem 1.25rem !important; max-height: 95vh; overflow-y: auto; border-radius: 12px 12px 0 0; }
          .admin-modal-actions { flex-direction: column !important; }
          .admin-modal-actions button { flex: none !important; width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
