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
    const items = await prisma.menuItem.findMany({
      orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
      include: { category: { select: { name: true } } },
    });
    return NextResponse.json(items);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Errore';
    return NextResponse.json({ error: msg }, { status: msg === 'Non autorizzato' ? 401 : 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const data = await req.json();
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
    const item = await prisma.menuItem.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        slug,
        description: data.description || null,
        price: data.price ? parseFloat(data.price) : null,
        imageUrl: data.imageUrl || null,
        tagsJson: data.tagsJson || null,
        isAvailable: data.isAvailable ?? true,
        sortOrder: data.sortOrder ?? 0,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Errore';
    return NextResponse.json({ error: msg }, { status: msg === 'Non autorizzato' ? 401 : 500 });
  }
}
