import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error('Non autorizzato');
  return session;
}

export async function GET() {
  try {
    await requireAuth();
    const categories = await prisma.menuCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { items: true } } },
    });
    return NextResponse.json(categories);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Errore';
    return NextResponse.json({ error: msg }, { status: msg === 'Non autorizzato' ? 401 : 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const data = await req.json();
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const category = await prisma.menuCategory.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        sortOrder: data.sortOrder ?? 0,
        isVisible: data.isVisible ?? true,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Errore';
    return NextResponse.json({ error: msg }, { status: msg === 'Non autorizzato' ? 401 : 500 });
  }
}
