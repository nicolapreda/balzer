'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QRClient() {
  const [path, setPath] = useState('/menu');
  const [previewUrl, setPreviewUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    setPreviewUrl(`/api/admin/qr?path=${encodeURIComponent(path)}&t=${Date.now()}`);
  }, [path]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const download = (format: 'png' | 'svg') => {
    const a = document.createElement('a');
    a.href = `/api/admin/qr?path=${encodeURIComponent(path)}&format=${format}`;
    a.download = `balzer-menu-qr.${format}`;
    a.click();
  };

  const QUICK_PATHS = [
    { label: 'Menu completo', path: '/menu' },
    { label: 'Home', path: '/' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ivory)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <aside style={{ width: '240px', minHeight: '100vh', background: 'var(--balzer-blue-deep)', padding: '2rem 0', flexShrink: 0 }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 400, color: 'white' }}>Balzer 1850</p>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Pannello Admin</p>
        </div>
        <nav>
          {[{ href: '/admin', label: 'Dashboard', icon: '◈' }, { href: '/admin/categories', label: 'Categorie', icon: '◻' }, { href: '/admin/products', label: 'Prodotti', icon: '◯' }, { href: '/admin/qr', label: 'QR Code', icon: '⬡' }].map((l) => (
            <Link key={l.href} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.5rem', textDecoration: 'none', background: l.href === '/admin/qr' ? 'rgba(255,255,255,0.08)' : 'transparent', borderLeft: l.href === '/admin/qr' ? '2px solid var(--terracotta)' : '2px solid transparent' }}>
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{l.icon}</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.8rem', fontWeight: l.href === '/admin/qr' ? 600 : 400, color: l.href === '/admin/qr' ? 'white' : 'rgba(255,255,255,0.55)' }}>{l.label}</span>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '2rem 1.5rem 0' }}>
          <button onClick={handleLogout} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Esci</button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 400, color: 'var(--balzer-blue)' }}>QR Code</h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>Genera e scarica il QR code per il menu digitale.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="qr-grid">
          {/* Config */}
          <div>
            <div style={{ background: 'white', border: '1px solid var(--stone)', padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>Configurazione</h2>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.5rem' }}>
                  Percorso destinazione
                </label>
                <input
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 0.875rem', border: '1px solid var(--stone)', background: 'white', fontFamily: 'monospace', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.75rem' }}>Percorsi rapidi</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {QUICK_PATHS.map((p) => (
                    <button
                      key={p.path}
                      onClick={() => setPath(p.path)}
                      style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '0.7rem',
                        padding: '0.4rem 0.875rem',
                        background: path === p.path ? 'var(--balzer-blue)' : 'white',
                        color: path === p.path ? 'white' : 'var(--text-mid)',
                        border: '1px solid var(--stone)',
                        cursor: 'pointer',
                        fontWeight: 500,
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => download('png')} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.65rem' }}>
                  Scarica PNG
                </button>
                <button onClick={() => download('svg')} className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.65rem' }}>
                  Scarica SVG
                </button>
              </div>
            </div>

            {/* Print card */}
            <div style={{ background: 'var(--balzer-blue)', padding: '1.5rem' }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>
                Stampare il QR?
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1rem', lineHeight: 1.6 }}>
                Scarica il PNG ad alta risoluzione (512px) per stampe di qualità da posizionare ai tavoli.
              </p>
              <button onClick={() => download('png')} className="btn-outline-white" style={{ fontSize: '0.65rem' }}>
                Scarica alta risoluzione
              </button>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div style={{ background: 'white', border: '1px solid var(--stone)', padding: '2rem', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>Anteprima</h2>

              {/* QR preview */}
              <div style={{ display: 'inline-block', padding: '1.5rem', background: 'var(--cream)', border: '1px solid var(--stone)', marginBottom: '1.5rem' }}>
                {previewUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="QR Code preview" style={{ width: '200px', height: '200px', display: 'block' }} />
                )}
              </div>

              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--balzer-blue)', marginBottom: '0.25rem' }}>
                Balzer 1850
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                Scansiona per il menu
              </p>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .qr-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
