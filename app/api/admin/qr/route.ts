import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import QRCode from 'qrcode';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path') || '/menu';
    const format = searchParams.get('format') || 'png'; // 'png' | 'svg'
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const url = `${baseUrl}${path}`;

    if (format === 'svg') {
      const svg = await QRCode.toString(url, {
        type: 'svg',
        margin: 2,
        color: { dark: '#365071', light: '#fcfbf7' },
      });
      return new NextResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': 'attachment; filename="balzer-menu-qr.svg"',
        },
      });
    }

    const buffer = await QRCode.toBuffer(url, {
      type: 'png',
      margin: 2,
      width: 512,
      color: { dark: '#365071', light: '#fcfbf7' },
    });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="balzer-menu-qr.png"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Errore generazione QR' }, { status: 500 });
  }
}
