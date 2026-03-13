'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/#storia', label: 'La nostra storia' },
  { href: '/#momenti', label: 'Esperienze' },
  { href: '/menu', label: 'Menu' },
  { href: '/#info', label: 'Info & Orari' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 500,
        background: scrolled ? 'rgba(30,48,68,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div className="container-balzer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <Image
              src="/logo.jpg"
              alt="Balzer 1850"
              width={42}
              height={42}
              style={{ borderRadius: '6px', objectFit: 'cover' }}
            />
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/menu" className="btn-terracotta hidden-mobile" style={{ padding: '0.6rem 1.5rem', fontSize: '0.62rem' }}>
              Sfoglia il menu
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen(!open)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '5px' }}
              className="show-mobile"
            >
              <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'white', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
              <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'white', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
              <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'white', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'var(--balzer-blue-deep)',
            zIndex: 490,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
          }}
          onClick={() => setOpen(false)}
        >
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem', fontWeight: 700,
              color: 'rgba(255,255,255,0.9)', textDecoration: 'none',
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/menu" className="btn-terracotta" onClick={() => setOpen(false)} style={{ marginTop: '1rem' }}>
            Sfoglia il menu
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
