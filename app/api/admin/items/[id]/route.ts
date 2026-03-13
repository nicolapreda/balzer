import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error('Non autorizzato');
  return session;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const data = await req.json();
    const item = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: {
        categoryId: data.categoryId,
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        price: data.price ? parseFloat(data.price) : null,
        imageUrl: data.imageUrl || null,
        tagsJson: data.tagsJson || null,
        isAvailable: data.isAvailable ?? true,
        sortOrder: data.sortOrder ?? 0,
      },
    });
    return NextResponse.json(item);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Errore';
    return NextResponse.json({ error: msg }, { status: msg === 'Non autorizzato' ? 401 : 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    await prisma.menuItem.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Errore';
    return NextResponse.json({ error: msg }, { status: msg === 'Non autorizzato' ? 401 : 500 });
  }
}
