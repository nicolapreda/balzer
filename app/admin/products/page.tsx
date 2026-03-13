import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return <ProductsClient />;
}
