'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category { id: number; name: string; }
interface Item {
  id: number; categoryId: number; name: string; slug: string;
  description: string | null; price: string | null; tagsJson: string | null;
  isAvailable: boolean; sortOrder: number;
  category?: { name: string };
}

const initForm = { categoryId: '', name: '', description: '', price: '', tagsJson: '', isAvailable: true, sortOrder: 0 };

export default function ProductsClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState(initForm);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState<number | null>(null);
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [itemsRes, catsRes] = await Promise.all([
        fetch('/api/admin/items'),
        fetch('/api/admin/categories'),
      ]);
      if (itemsRes.status === 401) { router.push('/admin/login'); return; }
      setItems(await itemsRes.json());
      setCategories(await catsRes.json());
    } finally { setLoading(false); }
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditing(null); setForm(initForm); setShowForm(true); };
  const openEdit = (i: Item) => {
    setEditing(i);
    setForm({ categoryId: String(i.categoryId), name: i.name, description: i.description || '', price: i.price || '', tagsJson: i.tagsJson || '', isAvailable: i.isAvailable, sortOrder: i.sortOrder });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/admin/items/${editing.id}` : '/api/admin/items';
      const method = editing ? 'PUT' : 'POST';
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, categoryId: parseInt(form.categoryId) }) });
      setShowForm(false);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Eliminare questo prodotto?')) return;
    await fetch(`/api/admin/items/${id}`, { method: 'DELETE' });
    load();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const filtered = filterCat ? items.filter((i) => i.categoryId === filterCat) : items;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 0.875rem', border: '1px solid var(--stone)',
    background: 'white', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.875rem',
    color: 'var(--text-dark)', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ivory)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <aside style={{ width: '240px', minHeight: '100vh', background: 'var(--balzer-blue-deep)', padding: '2rem 0', flexShrink: 0 }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 400, color: 'white' }}>Balzer 1850</p>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Pannello Admin</p>
        </div>
        <nav>
          {[{ href: '/admin', label: 'Dashboard', icon: '◈' }, { href: '/admin/categories', label: 'Categorie', icon: '◻' }, { href: '/admin/products', label: 'Prodotti', icon: '◯' }, { href: '/admin/qr', label: 'QR Code', icon: '⬡' }].map((l) => (
            <Link key={l.href} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.5rem', textDecoration: 'none', background: l.href === '/admin/products' ? 'rgba(255,255,255,0.08)' : 'transparent', borderLeft: l.href === '/admin/products' ? '2px solid var(--terracotta)' : '2px solid transparent' }}>
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{l.icon}</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.8rem', fontWeight: l.href === '/admin/products' ? 600 : 400, color: l.href === '/admin/products' ? 'white' : 'rgba(255,255,255,0.55)' }}>{l.label}</span>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '2rem 1.5rem 0' }}>
          <button onClick={handleLogout} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Esci</button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 400, color: 'var(--balzer-blue)' }}>Prodotti</h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{items.length} prodotti totali</p>
          </div>
          <button onClick={openNew} className="btn-primary" style={{ fontSize: '0.65rem' }}>+ Nuovo prodotto</button>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => setFilterCat(null)} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.65rem', fontWeight: 600, padding: '0.4rem 0.875rem', background: filterCat === null ? 'var(--balzer-blue)' : 'white', color: filterCat === null ? 'white' : 'var(--text-mid)', border: '1px solid var(--stone)', cursor: 'pointer' }}>
            Tutte
          </button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setFilterCat(c.id)} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.65rem', fontWeight: 600, padding: '0.4rem 0.875rem', background: filterCat === c.id ? 'var(--balzer-blue)' : 'white', color: filterCat === c.id ? 'white' : 'var(--text-mid)', border: '1px solid var(--stone)', cursor: 'pointer' }}>
              {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Caricamento…</p>
        ) : (
          <div style={{ background: 'white', border: '1px solid var(--stone)', overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--cream)', borderBottom: '1px solid var(--stone)' }}>
                  {['Nome', 'Categoria', 'Prezzo', 'Tags', 'Disponibile', 'Azioni'].map((h) => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--stone)' }}>
                    <td style={{ padding: '0.875rem 1rem', fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--text-dark)' }}>
                      {item.name}
                      {item.description && <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '0.15rem' }}>{item.description.slice(0, 60)}{item.description.length > 60 ? '…' : ''}</div>}
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.78rem', color: 'var(--text-mid)' }}>{item.category?.name || ''}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--balzer-blue)' }}>
                      {item.price ? `€ ${parseFloat(item.price).toFixed(2)}` : '—'}
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.72rem', color: 'var(--terracotta)' }}>
                      {item.tagsJson ? JSON.parse(item.tagsJson).join(', ') : '—'}
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: item.isAvailable ? '#4caf72' : '#e57373' }} />
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={() => openEdit(item)} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', color: 'var(--balzer-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>Modifica</button>
                        <button onClick={() => handleDelete(item.id)} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', color: '#e57373', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Elimina</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '560px', padding: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--balzer-blue)', marginBottom: '2rem' }}>
              {editing ? 'Modifica prodotto' : 'Nuovo prodotto'}
            </h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Categoria *</label>
                  <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Seleziona…</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Nome *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Descrizione</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Prezzo (€)</label>
                    <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} placeholder="0.00" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Ordine</label>
                    <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Tags (JSON array)</label>
                  <input value={form.tagsJson} onChange={(e) => setForm({ ...form, tagsJson: e.target.value })} style={inputStyle} placeholder='["signature","veg"]' />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)' }}>Disponibile</span>
                </label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button type="submit" disabled={saving} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.65rem' }}>
                    {saving ? 'Salvataggio…' : 'Salva'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.65rem' }}>
                    Annulla
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
