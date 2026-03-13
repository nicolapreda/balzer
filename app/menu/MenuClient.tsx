'use client';

import { useState, useEffect, useRef } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: string | null;
  tagsJson: string | null;
  isAvailable: boolean;
}

interface MenuCategory {
  id: number;
  name: string;
  description: string | null;
  items: MenuItem[];
}

const FALLBACK_CATEGORIES: MenuCategory[] = [
  {
    id: 1, name: 'Colazione', description: 'Ogni mattina, la migliore partenza della giornata.',
    items: [
      { id: 1, name: 'Cornetto semplice', description: 'Fragrante, caldo, preparato ogni mattina', price: '1.30', tagsJson: null, isAvailable: true },
      { id: 2, name: 'Cornetto alla crema', description: 'Con crema pasticcera artigianale', price: '1.60', tagsJson: null, isAvailable: true },
      { id: 3, name: 'Brioche con gelato', description: 'Brioche fresca con gelato artigianale a scelta', price: '3.50', tagsJson: null, isAvailable: true },
      { id: 4, name: 'Cappuccino', description: 'Latte fresco, schiuma vellutata, caffè selezionato', price: '1.80', tagsJson: null, isAvailable: true },
      { id: 5, name: 'Spremuta d\'arancia', description: 'Arance fresche di stagione', price: '3.00', tagsJson: null, isAvailable: true },
    ],
  },
  {
    id: 2, name: 'Pasticceria', description: 'L\'arte dolciaria di Balzer dal 1850.',
    items: [
      { id: 6, name: 'Torta Donizetti', description: 'La torta storica di Balzer, ricetta esclusiva dal 1948. Con confettura di albicocche e cioccolato fondente.', price: '5.50', tagsJson: '["signature"]', isAvailable: true },
      { id: 7, name: 'Polenta e Osei', description: 'Dolce tradizionale bergamasco con marzapane e cioccolato', price: '4.50', tagsJson: '["signature"]', isAvailable: true },
      { id: 8, name: 'Mignon assortiti', description: 'Selezione di piccola pasticceria — minimo 6 pezzi', price: '2.20', tagsJson: null, isAvailable: true },
      { id: 9, name: 'Crostata stagionale', description: 'Con marmellata artigianale di frutta di stagione', price: '4.00', tagsJson: '["veg"]', isAvailable: true },
    ],
  },
  {
    id: 3, name: 'Pranzo', description: 'Cucina lombarda contemporanea, ingredienti selezionati.',
    items: [
      { id: 10, name: 'Risotto allo zafferano', description: 'Risotto alla milanese con ossobuco su richiesta', price: '16.00', tagsJson: null, isAvailable: true },
      { id: 11, name: 'Casoncelli alla bergamasca', description: 'Pasta fresca ripiena, burro fuso, salvia e pancetta', price: '14.00', tagsJson: null, isAvailable: true },
      { id: 12, name: 'Tagliata di manzo', description: 'Con rucola, grana e aceto balsamico di Modena', price: '22.00', tagsJson: null, isAvailable: true },
      { id: 13, name: 'Insalata gourmet', description: 'Con noci, pere, gorgonzola e vinaigrette al miele', price: '12.00', tagsJson: '["veg"]', isAvailable: true },
    ],
  },
  {
    id: 4, name: 'Aperitivo', description: 'L\'ora più attesa, dal 17:00.',
    items: [
      { id: 14, name: 'Spritz Balzer', description: 'Il nostro aperol spritz con tocco personale, stuzzichini inclusi', price: '8.00', tagsJson: '["signature"]', isAvailable: true },
      { id: 15, name: 'Negroni', description: 'Gin, vermut rosso, campari. Classico senza compromessi', price: '9.00', tagsJson: null, isAvailable: true },
      { id: 16, name: 'Bollicine Franciacorta', description: 'Calice di Franciacorta DOCG con selezione stuzzichini', price: '11.00', tagsJson: null, isAvailable: true },
    ],
  },
  {
    id: 5, name: 'Cocktail', description: 'Signature drinks e grandi classici.',
    items: [
      { id: 17, name: 'Balzer Mule', description: 'Vodka premium, zenzero fresco, lime, ginger beer', price: '10.00', tagsJson: '["signature"]', isAvailable: true },
      { id: 18, name: 'Old Fashioned', description: 'Bourbon, angostura, zucchero di canna, scorzetta arancia', price: '12.00', tagsJson: null, isAvailable: true },
      { id: 19, name: 'Margarita', description: 'Tequila blanco, triple sec, lime fresco', price: '10.00', tagsJson: null, isAvailable: true },
      { id: 20, name: 'Mocktail del giorno', description: 'Senza alcol — chiedi al barman la proposta del giorno', price: '7.00', tagsJson: null, isAvailable: true },
    ],
  },
];

const TAG_LABELS: Record<string, { label: string; color: string }> = {
  signature: { label: 'Signature', color: 'var(--gold)' },
  veg: { label: 'Veg', color: '#4caf72' },
  'gluten-free': { label: 'Senza glutine', color: '#e0864a' },
  novita: { label: 'Novità', color: 'var(--balzer-blue-light)' },
};

function ItemCard({ item }: { item: MenuItem }) {
  const tags: string[] = (() => {
    try { return item.tagsJson ? JSON.parse(item.tagsJson) : []; }
    catch { return []; }
  })();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '1.25rem 0',
      borderBottom: '1px solid var(--stone)',
      gap: '1rem',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: 'var(--text-dark)',
          }}>
            {item.name}
          </span>
          {tags.map((tag) => {
            const t = TAG_LABELS[tag];
            if (!t) return null;
            return (
              <span key={tag} style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.55rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: t.color,
                border: `1px solid ${t.color}`,
                padding: '0.1rem 0.4rem',
                borderRadius: '2px',
              }}>
                {t.label}
              </span>
            );
          })}
        </div>
        {item.description && (
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.75rem',
            color: 'var(--text-light)',
            lineHeight: 1.6,
          }}>
            {item.description}
          </p>
        )}
      </div>
      {item.price && (
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.1rem',
          fontWeight: 500,
          color: 'var(--balzer-blue)',
          whiteSpace: 'nowrap',
          paddingTop: '0.15rem',
        }}>
          € {parseFloat(item.price).toFixed(2)}
        </div>
      )}
    </div>
  );
}

function CategorySection({ cat, isActive }: { cat: MenuCategory; isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isActive]);

  return (
    <div ref={ref} id={`cat-${cat.id}`} style={{ marginBottom: '4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ width: '2rem', height: '1px', background: 'var(--gold)', marginBottom: '1rem' }} />
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 400,
          color: 'var(--balzer-blue)',
          marginBottom: '0.5rem',
          lineHeight: 1.0,
        }}>
          {cat.name}
        </h2>
        {cat.description && (
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.8rem',
            color: 'var(--text-light)',
            lineHeight: 1.6,
          }}>
            {cat.description}
          </p>
        )}
      </div>
      <div>
        {cat.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function MenuClient() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu/categories')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setCategories(data);
        else setCategories(FALLBACK_CATEGORIES);
      })
      .catch(() => setCategories(FALLBACK_CATEGORIES))
      .finally(() => setLoading(false));
  }, []);

  const cats = loading ? FALLBACK_CATEGORIES : categories;

  return (
    <div>
      {/* Sticky category nav */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 100,
        background: 'var(--ivory)',
        borderBottom: '1px solid var(--stone)',
        overflowX: 'auto',
      }}>
        <div className="container-balzer" style={{ padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            {cats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const el = document.getElementById(`cat-${cat.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '1.1rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeCategory === cat.id ? '2px solid var(--balzer-blue)' : '2px solid transparent',
                  color: activeCategory === cat.id ? 'var(--balzer-blue)' : 'var(--text-light)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <div className="container-balzer" style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '720px' }}>
          {cats.map((cat) => (
            <CategorySection key={cat.id} cat={cat} isActive={activeCategory === cat.id} />
          ))}
        </div>
        <p style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.7rem',
          color: 'var(--text-light)',
          marginTop: '2rem',
          fontStyle: 'italic',
        }}>
          I prezzi includono IVA. Menu soggetto a variazioni stagionali. Siamo felici di informarvi sugli allergeni.
        </p>
      </div>
    </div>
  );
}
