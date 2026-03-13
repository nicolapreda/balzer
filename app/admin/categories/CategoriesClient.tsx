'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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

  return (
    <AdminLayout active="/admin/categories" onLogout={handleLogout}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--stone)' }}>
        <div>
          <p className="label-small-gold" style={{ marginBottom: '0.4rem' }}>Menu</p>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--balzer-blue)', margin: 0 }}>Categorie</h1>
        </div>
        <button onClick={openNew} className="btn-primary" style={{ fontSize: '0.62rem' }}>+ Nuova categoria</button>
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Caricamento…</p>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--stone)', overflowX: 'auto', borderRadius: '2px' }}>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--stone)' }}>
                {['#', 'Nome', 'Slug', 'Prodotti', 'Visibile', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)', background: 'var(--cream)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid var(--stone)', transition: 'background 0.15s' }}>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.78rem', color: 'var(--text-light)', width: '40px' }}>{cat.sortOrder}</td>
                  <td style={{ padding: '0.9rem 1rem', fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 400, color: 'var(--text-dark)' }}>{cat.name}</td>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'monospace' }}>{cat.slug}</td>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.8rem', color: 'var(--text-mid)', fontWeight: 500 }}>{cat._count?.items ?? 0}</td>
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: cat.isVisible ? '#5cb87a' : '#e57373' }} />
                  </td>
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => openEdit(cat)} style={{ fontSize: '0.7rem', color: 'var(--balzer-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Modifica</button>
                      <button onClick={() => handleDelete(cat.id)} style={{ fontSize: '0.7rem', color: 'var(--terracotta)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Elimina</button>
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
        <div className="admin-modal-outer" style={{ position: 'fixed', inset: 0, background: 'rgba(20,30,50,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="admin-modal-inner" style={{ background: 'white', width: '100%', maxWidth: '480px', padding: '2.5rem' }}>
            <p className="label-small-gold" style={{ marginBottom: '0.5rem' }}>Categorie</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--balzer-blue)', marginBottom: '1.75rem' }}>
              {editing ? 'Modifica categoria' : 'Nuova categoria'}
            </h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label className="admin-label">Nome *</label>
                  <input required className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.slug || e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} />
                </div>
                <div>
                  <label className="admin-label">Slug *</label>
                  <input required className="admin-input" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Descrizione</label>
                  <textarea className="admin-input" rows={3} style={{ resize: 'vertical' }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="admin-label">Ordine</label>
                    <input type="number" className="admin-input" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)' }}>Visibile</span>
                    </label>
                  </div>
                </div>
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
