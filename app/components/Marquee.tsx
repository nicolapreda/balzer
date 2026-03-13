export default function Marquee({ dark = false }: { dark?: boolean }) {
  const items = [
    'Dal 1850', '◆', 'Caffetteria', '◆', 'Pasticceria', '◆',
    'Ristorante', '◆', 'Bergamo', '◆', 'Sentierone', '◆',
    'Torta Donizetti', '◆', 'Aperitivo', '◆', 'Polenta e Osei', '◆',
  ];

  const repeated = [...items, ...items];

  return (
    <div style={{
      overflow: 'hidden',
      padding: '1.1rem 0',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--stone)'}`,
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--stone)'}`,
      background: dark ? 'var(--balzer-blue-deep)' : 'var(--ivory)',
    }}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: item === '◆'
                ? (dark ? 'rgba(196,115,74,0.5)' : 'var(--terracotta)')
                : (dark ? 'rgba(255,255,255,0.4)' : 'var(--balzer-blue)'),
              padding: '0 1.5rem',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
