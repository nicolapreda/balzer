import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import QRClient from './QRClient';

export default async function QRPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return <QRClient />;
}
