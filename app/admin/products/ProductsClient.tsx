'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

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

  const filterBtn = (active: boolean) => ({
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    padding: '0.35rem 0.875rem',
    background: active ? 'var(--balzer-blue)' : 'white',
    color: active ? 'white' : 'var(--text-mid)',
    border: '1px solid var(--stone)',
    cursor: 'pointer',
    borderRadius: '2px',
    transition: 'background 0.15s, color 0.15s',
  });

  return (
    <AdminLayout active="/admin/products" onLogout={handleLogout}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--stone)' }}>
        <div>
          <p className="label-small-gold" style={{ marginBottom: '0.4rem' }}>Menu</p>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--balzer-blue)', margin: 0 }}>Prodotti</h1>
        </div>
        <button onClick={openNew} className="btn-primary" style={{ fontSize: '0.62rem' }}>+ Nuovo prodotto</button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setFilterCat(null)} style={filterBtn(filterCat === null)}>Tutte</button>
        {categories.map((c) => (
          <button key={c.id} onClick={() => setFilterCat(c.id)} style={filterBtn(filterCat === c.id)}>{c.name}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Caricamento…</p>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--stone)', overflow: 'auto', borderRadius: '2px' }}>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '680px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--stone)' }}>
                {['Nome', 'Categoria', 'Prezzo', 'Disponibile', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)', background: 'var(--cream)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--stone)', transition: 'background 0.15s' }}>
                  <td style={{ padding: '0.9rem 1rem', fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', fontWeight: 400, color: 'var(--text-dark)' }}>
                    {item.name}
                    {item.description && <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.68rem', color: 'var(--text-light)', marginTop: '0.1rem', fontWeight: 400 }}>{item.description.slice(0, 55)}{item.description.length > 55 ? '…' : ''}</div>}
                  </td>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.72rem', color: 'var(--text-light)', letterSpacing: '0.02em' }}>{item.category?.name || '—'}</td>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--balzer-blue)', fontVariantNumeric: 'tabular-nums' }}>
                    {item.price ? `€ ${parseFloat(item.price).toFixed(2)}` : '—'}
                  </td>
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: item.isAvailable ? '#5cb87a' : '#e57373' }} />
                  </td>
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => openEdit(item)} style={{ fontSize: '0.7rem', color: 'var(--balzer-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Modifica</button>
                      <button onClick={() => handleDelete(item.id)} style={{ fontSize: '0.7rem', color: 'var(--terracotta)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Elimina</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="admin-modal-outer" style={{ position: 'fixed', inset: 0, background: 'rgba(20,30,50,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
          <div className="admin-modal-inner" style={{ background: 'white', width: '100%', maxWidth: '520px', padding: '2.5rem' }}>
            <p className="label-small-gold" style={{ marginBottom: '0.5rem' }}>Prodotti</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--balzer-blue)', marginBottom: '1.75rem' }}>
              {editing ? 'Modifica prodotto' : 'Nuovo prodotto'}
            </h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label className="admin-label">Categoria *</label>
                  <select required className="admin-input" style={{ cursor: 'pointer' }} value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                    <option value="">Seleziona…</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="admin-label">Nome *</label>
                  <input required className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Descrizione</label>
                  <textarea className="admin-input" rows={3} style={{ resize: 'vertical' }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="admin-label">Prezzo (€)</label>
                    <input type="number" step="0.01" min="0" className="admin-input" placeholder="0.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div>
                    <label className="admin-label">Ordine</label>
                    <input type="number" className="admin-input" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Tags (JSON array)</label>
                  <input className="admin-input" placeholder='["signature","veg"]' value={form.tagsJson} onChange={(e) => setForm({ ...form, tagsJson: e.target.value })} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)' }}>Disponibile</span>
                </label>
                <div className="admin-modal-actions" style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="submit" disabled={saving} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.62rem' }}>
                    {saving ? 'Salvataggio…' : 'Salva'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.62rem' }}>
                    Annulla
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
