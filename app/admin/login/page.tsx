import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/admin');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--balzer-blue-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--terracotta-light)',
            marginBottom: '1rem',
          }}>
            Area riservata
          </p>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.5rem',
            fontWeight: 400,
            color: 'white',
          }}>
            Balzer Admin
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
