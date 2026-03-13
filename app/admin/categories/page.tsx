import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return <CategoriesClient />;
}
