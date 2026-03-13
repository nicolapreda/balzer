'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  isVisible: boolean;
  _count?: { items: number };
}

const initForm = { name: '', slug: '', description: '', sortOrder: 0, isVisible: true };

export default function CategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(initForm);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      if (res.status === 401) { router.push('/admin/login'); return; }
      setCategories(await res.json());
    } finally { setLoading(false); }
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditing(null); setForm(initForm); setShowForm(true); };
  const openEdit = (c: Category) => {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug, description: c.description || '', sortOrder: c.sortOrder, isVisible: c.isVisible });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/admin/categories/${editing.id}` : '/api/admin/categories';
      const method = editing ? 'PUT' : 'POST';
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setShowForm(false);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Eliminare questa categoria e tutti i suoi prodotti?')) return;
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    load();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 0.875rem',
    border: '1px solid var(--stone)', background: 'white',
    fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.875rem',
    color: 'var(--text-dark)', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <AdminLayout active="/admin/categories" onLogout={handleLogout}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 400, color: 'var(--balzer-blue)' }}>Categorie Menu</h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{categories.length} categorie totali</p>
          </div>
          <button onClick={openNew} className="btn-primary" style={{ fontSize: '0.65rem' }}>+ Nuova categoria</button>
        </div>

        {/* Table */}
        {loading ? (
          <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Caricamento…</p>
        ) : (
          <div style={{ background: 'white', border: '1px solid var(--stone)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'var(--cream)', borderBottom: '1px solid var(--stone)' }}>
                  {['Ordine', 'Nome', 'Slug', 'Prodotti', 'Visibile', 'Azioni'].map((h) => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid var(--stone)' }}>
                    <td style={{ padding: '1rem', fontSize: '0.82rem', color: 'var(--text-light)' }}>{cat.sortOrder}</td>
                    <td style={{ padding: '1rem', fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: 'var(--text-dark)' }}>{cat.name}</td>
                    <td style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--text-light)', fontFamily: 'monospace' }}>{cat.slug}</td>
                    <td style={{ padding: '1rem', fontSize: '0.82rem', color: 'var(--text-mid)' }}>{cat._count?.items ?? 0}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: cat.isVisible ? '#4caf72' : '#e57373' }} />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={() => openEdit(cat)} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', color: 'var(--balzer-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>Modifica</button>
                        <button onClick={() => handleDelete(cat.id)} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', color: '#e57373', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Elimina</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </AdminLayout>
  );

  return (
    <>
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '500px', padding: '2.5rem', position: 'relative' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--balzer-blue)', marginBottom: '2rem' }}>
              {editing ? 'Modifica categoria' : 'Nuova categoria'}
            </h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Nome *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.slug || e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Slug *</label>
                  <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Descrizione</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.4rem' }}>Ordine</label>
                    <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)' }}>Visibile</span>
                    </label>
                  </div>
                </div>
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
    </>
  );
}
