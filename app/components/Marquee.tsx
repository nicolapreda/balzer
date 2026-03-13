export default function Marquee({ dark = false }: { dark?: boolean }) {
  const items = [
    'Dal 1850',
    '✦',
    'Caffetteria',
    '✦',
    'Pasticceria',
    '✦',
    'Ristorante',
    '✦',
    'Bergamo',
    '✦',
    'Sentierone',
    '✦',
    'Torta Donizetti',
    '✦',
    'Aperitivo',
    '✦',
    'Polenta e Osei',
    '✦',
  ];

  const repeated = [...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '1.25rem 0',
        borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(54,80,113,0.12)'}`,
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(54,80,113,0.12)'}`,
        background: dark ? 'var(--balzer-blue-deep)' : 'var(--cream)',
      }}
    >
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: dark ? 'rgba(255,255,255,0.45)' : 'var(--balzer-blue)',
              padding: '0 1.75rem',
              opacity: item === '✦' ? 0.4 : 1,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
