import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const filePath = path.join('/');
  const externalUrl = `${process.env.EXTERNAL_API_URL}/${filePath}`;

  try {
    const response = await fetch(externalUrl);

    if (!response.ok) {
      return new NextResponse('Documento no encontrado', { status: 404 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/pdf';

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error al obtener documento:', error);
    return new NextResponse('Error interno', { status: 500 });
  }
}